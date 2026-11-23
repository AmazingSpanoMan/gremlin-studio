import { useContext, useEffect, useMemo, useState } from "react";
import { ConnectionContext } from "../rpc/ConnectionContext";
import { LockStateContext } from "../rpc/LockStateContext";
import { LockState } from "@zmkfirmware/zmk-studio-ts-client/core";
import { ComboConfig } from "@zmkfirmware/zmk-studio-ts-client/gremlin";
import type { BehaviorBinding } from "@zmkfirmware/zmk-studio-ts-client/keymap";
import { BehaviorBindingPicker } from "../behaviors/BehaviorBindingPicker";
import {
  formatPositionLabel,
  GREMLIN_POSITIONS,
  rpcGetCombo,
  rpcSetCombo,
} from "./gremlinRpc";
import { formatZmkBinding } from "./zmkExporter";
import { useGremlin } from "./GremlinContext";

export const CombosPanel = () => {
  const { conn } = useContext(ConnectionContext);
  const lockState = useContext(LockStateContext);
  const {
    capabilities,
    combos,
    setCombos,
    loadCombos,
    sharedDevice,
    setGremlinUnsaved,
    saveAllGremlinToFlash,
    loadingSection,
  } = useGremlin();

  const [selectedIdx, setSelectedIdx] = useState(0);
  const [draft, setDraft] = useState<ComboConfig | null>(null);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const isUnlocked = lockState === LockState.ZMK_STUDIO_CORE_LOCK_STATE_UNLOCKED;

  useEffect(() => {
    if (isUnlocked && capabilities && combos.length === 0) {
      loadCombos();
    }
  }, [isUnlocked, capabilities, combos.length, loadCombos]);

  const currentCombo = useMemo(
    () => combos.find((c) => c.index === selectedIdx),
    [combos, selectedIdx]
  );

  const defaultBinding = useMemo<BehaviorBinding>(() => {
    const firstBeh = Object.values(sharedDevice.behaviors)[0];
    return {
      behaviorId: firstBeh?.id ?? 0,
      param1: 0,
      param2: 0,
    };
  }, [sharedDevice.behaviors]);

  useEffect(() => {
    if (currentCombo) {
      setDraft({
        ...currentCombo,
        keyPositions: [...currentCombo.keyPositions],
        binding: currentCombo.binding ?? defaultBinding,
      });
    } else {
      setDraft(null);
    }
    setStatusMsg(null);
  }, [currentCombo, defaultBinding]);

  if (!capabilities) return null;

  const layers = (sharedDevice.keymap?.layers ?? []).map((l, idx) => ({
    id: l.id,
    name: l.name || `Layer ${idx}`,
  }));

  const maxKeys = capabilities.maxComboKeys || 4;

  const togglePosition = (pos: number) => {
    if (!draft) return;
    const exists = draft.keyPositions.includes(pos);
    if (exists) {
      setDraft({
        ...draft,
        keyPositions: draft.keyPositions.filter((p) => p !== pos),
      });
    } else if (draft.keyPositions.length < maxKeys) {
      setDraft({
        ...draft,
        keyPositions: [...draft.keyPositions, pos].sort((a, b) => a - b),
      });
    }
  };

  const toggleLayerBit = (layerIdx: number) => {
    if (!draft) return;
    const bit = 1 << layerIdx;
    setDraft({
      ...draft,
      layerMask: draft.layerMask ^ bit,
    });
  };

  const applyCombo = async (nextCfg: ComboConfig) => {
    if (!conn) return;
    setBusy(true);
    setStatusMsg(null);
    try {
      await rpcSetCombo(conn, nextCfg);
      const updated = await rpcGetCombo(conn, nextCfg.index);
      setCombos((prev) =>
        prev.map((c) => (c.index === updated.index ? updated : c))
      );
      setGremlinUnsaved(true);
      setStatusMsg(`Applied Combo Slot ${nextCfg.index + 1} live.`);
    } catch (e) {
      setStatusMsg(`Error: ${e instanceof Error ? e.message : String(e)}`);
    } finally {
      setBusy(false);
    }
  };

  const handleClearSlot = async () => {
    if (!draft) return;
    const cleared: ComboConfig = {
      index: draft.index,
      enabled: false,
      timeoutMs: 50,
      requirePriorIdleMs: 0,
      layerMask: 0,
      slowRelease: false,
      keyPositions: [],
      binding: defaultBinding,
    };
    setDraft(cleared);
    await applyCombo(cleared);
  };

  const handleSaveFlash = async () => {
    setBusy(true);
    setStatusMsg(null);
    try {
      await saveAllGremlinToFlash();
      setStatusMsg("Saved all Gremlin runtime settings to flash.");
    } catch (e) {
      setStatusMsg(`Flash save error: ${e instanceof Error ? e.message : String(e)}`);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="grid grid-cols-[260px_1fr] h-full min-h-0 bg-base-300 text-base-content">
      {/* Slot List */}
      <div className="bg-base-200 border-r border-base-300 flex flex-col min-h-0">
        <div className="p-3 border-b border-base-300 flex items-center justify-between">
          <div>
            <div className="font-semibold text-base">Multi-Button Combos</div>
            <div className="text-sm opacity-70">{capabilities.maxCombos} runtime slots</div>
          </div>
          <button
            className="px-2 py-1 rounded bg-base-300 hover:bg-primary hover:text-primary-content text-sm"
            onClick={() => loadCombos()}
            disabled={loadingSection === "combos"}
          >
            Refresh
          </button>
        </div>

        <div className="overflow-y-auto flex-1 p-2 flex flex-col gap-1">
          {combos.map((c) => {
            const isSel = c.index === selectedIdx;
            const posText =
              c.keyPositions.length > 0
                ? c.keyPositions.map(formatPositionLabel).join(" + ")
                : "Empty slot";
            const outText = c.enabled
              ? formatZmkBinding(c.binding, sharedDevice.behaviors)
              : "Disabled";
            return (
              <button
                key={c.index}
                onClick={() => setSelectedIdx(c.index)}
                className={`text-left p-2 rounded transition-colors border ${
                  isSel
                    ? "bg-primary text-primary-content border-primary"
                    : "bg-base-100 hover:bg-base-300 border-transparent"
                }`}
              >
                <div className="flex items-center justify-between text-sm font-medium">
                  <span>Slot {c.index + 1}</span>
                  <span
                    className={`px-1.5 py-0.5 rounded text-sm ${
                      c.enabled
                        ? isSel
                          ? "bg-white/20"
                          : "bg-accent/20 text-accent"
                        : "opacity-50"
                    }`}
                  >
                    {c.enabled ? "ON" : "OFF"}
                  </span>
                </div>
                <div className="text-sm truncate mt-0.5">{posText}</div>
                <div className="text-sm opacity-75 truncate">{outText}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Editor */}
      <div className="overflow-y-auto p-5 flex flex-col gap-5 min-h-0">
        {!draft ? (
          <div className="p-6 bg-base-100 rounded-lg text-base">
            {loadingSection === "combos"
              ? "Loading combo slots from Gremlin v3..."
              : "Select a combo slot on the left to configure."}
          </div>
        ) : (
          <>
            <div className="flex flex-wrap items-center justify-between gap-3 bg-base-100 p-4 rounded-lg shadow-sm">
              <div className="flex items-center gap-4">
                <h2 className="text-lg font-semibold">Combo Slot {draft.index + 1}</h2>
                <label className="flex items-center gap-2 cursor-pointer text-base">
                  <input
                    type="checkbox"
                    checked={draft.enabled}
                    onChange={(e) => setDraft({ ...draft, enabled: e.target.checked })}
                    className="w-4 h-4 accent-primary"
                  />
                  <span>Enabled</span>
                </label>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleClearSlot}
                  disabled={busy}
                  className="px-3 py-1.5 rounded bg-base-200 hover:bg-base-300 text-sm disabled:opacity-50"
                >
                  Clear Slot
                </button>
                <button
                  onClick={() => applyCombo(draft)}
                  disabled={busy || (draft.enabled && draft.keyPositions.length < 2)}
                  className="px-3 py-1.5 rounded bg-primary text-primary-content font-medium text-sm disabled:opacity-50"
                >
                  Apply Combo Live
                </button>
                <button
                  onClick={handleSaveFlash}
                  disabled={busy}
                  className="px-3 py-1.5 rounded bg-accent text-black font-medium text-sm disabled:opacity-50"
                >
                  Save Flash
                </button>
              </div>
            </div>

            {statusMsg && (
              <div className="px-4 py-2 rounded bg-base-200 border border-primary/40 text-sm">
                {statusMsg}
              </div>
            )}

            {/* Key Selector + Settings */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="bg-base-100 p-4 rounded-lg shadow-sm flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-base">
                    Trigger Keys ({draft.keyPositions.length}/{maxKeys}, min 2)
                  </span>
                  <span className="text-sm opacity-75">
                    {draft.keyPositions.map(formatPositionLabel).join(" + ") || "None"}
                  </span>
                </div>
                <div className="grid grid-cols-5 gap-1.5">
                  {GREMLIN_POSITIONS.slice(0, 20).map((p) => {
                    const active = draft.keyPositions.includes(p.pos);
                    return (
                      <button
                        key={p.pos}
                        type="button"
                        onClick={() => togglePosition(p.pos)}
                        className={`py-2 px-1 rounded text-sm font-medium border transition-colors ${
                          active
                            ? "bg-primary text-primary-content border-primary"
                            : "bg-base-200 hover:bg-base-300 border-transparent"
                        }`}
                      >
                        {p.shortLabel}
                      </button>
                    );
                  })}
                  <div className="col-span-3" />
                  {GREMLIN_POSITIONS.slice(20, 22).map((p) => {
                    const active = draft.keyPositions.includes(p.pos);
                    return (
                      <button
                        key={p.pos}
                        type="button"
                        onClick={() => togglePosition(p.pos)}
                        className={`py-2 px-1 rounded text-sm font-medium border transition-colors ${
                          active
                            ? "bg-primary text-primary-content border-primary"
                            : "bg-base-200 hover:bg-base-300 border-transparent"
                        }`}
                      >
                        {p.shortLabel}
                      </button>
                    );
                  })}
                </div>
                <div className="pt-2 border-t border-base-300 flex flex-wrap gap-1.5">
                  {GREMLIN_POSITIONS.slice(22).map((p) => {
                    const active = draft.keyPositions.includes(p.pos);
                    return (
                      <button
                        key={p.pos}
                        type="button"
                        onClick={() => togglePosition(p.pos)}
                        className={`py-1.5 px-2.5 rounded text-sm font-medium border transition-colors ${
                          active
                            ? "bg-primary text-primary-content border-primary"
                            : "bg-base-200 hover:bg-base-300 border-transparent"
                        }`}
                      >
                        {p.shortLabel}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="bg-base-100 p-4 rounded-lg shadow-sm flex flex-col gap-4">
                <div className="font-semibold text-base">Timing & Layer Filter</div>

                <div className="grid grid-cols-2 gap-3">
                  <label className="flex flex-col gap-1 text-sm">
                    <span>Combo Timeout (ms)</span>
                    <input
                      type="number"
                      min={10}
                      max={2000}
                      value={draft.timeoutMs}
                      onChange={(e) =>
                        setDraft({ ...draft, timeoutMs: parseInt(e.target.value, 10) || 50 })
                      }
                      className="p-1.5 rounded bg-base-200 border border-base-300"
                    />
                  </label>
                  <label className="flex flex-col gap-1 text-sm">
                    <span>Require Prior Idle (ms)</span>
                    <input
                      type="number"
                      min={0}
                      max={2000}
                      value={draft.requirePriorIdleMs}
                      onChange={(e) =>
                        setDraft({
                          ...draft,
                          requirePriorIdleMs: parseInt(e.target.value, 10) || 0,
                        })
                      }
                      className="p-1.5 rounded bg-base-200 border border-base-300"
                    />
                  </label>
                </div>

                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input
                    type="checkbox"
                    checked={draft.slowRelease}
                    onChange={(e) => setDraft({ ...draft, slowRelease: e.target.checked })}
                    className="w-4 h-4 accent-primary"
                  />
                  <span>Slow Release (hold output until ALL combo keys are released)</span>
                </label>

                <div className="pt-2 border-t border-base-300">
                  <div className="flex items-center justify-between mb-2 text-sm">
                    <span className="font-medium">Active Layers</span>
                    <button
                      type="button"
                      onClick={() => setDraft({ ...draft, layerMask: 0 })}
                      className={`px-2 py-0.5 rounded text-sm ${
                        draft.layerMask === 0
                          ? "bg-primary text-primary-content"
                          : "bg-base-200"
                      }`}
                    >
                      All Layers
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {layers.map((l, idx) => {
                      const active = (draft.layerMask & (1 << idx)) !== 0;
                      return (
                        <label
                          key={l.id}
                          className="flex items-center gap-1.5 text-sm bg-base-200 px-2.5 py-1 rounded cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={active}
                            onChange={() => toggleLayerBit(idx)}
                            className="accent-primary"
                          />
                          <span>{l.name}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* Action Picker */}
            <div className="bg-base-100 p-4 rounded-lg shadow-sm">
              <div className="font-semibold text-base mb-2">
                Action When Pressed ({formatZmkBinding(draft.binding, sharedDevice.behaviors)})
              </div>
              <BehaviorBindingPicker
                binding={draft.binding ?? defaultBinding}
                behaviors={Object.values(sharedDevice.behaviors)}
                layers={layers}
                onBindingChanged={(b) => setDraft({ ...draft, binding: b })}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

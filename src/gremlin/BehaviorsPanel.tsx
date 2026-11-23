import { useContext, useEffect, useMemo, useState } from "react";
import { ConnectionContext } from "../rpc/ConnectionContext";
import { LockStateContext } from "../rpc/LockStateContext";
import { LockState } from "@zmkfirmware/zmk-studio-ts-client/core";
import {
  HoldTapConfig,
  HoldTapFlavor,
  MacroConfig,
  MacroStep,
  MacroStepType,
  TapDanceConfig,
} from "@zmkfirmware/zmk-studio-ts-client/gremlin";
import type { BehaviorBinding } from "@zmkfirmware/zmk-studio-ts-client/keymap";
import { BehaviorBindingPicker } from "../behaviors/BehaviorBindingPicker";
import {
  formatPositionLabel,
  rpcGetHoldTap,
  rpcGetMacro,
  rpcGetTapDance,
  rpcSetHoldTap,
  rpcSetMacro,
  rpcSetTapDance,
} from "./gremlinRpc";
import { formatZmkBinding } from "./zmkExporter";
import { useGremlin } from "./GremlinContext";

type SubTab = "hold_tap" | "tap_dance" | "macro";

export const BehaviorsPanel = () => {
  const { conn } = useContext(ConnectionContext);
  const lockState = useContext(LockStateContext);
  const {
    capabilities,
    holdTaps,
    setHoldTaps,
    tapDances,
    setTapDances,
    macros,
    setMacros,
    loadBehaviors,
    sharedDevice,
    setGremlinUnsaved,
    saveAllGremlinToFlash,
    loadingSection,
  } = useGremlin();

  const [subTab, setSubTab] = useState<SubTab>("hold_tap");
  const [selectedSlot, setSelectedSlot] = useState(0);

  const [htDraft, setHtDraft] = useState<HoldTapConfig | null>(null);
  const [tdDraft, setTdDraft] = useState<TapDanceConfig | null>(null);
  const [macDraft, setMacDraft] = useState<MacroConfig | null>(null);

  const [busy, setBusy] = useState(false);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);

  const isUnlocked = lockState === LockState.ZMK_STUDIO_CORE_LOCK_STATE_UNLOCKED;

  useEffect(() => {
    if (isUnlocked && capabilities && holdTaps.length === 0) {
      loadBehaviors();
    }
  }, [isUnlocked, capabilities, holdTaps.length, loadBehaviors]);

  const layers = useMemo(
    () =>
      (sharedDevice.keymap?.layers ?? []).map((l, idx) => ({
        id: l.id,
        name: l.name || `Layer ${idx}`,
      })),
    [sharedDevice.keymap]
  );

  const fallbackBinding = useMemo<BehaviorBinding>(() => {
    const first =
      Object.values(sharedDevice.behaviors).find((b) =>
        b.displayName.toLowerCase().includes("key press")
      ) ?? Object.values(sharedDevice.behaviors)[0];
    return { behaviorId: first?.id ?? 0, param1: 0, param2: 0 };
  }, [sharedDevice.behaviors]);

  const usageMap = useMemo(() => {
    const map: Record<string, string[]> = {};
    const layerList = sharedDevice.keymap?.layers ?? [];
    for (const [lIdx, layer] of layerList.entries()) {
      for (const [pos, b] of layer.bindings.entries()) {
        const beh = sharedDevice.behaviors[b.behaviorId];
        if (!beh) continue;
        const name = beh.displayName;
        if (
          name.startsWith("Gremlin Hold ") ||
          name.startsWith("Gremlin TapDance ") ||
          name.startsWith("Gremlin Macro ")
        ) {
          map[name] = map[name] ?? [];
          map[name].push(`${layer.name || `L${lIdx}`}:${formatPositionLabel(pos)}`);
        }
      }
    }
    return map;
  }, [sharedDevice]);

  useEffect(() => {
    setStatusMsg(null);
    if (subTab === "hold_tap") {
      const item = holdTaps.find((h) => h.index === selectedSlot);
      setHtDraft(
        item
          ? {
              ...item,
              holdBinding: item.holdBinding?.behaviorId !== undefined && item.holdBinding.behaviorId >= 0
                ? item.holdBinding
                : fallbackBinding,
              tapBinding: item.tapBinding?.behaviorId !== undefined && item.tapBinding.behaviorId >= 0
                ? item.tapBinding
                : fallbackBinding,
            }
          : null
      );
    } else if (subTab === "tap_dance") {
      const item = tapDances.find((t) => t.index === selectedSlot);
      setTdDraft(
        item
          ? {
              ...item,
              bindings: item.bindings.map((b) => ({ ...b })),
            }
          : null
      );
    } else {
      const item = macros.find((m) => m.index === selectedSlot);
      setMacDraft(
        item
          ? {
              ...item,
              steps: item.steps.map((s) => ({
                ...s,
                binding: s.binding ? { ...s.binding } : undefined,
              })),
            }
          : null
      );
    }
  }, [subTab, selectedSlot, holdTaps, tapDances, macros, fallbackBinding]);

  if (!capabilities) return null;

  const slotCount =
    subTab === "hold_tap"
      ? capabilities.maxHoldTaps
      : subTab === "tap_dance"
      ? capabilities.maxTapDances
      : capabilities.maxMacros;

  const selectSubTab = (tab: SubTab) => {
    setSubTab(tab);
    setSelectedSlot(0);
  };

  const handleSaveFlash = async () => {
    setBusy(true);
    setStatusMsg(null);
    try {
      await saveAllGremlinToFlash();
      setStatusMsg("Saved dynamic behaviors to NVS flash.");
    } catch (e) {
      setStatusMsg(`Save error: ${e instanceof Error ? e.message : String(e)}`);
    } finally {
      setBusy(false);
    }
  };

  const applyHoldTap = async () => {
    if (!conn || !htDraft) return;
    setBusy(true);
    setStatusMsg(null);
    try {
      await rpcSetHoldTap(conn, htDraft);
      const updated = await rpcGetHoldTap(conn, htDraft.index);
      setHoldTaps((prev) => prev.map((h) => (h.index === updated.index ? updated : h)));
      setGremlinUnsaved(true);
      setStatusMsg(`Applied Gremlin Hold ${htDraft.index + 1} (&gh_${htDraft.index}) live.`);
    } catch (e) {
      setStatusMsg(`Error: ${e instanceof Error ? e.message : String(e)}`);
    } finally {
      setBusy(false);
    }
  };

  const applyTapDance = async () => {
    if (!conn || !tdDraft) return;
    setBusy(true);
    setStatusMsg(null);
    try {
      await rpcSetTapDance(conn, tdDraft);
      const updated = await rpcGetTapDance(conn, tdDraft.index);
      setTapDances((prev) => prev.map((t) => (t.index === updated.index ? updated : t)));
      setGremlinUnsaved(true);
      setStatusMsg(
        `Applied Gremlin TapDance ${tdDraft.index + 1} (&gtd_${tdDraft.index}) live.`
      );
    } catch (e) {
      setStatusMsg(`Error: ${e instanceof Error ? e.message : String(e)}`);
    } finally {
      setBusy(false);
    }
  };

  const applyMacro = async () => {
    if (!conn || !macDraft) return;
    setBusy(true);
    setStatusMsg(null);
    try {
      await rpcSetMacro(conn, macDraft);
      const updated = await rpcGetMacro(conn, macDraft.index);
      setMacros((prev) => prev.map((m) => (m.index === updated.index ? updated : m)));
      setGremlinUnsaved(true);
      setStatusMsg(`Applied Gremlin Macro ${macDraft.index + 1} (&gmac_${macDraft.index}) live.`);
    } catch (e) {
      setStatusMsg(`Error: ${e instanceof Error ? e.message : String(e)}`);
    } finally {
      setBusy(false);
    }
  };

  const behList = Object.values(sharedDevice.behaviors);

  return (
    <div className="grid grid-cols-[270px_1fr] h-full min-h-0 bg-base-300 text-base-content">
      {/* Sidebar */}
      <div className="bg-base-200 border-r border-base-300 flex flex-col min-h-0">
        <div className="p-2 grid grid-cols-3 gap-1 border-b border-base-300">
          {(
            [
              ["hold_tap", "Hold-Tap"],
              ["tap_dance", "Tap-Dance"],
              ["macro", "Macros"],
            ] as [SubTab, string][]
          ).map(([id, label]) => (
            <button
              key={id}
              onClick={() => selectSubTab(id)}
              className={`py-1.5 px-2 rounded text-sm font-medium ${
                subTab === id
                  ? "bg-primary text-primary-content"
                  : "bg-base-100 hover:bg-base-300"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="p-2 flex items-center justify-between text-sm border-b border-base-300">
          <span className="opacity-75">{slotCount} slots available</span>
          <button
            onClick={() => loadBehaviors()}
            disabled={loadingSection === "behaviors"}
            className="px-2 py-0.5 rounded bg-base-300 hover:bg-primary hover:text-primary-content"
          >
            Refresh
          </button>
        </div>

        <div className="overflow-y-auto flex-1 p-2 flex flex-col gap-1">
          {subTab === "hold_tap" &&
            holdTaps.map((h) => {
              const displayName = `Gremlin Hold ${h.index + 1}`;
              const used = usageMap[displayName];
              const isSel = h.index === selectedSlot;
              return (
                <button
                  key={h.index}
                  onClick={() => setSelectedSlot(h.index)}
                  className={`text-left p-2 rounded border ${
                    isSel
                      ? "bg-primary text-primary-content border-primary"
                      : "bg-base-100 hover:bg-base-300 border-transparent"
                  }`}
                >
                  <div className="flex justify-between items-center text-sm font-medium">
                    <span>{displayName}</span>
                    <span className="text-sm opacity-75">{h.enabled ? "ON" : "OFF"}</span>
                  </div>
                  <div className="text-sm opacity-75 truncate">
                    {h.enabled
                      ? `H: ${formatZmkBinding(h.holdBinding, sharedDevice.behaviors)} | T: ${formatZmkBinding(h.tapBinding, sharedDevice.behaviors)}`
                      : "Not configured"}
                  </div>
                  {used && (
                    <div className="text-sm text-accent truncate">
                      Bound: {used.join(", ")}
                    </div>
                  )}
                </button>
              );
            })}

          {subTab === "tap_dance" &&
            tapDances.map((t) => {
              const displayName = `Gremlin TapDance ${t.index + 1}`;
              const used = usageMap[displayName];
              const isSel = t.index === selectedSlot;
              return (
                <button
                  key={t.index}
                  onClick={() => setSelectedSlot(t.index)}
                  className={`text-left p-2 rounded border ${
                    isSel
                      ? "bg-primary text-primary-content border-primary"
                      : "bg-base-100 hover:bg-base-300 border-transparent"
                  }`}
                >
                  <div className="flex justify-between items-center text-sm font-medium">
                    <span>{displayName}</span>
                    <span className="text-sm opacity-75">{t.enabled ? "ON" : "OFF"}</span>
                  </div>
                  <div className="text-sm opacity-75 truncate">
                    {t.enabled ? `${t.bindings.length} tap actions` : "Not configured"}
                  </div>
                  {used && (
                    <div className="text-sm text-accent truncate">
                      Bound: {used.join(", ")}
                    </div>
                  )}
                </button>
              );
            })}

          {subTab === "macro" &&
            macros.map((m) => {
              const displayName = `Gremlin Macro ${m.index + 1}`;
              const used = usageMap[displayName];
              const isSel = m.index === selectedSlot;
              return (
                <button
                  key={m.index}
                  onClick={() => setSelectedSlot(m.index)}
                  className={`text-left p-2 rounded border ${
                    isSel
                      ? "bg-primary text-primary-content border-primary"
                      : "bg-base-100 hover:bg-base-300 border-transparent"
                  }`}
                >
                  <div className="flex justify-between items-center text-sm font-medium">
                    <span>{displayName}</span>
                    <span className="text-sm opacity-75">{m.enabled ? "ON" : "OFF"}</span>
                  </div>
                  <div className="text-sm opacity-75 truncate">
                    {m.enabled ? `${m.steps.length} steps` : "Not configured"}
                  </div>
                  {used && (
                    <div className="text-sm text-accent truncate">
                      Bound: {used.join(", ")}
                    </div>
                  )}
                </button>
              );
            })}
        </div>
      </div>

      {/* Main Editor */}
      <div className="overflow-y-auto p-5 flex flex-col gap-4 min-h-0">
        {statusMsg && (
          <div className="px-4 py-2 rounded bg-base-200 border border-primary/40 text-sm">
            {statusMsg}
          </div>
        )}

        {/* HOLD-TAP EDITOR */}
        {subTab === "hold_tap" && htDraft && (
          <>
            <div className="bg-base-100 p-4 rounded-lg shadow-sm flex flex-wrap justify-between items-center gap-3">
              <div>
                <div className="text-lg font-semibold">
                  Gremlin Hold {htDraft.index + 1} (&amp;gh_{htDraft.index})
                </div>
                <div className="text-sm opacity-75">
                  Bind &ldquo;Gremlin Hold {htDraft.index + 1}&rdquo; in the Keymap tab to assign
                  this Hold-Tap action to any key.
                </div>
              </div>
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input
                    type="checkbox"
                    checked={htDraft.enabled}
                    onChange={(e) => setHtDraft({ ...htDraft, enabled: e.target.checked })}
                    className="w-4 h-4 accent-primary"
                  />
                  <span>Enabled</span>
                </label>
                <button
                  onClick={applyHoldTap}
                  disabled={busy}
                  className="px-3 py-1.5 rounded bg-primary text-primary-content text-sm font-medium"
                >
                  Apply Hold-Tap Live
                </button>
                <button
                  onClick={handleSaveFlash}
                  disabled={busy}
                  className="px-3 py-1.5 rounded bg-accent text-black text-sm font-medium"
                >
                  Save Flash
                </button>
              </div>
            </div>

            <div className="bg-base-100 p-4 rounded-lg shadow-sm grid grid-cols-2 lg:grid-cols-5 gap-3">
              <label className="flex flex-col gap-1 text-sm">
                <span>Flavor</span>
                <select
                  value={htDraft.flavor}
                  onChange={(e) =>
                    setHtDraft({
                      ...htDraft,
                      flavor: parseInt(e.target.value, 10) as HoldTapFlavor,
                    })
                  }
                  className="p-1.5 rounded bg-base-200 border border-base-300"
                >
                  <option value={HoldTapFlavor.HOLD_TAP_FLAVOR_HOLD_PREFERRED}>
                    Hold Preferred
                  </option>
                  <option value={HoldTapFlavor.HOLD_TAP_FLAVOR_BALANCED}>Balanced</option>
                  <option value={HoldTapFlavor.HOLD_TAP_FLAVOR_TAP_PREFERRED}>
                    Tap Preferred
                  </option>
                </select>
              </label>

              <label className="flex flex-col gap-1 text-sm">
                <span>Tapping Term (ms)</span>
                <input
                  type="number"
                  min={50}
                  max={2000}
                  value={htDraft.tappingTermMs}
                  onChange={(e) =>
                    setHtDraft({
                      ...htDraft,
                      tappingTermMs: parseInt(e.target.value, 10) || 200,
                    })
                  }
                  className="p-1.5 rounded bg-base-200 border border-base-300"
                />
              </label>

              <label className="flex flex-col gap-1 text-sm">
                <span>Quick Tap (ms, 0=off)</span>
                <input
                  type="number"
                  min={0}
                  max={2000}
                  value={htDraft.quickTapMs}
                  onChange={(e) =>
                    setHtDraft({
                      ...htDraft,
                      quickTapMs: parseInt(e.target.value, 10) || 0,
                    })
                  }
                  className="p-1.5 rounded bg-base-200 border border-base-300"
                />
              </label>

              <label className="flex flex-col gap-1 text-sm">
                <span>Prior Idle (ms, 0=off)</span>
                <input
                  type="number"
                  min={0}
                  max={2000}
                  value={htDraft.requirePriorIdleMs}
                  onChange={(e) =>
                    setHtDraft({
                      ...htDraft,
                      requirePriorIdleMs: parseInt(e.target.value, 10) || 0,
                    })
                  }
                  className="p-1.5 rounded bg-base-200 border border-base-300"
                />
              </label>

              <label className="flex items-center gap-2 text-sm cursor-pointer self-end pb-1.5">
                <input
                  type="checkbox"
                  checked={htDraft.retroTap}
                  onChange={(e) => setHtDraft({ ...htDraft, retroTap: e.target.checked })}
                  className="w-4 h-4 accent-primary"
                />
                <span>Retro-Tap</span>
              </label>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div className="bg-base-100 p-4 rounded-lg shadow-sm">
                <div className="font-semibold text-base mb-2">
                  Hold Action ({formatZmkBinding(htDraft.holdBinding, sharedDevice.behaviors)})
                </div>
                <BehaviorBindingPicker
                  binding={htDraft.holdBinding ?? fallbackBinding}
                  behaviors={behList}
                  layers={layers}
                  onBindingChanged={(b) => setHtDraft({ ...htDraft, holdBinding: b })}
                />
              </div>
              <div className="bg-base-100 p-4 rounded-lg shadow-sm">
                <div className="font-semibold text-base mb-2">
                  Tap Action ({formatZmkBinding(htDraft.tapBinding, sharedDevice.behaviors)})
                </div>
                <BehaviorBindingPicker
                  binding={htDraft.tapBinding ?? fallbackBinding}
                  behaviors={behList}
                  layers={layers}
                  onBindingChanged={(b) => setHtDraft({ ...htDraft, tapBinding: b })}
                />
              </div>
            </div>
          </>
        )}

        {/* TAP-DANCE EDITOR */}
        {subTab === "tap_dance" && tdDraft && (
          <>
            <div className="bg-base-100 p-4 rounded-lg shadow-sm flex flex-wrap justify-between items-center gap-3">
              <div>
                <div className="text-lg font-semibold">
                  Gremlin TapDance {tdDraft.index + 1} (&amp;gtd_{tdDraft.index})
                </div>
                <div className="text-sm opacity-75">
                  Multi-tap actions on a single key (e.g. 1 tap, 2 taps, 3 taps, 4 taps).
                </div>
              </div>
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input
                    type="checkbox"
                    checked={tdDraft.enabled}
                    onChange={(e) => setTdDraft({ ...tdDraft, enabled: e.target.checked })}
                    className="w-4 h-4 accent-primary"
                  />
                  <span>Enabled</span>
                </label>
                <button
                  onClick={applyTapDance}
                  disabled={busy || (tdDraft.enabled && tdDraft.bindings.length === 0)}
                  className="px-3 py-1.5 rounded bg-primary text-primary-content text-sm font-medium disabled:opacity-50"
                >
                  Apply Tap-Dance Live
                </button>
                <button
                  onClick={handleSaveFlash}
                  disabled={busy}
                  className="px-3 py-1.5 rounded bg-accent text-black text-sm font-medium"
                >
                  Save Flash
                </button>
              </div>
            </div>

            <div className="bg-base-100 p-4 rounded-lg shadow-sm flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm">
                <span>Tapping Term (ms):</span>
                <input
                  type="number"
                  min={50}
                  max={2000}
                  value={tdDraft.tappingTermMs}
                  onChange={(e) =>
                    setTdDraft({
                      ...tdDraft,
                      tappingTermMs: parseInt(e.target.value, 10) || 200,
                    })
                  }
                  className="p-1.5 rounded bg-base-200 border border-base-300 w-24"
                />
              </label>
              <button
                type="button"
                disabled={tdDraft.bindings.length >= (capabilities.maxTapDanceSteps || 4)}
                onClick={() =>
                  setTdDraft({
                    ...tdDraft,
                    bindings: [...tdDraft.bindings, { ...fallbackBinding }],
                  })
                }
                className="px-3 py-1.5 rounded bg-base-200 hover:bg-base-300 text-sm disabled:opacity-50"
              >
                + Add Tap Step
              </button>
            </div>

            <div className="flex flex-col gap-3">
              {tdDraft.bindings.map((b, i) => (
                <div key={i} className="bg-base-100 p-4 rounded-lg shadow-sm">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold text-base">
                      {i + 1}x Tap ({formatZmkBinding(b, sharedDevice.behaviors)})
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        setTdDraft({
                          ...tdDraft,
                          bindings: tdDraft.bindings.filter((_, idx) => idx !== i),
                        })
                      }
                      className="px-2 py-0.5 rounded bg-base-200 hover:bg-red-500/20 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                  <BehaviorBindingPicker
                    binding={b}
                    behaviors={behList}
                    layers={layers}
                    onBindingChanged={(nb) =>
                      setTdDraft({
                        ...tdDraft,
                        bindings: tdDraft.bindings.map((old, idx) =>
                          idx === i ? nb : old
                        ),
                      })
                    }
                  />
                </div>
              ))}
            </div>
          </>
        )}

        {/* MACRO EDITOR */}
        {subTab === "macro" && macDraft && (
          <>
            <div className="bg-base-100 p-4 rounded-lg shadow-sm flex flex-wrap justify-between items-center gap-3">
              <div>
                <div className="text-lg font-semibold">
                  Gremlin Macro {macDraft.index + 1} (&amp;gmac_{macDraft.index})
                </div>
                <div className="text-sm opacity-75">
                  Build multi-step key sequences, chords (Press + Tap + Release), and delays.
                </div>
              </div>
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input
                    type="checkbox"
                    checked={macDraft.enabled}
                    onChange={(e) => setMacDraft({ ...macDraft, enabled: e.target.checked })}
                    className="w-4 h-4 accent-primary"
                  />
                  <span>Enabled</span>
                </label>
                <button
                  onClick={applyMacro}
                  disabled={busy}
                  className="px-3 py-1.5 rounded bg-primary text-primary-content text-sm font-medium"
                >
                  Apply Macro Live
                </button>
                <button
                  onClick={handleSaveFlash}
                  disabled={busy}
                  className="px-3 py-1.5 rounded bg-accent text-black text-sm font-medium"
                >
                  Save Flash
                </button>
              </div>
            </div>

            <div className="bg-base-100 p-4 rounded-lg shadow-sm flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-4 text-sm">
                <label className="flex items-center gap-2">
                  <span>Wait (ms):</span>
                  <input
                    type="number"
                    min={0}
                    max={5000}
                    value={macDraft.waitMs}
                    onChange={(e) =>
                      setMacDraft({ ...macDraft, waitMs: parseInt(e.target.value, 10) || 0 })
                    }
                    className="p-1.5 rounded bg-base-200 border border-base-300 w-20"
                  />
                </label>
                <label className="flex items-center gap-2">
                  <span>Tap (ms):</span>
                  <input
                    type="number"
                    min={0}
                    max={5000}
                    value={macDraft.tapMs}
                    onChange={(e) =>
                      setMacDraft({ ...macDraft, tapMs: parseInt(e.target.value, 10) || 0 })
                    }
                    className="p-1.5 rounded bg-base-200 border border-base-300 w-20"
                  />
                </label>
              </div>
              <div className="flex flex-wrap gap-2">
                {(
                  [
                    [MacroStepType.MACRO_STEP_TAP, "+ Tap"],
                    [MacroStepType.MACRO_STEP_PRESS, "+ Press"],
                    [MacroStepType.MACRO_STEP_RELEASE, "+ Release"],
                    [MacroStepType.MACRO_STEP_WAIT_MS, "+ Wait ms"],
                  ] as [MacroStepType, string][]
                ).map(([type, label]) => (
                  <button
                    key={type}
                    type="button"
                    disabled={macDraft.steps.length >= (capabilities.maxMacroSteps || 12)}
                    onClick={() => {
                      const nextStep: MacroStep =
                        type === MacroStepType.MACRO_STEP_WAIT_MS
                          ? { type, binding: undefined, delayMs: 50 }
                          : { type, binding: { ...fallbackBinding }, delayMs: 0 };
                      setMacDraft({ ...macDraft, steps: [...macDraft.steps, nextStep] });
                    }}
                    className="px-2.5 py-1 rounded bg-base-200 hover:bg-base-300 text-sm disabled:opacity-50"
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3">
              {macDraft.steps.map((step, idx) => (
                <div key={idx} className="bg-base-100 p-4 rounded-lg shadow-sm flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="font-semibold text-sm">Step {idx + 1}</span>
                      <select
                        value={step.type}
                        onChange={(e) => {
                          const t = parseInt(e.target.value, 10) as MacroStepType;
                          const next = macDraft.steps.map((old, i) =>
                            i === idx
                              ? {
                                  ...old,
                                  type: t,
                                  binding:
                                    t === MacroStepType.MACRO_STEP_WAIT_MS
                                      ? undefined
                                      : old.binding ?? { ...fallbackBinding },
                                }
                              : old
                          );
                          setMacDraft({ ...macDraft, steps: next });
                        }}
                        className="p-1 rounded bg-base-200 border border-base-300 text-sm"
                      >
                        <option value={MacroStepType.MACRO_STEP_TAP}>Tap</option>
                        <option value={MacroStepType.MACRO_STEP_PRESS}>Press (Hold)</option>
                        <option value={MacroStepType.MACRO_STEP_RELEASE}>Release</option>
                        <option value={MacroStepType.MACRO_STEP_WAIT_MS}>Wait (ms)</option>
                      </select>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        type="button"
                        disabled={idx === 0}
                        onClick={() => {
                          const next = [...macDraft.steps];
                          [next[idx - 1], next[idx]] = [next[idx], next[idx - 1]];
                          setMacDraft({ ...macDraft, steps: next });
                        }}
                        className="px-2 py-0.5 rounded bg-base-200 text-sm disabled:opacity-40"
                      >
                        Up
                      </button>
                      <button
                        type="button"
                        disabled={idx === macDraft.steps.length - 1}
                        onClick={() => {
                          const next = [...macDraft.steps];
                          [next[idx], next[idx + 1]] = [next[idx + 1], next[idx]];
                          setMacDraft({ ...macDraft, steps: next });
                        }}
                        className="px-2 py-0.5 rounded bg-base-200 text-sm disabled:opacity-40"
                      >
                        Down
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setMacDraft({
                            ...macDraft,
                            steps: macDraft.steps.filter((_, i) => i !== idx),
                          })
                        }
                        className="px-2 py-0.5 rounded bg-base-200 hover:bg-red-500/20 text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>

                  {step.type === MacroStepType.MACRO_STEP_WAIT_MS ? (
                    <label className="flex items-center gap-2 text-sm">
                      <span>Delay Duration (ms):</span>
                      <input
                        type="number"
                        min={1}
                        max={10000}
                        value={step.delayMs}
                        onChange={(e) => {
                          const ms = parseInt(e.target.value, 10) || 1;
                          setMacDraft({
                            ...macDraft,
                            steps: macDraft.steps.map((old, i) =>
                              i === idx ? { ...old, delayMs: ms } : old
                            ),
                          });
                        }}
                        className="p-1.5 rounded bg-base-200 border border-base-300 w-28"
                      />
                    </label>
                  ) : (
                    <BehaviorBindingPicker
                      binding={step.binding ?? fallbackBinding}
                      behaviors={behList}
                      layers={layers}
                      onBindingChanged={(nb) =>
                        setMacDraft({
                          ...macDraft,
                          steps: macDraft.steps.map((old, i) =>
                            i === idx ? { ...old, binding: nb } : old
                          ),
                        })
                      }
                    />
                  )}
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

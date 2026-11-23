import { useContext, useEffect, useRef, useState } from "react";
import { ConnectionContext } from "../rpc/ConnectionContext";
import { LockStateContext } from "../rpc/LockStateContext";
import { LockState } from "@zmkfirmware/zmk-studio-ts-client/core";
import {
  StickConfig,
  StickLayerConfig,
  StickMode,
  StickTelemetry,
} from "@zmkfirmware/zmk-studio-ts-client/gremlin";
import {
  formatPositionLabel,
  GREMLIN_POSITIONS,
  rpcGetStickConfig,
  rpcGetStickLayerConfig,
  rpcGetStickTelemetry,
  rpcSetStickConfig,
  rpcSetStickLayerConfig,
} from "./gremlinRpc";
import { useGremlin } from "./GremlinContext";

type WizardStep = "idle" | "center" | "sweep" | "review";

interface CalibrationCollector {
  centerSamplesX: number[];
  centerSamplesY: number[];
  obsXMin: number;
  obsXMax: number;
  obsYMin: number;
  obsYMax: number;
  sectorsHit: boolean[];
  xCenter: number;
  yCenter: number;
  recommendedDeadzone: number;
}

const SECTOR_NAMES = ["E", "NE", "N", "NW", "W", "SW", "S", "SE"];

export const AnalogStickPanel = ({ isActiveTab }: { isActiveTab: boolean }) => {
  const { conn } = useContext(ConnectionContext);
  const lockState = useContext(LockStateContext);
  const {
    capabilities,
    stickConfig,
    setStickConfig,
    stickLayers,
    setStickLayers,
    loadStick,
    sharedDevice,
    setGremlinUnsaved,
    saveAllGremlinToFlash,
  } = useGremlin();

  const [calDraft, setCalDraft] = useState<StickConfig | null>(null);
  const [layerDrafts, setLayerDrafts] = useState<StickLayerConfig[]>([]);
  const [telemetry, setTelemetry] = useState<StickTelemetry | null>(null);
  const [pollEnabled, setPollEnabled] = useState(true);
  const [wizardStep, setWizardStep] = useState<WizardStep>("idle");
  const [calBeforeWizard, setCalBeforeWizard] = useState<StickConfig | null>(null);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const collectorRef = useRef<CalibrationCollector>({
    centerSamplesX: [],
    centerSamplesY: [],
    obsXMin: 4095,
    obsXMax: 0,
    obsYMin: 4095,
    obsYMax: 0,
    sectorsHit: Array(8).fill(false),
    xCenter: 2048,
    yCenter: 2048,
    recommendedDeadzone: 18,
  });
  const [wizardTick, setWizardTick] = useState(0);

  const isUnlocked = lockState === LockState.ZMK_STUDIO_CORE_LOCK_STATE_UNLOCKED;

  useEffect(() => {
    if (isUnlocked && capabilities && !stickConfig) {
      loadStick();
    }
  }, [isUnlocked, capabilities, stickConfig, loadStick]);

  useEffect(() => {
    if (stickConfig) setCalDraft({ ...stickConfig });
  }, [stickConfig]);

  useEffect(() => {
    setLayerDrafts(stickLayers.map((l) => ({ ...l })));
  }, [stickLayers]);

  /* Telemetry poller active ONLY when viewing Analog Stick tab */
  useEffect(() => {
    if (!conn || !isUnlocked || !capabilities || !isActiveTab || !pollEnabled) {
      return;
    }

    let stopped = false;
    let timerId: number | undefined;

    const tick = async () => {
      if (stopped || !conn) return;
      try {
        const tel = await rpcGetStickTelemetry(conn);
        if (stopped) return;
        setTelemetry(tel);

        const col = collectorRef.current;
        if (wizardStep === "center") {
          col.centerSamplesX.push(tel.rawX);
          col.centerSamplesY.push(tel.rawY);
          setWizardTick((n) => n + 1);
          if (col.centerSamplesX.length >= 25) {
            const avgX = Math.round(
              col.centerSamplesX.reduce((a, b) => a + b, 0) / col.centerSamplesX.length
            );
            const avgY = Math.round(
              col.centerSamplesY.reduce((a, b) => a + b, 0) / col.centerSamplesY.length
            );
            const maxJitter = Math.max(
              ...col.centerSamplesX.map((v) => Math.abs(v - avgX)),
              ...col.centerSamplesY.map((v) => Math.abs(v - avgY))
            );
            col.xCenter = avgX;
            col.yCenter = avgY;
            col.obsXMin = avgX;
            col.obsXMax = avgX;
            col.obsYMin = avgY;
            col.obsYMax = avgY;
            col.sectorsHit = Array(8).fill(false);
            col.recommendedDeadzone = Math.min(35, Math.max(12, Math.ceil(maxJitter / 25) + 10));
            setWizardStep("sweep");
          }
        } else if (wizardStep === "sweep") {
          col.obsXMin = Math.min(col.obsXMin, tel.rawX);
          col.obsXMax = Math.max(col.obsXMax, tel.rawX);
          col.obsYMin = Math.min(col.obsYMin, tel.rawY);
          col.obsYMax = Math.max(col.obsYMax, tel.rawY);

          const dx = tel.rawX - col.xCenter;
          const dy = tel.rawY - col.yCenter;
          const dist = Math.hypot(dx, dy);
          if (dist > 450) {
            let angle = Math.atan2(-dy, dx);
            if (angle < 0) angle += Math.PI * 2;
            const sector = Math.floor(((angle + Math.PI / 8) % (Math.PI * 2)) / (Math.PI / 4));
            col.sectorsHit[sector] = true;
          }
          setWizardTick((n) => n + 1);
        }
      } catch {
        /* ignore transient poll error */
      }
      if (!stopped) {
        timerId = window.setTimeout(tick, 55);
      }
    };

    tick();
    return () => {
      stopped = true;
      if (timerId !== undefined) window.clearTimeout(timerId);
    };
  }, [conn, isUnlocked, capabilities, isActiveTab, pollEnabled, wizardStep]);

  if (!capabilities) return null;

  const startGuidedCalibration = () => {
    if (calDraft) {
      setCalBeforeWizard({ ...calDraft });
    }
    collectorRef.current = {
      centerSamplesX: [],
      centerSamplesY: [],
      obsXMin: 4095,
      obsXMax: 0,
      obsYMin: 4095,
      obsYMax: 0,
      sectorsHit: Array(8).fill(false),
      xCenter: calDraft?.xCenter ?? 2048,
      yCenter: calDraft?.yCenter ?? 2048,
      recommendedDeadzone: calDraft?.deadzonePercent ?? 18,
    };
    setPollEnabled(true);
    setStatusMsg(null);
    setWizardStep("center");
  };

  const applyCalibration = async (cfg: StickConfig) => {
    if (!conn) return;
    setBusy(true);
    setStatusMsg(null);
    try {
      await rpcSetStickConfig(conn, cfg);
      const refreshed = await rpcGetStickConfig(conn);
      setStickConfig(refreshed);
      setGremlinUnsaved(true);
      setStatusMsg("Applied analog stick calibration live.");
    } catch (e) {
      setStatusMsg(`Calibration error: ${e instanceof Error ? e.message : String(e)}`);
    } finally {
      setBusy(false);
    }
  };

  const finishSweep = async () => {
    const col = collectorRef.current;
    if (!calDraft) return;
    const candidate: StickConfig = {
      ...calDraft,
      xMin: Math.min(col.obsXMin, col.xCenter - 200),
      xCenter: col.xCenter,
      xMax: Math.max(col.obsXMax, col.xCenter + 200),
      yMin: Math.min(col.obsYMin, col.yCenter - 200),
      yCenter: col.yCenter,
      yMax: Math.max(col.obsYMax, col.yCenter + 200),
      deadzonePercent: col.recommendedDeadzone,
    };
    setCalDraft(candidate);
    await applyCalibration(candidate);
    setWizardStep("review");
  };

  const cancelWizard = async () => {
    if (calBeforeWizard) {
      setCalDraft(calBeforeWizard);
      await applyCalibration(calBeforeWizard);
    }
    setWizardStep("idle");
  };

  const applyLayerConfig = async (cfg: StickLayerConfig) => {
    if (!conn) return;
    setBusy(true);
    setStatusMsg(null);
    try {
      await rpcSetStickLayerConfig(conn, cfg);
      const updated = await rpcGetStickLayerConfig(conn, cfg.layerIndex);
      setStickLayers((prev) =>
        prev.map((l) => (l.layerIndex === updated.layerIndex ? updated : l))
      );
      setGremlinUnsaved(true);
      setStatusMsg(`Applied Stick Layer ${cfg.layerIndex} settings live.`);
    } catch (e) {
      setStatusMsg(`Layer error: ${e instanceof Error ? e.message : String(e)}`);
    } finally {
      setBusy(false);
    }
  };

  const handleSaveFlash = async () => {
    setBusy(true);
    setStatusMsg(null);
    try {
      await saveAllGremlinToFlash();
      setStatusMsg("Saved stick calibration and layer tuning to flash.");
      setWizardStep("idle");
    } catch (e) {
      setStatusMsg(`Save error: ${e instanceof Error ? e.message : String(e)}`);
    } finally {
      setBusy(false);
    }
  };

  /* SVG coordinates (center 110,110, radius 90 for -100..+100) */
  const outX = telemetry?.outX ?? 0;
  const outY = telemetry?.outY ?? 0;
  const normPx = 110 + (outX / 100) * 90;
  const normPy = 110 + (outY / 100) * 90;
  const dzR = ((calDraft?.deadzonePercent ?? 20) / 100) * 90;
  const col = collectorRef.current;

  return (
    <div className="overflow-y-auto h-full bg-base-300 text-base-content p-5 flex flex-col gap-5">
      {statusMsg && (
        <div className="px-4 py-2 rounded bg-base-100 border border-primary/40 text-sm">
          {statusMsg}
        </div>
      )}

      {/* TOP SECTION: Calibration & Telemetry */}
      <div className="grid grid-cols-1 xl:grid-cols-[360px_1fr] gap-5">
        {/* Live Crosshair & Wizard Visualizer */}
        <div className="bg-base-100 p-4 rounded-lg shadow-sm flex flex-col items-center gap-3">
          <div className="w-full flex items-center justify-between">
            <span className="font-semibold text-base">Live Stick Telemetry</span>
            <label className="flex items-center gap-1.5 text-sm cursor-pointer">
              <input
                type="checkbox"
                checked={pollEnabled}
                onChange={(e) => setPollEnabled(e.target.checked)}
                className="accent-primary"
              />
              <span>Live Poll</span>
            </label>
          </div>

          <svg width={220} height={220} viewBox="0 0 220 220" className="bg-base-200 rounded-full border border-base-300">
            <line x1={110} y1={10} x2={110} y2={210} stroke="currentColor" strokeOpacity={0.2} />
            <line x1={10} y1={110} x2={210} y2={110} stroke="currentColor" strokeOpacity={0.2} />
            <circle cx={110} cy={110} r={90} fill="none" stroke="currentColor" strokeOpacity={0.25} />
            <circle
              cx={110}
              cy={110}
              r={dzR}
              fill="rgba(234, 179, 8, 0.14)"
              stroke="rgba(234, 179, 8, 0.75)"
              strokeDasharray="4 3"
            />
            {wizardStep === "sweep" &&
              SECTOR_NAMES.map((label, s) => {
                const ang = -(s * Math.PI) / 4;
                const sx = 110 + Math.cos(ang) * 98;
                const sy = 110 + Math.sin(ang) * 98;
                return (
                  <circle
                    key={label}
                    cx={sx}
                    cy={sy}
                    r={6}
                    fill={col.sectorsHit[s] ? "#22c55e" : "rgba(148,163,184,0.45)"}
                  />
                );
              })}
            <circle cx={normPx} cy={normPy} r={8} fill="#22c55e" stroke="#facc15" strokeWidth={2.5} />
          </svg>

          <div className="w-full grid grid-cols-2 gap-2 text-sm bg-base-200 p-2.5 rounded">
            <div>Raw X / Y: {telemetry ? `${telemetry.rawX} / ${telemetry.rawY}` : "—"}</div>
            <div>Out X / Y: {telemetry ? `${telemetry.outX} / ${telemetry.outY}` : "—"}</div>
            <div>
              Active Layer:{" "}
              {telemetry
                ? sharedDevice.keymap?.layers[telemetry.activeLayer]?.name ||
                  `Layer ${telemetry.activeLayer}`
                : "—"}
            </div>
            <div className="flex items-center gap-1.5">
              <span>L3 Click:</span>
              <span
                className={`px-2 py-0.5 rounded font-medium ${
                  telemetry?.l3Pressed ? "bg-accent text-black" : "bg-base-300"
                }`}
              >
                {telemetry?.l3Pressed ? "PRESSED" : "Open"}
              </span>
            </div>
          </div>
        </div>

        {/* Calibration Wizard + Fine Controls */}
        <div className="bg-base-100 p-4 rounded-lg shadow-sm flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h2 className="text-lg font-semibold">Joystick Calibration</h2>
              <div className="text-sm opacity-75">
                Console-style guided calibration sets neutral rest center, 360° physical min/max
                bounds, and recommended deadzone.
              </div>
            </div>
            <div className="flex gap-2">
              {wizardStep === "idle" && (
                <button
                  onClick={startGuidedCalibration}
                  className="px-3 py-1.5 rounded bg-primary text-primary-content text-sm font-medium"
                >
                  Start Guided Calibration
                </button>
              )}
              <button
                onClick={handleSaveFlash}
                disabled={busy}
                className="px-3 py-1.5 rounded bg-accent text-black text-sm font-medium"
              >
                Save Flash
              </button>
            </div>
          </div>

          {wizardStep === "center" && (
            <div className="p-4 rounded bg-primary/10 border border-primary flex flex-col gap-2">
              <div className="font-semibold text-base">
                Step 1 of 3: Release Stick — Sampling Neutral Center...
              </div>
              <div className="text-sm">
                Do not touch the thumbstick. Collected {col.centerSamplesX.length}/25 samples (
                {wizardTick > 0 ? "measuring..." : "starting"})
              </div>
              <div className="w-full bg-base-300 rounded h-2 overflow-hidden">
                <div
                  className="bg-primary h-full transition-all"
                  style={{ width: `${(col.centerSamplesX.length / 25) * 100}%` }}
                />
              </div>
              <div>
                <button
                  onClick={cancelWizard}
                  className="px-2.5 py-1 rounded bg-base-200 text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {wizardStep === "sweep" && (
            <div className="p-4 rounded bg-primary/10 border border-primary flex flex-col gap-3">
              <div className="font-semibold text-base">
                Step 2 of 3: Rotate Thumbstick Slowly Around Full Outer Edge (2-3 Circles)
              </div>
              <div className="text-sm">
                Observed Range: X [{col.obsXMin} .. {col.obsXMax}] (Center {col.xCenter}), Y [
                {col.obsYMin} .. {col.obsYMax}] (Center {col.yCenter})
              </div>
              <div className="text-sm">
                Sectors hit: {col.sectorsHit.filter(Boolean).length}/8 ({SECTOR_NAMES.filter((_, i) => col.sectorsHit[i]).join(", ") || "rotate stick..."})
              </div>
              <div className="flex gap-2">
                <button
                  onClick={finishSweep}
                  className="px-3 py-1.5 rounded bg-primary text-primary-content text-sm font-medium"
                >
                  Finish Sweep &amp; Test Live
                </button>
                <button
                  onClick={cancelWizard}
                  className="px-3 py-1.5 rounded bg-base-200 text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}

          {wizardStep === "review" && (
            <div className="p-4 rounded bg-accent/15 border border-accent flex flex-col gap-3">
              <div className="font-semibold text-base">
                Step 3 of 3: Calibration Applied Live — Verify Movement &amp; Deadzone
              </div>
              <div className="text-sm">
                Move the stick in circles and release to confirm the green dot centers cleanly inside
                the yellow deadzone ring.
              </div>
              <div className="flex gap-2">
                <button
                  onClick={handleSaveFlash}
                  disabled={busy}
                  className="px-3 py-1.5 rounded bg-accent text-black font-medium text-sm"
                >
                  Save Calibration to Flash
                </button>
                <button
                  onClick={cancelWizard}
                  disabled={busy}
                  className="px-3 py-1.5 rounded bg-base-200 text-sm"
                >
                  Revert
                </button>
                <button
                  onClick={() => setWizardStep("idle")}
                  className="px-3 py-1.5 rounded bg-base-200 text-sm"
                >
                  Keep Live (Don&apos;t Save Yet)
                </button>
              </div>
            </div>
          )}

          {/* Numeric Manual Calibration Fields */}
          {calDraft && (
            <div className="flex flex-col gap-3">
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 text-sm">
                {(
                  [
                    ["xMin", "X Min"],
                    ["xCenter", "X Center"],
                    ["xMax", "X Max"],
                    ["yMin", "Y Min"],
                    ["yCenter", "Y Center"],
                    ["yMax", "Y Max"],
                  ] as [keyof StickConfig, string][]
                ).map(([field, label]) => (
                  <label key={field} className="flex flex-col gap-1">
                    <span>{label}</span>
                    <input
                      type="number"
                      min={0}
                      max={4095}
                      value={calDraft[field] as number}
                      onChange={(e) =>
                        setCalDraft({
                          ...calDraft,
                          [field]: parseInt(e.target.value, 10) || 0,
                        })
                      }
                      className="p-1.5 rounded bg-base-200 border border-base-300"
                    />
                  </label>
                ))}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-base-300 text-sm">
                <label className="flex items-center gap-3 flex-1 min-w-[220px]">
                  <span>Deadzone: {calDraft.deadzonePercent}%</span>
                  <input
                    type="range"
                    min={0}
                    max={60}
                    value={calDraft.deadzonePercent}
                    onChange={(e) =>
                      setCalDraft({
                        ...calDraft,
                        deadzonePercent: parseInt(e.target.value, 10),
                      })
                    }
                    className="flex-1 accent-primary"
                  />
                </label>

                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={calDraft.invertX}
                    onChange={(e) => setCalDraft({ ...calDraft, invertX: e.target.checked })}
                    className="accent-primary"
                  />
                  <span>Invert X</span>
                </label>

                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={calDraft.invertY}
                    onChange={(e) => setCalDraft({ ...calDraft, invertY: e.target.checked })}
                    className="accent-primary"
                  />
                  <span>Invert Y</span>
                </label>

                <button
                  onClick={() => applyCalibration(calDraft)}
                  disabled={busy}
                  className="px-3 py-1.5 rounded bg-primary text-primary-content font-medium"
                >
                  Apply Calibration Live
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* BOTTOM SECTION: Per-Layer Stick Behavior */}
      <div className="bg-base-100 p-4 rounded-lg shadow-sm flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold">Per-Layer Analog Stick Tuning</h2>
            <div className="text-sm opacity-75">
              Customize whether each keymap layer uses the joystick as 4-way D-Pad Switches, Mouse
              Pointer, or Mouse Scroll Wheel.
            </div>
          </div>
          <button
            onClick={() => loadStick()}
            className="px-2.5 py-1 rounded bg-base-200 hover:bg-base-300 text-sm"
          >
            Reload From Device
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          {layerDrafts.map((l, idx) => {
            const layerName =
              sharedDevice.keymap?.layers[l.layerIndex]?.name || `Layer ${l.layerIndex}`;
            return (
              <div
                key={l.layerIndex}
                className="p-3 rounded bg-base-200 border border-base-300 flex flex-col gap-3"
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-base">
                    Layer {l.layerIndex}: {layerName}
                  </span>
                  <div className="flex items-center gap-2">
                    <select
                      value={l.mode}
                      onChange={(e) => {
                        const mode = parseInt(e.target.value, 10) as StickMode;
                        setLayerDrafts((prev) =>
                          prev.map((old, i) => (i === idx ? { ...old, mode } : old))
                        );
                      }}
                      className="p-1 rounded bg-base-100 border border-base-300 text-sm"
                    >
                      <option value={StickMode.STICK_MODE_SWITCH}>Switch (4-Way Keys)</option>
                      <option value={StickMode.STICK_MODE_MOUSE}>Mouse Pointer</option>
                      <option value={StickMode.STICK_MODE_SCROLL}>Scroll Wheel</option>
                    </select>
                    <button
                      onClick={() => applyLayerConfig(l)}
                      disabled={busy}
                      className="px-2.5 py-1 rounded bg-primary text-primary-content text-sm"
                    >
                      Apply
                    </button>
                  </div>
                </div>

                {l.mode === StickMode.STICK_MODE_SWITCH && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm">
                    <label className="flex flex-col gap-1">
                      <span>Activation %</span>
                      <input
                        type="number"
                        min={5}
                        max={95}
                        value={l.switchActivationPoint}
                        onChange={(e) =>
                          setLayerDrafts((prev) =>
                            prev.map((old, i) =>
                              i === idx
                                ? {
                                    ...old,
                                    switchActivationPoint: parseInt(e.target.value, 10) || 40,
                                  }
                                : old
                            )
                          )
                        }
                        className="p-1 rounded bg-base-100 border border-base-300"
                      />
                    </label>
                    <label className="flex flex-col gap-1">
                      <span>Hysteresis %</span>
                      <input
                        type="number"
                        min={0}
                        max={40}
                        value={l.switchHysteresis}
                        onChange={(e) =>
                          setLayerDrafts((prev) =>
                            prev.map((old, i) =>
                              i === idx
                                ? {
                                    ...old,
                                    switchHysteresis: parseInt(e.target.value, 10) || 0,
                                  }
                                : old
                            )
                          )
                        }
                        className="p-1 rounded bg-base-100 border border-base-300"
                      />
                    </label>
                    {(
                      [
                        ["upPosition", "Up Key Pos"],
                        ["downPosition", "Down Key Pos"],
                        ["leftPosition", "Left Key Pos"],
                        ["rightPosition", "Right Key Pos"],
                      ] as [keyof StickLayerConfig, string][]
                    ).map(([field, label]) => (
                      <label key={field} className="flex flex-col gap-1">
                        <span>{label}</span>
                        <select
                          value={l[field] as number}
                          onChange={(e) =>
                            setLayerDrafts((prev) =>
                              prev.map((old, i) =>
                                i === idx
                                  ? { ...old, [field]: parseInt(e.target.value, 10) }
                                  : old
                              )
                            )
                          }
                          className="p-1 rounded bg-base-100 border border-base-300"
                        >
                          {GREMLIN_POSITIONS.map((p) => (
                            <option key={p.pos} value={p.pos}>
                              [{p.pos}] {formatPositionLabel(p.pos)}
                            </option>
                          ))}
                        </select>
                      </label>
                    ))}
                  </div>
                )}

                {l.mode === StickMode.STICK_MODE_MOUSE && (
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <label className="flex flex-col gap-1">
                      <span>Mouse Min Speed (1-50)</span>
                      <input
                        type="number"
                        min={1}
                        max={50}
                        value={l.mouseMinSpeed}
                        onChange={(e) =>
                          setLayerDrafts((prev) =>
                            prev.map((old, i) =>
                              i === idx
                                ? {
                                    ...old,
                                    mouseMinSpeed: parseInt(e.target.value, 10) || 1,
                                  }
                                : old
                            )
                          )
                        }
                        className="p-1 rounded bg-base-100 border border-base-300"
                      />
                    </label>
                    <label className="flex flex-col gap-1">
                      <span>Mouse Max Speed (1-100)</span>
                      <input
                        type="number"
                        min={1}
                        max={100}
                        value={l.mouseMaxSpeed}
                        onChange={(e) =>
                          setLayerDrafts((prev) =>
                            prev.map((old, i) =>
                              i === idx
                                ? {
                                    ...old,
                                    mouseMaxSpeed: parseInt(e.target.value, 10) || 20,
                                  }
                                : old
                            )
                          )
                        }
                        className="p-1 rounded bg-base-100 border border-base-300"
                      />
                    </label>
                  </div>
                )}

                {l.mode === StickMode.STICK_MODE_SCROLL && (
                  <div className="text-sm">
                    <label className="flex items-center gap-3">
                      <span>Scroll Divisor (lower = faster scroll):</span>
                      <input
                        type="number"
                        min={1}
                        max={100}
                        value={l.scrollDivisor}
                        onChange={(e) =>
                          setLayerDrafts((prev) =>
                            prev.map((old, i) =>
                              i === idx
                                ? {
                                    ...old,
                                    scrollDivisor: parseInt(e.target.value, 10) || 12,
                                  }
                                : old
                            )
                          )
                        }
                        className="p-1 rounded bg-base-100 border border-base-300 w-24"
                      />
                    </label>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

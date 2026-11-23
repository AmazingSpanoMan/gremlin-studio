import React, { useContext, useEffect, useRef, useState } from "react";
import { ConnectionContext } from "../rpc/ConnectionContext";
import { LockStateContext } from "../rpc/LockStateContext";
import { LockState } from "@zmkfirmware/zmk-studio-ts-client/core";
import {
  BitmapTarget,
  DisplayConfig,
  SleepConfig,
} from "@zmkfirmware/zmk-studio-ts-client/gremlin";
import {
  imageFileToUprightPixels,
  packUprightToFirmware,
  renderUprightPixelsToCanvas,
  unpackFirmwareToUpright,
  uprightDims,
} from "./bitmapUtils";
import {
  GREMLIN_BOOT_SIZE,
  GREMLIN_MASCOT_SIZE,
  rpcClearBitmap,
  rpcReadFullBitmap,
  rpcSetDisplayConfig,
  rpcSetSleepConfig,
  rpcWriteFullBitmap,
} from "./gremlinRpc";
import { useGremlin } from "./GremlinContext";

type EditorTarget =
  | { kind: "mascot"; slot: number }
  | { kind: "boot" }
  | { kind: "sleep" };

type PreviewMode = "active" | "boot" | "sleep";

export const ScreenSleepPanel = ({ isActiveTab }: { isActiveTab: boolean }) => {
  const { conn } = useContext(ConnectionContext);
  const lockState = useContext(LockStateContext);
  const {
    capabilities,
    sleepConfig,
    setSleepConfig,
    displayConfig,
    setDisplayConfig,
    loadSleepAndDisplay,
    bitmaps,
    setBitmaps,
    setGremlinUnsaved,
    saveAllGremlinToFlash,
    refreshCapabilities,
    sharedDevice,
  } = useGremlin();

  const [sleepDraft, setSleepDraft] = useState<SleepConfig | null>(null);
  const [dispDraft, setDispDraft] = useState<DisplayConfig | null>(null);

  const [target, setTarget] = useState<EditorTarget>({ kind: "mascot", slot: 0 });
  const [uprightPixels, setUprightPixels] = useState<Uint8Array>(new Uint8Array(64 * 64));
  const [paintTool, setPaintTool] = useState<"draw" | "erase">("draw");
  const [showGrid, setShowGrid] = useState(true);
  const [isCustomSlot, setIsCustomSlot] = useState(false);

  const [imgFile, setImgFile] = useState<File | null>(null);
  const [threshold, setThreshold] = useState(128);
  const [dither, setDither] = useState(false);
  const [invertImg, setInvertImg] = useState(false);

  const [previewMode, setPreviewMode] = useState<PreviewMode>("active");
  const [previewStep, setPreviewStep] = useState(0);
  const [uploadPct, setUploadPct] = useState<number | null>(null);
  const [busy, setBusy] = useState(false);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);

  const editorCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const isDrawingRef = useRef(false);

  const isUnlocked = lockState === LockState.ZMK_STUDIO_CORE_LOCK_STATE_UNLOCKED;

  useEffect(() => {
    if (isUnlocked && capabilities && (!sleepConfig || !displayConfig)) {
      loadSleepAndDisplay();
    }
  }, [isUnlocked, capabilities, sleepConfig, displayConfig, loadSleepAndDisplay]);

  useEffect(() => {
    if (sleepConfig) setSleepDraft({ ...sleepConfig });
  }, [sleepConfig]);

  useEffect(() => {
    if (displayConfig) {
      setDispDraft({
        ...displayConfig,
        animSequence: [...displayConfig.animSequence],
      });
    }
  }, [displayConfig]);

  const targetDims =
    target.kind === "mascot"
      ? { fwW: 64, fwH: 64, size: GREMLIN_MASCOT_SIZE, protoTarget: BitmapTarget.BITMAP_TARGET_MASCOT, slot: target.slot }
      : target.kind === "boot"
      ? { fwW: 160, fwH: 68, size: GREMLIN_BOOT_SIZE, protoTarget: BitmapTarget.BITMAP_TARGET_BOOT, slot: 0 }
      : { fwW: 160, fwH: 68, size: GREMLIN_BOOT_SIZE, protoTarget: BitmapTarget.BITMAP_TARGET_SLEEP, slot: 0 };

  const [uW, uH] = uprightDims(targetDims.fwW, targetDims.fwH);
  const editorScale = target.kind === "mascot" ? 6 : 3;

  const loadBitmapFromDevice = async (t: EditorTarget) => {
    if (!conn || !capabilities) return;
    const pTarget =
      t.kind === "mascot"
        ? BitmapTarget.BITMAP_TARGET_MASCOT
        : t.kind === "boot"
        ? BitmapTarget.BITMAP_TARGET_BOOT
        : BitmapTarget.BITMAP_TARGET_SLEEP;
    const slot = t.kind === "mascot" ? t.slot : 0;
    const fwW = t.kind === "mascot" ? 64 : 160;
    const fwH = t.kind === "mascot" ? 64 : 68;

    setBusy(true);
    setStatusMsg(null);
    try {
      const res = await rpcReadFullBitmap(
        conn,
        pTarget,
        slot,
        capabilities.bitmapChunkSize || 256
      );
      const px = unpackFirmwareToUpright(res.data, fwW, fwH);
      setUprightPixels(px);
      setIsCustomSlot(res.isCustom);
      setBitmaps((prev) => {
        if (t.kind === "boot") return { ...prev, boot: res.data };
        if (t.kind === "sleep") return { ...prev, sleep: res.data };
        return { ...prev, mascots: { ...prev.mascots, [slot]: res.data } };
      });
    } catch (e) {
      setStatusMsg(`Bitmap read error: ${e instanceof Error ? e.message : String(e)}`);
    } finally {
      setBusy(false);
    }
  };

  /* Auto-load selected target bitmap when unlocked on this tab */
  useEffect(() => {
    if (!conn || !isUnlocked || !capabilities || !isActiveTab) return;
    const cached =
      target.kind === "boot"
        ? bitmaps.boot
        : target.kind === "sleep"
        ? bitmaps.sleep
        : bitmaps.mascots[target.slot];

    if (cached) {
      setUprightPixels(unpackFirmwareToUpright(cached, targetDims.fwW, targetDims.fwH));
    } else {
      loadBitmapFromDevice(target);
    }
  }, [target, conn, isUnlocked, capabilities, isActiveTab]);

  /* Redraw editor canvas whenever pixels/grid/scale change */
  useEffect(() => {
    const c = editorCanvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    renderUprightPixelsToCanvas(ctx, uprightPixels, uW, uH, editorScale, showGrid);
  }, [uprightPixels, uW, uH, editorScale, showGrid]);

  /* Re-convert uploaded image when threshold / dither / invert change */
  useEffect(() => {
    if (!imgFile) return;
    imageFileToUprightPixels(imgFile, uW, uH, {
      threshold,
      dither,
      invert: invertImg,
    })
      .then((px) => setUprightPixels(px))
      .catch((e) => setStatusMsg(`Image error: ${String(e)}`));
  }, [imgFile, threshold, dither, invertImg, uW, uH]);

  /* Live OLED preview animator */
  useEffect(() => {
    if (!isActiveTab || !dispDraft) return;
    const ms = Math.max(50, dispDraft.mascotFrameMs || 350);
    const id = window.setInterval(() => {
      setPreviewStep((s) => s + 1);
    }, ms);
    return () => window.clearInterval(id);
  }, [isActiveTab, dispDraft]);

  useEffect(() => {
    const c = previewCanvasRef.current;
    if (!c || !dispDraft) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;

    const scale = 2; // 68*2=136 x 160*2=320 portrait sharp OLED preview
    ctx.fillStyle = "#eef2ef";
    ctx.fillRect(0, 0, 68 * scale, 160 * scale);

    if (previewMode === "boot" || previewMode === "sleep") {
      const fwBytes = previewMode === "boot" ? bitmaps.boot : bitmaps.sleep;
      if (fwBytes) {
        const px = unpackFirmwareToUpright(fwBytes, 160, 68);
        renderUprightPixelsToCanvas(ctx, px, 68, 160, scale, false);
      } else {
        ctx.fillStyle = "#111";
        ctx.font = "12px sans-serif";
        ctx.fillText(`Load ${previewMode} art`, 10, 80);
      }
      return;
    }

    // Active portrait 68x160 layout mirroring custom_status_screen.c
    // Top 64x64 mascot sits at uy=2..65, ux=2..65
    if (dispDraft.showMascot) {
      if (dispDraft.showMascotBorder) {
        ctx.strokeStyle = "#111";
        ctx.lineWidth = scale;
        ctx.strokeRect(1 * scale, 1 * scale, 66 * scale, 66 * scale);
      }
      const seq = dispDraft.animSequence;
      const frameIdx =
        seq.length > 0 ? seq[previewStep % seq.length] % dispDraft.mascotFrameCount : 0;
      const fwMascot =
        target.kind === "mascot" && target.slot === frameIdx
          ? packUprightToFirmware(uprightPixels, 64, 64)
          : bitmaps.mascots[frameIdx];

      if (fwMascot) {
        const mPx = unpackFirmwareToUpright(fwMascot, 64, 64);
        ctx.fillStyle = "#111";
        for (let y = 0; y < 64; y++) {
          for (let x = 0; x < 64; x++) {
            if (mPx[y * 64 + x]) {
              ctx.fillRect((2 + x) * scale, (2 + y) * scale, scale, scale);
            }
          }
        }
      } else {
        ctx.fillStyle = "#555";
        ctx.font = "bold 11px sans-serif";
        ctx.fillText(`MASCOT F${frameIdx}`, 14, 70);
      }

      ctx.fillStyle = "#111";
      ctx.fillRect(2 * scale, 68 * scale, 64 * scale, scale);
    }

    // Bottom status canvas (y=70..158 in portrait)
    const sy = 72;
    const layerName = (sharedDevice.keymap?.layers[0]?.name || "GAME").toUpperCase();
    if (dispDraft.showLayerBadge) {
      ctx.fillStyle = "#111";
      ctx.fillRect(3 * scale, (sy + 3) * scale, 62 * scale, 19 * scale);
      ctx.fillStyle = "#fff";
      ctx.font = "bold 14px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(layerName, 34 * scale, (sy + 17) * scale);
    }

    if (dispDraft.showBatteryIcon) {
      ctx.strokeStyle = "#111";
      ctx.lineWidth = scale;
      ctx.strokeRect(5 * scale, (sy + 29) * scale, 22 * scale, 11 * scale);
      ctx.fillStyle = "#111";
      ctx.fillRect(27 * scale, (sy + 32) * scale, 2 * scale, 5 * scale);
      ctx.fillRect(7 * scale, (sy + 31) * scale, 16 * scale, 7 * scale);
    }

    if (dispDraft.showBatteryPercent) {
      ctx.fillStyle = "#111";
      ctx.font = "bold 14px sans-serif";
      ctx.textAlign = dispDraft.showBatteryIcon ? "left" : "center";
      ctx.fillText(
        "92%",
        (dispDraft.showBatteryIcon ? 32 : 34) * scale,
        (sy + 39) * scale
      );
    }

    if (dispDraft.showOutputBadge) {
      ctx.fillStyle = "#111";
      ctx.fillRect(3 * scale, (sy + 46) * scale, 62 * scale, 19 * scale);
      ctx.fillStyle = "#fff";
      ctx.font = "bold 14px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("USB", 34 * scale, (sy + 60) * scale);
    }

    if (dispDraft.showFooter) {
      ctx.fillStyle = "#111";
      ctx.fillRect(6 * scale, (sy + 70) * scale, 56 * scale, scale);
      ctx.font = "bold 11px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("GREMLIN v3", 34 * scale, (sy + 82) * scale);
    }
    ctx.textAlign = "left";
  }, [
    previewMode,
    previewStep,
    dispDraft,
    bitmaps,
    target,
    uprightPixels,
    sharedDevice.keymap,
  ]);

  if (!capabilities) return null;

  const paintAtEvent = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const c = editorCanvasRef.current;
    if (!c) return;
    const rect = c.getBoundingClientRect();
    const x = Math.floor(((e.clientX - rect.left) / rect.width) * uW);
    const y = Math.floor(((e.clientY - rect.top) / rect.height) * uH);
    if (x < 0 || x >= uW || y < 0 || y >= uH) return;
    const val = paintTool === "draw" ? 1 : 0;
    setUprightPixels((prev) => {
      if (prev[y * uW + x] === val) return prev;
      const copy = new Uint8Array(prev);
      copy[y * uW + x] = val;
      return copy;
    });
  };

  const applySleepAndDisplay = async () => {
    if (!conn || !sleepDraft || !dispDraft) return;
    setBusy(true);
    setStatusMsg(null);
    try {
      await rpcSetSleepConfig(conn, sleepDraft);
      await rpcSetDisplayConfig(conn, dispDraft);
      setSleepConfig(sleepDraft);
      setDisplayConfig(dispDraft);
      setGremlinUnsaved(true);
      setStatusMsg("Applied sleep timers & display layout live.");
    } catch (e) {
      setStatusMsg(`Error: ${e instanceof Error ? e.message : String(e)}`);
    } finally {
      setBusy(false);
    }
  };

  const uploadCurrentBitmap = async () => {
    if (!conn || !capabilities) return;
    setBusy(true);
    setUploadPct(0);
    setStatusMsg(null);
    try {
      const fwBytes = packUprightToFirmware(uprightPixels, targetDims.fwW, targetDims.fwH);
      await rpcWriteFullBitmap(
        conn,
        targetDims.protoTarget,
        targetDims.slot,
        fwBytes,
        capabilities.bitmapChunkSize || 256,
        (frac) => setUploadPct(Math.round(frac * 100))
      );
      setBitmaps((prev) => {
        if (target.kind === "boot") return { ...prev, boot: fwBytes };
        if (target.kind === "sleep") return { ...prev, sleep: fwBytes };
        return { ...prev, mascots: { ...prev.mascots, [target.slot]: fwBytes } };
      });
      setIsCustomSlot(true);
      setGremlinUnsaved(true);
      setImgFile(null);
      setStatusMsg("Uploaded bitmap to keypad RAM (click Save Flash to persist).");
    } catch (e) {
      setStatusMsg(`Upload error: ${e instanceof Error ? e.message : String(e)}`);
    } finally {
      setBusy(false);
      setUploadPct(null);
    }
  };

  const resetCurrentBitmap = async () => {
    if (!conn) return;
    setBusy(true);
    setStatusMsg(null);
    try {
      await rpcClearBitmap(conn, targetDims.protoTarget, targetDims.slot);
      setImgFile(null);
      await loadBitmapFromDevice(target);
      setGremlinUnsaved(true);
      setStatusMsg("Reset artwork slot to firmware default.");
    } catch (e) {
      setStatusMsg(`Reset error: ${e instanceof Error ? e.message : String(e)}`);
    } finally {
      setBusy(false);
    }
  };

  const handleSaveFlash = async () => {
    setBusy(true);
    setStatusMsg(null);
    try {
      await saveAllGremlinToFlash();
      await refreshCapabilities();
      setStatusMsg("Saved display config, timers, and custom art to NVS flash.");
    } catch (e) {
      setStatusMsg(`Save error: ${e instanceof Error ? e.message : String(e)}`);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="overflow-y-auto h-full bg-base-300 text-base-content p-5 flex flex-col gap-5">
      {statusMsg && (
        <div className="px-4 py-2 rounded bg-base-100 border border-primary/40 text-sm">
          {statusMsg}
        </div>
      )}

      {/* TOP GRID: Sleep & Layout + Live Preview */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_220px] gap-5">
        <div className="flex flex-col gap-4">
          {/* Sleep & Power Timers */}
          {sleepDraft && (
            <div className="bg-base-100 p-4 rounded-lg shadow-sm flex flex-col gap-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h2 className="text-lg font-semibold">Sleep &amp; Deep Sleep Timers</h2>
                  <div className="text-sm opacity-75">
                    Adjust how quickly the OLED goes to standby, when ZMK enters idle, and when
                    nRF52840 powers down cleanly into deep sleep.
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={applySleepAndDisplay}
                    disabled={busy}
                    className="px-3 py-1.5 rounded bg-primary text-primary-content text-sm font-medium"
                  >
                    Apply Settings Live
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

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="p-3 rounded bg-base-200 flex flex-col gap-2">
                  <div className="flex justify-between font-medium">
                    <span>Display Sleep</span>
                    <span>
                      {sleepDraft.displaySleepMs === 0
                        ? "Never"
                        : `${Math.round(sleepDraft.displaySleepMs / 1000)}s`}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={600}
                    step={5}
                    value={Math.round(sleepDraft.displaySleepMs / 1000)}
                    onChange={(e) =>
                      setSleepDraft({
                        ...sleepDraft,
                        displaySleepMs: parseInt(e.target.value, 10) * 1000,
                      })
                    }
                    className="accent-primary"
                  />
                  <div className="flex items-center justify-between opacity-75">
                    <span>0 = stay awake</span>
                    <input
                      type="number"
                      min={0}
                      max={3600}
                      value={Math.round(sleepDraft.displaySleepMs / 1000)}
                      onChange={(e) =>
                        setSleepDraft({
                          ...sleepDraft,
                          displaySleepMs: (parseInt(e.target.value, 10) || 0) * 1000,
                        })
                      }
                      className="w-20 p-1 rounded bg-base-100 border border-base-300"
                    />
                  </div>
                </div>

                <div className="p-3 rounded bg-base-200 flex flex-col gap-2">
                  <div className="flex justify-between font-medium">
                    <span>ZMK Idle Timeout</span>
                    <span>
                      {sleepDraft.idleTimeoutMs === 0
                        ? "Off"
                        : `${Math.round(sleepDraft.idleTimeoutMs / 1000)}s`}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={600}
                    step={5}
                    value={Math.round(sleepDraft.idleTimeoutMs / 1000)}
                    onChange={(e) =>
                      setSleepDraft({
                        ...sleepDraft,
                        idleTimeoutMs: parseInt(e.target.value, 10) * 1000,
                      })
                    }
                    className="accent-primary"
                  />
                  <div className="flex items-center justify-between opacity-75">
                    <span>Seconds idle</span>
                    <input
                      type="number"
                      min={0}
                      max={3600}
                      value={Math.round(sleepDraft.idleTimeoutMs / 1000)}
                      onChange={(e) =>
                        setSleepDraft({
                          ...sleepDraft,
                          idleTimeoutMs: (parseInt(e.target.value, 10) || 0) * 1000,
                        })
                      }
                      className="w-20 p-1 rounded bg-base-100 border border-base-300"
                    />
                  </div>
                </div>

                <div className="p-3 rounded bg-base-200 flex flex-col gap-2">
                  <div className="flex justify-between font-medium">
                    <span>Deep Sleep (Power Off)</span>
                    <span>
                      {sleepDraft.deepSleepMs === 0
                        ? "Disabled"
                        : `${Math.round(sleepDraft.deepSleepMs / 60000)} min`}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={120}
                    step={1}
                    value={Math.round(sleepDraft.deepSleepMs / 60000)}
                    onChange={(e) =>
                      setSleepDraft({
                        ...sleepDraft,
                        deepSleepMs: parseInt(e.target.value, 10) * 60000,
                      })
                    }
                    className="accent-primary"
                  />
                  <div className="flex items-center justify-between opacity-75">
                    <span>Minutes (0 = off)</span>
                    <input
                      type="number"
                      min={0}
                      max={240}
                      value={Math.round(sleepDraft.deepSleepMs / 60000)}
                      onChange={(e) =>
                        setSleepDraft({
                          ...sleepDraft,
                          deepSleepMs: (parseInt(e.target.value, 10) || 0) * 60000,
                        })
                      }
                      className="w-20 p-1 rounded bg-base-100 border border-base-300"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Widgets & Animation Sequence */}
          {dispDraft && (
            <div className="bg-base-100 p-4 rounded-lg shadow-sm flex flex-col gap-4">
              <div className="font-semibold text-base">
                Screen Info Widgets &amp; Animation Timing
              </div>

              <div className="flex flex-wrap gap-2 text-sm">
                {(
                  [
                    ["showLayerBadge", "Layer Badge"],
                    ["showBatteryIcon", "Battery Icon"],
                    ["showBatteryPercent", "Battery %"],
                    ["showOutputBadge", "USB / BLE Badge"],
                    ["showFooter", "Footer Branding"],
                    ["showMascot", "Mascot"],
                    ["showMascotBorder", "Mascot Border"],
                  ] as [keyof DisplayConfig, string][]
                ).map(([field, label]) => (
                  <label
                    key={field}
                    className="flex items-center gap-1.5 bg-base-200 px-3 py-1.5 rounded cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={dispDraft[field] as boolean}
                      onChange={(e) =>
                        setDispDraft({ ...dispDraft, [field]: e.target.checked })
                      }
                      className="accent-primary"
                    />
                    <span>{label}</span>
                  </label>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                <label className="flex flex-col gap-1">
                  <span>Boot Splash Duration (ms)</span>
                  <input
                    type="number"
                    min={0}
                    max={15000}
                    step={100}
                    value={dispDraft.bootDurationMs}
                    onChange={(e) =>
                      setDispDraft({
                        ...dispDraft,
                        bootDurationMs: parseInt(e.target.value, 10) || 0,
                      })
                    }
                    className="p-1.5 rounded bg-base-200 border border-base-300"
                  />
                </label>

                <label className="flex flex-col gap-1">
                  <span>Animation Speed (ms/step)</span>
                  <input
                    type="number"
                    min={50}
                    max={5000}
                    step={25}
                    value={dispDraft.mascotFrameMs}
                    onChange={(e) =>
                      setDispDraft({
                        ...dispDraft,
                        mascotFrameMs: parseInt(e.target.value, 10) || 350,
                      })
                    }
                    className="p-1.5 rounded bg-base-200 border border-base-300"
                  />
                </label>

                <label className="flex flex-col gap-1">
                  <span>Mascot Frame Count (1-{capabilities.maxMascotFrames})</span>
                  <input
                    type="number"
                    min={1}
                    max={capabilities.maxMascotFrames}
                    value={dispDraft.mascotFrameCount}
                    onChange={(e) => {
                      const cnt = Math.min(
                        capabilities.maxMascotFrames,
                        Math.max(1, parseInt(e.target.value, 10) || 1)
                      );
                      setDispDraft({
                        ...dispDraft,
                        mascotFrameCount: cnt,
                        animSequence: dispDraft.animSequence.map((f) =>
                          f < cnt ? f : 0
                        ),
                      });
                    }}
                    className="p-1.5 rounded bg-base-200 border border-base-300"
                  />
                </label>
              </div>

              {/* Animation Sequence Strip */}
              <div className="pt-2 border-t border-base-300 flex flex-col gap-2 text-sm">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-medium">
                    Animation Frame Sequence ({dispDraft.animSequence.length}/16) — Click pill to
                    remove
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {Array.from(
                      { length: dispDraft.mascotFrameCount },
                      (_, i) => i
                    ).map((fIdx) => (
                      <button
                        key={fIdx}
                        type="button"
                        disabled={dispDraft.animSequence.length >= 16}
                        onClick={() =>
                          setDispDraft({
                            ...dispDraft,
                            animSequence: [...dispDraft.animSequence, fIdx],
                          })
                        }
                        className="px-2 py-0.5 rounded bg-base-200 hover:bg-primary hover:text-primary-content disabled:opacity-40"
                      >
                        + F{fIdx}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {dispDraft.animSequence.map((fIdx, sIdx) => (
                    <button
                      key={sIdx}
                      type="button"
                      onClick={() =>
                        setDispDraft({
                          ...dispDraft,
                          animSequence: dispDraft.animSequence.filter(
                            (_, i) => i !== sIdx
                          ),
                        })
                      }
                      className="px-2.5 py-1 rounded bg-primary/15 border border-primary/40 hover:bg-red-500/20"
                    >
                      #{sIdx + 1}: F{fIdx}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Live 160x68 Upright Portrait Simulator */}
        <div className="bg-base-100 p-4 rounded-lg shadow-sm flex flex-col items-center gap-3">
          <div className="font-semibold text-base">Live OLED Preview</div>
          <div className="grid grid-cols-3 gap-1 w-full text-sm">
            {(["active", "boot", "sleep"] as PreviewMode[]).map((m) => (
              <button
                key={m}
                onClick={() => setPreviewMode(m)}
                className={`py-1 rounded capitalize ${
                  previewMode === m
                    ? "bg-primary text-primary-content"
                    : "bg-base-200"
                }`}
              >
                {m}
              </button>
            ))}
          </div>
          <canvas
            ref={previewCanvasRef}
            width={136}
            height={320}
            className="border-2 border-black rounded shadow-inner bg-white"
          />
          <div className="w-full text-sm bg-base-200 p-2 rounded">
            <div>
              NVS Storage: {(capabilities.storageUsedBytes / 1024).toFixed(1)} KB /{" "}
              {(capabilities.storageTotalBytes / 1024).toFixed(0)} KB
            </div>
            <div className="w-full bg-base-300 h-1.5 rounded mt-1 overflow-hidden">
              <div
                className="bg-primary h-full"
                style={{
                  width: `${Math.min(
                    100,
                    (capabilities.storageUsedBytes / capabilities.storageTotalBytes) * 100
                  )}%`,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM SECTION: Pixel Art Editor + PNG Importer */}
      <div className="bg-base-100 p-4 rounded-lg shadow-sm flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold">Custom Monochrome Artwork Studio</h2>
            <div className="text-sm opacity-75">
              Editing in upright Gremlin vertical view ({uW}x{uH} px, auto-rotated for Sharp
              LCD). {isCustomSlot ? "Custom NVS artwork active." : "Using firmware stock art."}
            </div>
          </div>

          <div className="flex flex-wrap gap-2 text-sm">
            {Array.from(
              { length: capabilities.maxMascotFrames || 6 },
              (_, i) => i
            ).map((slot) => (
              <button
                key={slot}
                onClick={() => {
                  setImgFile(null);
                  setTarget({ kind: "mascot", slot });
                }}
                className={`px-2.5 py-1 rounded ${
                  target.kind === "mascot" && target.slot === slot
                    ? "bg-primary text-primary-content"
                    : "bg-base-200 hover:bg-base-300"
                }`}
              >
                Mascot F{slot}
              </button>
            ))}
            <button
              onClick={() => {
                setImgFile(null);
                setTarget({ kind: "boot" });
              }}
              className={`px-2.5 py-1 rounded ${
                target.kind === "boot"
                  ? "bg-primary text-primary-content"
                  : "bg-base-200 hover:bg-base-300"
              }`}
            >
              Boot Logo (68x160)
            </button>
            <button
              onClick={() => {
                setImgFile(null);
                setTarget({ kind: "sleep" });
              }}
              className={`px-2.5 py-1 rounded ${
                target.kind === "sleep"
                  ? "bg-primary text-primary-content"
                  : "bg-base-200 hover:bg-base-300"
              }`}
            >
              Sleep Logo (68x160)
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-6 items-start">
          <canvas
            ref={editorCanvasRef}
            width={uW * editorScale}
            height={uH * editorScale}
            onPointerDown={(e) => {
              isDrawingRef.current = true;
              paintAtEvent(e);
            }}
            onPointerMove={(e) => {
              if (isDrawingRef.current) paintAtEvent(e);
            }}
            onPointerUp={() => {
              isDrawingRef.current = false;
            }}
            onPointerLeave={() => {
              isDrawingRef.current = false;
            }}
            className="border border-base-content/40 cursor-crosshair touch-none rounded bg-white"
          />

          <div className="flex flex-col gap-4 text-sm">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setPaintTool("draw")}
                className={`px-3 py-1.5 rounded ${
                  paintTool === "draw" ? "bg-primary text-primary-content" : "bg-base-200"
                }`}
              >
                Pencil (Black)
              </button>
              <button
                onClick={() => setPaintTool("erase")}
                className={`px-3 py-1.5 rounded ${
                  paintTool === "erase" ? "bg-primary text-primary-content" : "bg-base-200"
                }`}
              >
                Eraser (White)
              </button>
              <button
                onClick={() =>
                  setUprightPixels((prev) => prev.map((v) => (v ? 0 : 1)))
                }
                className="px-3 py-1.5 rounded bg-base-200 hover:bg-base-300"
              >
                Invert Pixels
              </button>
              <button
                onClick={() => setUprightPixels(new Uint8Array(uW * uH))}
                className="px-3 py-1.5 rounded bg-base-200 hover:bg-base-300"
              >
                Clear Canvas
              </button>
              <label className="flex items-center gap-1.5 px-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showGrid}
                  onChange={(e) => setShowGrid(e.target.checked)}
                  className="accent-primary"
                />
                <span>Grid</span>
              </label>
            </div>

            {/* Image File Importer */}
            <div className="p-3 rounded bg-base-200 flex flex-col gap-3">
              <div className="font-medium">Import PNG / JPG / SVG Image</div>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setImgFile(e.target.files?.[0] ?? null)}
                className="text-sm"
              />
              <div className="flex flex-wrap items-center gap-4">
                <label className="flex items-center gap-2 flex-1 min-w-[200px]">
                  <span>Threshold: {threshold}</span>
                  <input
                    type="range"
                    min={1}
                    max={254}
                    value={threshold}
                    onChange={(e) => setThreshold(parseInt(e.target.value, 10))}
                    className="flex-1 accent-primary"
                  />
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={dither}
                    onChange={(e) => setDither(e.target.checked)}
                    className="accent-primary"
                  />
                  <span>Dither</span>
                </label>
                <label className="flex items-center gap-1.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={invertImg}
                    onChange={(e) => setInvertImg(e.target.checked)}
                    className="accent-primary"
                  />
                  <span>Invert Import</span>
                </label>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => loadBitmapFromDevice(target)}
                disabled={busy}
                className="px-3 py-1.5 rounded bg-base-200 hover:bg-base-300"
              >
                Load From Keypad
              </button>
              <button
                onClick={uploadCurrentBitmap}
                disabled={busy}
                className="px-3 py-1.5 rounded bg-primary text-primary-content font-medium"
              >
                {uploadPct !== null
                  ? `Uploading ${uploadPct}%...`
                  : "Upload Artwork to Keypad Live"}
              </button>
              <button
                onClick={resetCurrentBitmap}
                disabled={busy}
                className="px-3 py-1.5 rounded bg-base-200 hover:bg-red-500/20"
              >
                Reset Slot to Default
              </button>
              <button
                onClick={handleSaveFlash}
                disabled={busy}
                className="px-3 py-1.5 rounded bg-accent text-black font-medium"
              >
                Save Flash
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

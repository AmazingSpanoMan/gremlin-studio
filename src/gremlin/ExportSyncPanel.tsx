import { useContext, useMemo, useState } from "react";
import { ConnectionContext } from "../rpc/ConnectionContext";
import { BitmapTarget } from "@zmkfirmware/zmk-studio-ts-client/gremlin";
import {
  generateArtSourceFile,
  generateConfSnippet,
  generateKeymapFile,
  generateOverlayPatch,
  GremlinProfileBundle,
} from "./zmkExporter";
import {
  rpcSetCombo,
  rpcSetDisplayConfig,
  rpcSetHoldTap,
  rpcSetMacro,
  rpcSetSleepConfig,
  rpcSetStickConfig,
  rpcSetStickLayerConfig,
  rpcSetTapDance,
  rpcWriteFullBitmap,
} from "./gremlinRpc";
import { useGremlin } from "./GremlinContext";

type SourceTab = "keymap" | "overlay" | "conf" | "art";

function downloadTextFile(filename: string, content: string): void {
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export const ExportSyncPanel = () => {
  const { conn } = useContext(ConnectionContext);
  const {
    capabilities,
    sharedDevice,
    sleepConfig,
    displayConfig,
    stickConfig,
    stickLayers,
    combos,
    holdTaps,
    tapDances,
    macros,
    bitmaps,
    loadSleepAndDisplay,
    loadStick,
    loadCombos,
    loadBehaviors,
    saveAllGremlinToFlash,
    setGremlinUnsaved,
  } = useGremlin();

  const [sourceTab, setSourceTab] = useState<SourceTab>("keymap");
  const [busy, setBusy] = useState(false);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);
  const [importedProfile, setImportedProfile] = useState<GremlinProfileBundle | null>(null);

  const keymapSrc = useMemo(
    () =>
      generateKeymapFile(
        sharedDevice.keymap,
        sharedDevice.behaviors,
        combos,
        holdTaps,
        tapDances,
        macros
      ),
    [sharedDevice, combos, holdTaps, tapDances, macros]
  );

  const overlaySrc = useMemo(
    () => generateOverlayPatch(stickConfig, stickLayers),
    [stickConfig, stickLayers]
  );

  const confSrc = useMemo(
    () => generateConfSnippet(sleepConfig),
    [sleepConfig]
  );

  const artSrc = useMemo(
    () => generateArtSourceFile(bitmaps.boot, bitmaps.sleep, bitmaps.mascots),
    [bitmaps]
  );

  if (!capabilities) return null;

  const activeSourceText =
    sourceTab === "keymap"
      ? keymapSrc
      : sourceTab === "overlay"
      ? overlaySrc
      : sourceTab === "conf"
      ? confSrc
      : artSrc;

  const activeFilename =
    sourceTab === "keymap"
      ? "gremlinv3.keymap"
      : sourceTab === "overlay"
      ? "gremlinv3.overlay.patch"
      : sourceTab === "conf"
      ? "gremlinv3.conf.snippet"
      : "gremlin_art.c";

  const fetchAllFromDevice = async () => {
    setBusy(true);
    setStatusMsg(null);
    try {
      await loadSleepAndDisplay();
      await loadStick();
      await loadCombos();
      await loadBehaviors();
      setStatusMsg("Synced all live keypad settings into generator.");
    } catch (e) {
      setStatusMsg(`Fetch error: ${e instanceof Error ? e.message : String(e)}`);
    } finally {
      setBusy(false);
    }
  };

  const exportJsonBundle = () => {
    const mascotNums: Record<number, number[]> = {};
    for (const [k, arr] of Object.entries(bitmaps.mascots)) {
      mascotNums[parseInt(k, 10)] = Array.from(arr);
    }
    const bundle: GremlinProfileBundle = {
      version: 1,
      exportedAt: new Date().toISOString(),
      sleepConfig,
      displayConfig,
      stickConfig,
      stickLayers,
      combos,
      holdTaps,
      tapDances,
      macros,
      bitmaps: {
        boot: bitmaps.boot ? Array.from(bitmaps.boot) : undefined,
        sleep: bitmaps.sleep ? Array.from(bitmaps.sleep) : undefined,
        mascots: mascotNums,
      },
    };
    downloadTextFile("gremlin-v3-profile.json", JSON.stringify(bundle, null, 2));
    setStatusMsg("Downloaded gremlin-v3-profile.json.");
  };

  const handleProfileUpload = async (file: File | null) => {
    if (!file) return;
    try {
      const txt = await file.text();
      const parsed = JSON.parse(txt) as GremlinProfileBundle;
      setImportedProfile(parsed);
      setStatusMsg(`Loaded JSON profile (${parsed.exportedAt || "unknown date"}). Review & push to keypad.`);
    } catch (e) {
      setStatusMsg(`Invalid profile JSON: ${e instanceof Error ? e.message : String(e)}`);
    }
  };

  const applyImportedProfile = async (saveToFlash: boolean) => {
    if (!conn || !importedProfile) return;
    setBusy(true);
    setStatusMsg(null);
    try {
      if (importedProfile.sleepConfig) {
        await rpcSetSleepConfig(conn, importedProfile.sleepConfig);
      }
      if (importedProfile.displayConfig) {
        await rpcSetDisplayConfig(conn, importedProfile.displayConfig);
      }
      if (importedProfile.stickConfig) {
        await rpcSetStickConfig(conn, importedProfile.stickConfig);
      }
      for (const sl of importedProfile.stickLayers ?? []) {
        await rpcSetStickLayerConfig(conn, sl);
      }
      for (const c of importedProfile.combos ?? []) {
        await rpcSetCombo(conn, c);
      }
      for (const ht of importedProfile.holdTaps ?? []) {
        await rpcSetHoldTap(conn, ht);
      }
      for (const td of importedProfile.tapDances ?? []) {
        await rpcSetTapDance(conn, td);
      }
      for (const m of importedProfile.macros ?? []) {
        await rpcSetMacro(conn, m);
      }
      const chunk = capabilities.bitmapChunkSize || 256;
      if (importedProfile.bitmaps?.boot) {
        await rpcWriteFullBitmap(
          conn,
          BitmapTarget.BITMAP_TARGET_BOOT,
          0,
          new Uint8Array(importedProfile.bitmaps.boot),
          chunk
        );
      }
      if (importedProfile.bitmaps?.sleep) {
        await rpcWriteFullBitmap(
          conn,
          BitmapTarget.BITMAP_TARGET_SLEEP,
          0,
          new Uint8Array(importedProfile.bitmaps.sleep),
          chunk
        );
      }
      for (const [k, arr] of Object.entries(importedProfile.bitmaps?.mascots ?? {})) {
        await rpcWriteFullBitmap(
          conn,
          BitmapTarget.BITMAP_TARGET_MASCOT,
          parseInt(k, 10),
          new Uint8Array(arr),
          chunk
        );
      }
      await fetchAllFromDevice();
      setGremlinUnsaved(true);
      if (saveToFlash) {
        await saveAllGremlinToFlash();
        setStatusMsg("Profile restored & saved to keypad flash!");
      } else {
        setStatusMsg("Profile pushed live to keypad RAM.");
      }
    } catch (e) {
      setStatusMsg(`Apply error: ${e instanceof Error ? e.message : String(e)}`);
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

      {/* TOP BAR: Fetch + JSON Profile Backup / Restore */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-base-100 p-4 rounded-lg shadow-sm flex flex-col gap-3">
          <div>
            <h2 className="text-lg font-semibold">JSON Profile Backup &amp; Restore</h2>
            <div className="text-sm opacity-75">
              Save all Gremlin v3 settings (sleep, screen widgets, custom art, stick calibration,
              combos, hold-taps, tap-dances, macros) into a portable JSON file.
            </div>
          </div>
          <div className="flex flex-wrap gap-2 text-sm">
            <button
              onClick={fetchAllFromDevice}
              disabled={busy}
              className="px-3 py-1.5 rounded bg-base-200 hover:bg-base-300"
            >
              Sync All Settings From Keypad
            </button>
            <button
              onClick={exportJsonBundle}
              className="px-3 py-1.5 rounded bg-primary text-primary-content font-medium"
            >
              Download JSON Profile
            </button>
          </div>
          <div className="pt-2 border-t border-base-300 flex flex-col gap-2 text-sm">
            <label className="font-medium">Restore Profile From JSON:</label>
            <input
              type="file"
              accept=".json,application/json"
              onChange={(e) => handleProfileUpload(e.target.files?.[0] ?? null)}
            />
            {importedProfile && (
              <div className="flex flex-wrap gap-2 pt-1">
                <button
                  onClick={() => applyImportedProfile(false)}
                  disabled={busy}
                  className="px-3 py-1.5 rounded bg-primary text-primary-content"
                >
                  Apply JSON Live
                </button>
                <button
                  onClick={() => applyImportedProfile(true)}
                  disabled={busy}
                  className="px-3 py-1.5 rounded bg-accent text-black font-medium"
                >
                  Apply &amp; Save to Flash
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="bg-base-100 p-4 rounded-lg shadow-sm flex flex-col justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold">Sync Back To ZMK Repository</h2>
            <div className="text-sm opacity-75 mt-1">
              Export your visual configuration back into ZMK source files so your GitHub
              <code className="mx-1 px-1 bg-base-200 rounded">Gremlin_Keypad</code>
              repo matches everything you tuned interactively in Gremlin Studio. Remember to keep{" "}
              <code className="px-1 bg-base-200 rounded">config/gremlinv3.*</code> and{" "}
              <code className="px-1 bg-base-200 rounded">boards/shields/gremlinv3/*</code> identical.
            </div>
          </div>
          <div className="flex flex-wrap gap-2 text-sm">
            <button
              onClick={() => {
                downloadTextFile("gremlinv3.keymap", keymapSrc);
                downloadTextFile("gremlinv3.overlay.patch", overlaySrc);
                downloadTextFile("gremlinv3.conf.snippet", confSrc);
                if (bitmaps.boot || bitmaps.sleep || Object.keys(bitmaps.mascots).length > 0) {
                  downloadTextFile("gremlin_art.c", artSrc);
                }
              }}
              className="px-3 py-1.5 rounded bg-accent text-black font-medium"
            >
              Download All Generated Source Files
            </button>
          </div>
        </div>
      </div>

      {/* ZMK SOURCE CODE VIEWER */}
      <div className="bg-base-100 p-4 rounded-lg shadow-sm flex flex-col gap-3 flex-1 min-h-[320px]">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap gap-1.5 text-sm">
            {(
              [
                ["keymap", "gremlinv3.keymap"],
                ["overlay", "gremlinv3.overlay (Stick)"],
                ["conf", "gremlinv3.conf (Power)"],
                ["art", "gremlin_art.c (Bitmaps)"],
              ] as [SourceTab, string][]
            ).map(([id, label]) => (
              <button
                key={id}
                onClick={() => setSourceTab(id)}
                className={`px-3 py-1.5 rounded font-medium ${
                  sourceTab === id
                    ? "bg-primary text-primary-content"
                    : "bg-base-200 hover:bg-base-300"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="flex gap-2 text-sm">
            <button
              onClick={async () => {
                await navigator.clipboard.writeText(activeSourceText);
                setStatusMsg(`Copied ${activeFilename} to clipboard.`);
              }}
              className="px-3 py-1 rounded bg-base-200 hover:bg-base-300"
            >
              Copy
            </button>
            <button
              onClick={() => downloadTextFile(activeFilename, activeSourceText)}
              className="px-3 py-1 rounded bg-primary text-primary-content"
            >
              Download {activeFilename}
            </button>
          </div>
        </div>

        <textarea
          readOnly
          value={activeSourceText}
          className="w-full flex-1 min-h-[280px] p-3 rounded bg-base-200 border border-base-300 font-mono text-sm resize-none"
        />
      </div>
    </div>
  );
};

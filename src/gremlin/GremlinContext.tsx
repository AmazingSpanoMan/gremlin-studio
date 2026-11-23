import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import { ConnectionContext } from "../rpc/ConnectionContext";
import { LockStateContext } from "../rpc/LockStateContext";
import { LockState } from "@zmkfirmware/zmk-studio-ts-client/core";
import type { Keymap, PhysicalLayout } from "@zmkfirmware/zmk-studio-ts-client/keymap";
import type { GetBehaviorDetailsResponse } from "@zmkfirmware/zmk-studio-ts-client/behaviors";
import {
  Capabilities,
  ComboConfig,
  DisplayConfig,
  HoldTapConfig,
  MacroConfig,
  SleepConfig,
  StickConfig,
  StickLayerConfig,
  TapDanceConfig,
} from "@zmkfirmware/zmk-studio-ts-client/gremlin";
import {
  detectGremlinCapabilities,
  rpcGetCapabilities,
  rpcGetCombo,
  rpcGetDisplayConfig,
  rpcGetHoldTap,
  rpcGetMacro,
  rpcGetSleepConfig,
  rpcGetStickConfig,
  rpcGetStickLayerConfig,
  rpcGetTapDance,
  rpcSaveSettings,
} from "./gremlinRpc";

export type BehaviorMap = Record<number, GetBehaviorDetailsResponse>;

export interface SharedDeviceSnapshot {
  layouts?: PhysicalLayout[];
  selectedPhysicalLayoutIndex: number;
  keymap?: Keymap;
  behaviors: BehaviorMap;
}

export interface GremlinContextValue {
  capabilities: Capabilities | null;
  checking: boolean;
  gremlinUnsaved: boolean;
  setGremlinUnsaved: (dirty: boolean) => void;
  sharedDevice: SharedDeviceSnapshot;
  setSharedDevice: React.Dispatch<React.SetStateAction<SharedDeviceSnapshot>>;
  sleepConfig?: SleepConfig;
  setSleepConfig: React.Dispatch<React.SetStateAction<SleepConfig | undefined>>;
  displayConfig?: DisplayConfig;
  setDisplayConfig: React.Dispatch<React.SetStateAction<DisplayConfig | undefined>>;
  stickConfig?: StickConfig;
  setStickConfig: React.Dispatch<React.SetStateAction<StickConfig | undefined>>;
  stickLayers: StickLayerConfig[];
  setStickLayers: React.Dispatch<React.SetStateAction<StickLayerConfig[]>>;
  combos: ComboConfig[];
  setCombos: React.Dispatch<React.SetStateAction<ComboConfig[]>>;
  holdTaps: HoldTapConfig[];
  setHoldTaps: React.Dispatch<React.SetStateAction<HoldTapConfig[]>>;
  tapDances: TapDanceConfig[];
  setTapDances: React.Dispatch<React.SetStateAction<TapDanceConfig[]>>;
  macros: MacroConfig[];
  setMacros: React.Dispatch<React.SetStateAction<MacroConfig[]>>;
  bitmaps: {
    boot?: Uint8Array;
    sleep?: Uint8Array;
    mascots: Record<number, Uint8Array>;
  };
  setBitmaps: React.Dispatch<
    React.SetStateAction<{
      boot?: Uint8Array;
      sleep?: Uint8Array;
      mascots: Record<number, Uint8Array>;
    }>
  >;
  loadingSection: string | null;
  lastError: string | null;
  setLastError: (err: string | null) => void;
  loadSleepAndDisplay: () => Promise<void>;
  loadStick: () => Promise<void>;
  loadCombos: () => Promise<void>;
  loadBehaviors: () => Promise<void>;
  refreshCapabilities: () => Promise<void>;
  saveAllGremlinToFlash: () => Promise<void>;
}

const GremlinContext = createContext<GremlinContextValue | null>(null);

export const GremlinProvider = ({ children }: { children: React.ReactNode }) => {
  const { conn } = useContext(ConnectionContext);
  const lockState = useContext(LockStateContext);

  const [capabilities, setCapabilities] = useState<Capabilities | null>(null);
  const [checking, setChecking] = useState(false);
  const [gremlinUnsaved, setGremlinUnsaved] = useState(false);
  const [sharedDevice, setSharedDevice] = useState<SharedDeviceSnapshot>({
    selectedPhysicalLayoutIndex: 0,
    behaviors: {},
  });

  const [sleepConfig, setSleepConfig] = useState<SleepConfig | undefined>();
  const [displayConfig, setDisplayConfig] = useState<DisplayConfig | undefined>();
  const [stickConfig, setStickConfig] = useState<StickConfig | undefined>();
  const [stickLayers, setStickLayers] = useState<StickLayerConfig[]>([]);
  const [combos, setCombos] = useState<ComboConfig[]>([]);
  const [holdTaps, setHoldTaps] = useState<HoldTapConfig[]>([]);
  const [tapDances, setTapDances] = useState<TapDanceConfig[]>([]);
  const [macros, setMacros] = useState<MacroConfig[]>([]);
  const [bitmaps, setBitmaps] = useState<{
    boot?: Uint8Array;
    sleep?: Uint8Array;
    mascots: Record<number, Uint8Array>;
  }>({ mascots: {} });

  const [loadingSection, setLoadingSection] = useState<string | null>(null);
  const [lastError, setLastError] = useState<string | null>(null);

  useEffect(() => {
    setSleepConfig(undefined);
    setDisplayConfig(undefined);
    setStickConfig(undefined);
    setStickLayers([]);
    setCombos([]);
    setHoldTaps([]);
    setTapDances([]);
    setMacros([]);
    setBitmaps({ mascots: {} });
    setGremlinUnsaved(false);
    setLastError(null);

    if (!conn) {
      setCapabilities(null);
      return;
    }

    let cancelled = false;
    setChecking(true);
    detectGremlinCapabilities(conn)
      .then((cap) => {
        if (!cancelled) setCapabilities(cap);
      })
      .finally(() => {
        if (!cancelled) setChecking(false);
      });

    return () => {
      cancelled = true;
    };
  }, [conn]);

  const refreshCapabilities = useCallback(async () => {
    if (!conn) return;
    try {
      const cap = await rpcGetCapabilities(conn);
      setCapabilities(cap);
    } catch {
      /* ignore */
    }
  }, [conn]);

  const isUnlocked = lockState === LockState.ZMK_STUDIO_CORE_LOCK_STATE_UNLOCKED;

  const loadSleepAndDisplay = useCallback(async () => {
    if (!conn || !capabilities || !isUnlocked) return;
    setLoadingSection("screen");
    setLastError(null);
    try {
      const [s, d] = await Promise.all([
        rpcGetSleepConfig(conn),
        rpcGetDisplayConfig(conn),
      ]);
      setSleepConfig(s);
      setDisplayConfig(d);
    } catch (e) {
      setLastError(String(e));
    } finally {
      setLoadingSection(null);
    }
  }, [conn, capabilities, isUnlocked]);

  const loadStick = useCallback(async () => {
    if (!conn || !capabilities || !isUnlocked) return;
    setLoadingSection("stick");
    setLastError(null);
    try {
      const cal = await rpcGetStickConfig(conn);
      setStickConfig(cal);
      const count = capabilities.maxStickLayers || 0;
      const list: StickLayerConfig[] = [];
      for (let i = 0; i < count; i++) {
        list.push(await rpcGetStickLayerConfig(conn, i));
      }
      setStickLayers(list);
    } catch (e) {
      setLastError(String(e));
    } finally {
      setLoadingSection(null);
    }
  }, [conn, capabilities, isUnlocked]);

  const loadCombos = useCallback(async () => {
    if (!conn || !capabilities || !isUnlocked) return;
    setLoadingSection("combos");
    setLastError(null);
    try {
      const list: ComboConfig[] = [];
      for (let i = 0; i < capabilities.maxCombos; i++) {
        list.push(await rpcGetCombo(conn, i));
      }
      setCombos(list);
    } catch (e) {
      setLastError(String(e));
    } finally {
      setLoadingSection(null);
    }
  }, [conn, capabilities, isUnlocked]);

  const loadBehaviors = useCallback(async () => {
    if (!conn || !capabilities || !isUnlocked) return;
    setLoadingSection("behaviors");
    setLastError(null);
    try {
      const hts: HoldTapConfig[] = [];
      for (let i = 0; i < capabilities.maxHoldTaps; i++) {
        hts.push(await rpcGetHoldTap(conn, i));
      }
      const tds: TapDanceConfig[] = [];
      for (let i = 0; i < capabilities.maxTapDances; i++) {
        tds.push(await rpcGetTapDance(conn, i));
      }
      const macs: MacroConfig[] = [];
      for (let i = 0; i < capabilities.maxMacros; i++) {
        macs.push(await rpcGetMacro(conn, i));
      }
      setHoldTaps(hts);
      setTapDances(tds);
      setMacros(macs);
    } catch (e) {
      setLastError(String(e));
    } finally {
      setLoadingSection(null);
    }
  }, [conn, capabilities, isUnlocked]);

  const saveAllGremlinToFlash = useCallback(async () => {
    if (!conn || !capabilities) return;
    setLastError(null);
    await rpcSaveSettings(conn);
    setGremlinUnsaved(false);
    await refreshCapabilities();
  }, [conn, capabilities, refreshCapabilities]);

  return (
    <GremlinContext.Provider
      value={{
        capabilities,
        checking,
        gremlinUnsaved,
        setGremlinUnsaved,
        sharedDevice,
        setSharedDevice,
        sleepConfig,
        setSleepConfig,
        displayConfig,
        setDisplayConfig,
        stickConfig,
        setStickConfig,
        stickLayers,
        setStickLayers,
        combos,
        setCombos,
        holdTaps,
        setHoldTaps,
        tapDances,
        setTapDances,
        macros,
        setMacros,
        bitmaps,
        setBitmaps,
        loadingSection,
        lastError,
        setLastError,
        loadSleepAndDisplay,
        loadStick,
        loadCombos,
        loadBehaviors,
        refreshCapabilities,
        saveAllGremlinToFlash,
      }}
    >
      {children}
    </GremlinContext.Provider>
  );
};

export function useGremlin(): GremlinContextValue {
  const ctx = useContext(GremlinContext);
  if (!ctx) {
    throw new Error("useGremlin must be used inside GremlinProvider");
  }
  return ctx;
}

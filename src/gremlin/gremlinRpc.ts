import { call_rpc } from "../rpc/logging";
import type { RpcConnection } from "@zmkfirmware/zmk-studio-ts-client";
import {
  BitmapChunk,
  BitmapTarget,
  Capabilities,
  ComboConfig,
  DisplayConfig,
  GremlinStatusCode,
  HoldTapConfig,
  MacroConfig,
  Request as GremlinRequest,
  Response as GremlinResponse,
  SleepConfig,
  StickConfig,
  StickLayerConfig,
  StickTelemetry,
  TapDanceConfig,
} from "@zmkfirmware/zmk-studio-ts-client/gremlin";

export const GREMLIN_BOOT_SIZE = 1360;
export const GREMLIN_SLEEP_SIZE = 1360;
export const GREMLIN_MASCOT_SIZE = 512;

export interface PositionMeta {
  pos: number;
  shortLabel: string;
  name: string;
  row: number;
  col: number;
}

export const GREMLIN_POSITIONS: PositionMeta[] = [
  { pos: 0, shortLabel: "S1", name: "S1 (Row 1, Col 1)", row: 0, col: 0 },
  { pos: 1, shortLabel: "S2", name: "S2 (Row 1, Col 2)", row: 0, col: 1 },
  { pos: 2, shortLabel: "S3", name: "S3 (Row 1, Col 3)", row: 0, col: 2 },
  { pos: 3, shortLabel: "S4", name: "S4 (Row 1, Col 4)", row: 0, col: 3 },
  { pos: 4, shortLabel: "S5", name: "S5 (Row 1, Col 5)", row: 0, col: 4 },
  { pos: 5, shortLabel: "S6", name: "S6 (Row 2, Col 1)", row: 1, col: 0 },
  { pos: 6, shortLabel: "S7", name: "S7 (Row 2, Col 2)", row: 1, col: 1 },
  { pos: 7, shortLabel: "S8", name: "S8 (Row 2, Col 3)", row: 1, col: 2 },
  { pos: 8, shortLabel: "S9", name: "S9 (Row 2, Col 4)", row: 1, col: 3 },
  { pos: 9, shortLabel: "S10", name: "S10 (Row 2, Col 5)", row: 1, col: 4 },
  { pos: 10, shortLabel: "S11", name: "S11 (Row 3, Col 1)", row: 2, col: 0 },
  { pos: 11, shortLabel: "S12", name: "S12 (Row 3, Col 2)", row: 2, col: 1 },
  { pos: 12, shortLabel: "S13", name: "S13 (Row 3, Col 3)", row: 2, col: 2 },
  { pos: 13, shortLabel: "S14", name: "S14 (Row 3, Col 4)", row: 2, col: 3 },
  { pos: 14, shortLabel: "S15", name: "S15 (Row 3, Col 5)", row: 2, col: 4 },
  { pos: 15, shortLabel: "S16", name: "S16 (Row 4, Col 1)", row: 3, col: 0 },
  { pos: 16, shortLabel: "S17", name: "S17 (Row 4, Col 2)", row: 3, col: 1 },
  { pos: 17, shortLabel: "S18", name: "S18 (Row 4, Col 3)", row: 3, col: 2 },
  { pos: 18, shortLabel: "S19", name: "S19 (Row 4, Col 4)", row: 3, col: 3 },
  { pos: 19, shortLabel: "S20", name: "S20 (Row 4, Col 5)", row: 3, col: 4 },
  { pos: 20, shortLabel: "S21", name: "S21 (Thumb L)", row: 4, col: 3 },
  { pos: 21, shortLabel: "S22", name: "S22 (Thumb R)", row: 4, col: 4 },
  { pos: 22, shortLabel: "L3", name: "L3 (Stick Click)", row: 5, col: 1 },
  { pos: 23, shortLabel: "StkU", name: "Stick Up (Virtual)", row: 5, col: 2 },
  { pos: 24, shortLabel: "StkD", name: "Stick Down (Virtual)", row: 5, col: 3 },
  { pos: 25, shortLabel: "StkL", name: "Stick Left (Virtual)", row: 5, col: 4 },
  { pos: 26, shortLabel: "StkR", name: "Stick Right (Virtual)", row: 5, col: 5 },
];

export function formatPositionLabel(pos: number): string {
  return GREMLIN_POSITIONS[pos]?.shortLabel ?? `Pos ${pos}`;
}

export function statusCodeMessage(code: GremlinStatusCode | undefined): string {
  switch (code) {
    case GremlinStatusCode.GREMLIN_STATUS_OK:
      return "OK";
    case GremlinStatusCode.GREMLIN_STATUS_ERR_INVALID_SLOT:
      return "Invalid slot index";
    case GremlinStatusCode.GREMLIN_STATUS_ERR_INVALID_ARG:
      return "Invalid parameter value";
    case GremlinStatusCode.GREMLIN_STATUS_ERR_NOT_SUPPORTED:
      return "Operation not supported by firmware";
    case GremlinStatusCode.GREMLIN_STATUS_ERR_NO_SPACE:
      return "Not enough NVS flash storage space";
    default:
      return `Gremlin firmware error (${String(code)})`;
  }
}

async function rawGremlinRpc(
  conn: RpcConnection,
  gremlin: Partial<GremlinRequest>
): Promise<GremlinResponse> {
  const resp = await call_rpc(conn, { gremlin } as never);
  if (resp instanceof Error) {
    throw resp;
  }
  if (resp.meta?.simpleError !== undefined) {
    throw new Error(`Studio Meta Error (${resp.meta.simpleError})`);
  }
  if (resp.meta?.noResponse) {
    throw new Error("No RPC response received");
  }
  if (!resp.gremlin) {
    throw new Error("Gremlin RPC subsystem not supported on connected device");
  }
  return resp.gremlin;
}

function assertStatusOk(code: GremlinStatusCode | undefined): void {
  if (code !== GremlinStatusCode.GREMLIN_STATUS_OK) {
    throw new Error(statusCodeMessage(code));
  }
}

export async function detectGremlinCapabilities(
  conn: RpcConnection
): Promise<Capabilities | null> {
  try {
    const resp = await rawGremlinRpc(conn, { getCapabilities: true });
    return resp.getCapabilities ?? null;
  } catch {
    return null;
  }
}

export async function rpcGetCapabilities(conn: RpcConnection): Promise<Capabilities> {
  const r = await rawGremlinRpc(conn, { getCapabilities: true });
  if (!r.getCapabilities) throw new Error("Missing capabilities response");
  return r.getCapabilities;
}

export async function rpcGetSleepConfig(conn: RpcConnection): Promise<SleepConfig> {
  const r = await rawGremlinRpc(conn, { getSleepConfig: true });
  if (!r.getSleepConfig) throw new Error("Missing sleep config response");
  return r.getSleepConfig;
}

export async function rpcSetSleepConfig(
  conn: RpcConnection,
  cfg: SleepConfig
): Promise<void> {
  const r = await rawGremlinRpc(conn, { setSleepConfig: cfg });
  assertStatusOk(r.setSleepConfig);
}

export async function rpcGetDisplayConfig(conn: RpcConnection): Promise<DisplayConfig> {
  const r = await rawGremlinRpc(conn, { getDisplayConfig: true });
  if (!r.getDisplayConfig) throw new Error("Missing display config response");
  return r.getDisplayConfig;
}

export async function rpcSetDisplayConfig(
  conn: RpcConnection,
  cfg: DisplayConfig
): Promise<void> {
  const r = await rawGremlinRpc(conn, { setDisplayConfig: cfg });
  assertStatusOk(r.setDisplayConfig);
}

export async function rpcGetStickConfig(conn: RpcConnection): Promise<StickConfig> {
  const r = await rawGremlinRpc(conn, { getStickConfig: true });
  if (!r.getStickConfig) throw new Error("Missing stick config response");
  return r.getStickConfig;
}

export async function rpcSetStickConfig(
  conn: RpcConnection,
  cfg: StickConfig
): Promise<void> {
  const r = await rawGremlinRpc(conn, { setStickConfig: cfg });
  assertStatusOk(r.setStickConfig);
}

export async function rpcGetStickLayerConfig(
  conn: RpcConnection,
  layerIndex: number
): Promise<StickLayerConfig> {
  const r = await rawGremlinRpc(conn, { getStickLayerConfig: layerIndex });
  if (!r.getStickLayerConfig) throw new Error("Missing stick layer config response");
  return r.getStickLayerConfig;
}

export async function rpcSetStickLayerConfig(
  conn: RpcConnection,
  cfg: StickLayerConfig
): Promise<void> {
  const r = await rawGremlinRpc(conn, { setStickLayerConfig: cfg });
  assertStatusOk(r.setStickLayerConfig);
}

export async function rpcGetStickTelemetry(
  conn: RpcConnection
): Promise<StickTelemetry> {
  const r = await rawGremlinRpc(conn, { getStickTelemetry: true });
  if (!r.getStickTelemetry) throw new Error("Missing telemetry response");
  return r.getStickTelemetry;
}

export async function rpcGetCombo(
  conn: RpcConnection,
  index: number
): Promise<ComboConfig> {
  const r = await rawGremlinRpc(conn, { getCombo: index });
  if (!r.getCombo) throw new Error("Missing combo response");
  return r.getCombo;
}

export async function rpcSetCombo(
  conn: RpcConnection,
  cfg: ComboConfig
): Promise<void> {
  const r = await rawGremlinRpc(conn, { setCombo: cfg });
  assertStatusOk(r.setCombo);
}

export async function rpcGetHoldTap(
  conn: RpcConnection,
  index: number
): Promise<HoldTapConfig> {
  const r = await rawGremlinRpc(conn, { getHoldTap: index });
  if (!r.getHoldTap) throw new Error("Missing hold-tap response");
  return r.getHoldTap;
}

export async function rpcSetHoldTap(
  conn: RpcConnection,
  cfg: HoldTapConfig
): Promise<void> {
  const r = await rawGremlinRpc(conn, { setHoldTap: cfg });
  assertStatusOk(r.setHoldTap);
}

export async function rpcGetTapDance(
  conn: RpcConnection,
  index: number
): Promise<TapDanceConfig> {
  const r = await rawGremlinRpc(conn, { getTapDance: index });
  if (!r.getTapDance) throw new Error("Missing tap-dance response");
  return r.getTapDance;
}

export async function rpcSetTapDance(
  conn: RpcConnection,
  cfg: TapDanceConfig
): Promise<void> {
  const r = await rawGremlinRpc(conn, { setTapDance: cfg });
  assertStatusOk(r.setTapDance);
}

export async function rpcGetMacro(
  conn: RpcConnection,
  index: number
): Promise<MacroConfig> {
  const r = await rawGremlinRpc(conn, { getMacro: index });
  if (!r.getMacro) throw new Error("Missing macro response");
  return r.getMacro;
}

export async function rpcSetMacro(
  conn: RpcConnection,
  cfg: MacroConfig
): Promise<void> {
  const r = await rawGremlinRpc(conn, { setMacro: cfg });
  assertStatusOk(r.setMacro);
}

export async function rpcReadFullBitmap(
  conn: RpcConnection,
  target: BitmapTarget,
  slot: number,
  chunkSize = 256
): Promise<{ data: Uint8Array; isCustom: boolean }> {
  const expectedSize =
    target === BitmapTarget.BITMAP_TARGET_MASCOT
      ? GREMLIN_MASCOT_SIZE
      : GREMLIN_BOOT_SIZE;

  const out = new Uint8Array(expectedSize);
  let offset = 0;
  let isCustom = false;

  while (offset < expectedSize) {
    const r = await rawGremlinRpc(conn, {
      getBitmapChunk: {
        target,
        slot,
        offset,
        length: Math.min(chunkSize, expectedSize - offset),
      },
    });
    const chunk: BitmapChunk | undefined = r.getBitmapChunk;
    if (!chunk) {
      throw new Error("Missing bitmap chunk response");
    }
    isCustom = chunk.isCustom;
    out.set(chunk.data, offset);
    if (chunk.data.length === 0) {
      break;
    }
    offset += chunk.data.length;
  }

  return { data: out, isCustom };
}

export async function rpcWriteFullBitmap(
  conn: RpcConnection,
  target: BitmapTarget,
  slot: number,
  bytes: Uint8Array,
  chunkSize = 256,
  onProgress?: (fraction: number) => void
): Promise<void> {
  const totalSize = bytes.length;
  for (let offset = 0; offset < totalSize; offset += chunkSize) {
    const end = Math.min(offset + chunkSize, totalSize);
    const slice = bytes.slice(offset, end);
    const r = await rawGremlinRpc(conn, {
      setBitmapChunk: {
        target,
        slot,
        offset,
        totalSize,
        data: slice,
      },
    });
    assertStatusOk(r.setBitmapChunk);
    onProgress?.(end / totalSize);
  }
}

export async function rpcClearBitmap(
  conn: RpcConnection,
  target: BitmapTarget,
  slot: number
): Promise<void> {
  const r = await rawGremlinRpc(conn, { clearBitmap: { target, slot } });
  assertStatusOk(r.clearBitmap);
}

export async function rpcSaveSettings(conn: RpcConnection): Promise<void> {
  const r = await rawGremlinRpc(conn, { saveSettings: true });
  assertStatusOk(r.saveSettings);
}

export async function rpcResetGremlinDefaults(conn: RpcConnection): Promise<void> {
  const r = await rawGremlinRpc(conn, { resetGremlinDefaults: true });
  assertStatusOk(r.resetGremlinDefaults);
}

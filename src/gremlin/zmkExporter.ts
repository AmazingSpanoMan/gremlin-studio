import type { Keymap, BehaviorBinding } from "@zmkfirmware/zmk-studio-ts-client/keymap";
import type { GetBehaviorDetailsResponse } from "@zmkfirmware/zmk-studio-ts-client/behaviors";
import {
  BitmapTarget,
  ComboConfig,
  DisplayConfig,
  HoldTapConfig,
  HoldTapFlavor,
  MacroConfig,
  MacroStepType,
  SleepConfig,
  StickConfig,
  StickLayerConfig,
  StickMode,
  TapDanceConfig,
} from "@zmkfirmware/zmk-studio-ts-client/gremlin";
import { formatCByteArray } from "./bitmapUtils";

export interface GremlinProfileBundle {
  version: number;
  exportedAt: string;
  sleepConfig?: SleepConfig;
  displayConfig?: DisplayConfig;
  stickConfig?: StickConfig;
  stickLayers: StickLayerConfig[];
  combos: ComboConfig[];
  holdTaps: HoldTapConfig[];
  tapDances: TapDanceConfig[];
  macros: MacroConfig[];
  bitmaps: {
    boot?: number[];
    sleep?: number[];
    mascots: Record<number, number[]>;
  };
}

const KEY_CODE_MAP: Record<number, string> = {
  0x04: "A", 0x05: "B", 0x06: "C", 0x07: "D", 0x08: "E", 0x09: "F",
  0x0a: "G", 0x0b: "H", 0x0c: "I", 0x0d: "J", 0x0e: "K", 0x0f: "L",
  0x10: "M", 0x11: "N", 0x12: "O", 0x13: "P", 0x14: "Q", 0x15: "R",
  0x16: "S", 0x17: "T", 0x18: "U", 0x19: "V", 0x1a: "W", 0x1b: "X",
  0x1c: "Y", 0x1d: "Z",
  0x1e: "N1", 0x1f: "N2", 0x20: "N3", 0x21: "N4", 0x22: "N5",
  0x23: "N6", 0x24: "N7", 0x25: "N8", 0x26: "N9", 0x27: "N0",
  0x28: "RET", 0x29: "ESC", 0x2a: "BSPC", 0x2b: "TAB", 0x2c: "SPACE",
  0x2d: "MINUS", 0x2e: "EQUAL", 0x2f: "LBKT", 0x30: "RBKT", 0x31: "BSLH",
  0x33: "SEMI", 0x34: "SQT", 0x35: "GRAVE", 0x36: "COMMA", 0x37: "DOT", 0x38: "FSLH",
  0x39: "CAPS",
  0x3a: "F1", 0x3b: "F2", 0x3c: "F3", 0x3d: "F4", 0x3e: "F5", 0x3f: "F6",
  0x40: "F7", 0x41: "F8", 0x42: "F9", 0x43: "F10", 0x44: "F11", 0x45: "F12",
  0x46: "PSCRN", 0x47: "SLCK", 0x48: "PAUSE_BREAK", 0x49: "INS",
  0x4a: "HOME", 0x4b: "PG_UP", 0x4c: "DEL", 0x4d: "END", 0x4e: "PG_DN",
  0x4f: "RIGHT", 0x50: "LEFT", 0x51: "DOWN", 0x52: "UP",
  0xe0: "LCTRL", 0xe1: "LSHFT", 0xe2: "LALT", 0xe3: "LGUI",
  0xe4: "RCTRL", 0xe5: "RSHFT", 0xe6: "RALT", 0xe7: "RGUI",
};

const CONSUMER_MAP: Record<number, string> = {
  0x00cd: "C_PP",
  0x00b5: "C_NEXT",
  0x00b6: "C_PREV",
  0x00e2: "C_MUTE",
  0x00e9: "C_VOL_UP",
  0x00ea: "C_VOL_DN",
  0x006f: "C_BRI_UP",
  0x0070: "C_BRI_DN",
};

function formatHidParam(raw: number): string {
  const mods = (raw >> 24) & 0xff;
  const page = (raw >> 16) & 0xff;
  const id = raw & 0xffff;

  let base = `0x${raw.toString(16)}`;
  if (page === 0x07 && KEY_CODE_MAP[id]) {
    base = KEY_CODE_MAP[id];
  } else if (page === 0x0c && CONSUMER_MAP[id]) {
    base = CONSUMER_MAP[id];
  } else if (page === 0x07) {
    base = `0x${id.toString(16)}`;
  }

  let expr = base;
  if (mods & 0x01) expr = `LC(${expr})`;
  if (mods & 0x02) expr = `LS(${expr})`;
  if (mods & 0x04) expr = `LA(${expr})`;
  if (mods & 0x08) expr = `LG(${expr})`;
  if (mods & 0x10) expr = `RC(${expr})`;
  if (mods & 0x20) expr = `RS(${expr})`;
  if (mods & 0x40) expr = `RA(${expr})`;
  if (mods & 0x80) expr = `RG(${expr})`;
  return expr;
}

function behaviorRefFromDisplayName(name: string): string {
  const n = name.toLowerCase();
  if (n === "key press") return "&kp";
  if (n === "transparent") return "&trans";
  if (n === "none") return "&none";
  if (n === "momentary layer") return "&mo";
  if (n === "to layer") return "&to";
  if (n === "toggle layer") return "&tog";
  if (n === "bluetooth") return "&bt";
  if (n === "output selection") return "&out";
  if (n === "studio unlock") return "&studio_unlock";
  if (n === "bootloader") return "&bootloader";
  if (n === "reset" || n === "system reset") return "&sys_reset";
  if (n === "mouse click") return "&mkp";
  if (n === "mouse key press") return "&mkp";
  if (n === "mod-tap") return "&mt";
  if (n === "layer-tap") return "&lt";
  if (n === "sticky key") return "&sk";
  if (n === "sticky layer") return "&sl";
  if (n === "caps word") return "&caps_word";
  if (n === "key repeat") return "&key_repeat";
  const mHold = /^Gremlin Hold (\d+)$/i.exec(name);
  if (mHold) return `&gh_${parseInt(mHold[1], 10) - 1}`;
  const mTd = /^Gremlin TapDance (\d+)$/i.exec(name);
  if (mTd) return `&gtd_${parseInt(mTd[1], 10) - 1}`;
  const mMac = /^Gremlin Macro (\d+)$/i.exec(name);
  if (mMac) return `&gmac_${parseInt(mMac[1], 10) - 1}`;
  return `&${n.replace(/[^a-z0-9]+/g, "_")}`;
}

export function formatZmkBinding(
  binding: BehaviorBinding | undefined,
  behaviors: Record<number, GetBehaviorDetailsResponse>
): string {
  if (!binding || binding.behaviorId < 0) return "&none";
  const beh = behaviors[binding.behaviorId];
  const ref = beh ? behaviorRefFromDisplayName(beh.displayName) : `&beh_${binding.behaviorId}`;
  const set0 = beh?.metadata?.[0];
  const hasP1 = !!set0?.param1?.length && !set0.param1[0]?.nil;
  const hasP2 = !!set0?.param2?.length && !set0.param2[0]?.nil;

  const isHidP1 = !!set0?.param1?.some((p) => p.hidUsage !== undefined);
  const isHidP2 = !!set0?.param2?.some((p) => p.hidUsage !== undefined);

  if (ref === "&gh_" || ref.startsWith("&gh_")) {
    return `${ref} 0 0`;
  }
  if (!hasP1 && !hasP2) return ref;
  const p1 = isHidP1 ? formatHidParam(binding.param1) : String(binding.param1);
  if (!hasP2) return `${ref} ${p1}`;
  const p2 = isHidP2 ? formatHidParam(binding.param2) : String(binding.param2);
  return `${ref} ${p1} ${p2}`;
}

export function generateKeymapFile(
  keymap: Keymap | undefined,
  behaviors: Record<number, GetBehaviorDetailsResponse>,
  combos: ComboConfig[],
  holdTaps: HoldTapConfig[],
  tapDances: TapDanceConfig[],
  macros: MacroConfig[]
): string {
  const lines: string[] = [
    "/* Exported by Gremlin Studio */",
    "#include <behaviors.dtsi>",
    "#include <dt-bindings/zmk/keys.h>",
    "#include <dt-bindings/zmk/bt.h>",
    "#include <dt-bindings/zmk/outputs.h>",
    "#include <dt-bindings/zmk/pointing.h>",
    "",
    "/ {",
  ];

  const activeHt = holdTaps.filter((h) => h.enabled);
  const activeTd = tapDances.filter((t) => t.enabled);
  const activeMac = macros.filter((m) => m.enabled);

  if (activeHt.length || activeTd.length || activeMac.length) {
    lines.push("    behaviors {");
    for (const ht of activeHt) {
      const flavorStr =
        ht.flavor === HoldTapFlavor.HOLD_TAP_FLAVOR_BALANCED
          ? "balanced"
          : ht.flavor === HoldTapFlavor.HOLD_TAP_FLAVOR_TAP_PREFERRED
          ? "tap-preferred"
          : "hold-preferred";
      lines.push(`        &gh_${ht.index} {`);
      lines.push(`            tapping-term-ms = <${ht.tappingTermMs}>;`);
      if (ht.quickTapMs > 0) lines.push(`            quick-tap-ms = <${ht.quickTapMs}>;`);
      if (ht.requirePriorIdleMs > 0)
        lines.push(`            require-prior-idle-ms = <${ht.requirePriorIdleMs}>;`);
      lines.push(`            flavor = "${flavorStr}";`);
      if (ht.retroTap) lines.push(`            retro-tap;`);
      lines.push(
        `            /* Hold: ${formatZmkBinding(ht.holdBinding, behaviors)} | Tap: ${formatZmkBinding(ht.tapBinding, behaviors)} */`
      );
      lines.push(`        };`);
    }
    for (const td of activeTd) {
      lines.push(`        &gtd_${td.index} {`);
      lines.push(`            tapping-term-ms = <${td.tappingTermMs}>;`);
      lines.push(
        `            bindings = ${td.bindings
          .map((b) => `<${formatZmkBinding(b, behaviors)}>`)
          .join(", ")};`
      );
      lines.push(`        };`);
    }
    for (const mac of activeMac) {
      lines.push(`        &gmac_${mac.index} {`);
      lines.push(`            wait-ms = <${mac.waitMs}>;`);
      lines.push(`            tap-ms = <${mac.tapMs}>;`);
      const stepStrs = mac.steps.map((s) => {
        if (s.type === MacroStepType.MACRO_STEP_WAIT_MS) {
          return `<&macro_wait_time ${s.delayMs}>`;
        }
        const ctrl =
          s.type === MacroStepType.MACRO_STEP_PRESS
            ? "<&macro_press>"
            : s.type === MacroStepType.MACRO_STEP_RELEASE
            ? "<&macro_release>"
            : "<&macro_tap>";
        return `${ctrl}, <${formatZmkBinding(s.binding, behaviors)}>`;
      });
      lines.push(`            bindings = ${stepStrs.join(", ")};`);
      lines.push(`        };`);
    }
    lines.push("    };", "");
  }

  const activeCombos = combos.filter((c) => c.enabled && c.keyPositions.length >= 2);
  if (activeCombos.length > 0) {
    lines.push("    combos {", '        compatible = "zmk,combos";');
    for (const c of activeCombos) {
      lines.push(`        combo_slot_${c.index} {`);
      lines.push(`            timeout-ms = <${c.timeoutMs}>;`);
      if (c.requirePriorIdleMs > 0)
        lines.push(`            require-prior-idle-ms = <${c.requirePriorIdleMs}>;`);
      lines.push(`            key-positions = <${c.keyPositions.join(" ")}>;`);
      if (c.slowRelease) lines.push("            slow-release;");
      if (c.layerMask > 0) {
        const layers: number[] = [];
        for (let b = 0; b < 16; b++) {
          if (c.layerMask & (1 << b)) layers.push(b);
        }
        if (layers.length > 0) lines.push(`            layers = <${layers.join(" ")}>;`);
      }
      lines.push(`            bindings = <${formatZmkBinding(c.binding, behaviors)}>;`);
      lines.push("        };");
    }
    lines.push("    };", "");
  }

  lines.push("    keymap {", '        compatible = "zmk,keymap";', "");
  for (const [idx, layer] of (keymap?.layers ?? []).entries()) {
    const safeName = (layer.name || `layer_${idx}`).replace(/"/g, "");
    const bindings = layer.bindings.map((b) => formatZmkBinding(b, behaviors));
    lines.push(`        layer_${idx} {`);
    lines.push(`            display-name = "${safeName}";`);
    lines.push("            bindings = <");
    for (let i = 0; i < bindings.length; i += 5) {
      lines.push(`                ${bindings.slice(i, i + 5).join("  ")}`);
    }
    lines.push("            >;");
    lines.push("        };", "");
  }
  lines.push("    };", "};");
  return lines.join("\n");
}

export function generateOverlayPatch(
  stickConfig: StickConfig | undefined,
  stickLayers: StickLayerConfig[]
): string {
  const lines: string[] = [
    "/* Gremlin Studio Analog Stick Tuning & Calibration Snippet */",
    "/* Merge into boards/shields/gremlinv3/gremlinv3.overlay */",
  ];
  if (stickConfig) {
    lines.push(
      "&analog_stick0 {",
      `    x-min = <${stickConfig.xMin}>;`,
      `    x-center = <${stickConfig.xCenter}>;`,
      `    x-max = <${stickConfig.xMax}>;`,
      `    y-min = <${stickConfig.yMin}>;`,
      `    y-center = <${stickConfig.yCenter}>;`,
      `    y-max = <${stickConfig.yMax}>;`,
      `    deadzone-percent = <${stickConfig.deadzonePercent}>;`,
      stickConfig.invertX ? "    invert-x;" : "    /* invert-x disabled */",
      stickConfig.invertY ? "    invert-y;" : "    /* invert-y disabled */",
      "};",
      ""
    );
  }
  if (stickLayers.length > 0) {
    lines.push("&analog_stick_listener0 {");
    for (const l of stickLayers) {
      const modeName =
        l.mode === StickMode.STICK_MODE_MOUSE
          ? "ANALOG_STICK_MODE_MOUSE"
          : l.mode === StickMode.STICK_MODE_SCROLL
          ? "ANALOG_STICK_MODE_SCROLL"
          : "ANALOG_STICK_MODE_SWITCH";
      lines.push(`    layer${l.layerIndex} {`);
      lines.push(`        layers = <${l.layerIndex}>;`);
      lines.push(`        mode = <${modeName}>;`);
      if (l.mode === StickMode.STICK_MODE_SWITCH) {
        lines.push(`        switch-activation-point = <${l.switchActivationPoint}>;`);
        lines.push(`        switch-hysteresis = <${l.switchHysteresis}>;`);
        lines.push(`        up-position = <${l.upPosition}>;`);
        lines.push(`        down-position = <${l.downPosition}>;`);
        lines.push(`        left-position = <${l.leftPosition}>;`);
        lines.push(`        right-position = <${l.rightPosition}>;`);
      } else if (l.mode === StickMode.STICK_MODE_MOUSE) {
        lines.push(`        mouse-min-speed = <${l.mouseMinSpeed}>;`);
        lines.push(`        mouse-max-speed = <${l.mouseMaxSpeed}>;`);
      } else {
        lines.push(`        scroll-divisor = <${l.scrollDivisor}>;`);
      }
      lines.push("    };");
    }
    lines.push("};");
  }
  return lines.join("\n");
}

export function generateConfSnippet(sleepConfig: SleepConfig | undefined): string {
  const idle = sleepConfig?.idleTimeoutMs ?? 30000;
  const deep = sleepConfig?.deepSleepMs ?? 900000;
  return [
    "# Gremlin Studio Power & Combo Config Snippet",
    `CONFIG_ZMK_IDLE_TIMEOUT=${idle}`,
    `CONFIG_ZMK_SLEEP=${deep > 0 ? "y" : "n"}`,
    ...(deep > 0 ? [`CONFIG_ZMK_IDLE_SLEEP_TIMEOUT=${deep}`] : []),
    "CONFIG_ZMK_COMBO_RUNTIME_SLOTS=24",
    "CONFIG_ZMK_STUDIO=y",
  ].join("\n");
}

export function generateArtSourceFile(
  boot: Uint8Array | undefined,
  sleep: Uint8Array | undefined,
  mascots: Record<number, Uint8Array>
): string {
  const lines: string[] = [
    '#include "gremlin_art.h"',
    "",
  ];
  if (boot) {
    lines.push(
      "const uint8_t gremlin_boot_bitmap[GREMLIN_BOOT_BITMAP_SIZE] = {",
      formatCByteArray(boot),
      "};",
      ""
    );
  }
  if (sleep) {
    lines.push(
      "const uint8_t gremlin_sleep_bitmap[GREMLIN_SLEEP_BITMAP_SIZE] = {",
      formatCByteArray(sleep),
      "};",
      ""
    );
  }
  const slots = Object.keys(mascots)
    .map((k) => parseInt(k, 10))
    .sort((a, b) => a - b);
  if (slots.length > 0) {
    lines.push(
      `const uint8_t gremlin_mascot_frames[${slots.length}][GREMLIN_MASCOT_BITMAP_SIZE] = {`
    );
    for (const s of slots) {
      lines.push(`    /* Frame ${s} */`, "    {", formatCByteArray(mascots[s], "        "), "    },");
    }
    lines.push("};");
  }
  return lines.join("\n");
}

export { BitmapTarget };

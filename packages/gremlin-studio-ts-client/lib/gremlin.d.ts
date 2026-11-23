import * as _m0 from "protobufjs/minimal";
export declare const protobufPackage = "zmk.gremlin";
export declare enum GremlinStatusCode {
    GREMLIN_STATUS_OK = 0,
    GREMLIN_STATUS_ERR_GENERIC = 1,
    GREMLIN_STATUS_ERR_INVALID_SLOT = 2,
    GREMLIN_STATUS_ERR_INVALID_ARG = 3,
    GREMLIN_STATUS_ERR_NOT_SUPPORTED = 4,
    GREMLIN_STATUS_ERR_NO_SPACE = 5,
    UNRECOGNIZED = -1
}
export declare function gremlinStatusCodeFromJSON(object: any): GremlinStatusCode;
export declare function gremlinStatusCodeToJSON(object: GremlinStatusCode): string;
export declare enum StickMode {
    STICK_MODE_SWITCH = 0,
    STICK_MODE_MOUSE = 1,
    STICK_MODE_SCROLL = 2,
    UNRECOGNIZED = -1
}
export declare function stickModeFromJSON(object: any): StickMode;
export declare function stickModeToJSON(object: StickMode): string;
export declare enum HoldTapFlavor {
    HOLD_TAP_FLAVOR_HOLD_PREFERRED = 0,
    HOLD_TAP_FLAVOR_BALANCED = 1,
    HOLD_TAP_FLAVOR_TAP_PREFERRED = 2,
    UNRECOGNIZED = -1
}
export declare function holdTapFlavorFromJSON(object: any): HoldTapFlavor;
export declare function holdTapFlavorToJSON(object: HoldTapFlavor): string;
export declare enum MacroStepType {
    MACRO_STEP_TAP = 0,
    MACRO_STEP_PRESS = 1,
    MACRO_STEP_RELEASE = 2,
    MACRO_STEP_WAIT_MS = 3,
    UNRECOGNIZED = -1
}
export declare function macroStepTypeFromJSON(object: any): MacroStepType;
export declare function macroStepTypeToJSON(object: MacroStepType): string;
export declare enum BitmapTarget {
    BITMAP_TARGET_MASCOT = 0,
    BITMAP_TARGET_BOOT = 1,
    BITMAP_TARGET_SLEEP = 2,
    UNRECOGNIZED = -1
}
export declare function bitmapTargetFromJSON(object: any): BitmapTarget;
export declare function bitmapTargetToJSON(object: BitmapTarget): string;
export interface BindingSpec {
    behaviorId: number;
    param1: number;
    param2: number;
}
export interface Capabilities {
    protocolVersion: number;
    maxCombos: number;
    maxHoldTaps: number;
    maxTapDances: number;
    maxMacros: number;
    maxMascotFrames: number;
    maxStickLayers: number;
    maxMacroSteps: number;
    maxTapDanceSteps: number;
    maxComboKeys: number;
    bitmapChunkSize: number;
    storageTotalBytes: number;
    storageUsedBytes: number;
}
export interface SleepConfig {
    displaySleepMs: number;
    idleTimeoutMs: number;
    deepSleepMs: number;
}
export interface DisplayConfig {
    showLayerBadge: boolean;
    showBatteryIcon: boolean;
    showBatteryPercent: boolean;
    showOutputBadge: boolean;
    showFooter: boolean;
    showMascot: boolean;
    showMascotBorder: boolean;
    bootDurationMs: number;
    mascotFrameMs: number;
    mascotFrameCount: number;
    animSequence: number[];
}
export interface StickConfig {
    xMin: number;
    xCenter: number;
    xMax: number;
    yMin: number;
    yCenter: number;
    yMax: number;
    invertX: boolean;
    invertY: boolean;
    deadzonePercent: number;
}
export interface StickLayerConfig {
    layerIndex: number;
    mode: StickMode;
    upPosition: number;
    downPosition: number;
    leftPosition: number;
    rightPosition: number;
    switchActivationPoint: number;
    switchHysteresis: number;
    mouseMinSpeed: number;
    mouseMaxSpeed: number;
    scrollDivisor: number;
}
export interface StickTelemetry {
    rawX: number;
    rawY: number;
    outX: number;
    outY: number;
    activeLayer: number;
    l3Pressed: boolean;
}
export interface ComboConfig {
    index: number;
    enabled: boolean;
    timeoutMs: number;
    requirePriorIdleMs: number;
    layerMask: number;
    slowRelease: boolean;
    keyPositions: number[];
    binding: BindingSpec | undefined;
}
export interface HoldTapConfig {
    index: number;
    enabled: boolean;
    tappingTermMs: number;
    quickTapMs: number;
    requirePriorIdleMs: number;
    flavor: HoldTapFlavor;
    retroTap: boolean;
    holdBinding: BindingSpec | undefined;
    tapBinding: BindingSpec | undefined;
}
export interface TapDanceConfig {
    index: number;
    enabled: boolean;
    tappingTermMs: number;
    bindings: BindingSpec[];
}
export interface MacroStep {
    type: MacroStepType;
    binding: BindingSpec | undefined;
    delayMs: number;
}
export interface MacroConfig {
    index: number;
    enabled: boolean;
    waitMs: number;
    tapMs: number;
    steps: MacroStep[];
}
export interface GetBitmapChunkRequest {
    target: BitmapTarget;
    slot: number;
    offset: number;
    length: number;
}
export interface BitmapChunk {
    target: BitmapTarget;
    slot: number;
    offset: number;
    totalSize: number;
    isCustom: boolean;
    data: Uint8Array;
}
export interface SetBitmapChunkRequest {
    target: BitmapTarget;
    slot: number;
    offset: number;
    totalSize: number;
    data: Uint8Array;
}
export interface ClearBitmapRequest {
    target: BitmapTarget;
    slot: number;
}
export interface Request {
    getCapabilities?: boolean | undefined;
    getSleepConfig?: boolean | undefined;
    setSleepConfig?: SleepConfig | undefined;
    getDisplayConfig?: boolean | undefined;
    setDisplayConfig?: DisplayConfig | undefined;
    getStickConfig?: boolean | undefined;
    setStickConfig?: StickConfig | undefined;
    getStickLayerConfig?: number | undefined;
    setStickLayerConfig?: StickLayerConfig | undefined;
    getStickTelemetry?: boolean | undefined;
    getCombo?: number | undefined;
    setCombo?: ComboConfig | undefined;
    getHoldTap?: number | undefined;
    setHoldTap?: HoldTapConfig | undefined;
    getTapDance?: number | undefined;
    setTapDance?: TapDanceConfig | undefined;
    getMacro?: number | undefined;
    setMacro?: MacroConfig | undefined;
    getBitmapChunk?: GetBitmapChunkRequest | undefined;
    setBitmapChunk?: SetBitmapChunkRequest | undefined;
    clearBitmap?: ClearBitmapRequest | undefined;
    saveSettings?: boolean | undefined;
    resetGremlinDefaults?: boolean | undefined;
}
export interface Response {
    getCapabilities?: Capabilities | undefined;
    getSleepConfig?: SleepConfig | undefined;
    setSleepConfig?: GremlinStatusCode | undefined;
    getDisplayConfig?: DisplayConfig | undefined;
    setDisplayConfig?: GremlinStatusCode | undefined;
    getStickConfig?: StickConfig | undefined;
    setStickConfig?: GremlinStatusCode | undefined;
    getStickLayerConfig?: StickLayerConfig | undefined;
    setStickLayerConfig?: GremlinStatusCode | undefined;
    getStickTelemetry?: StickTelemetry | undefined;
    getCombo?: ComboConfig | undefined;
    setCombo?: GremlinStatusCode | undefined;
    getHoldTap?: HoldTapConfig | undefined;
    setHoldTap?: GremlinStatusCode | undefined;
    getTapDance?: TapDanceConfig | undefined;
    setTapDance?: GremlinStatusCode | undefined;
    getMacro?: MacroConfig | undefined;
    setMacro?: GremlinStatusCode | undefined;
    getBitmapChunk?: BitmapChunk | undefined;
    setBitmapChunk?: GremlinStatusCode | undefined;
    clearBitmap?: GremlinStatusCode | undefined;
    saveSettings?: GremlinStatusCode | undefined;
    resetGremlinDefaults?: GremlinStatusCode | undefined;
}
export declare const BindingSpec: {
    encode(message: BindingSpec, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): BindingSpec;
    fromJSON(object: any): BindingSpec;
    toJSON(message: BindingSpec): unknown;
    create<I extends {
        behaviorId?: number;
        param1?: number;
        param2?: number;
    } & {
        behaviorId?: number;
        param1?: number;
        param2?: number;
    } & { [K in Exclude<keyof I, keyof BindingSpec>]: never; }>(base?: I): BindingSpec;
    fromPartial<I_1 extends {
        behaviorId?: number;
        param1?: number;
        param2?: number;
    } & {
        behaviorId?: number;
        param1?: number;
        param2?: number;
    } & { [K_1 in Exclude<keyof I_1, keyof BindingSpec>]: never; }>(object: I_1): BindingSpec;
};
export declare const Capabilities: {
    encode(message: Capabilities, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Capabilities;
    fromJSON(object: any): Capabilities;
    toJSON(message: Capabilities): unknown;
    create<I extends {
        protocolVersion?: number;
        maxCombos?: number;
        maxHoldTaps?: number;
        maxTapDances?: number;
        maxMacros?: number;
        maxMascotFrames?: number;
        maxStickLayers?: number;
        maxMacroSteps?: number;
        maxTapDanceSteps?: number;
        maxComboKeys?: number;
        bitmapChunkSize?: number;
        storageTotalBytes?: number;
        storageUsedBytes?: number;
    } & {
        protocolVersion?: number;
        maxCombos?: number;
        maxHoldTaps?: number;
        maxTapDances?: number;
        maxMacros?: number;
        maxMascotFrames?: number;
        maxStickLayers?: number;
        maxMacroSteps?: number;
        maxTapDanceSteps?: number;
        maxComboKeys?: number;
        bitmapChunkSize?: number;
        storageTotalBytes?: number;
        storageUsedBytes?: number;
    } & { [K in Exclude<keyof I, keyof Capabilities>]: never; }>(base?: I): Capabilities;
    fromPartial<I_1 extends {
        protocolVersion?: number;
        maxCombos?: number;
        maxHoldTaps?: number;
        maxTapDances?: number;
        maxMacros?: number;
        maxMascotFrames?: number;
        maxStickLayers?: number;
        maxMacroSteps?: number;
        maxTapDanceSteps?: number;
        maxComboKeys?: number;
        bitmapChunkSize?: number;
        storageTotalBytes?: number;
        storageUsedBytes?: number;
    } & {
        protocolVersion?: number;
        maxCombos?: number;
        maxHoldTaps?: number;
        maxTapDances?: number;
        maxMacros?: number;
        maxMascotFrames?: number;
        maxStickLayers?: number;
        maxMacroSteps?: number;
        maxTapDanceSteps?: number;
        maxComboKeys?: number;
        bitmapChunkSize?: number;
        storageTotalBytes?: number;
        storageUsedBytes?: number;
    } & { [K_1 in Exclude<keyof I_1, keyof Capabilities>]: never; }>(object: I_1): Capabilities;
};
export declare const SleepConfig: {
    encode(message: SleepConfig, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): SleepConfig;
    fromJSON(object: any): SleepConfig;
    toJSON(message: SleepConfig): unknown;
    create<I extends {
        displaySleepMs?: number;
        idleTimeoutMs?: number;
        deepSleepMs?: number;
    } & {
        displaySleepMs?: number;
        idleTimeoutMs?: number;
        deepSleepMs?: number;
    } & { [K in Exclude<keyof I, keyof SleepConfig>]: never; }>(base?: I): SleepConfig;
    fromPartial<I_1 extends {
        displaySleepMs?: number;
        idleTimeoutMs?: number;
        deepSleepMs?: number;
    } & {
        displaySleepMs?: number;
        idleTimeoutMs?: number;
        deepSleepMs?: number;
    } & { [K_1 in Exclude<keyof I_1, keyof SleepConfig>]: never; }>(object: I_1): SleepConfig;
};
export declare const DisplayConfig: {
    encode(message: DisplayConfig, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): DisplayConfig;
    fromJSON(object: any): DisplayConfig;
    toJSON(message: DisplayConfig): unknown;
    create<I extends {
        showLayerBadge?: boolean;
        showBatteryIcon?: boolean;
        showBatteryPercent?: boolean;
        showOutputBadge?: boolean;
        showFooter?: boolean;
        showMascot?: boolean;
        showMascotBorder?: boolean;
        bootDurationMs?: number;
        mascotFrameMs?: number;
        mascotFrameCount?: number;
        animSequence?: number[];
    } & {
        showLayerBadge?: boolean;
        showBatteryIcon?: boolean;
        showBatteryPercent?: boolean;
        showOutputBadge?: boolean;
        showFooter?: boolean;
        showMascot?: boolean;
        showMascotBorder?: boolean;
        bootDurationMs?: number;
        mascotFrameMs?: number;
        mascotFrameCount?: number;
        animSequence?: number[] & number[] & { [K in Exclude<keyof I["animSequence"], keyof number[]>]: never; };
    } & { [K_1 in Exclude<keyof I, keyof DisplayConfig>]: never; }>(base?: I): DisplayConfig;
    fromPartial<I_1 extends {
        showLayerBadge?: boolean;
        showBatteryIcon?: boolean;
        showBatteryPercent?: boolean;
        showOutputBadge?: boolean;
        showFooter?: boolean;
        showMascot?: boolean;
        showMascotBorder?: boolean;
        bootDurationMs?: number;
        mascotFrameMs?: number;
        mascotFrameCount?: number;
        animSequence?: number[];
    } & {
        showLayerBadge?: boolean;
        showBatteryIcon?: boolean;
        showBatteryPercent?: boolean;
        showOutputBadge?: boolean;
        showFooter?: boolean;
        showMascot?: boolean;
        showMascotBorder?: boolean;
        bootDurationMs?: number;
        mascotFrameMs?: number;
        mascotFrameCount?: number;
        animSequence?: number[] & number[] & { [K_2 in Exclude<keyof I_1["animSequence"], keyof number[]>]: never; };
    } & { [K_3 in Exclude<keyof I_1, keyof DisplayConfig>]: never; }>(object: I_1): DisplayConfig;
};
export declare const StickConfig: {
    encode(message: StickConfig, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): StickConfig;
    fromJSON(object: any): StickConfig;
    toJSON(message: StickConfig): unknown;
    create<I extends {
        xMin?: number;
        xCenter?: number;
        xMax?: number;
        yMin?: number;
        yCenter?: number;
        yMax?: number;
        invertX?: boolean;
        invertY?: boolean;
        deadzonePercent?: number;
    } & {
        xMin?: number;
        xCenter?: number;
        xMax?: number;
        yMin?: number;
        yCenter?: number;
        yMax?: number;
        invertX?: boolean;
        invertY?: boolean;
        deadzonePercent?: number;
    } & { [K in Exclude<keyof I, keyof StickConfig>]: never; }>(base?: I): StickConfig;
    fromPartial<I_1 extends {
        xMin?: number;
        xCenter?: number;
        xMax?: number;
        yMin?: number;
        yCenter?: number;
        yMax?: number;
        invertX?: boolean;
        invertY?: boolean;
        deadzonePercent?: number;
    } & {
        xMin?: number;
        xCenter?: number;
        xMax?: number;
        yMin?: number;
        yCenter?: number;
        yMax?: number;
        invertX?: boolean;
        invertY?: boolean;
        deadzonePercent?: number;
    } & { [K_1 in Exclude<keyof I_1, keyof StickConfig>]: never; }>(object: I_1): StickConfig;
};
export declare const StickLayerConfig: {
    encode(message: StickLayerConfig, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): StickLayerConfig;
    fromJSON(object: any): StickLayerConfig;
    toJSON(message: StickLayerConfig): unknown;
    create<I extends {
        layerIndex?: number;
        mode?: StickMode;
        upPosition?: number;
        downPosition?: number;
        leftPosition?: number;
        rightPosition?: number;
        switchActivationPoint?: number;
        switchHysteresis?: number;
        mouseMinSpeed?: number;
        mouseMaxSpeed?: number;
        scrollDivisor?: number;
    } & {
        layerIndex?: number;
        mode?: StickMode;
        upPosition?: number;
        downPosition?: number;
        leftPosition?: number;
        rightPosition?: number;
        switchActivationPoint?: number;
        switchHysteresis?: number;
        mouseMinSpeed?: number;
        mouseMaxSpeed?: number;
        scrollDivisor?: number;
    } & { [K in Exclude<keyof I, keyof StickLayerConfig>]: never; }>(base?: I): StickLayerConfig;
    fromPartial<I_1 extends {
        layerIndex?: number;
        mode?: StickMode;
        upPosition?: number;
        downPosition?: number;
        leftPosition?: number;
        rightPosition?: number;
        switchActivationPoint?: number;
        switchHysteresis?: number;
        mouseMinSpeed?: number;
        mouseMaxSpeed?: number;
        scrollDivisor?: number;
    } & {
        layerIndex?: number;
        mode?: StickMode;
        upPosition?: number;
        downPosition?: number;
        leftPosition?: number;
        rightPosition?: number;
        switchActivationPoint?: number;
        switchHysteresis?: number;
        mouseMinSpeed?: number;
        mouseMaxSpeed?: number;
        scrollDivisor?: number;
    } & { [K_1 in Exclude<keyof I_1, keyof StickLayerConfig>]: never; }>(object: I_1): StickLayerConfig;
};
export declare const StickTelemetry: {
    encode(message: StickTelemetry, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): StickTelemetry;
    fromJSON(object: any): StickTelemetry;
    toJSON(message: StickTelemetry): unknown;
    create<I extends {
        rawX?: number;
        rawY?: number;
        outX?: number;
        outY?: number;
        activeLayer?: number;
        l3Pressed?: boolean;
    } & {
        rawX?: number;
        rawY?: number;
        outX?: number;
        outY?: number;
        activeLayer?: number;
        l3Pressed?: boolean;
    } & { [K in Exclude<keyof I, keyof StickTelemetry>]: never; }>(base?: I): StickTelemetry;
    fromPartial<I_1 extends {
        rawX?: number;
        rawY?: number;
        outX?: number;
        outY?: number;
        activeLayer?: number;
        l3Pressed?: boolean;
    } & {
        rawX?: number;
        rawY?: number;
        outX?: number;
        outY?: number;
        activeLayer?: number;
        l3Pressed?: boolean;
    } & { [K_1 in Exclude<keyof I_1, keyof StickTelemetry>]: never; }>(object: I_1): StickTelemetry;
};
export declare const ComboConfig: {
    encode(message: ComboConfig, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ComboConfig;
    fromJSON(object: any): ComboConfig;
    toJSON(message: ComboConfig): unknown;
    create<I extends {
        index?: number;
        enabled?: boolean;
        timeoutMs?: number;
        requirePriorIdleMs?: number;
        layerMask?: number;
        slowRelease?: boolean;
        keyPositions?: number[];
        binding?: {
            behaviorId?: number;
            param1?: number;
            param2?: number;
        };
    } & {
        index?: number;
        enabled?: boolean;
        timeoutMs?: number;
        requirePriorIdleMs?: number;
        layerMask?: number;
        slowRelease?: boolean;
        keyPositions?: number[] & number[] & { [K in Exclude<keyof I["keyPositions"], keyof number[]>]: never; };
        binding?: {
            behaviorId?: number;
            param1?: number;
            param2?: number;
        } & {
            behaviorId?: number;
            param1?: number;
            param2?: number;
        } & { [K_1 in Exclude<keyof I["binding"], keyof BindingSpec>]: never; };
    } & { [K_2 in Exclude<keyof I, keyof ComboConfig>]: never; }>(base?: I): ComboConfig;
    fromPartial<I_1 extends {
        index?: number;
        enabled?: boolean;
        timeoutMs?: number;
        requirePriorIdleMs?: number;
        layerMask?: number;
        slowRelease?: boolean;
        keyPositions?: number[];
        binding?: {
            behaviorId?: number;
            param1?: number;
            param2?: number;
        };
    } & {
        index?: number;
        enabled?: boolean;
        timeoutMs?: number;
        requirePriorIdleMs?: number;
        layerMask?: number;
        slowRelease?: boolean;
        keyPositions?: number[] & number[] & { [K_3 in Exclude<keyof I_1["keyPositions"], keyof number[]>]: never; };
        binding?: {
            behaviorId?: number;
            param1?: number;
            param2?: number;
        } & {
            behaviorId?: number;
            param1?: number;
            param2?: number;
        } & { [K_4 in Exclude<keyof I_1["binding"], keyof BindingSpec>]: never; };
    } & { [K_5 in Exclude<keyof I_1, keyof ComboConfig>]: never; }>(object: I_1): ComboConfig;
};
export declare const HoldTapConfig: {
    encode(message: HoldTapConfig, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): HoldTapConfig;
    fromJSON(object: any): HoldTapConfig;
    toJSON(message: HoldTapConfig): unknown;
    create<I extends {
        index?: number;
        enabled?: boolean;
        tappingTermMs?: number;
        quickTapMs?: number;
        requirePriorIdleMs?: number;
        flavor?: HoldTapFlavor;
        retroTap?: boolean;
        holdBinding?: {
            behaviorId?: number;
            param1?: number;
            param2?: number;
        };
        tapBinding?: {
            behaviorId?: number;
            param1?: number;
            param2?: number;
        };
    } & {
        index?: number;
        enabled?: boolean;
        tappingTermMs?: number;
        quickTapMs?: number;
        requirePriorIdleMs?: number;
        flavor?: HoldTapFlavor;
        retroTap?: boolean;
        holdBinding?: {
            behaviorId?: number;
            param1?: number;
            param2?: number;
        } & {
            behaviorId?: number;
            param1?: number;
            param2?: number;
        } & { [K in Exclude<keyof I["holdBinding"], keyof BindingSpec>]: never; };
        tapBinding?: {
            behaviorId?: number;
            param1?: number;
            param2?: number;
        } & {
            behaviorId?: number;
            param1?: number;
            param2?: number;
        } & { [K_1 in Exclude<keyof I["tapBinding"], keyof BindingSpec>]: never; };
    } & { [K_2 in Exclude<keyof I, keyof HoldTapConfig>]: never; }>(base?: I): HoldTapConfig;
    fromPartial<I_1 extends {
        index?: number;
        enabled?: boolean;
        tappingTermMs?: number;
        quickTapMs?: number;
        requirePriorIdleMs?: number;
        flavor?: HoldTapFlavor;
        retroTap?: boolean;
        holdBinding?: {
            behaviorId?: number;
            param1?: number;
            param2?: number;
        };
        tapBinding?: {
            behaviorId?: number;
            param1?: number;
            param2?: number;
        };
    } & {
        index?: number;
        enabled?: boolean;
        tappingTermMs?: number;
        quickTapMs?: number;
        requirePriorIdleMs?: number;
        flavor?: HoldTapFlavor;
        retroTap?: boolean;
        holdBinding?: {
            behaviorId?: number;
            param1?: number;
            param2?: number;
        } & {
            behaviorId?: number;
            param1?: number;
            param2?: number;
        } & { [K_3 in Exclude<keyof I_1["holdBinding"], keyof BindingSpec>]: never; };
        tapBinding?: {
            behaviorId?: number;
            param1?: number;
            param2?: number;
        } & {
            behaviorId?: number;
            param1?: number;
            param2?: number;
        } & { [K_4 in Exclude<keyof I_1["tapBinding"], keyof BindingSpec>]: never; };
    } & { [K_5 in Exclude<keyof I_1, keyof HoldTapConfig>]: never; }>(object: I_1): HoldTapConfig;
};
export declare const TapDanceConfig: {
    encode(message: TapDanceConfig, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): TapDanceConfig;
    fromJSON(object: any): TapDanceConfig;
    toJSON(message: TapDanceConfig): unknown;
    create<I extends {
        index?: number;
        enabled?: boolean;
        tappingTermMs?: number;
        bindings?: {
            behaviorId?: number;
            param1?: number;
            param2?: number;
        }[];
    } & {
        index?: number;
        enabled?: boolean;
        tappingTermMs?: number;
        bindings?: {
            behaviorId?: number;
            param1?: number;
            param2?: number;
        }[] & ({
            behaviorId?: number;
            param1?: number;
            param2?: number;
        } & {
            behaviorId?: number;
            param1?: number;
            param2?: number;
        } & { [K in Exclude<keyof I["bindings"][number], keyof BindingSpec>]: never; })[] & { [K_1 in Exclude<keyof I["bindings"], keyof {
            behaviorId?: number;
            param1?: number;
            param2?: number;
        }[]>]: never; };
    } & { [K_2 in Exclude<keyof I, keyof TapDanceConfig>]: never; }>(base?: I): TapDanceConfig;
    fromPartial<I_1 extends {
        index?: number;
        enabled?: boolean;
        tappingTermMs?: number;
        bindings?: {
            behaviorId?: number;
            param1?: number;
            param2?: number;
        }[];
    } & {
        index?: number;
        enabled?: boolean;
        tappingTermMs?: number;
        bindings?: {
            behaviorId?: number;
            param1?: number;
            param2?: number;
        }[] & ({
            behaviorId?: number;
            param1?: number;
            param2?: number;
        } & {
            behaviorId?: number;
            param1?: number;
            param2?: number;
        } & { [K_3 in Exclude<keyof I_1["bindings"][number], keyof BindingSpec>]: never; })[] & { [K_4 in Exclude<keyof I_1["bindings"], keyof {
            behaviorId?: number;
            param1?: number;
            param2?: number;
        }[]>]: never; };
    } & { [K_5 in Exclude<keyof I_1, keyof TapDanceConfig>]: never; }>(object: I_1): TapDanceConfig;
};
export declare const MacroStep: {
    encode(message: MacroStep, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MacroStep;
    fromJSON(object: any): MacroStep;
    toJSON(message: MacroStep): unknown;
    create<I extends {
        type?: MacroStepType;
        binding?: {
            behaviorId?: number;
            param1?: number;
            param2?: number;
        };
        delayMs?: number;
    } & {
        type?: MacroStepType;
        binding?: {
            behaviorId?: number;
            param1?: number;
            param2?: number;
        } & {
            behaviorId?: number;
            param1?: number;
            param2?: number;
        } & { [K in Exclude<keyof I["binding"], keyof BindingSpec>]: never; };
        delayMs?: number;
    } & { [K_1 in Exclude<keyof I, keyof MacroStep>]: never; }>(base?: I): MacroStep;
    fromPartial<I_1 extends {
        type?: MacroStepType;
        binding?: {
            behaviorId?: number;
            param1?: number;
            param2?: number;
        };
        delayMs?: number;
    } & {
        type?: MacroStepType;
        binding?: {
            behaviorId?: number;
            param1?: number;
            param2?: number;
        } & {
            behaviorId?: number;
            param1?: number;
            param2?: number;
        } & { [K_2 in Exclude<keyof I_1["binding"], keyof BindingSpec>]: never; };
        delayMs?: number;
    } & { [K_3 in Exclude<keyof I_1, keyof MacroStep>]: never; }>(object: I_1): MacroStep;
};
export declare const MacroConfig: {
    encode(message: MacroConfig, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): MacroConfig;
    fromJSON(object: any): MacroConfig;
    toJSON(message: MacroConfig): unknown;
    create<I extends {
        index?: number;
        enabled?: boolean;
        waitMs?: number;
        tapMs?: number;
        steps?: {
            type?: MacroStepType;
            binding?: {
                behaviorId?: number;
                param1?: number;
                param2?: number;
            };
            delayMs?: number;
        }[];
    } & {
        index?: number;
        enabled?: boolean;
        waitMs?: number;
        tapMs?: number;
        steps?: {
            type?: MacroStepType;
            binding?: {
                behaviorId?: number;
                param1?: number;
                param2?: number;
            };
            delayMs?: number;
        }[] & ({
            type?: MacroStepType;
            binding?: {
                behaviorId?: number;
                param1?: number;
                param2?: number;
            };
            delayMs?: number;
        } & {
            type?: MacroStepType;
            binding?: {
                behaviorId?: number;
                param1?: number;
                param2?: number;
            } & {
                behaviorId?: number;
                param1?: number;
                param2?: number;
            } & { [K in Exclude<keyof I["steps"][number]["binding"], keyof BindingSpec>]: never; };
            delayMs?: number;
        } & { [K_1 in Exclude<keyof I["steps"][number], keyof MacroStep>]: never; })[] & { [K_2 in Exclude<keyof I["steps"], keyof {
            type?: MacroStepType;
            binding?: {
                behaviorId?: number;
                param1?: number;
                param2?: number;
            };
            delayMs?: number;
        }[]>]: never; };
    } & { [K_3 in Exclude<keyof I, keyof MacroConfig>]: never; }>(base?: I): MacroConfig;
    fromPartial<I_1 extends {
        index?: number;
        enabled?: boolean;
        waitMs?: number;
        tapMs?: number;
        steps?: {
            type?: MacroStepType;
            binding?: {
                behaviorId?: number;
                param1?: number;
                param2?: number;
            };
            delayMs?: number;
        }[];
    } & {
        index?: number;
        enabled?: boolean;
        waitMs?: number;
        tapMs?: number;
        steps?: {
            type?: MacroStepType;
            binding?: {
                behaviorId?: number;
                param1?: number;
                param2?: number;
            };
            delayMs?: number;
        }[] & ({
            type?: MacroStepType;
            binding?: {
                behaviorId?: number;
                param1?: number;
                param2?: number;
            };
            delayMs?: number;
        } & {
            type?: MacroStepType;
            binding?: {
                behaviorId?: number;
                param1?: number;
                param2?: number;
            } & {
                behaviorId?: number;
                param1?: number;
                param2?: number;
            } & { [K_4 in Exclude<keyof I_1["steps"][number]["binding"], keyof BindingSpec>]: never; };
            delayMs?: number;
        } & { [K_5 in Exclude<keyof I_1["steps"][number], keyof MacroStep>]: never; })[] & { [K_6 in Exclude<keyof I_1["steps"], keyof {
            type?: MacroStepType;
            binding?: {
                behaviorId?: number;
                param1?: number;
                param2?: number;
            };
            delayMs?: number;
        }[]>]: never; };
    } & { [K_7 in Exclude<keyof I_1, keyof MacroConfig>]: never; }>(object: I_1): MacroConfig;
};
export declare const GetBitmapChunkRequest: {
    encode(message: GetBitmapChunkRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): GetBitmapChunkRequest;
    fromJSON(object: any): GetBitmapChunkRequest;
    toJSON(message: GetBitmapChunkRequest): unknown;
    create<I extends {
        target?: BitmapTarget;
        slot?: number;
        offset?: number;
        length?: number;
    } & {
        target?: BitmapTarget;
        slot?: number;
        offset?: number;
        length?: number;
    } & { [K in Exclude<keyof I, keyof GetBitmapChunkRequest>]: never; }>(base?: I): GetBitmapChunkRequest;
    fromPartial<I_1 extends {
        target?: BitmapTarget;
        slot?: number;
        offset?: number;
        length?: number;
    } & {
        target?: BitmapTarget;
        slot?: number;
        offset?: number;
        length?: number;
    } & { [K_1 in Exclude<keyof I_1, keyof GetBitmapChunkRequest>]: never; }>(object: I_1): GetBitmapChunkRequest;
};
export declare const BitmapChunk: {
    encode(message: BitmapChunk, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): BitmapChunk;
    fromJSON(object: any): BitmapChunk;
    toJSON(message: BitmapChunk): unknown;
    create<I extends {
        target?: BitmapTarget;
        slot?: number;
        offset?: number;
        totalSize?: number;
        isCustom?: boolean;
        data?: Uint8Array;
    } & {
        target?: BitmapTarget;
        slot?: number;
        offset?: number;
        totalSize?: number;
        isCustom?: boolean;
        data?: Uint8Array;
    } & { [K in Exclude<keyof I, keyof BitmapChunk>]: never; }>(base?: I): BitmapChunk;
    fromPartial<I_1 extends {
        target?: BitmapTarget;
        slot?: number;
        offset?: number;
        totalSize?: number;
        isCustom?: boolean;
        data?: Uint8Array;
    } & {
        target?: BitmapTarget;
        slot?: number;
        offset?: number;
        totalSize?: number;
        isCustom?: boolean;
        data?: Uint8Array;
    } & { [K_1 in Exclude<keyof I_1, keyof BitmapChunk>]: never; }>(object: I_1): BitmapChunk;
};
export declare const SetBitmapChunkRequest: {
    encode(message: SetBitmapChunkRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): SetBitmapChunkRequest;
    fromJSON(object: any): SetBitmapChunkRequest;
    toJSON(message: SetBitmapChunkRequest): unknown;
    create<I extends {
        target?: BitmapTarget;
        slot?: number;
        offset?: number;
        totalSize?: number;
        data?: Uint8Array;
    } & {
        target?: BitmapTarget;
        slot?: number;
        offset?: number;
        totalSize?: number;
        data?: Uint8Array;
    } & { [K in Exclude<keyof I, keyof SetBitmapChunkRequest>]: never; }>(base?: I): SetBitmapChunkRequest;
    fromPartial<I_1 extends {
        target?: BitmapTarget;
        slot?: number;
        offset?: number;
        totalSize?: number;
        data?: Uint8Array;
    } & {
        target?: BitmapTarget;
        slot?: number;
        offset?: number;
        totalSize?: number;
        data?: Uint8Array;
    } & { [K_1 in Exclude<keyof I_1, keyof SetBitmapChunkRequest>]: never; }>(object: I_1): SetBitmapChunkRequest;
};
export declare const ClearBitmapRequest: {
    encode(message: ClearBitmapRequest, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): ClearBitmapRequest;
    fromJSON(object: any): ClearBitmapRequest;
    toJSON(message: ClearBitmapRequest): unknown;
    create<I extends {
        target?: BitmapTarget;
        slot?: number;
    } & {
        target?: BitmapTarget;
        slot?: number;
    } & { [K in Exclude<keyof I, keyof ClearBitmapRequest>]: never; }>(base?: I): ClearBitmapRequest;
    fromPartial<I_1 extends {
        target?: BitmapTarget;
        slot?: number;
    } & {
        target?: BitmapTarget;
        slot?: number;
    } & { [K_1 in Exclude<keyof I_1, keyof ClearBitmapRequest>]: never; }>(object: I_1): ClearBitmapRequest;
};
export declare const Request: {
    encode(message: Request, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Request;
    fromJSON(object: any): Request;
    toJSON(message: Request): unknown;
    create<I extends {
        getCapabilities?: boolean | undefined;
        getSleepConfig?: boolean | undefined;
        setSleepConfig?: {
            displaySleepMs?: number;
            idleTimeoutMs?: number;
            deepSleepMs?: number;
        };
        getDisplayConfig?: boolean | undefined;
        setDisplayConfig?: {
            showLayerBadge?: boolean;
            showBatteryIcon?: boolean;
            showBatteryPercent?: boolean;
            showOutputBadge?: boolean;
            showFooter?: boolean;
            showMascot?: boolean;
            showMascotBorder?: boolean;
            bootDurationMs?: number;
            mascotFrameMs?: number;
            mascotFrameCount?: number;
            animSequence?: number[];
        };
        getStickConfig?: boolean | undefined;
        setStickConfig?: {
            xMin?: number;
            xCenter?: number;
            xMax?: number;
            yMin?: number;
            yCenter?: number;
            yMax?: number;
            invertX?: boolean;
            invertY?: boolean;
            deadzonePercent?: number;
        };
        getStickLayerConfig?: number | undefined;
        setStickLayerConfig?: {
            layerIndex?: number;
            mode?: StickMode;
            upPosition?: number;
            downPosition?: number;
            leftPosition?: number;
            rightPosition?: number;
            switchActivationPoint?: number;
            switchHysteresis?: number;
            mouseMinSpeed?: number;
            mouseMaxSpeed?: number;
            scrollDivisor?: number;
        };
        getStickTelemetry?: boolean | undefined;
        getCombo?: number | undefined;
        setCombo?: {
            index?: number;
            enabled?: boolean;
            timeoutMs?: number;
            requirePriorIdleMs?: number;
            layerMask?: number;
            slowRelease?: boolean;
            keyPositions?: number[];
            binding?: {
                behaviorId?: number;
                param1?: number;
                param2?: number;
            };
        };
        getHoldTap?: number | undefined;
        setHoldTap?: {
            index?: number;
            enabled?: boolean;
            tappingTermMs?: number;
            quickTapMs?: number;
            requirePriorIdleMs?: number;
            flavor?: HoldTapFlavor;
            retroTap?: boolean;
            holdBinding?: {
                behaviorId?: number;
                param1?: number;
                param2?: number;
            };
            tapBinding?: {
                behaviorId?: number;
                param1?: number;
                param2?: number;
            };
        };
        getTapDance?: number | undefined;
        setTapDance?: {
            index?: number;
            enabled?: boolean;
            tappingTermMs?: number;
            bindings?: {
                behaviorId?: number;
                param1?: number;
                param2?: number;
            }[];
        };
        getMacro?: number | undefined;
        setMacro?: {
            index?: number;
            enabled?: boolean;
            waitMs?: number;
            tapMs?: number;
            steps?: {
                type?: MacroStepType;
                binding?: {
                    behaviorId?: number;
                    param1?: number;
                    param2?: number;
                };
                delayMs?: number;
            }[];
        };
        getBitmapChunk?: {
            target?: BitmapTarget;
            slot?: number;
            offset?: number;
            length?: number;
        };
        setBitmapChunk?: {
            target?: BitmapTarget;
            slot?: number;
            offset?: number;
            totalSize?: number;
            data?: Uint8Array;
        };
        clearBitmap?: {
            target?: BitmapTarget;
            slot?: number;
        };
        saveSettings?: boolean | undefined;
        resetGremlinDefaults?: boolean | undefined;
    } & {
        getCapabilities?: boolean | undefined;
        getSleepConfig?: boolean | undefined;
        setSleepConfig?: {
            displaySleepMs?: number;
            idleTimeoutMs?: number;
            deepSleepMs?: number;
        } & {
            displaySleepMs?: number;
            idleTimeoutMs?: number;
            deepSleepMs?: number;
        } & { [K in Exclude<keyof I["setSleepConfig"], keyof SleepConfig>]: never; };
        getDisplayConfig?: boolean | undefined;
        setDisplayConfig?: {
            showLayerBadge?: boolean;
            showBatteryIcon?: boolean;
            showBatteryPercent?: boolean;
            showOutputBadge?: boolean;
            showFooter?: boolean;
            showMascot?: boolean;
            showMascotBorder?: boolean;
            bootDurationMs?: number;
            mascotFrameMs?: number;
            mascotFrameCount?: number;
            animSequence?: number[];
        } & {
            showLayerBadge?: boolean;
            showBatteryIcon?: boolean;
            showBatteryPercent?: boolean;
            showOutputBadge?: boolean;
            showFooter?: boolean;
            showMascot?: boolean;
            showMascotBorder?: boolean;
            bootDurationMs?: number;
            mascotFrameMs?: number;
            mascotFrameCount?: number;
            animSequence?: number[] & number[] & { [K_1 in Exclude<keyof I["setDisplayConfig"]["animSequence"], keyof number[]>]: never; };
        } & { [K_2 in Exclude<keyof I["setDisplayConfig"], keyof DisplayConfig>]: never; };
        getStickConfig?: boolean | undefined;
        setStickConfig?: {
            xMin?: number;
            xCenter?: number;
            xMax?: number;
            yMin?: number;
            yCenter?: number;
            yMax?: number;
            invertX?: boolean;
            invertY?: boolean;
            deadzonePercent?: number;
        } & {
            xMin?: number;
            xCenter?: number;
            xMax?: number;
            yMin?: number;
            yCenter?: number;
            yMax?: number;
            invertX?: boolean;
            invertY?: boolean;
            deadzonePercent?: number;
        } & { [K_3 in Exclude<keyof I["setStickConfig"], keyof StickConfig>]: never; };
        getStickLayerConfig?: number | undefined;
        setStickLayerConfig?: {
            layerIndex?: number;
            mode?: StickMode;
            upPosition?: number;
            downPosition?: number;
            leftPosition?: number;
            rightPosition?: number;
            switchActivationPoint?: number;
            switchHysteresis?: number;
            mouseMinSpeed?: number;
            mouseMaxSpeed?: number;
            scrollDivisor?: number;
        } & {
            layerIndex?: number;
            mode?: StickMode;
            upPosition?: number;
            downPosition?: number;
            leftPosition?: number;
            rightPosition?: number;
            switchActivationPoint?: number;
            switchHysteresis?: number;
            mouseMinSpeed?: number;
            mouseMaxSpeed?: number;
            scrollDivisor?: number;
        } & { [K_4 in Exclude<keyof I["setStickLayerConfig"], keyof StickLayerConfig>]: never; };
        getStickTelemetry?: boolean | undefined;
        getCombo?: number | undefined;
        setCombo?: {
            index?: number;
            enabled?: boolean;
            timeoutMs?: number;
            requirePriorIdleMs?: number;
            layerMask?: number;
            slowRelease?: boolean;
            keyPositions?: number[];
            binding?: {
                behaviorId?: number;
                param1?: number;
                param2?: number;
            };
        } & {
            index?: number;
            enabled?: boolean;
            timeoutMs?: number;
            requirePriorIdleMs?: number;
            layerMask?: number;
            slowRelease?: boolean;
            keyPositions?: number[] & number[] & { [K_5 in Exclude<keyof I["setCombo"]["keyPositions"], keyof number[]>]: never; };
            binding?: {
                behaviorId?: number;
                param1?: number;
                param2?: number;
            } & {
                behaviorId?: number;
                param1?: number;
                param2?: number;
            } & { [K_6 in Exclude<keyof I["setCombo"]["binding"], keyof BindingSpec>]: never; };
        } & { [K_7 in Exclude<keyof I["setCombo"], keyof ComboConfig>]: never; };
        getHoldTap?: number | undefined;
        setHoldTap?: {
            index?: number;
            enabled?: boolean;
            tappingTermMs?: number;
            quickTapMs?: number;
            requirePriorIdleMs?: number;
            flavor?: HoldTapFlavor;
            retroTap?: boolean;
            holdBinding?: {
                behaviorId?: number;
                param1?: number;
                param2?: number;
            };
            tapBinding?: {
                behaviorId?: number;
                param1?: number;
                param2?: number;
            };
        } & {
            index?: number;
            enabled?: boolean;
            tappingTermMs?: number;
            quickTapMs?: number;
            requirePriorIdleMs?: number;
            flavor?: HoldTapFlavor;
            retroTap?: boolean;
            holdBinding?: {
                behaviorId?: number;
                param1?: number;
                param2?: number;
            } & {
                behaviorId?: number;
                param1?: number;
                param2?: number;
            } & { [K_8 in Exclude<keyof I["setHoldTap"]["holdBinding"], keyof BindingSpec>]: never; };
            tapBinding?: {
                behaviorId?: number;
                param1?: number;
                param2?: number;
            } & {
                behaviorId?: number;
                param1?: number;
                param2?: number;
            } & { [K_9 in Exclude<keyof I["setHoldTap"]["tapBinding"], keyof BindingSpec>]: never; };
        } & { [K_10 in Exclude<keyof I["setHoldTap"], keyof HoldTapConfig>]: never; };
        getTapDance?: number | undefined;
        setTapDance?: {
            index?: number;
            enabled?: boolean;
            tappingTermMs?: number;
            bindings?: {
                behaviorId?: number;
                param1?: number;
                param2?: number;
            }[];
        } & {
            index?: number;
            enabled?: boolean;
            tappingTermMs?: number;
            bindings?: {
                behaviorId?: number;
                param1?: number;
                param2?: number;
            }[] & ({
                behaviorId?: number;
                param1?: number;
                param2?: number;
            } & {
                behaviorId?: number;
                param1?: number;
                param2?: number;
            } & { [K_11 in Exclude<keyof I["setTapDance"]["bindings"][number], keyof BindingSpec>]: never; })[] & { [K_12 in Exclude<keyof I["setTapDance"]["bindings"], keyof {
                behaviorId?: number;
                param1?: number;
                param2?: number;
            }[]>]: never; };
        } & { [K_13 in Exclude<keyof I["setTapDance"], keyof TapDanceConfig>]: never; };
        getMacro?: number | undefined;
        setMacro?: {
            index?: number;
            enabled?: boolean;
            waitMs?: number;
            tapMs?: number;
            steps?: {
                type?: MacroStepType;
                binding?: {
                    behaviorId?: number;
                    param1?: number;
                    param2?: number;
                };
                delayMs?: number;
            }[];
        } & {
            index?: number;
            enabled?: boolean;
            waitMs?: number;
            tapMs?: number;
            steps?: {
                type?: MacroStepType;
                binding?: {
                    behaviorId?: number;
                    param1?: number;
                    param2?: number;
                };
                delayMs?: number;
            }[] & ({
                type?: MacroStepType;
                binding?: {
                    behaviorId?: number;
                    param1?: number;
                    param2?: number;
                };
                delayMs?: number;
            } & {
                type?: MacroStepType;
                binding?: {
                    behaviorId?: number;
                    param1?: number;
                    param2?: number;
                } & {
                    behaviorId?: number;
                    param1?: number;
                    param2?: number;
                } & { [K_14 in Exclude<keyof I["setMacro"]["steps"][number]["binding"], keyof BindingSpec>]: never; };
                delayMs?: number;
            } & { [K_15 in Exclude<keyof I["setMacro"]["steps"][number], keyof MacroStep>]: never; })[] & { [K_16 in Exclude<keyof I["setMacro"]["steps"], keyof {
                type?: MacroStepType;
                binding?: {
                    behaviorId?: number;
                    param1?: number;
                    param2?: number;
                };
                delayMs?: number;
            }[]>]: never; };
        } & { [K_17 in Exclude<keyof I["setMacro"], keyof MacroConfig>]: never; };
        getBitmapChunk?: {
            target?: BitmapTarget;
            slot?: number;
            offset?: number;
            length?: number;
        } & {
            target?: BitmapTarget;
            slot?: number;
            offset?: number;
            length?: number;
        } & { [K_18 in Exclude<keyof I["getBitmapChunk"], keyof GetBitmapChunkRequest>]: never; };
        setBitmapChunk?: {
            target?: BitmapTarget;
            slot?: number;
            offset?: number;
            totalSize?: number;
            data?: Uint8Array;
        } & {
            target?: BitmapTarget;
            slot?: number;
            offset?: number;
            totalSize?: number;
            data?: Uint8Array;
        } & { [K_19 in Exclude<keyof I["setBitmapChunk"], keyof SetBitmapChunkRequest>]: never; };
        clearBitmap?: {
            target?: BitmapTarget;
            slot?: number;
        } & {
            target?: BitmapTarget;
            slot?: number;
        } & { [K_20 in Exclude<keyof I["clearBitmap"], keyof ClearBitmapRequest>]: never; };
        saveSettings?: boolean | undefined;
        resetGremlinDefaults?: boolean | undefined;
    } & { [K_21 in Exclude<keyof I, keyof Request>]: never; }>(base?: I): Request;
    fromPartial<I_1 extends {
        getCapabilities?: boolean | undefined;
        getSleepConfig?: boolean | undefined;
        setSleepConfig?: {
            displaySleepMs?: number;
            idleTimeoutMs?: number;
            deepSleepMs?: number;
        };
        getDisplayConfig?: boolean | undefined;
        setDisplayConfig?: {
            showLayerBadge?: boolean;
            showBatteryIcon?: boolean;
            showBatteryPercent?: boolean;
            showOutputBadge?: boolean;
            showFooter?: boolean;
            showMascot?: boolean;
            showMascotBorder?: boolean;
            bootDurationMs?: number;
            mascotFrameMs?: number;
            mascotFrameCount?: number;
            animSequence?: number[];
        };
        getStickConfig?: boolean | undefined;
        setStickConfig?: {
            xMin?: number;
            xCenter?: number;
            xMax?: number;
            yMin?: number;
            yCenter?: number;
            yMax?: number;
            invertX?: boolean;
            invertY?: boolean;
            deadzonePercent?: number;
        };
        getStickLayerConfig?: number | undefined;
        setStickLayerConfig?: {
            layerIndex?: number;
            mode?: StickMode;
            upPosition?: number;
            downPosition?: number;
            leftPosition?: number;
            rightPosition?: number;
            switchActivationPoint?: number;
            switchHysteresis?: number;
            mouseMinSpeed?: number;
            mouseMaxSpeed?: number;
            scrollDivisor?: number;
        };
        getStickTelemetry?: boolean | undefined;
        getCombo?: number | undefined;
        setCombo?: {
            index?: number;
            enabled?: boolean;
            timeoutMs?: number;
            requirePriorIdleMs?: number;
            layerMask?: number;
            slowRelease?: boolean;
            keyPositions?: number[];
            binding?: {
                behaviorId?: number;
                param1?: number;
                param2?: number;
            };
        };
        getHoldTap?: number | undefined;
        setHoldTap?: {
            index?: number;
            enabled?: boolean;
            tappingTermMs?: number;
            quickTapMs?: number;
            requirePriorIdleMs?: number;
            flavor?: HoldTapFlavor;
            retroTap?: boolean;
            holdBinding?: {
                behaviorId?: number;
                param1?: number;
                param2?: number;
            };
            tapBinding?: {
                behaviorId?: number;
                param1?: number;
                param2?: number;
            };
        };
        getTapDance?: number | undefined;
        setTapDance?: {
            index?: number;
            enabled?: boolean;
            tappingTermMs?: number;
            bindings?: {
                behaviorId?: number;
                param1?: number;
                param2?: number;
            }[];
        };
        getMacro?: number | undefined;
        setMacro?: {
            index?: number;
            enabled?: boolean;
            waitMs?: number;
            tapMs?: number;
            steps?: {
                type?: MacroStepType;
                binding?: {
                    behaviorId?: number;
                    param1?: number;
                    param2?: number;
                };
                delayMs?: number;
            }[];
        };
        getBitmapChunk?: {
            target?: BitmapTarget;
            slot?: number;
            offset?: number;
            length?: number;
        };
        setBitmapChunk?: {
            target?: BitmapTarget;
            slot?: number;
            offset?: number;
            totalSize?: number;
            data?: Uint8Array;
        };
        clearBitmap?: {
            target?: BitmapTarget;
            slot?: number;
        };
        saveSettings?: boolean | undefined;
        resetGremlinDefaults?: boolean | undefined;
    } & {
        getCapabilities?: boolean | undefined;
        getSleepConfig?: boolean | undefined;
        setSleepConfig?: {
            displaySleepMs?: number;
            idleTimeoutMs?: number;
            deepSleepMs?: number;
        } & {
            displaySleepMs?: number;
            idleTimeoutMs?: number;
            deepSleepMs?: number;
        } & { [K_22 in Exclude<keyof I_1["setSleepConfig"], keyof SleepConfig>]: never; };
        getDisplayConfig?: boolean | undefined;
        setDisplayConfig?: {
            showLayerBadge?: boolean;
            showBatteryIcon?: boolean;
            showBatteryPercent?: boolean;
            showOutputBadge?: boolean;
            showFooter?: boolean;
            showMascot?: boolean;
            showMascotBorder?: boolean;
            bootDurationMs?: number;
            mascotFrameMs?: number;
            mascotFrameCount?: number;
            animSequence?: number[];
        } & {
            showLayerBadge?: boolean;
            showBatteryIcon?: boolean;
            showBatteryPercent?: boolean;
            showOutputBadge?: boolean;
            showFooter?: boolean;
            showMascot?: boolean;
            showMascotBorder?: boolean;
            bootDurationMs?: number;
            mascotFrameMs?: number;
            mascotFrameCount?: number;
            animSequence?: number[] & number[] & { [K_23 in Exclude<keyof I_1["setDisplayConfig"]["animSequence"], keyof number[]>]: never; };
        } & { [K_24 in Exclude<keyof I_1["setDisplayConfig"], keyof DisplayConfig>]: never; };
        getStickConfig?: boolean | undefined;
        setStickConfig?: {
            xMin?: number;
            xCenter?: number;
            xMax?: number;
            yMin?: number;
            yCenter?: number;
            yMax?: number;
            invertX?: boolean;
            invertY?: boolean;
            deadzonePercent?: number;
        } & {
            xMin?: number;
            xCenter?: number;
            xMax?: number;
            yMin?: number;
            yCenter?: number;
            yMax?: number;
            invertX?: boolean;
            invertY?: boolean;
            deadzonePercent?: number;
        } & { [K_25 in Exclude<keyof I_1["setStickConfig"], keyof StickConfig>]: never; };
        getStickLayerConfig?: number | undefined;
        setStickLayerConfig?: {
            layerIndex?: number;
            mode?: StickMode;
            upPosition?: number;
            downPosition?: number;
            leftPosition?: number;
            rightPosition?: number;
            switchActivationPoint?: number;
            switchHysteresis?: number;
            mouseMinSpeed?: number;
            mouseMaxSpeed?: number;
            scrollDivisor?: number;
        } & {
            layerIndex?: number;
            mode?: StickMode;
            upPosition?: number;
            downPosition?: number;
            leftPosition?: number;
            rightPosition?: number;
            switchActivationPoint?: number;
            switchHysteresis?: number;
            mouseMinSpeed?: number;
            mouseMaxSpeed?: number;
            scrollDivisor?: number;
        } & { [K_26 in Exclude<keyof I_1["setStickLayerConfig"], keyof StickLayerConfig>]: never; };
        getStickTelemetry?: boolean | undefined;
        getCombo?: number | undefined;
        setCombo?: {
            index?: number;
            enabled?: boolean;
            timeoutMs?: number;
            requirePriorIdleMs?: number;
            layerMask?: number;
            slowRelease?: boolean;
            keyPositions?: number[];
            binding?: {
                behaviorId?: number;
                param1?: number;
                param2?: number;
            };
        } & {
            index?: number;
            enabled?: boolean;
            timeoutMs?: number;
            requirePriorIdleMs?: number;
            layerMask?: number;
            slowRelease?: boolean;
            keyPositions?: number[] & number[] & { [K_27 in Exclude<keyof I_1["setCombo"]["keyPositions"], keyof number[]>]: never; };
            binding?: {
                behaviorId?: number;
                param1?: number;
                param2?: number;
            } & {
                behaviorId?: number;
                param1?: number;
                param2?: number;
            } & { [K_28 in Exclude<keyof I_1["setCombo"]["binding"], keyof BindingSpec>]: never; };
        } & { [K_29 in Exclude<keyof I_1["setCombo"], keyof ComboConfig>]: never; };
        getHoldTap?: number | undefined;
        setHoldTap?: {
            index?: number;
            enabled?: boolean;
            tappingTermMs?: number;
            quickTapMs?: number;
            requirePriorIdleMs?: number;
            flavor?: HoldTapFlavor;
            retroTap?: boolean;
            holdBinding?: {
                behaviorId?: number;
                param1?: number;
                param2?: number;
            };
            tapBinding?: {
                behaviorId?: number;
                param1?: number;
                param2?: number;
            };
        } & {
            index?: number;
            enabled?: boolean;
            tappingTermMs?: number;
            quickTapMs?: number;
            requirePriorIdleMs?: number;
            flavor?: HoldTapFlavor;
            retroTap?: boolean;
            holdBinding?: {
                behaviorId?: number;
                param1?: number;
                param2?: number;
            } & {
                behaviorId?: number;
                param1?: number;
                param2?: number;
            } & { [K_30 in Exclude<keyof I_1["setHoldTap"]["holdBinding"], keyof BindingSpec>]: never; };
            tapBinding?: {
                behaviorId?: number;
                param1?: number;
                param2?: number;
            } & {
                behaviorId?: number;
                param1?: number;
                param2?: number;
            } & { [K_31 in Exclude<keyof I_1["setHoldTap"]["tapBinding"], keyof BindingSpec>]: never; };
        } & { [K_32 in Exclude<keyof I_1["setHoldTap"], keyof HoldTapConfig>]: never; };
        getTapDance?: number | undefined;
        setTapDance?: {
            index?: number;
            enabled?: boolean;
            tappingTermMs?: number;
            bindings?: {
                behaviorId?: number;
                param1?: number;
                param2?: number;
            }[];
        } & {
            index?: number;
            enabled?: boolean;
            tappingTermMs?: number;
            bindings?: {
                behaviorId?: number;
                param1?: number;
                param2?: number;
            }[] & ({
                behaviorId?: number;
                param1?: number;
                param2?: number;
            } & {
                behaviorId?: number;
                param1?: number;
                param2?: number;
            } & { [K_33 in Exclude<keyof I_1["setTapDance"]["bindings"][number], keyof BindingSpec>]: never; })[] & { [K_34 in Exclude<keyof I_1["setTapDance"]["bindings"], keyof {
                behaviorId?: number;
                param1?: number;
                param2?: number;
            }[]>]: never; };
        } & { [K_35 in Exclude<keyof I_1["setTapDance"], keyof TapDanceConfig>]: never; };
        getMacro?: number | undefined;
        setMacro?: {
            index?: number;
            enabled?: boolean;
            waitMs?: number;
            tapMs?: number;
            steps?: {
                type?: MacroStepType;
                binding?: {
                    behaviorId?: number;
                    param1?: number;
                    param2?: number;
                };
                delayMs?: number;
            }[];
        } & {
            index?: number;
            enabled?: boolean;
            waitMs?: number;
            tapMs?: number;
            steps?: {
                type?: MacroStepType;
                binding?: {
                    behaviorId?: number;
                    param1?: number;
                    param2?: number;
                };
                delayMs?: number;
            }[] & ({
                type?: MacroStepType;
                binding?: {
                    behaviorId?: number;
                    param1?: number;
                    param2?: number;
                };
                delayMs?: number;
            } & {
                type?: MacroStepType;
                binding?: {
                    behaviorId?: number;
                    param1?: number;
                    param2?: number;
                } & {
                    behaviorId?: number;
                    param1?: number;
                    param2?: number;
                } & { [K_36 in Exclude<keyof I_1["setMacro"]["steps"][number]["binding"], keyof BindingSpec>]: never; };
                delayMs?: number;
            } & { [K_37 in Exclude<keyof I_1["setMacro"]["steps"][number], keyof MacroStep>]: never; })[] & { [K_38 in Exclude<keyof I_1["setMacro"]["steps"], keyof {
                type?: MacroStepType;
                binding?: {
                    behaviorId?: number;
                    param1?: number;
                    param2?: number;
                };
                delayMs?: number;
            }[]>]: never; };
        } & { [K_39 in Exclude<keyof I_1["setMacro"], keyof MacroConfig>]: never; };
        getBitmapChunk?: {
            target?: BitmapTarget;
            slot?: number;
            offset?: number;
            length?: number;
        } & {
            target?: BitmapTarget;
            slot?: number;
            offset?: number;
            length?: number;
        } & { [K_40 in Exclude<keyof I_1["getBitmapChunk"], keyof GetBitmapChunkRequest>]: never; };
        setBitmapChunk?: {
            target?: BitmapTarget;
            slot?: number;
            offset?: number;
            totalSize?: number;
            data?: Uint8Array;
        } & {
            target?: BitmapTarget;
            slot?: number;
            offset?: number;
            totalSize?: number;
            data?: Uint8Array;
        } & { [K_41 in Exclude<keyof I_1["setBitmapChunk"], keyof SetBitmapChunkRequest>]: never; };
        clearBitmap?: {
            target?: BitmapTarget;
            slot?: number;
        } & {
            target?: BitmapTarget;
            slot?: number;
        } & { [K_42 in Exclude<keyof I_1["clearBitmap"], keyof ClearBitmapRequest>]: never; };
        saveSettings?: boolean | undefined;
        resetGremlinDefaults?: boolean | undefined;
    } & { [K_43 in Exclude<keyof I_1, keyof Request>]: never; }>(object: I_1): Request;
};
export declare const Response: {
    encode(message: Response, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Response;
    fromJSON(object: any): Response;
    toJSON(message: Response): unknown;
    create<I extends {
        getCapabilities?: {
            protocolVersion?: number;
            maxCombos?: number;
            maxHoldTaps?: number;
            maxTapDances?: number;
            maxMacros?: number;
            maxMascotFrames?: number;
            maxStickLayers?: number;
            maxMacroSteps?: number;
            maxTapDanceSteps?: number;
            maxComboKeys?: number;
            bitmapChunkSize?: number;
            storageTotalBytes?: number;
            storageUsedBytes?: number;
        };
        getSleepConfig?: {
            displaySleepMs?: number;
            idleTimeoutMs?: number;
            deepSleepMs?: number;
        };
        setSleepConfig?: GremlinStatusCode | undefined;
        getDisplayConfig?: {
            showLayerBadge?: boolean;
            showBatteryIcon?: boolean;
            showBatteryPercent?: boolean;
            showOutputBadge?: boolean;
            showFooter?: boolean;
            showMascot?: boolean;
            showMascotBorder?: boolean;
            bootDurationMs?: number;
            mascotFrameMs?: number;
            mascotFrameCount?: number;
            animSequence?: number[];
        };
        setDisplayConfig?: GremlinStatusCode | undefined;
        getStickConfig?: {
            xMin?: number;
            xCenter?: number;
            xMax?: number;
            yMin?: number;
            yCenter?: number;
            yMax?: number;
            invertX?: boolean;
            invertY?: boolean;
            deadzonePercent?: number;
        };
        setStickConfig?: GremlinStatusCode | undefined;
        getStickLayerConfig?: {
            layerIndex?: number;
            mode?: StickMode;
            upPosition?: number;
            downPosition?: number;
            leftPosition?: number;
            rightPosition?: number;
            switchActivationPoint?: number;
            switchHysteresis?: number;
            mouseMinSpeed?: number;
            mouseMaxSpeed?: number;
            scrollDivisor?: number;
        };
        setStickLayerConfig?: GremlinStatusCode | undefined;
        getStickTelemetry?: {
            rawX?: number;
            rawY?: number;
            outX?: number;
            outY?: number;
            activeLayer?: number;
            l3Pressed?: boolean;
        };
        getCombo?: {
            index?: number;
            enabled?: boolean;
            timeoutMs?: number;
            requirePriorIdleMs?: number;
            layerMask?: number;
            slowRelease?: boolean;
            keyPositions?: number[];
            binding?: {
                behaviorId?: number;
                param1?: number;
                param2?: number;
            };
        };
        setCombo?: GremlinStatusCode | undefined;
        getHoldTap?: {
            index?: number;
            enabled?: boolean;
            tappingTermMs?: number;
            quickTapMs?: number;
            requirePriorIdleMs?: number;
            flavor?: HoldTapFlavor;
            retroTap?: boolean;
            holdBinding?: {
                behaviorId?: number;
                param1?: number;
                param2?: number;
            };
            tapBinding?: {
                behaviorId?: number;
                param1?: number;
                param2?: number;
            };
        };
        setHoldTap?: GremlinStatusCode | undefined;
        getTapDance?: {
            index?: number;
            enabled?: boolean;
            tappingTermMs?: number;
            bindings?: {
                behaviorId?: number;
                param1?: number;
                param2?: number;
            }[];
        };
        setTapDance?: GremlinStatusCode | undefined;
        getMacro?: {
            index?: number;
            enabled?: boolean;
            waitMs?: number;
            tapMs?: number;
            steps?: {
                type?: MacroStepType;
                binding?: {
                    behaviorId?: number;
                    param1?: number;
                    param2?: number;
                };
                delayMs?: number;
            }[];
        };
        setMacro?: GremlinStatusCode | undefined;
        getBitmapChunk?: {
            target?: BitmapTarget;
            slot?: number;
            offset?: number;
            totalSize?: number;
            isCustom?: boolean;
            data?: Uint8Array;
        };
        setBitmapChunk?: GremlinStatusCode | undefined;
        clearBitmap?: GremlinStatusCode | undefined;
        saveSettings?: GremlinStatusCode | undefined;
        resetGremlinDefaults?: GremlinStatusCode | undefined;
    } & {
        getCapabilities?: {
            protocolVersion?: number;
            maxCombos?: number;
            maxHoldTaps?: number;
            maxTapDances?: number;
            maxMacros?: number;
            maxMascotFrames?: number;
            maxStickLayers?: number;
            maxMacroSteps?: number;
            maxTapDanceSteps?: number;
            maxComboKeys?: number;
            bitmapChunkSize?: number;
            storageTotalBytes?: number;
            storageUsedBytes?: number;
        } & {
            protocolVersion?: number;
            maxCombos?: number;
            maxHoldTaps?: number;
            maxTapDances?: number;
            maxMacros?: number;
            maxMascotFrames?: number;
            maxStickLayers?: number;
            maxMacroSteps?: number;
            maxTapDanceSteps?: number;
            maxComboKeys?: number;
            bitmapChunkSize?: number;
            storageTotalBytes?: number;
            storageUsedBytes?: number;
        } & { [K in Exclude<keyof I["getCapabilities"], keyof Capabilities>]: never; };
        getSleepConfig?: {
            displaySleepMs?: number;
            idleTimeoutMs?: number;
            deepSleepMs?: number;
        } & {
            displaySleepMs?: number;
            idleTimeoutMs?: number;
            deepSleepMs?: number;
        } & { [K_1 in Exclude<keyof I["getSleepConfig"], keyof SleepConfig>]: never; };
        setSleepConfig?: GremlinStatusCode | undefined;
        getDisplayConfig?: {
            showLayerBadge?: boolean;
            showBatteryIcon?: boolean;
            showBatteryPercent?: boolean;
            showOutputBadge?: boolean;
            showFooter?: boolean;
            showMascot?: boolean;
            showMascotBorder?: boolean;
            bootDurationMs?: number;
            mascotFrameMs?: number;
            mascotFrameCount?: number;
            animSequence?: number[];
        } & {
            showLayerBadge?: boolean;
            showBatteryIcon?: boolean;
            showBatteryPercent?: boolean;
            showOutputBadge?: boolean;
            showFooter?: boolean;
            showMascot?: boolean;
            showMascotBorder?: boolean;
            bootDurationMs?: number;
            mascotFrameMs?: number;
            mascotFrameCount?: number;
            animSequence?: number[] & number[] & { [K_2 in Exclude<keyof I["getDisplayConfig"]["animSequence"], keyof number[]>]: never; };
        } & { [K_3 in Exclude<keyof I["getDisplayConfig"], keyof DisplayConfig>]: never; };
        setDisplayConfig?: GremlinStatusCode | undefined;
        getStickConfig?: {
            xMin?: number;
            xCenter?: number;
            xMax?: number;
            yMin?: number;
            yCenter?: number;
            yMax?: number;
            invertX?: boolean;
            invertY?: boolean;
            deadzonePercent?: number;
        } & {
            xMin?: number;
            xCenter?: number;
            xMax?: number;
            yMin?: number;
            yCenter?: number;
            yMax?: number;
            invertX?: boolean;
            invertY?: boolean;
            deadzonePercent?: number;
        } & { [K_4 in Exclude<keyof I["getStickConfig"], keyof StickConfig>]: never; };
        setStickConfig?: GremlinStatusCode | undefined;
        getStickLayerConfig?: {
            layerIndex?: number;
            mode?: StickMode;
            upPosition?: number;
            downPosition?: number;
            leftPosition?: number;
            rightPosition?: number;
            switchActivationPoint?: number;
            switchHysteresis?: number;
            mouseMinSpeed?: number;
            mouseMaxSpeed?: number;
            scrollDivisor?: number;
        } & {
            layerIndex?: number;
            mode?: StickMode;
            upPosition?: number;
            downPosition?: number;
            leftPosition?: number;
            rightPosition?: number;
            switchActivationPoint?: number;
            switchHysteresis?: number;
            mouseMinSpeed?: number;
            mouseMaxSpeed?: number;
            scrollDivisor?: number;
        } & { [K_5 in Exclude<keyof I["getStickLayerConfig"], keyof StickLayerConfig>]: never; };
        setStickLayerConfig?: GremlinStatusCode | undefined;
        getStickTelemetry?: {
            rawX?: number;
            rawY?: number;
            outX?: number;
            outY?: number;
            activeLayer?: number;
            l3Pressed?: boolean;
        } & {
            rawX?: number;
            rawY?: number;
            outX?: number;
            outY?: number;
            activeLayer?: number;
            l3Pressed?: boolean;
        } & { [K_6 in Exclude<keyof I["getStickTelemetry"], keyof StickTelemetry>]: never; };
        getCombo?: {
            index?: number;
            enabled?: boolean;
            timeoutMs?: number;
            requirePriorIdleMs?: number;
            layerMask?: number;
            slowRelease?: boolean;
            keyPositions?: number[];
            binding?: {
                behaviorId?: number;
                param1?: number;
                param2?: number;
            };
        } & {
            index?: number;
            enabled?: boolean;
            timeoutMs?: number;
            requirePriorIdleMs?: number;
            layerMask?: number;
            slowRelease?: boolean;
            keyPositions?: number[] & number[] & { [K_7 in Exclude<keyof I["getCombo"]["keyPositions"], keyof number[]>]: never; };
            binding?: {
                behaviorId?: number;
                param1?: number;
                param2?: number;
            } & {
                behaviorId?: number;
                param1?: number;
                param2?: number;
            } & { [K_8 in Exclude<keyof I["getCombo"]["binding"], keyof BindingSpec>]: never; };
        } & { [K_9 in Exclude<keyof I["getCombo"], keyof ComboConfig>]: never; };
        setCombo?: GremlinStatusCode | undefined;
        getHoldTap?: {
            index?: number;
            enabled?: boolean;
            tappingTermMs?: number;
            quickTapMs?: number;
            requirePriorIdleMs?: number;
            flavor?: HoldTapFlavor;
            retroTap?: boolean;
            holdBinding?: {
                behaviorId?: number;
                param1?: number;
                param2?: number;
            };
            tapBinding?: {
                behaviorId?: number;
                param1?: number;
                param2?: number;
            };
        } & {
            index?: number;
            enabled?: boolean;
            tappingTermMs?: number;
            quickTapMs?: number;
            requirePriorIdleMs?: number;
            flavor?: HoldTapFlavor;
            retroTap?: boolean;
            holdBinding?: {
                behaviorId?: number;
                param1?: number;
                param2?: number;
            } & {
                behaviorId?: number;
                param1?: number;
                param2?: number;
            } & { [K_10 in Exclude<keyof I["getHoldTap"]["holdBinding"], keyof BindingSpec>]: never; };
            tapBinding?: {
                behaviorId?: number;
                param1?: number;
                param2?: number;
            } & {
                behaviorId?: number;
                param1?: number;
                param2?: number;
            } & { [K_11 in Exclude<keyof I["getHoldTap"]["tapBinding"], keyof BindingSpec>]: never; };
        } & { [K_12 in Exclude<keyof I["getHoldTap"], keyof HoldTapConfig>]: never; };
        setHoldTap?: GremlinStatusCode | undefined;
        getTapDance?: {
            index?: number;
            enabled?: boolean;
            tappingTermMs?: number;
            bindings?: {
                behaviorId?: number;
                param1?: number;
                param2?: number;
            }[];
        } & {
            index?: number;
            enabled?: boolean;
            tappingTermMs?: number;
            bindings?: {
                behaviorId?: number;
                param1?: number;
                param2?: number;
            }[] & ({
                behaviorId?: number;
                param1?: number;
                param2?: number;
            } & {
                behaviorId?: number;
                param1?: number;
                param2?: number;
            } & { [K_13 in Exclude<keyof I["getTapDance"]["bindings"][number], keyof BindingSpec>]: never; })[] & { [K_14 in Exclude<keyof I["getTapDance"]["bindings"], keyof {
                behaviorId?: number;
                param1?: number;
                param2?: number;
            }[]>]: never; };
        } & { [K_15 in Exclude<keyof I["getTapDance"], keyof TapDanceConfig>]: never; };
        setTapDance?: GremlinStatusCode | undefined;
        getMacro?: {
            index?: number;
            enabled?: boolean;
            waitMs?: number;
            tapMs?: number;
            steps?: {
                type?: MacroStepType;
                binding?: {
                    behaviorId?: number;
                    param1?: number;
                    param2?: number;
                };
                delayMs?: number;
            }[];
        } & {
            index?: number;
            enabled?: boolean;
            waitMs?: number;
            tapMs?: number;
            steps?: {
                type?: MacroStepType;
                binding?: {
                    behaviorId?: number;
                    param1?: number;
                    param2?: number;
                };
                delayMs?: number;
            }[] & ({
                type?: MacroStepType;
                binding?: {
                    behaviorId?: number;
                    param1?: number;
                    param2?: number;
                };
                delayMs?: number;
            } & {
                type?: MacroStepType;
                binding?: {
                    behaviorId?: number;
                    param1?: number;
                    param2?: number;
                } & {
                    behaviorId?: number;
                    param1?: number;
                    param2?: number;
                } & { [K_16 in Exclude<keyof I["getMacro"]["steps"][number]["binding"], keyof BindingSpec>]: never; };
                delayMs?: number;
            } & { [K_17 in Exclude<keyof I["getMacro"]["steps"][number], keyof MacroStep>]: never; })[] & { [K_18 in Exclude<keyof I["getMacro"]["steps"], keyof {
                type?: MacroStepType;
                binding?: {
                    behaviorId?: number;
                    param1?: number;
                    param2?: number;
                };
                delayMs?: number;
            }[]>]: never; };
        } & { [K_19 in Exclude<keyof I["getMacro"], keyof MacroConfig>]: never; };
        setMacro?: GremlinStatusCode | undefined;
        getBitmapChunk?: {
            target?: BitmapTarget;
            slot?: number;
            offset?: number;
            totalSize?: number;
            isCustom?: boolean;
            data?: Uint8Array;
        } & {
            target?: BitmapTarget;
            slot?: number;
            offset?: number;
            totalSize?: number;
            isCustom?: boolean;
            data?: Uint8Array;
        } & { [K_20 in Exclude<keyof I["getBitmapChunk"], keyof BitmapChunk>]: never; };
        setBitmapChunk?: GremlinStatusCode | undefined;
        clearBitmap?: GremlinStatusCode | undefined;
        saveSettings?: GremlinStatusCode | undefined;
        resetGremlinDefaults?: GremlinStatusCode | undefined;
    } & { [K_21 in Exclude<keyof I, keyof Response>]: never; }>(base?: I): Response;
    fromPartial<I_1 extends {
        getCapabilities?: {
            protocolVersion?: number;
            maxCombos?: number;
            maxHoldTaps?: number;
            maxTapDances?: number;
            maxMacros?: number;
            maxMascotFrames?: number;
            maxStickLayers?: number;
            maxMacroSteps?: number;
            maxTapDanceSteps?: number;
            maxComboKeys?: number;
            bitmapChunkSize?: number;
            storageTotalBytes?: number;
            storageUsedBytes?: number;
        };
        getSleepConfig?: {
            displaySleepMs?: number;
            idleTimeoutMs?: number;
            deepSleepMs?: number;
        };
        setSleepConfig?: GremlinStatusCode | undefined;
        getDisplayConfig?: {
            showLayerBadge?: boolean;
            showBatteryIcon?: boolean;
            showBatteryPercent?: boolean;
            showOutputBadge?: boolean;
            showFooter?: boolean;
            showMascot?: boolean;
            showMascotBorder?: boolean;
            bootDurationMs?: number;
            mascotFrameMs?: number;
            mascotFrameCount?: number;
            animSequence?: number[];
        };
        setDisplayConfig?: GremlinStatusCode | undefined;
        getStickConfig?: {
            xMin?: number;
            xCenter?: number;
            xMax?: number;
            yMin?: number;
            yCenter?: number;
            yMax?: number;
            invertX?: boolean;
            invertY?: boolean;
            deadzonePercent?: number;
        };
        setStickConfig?: GremlinStatusCode | undefined;
        getStickLayerConfig?: {
            layerIndex?: number;
            mode?: StickMode;
            upPosition?: number;
            downPosition?: number;
            leftPosition?: number;
            rightPosition?: number;
            switchActivationPoint?: number;
            switchHysteresis?: number;
            mouseMinSpeed?: number;
            mouseMaxSpeed?: number;
            scrollDivisor?: number;
        };
        setStickLayerConfig?: GremlinStatusCode | undefined;
        getStickTelemetry?: {
            rawX?: number;
            rawY?: number;
            outX?: number;
            outY?: number;
            activeLayer?: number;
            l3Pressed?: boolean;
        };
        getCombo?: {
            index?: number;
            enabled?: boolean;
            timeoutMs?: number;
            requirePriorIdleMs?: number;
            layerMask?: number;
            slowRelease?: boolean;
            keyPositions?: number[];
            binding?: {
                behaviorId?: number;
                param1?: number;
                param2?: number;
            };
        };
        setCombo?: GremlinStatusCode | undefined;
        getHoldTap?: {
            index?: number;
            enabled?: boolean;
            tappingTermMs?: number;
            quickTapMs?: number;
            requirePriorIdleMs?: number;
            flavor?: HoldTapFlavor;
            retroTap?: boolean;
            holdBinding?: {
                behaviorId?: number;
                param1?: number;
                param2?: number;
            };
            tapBinding?: {
                behaviorId?: number;
                param1?: number;
                param2?: number;
            };
        };
        setHoldTap?: GremlinStatusCode | undefined;
        getTapDance?: {
            index?: number;
            enabled?: boolean;
            tappingTermMs?: number;
            bindings?: {
                behaviorId?: number;
                param1?: number;
                param2?: number;
            }[];
        };
        setTapDance?: GremlinStatusCode | undefined;
        getMacro?: {
            index?: number;
            enabled?: boolean;
            waitMs?: number;
            tapMs?: number;
            steps?: {
                type?: MacroStepType;
                binding?: {
                    behaviorId?: number;
                    param1?: number;
                    param2?: number;
                };
                delayMs?: number;
            }[];
        };
        setMacro?: GremlinStatusCode | undefined;
        getBitmapChunk?: {
            target?: BitmapTarget;
            slot?: number;
            offset?: number;
            totalSize?: number;
            isCustom?: boolean;
            data?: Uint8Array;
        };
        setBitmapChunk?: GremlinStatusCode | undefined;
        clearBitmap?: GremlinStatusCode | undefined;
        saveSettings?: GremlinStatusCode | undefined;
        resetGremlinDefaults?: GremlinStatusCode | undefined;
    } & {
        getCapabilities?: {
            protocolVersion?: number;
            maxCombos?: number;
            maxHoldTaps?: number;
            maxTapDances?: number;
            maxMacros?: number;
            maxMascotFrames?: number;
            maxStickLayers?: number;
            maxMacroSteps?: number;
            maxTapDanceSteps?: number;
            maxComboKeys?: number;
            bitmapChunkSize?: number;
            storageTotalBytes?: number;
            storageUsedBytes?: number;
        } & {
            protocolVersion?: number;
            maxCombos?: number;
            maxHoldTaps?: number;
            maxTapDances?: number;
            maxMacros?: number;
            maxMascotFrames?: number;
            maxStickLayers?: number;
            maxMacroSteps?: number;
            maxTapDanceSteps?: number;
            maxComboKeys?: number;
            bitmapChunkSize?: number;
            storageTotalBytes?: number;
            storageUsedBytes?: number;
        } & { [K_22 in Exclude<keyof I_1["getCapabilities"], keyof Capabilities>]: never; };
        getSleepConfig?: {
            displaySleepMs?: number;
            idleTimeoutMs?: number;
            deepSleepMs?: number;
        } & {
            displaySleepMs?: number;
            idleTimeoutMs?: number;
            deepSleepMs?: number;
        } & { [K_23 in Exclude<keyof I_1["getSleepConfig"], keyof SleepConfig>]: never; };
        setSleepConfig?: GremlinStatusCode | undefined;
        getDisplayConfig?: {
            showLayerBadge?: boolean;
            showBatteryIcon?: boolean;
            showBatteryPercent?: boolean;
            showOutputBadge?: boolean;
            showFooter?: boolean;
            showMascot?: boolean;
            showMascotBorder?: boolean;
            bootDurationMs?: number;
            mascotFrameMs?: number;
            mascotFrameCount?: number;
            animSequence?: number[];
        } & {
            showLayerBadge?: boolean;
            showBatteryIcon?: boolean;
            showBatteryPercent?: boolean;
            showOutputBadge?: boolean;
            showFooter?: boolean;
            showMascot?: boolean;
            showMascotBorder?: boolean;
            bootDurationMs?: number;
            mascotFrameMs?: number;
            mascotFrameCount?: number;
            animSequence?: number[] & number[] & { [K_24 in Exclude<keyof I_1["getDisplayConfig"]["animSequence"], keyof number[]>]: never; };
        } & { [K_25 in Exclude<keyof I_1["getDisplayConfig"], keyof DisplayConfig>]: never; };
        setDisplayConfig?: GremlinStatusCode | undefined;
        getStickConfig?: {
            xMin?: number;
            xCenter?: number;
            xMax?: number;
            yMin?: number;
            yCenter?: number;
            yMax?: number;
            invertX?: boolean;
            invertY?: boolean;
            deadzonePercent?: number;
        } & {
            xMin?: number;
            xCenter?: number;
            xMax?: number;
            yMin?: number;
            yCenter?: number;
            yMax?: number;
            invertX?: boolean;
            invertY?: boolean;
            deadzonePercent?: number;
        } & { [K_26 in Exclude<keyof I_1["getStickConfig"], keyof StickConfig>]: never; };
        setStickConfig?: GremlinStatusCode | undefined;
        getStickLayerConfig?: {
            layerIndex?: number;
            mode?: StickMode;
            upPosition?: number;
            downPosition?: number;
            leftPosition?: number;
            rightPosition?: number;
            switchActivationPoint?: number;
            switchHysteresis?: number;
            mouseMinSpeed?: number;
            mouseMaxSpeed?: number;
            scrollDivisor?: number;
        } & {
            layerIndex?: number;
            mode?: StickMode;
            upPosition?: number;
            downPosition?: number;
            leftPosition?: number;
            rightPosition?: number;
            switchActivationPoint?: number;
            switchHysteresis?: number;
            mouseMinSpeed?: number;
            mouseMaxSpeed?: number;
            scrollDivisor?: number;
        } & { [K_27 in Exclude<keyof I_1["getStickLayerConfig"], keyof StickLayerConfig>]: never; };
        setStickLayerConfig?: GremlinStatusCode | undefined;
        getStickTelemetry?: {
            rawX?: number;
            rawY?: number;
            outX?: number;
            outY?: number;
            activeLayer?: number;
            l3Pressed?: boolean;
        } & {
            rawX?: number;
            rawY?: number;
            outX?: number;
            outY?: number;
            activeLayer?: number;
            l3Pressed?: boolean;
        } & { [K_28 in Exclude<keyof I_1["getStickTelemetry"], keyof StickTelemetry>]: never; };
        getCombo?: {
            index?: number;
            enabled?: boolean;
            timeoutMs?: number;
            requirePriorIdleMs?: number;
            layerMask?: number;
            slowRelease?: boolean;
            keyPositions?: number[];
            binding?: {
                behaviorId?: number;
                param1?: number;
                param2?: number;
            };
        } & {
            index?: number;
            enabled?: boolean;
            timeoutMs?: number;
            requirePriorIdleMs?: number;
            layerMask?: number;
            slowRelease?: boolean;
            keyPositions?: number[] & number[] & { [K_29 in Exclude<keyof I_1["getCombo"]["keyPositions"], keyof number[]>]: never; };
            binding?: {
                behaviorId?: number;
                param1?: number;
                param2?: number;
            } & {
                behaviorId?: number;
                param1?: number;
                param2?: number;
            } & { [K_30 in Exclude<keyof I_1["getCombo"]["binding"], keyof BindingSpec>]: never; };
        } & { [K_31 in Exclude<keyof I_1["getCombo"], keyof ComboConfig>]: never; };
        setCombo?: GremlinStatusCode | undefined;
        getHoldTap?: {
            index?: number;
            enabled?: boolean;
            tappingTermMs?: number;
            quickTapMs?: number;
            requirePriorIdleMs?: number;
            flavor?: HoldTapFlavor;
            retroTap?: boolean;
            holdBinding?: {
                behaviorId?: number;
                param1?: number;
                param2?: number;
            };
            tapBinding?: {
                behaviorId?: number;
                param1?: number;
                param2?: number;
            };
        } & {
            index?: number;
            enabled?: boolean;
            tappingTermMs?: number;
            quickTapMs?: number;
            requirePriorIdleMs?: number;
            flavor?: HoldTapFlavor;
            retroTap?: boolean;
            holdBinding?: {
                behaviorId?: number;
                param1?: number;
                param2?: number;
            } & {
                behaviorId?: number;
                param1?: number;
                param2?: number;
            } & { [K_32 in Exclude<keyof I_1["getHoldTap"]["holdBinding"], keyof BindingSpec>]: never; };
            tapBinding?: {
                behaviorId?: number;
                param1?: number;
                param2?: number;
            } & {
                behaviorId?: number;
                param1?: number;
                param2?: number;
            } & { [K_33 in Exclude<keyof I_1["getHoldTap"]["tapBinding"], keyof BindingSpec>]: never; };
        } & { [K_34 in Exclude<keyof I_1["getHoldTap"], keyof HoldTapConfig>]: never; };
        setHoldTap?: GremlinStatusCode | undefined;
        getTapDance?: {
            index?: number;
            enabled?: boolean;
            tappingTermMs?: number;
            bindings?: {
                behaviorId?: number;
                param1?: number;
                param2?: number;
            }[];
        } & {
            index?: number;
            enabled?: boolean;
            tappingTermMs?: number;
            bindings?: {
                behaviorId?: number;
                param1?: number;
                param2?: number;
            }[] & ({
                behaviorId?: number;
                param1?: number;
                param2?: number;
            } & {
                behaviorId?: number;
                param1?: number;
                param2?: number;
            } & { [K_35 in Exclude<keyof I_1["getTapDance"]["bindings"][number], keyof BindingSpec>]: never; })[] & { [K_36 in Exclude<keyof I_1["getTapDance"]["bindings"], keyof {
                behaviorId?: number;
                param1?: number;
                param2?: number;
            }[]>]: never; };
        } & { [K_37 in Exclude<keyof I_1["getTapDance"], keyof TapDanceConfig>]: never; };
        setTapDance?: GremlinStatusCode | undefined;
        getMacro?: {
            index?: number;
            enabled?: boolean;
            waitMs?: number;
            tapMs?: number;
            steps?: {
                type?: MacroStepType;
                binding?: {
                    behaviorId?: number;
                    param1?: number;
                    param2?: number;
                };
                delayMs?: number;
            }[];
        } & {
            index?: number;
            enabled?: boolean;
            waitMs?: number;
            tapMs?: number;
            steps?: {
                type?: MacroStepType;
                binding?: {
                    behaviorId?: number;
                    param1?: number;
                    param2?: number;
                };
                delayMs?: number;
            }[] & ({
                type?: MacroStepType;
                binding?: {
                    behaviorId?: number;
                    param1?: number;
                    param2?: number;
                };
                delayMs?: number;
            } & {
                type?: MacroStepType;
                binding?: {
                    behaviorId?: number;
                    param1?: number;
                    param2?: number;
                } & {
                    behaviorId?: number;
                    param1?: number;
                    param2?: number;
                } & { [K_38 in Exclude<keyof I_1["getMacro"]["steps"][number]["binding"], keyof BindingSpec>]: never; };
                delayMs?: number;
            } & { [K_39 in Exclude<keyof I_1["getMacro"]["steps"][number], keyof MacroStep>]: never; })[] & { [K_40 in Exclude<keyof I_1["getMacro"]["steps"], keyof {
                type?: MacroStepType;
                binding?: {
                    behaviorId?: number;
                    param1?: number;
                    param2?: number;
                };
                delayMs?: number;
            }[]>]: never; };
        } & { [K_41 in Exclude<keyof I_1["getMacro"], keyof MacroConfig>]: never; };
        setMacro?: GremlinStatusCode | undefined;
        getBitmapChunk?: {
            target?: BitmapTarget;
            slot?: number;
            offset?: number;
            totalSize?: number;
            isCustom?: boolean;
            data?: Uint8Array;
        } & {
            target?: BitmapTarget;
            slot?: number;
            offset?: number;
            totalSize?: number;
            isCustom?: boolean;
            data?: Uint8Array;
        } & { [K_42 in Exclude<keyof I_1["getBitmapChunk"], keyof BitmapChunk>]: never; };
        setBitmapChunk?: GremlinStatusCode | undefined;
        clearBitmap?: GremlinStatusCode | undefined;
        saveSettings?: GremlinStatusCode | undefined;
        resetGremlinDefaults?: GremlinStatusCode | undefined;
    } & { [K_43 in Exclude<keyof I_1, keyof Response>]: never; }>(object: I_1): Response;
};
type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;
export type DeepPartial<T> = T extends Builtin ? T : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>> : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>> : T extends {} ? {
    [K in keyof T]?: DeepPartial<T[K]>;
} : Partial<T>;
type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P : P & {
    [K in keyof P]: Exact<P[K], I[K]>;
} & {
    [K in Exclude<keyof I, KeysOfUnion<P>>]: never;
};
export {};

import * as _m0 from "protobufjs/minimal";
import { Request as Request2, Response as Response7 } from "./behaviors";
import { Notification as Notification10, Request as Request1, Response as Response6 } from "./core";
import { Request as Request4, Response as Response9 } from "./gremlin";
import { Notification as Notification11, Request as Request3, Response as Response8 } from "./keymap";
import { Response as Response5 } from "./meta";
export declare const protobufPackage = "zmk.studio";
/** Requests */
export interface Request {
    requestId: number;
    core?: Request1 | undefined;
    behaviors?: Request2 | undefined;
    keymap?: Request3 | undefined;
    gremlin?: Request4 | undefined;
}
export interface Response {
    requestResponse?: RequestResponse | undefined;
    notification?: Notification | undefined;
}
export interface RequestResponse {
    requestId: number;
    meta?: Response5 | undefined;
    core?: Response6 | undefined;
    behaviors?: Response7 | undefined;
    keymap?: Response8 | undefined;
    gremlin?: Response9 | undefined;
}
export interface Notification {
    core?: Notification10 | undefined;
    keymap?: Notification11 | undefined;
}
export declare const Request: {
    encode(message: Request, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Request;
    fromJSON(object: any): Request;
    toJSON(message: Request): unknown;
    create<I extends {
        requestId?: number;
        core?: {
            getDeviceInfo?: boolean;
            getLockState?: boolean;
            lock?: boolean;
            resetSettings?: boolean;
        };
        behaviors?: {
            listAllBehaviors?: boolean;
            getBehaviorDetails?: {
                behaviorId?: number;
            };
        };
        keymap?: {
            getKeymap?: boolean;
            setLayerBinding?: {
                layerId?: number;
                keyPosition?: number;
                binding?: {
                    behaviorId?: number;
                    param1?: number;
                    param2?: number;
                };
            };
            checkUnsavedChanges?: boolean;
            saveChanges?: boolean;
            discardChanges?: boolean;
            getPhysicalLayouts?: boolean;
            setActivePhysicalLayout?: number;
            moveLayer?: {
                startIndex?: number;
                destIndex?: number;
            };
            addLayer?: {};
            removeLayer?: {
                layerIndex?: number;
            };
            restoreLayer?: {
                layerId?: number;
                atIndex?: number;
            };
            setLayerProps?: {
                layerId?: number;
                name?: string;
            };
        };
        gremlin?: {
            getCapabilities?: boolean;
            getSleepConfig?: boolean;
            setSleepConfig?: {
                displaySleepMs?: number;
                idleTimeoutMs?: number;
                deepSleepMs?: number;
            };
            getDisplayConfig?: boolean;
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
            getStickConfig?: boolean;
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
            getStickLayerConfig?: number;
            setStickLayerConfig?: {
                layerIndex?: number;
                mode?: import("./gremlin").StickMode;
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
            getStickTelemetry?: boolean;
            getCombo?: number;
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
            getHoldTap?: number;
            setHoldTap?: {
                index?: number;
                enabled?: boolean;
                tappingTermMs?: number;
                quickTapMs?: number;
                requirePriorIdleMs?: number;
                flavor?: import("./gremlin").HoldTapFlavor;
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
            getTapDance?: number;
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
            getMacro?: number;
            setMacro?: {
                index?: number;
                enabled?: boolean;
                waitMs?: number;
                tapMs?: number;
                steps?: {
                    type?: import("./gremlin").MacroStepType;
                    binding?: {
                        behaviorId?: number;
                        param1?: number;
                        param2?: number;
                    };
                    delayMs?: number;
                }[];
            };
            getBitmapChunk?: {
                target?: import("./gremlin").BitmapTarget;
                slot?: number;
                offset?: number;
                length?: number;
            };
            setBitmapChunk?: {
                target?: import("./gremlin").BitmapTarget;
                slot?: number;
                offset?: number;
                totalSize?: number;
                data?: Uint8Array;
            };
            clearBitmap?: {
                target?: import("./gremlin").BitmapTarget;
                slot?: number;
            };
            saveSettings?: boolean;
            resetGremlinDefaults?: boolean;
        };
    } & {
        requestId?: number;
        core?: {
            getDeviceInfo?: boolean;
            getLockState?: boolean;
            lock?: boolean;
            resetSettings?: boolean;
        } & {
            getDeviceInfo?: boolean;
            getLockState?: boolean;
            lock?: boolean;
            resetSettings?: boolean;
        } & { [K in Exclude<keyof I["core"], keyof Request1>]: never; };
        behaviors?: {
            listAllBehaviors?: boolean;
            getBehaviorDetails?: {
                behaviorId?: number;
            };
        } & {
            listAllBehaviors?: boolean;
            getBehaviorDetails?: {
                behaviorId?: number;
            } & {
                behaviorId?: number;
            } & { [K_1 in Exclude<keyof I["behaviors"]["getBehaviorDetails"], "behaviorId">]: never; };
        } & { [K_2 in Exclude<keyof I["behaviors"], keyof Request2>]: never; };
        keymap?: {
            getKeymap?: boolean;
            setLayerBinding?: {
                layerId?: number;
                keyPosition?: number;
                binding?: {
                    behaviorId?: number;
                    param1?: number;
                    param2?: number;
                };
            };
            checkUnsavedChanges?: boolean;
            saveChanges?: boolean;
            discardChanges?: boolean;
            getPhysicalLayouts?: boolean;
            setActivePhysicalLayout?: number;
            moveLayer?: {
                startIndex?: number;
                destIndex?: number;
            };
            addLayer?: {};
            removeLayer?: {
                layerIndex?: number;
            };
            restoreLayer?: {
                layerId?: number;
                atIndex?: number;
            };
            setLayerProps?: {
                layerId?: number;
                name?: string;
            };
        } & {
            getKeymap?: boolean;
            setLayerBinding?: {
                layerId?: number;
                keyPosition?: number;
                binding?: {
                    behaviorId?: number;
                    param1?: number;
                    param2?: number;
                };
            } & {
                layerId?: number;
                keyPosition?: number;
                binding?: {
                    behaviorId?: number;
                    param1?: number;
                    param2?: number;
                } & {
                    behaviorId?: number;
                    param1?: number;
                    param2?: number;
                } & { [K_3 in Exclude<keyof I["keymap"]["setLayerBinding"]["binding"], keyof import("./keymap").BehaviorBinding>]: never; };
            } & { [K_4 in Exclude<keyof I["keymap"]["setLayerBinding"], keyof import("./keymap").SetLayerBindingRequest>]: never; };
            checkUnsavedChanges?: boolean;
            saveChanges?: boolean;
            discardChanges?: boolean;
            getPhysicalLayouts?: boolean;
            setActivePhysicalLayout?: number;
            moveLayer?: {
                startIndex?: number;
                destIndex?: number;
            } & {
                startIndex?: number;
                destIndex?: number;
            } & { [K_5 in Exclude<keyof I["keymap"]["moveLayer"], keyof import("./keymap").MoveLayerRequest>]: never; };
            addLayer?: {} & {} & { [K_6 in Exclude<keyof I["keymap"]["addLayer"], never>]: never; };
            removeLayer?: {
                layerIndex?: number;
            } & {
                layerIndex?: number;
            } & { [K_7 in Exclude<keyof I["keymap"]["removeLayer"], "layerIndex">]: never; };
            restoreLayer?: {
                layerId?: number;
                atIndex?: number;
            } & {
                layerId?: number;
                atIndex?: number;
            } & { [K_8 in Exclude<keyof I["keymap"]["restoreLayer"], keyof import("./keymap").RestoreLayerRequest>]: never; };
            setLayerProps?: {
                layerId?: number;
                name?: string;
            } & {
                layerId?: number;
                name?: string;
            } & { [K_9 in Exclude<keyof I["keymap"]["setLayerProps"], keyof import("./keymap").SetLayerPropsRequest>]: never; };
        } & { [K_10 in Exclude<keyof I["keymap"], keyof Request3>]: never; };
        gremlin?: {
            getCapabilities?: boolean;
            getSleepConfig?: boolean;
            setSleepConfig?: {
                displaySleepMs?: number;
                idleTimeoutMs?: number;
                deepSleepMs?: number;
            };
            getDisplayConfig?: boolean;
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
            getStickConfig?: boolean;
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
            getStickLayerConfig?: number;
            setStickLayerConfig?: {
                layerIndex?: number;
                mode?: import("./gremlin").StickMode;
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
            getStickTelemetry?: boolean;
            getCombo?: number;
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
            getHoldTap?: number;
            setHoldTap?: {
                index?: number;
                enabled?: boolean;
                tappingTermMs?: number;
                quickTapMs?: number;
                requirePriorIdleMs?: number;
                flavor?: import("./gremlin").HoldTapFlavor;
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
            getTapDance?: number;
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
            getMacro?: number;
            setMacro?: {
                index?: number;
                enabled?: boolean;
                waitMs?: number;
                tapMs?: number;
                steps?: {
                    type?: import("./gremlin").MacroStepType;
                    binding?: {
                        behaviorId?: number;
                        param1?: number;
                        param2?: number;
                    };
                    delayMs?: number;
                }[];
            };
            getBitmapChunk?: {
                target?: import("./gremlin").BitmapTarget;
                slot?: number;
                offset?: number;
                length?: number;
            };
            setBitmapChunk?: {
                target?: import("./gremlin").BitmapTarget;
                slot?: number;
                offset?: number;
                totalSize?: number;
                data?: Uint8Array;
            };
            clearBitmap?: {
                target?: import("./gremlin").BitmapTarget;
                slot?: number;
            };
            saveSettings?: boolean;
            resetGremlinDefaults?: boolean;
        } & {
            getCapabilities?: boolean;
            getSleepConfig?: boolean;
            setSleepConfig?: {
                displaySleepMs?: number;
                idleTimeoutMs?: number;
                deepSleepMs?: number;
            } & {
                displaySleepMs?: number;
                idleTimeoutMs?: number;
                deepSleepMs?: number;
            } & { [K_11 in Exclude<keyof I["gremlin"]["setSleepConfig"], keyof import("./gremlin").SleepConfig>]: never; };
            getDisplayConfig?: boolean;
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
                animSequence?: number[] & number[] & { [K_12 in Exclude<keyof I["gremlin"]["setDisplayConfig"]["animSequence"], keyof number[]>]: never; };
            } & { [K_13 in Exclude<keyof I["gremlin"]["setDisplayConfig"], keyof import("./gremlin").DisplayConfig>]: never; };
            getStickConfig?: boolean;
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
            } & { [K_14 in Exclude<keyof I["gremlin"]["setStickConfig"], keyof import("./gremlin").StickConfig>]: never; };
            getStickLayerConfig?: number;
            setStickLayerConfig?: {
                layerIndex?: number;
                mode?: import("./gremlin").StickMode;
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
                mode?: import("./gremlin").StickMode;
                upPosition?: number;
                downPosition?: number;
                leftPosition?: number;
                rightPosition?: number;
                switchActivationPoint?: number;
                switchHysteresis?: number;
                mouseMinSpeed?: number;
                mouseMaxSpeed?: number;
                scrollDivisor?: number;
            } & { [K_15 in Exclude<keyof I["gremlin"]["setStickLayerConfig"], keyof import("./gremlin").StickLayerConfig>]: never; };
            getStickTelemetry?: boolean;
            getCombo?: number;
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
                keyPositions?: number[] & number[] & { [K_16 in Exclude<keyof I["gremlin"]["setCombo"]["keyPositions"], keyof number[]>]: never; };
                binding?: {
                    behaviorId?: number;
                    param1?: number;
                    param2?: number;
                } & {
                    behaviorId?: number;
                    param1?: number;
                    param2?: number;
                } & { [K_17 in Exclude<keyof I["gremlin"]["setCombo"]["binding"], keyof import("./gremlin").BindingSpec>]: never; };
            } & { [K_18 in Exclude<keyof I["gremlin"]["setCombo"], keyof import("./gremlin").ComboConfig>]: never; };
            getHoldTap?: number;
            setHoldTap?: {
                index?: number;
                enabled?: boolean;
                tappingTermMs?: number;
                quickTapMs?: number;
                requirePriorIdleMs?: number;
                flavor?: import("./gremlin").HoldTapFlavor;
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
                flavor?: import("./gremlin").HoldTapFlavor;
                retroTap?: boolean;
                holdBinding?: {
                    behaviorId?: number;
                    param1?: number;
                    param2?: number;
                } & {
                    behaviorId?: number;
                    param1?: number;
                    param2?: number;
                } & { [K_19 in Exclude<keyof I["gremlin"]["setHoldTap"]["holdBinding"], keyof import("./gremlin").BindingSpec>]: never; };
                tapBinding?: {
                    behaviorId?: number;
                    param1?: number;
                    param2?: number;
                } & {
                    behaviorId?: number;
                    param1?: number;
                    param2?: number;
                } & { [K_20 in Exclude<keyof I["gremlin"]["setHoldTap"]["tapBinding"], keyof import("./gremlin").BindingSpec>]: never; };
            } & { [K_21 in Exclude<keyof I["gremlin"]["setHoldTap"], keyof import("./gremlin").HoldTapConfig>]: never; };
            getTapDance?: number;
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
                } & { [K_22 in Exclude<keyof I["gremlin"]["setTapDance"]["bindings"][number], keyof import("./gremlin").BindingSpec>]: never; })[] & { [K_23 in Exclude<keyof I["gremlin"]["setTapDance"]["bindings"], keyof {
                    behaviorId?: number;
                    param1?: number;
                    param2?: number;
                }[]>]: never; };
            } & { [K_24 in Exclude<keyof I["gremlin"]["setTapDance"], keyof import("./gremlin").TapDanceConfig>]: never; };
            getMacro?: number;
            setMacro?: {
                index?: number;
                enabled?: boolean;
                waitMs?: number;
                tapMs?: number;
                steps?: {
                    type?: import("./gremlin").MacroStepType;
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
                    type?: import("./gremlin").MacroStepType;
                    binding?: {
                        behaviorId?: number;
                        param1?: number;
                        param2?: number;
                    };
                    delayMs?: number;
                }[] & ({
                    type?: import("./gremlin").MacroStepType;
                    binding?: {
                        behaviorId?: number;
                        param1?: number;
                        param2?: number;
                    };
                    delayMs?: number;
                } & {
                    type?: import("./gremlin").MacroStepType;
                    binding?: {
                        behaviorId?: number;
                        param1?: number;
                        param2?: number;
                    } & {
                        behaviorId?: number;
                        param1?: number;
                        param2?: number;
                    } & { [K_25 in Exclude<keyof I["gremlin"]["setMacro"]["steps"][number]["binding"], keyof import("./gremlin").BindingSpec>]: never; };
                    delayMs?: number;
                } & { [K_26 in Exclude<keyof I["gremlin"]["setMacro"]["steps"][number], keyof import("./gremlin").MacroStep>]: never; })[] & { [K_27 in Exclude<keyof I["gremlin"]["setMacro"]["steps"], keyof {
                    type?: import("./gremlin").MacroStepType;
                    binding?: {
                        behaviorId?: number;
                        param1?: number;
                        param2?: number;
                    };
                    delayMs?: number;
                }[]>]: never; };
            } & { [K_28 in Exclude<keyof I["gremlin"]["setMacro"], keyof import("./gremlin").MacroConfig>]: never; };
            getBitmapChunk?: {
                target?: import("./gremlin").BitmapTarget;
                slot?: number;
                offset?: number;
                length?: number;
            } & {
                target?: import("./gremlin").BitmapTarget;
                slot?: number;
                offset?: number;
                length?: number;
            } & { [K_29 in Exclude<keyof I["gremlin"]["getBitmapChunk"], keyof import("./gremlin").GetBitmapChunkRequest>]: never; };
            setBitmapChunk?: {
                target?: import("./gremlin").BitmapTarget;
                slot?: number;
                offset?: number;
                totalSize?: number;
                data?: Uint8Array;
            } & {
                target?: import("./gremlin").BitmapTarget;
                slot?: number;
                offset?: number;
                totalSize?: number;
                data?: Uint8Array;
            } & { [K_30 in Exclude<keyof I["gremlin"]["setBitmapChunk"], keyof import("./gremlin").SetBitmapChunkRequest>]: never; };
            clearBitmap?: {
                target?: import("./gremlin").BitmapTarget;
                slot?: number;
            } & {
                target?: import("./gremlin").BitmapTarget;
                slot?: number;
            } & { [K_31 in Exclude<keyof I["gremlin"]["clearBitmap"], keyof import("./gremlin").ClearBitmapRequest>]: never; };
            saveSettings?: boolean;
            resetGremlinDefaults?: boolean;
        } & { [K_32 in Exclude<keyof I["gremlin"], keyof Request4>]: never; };
    } & { [K_33 in Exclude<keyof I, keyof Request>]: never; }>(base?: I): Request;
    fromPartial<I_1 extends {
        requestId?: number;
        core?: {
            getDeviceInfo?: boolean;
            getLockState?: boolean;
            lock?: boolean;
            resetSettings?: boolean;
        };
        behaviors?: {
            listAllBehaviors?: boolean;
            getBehaviorDetails?: {
                behaviorId?: number;
            };
        };
        keymap?: {
            getKeymap?: boolean;
            setLayerBinding?: {
                layerId?: number;
                keyPosition?: number;
                binding?: {
                    behaviorId?: number;
                    param1?: number;
                    param2?: number;
                };
            };
            checkUnsavedChanges?: boolean;
            saveChanges?: boolean;
            discardChanges?: boolean;
            getPhysicalLayouts?: boolean;
            setActivePhysicalLayout?: number;
            moveLayer?: {
                startIndex?: number;
                destIndex?: number;
            };
            addLayer?: {};
            removeLayer?: {
                layerIndex?: number;
            };
            restoreLayer?: {
                layerId?: number;
                atIndex?: number;
            };
            setLayerProps?: {
                layerId?: number;
                name?: string;
            };
        };
        gremlin?: {
            getCapabilities?: boolean;
            getSleepConfig?: boolean;
            setSleepConfig?: {
                displaySleepMs?: number;
                idleTimeoutMs?: number;
                deepSleepMs?: number;
            };
            getDisplayConfig?: boolean;
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
            getStickConfig?: boolean;
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
            getStickLayerConfig?: number;
            setStickLayerConfig?: {
                layerIndex?: number;
                mode?: import("./gremlin").StickMode;
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
            getStickTelemetry?: boolean;
            getCombo?: number;
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
            getHoldTap?: number;
            setHoldTap?: {
                index?: number;
                enabled?: boolean;
                tappingTermMs?: number;
                quickTapMs?: number;
                requirePriorIdleMs?: number;
                flavor?: import("./gremlin").HoldTapFlavor;
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
            getTapDance?: number;
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
            getMacro?: number;
            setMacro?: {
                index?: number;
                enabled?: boolean;
                waitMs?: number;
                tapMs?: number;
                steps?: {
                    type?: import("./gremlin").MacroStepType;
                    binding?: {
                        behaviorId?: number;
                        param1?: number;
                        param2?: number;
                    };
                    delayMs?: number;
                }[];
            };
            getBitmapChunk?: {
                target?: import("./gremlin").BitmapTarget;
                slot?: number;
                offset?: number;
                length?: number;
            };
            setBitmapChunk?: {
                target?: import("./gremlin").BitmapTarget;
                slot?: number;
                offset?: number;
                totalSize?: number;
                data?: Uint8Array;
            };
            clearBitmap?: {
                target?: import("./gremlin").BitmapTarget;
                slot?: number;
            };
            saveSettings?: boolean;
            resetGremlinDefaults?: boolean;
        };
    } & {
        requestId?: number;
        core?: {
            getDeviceInfo?: boolean;
            getLockState?: boolean;
            lock?: boolean;
            resetSettings?: boolean;
        } & {
            getDeviceInfo?: boolean;
            getLockState?: boolean;
            lock?: boolean;
            resetSettings?: boolean;
        } & { [K_34 in Exclude<keyof I_1["core"], keyof Request1>]: never; };
        behaviors?: {
            listAllBehaviors?: boolean;
            getBehaviorDetails?: {
                behaviorId?: number;
            };
        } & {
            listAllBehaviors?: boolean;
            getBehaviorDetails?: {
                behaviorId?: number;
            } & {
                behaviorId?: number;
            } & { [K_35 in Exclude<keyof I_1["behaviors"]["getBehaviorDetails"], "behaviorId">]: never; };
        } & { [K_36 in Exclude<keyof I_1["behaviors"], keyof Request2>]: never; };
        keymap?: {
            getKeymap?: boolean;
            setLayerBinding?: {
                layerId?: number;
                keyPosition?: number;
                binding?: {
                    behaviorId?: number;
                    param1?: number;
                    param2?: number;
                };
            };
            checkUnsavedChanges?: boolean;
            saveChanges?: boolean;
            discardChanges?: boolean;
            getPhysicalLayouts?: boolean;
            setActivePhysicalLayout?: number;
            moveLayer?: {
                startIndex?: number;
                destIndex?: number;
            };
            addLayer?: {};
            removeLayer?: {
                layerIndex?: number;
            };
            restoreLayer?: {
                layerId?: number;
                atIndex?: number;
            };
            setLayerProps?: {
                layerId?: number;
                name?: string;
            };
        } & {
            getKeymap?: boolean;
            setLayerBinding?: {
                layerId?: number;
                keyPosition?: number;
                binding?: {
                    behaviorId?: number;
                    param1?: number;
                    param2?: number;
                };
            } & {
                layerId?: number;
                keyPosition?: number;
                binding?: {
                    behaviorId?: number;
                    param1?: number;
                    param2?: number;
                } & {
                    behaviorId?: number;
                    param1?: number;
                    param2?: number;
                } & { [K_37 in Exclude<keyof I_1["keymap"]["setLayerBinding"]["binding"], keyof import("./keymap").BehaviorBinding>]: never; };
            } & { [K_38 in Exclude<keyof I_1["keymap"]["setLayerBinding"], keyof import("./keymap").SetLayerBindingRequest>]: never; };
            checkUnsavedChanges?: boolean;
            saveChanges?: boolean;
            discardChanges?: boolean;
            getPhysicalLayouts?: boolean;
            setActivePhysicalLayout?: number;
            moveLayer?: {
                startIndex?: number;
                destIndex?: number;
            } & {
                startIndex?: number;
                destIndex?: number;
            } & { [K_39 in Exclude<keyof I_1["keymap"]["moveLayer"], keyof import("./keymap").MoveLayerRequest>]: never; };
            addLayer?: {} & {} & { [K_40 in Exclude<keyof I_1["keymap"]["addLayer"], never>]: never; };
            removeLayer?: {
                layerIndex?: number;
            } & {
                layerIndex?: number;
            } & { [K_41 in Exclude<keyof I_1["keymap"]["removeLayer"], "layerIndex">]: never; };
            restoreLayer?: {
                layerId?: number;
                atIndex?: number;
            } & {
                layerId?: number;
                atIndex?: number;
            } & { [K_42 in Exclude<keyof I_1["keymap"]["restoreLayer"], keyof import("./keymap").RestoreLayerRequest>]: never; };
            setLayerProps?: {
                layerId?: number;
                name?: string;
            } & {
                layerId?: number;
                name?: string;
            } & { [K_43 in Exclude<keyof I_1["keymap"]["setLayerProps"], keyof import("./keymap").SetLayerPropsRequest>]: never; };
        } & { [K_44 in Exclude<keyof I_1["keymap"], keyof Request3>]: never; };
        gremlin?: {
            getCapabilities?: boolean;
            getSleepConfig?: boolean;
            setSleepConfig?: {
                displaySleepMs?: number;
                idleTimeoutMs?: number;
                deepSleepMs?: number;
            };
            getDisplayConfig?: boolean;
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
            getStickConfig?: boolean;
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
            getStickLayerConfig?: number;
            setStickLayerConfig?: {
                layerIndex?: number;
                mode?: import("./gremlin").StickMode;
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
            getStickTelemetry?: boolean;
            getCombo?: number;
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
            getHoldTap?: number;
            setHoldTap?: {
                index?: number;
                enabled?: boolean;
                tappingTermMs?: number;
                quickTapMs?: number;
                requirePriorIdleMs?: number;
                flavor?: import("./gremlin").HoldTapFlavor;
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
            getTapDance?: number;
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
            getMacro?: number;
            setMacro?: {
                index?: number;
                enabled?: boolean;
                waitMs?: number;
                tapMs?: number;
                steps?: {
                    type?: import("./gremlin").MacroStepType;
                    binding?: {
                        behaviorId?: number;
                        param1?: number;
                        param2?: number;
                    };
                    delayMs?: number;
                }[];
            };
            getBitmapChunk?: {
                target?: import("./gremlin").BitmapTarget;
                slot?: number;
                offset?: number;
                length?: number;
            };
            setBitmapChunk?: {
                target?: import("./gremlin").BitmapTarget;
                slot?: number;
                offset?: number;
                totalSize?: number;
                data?: Uint8Array;
            };
            clearBitmap?: {
                target?: import("./gremlin").BitmapTarget;
                slot?: number;
            };
            saveSettings?: boolean;
            resetGremlinDefaults?: boolean;
        } & {
            getCapabilities?: boolean;
            getSleepConfig?: boolean;
            setSleepConfig?: {
                displaySleepMs?: number;
                idleTimeoutMs?: number;
                deepSleepMs?: number;
            } & {
                displaySleepMs?: number;
                idleTimeoutMs?: number;
                deepSleepMs?: number;
            } & { [K_45 in Exclude<keyof I_1["gremlin"]["setSleepConfig"], keyof import("./gremlin").SleepConfig>]: never; };
            getDisplayConfig?: boolean;
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
                animSequence?: number[] & number[] & { [K_46 in Exclude<keyof I_1["gremlin"]["setDisplayConfig"]["animSequence"], keyof number[]>]: never; };
            } & { [K_47 in Exclude<keyof I_1["gremlin"]["setDisplayConfig"], keyof import("./gremlin").DisplayConfig>]: never; };
            getStickConfig?: boolean;
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
            } & { [K_48 in Exclude<keyof I_1["gremlin"]["setStickConfig"], keyof import("./gremlin").StickConfig>]: never; };
            getStickLayerConfig?: number;
            setStickLayerConfig?: {
                layerIndex?: number;
                mode?: import("./gremlin").StickMode;
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
                mode?: import("./gremlin").StickMode;
                upPosition?: number;
                downPosition?: number;
                leftPosition?: number;
                rightPosition?: number;
                switchActivationPoint?: number;
                switchHysteresis?: number;
                mouseMinSpeed?: number;
                mouseMaxSpeed?: number;
                scrollDivisor?: number;
            } & { [K_49 in Exclude<keyof I_1["gremlin"]["setStickLayerConfig"], keyof import("./gremlin").StickLayerConfig>]: never; };
            getStickTelemetry?: boolean;
            getCombo?: number;
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
                keyPositions?: number[] & number[] & { [K_50 in Exclude<keyof I_1["gremlin"]["setCombo"]["keyPositions"], keyof number[]>]: never; };
                binding?: {
                    behaviorId?: number;
                    param1?: number;
                    param2?: number;
                } & {
                    behaviorId?: number;
                    param1?: number;
                    param2?: number;
                } & { [K_51 in Exclude<keyof I_1["gremlin"]["setCombo"]["binding"], keyof import("./gremlin").BindingSpec>]: never; };
            } & { [K_52 in Exclude<keyof I_1["gremlin"]["setCombo"], keyof import("./gremlin").ComboConfig>]: never; };
            getHoldTap?: number;
            setHoldTap?: {
                index?: number;
                enabled?: boolean;
                tappingTermMs?: number;
                quickTapMs?: number;
                requirePriorIdleMs?: number;
                flavor?: import("./gremlin").HoldTapFlavor;
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
                flavor?: import("./gremlin").HoldTapFlavor;
                retroTap?: boolean;
                holdBinding?: {
                    behaviorId?: number;
                    param1?: number;
                    param2?: number;
                } & {
                    behaviorId?: number;
                    param1?: number;
                    param2?: number;
                } & { [K_53 in Exclude<keyof I_1["gremlin"]["setHoldTap"]["holdBinding"], keyof import("./gremlin").BindingSpec>]: never; };
                tapBinding?: {
                    behaviorId?: number;
                    param1?: number;
                    param2?: number;
                } & {
                    behaviorId?: number;
                    param1?: number;
                    param2?: number;
                } & { [K_54 in Exclude<keyof I_1["gremlin"]["setHoldTap"]["tapBinding"], keyof import("./gremlin").BindingSpec>]: never; };
            } & { [K_55 in Exclude<keyof I_1["gremlin"]["setHoldTap"], keyof import("./gremlin").HoldTapConfig>]: never; };
            getTapDance?: number;
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
                } & { [K_56 in Exclude<keyof I_1["gremlin"]["setTapDance"]["bindings"][number], keyof import("./gremlin").BindingSpec>]: never; })[] & { [K_57 in Exclude<keyof I_1["gremlin"]["setTapDance"]["bindings"], keyof {
                    behaviorId?: number;
                    param1?: number;
                    param2?: number;
                }[]>]: never; };
            } & { [K_58 in Exclude<keyof I_1["gremlin"]["setTapDance"], keyof import("./gremlin").TapDanceConfig>]: never; };
            getMacro?: number;
            setMacro?: {
                index?: number;
                enabled?: boolean;
                waitMs?: number;
                tapMs?: number;
                steps?: {
                    type?: import("./gremlin").MacroStepType;
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
                    type?: import("./gremlin").MacroStepType;
                    binding?: {
                        behaviorId?: number;
                        param1?: number;
                        param2?: number;
                    };
                    delayMs?: number;
                }[] & ({
                    type?: import("./gremlin").MacroStepType;
                    binding?: {
                        behaviorId?: number;
                        param1?: number;
                        param2?: number;
                    };
                    delayMs?: number;
                } & {
                    type?: import("./gremlin").MacroStepType;
                    binding?: {
                        behaviorId?: number;
                        param1?: number;
                        param2?: number;
                    } & {
                        behaviorId?: number;
                        param1?: number;
                        param2?: number;
                    } & { [K_59 in Exclude<keyof I_1["gremlin"]["setMacro"]["steps"][number]["binding"], keyof import("./gremlin").BindingSpec>]: never; };
                    delayMs?: number;
                } & { [K_60 in Exclude<keyof I_1["gremlin"]["setMacro"]["steps"][number], keyof import("./gremlin").MacroStep>]: never; })[] & { [K_61 in Exclude<keyof I_1["gremlin"]["setMacro"]["steps"], keyof {
                    type?: import("./gremlin").MacroStepType;
                    binding?: {
                        behaviorId?: number;
                        param1?: number;
                        param2?: number;
                    };
                    delayMs?: number;
                }[]>]: never; };
            } & { [K_62 in Exclude<keyof I_1["gremlin"]["setMacro"], keyof import("./gremlin").MacroConfig>]: never; };
            getBitmapChunk?: {
                target?: import("./gremlin").BitmapTarget;
                slot?: number;
                offset?: number;
                length?: number;
            } & {
                target?: import("./gremlin").BitmapTarget;
                slot?: number;
                offset?: number;
                length?: number;
            } & { [K_63 in Exclude<keyof I_1["gremlin"]["getBitmapChunk"], keyof import("./gremlin").GetBitmapChunkRequest>]: never; };
            setBitmapChunk?: {
                target?: import("./gremlin").BitmapTarget;
                slot?: number;
                offset?: number;
                totalSize?: number;
                data?: Uint8Array;
            } & {
                target?: import("./gremlin").BitmapTarget;
                slot?: number;
                offset?: number;
                totalSize?: number;
                data?: Uint8Array;
            } & { [K_64 in Exclude<keyof I_1["gremlin"]["setBitmapChunk"], keyof import("./gremlin").SetBitmapChunkRequest>]: never; };
            clearBitmap?: {
                target?: import("./gremlin").BitmapTarget;
                slot?: number;
            } & {
                target?: import("./gremlin").BitmapTarget;
                slot?: number;
            } & { [K_65 in Exclude<keyof I_1["gremlin"]["clearBitmap"], keyof import("./gremlin").ClearBitmapRequest>]: never; };
            saveSettings?: boolean;
            resetGremlinDefaults?: boolean;
        } & { [K_66 in Exclude<keyof I_1["gremlin"], keyof Request4>]: never; };
    } & { [K_67 in Exclude<keyof I_1, keyof Request>]: never; }>(object: I_1): Request;
};
export declare const Response: {
    encode(message: Response, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Response;
    fromJSON(object: any): Response;
    toJSON(message: Response): unknown;
    create<I extends {
        requestResponse?: {
            requestId?: number;
            meta?: {
                noResponse?: boolean;
                simpleError?: import("./meta").ErrorConditions;
            };
            core?: {
                getDeviceInfo?: {
                    name?: string;
                    serialNumber?: Uint8Array;
                };
                getLockState?: import("./core").LockState;
                resetSettings?: boolean;
            };
            behaviors?: {
                listAllBehaviors?: {
                    behaviors?: number[];
                };
                getBehaviorDetails?: {
                    id?: number;
                    displayName?: string;
                    metadata?: {
                        param1?: {
                            name?: string;
                            nil?: {};
                            constant?: number;
                            range?: {
                                min?: number;
                                max?: number;
                            };
                            hidUsage?: {
                                keyboardMax?: number;
                                consumerMax?: number;
                            };
                            layerId?: {};
                        }[];
                        param2?: {
                            name?: string;
                            nil?: {};
                            constant?: number;
                            range?: {
                                min?: number;
                                max?: number;
                            };
                            hidUsage?: {
                                keyboardMax?: number;
                                consumerMax?: number;
                            };
                            layerId?: {};
                        }[];
                    }[];
                };
            };
            keymap?: {
                getKeymap?: {
                    layers?: {
                        id?: number;
                        name?: string;
                        bindings?: {
                            behaviorId?: number;
                            param1?: number;
                            param2?: number;
                        }[];
                    }[];
                    availableLayers?: number;
                    maxLayerNameLength?: number;
                };
                setLayerBinding?: import("./keymap").SetLayerBindingResponse;
                checkUnsavedChanges?: boolean;
                saveChanges?: {
                    ok?: boolean;
                    err?: import("./keymap").SaveChangesErrorCode;
                };
                discardChanges?: boolean;
                getPhysicalLayouts?: {
                    activeLayoutIndex?: number;
                    layouts?: {
                        name?: string;
                        keys?: {
                            width?: number;
                            height?: number;
                            x?: number;
                            y?: number;
                            r?: number;
                            rx?: number;
                            ry?: number;
                        }[];
                    }[];
                };
                setActivePhysicalLayout?: {
                    ok?: {
                        layers?: {
                            id?: number;
                            name?: string;
                            bindings?: {
                                behaviorId?: number;
                                param1?: number;
                                param2?: number;
                            }[];
                        }[];
                        availableLayers?: number;
                        maxLayerNameLength?: number;
                    };
                    err?: import("./keymap").SetActivePhysicalLayoutErrorCode;
                };
                moveLayer?: {
                    ok?: {
                        layers?: {
                            id?: number;
                            name?: string;
                            bindings?: {
                                behaviorId?: number;
                                param1?: number;
                                param2?: number;
                            }[];
                        }[];
                        availableLayers?: number;
                        maxLayerNameLength?: number;
                    };
                    err?: import("./keymap").MoveLayerErrorCode;
                };
                addLayer?: {
                    ok?: {
                        index?: number;
                        layer?: {
                            id?: number;
                            name?: string;
                            bindings?: {
                                behaviorId?: number;
                                param1?: number;
                                param2?: number;
                            }[];
                        };
                    };
                    err?: import("./keymap").AddLayerErrorCode;
                };
                removeLayer?: {
                    ok?: {};
                    err?: import("./keymap").RemoveLayerErrorCode;
                };
                restoreLayer?: {
                    ok?: {
                        id?: number;
                        name?: string;
                        bindings?: {
                            behaviorId?: number;
                            param1?: number;
                            param2?: number;
                        }[];
                    };
                    err?: import("./keymap").RestoreLayerErrorCode;
                };
                setLayerProps?: import("./keymap").SetLayerPropsResponse;
            };
            gremlin?: {
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
                setSleepConfig?: import("./gremlin").GremlinStatusCode;
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
                setDisplayConfig?: import("./gremlin").GremlinStatusCode;
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
                setStickConfig?: import("./gremlin").GremlinStatusCode;
                getStickLayerConfig?: {
                    layerIndex?: number;
                    mode?: import("./gremlin").StickMode;
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
                setStickLayerConfig?: import("./gremlin").GremlinStatusCode;
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
                setCombo?: import("./gremlin").GremlinStatusCode;
                getHoldTap?: {
                    index?: number;
                    enabled?: boolean;
                    tappingTermMs?: number;
                    quickTapMs?: number;
                    requirePriorIdleMs?: number;
                    flavor?: import("./gremlin").HoldTapFlavor;
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
                setHoldTap?: import("./gremlin").GremlinStatusCode;
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
                setTapDance?: import("./gremlin").GremlinStatusCode;
                getMacro?: {
                    index?: number;
                    enabled?: boolean;
                    waitMs?: number;
                    tapMs?: number;
                    steps?: {
                        type?: import("./gremlin").MacroStepType;
                        binding?: {
                            behaviorId?: number;
                            param1?: number;
                            param2?: number;
                        };
                        delayMs?: number;
                    }[];
                };
                setMacro?: import("./gremlin").GremlinStatusCode;
                getBitmapChunk?: {
                    target?: import("./gremlin").BitmapTarget;
                    slot?: number;
                    offset?: number;
                    totalSize?: number;
                    isCustom?: boolean;
                    data?: Uint8Array;
                };
                setBitmapChunk?: import("./gremlin").GremlinStatusCode;
                clearBitmap?: import("./gremlin").GremlinStatusCode;
                saveSettings?: import("./gremlin").GremlinStatusCode;
                resetGremlinDefaults?: import("./gremlin").GremlinStatusCode;
            };
        };
        notification?: {
            core?: {
                lockStateChanged?: import("./core").LockState;
            };
            keymap?: {
                unsavedChangesStatusChanged?: boolean;
            };
        };
    } & {
        requestResponse?: {
            requestId?: number;
            meta?: {
                noResponse?: boolean;
                simpleError?: import("./meta").ErrorConditions;
            };
            core?: {
                getDeviceInfo?: {
                    name?: string;
                    serialNumber?: Uint8Array;
                };
                getLockState?: import("./core").LockState;
                resetSettings?: boolean;
            };
            behaviors?: {
                listAllBehaviors?: {
                    behaviors?: number[];
                };
                getBehaviorDetails?: {
                    id?: number;
                    displayName?: string;
                    metadata?: {
                        param1?: {
                            name?: string;
                            nil?: {};
                            constant?: number;
                            range?: {
                                min?: number;
                                max?: number;
                            };
                            hidUsage?: {
                                keyboardMax?: number;
                                consumerMax?: number;
                            };
                            layerId?: {};
                        }[];
                        param2?: {
                            name?: string;
                            nil?: {};
                            constant?: number;
                            range?: {
                                min?: number;
                                max?: number;
                            };
                            hidUsage?: {
                                keyboardMax?: number;
                                consumerMax?: number;
                            };
                            layerId?: {};
                        }[];
                    }[];
                };
            };
            keymap?: {
                getKeymap?: {
                    layers?: {
                        id?: number;
                        name?: string;
                        bindings?: {
                            behaviorId?: number;
                            param1?: number;
                            param2?: number;
                        }[];
                    }[];
                    availableLayers?: number;
                    maxLayerNameLength?: number;
                };
                setLayerBinding?: import("./keymap").SetLayerBindingResponse;
                checkUnsavedChanges?: boolean;
                saveChanges?: {
                    ok?: boolean;
                    err?: import("./keymap").SaveChangesErrorCode;
                };
                discardChanges?: boolean;
                getPhysicalLayouts?: {
                    activeLayoutIndex?: number;
                    layouts?: {
                        name?: string;
                        keys?: {
                            width?: number;
                            height?: number;
                            x?: number;
                            y?: number;
                            r?: number;
                            rx?: number;
                            ry?: number;
                        }[];
                    }[];
                };
                setActivePhysicalLayout?: {
                    ok?: {
                        layers?: {
                            id?: number;
                            name?: string;
                            bindings?: {
                                behaviorId?: number;
                                param1?: number;
                                param2?: number;
                            }[];
                        }[];
                        availableLayers?: number;
                        maxLayerNameLength?: number;
                    };
                    err?: import("./keymap").SetActivePhysicalLayoutErrorCode;
                };
                moveLayer?: {
                    ok?: {
                        layers?: {
                            id?: number;
                            name?: string;
                            bindings?: {
                                behaviorId?: number;
                                param1?: number;
                                param2?: number;
                            }[];
                        }[];
                        availableLayers?: number;
                        maxLayerNameLength?: number;
                    };
                    err?: import("./keymap").MoveLayerErrorCode;
                };
                addLayer?: {
                    ok?: {
                        index?: number;
                        layer?: {
                            id?: number;
                            name?: string;
                            bindings?: {
                                behaviorId?: number;
                                param1?: number;
                                param2?: number;
                            }[];
                        };
                    };
                    err?: import("./keymap").AddLayerErrorCode;
                };
                removeLayer?: {
                    ok?: {};
                    err?: import("./keymap").RemoveLayerErrorCode;
                };
                restoreLayer?: {
                    ok?: {
                        id?: number;
                        name?: string;
                        bindings?: {
                            behaviorId?: number;
                            param1?: number;
                            param2?: number;
                        }[];
                    };
                    err?: import("./keymap").RestoreLayerErrorCode;
                };
                setLayerProps?: import("./keymap").SetLayerPropsResponse;
            };
            gremlin?: {
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
                setSleepConfig?: import("./gremlin").GremlinStatusCode;
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
                setDisplayConfig?: import("./gremlin").GremlinStatusCode;
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
                setStickConfig?: import("./gremlin").GremlinStatusCode;
                getStickLayerConfig?: {
                    layerIndex?: number;
                    mode?: import("./gremlin").StickMode;
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
                setStickLayerConfig?: import("./gremlin").GremlinStatusCode;
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
                setCombo?: import("./gremlin").GremlinStatusCode;
                getHoldTap?: {
                    index?: number;
                    enabled?: boolean;
                    tappingTermMs?: number;
                    quickTapMs?: number;
                    requirePriorIdleMs?: number;
                    flavor?: import("./gremlin").HoldTapFlavor;
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
                setHoldTap?: import("./gremlin").GremlinStatusCode;
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
                setTapDance?: import("./gremlin").GremlinStatusCode;
                getMacro?: {
                    index?: number;
                    enabled?: boolean;
                    waitMs?: number;
                    tapMs?: number;
                    steps?: {
                        type?: import("./gremlin").MacroStepType;
                        binding?: {
                            behaviorId?: number;
                            param1?: number;
                            param2?: number;
                        };
                        delayMs?: number;
                    }[];
                };
                setMacro?: import("./gremlin").GremlinStatusCode;
                getBitmapChunk?: {
                    target?: import("./gremlin").BitmapTarget;
                    slot?: number;
                    offset?: number;
                    totalSize?: number;
                    isCustom?: boolean;
                    data?: Uint8Array;
                };
                setBitmapChunk?: import("./gremlin").GremlinStatusCode;
                clearBitmap?: import("./gremlin").GremlinStatusCode;
                saveSettings?: import("./gremlin").GremlinStatusCode;
                resetGremlinDefaults?: import("./gremlin").GremlinStatusCode;
            };
        } & {
            requestId?: number;
            meta?: {
                noResponse?: boolean;
                simpleError?: import("./meta").ErrorConditions;
            } & {
                noResponse?: boolean;
                simpleError?: import("./meta").ErrorConditions;
            } & { [K in Exclude<keyof I["requestResponse"]["meta"], keyof Response5>]: never; };
            core?: {
                getDeviceInfo?: {
                    name?: string;
                    serialNumber?: Uint8Array;
                };
                getLockState?: import("./core").LockState;
                resetSettings?: boolean;
            } & {
                getDeviceInfo?: {
                    name?: string;
                    serialNumber?: Uint8Array;
                } & {
                    name?: string;
                    serialNumber?: Uint8Array;
                } & { [K_1 in Exclude<keyof I["requestResponse"]["core"]["getDeviceInfo"], keyof import("./core").GetDeviceInfoResponse>]: never; };
                getLockState?: import("./core").LockState;
                resetSettings?: boolean;
            } & { [K_2 in Exclude<keyof I["requestResponse"]["core"], keyof Response6>]: never; };
            behaviors?: {
                listAllBehaviors?: {
                    behaviors?: number[];
                };
                getBehaviorDetails?: {
                    id?: number;
                    displayName?: string;
                    metadata?: {
                        param1?: {
                            name?: string;
                            nil?: {};
                            constant?: number;
                            range?: {
                                min?: number;
                                max?: number;
                            };
                            hidUsage?: {
                                keyboardMax?: number;
                                consumerMax?: number;
                            };
                            layerId?: {};
                        }[];
                        param2?: {
                            name?: string;
                            nil?: {};
                            constant?: number;
                            range?: {
                                min?: number;
                                max?: number;
                            };
                            hidUsage?: {
                                keyboardMax?: number;
                                consumerMax?: number;
                            };
                            layerId?: {};
                        }[];
                    }[];
                };
            } & {
                listAllBehaviors?: {
                    behaviors?: number[];
                } & {
                    behaviors?: number[] & number[] & { [K_3 in Exclude<keyof I["requestResponse"]["behaviors"]["listAllBehaviors"]["behaviors"], keyof number[]>]: never; };
                } & { [K_4 in Exclude<keyof I["requestResponse"]["behaviors"]["listAllBehaviors"], "behaviors">]: never; };
                getBehaviorDetails?: {
                    id?: number;
                    displayName?: string;
                    metadata?: {
                        param1?: {
                            name?: string;
                            nil?: {};
                            constant?: number;
                            range?: {
                                min?: number;
                                max?: number;
                            };
                            hidUsage?: {
                                keyboardMax?: number;
                                consumerMax?: number;
                            };
                            layerId?: {};
                        }[];
                        param2?: {
                            name?: string;
                            nil?: {};
                            constant?: number;
                            range?: {
                                min?: number;
                                max?: number;
                            };
                            hidUsage?: {
                                keyboardMax?: number;
                                consumerMax?: number;
                            };
                            layerId?: {};
                        }[];
                    }[];
                } & {
                    id?: number;
                    displayName?: string;
                    metadata?: {
                        param1?: {
                            name?: string;
                            nil?: {};
                            constant?: number;
                            range?: {
                                min?: number;
                                max?: number;
                            };
                            hidUsage?: {
                                keyboardMax?: number;
                                consumerMax?: number;
                            };
                            layerId?: {};
                        }[];
                        param2?: {
                            name?: string;
                            nil?: {};
                            constant?: number;
                            range?: {
                                min?: number;
                                max?: number;
                            };
                            hidUsage?: {
                                keyboardMax?: number;
                                consumerMax?: number;
                            };
                            layerId?: {};
                        }[];
                    }[] & ({
                        param1?: {
                            name?: string;
                            nil?: {};
                            constant?: number;
                            range?: {
                                min?: number;
                                max?: number;
                            };
                            hidUsage?: {
                                keyboardMax?: number;
                                consumerMax?: number;
                            };
                            layerId?: {};
                        }[];
                        param2?: {
                            name?: string;
                            nil?: {};
                            constant?: number;
                            range?: {
                                min?: number;
                                max?: number;
                            };
                            hidUsage?: {
                                keyboardMax?: number;
                                consumerMax?: number;
                            };
                            layerId?: {};
                        }[];
                    } & {
                        param1?: {
                            name?: string;
                            nil?: {};
                            constant?: number;
                            range?: {
                                min?: number;
                                max?: number;
                            };
                            hidUsage?: {
                                keyboardMax?: number;
                                consumerMax?: number;
                            };
                            layerId?: {};
                        }[] & ({
                            name?: string;
                            nil?: {};
                            constant?: number;
                            range?: {
                                min?: number;
                                max?: number;
                            };
                            hidUsage?: {
                                keyboardMax?: number;
                                consumerMax?: number;
                            };
                            layerId?: {};
                        } & {
                            name?: string;
                            nil?: {} & {} & { [K_5 in Exclude<keyof I["requestResponse"]["behaviors"]["getBehaviorDetails"]["metadata"][number]["param1"][number]["nil"], never>]: never; };
                            constant?: number;
                            range?: {
                                min?: number;
                                max?: number;
                            } & {
                                min?: number;
                                max?: number;
                            } & { [K_6 in Exclude<keyof I["requestResponse"]["behaviors"]["getBehaviorDetails"]["metadata"][number]["param1"][number]["range"], keyof import("./behaviors").BehaviorParameterValueDescriptionRange>]: never; };
                            hidUsage?: {
                                keyboardMax?: number;
                                consumerMax?: number;
                            } & {
                                keyboardMax?: number;
                                consumerMax?: number;
                            } & { [K_7 in Exclude<keyof I["requestResponse"]["behaviors"]["getBehaviorDetails"]["metadata"][number]["param1"][number]["hidUsage"], keyof import("./behaviors").BehaviorParameterHidUsage>]: never; };
                            layerId?: {} & {} & { [K_8 in Exclude<keyof I["requestResponse"]["behaviors"]["getBehaviorDetails"]["metadata"][number]["param1"][number]["layerId"], never>]: never; };
                        } & { [K_9 in Exclude<keyof I["requestResponse"]["behaviors"]["getBehaviorDetails"]["metadata"][number]["param1"][number], keyof import("./behaviors").BehaviorParameterValueDescription>]: never; })[] & { [K_10 in Exclude<keyof I["requestResponse"]["behaviors"]["getBehaviorDetails"]["metadata"][number]["param1"], keyof {
                            name?: string;
                            nil?: {};
                            constant?: number;
                            range?: {
                                min?: number;
                                max?: number;
                            };
                            hidUsage?: {
                                keyboardMax?: number;
                                consumerMax?: number;
                            };
                            layerId?: {};
                        }[]>]: never; };
                        param2?: {
                            name?: string;
                            nil?: {};
                            constant?: number;
                            range?: {
                                min?: number;
                                max?: number;
                            };
                            hidUsage?: {
                                keyboardMax?: number;
                                consumerMax?: number;
                            };
                            layerId?: {};
                        }[] & ({
                            name?: string;
                            nil?: {};
                            constant?: number;
                            range?: {
                                min?: number;
                                max?: number;
                            };
                            hidUsage?: {
                                keyboardMax?: number;
                                consumerMax?: number;
                            };
                            layerId?: {};
                        } & {
                            name?: string;
                            nil?: {} & {} & { [K_11 in Exclude<keyof I["requestResponse"]["behaviors"]["getBehaviorDetails"]["metadata"][number]["param2"][number]["nil"], never>]: never; };
                            constant?: number;
                            range?: {
                                min?: number;
                                max?: number;
                            } & {
                                min?: number;
                                max?: number;
                            } & { [K_12 in Exclude<keyof I["requestResponse"]["behaviors"]["getBehaviorDetails"]["metadata"][number]["param2"][number]["range"], keyof import("./behaviors").BehaviorParameterValueDescriptionRange>]: never; };
                            hidUsage?: {
                                keyboardMax?: number;
                                consumerMax?: number;
                            } & {
                                keyboardMax?: number;
                                consumerMax?: number;
                            } & { [K_13 in Exclude<keyof I["requestResponse"]["behaviors"]["getBehaviorDetails"]["metadata"][number]["param2"][number]["hidUsage"], keyof import("./behaviors").BehaviorParameterHidUsage>]: never; };
                            layerId?: {} & {} & { [K_14 in Exclude<keyof I["requestResponse"]["behaviors"]["getBehaviorDetails"]["metadata"][number]["param2"][number]["layerId"], never>]: never; };
                        } & { [K_15 in Exclude<keyof I["requestResponse"]["behaviors"]["getBehaviorDetails"]["metadata"][number]["param2"][number], keyof import("./behaviors").BehaviorParameterValueDescription>]: never; })[] & { [K_16 in Exclude<keyof I["requestResponse"]["behaviors"]["getBehaviorDetails"]["metadata"][number]["param2"], keyof {
                            name?: string;
                            nil?: {};
                            constant?: number;
                            range?: {
                                min?: number;
                                max?: number;
                            };
                            hidUsage?: {
                                keyboardMax?: number;
                                consumerMax?: number;
                            };
                            layerId?: {};
                        }[]>]: never; };
                    } & { [K_17 in Exclude<keyof I["requestResponse"]["behaviors"]["getBehaviorDetails"]["metadata"][number], keyof import("./behaviors").BehaviorBindingParametersSet>]: never; })[] & { [K_18 in Exclude<keyof I["requestResponse"]["behaviors"]["getBehaviorDetails"]["metadata"], keyof {
                        param1?: {
                            name?: string;
                            nil?: {};
                            constant?: number;
                            range?: {
                                min?: number;
                                max?: number;
                            };
                            hidUsage?: {
                                keyboardMax?: number;
                                consumerMax?: number;
                            };
                            layerId?: {};
                        }[];
                        param2?: {
                            name?: string;
                            nil?: {};
                            constant?: number;
                            range?: {
                                min?: number;
                                max?: number;
                            };
                            hidUsage?: {
                                keyboardMax?: number;
                                consumerMax?: number;
                            };
                            layerId?: {};
                        }[];
                    }[]>]: never; };
                } & { [K_19 in Exclude<keyof I["requestResponse"]["behaviors"]["getBehaviorDetails"], keyof import("./behaviors").GetBehaviorDetailsResponse>]: never; };
            } & { [K_20 in Exclude<keyof I["requestResponse"]["behaviors"], keyof Response7>]: never; };
            keymap?: {
                getKeymap?: {
                    layers?: {
                        id?: number;
                        name?: string;
                        bindings?: {
                            behaviorId?: number;
                            param1?: number;
                            param2?: number;
                        }[];
                    }[];
                    availableLayers?: number;
                    maxLayerNameLength?: number;
                };
                setLayerBinding?: import("./keymap").SetLayerBindingResponse;
                checkUnsavedChanges?: boolean;
                saveChanges?: {
                    ok?: boolean;
                    err?: import("./keymap").SaveChangesErrorCode;
                };
                discardChanges?: boolean;
                getPhysicalLayouts?: {
                    activeLayoutIndex?: number;
                    layouts?: {
                        name?: string;
                        keys?: {
                            width?: number;
                            height?: number;
                            x?: number;
                            y?: number;
                            r?: number;
                            rx?: number;
                            ry?: number;
                        }[];
                    }[];
                };
                setActivePhysicalLayout?: {
                    ok?: {
                        layers?: {
                            id?: number;
                            name?: string;
                            bindings?: {
                                behaviorId?: number;
                                param1?: number;
                                param2?: number;
                            }[];
                        }[];
                        availableLayers?: number;
                        maxLayerNameLength?: number;
                    };
                    err?: import("./keymap").SetActivePhysicalLayoutErrorCode;
                };
                moveLayer?: {
                    ok?: {
                        layers?: {
                            id?: number;
                            name?: string;
                            bindings?: {
                                behaviorId?: number;
                                param1?: number;
                                param2?: number;
                            }[];
                        }[];
                        availableLayers?: number;
                        maxLayerNameLength?: number;
                    };
                    err?: import("./keymap").MoveLayerErrorCode;
                };
                addLayer?: {
                    ok?: {
                        index?: number;
                        layer?: {
                            id?: number;
                            name?: string;
                            bindings?: {
                                behaviorId?: number;
                                param1?: number;
                                param2?: number;
                            }[];
                        };
                    };
                    err?: import("./keymap").AddLayerErrorCode;
                };
                removeLayer?: {
                    ok?: {};
                    err?: import("./keymap").RemoveLayerErrorCode;
                };
                restoreLayer?: {
                    ok?: {
                        id?: number;
                        name?: string;
                        bindings?: {
                            behaviorId?: number;
                            param1?: number;
                            param2?: number;
                        }[];
                    };
                    err?: import("./keymap").RestoreLayerErrorCode;
                };
                setLayerProps?: import("./keymap").SetLayerPropsResponse;
            } & {
                getKeymap?: {
                    layers?: {
                        id?: number;
                        name?: string;
                        bindings?: {
                            behaviorId?: number;
                            param1?: number;
                            param2?: number;
                        }[];
                    }[];
                    availableLayers?: number;
                    maxLayerNameLength?: number;
                } & {
                    layers?: {
                        id?: number;
                        name?: string;
                        bindings?: {
                            behaviorId?: number;
                            param1?: number;
                            param2?: number;
                        }[];
                    }[] & ({
                        id?: number;
                        name?: string;
                        bindings?: {
                            behaviorId?: number;
                            param1?: number;
                            param2?: number;
                        }[];
                    } & {
                        id?: number;
                        name?: string;
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
                        } & { [K_21 in Exclude<keyof I["requestResponse"]["keymap"]["getKeymap"]["layers"][number]["bindings"][number], keyof import("./keymap").BehaviorBinding>]: never; })[] & { [K_22 in Exclude<keyof I["requestResponse"]["keymap"]["getKeymap"]["layers"][number]["bindings"], keyof {
                            behaviorId?: number;
                            param1?: number;
                            param2?: number;
                        }[]>]: never; };
                    } & { [K_23 in Exclude<keyof I["requestResponse"]["keymap"]["getKeymap"]["layers"][number], keyof import("./keymap").Layer>]: never; })[] & { [K_24 in Exclude<keyof I["requestResponse"]["keymap"]["getKeymap"]["layers"], keyof {
                        id?: number;
                        name?: string;
                        bindings?: {
                            behaviorId?: number;
                            param1?: number;
                            param2?: number;
                        }[];
                    }[]>]: never; };
                    availableLayers?: number;
                    maxLayerNameLength?: number;
                } & { [K_25 in Exclude<keyof I["requestResponse"]["keymap"]["getKeymap"], keyof import("./keymap").Keymap>]: never; };
                setLayerBinding?: import("./keymap").SetLayerBindingResponse;
                checkUnsavedChanges?: boolean;
                saveChanges?: {
                    ok?: boolean;
                    err?: import("./keymap").SaveChangesErrorCode;
                } & {
                    ok?: boolean;
                    err?: import("./keymap").SaveChangesErrorCode;
                } & { [K_26 in Exclude<keyof I["requestResponse"]["keymap"]["saveChanges"], keyof import("./keymap").SaveChangesResponse>]: never; };
                discardChanges?: boolean;
                getPhysicalLayouts?: {
                    activeLayoutIndex?: number;
                    layouts?: {
                        name?: string;
                        keys?: {
                            width?: number;
                            height?: number;
                            x?: number;
                            y?: number;
                            r?: number;
                            rx?: number;
                            ry?: number;
                        }[];
                    }[];
                } & {
                    activeLayoutIndex?: number;
                    layouts?: {
                        name?: string;
                        keys?: {
                            width?: number;
                            height?: number;
                            x?: number;
                            y?: number;
                            r?: number;
                            rx?: number;
                            ry?: number;
                        }[];
                    }[] & ({
                        name?: string;
                        keys?: {
                            width?: number;
                            height?: number;
                            x?: number;
                            y?: number;
                            r?: number;
                            rx?: number;
                            ry?: number;
                        }[];
                    } & {
                        name?: string;
                        keys?: {
                            width?: number;
                            height?: number;
                            x?: number;
                            y?: number;
                            r?: number;
                            rx?: number;
                            ry?: number;
                        }[] & ({
                            width?: number;
                            height?: number;
                            x?: number;
                            y?: number;
                            r?: number;
                            rx?: number;
                            ry?: number;
                        } & {
                            width?: number;
                            height?: number;
                            x?: number;
                            y?: number;
                            r?: number;
                            rx?: number;
                            ry?: number;
                        } & { [K_27 in Exclude<keyof I["requestResponse"]["keymap"]["getPhysicalLayouts"]["layouts"][number]["keys"][number], keyof import("./keymap").KeyPhysicalAttrs>]: never; })[] & { [K_28 in Exclude<keyof I["requestResponse"]["keymap"]["getPhysicalLayouts"]["layouts"][number]["keys"], keyof {
                            width?: number;
                            height?: number;
                            x?: number;
                            y?: number;
                            r?: number;
                            rx?: number;
                            ry?: number;
                        }[]>]: never; };
                    } & { [K_29 in Exclude<keyof I["requestResponse"]["keymap"]["getPhysicalLayouts"]["layouts"][number], keyof import("./keymap").PhysicalLayout>]: never; })[] & { [K_30 in Exclude<keyof I["requestResponse"]["keymap"]["getPhysicalLayouts"]["layouts"], keyof {
                        name?: string;
                        keys?: {
                            width?: number;
                            height?: number;
                            x?: number;
                            y?: number;
                            r?: number;
                            rx?: number;
                            ry?: number;
                        }[];
                    }[]>]: never; };
                } & { [K_31 in Exclude<keyof I["requestResponse"]["keymap"]["getPhysicalLayouts"], keyof import("./keymap").PhysicalLayouts>]: never; };
                setActivePhysicalLayout?: {
                    ok?: {
                        layers?: {
                            id?: number;
                            name?: string;
                            bindings?: {
                                behaviorId?: number;
                                param1?: number;
                                param2?: number;
                            }[];
                        }[];
                        availableLayers?: number;
                        maxLayerNameLength?: number;
                    };
                    err?: import("./keymap").SetActivePhysicalLayoutErrorCode;
                } & {
                    ok?: {
                        layers?: {
                            id?: number;
                            name?: string;
                            bindings?: {
                                behaviorId?: number;
                                param1?: number;
                                param2?: number;
                            }[];
                        }[];
                        availableLayers?: number;
                        maxLayerNameLength?: number;
                    } & {
                        layers?: {
                            id?: number;
                            name?: string;
                            bindings?: {
                                behaviorId?: number;
                                param1?: number;
                                param2?: number;
                            }[];
                        }[] & ({
                            id?: number;
                            name?: string;
                            bindings?: {
                                behaviorId?: number;
                                param1?: number;
                                param2?: number;
                            }[];
                        } & {
                            id?: number;
                            name?: string;
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
                            } & { [K_32 in Exclude<keyof I["requestResponse"]["keymap"]["setActivePhysicalLayout"]["ok"]["layers"][number]["bindings"][number], keyof import("./keymap").BehaviorBinding>]: never; })[] & { [K_33 in Exclude<keyof I["requestResponse"]["keymap"]["setActivePhysicalLayout"]["ok"]["layers"][number]["bindings"], keyof {
                                behaviorId?: number;
                                param1?: number;
                                param2?: number;
                            }[]>]: never; };
                        } & { [K_34 in Exclude<keyof I["requestResponse"]["keymap"]["setActivePhysicalLayout"]["ok"]["layers"][number], keyof import("./keymap").Layer>]: never; })[] & { [K_35 in Exclude<keyof I["requestResponse"]["keymap"]["setActivePhysicalLayout"]["ok"]["layers"], keyof {
                            id?: number;
                            name?: string;
                            bindings?: {
                                behaviorId?: number;
                                param1?: number;
                                param2?: number;
                            }[];
                        }[]>]: never; };
                        availableLayers?: number;
                        maxLayerNameLength?: number;
                    } & { [K_36 in Exclude<keyof I["requestResponse"]["keymap"]["setActivePhysicalLayout"]["ok"], keyof import("./keymap").Keymap>]: never; };
                    err?: import("./keymap").SetActivePhysicalLayoutErrorCode;
                } & { [K_37 in Exclude<keyof I["requestResponse"]["keymap"]["setActivePhysicalLayout"], keyof import("./keymap").SetActivePhysicalLayoutResponse>]: never; };
                moveLayer?: {
                    ok?: {
                        layers?: {
                            id?: number;
                            name?: string;
                            bindings?: {
                                behaviorId?: number;
                                param1?: number;
                                param2?: number;
                            }[];
                        }[];
                        availableLayers?: number;
                        maxLayerNameLength?: number;
                    };
                    err?: import("./keymap").MoveLayerErrorCode;
                } & {
                    ok?: {
                        layers?: {
                            id?: number;
                            name?: string;
                            bindings?: {
                                behaviorId?: number;
                                param1?: number;
                                param2?: number;
                            }[];
                        }[];
                        availableLayers?: number;
                        maxLayerNameLength?: number;
                    } & {
                        layers?: {
                            id?: number;
                            name?: string;
                            bindings?: {
                                behaviorId?: number;
                                param1?: number;
                                param2?: number;
                            }[];
                        }[] & ({
                            id?: number;
                            name?: string;
                            bindings?: {
                                behaviorId?: number;
                                param1?: number;
                                param2?: number;
                            }[];
                        } & {
                            id?: number;
                            name?: string;
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
                            } & { [K_38 in Exclude<keyof I["requestResponse"]["keymap"]["moveLayer"]["ok"]["layers"][number]["bindings"][number], keyof import("./keymap").BehaviorBinding>]: never; })[] & { [K_39 in Exclude<keyof I["requestResponse"]["keymap"]["moveLayer"]["ok"]["layers"][number]["bindings"], keyof {
                                behaviorId?: number;
                                param1?: number;
                                param2?: number;
                            }[]>]: never; };
                        } & { [K_40 in Exclude<keyof I["requestResponse"]["keymap"]["moveLayer"]["ok"]["layers"][number], keyof import("./keymap").Layer>]: never; })[] & { [K_41 in Exclude<keyof I["requestResponse"]["keymap"]["moveLayer"]["ok"]["layers"], keyof {
                            id?: number;
                            name?: string;
                            bindings?: {
                                behaviorId?: number;
                                param1?: number;
                                param2?: number;
                            }[];
                        }[]>]: never; };
                        availableLayers?: number;
                        maxLayerNameLength?: number;
                    } & { [K_42 in Exclude<keyof I["requestResponse"]["keymap"]["moveLayer"]["ok"], keyof import("./keymap").Keymap>]: never; };
                    err?: import("./keymap").MoveLayerErrorCode;
                } & { [K_43 in Exclude<keyof I["requestResponse"]["keymap"]["moveLayer"], keyof import("./keymap").MoveLayerResponse>]: never; };
                addLayer?: {
                    ok?: {
                        index?: number;
                        layer?: {
                            id?: number;
                            name?: string;
                            bindings?: {
                                behaviorId?: number;
                                param1?: number;
                                param2?: number;
                            }[];
                        };
                    };
                    err?: import("./keymap").AddLayerErrorCode;
                } & {
                    ok?: {
                        index?: number;
                        layer?: {
                            id?: number;
                            name?: string;
                            bindings?: {
                                behaviorId?: number;
                                param1?: number;
                                param2?: number;
                            }[];
                        };
                    } & {
                        index?: number;
                        layer?: {
                            id?: number;
                            name?: string;
                            bindings?: {
                                behaviorId?: number;
                                param1?: number;
                                param2?: number;
                            }[];
                        } & {
                            id?: number;
                            name?: string;
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
                            } & { [K_44 in Exclude<keyof I["requestResponse"]["keymap"]["addLayer"]["ok"]["layer"]["bindings"][number], keyof import("./keymap").BehaviorBinding>]: never; })[] & { [K_45 in Exclude<keyof I["requestResponse"]["keymap"]["addLayer"]["ok"]["layer"]["bindings"], keyof {
                                behaviorId?: number;
                                param1?: number;
                                param2?: number;
                            }[]>]: never; };
                        } & { [K_46 in Exclude<keyof I["requestResponse"]["keymap"]["addLayer"]["ok"]["layer"], keyof import("./keymap").Layer>]: never; };
                    } & { [K_47 in Exclude<keyof I["requestResponse"]["keymap"]["addLayer"]["ok"], keyof import("./keymap").AddLayerResponseDetails>]: never; };
                    err?: import("./keymap").AddLayerErrorCode;
                } & { [K_48 in Exclude<keyof I["requestResponse"]["keymap"]["addLayer"], keyof import("./keymap").AddLayerResponse>]: never; };
                removeLayer?: {
                    ok?: {};
                    err?: import("./keymap").RemoveLayerErrorCode;
                } & {
                    ok?: {} & {} & { [K_49 in Exclude<keyof I["requestResponse"]["keymap"]["removeLayer"]["ok"], never>]: never; };
                    err?: import("./keymap").RemoveLayerErrorCode;
                } & { [K_50 in Exclude<keyof I["requestResponse"]["keymap"]["removeLayer"], keyof import("./keymap").RemoveLayerResponse>]: never; };
                restoreLayer?: {
                    ok?: {
                        id?: number;
                        name?: string;
                        bindings?: {
                            behaviorId?: number;
                            param1?: number;
                            param2?: number;
                        }[];
                    };
                    err?: import("./keymap").RestoreLayerErrorCode;
                } & {
                    ok?: {
                        id?: number;
                        name?: string;
                        bindings?: {
                            behaviorId?: number;
                            param1?: number;
                            param2?: number;
                        }[];
                    } & {
                        id?: number;
                        name?: string;
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
                        } & { [K_51 in Exclude<keyof I["requestResponse"]["keymap"]["restoreLayer"]["ok"]["bindings"][number], keyof import("./keymap").BehaviorBinding>]: never; })[] & { [K_52 in Exclude<keyof I["requestResponse"]["keymap"]["restoreLayer"]["ok"]["bindings"], keyof {
                            behaviorId?: number;
                            param1?: number;
                            param2?: number;
                        }[]>]: never; };
                    } & { [K_53 in Exclude<keyof I["requestResponse"]["keymap"]["restoreLayer"]["ok"], keyof import("./keymap").Layer>]: never; };
                    err?: import("./keymap").RestoreLayerErrorCode;
                } & { [K_54 in Exclude<keyof I["requestResponse"]["keymap"]["restoreLayer"], keyof import("./keymap").RestoreLayerResponse>]: never; };
                setLayerProps?: import("./keymap").SetLayerPropsResponse;
            } & { [K_55 in Exclude<keyof I["requestResponse"]["keymap"], keyof Response8>]: never; };
            gremlin?: {
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
                setSleepConfig?: import("./gremlin").GremlinStatusCode;
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
                setDisplayConfig?: import("./gremlin").GremlinStatusCode;
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
                setStickConfig?: import("./gremlin").GremlinStatusCode;
                getStickLayerConfig?: {
                    layerIndex?: number;
                    mode?: import("./gremlin").StickMode;
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
                setStickLayerConfig?: import("./gremlin").GremlinStatusCode;
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
                setCombo?: import("./gremlin").GremlinStatusCode;
                getHoldTap?: {
                    index?: number;
                    enabled?: boolean;
                    tappingTermMs?: number;
                    quickTapMs?: number;
                    requirePriorIdleMs?: number;
                    flavor?: import("./gremlin").HoldTapFlavor;
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
                setHoldTap?: import("./gremlin").GremlinStatusCode;
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
                setTapDance?: import("./gremlin").GremlinStatusCode;
                getMacro?: {
                    index?: number;
                    enabled?: boolean;
                    waitMs?: number;
                    tapMs?: number;
                    steps?: {
                        type?: import("./gremlin").MacroStepType;
                        binding?: {
                            behaviorId?: number;
                            param1?: number;
                            param2?: number;
                        };
                        delayMs?: number;
                    }[];
                };
                setMacro?: import("./gremlin").GremlinStatusCode;
                getBitmapChunk?: {
                    target?: import("./gremlin").BitmapTarget;
                    slot?: number;
                    offset?: number;
                    totalSize?: number;
                    isCustom?: boolean;
                    data?: Uint8Array;
                };
                setBitmapChunk?: import("./gremlin").GremlinStatusCode;
                clearBitmap?: import("./gremlin").GremlinStatusCode;
                saveSettings?: import("./gremlin").GremlinStatusCode;
                resetGremlinDefaults?: import("./gremlin").GremlinStatusCode;
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
                } & { [K_56 in Exclude<keyof I["requestResponse"]["gremlin"]["getCapabilities"], keyof import("./gremlin").Capabilities>]: never; };
                getSleepConfig?: {
                    displaySleepMs?: number;
                    idleTimeoutMs?: number;
                    deepSleepMs?: number;
                } & {
                    displaySleepMs?: number;
                    idleTimeoutMs?: number;
                    deepSleepMs?: number;
                } & { [K_57 in Exclude<keyof I["requestResponse"]["gremlin"]["getSleepConfig"], keyof import("./gremlin").SleepConfig>]: never; };
                setSleepConfig?: import("./gremlin").GremlinStatusCode;
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
                    animSequence?: number[] & number[] & { [K_58 in Exclude<keyof I["requestResponse"]["gremlin"]["getDisplayConfig"]["animSequence"], keyof number[]>]: never; };
                } & { [K_59 in Exclude<keyof I["requestResponse"]["gremlin"]["getDisplayConfig"], keyof import("./gremlin").DisplayConfig>]: never; };
                setDisplayConfig?: import("./gremlin").GremlinStatusCode;
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
                } & { [K_60 in Exclude<keyof I["requestResponse"]["gremlin"]["getStickConfig"], keyof import("./gremlin").StickConfig>]: never; };
                setStickConfig?: import("./gremlin").GremlinStatusCode;
                getStickLayerConfig?: {
                    layerIndex?: number;
                    mode?: import("./gremlin").StickMode;
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
                    mode?: import("./gremlin").StickMode;
                    upPosition?: number;
                    downPosition?: number;
                    leftPosition?: number;
                    rightPosition?: number;
                    switchActivationPoint?: number;
                    switchHysteresis?: number;
                    mouseMinSpeed?: number;
                    mouseMaxSpeed?: number;
                    scrollDivisor?: number;
                } & { [K_61 in Exclude<keyof I["requestResponse"]["gremlin"]["getStickLayerConfig"], keyof import("./gremlin").StickLayerConfig>]: never; };
                setStickLayerConfig?: import("./gremlin").GremlinStatusCode;
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
                } & { [K_62 in Exclude<keyof I["requestResponse"]["gremlin"]["getStickTelemetry"], keyof import("./gremlin").StickTelemetry>]: never; };
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
                    keyPositions?: number[] & number[] & { [K_63 in Exclude<keyof I["requestResponse"]["gremlin"]["getCombo"]["keyPositions"], keyof number[]>]: never; };
                    binding?: {
                        behaviorId?: number;
                        param1?: number;
                        param2?: number;
                    } & {
                        behaviorId?: number;
                        param1?: number;
                        param2?: number;
                    } & { [K_64 in Exclude<keyof I["requestResponse"]["gremlin"]["getCombo"]["binding"], keyof import("./gremlin").BindingSpec>]: never; };
                } & { [K_65 in Exclude<keyof I["requestResponse"]["gremlin"]["getCombo"], keyof import("./gremlin").ComboConfig>]: never; };
                setCombo?: import("./gremlin").GremlinStatusCode;
                getHoldTap?: {
                    index?: number;
                    enabled?: boolean;
                    tappingTermMs?: number;
                    quickTapMs?: number;
                    requirePriorIdleMs?: number;
                    flavor?: import("./gremlin").HoldTapFlavor;
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
                    flavor?: import("./gremlin").HoldTapFlavor;
                    retroTap?: boolean;
                    holdBinding?: {
                        behaviorId?: number;
                        param1?: number;
                        param2?: number;
                    } & {
                        behaviorId?: number;
                        param1?: number;
                        param2?: number;
                    } & { [K_66 in Exclude<keyof I["requestResponse"]["gremlin"]["getHoldTap"]["holdBinding"], keyof import("./gremlin").BindingSpec>]: never; };
                    tapBinding?: {
                        behaviorId?: number;
                        param1?: number;
                        param2?: number;
                    } & {
                        behaviorId?: number;
                        param1?: number;
                        param2?: number;
                    } & { [K_67 in Exclude<keyof I["requestResponse"]["gremlin"]["getHoldTap"]["tapBinding"], keyof import("./gremlin").BindingSpec>]: never; };
                } & { [K_68 in Exclude<keyof I["requestResponse"]["gremlin"]["getHoldTap"], keyof import("./gremlin").HoldTapConfig>]: never; };
                setHoldTap?: import("./gremlin").GremlinStatusCode;
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
                    } & { [K_69 in Exclude<keyof I["requestResponse"]["gremlin"]["getTapDance"]["bindings"][number], keyof import("./gremlin").BindingSpec>]: never; })[] & { [K_70 in Exclude<keyof I["requestResponse"]["gremlin"]["getTapDance"]["bindings"], keyof {
                        behaviorId?: number;
                        param1?: number;
                        param2?: number;
                    }[]>]: never; };
                } & { [K_71 in Exclude<keyof I["requestResponse"]["gremlin"]["getTapDance"], keyof import("./gremlin").TapDanceConfig>]: never; };
                setTapDance?: import("./gremlin").GremlinStatusCode;
                getMacro?: {
                    index?: number;
                    enabled?: boolean;
                    waitMs?: number;
                    tapMs?: number;
                    steps?: {
                        type?: import("./gremlin").MacroStepType;
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
                        type?: import("./gremlin").MacroStepType;
                        binding?: {
                            behaviorId?: number;
                            param1?: number;
                            param2?: number;
                        };
                        delayMs?: number;
                    }[] & ({
                        type?: import("./gremlin").MacroStepType;
                        binding?: {
                            behaviorId?: number;
                            param1?: number;
                            param2?: number;
                        };
                        delayMs?: number;
                    } & {
                        type?: import("./gremlin").MacroStepType;
                        binding?: {
                            behaviorId?: number;
                            param1?: number;
                            param2?: number;
                        } & {
                            behaviorId?: number;
                            param1?: number;
                            param2?: number;
                        } & { [K_72 in Exclude<keyof I["requestResponse"]["gremlin"]["getMacro"]["steps"][number]["binding"], keyof import("./gremlin").BindingSpec>]: never; };
                        delayMs?: number;
                    } & { [K_73 in Exclude<keyof I["requestResponse"]["gremlin"]["getMacro"]["steps"][number], keyof import("./gremlin").MacroStep>]: never; })[] & { [K_74 in Exclude<keyof I["requestResponse"]["gremlin"]["getMacro"]["steps"], keyof {
                        type?: import("./gremlin").MacroStepType;
                        binding?: {
                            behaviorId?: number;
                            param1?: number;
                            param2?: number;
                        };
                        delayMs?: number;
                    }[]>]: never; };
                } & { [K_75 in Exclude<keyof I["requestResponse"]["gremlin"]["getMacro"], keyof import("./gremlin").MacroConfig>]: never; };
                setMacro?: import("./gremlin").GremlinStatusCode;
                getBitmapChunk?: {
                    target?: import("./gremlin").BitmapTarget;
                    slot?: number;
                    offset?: number;
                    totalSize?: number;
                    isCustom?: boolean;
                    data?: Uint8Array;
                } & {
                    target?: import("./gremlin").BitmapTarget;
                    slot?: number;
                    offset?: number;
                    totalSize?: number;
                    isCustom?: boolean;
                    data?: Uint8Array;
                } & { [K_76 in Exclude<keyof I["requestResponse"]["gremlin"]["getBitmapChunk"], keyof import("./gremlin").BitmapChunk>]: never; };
                setBitmapChunk?: import("./gremlin").GremlinStatusCode;
                clearBitmap?: import("./gremlin").GremlinStatusCode;
                saveSettings?: import("./gremlin").GremlinStatusCode;
                resetGremlinDefaults?: import("./gremlin").GremlinStatusCode;
            } & { [K_77 in Exclude<keyof I["requestResponse"]["gremlin"], keyof Response9>]: never; };
        } & { [K_78 in Exclude<keyof I["requestResponse"], keyof RequestResponse>]: never; };
        notification?: {
            core?: {
                lockStateChanged?: import("./core").LockState;
            };
            keymap?: {
                unsavedChangesStatusChanged?: boolean;
            };
        } & {
            core?: {
                lockStateChanged?: import("./core").LockState;
            } & {
                lockStateChanged?: import("./core").LockState;
            } & { [K_79 in Exclude<keyof I["notification"]["core"], "lockStateChanged">]: never; };
            keymap?: {
                unsavedChangesStatusChanged?: boolean;
            } & {
                unsavedChangesStatusChanged?: boolean;
            } & { [K_80 in Exclude<keyof I["notification"]["keymap"], "unsavedChangesStatusChanged">]: never; };
        } & { [K_81 in Exclude<keyof I["notification"], keyof Notification>]: never; };
    } & { [K_82 in Exclude<keyof I, keyof Response>]: never; }>(base?: I): Response;
    fromPartial<I_1 extends {
        requestResponse?: {
            requestId?: number;
            meta?: {
                noResponse?: boolean;
                simpleError?: import("./meta").ErrorConditions;
            };
            core?: {
                getDeviceInfo?: {
                    name?: string;
                    serialNumber?: Uint8Array;
                };
                getLockState?: import("./core").LockState;
                resetSettings?: boolean;
            };
            behaviors?: {
                listAllBehaviors?: {
                    behaviors?: number[];
                };
                getBehaviorDetails?: {
                    id?: number;
                    displayName?: string;
                    metadata?: {
                        param1?: {
                            name?: string;
                            nil?: {};
                            constant?: number;
                            range?: {
                                min?: number;
                                max?: number;
                            };
                            hidUsage?: {
                                keyboardMax?: number;
                                consumerMax?: number;
                            };
                            layerId?: {};
                        }[];
                        param2?: {
                            name?: string;
                            nil?: {};
                            constant?: number;
                            range?: {
                                min?: number;
                                max?: number;
                            };
                            hidUsage?: {
                                keyboardMax?: number;
                                consumerMax?: number;
                            };
                            layerId?: {};
                        }[];
                    }[];
                };
            };
            keymap?: {
                getKeymap?: {
                    layers?: {
                        id?: number;
                        name?: string;
                        bindings?: {
                            behaviorId?: number;
                            param1?: number;
                            param2?: number;
                        }[];
                    }[];
                    availableLayers?: number;
                    maxLayerNameLength?: number;
                };
                setLayerBinding?: import("./keymap").SetLayerBindingResponse;
                checkUnsavedChanges?: boolean;
                saveChanges?: {
                    ok?: boolean;
                    err?: import("./keymap").SaveChangesErrorCode;
                };
                discardChanges?: boolean;
                getPhysicalLayouts?: {
                    activeLayoutIndex?: number;
                    layouts?: {
                        name?: string;
                        keys?: {
                            width?: number;
                            height?: number;
                            x?: number;
                            y?: number;
                            r?: number;
                            rx?: number;
                            ry?: number;
                        }[];
                    }[];
                };
                setActivePhysicalLayout?: {
                    ok?: {
                        layers?: {
                            id?: number;
                            name?: string;
                            bindings?: {
                                behaviorId?: number;
                                param1?: number;
                                param2?: number;
                            }[];
                        }[];
                        availableLayers?: number;
                        maxLayerNameLength?: number;
                    };
                    err?: import("./keymap").SetActivePhysicalLayoutErrorCode;
                };
                moveLayer?: {
                    ok?: {
                        layers?: {
                            id?: number;
                            name?: string;
                            bindings?: {
                                behaviorId?: number;
                                param1?: number;
                                param2?: number;
                            }[];
                        }[];
                        availableLayers?: number;
                        maxLayerNameLength?: number;
                    };
                    err?: import("./keymap").MoveLayerErrorCode;
                };
                addLayer?: {
                    ok?: {
                        index?: number;
                        layer?: {
                            id?: number;
                            name?: string;
                            bindings?: {
                                behaviorId?: number;
                                param1?: number;
                                param2?: number;
                            }[];
                        };
                    };
                    err?: import("./keymap").AddLayerErrorCode;
                };
                removeLayer?: {
                    ok?: {};
                    err?: import("./keymap").RemoveLayerErrorCode;
                };
                restoreLayer?: {
                    ok?: {
                        id?: number;
                        name?: string;
                        bindings?: {
                            behaviorId?: number;
                            param1?: number;
                            param2?: number;
                        }[];
                    };
                    err?: import("./keymap").RestoreLayerErrorCode;
                };
                setLayerProps?: import("./keymap").SetLayerPropsResponse;
            };
            gremlin?: {
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
                setSleepConfig?: import("./gremlin").GremlinStatusCode;
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
                setDisplayConfig?: import("./gremlin").GremlinStatusCode;
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
                setStickConfig?: import("./gremlin").GremlinStatusCode;
                getStickLayerConfig?: {
                    layerIndex?: number;
                    mode?: import("./gremlin").StickMode;
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
                setStickLayerConfig?: import("./gremlin").GremlinStatusCode;
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
                setCombo?: import("./gremlin").GremlinStatusCode;
                getHoldTap?: {
                    index?: number;
                    enabled?: boolean;
                    tappingTermMs?: number;
                    quickTapMs?: number;
                    requirePriorIdleMs?: number;
                    flavor?: import("./gremlin").HoldTapFlavor;
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
                setHoldTap?: import("./gremlin").GremlinStatusCode;
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
                setTapDance?: import("./gremlin").GremlinStatusCode;
                getMacro?: {
                    index?: number;
                    enabled?: boolean;
                    waitMs?: number;
                    tapMs?: number;
                    steps?: {
                        type?: import("./gremlin").MacroStepType;
                        binding?: {
                            behaviorId?: number;
                            param1?: number;
                            param2?: number;
                        };
                        delayMs?: number;
                    }[];
                };
                setMacro?: import("./gremlin").GremlinStatusCode;
                getBitmapChunk?: {
                    target?: import("./gremlin").BitmapTarget;
                    slot?: number;
                    offset?: number;
                    totalSize?: number;
                    isCustom?: boolean;
                    data?: Uint8Array;
                };
                setBitmapChunk?: import("./gremlin").GremlinStatusCode;
                clearBitmap?: import("./gremlin").GremlinStatusCode;
                saveSettings?: import("./gremlin").GremlinStatusCode;
                resetGremlinDefaults?: import("./gremlin").GremlinStatusCode;
            };
        };
        notification?: {
            core?: {
                lockStateChanged?: import("./core").LockState;
            };
            keymap?: {
                unsavedChangesStatusChanged?: boolean;
            };
        };
    } & {
        requestResponse?: {
            requestId?: number;
            meta?: {
                noResponse?: boolean;
                simpleError?: import("./meta").ErrorConditions;
            };
            core?: {
                getDeviceInfo?: {
                    name?: string;
                    serialNumber?: Uint8Array;
                };
                getLockState?: import("./core").LockState;
                resetSettings?: boolean;
            };
            behaviors?: {
                listAllBehaviors?: {
                    behaviors?: number[];
                };
                getBehaviorDetails?: {
                    id?: number;
                    displayName?: string;
                    metadata?: {
                        param1?: {
                            name?: string;
                            nil?: {};
                            constant?: number;
                            range?: {
                                min?: number;
                                max?: number;
                            };
                            hidUsage?: {
                                keyboardMax?: number;
                                consumerMax?: number;
                            };
                            layerId?: {};
                        }[];
                        param2?: {
                            name?: string;
                            nil?: {};
                            constant?: number;
                            range?: {
                                min?: number;
                                max?: number;
                            };
                            hidUsage?: {
                                keyboardMax?: number;
                                consumerMax?: number;
                            };
                            layerId?: {};
                        }[];
                    }[];
                };
            };
            keymap?: {
                getKeymap?: {
                    layers?: {
                        id?: number;
                        name?: string;
                        bindings?: {
                            behaviorId?: number;
                            param1?: number;
                            param2?: number;
                        }[];
                    }[];
                    availableLayers?: number;
                    maxLayerNameLength?: number;
                };
                setLayerBinding?: import("./keymap").SetLayerBindingResponse;
                checkUnsavedChanges?: boolean;
                saveChanges?: {
                    ok?: boolean;
                    err?: import("./keymap").SaveChangesErrorCode;
                };
                discardChanges?: boolean;
                getPhysicalLayouts?: {
                    activeLayoutIndex?: number;
                    layouts?: {
                        name?: string;
                        keys?: {
                            width?: number;
                            height?: number;
                            x?: number;
                            y?: number;
                            r?: number;
                            rx?: number;
                            ry?: number;
                        }[];
                    }[];
                };
                setActivePhysicalLayout?: {
                    ok?: {
                        layers?: {
                            id?: number;
                            name?: string;
                            bindings?: {
                                behaviorId?: number;
                                param1?: number;
                                param2?: number;
                            }[];
                        }[];
                        availableLayers?: number;
                        maxLayerNameLength?: number;
                    };
                    err?: import("./keymap").SetActivePhysicalLayoutErrorCode;
                };
                moveLayer?: {
                    ok?: {
                        layers?: {
                            id?: number;
                            name?: string;
                            bindings?: {
                                behaviorId?: number;
                                param1?: number;
                                param2?: number;
                            }[];
                        }[];
                        availableLayers?: number;
                        maxLayerNameLength?: number;
                    };
                    err?: import("./keymap").MoveLayerErrorCode;
                };
                addLayer?: {
                    ok?: {
                        index?: number;
                        layer?: {
                            id?: number;
                            name?: string;
                            bindings?: {
                                behaviorId?: number;
                                param1?: number;
                                param2?: number;
                            }[];
                        };
                    };
                    err?: import("./keymap").AddLayerErrorCode;
                };
                removeLayer?: {
                    ok?: {};
                    err?: import("./keymap").RemoveLayerErrorCode;
                };
                restoreLayer?: {
                    ok?: {
                        id?: number;
                        name?: string;
                        bindings?: {
                            behaviorId?: number;
                            param1?: number;
                            param2?: number;
                        }[];
                    };
                    err?: import("./keymap").RestoreLayerErrorCode;
                };
                setLayerProps?: import("./keymap").SetLayerPropsResponse;
            };
            gremlin?: {
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
                setSleepConfig?: import("./gremlin").GremlinStatusCode;
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
                setDisplayConfig?: import("./gremlin").GremlinStatusCode;
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
                setStickConfig?: import("./gremlin").GremlinStatusCode;
                getStickLayerConfig?: {
                    layerIndex?: number;
                    mode?: import("./gremlin").StickMode;
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
                setStickLayerConfig?: import("./gremlin").GremlinStatusCode;
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
                setCombo?: import("./gremlin").GremlinStatusCode;
                getHoldTap?: {
                    index?: number;
                    enabled?: boolean;
                    tappingTermMs?: number;
                    quickTapMs?: number;
                    requirePriorIdleMs?: number;
                    flavor?: import("./gremlin").HoldTapFlavor;
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
                setHoldTap?: import("./gremlin").GremlinStatusCode;
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
                setTapDance?: import("./gremlin").GremlinStatusCode;
                getMacro?: {
                    index?: number;
                    enabled?: boolean;
                    waitMs?: number;
                    tapMs?: number;
                    steps?: {
                        type?: import("./gremlin").MacroStepType;
                        binding?: {
                            behaviorId?: number;
                            param1?: number;
                            param2?: number;
                        };
                        delayMs?: number;
                    }[];
                };
                setMacro?: import("./gremlin").GremlinStatusCode;
                getBitmapChunk?: {
                    target?: import("./gremlin").BitmapTarget;
                    slot?: number;
                    offset?: number;
                    totalSize?: number;
                    isCustom?: boolean;
                    data?: Uint8Array;
                };
                setBitmapChunk?: import("./gremlin").GremlinStatusCode;
                clearBitmap?: import("./gremlin").GremlinStatusCode;
                saveSettings?: import("./gremlin").GremlinStatusCode;
                resetGremlinDefaults?: import("./gremlin").GremlinStatusCode;
            };
        } & {
            requestId?: number;
            meta?: {
                noResponse?: boolean;
                simpleError?: import("./meta").ErrorConditions;
            } & {
                noResponse?: boolean;
                simpleError?: import("./meta").ErrorConditions;
            } & { [K_83 in Exclude<keyof I_1["requestResponse"]["meta"], keyof Response5>]: never; };
            core?: {
                getDeviceInfo?: {
                    name?: string;
                    serialNumber?: Uint8Array;
                };
                getLockState?: import("./core").LockState;
                resetSettings?: boolean;
            } & {
                getDeviceInfo?: {
                    name?: string;
                    serialNumber?: Uint8Array;
                } & {
                    name?: string;
                    serialNumber?: Uint8Array;
                } & { [K_84 in Exclude<keyof I_1["requestResponse"]["core"]["getDeviceInfo"], keyof import("./core").GetDeviceInfoResponse>]: never; };
                getLockState?: import("./core").LockState;
                resetSettings?: boolean;
            } & { [K_85 in Exclude<keyof I_1["requestResponse"]["core"], keyof Response6>]: never; };
            behaviors?: {
                listAllBehaviors?: {
                    behaviors?: number[];
                };
                getBehaviorDetails?: {
                    id?: number;
                    displayName?: string;
                    metadata?: {
                        param1?: {
                            name?: string;
                            nil?: {};
                            constant?: number;
                            range?: {
                                min?: number;
                                max?: number;
                            };
                            hidUsage?: {
                                keyboardMax?: number;
                                consumerMax?: number;
                            };
                            layerId?: {};
                        }[];
                        param2?: {
                            name?: string;
                            nil?: {};
                            constant?: number;
                            range?: {
                                min?: number;
                                max?: number;
                            };
                            hidUsage?: {
                                keyboardMax?: number;
                                consumerMax?: number;
                            };
                            layerId?: {};
                        }[];
                    }[];
                };
            } & {
                listAllBehaviors?: {
                    behaviors?: number[];
                } & {
                    behaviors?: number[] & number[] & { [K_86 in Exclude<keyof I_1["requestResponse"]["behaviors"]["listAllBehaviors"]["behaviors"], keyof number[]>]: never; };
                } & { [K_87 in Exclude<keyof I_1["requestResponse"]["behaviors"]["listAllBehaviors"], "behaviors">]: never; };
                getBehaviorDetails?: {
                    id?: number;
                    displayName?: string;
                    metadata?: {
                        param1?: {
                            name?: string;
                            nil?: {};
                            constant?: number;
                            range?: {
                                min?: number;
                                max?: number;
                            };
                            hidUsage?: {
                                keyboardMax?: number;
                                consumerMax?: number;
                            };
                            layerId?: {};
                        }[];
                        param2?: {
                            name?: string;
                            nil?: {};
                            constant?: number;
                            range?: {
                                min?: number;
                                max?: number;
                            };
                            hidUsage?: {
                                keyboardMax?: number;
                                consumerMax?: number;
                            };
                            layerId?: {};
                        }[];
                    }[];
                } & {
                    id?: number;
                    displayName?: string;
                    metadata?: {
                        param1?: {
                            name?: string;
                            nil?: {};
                            constant?: number;
                            range?: {
                                min?: number;
                                max?: number;
                            };
                            hidUsage?: {
                                keyboardMax?: number;
                                consumerMax?: number;
                            };
                            layerId?: {};
                        }[];
                        param2?: {
                            name?: string;
                            nil?: {};
                            constant?: number;
                            range?: {
                                min?: number;
                                max?: number;
                            };
                            hidUsage?: {
                                keyboardMax?: number;
                                consumerMax?: number;
                            };
                            layerId?: {};
                        }[];
                    }[] & ({
                        param1?: {
                            name?: string;
                            nil?: {};
                            constant?: number;
                            range?: {
                                min?: number;
                                max?: number;
                            };
                            hidUsage?: {
                                keyboardMax?: number;
                                consumerMax?: number;
                            };
                            layerId?: {};
                        }[];
                        param2?: {
                            name?: string;
                            nil?: {};
                            constant?: number;
                            range?: {
                                min?: number;
                                max?: number;
                            };
                            hidUsage?: {
                                keyboardMax?: number;
                                consumerMax?: number;
                            };
                            layerId?: {};
                        }[];
                    } & {
                        param1?: {
                            name?: string;
                            nil?: {};
                            constant?: number;
                            range?: {
                                min?: number;
                                max?: number;
                            };
                            hidUsage?: {
                                keyboardMax?: number;
                                consumerMax?: number;
                            };
                            layerId?: {};
                        }[] & ({
                            name?: string;
                            nil?: {};
                            constant?: number;
                            range?: {
                                min?: number;
                                max?: number;
                            };
                            hidUsage?: {
                                keyboardMax?: number;
                                consumerMax?: number;
                            };
                            layerId?: {};
                        } & {
                            name?: string;
                            nil?: {} & {} & { [K_88 in Exclude<keyof I_1["requestResponse"]["behaviors"]["getBehaviorDetails"]["metadata"][number]["param1"][number]["nil"], never>]: never; };
                            constant?: number;
                            range?: {
                                min?: number;
                                max?: number;
                            } & {
                                min?: number;
                                max?: number;
                            } & { [K_89 in Exclude<keyof I_1["requestResponse"]["behaviors"]["getBehaviorDetails"]["metadata"][number]["param1"][number]["range"], keyof import("./behaviors").BehaviorParameterValueDescriptionRange>]: never; };
                            hidUsage?: {
                                keyboardMax?: number;
                                consumerMax?: number;
                            } & {
                                keyboardMax?: number;
                                consumerMax?: number;
                            } & { [K_90 in Exclude<keyof I_1["requestResponse"]["behaviors"]["getBehaviorDetails"]["metadata"][number]["param1"][number]["hidUsage"], keyof import("./behaviors").BehaviorParameterHidUsage>]: never; };
                            layerId?: {} & {} & { [K_91 in Exclude<keyof I_1["requestResponse"]["behaviors"]["getBehaviorDetails"]["metadata"][number]["param1"][number]["layerId"], never>]: never; };
                        } & { [K_92 in Exclude<keyof I_1["requestResponse"]["behaviors"]["getBehaviorDetails"]["metadata"][number]["param1"][number], keyof import("./behaviors").BehaviorParameterValueDescription>]: never; })[] & { [K_93 in Exclude<keyof I_1["requestResponse"]["behaviors"]["getBehaviorDetails"]["metadata"][number]["param1"], keyof {
                            name?: string;
                            nil?: {};
                            constant?: number;
                            range?: {
                                min?: number;
                                max?: number;
                            };
                            hidUsage?: {
                                keyboardMax?: number;
                                consumerMax?: number;
                            };
                            layerId?: {};
                        }[]>]: never; };
                        param2?: {
                            name?: string;
                            nil?: {};
                            constant?: number;
                            range?: {
                                min?: number;
                                max?: number;
                            };
                            hidUsage?: {
                                keyboardMax?: number;
                                consumerMax?: number;
                            };
                            layerId?: {};
                        }[] & ({
                            name?: string;
                            nil?: {};
                            constant?: number;
                            range?: {
                                min?: number;
                                max?: number;
                            };
                            hidUsage?: {
                                keyboardMax?: number;
                                consumerMax?: number;
                            };
                            layerId?: {};
                        } & {
                            name?: string;
                            nil?: {} & {} & { [K_94 in Exclude<keyof I_1["requestResponse"]["behaviors"]["getBehaviorDetails"]["metadata"][number]["param2"][number]["nil"], never>]: never; };
                            constant?: number;
                            range?: {
                                min?: number;
                                max?: number;
                            } & {
                                min?: number;
                                max?: number;
                            } & { [K_95 in Exclude<keyof I_1["requestResponse"]["behaviors"]["getBehaviorDetails"]["metadata"][number]["param2"][number]["range"], keyof import("./behaviors").BehaviorParameterValueDescriptionRange>]: never; };
                            hidUsage?: {
                                keyboardMax?: number;
                                consumerMax?: number;
                            } & {
                                keyboardMax?: number;
                                consumerMax?: number;
                            } & { [K_96 in Exclude<keyof I_1["requestResponse"]["behaviors"]["getBehaviorDetails"]["metadata"][number]["param2"][number]["hidUsage"], keyof import("./behaviors").BehaviorParameterHidUsage>]: never; };
                            layerId?: {} & {} & { [K_97 in Exclude<keyof I_1["requestResponse"]["behaviors"]["getBehaviorDetails"]["metadata"][number]["param2"][number]["layerId"], never>]: never; };
                        } & { [K_98 in Exclude<keyof I_1["requestResponse"]["behaviors"]["getBehaviorDetails"]["metadata"][number]["param2"][number], keyof import("./behaviors").BehaviorParameterValueDescription>]: never; })[] & { [K_99 in Exclude<keyof I_1["requestResponse"]["behaviors"]["getBehaviorDetails"]["metadata"][number]["param2"], keyof {
                            name?: string;
                            nil?: {};
                            constant?: number;
                            range?: {
                                min?: number;
                                max?: number;
                            };
                            hidUsage?: {
                                keyboardMax?: number;
                                consumerMax?: number;
                            };
                            layerId?: {};
                        }[]>]: never; };
                    } & { [K_100 in Exclude<keyof I_1["requestResponse"]["behaviors"]["getBehaviorDetails"]["metadata"][number], keyof import("./behaviors").BehaviorBindingParametersSet>]: never; })[] & { [K_101 in Exclude<keyof I_1["requestResponse"]["behaviors"]["getBehaviorDetails"]["metadata"], keyof {
                        param1?: {
                            name?: string;
                            nil?: {};
                            constant?: number;
                            range?: {
                                min?: number;
                                max?: number;
                            };
                            hidUsage?: {
                                keyboardMax?: number;
                                consumerMax?: number;
                            };
                            layerId?: {};
                        }[];
                        param2?: {
                            name?: string;
                            nil?: {};
                            constant?: number;
                            range?: {
                                min?: number;
                                max?: number;
                            };
                            hidUsage?: {
                                keyboardMax?: number;
                                consumerMax?: number;
                            };
                            layerId?: {};
                        }[];
                    }[]>]: never; };
                } & { [K_102 in Exclude<keyof I_1["requestResponse"]["behaviors"]["getBehaviorDetails"], keyof import("./behaviors").GetBehaviorDetailsResponse>]: never; };
            } & { [K_103 in Exclude<keyof I_1["requestResponse"]["behaviors"], keyof Response7>]: never; };
            keymap?: {
                getKeymap?: {
                    layers?: {
                        id?: number;
                        name?: string;
                        bindings?: {
                            behaviorId?: number;
                            param1?: number;
                            param2?: number;
                        }[];
                    }[];
                    availableLayers?: number;
                    maxLayerNameLength?: number;
                };
                setLayerBinding?: import("./keymap").SetLayerBindingResponse;
                checkUnsavedChanges?: boolean;
                saveChanges?: {
                    ok?: boolean;
                    err?: import("./keymap").SaveChangesErrorCode;
                };
                discardChanges?: boolean;
                getPhysicalLayouts?: {
                    activeLayoutIndex?: number;
                    layouts?: {
                        name?: string;
                        keys?: {
                            width?: number;
                            height?: number;
                            x?: number;
                            y?: number;
                            r?: number;
                            rx?: number;
                            ry?: number;
                        }[];
                    }[];
                };
                setActivePhysicalLayout?: {
                    ok?: {
                        layers?: {
                            id?: number;
                            name?: string;
                            bindings?: {
                                behaviorId?: number;
                                param1?: number;
                                param2?: number;
                            }[];
                        }[];
                        availableLayers?: number;
                        maxLayerNameLength?: number;
                    };
                    err?: import("./keymap").SetActivePhysicalLayoutErrorCode;
                };
                moveLayer?: {
                    ok?: {
                        layers?: {
                            id?: number;
                            name?: string;
                            bindings?: {
                                behaviorId?: number;
                                param1?: number;
                                param2?: number;
                            }[];
                        }[];
                        availableLayers?: number;
                        maxLayerNameLength?: number;
                    };
                    err?: import("./keymap").MoveLayerErrorCode;
                };
                addLayer?: {
                    ok?: {
                        index?: number;
                        layer?: {
                            id?: number;
                            name?: string;
                            bindings?: {
                                behaviorId?: number;
                                param1?: number;
                                param2?: number;
                            }[];
                        };
                    };
                    err?: import("./keymap").AddLayerErrorCode;
                };
                removeLayer?: {
                    ok?: {};
                    err?: import("./keymap").RemoveLayerErrorCode;
                };
                restoreLayer?: {
                    ok?: {
                        id?: number;
                        name?: string;
                        bindings?: {
                            behaviorId?: number;
                            param1?: number;
                            param2?: number;
                        }[];
                    };
                    err?: import("./keymap").RestoreLayerErrorCode;
                };
                setLayerProps?: import("./keymap").SetLayerPropsResponse;
            } & {
                getKeymap?: {
                    layers?: {
                        id?: number;
                        name?: string;
                        bindings?: {
                            behaviorId?: number;
                            param1?: number;
                            param2?: number;
                        }[];
                    }[];
                    availableLayers?: number;
                    maxLayerNameLength?: number;
                } & {
                    layers?: {
                        id?: number;
                        name?: string;
                        bindings?: {
                            behaviorId?: number;
                            param1?: number;
                            param2?: number;
                        }[];
                    }[] & ({
                        id?: number;
                        name?: string;
                        bindings?: {
                            behaviorId?: number;
                            param1?: number;
                            param2?: number;
                        }[];
                    } & {
                        id?: number;
                        name?: string;
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
                        } & { [K_104 in Exclude<keyof I_1["requestResponse"]["keymap"]["getKeymap"]["layers"][number]["bindings"][number], keyof import("./keymap").BehaviorBinding>]: never; })[] & { [K_105 in Exclude<keyof I_1["requestResponse"]["keymap"]["getKeymap"]["layers"][number]["bindings"], keyof {
                            behaviorId?: number;
                            param1?: number;
                            param2?: number;
                        }[]>]: never; };
                    } & { [K_106 in Exclude<keyof I_1["requestResponse"]["keymap"]["getKeymap"]["layers"][number], keyof import("./keymap").Layer>]: never; })[] & { [K_107 in Exclude<keyof I_1["requestResponse"]["keymap"]["getKeymap"]["layers"], keyof {
                        id?: number;
                        name?: string;
                        bindings?: {
                            behaviorId?: number;
                            param1?: number;
                            param2?: number;
                        }[];
                    }[]>]: never; };
                    availableLayers?: number;
                    maxLayerNameLength?: number;
                } & { [K_108 in Exclude<keyof I_1["requestResponse"]["keymap"]["getKeymap"], keyof import("./keymap").Keymap>]: never; };
                setLayerBinding?: import("./keymap").SetLayerBindingResponse;
                checkUnsavedChanges?: boolean;
                saveChanges?: {
                    ok?: boolean;
                    err?: import("./keymap").SaveChangesErrorCode;
                } & {
                    ok?: boolean;
                    err?: import("./keymap").SaveChangesErrorCode;
                } & { [K_109 in Exclude<keyof I_1["requestResponse"]["keymap"]["saveChanges"], keyof import("./keymap").SaveChangesResponse>]: never; };
                discardChanges?: boolean;
                getPhysicalLayouts?: {
                    activeLayoutIndex?: number;
                    layouts?: {
                        name?: string;
                        keys?: {
                            width?: number;
                            height?: number;
                            x?: number;
                            y?: number;
                            r?: number;
                            rx?: number;
                            ry?: number;
                        }[];
                    }[];
                } & {
                    activeLayoutIndex?: number;
                    layouts?: {
                        name?: string;
                        keys?: {
                            width?: number;
                            height?: number;
                            x?: number;
                            y?: number;
                            r?: number;
                            rx?: number;
                            ry?: number;
                        }[];
                    }[] & ({
                        name?: string;
                        keys?: {
                            width?: number;
                            height?: number;
                            x?: number;
                            y?: number;
                            r?: number;
                            rx?: number;
                            ry?: number;
                        }[];
                    } & {
                        name?: string;
                        keys?: {
                            width?: number;
                            height?: number;
                            x?: number;
                            y?: number;
                            r?: number;
                            rx?: number;
                            ry?: number;
                        }[] & ({
                            width?: number;
                            height?: number;
                            x?: number;
                            y?: number;
                            r?: number;
                            rx?: number;
                            ry?: number;
                        } & {
                            width?: number;
                            height?: number;
                            x?: number;
                            y?: number;
                            r?: number;
                            rx?: number;
                            ry?: number;
                        } & { [K_110 in Exclude<keyof I_1["requestResponse"]["keymap"]["getPhysicalLayouts"]["layouts"][number]["keys"][number], keyof import("./keymap").KeyPhysicalAttrs>]: never; })[] & { [K_111 in Exclude<keyof I_1["requestResponse"]["keymap"]["getPhysicalLayouts"]["layouts"][number]["keys"], keyof {
                            width?: number;
                            height?: number;
                            x?: number;
                            y?: number;
                            r?: number;
                            rx?: number;
                            ry?: number;
                        }[]>]: never; };
                    } & { [K_112 in Exclude<keyof I_1["requestResponse"]["keymap"]["getPhysicalLayouts"]["layouts"][number], keyof import("./keymap").PhysicalLayout>]: never; })[] & { [K_113 in Exclude<keyof I_1["requestResponse"]["keymap"]["getPhysicalLayouts"]["layouts"], keyof {
                        name?: string;
                        keys?: {
                            width?: number;
                            height?: number;
                            x?: number;
                            y?: number;
                            r?: number;
                            rx?: number;
                            ry?: number;
                        }[];
                    }[]>]: never; };
                } & { [K_114 in Exclude<keyof I_1["requestResponse"]["keymap"]["getPhysicalLayouts"], keyof import("./keymap").PhysicalLayouts>]: never; };
                setActivePhysicalLayout?: {
                    ok?: {
                        layers?: {
                            id?: number;
                            name?: string;
                            bindings?: {
                                behaviorId?: number;
                                param1?: number;
                                param2?: number;
                            }[];
                        }[];
                        availableLayers?: number;
                        maxLayerNameLength?: number;
                    };
                    err?: import("./keymap").SetActivePhysicalLayoutErrorCode;
                } & {
                    ok?: {
                        layers?: {
                            id?: number;
                            name?: string;
                            bindings?: {
                                behaviorId?: number;
                                param1?: number;
                                param2?: number;
                            }[];
                        }[];
                        availableLayers?: number;
                        maxLayerNameLength?: number;
                    } & {
                        layers?: {
                            id?: number;
                            name?: string;
                            bindings?: {
                                behaviorId?: number;
                                param1?: number;
                                param2?: number;
                            }[];
                        }[] & ({
                            id?: number;
                            name?: string;
                            bindings?: {
                                behaviorId?: number;
                                param1?: number;
                                param2?: number;
                            }[];
                        } & {
                            id?: number;
                            name?: string;
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
                            } & { [K_115 in Exclude<keyof I_1["requestResponse"]["keymap"]["setActivePhysicalLayout"]["ok"]["layers"][number]["bindings"][number], keyof import("./keymap").BehaviorBinding>]: never; })[] & { [K_116 in Exclude<keyof I_1["requestResponse"]["keymap"]["setActivePhysicalLayout"]["ok"]["layers"][number]["bindings"], keyof {
                                behaviorId?: number;
                                param1?: number;
                                param2?: number;
                            }[]>]: never; };
                        } & { [K_117 in Exclude<keyof I_1["requestResponse"]["keymap"]["setActivePhysicalLayout"]["ok"]["layers"][number], keyof import("./keymap").Layer>]: never; })[] & { [K_118 in Exclude<keyof I_1["requestResponse"]["keymap"]["setActivePhysicalLayout"]["ok"]["layers"], keyof {
                            id?: number;
                            name?: string;
                            bindings?: {
                                behaviorId?: number;
                                param1?: number;
                                param2?: number;
                            }[];
                        }[]>]: never; };
                        availableLayers?: number;
                        maxLayerNameLength?: number;
                    } & { [K_119 in Exclude<keyof I_1["requestResponse"]["keymap"]["setActivePhysicalLayout"]["ok"], keyof import("./keymap").Keymap>]: never; };
                    err?: import("./keymap").SetActivePhysicalLayoutErrorCode;
                } & { [K_120 in Exclude<keyof I_1["requestResponse"]["keymap"]["setActivePhysicalLayout"], keyof import("./keymap").SetActivePhysicalLayoutResponse>]: never; };
                moveLayer?: {
                    ok?: {
                        layers?: {
                            id?: number;
                            name?: string;
                            bindings?: {
                                behaviorId?: number;
                                param1?: number;
                                param2?: number;
                            }[];
                        }[];
                        availableLayers?: number;
                        maxLayerNameLength?: number;
                    };
                    err?: import("./keymap").MoveLayerErrorCode;
                } & {
                    ok?: {
                        layers?: {
                            id?: number;
                            name?: string;
                            bindings?: {
                                behaviorId?: number;
                                param1?: number;
                                param2?: number;
                            }[];
                        }[];
                        availableLayers?: number;
                        maxLayerNameLength?: number;
                    } & {
                        layers?: {
                            id?: number;
                            name?: string;
                            bindings?: {
                                behaviorId?: number;
                                param1?: number;
                                param2?: number;
                            }[];
                        }[] & ({
                            id?: number;
                            name?: string;
                            bindings?: {
                                behaviorId?: number;
                                param1?: number;
                                param2?: number;
                            }[];
                        } & {
                            id?: number;
                            name?: string;
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
                            } & { [K_121 in Exclude<keyof I_1["requestResponse"]["keymap"]["moveLayer"]["ok"]["layers"][number]["bindings"][number], keyof import("./keymap").BehaviorBinding>]: never; })[] & { [K_122 in Exclude<keyof I_1["requestResponse"]["keymap"]["moveLayer"]["ok"]["layers"][number]["bindings"], keyof {
                                behaviorId?: number;
                                param1?: number;
                                param2?: number;
                            }[]>]: never; };
                        } & { [K_123 in Exclude<keyof I_1["requestResponse"]["keymap"]["moveLayer"]["ok"]["layers"][number], keyof import("./keymap").Layer>]: never; })[] & { [K_124 in Exclude<keyof I_1["requestResponse"]["keymap"]["moveLayer"]["ok"]["layers"], keyof {
                            id?: number;
                            name?: string;
                            bindings?: {
                                behaviorId?: number;
                                param1?: number;
                                param2?: number;
                            }[];
                        }[]>]: never; };
                        availableLayers?: number;
                        maxLayerNameLength?: number;
                    } & { [K_125 in Exclude<keyof I_1["requestResponse"]["keymap"]["moveLayer"]["ok"], keyof import("./keymap").Keymap>]: never; };
                    err?: import("./keymap").MoveLayerErrorCode;
                } & { [K_126 in Exclude<keyof I_1["requestResponse"]["keymap"]["moveLayer"], keyof import("./keymap").MoveLayerResponse>]: never; };
                addLayer?: {
                    ok?: {
                        index?: number;
                        layer?: {
                            id?: number;
                            name?: string;
                            bindings?: {
                                behaviorId?: number;
                                param1?: number;
                                param2?: number;
                            }[];
                        };
                    };
                    err?: import("./keymap").AddLayerErrorCode;
                } & {
                    ok?: {
                        index?: number;
                        layer?: {
                            id?: number;
                            name?: string;
                            bindings?: {
                                behaviorId?: number;
                                param1?: number;
                                param2?: number;
                            }[];
                        };
                    } & {
                        index?: number;
                        layer?: {
                            id?: number;
                            name?: string;
                            bindings?: {
                                behaviorId?: number;
                                param1?: number;
                                param2?: number;
                            }[];
                        } & {
                            id?: number;
                            name?: string;
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
                            } & { [K_127 in Exclude<keyof I_1["requestResponse"]["keymap"]["addLayer"]["ok"]["layer"]["bindings"][number], keyof import("./keymap").BehaviorBinding>]: never; })[] & { [K_128 in Exclude<keyof I_1["requestResponse"]["keymap"]["addLayer"]["ok"]["layer"]["bindings"], keyof {
                                behaviorId?: number;
                                param1?: number;
                                param2?: number;
                            }[]>]: never; };
                        } & { [K_129 in Exclude<keyof I_1["requestResponse"]["keymap"]["addLayer"]["ok"]["layer"], keyof import("./keymap").Layer>]: never; };
                    } & { [K_130 in Exclude<keyof I_1["requestResponse"]["keymap"]["addLayer"]["ok"], keyof import("./keymap").AddLayerResponseDetails>]: never; };
                    err?: import("./keymap").AddLayerErrorCode;
                } & { [K_131 in Exclude<keyof I_1["requestResponse"]["keymap"]["addLayer"], keyof import("./keymap").AddLayerResponse>]: never; };
                removeLayer?: {
                    ok?: {};
                    err?: import("./keymap").RemoveLayerErrorCode;
                } & {
                    ok?: {} & {} & { [K_132 in Exclude<keyof I_1["requestResponse"]["keymap"]["removeLayer"]["ok"], never>]: never; };
                    err?: import("./keymap").RemoveLayerErrorCode;
                } & { [K_133 in Exclude<keyof I_1["requestResponse"]["keymap"]["removeLayer"], keyof import("./keymap").RemoveLayerResponse>]: never; };
                restoreLayer?: {
                    ok?: {
                        id?: number;
                        name?: string;
                        bindings?: {
                            behaviorId?: number;
                            param1?: number;
                            param2?: number;
                        }[];
                    };
                    err?: import("./keymap").RestoreLayerErrorCode;
                } & {
                    ok?: {
                        id?: number;
                        name?: string;
                        bindings?: {
                            behaviorId?: number;
                            param1?: number;
                            param2?: number;
                        }[];
                    } & {
                        id?: number;
                        name?: string;
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
                        } & { [K_134 in Exclude<keyof I_1["requestResponse"]["keymap"]["restoreLayer"]["ok"]["bindings"][number], keyof import("./keymap").BehaviorBinding>]: never; })[] & { [K_135 in Exclude<keyof I_1["requestResponse"]["keymap"]["restoreLayer"]["ok"]["bindings"], keyof {
                            behaviorId?: number;
                            param1?: number;
                            param2?: number;
                        }[]>]: never; };
                    } & { [K_136 in Exclude<keyof I_1["requestResponse"]["keymap"]["restoreLayer"]["ok"], keyof import("./keymap").Layer>]: never; };
                    err?: import("./keymap").RestoreLayerErrorCode;
                } & { [K_137 in Exclude<keyof I_1["requestResponse"]["keymap"]["restoreLayer"], keyof import("./keymap").RestoreLayerResponse>]: never; };
                setLayerProps?: import("./keymap").SetLayerPropsResponse;
            } & { [K_138 in Exclude<keyof I_1["requestResponse"]["keymap"], keyof Response8>]: never; };
            gremlin?: {
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
                setSleepConfig?: import("./gremlin").GremlinStatusCode;
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
                setDisplayConfig?: import("./gremlin").GremlinStatusCode;
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
                setStickConfig?: import("./gremlin").GremlinStatusCode;
                getStickLayerConfig?: {
                    layerIndex?: number;
                    mode?: import("./gremlin").StickMode;
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
                setStickLayerConfig?: import("./gremlin").GremlinStatusCode;
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
                setCombo?: import("./gremlin").GremlinStatusCode;
                getHoldTap?: {
                    index?: number;
                    enabled?: boolean;
                    tappingTermMs?: number;
                    quickTapMs?: number;
                    requirePriorIdleMs?: number;
                    flavor?: import("./gremlin").HoldTapFlavor;
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
                setHoldTap?: import("./gremlin").GremlinStatusCode;
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
                setTapDance?: import("./gremlin").GremlinStatusCode;
                getMacro?: {
                    index?: number;
                    enabled?: boolean;
                    waitMs?: number;
                    tapMs?: number;
                    steps?: {
                        type?: import("./gremlin").MacroStepType;
                        binding?: {
                            behaviorId?: number;
                            param1?: number;
                            param2?: number;
                        };
                        delayMs?: number;
                    }[];
                };
                setMacro?: import("./gremlin").GremlinStatusCode;
                getBitmapChunk?: {
                    target?: import("./gremlin").BitmapTarget;
                    slot?: number;
                    offset?: number;
                    totalSize?: number;
                    isCustom?: boolean;
                    data?: Uint8Array;
                };
                setBitmapChunk?: import("./gremlin").GremlinStatusCode;
                clearBitmap?: import("./gremlin").GremlinStatusCode;
                saveSettings?: import("./gremlin").GremlinStatusCode;
                resetGremlinDefaults?: import("./gremlin").GremlinStatusCode;
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
                } & { [K_139 in Exclude<keyof I_1["requestResponse"]["gremlin"]["getCapabilities"], keyof import("./gremlin").Capabilities>]: never; };
                getSleepConfig?: {
                    displaySleepMs?: number;
                    idleTimeoutMs?: number;
                    deepSleepMs?: number;
                } & {
                    displaySleepMs?: number;
                    idleTimeoutMs?: number;
                    deepSleepMs?: number;
                } & { [K_140 in Exclude<keyof I_1["requestResponse"]["gremlin"]["getSleepConfig"], keyof import("./gremlin").SleepConfig>]: never; };
                setSleepConfig?: import("./gremlin").GremlinStatusCode;
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
                    animSequence?: number[] & number[] & { [K_141 in Exclude<keyof I_1["requestResponse"]["gremlin"]["getDisplayConfig"]["animSequence"], keyof number[]>]: never; };
                } & { [K_142 in Exclude<keyof I_1["requestResponse"]["gremlin"]["getDisplayConfig"], keyof import("./gremlin").DisplayConfig>]: never; };
                setDisplayConfig?: import("./gremlin").GremlinStatusCode;
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
                } & { [K_143 in Exclude<keyof I_1["requestResponse"]["gremlin"]["getStickConfig"], keyof import("./gremlin").StickConfig>]: never; };
                setStickConfig?: import("./gremlin").GremlinStatusCode;
                getStickLayerConfig?: {
                    layerIndex?: number;
                    mode?: import("./gremlin").StickMode;
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
                    mode?: import("./gremlin").StickMode;
                    upPosition?: number;
                    downPosition?: number;
                    leftPosition?: number;
                    rightPosition?: number;
                    switchActivationPoint?: number;
                    switchHysteresis?: number;
                    mouseMinSpeed?: number;
                    mouseMaxSpeed?: number;
                    scrollDivisor?: number;
                } & { [K_144 in Exclude<keyof I_1["requestResponse"]["gremlin"]["getStickLayerConfig"], keyof import("./gremlin").StickLayerConfig>]: never; };
                setStickLayerConfig?: import("./gremlin").GremlinStatusCode;
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
                } & { [K_145 in Exclude<keyof I_1["requestResponse"]["gremlin"]["getStickTelemetry"], keyof import("./gremlin").StickTelemetry>]: never; };
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
                    keyPositions?: number[] & number[] & { [K_146 in Exclude<keyof I_1["requestResponse"]["gremlin"]["getCombo"]["keyPositions"], keyof number[]>]: never; };
                    binding?: {
                        behaviorId?: number;
                        param1?: number;
                        param2?: number;
                    } & {
                        behaviorId?: number;
                        param1?: number;
                        param2?: number;
                    } & { [K_147 in Exclude<keyof I_1["requestResponse"]["gremlin"]["getCombo"]["binding"], keyof import("./gremlin").BindingSpec>]: never; };
                } & { [K_148 in Exclude<keyof I_1["requestResponse"]["gremlin"]["getCombo"], keyof import("./gremlin").ComboConfig>]: never; };
                setCombo?: import("./gremlin").GremlinStatusCode;
                getHoldTap?: {
                    index?: number;
                    enabled?: boolean;
                    tappingTermMs?: number;
                    quickTapMs?: number;
                    requirePriorIdleMs?: number;
                    flavor?: import("./gremlin").HoldTapFlavor;
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
                    flavor?: import("./gremlin").HoldTapFlavor;
                    retroTap?: boolean;
                    holdBinding?: {
                        behaviorId?: number;
                        param1?: number;
                        param2?: number;
                    } & {
                        behaviorId?: number;
                        param1?: number;
                        param2?: number;
                    } & { [K_149 in Exclude<keyof I_1["requestResponse"]["gremlin"]["getHoldTap"]["holdBinding"], keyof import("./gremlin").BindingSpec>]: never; };
                    tapBinding?: {
                        behaviorId?: number;
                        param1?: number;
                        param2?: number;
                    } & {
                        behaviorId?: number;
                        param1?: number;
                        param2?: number;
                    } & { [K_150 in Exclude<keyof I_1["requestResponse"]["gremlin"]["getHoldTap"]["tapBinding"], keyof import("./gremlin").BindingSpec>]: never; };
                } & { [K_151 in Exclude<keyof I_1["requestResponse"]["gremlin"]["getHoldTap"], keyof import("./gremlin").HoldTapConfig>]: never; };
                setHoldTap?: import("./gremlin").GremlinStatusCode;
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
                    } & { [K_152 in Exclude<keyof I_1["requestResponse"]["gremlin"]["getTapDance"]["bindings"][number], keyof import("./gremlin").BindingSpec>]: never; })[] & { [K_153 in Exclude<keyof I_1["requestResponse"]["gremlin"]["getTapDance"]["bindings"], keyof {
                        behaviorId?: number;
                        param1?: number;
                        param2?: number;
                    }[]>]: never; };
                } & { [K_154 in Exclude<keyof I_1["requestResponse"]["gremlin"]["getTapDance"], keyof import("./gremlin").TapDanceConfig>]: never; };
                setTapDance?: import("./gremlin").GremlinStatusCode;
                getMacro?: {
                    index?: number;
                    enabled?: boolean;
                    waitMs?: number;
                    tapMs?: number;
                    steps?: {
                        type?: import("./gremlin").MacroStepType;
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
                        type?: import("./gremlin").MacroStepType;
                        binding?: {
                            behaviorId?: number;
                            param1?: number;
                            param2?: number;
                        };
                        delayMs?: number;
                    }[] & ({
                        type?: import("./gremlin").MacroStepType;
                        binding?: {
                            behaviorId?: number;
                            param1?: number;
                            param2?: number;
                        };
                        delayMs?: number;
                    } & {
                        type?: import("./gremlin").MacroStepType;
                        binding?: {
                            behaviorId?: number;
                            param1?: number;
                            param2?: number;
                        } & {
                            behaviorId?: number;
                            param1?: number;
                            param2?: number;
                        } & { [K_155 in Exclude<keyof I_1["requestResponse"]["gremlin"]["getMacro"]["steps"][number]["binding"], keyof import("./gremlin").BindingSpec>]: never; };
                        delayMs?: number;
                    } & { [K_156 in Exclude<keyof I_1["requestResponse"]["gremlin"]["getMacro"]["steps"][number], keyof import("./gremlin").MacroStep>]: never; })[] & { [K_157 in Exclude<keyof I_1["requestResponse"]["gremlin"]["getMacro"]["steps"], keyof {
                        type?: import("./gremlin").MacroStepType;
                        binding?: {
                            behaviorId?: number;
                            param1?: number;
                            param2?: number;
                        };
                        delayMs?: number;
                    }[]>]: never; };
                } & { [K_158 in Exclude<keyof I_1["requestResponse"]["gremlin"]["getMacro"], keyof import("./gremlin").MacroConfig>]: never; };
                setMacro?: import("./gremlin").GremlinStatusCode;
                getBitmapChunk?: {
                    target?: import("./gremlin").BitmapTarget;
                    slot?: number;
                    offset?: number;
                    totalSize?: number;
                    isCustom?: boolean;
                    data?: Uint8Array;
                } & {
                    target?: import("./gremlin").BitmapTarget;
                    slot?: number;
                    offset?: number;
                    totalSize?: number;
                    isCustom?: boolean;
                    data?: Uint8Array;
                } & { [K_159 in Exclude<keyof I_1["requestResponse"]["gremlin"]["getBitmapChunk"], keyof import("./gremlin").BitmapChunk>]: never; };
                setBitmapChunk?: import("./gremlin").GremlinStatusCode;
                clearBitmap?: import("./gremlin").GremlinStatusCode;
                saveSettings?: import("./gremlin").GremlinStatusCode;
                resetGremlinDefaults?: import("./gremlin").GremlinStatusCode;
            } & { [K_160 in Exclude<keyof I_1["requestResponse"]["gremlin"], keyof Response9>]: never; };
        } & { [K_161 in Exclude<keyof I_1["requestResponse"], keyof RequestResponse>]: never; };
        notification?: {
            core?: {
                lockStateChanged?: import("./core").LockState;
            };
            keymap?: {
                unsavedChangesStatusChanged?: boolean;
            };
        } & {
            core?: {
                lockStateChanged?: import("./core").LockState;
            } & {
                lockStateChanged?: import("./core").LockState;
            } & { [K_162 in Exclude<keyof I_1["notification"]["core"], "lockStateChanged">]: never; };
            keymap?: {
                unsavedChangesStatusChanged?: boolean;
            } & {
                unsavedChangesStatusChanged?: boolean;
            } & { [K_163 in Exclude<keyof I_1["notification"]["keymap"], "unsavedChangesStatusChanged">]: never; };
        } & { [K_164 in Exclude<keyof I_1["notification"], keyof Notification>]: never; };
    } & { [K_165 in Exclude<keyof I_1, keyof Response>]: never; }>(object: I_1): Response;
};
export declare const RequestResponse: {
    encode(message: RequestResponse, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): RequestResponse;
    fromJSON(object: any): RequestResponse;
    toJSON(message: RequestResponse): unknown;
    create<I extends {
        requestId?: number;
        meta?: {
            noResponse?: boolean;
            simpleError?: import("./meta").ErrorConditions;
        };
        core?: {
            getDeviceInfo?: {
                name?: string;
                serialNumber?: Uint8Array;
            };
            getLockState?: import("./core").LockState;
            resetSettings?: boolean;
        };
        behaviors?: {
            listAllBehaviors?: {
                behaviors?: number[];
            };
            getBehaviorDetails?: {
                id?: number;
                displayName?: string;
                metadata?: {
                    param1?: {
                        name?: string;
                        nil?: {};
                        constant?: number;
                        range?: {
                            min?: number;
                            max?: number;
                        };
                        hidUsage?: {
                            keyboardMax?: number;
                            consumerMax?: number;
                        };
                        layerId?: {};
                    }[];
                    param2?: {
                        name?: string;
                        nil?: {};
                        constant?: number;
                        range?: {
                            min?: number;
                            max?: number;
                        };
                        hidUsage?: {
                            keyboardMax?: number;
                            consumerMax?: number;
                        };
                        layerId?: {};
                    }[];
                }[];
            };
        };
        keymap?: {
            getKeymap?: {
                layers?: {
                    id?: number;
                    name?: string;
                    bindings?: {
                        behaviorId?: number;
                        param1?: number;
                        param2?: number;
                    }[];
                }[];
                availableLayers?: number;
                maxLayerNameLength?: number;
            };
            setLayerBinding?: import("./keymap").SetLayerBindingResponse;
            checkUnsavedChanges?: boolean;
            saveChanges?: {
                ok?: boolean;
                err?: import("./keymap").SaveChangesErrorCode;
            };
            discardChanges?: boolean;
            getPhysicalLayouts?: {
                activeLayoutIndex?: number;
                layouts?: {
                    name?: string;
                    keys?: {
                        width?: number;
                        height?: number;
                        x?: number;
                        y?: number;
                        r?: number;
                        rx?: number;
                        ry?: number;
                    }[];
                }[];
            };
            setActivePhysicalLayout?: {
                ok?: {
                    layers?: {
                        id?: number;
                        name?: string;
                        bindings?: {
                            behaviorId?: number;
                            param1?: number;
                            param2?: number;
                        }[];
                    }[];
                    availableLayers?: number;
                    maxLayerNameLength?: number;
                };
                err?: import("./keymap").SetActivePhysicalLayoutErrorCode;
            };
            moveLayer?: {
                ok?: {
                    layers?: {
                        id?: number;
                        name?: string;
                        bindings?: {
                            behaviorId?: number;
                            param1?: number;
                            param2?: number;
                        }[];
                    }[];
                    availableLayers?: number;
                    maxLayerNameLength?: number;
                };
                err?: import("./keymap").MoveLayerErrorCode;
            };
            addLayer?: {
                ok?: {
                    index?: number;
                    layer?: {
                        id?: number;
                        name?: string;
                        bindings?: {
                            behaviorId?: number;
                            param1?: number;
                            param2?: number;
                        }[];
                    };
                };
                err?: import("./keymap").AddLayerErrorCode;
            };
            removeLayer?: {
                ok?: {};
                err?: import("./keymap").RemoveLayerErrorCode;
            };
            restoreLayer?: {
                ok?: {
                    id?: number;
                    name?: string;
                    bindings?: {
                        behaviorId?: number;
                        param1?: number;
                        param2?: number;
                    }[];
                };
                err?: import("./keymap").RestoreLayerErrorCode;
            };
            setLayerProps?: import("./keymap").SetLayerPropsResponse;
        };
        gremlin?: {
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
            setSleepConfig?: import("./gremlin").GremlinStatusCode;
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
            setDisplayConfig?: import("./gremlin").GremlinStatusCode;
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
            setStickConfig?: import("./gremlin").GremlinStatusCode;
            getStickLayerConfig?: {
                layerIndex?: number;
                mode?: import("./gremlin").StickMode;
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
            setStickLayerConfig?: import("./gremlin").GremlinStatusCode;
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
            setCombo?: import("./gremlin").GremlinStatusCode;
            getHoldTap?: {
                index?: number;
                enabled?: boolean;
                tappingTermMs?: number;
                quickTapMs?: number;
                requirePriorIdleMs?: number;
                flavor?: import("./gremlin").HoldTapFlavor;
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
            setHoldTap?: import("./gremlin").GremlinStatusCode;
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
            setTapDance?: import("./gremlin").GremlinStatusCode;
            getMacro?: {
                index?: number;
                enabled?: boolean;
                waitMs?: number;
                tapMs?: number;
                steps?: {
                    type?: import("./gremlin").MacroStepType;
                    binding?: {
                        behaviorId?: number;
                        param1?: number;
                        param2?: number;
                    };
                    delayMs?: number;
                }[];
            };
            setMacro?: import("./gremlin").GremlinStatusCode;
            getBitmapChunk?: {
                target?: import("./gremlin").BitmapTarget;
                slot?: number;
                offset?: number;
                totalSize?: number;
                isCustom?: boolean;
                data?: Uint8Array;
            };
            setBitmapChunk?: import("./gremlin").GremlinStatusCode;
            clearBitmap?: import("./gremlin").GremlinStatusCode;
            saveSettings?: import("./gremlin").GremlinStatusCode;
            resetGremlinDefaults?: import("./gremlin").GremlinStatusCode;
        };
    } & {
        requestId?: number;
        meta?: {
            noResponse?: boolean;
            simpleError?: import("./meta").ErrorConditions;
        } & {
            noResponse?: boolean;
            simpleError?: import("./meta").ErrorConditions;
        } & { [K in Exclude<keyof I["meta"], keyof Response5>]: never; };
        core?: {
            getDeviceInfo?: {
                name?: string;
                serialNumber?: Uint8Array;
            };
            getLockState?: import("./core").LockState;
            resetSettings?: boolean;
        } & {
            getDeviceInfo?: {
                name?: string;
                serialNumber?: Uint8Array;
            } & {
                name?: string;
                serialNumber?: Uint8Array;
            } & { [K_1 in Exclude<keyof I["core"]["getDeviceInfo"], keyof import("./core").GetDeviceInfoResponse>]: never; };
            getLockState?: import("./core").LockState;
            resetSettings?: boolean;
        } & { [K_2 in Exclude<keyof I["core"], keyof Response6>]: never; };
        behaviors?: {
            listAllBehaviors?: {
                behaviors?: number[];
            };
            getBehaviorDetails?: {
                id?: number;
                displayName?: string;
                metadata?: {
                    param1?: {
                        name?: string;
                        nil?: {};
                        constant?: number;
                        range?: {
                            min?: number;
                            max?: number;
                        };
                        hidUsage?: {
                            keyboardMax?: number;
                            consumerMax?: number;
                        };
                        layerId?: {};
                    }[];
                    param2?: {
                        name?: string;
                        nil?: {};
                        constant?: number;
                        range?: {
                            min?: number;
                            max?: number;
                        };
                        hidUsage?: {
                            keyboardMax?: number;
                            consumerMax?: number;
                        };
                        layerId?: {};
                    }[];
                }[];
            };
        } & {
            listAllBehaviors?: {
                behaviors?: number[];
            } & {
                behaviors?: number[] & number[] & { [K_3 in Exclude<keyof I["behaviors"]["listAllBehaviors"]["behaviors"], keyof number[]>]: never; };
            } & { [K_4 in Exclude<keyof I["behaviors"]["listAllBehaviors"], "behaviors">]: never; };
            getBehaviorDetails?: {
                id?: number;
                displayName?: string;
                metadata?: {
                    param1?: {
                        name?: string;
                        nil?: {};
                        constant?: number;
                        range?: {
                            min?: number;
                            max?: number;
                        };
                        hidUsage?: {
                            keyboardMax?: number;
                            consumerMax?: number;
                        };
                        layerId?: {};
                    }[];
                    param2?: {
                        name?: string;
                        nil?: {};
                        constant?: number;
                        range?: {
                            min?: number;
                            max?: number;
                        };
                        hidUsage?: {
                            keyboardMax?: number;
                            consumerMax?: number;
                        };
                        layerId?: {};
                    }[];
                }[];
            } & {
                id?: number;
                displayName?: string;
                metadata?: {
                    param1?: {
                        name?: string;
                        nil?: {};
                        constant?: number;
                        range?: {
                            min?: number;
                            max?: number;
                        };
                        hidUsage?: {
                            keyboardMax?: number;
                            consumerMax?: number;
                        };
                        layerId?: {};
                    }[];
                    param2?: {
                        name?: string;
                        nil?: {};
                        constant?: number;
                        range?: {
                            min?: number;
                            max?: number;
                        };
                        hidUsage?: {
                            keyboardMax?: number;
                            consumerMax?: number;
                        };
                        layerId?: {};
                    }[];
                }[] & ({
                    param1?: {
                        name?: string;
                        nil?: {};
                        constant?: number;
                        range?: {
                            min?: number;
                            max?: number;
                        };
                        hidUsage?: {
                            keyboardMax?: number;
                            consumerMax?: number;
                        };
                        layerId?: {};
                    }[];
                    param2?: {
                        name?: string;
                        nil?: {};
                        constant?: number;
                        range?: {
                            min?: number;
                            max?: number;
                        };
                        hidUsage?: {
                            keyboardMax?: number;
                            consumerMax?: number;
                        };
                        layerId?: {};
                    }[];
                } & {
                    param1?: {
                        name?: string;
                        nil?: {};
                        constant?: number;
                        range?: {
                            min?: number;
                            max?: number;
                        };
                        hidUsage?: {
                            keyboardMax?: number;
                            consumerMax?: number;
                        };
                        layerId?: {};
                    }[] & ({
                        name?: string;
                        nil?: {};
                        constant?: number;
                        range?: {
                            min?: number;
                            max?: number;
                        };
                        hidUsage?: {
                            keyboardMax?: number;
                            consumerMax?: number;
                        };
                        layerId?: {};
                    } & {
                        name?: string;
                        nil?: {} & {} & { [K_5 in Exclude<keyof I["behaviors"]["getBehaviorDetails"]["metadata"][number]["param1"][number]["nil"], never>]: never; };
                        constant?: number;
                        range?: {
                            min?: number;
                            max?: number;
                        } & {
                            min?: number;
                            max?: number;
                        } & { [K_6 in Exclude<keyof I["behaviors"]["getBehaviorDetails"]["metadata"][number]["param1"][number]["range"], keyof import("./behaviors").BehaviorParameterValueDescriptionRange>]: never; };
                        hidUsage?: {
                            keyboardMax?: number;
                            consumerMax?: number;
                        } & {
                            keyboardMax?: number;
                            consumerMax?: number;
                        } & { [K_7 in Exclude<keyof I["behaviors"]["getBehaviorDetails"]["metadata"][number]["param1"][number]["hidUsage"], keyof import("./behaviors").BehaviorParameterHidUsage>]: never; };
                        layerId?: {} & {} & { [K_8 in Exclude<keyof I["behaviors"]["getBehaviorDetails"]["metadata"][number]["param1"][number]["layerId"], never>]: never; };
                    } & { [K_9 in Exclude<keyof I["behaviors"]["getBehaviorDetails"]["metadata"][number]["param1"][number], keyof import("./behaviors").BehaviorParameterValueDescription>]: never; })[] & { [K_10 in Exclude<keyof I["behaviors"]["getBehaviorDetails"]["metadata"][number]["param1"], keyof {
                        name?: string;
                        nil?: {};
                        constant?: number;
                        range?: {
                            min?: number;
                            max?: number;
                        };
                        hidUsage?: {
                            keyboardMax?: number;
                            consumerMax?: number;
                        };
                        layerId?: {};
                    }[]>]: never; };
                    param2?: {
                        name?: string;
                        nil?: {};
                        constant?: number;
                        range?: {
                            min?: number;
                            max?: number;
                        };
                        hidUsage?: {
                            keyboardMax?: number;
                            consumerMax?: number;
                        };
                        layerId?: {};
                    }[] & ({
                        name?: string;
                        nil?: {};
                        constant?: number;
                        range?: {
                            min?: number;
                            max?: number;
                        };
                        hidUsage?: {
                            keyboardMax?: number;
                            consumerMax?: number;
                        };
                        layerId?: {};
                    } & {
                        name?: string;
                        nil?: {} & {} & { [K_11 in Exclude<keyof I["behaviors"]["getBehaviorDetails"]["metadata"][number]["param2"][number]["nil"], never>]: never; };
                        constant?: number;
                        range?: {
                            min?: number;
                            max?: number;
                        } & {
                            min?: number;
                            max?: number;
                        } & { [K_12 in Exclude<keyof I["behaviors"]["getBehaviorDetails"]["metadata"][number]["param2"][number]["range"], keyof import("./behaviors").BehaviorParameterValueDescriptionRange>]: never; };
                        hidUsage?: {
                            keyboardMax?: number;
                            consumerMax?: number;
                        } & {
                            keyboardMax?: number;
                            consumerMax?: number;
                        } & { [K_13 in Exclude<keyof I["behaviors"]["getBehaviorDetails"]["metadata"][number]["param2"][number]["hidUsage"], keyof import("./behaviors").BehaviorParameterHidUsage>]: never; };
                        layerId?: {} & {} & { [K_14 in Exclude<keyof I["behaviors"]["getBehaviorDetails"]["metadata"][number]["param2"][number]["layerId"], never>]: never; };
                    } & { [K_15 in Exclude<keyof I["behaviors"]["getBehaviorDetails"]["metadata"][number]["param2"][number], keyof import("./behaviors").BehaviorParameterValueDescription>]: never; })[] & { [K_16 in Exclude<keyof I["behaviors"]["getBehaviorDetails"]["metadata"][number]["param2"], keyof {
                        name?: string;
                        nil?: {};
                        constant?: number;
                        range?: {
                            min?: number;
                            max?: number;
                        };
                        hidUsage?: {
                            keyboardMax?: number;
                            consumerMax?: number;
                        };
                        layerId?: {};
                    }[]>]: never; };
                } & { [K_17 in Exclude<keyof I["behaviors"]["getBehaviorDetails"]["metadata"][number], keyof import("./behaviors").BehaviorBindingParametersSet>]: never; })[] & { [K_18 in Exclude<keyof I["behaviors"]["getBehaviorDetails"]["metadata"], keyof {
                    param1?: {
                        name?: string;
                        nil?: {};
                        constant?: number;
                        range?: {
                            min?: number;
                            max?: number;
                        };
                        hidUsage?: {
                            keyboardMax?: number;
                            consumerMax?: number;
                        };
                        layerId?: {};
                    }[];
                    param2?: {
                        name?: string;
                        nil?: {};
                        constant?: number;
                        range?: {
                            min?: number;
                            max?: number;
                        };
                        hidUsage?: {
                            keyboardMax?: number;
                            consumerMax?: number;
                        };
                        layerId?: {};
                    }[];
                }[]>]: never; };
            } & { [K_19 in Exclude<keyof I["behaviors"]["getBehaviorDetails"], keyof import("./behaviors").GetBehaviorDetailsResponse>]: never; };
        } & { [K_20 in Exclude<keyof I["behaviors"], keyof Response7>]: never; };
        keymap?: {
            getKeymap?: {
                layers?: {
                    id?: number;
                    name?: string;
                    bindings?: {
                        behaviorId?: number;
                        param1?: number;
                        param2?: number;
                    }[];
                }[];
                availableLayers?: number;
                maxLayerNameLength?: number;
            };
            setLayerBinding?: import("./keymap").SetLayerBindingResponse;
            checkUnsavedChanges?: boolean;
            saveChanges?: {
                ok?: boolean;
                err?: import("./keymap").SaveChangesErrorCode;
            };
            discardChanges?: boolean;
            getPhysicalLayouts?: {
                activeLayoutIndex?: number;
                layouts?: {
                    name?: string;
                    keys?: {
                        width?: number;
                        height?: number;
                        x?: number;
                        y?: number;
                        r?: number;
                        rx?: number;
                        ry?: number;
                    }[];
                }[];
            };
            setActivePhysicalLayout?: {
                ok?: {
                    layers?: {
                        id?: number;
                        name?: string;
                        bindings?: {
                            behaviorId?: number;
                            param1?: number;
                            param2?: number;
                        }[];
                    }[];
                    availableLayers?: number;
                    maxLayerNameLength?: number;
                };
                err?: import("./keymap").SetActivePhysicalLayoutErrorCode;
            };
            moveLayer?: {
                ok?: {
                    layers?: {
                        id?: number;
                        name?: string;
                        bindings?: {
                            behaviorId?: number;
                            param1?: number;
                            param2?: number;
                        }[];
                    }[];
                    availableLayers?: number;
                    maxLayerNameLength?: number;
                };
                err?: import("./keymap").MoveLayerErrorCode;
            };
            addLayer?: {
                ok?: {
                    index?: number;
                    layer?: {
                        id?: number;
                        name?: string;
                        bindings?: {
                            behaviorId?: number;
                            param1?: number;
                            param2?: number;
                        }[];
                    };
                };
                err?: import("./keymap").AddLayerErrorCode;
            };
            removeLayer?: {
                ok?: {};
                err?: import("./keymap").RemoveLayerErrorCode;
            };
            restoreLayer?: {
                ok?: {
                    id?: number;
                    name?: string;
                    bindings?: {
                        behaviorId?: number;
                        param1?: number;
                        param2?: number;
                    }[];
                };
                err?: import("./keymap").RestoreLayerErrorCode;
            };
            setLayerProps?: import("./keymap").SetLayerPropsResponse;
        } & {
            getKeymap?: {
                layers?: {
                    id?: number;
                    name?: string;
                    bindings?: {
                        behaviorId?: number;
                        param1?: number;
                        param2?: number;
                    }[];
                }[];
                availableLayers?: number;
                maxLayerNameLength?: number;
            } & {
                layers?: {
                    id?: number;
                    name?: string;
                    bindings?: {
                        behaviorId?: number;
                        param1?: number;
                        param2?: number;
                    }[];
                }[] & ({
                    id?: number;
                    name?: string;
                    bindings?: {
                        behaviorId?: number;
                        param1?: number;
                        param2?: number;
                    }[];
                } & {
                    id?: number;
                    name?: string;
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
                    } & { [K_21 in Exclude<keyof I["keymap"]["getKeymap"]["layers"][number]["bindings"][number], keyof import("./keymap").BehaviorBinding>]: never; })[] & { [K_22 in Exclude<keyof I["keymap"]["getKeymap"]["layers"][number]["bindings"], keyof {
                        behaviorId?: number;
                        param1?: number;
                        param2?: number;
                    }[]>]: never; };
                } & { [K_23 in Exclude<keyof I["keymap"]["getKeymap"]["layers"][number], keyof import("./keymap").Layer>]: never; })[] & { [K_24 in Exclude<keyof I["keymap"]["getKeymap"]["layers"], keyof {
                    id?: number;
                    name?: string;
                    bindings?: {
                        behaviorId?: number;
                        param1?: number;
                        param2?: number;
                    }[];
                }[]>]: never; };
                availableLayers?: number;
                maxLayerNameLength?: number;
            } & { [K_25 in Exclude<keyof I["keymap"]["getKeymap"], keyof import("./keymap").Keymap>]: never; };
            setLayerBinding?: import("./keymap").SetLayerBindingResponse;
            checkUnsavedChanges?: boolean;
            saveChanges?: {
                ok?: boolean;
                err?: import("./keymap").SaveChangesErrorCode;
            } & {
                ok?: boolean;
                err?: import("./keymap").SaveChangesErrorCode;
            } & { [K_26 in Exclude<keyof I["keymap"]["saveChanges"], keyof import("./keymap").SaveChangesResponse>]: never; };
            discardChanges?: boolean;
            getPhysicalLayouts?: {
                activeLayoutIndex?: number;
                layouts?: {
                    name?: string;
                    keys?: {
                        width?: number;
                        height?: number;
                        x?: number;
                        y?: number;
                        r?: number;
                        rx?: number;
                        ry?: number;
                    }[];
                }[];
            } & {
                activeLayoutIndex?: number;
                layouts?: {
                    name?: string;
                    keys?: {
                        width?: number;
                        height?: number;
                        x?: number;
                        y?: number;
                        r?: number;
                        rx?: number;
                        ry?: number;
                    }[];
                }[] & ({
                    name?: string;
                    keys?: {
                        width?: number;
                        height?: number;
                        x?: number;
                        y?: number;
                        r?: number;
                        rx?: number;
                        ry?: number;
                    }[];
                } & {
                    name?: string;
                    keys?: {
                        width?: number;
                        height?: number;
                        x?: number;
                        y?: number;
                        r?: number;
                        rx?: number;
                        ry?: number;
                    }[] & ({
                        width?: number;
                        height?: number;
                        x?: number;
                        y?: number;
                        r?: number;
                        rx?: number;
                        ry?: number;
                    } & {
                        width?: number;
                        height?: number;
                        x?: number;
                        y?: number;
                        r?: number;
                        rx?: number;
                        ry?: number;
                    } & { [K_27 in Exclude<keyof I["keymap"]["getPhysicalLayouts"]["layouts"][number]["keys"][number], keyof import("./keymap").KeyPhysicalAttrs>]: never; })[] & { [K_28 in Exclude<keyof I["keymap"]["getPhysicalLayouts"]["layouts"][number]["keys"], keyof {
                        width?: number;
                        height?: number;
                        x?: number;
                        y?: number;
                        r?: number;
                        rx?: number;
                        ry?: number;
                    }[]>]: never; };
                } & { [K_29 in Exclude<keyof I["keymap"]["getPhysicalLayouts"]["layouts"][number], keyof import("./keymap").PhysicalLayout>]: never; })[] & { [K_30 in Exclude<keyof I["keymap"]["getPhysicalLayouts"]["layouts"], keyof {
                    name?: string;
                    keys?: {
                        width?: number;
                        height?: number;
                        x?: number;
                        y?: number;
                        r?: number;
                        rx?: number;
                        ry?: number;
                    }[];
                }[]>]: never; };
            } & { [K_31 in Exclude<keyof I["keymap"]["getPhysicalLayouts"], keyof import("./keymap").PhysicalLayouts>]: never; };
            setActivePhysicalLayout?: {
                ok?: {
                    layers?: {
                        id?: number;
                        name?: string;
                        bindings?: {
                            behaviorId?: number;
                            param1?: number;
                            param2?: number;
                        }[];
                    }[];
                    availableLayers?: number;
                    maxLayerNameLength?: number;
                };
                err?: import("./keymap").SetActivePhysicalLayoutErrorCode;
            } & {
                ok?: {
                    layers?: {
                        id?: number;
                        name?: string;
                        bindings?: {
                            behaviorId?: number;
                            param1?: number;
                            param2?: number;
                        }[];
                    }[];
                    availableLayers?: number;
                    maxLayerNameLength?: number;
                } & {
                    layers?: {
                        id?: number;
                        name?: string;
                        bindings?: {
                            behaviorId?: number;
                            param1?: number;
                            param2?: number;
                        }[];
                    }[] & ({
                        id?: number;
                        name?: string;
                        bindings?: {
                            behaviorId?: number;
                            param1?: number;
                            param2?: number;
                        }[];
                    } & {
                        id?: number;
                        name?: string;
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
                        } & { [K_32 in Exclude<keyof I["keymap"]["setActivePhysicalLayout"]["ok"]["layers"][number]["bindings"][number], keyof import("./keymap").BehaviorBinding>]: never; })[] & { [K_33 in Exclude<keyof I["keymap"]["setActivePhysicalLayout"]["ok"]["layers"][number]["bindings"], keyof {
                            behaviorId?: number;
                            param1?: number;
                            param2?: number;
                        }[]>]: never; };
                    } & { [K_34 in Exclude<keyof I["keymap"]["setActivePhysicalLayout"]["ok"]["layers"][number], keyof import("./keymap").Layer>]: never; })[] & { [K_35 in Exclude<keyof I["keymap"]["setActivePhysicalLayout"]["ok"]["layers"], keyof {
                        id?: number;
                        name?: string;
                        bindings?: {
                            behaviorId?: number;
                            param1?: number;
                            param2?: number;
                        }[];
                    }[]>]: never; };
                    availableLayers?: number;
                    maxLayerNameLength?: number;
                } & { [K_36 in Exclude<keyof I["keymap"]["setActivePhysicalLayout"]["ok"], keyof import("./keymap").Keymap>]: never; };
                err?: import("./keymap").SetActivePhysicalLayoutErrorCode;
            } & { [K_37 in Exclude<keyof I["keymap"]["setActivePhysicalLayout"], keyof import("./keymap").SetActivePhysicalLayoutResponse>]: never; };
            moveLayer?: {
                ok?: {
                    layers?: {
                        id?: number;
                        name?: string;
                        bindings?: {
                            behaviorId?: number;
                            param1?: number;
                            param2?: number;
                        }[];
                    }[];
                    availableLayers?: number;
                    maxLayerNameLength?: number;
                };
                err?: import("./keymap").MoveLayerErrorCode;
            } & {
                ok?: {
                    layers?: {
                        id?: number;
                        name?: string;
                        bindings?: {
                            behaviorId?: number;
                            param1?: number;
                            param2?: number;
                        }[];
                    }[];
                    availableLayers?: number;
                    maxLayerNameLength?: number;
                } & {
                    layers?: {
                        id?: number;
                        name?: string;
                        bindings?: {
                            behaviorId?: number;
                            param1?: number;
                            param2?: number;
                        }[];
                    }[] & ({
                        id?: number;
                        name?: string;
                        bindings?: {
                            behaviorId?: number;
                            param1?: number;
                            param2?: number;
                        }[];
                    } & {
                        id?: number;
                        name?: string;
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
                        } & { [K_38 in Exclude<keyof I["keymap"]["moveLayer"]["ok"]["layers"][number]["bindings"][number], keyof import("./keymap").BehaviorBinding>]: never; })[] & { [K_39 in Exclude<keyof I["keymap"]["moveLayer"]["ok"]["layers"][number]["bindings"], keyof {
                            behaviorId?: number;
                            param1?: number;
                            param2?: number;
                        }[]>]: never; };
                    } & { [K_40 in Exclude<keyof I["keymap"]["moveLayer"]["ok"]["layers"][number], keyof import("./keymap").Layer>]: never; })[] & { [K_41 in Exclude<keyof I["keymap"]["moveLayer"]["ok"]["layers"], keyof {
                        id?: number;
                        name?: string;
                        bindings?: {
                            behaviorId?: number;
                            param1?: number;
                            param2?: number;
                        }[];
                    }[]>]: never; };
                    availableLayers?: number;
                    maxLayerNameLength?: number;
                } & { [K_42 in Exclude<keyof I["keymap"]["moveLayer"]["ok"], keyof import("./keymap").Keymap>]: never; };
                err?: import("./keymap").MoveLayerErrorCode;
            } & { [K_43 in Exclude<keyof I["keymap"]["moveLayer"], keyof import("./keymap").MoveLayerResponse>]: never; };
            addLayer?: {
                ok?: {
                    index?: number;
                    layer?: {
                        id?: number;
                        name?: string;
                        bindings?: {
                            behaviorId?: number;
                            param1?: number;
                            param2?: number;
                        }[];
                    };
                };
                err?: import("./keymap").AddLayerErrorCode;
            } & {
                ok?: {
                    index?: number;
                    layer?: {
                        id?: number;
                        name?: string;
                        bindings?: {
                            behaviorId?: number;
                            param1?: number;
                            param2?: number;
                        }[];
                    };
                } & {
                    index?: number;
                    layer?: {
                        id?: number;
                        name?: string;
                        bindings?: {
                            behaviorId?: number;
                            param1?: number;
                            param2?: number;
                        }[];
                    } & {
                        id?: number;
                        name?: string;
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
                        } & { [K_44 in Exclude<keyof I["keymap"]["addLayer"]["ok"]["layer"]["bindings"][number], keyof import("./keymap").BehaviorBinding>]: never; })[] & { [K_45 in Exclude<keyof I["keymap"]["addLayer"]["ok"]["layer"]["bindings"], keyof {
                            behaviorId?: number;
                            param1?: number;
                            param2?: number;
                        }[]>]: never; };
                    } & { [K_46 in Exclude<keyof I["keymap"]["addLayer"]["ok"]["layer"], keyof import("./keymap").Layer>]: never; };
                } & { [K_47 in Exclude<keyof I["keymap"]["addLayer"]["ok"], keyof import("./keymap").AddLayerResponseDetails>]: never; };
                err?: import("./keymap").AddLayerErrorCode;
            } & { [K_48 in Exclude<keyof I["keymap"]["addLayer"], keyof import("./keymap").AddLayerResponse>]: never; };
            removeLayer?: {
                ok?: {};
                err?: import("./keymap").RemoveLayerErrorCode;
            } & {
                ok?: {} & {} & { [K_49 in Exclude<keyof I["keymap"]["removeLayer"]["ok"], never>]: never; };
                err?: import("./keymap").RemoveLayerErrorCode;
            } & { [K_50 in Exclude<keyof I["keymap"]["removeLayer"], keyof import("./keymap").RemoveLayerResponse>]: never; };
            restoreLayer?: {
                ok?: {
                    id?: number;
                    name?: string;
                    bindings?: {
                        behaviorId?: number;
                        param1?: number;
                        param2?: number;
                    }[];
                };
                err?: import("./keymap").RestoreLayerErrorCode;
            } & {
                ok?: {
                    id?: number;
                    name?: string;
                    bindings?: {
                        behaviorId?: number;
                        param1?: number;
                        param2?: number;
                    }[];
                } & {
                    id?: number;
                    name?: string;
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
                    } & { [K_51 in Exclude<keyof I["keymap"]["restoreLayer"]["ok"]["bindings"][number], keyof import("./keymap").BehaviorBinding>]: never; })[] & { [K_52 in Exclude<keyof I["keymap"]["restoreLayer"]["ok"]["bindings"], keyof {
                        behaviorId?: number;
                        param1?: number;
                        param2?: number;
                    }[]>]: never; };
                } & { [K_53 in Exclude<keyof I["keymap"]["restoreLayer"]["ok"], keyof import("./keymap").Layer>]: never; };
                err?: import("./keymap").RestoreLayerErrorCode;
            } & { [K_54 in Exclude<keyof I["keymap"]["restoreLayer"], keyof import("./keymap").RestoreLayerResponse>]: never; };
            setLayerProps?: import("./keymap").SetLayerPropsResponse;
        } & { [K_55 in Exclude<keyof I["keymap"], keyof Response8>]: never; };
        gremlin?: {
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
            setSleepConfig?: import("./gremlin").GremlinStatusCode;
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
            setDisplayConfig?: import("./gremlin").GremlinStatusCode;
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
            setStickConfig?: import("./gremlin").GremlinStatusCode;
            getStickLayerConfig?: {
                layerIndex?: number;
                mode?: import("./gremlin").StickMode;
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
            setStickLayerConfig?: import("./gremlin").GremlinStatusCode;
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
            setCombo?: import("./gremlin").GremlinStatusCode;
            getHoldTap?: {
                index?: number;
                enabled?: boolean;
                tappingTermMs?: number;
                quickTapMs?: number;
                requirePriorIdleMs?: number;
                flavor?: import("./gremlin").HoldTapFlavor;
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
            setHoldTap?: import("./gremlin").GremlinStatusCode;
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
            setTapDance?: import("./gremlin").GremlinStatusCode;
            getMacro?: {
                index?: number;
                enabled?: boolean;
                waitMs?: number;
                tapMs?: number;
                steps?: {
                    type?: import("./gremlin").MacroStepType;
                    binding?: {
                        behaviorId?: number;
                        param1?: number;
                        param2?: number;
                    };
                    delayMs?: number;
                }[];
            };
            setMacro?: import("./gremlin").GremlinStatusCode;
            getBitmapChunk?: {
                target?: import("./gremlin").BitmapTarget;
                slot?: number;
                offset?: number;
                totalSize?: number;
                isCustom?: boolean;
                data?: Uint8Array;
            };
            setBitmapChunk?: import("./gremlin").GremlinStatusCode;
            clearBitmap?: import("./gremlin").GremlinStatusCode;
            saveSettings?: import("./gremlin").GremlinStatusCode;
            resetGremlinDefaults?: import("./gremlin").GremlinStatusCode;
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
            } & { [K_56 in Exclude<keyof I["gremlin"]["getCapabilities"], keyof import("./gremlin").Capabilities>]: never; };
            getSleepConfig?: {
                displaySleepMs?: number;
                idleTimeoutMs?: number;
                deepSleepMs?: number;
            } & {
                displaySleepMs?: number;
                idleTimeoutMs?: number;
                deepSleepMs?: number;
            } & { [K_57 in Exclude<keyof I["gremlin"]["getSleepConfig"], keyof import("./gremlin").SleepConfig>]: never; };
            setSleepConfig?: import("./gremlin").GremlinStatusCode;
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
                animSequence?: number[] & number[] & { [K_58 in Exclude<keyof I["gremlin"]["getDisplayConfig"]["animSequence"], keyof number[]>]: never; };
            } & { [K_59 in Exclude<keyof I["gremlin"]["getDisplayConfig"], keyof import("./gremlin").DisplayConfig>]: never; };
            setDisplayConfig?: import("./gremlin").GremlinStatusCode;
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
            } & { [K_60 in Exclude<keyof I["gremlin"]["getStickConfig"], keyof import("./gremlin").StickConfig>]: never; };
            setStickConfig?: import("./gremlin").GremlinStatusCode;
            getStickLayerConfig?: {
                layerIndex?: number;
                mode?: import("./gremlin").StickMode;
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
                mode?: import("./gremlin").StickMode;
                upPosition?: number;
                downPosition?: number;
                leftPosition?: number;
                rightPosition?: number;
                switchActivationPoint?: number;
                switchHysteresis?: number;
                mouseMinSpeed?: number;
                mouseMaxSpeed?: number;
                scrollDivisor?: number;
            } & { [K_61 in Exclude<keyof I["gremlin"]["getStickLayerConfig"], keyof import("./gremlin").StickLayerConfig>]: never; };
            setStickLayerConfig?: import("./gremlin").GremlinStatusCode;
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
            } & { [K_62 in Exclude<keyof I["gremlin"]["getStickTelemetry"], keyof import("./gremlin").StickTelemetry>]: never; };
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
                keyPositions?: number[] & number[] & { [K_63 in Exclude<keyof I["gremlin"]["getCombo"]["keyPositions"], keyof number[]>]: never; };
                binding?: {
                    behaviorId?: number;
                    param1?: number;
                    param2?: number;
                } & {
                    behaviorId?: number;
                    param1?: number;
                    param2?: number;
                } & { [K_64 in Exclude<keyof I["gremlin"]["getCombo"]["binding"], keyof import("./gremlin").BindingSpec>]: never; };
            } & { [K_65 in Exclude<keyof I["gremlin"]["getCombo"], keyof import("./gremlin").ComboConfig>]: never; };
            setCombo?: import("./gremlin").GremlinStatusCode;
            getHoldTap?: {
                index?: number;
                enabled?: boolean;
                tappingTermMs?: number;
                quickTapMs?: number;
                requirePriorIdleMs?: number;
                flavor?: import("./gremlin").HoldTapFlavor;
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
                flavor?: import("./gremlin").HoldTapFlavor;
                retroTap?: boolean;
                holdBinding?: {
                    behaviorId?: number;
                    param1?: number;
                    param2?: number;
                } & {
                    behaviorId?: number;
                    param1?: number;
                    param2?: number;
                } & { [K_66 in Exclude<keyof I["gremlin"]["getHoldTap"]["holdBinding"], keyof import("./gremlin").BindingSpec>]: never; };
                tapBinding?: {
                    behaviorId?: number;
                    param1?: number;
                    param2?: number;
                } & {
                    behaviorId?: number;
                    param1?: number;
                    param2?: number;
                } & { [K_67 in Exclude<keyof I["gremlin"]["getHoldTap"]["tapBinding"], keyof import("./gremlin").BindingSpec>]: never; };
            } & { [K_68 in Exclude<keyof I["gremlin"]["getHoldTap"], keyof import("./gremlin").HoldTapConfig>]: never; };
            setHoldTap?: import("./gremlin").GremlinStatusCode;
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
                } & { [K_69 in Exclude<keyof I["gremlin"]["getTapDance"]["bindings"][number], keyof import("./gremlin").BindingSpec>]: never; })[] & { [K_70 in Exclude<keyof I["gremlin"]["getTapDance"]["bindings"], keyof {
                    behaviorId?: number;
                    param1?: number;
                    param2?: number;
                }[]>]: never; };
            } & { [K_71 in Exclude<keyof I["gremlin"]["getTapDance"], keyof import("./gremlin").TapDanceConfig>]: never; };
            setTapDance?: import("./gremlin").GremlinStatusCode;
            getMacro?: {
                index?: number;
                enabled?: boolean;
                waitMs?: number;
                tapMs?: number;
                steps?: {
                    type?: import("./gremlin").MacroStepType;
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
                    type?: import("./gremlin").MacroStepType;
                    binding?: {
                        behaviorId?: number;
                        param1?: number;
                        param2?: number;
                    };
                    delayMs?: number;
                }[] & ({
                    type?: import("./gremlin").MacroStepType;
                    binding?: {
                        behaviorId?: number;
                        param1?: number;
                        param2?: number;
                    };
                    delayMs?: number;
                } & {
                    type?: import("./gremlin").MacroStepType;
                    binding?: {
                        behaviorId?: number;
                        param1?: number;
                        param2?: number;
                    } & {
                        behaviorId?: number;
                        param1?: number;
                        param2?: number;
                    } & { [K_72 in Exclude<keyof I["gremlin"]["getMacro"]["steps"][number]["binding"], keyof import("./gremlin").BindingSpec>]: never; };
                    delayMs?: number;
                } & { [K_73 in Exclude<keyof I["gremlin"]["getMacro"]["steps"][number], keyof import("./gremlin").MacroStep>]: never; })[] & { [K_74 in Exclude<keyof I["gremlin"]["getMacro"]["steps"], keyof {
                    type?: import("./gremlin").MacroStepType;
                    binding?: {
                        behaviorId?: number;
                        param1?: number;
                        param2?: number;
                    };
                    delayMs?: number;
                }[]>]: never; };
            } & { [K_75 in Exclude<keyof I["gremlin"]["getMacro"], keyof import("./gremlin").MacroConfig>]: never; };
            setMacro?: import("./gremlin").GremlinStatusCode;
            getBitmapChunk?: {
                target?: import("./gremlin").BitmapTarget;
                slot?: number;
                offset?: number;
                totalSize?: number;
                isCustom?: boolean;
                data?: Uint8Array;
            } & {
                target?: import("./gremlin").BitmapTarget;
                slot?: number;
                offset?: number;
                totalSize?: number;
                isCustom?: boolean;
                data?: Uint8Array;
            } & { [K_76 in Exclude<keyof I["gremlin"]["getBitmapChunk"], keyof import("./gremlin").BitmapChunk>]: never; };
            setBitmapChunk?: import("./gremlin").GremlinStatusCode;
            clearBitmap?: import("./gremlin").GremlinStatusCode;
            saveSettings?: import("./gremlin").GremlinStatusCode;
            resetGremlinDefaults?: import("./gremlin").GremlinStatusCode;
        } & { [K_77 in Exclude<keyof I["gremlin"], keyof Response9>]: never; };
    } & { [K_78 in Exclude<keyof I, keyof RequestResponse>]: never; }>(base?: I): RequestResponse;
    fromPartial<I_1 extends {
        requestId?: number;
        meta?: {
            noResponse?: boolean;
            simpleError?: import("./meta").ErrorConditions;
        };
        core?: {
            getDeviceInfo?: {
                name?: string;
                serialNumber?: Uint8Array;
            };
            getLockState?: import("./core").LockState;
            resetSettings?: boolean;
        };
        behaviors?: {
            listAllBehaviors?: {
                behaviors?: number[];
            };
            getBehaviorDetails?: {
                id?: number;
                displayName?: string;
                metadata?: {
                    param1?: {
                        name?: string;
                        nil?: {};
                        constant?: number;
                        range?: {
                            min?: number;
                            max?: number;
                        };
                        hidUsage?: {
                            keyboardMax?: number;
                            consumerMax?: number;
                        };
                        layerId?: {};
                    }[];
                    param2?: {
                        name?: string;
                        nil?: {};
                        constant?: number;
                        range?: {
                            min?: number;
                            max?: number;
                        };
                        hidUsage?: {
                            keyboardMax?: number;
                            consumerMax?: number;
                        };
                        layerId?: {};
                    }[];
                }[];
            };
        };
        keymap?: {
            getKeymap?: {
                layers?: {
                    id?: number;
                    name?: string;
                    bindings?: {
                        behaviorId?: number;
                        param1?: number;
                        param2?: number;
                    }[];
                }[];
                availableLayers?: number;
                maxLayerNameLength?: number;
            };
            setLayerBinding?: import("./keymap").SetLayerBindingResponse;
            checkUnsavedChanges?: boolean;
            saveChanges?: {
                ok?: boolean;
                err?: import("./keymap").SaveChangesErrorCode;
            };
            discardChanges?: boolean;
            getPhysicalLayouts?: {
                activeLayoutIndex?: number;
                layouts?: {
                    name?: string;
                    keys?: {
                        width?: number;
                        height?: number;
                        x?: number;
                        y?: number;
                        r?: number;
                        rx?: number;
                        ry?: number;
                    }[];
                }[];
            };
            setActivePhysicalLayout?: {
                ok?: {
                    layers?: {
                        id?: number;
                        name?: string;
                        bindings?: {
                            behaviorId?: number;
                            param1?: number;
                            param2?: number;
                        }[];
                    }[];
                    availableLayers?: number;
                    maxLayerNameLength?: number;
                };
                err?: import("./keymap").SetActivePhysicalLayoutErrorCode;
            };
            moveLayer?: {
                ok?: {
                    layers?: {
                        id?: number;
                        name?: string;
                        bindings?: {
                            behaviorId?: number;
                            param1?: number;
                            param2?: number;
                        }[];
                    }[];
                    availableLayers?: number;
                    maxLayerNameLength?: number;
                };
                err?: import("./keymap").MoveLayerErrorCode;
            };
            addLayer?: {
                ok?: {
                    index?: number;
                    layer?: {
                        id?: number;
                        name?: string;
                        bindings?: {
                            behaviorId?: number;
                            param1?: number;
                            param2?: number;
                        }[];
                    };
                };
                err?: import("./keymap").AddLayerErrorCode;
            };
            removeLayer?: {
                ok?: {};
                err?: import("./keymap").RemoveLayerErrorCode;
            };
            restoreLayer?: {
                ok?: {
                    id?: number;
                    name?: string;
                    bindings?: {
                        behaviorId?: number;
                        param1?: number;
                        param2?: number;
                    }[];
                };
                err?: import("./keymap").RestoreLayerErrorCode;
            };
            setLayerProps?: import("./keymap").SetLayerPropsResponse;
        };
        gremlin?: {
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
            setSleepConfig?: import("./gremlin").GremlinStatusCode;
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
            setDisplayConfig?: import("./gremlin").GremlinStatusCode;
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
            setStickConfig?: import("./gremlin").GremlinStatusCode;
            getStickLayerConfig?: {
                layerIndex?: number;
                mode?: import("./gremlin").StickMode;
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
            setStickLayerConfig?: import("./gremlin").GremlinStatusCode;
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
            setCombo?: import("./gremlin").GremlinStatusCode;
            getHoldTap?: {
                index?: number;
                enabled?: boolean;
                tappingTermMs?: number;
                quickTapMs?: number;
                requirePriorIdleMs?: number;
                flavor?: import("./gremlin").HoldTapFlavor;
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
            setHoldTap?: import("./gremlin").GremlinStatusCode;
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
            setTapDance?: import("./gremlin").GremlinStatusCode;
            getMacro?: {
                index?: number;
                enabled?: boolean;
                waitMs?: number;
                tapMs?: number;
                steps?: {
                    type?: import("./gremlin").MacroStepType;
                    binding?: {
                        behaviorId?: number;
                        param1?: number;
                        param2?: number;
                    };
                    delayMs?: number;
                }[];
            };
            setMacro?: import("./gremlin").GremlinStatusCode;
            getBitmapChunk?: {
                target?: import("./gremlin").BitmapTarget;
                slot?: number;
                offset?: number;
                totalSize?: number;
                isCustom?: boolean;
                data?: Uint8Array;
            };
            setBitmapChunk?: import("./gremlin").GremlinStatusCode;
            clearBitmap?: import("./gremlin").GremlinStatusCode;
            saveSettings?: import("./gremlin").GremlinStatusCode;
            resetGremlinDefaults?: import("./gremlin").GremlinStatusCode;
        };
    } & {
        requestId?: number;
        meta?: {
            noResponse?: boolean;
            simpleError?: import("./meta").ErrorConditions;
        } & {
            noResponse?: boolean;
            simpleError?: import("./meta").ErrorConditions;
        } & { [K_79 in Exclude<keyof I_1["meta"], keyof Response5>]: never; };
        core?: {
            getDeviceInfo?: {
                name?: string;
                serialNumber?: Uint8Array;
            };
            getLockState?: import("./core").LockState;
            resetSettings?: boolean;
        } & {
            getDeviceInfo?: {
                name?: string;
                serialNumber?: Uint8Array;
            } & {
                name?: string;
                serialNumber?: Uint8Array;
            } & { [K_80 in Exclude<keyof I_1["core"]["getDeviceInfo"], keyof import("./core").GetDeviceInfoResponse>]: never; };
            getLockState?: import("./core").LockState;
            resetSettings?: boolean;
        } & { [K_81 in Exclude<keyof I_1["core"], keyof Response6>]: never; };
        behaviors?: {
            listAllBehaviors?: {
                behaviors?: number[];
            };
            getBehaviorDetails?: {
                id?: number;
                displayName?: string;
                metadata?: {
                    param1?: {
                        name?: string;
                        nil?: {};
                        constant?: number;
                        range?: {
                            min?: number;
                            max?: number;
                        };
                        hidUsage?: {
                            keyboardMax?: number;
                            consumerMax?: number;
                        };
                        layerId?: {};
                    }[];
                    param2?: {
                        name?: string;
                        nil?: {};
                        constant?: number;
                        range?: {
                            min?: number;
                            max?: number;
                        };
                        hidUsage?: {
                            keyboardMax?: number;
                            consumerMax?: number;
                        };
                        layerId?: {};
                    }[];
                }[];
            };
        } & {
            listAllBehaviors?: {
                behaviors?: number[];
            } & {
                behaviors?: number[] & number[] & { [K_82 in Exclude<keyof I_1["behaviors"]["listAllBehaviors"]["behaviors"], keyof number[]>]: never; };
            } & { [K_83 in Exclude<keyof I_1["behaviors"]["listAllBehaviors"], "behaviors">]: never; };
            getBehaviorDetails?: {
                id?: number;
                displayName?: string;
                metadata?: {
                    param1?: {
                        name?: string;
                        nil?: {};
                        constant?: number;
                        range?: {
                            min?: number;
                            max?: number;
                        };
                        hidUsage?: {
                            keyboardMax?: number;
                            consumerMax?: number;
                        };
                        layerId?: {};
                    }[];
                    param2?: {
                        name?: string;
                        nil?: {};
                        constant?: number;
                        range?: {
                            min?: number;
                            max?: number;
                        };
                        hidUsage?: {
                            keyboardMax?: number;
                            consumerMax?: number;
                        };
                        layerId?: {};
                    }[];
                }[];
            } & {
                id?: number;
                displayName?: string;
                metadata?: {
                    param1?: {
                        name?: string;
                        nil?: {};
                        constant?: number;
                        range?: {
                            min?: number;
                            max?: number;
                        };
                        hidUsage?: {
                            keyboardMax?: number;
                            consumerMax?: number;
                        };
                        layerId?: {};
                    }[];
                    param2?: {
                        name?: string;
                        nil?: {};
                        constant?: number;
                        range?: {
                            min?: number;
                            max?: number;
                        };
                        hidUsage?: {
                            keyboardMax?: number;
                            consumerMax?: number;
                        };
                        layerId?: {};
                    }[];
                }[] & ({
                    param1?: {
                        name?: string;
                        nil?: {};
                        constant?: number;
                        range?: {
                            min?: number;
                            max?: number;
                        };
                        hidUsage?: {
                            keyboardMax?: number;
                            consumerMax?: number;
                        };
                        layerId?: {};
                    }[];
                    param2?: {
                        name?: string;
                        nil?: {};
                        constant?: number;
                        range?: {
                            min?: number;
                            max?: number;
                        };
                        hidUsage?: {
                            keyboardMax?: number;
                            consumerMax?: number;
                        };
                        layerId?: {};
                    }[];
                } & {
                    param1?: {
                        name?: string;
                        nil?: {};
                        constant?: number;
                        range?: {
                            min?: number;
                            max?: number;
                        };
                        hidUsage?: {
                            keyboardMax?: number;
                            consumerMax?: number;
                        };
                        layerId?: {};
                    }[] & ({
                        name?: string;
                        nil?: {};
                        constant?: number;
                        range?: {
                            min?: number;
                            max?: number;
                        };
                        hidUsage?: {
                            keyboardMax?: number;
                            consumerMax?: number;
                        };
                        layerId?: {};
                    } & {
                        name?: string;
                        nil?: {} & {} & { [K_84 in Exclude<keyof I_1["behaviors"]["getBehaviorDetails"]["metadata"][number]["param1"][number]["nil"], never>]: never; };
                        constant?: number;
                        range?: {
                            min?: number;
                            max?: number;
                        } & {
                            min?: number;
                            max?: number;
                        } & { [K_85 in Exclude<keyof I_1["behaviors"]["getBehaviorDetails"]["metadata"][number]["param1"][number]["range"], keyof import("./behaviors").BehaviorParameterValueDescriptionRange>]: never; };
                        hidUsage?: {
                            keyboardMax?: number;
                            consumerMax?: number;
                        } & {
                            keyboardMax?: number;
                            consumerMax?: number;
                        } & { [K_86 in Exclude<keyof I_1["behaviors"]["getBehaviorDetails"]["metadata"][number]["param1"][number]["hidUsage"], keyof import("./behaviors").BehaviorParameterHidUsage>]: never; };
                        layerId?: {} & {} & { [K_87 in Exclude<keyof I_1["behaviors"]["getBehaviorDetails"]["metadata"][number]["param1"][number]["layerId"], never>]: never; };
                    } & { [K_88 in Exclude<keyof I_1["behaviors"]["getBehaviorDetails"]["metadata"][number]["param1"][number], keyof import("./behaviors").BehaviorParameterValueDescription>]: never; })[] & { [K_89 in Exclude<keyof I_1["behaviors"]["getBehaviorDetails"]["metadata"][number]["param1"], keyof {
                        name?: string;
                        nil?: {};
                        constant?: number;
                        range?: {
                            min?: number;
                            max?: number;
                        };
                        hidUsage?: {
                            keyboardMax?: number;
                            consumerMax?: number;
                        };
                        layerId?: {};
                    }[]>]: never; };
                    param2?: {
                        name?: string;
                        nil?: {};
                        constant?: number;
                        range?: {
                            min?: number;
                            max?: number;
                        };
                        hidUsage?: {
                            keyboardMax?: number;
                            consumerMax?: number;
                        };
                        layerId?: {};
                    }[] & ({
                        name?: string;
                        nil?: {};
                        constant?: number;
                        range?: {
                            min?: number;
                            max?: number;
                        };
                        hidUsage?: {
                            keyboardMax?: number;
                            consumerMax?: number;
                        };
                        layerId?: {};
                    } & {
                        name?: string;
                        nil?: {} & {} & { [K_90 in Exclude<keyof I_1["behaviors"]["getBehaviorDetails"]["metadata"][number]["param2"][number]["nil"], never>]: never; };
                        constant?: number;
                        range?: {
                            min?: number;
                            max?: number;
                        } & {
                            min?: number;
                            max?: number;
                        } & { [K_91 in Exclude<keyof I_1["behaviors"]["getBehaviorDetails"]["metadata"][number]["param2"][number]["range"], keyof import("./behaviors").BehaviorParameterValueDescriptionRange>]: never; };
                        hidUsage?: {
                            keyboardMax?: number;
                            consumerMax?: number;
                        } & {
                            keyboardMax?: number;
                            consumerMax?: number;
                        } & { [K_92 in Exclude<keyof I_1["behaviors"]["getBehaviorDetails"]["metadata"][number]["param2"][number]["hidUsage"], keyof import("./behaviors").BehaviorParameterHidUsage>]: never; };
                        layerId?: {} & {} & { [K_93 in Exclude<keyof I_1["behaviors"]["getBehaviorDetails"]["metadata"][number]["param2"][number]["layerId"], never>]: never; };
                    } & { [K_94 in Exclude<keyof I_1["behaviors"]["getBehaviorDetails"]["metadata"][number]["param2"][number], keyof import("./behaviors").BehaviorParameterValueDescription>]: never; })[] & { [K_95 in Exclude<keyof I_1["behaviors"]["getBehaviorDetails"]["metadata"][number]["param2"], keyof {
                        name?: string;
                        nil?: {};
                        constant?: number;
                        range?: {
                            min?: number;
                            max?: number;
                        };
                        hidUsage?: {
                            keyboardMax?: number;
                            consumerMax?: number;
                        };
                        layerId?: {};
                    }[]>]: never; };
                } & { [K_96 in Exclude<keyof I_1["behaviors"]["getBehaviorDetails"]["metadata"][number], keyof import("./behaviors").BehaviorBindingParametersSet>]: never; })[] & { [K_97 in Exclude<keyof I_1["behaviors"]["getBehaviorDetails"]["metadata"], keyof {
                    param1?: {
                        name?: string;
                        nil?: {};
                        constant?: number;
                        range?: {
                            min?: number;
                            max?: number;
                        };
                        hidUsage?: {
                            keyboardMax?: number;
                            consumerMax?: number;
                        };
                        layerId?: {};
                    }[];
                    param2?: {
                        name?: string;
                        nil?: {};
                        constant?: number;
                        range?: {
                            min?: number;
                            max?: number;
                        };
                        hidUsage?: {
                            keyboardMax?: number;
                            consumerMax?: number;
                        };
                        layerId?: {};
                    }[];
                }[]>]: never; };
            } & { [K_98 in Exclude<keyof I_1["behaviors"]["getBehaviorDetails"], keyof import("./behaviors").GetBehaviorDetailsResponse>]: never; };
        } & { [K_99 in Exclude<keyof I_1["behaviors"], keyof Response7>]: never; };
        keymap?: {
            getKeymap?: {
                layers?: {
                    id?: number;
                    name?: string;
                    bindings?: {
                        behaviorId?: number;
                        param1?: number;
                        param2?: number;
                    }[];
                }[];
                availableLayers?: number;
                maxLayerNameLength?: number;
            };
            setLayerBinding?: import("./keymap").SetLayerBindingResponse;
            checkUnsavedChanges?: boolean;
            saveChanges?: {
                ok?: boolean;
                err?: import("./keymap").SaveChangesErrorCode;
            };
            discardChanges?: boolean;
            getPhysicalLayouts?: {
                activeLayoutIndex?: number;
                layouts?: {
                    name?: string;
                    keys?: {
                        width?: number;
                        height?: number;
                        x?: number;
                        y?: number;
                        r?: number;
                        rx?: number;
                        ry?: number;
                    }[];
                }[];
            };
            setActivePhysicalLayout?: {
                ok?: {
                    layers?: {
                        id?: number;
                        name?: string;
                        bindings?: {
                            behaviorId?: number;
                            param1?: number;
                            param2?: number;
                        }[];
                    }[];
                    availableLayers?: number;
                    maxLayerNameLength?: number;
                };
                err?: import("./keymap").SetActivePhysicalLayoutErrorCode;
            };
            moveLayer?: {
                ok?: {
                    layers?: {
                        id?: number;
                        name?: string;
                        bindings?: {
                            behaviorId?: number;
                            param1?: number;
                            param2?: number;
                        }[];
                    }[];
                    availableLayers?: number;
                    maxLayerNameLength?: number;
                };
                err?: import("./keymap").MoveLayerErrorCode;
            };
            addLayer?: {
                ok?: {
                    index?: number;
                    layer?: {
                        id?: number;
                        name?: string;
                        bindings?: {
                            behaviorId?: number;
                            param1?: number;
                            param2?: number;
                        }[];
                    };
                };
                err?: import("./keymap").AddLayerErrorCode;
            };
            removeLayer?: {
                ok?: {};
                err?: import("./keymap").RemoveLayerErrorCode;
            };
            restoreLayer?: {
                ok?: {
                    id?: number;
                    name?: string;
                    bindings?: {
                        behaviorId?: number;
                        param1?: number;
                        param2?: number;
                    }[];
                };
                err?: import("./keymap").RestoreLayerErrorCode;
            };
            setLayerProps?: import("./keymap").SetLayerPropsResponse;
        } & {
            getKeymap?: {
                layers?: {
                    id?: number;
                    name?: string;
                    bindings?: {
                        behaviorId?: number;
                        param1?: number;
                        param2?: number;
                    }[];
                }[];
                availableLayers?: number;
                maxLayerNameLength?: number;
            } & {
                layers?: {
                    id?: number;
                    name?: string;
                    bindings?: {
                        behaviorId?: number;
                        param1?: number;
                        param2?: number;
                    }[];
                }[] & ({
                    id?: number;
                    name?: string;
                    bindings?: {
                        behaviorId?: number;
                        param1?: number;
                        param2?: number;
                    }[];
                } & {
                    id?: number;
                    name?: string;
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
                    } & { [K_100 in Exclude<keyof I_1["keymap"]["getKeymap"]["layers"][number]["bindings"][number], keyof import("./keymap").BehaviorBinding>]: never; })[] & { [K_101 in Exclude<keyof I_1["keymap"]["getKeymap"]["layers"][number]["bindings"], keyof {
                        behaviorId?: number;
                        param1?: number;
                        param2?: number;
                    }[]>]: never; };
                } & { [K_102 in Exclude<keyof I_1["keymap"]["getKeymap"]["layers"][number], keyof import("./keymap").Layer>]: never; })[] & { [K_103 in Exclude<keyof I_1["keymap"]["getKeymap"]["layers"], keyof {
                    id?: number;
                    name?: string;
                    bindings?: {
                        behaviorId?: number;
                        param1?: number;
                        param2?: number;
                    }[];
                }[]>]: never; };
                availableLayers?: number;
                maxLayerNameLength?: number;
            } & { [K_104 in Exclude<keyof I_1["keymap"]["getKeymap"], keyof import("./keymap").Keymap>]: never; };
            setLayerBinding?: import("./keymap").SetLayerBindingResponse;
            checkUnsavedChanges?: boolean;
            saveChanges?: {
                ok?: boolean;
                err?: import("./keymap").SaveChangesErrorCode;
            } & {
                ok?: boolean;
                err?: import("./keymap").SaveChangesErrorCode;
            } & { [K_105 in Exclude<keyof I_1["keymap"]["saveChanges"], keyof import("./keymap").SaveChangesResponse>]: never; };
            discardChanges?: boolean;
            getPhysicalLayouts?: {
                activeLayoutIndex?: number;
                layouts?: {
                    name?: string;
                    keys?: {
                        width?: number;
                        height?: number;
                        x?: number;
                        y?: number;
                        r?: number;
                        rx?: number;
                        ry?: number;
                    }[];
                }[];
            } & {
                activeLayoutIndex?: number;
                layouts?: {
                    name?: string;
                    keys?: {
                        width?: number;
                        height?: number;
                        x?: number;
                        y?: number;
                        r?: number;
                        rx?: number;
                        ry?: number;
                    }[];
                }[] & ({
                    name?: string;
                    keys?: {
                        width?: number;
                        height?: number;
                        x?: number;
                        y?: number;
                        r?: number;
                        rx?: number;
                        ry?: number;
                    }[];
                } & {
                    name?: string;
                    keys?: {
                        width?: number;
                        height?: number;
                        x?: number;
                        y?: number;
                        r?: number;
                        rx?: number;
                        ry?: number;
                    }[] & ({
                        width?: number;
                        height?: number;
                        x?: number;
                        y?: number;
                        r?: number;
                        rx?: number;
                        ry?: number;
                    } & {
                        width?: number;
                        height?: number;
                        x?: number;
                        y?: number;
                        r?: number;
                        rx?: number;
                        ry?: number;
                    } & { [K_106 in Exclude<keyof I_1["keymap"]["getPhysicalLayouts"]["layouts"][number]["keys"][number], keyof import("./keymap").KeyPhysicalAttrs>]: never; })[] & { [K_107 in Exclude<keyof I_1["keymap"]["getPhysicalLayouts"]["layouts"][number]["keys"], keyof {
                        width?: number;
                        height?: number;
                        x?: number;
                        y?: number;
                        r?: number;
                        rx?: number;
                        ry?: number;
                    }[]>]: never; };
                } & { [K_108 in Exclude<keyof I_1["keymap"]["getPhysicalLayouts"]["layouts"][number], keyof import("./keymap").PhysicalLayout>]: never; })[] & { [K_109 in Exclude<keyof I_1["keymap"]["getPhysicalLayouts"]["layouts"], keyof {
                    name?: string;
                    keys?: {
                        width?: number;
                        height?: number;
                        x?: number;
                        y?: number;
                        r?: number;
                        rx?: number;
                        ry?: number;
                    }[];
                }[]>]: never; };
            } & { [K_110 in Exclude<keyof I_1["keymap"]["getPhysicalLayouts"], keyof import("./keymap").PhysicalLayouts>]: never; };
            setActivePhysicalLayout?: {
                ok?: {
                    layers?: {
                        id?: number;
                        name?: string;
                        bindings?: {
                            behaviorId?: number;
                            param1?: number;
                            param2?: number;
                        }[];
                    }[];
                    availableLayers?: number;
                    maxLayerNameLength?: number;
                };
                err?: import("./keymap").SetActivePhysicalLayoutErrorCode;
            } & {
                ok?: {
                    layers?: {
                        id?: number;
                        name?: string;
                        bindings?: {
                            behaviorId?: number;
                            param1?: number;
                            param2?: number;
                        }[];
                    }[];
                    availableLayers?: number;
                    maxLayerNameLength?: number;
                } & {
                    layers?: {
                        id?: number;
                        name?: string;
                        bindings?: {
                            behaviorId?: number;
                            param1?: number;
                            param2?: number;
                        }[];
                    }[] & ({
                        id?: number;
                        name?: string;
                        bindings?: {
                            behaviorId?: number;
                            param1?: number;
                            param2?: number;
                        }[];
                    } & {
                        id?: number;
                        name?: string;
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
                        } & { [K_111 in Exclude<keyof I_1["keymap"]["setActivePhysicalLayout"]["ok"]["layers"][number]["bindings"][number], keyof import("./keymap").BehaviorBinding>]: never; })[] & { [K_112 in Exclude<keyof I_1["keymap"]["setActivePhysicalLayout"]["ok"]["layers"][number]["bindings"], keyof {
                            behaviorId?: number;
                            param1?: number;
                            param2?: number;
                        }[]>]: never; };
                    } & { [K_113 in Exclude<keyof I_1["keymap"]["setActivePhysicalLayout"]["ok"]["layers"][number], keyof import("./keymap").Layer>]: never; })[] & { [K_114 in Exclude<keyof I_1["keymap"]["setActivePhysicalLayout"]["ok"]["layers"], keyof {
                        id?: number;
                        name?: string;
                        bindings?: {
                            behaviorId?: number;
                            param1?: number;
                            param2?: number;
                        }[];
                    }[]>]: never; };
                    availableLayers?: number;
                    maxLayerNameLength?: number;
                } & { [K_115 in Exclude<keyof I_1["keymap"]["setActivePhysicalLayout"]["ok"], keyof import("./keymap").Keymap>]: never; };
                err?: import("./keymap").SetActivePhysicalLayoutErrorCode;
            } & { [K_116 in Exclude<keyof I_1["keymap"]["setActivePhysicalLayout"], keyof import("./keymap").SetActivePhysicalLayoutResponse>]: never; };
            moveLayer?: {
                ok?: {
                    layers?: {
                        id?: number;
                        name?: string;
                        bindings?: {
                            behaviorId?: number;
                            param1?: number;
                            param2?: number;
                        }[];
                    }[];
                    availableLayers?: number;
                    maxLayerNameLength?: number;
                };
                err?: import("./keymap").MoveLayerErrorCode;
            } & {
                ok?: {
                    layers?: {
                        id?: number;
                        name?: string;
                        bindings?: {
                            behaviorId?: number;
                            param1?: number;
                            param2?: number;
                        }[];
                    }[];
                    availableLayers?: number;
                    maxLayerNameLength?: number;
                } & {
                    layers?: {
                        id?: number;
                        name?: string;
                        bindings?: {
                            behaviorId?: number;
                            param1?: number;
                            param2?: number;
                        }[];
                    }[] & ({
                        id?: number;
                        name?: string;
                        bindings?: {
                            behaviorId?: number;
                            param1?: number;
                            param2?: number;
                        }[];
                    } & {
                        id?: number;
                        name?: string;
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
                        } & { [K_117 in Exclude<keyof I_1["keymap"]["moveLayer"]["ok"]["layers"][number]["bindings"][number], keyof import("./keymap").BehaviorBinding>]: never; })[] & { [K_118 in Exclude<keyof I_1["keymap"]["moveLayer"]["ok"]["layers"][number]["bindings"], keyof {
                            behaviorId?: number;
                            param1?: number;
                            param2?: number;
                        }[]>]: never; };
                    } & { [K_119 in Exclude<keyof I_1["keymap"]["moveLayer"]["ok"]["layers"][number], keyof import("./keymap").Layer>]: never; })[] & { [K_120 in Exclude<keyof I_1["keymap"]["moveLayer"]["ok"]["layers"], keyof {
                        id?: number;
                        name?: string;
                        bindings?: {
                            behaviorId?: number;
                            param1?: number;
                            param2?: number;
                        }[];
                    }[]>]: never; };
                    availableLayers?: number;
                    maxLayerNameLength?: number;
                } & { [K_121 in Exclude<keyof I_1["keymap"]["moveLayer"]["ok"], keyof import("./keymap").Keymap>]: never; };
                err?: import("./keymap").MoveLayerErrorCode;
            } & { [K_122 in Exclude<keyof I_1["keymap"]["moveLayer"], keyof import("./keymap").MoveLayerResponse>]: never; };
            addLayer?: {
                ok?: {
                    index?: number;
                    layer?: {
                        id?: number;
                        name?: string;
                        bindings?: {
                            behaviorId?: number;
                            param1?: number;
                            param2?: number;
                        }[];
                    };
                };
                err?: import("./keymap").AddLayerErrorCode;
            } & {
                ok?: {
                    index?: number;
                    layer?: {
                        id?: number;
                        name?: string;
                        bindings?: {
                            behaviorId?: number;
                            param1?: number;
                            param2?: number;
                        }[];
                    };
                } & {
                    index?: number;
                    layer?: {
                        id?: number;
                        name?: string;
                        bindings?: {
                            behaviorId?: number;
                            param1?: number;
                            param2?: number;
                        }[];
                    } & {
                        id?: number;
                        name?: string;
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
                        } & { [K_123 in Exclude<keyof I_1["keymap"]["addLayer"]["ok"]["layer"]["bindings"][number], keyof import("./keymap").BehaviorBinding>]: never; })[] & { [K_124 in Exclude<keyof I_1["keymap"]["addLayer"]["ok"]["layer"]["bindings"], keyof {
                            behaviorId?: number;
                            param1?: number;
                            param2?: number;
                        }[]>]: never; };
                    } & { [K_125 in Exclude<keyof I_1["keymap"]["addLayer"]["ok"]["layer"], keyof import("./keymap").Layer>]: never; };
                } & { [K_126 in Exclude<keyof I_1["keymap"]["addLayer"]["ok"], keyof import("./keymap").AddLayerResponseDetails>]: never; };
                err?: import("./keymap").AddLayerErrorCode;
            } & { [K_127 in Exclude<keyof I_1["keymap"]["addLayer"], keyof import("./keymap").AddLayerResponse>]: never; };
            removeLayer?: {
                ok?: {};
                err?: import("./keymap").RemoveLayerErrorCode;
            } & {
                ok?: {} & {} & { [K_128 in Exclude<keyof I_1["keymap"]["removeLayer"]["ok"], never>]: never; };
                err?: import("./keymap").RemoveLayerErrorCode;
            } & { [K_129 in Exclude<keyof I_1["keymap"]["removeLayer"], keyof import("./keymap").RemoveLayerResponse>]: never; };
            restoreLayer?: {
                ok?: {
                    id?: number;
                    name?: string;
                    bindings?: {
                        behaviorId?: number;
                        param1?: number;
                        param2?: number;
                    }[];
                };
                err?: import("./keymap").RestoreLayerErrorCode;
            } & {
                ok?: {
                    id?: number;
                    name?: string;
                    bindings?: {
                        behaviorId?: number;
                        param1?: number;
                        param2?: number;
                    }[];
                } & {
                    id?: number;
                    name?: string;
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
                    } & { [K_130 in Exclude<keyof I_1["keymap"]["restoreLayer"]["ok"]["bindings"][number], keyof import("./keymap").BehaviorBinding>]: never; })[] & { [K_131 in Exclude<keyof I_1["keymap"]["restoreLayer"]["ok"]["bindings"], keyof {
                        behaviorId?: number;
                        param1?: number;
                        param2?: number;
                    }[]>]: never; };
                } & { [K_132 in Exclude<keyof I_1["keymap"]["restoreLayer"]["ok"], keyof import("./keymap").Layer>]: never; };
                err?: import("./keymap").RestoreLayerErrorCode;
            } & { [K_133 in Exclude<keyof I_1["keymap"]["restoreLayer"], keyof import("./keymap").RestoreLayerResponse>]: never; };
            setLayerProps?: import("./keymap").SetLayerPropsResponse;
        } & { [K_134 in Exclude<keyof I_1["keymap"], keyof Response8>]: never; };
        gremlin?: {
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
            setSleepConfig?: import("./gremlin").GremlinStatusCode;
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
            setDisplayConfig?: import("./gremlin").GremlinStatusCode;
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
            setStickConfig?: import("./gremlin").GremlinStatusCode;
            getStickLayerConfig?: {
                layerIndex?: number;
                mode?: import("./gremlin").StickMode;
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
            setStickLayerConfig?: import("./gremlin").GremlinStatusCode;
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
            setCombo?: import("./gremlin").GremlinStatusCode;
            getHoldTap?: {
                index?: number;
                enabled?: boolean;
                tappingTermMs?: number;
                quickTapMs?: number;
                requirePriorIdleMs?: number;
                flavor?: import("./gremlin").HoldTapFlavor;
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
            setHoldTap?: import("./gremlin").GremlinStatusCode;
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
            setTapDance?: import("./gremlin").GremlinStatusCode;
            getMacro?: {
                index?: number;
                enabled?: boolean;
                waitMs?: number;
                tapMs?: number;
                steps?: {
                    type?: import("./gremlin").MacroStepType;
                    binding?: {
                        behaviorId?: number;
                        param1?: number;
                        param2?: number;
                    };
                    delayMs?: number;
                }[];
            };
            setMacro?: import("./gremlin").GremlinStatusCode;
            getBitmapChunk?: {
                target?: import("./gremlin").BitmapTarget;
                slot?: number;
                offset?: number;
                totalSize?: number;
                isCustom?: boolean;
                data?: Uint8Array;
            };
            setBitmapChunk?: import("./gremlin").GremlinStatusCode;
            clearBitmap?: import("./gremlin").GremlinStatusCode;
            saveSettings?: import("./gremlin").GremlinStatusCode;
            resetGremlinDefaults?: import("./gremlin").GremlinStatusCode;
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
            } & { [K_135 in Exclude<keyof I_1["gremlin"]["getCapabilities"], keyof import("./gremlin").Capabilities>]: never; };
            getSleepConfig?: {
                displaySleepMs?: number;
                idleTimeoutMs?: number;
                deepSleepMs?: number;
            } & {
                displaySleepMs?: number;
                idleTimeoutMs?: number;
                deepSleepMs?: number;
            } & { [K_136 in Exclude<keyof I_1["gremlin"]["getSleepConfig"], keyof import("./gremlin").SleepConfig>]: never; };
            setSleepConfig?: import("./gremlin").GremlinStatusCode;
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
                animSequence?: number[] & number[] & { [K_137 in Exclude<keyof I_1["gremlin"]["getDisplayConfig"]["animSequence"], keyof number[]>]: never; };
            } & { [K_138 in Exclude<keyof I_1["gremlin"]["getDisplayConfig"], keyof import("./gremlin").DisplayConfig>]: never; };
            setDisplayConfig?: import("./gremlin").GremlinStatusCode;
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
            } & { [K_139 in Exclude<keyof I_1["gremlin"]["getStickConfig"], keyof import("./gremlin").StickConfig>]: never; };
            setStickConfig?: import("./gremlin").GremlinStatusCode;
            getStickLayerConfig?: {
                layerIndex?: number;
                mode?: import("./gremlin").StickMode;
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
                mode?: import("./gremlin").StickMode;
                upPosition?: number;
                downPosition?: number;
                leftPosition?: number;
                rightPosition?: number;
                switchActivationPoint?: number;
                switchHysteresis?: number;
                mouseMinSpeed?: number;
                mouseMaxSpeed?: number;
                scrollDivisor?: number;
            } & { [K_140 in Exclude<keyof I_1["gremlin"]["getStickLayerConfig"], keyof import("./gremlin").StickLayerConfig>]: never; };
            setStickLayerConfig?: import("./gremlin").GremlinStatusCode;
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
            } & { [K_141 in Exclude<keyof I_1["gremlin"]["getStickTelemetry"], keyof import("./gremlin").StickTelemetry>]: never; };
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
                keyPositions?: number[] & number[] & { [K_142 in Exclude<keyof I_1["gremlin"]["getCombo"]["keyPositions"], keyof number[]>]: never; };
                binding?: {
                    behaviorId?: number;
                    param1?: number;
                    param2?: number;
                } & {
                    behaviorId?: number;
                    param1?: number;
                    param2?: number;
                } & { [K_143 in Exclude<keyof I_1["gremlin"]["getCombo"]["binding"], keyof import("./gremlin").BindingSpec>]: never; };
            } & { [K_144 in Exclude<keyof I_1["gremlin"]["getCombo"], keyof import("./gremlin").ComboConfig>]: never; };
            setCombo?: import("./gremlin").GremlinStatusCode;
            getHoldTap?: {
                index?: number;
                enabled?: boolean;
                tappingTermMs?: number;
                quickTapMs?: number;
                requirePriorIdleMs?: number;
                flavor?: import("./gremlin").HoldTapFlavor;
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
                flavor?: import("./gremlin").HoldTapFlavor;
                retroTap?: boolean;
                holdBinding?: {
                    behaviorId?: number;
                    param1?: number;
                    param2?: number;
                } & {
                    behaviorId?: number;
                    param1?: number;
                    param2?: number;
                } & { [K_145 in Exclude<keyof I_1["gremlin"]["getHoldTap"]["holdBinding"], keyof import("./gremlin").BindingSpec>]: never; };
                tapBinding?: {
                    behaviorId?: number;
                    param1?: number;
                    param2?: number;
                } & {
                    behaviorId?: number;
                    param1?: number;
                    param2?: number;
                } & { [K_146 in Exclude<keyof I_1["gremlin"]["getHoldTap"]["tapBinding"], keyof import("./gremlin").BindingSpec>]: never; };
            } & { [K_147 in Exclude<keyof I_1["gremlin"]["getHoldTap"], keyof import("./gremlin").HoldTapConfig>]: never; };
            setHoldTap?: import("./gremlin").GremlinStatusCode;
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
                } & { [K_148 in Exclude<keyof I_1["gremlin"]["getTapDance"]["bindings"][number], keyof import("./gremlin").BindingSpec>]: never; })[] & { [K_149 in Exclude<keyof I_1["gremlin"]["getTapDance"]["bindings"], keyof {
                    behaviorId?: number;
                    param1?: number;
                    param2?: number;
                }[]>]: never; };
            } & { [K_150 in Exclude<keyof I_1["gremlin"]["getTapDance"], keyof import("./gremlin").TapDanceConfig>]: never; };
            setTapDance?: import("./gremlin").GremlinStatusCode;
            getMacro?: {
                index?: number;
                enabled?: boolean;
                waitMs?: number;
                tapMs?: number;
                steps?: {
                    type?: import("./gremlin").MacroStepType;
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
                    type?: import("./gremlin").MacroStepType;
                    binding?: {
                        behaviorId?: number;
                        param1?: number;
                        param2?: number;
                    };
                    delayMs?: number;
                }[] & ({
                    type?: import("./gremlin").MacroStepType;
                    binding?: {
                        behaviorId?: number;
                        param1?: number;
                        param2?: number;
                    };
                    delayMs?: number;
                } & {
                    type?: import("./gremlin").MacroStepType;
                    binding?: {
                        behaviorId?: number;
                        param1?: number;
                        param2?: number;
                    } & {
                        behaviorId?: number;
                        param1?: number;
                        param2?: number;
                    } & { [K_151 in Exclude<keyof I_1["gremlin"]["getMacro"]["steps"][number]["binding"], keyof import("./gremlin").BindingSpec>]: never; };
                    delayMs?: number;
                } & { [K_152 in Exclude<keyof I_1["gremlin"]["getMacro"]["steps"][number], keyof import("./gremlin").MacroStep>]: never; })[] & { [K_153 in Exclude<keyof I_1["gremlin"]["getMacro"]["steps"], keyof {
                    type?: import("./gremlin").MacroStepType;
                    binding?: {
                        behaviorId?: number;
                        param1?: number;
                        param2?: number;
                    };
                    delayMs?: number;
                }[]>]: never; };
            } & { [K_154 in Exclude<keyof I_1["gremlin"]["getMacro"], keyof import("./gremlin").MacroConfig>]: never; };
            setMacro?: import("./gremlin").GremlinStatusCode;
            getBitmapChunk?: {
                target?: import("./gremlin").BitmapTarget;
                slot?: number;
                offset?: number;
                totalSize?: number;
                isCustom?: boolean;
                data?: Uint8Array;
            } & {
                target?: import("./gremlin").BitmapTarget;
                slot?: number;
                offset?: number;
                totalSize?: number;
                isCustom?: boolean;
                data?: Uint8Array;
            } & { [K_155 in Exclude<keyof I_1["gremlin"]["getBitmapChunk"], keyof import("./gremlin").BitmapChunk>]: never; };
            setBitmapChunk?: import("./gremlin").GremlinStatusCode;
            clearBitmap?: import("./gremlin").GremlinStatusCode;
            saveSettings?: import("./gremlin").GremlinStatusCode;
            resetGremlinDefaults?: import("./gremlin").GremlinStatusCode;
        } & { [K_156 in Exclude<keyof I_1["gremlin"], keyof Response9>]: never; };
    } & { [K_157 in Exclude<keyof I_1, keyof RequestResponse>]: never; }>(object: I_1): RequestResponse;
};
export declare const Notification: {
    encode(message: Notification, writer?: _m0.Writer): _m0.Writer;
    decode(input: _m0.Reader | Uint8Array, length?: number): Notification;
    fromJSON(object: any): Notification;
    toJSON(message: Notification): unknown;
    create<I extends {
        core?: {
            lockStateChanged?: import("./core").LockState;
        };
        keymap?: {
            unsavedChangesStatusChanged?: boolean;
        };
    } & {
        core?: {
            lockStateChanged?: import("./core").LockState;
        } & {
            lockStateChanged?: import("./core").LockState;
        } & { [K in Exclude<keyof I["core"], "lockStateChanged">]: never; };
        keymap?: {
            unsavedChangesStatusChanged?: boolean;
        } & {
            unsavedChangesStatusChanged?: boolean;
        } & { [K_1 in Exclude<keyof I["keymap"], "unsavedChangesStatusChanged">]: never; };
    } & { [K_2 in Exclude<keyof I, keyof Notification>]: never; }>(base?: I): Notification;
    fromPartial<I_1 extends {
        core?: {
            lockStateChanged?: import("./core").LockState;
        };
        keymap?: {
            unsavedChangesStatusChanged?: boolean;
        };
    } & {
        core?: {
            lockStateChanged?: import("./core").LockState;
        } & {
            lockStateChanged?: import("./core").LockState;
        } & { [K_3 in Exclude<keyof I_1["core"], "lockStateChanged">]: never; };
        keymap?: {
            unsavedChangesStatusChanged?: boolean;
        } & {
            unsavedChangesStatusChanged?: boolean;
        } & { [K_4 in Exclude<keyof I_1["keymap"], "unsavedChangesStatusChanged">]: never; };
    } & { [K_5 in Exclude<keyof I_1, keyof Notification>]: never; }>(object: I_1): Notification;
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

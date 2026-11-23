import { useEffect, useState } from "react";
import Keyboard from "../keyboard/Keyboard";
import { useGremlin } from "./GremlinContext";
import { CombosPanel } from "./CombosPanel";
import { BehaviorsPanel } from "./BehaviorsPanel";
import { AnalogStickPanel } from "./AnalogStickPanel";
import { ScreenSleepPanel } from "./ScreenSleepPanel";
import { ExportSyncPanel } from "./ExportSyncPanel";

export type WorkspaceTab =
  | "keymap"
  | "combos"
  | "behaviors"
  | "stick"
  | "screen"
  | "export";

const TABS: { id: WorkspaceTab; label: string }[] = [
  { id: "keymap", label: "Keymap" },
  { id: "combos", label: "Combos & Multi-Button" },
  { id: "behaviors", label: "Hold-Tap / Tap-Dance / Macros" },
  { id: "stick", label: "Analog Stick & Calibration" },
  { id: "screen", label: "Screen & Sleep Studio" },
  { id: "export", label: "Export / Sync Back To" },
];

export const GremlinWorkspace = () => {
  const { capabilities, gremlinUnsaved } = useGremlin();
  const [activeTab, setActiveTab] = useState<WorkspaceTab>("keymap");

  useEffect(() => {
    if (!capabilities) {
      setActiveTab("keymap");
    }
  }, [capabilities]);

  useEffect(() => {
    if (activeTab === "keymap") {
      window.dispatchEvent(new Event("resize"));
    }
  }, [activeTab]);

  if (!capabilities) {
    return <Keyboard />;
  }

  return (
    <div className="grid grid-rows-[auto_1fr] h-full w-full min-h-0 min-w-0 overflow-hidden bg-base-300">
      <nav className="flex flex-wrap items-center justify-between gap-2 px-3 py-1.5 bg-base-200 border-b border-t border-base-300">
        <div className="flex flex-wrap gap-1">
          {TABS.map((t) => {
            const active = activeTab === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                  active
                    ? "bg-primary text-primary-content shadow-sm"
                    : "bg-base-100 hover:bg-base-300 text-base-content"
                }`}
              >
                {t.label}
              </button>
            );
          })}
        </div>

        <div className="flex items-center gap-2 text-sm">
          {gremlinUnsaved && (
            <span className="px-2 py-0.5 rounded bg-yellow-500/20 text-yellow-600 dark:text-yellow-300 font-medium">
              Unsaved RAM Changes
            </span>
          )}
          <span className="px-2 py-0.5 rounded bg-base-100 opacity-80">
            Gremlin v3 Proto v{capabilities.protocolVersion}
          </span>
        </div>
      </nav>

      <div className="relative h-full w-full min-h-0 min-w-0 overflow-hidden">
        <div className={activeTab === "keymap" ? "grid h-full w-full min-h-0 min-w-0" : "hidden"}>
          <Keyboard />
        </div>
        {activeTab === "combos" && <CombosPanel />}
        {activeTab === "behaviors" && <BehaviorsPanel />}
        {activeTab === "stick" && <AnalogStickPanel isActiveTab={activeTab === "stick"} />}
        {activeTab === "screen" && <ScreenSleepPanel isActiveTab={activeTab === "screen"} />}
        {activeTab === "export" && <ExportSyncPanel />}
      </div>
    </div>
  );
};

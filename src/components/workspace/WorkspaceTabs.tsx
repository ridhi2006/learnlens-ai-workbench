import { motion } from "motion/react";

import { cn } from "@/lib/utils";
import { useWorkspace, type WorkspaceTab } from "./workspace-context";

const tabs: { id: WorkspaceTab; label: string }[] = [
  { id: "overview", label: "Overview" },
  { id: "transcript", label: "Transcript" },
  { id: "notes", label: "Notes" },
  { id: "graph", label: "Knowledge Graph" },
  { id: "quiz", label: "Quiz" },
  { id: "tutor", label: "AI Tutor" },
  { id: "path", label: "Learning Path" },
];

export function WorkspaceTabs() {
  const { tab, setTab } = useWorkspace();

  return (
    <div className="border-border scrollbar-slim -mx-1 overflow-x-auto border-b px-1">
      <div className="flex min-w-max items-center gap-1 pb-px">
        {tabs.map((t) => {
          const active = t.id === tab;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={cn(
                "relative shrink-0 rounded-t-[10px] px-3.5 py-2.5 text-sm font-medium transition-colors",
                active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {t.label}
              {active && (
                <motion.span
                  layoutId="workspace-tab-indicator"
                  className="bg-gradient-brand absolute inset-x-2 -bottom-px h-0.5 rounded-full"
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

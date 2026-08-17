import { toast } from "sonner";
import { ArrowRight, MessageSquareText, Sparkles } from "lucide-react";

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { LearningStatusBadge, ProgressBar } from "@/components/common/primitives";
import { conceptById } from "@/data/mockData";
import { useWorkspace } from "./workspace-context";

export function ConceptDrawer() {
  const { conceptOpen, closeConcept, conceptId, setTab, openTimestamp } = useWorkspace();
  const concept = conceptId ? conceptById(conceptId) : undefined;

  return (
    <Sheet open={conceptOpen} onOpenChange={(o) => !o && closeConcept()}>
      <SheetContent side="right" className="border-border bg-surface w-full p-0 sm:max-w-md">
        {concept && (
          <div className="flex h-full flex-col">
            <SheetHeader className="border-border border-b p-5 text-left">
              <SheetTitle>{concept.label}</SheetTitle>
              <LearningStatusBadge status={concept.status} className="mt-1 w-fit" />
            </SheetHeader>

            <div className="scrollbar-slim flex-1 space-y-5 overflow-y-auto p-5">
              <div>
                <div className="text-muted-foreground text-[11px] font-semibold tracking-[0.16em] uppercase">Definition</div>
                <p className="mt-2 text-sm leading-relaxed">{concept.definition}</p>
              </div>

              {concept.timeRange && (
                <div>
                  <div className="text-muted-foreground text-[11px] font-semibold tracking-[0.16em] uppercase">
                    Explained in video
                  </div>
                  <p className="mt-2 font-mono text-sm">{concept.timeRange}</p>
                </div>
              )}

              <div>
                <div className="text-muted-foreground mb-2 flex items-center justify-between text-[11px] font-semibold tracking-[0.16em] uppercase">
                  <span>Confidence</span>
                  <span className="text-foreground normal-case">{concept.confidence}%</span>
                </div>
                <ProgressBar
                  value={concept.confidence}
                  tone={concept.status === "weak" ? "warning" : concept.status === "mastered" ? "success" : "brand"}
                />
              </div>
            </div>

            <div className="border-border grid grid-cols-1 gap-2 border-t p-4 sm:grid-cols-3">
              <button
                type="button"
                onClick={() => {
                  setTab("overview");
                  closeConcept();
                  toast.success("Jumping to video");
                }}
                className="border-border bg-surface-2 hover:border-primary/40 inline-flex items-center justify-center gap-1.5 rounded-[10px] border px-3 py-2 text-xs font-medium transition-colors"
              >
                <ArrowRight className="h-3.5 w-3.5" />
                Jump to Video
              </button>
              <button
                type="button"
                onClick={() => {
                  closeConcept();
                  openTimestamp(concept.timeRange?.split("–")[0] ?? "00:00", `Explain ${concept.label}`);
                }}
                className="border-border bg-surface-2 hover:border-primary/40 inline-flex items-center justify-center gap-1.5 rounded-[10px] border px-3 py-2 text-xs font-medium transition-colors"
              >
                <MessageSquareText className="h-3.5 w-3.5" />
                Ask AI
              </button>
              <button
                type="button"
                onClick={() => {
                  setTab("quiz");
                  closeConcept();
                }}
                className="bg-gradient-brand text-primary-foreground inline-flex items-center justify-center gap-1.5 rounded-[10px] px-3 py-2 text-xs font-medium"
              >
                <Sparkles className="h-3.5 w-3.5" />
                Practice
              </button>
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}

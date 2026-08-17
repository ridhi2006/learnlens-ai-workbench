import { useState } from "react";
import { motion } from "motion/react";
import { CheckCircle2, FileDown } from "lucide-react";
import { toast } from "sonner";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { useWorkspace } from "./workspace-context";

const options = [
  { id: "summary", label: "Summary" },
  { id: "cheatsheet", label: "Cheat Sheet" },
  { id: "concepts", label: "Key Concepts" },
  { id: "quiz", label: "Quiz" },
  { id: "roadmap", label: "Learning Roadmap" },
];

export function PdfModal() {
  const { pdfOpen, setPdfOpen } = useWorkspace();
  const [checked, setChecked] = useState<string[]>(["summary", "cheatsheet", "concepts"]);
  const [stage, setStage] = useState<"idle" | "generating" | "done">("idle");

  function generate() {
    setStage("generating");
    window.setTimeout(() => {
      setStage("done");
      toast.success("PDF generated");
    }, 1400);
  }

  return (
    <Dialog
      open={pdfOpen}
      onOpenChange={(o) => {
        setPdfOpen(o);
        if (!o) setStage("idle");
      }}
    >
      <DialogContent className="bg-surface border-border sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Study Pack</DialogTitle>
        </DialogHeader>

        {stage === "done" ? (
          <div className="flex flex-col items-center gap-3 py-4 text-center">
            <CheckCircle2 className="text-success h-10 w-10" />
            <p className="text-sm font-medium">Your study pack is ready</p>
            <p className="text-muted-foreground text-xs">binary-search-study-pack.pdf</p>
          </div>
        ) : stage === "generating" ? (
          <div className="space-y-3 py-4">
            <p className="text-muted-foreground text-center text-xs">Generating your PDF...</p>
            <div className="bg-foreground/10 h-1.5 w-full overflow-hidden rounded-full">
              <motion.div
                className="bg-gradient-brand h-full rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </div>
        ) : (
          <div className="space-y-2.5">
            {options.map((o) => (
              <label key={o.id} className="border-border bg-surface-2 flex items-center gap-3 rounded-[10px] border px-3 py-2.5 text-sm">
                <Checkbox
                  checked={checked.includes(o.id)}
                  onCheckedChange={(v) =>
                    setChecked((prev) => (v ? [...prev, o.id] : prev.filter((x) => x !== o.id)))
                  }
                />
                {o.label}
              </label>
            ))}
          </div>
        )}

        {stage !== "generating" && (
          <button
            type="button"
            onClick={stage === "done" ? () => setPdfOpen(false) : generate}
            className="bg-gradient-brand text-primary-foreground inline-flex w-full items-center justify-center gap-2 rounded-[10px] py-2.5 text-sm font-medium"
          >
            {stage === "done" ? (
              "Close"
            ) : (
              <>
                <FileDown className="h-4 w-4" />
                Generate PDF
              </>
            )}
          </button>
        )}
      </DialogContent>
    </Dialog>
  );
}

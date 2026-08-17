import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Send } from "lucide-react";
import { toast } from "sonner";

import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { timestampAnswers } from "@/data/mockData";
import { useWorkspace } from "./workspace-context";

const suggestions = ["Explain simply", "Give an example", "Why is this important?", "Show code"];

type ThreadItem = { question: string; answer: string; source: string };

export function TimestampDrawer() {
  const { timestampOpen, closeTimestamp, timestampTime, pendingQuestion, setTab } = useWorkspace();
  const [thread, setThread] = useState<ThreadItem[]>([]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);

  useEffect(() => {
    if (!timestampOpen) return;
    setThread([]);
    setInput("");
    if (pendingQuestion?.question) {
      ask(pendingQuestion.question);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timestampOpen, timestampTime]);

  function ask(question: string) {
    setThinking(true);
    setInput("");
    window.setTimeout(() => {
      const data = timestampAnswers[timestampTime] ?? timestampAnswers["default"]!;
      setThread((prev) => [...prev, { question, answer: data.answer, source: data.source }]);
      setThinking(false);
    }, 900);
  }

  return (
    <Sheet open={timestampOpen} onOpenChange={(o) => !o && closeTimestamp()}>
      <SheetContent side="right" className="border-border bg-surface flex w-full flex-col gap-0 p-0 sm:max-w-md">
        <SheetHeader className="border-border border-b p-5 text-left">
          <SheetTitle>Ask LearnLens about {timestampTime}</SheetTitle>
        </SheetHeader>

        <div className="scrollbar-slim flex-1 space-y-4 overflow-y-auto p-5">
          <div className="flex flex-wrap gap-2">
            {suggestions.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => ask(s)}
                className="border-border bg-surface-2 hover:border-primary/40 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors"
              >
                {s}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {thread.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-2"
              >
                <div className="bg-primary/10 text-foreground/90 ml-auto w-fit max-w-[85%] rounded-2xl rounded-tr-sm px-3.5 py-2 text-sm">
                  {item.question}
                </div>
                <div className="border-border bg-surface-2 space-y-2 rounded-2xl rounded-tl-sm border p-3.5">
                  <p className="text-sm leading-relaxed">{item.answer}</p>
                  <p className="text-muted-foreground text-[11px] font-medium">{item.source}</p>
                  <button
                    type="button"
                    onClick={() => {
                      setTab("overview");
                      closeTimestamp();
                      toast.success(`Jumping to ${timestampTime}`);
                    }}
                    className="text-primary inline-flex items-center gap-1 text-xs font-medium hover:underline"
                  >
                    Jump to Video <ArrowRight className="h-3 w-3" />
                  </button>
                </div>
              </motion.div>
            ))}

            <AnimatePresence>
              {thinking && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="border-border bg-surface-2 space-y-2 rounded-2xl rounded-tl-sm border p-3.5"
                >
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="bg-foreground/10 h-2.5 animate-pulse rounded-full"
                      style={{ width: `${85 - i * 18}%`, animationDelay: `${i * 120}ms` }}
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!input.trim()) return;
            ask(input.trim());
          }}
          className="border-border flex items-center gap-2 border-t p-4"
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask a follow-up..."
            className="border-border bg-surface-2 focus-visible:ring-ring flex-1 rounded-[10px] border px-3 py-2 text-sm outline-none focus-visible:ring-2"
          />
          <button
            type="submit"
            className="bg-gradient-brand text-primary-foreground flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px]"
            aria-label="Send"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </SheetContent>
    </Sheet>
  );
}

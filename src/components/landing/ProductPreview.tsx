import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { BarChart3, BookOpen, MessageSquareText, Network, Play } from "lucide-react";

import { Reveal, SectionLabel, ConceptChip } from "@/components/common/primitives";

const rail = [
  { icon: Play, label: "Video" },
  { icon: BookOpen, label: "Study" },
  { icon: Network, label: "Graph" },
  { icon: MessageSquareText, label: "Tutor" },
  { icon: BarChart3, label: "Progress" },
];

export function ProductPreview() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.94, 1, 0.97]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [30, 0, -20]);

  return (
    <section ref={ref} className="py-24 md:py-32">
      <div className="mx-auto max-w-[1360px] px-5 md:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <SectionLabel>The workspace</SectionLabel>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-balance md:text-4xl">
            One workspace for every video you learn from.
          </h2>
        </Reveal>

        <motion.div
          style={{ scale, y }}
          className="border-border bg-surface/80 shadow-[var(--shadow-panel)] mx-auto mt-16 max-w-[1160px] overflow-hidden rounded-[20px] border"
        >
          <div className="border-border bg-surface-2/60 flex items-center gap-1.5 border-b px-4 py-3">
            <span className="bg-destructive/50 h-2.5 w-2.5 rounded-full" />
            <span className="bg-warning/50 h-2.5 w-2.5 rounded-full" />
            <span className="bg-success/50 h-2.5 w-2.5 rounded-full" />
            <span className="text-muted-foreground ml-3 text-xs">learnlens.ai/learn/binary-search</span>
          </div>

          <div className="flex">
            <div className="border-border hidden w-16 shrink-0 flex-col items-center gap-4 border-r py-5 sm:flex">
              {rail.map(({ icon: Icon, label }, i) => (
                <div
                  key={label}
                  className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                    i === 0 ? "bg-primary/15 text-primary" : "text-muted-foreground"
                  }`}
                  aria-label={label}
                >
                  <Icon className="h-4 w-4" />
                </div>
              ))}
            </div>

            <div className="grid flex-1 gap-px md:grid-cols-[1.4fr_1fr]">
              <div className="bg-surface p-5">
                <div className="border-border from-violet/25 via-indigo/15 to-cyan/20 flex aspect-video items-center justify-center rounded-xl border bg-gradient-to-br">
                  <Play className="text-foreground/70 h-6 w-6" />
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  <ConceptChip label="Binary Search" status="mastered" />
                  <ConceptChip label="Search Space" status="mastered" />
                  <ConceptChip label="Lower Bound" status="weak" />
                  <ConceptChip label="Rotated Array" status="not-covered" />
                </div>
              </div>
              <div className="bg-surface border-border border-t p-5 md:border-t-0 md:border-l">
                <p className="text-muted-foreground text-[11px] font-semibold tracking-wide uppercase">AI Tutor</p>
                <div className="mt-3 space-y-2">
                  <div className="border-border bg-surface-2 rounded-xl border px-3 py-2 text-xs">
                    Explain lower bound like I'm new to this.
                  </div>
                  <div className="bg-primary/15 rounded-xl px-3 py-2 text-xs">
                    It's the first index where the value stops being smaller than your target — think of it as the
                    leftmost place you could insert it.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

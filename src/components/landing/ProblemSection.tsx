import { motion } from "motion/react";
import { Check, X } from "lucide-react";

import { SectionLabel, Reveal } from "@/components/common/primitives";

const before = [
  "Watch a 60-minute tutorial",
  "Take scattered notes",
  "Search doubts elsewhere",
  "Forget important concepts",
  "Wonder what to learn next",
];

const after = ["Watch", "Understand", "Practice", "Detect gaps", "Learn next"];

export function ProblemSection() {
  return (
    <section id="product" className="py-24 md:py-32">
      <div className="mx-auto max-w-[1360px] px-5 md:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <SectionLabel>The problem</SectionLabel>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-balance md:text-4xl">
            Watching is not the same as learning.
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-8 md:grid-cols-2 md:gap-12">
          <div>
            <p className="text-muted-foreground mb-6 text-xs font-semibold tracking-[0.14em] uppercase">
              The old YouTube flow
            </p>
            <ol className="relative space-y-0">
              {before.map((step, i) => (
                <motion.li
                  key={step}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.4, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="relative flex gap-4 pb-8 last:pb-0"
                >
                  {i < before.length - 1 && (
                    <span className="border-border-strong absolute top-7 left-3.5 h-[calc(100%-1rem)] border-l border-dashed" />
                  )}
                  <span className="border-border-strong text-muted-foreground bg-surface relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border">
                    <X className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-muted-foreground pt-0.5 text-sm">{step}</span>
                </motion.li>
              ))}
            </ol>
          </div>

          <div>
            <p className="text-violet mb-6 text-xs font-semibold tracking-[0.14em] uppercase">The LearnLens flow</p>
            <ol className="relative space-y-0">
              {after.map((step, i) => (
                <motion.li
                  key={step}
                  initial={{ opacity: 0, x: 12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.4, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="relative flex gap-4 pb-8 last:pb-0"
                >
                  {i < after.length - 1 && (
                    <span className="border-violet/40 absolute top-7 left-3.5 h-[calc(100%-1rem)] border-l" />
                  )}
                  <span className="border-violet/40 bg-violet/10 text-violet relative z-10 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-foreground/90 pt-0.5 text-sm font-medium">{step}</span>
                </motion.li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

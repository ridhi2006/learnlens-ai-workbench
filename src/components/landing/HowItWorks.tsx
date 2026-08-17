import { motion } from "motion/react";

import { Reveal, SectionLabel } from "@/components/common/primitives";

const steps = [
  { n: "01", title: "Paste a YouTube URL", body: "Drop in any educational video — a lecture, tutorial or conference talk." },
  { n: "02", title: "LearnLens understands the video", body: "Transcript, concepts and structure are extracted and mapped automatically." },
  { n: "03", title: "Study interactively", body: "Summaries, quizzes, a knowledge graph and an AI tutor are ready in seconds." },
  { n: "04", title: "Get your personalized learning path", body: "LearnLens flags gaps and recommends exactly what to learn next." },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 md:py-32">
      <div className="mx-auto max-w-[1360px] px-5 md:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <SectionLabel>How it works</SectionLabel>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-balance md:text-4xl">
            From a link to a learning path in four steps.
          </h2>
        </Reveal>

        <div className="relative mt-20">
          <div className="border-border-strong absolute top-6 right-0 left-0 hidden h-px md:block" />
          <motion.div
            className="via-violet from-violet/0 to-violet/0 absolute top-6 left-0 hidden h-px origin-left bg-gradient-to-r md:block"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          />
          <div className="grid gap-10 md:grid-cols-4 md:gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.n}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="border-border-strong bg-surface text-foreground relative z-10 flex h-12 w-12 items-center justify-center rounded-full border text-sm font-semibold">
                  {step.n}
                </div>
                <h3 className="mt-4 text-base font-semibold tracking-tight">{step.title}</h3>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{step.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

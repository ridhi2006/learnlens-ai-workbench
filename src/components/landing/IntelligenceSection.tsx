import { motion } from "motion/react";

import { Reveal, SectionLabel } from "@/components/common/primitives";

const stages = [
  { title: "Video Transcript", body: "We extract exactly what the instructor says, timestamp by timestamp." },
  { title: "Topic Understanding", body: "The transcript is broken down into the concepts actually being taught." },
  { title: "Semantic Retrieval", body: "Any question you ask is matched to the right moment in the video." },
  { title: "AI Tutor", body: "A tutor explains, quizzes or interviews you using that grounded understanding." },
  { title: "Learning Assessment", body: "Your quiz answers and conversations reveal what you truly understand." },
  { title: "Knowledge Gap Detection", body: "LearnLens compares what you know against what the video covers." },
  { title: "Personalized Roadmap", body: "The next best topic to study is recommended automatically." },
];

export function IntelligenceSection() {
  return (
    <section id="intelligence" className="py-24 md:py-32">
      <div className="mx-auto max-w-[1360px] px-5 md:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <SectionLabel>Learning intelligence</SectionLabel>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-balance md:text-4xl">
            The pipeline behind every session.
          </h2>
          <p className="text-muted-foreground mx-auto mt-3 max-w-xl text-sm">
            Nothing mysterious — just a clear chain of understanding from raw video to a plan for what to learn next.
          </p>
        </Reveal>

        <div className="relative mx-auto mt-16 max-w-xl">
          <div className="border-border-strong absolute top-0 bottom-0 left-5 border-l md:left-1/2" />
          <motion.div
            className="via-violet to-cyan absolute top-0 left-5 w-px origin-top bg-gradient-to-b from-transparent md:left-1/2"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
            style={{ height: "100%" }}
          />
          <div className="space-y-10">
            {stages.map((stage, i) => (
              <motion.div
                key={stage.title}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className="relative pl-14 md:mx-auto md:w-fit md:pl-0 md:text-center"
              >
                <span className="border-violet/40 bg-surface text-violet absolute top-0.5 left-2.5 flex h-6 w-6 items-center justify-center rounded-full border text-[10px] font-semibold md:static md:mx-auto md:mb-2">
                  {i + 1}
                </span>
                <h3 className="text-foreground text-sm font-semibold">{stage.title}</h3>
                <p className="text-muted-foreground mt-1 max-w-sm text-xs leading-relaxed md:mx-auto">
                  {stage.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Compass, MessageSquareText, Sparkles, Target, Waypoints } from "lucide-react";

import { Reveal, SectionLabel, ProgressBar, LearningStatusBadge } from "@/components/common/primitives";
import { summary, cheatSheet, quiz, transcript, timestampAnswers, coverage, recommendedNext } from "@/data/mockData";

/* ---------- F1: Knowledge graph ---------- */

const graphNodes = [
  { id: "root", label: "Binary Search", x: 50, y: 50 },
  { id: "space", label: "Search Space", x: 18, y: 20 },
  { id: "lower", label: "Lower Bound", x: 82, y: 18 },
  { id: "upper", label: "Upper Bound", x: 84, y: 72 },
  { id: "complexity", label: "Complexity", x: 18, y: 78 },
];
const graphEdges: [string, string][] = [
  ["root", "space"],
  ["root", "lower"],
  ["root", "upper"],
  ["root", "complexity"],
];

function KnowledgeGraphDemo() {
  const [active, setActive] = useState<string | null>(null);
  const activeNode = graphNodes.find((n) => n.id === active);
  const nodeById = (id: string) => graphNodes.find((n) => n.id === id)!;

  return (
    <div className="border-border bg-surface relative aspect-[5/4] w-full overflow-hidden rounded-[20px] border">
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        {graphEdges.map(([a, b]) => {
          const na = nodeById(a);
          const nb = nodeById(b);
          const connected = active === a || active === b;
          return (
            <line
              key={a + b}
              x1={na.x}
              y1={na.y}
              x2={nb.x}
              y2={nb.y}
              stroke="var(--brand-violet)"
              strokeOpacity={connected ? 0.7 : 0.2}
              strokeWidth={connected ? 0.6 : 0.35}
              className="transition-all duration-300"
            />
          );
        })}
      </svg>
      {graphNodes.map((n) => (
        <button
          key={n.id}
          type="button"
          onClick={() => setActive((a) => (a === n.id ? null : n.id))}
          style={{ left: `${n.x}%`, top: `${n.y}%` }}
          className={`absolute -translate-x-1/2 -translate-y-1/2 rounded-full border px-3 py-1.5 text-[11px] font-medium whitespace-nowrap transition-all duration-200 focus-visible:ring-ring focus-visible:ring-2 focus-visible:outline-none ${
            n.id === "root"
              ? "bg-gradient-brand text-primary-foreground border-transparent"
              : active === n.id
                ? "border-primary/60 bg-primary/15 text-foreground"
                : "border-border bg-surface-2 text-foreground/85 hover:border-border-strong"
          }`}
        >
          {n.label}
        </button>
      ))}
      <AnimatePresence>
        {activeNode && activeNode.id !== "root" && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="border-border bg-surface-2/95 absolute bottom-3 left-3 right-3 rounded-xl border p-3 backdrop-blur-sm sm:w-56"
          >
            <p className="text-foreground text-xs font-semibold">{activeNode.label}</p>
            <div className="text-muted-foreground mt-2 space-y-1 text-[11px]">
              <p>Explore concepts</p>
              <p>Jump to timestamps</p>
              <p>Ask AI</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ---------- F2: Ask any timestamp ---------- */

function TimestampDemo() {
  const answer = timestampAnswers["17:32"]!;
  const excerpt = transcript.filter((t) => ["14:05", "17:32", "21:15"].includes(t.time));
  return (
    <div className="border-border bg-surface grid gap-0 overflow-hidden rounded-[20px] border sm:grid-cols-[1.3fr_1fr]">
      <div className="p-5">
        <span className="bg-primary/15 text-primary inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold">
          17:32
        </span>
        <p className="text-foreground mt-3 text-sm font-medium">What exactly is being explained here?</p>
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="border-border bg-surface-2 text-muted-foreground mt-3 rounded-xl border p-3 text-xs leading-relaxed"
        >
          {answer.answer}
          <p className="text-muted-foreground/70 mt-2 text-[10px] tracking-wide uppercase">{answer.source}</p>
        </motion.div>
      </div>
      <div className="border-border bg-surface-2/40 scrollbar-slim max-h-72 overflow-y-auto border-t p-4 sm:border-t-0 sm:border-l">
        <p className="text-muted-foreground text-[11px] font-semibold tracking-wide uppercase">Transcript</p>
        <div className="mt-3 space-y-3">
          {excerpt.map((row) => (
            <div key={row.time} className={row.time === "17:32" ? "text-foreground" : "text-muted-foreground"}>
              <span className="text-[10px] font-semibold tracking-wide">{row.time}</span>
              <p className="text-xs leading-relaxed">{row.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- F3: Study material tabs ---------- */

const studyTabs = ["Summary", "Cheat Sheet", "Quiz", "PDF Notes"] as const;

function StudyMaterialDemo() {
  const [tab, setTab] = useState<(typeof studyTabs)[number]>("Summary");
  return (
    <div className="border-border bg-surface overflow-hidden rounded-[20px] border">
      <div className="border-border flex overflow-x-auto border-b px-2">
        {studyTabs.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className="relative shrink-0 px-4 py-3 text-xs font-medium whitespace-nowrap"
          >
            <span className={t === tab ? "text-foreground" : "text-muted-foreground"}>{t}</span>
            {t === tab && (
              <motion.div
                layoutId="study-tab-indicator"
                className="bg-gradient-brand absolute inset-x-2 bottom-0 h-[2px] rounded-full"
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              />
            )}
          </button>
        ))}
      </div>
      <div className="min-h-[220px] p-5">
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
          >
            {tab === "Summary" && (
              <ul className="text-muted-foreground space-y-2 text-xs leading-relaxed">
                {summary.keyIdeas.slice(0, 4).map((idea) => (
                  <li key={idea} className="flex gap-2">
                    <span className="text-violet">—</span>
                    {idea}
                  </li>
                ))}
              </ul>
            )}
            {tab === "Cheat Sheet" && (
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {cheatSheet.slice(0, 6).map((c) => (
                  <div key={c.label} className="border-border bg-surface-2 rounded-lg border p-2.5">
                    <p className="text-muted-foreground text-[10px] font-semibold tracking-wide uppercase">
                      {c.label}
                    </p>
                    <p className="text-foreground mt-0.5 font-mono text-xs">{c.value}</p>
                  </div>
                ))}
              </div>
            )}
            {tab === "Quiz" && (
              <div>
                <p className="text-foreground text-sm font-medium">{quiz[0]!.question}</p>
                <div className="mt-3 space-y-1.5">
                  {quiz[0]!.options.map((opt, i) => (
                    <div
                      key={opt}
                      className={`rounded-lg border px-3 py-2 text-xs ${
                        i === quiz[0]!.correct
                          ? "border-success/40 bg-success/10 text-foreground"
                          : "border-border text-muted-foreground"
                      }`}
                    >
                      {opt}
                    </div>
                  ))}
                </div>
              </div>
            )}
            {tab === "PDF Notes" && (
              <ul className="text-muted-foreground space-y-2 font-mono text-xs leading-relaxed">
                {["revisionNotes"].map(() => null)}
                {["Sorted input → halve the range → O(log n).", "mid = left + (right - left) / 2.", "lowerBound: arr[i] >= target. upperBound: arr[i] > target."].map(
                  (n) => (
                    <li key={n}>{n}</li>
                  ),
                )}
              </ul>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ---------- F4: AI tutor modes ---------- */

const tutorModes = ["Learn", "Ask", "Interview"] as const;

function TutorDemo() {
  const [mode, setMode] = useState<(typeof tutorModes)[number]>("Interview");
  return (
    <div className="border-border bg-surface overflow-hidden rounded-[20px] border p-5">
      <div className="border-border bg-surface-2 relative inline-flex rounded-full border p-1">
        {tutorModes.map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => setMode(m)}
            className="relative rounded-full px-3.5 py-1.5 text-xs font-medium"
          >
            {mode === m && (
              <motion.div
                layoutId="tutor-mode-indicator"
                className="bg-gradient-brand absolute inset-0 rounded-full"
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              />
            )}
            <span className={`relative z-10 ${mode === m ? "text-primary-foreground" : "text-muted-foreground"}`}>
              {m}
            </span>
          </button>
        ))}
      </div>

      <div className="mt-5 space-y-3">
        <div className="border-border bg-surface-2 max-w-[90%] rounded-xl rounded-tl-sm border px-3 py-2.5 text-xs">
          Why is Binary Search O(log n)?
        </div>
        <div className="bg-primary/15 ml-auto max-w-[90%] rounded-xl rounded-tr-sm px-3 py-2.5 text-xs">
          Because each comparison discards half of the remaining elements.
        </div>
        <div className="border-success/30 bg-success/10 rounded-xl border px-3 py-2.5 text-xs">
          <span className="text-success font-semibold">Good start —</span>{" "}
          <span className="text-muted-foreground">
            now connect the number of halvings to log₂(n) to make the bound explicit.
          </span>
        </div>
      </div>
    </div>
  );
}

/* ---------- F5: Knowledge gaps ---------- */

function GapsDemo() {
  return (
    <div className="border-border bg-surface grid gap-4 rounded-[20px] border p-5 sm:grid-cols-3">
      <div>
        <p className="text-success mb-2 text-[11px] font-semibold tracking-wide uppercase">Mastered</p>
        <ul className="space-y-1.5">
          {coverage.mastered.slice(0, 3).map((c) => (
            <li key={c} className="text-foreground/85 text-xs">
              {c}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <p className="text-warning mb-2 text-[11px] font-semibold tracking-wide uppercase">Weak</p>
        <ul className="space-y-1.5">
          {coverage.weak.map((c) => (
            <li key={c} className="text-foreground/85 text-xs">
              {c}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <p className="text-muted-foreground mb-2 text-[11px] font-semibold tracking-wide uppercase">Not covered</p>
        <ul className="space-y-1.5">
          {coverage.notCovered.slice(0, 3).map((c) => (
            <li key={c} className="text-muted-foreground text-xs">
              {c}
            </li>
          ))}
        </ul>
      </div>
      <div className="border-border bg-surface-2/60 col-span-full flex items-center gap-3 rounded-xl border p-3">
        <Target className="text-violet h-4 w-4 shrink-0" />
        <p className="text-xs">
          <span className="text-muted-foreground">Recommended next step:</span>{" "}
          <span className="text-foreground font-medium">{recommendedNext.title}</span>
        </p>
      </div>
    </div>
  );
}

/* ---------- Row wrapper ---------- */

const rows = [
  {
    icon: Waypoints,
    eyebrow: "Interactive Knowledge Graph",
    title: "See how every concept connects.",
    body: "Every video becomes a living map of concepts. Click a node to see its definition, jump to the moment it's taught, or ask the tutor about it directly.",
    Demo: KnowledgeGraphDemo,
  },
  {
    icon: MessageSquareText,
    eyebrow: "Ask Any Timestamp",
    title: "Never lose your place to a doubt again.",
    body: "Ask about a specific moment and get an answer grounded in the actual transcript — not a generic explanation.",
    Demo: TimestampDemo,
  },
  {
    icon: Sparkles,
    eyebrow: "Intelligent Study Material",
    title: "Summaries, cheat sheets and quizzes, generated.",
    body: "LearnLens reads the video the way a great student would — then writes the notes so you don't have to.",
    Demo: StudyMaterialDemo,
  },
  {
    icon: Compass,
    eyebrow: "Adaptive AI Tutor",
    title: "A tutor that teaches, quizzes, or interviews you.",
    body: "Switch modes depending on what you need: a patient explainer, a Socratic questioner, or a mock interviewer.",
    Demo: TutorDemo,
  },
  {
    icon: Target,
    eyebrow: "Knowledge Gaps + Roadmap",
    title: "Know exactly what to study next.",
    body: "LearnLens tracks what you've mastered, what's shaky, and what hasn't been covered — then recommends the next topic.",
    Demo: GapsDemo,
  },
];

export function FeatureShowcase() {
  return (
    <section id="features" className="py-24 md:py-32">
      <div className="mx-auto max-w-[1360px] px-5 md:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <SectionLabel>Features</SectionLabel>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-balance md:text-4xl">
            Everything you need to actually understand a video.
          </h2>
        </Reveal>

        <div className="mt-20 space-y-24 md:space-y-32">
          {rows.map((row, i) => {
            const Icon = row.icon;
            const Demo = row.Demo;
            const reversed = i % 2 === 1;
            return (
              <div
                key={row.eyebrow}
                className={`grid items-center gap-10 md:grid-cols-2 md:gap-16 ${reversed ? "md:[&>*:first-child]:order-2" : ""}`}
              >
                <Reveal>
                  <div className="border-border bg-surface text-violet mb-4 inline-flex h-9 w-9 items-center justify-center rounded-xl border">
                    <Icon className="h-4.5 w-4.5" />
                  </div>
                  <p className="text-violet text-xs font-semibold tracking-[0.14em] uppercase">{row.eyebrow}</p>
                  <h3 className="mt-2 text-2xl font-semibold tracking-tight text-balance md:text-3xl">{row.title}</h3>
                  <p className="text-muted-foreground mt-3 max-w-md text-sm leading-relaxed">{row.body}</p>
                </Reveal>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Demo />
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

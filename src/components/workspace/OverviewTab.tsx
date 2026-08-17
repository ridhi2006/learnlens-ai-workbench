import { useState } from "react";
import { motion } from "motion/react";
import { BookOpen, Brain, ListChecks, Pause, Play, Sparkles } from "lucide-react";

import { cn } from "@/lib/utils";
import { ConceptChip, SectionLabel } from "@/components/common/primitives";
import { concepts, summary, type VideoSession } from "@/data/mockData";
import { useWorkspace } from "./workspace-context";

const chapterTicks = [0, 18, 32, 48, 68, 82, 100];

export function OverviewTab({ video }: { video: VideoSession }) {
  const { setTab, openConcept } = useWorkspace();
  const [playing, setPlaying] = useState(false);
  const [progress] = useState(31);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[62fr_38fr]">
        <div className="space-y-3">
          <div className={cn("relative aspect-video overflow-hidden rounded-2xl bg-gradient-to-br", video.thumbClass)}>
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                type="button"
                onClick={() => setPlaying((p) => !p)}
                className="bg-background/30 text-foreground hover:bg-background/45 flex h-16 w-16 items-center justify-center rounded-full border border-white/20 backdrop-blur-md transition-colors"
                aria-label={playing ? "Pause" : "Play"}
              >
                {playing ? <Pause className="h-6 w-6" /> : <Play className="ml-1 h-6 w-6" />}
              </button>
            </div>
            {playing && (
              <motion.div
                className="bg-foreground/40 absolute top-3 right-3 h-2 w-2 rounded-full"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ repeat: Infinity, duration: 1.4 }}
              />
            )}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/70 to-transparent p-4">
              <div className="relative h-1.5 w-full rounded-full bg-foreground/20">
                <div className="bg-gradient-brand absolute inset-y-0 left-0 rounded-full" style={{ width: `${progress}%` }} />
                {chapterTicks.map((t) => (
                  <span key={t} className="bg-background/70 absolute top-1/2 h-2.5 w-0.5 -translate-y-1/2 rounded-full" style={{ left: `${t}%` }} />
                ))}
              </div>
              <div className="text-foreground/80 mt-2 flex items-center justify-between text-[11px] tabular-nums">
                <span>14:05</span>
                <span>{video.duration}</span>
              </div>
            </div>
          </div>

          <div className="border-border bg-surface/60 flex flex-wrap items-center justify-between gap-3 rounded-2xl border p-5">
            <div>
              <h3 className="text-sm font-semibold">Continue Learning</h3>
              <p className="text-muted-foreground mt-0.5 text-xs">Pick up where you left off — notes, quiz or the concept map.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setTab("notes")}
                className="border-border bg-surface hover:border-border-strong rounded-[10px] border px-3 py-1.5 text-xs font-medium transition-colors"
              >
                Open Notes
              </button>
              <button
                type="button"
                onClick={() => setTab("quiz")}
                className="border-border bg-surface hover:border-border-strong rounded-[10px] border px-3 py-1.5 text-xs font-medium transition-colors"
              >
                Take Quiz
              </button>
              <button
                type="button"
                onClick={() => setTab("graph")}
                className="bg-gradient-brand text-primary-foreground rounded-[10px] px-3 py-1.5 text-xs font-medium"
              >
                Explore Graph
              </button>
            </div>
          </div>
        </div>

        <div className="border-border bg-surface/50 space-y-6 rounded-2xl border p-5">
          <div>
            <SectionLabel>AI Summary</SectionLabel>
            <p className="text-foreground/90 mt-2 text-sm leading-relaxed">{summary.overview}</p>
          </div>

          <div>
            <SectionLabel>Key Concepts</SectionLabel>
            <div className="mt-2.5 flex flex-wrap gap-2">
              {concepts.slice(0, 7).map((c) => (
                <ConceptChip key={c.id} label={c.label} status={c.status} onClick={() => openConcept(c.id)} />
              ))}
            </div>
          </div>

          <div>
            <SectionLabel>Video Intelligence</SectionLabel>
            <div className="mt-2.5 grid grid-cols-2 gap-2.5">
              {[
                { icon: Brain, label: "Concepts detected", value: "7" },
                { icon: BookOpen, label: "Examples", value: "2" },
                { icon: ListChecks, label: "Algorithms", value: "1" },
                { icon: Sparkles, label: "Level", value: "Intermediate" },
              ].map((s) => (
                <div key={s.label} className="border-border bg-surface rounded-xl border p-3">
                  <s.icon className="text-primary h-3.5 w-3.5" />
                  <div className="mt-1.5 text-sm font-semibold">{s.value}</div>
                  <div className="text-muted-foreground text-[11px]">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

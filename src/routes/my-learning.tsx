import { useEffect, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { BrainCircuit, Sparkles, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

import { AppLayout } from "@/layouts/AppLayout";
import {
  PageHeader,
  ProgressBar,
  SectionLabel,
  SkeletonCard,
  EmptyState,
  Reveal,
} from "@/components/common/primitives";
import { KnowledgeMap } from "@/components/learning/KnowledgeMap";
import { knowledgeAreas, recentlyMastered, revisionNeeded } from "@/data/mockData";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/my-learning")({
  head: () => ({
    meta: [
      { title: "My Learning — LearnLens AI" },
      { name: "description", content: "See what you've mastered, what you're learning and what needs attention across every video." },
      { property: "og:title", content: "My Learning — LearnLens AI" },
      { property: "og:description", content: "See what you've mastered, what you're learning and what needs attention across every video." },
    ],
  }),
  component: MyLearningPage,
});

function toneFor(value: number): "success" | "brand" | "warning" {
  if (value >= 75) return "success";
  if (value >= 45) return "brand";
  return "warning";
}

function MyLearningPage() {
  const [loading, setLoading] = useState(true);
  const hasData = knowledgeAreas.length > 0;

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(t);
  }, []);

  return (
    <AppLayout title="My Learning">
      <div className="space-y-10">
        <PageHeader
          title="My Learning"
          subtitle="See what you've mastered, what you're learning and what needs attention."
        />

        {loading ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : !hasData ? (
          <EmptyState
            icon={<BrainCircuit className="h-5 w-5" />}
            title="No knowledge map yet"
            description="LearnLens will build your knowledge map as you study."
          />
        ) : (
          <>
            <section className="space-y-4">
              <SectionLabel>Knowledge Overview</SectionLabel>
              <div className="border-border bg-surface/50 rounded-2xl border p-5">
                <h3 className="text-sm font-medium">Data Structures &amp; Algorithms</h3>
                <div className="mt-4 space-y-4">
                  {knowledgeAreas.map((area, i) => (
                    <Reveal key={area.topic} delay={i * 0.04}>
                      <div className="space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-foreground/90">{area.topic}</span>
                          <span className="text-muted-foreground tabular-nums">{area.value}%</span>
                        </div>
                        <ProgressBar value={area.value} tone={toneFor(area.value)} height={5} label={area.topic} />
                      </div>
                    </Reveal>
                  ))}
                </div>
              </div>
            </section>

            <section className="space-y-4">
              <SectionLabel>Your Knowledge Map</SectionLabel>
              <KnowledgeMap />
            </section>

            <div className="grid gap-8 lg:grid-cols-2">
              <section className="space-y-4">
                <SectionLabel>Recently Mastered</SectionLabel>
                <div className="grid gap-3 sm:grid-cols-2">
                  {recentlyMastered.map((item) => (
                    <div
                      key={item.title}
                      className="border-border bg-surface/50 flex items-start gap-2.5 rounded-2xl border p-4"
                    >
                      <Sparkles className="text-success mt-0.5 h-4 w-4 shrink-0" />
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium">{item.title}</p>
                        <p className="text-muted-foreground text-xs">{item.when}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section className="space-y-4">
                <SectionLabel>Revision Needed</SectionLabel>
                <div className="space-y-3">
                  {revisionNeeded.map((item) => (
                    <div
                      key={item.title}
                      className="border-warning/30 bg-warning/5 flex items-center justify-between gap-3 rounded-2xl border p-4"
                    >
                      <div className="flex items-start gap-2.5">
                        <AlertTriangle className="text-warning mt-0.5 h-4 w-4 shrink-0" />
                        <div>
                          <p className="text-sm font-medium">{item.title}</p>
                          <p className="text-muted-foreground text-xs">Last score: {item.score}%</p>
                        </div>
                      </div>
                      <motion.div whileTap={{ scale: 0.96 }}>
                        <Link
                          to="/learn/$videoId"
                          params={{ videoId: "binary-search" }}
                          onClick={() => toast.info(`Revising ${item.title}`)}
                          className={cn(
                            "border-warning/40 text-warning hover:bg-warning/10 inline-flex shrink-0 items-center justify-center rounded-[10px] border px-3 py-1.5 text-xs font-medium transition-colors",
                          )}
                        >
                          Revise
                        </Link>
                      </motion.div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </>
        )}
      </div>
    </AppLayout>
  );
}

import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { ArrowRight, Flame, Layers, Sparkles, TrendingUp, AlertTriangle } from "lucide-react";
import { toast } from "sonner";

import { AppLayout } from "@/layouts/AppLayout";
import {
  MetricCard,
  ProgressRing,
  Reveal,
  SectionLabel,
  SkeletonCard,
} from "@/components/common/primitives";
import { VideoCard } from "@/components/dashboard/VideoCard";
import { DashboardEmptyState } from "@/components/dashboard/DashboardEmptyState";
import { Button } from "@/components/ui/button";
import { user, videos, weakTopics, recommendedNext } from "@/data/mockData";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Dashboard — LearnLens AI" },
      {
        name: "description",
        content: "Track your learning progress, continue videos and review weak topics on your LearnLens dashboard.",
      },
      { property: "og:title", content: "Dashboard — LearnLens AI" },
      {
        property: "og:description",
        content: "See your learning statistics, recent videos and recommended next steps.",
      },
    ],
  }),
  component: DashboardPage,
});

function useGreeting() {
  const [greeting, setGreeting] = useState("Good day");
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 18) setGreeting("Good afternoon");
    else setGreeting("Good evening");
  }, []);
  return greeting;
}

const hasSessions = true;

function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const greeting = useGreeting();
  const navigate = useNavigate();
  const featured = videos[0]!;
  const recent = videos.slice(1, 5);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(t);
  }, []);

  const metrics = [
    { label: "Videos Analyzed", value: user.stats.videosAnalyzed, icon: <Layers className="h-3.5 w-3.5" /> },
    { label: "Concepts Learned", value: user.stats.conceptsLearned, icon: <Sparkles className="h-3.5 w-3.5" /> },
    { label: "Quiz Average", value: user.stats.quizAverage, suffix: "%", icon: <TrendingUp className="h-3.5 w-3.5" /> },
    { label: "Current Streak", value: user.stats.streak, suffix: " days", icon: <Flame className="h-3.5 w-3.5" /> },
  ];

  return (
    <AppLayout title="Dashboard">
      <div className="mx-auto max-w-[1440px] space-y-8">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="space-y-1.5">
              <h1 className="text-2xl font-semibold tracking-tight">
                {greeting}, {user.name}
              </h1>
              <p className="text-muted-foreground text-sm">Ready to continue learning?</p>
            </div>
            <Button asChild>
              <Link to="/analyze">
                Analyze New Video <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </Reveal>

        {!hasSessions ? (
          <DashboardEmptyState />
        ) : (
          <AnimatePresence mode="wait">
            {loading ? (
              <motion.div key="loading" exit={{ opacity: 0 }} className="space-y-8">
                <SkeletonCard lines={4} className="h-56" />
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <SkeletonCard key={i} lines={2} />
                  ))}
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <SkeletonCard key={i} lines={4} />
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="space-y-8"
              >
                {/* Continue Learning */}
                <section className="space-y-3">
                  <SectionLabel>Continue Learning</SectionLabel>
                  <div className="border-border bg-surface/70 relative overflow-hidden rounded-[20px] border p-6">
                    <div className="from-violet/10 via-indigo/5 to-cyan/10 pointer-events-none absolute inset-0 bg-gradient-to-br" />
                    <div className="relative flex flex-col gap-6 md:flex-row md:items-center">
                      <div
                        className={`hidden aspect-video w-56 shrink-0 rounded-2xl bg-gradient-to-br md:block ${featured.thumbClass}`}
                      />
                      <div className="min-w-0 flex-1 space-y-2">
                        <p className="text-muted-foreground text-xs">{featured.creator}</p>
                        <h2 className="text-lg font-semibold tracking-tight">{featured.title}</h2>
                        <div className="text-muted-foreground flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
                          <span>Last studied: {featured.lastStudied}</span>
                          <span>{featured.conceptCount} concepts</span>
                        </div>
                        <div className="pt-2">
                          <Button asChild>
                            <Link to="/learn/$videoId" params={{ videoId: featured.id }}>
                              Continue Learning <ArrowRight className="h-4 w-4" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                      <div className="flex shrink-0 items-center justify-center">
                        <ProgressRing value={featured.progress} size={92}>
                          <span className="text-lg font-semibold tabular-nums">{featured.progress}%</span>
                        </ProgressRing>
                      </div>
                    </div>
                  </div>
                </section>

                {/* Statistics */}
                <section className="space-y-3">
                  <SectionLabel>Learning Statistics</SectionLabel>
                  <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                    {metrics.map((m) => (
                      <MetricCard key={m.label} label={m.label} value={m.value} {...(m.suffix ? { suffix: m.suffix } : {})} icon={m.icon} />
                    ))}
                  </div>
                </section>

                {/* Recent Learning */}
                <section className="space-y-3">
                  <div className="flex items-center justify-between">
                    <SectionLabel>Recent Learning</SectionLabel>
                    <Link to="/my-learning" className="text-primary text-xs font-medium hover:underline">
                      View all
                    </Link>
                  </div>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    {recent.map((v) => (
                      <VideoCard key={v.id} video={v} />
                    ))}
                  </div>
                </section>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                  {/* Weak Topics */}
                  <section className="space-y-3">
                    <SectionLabel>Weak Topics</SectionLabel>
                    <div className="border-warning/30 bg-warning/5 rounded-2xl border p-5">
                      <div className="flex items-start gap-3">
                        <div className="bg-warning/15 text-warning flex h-8 w-8 shrink-0 items-center justify-center rounded-lg">
                          <AlertTriangle className="h-4 w-4" />
                        </div>
                        <div className="min-w-0 flex-1 space-y-3">
                          <p className="text-sm">These concepts could use another pass.</p>
                          <ul className="space-y-2">
                            {weakTopics.map((t) => (
                              <li key={t} className="flex items-center justify-between text-sm">
                                <span>{t}</span>
                                <span className="text-warning text-xs font-medium">Needs work</span>
                              </li>
                            ))}
                          </ul>
                          <Button variant="outline" size="sm" asChild>
                            <Link to="/my-learning">Review Weak Topics</Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </section>

                  {/* Recommended Next */}
                  <section className="space-y-3">
                    <SectionLabel>Recommended Next</SectionLabel>
                    <div className="border-primary/30 bg-surface/70 relative overflow-hidden rounded-2xl border p-5">
                      <div className="from-violet/10 via-indigo/5 to-cyan/10 pointer-events-none absolute inset-0 bg-gradient-to-br" />
                      <p className="text-primary text-[11px] font-semibold tracking-wide uppercase">Recommended next</p>
                      <h3 className="mt-1.5 text-base font-semibold">{recommendedNext.title}</h3>
                      <p className="text-muted-foreground mt-1 text-xs">{recommendedNext.reason}</p>
                      <Button
                        className="mt-4"
                        size="sm"
                        onClick={() => {
                          toast.success("Continuing your learning path");
                          navigate({ to: "/learn/$videoId", params: { videoId: "binary-search" } });
                        }}
                      >
                        Start Learning <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </section>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    </AppLayout>
  );
}

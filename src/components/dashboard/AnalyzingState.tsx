import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { AlertTriangle, Check, RotateCcw, Youtube } from "lucide-react";

import { Button } from "@/components/ui/button";
import { analyzingStages, analyzingInsights, videoById } from "@/data/mockData";

const STAGE_DURATION = 900; // ms per stage, 5 stages ~ 4.5s

export function AnalyzingState({
  hasError,
  onComplete,
  onRetry,
  onChooseAnother,
}: {
  hasError: boolean;
  onComplete: () => void;
  onRetry: () => void;
  onChooseAnother: () => void;
}) {
  const [stageIndex, setStageIndex] = useState(0);
  const [insightIndex, setInsightIndex] = useState(0);
  const video = videoById("binary-search");

  useEffect(() => {
    if (hasError) return;
    if (stageIndex >= analyzingStages.length) {
      const t = setTimeout(onComplete, 500);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setStageIndex((i) => i + 1), STAGE_DURATION);
    return () => clearTimeout(t);
  }, [stageIndex, hasError, onComplete]);

  useEffect(() => {
    if (hasError) return;
    const t = setInterval(() => {
      setInsightIndex((i) => (i + 1) % analyzingInsights.length);
    }, 1400);
    return () => clearInterval(t);
  }, [hasError]);

  const progressPct = (Math.min(stageIndex, analyzingStages.length) / analyzingStages.length) * 100;

  if (hasError) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center py-16 text-center">
        <div className="bg-warning/10 text-warning mb-5 flex h-12 w-12 items-center justify-center rounded-2xl">
          <AlertTriangle className="h-5 w-5" />
        </div>
        <h2 className="text-lg font-semibold">Transcript unavailable</h2>
        <p className="text-muted-foreground mt-2 text-sm">
          We couldn't access a transcript for this video.
        </p>
        <div className="mt-6 flex items-center gap-3">
          <Button variant="outline" onClick={onChooseAnother}>
            Choose another video
          </Button>
          <Button onClick={onRetry}>
            <RotateCcw className="h-4 w-4" /> Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative mx-auto max-w-xl overflow-hidden py-10">
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-70">
        <div className="bg-violet/20 animate-drift absolute top-6 left-8 h-24 w-24 rounded-full blur-3xl" />
        <div className="bg-cyan/20 animate-drift absolute right-8 bottom-6 h-28 w-28 rounded-full blur-3xl [animation-delay:3s]" />
      </div>

      <div className="text-center">
        <h2 className="text-lg font-semibold">Building your learning space</h2>
        <AnimatePresence mode="wait">
          <motion.p
            key={insightIndex}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.25 }}
            className="text-muted-foreground mt-1.5 text-sm"
          >
            {analyzingInsights[insightIndex]}
          </motion.p>
        </AnimatePresence>
      </div>

      <div className="bg-foreground/8 mt-8 h-1.5 w-full overflow-hidden rounded-full">
        <motion.div
          className="bg-gradient-brand h-full rounded-full"
          animate={{ width: `${progressPct}%` }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      <ul className="border-border bg-surface/60 mt-6 space-y-1 rounded-2xl border p-4">
        {analyzingStages.map((stage, i) => {
          const state = i < stageIndex ? "done" : i === stageIndex ? "active" : "pending";
          return (
            <li key={stage} className="flex items-center gap-3 rounded-lg px-2 py-2 text-sm">
              <span
                className={
                  state === "done"
                    ? "bg-success/15 text-success flex h-5 w-5 items-center justify-center rounded-full"
                    : state === "active"
                      ? "bg-primary/15 text-primary relative flex h-5 w-5 items-center justify-center rounded-full"
                      : "text-muted-foreground border-border flex h-5 w-5 items-center justify-center rounded-full border"
                }
              >
                {state === "done" && <Check className="h-3 w-3" />}
                {state === "active" && (
                  <motion.span
                    className="bg-primary h-1.5 w-1.5 rounded-full"
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 1.1, repeat: Infinity }}
                  />
                )}
                {state === "pending" && <span className="h-1.5 w-1.5 rounded-full bg-current opacity-40" />}
              </span>
              <span className={state === "pending" ? "text-muted-foreground" : ""}>{stage}</span>
              {stage === "Video detected" && state === "done" && video && (
                <span className="text-muted-foreground ml-auto truncate text-xs">
                  <Youtube className="mr-1 inline h-3 w-3" />
                  {video.title}
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

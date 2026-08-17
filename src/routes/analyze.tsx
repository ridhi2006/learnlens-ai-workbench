import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { Youtube, Sparkles, Check } from "lucide-react";
import { toast } from "sonner";

import { AppLayout } from "@/layouts/AppLayout";
import { AnalyzingState } from "@/components/dashboard/AnalyzingState";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useApp } from "@/context/app-context";
import { learningModes } from "@/data/mockData";

export const Route = createFileRoute("/analyze")({
  head: () => ({
    meta: [
      { title: "Analyze a Video — LearnLens AI" },
      {
        name: "description",
        content: "Paste a YouTube video link and let LearnLens build a personalized learning workspace for it.",
      },
      { property: "og:title", content: "Analyze a Video — LearnLens AI" },
      {
        property: "og:description",
        content: "Turn any educational YouTube video into a summary, quiz, knowledge graph and tutor.",
      },
    ],
  }),
  component: AnalyzePage,
});

const SAMPLE_URLS = [
  { label: "Binary Search Tutorial", url: "https://www.youtube.com/watch?v=8bH4x1QoIQU" },
  { label: "Broken transcript demo", url: "https://www.youtube.com/watch?v=notranscript123" },
];

const YT_REGEX = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)[\w-]+/i;

function AnalyzePage() {
  const { learningMode, setLearningMode } = useApp();
  const navigate = useNavigate();
  const [url, setUrl] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [phase, setPhase] = useState<"form" | "analyzing">("form");
  const [hasTranscriptError, setHasTranscriptError] = useState(false);

  function startAnalysis() {
    if (!YT_REGEX.test(url.trim())) {
      setError("That doesn't look like a valid YouTube video.");
      return;
    }
    setError(null);
    setHasTranscriptError(url.includes("notranscript"));
    setPhase("analyzing");
  }

  function handleComplete() {
    toast.success("Your learning space is ready");
    navigate({ to: "/learn/$videoId", params: { videoId: "binary-search" } });
  }

  return (
    <AppLayout title="Analyze a video" showSearch={false}>
      <div className="mx-auto max-w-3xl py-6">
        <AnimatePresence mode="wait">
          {phase === "form" ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-10"
            >
              <div className="space-y-8 text-center">
                <div className="space-y-2">
                  <h1 className="text-2xl font-semibold tracking-tight">
                    What do you want to learn today?
                  </h1>
                  <p className="text-muted-foreground mx-auto max-w-xl text-sm">
                    Paste an educational YouTube video and let LearnLens build your learning workspace.
                  </p>
                </div>

                <div className="mx-auto max-w-xl space-y-2 text-left">
                  <div
                    className={cn(
                      "border-border bg-surface flex items-center gap-3 rounded-[10px] border px-4 py-3 focus-within:ring-1 focus-within:ring-ring",
                      error && "border-destructive/50",
                    )}
                  >
                    <Youtube className="text-muted-foreground h-5 w-5 shrink-0" />
                    <Input
                      value={url}
                      onChange={(e) => {
                        setUrl(e.target.value);
                        if (error) setError(null);
                      }}
                      onKeyDown={(e) => e.key === "Enter" && startAnalysis()}
                      placeholder="https://www.youtube.com/watch?v=..."
                      aria-label="YouTube video URL"
                      className="h-auto border-0 bg-transparent p-0 shadow-none focus-visible:ring-0"
                    />
                  </div>
                  {error && <p className="text-destructive text-xs">{error}</p>}

                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <span className="text-muted-foreground text-xs">or try a sample:</span>
                    {SAMPLE_URLS.map((s) => (
                      <button
                        key={s.label}
                        type="button"
                        onClick={() => {
                          setUrl(s.url);
                          setError(null);
                        }}
                        className="border-border bg-surface/60 hover:border-primary/40 rounded-full border px-2.5 py-1 text-[11px] transition-colors"
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>

                  <Button className="mt-3 w-full" size="lg" onClick={startAnalysis} disabled={!url.trim()}>
                    <Sparkles className="h-4 w-4" /> Analyze Video
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-center text-sm font-medium">How should LearnLens teach you?</p>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {learningModes.map((mode) => {
                    const active = learningMode === mode.id;
                    return (
                      <button
                        key={mode.id}
                        type="button"
                        onClick={() => setLearningMode(mode.id)}
                        className={cn(
                          "relative rounded-2xl border p-4 text-left transition-colors duration-200",
                          active
                            ? "border-primary/50 bg-primary/10"
                            : "border-border bg-surface/60 hover:border-border-strong",
                        )}
                      >
                        {active && (
                          <motion.div
                            layoutId="mode-highlight"
                            className="border-primary/50 pointer-events-none absolute inset-0 rounded-2xl border-2"
                            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                          />
                        )}
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">{mode.label}</span>
                          {active && (
                            <span className="bg-primary text-primary-foreground flex h-4 w-4 items-center justify-center rounded-full">
                              <Check className="h-2.5 w-2.5" />
                            </span>
                          )}
                        </div>
                        <p className="text-muted-foreground mt-1 text-xs">{mode.description}</p>
                      </button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="analyzing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <AnalyzingState
                hasError={hasTranscriptError}
                onComplete={handleComplete}
                onRetry={() => {
                  setHasTranscriptError(false);
                  setPhase("form");
                }}
                onChooseAnother={() => {
                  setUrl("");
                  setHasTranscriptError(false);
                  setPhase("form");
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AppLayout>
  );
}

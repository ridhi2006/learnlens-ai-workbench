import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, Sparkles, Youtube } from "lucide-react";
import { toast } from "sonner";

import { HeroBackground } from "@/components/landing/HeroBackground";

const YOUTUBE_RE = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/shorts\/)[\w-]{6,}/i;

const headingWords = ["Stop", "Just", "Watching.", "Start", "Actually", "Learning."];

export function Hero() {
  const [url, setUrl] = useState("");
  const [error, setError] = useState<string | null>(null);
  const reduce = useReducedMotion();
  const navigate = useNavigate();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!YOUTUBE_RE.test(url.trim())) {
      setError("That doesn't look like a valid YouTube video.");
      return;
    }
    setError(null);
    toast.success("Video queued for analysis");
    navigate({ to: "/analyze" });
  }

  return (
    <section className="relative isolate overflow-hidden pt-36 pb-20 md:pt-44 md:pb-28">
      <HeroBackground />
      <div className="relative mx-auto max-w-[1360px] px-5 md:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="border-border bg-surface/70 text-muted-foreground mx-auto inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium backdrop-blur-sm"
          >
            <Sparkles className="text-violet h-3.5 w-3.5" />
            AI-Powered Learning Intelligence
          </motion.div>

          <h1 className="mt-6 text-[clamp(2.5rem,6vw,4.5rem)] leading-[1.04] font-semibold tracking-tight text-balance">
            {headingWords.map((word, i) => (
              <motion.span
                key={word + i}
                initial={reduce ? false : { opacity: 0, y: 18, filter: "blur(10px)" }}
                animate={reduce ? false : { opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.6, delay: 0.12 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                className="mr-[0.28em] inline-block last:mr-0"
              >
                {word}
              </motion.span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="text-muted-foreground mx-auto mt-6 max-w-2xl text-balance md:text-lg"
          >
            LearnLens transforms educational videos into summaries, smart notes, quizzes, knowledge graphs, AI
            tutoring and personalized learning paths.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 flex flex-wrap items-center justify-center gap-3"
          >
            <Link
              to="/analyze"
              className="bg-gradient-brand text-primary-foreground inline-flex items-center gap-2 rounded-[10px] px-5 py-2.5 text-sm font-medium transition-transform duration-200 hover:-translate-y-0.5"
            >
              Analyze a Video
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="#how-it-works"
              className="border-border-strong text-foreground hover:bg-foreground/5 inline-flex items-center gap-2 rounded-[10px] border px-5 py-2.5 text-sm font-medium transition-colors duration-200"
            >
              See How It Works
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.78, ease: [0.22, 1, 0.36, 1] }}
            className="border-border bg-surface/60 shadow-[var(--shadow-panel)] mx-auto mt-12 max-w-xl rounded-2xl border p-5 text-left backdrop-blur-sm"
          >
            <form onSubmit={handleSubmit} noValidate>
              <label htmlFor="hero-yt-url" className="text-muted-foreground text-xs font-medium">
                Paste a YouTube learning video
              </label>
              <div className="mt-2 flex flex-col gap-2 sm:flex-row">
                <div className="border-border bg-surface-2 focus-within:border-primary/50 flex flex-1 items-center gap-2 rounded-[10px] border px-3">
                  <Youtube className="text-muted-foreground h-4 w-4 shrink-0" aria-hidden="true" />
                  <input
                    id="hero-yt-url"
                    type="text"
                    inputMode="url"
                    value={url}
                    onChange={(e) => {
                      setUrl(e.target.value);
                      if (error) setError(null);
                    }}
                    placeholder="https://youtube.com/watch?v=..."
                    className="text-foreground placeholder:text-muted-foreground w-full bg-transparent py-2.5 text-sm outline-none"
                    aria-invalid={Boolean(error)}
                    aria-describedby={error ? "hero-yt-error" : undefined}
                  />
                </div>
                <button
                  type="submit"
                  className="bg-gradient-brand text-primary-foreground shrink-0 rounded-[10px] px-4 py-2.5 text-sm font-medium transition-transform duration-200 hover:-translate-y-0.5"
                >
                  Analyze
                </button>
              </div>
              {error && (
                <p id="hero-yt-error" role="alert" className="text-destructive mt-2 text-xs">
                  {error}
                </p>
              )}
            </form>
            <p className="text-muted-foreground mt-3 text-center text-xs sm:text-left">
              No installation required · Start learning in seconds
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

import { useState, type FormEvent } from "react";
import { useNavigate } from "@tanstack/react-router";
import { ArrowRight, Youtube } from "lucide-react";
import { toast } from "sonner";

import { Reveal } from "@/components/common/primitives";

const YOUTUBE_RE = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/shorts\/)[\w-]{6,}/i;

export function FinalCta() {
  const [url, setUrl] = useState("");
  const [error, setError] = useState<string | null>(null);
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
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-[1360px] px-5 md:px-8">
        <Reveal>
          <div className="border-border bg-surface relative overflow-hidden rounded-[20px] border px-6 py-16 text-center md:px-16">
            <div
              aria-hidden="true"
              className="grid-backdrop pointer-events-none absolute inset-0 opacity-[0.25] [mask-image:radial-gradient(60%_60%_at_50%_40%,black,transparent)]"
            />
            <div className="relative">
              <h2 className="mx-auto max-w-2xl text-3xl font-semibold tracking-tight text-balance md:text-4xl">
                Your next video can become your next mastered topic.
              </h2>

              <form onSubmit={handleSubmit} noValidate className="mx-auto mt-8 max-w-lg text-left">
                <div className="flex flex-col gap-2 sm:flex-row">
                  <div className="border-border bg-surface-2 focus-within:border-primary/50 flex flex-1 items-center gap-2 rounded-[10px] border px-3">
                    <Youtube className="text-muted-foreground h-4 w-4 shrink-0" aria-hidden="true" />
                    <input
                      type="text"
                      inputMode="url"
                      aria-label="Paste a YouTube learning video"
                      value={url}
                      onChange={(e) => {
                        setUrl(e.target.value);
                        if (error) setError(null);
                      }}
                      placeholder="https://youtube.com/watch?v=..."
                      className="text-foreground placeholder:text-muted-foreground w-full bg-transparent py-2.5 text-sm outline-none"
                      aria-invalid={Boolean(error)}
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-gradient-brand text-primary-foreground inline-flex shrink-0 items-center justify-center gap-2 rounded-[10px] px-5 py-2.5 text-sm font-medium transition-transform duration-200 hover:-translate-y-0.5"
                  >
                    Start Learning
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
                {error && (
                  <p role="alert" className="text-destructive mt-2 text-center text-xs sm:text-left">
                    {error}
                  </p>
                )}
              </form>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

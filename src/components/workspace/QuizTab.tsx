import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CheckCircle2, XCircle } from "lucide-react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { ProgressBar, ProgressRing } from "@/components/common/primitives";
import { quiz } from "@/data/mockData";
import { useApp } from "@/context/app-context";
import { useWorkspace } from "./workspace-context";

type Phase = "intro" | "generating" | "active" | "results";

export function QuizTab() {
  const { setQuizScore } = useApp();
  const { setTab } = useWorkspace();
  const [phase, setPhase] = useState<Phase>("intro");
  const [difficulty, setDifficulty] = useState<"Easy" | "Medium" | "Hard">("Medium");
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(quiz.length).fill(null));
  const [submitted, setSubmitted] = useState<boolean[]>(Array(quiz.length).fill(false));

  const question = quiz[index]!;
  const score = useMemo(() => answers.filter((a, i) => a === quiz[i]!.correct).length, [answers]);

  const weakConcepts = useMemo(() => {
    const wrong = new Set<string>();
    answers.forEach((a, i) => {
      if (a !== null && a !== quiz[i]!.correct) wrong.add(quiz[i]!.concept);
    });
    return Array.from(wrong);
  }, [answers]);

  const strongConcepts = useMemo(() => {
    const strong = new Set<string>();
    answers.forEach((a, i) => {
      if (a !== null && a === quiz[i]!.correct) strong.add(quiz[i]!.concept);
    });
    return Array.from(strong);
  }, [answers]);

  function startQuiz() {
    setPhase("generating");
    window.setTimeout(() => setPhase("active"), 1000);
  }

  function selectOption(optIndex: number) {
    if (submitted[index]) return;
    setAnswers((prev) => prev.map((a, i) => (i === index ? optIndex : a)));
  }

  function submitAnswer() {
    setSubmitted((prev) => prev.map((s, i) => (i === index ? true : s)));
  }

  function finish() {
    const finalScore = score || 7;
    setQuizScore(finalScore);
    setPhase("results");
    toast.success("Weak concept detected · Learning path updated");
  }

  return (
    <div className="space-y-5">
      <AnimatePresence mode="wait">
        {phase === "intro" && (
          <motion.div
            key="intro"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="border-border bg-surface/50 mx-auto max-w-lg space-y-5 rounded-2xl border p-8 text-center"
          >
            <h2 className="text-lg font-semibold">Test your understanding</h2>
            <p className="text-muted-foreground text-sm">10 questions · Estimated 6 min</p>
            <div className="border-border bg-surface-2 inline-flex gap-1 rounded-[10px] border p-1">
              {(["Easy", "Medium", "Hard"] as const).map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setDifficulty(d)}
                  className={cn(
                    "rounded-[8px] px-3.5 py-1.5 text-xs font-medium transition-colors",
                    difficulty === d ? "bg-gradient-brand text-primary-foreground" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {d}
                </button>
              ))}
            </div>
            <div>
              <button
                type="button"
                onClick={startQuiz}
                className="bg-gradient-brand text-primary-foreground rounded-[10px] px-6 py-2.5 text-sm font-medium"
              >
                Start Quiz
              </button>
            </div>
          </motion.div>
        )}

        {phase === "generating" && (
          <motion.div key="generating" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="mx-auto max-w-lg space-y-3 py-16 text-center">
            <p className="text-muted-foreground text-sm">Generating your quiz...</p>
            <div className="bg-foreground/10 mx-auto h-1.5 w-64 overflow-hidden rounded-full">
              <motion.div className="bg-gradient-brand h-full rounded-full" initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: 0.9 }} />
            </div>
          </motion.div>
        )}

        {phase === "active" && (
          <motion.div key={`q-${index}`} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }} className="mx-auto max-w-xl space-y-5">
            <div>
              <div className="text-muted-foreground mb-2 flex items-center justify-between text-xs font-medium">
                <span>Question {index + 1} of {quiz.length}</span>
                <span>{question.concept}</span>
              </div>
              <ProgressBar value={((index + 1) / quiz.length) * 100} />
            </div>

            <div className="border-border bg-surface/50 space-y-4 rounded-2xl border p-6">
              <h3 className="text-sm font-semibold leading-relaxed">{question.question}</h3>
              <div className="space-y-2">
                {question.options.map((opt, i) => {
                  const isSelected = answers[index] === i;
                  const isSubmitted = submitted[index];
                  const isCorrect = i === question.correct;
                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={() => selectOption(i)}
                      className={cn(
                        "border-border bg-surface hover:border-border-strong flex w-full items-center justify-between gap-2 rounded-[10px] border px-4 py-3 text-left text-sm transition-colors",
                        isSelected && !isSubmitted && "border-primary/60 bg-primary/10",
                        isSubmitted && isCorrect && "border-success/50 bg-success/10",
                        isSubmitted && isSelected && !isCorrect && "border-warning/50 bg-warning/10",
                      )}
                    >
                      {opt}
                      {isSubmitted && isCorrect && <CheckCircle2 className="text-success h-4 w-4 shrink-0" />}
                      {isSubmitted && isSelected && !isCorrect && <XCircle className="text-warning h-4 w-4 shrink-0" />}
                    </button>
                  );
                })}
              </div>

              {submitted[index] && (
                <div className="border-border bg-surface-2 rounded-xl border p-3.5 text-sm">{question.explanation}</div>
              )}

              <div className="flex items-center justify-between pt-1">
                <button
                  type="button"
                  disabled={index === 0}
                  onClick={() => setIndex((i) => Math.max(0, i - 1))}
                  className="text-muted-foreground hover:text-foreground disabled:opacity-30 text-xs font-medium"
                >
                  Previous
                </button>
                {!submitted[index] ? (
                  <button
                    type="button"
                    disabled={answers[index] === null}
                    onClick={submitAnswer}
                    className="bg-gradient-brand text-primary-foreground disabled:opacity-40 rounded-[10px] px-4 py-2 text-xs font-medium"
                  >
                    Submit
                  </button>
                ) : index < quiz.length - 1 ? (
                  <button
                    type="button"
                    onClick={() => setIndex((i) => i + 1)}
                    className="bg-gradient-brand text-primary-foreground rounded-[10px] px-4 py-2 text-xs font-medium"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={finish}
                    className="bg-gradient-brand text-primary-foreground rounded-[10px] px-4 py-2 text-xs font-medium"
                  >
                    See Results
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {phase === "results" && (
          <motion.div key="results" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mx-auto max-w-2xl space-y-6 text-center">
            <div className="flex justify-center">
              <ProgressRing value={((score || 7) / quiz.length) * 100}>
                <span className="text-2xl font-semibold">{score || 7}/{quiz.length}</span>
              </ProgressRing>
            </div>
            <div className="grid grid-cols-1 gap-4 text-left sm:grid-cols-2">
              <div className="border-border bg-surface/50 rounded-2xl border p-4">
                <h4 className="text-success mb-2 text-xs font-semibold tracking-wide uppercase">Strong</h4>
                <ul className="space-y-1 text-sm">
                  {(strongConcepts.length ? strongConcepts : ["Binary Search", "Time Complexity"]).map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </div>
              <div className="border-border bg-surface/50 rounded-2xl border p-4">
                <h4 className="text-warning mb-2 text-xs font-semibold tracking-wide uppercase">Needs Improvement</h4>
                <ul className="space-y-1 text-sm">
                  {(weakConcepts.length ? weakConcepts : ["Lower Bound", "Boundary Conditions"]).map((c) => (
                    <li key={c}>{c}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              <button type="button" onClick={() => setTab("path")} className="bg-gradient-brand text-primary-foreground rounded-[10px] px-4 py-2 text-xs font-medium">
                Improve Weak Topics
              </button>
              <button
                type="button"
                onClick={() => setPhase("active")}
                className="border-border bg-surface hover:border-border-strong rounded-[10px] border px-4 py-2 text-xs font-medium"
              >
                Review Answers
              </button>
              <button
                type="button"
                onClick={() => {
                  setPhase("intro");
                  setIndex(0);
                  setAnswers(Array(quiz.length).fill(null));
                  setSubmitted(Array(quiz.length).fill(false));
                }}
                className="border-border bg-surface hover:border-border-strong rounded-[10px] border px-4 py-2 text-xs font-medium"
              >
                Try Again
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

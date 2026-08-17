import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Play, Sparkles } from "lucide-react";

const tabs = ["Summary", "Transcript", "Quiz", "Roadmap"];

const nodes = [
  { id: "root", label: "Binary Search", x: 50, y: 46 },
  { id: "space", label: "Search Space", x: 14, y: 14 },
  { id: "lower", label: "Lower Bound", x: 82, y: 10 },
  { id: "upper", label: "Upper Bound", x: 86, y: 62 },
  { id: "complexity", label: "Complexity", x: 24, y: 82 },
];

const edges: [string, string][] = [
  ["root", "space"],
  ["root", "lower"],
  ["root", "upper"],
  ["root", "complexity"],
];

const nodeById = (id: string) => nodes.find((n) => n.id === id)!;

export function HeroVisual() {
  const [activeTab, setActiveTab] = useState(0);
  const [answerVisible, setAnswerVisible] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setActiveTab((v) => (v + 1) % tabs.length), 2600);
    const reveal = setTimeout(() => setAnswerVisible(true), 900);
    return () => {
      clearInterval(t);
      clearTimeout(reveal);
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 16 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="border-border bg-surface/70 shadow-[var(--shadow-panel)] mx-auto max-w-[1160px] overflow-hidden rounded-[20px] border backdrop-blur-sm"
    >
      <div className="border-border bg-surface-2/60 flex items-center gap-1.5 border-b px-4 py-3">
        <span className="bg-destructive/50 h-2.5 w-2.5 rounded-full" />
        <span className="bg-warning/50 h-2.5 w-2.5 rounded-full" />
        <span className="bg-success/50 h-2.5 w-2.5 rounded-full" />
        <span className="text-muted-foreground ml-3 text-xs">learnlens.ai/learn/binary-search</span>
      </div>

      <div className="grid gap-px md:grid-cols-[1fr_1.3fr_1fr]">
        {/* Video mock */}
        <div className="bg-surface p-4">
          <p className="text-muted-foreground text-[11px] font-semibold tracking-wide uppercase">Now Playing</p>
          <div className="border-border from-violet/25 via-indigo/15 to-cyan/20 relative mt-3 flex aspect-video items-center justify-center overflow-hidden rounded-xl border bg-gradient-to-br">
            <div className="bg-background/60 border-border flex h-9 w-9 items-center justify-center rounded-full border backdrop-blur-sm">
              <Play className="text-foreground ml-0.5 h-4 w-4" />
            </div>
          </div>
          <div className="mt-3">
            <div className="bg-foreground/10 h-1.5 w-full overflow-hidden rounded-full">
              <div className="bg-gradient-brand h-full w-[38%] rounded-full" />
            </div>
            <div className="text-muted-foreground mt-1.5 flex justify-between text-[11px]">
              <span>17:32</span>
              <span>46:00</span>
            </div>
          </div>
          <p className="text-foreground mt-3 text-sm font-medium">Binary Search Complete Tutorial</p>
          <p className="text-muted-foreground text-xs">Algorithms Deconstructed</p>
        </div>

        {/* Knowledge graph */}
        <div className="bg-surface relative min-h-[280px] p-4">
          <p className="text-muted-foreground text-[11px] font-semibold tracking-wide uppercase">Knowledge Graph</p>
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {edges.map(([a, b], i) => {
              const na = nodeById(a);
              const nb = nodeById(b);
              return (
                <motion.line
                  key={a + b}
                  x1={na.x}
                  y1={na.y}
                  x2={nb.x}
                  y2={nb.y}
                  stroke="var(--brand-violet)"
                  strokeOpacity={0.35}
                  strokeWidth={0.4}
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, delay: 0.3 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                />
              );
            })}
          </svg>
          {nodes.map((n, i) => (
            <motion.div
              key={n.id}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${n.x}%`, top: `${n.y}%` }}
              animate={{ y: [0, i % 2 === 0 ? -4 : 4, 0] }}
              transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut" }}
            >
              <div
                className={
                  n.id === "root"
                    ? "bg-gradient-brand text-primary-foreground rounded-full px-3 py-1.5 text-[11px] font-medium whitespace-nowrap shadow-md"
                    : "border-border bg-surface-2 text-foreground/90 rounded-full border px-2.5 py-1 text-[10px] font-medium whitespace-nowrap"
                }
              >
                {n.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* AI tutor */}
        <div className="bg-surface p-4">
          <p className="text-muted-foreground flex items-center gap-1.5 text-[11px] font-semibold tracking-wide uppercase">
            <Sparkles className="h-3 w-3" /> AI Tutor
          </p>
          <div className="mt-3 space-y-2">
            <div className="bg-primary/15 text-foreground ml-auto max-w-[85%] rounded-xl rounded-tr-sm px-3 py-2 text-xs">
              What's happening at 17:32?
            </div>
            {answerVisible && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="border-border bg-surface-2 text-muted-foreground max-w-[95%] rounded-xl rounded-tl-sm border px-3 py-2 text-xs leading-relaxed"
              >
                At 17:32 the instructor explains why the midpoint is biased downward…
              </motion.div>
            )}
          </div>
        </div>
      </div>

      <div className="border-border relative flex border-t px-2">
        {tabs.map((tab, i) => (
          <div key={tab} className="text-muted-foreground relative px-4 py-3 text-xs font-medium">
            <span className={i === activeTab ? "text-foreground" : undefined}>{tab}</span>
            {i === activeTab && (
              <motion.div
                layoutId="hero-tab-indicator"
                className="bg-gradient-brand absolute inset-x-2 bottom-0 h-[2px] rounded-full"
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              />
            )}
          </div>
        ))}
      </div>
    </motion.div>
  );
}

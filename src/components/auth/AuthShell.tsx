import { type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";

import { Logo } from "@/components/common/Logo";

function NodeCluster() {
  const nodes = [
    { x: 60, y: 70, r: 5, delay: 0 },
    { x: 160, y: 40, r: 4, delay: 0.2 },
    { x: 240, y: 110, r: 6, delay: 0.4 },
    { x: 120, y: 170, r: 4, delay: 0.6 },
    { x: 220, y: 210, r: 5, delay: 0.3 },
    { x: 320, y: 160, r: 4, delay: 0.5 },
    { x: 300, y: 60, r: 3, delay: 0.1 },
  ];
  const edges = [
    [0, 1],
    [1, 2],
    [0, 3],
    [3, 4],
    [4, 5],
    [2, 5],
    [1, 6],
  ];
  return (
    <svg viewBox="0 0 380 260" className="h-full w-full opacity-40" aria-hidden="true">
      <defs>
        <linearGradient id="auth-edge" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--brand-violet)" />
          <stop offset="100%" stopColor="var(--brand-cyan)" />
        </linearGradient>
      </defs>
      {edges.map(([a, b], i) => {
        const na = nodes[a]!;
        const nb = nodes[b]!;
        return (
          <line
            key={i}
            x1={na.x}
            y1={na.y}
            x2={nb.x}
            y2={nb.y}
            stroke="url(#auth-edge)"
            strokeWidth="1"
            strokeOpacity="0.5"
          />
        );
      })}
      {nodes.map((n, i) => (
        <circle
          key={i}
          cx={n.x}
          cy={n.y}
          r={n.r}
          fill="url(#auth-edge)"
          className="animate-node-pulse"
          style={{ animationDelay: `${n.delay}s` }}
        />
      ))}
    </svg>
  );
}

export function AuthShell({
  children,
  title,
  tagline,
}: {
  children: ReactNode;
  title: string;
  tagline: string;
}) {
  return (
    <div className="bg-background grid-backdrop relative flex min-h-svh w-full flex-col lg:flex-row">
      <div className="relative hidden w-full flex-col justify-between overflow-hidden border-border-strong border-r px-12 py-12 lg:flex lg:w-[46%]">
        <div className="animate-drift bg-primary/10 absolute -top-24 -left-24 h-72 w-72 rounded-full blur-3xl" />
        <div className="animate-drift bg-cyan/10 absolute -right-16 bottom-0 h-72 w-72 rounded-full blur-3xl" style={{ animationDelay: "4s" }} />
        <Link to="/" className="relative z-10">
          <Logo />
        </Link>
        <div className="relative z-10 flex-1 py-10">
          <div className="h-64 w-full max-w-md">
            <NodeCluster />
          </div>
        </div>
        <div className="relative z-10 max-w-sm space-y-3">
          <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
          <p className="text-muted-foreground text-sm">{tagline}</p>
        </div>
      </div>

      <div className="relative flex w-full flex-1 items-center justify-center px-4 py-10 sm:px-8">
        <Link to="/" className="absolute top-6 left-4 sm:left-8 lg:hidden">
          <Logo />
        </Link>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-sm"
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}

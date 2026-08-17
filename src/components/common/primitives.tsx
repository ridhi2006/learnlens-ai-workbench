import { motion, useInView, useReducedMotion } from "motion/react";
import { Check, Copy } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import type { Status } from "@/data/mockData";

/* ---------------- Motion helpers ---------------- */

export function Reveal({
  children,
  delay = 0,
  y = 16,
  blur = true,
  className,
  once = true,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  blur?: boolean;
  className?: string;
  once?: boolean;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, filter: blur ? "blur(8px)" : "none" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once, margin: "-80px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function CountUp({
  to,
  suffix = "",
  duration = 1100,
}: {
  to: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setValue(to);
      return;
    }
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      setValue(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, to, duration, reduce]);

  return (
    <span ref={ref} className="tabular-nums">
      {value}
      {suffix}
    </span>
  );
}

/* ---------------- Progress ---------------- */

export function ProgressBar({
  value,
  className,
  tone = "brand",
  height = 6,
  label,
}: {
  value: number;
  className?: string;
  tone?: "brand" | "success" | "warning" | "muted";
  height?: number;
  label?: string;
}) {
  const tones: Record<string, string> = {
    brand: "bg-gradient-brand",
    success: "bg-success",
    warning: "bg-warning",
    muted: "bg-muted-foreground/50",
  };
  return (
    <div
      className={cn("bg-foreground/8 w-full overflow-hidden rounded-full", className)}
      style={{ height }}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label ?? "Progress"}
    >
      <motion.div
        className={cn("h-full rounded-full", tones[tone])}
        initial={{ width: 0 }}
        whileInView={{ width: `${value}%` }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}

export function ProgressRing({
  value,
  size = 96,
  stroke = 8,
  children,
}: {
  value: number;
  size?: number;
  stroke?: number;
  children?: ReactNode;
}) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <defs>
          <linearGradient id={`ring-${size}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--brand-violet)" />
            <stop offset="100%" stopColor="var(--brand-cyan)" />
          </linearGradient>
        </defs>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="currentColor" strokeWidth={stroke} className="text-foreground/10" />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={`url(#ring-${size})`}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: c - (c * value) / 100 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">{children}</div>
    </div>
  );
}

/* ---------------- Status / chips ---------------- */

const statusMeta: Record<Status, { label: string; className: string; dot: string }> = {
  mastered: {
    label: "Mastered",
    className: "text-success border-success/30 bg-success/10",
    dot: "bg-success",
  },
  learning: {
    label: "Learning",
    className: "text-cyan border-cyan/30 bg-cyan/10",
    dot: "bg-cyan",
  },
  weak: {
    label: "Needs work",
    className: "text-warning border-warning/30 bg-warning/10",
    dot: "bg-warning",
  },
  "not-covered": {
    label: "Not covered",
    className: "text-muted-foreground border-border-strong bg-foreground/5",
    dot: "bg-muted-foreground/60",
  },
};

export function LearningStatusBadge({ status, className }: { status: Status; className?: string }) {
  const meta = statusMeta[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-medium",
        meta.className,
        className,
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", meta.dot)} />
      {meta.label}
    </span>
  );
}

export function ConceptChip({
  label,
  status,
  active,
  onClick,
  className,
}: {
  label: string;
  status?: Status;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}) {
  const dot = status ? statusMeta[status].dot : "bg-violet";
  const Tag = onClick ? "button" : "span";
  return (
    <Tag
      onClick={onClick}
      type={onClick ? "button" : undefined}
      className={cn(
        "border-border bg-surface/70 text-foreground/90 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium transition-all duration-200",
        onClick && "hover:border-primary/45 hover:bg-primary/10 focus-visible:ring-ring focus-visible:ring-2 focus-visible:outline-none",
        active && "border-primary/60 bg-primary/15 text-foreground",
        className,
      )}
    >
      <span className={cn("h-1.5 w-1.5 rounded-full", dot)} />
      {label}
    </Tag>
  );
}

/* ---------------- Layout bits ---------------- */

export function PageHeader({
  title,
  subtitle,
  actions,
  className,
}: {
  title: ReactNode;
  subtitle?: ReactNode;
  actions?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-wrap items-end justify-between gap-4", className)}>
      <div className="space-y-1.5">
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        {subtitle && <p className="text-muted-foreground max-w-2xl text-sm">{subtitle}</p>}
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}

export function MetricCard({
  label,
  value,
  suffix,
  hint,
  icon,
}: {
  label: string;
  value: number;
  suffix?: string;
  hint?: string;
  icon?: ReactNode;
}) {
  return (
    <div className="border-border bg-surface/60 hover:border-border-strong rounded-2xl border p-5 transition-colors duration-200">
      <div className="text-muted-foreground flex items-center justify-between text-xs font-medium tracking-wide uppercase">
        <span>{label}</span>
        {icon}
      </div>
      <div className="mt-3 text-3xl font-semibold tracking-tight">
        <CountUp to={value} suffix={suffix} />
      </div>
      {hint && <p className="text-muted-foreground mt-1 text-xs">{hint}</p>}
    </div>
  );
}

export function EmptyState({
  icon,
  title,
  description,
  action,
}: {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="border-border flex flex-col items-center justify-center rounded-2xl border border-dashed px-6 py-16 text-center">
      {icon && (
        <div className="border-border bg-surface text-muted-foreground mb-4 flex h-11 w-11 items-center justify-center rounded-xl border">
          {icon}
        </div>
      )}
      <h3 className="text-base font-medium">{title}</h3>
      {description && <p className="text-muted-foreground mt-1.5 max-w-sm text-sm">{description}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}

export function SkeletonCard({ lines = 3, className }: { lines?: number; className?: string }) {
  return (
    <div className={cn("border-border bg-surface/50 rounded-2xl border p-5", className)}>
      <div className="bg-foreground/10 h-3 w-24 animate-pulse rounded-full" />
      <div className="mt-4 space-y-2.5">
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className="bg-foreground/8 h-3 animate-pulse rounded-full"
            style={{ width: `${90 - i * 14}%`, animationDelay: `${i * 120}ms` }}
          />
        ))}
      </div>
    </div>
  );
}

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div className="text-muted-foreground text-[11px] font-semibold tracking-[0.16em] uppercase">{children}</div>
  );
}

export function CopyButton({
  value,
  label = "Copy",
  className,
}: {
  value: string;
  label?: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={() => {
        navigator.clipboard?.writeText(value);
        setCopied(true);
        toast.success("Copied to clipboard");
        setTimeout(() => setCopied(false), 1600);
      }}
      className={cn(
        "text-muted-foreground hover:text-foreground hover:bg-foreground/5 inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-xs transition-colors focus-visible:ring-ring focus-visible:ring-2 focus-visible:outline-none",
        className,
      )}
      aria-label={label}
    >
      {copied ? <Check className="h-3.5 w-3.5 text-success" /> : <Copy className="h-3.5 w-3.5" />}
      {label}
    </button>
  );
}

export function Kbd({ children }: { children: ReactNode }) {
  return (
    <kbd className="border-border bg-foreground/5 text-muted-foreground rounded-md border px-1.5 py-0.5 font-sans text-[10px]">
      {children}
    </kbd>
  );
}
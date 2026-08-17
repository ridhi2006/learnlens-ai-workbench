import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={cn("h-7 w-7", className)} aria-hidden="true">
      <defs>
        <linearGradient id="ll-mark" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--brand-violet)" />
          <stop offset="55%" stopColor="var(--brand-indigo)" />
          <stop offset="100%" stopColor="var(--brand-cyan)" />
        </linearGradient>
      </defs>
      <path
        d="M9 6.5v14.5c0 1.4 1.1 2.5 2.5 2.5H23"
        fill="none"
        stroke="url(#ll-mark)"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <circle cx="9" cy="6.5" r="3" fill="url(#ll-mark)" />
      <circle cx="23" cy="23.5" r="3" fill="none" stroke="url(#ll-mark)" strokeWidth="2.2" />
      <circle cx="22" cy="11" r="2.2" fill="var(--brand-cyan)" opacity="0.9" />
      <path d="M11 15h9" stroke="var(--brand-cyan)" strokeWidth="1.6" strokeLinecap="round" opacity="0.5" />
    </svg>
  );
}

export function Logo({ className, compact = false }: { className?: string; compact?: boolean }) {
  return (
    <span className={cn("flex items-center gap-2", className)}>
      <LogoMark />
      {!compact && (
        <span className="text-[15px] font-semibold tracking-tight">
          LearnLens<span className="text-muted-foreground font-medium"> AI</span>
        </span>
      )}
    </span>
  );
}
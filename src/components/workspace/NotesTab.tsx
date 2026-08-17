import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { RefreshCcw, Download, Copy } from "lucide-react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { CopyButton, SectionLabel } from "@/components/common/primitives";
import { cheatSheet, revisionNotes, summary } from "@/data/mockData";
import { useWorkspace } from "./workspace-context";

type SubTab = "summary" | "cheatsheet" | "revision";

const subTabs: { id: SubTab; label: string }[] = [
  { id: "summary", label: "Summary" },
  { id: "cheatsheet", label: "Cheat Sheet" },
  { id: "revision", label: "Revision Notes" },
];

function SummaryView() {
  const sections = [
    { title: "Overview", items: [summary.overview] },
    { title: "Key Ideas", items: summary.keyIdeas },
    { title: "Important Concepts", items: summary.importantConcepts },
    { title: "Examples", items: summary.examples },
    { title: "Takeaways", items: summary.takeaways },
  ];
  return (
    <div className="space-y-5">
      {sections.map((s) => (
        <div key={s.title}>
          <SectionLabel>{s.title}</SectionLabel>
          {s.items.length === 1 && s.title === "Overview" ? (
            <p className="mt-2 text-sm leading-relaxed">{s.items[0]}</p>
          ) : (
            <ul className="mt-2 space-y-1.5">
              {s.items.map((item, i) => (
                <li key={i} className="text-sm leading-relaxed">
                  <span className="text-primary mr-2">—</span>
                  {item}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}

function CheatSheetView() {
  return (
    <div className="border-border divide-border divide-y overflow-hidden rounded-xl border">
      {cheatSheet.map((row) => (
        <div key={row.label} className="bg-surface flex items-center justify-between gap-3 px-4 py-2.5">
          <div className="min-w-0">
            <div className="text-muted-foreground text-[11px] font-medium">{row.label}</div>
            <div className="mt-0.5 truncate font-mono text-xs">{row.value}</div>
          </div>
          <CopyButton value={row.value} label="" />
        </div>
      ))}
    </div>
  );
}

function RevisionView() {
  return (
    <ul className="space-y-2">
      {revisionNotes.map((item, i) => (
        <li key={i} className="border-border bg-surface rounded-xl border px-4 py-2.5 text-sm leading-relaxed">
          {item}
        </li>
      ))}
    </ul>
  );
}

export function NotesTab() {
  const { setPdfOpen } = useWorkspace();
  const [sub, setSub] = useState<SubTab>("summary");
  const [regenerating, setRegenerating] = useState(false);

  const allText = [
    summary.overview,
    ...summary.keyIdeas,
    ...cheatSheet.map((c) => `${c.label}: ${c.value}`),
    ...revisionNotes,
  ].join("\n");

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-base font-semibold">Study Notes</h2>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              navigator.clipboard?.writeText(allText);
              toast.success("Notes copied");
            }}
            className="border-border bg-surface hover:border-border-strong inline-flex items-center gap-1.5 rounded-[10px] border px-3 py-1.5 text-xs font-medium transition-colors"
          >
            <Copy className="h-3.5 w-3.5" />
            Copy
          </button>
          <button
            type="button"
            onClick={() => {
              setRegenerating(true);
              window.setTimeout(() => {
                setRegenerating(false);
                toast.success("Notes regenerated");
              }, 1200);
            }}
            className="border-border bg-surface hover:border-border-strong inline-flex items-center gap-1.5 rounded-[10px] border px-3 py-1.5 text-xs font-medium transition-colors"
          >
            <RefreshCcw className={cn("h-3.5 w-3.5", regenerating && "animate-spin")} />
            Regenerate
          </button>
          <button
            type="button"
            onClick={() => setPdfOpen(true)}
            className="bg-gradient-brand text-primary-foreground inline-flex items-center gap-1.5 rounded-[10px] px-3 py-1.5 text-xs font-medium"
          >
            <Download className="h-3.5 w-3.5" />
            Export PDF
          </button>
        </div>
      </div>

      <div className="border-border bg-surface-2 inline-flex w-full gap-1 rounded-[10px] border p-1 sm:w-auto">
        {subTabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setSub(t.id)}
            className={cn(
              "relative flex-1 rounded-[8px] px-3 py-1.5 text-xs font-medium transition-colors sm:flex-none",
              sub === t.id ? "text-foreground" : "text-muted-foreground hover:text-foreground",
            )}
          >
            {sub === t.id && (
              <motion.span layoutId="notes-subtab" className="bg-surface absolute inset-0 rounded-[8px]" transition={{ duration: 0.2 }} />
            )}
            <span className="relative">{t.label}</span>
          </button>
        ))}
      </div>

      <div className="border-border bg-surface/50 min-h-[300px] rounded-2xl border p-5">
        {regenerating ? (
          <div className="space-y-2.5">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="bg-foreground/8 h-3 animate-pulse rounded-full"
                style={{ width: `${92 - i * 10}%`, animationDelay: `${i * 100}ms` }}
              />
            ))}
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={sub}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              {sub === "summary" && <SummaryView />}
              {sub === "cheatsheet" && <CheatSheetView />}
              {sub === "revision" && <RevisionView />}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}

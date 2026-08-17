import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Copy, ListFilter, MessageSquareText, Search, StickyNote, ToggleLeft, ToggleRight } from "lucide-react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { transcript } from "@/data/mockData";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useWorkspace } from "./workspace-context";

function highlight(text: string, query: string) {
  if (!query.trim()) return text;
  const parts = text.split(new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi"));
  return parts.map((part, i) =>
    part.toLowerCase() === query.toLowerCase() ? (
      <mark key={i} className="bg-primary/30 text-foreground rounded-sm px-0.5">
        {part}
      </mark>
    ) : (
      <span key={i}>{part}</span>
    ),
  );
}

export function TranscriptTab() {
  const { openTimestamp } = useWorkspace();
  const [query, setQuery] = useState("");
  const [chapter, setChapter] = useState<string | null>(null);
  const [autoScroll, setAutoScroll] = useState(false);
  const [activeRow, setActiveRow] = useState("17:32");

  const chapters = useMemo(() => Array.from(new Set(transcript.map((t) => t.chapter))), []);

  const rows = useMemo(
    () =>
      transcript.filter((t) => {
        const matchesQuery = query.trim() === "" || t.text.toLowerCase().includes(query.toLowerCase());
        const matchesChapter = !chapter || t.chapter === chapter;
        return matchesQuery && matchesChapter;
      }),
    [query, chapter],
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-base font-semibold">Transcript</h2>
        <div className="flex flex-wrap items-center gap-2">
          <div className="border-border bg-surface flex items-center gap-2 rounded-[10px] border px-2.5 py-1.5">
            <Search className="text-muted-foreground h-3.5 w-3.5" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search transcript..."
              className="w-40 bg-transparent text-xs outline-none sm:w-56"
              aria-label="Search transcript"
            />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger className="border-border bg-surface hover:border-border-strong inline-flex items-center gap-1.5 rounded-[10px] border px-3 py-1.5 text-xs font-medium transition-colors">
              <ListFilter className="h-3.5 w-3.5" />
              {chapter ?? "All chapters"}
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuCheckboxItem checked={!chapter} onCheckedChange={() => setChapter(null)}>
                All chapters
              </DropdownMenuCheckboxItem>
              {chapters.map((c) => (
                <DropdownMenuCheckboxItem key={c} checked={chapter === c} onCheckedChange={() => setChapter(c)}>
                  {c}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <button
            type="button"
            onClick={() => setAutoScroll((v) => !v)}
            className="border-border bg-surface hover:border-border-strong inline-flex items-center gap-1.5 rounded-[10px] border px-3 py-1.5 text-xs font-medium transition-colors"
          >
            {autoScroll ? <ToggleRight className="text-primary h-4 w-4" /> : <ToggleLeft className="h-4 w-4" />}
            Auto-scroll
          </button>

          <button
            type="button"
            onClick={() => {
              navigator.clipboard?.writeText(transcript.map((t) => `${t.time} ${t.text}`).join("\n"));
              toast.success("Transcript copied");
            }}
            className="border-border bg-surface hover:border-border-strong inline-flex items-center gap-1.5 rounded-[10px] border px-3 py-1.5 text-xs font-medium transition-colors"
          >
            <Copy className="h-3.5 w-3.5" />
            Copy all
          </button>
        </div>
      </div>

      <div className="border-border bg-surface/40 scrollbar-slim max-h-[640px] overflow-y-auto rounded-2xl border">
        {rows.length === 0 ? (
          <div className="text-muted-foreground p-10 text-center text-sm">No matches for “{query}”.</div>
        ) : (
          rows.map((row) => {
            const active = row.time === activeRow;
            return (
              <div
                key={row.time}
                className={cn(
                  "group border-border/60 flex gap-4 border-b p-4 transition-colors last:border-b-0",
                  active && "bg-primary/8 border-l-2 border-l-primary",
                )}
              >
                <button
                  type="button"
                  onClick={() => {
                    setActiveRow(row.time);
                    openTimestamp(row.time);
                  }}
                  className="text-primary shrink-0 font-mono text-xs font-medium tabular-nums hover:underline"
                >
                  {row.time}
                </button>
                <p className="min-w-0 flex-1 text-sm leading-relaxed">{highlight(row.text, query)}</p>
                <div className="flex shrink-0 items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                  <button
                    type="button"
                    onClick={() => openTimestamp(row.time, "Explain this part")}
                    className="text-muted-foreground hover:text-foreground hover:bg-foreground/5 rounded-md p-1.5"
                    aria-label="Ask AI"
                  >
                    <MessageSquareText className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      navigator.clipboard?.writeText(row.text);
                      toast.success("Line copied");
                    }}
                    className="text-muted-foreground hover:text-foreground hover:bg-foreground/5 rounded-md p-1.5"
                    aria-label="Copy line"
                  >
                    <Copy className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => toast.success("Saved to notes")}
                    className="text-muted-foreground hover:text-foreground hover:bg-foreground/5 rounded-md p-1.5"
                    aria-label="Save note"
                  >
                    <StickyNote className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
      <AnimatePresence />
    </div>
  );
}

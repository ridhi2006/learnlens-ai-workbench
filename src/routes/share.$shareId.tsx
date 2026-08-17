import { createFileRoute, Link } from "@tanstack/react-router";
import { ExternalLink, Eye, MessageSquare } from "lucide-react";

import { Logo } from "@/components/common/Logo";
import { SectionLabel } from "@/components/common/primitives";
import { sharedSession, summary, cheatSheet, askModeSeed, concepts } from "@/data/mockData";

export const Route = createFileRoute("/share/$shareId")({
  head: () => ({
    meta: [
      { title: "Shared Learning Session — LearnLens AI" },
      { name: "description", content: "View a shared, read-only LearnLens learning session including summary, notes and knowledge graph." },
      { property: "og:title", content: "Shared Learning Session — LearnLens AI" },
      { property: "og:description", content: "View a shared, read-only LearnLens learning session including summary, notes and knowledge graph." },
    ],
  }),
  component: SharedSessionPage,
});

const graphNodes = [
  { id: "binary-search", x: 50, y: 12 },
  { id: "search-space", x: 20, y: 42 },
  { id: "mid-calculation", x: 50, y: 42 },
  { id: "lower-bound", x: 80, y: 42 },
  { id: "time-complexity", x: 20, y: 74 },
  { id: "boundary-conditions", x: 50, y: 74 },
  { id: "upper-bound", x: 80, y: 74 },
];
const graphEdges: [string, string][] = [
  ["binary-search", "search-space"],
  ["binary-search", "mid-calculation"],
  ["binary-search", "lower-bound"],
  ["search-space", "time-complexity"],
  ["mid-calculation", "boundary-conditions"],
  ["lower-bound", "upper-bound"],
];

function SharedSessionPage() {
  const video = sharedSession.video;

  return (
    <div className="bg-background grid-backdrop min-h-svh w-full">
      <header className="border-border bg-surface/70 sticky top-0 z-10 border-b backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <Logo compact />
            <span className="text-muted-foreground hidden text-sm sm:inline">Shared Learning Session</span>
            <span className="border-border-strong text-muted-foreground inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-medium">
              <Eye className="h-3 w-3" /> View-only
            </span>
          </div>
          <Link
            to="/learn/$videoId"
            params={{ videoId: "binary-search" }}
            className="bg-gradient-brand text-primary-foreground inline-flex items-center gap-1.5 rounded-[10px] px-3 py-1.5 text-xs font-medium shadow-sm"
          >
            Open in LearnLens <ExternalLink className="h-3.5 w-3.5" />
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-5xl space-y-10 px-4 py-8 sm:px-6">
        <section className="space-y-3">
          <div className="from-violet/30 via-indigo/20 to-cyan/25 aspect-video w-full overflow-hidden rounded-2xl bg-gradient-to-br" />
          <div>
            <h1 className="text-xl font-semibold tracking-tight">{video?.title}</h1>
            <p className="text-muted-foreground mt-1 text-sm">
              Shared by {sharedSession.sharedBy} · {sharedSession.sharedOn}
            </p>
          </div>
        </section>

        <section className="space-y-3">
          <SectionLabel>AI Summary</SectionLabel>
          <div className="border-border bg-surface/50 rounded-2xl border p-5">
            <p className="text-foreground/90 text-sm leading-relaxed">{summary.overview}</p>
            <ul className="mt-4 space-y-2">
              {summary.keyIdeas.slice(0, 4).map((idea) => (
                <li key={idea} className="text-muted-foreground flex gap-2 text-sm">
                  <span className="bg-violet mt-1.5 h-1 w-1 shrink-0 rounded-full" />
                  {idea}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="space-y-3">
          <SectionLabel>Selected Notes</SectionLabel>
          <div className="border-border bg-surface/50 grid gap-3 rounded-2xl border p-5 sm:grid-cols-2">
            {cheatSheet.slice(0, 6).map((row) => (
              <div key={row.label} className="border-border/70 border-b pb-2 last:border-b-0 sm:border-b-0">
                <p className="text-muted-foreground text-[11px] tracking-wide uppercase">{row.label}</p>
                <p className="font-mono text-sm">{row.value}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-3">
          <SectionLabel>Knowledge Graph</SectionLabel>
          <div className="border-border bg-surface/40 relative h-72 w-full overflow-hidden rounded-2xl border">
            <svg viewBox="0 0 100 100" className="h-full w-full" preserveAspectRatio="none" aria-hidden="true">
              {graphEdges.map(([a, b]) => {
                const na = graphNodes.find((n) => n.id === a)!;
                const nb = graphNodes.find((n) => n.id === b)!;
                return (
                  <line
                    key={`${a}-${b}`}
                    x1={na.x}
                    y1={na.y}
                    x2={nb.x}
                    y2={nb.y}
                    stroke="var(--border-strong)"
                    strokeWidth="0.4"
                    vectorEffect="non-scaling-stroke"
                  />
                );
              })}
            </svg>
            {graphNodes.map((n) => {
              const concept = concepts.find((c) => c.id === n.id);
              const dot =
                concept?.status === "mastered" ? "bg-success" : concept?.status === "weak" ? "bg-warning" : "bg-cyan";
              return (
                <div
                  key={n.id}
                  className="border-border bg-surface absolute -translate-x-1/2 -translate-y-1/2 rounded-lg border px-2 py-1 text-[10px] font-medium whitespace-nowrap shadow-sm"
                  style={{ left: `${n.x}%`, top: `${n.y}%` }}
                >
                  <span className={`mr-1 inline-block h-1.5 w-1.5 rounded-full ${dot}`} />
                  {concept?.label ?? n.id}
                </div>
              );
            })}
          </div>
        </section>

        <section className="space-y-3">
          <SectionLabel>AI Discussion Excerpt</SectionLabel>
          <div className="border-border bg-surface/50 space-y-3 rounded-2xl border p-5">
            {askModeSeed.map((msg, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <MessageSquare className="text-muted-foreground mt-0.5 h-4 w-4 shrink-0" />
                <p className={msg.role === "user" ? "text-sm font-medium" : "text-muted-foreground text-sm leading-relaxed"}>
                  {msg.content}
                </p>
              </div>
            ))}
          </div>
        </section>

        <footer className="border-border text-muted-foreground border-t pt-6 text-center text-xs">
          This is a view-only shared session. Private history, quiz attempts and account information are not included.
        </footer>
      </main>
    </div>
  );
}

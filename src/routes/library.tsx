import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "motion/react";
import { LayoutGrid, List, Search, X, Library as LibraryIcon } from "lucide-react";

import { AppLayout } from "@/layouts/AppLayout";
import { PageHeader, EmptyState } from "@/components/common/primitives";
import { VideoCard } from "@/components/dashboard/VideoCard";
import { videos } from "@/data/mockData";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/library")({
  head: () => ({
    meta: [
      { title: "Library — LearnLens AI" },
      { name: "description", content: "All of your analyzed learning videos, searchable and filterable in one place." },
      { property: "og:title", content: "Library — LearnLens AI" },
      { property: "og:description", content: "All of your analyzed learning videos, searchable and filterable in one place." },
    ],
  }),
  component: LibraryPage,
});

type Filter = "all" | "in-progress" | "completed" | "recent";

const filters: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "in-progress", label: "In Progress" },
  { id: "completed", label: "Completed" },
  { id: "recent", label: "Recently Added" },
];

function LibraryPage() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [view, setView] = useState<"grid" | "list">("grid");

  const filtered = useMemo(() => {
    let list = videos;
    if (filter === "in-progress") list = list.filter((v) => v.progress > 0 && v.progress < 100);
    if (filter === "completed") list = list.filter((v) => v.progress === 100);
    if (filter === "recent") list = list.slice().sort((a, b) => a.lastStudied.localeCompare(b.lastStudied));

    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (v) =>
          v.title.toLowerCase().includes(q) ||
          v.creator.toLowerCase().includes(q) ||
          v.topic.toLowerCase().includes(q),
      );
    }
    return list;
  }, [query, filter]);

  const clearFilters = () => {
    setQuery("");
    setFilter("all");
  };

  return (
    <AppLayout title="Library">
      <div className="space-y-6">
        <PageHeader title="My Library" subtitle="All of your analyzed learning videos." />

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full max-w-sm">
            <Search className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by title, creator or topic"
              aria-label="Search library"
              className="border-border bg-surface focus-visible:ring-ring w-full rounded-[10px] border py-2 pr-3 pl-9 text-sm outline-none focus-visible:ring-2"
            />
          </div>

          <div className="border-border bg-surface flex items-center gap-1 self-start rounded-[10px] border p-1">
            {(["grid", "list"] as const).map((v) => (
              <button
                key={v}
                type="button"
                aria-label={`${v} view`}
                aria-pressed={view === v}
                onClick={() => setView(v)}
                className={cn(
                  "relative flex h-7 w-8 items-center justify-center rounded-md text-xs transition-colors",
                  view === v ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {view === v && (
                  <motion.span layoutId="view-toggle" className="bg-foreground/10 absolute inset-0 rounded-md" transition={{ duration: 0.2 }} />
                )}
                <span className="relative">{v === "grid" ? <LayoutGrid className="h-3.5 w-3.5" /> : <List className="h-3.5 w-3.5" />}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilter(f.id)}
              className={cn(
                "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors focus-visible:ring-ring focus-visible:ring-2 focus-visible:outline-none",
                filter === f.id
                  ? "border-primary/50 bg-primary/15 text-foreground"
                  : "border-border bg-surface text-muted-foreground hover:text-foreground",
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <EmptyState
            icon={<LibraryIcon className="h-5 w-5" />}
            title={videos.length === 0 ? "No saved videos yet." : "No videos match that search."}
            description={
              videos.length === 0
                ? "Analyze a video to start building your library."
                : "Try a different search term or clear your filters."
            }
            action={
              <button
                type="button"
                onClick={clearFilters}
                className="border-border bg-surface hover:border-border-strong inline-flex items-center gap-1.5 rounded-[10px] border px-3 py-1.5 text-xs font-medium transition-colors"
              >
                <X className="h-3.5 w-3.5" /> Clear filters
              </button>
            }
          />
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={view}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className={cn(view === "grid" ? "grid gap-4 sm:grid-cols-2 lg:grid-cols-3" : "flex flex-col gap-3")}
            >
              {filtered.map((video) => (
                <VideoCard key={video.id} video={video} variant={view} />
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </AppLayout>
  );
}

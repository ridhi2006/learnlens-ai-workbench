import { motion } from "motion/react";
import { Bookmark, ChevronDown, Download, MoreHorizontal, Share2 } from "lucide-react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { useApp } from "@/context/app-context";
import { learningModes, type VideoSession } from "@/data/mockData";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useWorkspace } from "./workspace-context";

export function WorkspaceHeader({ video }: { video: VideoSession }) {
  const { learningMode, setLearningMode, savedVideos, toggleSaved } = useApp();
  const { setShareOpen, setPdfOpen } = useWorkspace();
  const saved = savedVideos.includes(video.id);
  const mode = learningModes.find((m) => m.id === learningMode) ?? learningModes[1];

  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex min-w-0 items-center gap-4">
        <div
          className={cn(
            "h-14 w-24 shrink-0 rounded-xl bg-gradient-to-br",
            video.thumbClass,
            "border-border border",
          )}
        />
        <div className="min-w-0">
          <h1 className="truncate text-lg font-semibold tracking-tight">{video.title}</h1>
          <p className="text-muted-foreground mt-0.5 truncate text-xs">
            {video.duration} · {video.conceptCount} concepts · {video.level}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger className="border-border bg-surface/70 hover:border-border-strong inline-flex items-center gap-1.5 rounded-[10px] border px-3 py-1.5 text-xs font-medium transition-colors">
            {mode?.label ?? "College"} Mode
            <ChevronDown className="h-3.5 w-3.5" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-64">
            <DropdownMenuLabel>Learning mode</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {learningModes.map((m) => (
              <DropdownMenuItem
                key={m.id}
                onClick={() => {
                  setLearningMode(m.id);
                  toast.success("Learning mode changed");
                }}
                className="flex flex-col items-start gap-0.5"
              >
                <span className="text-sm font-medium">{m.label}</span>
                <span className="text-muted-foreground text-xs">{m.description}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <button
          type="button"
          onClick={() => {
            toggleSaved(video.id);
            if (!saved) toast.success("Video saved");
          }}
          className={cn(
            "border-border bg-surface/70 hover:border-border-strong inline-flex items-center gap-1.5 rounded-[10px] border px-3 py-1.5 text-xs font-medium transition-colors",
            saved && "border-primary/50 text-primary bg-primary/10",
          )}
        >
          <motion.span whileTap={{ scale: 0.85 }} className="inline-flex">
            <Bookmark className={cn("h-3.5 w-3.5", saved && "fill-current")} />
          </motion.span>
          {saved ? "Saved" : "Save"}
        </button>

        <button
          type="button"
          onClick={() => setShareOpen(true)}
          className="border-border bg-surface/70 hover:border-border-strong inline-flex items-center gap-1.5 rounded-[10px] border px-3 py-1.5 text-xs font-medium transition-colors"
        >
          <Share2 className="h-3.5 w-3.5" />
          Share
        </button>

        <button
          type="button"
          onClick={() => setPdfOpen(true)}
          className="border-border bg-surface/70 hover:border-border-strong inline-flex items-center gap-1.5 rounded-[10px] border px-3 py-1.5 text-xs font-medium transition-colors"
        >
          <Download className="h-3.5 w-3.5" />
          Export
        </button>

        <DropdownMenu>
          <DropdownMenuTrigger
            className="border-border bg-surface/70 hover:border-border-strong text-muted-foreground rounded-[10px] border p-2 transition-colors"
            aria-label="More actions"
          >
            <MoreHorizontal className="h-3.5 w-3.5" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onClick={() => toast("Added to a collection")}>Add to collection</DropdownMenuItem>
            <DropdownMenuItem onClick={() => toast("Report sent")}>Report an issue</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => toast("Analysis restarted")}>Re-analyze video</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

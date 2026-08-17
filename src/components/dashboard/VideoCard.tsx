import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { MoreVertical, Play, Share2, Download, Trash2, Layers, Clock3 } from "lucide-react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";
import { ProgressBar } from "@/components/common/primitives";
import type { VideoSession } from "@/data/mockData";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function VideoCard({
  video,
  variant = "grid",
  onRemove,
}: {
  video: VideoSession;
  variant?: "grid" | "list" | undefined;
  onRemove?: ((id: string) => void) | undefined;
}) {
  const isList = variant === "list";

  return (
    <div
      className={cn(
        "group border-border bg-surface/60 hover:border-border-strong relative flex overflow-hidden rounded-2xl border transition-colors duration-200",
        isList ? "flex-row items-center gap-4 p-3" : "flex-col",
      )}
    >
      <div
        className={cn(
          "relative shrink-0 overflow-hidden bg-gradient-to-br",
          video.thumbClass,
          isList ? "h-20 w-32 rounded-xl" : "aspect-video w-full",
        )}
      >
        <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-200 group-hover:opacity-100">
          <div className="bg-background/40 flex h-9 w-9 items-center justify-center rounded-full backdrop-blur-sm">
            <Play className="text-foreground h-4 w-4 fill-current" />
          </div>
        </div>
        <span className="bg-background/70 text-foreground absolute right-2 bottom-2 rounded-md px-1.5 py-0.5 text-[10px] font-medium backdrop-blur-sm">
          {video.duration}
        </span>
      </div>

      <div className={cn("min-w-0 flex-1", isList ? "" : "p-4")}>
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="truncate text-sm font-medium">{video.title}</h3>
            <p className="text-muted-foreground truncate text-xs">{video.creator}</p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger
              className="text-muted-foreground hover:text-foreground -mt-1 shrink-0 rounded-md p-1.5"
              aria-label="Video actions"
            >
              <MoreVertical className="h-3.5 w-3.5" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuItem onClick={() => toast.success("Share link copied")}>
                <Share2 className="h-3.5 w-3.5" /> Share
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => toast.success("Export started")}>
                <Download className="h-3.5 w-3.5" /> Export
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-destructive focus:text-destructive"
                onClick={() => {
                  toast.success("Removed from your learning");
                  onRemove?.(video.id);
                }}
              >
                <Trash2 className="h-3.5 w-3.5" /> Remove
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="mt-3 space-y-1.5">
          <div className="flex items-center justify-between text-[11px]">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium tabular-nums">{video.progress}%</span>
          </div>
          <ProgressBar value={video.progress} tone={video.progress === 100 ? "success" : "brand"} />
        </div>

        <div className="text-muted-foreground mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px]">
          <span className="inline-flex items-center gap-1">
            <Layers className="h-3 w-3" /> {video.conceptCount} concepts
          </span>
          <span className="inline-flex items-center gap-1">
            <Clock3 className="h-3 w-3" /> {video.lastStudied}
          </span>
          {video.quizScore !== null && <span>Quiz {video.quizScore}%</span>}
        </div>

        <motion.div whileTap={{ scale: 0.98 }} className="mt-3">
          <Link
            to="/learn/$videoId"
            params={{ videoId: video.id }}
            className="border-border bg-surface hover:border-primary/40 hover:bg-primary/10 inline-flex w-full items-center justify-center rounded-[10px] border px-3 py-1.5 text-xs font-medium transition-colors"
          >
            Continue
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

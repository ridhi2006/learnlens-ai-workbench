import { Link } from "@tanstack/react-router";
import { Sparkles } from "lucide-react";

import { EmptyState } from "@/components/common/primitives";
import { Button } from "@/components/ui/button";

export function DashboardEmptyState() {
  return (
    <EmptyState
      icon={<Sparkles className="h-5 w-5" />}
      title="Your learning journey starts with one video."
      description="Paste a YouTube link and LearnLens will build a summary, quiz, knowledge graph and tutor for it."
      action={
        <Button asChild>
          <Link to="/analyze">Analyze Your First Video</Link>
        </Button>
      }
    />
  );
}

import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/learn/$videoId")({
  component: WorkspacePage,
});

function WorkspacePage() {
  return null;
}

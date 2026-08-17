import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/analyze")({
  component: AnalyzePage,
});

function AnalyzePage() {
  return null;
}

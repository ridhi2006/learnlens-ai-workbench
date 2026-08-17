import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/my-learning")({
  component: MyLearningPage,
});

function MyLearningPage() {
  return null;
}

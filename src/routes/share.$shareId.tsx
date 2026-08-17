import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/share/$shareId")({
  component: SharedSessionPage,
});

function SharedSessionPage() {
  return null;
}

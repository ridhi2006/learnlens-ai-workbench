import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Check, Copy } from "lucide-react";
import { toast } from "sonner";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { useWorkspace } from "./workspace-context";

const options = [
  { id: "summary", label: "Summary" },
  { id: "notes", label: "Notes" },
  { id: "graph", label: "Knowledge Graph" },
  { id: "conversation", label: "AI Conversation" },
];

export function ShareModal() {
  const { shareOpen, setShareOpen } = useWorkspace();
  const [checked, setChecked] = useState<string[]>(["summary", "notes"]);
  const [link, setLink] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  return (
    <Dialog
      open={shareOpen}
      onOpenChange={(o) => {
        setShareOpen(o);
        if (!o) {
          setLink(null);
          setCopied(false);
        }
      }}
    >
      <DialogContent className="bg-surface border-border sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share this learning session</DialogTitle>
        </DialogHeader>

        <div className="space-y-2.5">
          {options.map((o) => (
            <label key={o.id} className="border-border bg-surface-2 flex items-center gap-3 rounded-[10px] border px-3 py-2.5 text-sm">
              <Checkbox
                checked={checked.includes(o.id)}
                onCheckedChange={(v) =>
                  setChecked((prev) => (v ? [...prev, o.id] : prev.filter((x) => x !== o.id)))
                }
              />
              {o.label}
            </label>
          ))}
        </div>

        {link ? (
          <div className="border-border bg-surface-2 flex items-center justify-between gap-2 rounded-[10px] border px-3 py-2.5">
            <Link to="/share/$shareId" params={{ shareId: "abc123" }} className="text-primary truncate text-sm font-medium hover:underline">
              {link}
            </Link>
            <button
              type="button"
              onClick={() => {
                navigator.clipboard?.writeText(`https://${link}`);
                setCopied(true);
                toast.success("Share link copied");
              }}
              className="text-muted-foreground hover:text-foreground shrink-0"
              aria-label="Copy link"
            >
              {copied ? <Check className="h-4 w-4 text-success" /> : <Copy className="h-4 w-4" />}
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setLink("learnlens.ai/share/abc123")}
            className="bg-gradient-brand text-primary-foreground w-full rounded-[10px] py-2.5 text-sm font-medium"
          >
            Create Link
          </button>
        )}
      </DialogContent>
    </Dialog>
  );
}

import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { Moon, Sun, Monitor, LogOut } from "lucide-react";

import { AppLayout } from "@/layouts/AppLayout";
import { PageHeader, SectionLabel } from "@/components/common/primitives";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useApp } from "@/context/app-context";
import { learningModes, user } from "@/data/mockData";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Settings — LearnLens AI" },
      { name: "description", content: "Manage appearance, learning preferences, AI behavior and your account." },
      { property: "og:title", content: "Settings — LearnLens AI" },
      { property: "og:description", content: "Manage appearance, learning preferences, AI behavior and your account." },
    ],
  }),
  component: SettingsPage,
});

const themeOptions = [
  { id: "dark", label: "Dark", icon: Moon },
  { id: "light", label: "Light", icon: Sun },
  { id: "system", label: "System", icon: Monitor },
] as const;

const depthOptions = ["Concise", "Balanced", "Detailed"] as const;

function SettingsRow({
  label,
  description,
  children,
}: {
  label: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid gap-4 py-6 sm:grid-cols-[200px_1fr]">
      <div>
        <SectionLabel>{label}</SectionLabel>
        <p className="text-muted-foreground mt-1.5 text-sm">{description}</p>
      </div>
      <div>{children}</div>
    </div>
  );
}

function SettingsPage() {
  const { theme, setTheme, learningMode, setLearningMode, signOut } = useApp();
  const navigate = useNavigate();
  const [depth, setDepth] = useState<(typeof depthOptions)[number]>("Balanced");

  return (
    <AppLayout title="Settings">
      <div className="mx-auto max-w-3xl space-y-2">
        <PageHeader title="Settings" subtitle="Manage how LearnLens looks and behaves for you." />

        <div className="divide-border divide-y">
          <SettingsRow label="Appearance" description="Choose your interface theme.">
            <div className="border-border bg-surface inline-flex items-center gap-1 rounded-[10px] border p-1">
              {themeOptions.map((opt) => {
                const Icon = opt.icon;
                const active = theme === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    aria-pressed={active}
                    onClick={() => {
                      setTheme(opt.id);
                      toast.success(`Theme set to ${opt.label}`);
                    }}
                    className={cn(
                      "flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors focus-visible:ring-ring focus-visible:ring-2 focus-visible:outline-none",
                      active ? "bg-foreground/10 text-foreground" : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    <Icon className="h-3.5 w-3.5" /> {opt.label}
                  </button>
                );
              })}
            </div>
          </SettingsRow>

          <SettingsRow label="Learning Preferences" description="Default explanation style for new videos.">
            <div className="grid gap-2 sm:grid-cols-2">
              {learningModes.map((mode) => {
                const active = learningMode === mode.id;
                return (
                  <button
                    key={mode.id}
                    type="button"
                    aria-pressed={active}
                    onClick={() => {
                      setLearningMode(mode.id);
                      toast.success(`Default mode set to ${mode.label}`);
                    }}
                    className={cn(
                      "rounded-[10px] border p-3 text-left text-xs transition-colors focus-visible:ring-ring focus-visible:ring-2 focus-visible:outline-none",
                      active
                        ? "border-primary/50 bg-primary/10"
                        : "border-border bg-surface hover:border-border-strong",
                    )}
                  >
                    <p className="font-medium">{mode.label}</p>
                    <p className="text-muted-foreground mt-0.5">{mode.description}</p>
                  </button>
                );
              })}
            </div>
          </SettingsRow>

          <SettingsRow label="AI Preferences" description="How detailed should AI responses be?">
            <div className="border-border bg-surface inline-flex items-center gap-1 rounded-[10px] border p-1">
              {depthOptions.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  aria-pressed={depth === opt}
                  onClick={() => {
                    setDepth(opt);
                    toast.success(`Response depth set to ${opt}`);
                  }}
                  className={cn(
                    "rounded-md px-3 py-1.5 text-xs font-medium transition-colors focus-visible:ring-ring focus-visible:ring-2 focus-visible:outline-none",
                    depth === opt ? "bg-foreground/10 text-foreground" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {opt}
                </button>
              ))}
            </div>
          </SettingsRow>

          <SettingsRow label="Account" description="Manage your session and account.">
            <div className="space-y-4">
              <div>
                <p className="text-muted-foreground text-xs">Email</p>
                <p className="text-sm font-medium">{user.email}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1.5 rounded-[10px]"
                  onClick={() => {
                    signOut();
                    navigate({ to: "/" });
                    toast.success("Signed out");
                  }}
                >
                  <LogOut className="h-3.5 w-3.5" /> Sign out
                </Button>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="sm" className="rounded-[10px] opacity-60">
                      Delete account
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete account?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. All your learning history and saved videos will be permanently removed.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        onClick={() => toast.error("Account deletion is disabled in this demo")}
                      >
                        Delete account
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </SettingsRow>
        </div>
      </div>
    </AppLayout>
  );
}

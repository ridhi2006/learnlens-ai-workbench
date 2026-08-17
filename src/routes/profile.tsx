import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { Pencil } from "lucide-react";

import { AppLayout } from "@/layouts/AppLayout";
import { PageHeader } from "@/components/common/primitives";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { user } from "@/data/mockData";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Profile — LearnLens AI" },
      { name: "description", content: "View and edit your LearnLens AI profile, learning level and stats." },
      { property: "og:title", content: "Profile — LearnLens AI" },
      { property: "og:description", content: "View and edit your LearnLens AI profile, learning level and stats." },
    ],
  }),
  component: ProfilePage,
});

function ProfilePage() {
  const [name, setName] = useState(user.fullName);
  const [open, setOpen] = useState(false);

  return (
    <AppLayout title="Profile">
      <div className="mx-auto max-w-2xl space-y-8">
        <PageHeader title="Profile" subtitle="Your LearnLens learning identity." />

        <div className="border-border bg-surface/50 rounded-2xl border p-6">
          <div className="flex flex-wrap items-center gap-4">
            <div className="bg-gradient-brand text-primary-foreground flex h-16 w-16 shrink-0 items-center justify-center rounded-full text-lg font-semibold">
              {user.initials}
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="text-lg font-semibold">{name}</h2>
              <p className="text-muted-foreground text-sm">{user.email}</p>
            </div>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="gap-1.5 rounded-[10px]">
                  <Pencil className="h-3.5 w-3.5" /> Edit profile
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Edit profile</DialogTitle>
                </DialogHeader>
                <div className="space-y-1.5">
                  <Label htmlFor="profile-name">Full name</Label>
                  <Input id="profile-name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <DialogFooter>
                  <Button
                    onClick={() => {
                      setOpen(false);
                      toast.success("Profile updated");
                    }}
                  >
                    Save changes
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="border-border mt-6 grid gap-4 border-t pt-6 sm:grid-cols-2">
            <div>
              <p className="text-muted-foreground text-xs">Learning level</p>
              <p className="mt-0.5 text-sm font-medium">{user.level}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs">Topics learned</p>
              <p className="mt-0.5 text-sm font-medium">{user.stats.topicsLearned}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs">Joined</p>
              <p className="mt-0.5 text-sm font-medium">{user.joined}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="border-border bg-surface/50 rounded-2xl border p-4 text-center">
            <p className="text-xl font-semibold tabular-nums">{user.stats.videosAnalyzed}</p>
            <p className="text-muted-foreground mt-1 text-xs">Videos analyzed</p>
          </div>
          <div className="border-border bg-surface/50 rounded-2xl border p-4 text-center">
            <p className="text-xl font-semibold tabular-nums">{user.stats.quizAverage}%</p>
            <p className="text-muted-foreground mt-1 text-xs">Quiz average</p>
          </div>
          <div className="border-border bg-surface/50 rounded-2xl border p-4 text-center">
            <p className="text-xl font-semibold tabular-nums">{user.stats.streak}</p>
            <p className="text-muted-foreground mt-1 text-xs">Day streak</p>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

import { useState } from "react";
import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { AuthShell } from "@/components/auth/AuthShell";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useApp } from "@/context/app-context";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign In — LearnLens AI" },
      { name: "description", content: "Sign in to your LearnLens AI account to continue your learning journey." },
      { property: "og:title", content: "Sign In — LearnLens AI" },
      { property: "og:description", content: "Sign in to your LearnLens AI account to continue your learning journey." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const { signIn } = useApp();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState<"idle" | "email" | "google">("idle");
  const [error, setError] = useState("");

  const finishAuth = async (which: "email" | "google") => {
    setError("");
    if (which === "email" && (!email || !password)) {
      setError("Enter your email and password to continue.");
      return;
    }
    setLoading(which);
    await new Promise((r) => setTimeout(r, 900));
    signIn();
    toast.success("Welcome back!");
    navigate({ to: "/dashboard" });
  };

  return (
    <AuthShell
      title="Turn any video into a learning session."
      tagline="LearnLens builds a knowledge graph, quiz and AI tutor from the video you're already watching."
    >
      <div className="space-y-1.5 text-center sm:text-left">
        <h1 className="text-xl font-semibold tracking-tight">Sign in</h1>
        <p className="text-muted-foreground text-sm">Welcome back. Continue where you left off.</p>
      </div>

      <form
        className="mt-6 space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          void finishAuth("email");
        }}
      >
        <div className="space-y-1.5">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            disabled={loading !== "idle"}
            onChange={(e) => setEmail(e.target.value)}
            className={cn("h-10", error && !email && "border-destructive focus-visible:ring-destructive")}
          />
        </div>

        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>
            <button
              type="button"
              onClick={() => toast.info("Password reset link sent (mock).")}
              className="text-muted-foreground hover:text-foreground text-xs underline-offset-4 hover:underline focus-visible:ring-ring rounded focus-visible:ring-2 focus-visible:outline-none"
            >
              Forgot password?
            </button>
          </div>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              placeholder="••••••••"
              value={password}
              disabled={loading !== "idle"}
              onChange={(e) => setPassword(e.target.value)}
              className={cn("h-10 pr-10", error && !password && "border-destructive focus-visible:ring-destructive")}
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="text-muted-foreground hover:text-foreground absolute top-1/2 right-2 -translate-y-1/2 rounded p-1 focus-visible:ring-ring focus-visible:ring-2 focus-visible:outline-none"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {error && <p className="text-destructive text-xs">{error}</p>}

        <div className="flex items-center gap-2">
          <Checkbox id="remember" checked={remember} onCheckedChange={(v) => setRemember(Boolean(v))} />
          <Label htmlFor="remember" className="text-muted-foreground cursor-pointer text-xs font-normal">
            Remember me
          </Label>
        </div>

        <motion.button
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={loading !== "idle"}
          className="bg-gradient-brand text-primary-foreground inline-flex h-10 w-full items-center justify-center gap-2 rounded-[10px] text-sm font-medium shadow-sm transition-opacity disabled:opacity-70"
        >
          {loading === "email" && <Loader2 className="h-4 w-4 animate-spin" />}
          Sign In
        </motion.button>

        <div className="flex items-center gap-3">
          <div className="border-border h-px flex-1 border-t" />
          <span className="text-text-muted text-[11px]">or</span>
          <div className="border-border h-px flex-1 border-t" />
        </div>

        <motion.button
          whileTap={{ scale: 0.98 }}
          type="button"
          disabled={loading !== "idle"}
          onClick={() => void finishAuth("google")}
          className="border-border bg-surface hover:border-border-strong inline-flex h-10 w-full items-center justify-center gap-2 rounded-[10px] border text-sm font-medium transition-colors disabled:opacity-70"
        >
          {loading === "google" ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.25 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1a11 11 0 0 0-9.82 6.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
          )}
          Continue with Google
        </motion.button>
      </form>

      <p className="text-muted-foreground mt-6 text-center text-sm">
        Don't have an account?{" "}
        <Link to="/signup" className="text-foreground font-medium underline-offset-4 hover:underline">
          Sign up
        </Link>
      </p>
    </AuthShell>
  );
}

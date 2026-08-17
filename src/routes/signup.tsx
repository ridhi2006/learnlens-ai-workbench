import { useMemo, useState } from "react";
import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Eye, EyeOff, Loader2, Check, X } from "lucide-react";
import { toast } from "sonner";

import { AuthShell } from "@/components/auth/AuthShell";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useApp } from "@/context/app-context";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Create Account — LearnLens AI" },
      { name: "description", content: "Create a free LearnLens AI account and start turning YouTube videos into learning sessions." },
      { property: "og:title", content: "Create Account — LearnLens AI" },
      { property: "og:description", content: "Create a free LearnLens AI account and start turning YouTube videos into learning sessions." },
    ],
  }),
  component: SignupPage,
});

function SignupPage() {
  const { signIn } = useApp();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState<"idle" | "email" | "google">("idle");
  const [touched, setTouched] = useState(false);

  const isWeak = password.length > 0 && password.length < 8;
  const mismatch = confirm.length > 0 && confirm !== password;
  const valid = name && email && password.length >= 8 && confirm === password;

  const strength = useMemo(() => {
    if (!password) return 0;
    let s = 0;
    if (password.length >= 8) s++;
    if (/[A-Z]/.test(password)) s++;
    if (/[0-9]/.test(password)) s++;
    if (/[^A-Za-z0-9]/.test(password)) s++;
    return s;
  }, [password]);

  const finishAuth = async (which: "email" | "google") => {
    if (which === "email") {
      setTouched(true);
      if (!valid) return;
    }
    setLoading(which);
    await new Promise((r) => setTimeout(r, 900));
    signIn();
    toast.success("Account created — welcome to LearnLens!");
    navigate({ to: "/dashboard" });
  };

  return (
    <AuthShell
      title="Learn faster with an AI study partner."
      tagline="Every video becomes a summary, quiz, roadmap and tutor tailored to how you learn."
    >
      <div className="space-y-1.5 text-center sm:text-left">
        <h1 className="text-xl font-semibold tracking-tight">Create your account</h1>
        <p className="text-muted-foreground text-sm">Free to start. No credit card required.</p>
      </div>

      <form
        className="mt-6 space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          void finishAuth("email");
        }}
      >
        <div className="space-y-1.5">
          <Label htmlFor="name">Full name</Label>
          <Input
            id="name"
            autoComplete="name"
            placeholder="Alex Mercer"
            value={name}
            disabled={loading !== "idle"}
            onChange={(e) => setName(e.target.value)}
            className={cn("h-10", touched && !name && "border-destructive focus-visible:ring-destructive")}
          />
        </div>

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
            className={cn("h-10", touched && !email && "border-destructive focus-visible:ring-destructive")}
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="password">Password</Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              placeholder="At least 8 characters"
              value={password}
              disabled={loading !== "idle"}
              onChange={(e) => setPassword(e.target.value)}
              className={cn(
                "h-10 pr-10",
                (isWeak || (touched && !password)) && "border-destructive focus-visible:ring-destructive",
                password.length >= 8 && "border-success focus-visible:ring-success",
              )}
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
          {password.length > 0 && (
            <div className="flex items-center gap-1.5 pt-0.5">
              {[0, 1, 2, 3].map((i) => (
                <span
                  key={i}
                  className={cn(
                    "h-1 flex-1 rounded-full transition-colors",
                    i < strength
                      ? strength <= 1
                        ? "bg-destructive"
                        : strength <= 2
                          ? "bg-warning"
                          : "bg-success"
                      : "bg-foreground/10",
                  )}
                />
              ))}
            </div>
          )}
          {isWeak && (
            <p className="text-destructive flex items-center gap-1 text-xs">
              <X className="h-3 w-3" /> Use at least 8 characters.
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="confirm">Confirm password</Label>
          <Input
            id="confirm"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            placeholder="Re-enter your password"
            value={confirm}
            disabled={loading !== "idle"}
            onChange={(e) => setConfirm(e.target.value)}
            className={cn(
              "h-10",
              mismatch && "border-destructive focus-visible:ring-destructive",
              confirm.length > 0 && !mismatch && "border-success focus-visible:ring-success",
            )}
          />
          {mismatch && (
            <p className="text-destructive flex items-center gap-1 text-xs">
              <X className="h-3 w-3" /> Passwords do not match.
            </p>
          )}
          {confirm.length > 0 && !mismatch && (
            <p className="text-success flex items-center gap-1 text-xs">
              <Check className="h-3 w-3" /> Passwords match.
            </p>
          )}
        </div>

        <motion.button
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={loading !== "idle"}
          className="bg-gradient-brand text-primary-foreground inline-flex h-10 w-full items-center justify-center gap-2 rounded-[10px] text-sm font-medium shadow-sm transition-opacity disabled:opacity-70"
        >
          {loading === "email" && <Loader2 className="h-4 w-4 animate-spin" />}
          Create Account
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
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.25 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z" />
              <path fill="currentColor" d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88z" />
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1a11 11 0 0 0-9.82 6.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
            </svg>
          )}
          Continue with Google
        </motion.button>
      </form>

      <p className="text-muted-foreground mt-6 text-center text-sm">
        Already have an account?{" "}
        <Link to="/login" className="text-foreground font-medium underline-offset-4 hover:underline">
          Sign in
        </Link>
      </p>
    </AuthShell>
  );
}

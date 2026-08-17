import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from "motion/react";
import { Github, Menu, X } from "lucide-react";
import { useState, type ReactNode } from "react";

import { Logo } from "@/components/common/Logo";
import { cn } from "@/lib/utils";

const sections = [
  { href: "#product", label: "Product" },
  { href: "#features", label: "Features" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#intelligence", label: "Learning Intelligence" },
  { href: "#about", label: "About" },
];

function MarketingNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 24));

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled ? "border-border bg-background/72 border-b backdrop-blur-xl" : "border-b border-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-[1360px] items-center justify-between px-5 md:px-8">
        <Link to="/" aria-label="LearnLens AI home">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {sections.map((s) => (
            <a
              key={s.href}
              href={s.href}
              className="text-muted-foreground hover:text-foreground text-[13px] transition-colors duration-200"
            >
              {s.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <Link
            to="/login"
            className="text-muted-foreground hover:text-foreground rounded-[10px] px-3 py-2 text-[13px] transition-colors"
          >
            Sign In
          </Link>
          <Link
            to="/signup"
            className="bg-gradient-brand text-primary-foreground rounded-[10px] px-4 py-2 text-[13px] font-medium transition-transform duration-200 hover:-translate-y-px"
          >
            Get Started
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="text-foreground rounded-md p-2 md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="border-border bg-background/95 overflow-hidden border-b backdrop-blur-xl md:hidden"
          >
            <div className="space-y-1 px-5 py-4">
              {sections.map((s) => (
                <a
                  key={s.href}
                  href={s.href}
                  onClick={() => setOpen(false)}
                  className="text-muted-foreground hover:text-foreground block rounded-lg px-2 py-2 text-sm"
                >
                  {s.label}
                </a>
              ))}
              <div className="border-border mt-3 flex gap-2 border-t pt-3">
                <Link
                  to="/login"
                  className="border-border flex-1 rounded-[10px] border py-2 text-center text-sm"
                  onClick={() => setOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  className="bg-gradient-brand text-primary-foreground flex-1 rounded-[10px] py-2 text-center text-sm font-medium"
                  onClick={() => setOpen(false)}
                >
                  Get Started
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

const footerCols = [
  {
    title: "Product",
    links: ["Features", "AI Tutor", "Knowledge Graph", "Learning Roadmap"],
  },
  { title: "Resources", links: ["How It Works", "Help", "Documentation"] },
  { title: "Company", links: ["About", "Contact"] },
];

function MarketingFooter() {
  return (
    <footer id="about" className="border-border border-t">
      <div className="mx-auto grid max-w-[1360px] gap-10 px-5 py-14 md:grid-cols-[1.4fr_repeat(3,1fr)] md:px-8">
        <div className="space-y-3">
          <Logo />
          <p className="text-muted-foreground max-w-xs text-sm leading-relaxed">
            LearnLens turns educational video into an understood, tested and mapped body of knowledge.
          </p>
          <a
            href="https://github.com"
            className="text-muted-foreground hover:text-foreground inline-flex items-center gap-1.5 text-xs transition-colors"
          >
            <Github className="h-3.5 w-3.5" /> GitHub
          </a>
        </div>
        {footerCols.map((col) => (
          <div key={col.title}>
            <div className="text-[11px] font-semibold tracking-[0.16em] uppercase">{col.title}</div>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((l) => (
                <li key={l}>
                  <a
                    href="#features"
                    className="text-muted-foreground hover:text-foreground text-sm transition-colors"
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-border mx-auto flex max-w-[1360px] flex-wrap items-center justify-between gap-3 border-t px-5 py-6 md:px-8">
        <span className="text-muted-foreground text-xs">© LearnLens AI</span>
        <span className="text-muted-foreground text-xs">Built for learners who want to actually understand.</span>
      </div>
    </footer>
  );
}

export function MarketingLayout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-background text-foreground min-h-svh overflow-x-clip">
      <MarketingNav />
      <main>{children}</main>
      <MarketingFooter />
    </div>
  );
}
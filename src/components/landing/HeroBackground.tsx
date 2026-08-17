import { useEffect, useRef } from "react";

export function HeroBackground() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const mq = window.matchMedia("(pointer: fine)");
    if (!mq.matches) return;

    const handle = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      el.style.setProperty("--mx", `${x}%`);
      el.style.setProperty("--my", `${y}%`);
    };
    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, []);

  return (
    <div ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="grid-backdrop absolute inset-0 opacity-[0.35] [mask-image:radial-gradient(60%_60%_at_50%_20%,black,transparent)]" />
      <div className="animate-drift absolute -top-40 left-1/4 h-[36rem] w-[36rem] rounded-full bg-violet/10 blur-[120px]" />
      <div
        className="animate-drift absolute top-10 right-0 h-[30rem] w-[30rem] rounded-full bg-cyan/10 blur-[120px]"
        style={{ animationDelay: "-8s" }}
      />
      <div
        className="absolute inset-0 hidden opacity-60 transition-opacity duration-500 md:block"
        style={{
          background:
            "radial-gradient(420px circle at var(--mx, 50%) var(--my, 20%), color-mix(in oklab, var(--brand-violet) 10%, transparent), transparent 70%)",
        }}
      />
      <div className="from-background absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t to-transparent" />
    </div>
  );
}

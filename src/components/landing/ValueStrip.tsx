import { motion } from "motion/react";
import { BrainCircuit, Compass, Sparkles, TrendingUp } from "lucide-react";

const items = [
  { icon: Compass, label: "Understand" },
  { icon: Sparkles, label: "Explore" },
  { icon: BrainCircuit, label: "Practice" },
  { icon: TrendingUp, label: "Improve" },
];

export function ValueStrip() {
  return (
    <section className="border-border border-y">
      <div className="mx-auto max-w-[1360px] px-5 py-12 md:px-8 md:py-16">
        <p className="text-muted-foreground text-center text-sm font-medium">
          From passive watching <span aria-hidden="true">→</span> active understanding
        </p>

        <div className="relative mx-auto mt-8 flex max-w-3xl items-center justify-between">
          <motion.div
            className="bg-border-strong absolute top-1/2 right-0 left-0 h-px -translate-y-1/2 origin-left"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          />
          {items.map(({ icon: Icon, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="bg-background relative z-10 flex flex-col items-center gap-2 px-2"
            >
              <div className="border-border bg-surface flex h-11 w-11 items-center justify-center rounded-full border">
                <Icon className="text-violet h-4.5 w-4.5" />
              </div>
              <span className="text-foreground/90 text-xs font-medium">{label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

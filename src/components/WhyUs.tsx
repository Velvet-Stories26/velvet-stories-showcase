import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { SplitReveal, Reveal, EASE } from "./motion-primitives";

const REASONS = [
  {
    icon: "✦",
    title: "Obsessive craft",
    text: "Every pixel, curve and word is considered. We treat your project like our own name is on it — because it is.",
  },
  {
    icon: "❋",
    title: "Cinematic storytelling",
    text: "We don't decorate. We direct. Each design carries a narrative that makes people feel something.",
  },
  {
    icon: "◈",
    title: "Truly bespoke",
    text: "No recycled templates. Whether a wedding site or a brand, it's built from a blank canvas for you.",
  },
  {
    icon: "✺",
    title: "End-to-end care",
    text: "From first idea to final delivery, you're guided with clarity, warmth and premium attention.",
  },
];

const STATS = [
  { value: 150, suffix: "+", label: "Projects delivered" },
  { value: 60, suffix: "+", label: "Service offerings" },
  { value: 100, suffix: "%", label: "Handcrafted design" },
  { value: 5, suffix: "★", label: "Client experience" },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let raf = 0;
    const start = performance.now();
    const dur = 1600;
    const tick = (t: number) => {
      const p = Math.min((t - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(eased * value));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);
  return (
    <span ref={ref} className="text-gold-gradient font-display text-5xl md:text-6xl">
      {n}
      {suffix}
    </span>
  );
}

function UnfoldCard({ r, i }: { r: (typeof REASONS)[number]; i: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, rotateX: -75, y: 60 }}
      animate={inView ? { opacity: 1, rotateX: 0, y: 0 } : {}}
      transition={{ duration: 0.9, ease: EASE, delay: i * 0.12 }}
      style={{ transformPerspective: 1200, transformOrigin: "top" }}
      className="glass group relative overflow-hidden rounded-2xl p-8"
    >
      <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-gold/10 blur-2xl transition-all duration-500 group-hover:bg-gold/25" />
      <span className="text-4xl text-gold">{r.icon}</span>
      <h3 className="mt-5 font-display text-2xl text-cream">{r.title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{r.text}</p>
      <div className="mt-6 h-px w-full origin-left scale-x-0 bg-[image:var(--gradient-gold)] transition-transform duration-500 group-hover:scale-x-100" />
    </motion.div>
  );
}

export function WhyUs() {
  return (
    <section id="why" className="relative py-28 md:py-40">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="block text-xs uppercase tracking-[0.35em] text-gold/80"
          >
            Why Velvet Stories
          </motion.span>
          <SplitReveal
            text="Chosen by those who notice details"
            as="h2"
            className="mt-4 font-display text-4xl leading-tight text-cream md:text-6xl"
          />
        </div>

        <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {REASONS.map((r, i) => (
            <UnfoldCard key={r.title} r={r} i={i} />
          ))}
        </div>

        <Reveal delay={0.2} className="mt-24">
          <div className="glass-strong grid grid-cols-2 gap-8 rounded-3xl px-8 py-12 md:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label} className="text-center">
                <Counter value={s.value} suffix={s.suffix} />
                <p className="mt-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

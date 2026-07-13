import { SplitReveal, EASE } from "./motion-primitives";
import { motion } from "framer-motion";

const TESTIMONIALS = [
  {
    quote:
      "Our wedding invitation website made every guest gasp. Velvet Stories turned our love story into a film.",
    name: "Ananya & Rohan",
    role: "Wedding Website",
  },
  {
    quote:
      "The branding kit gave my little bakery a soul. It finally looks the way our cakes taste — luxurious.",
    name: "Saniya",
    role: "Brand Identity",
  },
  {
    quote:
      "I surprised my wife with an anniversary site. She cried. They understood the emotion perfectly.",
    name: "Jo",
    role: "Surprise Website",
  },
  {
    quote:
      "My final year project documentation and PPT looked more professional than anything in my batch.",
    name: "Muneer",
    role: "Student Project",
  },
  {
    quote:
      "Every festival poster they design outperforms our ads. Elegant, bold and unmistakably premium.",
    name: "Abisha",
    role: "Graphic Design",
  },
];

function Card({ t }: { t: (typeof TESTIMONIALS)[number] }) {
  return (
    <figure className="glass group w-[85vw] shrink-0 rounded-2xl p-8 transition-transform duration-500 hover:-translate-y-2 md:w-[26rem]">
      <div className="text-5xl leading-none text-gold/50">“</div>
      <blockquote className="-mt-4 font-display text-xl italic leading-relaxed text-cream">
        {t.quote}
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/40 font-display text-lg text-gold">
          {t.name.charAt(0)}
        </span>
        <span>
          <span className="block text-sm text-cream">{t.name}</span>
          <span className="block text-xs uppercase tracking-[0.2em] text-gold/70">{t.role}</span>
        </span>
      </figcaption>
    </figure>
  );
}

export function Testimonials() {
  const row = [...TESTIMONIALS, ...TESTIMONIALS];
  return (
    <section id="testimonials" className="relative overflow-hidden py-28 md:py-40">
      <div className="mx-auto mb-16 max-w-2xl px-6 text-center">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, ease: EASE }}
          viewport={{ once: true }}
          className="block text-xs uppercase tracking-[0.35em] text-gold/80"
        >
          Kind words
        </motion.span>
        <SplitReveal
          text="Voices of our clients"
          as="h2"
          className="mt-4 font-display text-4xl text-cream md:text-6xl"
        />
      </div>

      <div className="group relative flex overflow-hidden">
        <div className="flex animate-marquee gap-6 pr-6 group-hover:[animation-play-state:paused]">
          {row.map((t, i) => (
            <Card key={i} t={t} />
          ))}
        </div>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent" />
      </div>
    </section>
  );
}

import { motion } from "framer-motion";
import { SplitReveal, Reveal, Magnetic, EASE } from "./motion-primitives";
import { GoldParticles } from "./GoldParticles";

const INSTAGRAM = "https://www.instagram.com/velvet_stories_2026/";

export function Contact() {
  return (
    <section id="contact" className="noise relative overflow-hidden py-28 md:py-40">
      <GoldParticles count={18} />
      <div className="pointer-events-none absolute left-1/3 top-1/3 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-gold/10 blur-[150px]" />

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, ease: EASE }}
          viewport={{ once: true }}
          className="block text-xs uppercase tracking-[0.35em] text-gold/80"
        >
          Get in touch
        </motion.span>
        <SplitReveal
          text="Let's Create Something Beautiful"
          as="h2"
          className="mx-auto mt-4 max-w-3xl font-display text-4xl leading-tight text-cream md:text-6xl"
        />
        <Reveal delay={0.2}>
          <p className="mx-auto mt-5 max-w-lg text-muted-foreground">
            Every beautiful story begins with a conversation. We'd love to hear
            your ideas and bring them to life.
          </p>
        </Reveal>

        {/* Instagram Contact Card */}
        <Reveal delay={0.3} className="mt-14">
          <div className="glass-strong mx-auto max-w-lg rounded-3xl border border-gold/25 p-10 shadow-[0_4px_12px_0_oklch(0.66_0.1_76/0.2),0_12px_28px_-4px_oklch(0.66_0.1_76/0.25),0_24px_50px_-8px_oklch(0.66_0.1_76/0.15)] transition-shadow duration-500 hover:shadow-[0_6px_16px_0_oklch(0.66_0.1_76/0.35),0_16px_36px_-4px_oklch(0.66_0.1_76/0.35),0_32px_64px_-8px_oklch(0.66_0.1_76/0.2)]">
            {/* Instagram Icon */}
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-gold/30 bg-gold/5">
              <svg
                className="h-8 w-8 text-gold"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
              </svg>
            </div>

            {/* Handle */}
            <a
              href={INSTAGRAM}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block font-display text-2xl text-gold transition-colors hover:text-cream md:text-3xl"
            >
              @velvet_stories_2026
            </a>

            {/* Description */}
            <p className="mx-auto mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Contact us on Instagram for project inquiries, custom websites,
              digital invitations, branding, and creative designs.
            </p>

            {/* Divider */}
            <div className="mx-auto my-8 flex items-center justify-center gap-4">
              <span className="h-px w-12 bg-gold/30" />
              <span className="text-gold/50">✦</span>
              <span className="h-px w-12 bg-gold/30" />
            </div>

            {/* CTA Button */}
            <Magnetic>
              <a
                href={INSTAGRAM}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-[image:var(--gradient-gold)] px-10 py-4 text-sm uppercase tracking-[0.2em] text-espresso transition-all duration-300 hover:scale-105 hover:shadow-[0_8px_24px_-4px_oklch(0.66_0.1_76/0.5)]"
              >
                <span className="relative z-10 font-medium">
                  Continue to Instagram
                </span>
                <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </a>
            </Magnetic>

            {/* Reply note */}
            <p className="mt-6 text-xs tracking-wide text-muted-foreground/70">
              We usually reply within a few hours ✨
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

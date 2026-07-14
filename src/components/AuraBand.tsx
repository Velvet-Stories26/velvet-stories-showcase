import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { EASE } from "@/components/motion-primitives";
import auraSilk from "@/assets/aura-silk2.png";
import auraGlow from "@/assets/aura-glow2.png";

const IMAGES = {
  silk: auraSilk,
  glow: auraGlow,
} as const;

/**
 * Cinematic full-width transition band that fills the blank space
 * between sections with an ambient aura image, parallax drift,
 * a floating gold light bloom and a whispered line of text.
 */
export function AuraBand({
  image = "silk",
  eyebrow,
  line,
  align = "center",
}: {
  image?: keyof typeof IMAGES;
  eyebrow?: string;
  line: string;
  align?: "center" | "left";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-14%", "14%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.15, 1, 1.15]);
  const glowX = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.25, 1, 1, 0.25]
  );

  return (
    <section
      ref={ref}
      className="relative isolate my-2 h-[62vh] min-h-[420px] w-full overflow-hidden"
      aria-hidden={!line}
    >
      {/* parallax image */}
      <motion.img
        src={IMAGES[image]}
        alt=""
        loading="lazy"
        width={1920}
        height={912}
        style={{ y, scale }}
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* aura glow bloom that drifts */}
      {false && (
        <motion.div
          style={{ x: glowX }}
          className="pointer-events-none absolute inset-0"
        >
          <div className="absolute left-1/2 top-1/2 h-[80%] w-[60%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,color-mix(in_oklab,var(--color-gold)_45%,transparent),transparent)] blur-3xl animate-pulse" />
        </motion.div>
      )}

      {/* soft fades into the cream sections above & below - DISABLED */}
      {false && (
        <>
          <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-background to-transparent" />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />
        </>
      )}
      {/* Removed overlays for raw image */}

      {/* whispered line */}
      <motion.div
        style={{ opacity }}
        className={`relative z-10 flex h-full flex-col justify-center gap-4 px-6 md:px-16 ${
          align === "center" ? "items-center text-center" : "items-start text-left"
        }`}
      >
        {eyebrow && (
          <motion.span
            initial={{ opacity: 0, letterSpacing: "0.1em" }}
            whileInView={{ opacity: 1, letterSpacing: "0.35em" }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: EASE }}
            className="text-xs uppercase tracking-[0.35em] text-espresso/70"
          >
            {eyebrow}
          </motion.span>
        )}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 1.1, ease: EASE, delay: 0.1 }}
          className="max-w-3xl font-display text-4xl italic leading-tight text-espresso md:text-6xl"
        >
          {line}
        </motion.p>
      </motion.div>
    </section>
  );
}

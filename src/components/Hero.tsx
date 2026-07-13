import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import heroBg from "@/assets/hero-bg.png";
import { GoldParticles } from "./GoldParticles";
import { GoldButton, EASE } from "./motion-primitives";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // mouse parallax
  const mx = useSpring(0, { stiffness: 60, damping: 20 });
  const my = useSpring(0, { stiffness: 60, damping: 20 });
  const glowX = useTransform(mx, (v) => `${50 + v * 12}%`);
  const glowY = useTransform(my, (v) => `${40 + v * 12}%`);
  const layer1X = useTransform(mx, (v) => v * -20);
  const layer1Y = useTransform(my, (v) => v * -20);

  const onMouse = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  const words = ["Cinematic", "stories,", "crafted", "in", "gold."];

  return (
    <section
      id="home"
      ref={ref}
      onMouseMove={onMouse}
      className="noise relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* background */}
      <motion.div style={{ y, scale }} className="absolute inset-0 z-0">
        <img src={heroBg} alt="" className="h-full w-full object-cover" width={1920} height={1280} />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_75%,rgba(248,244,237,0.08)_100%)]" />
        <div className="absolute inset-0 bg-[image:var(--gradient-dark)] opacity-55" />
      </motion.div>

      {/* moving glow follows mouse */}
      <motion.div
        style={{ left: glowX, top: glowY }}
        className="pointer-events-none absolute z-10 h-[36rem] w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/20 blur-[120px]"
      />

      <GoldParticles count={30} />

      {/* content */}
      <motion.div
        style={{ opacity, x: layer1X, y: layer1Y }}
        className="relative z-20 mx-auto max-w-5xl px-6 pt-24 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, ease: EASE }}
          className="mx-auto mb-8 flex w-fit items-center gap-3 rounded-full border border-gold/30 px-5 py-2 text-[10px] uppercase tracking-[0.35em] text-gold/90 backdrop-blur-sm"
        >
          <span className="h-1.5 w-1.5 animate-pulse-glow rounded-full bg-gold" />
          Premium Creative Studio
        </motion.div>

        <h1 className="font-display text-[15vw] leading-[0.9] tracking-tight text-cream md:text-[9rem]">
          <span className="block overflow-hidden">
            {words.slice(0, 3).map((w, i) => (
              <motion.span
                key={i}
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ delay: 0.5 + i * 0.09, duration: 0.9, ease: EASE }}
                className="mr-4 inline-block"
              >
                {w}
              </motion.span>
            ))}
          </span>
          <span className="block overflow-hidden">
            {words.slice(3).map((w, i) => (
              <motion.span
                key={i}
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ delay: 0.8 + i * 0.09, duration: 0.9, ease: EASE }}
                className={`mr-4 inline-block italic ${w.includes("gold") ? "shimmer-text" : ""}`}
              >
                {w}
              </motion.span>
            ))}
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, ease: EASE }}
          className="mx-auto mt-8 max-w-xl text-base font-light leading-relaxed text-muted-foreground md:text-lg"
        >
          We design luxury websites, wedding invitation websites, branding and graphic experiences
          for those who believe every detail deserves to be remembered.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, ease: EASE }}
          className="mt-12 flex flex-wrap items-center justify-center gap-4"
        >
          <GoldButton href="#portfolio">View our work</GoldButton>
          <GoldButton href="#contact" variant="ghost">
            Start a project
          </GoldButton>
        </motion.div>
      </motion.div>

      {/* scroll cue */}
      {/* <motion.div
        style={{ opacity }}
        className="absolute bottom-8 left-1/2 z-20 -translate-x-1/2 text-center"
      >
        <div className="mx-auto flex h-10 w-6 items-start justify-center rounded-full border border-gold/40 p-1.5">
          <motion.span
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="h-1.5 w-1.5 rounded-full bg-gold"
          />
        </div>
        <span className="mt-2 block text-[9px] uppercase tracking-[0.3em] text-muted-foreground">
          Scroll
        </span>
      </motion.div> */}
    </section>
  );
}

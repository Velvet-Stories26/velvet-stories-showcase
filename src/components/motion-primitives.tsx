import { motion, useInView, type Variants } from "framer-motion";
import { useRef, type ReactNode } from "react";

export const EASE = [0.22, 1, 0.36, 1] as const;

/* Letter-by-letter / word-by-word reveal */
export function SplitReveal({
  text,
  className = "",
  as: Tag = "h2",
  delay = 0,
  by = "word",
}: {
  text: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  delay?: number;
  by?: "word" | "char";
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const units = by === "char" ? text.split("") : text.split(" ");

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: by === "char" ? 0.025 : 0.06, delayChildren: delay } },
  };
  const child: Variants = {
    hidden: { y: "110%", opacity: 0, rotate: 4 },
    show: { y: "0%", opacity: 1, rotate: 0, transition: { duration: 0.8, ease: EASE } },
  };

  const MotionTag = motion[Tag];
  return (
    <MotionTag
      ref={ref}
      className={className}
      variants={container}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      aria-label={text}
    >
      {units.map((u, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom">
          <motion.span variants={child} className="inline-block" aria-hidden>
            {u === " " ? "\u00A0" : u}
            {by === "word" ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}

export function Reveal({
  children,
  className = "",
  y = 40,
  delay = 0,
  once = true,
}: {
  children: ReactNode;
  className?: string;
  y?: number;
  delay?: number;
  once?: boolean;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once, margin: "-8%" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

/* Magnetic wrapper for buttons */
export function Magnetic({
  children,
  strength = 0.35,
  className = "",
}: {
  children: ReactNode;
  strength?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) * strength;
    const y = (e.clientY - (r.top + r.height / 2)) * strength;
    el.style.transform = `translate(${x}px, ${y}px)`;
  };
  const reset = () => {
    if (ref.current) ref.current.style.transform = "translate(0,0)";
  };
  return (
    <div
      ref={ref}
      data-magnetic
      onMouseMove={onMove}
      onMouseLeave={reset}
      className={`inline-block transition-transform duration-300 ease-out ${className}`}
    >
      {children}
    </div>
  );
}

export function GoldButton({
  children,
  href,
  onClick,
  variant = "solid",
}: {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "solid" | "ghost";
}) {
  const base =
    "group relative inline-flex items-center gap-3 overflow-hidden rounded-full px-8 py-4 text-sm uppercase tracking-[0.2em]";
  const styles =
    variant === "solid"
      ? "text-espresso"
      : "text-cream border border-gold/40";
  const Inner = (
    <>
      {variant === "solid" && (
        <span className="absolute inset-0 bg-[image:var(--gradient-gold)] transition-transform duration-500 group-hover:scale-105" />
      )}
      <span className="absolute inset-0 translate-y-full bg-[image:var(--gradient-gold)] opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100" />
      <span className="relative z-10 flex items-center gap-3">{children}</span>
    </>
  );
  const cls = `${base} ${styles}`;
  return (
    <Magnetic>
      {href ? (
        <a href={href} className={cls}>
          {Inner}
        </a>
      ) : (
        <button onClick={onClick} className={cls}>
          {Inner}
        </button>
      )}
    </Magnetic>
  );
}

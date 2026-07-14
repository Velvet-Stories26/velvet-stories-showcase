import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { SplitReveal, Reveal, EASE } from "./motion-primitives";
import workWebsite from "@/assets/work-website.png";
import workWedding from "@/assets/work-wedding.jpg";
import workPoster from "@/assets/work-poster.jpg";
import workBranding from "@/assets/work-branding.jpg";
import workPackaging from "@/assets/work-packaging.jpg";
import workPhoto from "@/assets/work-photo.png";
import workSurprise from "@/assets/work-surprise.jpg";

type Project = {
  title: string;
  category: string;
  image: string;
  span: string;
};

const PROJECTS: Project[] = [
  { title: "Anniversary surprise", category: "Web Experience", image: workWebsite, span: "md:col-span-2 md:row-span-2" },
  { title: "The Vows Suite", category: "Invitation Design", image: workWedding, span: "md:col-span-1 md:row-span-1" },
  { title: "Anniversary Surprise", category: "Surprise Website", image: workSurprise, span: "md:col-span-1 md:row-span-2" },
  { title: "Maison Identity", category: "Branding", image: workBranding, span: "md:col-span-1 md:row-span-1" },
  { title: "Coffee", category: "Poster Design", image: workPoster, span: "md:col-span-1 md:row-span-1" },
  { title: "Visiting card", category: "Packaging", image: workPackaging, span: "md:col-span-2 md:row-span-1" },
  { title: "Attendance management", category: "Student -Project", image: workPhoto, span: "md:col-span-1 md:row-span-1" },
];

function TiltCard({ project }: { project: Project }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rx = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 150, damping: 15 });
  const ry = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 150, damping: 15 });

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    x.set((e.clientX - r.left) / r.width - 0.5);
    y.set((e.clientY - r.top) / r.height - 0.5);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <Reveal className={project.span}>
      <motion.div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={reset}
        style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000 }}
        className="group relative h-full min-h-[16rem] overflow-hidden rounded-2xl border border-gold/30 shadow-[0_4px_12px_0_oklch(0.66_0.1_76/0.35),0_12px_28px_-4px_oklch(0.66_0.1_76/0.4),0_24px_50px_-8px_oklch(0.66_0.1_76/0.3)] hover:shadow-[0_6px_16px_0_oklch(0.66_0.1_76/0.5),0_16px_36px_-4px_oklch(0.66_0.1_76/0.5),0_32px_64px_-8px_oklch(0.66_0.1_76/0.35)] transition-shadow duration-500"
      >
        <img
          src={project.image}
          alt={`${project.title} - Velvet Stories ${project.category} portfolio piece showcasing premium design and creative work`}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-espresso/90 via-espresso/10 to-transparent" />
        <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <div className="absolute -inset-1/2 bg-[conic-gradient(from_0deg,transparent,oklch(0.82_0.11_82/0.25),transparent)] animate-[spin_6s_linear_infinite]" />
        </div>
        <div
          style={{ transform: "translateZ(40px)" }}
          className="absolute inset-x-0 bottom-0 p-6"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-gold">{project.category}</span>
          <h3 className="mt-1 font-display text-2xl text-cream">{project.title}</h3>
          <div className="mt-3 h-px w-0 bg-gold transition-all duration-500 group-hover:w-16" />
        </div>
        <span className="absolute right-5 top-5 flex h-10 w-10 -rotate-45 items-center justify-center rounded-full border border-gold/40 text-gold opacity-0 transition-all duration-500 group-hover:rotate-0 group-hover:opacity-100">
          ↗
        </span>
      </motion.div>
    </Reveal>
  );
}

export function Portfolio() {
  return (
    <section id="portfolio" className="relative overflow-hidden py-28 md:py-40">
      <div className="pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-gold/10 blur-[140px]" />
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-16 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1, ease: EASE }}
              viewport={{ once: true }}
              className="block text-xs uppercase tracking-[0.35em] text-gold/80"
            >
              Selected work
            </motion.span>
            <SplitReveal
              text="A gallery of moments"
              as="h2"
              className="mt-4 font-display text-4xl text-cream md:text-6xl"
            />
          </div>
          <Reveal delay={0.2}>
            <p className="max-w-xs text-muted-foreground">
              Move your cursor across each piece. Every project tilts, glows and comes alive.
            </p>
          </Reveal>
        </div>

        <div className="grid auto-rows-[16rem] grid-cols-1 gap-5 md:grid-cols-3">
          {PROJECTS.map((p) => (
            <TiltCard key={p.title} project={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

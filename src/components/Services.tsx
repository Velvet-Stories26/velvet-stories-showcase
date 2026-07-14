import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { SplitReveal, Reveal, EASE } from "./motion-primitives";
import workWebsite from "@/assets/work-website.png";
import workWedding from "@/assets/work-wedding.jpg";
import workPoster from "@/assets/work-poster.jpg";
import workBranding from "@/assets/work-branding.jpg";
import workPackaging from "@/assets/work-packaging.jpg";
import workPhoto from "@/assets/work-photo.png";

type Service = {
  num: string;
  title: string;
  blurb: string;
  image: string;
  tags: string[];
};

const SERVICES: Service[] = [
  {
    num: "01",
    title: "Websites & Digital Experiences",
    blurb:
      "Surprise sites, invitation websites, RSVP pages, couple timelines, portfolios and landing pages — each one an interactive story.",
    image: workWebsite,
    tags: [
      "Surprise Websites",
      "Wedding Invitation Sites",
      "RSVP & Countdown",
      "Couple Timelines",
      "Portfolios",
      "Digital Visiting Cards",
      "QR Invitations",
      "Event Websites",
    ],
  },
  {
    num: "02",
    title: "Wedding & Invitation Design",
    blurb:
      "Timeless invitation suites crafted with foil-worthy detail — from save the dates to thank you cards for every occasion.",
    image: workWedding,
    tags: ["Wedding Cards", "Save the Date", "Thank You Cards", "Digital Invitations"],
  },
  {
    num: "03",
    title: "Graphic Design",
    blurb:
      "Posters, social creatives and print that stop the scroll and command the room with intentional, luxurious composition.",
    image: workPoster,
    tags: [
      "Festival & Offer Posters",
      "Instagram Posts",
      "Reels Covers",
      "Flyers & Brochures",
      "Menu Cards",
      "Banners & Standees",
    ],
  },
  {
    num: "04",
    title: "Branding & Identity",
    blurb:
      "Logos and complete identity kits that give your brand a soul — considered, distinctive and built to last.",
    image: workBranding,
    tags: ["Logo Design", "Brand Identity Kit", "Business Cards", "Letterheads"],
  },
  {
    num: "05",
    title: "Business Documents & Assets",
    blurb:
      "Polished brochures, catalogs and editable templates that make your business look as premium as it truly is.",
    image: workPackaging,
    tags: ["Digital Brochures", "Product Catalogs", "Canva Templates", "Packaging & Labels"],
  },
  {
    num: "06",
    title: "College & Student Services",
    blurb:
      "From final year projects to LinkedIn optimization — everything a student needs to present work beautifully.",
    image: workPhoto,
    tags: [
      "Final Year Projects",
      "React / Python / Java",
      "Documentation & Reports",
      "PPT Presentations",
      "LinkedIn Optimization",
    ],
  },
];

function ServiceRow({ service, index }: { service: Service; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const reverse = index % 2 === 1;

  return (
    <div
      ref={ref}
      className={`grid items-center gap-8 md:grid-cols-2 md:gap-16 ${reverse ? "md:[direction:rtl]" : ""}`}
    >
      {/* image */}
      <Reveal y={60} className="[direction:ltr]">
        <div className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-gold/30 shadow-[0_4px_12px_0_oklch(0.66_0.1_76/0.35),0_12px_28px_-4px_oklch(0.66_0.1_76/0.4),0_24px_50px_-8px_oklch(0.66_0.1_76/0.3)] hover:shadow-[0_6px_16px_0_oklch(0.66_0.1_76/0.5),0_16px_36px_-4px_oklch(0.66_0.1_76/0.5),0_32px_64px_-8px_oklch(0.66_0.1_76/0.35)] transition-shadow duration-500">
          <motion.img
            style={{ y: imgY }}
            src={service.image}
            alt={`${service.title} - Velvet Stories portfolio example showing ${service.tags[0]}`}
            loading="lazy"
            className="absolute inset-0 h-[120%] w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />

          <span className="absolute left-5 top-4 font-display text-6xl text-cream/30">
            {service.num}
          </span>
          <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
            <div className="absolute inset-0 bg-gold/10 mix-blend-overlay" />
          </div>
        </div>
      </Reveal>

      {/* text */}
      <div className="[direction:ltr]">
        <span className="mb-3 block text-xs uppercase tracking-[0.3em] text-gold/70">
          Service {service.num}
        </span>
        <SplitReveal
          text={service.title}
          as="h3"
          className="font-display text-3xl leading-tight text-cream md:text-5xl"
        />
        <Reveal delay={0.15}>
          <p className="mt-5 max-w-md text-muted-foreground">{service.blurb}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {service.tags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-gold/25 bg-card/40 px-4 py-1.5 text-xs tracking-wide text-cream/80 transition-all duration-300 hover:border-gold/60 hover:bg-gold/10"
              >
                {t}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </div>
  );
}

export function Services() {
  return (
    <section id="services" className="relative py-28 md:py-40">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <motion.span
          initial={{ opacity: 0, letterSpacing: "0.1em" }}
          whileInView={{ opacity: 1, letterSpacing: "0.35em" }}
          transition={{ duration: 1, ease: EASE }}
          viewport={{ once: true }}
          className="block text-xs uppercase text-gold/80"
        >
          What we craft
        </motion.span>
        <SplitReveal
          text="Every service, a signature"
          as="h2"
          by="char"
          className="mt-4 font-display text-4xl text-cream md:text-6xl"
        />
        <Reveal delay={0.2}>
          <p className="mx-auto mt-5 max-w-xl text-muted-foreground">
            We don't offer templates. Each project is designed as its own experience — considered,
            cinematic and unmistakably yours.
          </p>
        </Reveal>
      </div>

      <div className="mx-auto mt-20 flex max-w-6xl flex-col gap-24 px-6 md:gap-32">
        {SERVICES.map((s, i) => (
          <ServiceRow key={s.num} service={s} index={i} />
        ))}
      </div>
    </section>
  );
}

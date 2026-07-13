import logo from "@/assets/velvet-logo.jpeg";

const INSTAGRAM = "https://www.instagram.com/velvet_stories_2026/";

const LINKS = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "Why Us", href: "#why" },
  { label: "Contact", href: "#contact" },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-gold/15 pt-20">
      {/* moving divider */}
      <div className="absolute left-0 top-0 h-px w-full overflow-hidden">
        <div className="gold-line animate-marquee h-full w-[200%]" />
      </div>

      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col items-center gap-8 text-center">
          <span className="h-20 w-20 overflow-hidden rounded-full ring-1 ring-gold/40">
            <img src={logo} alt="Velvet Stories Logo" className="h-full w-full object-cover" />
          </span>
          <h2 className="font-display text-5xl text-cream md:text-7xl">
            Velvet <span className="italic shimmer-text">Stories</span>
          </h2>
          <p className="max-w-md text-muted-foreground">
            Moments that last forever — crafted with luxury, creativity and cinematic care.
          </p>

          <nav className="flex flex-wrap items-center justify-center gap-6">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-gold"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <a
            href={INSTAGRAM}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-full border border-gold/30 px-6 py-3 text-sm text-cream transition-all hover:border-gold/60 hover:bg-gold/10"
          >
            <span className="text-gold">◎</span> @velvet_stories_2026
          </a>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-gold/10 py-8 text-xs text-muted-foreground md:flex-row">
          <p className="tracking-wide">
            © {new Date().getFullYear()} Velvet Stories. All moments reserved.
          </p>
          <p className="tracking-[0.2em]">DESIGNED WITH ✦ CINEMATIC CARE</p>
        </div>
      </div>
    </footer>
  );
}

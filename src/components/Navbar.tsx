import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/velvet-logo.jpeg";
import { EASE } from "./motion-primitives";

const LINKS = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Our Works", href: "#portfolio" },
  { label: "Why Us", href: "#why" },
  { label: "Voices", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("#home");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    const sections = LINKS.map((l) => document.querySelector(l.href)).filter(Boolean) as Element[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive("#" + e.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => {
      window.removeEventListener("scroll", onScroll);
      io.disconnect();
    };
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: EASE, delay: 0.2 }}
        className="fixed inset-x-0 top-0 z-[100] flex justify-center "
      >
        <nav
          className={`glass-strong  pb-4 flex w-full  items-center justify-between px-4 shadow-[var(--shadow-luxe)] transition-all duration-500 md:px-6 ${
            scrolled ? "py-1.5" : "py-2.5"
          }`}
        >
          {/* Logo */}
          <a href="#home" className="flex items-center gap-3">
            <span
              className={`relative overflow-hidden rounded-full ring-1 ring-gold/40 transition-all duration-500 ${
                scrolled ? "h-9 w-9" : "h-11 w-11"
              }`}
            >
              <img
                src={logo}
                alt="Velvet Stories Logo"
                className="h-full w-full object-cover"
              />
            </span>
            <span className="hidden flex-col leading-none sm:flex">
              <span className="font-display text-lg tracking-wide text-cream">Velvet Stories</span>
              <span className="text-[9px] uppercase tracking-[0.35em] text-gold/80">
                Moments that last forever
              </span>
            </span>
          </a>

          {/* Desktop links */}
          <ul className="hidden items-center gap-1 lg:flex">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="group relative block px-4 py-2 text-xs uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-cream"
                >
                  {l.label}
                  <span
                    className={`gold-line absolute bottom-1 left-4 right-4 h-px origin-left transition-transform duration-400 ${
                      active === l.href ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                  {active === l.href && (
                    <motion.span
                      layoutId="nav-dot"
                      className="absolute -top-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-gold"
                    />
                  )}
                </a>
              </li>
            ))}
          </ul>

          <a
            href="#contact"
            className="relative ml-2 hidden overflow-hidden rounded-full bg-[image:var(--gradient-gold)] px-6 py-2.5 text-xs uppercase tracking-[0.18em] text-espresso transition-transform hover:scale-105 md:inline-block"
          >
            Start a project
          </a>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen((o) => !o)}
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
            aria-label="Menu"
          >
            <span
              className={`h-px w-6 bg-cream transition-all duration-300 ${open ? "translate-y-[7px] rotate-45" : ""}`}
            />
            <span className={`h-px w-6 bg-cream transition-all duration-300 ${open ? "opacity-0" : ""}`} />
            <span
              className={`h-px w-6 bg-cream transition-all duration-300 ${open ? "-translate-y-[7px] -rotate-45" : ""}`}
            />
          </button>
        </nav>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99] flex flex-col items-center justify-center gap-2 bg-[image:var(--gradient-dark)] lg:hidden"
          >
            {LINKS.map((l, i) => (
              <motion.a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.07, ease: EASE }}
                className="font-display text-4xl text-cream transition-colors hover:text-gold"
              >
                {l.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

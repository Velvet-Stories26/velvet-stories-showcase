import { JSX, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/velvet-logo.jpeg";
import { EASE } from "./motion-primitives";

const LINKS = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Our Works", href: "#portfolio" },
  { label: "Why Us", href: "#why" },
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

  useEffect(() => {
    if (open) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

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
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[9998] bg-black/20 backdrop-blur-sm lg:hidden"
              onClick={() => setOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="fixed right-0 top-0 z-[9999] h-screen w-3/4 flex flex-col bg-gradient-to-b from-[#FAF6EF] to-[#F5EEE2] lg:hidden overflow-y-auto"
            >
              {/* Header with Logo and Close Button */}
              <div className="flex items-center justify-between px-6 pt-6 pb-8">
                {/* Logo */}
                <a href="#home" onClick={() => setOpen(false)} className="flex items-center gap-2">
                  <span className="relative overflow-hidden rounded-full ring-1 ring-gold/40 h-12 w-12">
                    <img
                      src={logo}
                      alt="Velvet Stories Logo"
                      className="h-full w-full object-cover"
                    />
                  </span>
                  <div className="flex flex-col leading-none">
                    <span className="font-display text-base tracking-wide text-espresso">Velvet Stories</span>
                    <span className="text-[8px] uppercase tracking-[0.3em] text-gold/70">
                      Premium creative
                    </span>
                  </div>
                </a>

                {/* Close Button */}
                <motion.button
                  onClick={() => setOpen(false)}
                  whileHover={{ rotate: 90 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="h-12 w-12 rounded-full bg-white border border-[#C79A5B] shadow-lg flex items-center justify-center text-espresso text-xl font-light"
                  aria-label="Close menu"
                >
                  ✕
                </motion.button>
              </div>

              {/* Navigation Items */}
              <div className="flex-1 px-8 pt-8 pb-10">
                <nav className="flex flex-col gap-4 w-full">
                  {LINKS.map((link, i) => {
                    const isActive = active === link.href;
                    const icons: Record<string, JSX.Element> = {
                      "#home": (
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
                        </svg>
                      ),
                      "#services": (
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                        </svg>
                      ),
                      "#portfolio": (
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20 6h-2.18c.11-.9.32-1.75.62-2.56-.66-.34-1.36-.64-2.08-.9-1.39 1.32-2.36 3.2-2.5 5.46H8.14c-.14-2.26-1.11-4.14-2.5-5.46-.72.26-1.42.56-2.08.9.3.81.51 1.66.62 2.56H4c-2.2 0-4 1.8-4 4v10c0 2.2 1.8 4 4 4h16c2.2 0 4-1.8 4-4V10c0-2.2-1.8-4-4-4zm0 14H4V10h16v10zm-5-6.5c0-1.38-1.12-2.5-2.5-2.5s-2.5 1.12-2.5 2.5 1.12 2.5 2.5 2.5 2.5-1.12 2.5-2.5z" />
                        </svg>
                      ),
                      "#why": (
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
                        </svg>
                      ),
                      "#contact": (
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                        </svg>
                      ),
                    };

                    const icon = icons[link.href];

                    return (
                      <motion.a
                        key={link.href}
                        href={link.href}
                        onClick={() => setOpen(false)}
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + i * 0.08, ease: "easeOut" }}
                        className={`flex items-center gap-4 px-5 py-4 rounded-xl transition-all duration-300 group ${
                          isActive
                            ? "bg-[#F5EEE2] border border-[#D8C3A5]/60"
                            : "bg-white/50 border border-[#E8E0D5]/40 hover:bg-[#F5EEE2] hover:border-[#D8C3A5]/60"
                        }`}
                      >
                        <span
                          className={`flex items-center justify-center w-6 h-6 transition-all duration-300 ${
                            isActive ? "text-[#C79A5B]" : "text-espresso/70 group-hover:text-[#C79A5B]"
                          }`}
                        >
                          {icon}
                        </span>
                        <span
                          className={`font-display text-lg font-medium flex-1 transition-all duration-300 ${
                            isActive ? "text-espresso" : "text-espresso"
                          }`}
                        >
                          {link.label}
                        </span>
                      </motion.a>
                    );
                  })}
                </nav>
              </div>

              {/* Bottom Section */}
              <div className="px-2 pb-10 flex flex-col gap-6">
                {/* Instagram Link */}
                <motion.a
                  href="https://www.instagram.com/velvet_stories_2026/"
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, ease: "easeOut" }}
                  className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-white/60 border border-[#D8C3A5]/40 hover:bg-[#C79A5B] hover:border-[#C79A5B] transition-all duration-300 group"
                >
                  <svg className="w-6 h-6 text-[#C79A5B] group-hover:text-white transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm4.846-10.403c-.795 0-1.44-.645-1.44-1.44s.645-1.44 1.44-1.44 1.44.645 1.44 1.44-.645 1.44-1.44 1.44z" />
                  </svg>
                  <span className="font-display text-lg text-espresso group-hover:text-white transition-colors">@velvet_stories_2026</span>
                </motion.a>

              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

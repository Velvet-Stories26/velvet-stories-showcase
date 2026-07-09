import { useEffect, useRef, useState } from "react";

export function LuxeCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [hidden, setHidden] = useState(true);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;
    document.documentElement.classList.add("cursor-luxe");

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ring = { x: pos.x, y: pos.y };
    let raf = 0;

    const move = (e: MouseEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      setHidden(false);
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${pos.x - 3}px, ${pos.y - 3}px, 0)`;
      }
      const el = e.target as HTMLElement;
      setActive(!!el.closest("a, button, [data-magnetic], input, textarea"));
    };
    const loop = () => {
      ring.x += (pos.x - ring.x) * 0.15;
      ring.y += (pos.y - ring.y) * 0.15;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.x - 18}px, ${ring.y - 18}px, 0)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseleave", () => setHidden(true));

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", move);
      document.documentElement.classList.remove("cursor-luxe");
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] hidden md:block" aria-hidden>
      <div
        ref={dotRef}
        className="fixed left-0 top-0 h-1.5 w-1.5 rounded-full bg-gold"
        style={{ opacity: hidden ? 0 : 1 }}
      />
      <div
        ref={ringRef}
        className="fixed left-0 top-0 h-9 w-9 rounded-full border border-gold/60 transition-[width,height,opacity,background] duration-300"
        style={{
          opacity: hidden ? 0 : 1,
          width: active ? "56px" : "36px",
          height: active ? "56px" : "36px",
          marginLeft: active ? "-10px" : "0",
          marginTop: active ? "-10px" : "0",
          background: active ? "oklch(0.82 0.11 82 / 0.12)" : "transparent",
        }}
      />
    </div>
  );
}

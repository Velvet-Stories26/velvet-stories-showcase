const ITEMS = [
  "Websites",
  "Wedding Invitations",
  "Branding",
  "Graphic Design",
  "Photography Portfolios",
  "Digital Brochures",
  "Logo Design",
  "Student Projects",
  "Business Cards",
  "Packaging",
];

export function Marquee() {
  const row = [...ITEMS, ...ITEMS];
  return (
    <div className="relative overflow-hidden border-y border-gold/15 bg-card/40 py-6">
      <div className="animate-marquee flex w-max items-center gap-10 whitespace-nowrap">
        {row.map((item, i) => (
          <span key={i} className="flex items-center gap-10">
            <span className="font-display text-2xl italic text-cream/80 md:text-3xl">{item}</span>
            <span className="text-gold">✦</span>
          </span>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-background to-transparent" />
    </div>
  );
}

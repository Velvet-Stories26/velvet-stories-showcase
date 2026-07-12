const ITEMS = [
  // 🌐 Website & Digital Services
  "Custom Surprise Websites",
  "Wedding Invitation Websites",
  "Baby Shower Websites",
  "Housewarming Websites",
  "Birthday Invitation Websites",
  "Farewell Invitation Websites",
  "Freshers' Day Websites",
  "School & College Event Websites",
  "College Symposium Websites",
  "Event Websites",
  "Personal Portfolio Websites",
  "Photography Portfolio Websites",
  "Digital Visiting Cards",
  "Business Landing Pages",
  "RSVP Websites",
  "Digital Wedding Albums",
  "Wedding Countdown Pages",
  "Couple Timeline Websites",
  "QR Code Invitations",
  "Feedback Websites",
  "Customer Review Websites",

  // 💍 Wedding & Invitation Design
  "Wedding Invitation Cards",
  "Save the Date Cards",
  "Thank You Cards",
  "Digital Invitation Cards",

  // 📄 Business Documents & Digital Assets
  "Digital Brochures",
  "Product Catalog PDFs",
  "Canva Editable Templates",
  "Habit Trackers",

  // 🎓 College & Student Services
  "College Mini Projects",
  "Final Year Projects",
  "React Projects",
  "Python Projects",
  "Django Projects",
  "Java Projects",
  "HTML/CSS/JavaScript Projects",
  "Project Documentation",
  "Project Reports",
  "PPT Presentations",
  "LinkedIn Profile Optimization",

  // 🎨 Graphic Design
  "Shop Posters",
  "Festival Posters",
  "Offer Posters",
  "Instagram Post Designs",
  "Reels Cover Designs",
  "Flyers",
  "Brochures",
  "Menu Cards",
  "Business Cards",
  "Letterheads",
  "Gift Vouchers",
  "Banners",
  "Standees",
  "Packaging Labels",
  "Product Labels",

  // 🌟 Branding
  "Logo Design",
  "Brand Identity Kit",
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

import { createFileRoute } from "@tanstack/react-router";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import { LuxeCursor } from "@/components/LuxeCursor";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { Services } from "@/components/Services";
import { Portfolio } from "@/components/Portfolio";
import { WhyUs } from "@/components/WhyUs";
import { Testimonials } from "@/components/Testimonials";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  useSmoothScroll();
  return (
    <main className="relative bg-background">
      <LuxeCursor />
      <Navbar />
      <Hero />
      <Marquee />
      <Services />
      <Portfolio />
      <WhyUs />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
}

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
import { AuraBand } from "@/components/AuraBand";

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
      <AuraBand
        image="glow"
        eyebrow="Every detail, intentional"
        line="Where craft becomes emotion, and moments turn into gold."
      />
      <Portfolio />
      <AuraBand
        image="silk"
        eyebrow="The Velvet difference"
        line="Not decorated — directed. Every frame designed to be felt."
        align="left"
      />
      <WhyUs />
      <Testimonials />
      <AuraBand
        image="glow"
        eyebrow="Your story, next"
        line="Let's craft something the world remembers."
      />
      <Contact />
      <Footer />
    </main>
  );
}

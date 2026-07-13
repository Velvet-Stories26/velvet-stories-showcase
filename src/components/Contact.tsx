import { useState } from "react";
import { motion } from "framer-motion";
import { SplitReveal, Reveal, Magnetic, EASE } from "./motion-primitives";
import { GoldParticles } from "./GoldParticles";
import { FORMSPREE_ENDPOINT } from "@/lib/formspree";

const INSTAGRAM = "https://www.instagram.com/velvet_stories_2026/";

export function Contact() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!FORMSPREE_ENDPOINT || FORMSPREE_ENDPOINT.includes("REPLACE_WITH_YOUR_FORMSPREE_ENDPOINT") || FORMSPREE_ENDPOINT.includes("REPLACE")) {
      setError("Formspree endpoint is not configured. Please paste your Formspree URL into src/lib/formspree.ts");
      return;
    }

    // Basic validation: ensure user pasted a Formspree endpoint (not Typeform or other URL)
    if (!FORMSPREE_ENDPOINT.includes("formspree.io")) {
      setError(
        "Configured endpoint doesn't look like a Formspree endpoint. Please paste your Formspree form URL (https://formspree.io/f/xxxx) into src/lib/formspree.ts",
      );
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload: Record<string, string> = {};
    formData.forEach((value, key) => {
      payload[key] = String(value);
    });

    try {
      const resp = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });

      let body: any = null;
      try {
        body = await resp.json();
      } catch {
        // ignore JSON parse errors
      }

      if (resp.ok) {
        form.reset();
        setSent(true);
      } else {
        const msg = (body && (body.error || body.message)) || `Submission failed (${resp.status})`;
        setError(msg);
      }
    } catch (err) {
      setError("Network error while sending message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="noise relative overflow-hidden py-28 md:py-40">
      <GoldParticles count={18} />
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-gold/10 blur-[150px]" />

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, ease: EASE }}
          viewport={{ once: true }}
          className="block text-xs uppercase tracking-[0.35em] text-gold/80"
        >
          The final scene
        </motion.span>
        <SplitReveal
          text="Let's create something unforgettable"
          as="h2"
          className="mx-auto mt-4 max-w-3xl font-display text-4xl leading-tight text-cream md:text-6xl"
        />
        <Reveal delay={0.2}>
          <p className="mx-auto mt-5 max-w-lg text-muted-foreground">
            Tell us about your moment. We'll turn it into a story worth remembering.
          </p>
        </Reveal>

        <Reveal delay={0.3} className="mt-12">
          {sent ? (
            <div className="glass-strong mx-auto max-w-lg rounded-2xl p-10">
              <div className="text-4xl text-gold">✦</div>
              <h3 className="mt-4 font-display text-2xl text-cream">Thank you</h3>
              <p className="mt-2 text-muted-foreground">
                For the fastest response, send us a message on Instagram — we reply there daily.
              </p>
              <a
                href={INSTAGRAM}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-block rounded-full bg-[image:var(--gradient-gold)] px-8 py-3 text-sm uppercase tracking-[0.2em] text-espresso transition-transform hover:scale-105"
              >
                Message us on Instagram
              </a>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="glass-strong mx-auto max-w-lg space-y-5 rounded-2xl p-8 text-left">
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Your name" name="name" />
                <Field label="Occasion" name="occasion" />
              </div>
              <Field label="Email or phone" name="email" />
              <div>
                <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-gold/70">
                  Tell us your story
                </label>
                <textarea
                  name="message"
                  rows={4}
                  className="w-full resize-none rounded-xl border border-gold/25 bg-background/40 px-4 py-3 text-cream outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-gold/60"
                  placeholder="A wedding, a surprise, a brand..."
                />
              </div>

              {error && <div className="text-sm text-red-500">{error}</div>}

              <Magnetic>
                <button
                  type="submit"
                  disabled={loading}
                  className={`group relative w-full overflow-hidden rounded-full bg-[image:var(--gradient-gold)] py-4 text-sm uppercase tracking-[0.2em] text-espresso ${
                    loading ? "opacity-60 cursor-not-allowed" : ""
                  }`}
                >
                  <span className="relative z-10">Send your story</span>
                </button>
              </Magnetic>
            </form>
          )}
        </Reveal>

        <Reveal delay={0.4}>
          <div className="mt-10 flex items-center justify-center gap-3 text-sm text-muted-foreground">
            <span className="h-px w-8 bg-gold/40" />
            Find us on
            <a
              href={INSTAGRAM}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold transition-colors hover:text-cream"
            >
              @velvet_stories_2026
            </a>
            <span className="h-px w-8 bg-gold/40" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Field({ label, name }: { label: string; name: string }) {
  return (
    <div>
      <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-gold/70">{label}</label>
      <input
        name={name}
        className="w-full rounded-xl border border-gold/25 bg-background/40 px-4 py-3 text-cream outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-gold/60"
      />
    </div>
  );
}

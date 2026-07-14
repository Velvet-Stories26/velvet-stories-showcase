import { useState } from "react";
import { motion } from "framer-motion";
import { SplitReveal, Reveal, Magnetic, EASE } from "./motion-primitives";
import { GoldParticles } from "./GoldParticles";
import { WEB3FORMS_ACCESS_KEY, WEB3FORMS_ENDPOINT } from "@/lib/formspree";

const INSTAGRAM = "https://www.instagram.com/velvet_stories_2026/";

// Validation helper functions
const validateEmail = (email: string): boolean => {
  if (!email) return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePhoneNumber = (phone: string): boolean => {
  if (!phone) return false;
  // Remove common formatting characters
  const cleaned = phone.replace(/[\s\-\(\)\.]/g, "");
  // Accept 7+ digit phone numbers
  return /^\+?[\d]{7,}$/.test(cleaned);
};

interface FormData {
  name: string;
  occasion: string;
  email: string;
  phone: string;
  message: string;
}

interface ValidationErrors {
  name?: string;
  occasion?: string;
  message?: string;
  contact?: string;
  email?: string;
  phone?: string;
}

export function Contact() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [formData, setFormData] = useState<FormData>({
    name: "",
    occasion: "",
    email: "",
    phone: "",
    message: "",
  });
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});

  // Validate the form before submission
  const validateForm = (): boolean => {
    const errors: ValidationErrors = {};

    // Required field validation
    if (!formData.name.trim()) {
      errors.name = "Name is required";
    }

    if (!formData.occasion.trim()) {
      errors.occasion = "Occasion is required";
    }

    if (!formData.message.trim()) {
      errors.message = "Your story is required";
    }

    // Contact method validation: at least one is required
    const hasEmail = formData.email.trim() !== "";
    const hasPhone = formData.phone.trim() !== "";

    if (!hasEmail && !hasPhone) {
      errors.contact = "Please provide either an email or phone number";
    }

    // Validate email format if provided
    if (hasEmail && !validateEmail(formData.email)) {
      errors.email = "Please enter a valid email address";
    }

    // Validate phone format if provided
    if (hasPhone && !validatePhoneNumber(formData.phone)) {
      errors.phone = "Please enter a valid phone number";
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear validation error for this field when user starts typing
    if (validationErrors[name as keyof ValidationErrors]) {
      setValidationErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check if Web3Forms access key is configured
    if (!WEB3FORMS_ACCESS_KEY || WEB3FORMS_ACCESS_KEY === "d80659a3-4757-4ebf-95f3-bccb4db92c00") {
      setError(
        "Web3Forms access key is not configured. Please add your Web3Forms Access Key to src/lib/formspree.ts",
      );
      return;
    }

    // Validate form before submission
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError(null);
    setValidationErrors({});

    try {
      // Prepare data for Web3Forms
      const payload = {
        access_key: WEB3FORMS_ACCESS_KEY,
        name: formData.name,
        occasion: formData.occasion,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
        // Optional: Add a redirect URL or other fields
        subject: `New Story Submission from ${formData.name}`,
      };

      // Submit to Web3Forms API
      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const responseData = await response.json();

      if (response.ok && responseData.success) {
        // Determine success message based on contact method
        let message = "";
        const hasEmail = formData.email.trim() !== "";
        const hasPhone = formData.phone.trim() !== "";

        if (hasEmail && hasPhone) {
          message =
            "Thank you for reaching out! Your story has been received successfully. We'll contact you using your preferred contact details shortly.";
        } else if (hasEmail) {
          message =
            "Thank you for reaching out! Your story has been received successfully. We'll contact you through your email as soon as possible.";
        } else if (hasPhone) {
          message =
            "Thank you for reaching out! Your story has been received successfully. We'll contact you through your phone number as soon as possible.";
        }

        setSuccessMessage(message);
        setFormData({
          name: "",
          occasion: "",
          email: "",
          phone: "",
          message: "",
        });
        setSent(true);
      } else {
        const errorMsg = responseData.message || "Failed to submit your story. Please try again.";
        setError(errorMsg);
      }
    } catch (err) {
      setError("Network error while sending your story. Please check your connection and try again.");
      console.error("Form submission error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="noise relative overflow-hidden py-28 md:py-40">
      <GoldParticles count={18} />
      <div className="pointer-events-none absolute left-1/3 top-1/3 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-gold/10 blur-[150px]" />

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
              <p className="mt-2 text-muted-foreground">{successMessage}</p>
              <a
                href={INSTAGRAM}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-block rounded-full bg-[image:var(--gradient-gold)] px-8 py-3 text-sm uppercase tracking-[0.2em] text-espresso transition-transform hover:scale-105"
              >
                Message us on Instagram
              </a>
              <button
                onClick={() => {
                  setSent(false);
                  setSuccessMessage("");
                }}
                className="mt-4 text-sm text-gold hover:text-cream transition-colors"
              >
                Submit another story
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="glass-strong mx-auto max-w-lg space-y-5 rounded-2xl p-8 text-left">
              {/* Name and Occasion Fields */}
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <Field
                    label="Your name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    error={validationErrors.name}
                    required
                  />
                </div>
                <div>
                  <Field
                    label="Occasion"
                    name="occasion"
                    value={formData.occasion}
                    onChange={handleInputChange}
                    error={validationErrors.occasion}
                    required
                  />
                </div>
              </div>

              {/* Email and Phone Fields (Separated) */}
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <Field
                    label="Email Address"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    error={validationErrors.email}
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <Field
                    label="Phone Number(optional)"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    error={validationErrors.phone}
                    placeholder="optional"
                  />
                </div>
              </div>

              {/* Contact method validation error */}
              {validationErrors.contact && (
                <div className="text-sm text-red-500">{validationErrors.contact}</div>
              )}

              {/* Story/Message Field */}
              <div>
                <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-gold/70">
                  Tell us your story <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  className={`w-full resize-none rounded-xl border ${
                    validationErrors.message ? "border-red-500" : "border-gold/25"
                  } bg-background/40 px-4 py-3 text-cream outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-gold/60`}
                  placeholder="A wedding, a surprise, a brand..."
                />
                {validationErrors.message && (
                  <p className="mt-1 text-sm text-red-500">{validationErrors.message}</p>
                )}
              </div>

              {/* Error Message Display */}
              {error && <div className="text-sm text-red-500">{error}</div>}

              {/* Submit Button */}
              <Magnetic>
                <button
                  type="submit"
                  disabled={loading}
                  className={`group relative w-full overflow-hidden rounded-full bg-[image:var(--gradient-gold)] py-4 text-sm uppercase tracking-[0.2em] text-espresso ${
                    loading ? "opacity-60 cursor-not-allowed" : ""
                  }`}
                >
                  <span className="relative z-10 p-4">
                    {loading ? "Sending your story..." : "Send your story"}
                  </span>
                </button>
              </Magnetic>
            </form>
          )}
        </Reveal>

        <Reveal delay={0.4}>
          <div className="mt-10 flex items-center justify-center gap-3 text-sm text-muted-foreground">
            <span className="h-px w-8 bg-gold/40" />
            Find us on instagram
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

interface FieldProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  placeholder?: string;
  required?: boolean;
}

function Field({ label, name, type = "text", value, onChange, error, placeholder, required }: FieldProps) {
  return (
    <div>
      <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-gold/70">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <input
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full rounded-xl border ${
          error ? "border-red-500" : "border-gold/25"
        } bg-background/40 px-4 py-3 text-cream outline-none transition-colors placeholder:text-muted-foreground/50 focus:border-gold/60`}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}

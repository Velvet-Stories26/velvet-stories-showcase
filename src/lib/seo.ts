/**
 * SEO Utilities and Structured Data Helpers
 * Provides functions to generate JSON-LD schemas and SEO-related data
 */

export const SITE_URL = "https://velvetstories.com"; // Update with actual domain
export const BUSINESS_NAME = "Velvet Stories";
export const BUSINESS_TAGLINE = "Cinematic Creative Studio";
export const BUSINESS_DESCRIPTION =
  "Premium creative studio crafting cinematic websites, surprise websites, luxury invitations, branding and graphic design. Moments that last forever.";
export const BUSINESS_EMAIL = "contact@velvetstories.com"; // Update with actual email
export const BUSINESS_PHONE = "+91-XXXXXXXXXX"; // Update with actual phone
export const BUSINESS_ADDRESS = {
  streetAddress: "Your Street Address",
  addressLocality: "Tamil Nadu",
  addressRegion: "Tamil Nadu",
  postalCode: "XXXXXX",
  addressCountry: "IN",
};
export const SOCIAL_PROFILES = {
  instagram: "https://www.instagram.com/velvet_stories_2026/",
  twitter: "https://twitter.com/velvetstories", // Update if available
};

/**
 * Generate JSON-LD Organization Schema
 */
export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: BUSINESS_NAME,
    description: BUSINESS_DESCRIPTION,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    email: BUSINESS_EMAIL,
    telephone: BUSINESS_PHONE,
    address: {
      "@type": "PostalAddress",
      ...BUSINESS_ADDRESS,
    },
    sameAs: [SOCIAL_PROFILES.instagram, SOCIAL_PROFILES.twitter],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      email: BUSINESS_EMAIL,
      telephone: BUSINESS_PHONE,
      availableLanguage: ["en", "ta"],
    },
  };
}

/**
 * Generate JSON-LD Local Business Schema
 */
export function generateLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "DigitalCreativeAgency"],
    name: BUSINESS_NAME,
    description: BUSINESS_DESCRIPTION,
    image: `${SITE_URL}/logo.png`,
    url: SITE_URL,
    telephone: BUSINESS_PHONE,
    email: BUSINESS_EMAIL,
    address: {
      "@type": "PostalAddress",
      ...BUSINESS_ADDRESS,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 11.1271, // Tamil Nadu approximate coordinates
      longitude: 79.8711,
    },
    sameAs: [SOCIAL_PROFILES.instagram, SOCIAL_PROFILES.twitter],
    areaServed: {
      "@type": "GeoShape",
      name: "India",
    },
  };
}

/**
 * Generate JSON-LD Website Schema
 */
export function generateWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: BUSINESS_NAME,
    description: BUSINESS_DESCRIPTION,
    url: SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}?s={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/**
 * Generate JSON-LD Service Schema
 */
export function generateServiceSchema(
  serviceName: string,
  description: string,
  provider = BUSINESS_NAME,
) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: serviceName,
    description: description,
    provider: {
      "@type": "Organization",
      name: provider,
      url: SITE_URL,
    },
    areaServed: {
      "@type": "GeoShape",
      name: "India",
    },
    serviceType: serviceName,
  };
}

/**
 * Generate JSON-LD FAQ Schema
 */
export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/**
 * Generate JSON-LD Breadcrumb Schema
 */
export function generateBreadcrumbSchema(
  items: Array<{ name: string; url: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Generate JSON-LD Contact Page Schema
 */
export function generateContactPageSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Us",
    description: "Get in touch with Velvet Stories for your creative project",
    url: `${SITE_URL}#contact`,
    mainEntity: {
      "@type": "Organization",
      name: BUSINESS_NAME,
      url: SITE_URL,
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "Customer Service",
        email: BUSINESS_EMAIL,
        telephone: BUSINESS_PHONE,
        areaServed: "India",
        availableLanguage: ["en", "ta"],
      },
    },
  };
}

/**
 * Generate JSON-LD Testimonial Schema
 */
export function generateTestimonialSchema(
  text: string,
  author: string,
  rating: number,
) {
  return {
    "@context": "https://schema.org",
    "@type": "Review",
    reviewRating: {
      "@type": "Rating",
      ratingValue: rating,
      bestRating: 5,
      worstRating: 1,
    },
    reviewBody: text,
    author: {
      "@type": "Person",
      name: author,
    },
    publisher: {
      "@type": "Organization",
      name: BUSINESS_NAME,
    },
  };
}

/**
 * Generate JSON-LD Product Schema
 */
export function generateProductSchema(
  productName: string,
  description: string,
  image: string,
) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: productName,
    description: description,
    image: image,
    brand: {
      "@type": "Brand",
      name: BUSINESS_NAME,
    },
    manufacturer: {
      "@type": "Organization",
      name: BUSINESS_NAME,
    },
  };
}

/**
 * Keywords for natural SEO content integration
 */
export const SEO_KEYWORDS = {
  primary: [
    "surprise website",
    "birthday surprise website",
    "anniversary website",
    "proposal website",
  ],
  secondary: [
    "digital surprise",
    "online surprise",
    "personalized website",
    "love website",
    "couple website",
  ],
  services: [
    "photo editing",
    "poster designer",
    "birthday poster",
    "wedding poster",
    "digital invitation",
  ],
  professional: [
    "website designer",
    "web developer",
    "creative website",
    "custom website",
    "portfolio website",
    "business website",
  ],
  location: [
    "Tamil Nadu website developer",
    "India website designer",
  ],
};

/**
 * Generate meta description with natural keyword inclusion
 */
export function generateMetaDescription(description: string, maxLength = 160): string {
  if (description.length <= maxLength) return description;
  return description.substring(0, maxLength - 3) + "...";
}

/**
 * Generate canonical URL
 */
export function generateCanonicalUrl(path = "/"): string {
  return `${SITE_URL}${path}`;
}

/**
 * Generate Open Graph meta tags object
 */
export function generateOpenGraphTags(
  title: string,
  description: string,
  url: string,
  image = `${SITE_URL}/og-image.jpg`,
  type = "website",
) {
  return {
    "og:title": title,
    "og:description": description,
    "og:url": url,
    "og:image": image,
    "og:type": type,
    "og:site_name": BUSINESS_NAME,
  };
}

/**
 * Generate Twitter Card meta tags
 */
export function generateTwitterCardTags(
  title: string,
  description: string,
  image = `${SITE_URL}/twitter-image.jpg`,
  creator = "@velvetstories",
) {
  return {
    "twitter:card": "summary_large_image",
    "twitter:title": title,
    "twitter:description": description,
    "twitter:image": image,
    "twitter:creator": creator,
  };
}

/**
 * Security headers for Vercel deployment
 */
export const SECURITY_HEADERS = {
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "SAMEORIGIN",
  "X-XSS-Protection": "1; mode=block",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
};

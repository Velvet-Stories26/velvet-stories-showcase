import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import {
  generateOrganizationSchema,
  generateLocalBusinessSchema,
  generateWebsiteSchema,
  generateContactPageSchema,
} from "../lib/seo";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { httpEquiv: "X-UA-Compatible", content: "IE=edge" },
      { name: "viewport", content: "width=device-width, initial-scale=1.0, viewport-fit=cover" },
      { name: "theme-color", content: "#1a1410" },
      
      // Primary SEO
      { title: "Velvet Stories — Premium Cinematic Creative Studio in India" },
      {
        name: "description",
        content:
          "Velvet Stories: Premium creative studio crafting surprise websites, birthday websites, anniversary websites, proposal websites, digital invitations, posters & graphic design. Custom digital experiences for moments that last forever. Serving Tamil Nadu & India.",
      },
      {
        name: "keywords",
        content:
          "surprise website, birthday surprise website, anniversary website, proposal website, digital surprise, online surprise, personalized website, love website, couple website, photo editing, poster designer, birthday poster, wedding poster, digital invitation, website designer, web developer, creative website, custom website, portfolio website, business website, Tamil Nadu website developer, India website designer",
      },
      { name: "author", content: "Velvet Stories" },
      { name: "copyright", content: "© 2026 Velvet Stories. All moments reserved." },
      { name: "robots", content: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" },
      { name: "revisit-after", content: "7 days" },
      { name: "language", content: "en-US" },
      { name: "format-detection", content: "telephone=no" },
      
      // Canonical URL
      { rel: "canonical", href: "https://velvetstories.com" },
      
      // Open Graph Tags
      { property: "og:title", content: "Velvet Stories — Premium Cinematic Creative Studio" },
      {
        property: "og:description",
        content:
          "Custom surprise websites, personalized invitations, and luxury digital experiences. Crafted with cinematic detail for moments that last forever.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://velvetstories.com" },
      { property: "og:image", content: "https://velvetstories.com/og-image.jpg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:site_name", content: "Velvet Stories" },
      { property: "og:locale", content: "en_US" },
      
      // Twitter Card Tags
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Velvet Stories — Cinematic Creative Studio" },
      {
        name: "twitter:description",
        content: "Premium surprise websites, invitations & design. Moments that last forever.",
      },
      { name: "twitter:image", content: "https://velvetstories.com/twitter-image.jpg" },
      { name: "twitter:site", content: "@velvet_stories_2026" },
      { name: "twitter:creator", content: "@velvet_stories_2026" },
      
      // Mobile Web App
      { name: "apple-mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-status-bar-style", content: "black-translucent" },
      { name: "apple-mobile-web-app-title", content: "Velvet Stories" },
      
      // Additional SEO
      { name: "msapplication-TileColor", content: "#1a1410" },
      { name: "msapplication-config", content: "/browserconfig.xml" },
    ],
    links: [
      // Preconnect to external resources
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "dns-prefetch", href: "https://fonts.googleapis.com" },
      
      // Fonts
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&family=Jost:wght@300;400;500;600&display=swap",
      },
      
      // Stylesheets
      {
        rel: "stylesheet",
        href: appCss,
      },
      
      // Icons
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "shortcut icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
      { rel: "apple-touch-icon", sizes: "180x180", href: "/apple-touch-icon.png" },
      
      // Web App Manifest
      { rel: "manifest", href: "/manifest.json" },
      
      // Alternate links for language/region (if multilingual)
      { rel: "alternate", hrefLang: "en", href: "https://velvetstories.com" },
      { rel: "alternate", hrefLang: "en-IN", href: "https://velvetstories.com" },
      
      // Sitemap
      { rel: "sitemap", href: "https://velvetstories.com/sitemap.xml", type: "application/xml" },
    ],
    // Structured Data (JSON-LD)
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(generateOrganizationSchema()),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(generateLocalBusinessSchema()),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(generateWebsiteSchema()),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(generateContactPageSchema()),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" dir="ltr">
      <head>
        {/* Security and Meta Headers */}
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
        
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}

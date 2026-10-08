import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/nav/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CookieConsent } from "@/components/ui/CookieConsent";
import { ThemeProvider } from "@/context/ThemeContext";
import { SavedHacksProvider } from "@/context/SavedHacksContext";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { JsonLd } from "@/components/seo/JsonLd";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });

const SITE_TITLE = "TryCleaningHacks | Practical Cleaning Hacks for Every Home";
const SITE_DESCRIPTION =
  "Discover practical cleaning hacks using everyday ingredients. Clear steps for kitchen, bathroom, laundry, and whole-home deep cleans.";

/**
 * Consent Mode bootstrap. Runs before Tag Manager so GA4, AdSense and the
 * Pinterest tag (all fired from the GTM container) honor the visitor's
 * choice. The site serves a US audience, so the default is granted; choosing
 * "Decline" in the cookie banner stores that choice and flips every signal
 * to denied, here on the next page load and in CookieConsent for the current
 * one.
 */
const CONSENT_BOOTSTRAP = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
(function(){
  var choice = null;
  try { choice = localStorage.getItem('cookie_consent'); } catch (e) {}
  var state = choice === 'declined' ? 'denied' : 'granted';
  gtag('consent', 'default', {
    ad_storage: state,
    ad_user_data: state,
    ad_personalization: state,
    analytics_storage: state
  });
})();
`;

const GTM_SNIPPET = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-5PRLLC75');`;

export const metadata: Metadata = {
  metadataBase: new URL("https://www.trycleaninghacks.com"),
  // Every icon below is the TryCleaningHacks emblem, generated from
  // assets/brand/logo-source.png by scripts/build-brand-assets.mjs. Google
  // picks one of these for the favicon shown beside the search result and asks
  // for a square at a multiple of 48px, so 48/192/512 are all offered and all
  // carry the same artwork.
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48", type: "image/x-icon" },
      { url: "/brand/icon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/brand/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/brand/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
    apple: [{ url: "/brand/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/site.webmanifest",
  title: {
    default: SITE_TITLE,
    template: "%s | TryCleaningHacks",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "cleaning hacks", "house cleaning tips", "cleaning tricks", "DIY cleaning",
    "baking soda cleaning", "vinegar cleaning", "kitchen cleaning", "bathroom cleaning",
    "laundry hacks", "deep clean", "home cleaning", "natural cleaning",
  ],
  authors: [{ name: "Fredler Pierre-Louis", url: "https://www.trycleaninghacks.com/author/fredler-pierre-louis" }],
  creator: "Fredler Pierre-Louis",
  publisher: "TryCleaningHacks",
  verification: {
    google: "5sbyW1HBzsmC93Y2dwlzj8ckF5rYZx0qbHOfXWymDIA",
    other: {
      "p:domain_verify": ["5e82ddb381fd726eb5ed1e3d6caaaff7"],
    },
  },
  // NOTE: Do NOT set alternates.canonical here. A global canonical on the
  // root layout would incorrectly default every page to the homepage URL.
  // Each page (or its layout) sets its own canonical via buildMeta() or
  // an explicit alternates.canonical in that page's metadata export.
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: "https://www.trycleaninghacks.com",
    siteName: "TryCleaningHacks",
    images: [{ url: "/api/og", width: 1200, height: 630, alt: "TryCleaningHacks" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: "Discover practical cleaning hacks using everyday ingredients. Clear steps you can follow in minutes.",
    images: ["/api/og"],
  },
};

// Explicit viewport so phones always render at device width and can pinch-zoom
// (accessibility). viewportFit "cover" lets us pad against the notch/home-bar
// via env(safe-area-inset-*). themeColor tints the Android browser chrome.
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#060f23" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`light ${inter.variable}`} suppressHydrationWarning>
      <head>
        {/* Flag JS availability before first paint so scroll-reveal only hides
            content when it can actually be revealed (keeps it visible for
            no-JS visitors and crawlers). */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('js')",
          }}
        />
        {/* Consent defaults must be in place before any Google tag loads. */}
        <script id="consent-bootstrap" dangerouslySetInnerHTML={{ __html: CONSENT_BOOTSTRAP }} />
        <link rel="alternate" type="application/rss+xml" title="TryCleaningHacks" href="/feed.xml" />
        {/* AdSense ownership verification + ad serving. */}
        <Script
          id="adsense-verification"
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5416667362161343"
          strategy="afterInteractive"
          crossOrigin="anonymous"
        />
      </head>

      <body className="font-sans antialiased">
        {/* Tag Manager is the single loader for GA4 (G-R97SKNX12S) and the
            Pinterest tag. They used to be loaded here as well, so every page
            downloaded gtag.js twice and fired the Pinterest base code twice. */}
        <Script id="gtm" strategy="afterInteractive">
          {GTM_SNIPPET}
        </Script>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-5PRLLC75"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <ThemeProvider>
          <SavedHacksProvider>
            <JsonLd
              data={{
                "@context": "https://schema.org",
                "@type": "WebSite",
                name: "TryCleaningHacks",
                url: "https://www.trycleaninghacks.com",
                description: "Discover practical cleaning hacks using everyday ingredients.",
                potentialAction: {
                  "@type": "SearchAction",
                  target: "https://www.trycleaninghacks.com/cleaning-hacks?q={search_term_string}",
                  "query-input": "required name=search_term_string",
                },
              }}
            />
            <JsonLd
              data={{
                "@context": "https://schema.org",
                "@type": "Organization",
                name: "TryCleaningHacks",
                url: "https://www.trycleaninghacks.com",
                logo: {
                  "@type": "ImageObject",
                  url: "https://www.trycleaninghacks.com/brand/logo.png",
                  width: 1000,
                  height: 1004,
                },
                contactPoint: {
                  "@type": "ContactPoint",
                  email: "support@trycleaninghacks.com",
                  contactType: "customer service",
                },
              }}
            />
            <Navbar />
            <main className="min-h-screen">{children}</main>
            <Footer />
            <CookieConsent />
          </SavedHacksProvider>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

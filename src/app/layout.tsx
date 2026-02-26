import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/nav/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CookieConsent } from "@/components/ui/CookieConsent";
import { ThemeProvider } from "@/context/ThemeContext";
import { SavedHacksProvider } from "@/context/SavedHacksContext";
import { Analytics } from "@vercel/analytics/next";
import { JsonLd } from "@/components/seo/JsonLd";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://trycleaninghacks.com"),
  title: {
    default: "TryCleaningHacks — Tested Cleaning Hacks for Every Home",
    template: "%s | TryCleaningHacks",
  },
  description: "Discover 200+ tested cleaning hacks using everyday ingredients. Professional results for kitchen, bathroom, laundry, and whole-home deep cleans.",
  keywords: [
    "cleaning hacks", "house cleaning tips", "cleaning tricks", "DIY cleaning",
    "baking soda cleaning", "vinegar cleaning", "kitchen cleaning", "bathroom cleaning",
    "laundry hacks", "deep clean", "home cleaning", "natural cleaning",
  ],
  authors: [{ name: "TryCleaningHacks", url: "https://trycleaninghacks.com" }],
  creator: "TryCleaningHacks",
  publisher: "TryCleaningHacks",
  verification: {
    google: "5sbyW1HBzsmC93Y2dwlzj8ckF5rYZx0qbHOfXWymDIA",
  },
  alternates: {
    canonical: "https://trycleaninghacks.com",
  },
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
    title: "TryCleaningHacks — Tested Cleaning Hacks for Every Home",
    description: "Discover 200+ tested cleaning hacks using everyday ingredients. Professional results for kitchen, bathroom, laundry, and whole-home deep cleans.",
    url: "https://trycleaninghacks.com",
    siteName: "TryCleaningHacks",
    images: [{ url: "/og/og-home.png", width: 1200, height: 630, alt: "TryCleaningHacks" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TryCleaningHacks — Tested Cleaning Hacks for Every Home",
    description: "Discover 200+ tested cleaning hacks using everyday ingredients. Professional results in minutes.",
    images: ["/og/og-home.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`light ${inter.variable} ${playfair.variable}`} suppressHydrationWarning>
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5416667362161343"
          crossOrigin="anonymous"
        />
      </head>
      <body className="font-sans antialiased">
        <ThemeProvider>
          <SavedHacksProvider>
            <JsonLd
              data={{
                "@context": "https://schema.org",
                "@type": "WebSite",
                name: "TryCleaningHacks",
                url: "https://trycleaninghacks.com",
                description: "Discover 200+ tested cleaning hacks using everyday ingredients.",
                potentialAction: {
                  "@type": "SearchAction",
                  target: "https://trycleaninghacks.com/posts?q={search_term_string}",
                  "query-input": "required name=search_term_string",
                },
              }}
            />
            <JsonLd
              data={{
                "@context": "https://schema.org",
                "@type": "Organization",
                name: "TryCleaningHacks",
                url: "https://trycleaninghacks.com",
                logo: "https://trycleaninghacks.com/og/og-home.png",
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
      </body>
    </html>
  );
}

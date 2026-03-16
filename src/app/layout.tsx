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
import Script from "next/script";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.trycleaninghacks.com"),
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
  authors: [{ name: "TryCleaningHacks", url: "https://www.trycleaninghacks.com" }],
  creator: "TryCleaningHacks",
  publisher: "TryCleaningHacks",
  verification: {
    google: "5sbyW1HBzsmC93Y2dwlzj8ckF5rYZx0qbHOfXWymDIA",
    other: {
      "p:domain_verify": ["5e82ddb381fd726eb5ed1e3d6caaaff7"],
    },
  },
  alternates: {
    canonical: "https://www.trycleaninghacks.com",
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
    url: "https://www.trycleaninghacks.com",
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
      <Script id="gtm" strategy="afterInteractive">
        {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-5PRLLC75');`}
      </Script>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-R97SKNX12S"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-R97SKNX12S');
        `}
      </Script>
      <Script id="pinterest-tag" strategy="afterInteractive">
        {`
          !function(e){if(!window.pintrk){window.pintrk=function(){window.pintrk.queue.push(Array.prototype.slice.call(arguments))};var n=window.pintrk;n.queue=[],n.version="3.0";var t=document.createElement("script");t.async=!0,t.src=e;var r=document.getElementsByTagName("script")[0];r.parentNode.insertBefore(t,r)}}("https://s.pinimg.com/ct/core.js");
          pintrk('load', '2613182917179');
          pintrk('page');
        `}
      </Script>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img height="1" width="1" style={{display:'none'}} alt="" src="https://ct.pinterest.com/v3/?event=init&tid=2613182917179&noscript=1" />
      </noscript>
      <body className="font-sans antialiased">
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-5PRLLC75"
            height="0"
            width="0"
            style={{display:'none',visibility:'hidden'}}
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
                description: "Discover 200+ tested cleaning hacks using everyday ingredients.",
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
                logo: "https://www.trycleaninghacks.com/og/og-home.png",
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

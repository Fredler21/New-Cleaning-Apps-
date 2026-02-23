import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Navbar } from "@/components/nav/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ThemeProvider } from "@/context/ThemeContext";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://trycleaninghacks.com"),
  title: "TryCleaningHacks",
  description: "Tested cleaning hacks, quick wins, and deep-clean routines for every home.",
  openGraph: {
    title: "TryCleaningHacks",
    description: "Tested cleaning hacks, quick wins, and deep-clean routines for every home.",
    url: "https://trycleaninghacks.com",
    siteName: "TryCleaningHacks",
    images: [{ url: "/og/og-home.png", width: 1200, height: 630, alt: "TryCleaningHacks" }],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "TryCleaningHacks",
    description: "Tested cleaning hacks for kitchen, bath, laundry, and deep-clean routines.",
    images: ["/og/og-home.png"]
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`light ${inter.variable} ${playfair.variable}`} suppressHydrationWarning>
      <head>
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5416667362161343"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className="font-sans antialiased">
        <ThemeProvider>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}

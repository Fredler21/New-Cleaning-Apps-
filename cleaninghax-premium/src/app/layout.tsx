import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/nav/Navbar";
import { Footer } from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://cleaninghax.example"),
  title: "CleaningHax Premium",
  description: "Premium cleaning hacks inspired by social-friendly routines and high-end home care.",
  openGraph: {
    title: "CleaningHax Premium",
    description: "High-end cleaning hacks, quick wins, and deep-clean routines.",
    url: "https://cleaninghax.example",
    siteName: "CleaningHax Premium",
    images: [{ url: "/og/og-home.png", width: 1200, height: 630, alt: "CleaningHax Premium" }],
    locale: "en_US",
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: "CleaningHax Premium",
    description: "Premium cleaning hacks for kitchen, bath, laundry, and deep clean routines.",
    images: ["/og/og-home.png"]
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

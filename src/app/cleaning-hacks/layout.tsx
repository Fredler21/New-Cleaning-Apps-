import type { Metadata } from "next";
import { buildMeta } from "@/components/seo/Meta";

export const metadata: Metadata = buildMeta({
  title: "Browse All 40+ Cleaning Hacks — Filter by Room, Ingredient & Technique",
  description:
    "Search and filter our full library of 40+ tried-and-tested cleaning hacks. Sort by room (kitchen, bathroom, laundry), ingredient (vinegar, baking soda, Dawn), or effort level. Every hack includes step-by-step instructions, ingredient lists, and safety notes.",
  path: "/cleaning-hacks",
  ogType: "website",
  keywords: [
    "all cleaning hacks", "cleaning hack library", "search cleaning hacks",
    "filter cleaning tips by room", "cleaning guide directory",
    "kitchen cleaning hacks", "bathroom cleaning tips", "vinegar cleaning guide",
    "baking soda cleaning hacks", "dawn dish soap hacks",
  ],
});

export default function PostsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

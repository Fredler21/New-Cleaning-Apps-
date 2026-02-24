import type { Metadata } from "next";
import { buildMeta } from "@/components/seo/Meta";

export const metadata: Metadata = buildMeta({
  title: "All Cleaning Hacks",
  description:
    "Browse all tested cleaning hacks — search by room, ingredient, or technique. Quick wins, deep cleans, and budget-friendly solutions for every home.",
  path: "/posts",
});

export default function PostsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

import type { Metadata } from "next";
import { buildMeta } from "@/components/seo/Meta";

export const metadata: Metadata = buildMeta({
  title: "Contact Us",
  description:
    "Get in touch with the TryCleaningHacks team. Ask a question, suggest a hack, or report an issue — we'd love to hear from you.",
  path: "/contact",
});

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

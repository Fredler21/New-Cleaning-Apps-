import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { buildMeta } from "@/components/seo/Meta";
import { PostGrid } from "@/components/posts/PostGrid";
import { JsonLd } from "@/components/seo/JsonLd";
import { SITE_URL, SITE_NAME } from "@/components/seo/Meta";
import { posts } from "@/data/posts";

export const metadata: Metadata = buildMeta({
  title: "Sarah Mitchell – Founder & Lead Writer",
  description:
    "Sarah Mitchell is the founder and lead writer at TryCleaningHacks. After 9 years as a professional house cleaner in the Chicago area, she tests every method personally before publishing.",
  path: "/author/sarah-mitchell",
  keywords: [
    "Sarah Mitchell",
    "TryCleaningHacks founder",
    "cleaning expert",
    "professional house cleaner",
  ],
});

export default function SarahMitchellPage() {
  const authorPosts = posts.filter(
    (p) => !p.author || p.author === "Sarah Mitchell"
  );

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Sarah Mitchell",
          url: `${SITE_URL}/author/sarah-mitchell`,
          jobTitle: "Founder & Lead Writer",
          worksFor: {
            "@type": "Organization",
            name: SITE_NAME,
            url: SITE_URL,
          },
          description:
            "Sarah Mitchell spent 9 years as a professional house cleaner in the greater Chicago area before founding TryCleaningHacks in 2025. She personally tests every cleaning method published on the site.",
          knowsAbout: [
            "House cleaning",
            "DIY cleaning hacks",
            "Natural cleaning ingredients",
            "Kitchen cleaning",
            "Bathroom cleaning",
            "Laundry care",
          ],
          sameAs: [`${SITE_URL}/about`],
        }}
      />

      <Container>
        <section className="py-12">
          {/* Author profile header */}
          <div
            className="mb-10 flex flex-col gap-6 rounded-2xl p-8 sm:flex-row sm:items-start"
            style={{ background: "var(--card-bg)", border: "1px solid var(--border)" }}
          >
            <div
              className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full text-2xl font-bold"
              style={{ background: "var(--accent-subtle)", color: "var(--accent)" }}
            >
              SM
            </div>
            <div className="flex-1">
              <h1
                className="text-2xl font-bold tracking-tight sm:text-3xl"
                style={{ color: "var(--text)" }}
              >
                Sarah Mitchell
              </h1>
              <p className="mt-1 text-sm font-medium" style={{ color: "var(--accent)" }}>
                Founder &amp; Lead Writer · TryCleaningHacks
              </p>

              <div
                className="mt-4 space-y-3 text-base leading-7"
                style={{ color: "var(--text-secondary)" }}
              >
                <p>
                  Sarah Mitchell spent nearly a decade working as a professional house cleaner
                  in the greater Chicago area before founding TryCleaningHacks in 2025. During
                  that time she cleaned hundreds of homes and accumulated firsthand knowledge of
                  what actually removes stubborn grease, soap scum, hard water stains, and
                  set-in odors — and what doesn&apos;t.
                </p>
                <p>
                  She started writing down the methods that held up under real-world conditions,
                  with exact proportions and surface-by-surface notes. Those notes became this
                  site. Sarah personally tests every cleaning method before it is published, and
                  writes each guide from direct experience rather than secondary research.
                </p>
                <p>
                  Her focus is on what works in real homes using everyday ingredients: baking
                  soda, white vinegar, dish soap, hydrogen peroxide, and similar pantry staples.
                  She avoids recommending products she hasn&apos;t used herself and includes safety
                  warnings only for risks she has directly encountered.
                </p>
              </div>

              {/* Credentials / stats */}
              <div className="mt-6 flex flex-wrap gap-3">
                <span
                  className="rounded-full px-3 py-1 text-sm font-medium"
                  style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text-secondary)" }}
                >
                  9 years professional cleaning experience
                </span>
                <span
                  className="rounded-full px-3 py-1 text-sm font-medium"
                  style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text-secondary)" }}
                >
                  {authorPosts.length}+ guides published
                </span>
                <span
                  className="rounded-full px-3 py-1 text-sm font-medium"
                  style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text-secondary)" }}
                >
                  Every method personally tested
                </span>
              </div>

              <p className="mt-5 text-sm" style={{ color: "var(--text-secondary)" }}>
                Read more about our testing process on the{" "}
                <Link href="/about" className="font-medium hover:underline" style={{ color: "var(--accent)" }}>
                  About page
                </Link>{" "}
                and our standards on the{" "}
                <Link href="/editorial-policy" className="font-medium hover:underline" style={{ color: "var(--accent)" }}>
                  Editorial Policy
                </Link>
                .
              </p>
            </div>
          </div>

          {/* Author's guides */}
          <div>
            <h2 className="mb-6 text-xl font-semibold" style={{ color: "var(--text)" }}>
              Guides by Sarah Mitchell
            </h2>
            <PostGrid posts={authorPosts} />
          </div>
        </section>
      </Container>
    </>
  );
}

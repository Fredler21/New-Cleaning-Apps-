import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { buildMeta } from "@/components/seo/Meta";
import { PostGrid } from "@/components/posts/PostGrid";
import { JsonLd } from "@/components/seo/JsonLd";
import { SITE_URL, SITE_NAME } from "@/components/seo/Meta";
import { posts } from "@/data/posts";

export const metadata: Metadata = buildMeta({
  title: "Fredler Pierre-Louis",
  description:
    "Fredler Pierre-Louis is the writer and editor behind TryCleaningHacks, a library of practical, tested cleaning guides for everyday homes.",
  path: "/author/fredler-pierre-louis",
  keywords: [
    "Fredler Pierre-Louis",
    "TryCleaningHacks author",
    "cleaning writer",
  ],
});

export default function FredlerPierreLouisPage() {
  const authorPosts = posts.filter(
    (p) => !p.author || p.author === "Fredler Pierre-Louis"
  );

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Fredler Pierre-Louis",
          url: `${SITE_URL}/author/fredler-pierre-louis`,
          jobTitle: "Founder & Editor",
          worksFor: {
            "@type": "Organization",
            name: SITE_NAME,
            url: SITE_URL,
          },
          description:
            "Fredler Pierre-Louis runs TryCleaningHacks, a library of practical cleaning guides built around methods that hold up in real homes.",
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
              FP
            </div>
            <div className="flex-1">
              <h1
                className="text-2xl font-bold tracking-tight sm:text-3xl"
                style={{ color: "var(--text)" }}
              >
                Fredler Pierre-Louis
              </h1>
              <p className="mt-1 text-sm font-medium" style={{ color: "var(--accent)" }}>
                Founder &amp; Editor · TryCleaningHacks
              </p>

              <div
                className="mt-4 space-y-3 text-base leading-7"
                style={{ color: "var(--text-secondary)" }}
              >
                <p>
                  I&apos;m Fredler. I run TryCleaningHacks because most cleaning advice online
                  is vague, repetitive, or just doesn&apos;t work when you actually try it. I
                  wanted a place that gave clear, step-by-step methods with real quantities and
                  honest notes about what a hack can and can&apos;t do.
                </p>
                <p>
                  Every guide on the site is researched, drafted, and reviewed for accuracy and
                  safety before it goes live. I focus on methods that use everyday ingredients,
                  baking soda, white vinegar, dish soap, hydrogen peroxide, instead of expensive
                  specialty products.
                </p>
                <p>
                  If a guide ever recommends something that causes a problem on your surface,
                  please reach out. I take corrections seriously and update guides quickly.
                </p>
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
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
                  Updated weekly
                </span>
              </div>

              <p className="mt-5 text-sm" style={{ color: "var(--text-secondary)" }}>
                Read more on the{" "}
                <Link href="/about" className="font-medium hover:underline" style={{ color: "var(--accent)" }}>
                  About page
                </Link>{" "}
                or our{" "}
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
              Guides by Fredler Pierre-Louis
            </h2>
            <PostGrid posts={authorPosts} />
          </div>
        </section>
      </Container>
    </>
  );
}

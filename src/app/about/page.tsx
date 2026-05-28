import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { buildMeta } from "@/components/seo/Meta";
import { posts } from "@/data/posts";
import { categories } from "@/data/categories";

export const metadata: Metadata = buildMeta({
  title: "About",
  description:
    "TryCleaningHacks is a small site run by Fredler Pierre-Louis sharing practical, tested cleaning methods for everyday homes.",
  path: "/about",
  keywords: ["about TryCleaningHacks", "Fredler Pierre-Louis", "cleaning blog"],
});

export default function AboutPage() {
  const totalGuides = posts.length;
  const totalCategories = categories.length;

  return (
    <Container>
      <section className="py-12">
        <div className="mb-10">
          <h1
            className="text-3xl font-bold tracking-tight sm:text-4xl"
            style={{ color: "var(--text)" }}
          >
            About TryCleaningHacks
          </h1>
          <p className="mt-3" style={{ color: "var(--text-secondary)" }}>
            Practical cleaning advice, written by one person who cares about getting it right.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          <div
            className="space-y-6 text-base leading-8"
            style={{ color: "var(--text-secondary)" }}
          >
            {/* Hello */}
            <div
              className="rounded-xl p-6"
              style={{ background: "var(--card-bg)", border: "1px solid var(--border)" }}
            >
              <h2 className="mb-3 text-lg font-semibold" style={{ color: "var(--text)" }}>
                Hi, I&apos;m Fredler
              </h2>
              <p>
                Welcome to TryCleaningHacks. I&apos;m Fredler Pierre-Louis, and I run this site.
                It started for a simple reason: most cleaning advice online is vague,
                product-heavy, or just plain wrong. I wanted a place that gave straight answers,
                step-by-step methods, exact quantities, and honest notes about what works and
                what doesn&apos;t.
              </p>
              <p className="mt-3">
                Today the site has {totalGuides}+ guides across {totalCategories} categories,
                covering kitchens, bathrooms, laundry, appliances, floors, odors, and more. New
                guides are added every week. If you have a cleaning question you can&apos;t find
                an answer to, I&apos;d like to hear it.
              </p>
            </div>

            {/* What this site is */}
            <div
              className="rounded-xl p-6"
              style={{ background: "var(--card-bg)", border: "1px solid var(--border)" }}
            >
              <h2 className="mb-3 text-lg font-semibold" style={{ color: "var(--text)" }}>
                What this site is
              </h2>
              <p>
                A library of cleaning guides built around methods that actually hold up in real
                homes. Most use everyday ingredients, baking soda, white vinegar, dish soap,
                hydrogen peroxide, instead of expensive specialty products.
              </p>
              <p className="mt-3">
                Each guide is written to be followed: clear steps, real quantities, dwell times,
                and notes on which surfaces a method is safe for. Where a popular hack
                doesn&apos;t work, or is risky on certain materials, the guide says so.
              </p>
            </div>

            {/* How content is made */}
            <div
              className="rounded-xl p-6"
              style={{ background: "var(--card-bg)", border: "1px solid var(--border)" }}
            >
              <h2 className="mb-3 text-lg font-semibold" style={{ color: "var(--text)" }}>
                How the guides are made
              </h2>
              <p>
                Each guide goes through research on the underlying cleaning chemistry, a
                drafting pass, and a final review for accuracy, safety, and clarity before it
                goes live. Methods are checked against multiple sources, and surface-safety
                warnings are written specifically rather than as generic disclaimers.
              </p>
              <p className="mt-3">
                If a method on the site ever causes a problem on your surface or product, I
                want to know. Read the full process on the{" "}
                <Link href="/editorial-policy" className="underline" style={{ color: "var(--accent)" }}>
                  Editorial Policy
                </Link>{" "}
                page.
              </p>
            </div>

            {/* Get in touch */}
            <div
              className="rounded-xl p-6"
              style={{ background: "var(--card-bg)", border: "1px solid var(--border)" }}
            >
              <h2 className="mb-3 text-lg font-semibold" style={{ color: "var(--text)" }}>
                Get in touch
              </h2>
              <p>
                Have a cleaning question, a topic suggestion, a correction, or a partnership
                idea? Reach me through the{" "}
                <Link href="/contact" className="underline" style={{ color: "var(--accent)" }}>
                  Contact page
                </Link>{" "}
                or email{" "}
                <a
                  href="mailto:support@trycleaninghacks.com"
                  className="underline"
                  style={{ color: "var(--accent)" }}
                >
                  support@trycleaninghacks.com
                </a>
                . I read every message and reply within 1 to 2 business days.
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4 lg:sticky lg:top-[88px] lg:self-start">
            <div
              className="rounded-xl p-6"
              style={{ background: "var(--card-bg)", border: "1px solid var(--border)" }}
            >
              <h3
                className="mb-4 text-xs font-semibold uppercase tracking-wider"
                style={{ color: "var(--muted)" }}
              >
                Quick facts
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-2xl font-bold" style={{ color: "var(--text)" }}>
                    {totalGuides}+
                  </p>
                  <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                    Cleaning guides
                  </p>
                </div>
                <div className="pt-4" style={{ borderTop: "1px solid var(--border)" }}>
                  <p className="text-2xl font-bold" style={{ color: "var(--text)" }}>
                    {totalCategories}
                  </p>
                  <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                    Categories covered
                  </p>
                </div>
                <div className="pt-4" style={{ borderTop: "1px solid var(--border)" }}>
                  <p className="text-2xl font-bold" style={{ color: "var(--text)" }}>
                    Free
                  </p>
                  <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                    Always, no paywalls
                  </p>
                </div>
              </div>
            </div>

            <div
              className="rounded-xl p-6"
              style={{ background: "var(--card-bg)", border: "1px solid var(--border)" }}
            >
              <h3
                className="mb-3 text-xs font-semibold uppercase tracking-wider"
                style={{ color: "var(--muted)" }}
              >
                Useful links
              </h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link href="/editorial-policy" className="underline" style={{ color: "var(--accent)" }}>
                    Editorial Policy
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="underline" style={{ color: "var(--accent)" }}>
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="underline" style={{ color: "var(--accent)" }}>
                    Terms
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="underline" style={{ color: "var(--accent)" }}>
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
}

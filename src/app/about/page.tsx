import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { buildMeta } from "@/components/seo/Meta";
import { posts } from "@/data/posts";
import { categories } from "@/data/categories";

export const metadata: Metadata = buildMeta({
  title: "About Us",
  description:
    "Meet the team behind TryCleaningHacks — real people with hands-on cleaning experience. Learn about our testing process, editorial standards, and mission to make home cleaning simpler.",
  path: "/about",
  keywords: ["about TryCleaningHacks", "cleaning experts", "who writes TryCleaningHacks", "editorial team"],
});

export default function AboutPage() {
  const totalGuides = posts.length;
  const totalTechniques = posts.reduce((sum, p) => sum + (p.steps?.length ?? 0), 0);
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
            Real people. Hands-on testing. Practical cleaning advice you can trust.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          <div
            className="space-y-6 text-base leading-8"
            style={{ color: "var(--text-secondary)" }}
          >
            {/* Our Story */}
            <div
              className="rounded-xl p-6"
              style={{ background: "var(--card-bg)", border: "1px solid var(--border)" }}
            >
              <h2 className="mb-3 text-lg font-semibold" style={{ color: "var(--text)" }}>
                Our Story
              </h2>
              <p>
                TryCleaningHacks was founded by Sarah Mitchell in 2025 after nearly a decade
                working as a professional house cleaner in the greater Chicago area. During those
                years Sarah cleaned hundreds of homes and discovered that most cleaning advice
                online was either vague, product-heavy, or just plain wrong — the kind of tips
                that sounded clever but didn&apos;t hold up when she actually tried them on stubborn
                grease, soap scum, or set-in stains.
              </p>
              <p className="mt-3">
                She started writing down what actually worked — specific methods, exact
                proportions, surface-by-surface notes — and began sharing them with clients. The
                response was overwhelming. That notebook became TryCleaningHacks: a library of
                genuinely tested guides built around everyday ingredients like baking soda, white
                vinegar, dish soap, and hydrogen peroxide.
              </p>
              <p className="mt-3">
                Today the site covers more than {totalGuides} in-depth cleaning guides across {totalCategories} categories,
                with new content added every week. Every guide goes through our testing and
                editorial review process before it goes live.
              </p>
            </div>

            {/* Meet the Team */}
            <div
              className="rounded-xl p-6"
              style={{ background: "var(--card-bg)", border: "1px solid var(--border)" }}
            >
              <h2 className="mb-3 text-lg font-semibold" style={{ color: "var(--text)" }}>
                Meet the Team
              </h2>

              <div className="space-y-6">
                {/* Sarah */}
                <div className="flex gap-4">
                  <div
                    className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-xl font-bold"
                    style={{ background: "var(--accent-subtle)", color: "var(--accent)" }}
                  >
                    SM
                  </div>
                  <div>
                    <p className="font-semibold" style={{ color: "var(--text)" }}>
                      Sarah Mitchell — Founder &amp; Lead Writer
                    </p>
                    <p className="mt-1 text-sm leading-relaxed">
                      Sarah spent 9 years as a professional house cleaner before founding
                      TryCleaningHacks. She has personally tested every method published on the
                      site — from removing hard water stains from chrome to deep-cleaning oven
                      racks without commercial fumes. She focuses on what works in real homes,
                      not laboratory conditions.
                    </p>
                  </div>
                </div>

                {/* James */}
                <div className="flex gap-4" style={{ borderTop: "1px solid var(--border)", paddingTop: "1.25rem" }}>
                  <div
                    className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-xl font-bold"
                    style={{ background: "var(--accent-subtle)", color: "var(--accent)" }}
                  >
                    JP
                  </div>
                  <div>
                    <p className="font-semibold" style={{ color: "var(--text)" }}>
                      James Park — Contributing Writer
                    </p>
                    <p className="mt-1 text-sm leading-relaxed">
                      James is a home improvement writer with six years of experience covering
                      DIY maintenance, household chemistry, and product testing. He contributes
                      in-depth guides on appliance care, floor cleaning, and pest prevention,
                      bringing a research-first approach that complements Sarah&apos;s hands-on testing.
                    </p>
                  </div>
                </div>

                {/* Olivia */}
                <div className="flex gap-4" style={{ borderTop: "1px solid var(--border)", paddingTop: "1.25rem" }}>
                  <div
                    className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-xl font-bold"
                    style={{ background: "var(--accent-subtle)", color: "var(--accent)" }}
                  >
                    OT
                  </div>
                  <div>
                    <p className="font-semibold" style={{ color: "var(--text)" }}>
                      Olivia Torres — Safety &amp; Editorial Reviewer
                    </p>
                    <p className="mt-1 text-sm leading-relaxed">
                      Olivia reviews every guide for chemical safety, ingredient compatibility,
                      and surface suitability before it is published. Her background is in
                      occupational health and consumer product safety, and she ensures that every
                      safety note on the site is specific, accurate, and genuinely useful —
                      not just boilerplate disclaimer language.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Our Mission */}
            <div
              className="rounded-xl p-6"
              style={{ background: "var(--card-bg)", border: "1px solid var(--border)" }}
            >
              <h2 className="mb-3 text-lg font-semibold" style={{ color: "var(--text)" }}>
                Our Mission
              </h2>
              <p>
                We believe everyone deserves a clean, comfortable home — regardless of budget,
                experience, or how busy life gets. Our mission is to publish cleaning advice that
                is practical, safety-conscious, and grounded in real testing. We do not publish
                a method unless we have personally verified it works and is safe to use.
              </p>
              <p className="mt-3">
                We also commit to being honest when something doesn&apos;t work. If a popular
                hack is ineffective or potentially dangerous on certain surfaces, we say so
                clearly — even if it means going against widely shared advice.
              </p>
            </div>

            {/* How We Test */}
            <div
              className="rounded-xl p-6"
              style={{ background: "var(--card-bg)", border: "1px solid var(--border)" }}
            >
              <h2 className="mb-3 text-lg font-semibold" style={{ color: "var(--text)" }}>
                How We Research and Test
              </h2>
              <p>Every guide on TryCleaningHacks goes through the following process:</p>
              <ol className="ml-4 mt-3 list-decimal space-y-2">
                <li>
                  <strong>Topic selection</strong> — We identify real cleaning problems that
                  homeowners search for the most, focusing on questions where existing answers
                  online are incomplete or misleading.
                </li>
                <li>
                  <strong>Hands-on testing</strong> — Each method is physically tested on the
                  relevant surface type before being written up. We note what works, what
                  doesn&apos;t, and under what conditions.
                </li>
                <li>
                  <strong>Safety review</strong> — Olivia reviews all chemical interactions,
                  ventilation requirements, and surface compatibility warnings before publication.
                </li>
                <li>
                  <strong>Step-by-step writing</strong> — We write guides with exact quantities,
                  dwell times, and tool specifications so the instructions can actually be followed
                  without guessing.
                </li>
                <li>
                  <strong>Ongoing updates</strong> — If a method is found to cause problems
                  on specific surface types or with certain product formulations, we update
                  the guide promptly.
                </li>
              </ol>
              <p className="mt-3">
                For a full description of our editorial standards, see our{" "}
                <Link href="/editorial-policy" className="underline" style={{ color: "var(--accent)" }}>
                  Editorial Policy
                </Link>.
              </p>
            </div>

            {/* Who This Is For */}
            <div
              className="rounded-xl p-6"
              style={{ background: "var(--card-bg)", border: "1px solid var(--border)" }}
            >
              <h2 className="mb-3 text-lg font-semibold" style={{ color: "var(--text)" }}>
                Who This Is For
              </h2>
              <p>
                Whether you&apos;re a busy parent looking for 5-minute quick wins, a first-time
                renter tackling move-out cleaning, someone dealing with a stubborn stain, or a
                homeowner who wants a reliable deep-clean routine — TryCleaningHacks is written
                for you. All content is free, clearly organized, and works equally well on phone
                and desktop.
              </p>
            </div>

            {/* Get in Touch */}
            <div
              className="rounded-xl p-6"
              style={{ background: "var(--card-bg)", border: "1px solid var(--border)" }}
            >
              <h2 className="mb-3 text-lg font-semibold" style={{ color: "var(--text)" }}>
                Get in Touch
              </h2>
              <p>
                Have a cleaning question, a guide suggestion, or feedback about something we got
                wrong? We read every message. Reach us through our{" "}
                <a href="/contact" className="underline" style={{ color: "var(--accent)" }}>
                  Contact page
                </a>{" "}
                or email{" "}
                <a href="mailto:support@trycleaninghacks.com" className="underline" style={{ color: "var(--accent)" }}>
                  support@trycleaninghacks.com
                </a>
                . We typically respond within 24–48 hours.
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
                By the numbers
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-2xl font-bold" style={{ color: "var(--text)" }}>
                    {totalTechniques}+
                  </p>
                  <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                    Individual cleaning techniques
                  </p>
                </div>
                <div className="pt-4" style={{ borderTop: "1px solid var(--border)" }}>
                  <p className="text-2xl font-bold" style={{ color: "var(--text)" }}>
                    {totalGuides}+
                  </p>
                  <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                    In-depth cleaning guides
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
                    Always — no paywalls ever
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
                  <Link href="/contact" className="underline" style={{ color: "var(--accent)" }}>
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="underline" style={{ color: "var(--accent)" }}>
                    Cleaning FAQ
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

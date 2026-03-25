import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { buildMeta } from "@/components/seo/Meta";

export const metadata: Metadata = buildMeta({
  title: "Editorial Policy",
  description:
    "Learn how TryCleaningHacks researches, tests, and publishes cleaning guides. Our editorial process, fact-checking standards, and content update policy.",
  path: "/editorial-policy",
  keywords: [
    "TryCleaningHacks editorial policy",
    "how we test cleaning hacks",
    "editorial standards",
    "content accuracy",
  ],
});

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="mb-3 text-lg font-semibold" style={{ color: "var(--text)" }}>
        {title}
      </h2>
      {children}
    </div>
  );
}

export default function EditorialPolicyPage() {
  return (
    <Container>
      <section className="py-12">
        <div className="mb-10">
          <h1
            className="text-3xl font-bold tracking-tight sm:text-4xl"
            style={{ color: "var(--text)" }}
          >
            Editorial Policy
          </h1>
          <p className="mt-3" style={{ color: "var(--text-secondary)" }}>
            Last updated: March 2026. How TryCleaningHacks creates, reviews, and maintains its
            cleaning guides.
          </p>
        </div>

        <div
          className="space-y-8 rounded-xl p-6 text-sm leading-7 sm:p-8 sm:text-base"
          style={{
            background: "var(--card-bg)",
            border: "1px solid var(--border)",
            color: "var(--text-secondary)",
          }}
        >
          <Section title="Our Content Philosophy">
            <p>
              TryCleaningHacks publishes cleaning guides that are practical, safe, and verified
              before publication. We do not publish a method we have not personally tested or
              thoroughly researched. Our goal is to give homeowners accurate, actionable advice,
              not to aggregate tips from other websites or restate advice that hasn&apos;t been
              verified to actually work.
            </p>
            <p className="mt-3">
              We also believe in being direct about failure. If a cleaning hack is ineffective,
              potentially damaging to certain surfaces, or unsafe when combined with other
              household products, we say so, even when that means going against popular advice.
            </p>
          </Section>

          <Section title="Who Creates Our Content">
            <p>
              All guides on TryCleaningHacks are written by members of our editorial team or
              reviewed contributors with direct, hands-on cleaning experience. Our core team
              includes:
            </p>
            <ul className="ml-4 mt-3 list-disc space-y-2">
              <li>
                <strong>Sarah Mitchell (Founder &amp; Lead Writer)</strong>, former professional
                house cleaner with 9 years of experience cleaning residential and commercial
                properties. Sarah personally tests cleaning methods before writing them up.
              </li>
              <li>
                <strong>James Park (Contributing Writer)</strong>, home improvement writer
                specializing in DIY household maintenance and product research. James conducts
                comparative testing and writes evidence-based deep-dive guides.
              </li>
              <li>
                <strong>Olivia Torres (Safety &amp; Editorial Reviewer)</strong>, reviews all
                chemical compatibility information, ventilation requirements, and surface warnings.
                Olivia&apos;s background is in occupational health and consumer product safety.
              </li>
            </ul>
            <p className="mt-3">
              We do not use AI-generated text without human review and verification. All published
              content is written or substantively edited by a human team member who is accountable
              for its accuracy.
            </p>
          </Section>

          <Section title="Our Testing Process">
            <p>
              Before publishing a cleaning guide, we follow a structured testing process:
            </p>
            <ol className="ml-4 mt-3 list-decimal space-y-3">
              <li>
                <strong>Problem identification</strong>, we identify a specific cleaning
                challenge that homeowners commonly face, including what existing online advice gets
                wrong or leaves out.
              </li>
              <li>
                <strong>Method research</strong>, we research the underlying chemistry or
                mechanism of action for each proposed solution, so we understand why something
                should or shouldn&apos;t work before testing it.
              </li>
              <li>
                <strong>Hands-on testing</strong>, each method is physically tested on the
                relevant surface type. We note what works, what doesn&apos;t, how long each step
                takes, and what mistakes are easy to make.
              </li>
              <li>
                <strong>Surface compatibility checks</strong>, we test methods on multiple
                surface types (e.g., ceramic, porcelain, stainless steel, natural stone, sealed
                wood) and clearly document which surfaces are safe and which are not.
              </li>
              <li>
                <strong>Safety review</strong>, Olivia reviews chemical interactions, maximum
                concentrations, ventilation requirements, and any risk of damage to surfaces or
                harm to people or pets. Safety notes are written with specific guidance, not
                just generic caution language.
              </li>
              <li>
                <strong>Final editorial review</strong>, a second team member reads the guide
                for clarity, accuracy, and completeness before it is published.
              </li>
            </ol>
          </Section>

          <Section title="How We Handle Product Recommendations">
            <p>
              TryCleaningHacks primarily teaches cleaning methods using everyday household
              ingredients, white vinegar, baking soda, dish soap, hydrogen peroxide, and similar
              pantry staples. When we mention specific commercial products, we do so because we
              have found them genuinely useful for the described task, not as commercial promotion.
            </p>
            <p className="mt-3">
              We do not accept payment in exchange for positive coverage of commercial cleaning
              products. If we ever include affiliate links, they will be clearly disclosed within
              the relevant guide.
            </p>
          </Section>

          <Section title="Content Accuracy and Updates">
            <p>
              We are committed to keeping our guides accurate over time. When readers contact us
              to report that a method caused unexpected damage, when a product formulation changes,
              or when new safety information becomes available, we update the relevant guide
              with the corrected information and note the update date.
            </p>
            <p className="mt-3">
              The publication date shown on each guide reflects when it was first published. If
              a guide has been substantively updated, we note that at the top of the article.
            </p>
          </Section>

          <Section title="Reader Questions and Corrections">
            <p>
              We welcome corrections, questions, and feedback from readers. If you believe a
              cleaning method on our site is inaccurate, unsafe, or incomplete, please contact us
              through our{" "}
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
              . We investigate all reported concerns and respond within 48 hours.
            </p>
          </Section>

          <Section title="About This Policy">
            <p>
              This editorial policy applies to all content published on TryCleaningHacks. It was
              written to be transparent with our readers and with the platforms that distribute
              our content. For information about how we handle personal data, see our{" "}
              <Link href="/privacy" className="underline" style={{ color: "var(--accent)" }}>
                Privacy Policy
              </Link>
              . For information about who we are, see our{" "}
              <Link href="/about" className="underline" style={{ color: "var(--accent)" }}>
                About page
              </Link>
              .
            </p>
          </Section>
        </div>
      </section>
    </Container>
  );
}

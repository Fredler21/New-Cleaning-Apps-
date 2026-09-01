import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { buildMeta } from "@/components/seo/Meta";

export const metadata: Metadata = buildMeta({
  title: "Editorial Policy",
  description:
    "Learn how TryCleaningHacks researches, reviews, and publishes cleaning guides. Our editorial process, fact-checking standards, and content update policy.",
  path: "/editorial-policy",
  keywords: [
    "TryCleaningHacks editorial policy",
    "TryCleaningHacks editorial standards",
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
              TryCleaningHacks publishes cleaning guides that are practical, safe, and reviewed
              before publication. Our goal is to give homeowners accurate, actionable advice
              grounded in how cleaning agents actually behave, rather than restating tips
              collected from other websites without checking whether they hold up.
            </p>
            <p className="mt-3">
              We also believe in being direct about failure. If a cleaning hack is ineffective,
              potentially damaging to certain surfaces, or unsafe when combined with other
              household products, we say so, even when that means going against popular advice.
            </p>
          </Section>

          <Section title="Who Creates Our Content">
            <p>
              TryCleaningHacks is run, edited, and published by{" "}
              <Link href="/author/fredler-pierre-louis" className="underline" style={{ color: "var(--accent)" }}>
                Fredler Pierre-Louis
              </Link>
              , working alone. There is no larger editorial staff. Every guide is reviewed by a
              person for accuracy, safety, and clarity before it goes live, and that person is
              accountable for what the site publishes.
            </p>
          </Section>

          <Section title="How a Guide Gets Made">
            <p>
              Before a cleaning guide is published, it goes through this process:
            </p>
            <ol className="ml-4 mt-3 list-decimal space-y-3">
              <li>
                <strong>Problem identification</strong>, we identify a specific cleaning
                challenge that homeowners commonly face, including what existing online advice gets
                wrong or leaves out.
              </li>
              <li>
                <strong>Method research</strong>, we research the underlying chemistry or
                mechanism of action for each proposed solution, so the guide can explain why
                something works rather than just asserting that it does.
              </li>
              <li>
                <strong>Drafting</strong>, a first draft is written against that research, then
                rewritten where it is vague, padded, or wrong.
              </li>
              <li>
                <strong>Surface compatibility check</strong>, we verify against manufacturer and
                materials guidance which surfaces a method is safe for (ceramic, porcelain,
                stainless steel, natural stone, sealed wood) and document which ones it is not.
              </li>
              <li>
                <strong>Safety review</strong>, we verify chemical interactions, maximum
                concentrations, ventilation requirements, and any risk of damage to surfaces or
                harm to people or pets. Safety notes are written with specific guidance, not
                just generic caution language.
              </li>
              <li>
                <strong>Final human review</strong>, every guide is read end-to-end by a person
                for clarity, accuracy, and completeness before it is published.
              </li>
            </ol>
          </Section>

          <Section title="How We Handle Product Recommendations">
            <p>
              TryCleaningHacks primarily teaches cleaning methods using everyday household
              ingredients, white vinegar, baking soda, dish soap, hydrogen peroxide, and similar
              pantry staples. When we name a specific commercial product, it is because that
              product is the standard or widely documented choice for the described task, not
              because anyone paid for the mention.
            </p>
            <p className="mt-3">
              We do not accept payment in exchange for positive coverage of commercial cleaning
              products, and no brand has any say in what appears here.
            </p>
          </Section>

          <Section title="Affiliate Links">
            <p>
              Some of our guides link to products on Amazon. If you buy something through one of
              those links we earn a small commission, and you pay exactly the same price you would
              have paid anyway. As an Amazon Associate I earn from qualifying purchases.
            </p>
            <p className="mt-3">
              Those links never change what we recommend. A product only gets a link when the guide
              already tells you to use it, and we leave the link out when the product we could link
              does not match what the guide actually calls for. A guide about quarter inch hardware
              cloth does not get a link to half inch mesh just because one is available.
            </p>
            <p className="mt-3">
              Any guide containing affiliate links says so in a short note at the top, so you never
              have to go looking for it. Most of our guides use pantry staples like vinegar and
              baking soda and contain no affiliate links at all.
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

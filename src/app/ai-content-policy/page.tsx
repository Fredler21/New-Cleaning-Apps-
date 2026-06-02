import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { buildMeta } from "@/components/seo/Meta";

export const metadata: Metadata = buildMeta({
  title: "AI Content & Image Policy",
  description:
    "How TryCleaningHacks uses AI tools in research, drafting, and illustration. Our human review process, transparency commitments, and Google E-E-A-T alignment.",
  path: "/ai-content-policy",
  keywords: [
    "AI content policy",
    "AI image disclosure",
    "TryCleaningHacks AI",
    "Google helpful content AI policy",
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

export default function AiContentPolicyPage() {
  return (
    <Container>
      <section className="py-12">
        <div className="mb-10">
          <h1
            className="text-3xl font-bold tracking-tight sm:text-4xl"
            style={{ color: "var(--text)" }}
          >
            AI Content &amp; Image Policy
          </h1>
          <p className="mt-3" style={{ color: "var(--text-secondary)" }}>
            Last updated: June 2026. How we use AI tools at TryCleaningHacks, what we never let
            them do, and how every published article and image is reviewed by a human before it
            goes live.
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
          <Section title="Our approach to AI">
            <p>
              We treat AI the way a newsroom treats a research assistant. AI helps us brainstorm
              article angles, summarise long source material, draft outlines, and generate
              illustrative images for posts where original photography isn&apos;t practical (for
              example, side-by-side cleaning demonstrations). Every article and image is then
              reviewed, edited, fact-checked, and signed off by a human editor before publication.
              Nothing on TryCleaningHacks is published &quot;straight from the model&quot;.
            </p>
          </Section>

          <Section title="How we use AI in writing">
            <ul className="ml-5 list-disc space-y-2">
              <li>
                <strong>Idea generation:</strong> we use AI to surface trending cleaning questions
                and to cross-check that the angles we&apos;re considering aren&apos;t already
                over-served on the web.
              </li>
              <li>
                <strong>Drafting and structure:</strong> AI may help us produce a first outline or
                rough draft. The published version is rewritten and edited by a human editor for
                accuracy, voice, and safety.
              </li>
              <li>
                <strong>What AI never does on this site:</strong> set safety guidance, recommend
                chemical mixtures, decide which products to feature, or publish without an
                editor&apos;s review. Cleaning advice that touches on safety (mixing chemicals,
                handling appliances, mold remediation) is always written or verified by a human
                with relevant experience.
              </li>
            </ul>
          </Section>

          <Section title="How we use AI in images">
            <p>
              Some hero illustrations on TryCleaningHacks are generated with Google&apos;s Gemini
              image models or sourced from licensed stock libraries (such as Unsplash). When an
              image is AI-generated:
            </p>
            <ul className="ml-5 mt-3 list-disc space-y-2">
              <li>
                It is <strong>illustrative</strong>, not journalistic. AI images on this site
                represent generic scenes (a clean kitchen, a tidy pantry) and are never used to
                depict a real person, a real place, a news event, or a specific product&apos;s
                results.
              </li>
              <li>
                It is processed and re-encoded on our own servers (resized, converted to JPEG,
                with model metadata stripped) before being uploaded to our domain.
              </li>
              <li>
                A machine-readable sidecar file is stored alongside the image recording the
                source (<code>gemini</code>, <code>gemini-candid</code>, <code>unsplash</code>),
                which is shown as an attribution line on the article when relevant.
              </li>
              <li>
                We do not present AI-generated illustrations as before-and-after photographic
                evidence of a cleaning result.
              </li>
            </ul>
          </Section>

          <Section title="Human review and accountability">
            <p>
              Every article carries a byline that links to the editor or contributor responsible
              for its accuracy. Editors are accountable for the final published article — including
              for correcting errors, updating outdated guidance, and removing recommendations that
              no longer reflect best practice. If you spot an inaccuracy, contact us via the{" "}
              <a href="/contact" className="underline" style={{ color: "var(--text)" }}>
                contact page
              </a>{" "}
              and we&apos;ll review it.
            </p>
          </Section>

          <Section title="Alignment with Google&rsquo;s guidelines">
            <p>
              Our use of AI is intended to be consistent with Google&apos;s{" "}
              <a
                href="https://developers.google.com/search/blog/2023/02/google-search-and-ai-content"
                target="_blank"
                rel="noopener"
                className="underline"
                style={{ color: "var(--text)" }}
              >
                guidance on AI-generated content
              </a>{" "}
              and the Helpful Content system. We aim to publish content that demonstrates
              experience, expertise, authoritativeness, and trustworthiness (E-E-A-T), regardless
              of whether AI tools were involved in the production process. We do not engage in
              scaled content abuse, mass-produced low-quality publishing, expired-domain abuse, or
              site-reputation abuse.
            </p>
          </Section>

          <Section title="Advertising and AI">
            <p>
              We display advertising from third-party networks (including Google AdSense) on
              TryCleaningHacks. Our use of AI is disclosed on this page so that advertising
              partners and readers can understand how the site is produced. Ads are placed by the
              ad network and never influence editorial decisions or the recommendations inside
              an article.
            </p>
          </Section>

          <Section title="Updates to this policy">
            <p>
              The AI tooling landscape changes quickly. We&apos;ll update this page when our
              process changes — for example, if we adopt a new image model, change how we credit
              AI-assisted articles, or update our human-review workflow. The &quot;last
              updated&quot; date at the top of this page reflects the most recent revision.
            </p>
          </Section>
        </div>
      </section>
    </Container>
  );
}

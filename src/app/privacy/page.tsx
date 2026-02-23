import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { buildMeta } from "@/components/seo/Meta";
import { FAQAccordion } from "@/components/ui/FAQAccordion";

export const metadata: Metadata = buildMeta({
  title: "Privacy Policy",
  description:
    "Read how TryCleaningHacks collects, uses, and protects your personal data, including our cookie, advertising, and data-handling policies.",
  path: "/privacy",
});

/* ── FAQ data ─────────────────────────────────────────────── */
const faqs = [
  {
    question: "What is the best way to deep-clean my bathroom?",
    answer:
      "Start by spraying an all-purpose cleaner on tiles, the tub, and the toilet. Let it sit for 5–10 minutes to break down grime. Scrub surfaces with a stiff brush, then rinse. For mirrors and glass, use a vinegar-water mix and a microfibre cloth to get a streak-free finish. Finish by mopping the floor with a disinfectant solution.",
  },
  {
    question: "How do I remove tough grease stains from my kitchen?",
    answer:
      "Mix equal parts baking soda and dish soap into a paste. Apply it directly to the greasy area — stovetops, range hoods, or backsplash tiles — and let it sit for 15 minutes. Scrub with a non-scratch sponge and wipe clean with a damp cloth. For stubborn build-up, a degreaser spray works wonders.",
  },
  {
    question: "How often should I wash my bedding and curtains?",
    answer:
      "Sheets and pillowcases should be washed weekly in hot water to eliminate dust mites and bacteria. Duvet covers and blankets can be washed every two to four weeks. Curtains should be laundered or steam-cleaned every three to six months, or more often if you have pets or allergies.",
  },
  {
    question: "What natural cleaning products actually work?",
    answer:
      "White vinegar, baking soda, lemon juice, and castile soap are all highly effective. Vinegar cuts through grease and removes odours, baking soda is a gentle abrasive for scrubbing, lemon juice naturally disinfects and brightens, and castile soap works as an all-purpose cleaner when diluted with water.",
  },
  {
    question: "How can I keep my home smelling fresh without air fresheners?",
    answer:
      "Open windows regularly for ventilation. Simmer a pot of water with citrus peels, cinnamon sticks, and cloves for a natural fragrance. Sprinkle baking soda on carpets before vacuuming to absorb odours. Place bowls of activated charcoal or coffee grounds in musty areas to neutralise smells.",
  },
];

/* ── Section helper ───────────────────────────────────────── */
function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="mb-2 text-lg font-semibold" style={{ color: "var(--text)" }}>
        {title}
      </h2>
      {children}
    </div>
  );
}

/* ── Page ──────────────────────────────────────────────────── */
export default function PrivacyPage() {
  return (
    <Container>
      {/* ── Privacy Policy ─────────────────────────────── */}
      <section className="py-12">
        <div className="mb-10">
          <h1
            className="text-3xl font-bold tracking-tight sm:text-4xl"
            style={{ color: "var(--text)" }}
          >
            Privacy Policy
          </h1>
          <p className="mt-3" style={{ color: "var(--text-secondary)" }}>
            Last updated: February 23, 2026 — Your privacy matters to us. Read below to understand
            exactly how TryCleaningHacks handles your data.
          </p>
        </div>

        <div
          className="space-y-6 rounded-xl p-6 text-sm leading-7 sm:p-8 sm:text-base"
          style={{
            background: "var(--card-bg)",
            border: "1px solid var(--border)",
            color: "var(--text-secondary)",
          }}
        >
          {/* 1 */}
          <Section title="1. Information We Collect">
            <p>
              We collect information in two ways: <strong>information you provide</strong> (e.g.,
              name, email, and message when using our contact form or subscribing to our newsletter)
              and <strong>information collected automatically</strong> (e.g., IP address, browser
              type, device type, pages visited, and time spent on each page) through cookies and
              analytics services.
            </p>
          </Section>

          {/* 2 */}
          <Section title="2. How We Use Your Information">
            <ul className="ml-4 list-disc space-y-1">
              <li>Respond to enquiries submitted through the contact form.</li>
              <li>Send newsletter updates if you have opted in.</li>
              <li>Analyse anonymous usage data to improve content, performance, and user experience.</li>
              <li>Display relevant advertisements through Google AdSense.</li>
              <li>Maintain the security and integrity of our website.</li>
            </ul>
          </Section>

          {/* 3 */}
          <Section title="3. Cookies & Tracking Technologies">
            <p>
              TryCleaningHacks uses cookies — small text files stored on your device — to enhance your
              browsing experience. We use:
            </p>
            <ul className="ml-4 mt-2 list-disc space-y-1">
              <li>
                <strong>Essential cookies</strong> — required for basic site functionality (e.g.,
                theme preference).
              </li>
              <li>
                <strong>Analytics cookies</strong> — provided by Google Analytics to help us
                understand traffic patterns and popular content.
              </li>
              <li>
                <strong>Advertising cookies</strong> — used by Google AdSense and its partners to
                serve ads that may be relevant to your interests.
              </li>
            </ul>
            <p className="mt-2">
              You may disable cookies through your browser settings; however, some features of the
              site may not function as intended.
            </p>
          </Section>

          {/* 4 */}
          <Section title="4. Data Sharing & Disclosure">
            <p>
              We do <strong>not</strong> sell, rent, or trade your personal information. We may share
              data only:
            </p>
            <ul className="ml-4 mt-2 list-disc space-y-1">
              <li>With service providers who assist in operating the website (analytics, ads, email).</li>
              <li>If required by law, regulation, or legal process.</li>
              <li>To protect the rights, safety, or property of TryCleaningHacks or its users.</li>
            </ul>
          </Section>

          {/* 5 */}
          <Section title="5. Data Retention">
            <p>
              Contact form submissions are retained only as long as necessary to respond to your
              enquiry. Newsletter subscriber data is kept until you unsubscribe. Analytics data is
              aggregated and anonymised and does not contain personally identifiable information.
            </p>
          </Section>

          {/* 6 */}
          <Section title="6. Your Rights">
            <p>You have the right to:</p>
            <ul className="ml-4 mt-2 list-disc space-y-1">
              <li>Access the personal data we hold about you.</li>
              <li>Request correction or deletion of your personal data.</li>
              <li>Opt out of personalised advertising via Google Ad Settings.</li>
              <li>Unsubscribe from our newsletter at any time.</li>
              <li>Disable cookies through your browser preferences.</li>
            </ul>
            <p className="mt-2">
              To exercise any of these rights, please reach out through our{" "}
              <a
                href="/contact"
                className="underline"
                style={{ color: "var(--accent)" }}
              >
                Contact page
              </a>
              .
            </p>
          </Section>

          {/* 7 */}
          <Section title="7. Children's Privacy">
            <p>
              TryCleaningHacks does not knowingly collect personal information from children under the age
              of 13. If you believe a child has provided us with personal data, please contact us so
              we can promptly delete it.
            </p>
          </Section>

          {/* 8 */}
          <Section title="8. Changes to This Policy">
            <p>
              We may update this Privacy Policy from time to time to reflect changes in our
              practices or for legal, operational, or regulatory reasons. The "Last updated" date at
              the top of this page indicates when the policy was last revised. Continued use of the
              website after any changes constitutes acceptance of the updated policy.
            </p>
          </Section>

          {/* 9 */}
          <Section title="9. Contact Us">
            <p>
              If you have any questions or concerns about this Privacy Policy, please contact us
              through our{" "}
              <a
                href="/contact"
                className="underline"
                style={{ color: "var(--accent)" }}
              >
                Contact page
              </a>
              . We aim to respond to all enquiries within 48 hours.
            </p>
          </Section>
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────── */}
      <section className="pb-16">
        <h2
          className="mb-6 text-2xl font-bold tracking-tight sm:text-3xl"
          style={{ color: "var(--text)" }}
        >
          Frequently Asked Questions
        </h2>
        <FAQAccordion items={faqs} />
      </section>
    </Container>
  );
}

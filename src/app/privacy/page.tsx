import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { buildMeta } from "@/components/seo/Meta";
import { FAQAccordion } from "@/components/ui/FAQAccordion";

export const metadata: Metadata = buildMeta({
  title: "Privacy Policy",
  description:
    "Read how CleaningHax collects, uses, and protects your personal data, including our cookie, advertising, and third-party disclosure policies.",
  path: "/privacy",
});

/* ── FAQ data ─────────────────────────────────────────────── */
const faqs = [
  {
    question: "What personal information does CleaningHax collect?",
    answer:
      "We only collect information you voluntarily provide — such as your name, email address, and message when you use our contact form or subscribe to our newsletter. We also collect anonymous usage data through cookies and analytics tools (like Google Analytics) to understand how visitors interact with our site.",
  },
  {
    question: "Does CleaningHax use cookies or advertising trackers?",
    answer:
      "Yes. We use first-party cookies to remember your preferences (e.g., dark mode) and third-party cookies from services like Google AdSense and Google Analytics. These cookies help us serve relevant ads and measure site performance. You can manage or disable cookies through your browser settings at any time.",
  },
  {
    question: "Will my data be shared with third parties?",
    answer:
      "We do not sell your personal data. However, certain trusted third-party services — such as Google AdSense, Google Analytics, and our email provider — may receive limited data in order to deliver ads, measure traffic, and process newsletter subscriptions. Each of these services has its own privacy policy governing how they handle your information.",
  },
  {
    question: "How can I delete my data or opt out?",
    answer:
      "You can request deletion of any personal data we hold by contacting us through our Contact page. To opt out of personalised advertising, visit Google's Ad Settings (adssettings.google.com) or use the Network Advertising Initiative opt-out page. You can also clear or block cookies in your browser settings.",
  },
  {
    question: "Is CleaningHax safe for children under 13?",
    answer:
      "CleaningHax is a general-audience website focused on household cleaning tips. We do not knowingly collect personal data from children under the age of 13. If you believe a child has submitted personal information through our site, please contact us immediately so we can remove it.",
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
            exactly how CleaningHax handles your data.
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
              CleaningHax uses cookies — small text files stored on your device — to enhance your
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
          <Section title="4. Third-Party Services">
            <p>We work with the following trusted third-party providers:</p>
            <ul className="ml-4 mt-2 list-disc space-y-1">
              <li>
                <strong>Google AdSense</strong> — serves advertisements; may use cookies to
                personalise ads.{" "}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                  style={{ color: "var(--accent)" }}
                >
                  Google Privacy Policy
                </a>
              </li>
              <li>
                <strong>Google Analytics</strong> — collects anonymised usage statistics.
              </li>
              <li>
                <strong>Vercel Analytics</strong> — collects performance &amp; web-vital metrics.
              </li>
            </ul>
            <p className="mt-2">
              These services may collect data according to their own privacy policies. We encourage
              you to review them.
            </p>
          </Section>

          {/* 5 */}
          <Section title="5. Data Sharing & Disclosure">
            <p>
              We do <strong>not</strong> sell, rent, or trade your personal information. We may share
              data only:
            </p>
            <ul className="ml-4 mt-2 list-disc space-y-1">
              <li>With service providers who assist in operating the website (analytics, ads, email).</li>
              <li>If required by law, regulation, or legal process.</li>
              <li>To protect the rights, safety, or property of CleaningHax or its users.</li>
            </ul>
          </Section>

          {/* 6 */}
          <Section title="6. Data Retention">
            <p>
              Contact form submissions are retained only as long as necessary to respond to your
              enquiry. Newsletter subscriber data is kept until you unsubscribe. Analytics data is
              aggregated and anonymised and does not contain personally identifiable information.
            </p>
          </Section>

          {/* 7 */}
          <Section title="7. Your Rights">
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

          {/* 8 */}
          <Section title="8. Children's Privacy">
            <p>
              CleaningHax does not knowingly collect personal information from children under the age
              of 13. If you believe a child has provided us with personal data, please contact us so
              we can promptly delete it.
            </p>
          </Section>

          {/* 9 */}
          <Section title="9. Changes to This Policy">
            <p>
              We may update this Privacy Policy from time to time to reflect changes in our
              practices or for legal, operational, or regulatory reasons. The "Last updated" date at
              the top of this page indicates when the policy was last revised. Continued use of the
              website after any changes constitutes acceptance of the updated policy.
            </p>
          </Section>

          {/* 10 */}
          <Section title="10. Contact Us">
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

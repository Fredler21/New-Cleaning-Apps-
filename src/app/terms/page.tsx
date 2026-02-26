import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { buildMeta } from "@/components/seo/Meta";

export const metadata: Metadata = buildMeta({
  title: "Terms of Service",
  description:
    "Review the Terms of Service for TryCleaningHacks — covering site usage, intellectual property, disclaimers, and user responsibilities.",
  path: "/terms",
  noIndex: true,
});

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
export default function TermsPage() {
  return (
    <Container>
      <section className="py-12">
        <div className="mb-10">
          <h1
            className="text-3xl font-bold tracking-tight sm:text-4xl"
            style={{ color: "var(--text)" }}
          >
            Terms of Service
          </h1>
          <p className="mt-3" style={{ color: "var(--text-secondary)" }}>
            Last updated: February 23, 2026 — Please read these terms carefully before using
            TryCleaningHacks.
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
          <Section title="1. Acceptance of Terms">
            <p>
              By accessing or using TryCleaningHacks (&ldquo;the Site&rdquo;), located at{" "}
              <strong>trycleaninghacks.com</strong>, you agree to be bound by these Terms of
              Service. If you do not agree with any part of these terms, please do not use the
              Site. We may update these Terms from time to time; your continued use of the Site
              after changes constitutes acceptance.
            </p>
          </Section>

          {/* 2 */}
          <Section title="2. Description of Service">
            <p>
              TryCleaningHacks provides free, informational cleaning guides, tips, and product
              recommendations (&ldquo;Content&rdquo;). The Content is for general informational
              purposes only and does not constitute professional advice. We reserve the right to
              modify, suspend, or discontinue any part of the Site at any time without notice.
            </p>
          </Section>

          {/* 3 */}
          <Section title="3. Intellectual Property">
            <p>
              All content on the Site — including text, graphics, logos, images, and software — is
              the property of TryCleaningHacks or its content suppliers and is protected by
              applicable copyright and intellectual property laws. You may not reproduce,
              distribute, modify, or create derivative works from any content without prior written
              permission.
            </p>
          </Section>

          {/* 4 */}
          <Section title="4. User Conduct">
            <p>When using the Site, you agree not to:</p>
            <ul className="ml-4 mt-2 list-disc space-y-1">
              <li>Use the Site for any unlawful purpose or in violation of any applicable laws.</li>
              <li>Attempt to gain unauthorized access to any part of the Site or its systems.</li>
              <li>Interfere with or disrupt the Site&rsquo;s infrastructure or other users&rsquo; access.</li>
              <li>Scrape, crawl, or harvest content from the Site without permission.</li>
              <li>Submit false, misleading, or harmful information through any forms.</li>
            </ul>
          </Section>

          {/* 5 */}
          <Section title="5. Disclaimer of Warranties">
            <p>
              The Site and its Content are provided on an &ldquo;as is&rdquo; and &ldquo;as
              available&rdquo; basis without warranties of any kind, whether express or implied.
              TryCleaningHacks does not guarantee that any cleaning hack, tip, or recommendation
              will produce specific results. Always test cleaning solutions on a small,
              inconspicuous area first and follow manufacturer instructions for your surfaces and
              materials.
            </p>
          </Section>

          {/* 6 */}
          <Section title="6. Limitation of Liability">
            <p>
              To the fullest extent permitted by law, TryCleaningHacks and its owners, operators,
              and contributors shall not be liable for any direct, indirect, incidental, special,
              or consequential damages arising from your use of the Site or reliance on any Content
              provided. This includes, but is not limited to, damage to property, personal injury,
              or loss of data.
            </p>
          </Section>

          {/* 7 */}
          <Section title="7. Third-Party Links & Advertising">
            <p>
              The Site may contain links to third-party websites and display advertisements served
              by Google AdSense and other advertising partners. TryCleaningHacks is not responsible
              for the content, accuracy, or practices of any third-party sites. Clicking on
              advertisements or external links is at your own risk. Our advertising partners may
              use cookies to serve personalized ads — see our{" "}
              <a
                href="/privacy"
                className="underline"
                style={{ color: "var(--accent)" }}
              >
                Privacy Policy
              </a>{" "}
              for details.
            </p>
          </Section>

          {/* 8 */}
          <Section title="8. Newsletter & Communications">
            <p>
              By subscribing to our newsletter, you consent to receive periodic emails about new
              cleaning hacks, tips, and updates. You may unsubscribe at any time by clicking the
              unsubscribe link in any email or contacting us directly.
            </p>
          </Section>

          {/* 9 */}
          <Section title="9. Governing Law">
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the
              United States, without regard to conflict of law principles. Any disputes arising
              from these Terms or your use of the Site shall be resolved in the appropriate courts.
            </p>
          </Section>

          {/* 10 */}
          <Section title="10. Contact Us">
            <p>
              If you have any questions about these Terms of Service, please contact us through
              our{" "}
              <a
                href="/contact"
                className="underline"
                style={{ color: "var(--accent)" }}
              >
                Contact page
              </a>{" "}
              or email us at{" "}
              <a
                href="mailto:support@trycleaninghacks.com"
                className="underline"
                style={{ color: "var(--accent)" }}
              >
                support@trycleaninghacks.com
              </a>
              .
            </p>
          </Section>
        </div>
      </section>
    </Container>
  );
}

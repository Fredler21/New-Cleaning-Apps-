import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { buildMeta } from "@/components/seo/Meta";

export const metadata: Metadata = buildMeta({
  title: "Terms and Conditions",
  description:
    "Review the Terms and Conditions for TryCleaningHacks, covering site usage, intellectual property, disclaimers, advertising, and user responsibilities.",
  path: "/terms",
  keywords: [
    "TryCleaningHacks terms",
    "terms and conditions",
    "terms of service",
    "site usage policy",
  ],
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
            Terms and Conditions
          </h1>
          <p className="mt-3" style={{ color: "var(--text-secondary)" }}>
            Last updated: May 2, 2026. Please read these terms carefully before using
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
          <Section title="1. Introduction / Agreement to Terms">
            <p>
              Welcome to TryCleaningHacks (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;).
              These Terms and Conditions (&ldquo;Terms&rdquo;) govern your access to and use of the
              website located at{" "}
              <a
                href="https://trycleaninghacks.com"
                className="underline"
                style={{ color: "var(--accent)" }}
              >
                trycleaninghacks.com
              </a>{" "}
              (the &ldquo;Site&rdquo;).
            </p>
            <p className="mt-2">
              By accessing or using the Site, you agree to be bound by these Terms and our{" "}
              <a href="/privacy" className="underline" style={{ color: "var(--accent)" }}>
                Privacy Policy
              </a>
              . If you do not agree with any part of these Terms, please do not use the Site. We
              may update these Terms from time to time, and your continued use of the Site after
              changes are posted constitutes acceptance of the updated Terms.
            </p>
          </Section>

          {/* 2 */}
          <Section title="2. Use of the Website">
            <p>
              TryCleaningHacks provides cleaning tips, DIY methods, product recommendations, and
              related informational content (&ldquo;Content&rdquo;). You may access and read the
              Content for your personal, non-commercial use, subject to these Terms.
            </p>
            <p className="mt-2">You agree to use the Site only for lawful purposes. You may not:</p>
            <ul className="ml-4 mt-2 list-disc space-y-1">
              <li>Use the Site in any way that violates applicable laws or regulations.</li>
              <li>
                Attempt to gain unauthorised access to the Site, its servers, or any connected
                systems.
              </li>
              <li>
                Interfere with or disrupt the Site, its security features, or other users&apos;
                access.
              </li>
              <li>
                Scrape, crawl, or harvest content from the Site without our prior written
                permission.
              </li>
              <li>Submit false, misleading, harmful, or abusive information through any forms.</li>
              <li>
                Use automated systems (bots, scripts) that send more requests than a human user
                reasonably would.
              </li>
            </ul>
            <p className="mt-2">
              We reserve the right to modify, suspend, or discontinue any part of the Site at any
              time, with or without notice.
            </p>
          </Section>

          {/* 3 */}
          <Section title="3. Intellectual Property Rights">
            <p>
              All content on the Site, including text, articles, graphics, logos, images, photos,
              icons, and the underlying code, is the property of TryCleaningHacks or its licensors
              and is protected by copyright, trademark, and other intellectual property laws.
            </p>
            <p className="mt-2">
              You may view and read the Content for personal, non-commercial use. You may{" "}
              <strong>not</strong>:
            </p>
            <ul className="ml-4 mt-2 list-disc space-y-1">
              <li>
                Copy, reproduce, republish, or redistribute any Content without prior written
                permission.
              </li>
              <li>Create derivative works based on the Content.</li>
              <li>
                Use any Content for commercial purposes, including republishing on other websites or
                in print.
              </li>
              <li>Remove or alter any copyright, trademark, or other proprietary notices.</li>
            </ul>
            <p className="mt-2">
              Short quotes (under 100 words) for review or commentary are permitted with clear
              attribution and a link back to the original article on TryCleaningHacks.
            </p>
          </Section>

          {/* 4 */}
          <Section title="4. User Responsibilities">
            <p>By using the Site, you agree that you are responsible for:</p>
            <ul className="ml-4 mt-2 list-disc space-y-1">
              <li>
                Reading and understanding any cleaning instructions before applying them in your
                home.
              </li>
              <li>
                Testing every cleaning method on a small, hidden area before treating a larger
                surface.
              </li>
              <li>
                Following the safety instructions on the labels of any cleaning products you use.
              </li>
              <li>
                Wearing appropriate protective equipment (gloves, eye protection, ventilation) when
                handling chemicals.
              </li>
              <li>Keeping cleaning products and DIY mixtures out of reach of children and pets.</li>
              <li>
                Determining whether a method is suitable for your specific surface, material, or
                appliance.
              </li>
            </ul>
          </Section>

          {/* 5 */}
          <Section title="5. Disclaimer">
            <p>
              <strong>
                The Content on TryCleaningHacks is provided for general informational purposes only.
                It does not constitute professional cleaning, safety, medical, or legal advice.
              </strong>
            </p>
            <p className="mt-2">
              The Site and its Content are provided on an &ldquo;as is&rdquo; and &ldquo;as
              available&rdquo; basis without warranties of any kind, whether express or implied,
              including but not limited to fitness for a particular purpose, accuracy, reliability,
              or non-infringement.
            </p>
            <p className="mt-2">
              <strong>
                You use any cleaning hack, tip, recipe, or recommendation found on this Site at your
                own risk.
              </strong>{" "}
              Cleaning products and DIY mixtures can damage surfaces, stain fabrics, irritate skin
              and eyes, or cause other harm if used incorrectly or on the wrong materials. Results
              vary depending on the surface, the product brand, water hardness, and many other
              factors. Always test on a small, inconspicuous area first and follow the
              manufacturer&apos;s instructions for any product you use.
            </p>
            <p className="mt-2">
              Some cleaning combinations (for example, mixing bleach with ammonia or vinegar) can
              produce dangerous fumes. Never combine cleaning products unless a guide explicitly
              instructs you to do so.
            </p>
          </Section>

          {/* 6 */}
          <Section title="6. Limitation of Liability">
            <p>
              To the fullest extent permitted by law, TryCleaningHacks, its owners, operators,
              employees, contributors, and affiliates shall <strong>not</strong> be liable for any
              direct, indirect, incidental, special, consequential, or punitive damages, including
              but not limited to:
            </p>
            <ul className="ml-4 mt-2 list-disc space-y-1">
              <li>Damage to surfaces, appliances, fabrics, finishes, or other property.</li>
              <li>Personal injury, illness, or allergic reactions.</li>
              <li>Loss of data, revenue, or business opportunities.</li>
              <li>Errors, inaccuracies, or omissions in the Content.</li>
              <li>Unauthorised access to or alteration of your transmissions or data.</li>
            </ul>
            <p className="mt-2">
              This limitation applies whether the damages arise from your use or inability to use
              the Site, reliance on the Content, or any other cause, even if we have been advised
              of the possibility of such damages.
            </p>
          </Section>

          {/* 7 */}
          <Section title="7. External Links Disclaimer">
            <p>
              The Site may contain links to third-party websites, products, or services that are
              not owned or controlled by TryCleaningHacks. We provide these links for your
              convenience only.
            </p>
            <p className="mt-2">
              We do <strong>not</strong> endorse, guarantee, or assume responsibility for the
              content, accuracy, privacy practices, or any aspect of any third-party website or
              service. You access third-party links at your own risk and are subject to the terms
              and policies of those third parties.
            </p>
          </Section>

          {/* 8 */}
          <Section title="8. Advertising and Third-Party Services">
            <p>
              TryCleaningHacks displays advertisements served by Google AdSense and may use other
              advertising partners. These third parties may use cookies, web beacons, and similar
              technologies to serve advertisements that may be relevant to your interests, based on
              your visits to this Site and other websites.
            </p>
            <p className="mt-2">
              We do not control the content of advertisements, the products or services they
              promote, or the practices of advertisers. Clicking on an advertisement is at your own
              risk, and any transaction you complete with an advertiser is between you and that
              advertiser.
            </p>
            <p className="mt-2">
              For more information about how advertising data is collected and how you can opt out
              of personalised advertising, please review our{" "}
              <a href="/privacy" className="underline" style={{ color: "var(--accent)" }}>
                Privacy Policy
              </a>
              .
            </p>
          </Section>

          {/* 9 */}
          <Section title="9. Termination of Use">
            <p>
              We reserve the right, in our sole discretion, to suspend or terminate your access to
              the Site at any time, without notice or liability, for any reason, including but not
              limited to a breach of these Terms.
            </p>
            <p className="mt-2">
              Upon termination, your right to use the Site will immediately cease. All provisions
              of these Terms that by their nature should survive termination, including
              intellectual property rights, disclaimers, limitations of liability, and governing
              law, shall survive.
            </p>
          </Section>

          {/* 10 */}
          <Section title="10. Changes to Terms">
            <p>
              We may revise these Terms from time to time at our sole discretion. The
              &ldquo;Last updated&rdquo; date at the top of this page indicates when the Terms were
              last revised. We encourage you to review this page periodically.
            </p>
            <p className="mt-2">
              Material changes will take effect when posted on this page. Your continued use of the
              Site after changes are posted constitutes your acceptance of the revised Terms. If
              you do not agree with the updated Terms, please stop using the Site.
            </p>
          </Section>

          {/* 11 */}
          <Section title="11. Governing Law">
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the
              United States, without regard to conflict of law principles. Any disputes arising
              out of or relating to these Terms or your use of the Site shall be resolved in the
              appropriate courts located in the United States, and you consent to the exclusive
              jurisdiction of such courts.
            </p>
            <p className="mt-2">
              If any provision of these Terms is found to be unenforceable or invalid, that
              provision will be limited or eliminated to the minimum extent necessary so that the
              remaining Terms remain in full force and effect.
            </p>
          </Section>

          {/* 12 */}
          <Section title="12. Contact Information">
            <p>
              If you have any questions about these Terms and Conditions, please contact us through
              our{" "}
              <a href="/contact" className="underline" style={{ color: "var(--accent)" }}>
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
              . We aim to respond to all enquiries within 48 hours.
            </p>
          </Section>
        </div>
      </section>
    </Container>
  );
}

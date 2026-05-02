import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { buildMeta } from "@/components/seo/Meta";

export const metadata: Metadata = buildMeta({
  title: "Privacy Policy",
  description:
    "Read how TryCleaningHacks collects, uses, and protects your personal data, including our cookie, advertising, and data-handling policies.",
  path: "/privacy",
  keywords: ["TryCleaningHacks privacy policy", "data collection", "cookie policy", "Google AdSense privacy"],
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
            Last updated: May 2, 2026. Your privacy matters to us. Read below to understand
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
          <Section title="1. Introduction">
            <p>
              Welcome to TryCleaningHacks (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;).
              We operate the website{" "}
              <a href="https://www.trycleaninghacks.com" className="underline" style={{ color: "var(--accent)" }}>
                www.trycleaninghacks.com
              </a>{" "}
              (the &ldquo;Site&rdquo;), a blog dedicated to tested cleaning tips, DIY methods, and
              home-care guides.
            </p>
            <p className="mt-2">
              This Privacy Policy explains what information we collect when you use the Site, how we
              use it, who we share it with, and the choices you have. By using the Site, you agree to
              the practices described below. If you do not agree, please discontinue use of the Site.
            </p>
          </Section>

          {/* 2 */}
          <Section title="2. Information We Collect">
            <p>We collect information in two ways:</p>
            <ul className="ml-4 mt-2 list-disc space-y-1">
              <li>
                <strong>Information you provide directly:</strong> your name, email address, and any
                message you send when subscribing to our newsletter or using our contact form.
              </li>
              <li>
                <strong>Information collected automatically:</strong> IP address, browser type and
                version, device type and operating system, referring URL, pages visited, time spent
                on each page, and approximate location (country/region). This data is gathered through
                cookies, log files, and analytics services.
              </li>
            </ul>
            <p className="mt-2">
              We do not knowingly collect any sensitive personal information such as financial,
              health, or government identification data.
            </p>
          </Section>

          {/* 3 */}
          <Section title="3. How We Use Your Information">
            <p>We use the information we collect to:</p>
            <ul className="ml-4 mt-2 list-disc space-y-1">
              <li>Respond to enquiries submitted through the contact form.</li>
              <li>Send newsletter updates if you have opted in.</li>
              <li>Analyse anonymous usage data to improve content, performance, and user experience.</li>
              <li>Display relevant advertisements through Google AdSense and other ad partners.</li>
              <li>Detect, prevent, and address fraud, abuse, or security issues.</li>
              <li>Comply with applicable legal obligations.</li>
            </ul>
          </Section>

          {/* 4 */}
          <Section title="4. Cookies and Tracking Technologies">
            <p>
              Cookies are small text files stored on your device that help websites function and
              gather information. TryCleaningHacks uses the following types of cookies:
            </p>
            <ul className="ml-4 mt-2 list-disc space-y-1">
              <li>
                <strong>Essential cookies</strong> required for basic site functionality, such as
                remembering your theme preference.
              </li>
              <li>
                <strong>Analytics cookies</strong> (Google Analytics) that help us understand traffic
                patterns and which content is most useful.
              </li>
              <li>
                <strong>Advertising cookies</strong> used by Google AdSense and its partners to serve
                ads that may be relevant to your interests.
              </li>
              <li>
                <strong>Social and conversion cookies</strong> used by Pinterest to measure traffic
                and conversions from our content on Pinterest.
              </li>
            </ul>
            <p className="mt-2">
              You can manage or disable cookies through your browser settings at any time. Please
              note that disabling certain cookies may limit some features of the Site.
            </p>
          </Section>

          {/* 5 */}
          <Section title="5. Third-Party Services">
            <p>
              We use the following third-party services, each of which has its own privacy policy
              governing how they collect and use data:
            </p>
            <ul className="ml-4 mt-2 list-disc space-y-2">
              <li>
                <strong>Google AdSense</strong> serves the advertisements you see on the Site. Read
                Google&apos;s{" "}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                  style={{ color: "var(--accent)" }}
                >
                  Privacy Policy
                </a>
                .
              </li>
              <li>
                <strong>Google Analytics</strong> helps us understand visitor behaviour through
                aggregated, anonymised reports. Learn how to{" "}
                <a
                  href="https://tools.google.com/dlpage/gaoptout"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                  style={{ color: "var(--accent)" }}
                >
                  opt out of Google Analytics
                </a>
                .
              </li>
              <li>
                <strong>Pinterest Tag</strong> measures the effectiveness of our content on
                Pinterest. Read{" "}
                <a
                  href="https://policy.pinterest.com/en/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                  style={{ color: "var(--accent)" }}
                >
                  Pinterest&apos;s Privacy Policy
                </a>
                .
              </li>
              <li>
                <strong>Vercel</strong> hosts the Site and may collect basic request logs (IP, user
                agent) for security and performance.{" "}
                <a
                  href="https://vercel.com/legal/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                  style={{ color: "var(--accent)" }}
                >
                  Vercel Privacy Policy
                </a>
                .
              </li>
              <li>
                <strong>Resend</strong> delivers our transactional and newsletter emails when you
                subscribe.{" "}
                <a
                  href="https://resend.com/legal/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                  style={{ color: "var(--accent)" }}
                >
                  Resend Privacy Policy
                </a>
                .
              </li>
            </ul>
            <p className="mt-2">
              We do not control how these third parties handle data outside of the Site, and we
              recommend reviewing their respective privacy policies.
            </p>
          </Section>

          {/* 6 */}
          <Section title="6. How Google Uses Data (Ads Personalisation)">
            <p>
              Third-party vendors, including Google, use cookies to serve ads based on your prior
              visits to this Site and other websites on the internet. Google&apos;s use of advertising
              cookies enables it and its partners to serve ads to you based on your visit to our Site
              and other sites.
            </p>
            <p className="mt-2">
              You may opt out of personalised advertising by visiting{" "}
              <a
                href="https://www.google.com/settings/ads"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
                style={{ color: "var(--accent)" }}
              >
                Google Ads Settings
              </a>
              . Alternatively, you may opt out of some third-party vendors&apos; use of cookies for
              personalised advertising at{" "}
              <a
                href="https://www.aboutads.info"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
                style={{ color: "var(--accent)" }}
              >
                www.aboutads.info
              </a>
              .
            </p>
            <p className="mt-2">
              For users in the European Economic Area, the United Kingdom, or Switzerland, Google
              relies on consent collected through our cookie banner before using cookies for
              personalised advertising or measurement.
            </p>
          </Section>

          {/* 7 */}
          <Section title="7. Data Protection">
            <p>
              We take reasonable technical and organisational measures to protect your personal
              information from loss, misuse, unauthorised access, disclosure, alteration, or
              destruction. These measures include encrypted connections (HTTPS), restricted access to
              data, and regular review of our security practices.
            </p>
            <p className="mt-2">
              No method of transmission over the internet or method of electronic storage is 100%
              secure. While we strive to use commercially acceptable means to protect your personal
              information, we cannot guarantee absolute security.
            </p>
            <p className="mt-2">
              We do <strong>not</strong> sell, rent, or trade your personal information. We may share
              data only with service providers who assist in operating the website, when required by
              law or legal process, or to protect the rights, safety, or property of TryCleaningHacks
              or its users.
            </p>
          </Section>

          {/* 8 */}
          <Section title="8. Your Privacy Rights">
            <p>
              Depending on your location, you may have the following rights regarding your personal
              data:
            </p>
            <ul className="ml-4 mt-2 list-disc space-y-1">
              <li>
                <strong>Access:</strong> request a copy of the personal data we hold about you.
              </li>
              <li>
                <strong>Correction:</strong> request that inaccurate data be corrected or completed.
              </li>
              <li>
                <strong>Deletion:</strong> request that we delete your personal data, subject to
                legal retention obligations.
              </li>
              <li>
                <strong>Restriction:</strong> request that we limit how we process your data.
              </li>
              <li>
                <strong>Objection:</strong> object to processing based on legitimate interests or
                direct marketing.
              </li>
              <li>
                <strong>Portability:</strong> request a portable copy of the data you have provided
                to us.
              </li>
              <li>
                <strong>Withdraw consent:</strong> withdraw any consent you have given (for example,
                unsubscribe from our newsletter at any time using the link in every email).
              </li>
              <li>
                <strong>Opt out of personalised ads:</strong> manage ad preferences via{" "}
                <a
                  href="https://www.google.com/settings/ads"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                  style={{ color: "var(--accent)" }}
                >
                  Google Ad Settings
                </a>
                .
              </li>
            </ul>
            <p className="mt-2">
              To exercise any of these rights, please contact us through our{" "}
              <a href="/contact" className="underline" style={{ color: "var(--accent)" }}>
                Contact page
              </a>
              . We will respond within a reasonable timeframe and in accordance with applicable law.
            </p>
          </Section>

          {/* 9 */}
          <Section title="9. Children's Information">
            <p>
              TryCleaningHacks is intended for a general adult audience and is not directed at
              children under the age of 13 (or under 16 in some jurisdictions). We do not knowingly
              collect personal information from children. If you believe a child has provided us
              with personal data, please contact us so we can promptly delete it.
            </p>
          </Section>

          {/* 10 */}
          <Section title="10. Changes to This Policy">
            <p>
              We may update this Privacy Policy from time to time to reflect changes in our
              practices, technology, or legal requirements. The &ldquo;Last updated&rdquo; date at
              the top of this page indicates when the policy was last revised. We encourage you to
              review this page periodically. Your continued use of the Site after any changes
              constitutes acceptance of the updated policy.
            </p>
          </Section>

          {/* 11 */}
          <Section title="11. Contact Information">
            <p>
              If you have any questions, concerns, or requests regarding this Privacy Policy or how
              your personal data is handled, please reach us through our{" "}
              <a href="/contact" className="underline" style={{ color: "var(--accent)" }}>
                Contact page
              </a>
              . We aim to respond to all enquiries within 48 hours.
            </p>
          </Section>
        </div>
      </section>
    </Container>
  );
}

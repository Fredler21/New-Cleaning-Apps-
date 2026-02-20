import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { buildMeta } from "@/components/seo/Meta";

export const metadata: Metadata = buildMeta({
  title: "Privacy",
  description: "How CleaningHacks handles contact data, analytics, and content usage.",
  path: "/privacy"
});

export default function PrivacyPage() {
  return (
    <Container>
      <section className="py-12">
        <div className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl" style={{ color: "var(--text)" }}>Privacy Policy</h1>
          <p className="mt-3" style={{ color: "var(--text-secondary)" }}>How we handle your data — simple and transparent.</p>
        </div>
        <div className="space-y-4 rounded-xl p-6 text-sm leading-7 sm:p-8 sm:text-base" style={{ background: "var(--card-bg)", border: "1px solid var(--border)", color: "var(--text-secondary)" }}>
          <p>
            CleaningHacks collects only the data needed to run this website and respond to messages submitted through the contact form.
            We do not sell personal information.
          </p>
          <p>
            If you submit your name, email, and message, that information is used only to reply to your request.
            Do not include sensitive personal data in your message.
          </p>
          <p>
            We may use anonymous usage metrics to improve performance, readability, and mobile experience.
            These metrics do not identify you personally.
          </p>
          <p>
            You can request deletion of your contact submission by emailing our team through the contact page.
            We review and process verified requests in a reasonable timeframe.
          </p>
          <p>
            This policy can be updated as the site evolves. Continued use of the website means you accept the current policy.
          </p>
        </div>
      </section>
    </Container>
  );
}

"use client";

import { FormEvent, useState } from "react";
import { Container } from "@/components/layout/Container";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export default function ContactPage() {
  const [status, setStatus] = useState<string>("");
  const [statusType, setStatusType] = useState<"success" | "error">("success");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setStatus("");

    const form = event.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      message: String(formData.get("message") || "")
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      let result: { message?: string; error?: string };
      try {
        result = (await response.json()) as { message?: string; error?: string };
      } catch {
        setLoading(false);
        setStatusType("error");
        setStatus("Server error. Please try again later.");
        return;
      }

      setLoading(false);

      if (!response.ok) {
        setStatusType("error");
        setStatus(result.error ?? "Unable to send your message.");
        return;
      }

      setStatusType("success");
      form.reset();
      setStatus(result.message ?? "Message sent!");
    } catch {
      setLoading(false);
      setStatusType("error");
      setStatus("Network error. Please check your connection and try again.");
    }
  };

  return (
    <Container>
      <section className="py-12">
        {/* Page header */}
        <div className="mx-auto max-w-xl text-center mb-10">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl" style={{ color: "var(--text)" }}>
            <span className="mr-2">✉️</span>Get in Touch
          </h1>
          <p className="mt-3 text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            Have a question about a cleaning hack, need personalized advice for a tough stain, or want to collaborate with our team? We&apos;re here to help. The TryCleaningHacks editorial team reads every message and typically responds within 24 to 48 hours.
          </p>
          <p className="mt-2 text-sm" style={{ color: "var(--text-secondary)" }}>
            Or email us directly at{" "}
            <a
              href="mailto:support@trycleaninghacks.com"
              className="underline font-medium"
              style={{ color: "var(--accent)" }}
            >
              support@trycleaninghacks.com
            </a>
          </p>
        </div>

        {/* Contact form */}
        <div className="mx-auto max-w-xl">
          <form onSubmit={onSubmit} className="grid gap-4 rounded-xl p-6" style={{ background: "var(--card-bg)", border: "1px solid var(--border)" }}>
            <Input name="name" type="text" placeholder="Name" required aria-label="Name" />
            <Input name="email" type="email" placeholder="Email" required aria-label="Email" />
            <textarea
              name="message"
              required
              rows={5}
              placeholder="Message"
              aria-label="Message"
              className="w-full rounded-xl px-4 py-3 text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
              style={{ background: "var(--input-bg)", border: "1px solid var(--input-border)", color: "var(--text)" }}
            />
            <Button type="submit" disabled={loading}>
              {loading ? "Sending..." : "Send Message"}
            </Button>
            {status ? (
              <p
                className={`rounded-lg px-3 py-2 text-sm ${
                  statusType === "success"
                    ? "bg-teal-50 text-teal-700 dark:bg-teal-500/10 dark:text-teal-400"
                    : "bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400"
                }`}
                role="status"
              >
                {status}
              </p>
            ) : null}
          </form>
        </div>

        {/* What we can help with */}
        <div className="mx-auto max-w-2xl mt-16">
          <h2 className="text-2xl font-semibold tracking-tight text-center mb-8" style={{ color: "var(--text)" }}>
            What Can We Help You With?
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { icon: "🧹", title: "Cleaning Advice", desc: "Stuck on a stubborn stain or odor? Describe the surface, material, and what you\u2019ve tried, our editors will suggest a tested hack tailored to your situation." },
              { icon: "💡", title: "Suggest a Hack", desc: "Discovered a brilliant cleaning shortcut? Share your hack and it may be featured in an upcoming article, complete with credit to you." },
              { icon: "🤝", title: "Brand Collaborations", desc: "We partner with eco-friendly cleaning brands, home-care companies, and lifestyle publishers for sponsored content, product reviews, and roundups." },
              { icon: "📝", title: "Content Licensing", desc: "Interested in republishing or licensing our tested cleaning guides for your platform, newsletter, or print publication? Let\u2019s discuss terms." },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl p-5 transition-all duration-200 hover:-translate-y-0.5"
                style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
              >
                <span className="text-2xl mb-2 block">{item.icon}</span>
                <h3 className="font-semibold mb-1" style={{ color: "var(--text)" }}>{item.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ section */}
        <div className="mx-auto max-w-2xl mt-16">
          <h2 className="text-2xl font-semibold tracking-tight text-center mb-8" style={{ color: "var(--text)" }}>
            Frequently Asked Questions
          </h2>
          <div className="grid gap-4">
            {[
              { q: "How quickly will I hear back?", a: "Most inquiries receive a reply within 24 to 48 hours on business days. For urgent cleaning emergencies, try searching our 40+ guides, the answer is often already published." },
              { q: "Can I submit a guest post or hack?", a: "Absolutely! We welcome reader-submitted hacks. Include the cleaning problem, ingredients used, step-by-step instructions, and a photo if possible. Our editors will test and verify before publishing." },
              { q: "Do you offer sponsored content?", a: "Yes. We work with cleaning brands, home-improvement companies, and eco-friendly product makers on sponsored articles, product features, and social media campaigns. Reach out with your proposal and budget." },
              { q: "I found an error in a guide. How do I report it?", a: "We take accuracy seriously. Use the form above to describe the issue, include the article title and what needs correcting. We\u2019ll review and update the guide promptly." },
              { q: "Is my information kept private?", a: "Yes. We never sell or share your personal data. Your name and email are used only to respond to your inquiry. See our Privacy Policy for full details." },
            ].map((faq) => (
              <div
                key={faq.q}
                className="rounded-xl p-5"
                style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
              >
                <h3 className="font-semibold mb-2" style={{ color: "var(--text)" }}>{faq.q}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Container>
  );
}

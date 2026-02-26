import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { buildMeta } from "@/components/seo/Meta";

export const metadata: Metadata = buildMeta({
  title: "About",
  description:
    "Learn about TryCleaningHacks — who we are, why we started, and how we help thousands of homeowners clean smarter every day.",
  path: "/about",
  keywords: ["about TryCleaningHacks", "cleaning advice team", "home cleaning experts"],
});

export default function AboutPage() {
  return (
    <Container>
      <section className="py-12">
        <div className="mb-10">
          <h1
            className="text-3xl font-bold tracking-tight sm:text-4xl"
            style={{ color: "var(--text)" }}
          >
            About TryCleaningHacks
          </h1>
          <p className="mt-3" style={{ color: "var(--text-secondary)" }}>
            Real cleaning solutions for real homes — tested, trusted, and completely free.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          <div
            className="space-y-6 text-base leading-8"
            style={{ color: "var(--text-secondary)" }}
          >
            {/* Our Story */}
            <div
              className="rounded-xl p-6"
              style={{ background: "var(--card-bg)", border: "1px solid var(--border)" }}
            >
              <h2 className="mb-3 text-lg font-semibold" style={{ color: "var(--text)" }}>
                Our Story
              </h2>
              <p>
                TryCleaningHacks started as a simple idea: make household cleaning less
                overwhelming. We noticed that most cleaning advice online was either too vague, full
                of unnecessary products, or just hard to follow. So we set out to build a resource
                that gives you clear, step-by-step guides using everyday ingredients you already
                have at home — things like baking soda, vinegar, dish soap, and lemon juice.
              </p>
              <p className="mt-3">
                What began as a small collection of tips has grown into a library of hundreds of
                tested hacks, covering everything from bathroom deep-cleans to laundry room
                shortcuts. Every article is written with one goal: help you get professional-looking
                results without the professional price tag.
              </p>
            </div>

            {/* Our Mission */}
            <div
              className="rounded-xl p-6"
              style={{ background: "var(--card-bg)", border: "1px solid var(--border)" }}
            >
              <h2 className="mb-3 text-lg font-semibold" style={{ color: "var(--text)" }}>
                Our Mission
              </h2>
              <p>
                We believe everyone deserves a clean, comfortable home — regardless of budget or
                experience. Our mission is to provide trustworthy, practical cleaning advice that
                actually works. We test every hack before publishing, focus on safety-first
                instructions, and keep things simple so anyone can follow along.
              </p>
            </div>

            {/* How We Work */}
            <div
              className="rounded-xl p-6"
              style={{ background: "var(--card-bg)", border: "1px solid var(--border)" }}
            >
              <h2 className="mb-3 text-lg font-semibold" style={{ color: "var(--text)" }}>
                How We Work
              </h2>
              <p>
                Every guide on TryCleaningHacks follows a simple process:
              </p>
              <ul className="ml-4 mt-2 list-disc space-y-1">
                <li>
                  <strong>Research</strong> — We study proven cleaning methods and popular DIY
                  techniques shared by real homeowners.
                </li>
                <li>
                  <strong>Test</strong> — Each hack is tried in a real home environment before it
                  goes live on the site.
                </li>
                <li>
                  <strong>Write clearly</strong> — We break every method into numbered steps with
                  the supplies you need listed upfront.
                </li>
                <li>
                  <strong>Safety first</strong> — We always note ingredient warnings, ventilation
                  tips, and surfaces to avoid.
                </li>
              </ul>
            </div>

            {/* Who This Is For */}
            <div
              className="rounded-xl p-6"
              style={{ background: "var(--card-bg)", border: "1px solid var(--border)" }}
            >
              <h2 className="mb-3 text-lg font-semibold" style={{ color: "var(--text)" }}>
                Who This Is For
              </h2>
              <p>
                Whether you&apos;re a busy parent looking for 5-minute quick wins, a first-time
                renter tackling move-out cleaning, or a homeowner who just wants a reliable weekend
                deep-clean routine — TryCleaningHacks is made for you. Our content is free, easy to
                navigate, and designed to work on both phone and desktop.
              </p>
            </div>

            {/* Get in Touch */}
            <div
              className="rounded-xl p-6"
              style={{ background: "var(--card-bg)", border: "1px solid var(--border)" }}
            >
              <h2 className="mb-3 text-lg font-semibold" style={{ color: "var(--text)" }}>
                Get in Touch
              </h2>
              <p>
                Have a cleaning question, suggestion, or just want to say hello? We&apos;d love to
                hear from you. Head over to our{" "}
                <a
                  href="/contact"
                  className="underline"
                  style={{ color: "var(--accent)" }}
                >
                  Contact page
                </a>{" "}
                and drop us a message — we respond to every enquiry.
              </p>
            </div>
          </div>

          {/* Stats sidebar */}
          <div className="space-y-4 lg:sticky lg:top-[88px] lg:self-start">
            <div
              className="rounded-xl p-6"
              style={{ background: "var(--card-bg)", border: "1px solid var(--border)" }}
            >
              <h3
                className="mb-4 text-xs font-semibold uppercase tracking-wider"
                style={{ color: "var(--muted)" }}
              >
                By the numbers
              </h3>
              <div className="space-y-4">
                <div>
                  <p className="text-2xl font-bold" style={{ color: "var(--text)" }}>
                    200+
                  </p>
                  <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                    Tested cleaning hacks
                  </p>
                </div>
                <div className="pt-4" style={{ borderTop: "1px solid var(--border)" }}>
                  <p className="text-2xl font-bold" style={{ color: "var(--text)" }}>
                    11
                  </p>
                  <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                    Categories covered
                  </p>
                </div>
                <div className="pt-4" style={{ borderTop: "1px solid var(--border)" }}>
                  <p className="text-2xl font-bold" style={{ color: "var(--text)" }}>
                    50K+
                  </p>
                  <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
                    Monthly readers
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
}

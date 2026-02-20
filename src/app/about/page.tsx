import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { buildMeta } from "@/components/seo/Meta";

export const metadata: Metadata = buildMeta({
  title: "About",
  description: "Learn about the premium approach behind CleaningHax and our practical safety-first methods.",
  path: "/about"
});

export default function AboutPage() {
  return (
    <Container>
      <section className="py-12">
        <div className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl" style={{ color: "var(--text)" }}>About CleaningHacks</h1>
          <p className="mt-3" style={{ color: "var(--text-secondary)" }}>The story behind the best place for cleaning solutions.</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          <div className="space-y-6 text-base leading-8" style={{ color: "var(--text-secondary)" }}>
            <div className="rounded-xl p-6" style={{ background: "var(--card-bg)", border: "1px solid var(--border)" }}>
              <h2 className="mb-3 text-lg font-semibold" style={{ color: "var(--text)" }}>Our Mission</h2>
              <p>
                CleaningHacks was built for people who want confident, polished results with simple repeatable steps. Every guide is designed for real homes, real schedules, and clear outcomes.
              </p>
            </div>

            <div className="rounded-xl p-6" style={{ background: "var(--card-bg)", border: "1px solid var(--border)" }}>
              <h2 className="mb-3 text-lg font-semibold" style={{ color: "var(--text)" }}>Our Approach</h2>
              <p>
                Our system blends quick wins for busy days with deep-clean frameworks for weekend resets. We prioritize safety-first instructions, practical supplies, and finish quality that looks as good as it feels.
              </p>
            </div>

            <div className="rounded-xl p-6" style={{ background: "var(--card-bg)", border: "1px solid var(--border)" }}>
              <h2 className="mb-3 text-lg font-semibold" style={{ color: "var(--text)" }}>Premium Experience</h2>
              <p>
                The editorial style is inspired by modern consumer platforms, translated into a high-end web experience that works beautifully on phone and desktop.
              </p>
            </div>
          </div>

          {/* Stats sidebar */}
          <div className="space-y-4 lg:sticky lg:top-[88px] lg:self-start">
            <div className="rounded-xl p-6" style={{ background: "var(--card-bg)", border: "1px solid var(--border)" }}>
              <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--muted)" }}>By the numbers</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-2xl font-bold" style={{ color: "var(--text)" }}>200+</p>
                  <p className="text-sm" style={{ color: "var(--text-secondary)" }}>Tested cleaning hacks</p>
                </div>
                <div className="pt-4" style={{ borderTop: "1px solid var(--border)" }}>
                  <p className="text-2xl font-bold" style={{ color: "var(--text)" }}>8</p>
                  <p className="text-sm" style={{ color: "var(--text-secondary)" }}>Categories covered</p>
                </div>
                <div className="pt-4" style={{ borderTop: "1px solid var(--border)" }}>
                  <p className="text-2xl font-bold" style={{ color: "var(--text)" }}>50K+</p>
                  <p className="text-sm" style={{ color: "var(--text-secondary)" }}>Monthly readers</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Container>
  );
}

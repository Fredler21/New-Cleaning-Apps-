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
        <h1 className="text-3xl font-semibold text-white sm:text-4xl">About CleaningHax Premium</h1>
        <div className="mt-6 space-y-4 text-base leading-8 text-slate-300">
          <p>
            CleaningHax Premium was built for people who want confident, polished results with simple repeatable steps. Every guide is designed for real homes, real schedules, and clear outcomes.
          </p>
          <p>
            Our system blends quick wins for busy days with deep-clean frameworks for weekend resets. We prioritize safety-first instructions, practical supplies, and finish quality that looks as good as it feels.
          </p>
          <p>
            The editorial style is inspired by social-native cleaning cards, translated into a high-end web experience that works beautifully on iPhone and desktop.
          </p>
        </div>
      </section>
    </Container>
  );
}

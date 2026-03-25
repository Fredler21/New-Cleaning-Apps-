import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { buildMeta } from "@/components/seo/Meta";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = buildMeta({
  title: "FAQ",
  description:
    "Frequently asked cleaning questions — find quick answers to common household cleaning problems.",
  path: "/faq",
  keywords: ["cleaning FAQ", "cleaning questions", "house cleaning help", "cleaning tips"],
});

const faqs = [
  {
    question: "Who runs TryCleaningHacks?",
    answer:
      "TryCleaningHacks is run by a small team of cleaning enthusiasts and researchers passionate about making home care easier for everyone. Every guide is tested and written by real people who care about results, safety, and simplicity.",
  },
  {
    question: "Is TryCleaningHacks free to use?",
    answer:
      "Yes! All our cleaning guides, tips, and resources are 100% free for everyone. We believe trustworthy cleaning advice should be accessible to all, with no paywalls or subscriptions.",
  },
  {
    question: "How can I contact you or suggest a topic?",
    answer:
      "We love hearing from our readers! You can reach us anytime through our Contact page. If you have a cleaning question or want to suggest a topic, just send us a message. We respond to every enquiry.",
  },
  {
    question: "What is the best way to deep clean my bathroom?",
    answer:
      "Start by spraying an all-purpose cleaner on tiles, the tub, and the toilet. Let it sit for 5 to 10 minutes to break down grime. Scrub surfaces with a stiff brush, then rinse. For mirrors and glass, use a vinegar and water mix and a microfibre cloth to get a streak-free finish. Finish by mopping the floor with a disinfectant solution.",
  },
  {
    question: "How do I remove tough grease stains from my kitchen?",
    answer:
      "Mix equal parts baking soda and dish soap into a paste. Apply it directly to the greasy area, such as stovetops, range hoods, or backsplash tiles, and let it sit for 15 minutes. Scrub with a non-scratch sponge and wipe clean with a damp cloth. For stubborn buildup, a degreaser spray works wonders.",
  },
  {
    question: "How often should I wash my bedding and curtains?",
    answer:
      "Sheets and pillowcases should be washed weekly in hot water to eliminate dust mites and bacteria. Duvet covers and blankets can be washed every two to four weeks. Curtains should be laundered or steam cleaned every three to six months, or more often if you have pets or allergies.",
  },
  {
    question: "What natural cleaning products actually work?",
    answer:
      "White vinegar, baking soda, lemon juice, and castile soap are all highly effective. Vinegar cuts through grease and removes odours. Baking soda is a gentle abrasive for scrubbing. Lemon juice naturally disinfects and brightens. Castile soap works as an all-purpose cleaner when diluted with water.",
  },
  {
    question: "How can I keep my home smelling fresh without air fresheners?",
    answer:
      "Open windows regularly for ventilation. Simmer a pot of water with citrus peels, cinnamon sticks, and cloves for a natural fragrance. Sprinkle baking soda on carpets before vacuuming to absorb odours. Place bowls of activated charcoal or coffee grounds in musty areas to neutralise smells.",
  },
  {
    question: "Can I mix vinegar and baking soda for cleaning?",
    answer:
      "Technically yes, but it's not the most effective approach. When vinegar and baking soda combine, they neutralise each other, producing mostly water and carbon dioxide. The fizzing action can help loosen light grime, but you lose the individual cleaning power of both ingredients. For best results, use them separately — baking soda as a scrubbing paste and vinegar as a rinse or spray.",
  },
  {
    question: "Is hydrogen peroxide safe to use as a household disinfectant?",
    answer:
      "Yes, 3% hydrogen peroxide (the standard concentration sold in pharmacies) is safe and effective for disinfecting surfaces, killing mould, and whitening grout. Spray it directly onto surfaces, leave for 5–10 minutes, then wipe clean. Avoid mixing it with vinegar, as the combination creates peracetic acid which can irritate skin and lungs. Store hydrogen peroxide in a dark container as light degrades it quickly.",
  },
  {
    question: "What can I use WD-40 for around the house?",
    answer:
      "WD-40 has dozens of household uses beyond lubricating hinges. It removes sticky adhesive residue, crayon marks from walls, scuff marks from floors, and water stains from stainless steel. It also prevents rust on tools and loosens stuck zips. Apply a small amount with a cloth, let it sit briefly, then wipe away. Always test on an inconspicuous area first, especially on painted or finished surfaces.",
  },
  {
    question: "Can Listerine be used for cleaning around the home?",
    answer:
      "Yes — Listerine's active ingredients (thymol, eucalyptol, and alcohol) make it a surprisingly effective cleaning agent. It can deodorise bins and washing machines, kill mould on surfaces, clean toilet bowls, and even freshen carpets when diluted with water. Use the original amber formula for best results, as it has the highest concentration of active ingredients. Avoid using it on marble or natural stone as the acidity can cause etching.",
  },
  {
    question: "How do I get rid of ants and common household pests naturally?",
    answer:
      "For ants, wipe down surfaces with white vinegar to erase their scent trails, and sprinkle food-grade diatomaceous earth along entry points. Cinnamon, peppermint oil, and coffee grounds also deter ants naturally. For cockroaches, a mix of baking soda and sugar placed in shallow dishes works as a natural bait. Keep surfaces dry and seal food in airtight containers to remove attractants. For fruit flies, place a small bowl of apple cider vinegar covered with cling film with a few holes poked in it — they fly in but cannot escape.",
  },
  {
    question: "What is the best way to whiten laundry without bleach?",
    answer:
      "Oxygen-based washing powder (such as sodium percarbonate) is the most effective bleach-free whitener — add half a cup to your wash along with your regular detergent. White vinegar added to the fabric softener compartment brightens whites and removes detergent residue. For stubborn yellowing, soak items overnight in a solution of hot water and oxygen powder before washing. Drying whites in direct sunlight also has a natural bleaching effect.",
  },
];

export default function FAQPage() {
  return (
    <Container>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: { "@type": "Answer", text: faq.answer },
          })),
        }}
      />
      <section className="py-12">
        <div className="mb-10">
          <h1
            className="text-3xl font-bold tracking-tight sm:text-4xl"
            style={{ color: "var(--text)" }}
          >
            Frequently Asked Questions
          </h1>
          <p className="mt-3" style={{ color: "var(--text-secondary)" }}>
            Quick answers to the most common cleaning questions we get asked.
          </p>
        </div>
        <FAQAccordion items={faqs} />
      </section>
    </Container>
  );
}

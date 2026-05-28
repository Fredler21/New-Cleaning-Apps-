import type { Metadata } from "next";
import { CategoryCard } from "@/components/categories/CategoryCard";
import { Container } from "@/components/layout/Container";
import { buildMeta } from "@/components/seo/Meta";
import { categories } from "@/data/categories";
import { posts } from "@/data/posts";

export const metadata: Metadata = buildMeta({
  title: "Cleaning Categories, Browse by Ingredient, Room, or Method",
  description:
    "Explore every cleaning category on TryCleaningHacks, from Dawn dish soap and white vinegar to baking soda, hydrogen peroxide, deep clean routines, bathroom care, pest control, and DIY cleaners. Each category is grounded in real testing and clear, surface-safe instructions.",
  path: "/categories",
  keywords: [
    "cleaning categories",
    "Dawn hacks",
    "vinegar hacks",
    "baking soda cleaning",
    "hydrogen peroxide cleaning",
    "DIY cleaners",
    "bathroom cleaning",
    "deep clean guides",
    "budget cleaning hacks",
  ],
});

const editorialSections: { id: string; heading: string; body: string[] }[] = [
  {
    id: "ingredient-categories",
    heading: "Ingredient based categories",
    body: [
      "We organize the largest part of our library by the active cleaning ingredient because the ingredient determines almost everything that matters in a cleaning method, including which surfaces are safe, what residue gets left behind, how long the dwell time should be, and which other products you must never combine it with. Picking a guide by the ingredient you already own at home is the fastest way to get started, and it is also the safest because every guide in the same ingredient category follows the same compatibility rules.",
      "Vinegar Hacks covers acidic cleaning. White distilled vinegar at five percent acetic acid dissolves mineral deposits, soap scum, and limescale on glass, chrome, and ceramic surfaces. We never recommend vinegar on natural stone, on unsealed grout, or on hardwood floors because the acid etches calcium based surfaces and dulls finishes over time. Every vinegar guide on the site lists the surfaces it has been tested on and the ones to avoid.",
      "Baking Soda guides cover the gentle abrasive and odor neutralizing side of cleaning. Sodium bicarbonate at the right grit lifts cooked on grease, neutralizes acidic odors in carpets and refrigerators, and works as a non scratching scrub on stainless steel, enameled cast iron, and ceramic cookware. Baking soda is the most beginner friendly cleaner in the kitchen because it cannot damage almost any surface even at full strength.",
      "Dawn Dish Soap Hacks focus on the surfactant chemistry that makes Dawn the standard for cutting kitchen grease. The same surfactant action that lifts oil from a frying pan also lifts soap scum from a bathtub, removes greasy fingerprints from cabinets, and forms the base of safe outdoor cleaners for patio furniture. We use original blue Dawn in all our recipes because the ratio of surfactants is consistent across batches.",
      "Hydrogen Peroxide guides cover oxidizing cleaning. Three percent food grade peroxide brightens grout, lifts organic stains from upholstery, and kills mildew on tile and shower walls without the harshness of chlorine bleach. Peroxide breaks down into water and oxygen after it does its work, which makes it one of the safest disinfectants for households with kids and pets when used correctly.",
      "Listerine Hacks and WD 40 Hacks cover unconventional but well documented uses of two products most people already own. Original amber Listerine doubles as a surface antimicrobial for trash cans and shower drains because of its essential oil content. WD 40 lifts crayon, sticker residue, and stubborn rust from chrome and porcelain because of its solvent base. Both categories include strict surface safety lists because misusing either product on the wrong material causes real damage.",
    ],
  },
  {
    id: "method-categories",
    heading: "Method based categories",
    body: [
      "The method based categories help you find guides when you know the situation but not the ingredient. If your bathroom needs a top to bottom reset before guests arrive, the Bathroom Cleaning category gives you a full sequence rather than a single hack. If you have inherited a moldy basement or a kitchen that has been ignored for months, the Deep Clean category gives you the multi step routines that small daily fixes cannot match.",
      "Deep Clean guides are written for the situations where a five minute wipe down is not enough. Each guide includes the order of operations, the wait times between steps, and the safety overlap rules so you can run a full deep clean in a single afternoon without doubling back. We test these routines on real homes, not on staged photo sets, which is why our timing estimates match what actually happens when soap needs to dwell or when grout needs a second pass.",
      "Bathroom Cleaning is the most search heavy category we publish because bathrooms develop unique problems that no other room shares. Hard water mineral buildup, soap scum, mildew on grout and caulk, pink Serratia bacteria, hard to reach toilet scaling, and shower curtain liner staining all show up in this category. We separate the methods by surface type because what works on chrome will damage the chrome plating on adjacent fixtures if applied in the wrong concentration.",
      "Laundry and Kitchen covers the two highest traffic rooms where stains and grease are the dominant problems. The category includes guides for stain treatment timing on different fabric types, oven and range hood degreasing, dishwasher self cleaning, garbage disposal odor control, and refrigerator interior care. These are the routines that determine how clean your home actually feels day to day.",
      "Home Fragrance and DIY Cleaners give you the foundation for replacing commercial cleaners and air fresheners with safer mixes you make yourself. We do not publish a recipe in either category until it has been tested across multiple humidity levels, surface types, and storage conditions to make sure it actually works in normal homes and not just in a single test kitchen.",
    ],
  },
  {
    id: "specialty-categories",
    heading: "Specialty categories",
    body: [
      "The specialty categories cover problems that do not fit neatly into the ingredient or method buckets but that matter enough to need their own dedicated section. Pest Control is one of the most read specialty categories because pest problems require a different kind of attention. We do not write about pesticides or extermination services. The guides in Pest Control focus on prevention, sanitation, exclusion, and the everyday cleaning routines that remove the food sources and harborage that attract pests in the first place.",
      "Paint Colors covers a question most cleaning sites ignore but that comes up constantly in our reader emails: which colors and finishes hide dust and fingerprints between cleanings. The guides in this category explain why certain paint sheens, floor colors, and cabinet finishes mask everyday residue and which to avoid if you do not want to dust three times a week. This category is the one most directly informed by the years our team spent inside other peoples homes as professional cleaners.",
      "Dollar Store covers the budget tools and organizers that we have personally bought, used, and tested. We include the specific items that hold up to weekly use and clearly note which ones fail within a month so readers can avoid wasting money on tools that look the part but do not last.",
    ],
  },
  {
    id: "how-to-pick",
    heading: "How to pick the right category for your problem",
    body: [
      "Start from what you have, not from what you wish you had. If your kitchen sink has hard water spots and you have a bottle of white vinegar, head to Vinegar Hacks instead of buying a specialty descaler. If you have a greasy stovetop and a bottle of Dawn, head to Dawn Hacks before adding another bottle to your cleaning shelf. The categories are organized this way on purpose so you can solve a problem with what is already in the house.",
      "If the problem is bigger than a single ingredient can handle, use the method categories. Deep Clean for whole room resets, Bathroom Cleaning for any tile, grout, fixture, or fixture adjacent issue, and Laundry and Kitchen for the everyday routines that prevent buildup from getting worse. The method categories combine multiple ingredients in tested sequences, which is the difference between a hack that works once and a routine that you can rely on week after week.",
      "If you are not sure where to start, the FAQ page lists the questions readers ask the most and links directly to the guides that answer them. The full library is searchable by keyword on the All Cleaning Hacks page if you have a specific problem in mind.",
    ],
  },
];

export default function CategoriesPage() {
  const totalGuides = posts.length;
  const totalCategories = categories.length;

  return (
    <Container>
      <section className="py-12">
        {/* Page header */}
        <div className="mb-10">
          <h1
            className="text-3xl font-bold tracking-tight sm:text-4xl"
            style={{ color: "var(--text)" }}
          >
            Browse Cleaning Categories
          </h1>
          <p
            className="mt-3 max-w-3xl text-base leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            {totalGuides}+ tested guides organized into {totalCategories} categories. Each category groups
            cleaning methods by the active ingredient or by the room and routine they are designed for, so
            you can find a safe, surface specific solution in a few seconds rather than reading through
            every article on the site.
          </p>
        </div>

        {/* Category grid (existing) */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>

        {/* Editorial body */}
        <div className="mt-14 space-y-8">
          {editorialSections.map((section) => (
            <article
              key={section.id}
              id={section.id}
              className="rounded-xl p-6 sm:p-8"
              style={{
                background: "var(--card-bg)",
                border: "1px solid var(--border)",
              }}
            >
              <h2
                className="text-xl font-semibold tracking-tight sm:text-2xl"
                style={{ color: "var(--text)" }}
              >
                {section.heading}
              </h2>
              <div
                className="mt-4 space-y-4 text-[15px] leading-7"
                style={{ color: "var(--text-secondary)" }}
              >
                {section.body.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </article>
          ))}
        </div>

        {/* Editorial standards note */}
        <div
          className="mt-10 rounded-xl p-6 sm:p-8"
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
          }}
        >
          <h2
            className="text-lg font-semibold tracking-tight"
            style={{ color: "var(--text)" }}
          >
            How every category is researched
          </h2>
          <p
            className="mt-3 text-[15px] leading-7"
            style={{ color: "var(--text-secondary)" }}
          >
            Every guide in every category goes through the same review pipeline. Each method
            is researched against established cleaning chemistry, drafted, and reviewed for
            accuracy and surface safety before publication. If a reader reports an edge case
            we missed, the guide is updated. Read the full breakdown on our{" "}
            <a
              href="/editorial-policy"
              className="underline"
              style={{ color: "var(--accent)" }}
            >
              Editorial Policy
            </a>{" "}
            page or learn more on our{" "}
            <a href="/about" className="underline" style={{ color: "var(--accent)" }}>
              About
            </a>{" "}
            page.
          </p>
        </div>
      </section>
    </Container>
  );
}

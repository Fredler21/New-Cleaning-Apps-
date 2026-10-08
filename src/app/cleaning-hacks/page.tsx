import type { Metadata } from "next";
import { Clock, FlaskConical, House, Leaf, ListChecks, Wallet, type LucideIcon } from "lucide-react";
import { buildMeta } from "@/components/seo/Meta";
import { Container } from "@/components/layout/Container";
import { PostCard, toCardData } from "@/components/posts/PostCard";
import { PostLibrary, type PostLibraryItem } from "@/components/posts/PostLibrary";
import { posts } from "@/data/posts";
import { populatedCategories } from "@/lib/categories";

export const metadata: Metadata = buildMeta({
  title: `Browse All ${posts.length} Cleaning Hacks, Filter by Room & Ingredient`,
  description:
    `Search and filter our full library of ${posts.length} practical cleaning hacks. Sort by room (kitchen, bathroom, laundry), ingredient (vinegar, baking soda, Dawn), or effort level. Every hack includes step-by-step instructions, ingredient lists, and safety notes.`,
  path: "/cleaning-hacks",
  ogType: "website",
  keywords: [
    "all cleaning hacks", "cleaning hack library", "search cleaning hacks",
    "filter cleaning tips by room", "cleaning guide directory",
    "kitchen cleaning hacks", "bathroom cleaning tips", "vinegar cleaning guide",
    "baking soda cleaning hacks", "dawn dish soap hacks",
  ],
});

const FILTER_TAGS = ["quick wins", "deep clean", "budget", "odor control", "bathroom", "kitchen"];

const WHY_IT_WORKS: { Icon: LucideIcon; title: string; desc: string }[] = [
  { Icon: FlaskConical, title: "Researched & Reviewed", desc: "Every hack is checked against cleaning chemistry and manufacturer guidance, then reviewed by a person. We document the ingredients, timing, and technique so you can follow it exactly." },
  { Icon: Wallet, title: "Budget-Friendly", desc: "Most hacks use ingredients you already own, like vinegar, baking soda, dish soap, and lemon. No expensive specialty products required." },
  { Icon: Leaf, title: "Eco-Conscious", desc: "We prioritize natural, non-toxic solutions that are safe for kids, pets, and the environment. Harsh chemicals are always a last resort." },
  { Icon: Clock, title: "Time-Saving", desc: "Tagged by effort level so you can find quick five-minute fixes or thorough weekend deep-clean routines at a glance." },
  { Icon: House, title: "Every Room Covered", desc: "Kitchen, bathroom, bedroom, garage, outdoor spaces, we cover every room and surface type including granite, stainless steel, tile, grout, fabric, and wood." },
  { Icon: ListChecks, title: "Easy to Follow", desc: "Step-by-step instructions with clear ingredient lists, safety notes, and pro tips. No guesswork, no vague advice, just results." },
];

/**
 * Static page. It used to read searchParams on the server, which made every
 * request render on demand (never cached) and shipped the full body of all
 * 85 articles to the browser. Filtering now happens in PostLibrary on the
 * client, over cards that are still rendered here on the server.
 */
export default function PostsPage() {
  const items: PostLibraryItem[] = posts.map((post) => ({
    slug: post.slug,
    category: post.category,
    tags: post.tags,
    text: `${post.title} ${post.excerpt} ${post.tags.join(" ")}`.toLowerCase(),
  }));
  const categoryOptions = populatedCategories().map((category) => ({ slug: category.slug, name: category.name }));

  /* CollectionPage + BreadcrumbList JSON-LD */
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": "https://www.trycleaninghacks.com/cleaning-hacks",
        url: "https://www.trycleaninghacks.com/cleaning-hacks",
        name: `Browse All ${posts.length} Cleaning Hacks, Filter by Room, Ingredient & Technique`,
        description:
          `Search and filter our full library of ${posts.length} practical cleaning hacks. Sort by room, ingredient, or effort level.`,
        isPartOf: { "@id": "https://www.trycleaninghacks.com" },
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: posts.length,
          itemListElement: posts.map((p, i) => ({
            "@type": "ListItem",
            position: i + 1,
            url: `https://www.trycleaninghacks.com/cleaning-hacks/${p.slug}`,
            name: p.title,
          })),
        },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://www.trycleaninghacks.com" },
          { "@type": "ListItem", position: 2, name: "All Cleaning Hacks", item: "https://www.trycleaninghacks.com/cleaning-hacks" },
        ],
      },
    ],
  };

  return (
    <Container>
      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="py-12">
        {/* Breadcrumb nav */}
        <nav aria-label="Breadcrumb" className="mb-6 text-sm" style={{ color: "var(--text-secondary)" }}>
          <ol className="flex items-center gap-1.5">
            <li><a href="/" className="hover:underline" style={{ color: "var(--accent)" }}>Home</a></li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="font-medium" style={{ color: "var(--text)" }}>All Cleaning Hacks</li>
          </ol>
        </nav>

        {/* SEO-rich page header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl" style={{ color: "var(--text)" }}>Browse All Cleaning Hacks</h1>
          <p className="mt-3 text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            Browse the complete library of cleaning guides, from kitchen grease busters and bathroom mildew removers to laundry stain solutions and whole-home deep cleans. Every guide is researched against cleaning chemistry and manufacturer guidance, then reviewed by a person before it goes live, so you get clear steps and honest limits with everyday ingredients like vinegar, baking soda, Dawn dish soap, and hydrogen peroxide.
          </p>
          <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            Use the filters below to narrow results by category, tag, or keyword. Whether you need a quick five-minute fix for a coffee stain or a full weekend deep-clean routine, you&apos;ll find a step-by-step hack that works. New hacks are added weekly, bookmark this page and never run out of cleaning inspiration.
          </p>
        </div>

        {/* Client-side filters over server-rendered cards */}
        <PostLibrary items={items} categories={categoryOptions} tags={FILTER_TAGS}>
          {posts.map((post) => (
            <PostCard key={post.slug} post={toCardData(post)} />
          ))}
        </PostLibrary>

        {/* Mobile nav bar */}
        <div className="fixed bottom-0 left-0 right-0 z-30 border-t p-3 backdrop-blur-xl md:hidden" style={{ background: "var(--nav-bg)", borderColor: "var(--nav-border)" }}>
          <div className="mx-auto flex max-w-md gap-3">
            <a href="/cleaning-hacks" className="flex-1 rounded-xl bg-gradient-to-r from-teal-700 to-emerald-700 px-4 py-3 text-center text-sm font-semibold text-white shadow-sm">Browse</a>
            <a href="#category-select" className="flex-1 rounded-xl px-4 py-3 text-center text-sm font-medium" style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text)" }}>Filter</a>
          </div>
        </div>

        {/* SEO content below the grid */}
        <div className="mt-16 rounded-xl p-6 sm:p-8" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
          <h2 className="mb-4 text-xl font-semibold tracking-tight" style={{ color: "var(--text)" }}>
            Why Our Cleaning Hacks Work
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {WHY_IT_WORKS.map(({ Icon, title, desc }) => (
              <div key={title} className="flex gap-3">
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                  style={{ background: "var(--accent-light)", color: "var(--accent)" }}
                >
                  <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} aria-hidden="true" />
                </span>
                <div>
                  <h3 className="mb-1 text-sm font-semibold" style={{ color: "var(--text)" }}>{title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Popular categories description */}
        <div className="mt-10 rounded-xl p-6 sm:p-8" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
          <h2 className="mb-4 text-xl font-semibold tracking-tight" style={{ color: "var(--text)" }}>
            Popular Cleaning Categories
          </h2>
          <p className="mb-4 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            Not sure where to start? Here are some of our most popular categories to explore:
          </p>
          <ul className="grid gap-3 text-sm sm:grid-cols-2" style={{ color: "var(--text-secondary)" }}>
            <li><strong style={{ color: "var(--text)" }}>Vinegar Hacks</strong>, descale appliances, remove hard water stains, deodorize drains, and clean glass streak-free using white distilled vinegar.</li>
            <li><strong style={{ color: "var(--text)" }}>Baking Soda Hacks</strong>, scrub grout, freshen carpets, neutralize fridge odors, and polish stainless steel naturally.</li>
            <li><strong style={{ color: "var(--text)" }}>Dawn Dish Soap Hacks</strong>, cut through grease on stovetops, clean bathtubs effortlessly, and make DIY all-purpose sprays.</li>
            <li><strong style={{ color: "var(--text)" }}>Deep Clean Guides</strong>, room-by-room checklists for spring cleaning, move-out prep, and seasonal refreshes.</li>
            <li><strong style={{ color: "var(--text)" }}>Laundry &amp; Kitchen</strong>, remove tough stains from clothing, whites brightening tricks, oven cleaning, and microwave steam hacks.</li>
            <li><strong style={{ color: "var(--text)" }}>Dollar Store Finds</strong>, budget cleaning tools and products that deliver premium results for under a dollar.</li>
          </ul>
        </div>
      </section>
    </Container>
  );
}

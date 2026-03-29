import { Container } from "@/components/layout/Container";
import { PostGrid } from "@/components/posts/PostGrid";
import { PostFiltersClient } from "@/components/posts/PostFiltersClient";
import { posts } from "@/data/posts";
import { filterPosts } from "@/lib/search";

type Props = {
  searchParams: { category?: string; tag?: string; q?: string };
};

export default function PostsPage({ searchParams }: Props) {
  const category = searchParams.category ?? "all";
  const tag = searchParams.tag ?? "all";
  const searchTerm = searchParams.q ?? "";

  const filtered = filterPosts(posts, { searchTerm, category, tag });

  /* CollectionPage + BreadcrumbList JSON-LD */
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": "https://www.trycleaninghacks.com/cleaning-hacks",
        url: "https://www.trycleaninghacks.com/cleaning-hacks",
        name: "Browse All 40+ Cleaning Hacks — Filter by Room, Ingredient & Technique",
        description:
          "Search and filter our full library of 40+ tried-and-tested cleaning hacks. Sort by room, ingredient, or effort level.",
        isPartOf: { "@id": "https://www.trycleaninghacks.com" },
        mainEntity: {
          "@type": "ItemList",
          numberOfItems: posts.length,
          itemListElement: posts.slice(0, 20).map((p, i) => ({
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
            Browse our complete library of tested cleaning hacks, from kitchen grease busters and bathroom mildew removers to laundry stain solutions and whole-home deep cleans. Every guide is verified by our editorial team using real-world testing, so you get professional-grade results with everyday ingredients like vinegar, baking soda, Dawn dish soap, and hydrogen peroxide.
          </p>
          <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            Use the filters below to narrow results by category, tag, or keyword. Whether you need a quick five-minute fix for a coffee stain or a full weekend deep-clean routine, you&apos;ll find a step-by-step hack that works. New hacks are added weekly, bookmark this page and never run out of cleaning inspiration.
          </p>
        </div>

        {/* Interactive filters (client) + server-rendered post grid */}
        <PostFiltersClient
          category={category}
          tag={tag}
          searchTerm={searchTerm}
          resultCount={filtered.length}
        />
        <PostGrid posts={filtered} />

        {/* Mobile nav bar */}
        <div className="fixed bottom-0 left-0 right-0 z-30 border-t p-3 backdrop-blur-xl md:hidden" style={{ background: "var(--nav-bg)", borderColor: "var(--nav-border)" }}>
          <div className="mx-auto flex max-w-md gap-3">
            <a href="/cleaning-hacks" className="flex-1 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 px-4 py-3 text-center text-sm font-semibold text-white shadow-sm">Browse</a>
            <a href="#category-select" className="flex-1 rounded-xl px-4 py-3 text-center text-sm font-medium" style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text)" }}>Filter</a>
          </div>
        </div>

        {/* SEO content below the grid */}
        <div className="mt-16 rounded-xl p-6 sm:p-8" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
          <h2 className="text-xl font-semibold tracking-tight mb-4" style={{ color: "var(--text)" }}>
            Why Our Cleaning Hacks Work
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: "🧪", title: "Tested & Verified", desc: "Every hack is tested on real surfaces before publishing. We document the ingredients, timing, and technique so you can replicate results exactly." },
              { icon: "💰", title: "Budget-Friendly", desc: "Most hacks use ingredients you already own, like vinegar, baking soda, dish soap, and lemon. No expensive specialty products required." },
              { icon: "🌿", title: "Eco-Conscious", desc: "We prioritize natural, non-toxic solutions that are safe for kids, pets, and the environment. Harsh chemicals are always a last resort." },
              { icon: "⏱️", title: "Time-Saving", desc: "Tagged by effort level so you can find quick five-minute fixes or thorough weekend deep-clean routines at a glance." },
              { icon: "🏠", title: "Every Room Covered", desc: "Kitchen, bathroom, bedroom, garage, outdoor spaces, we cover every room and surface type including granite, stainless steel, tile, grout, fabric, and wood." },
              { icon: "📱", title: "Easy to Follow", desc: "Step-by-step instructions with clear ingredient lists, safety notes, and pro tips. No guesswork, no vague advice, just results." },
            ].map((item) => (
              <div key={item.title} className="flex gap-3">
                <span className="text-2xl flex-shrink-0">{item.icon}</span>
                <div>
                  <h3 className="font-semibold text-sm mb-1" style={{ color: "var(--text)" }}>{item.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Popular categories description */}
        <div className="mt-10 rounded-xl p-6 sm:p-8" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
          <h2 className="text-xl font-semibold tracking-tight mb-4" style={{ color: "var(--text)" }}>
            Popular Cleaning Categories
          </h2>
          <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--text-secondary)" }}>
            Not sure where to start? Here are some of our most popular categories to explore:
          </p>
          <ul className="grid gap-3 sm:grid-cols-2 text-sm" style={{ color: "var(--text-secondary)" }}>
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

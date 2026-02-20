import { HeroSlider } from "@/components/hero/HeroSlider";
import { Container } from "@/components/layout/Container";
import { categories } from "@/data/categories";
import { featuredPosts, heroPosts, quickWinPosts } from "@/data/featured";
import { TrendingCarousel } from "@/components/posts/TrendingCarousel";
import { PostCard } from "@/components/posts/PostCard";
import Link from "next/link";

const categoryImages: Record<string, string> = {
  "dawn-hacks": "/graphics/icons/cat-dawn.png",
  "vinegar-hacks": "/graphics/icons/cat-vinegar.png",
  "baking-soda": "/graphics/icons/cat-baking-soda.png",
  "listerine-hacks": "/graphics/icons/cat-listerine.png",
  "peroxide-hacks": "/graphics/icons/cat-peroxide.png",
  "deep-clean": "/graphics/icons/cat-deep-clean.png",
  "dollar-store": "/graphics/icons/cat-dollar-store.png",
  "laundry-kitchen": "/graphics/icons/cat-laundry.png"
};

const categoryEmoji: Record<string, string> = {
  "dawn-hacks": "🫧",
  "vinegar-hacks": "🧪",
  "baking-soda": "🧂",
  "listerine-hacks": "🌿",
  "peroxide-hacks": "💧",
  "deep-clean": "🏠",
  "dollar-store": "💲",
  "laundry-kitchen": "👕"
};

export default function HomePage() {
  return (
    <>
      {/* Hero Slider */}
      <Container>
        <div className="pt-6 pb-2">
          <HeroSlider posts={heroPosts} />
        </div>
      </Container>

      {/* Search + Filter Pills */}
      <Container>
        <section className="py-6">
          <div className="rounded-2xl p-4 sm:p-6" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="relative flex-1">
                <svg className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2" style={{ color: "var(--muted)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
                <input
                  type="search"
                  placeholder="Search by stain, room, or ingredient…"
                  className="w-full rounded-xl py-3 pl-10 pr-4 text-sm transition-colors duration-200 outline-none"
                  style={{ background: "var(--input-bg)", border: "1px solid var(--input-border)", color: "var(--text)" }}
                  aria-label="Search cleaning hacks"
                />
              </div>
              <Link
                href="/posts"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:shadow-md hover:brightness-105 active:scale-[0.98]"
              >
                Search Hacks
              </Link>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {["Kitchen", "Bathroom", "Vinegar", "Baking Soda", "2-min fixes", "Deep clean"].map((filter) => (
                <Link
                  key={filter}
                  href={`/posts?q=${filter.toLowerCase()}`}
                  className="rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-200"
                  style={{ background: "var(--badge-bg)", border: "1px solid var(--badge-border)", color: "var(--text-secondary)" }}
                >
                  {filter}
                </Link>
              ))}
            </div>
          </div>
        </section>
      </Container>

      {/* Browse by Category — horizontal scroll */}
      <Container>
        <section className="py-8">
          <div className="mb-6 flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl" style={{ color: "var(--text)" }}>
                Browse by Category
              </h2>
              <p className="mt-1 text-sm" style={{ color: "var(--text-secondary)" }}>Find the perfect hack for every room and surface.</p>
            </div>
            <Link href="/categories" className="hidden items-center gap-1 text-sm font-medium text-teal-600 transition-colors hover:text-teal-700 sm:flex">
              View all
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-1 px-1">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/categories?filter=${cat.slug}`}
                className="group relative flex-shrink-0 w-[180px] overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1"
                style={{ boxShadow: "var(--card-shadow)" }}
              >
                {/* Background — color fallback */}
                <div className="aspect-[4/5] w-full bg-gradient-to-br from-teal-100 to-emerald-50 dark:from-teal-900/40 dark:to-emerald-900/20 relative overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                    style={{ backgroundImage: `url(${categoryImages[cat.slug] || cat.icon})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <span className="text-lg mb-1 block">{categoryEmoji[cat.slug] || "✨"}</span>
                  <h3 className="text-sm font-semibold text-white">{cat.name}</h3>
                  <p className="text-xs text-white/70 line-clamp-1 mt-0.5">{cat.tags.length} topics</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </Container>

      {/* Featured This Week */}
      <Container>
        <section className="py-10">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <span
                className="mb-2 inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium"
                style={{ background: "var(--accent-light)", color: "var(--accent)", border: "1px solid var(--accent-surface)" }}
              >
                ★ Featured
              </span>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl" style={{ color: "var(--text)" }}>
                Featured This Week
              </h2>
              <p className="mt-2 text-sm" style={{ color: "var(--text-secondary)" }}>Hand-picked hacks our editors love right now.</p>
            </div>
            <Link href="/posts" className="hidden items-center gap-1 text-sm font-medium text-teal-600 transition-colors hover:text-teal-700 sm:flex">
              View all
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featuredPosts.slice(0, 3).map((post, i) => (
              <PostCard key={post.slug} post={post} featured={i === 0} />
            ))}
          </div>
        </section>
      </Container>

      {/* Trending Now */}
      <Container>
        <section className="py-10">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="flex items-center gap-2 text-2xl font-semibold tracking-tight sm:text-3xl" style={{ color: "var(--text)" }}>
                Trending Now
                <span className="text-2xl">🔥</span>
              </h2>
              <p className="mt-2 text-sm" style={{ color: "var(--text-secondary)" }}>Most popular hacks this week.</p>
            </div>
            <Link href="/posts" className="hidden items-center gap-1 text-sm font-medium text-teal-600 transition-colors hover:text-teal-700 sm:flex">
              See all
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
          <TrendingCarousel posts={featuredPosts} />
        </section>
      </Container>

      {/* Quick Wins */}
      <Container>
        <section className="py-10">
          <div className="mb-8">
            <h2 className="flex items-center gap-2 text-2xl font-semibold tracking-tight sm:text-3xl" style={{ color: "var(--text)" }}>
              <span className="flex h-8 w-8 items-center justify-center rounded-lg text-base" style={{ background: "var(--accent-light)" }}>⚡</span>
              Quick Wins
            </h2>
            <p className="mt-2 text-sm" style={{ color: "var(--text-secondary)" }}>2–5 minute hacks for instant results.</p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {quickWinPosts.map((post) => (
              <Link key={post.slug} href={`/posts/${post.slug}`}>
                <article
                  className="group rounded-card p-5 transition-all duration-300 hover:-translate-y-0.5"
                  style={{ background: "var(--card-bg)", border: "1px solid var(--border)", boxShadow: "var(--card-shadow)" }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div
                        className="mb-2 inline-flex items-center gap-1 rounded-lg px-2 py-0.5 text-xs font-medium"
                        style={{ background: "var(--accent-light)", color: "var(--accent)" }}
                      >
                        ⏱ {post.readTime}
                      </div>
                      <h3 className="text-[15px] font-semibold transition-colors group-hover:text-teal-600" style={{ color: "var(--text)" }}>
                        {post.title}
                      </h3>
                      <p className="mt-1.5 line-clamp-2 text-sm" style={{ color: "var(--text-secondary)" }}>{post.excerpt}</p>
                    </div>
                    <svg className="mt-1 h-5 w-5 shrink-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-teal-600" style={{ color: "var(--muted)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </section>
      </Container>

      {/* Newsletter */}
      <Container>
        <section className="my-16 overflow-hidden rounded-2xl" style={{ background: "var(--accent-light)", border: "1px solid var(--accent-surface)" }}>
          <div className="px-6 py-12 sm:px-10 sm:py-14">
            <div className="mx-auto max-w-xl text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl" style={{ background: "var(--accent-surface)" }}>
                <svg className="h-6 w-6 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl" style={{ color: "var(--text)" }}>Get Premium Cleaning Briefs</h2>
              <p className="mt-3 text-sm" style={{ color: "var(--text-secondary)" }}>Weekly high-impact hacks, curated for a spotless home. No spam, unsubscribe anytime.</p>
              <form className="mt-6 flex flex-col gap-3 sm:flex-row" aria-label="Email capture form">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 rounded-xl py-3 px-4 text-sm outline-none transition-colors"
                  style={{ background: "var(--input-bg)", border: "1px solid var(--input-border)", color: "var(--text)" }}
                  aria-label="Email address"
                  required
                />
                <button
                  type="submit"
                  className="shrink-0 sm:min-w-[140px] rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:shadow-md hover:brightness-105 active:scale-[0.98]"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </section>
      </Container>
    </>
  );
}

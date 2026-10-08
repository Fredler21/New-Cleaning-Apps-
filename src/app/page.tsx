import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, Flame, Star, Zap } from "lucide-react";
import { HeroSlider } from "@/components/hero/HeroSlider";
import { HeroSearch } from "@/components/hero/HeroSearch";
import { Container } from "@/components/layout/Container";
import { posts } from "@/data/posts";
import { featuredThisWeek, trendingPosts, heroPosts, quickWinPosts } from "@/data/featured";
import { TrendingCarousel } from "@/components/posts/TrendingCarousel";
import { PostCard, toCardData } from "@/components/posts/PostCard";
import { NewsletterForm } from "@/components/newsletter/NewsletterForm";
import { AllGuidesIndex } from "@/components/posts/AllGuidesIndex";
import { Reveal } from "@/components/ui/Reveal";
import { CategoryIcon } from "@/components/ui/CategoryIcon";
import { categoryGradient } from "@/lib/category-color";
import { populatedCategories } from "@/lib/categories";

const HOME_TITLE = "TryCleaningHacks | Practical Cleaning Hacks for Every Home";

export const metadata: Metadata = {
  title: HOME_TITLE,
  description:
    `Discover ${posts.length} practical cleaning hacks using everyday ingredients. Clear steps for kitchen, bathroom, laundry, and whole-home deep cleans, no guesswork, no gimmicks.`,
  alternates: { canonical: "https://www.trycleaninghacks.com" },
  keywords: [
    "cleaning hacks", "house cleaning tips", "kitchen cleaning hacks",
    "bathroom cleaning tips", "vinegar cleaning", "baking soda hacks",
    "laundry hacks", "deep clean tips", "natural cleaning", "DIY cleaning",
  ],
  openGraph: {
    title: HOME_TITLE,
    description:
      `Discover ${posts.length} practical cleaning hacks using everyday ingredients. Clear steps for kitchen, bathroom, laundry, and whole-home deep cleans.`,
    url: "https://www.trycleaninghacks.com",
    siteName: "TryCleaningHacks",
    images: [{ url: "/og/og-home.png", width: 1200, height: 630, alt: "TryCleaningHacks" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: HOME_TITLE,
    description:
      "Discover practical cleaning hacks using everyday ingredients. Clear steps you can follow in minutes.",
    images: ["/og/og-home.png"],
  },
};

const categoryImages: Record<string, string> = {
  "dawn-hacks": "/graphics/icons/cat-dawn.jpg",
  "vinegar-hacks": "/graphics/icons/cat-vinegar.jpg",
  "baking-soda": "/graphics/icons/cat-baking-soda.jpg",
  "listerine-hacks": "/graphics/icons/cat-listerine.jpg",
  "peroxide-hacks": "/graphics/icons/cat-peroxide.jpg",
  "deep-clean": "/graphics/icons/cat-deep-clean.jpg",
  "dollar-store": "/graphics/icons/cat-dollar-store.jpg",
  "laundry-kitchen": "/graphics/icons/cat-laundry.jpg",
  "wd40-hacks": "/graphics/icons/cat-wd40.jpg",
  "pest-control": "/graphics/icons/cat-pest-control.jpg",
  "home-fragrance": "/graphics/icons/cat-home-fragrance.jpg",
  "bathroom-cleaning": "/graphics/icons/cat-bathroom-cleaning.jpg",
  "paint-colors": "/graphics/icons/paint-colors.jpg",
  "diy-cleaners": "/graphics/icons/diy-cleaners.jpg",
};

const quickFilters = ["Kitchen", "Bathroom", "Vinegar", "Baking Soda", "Laundry", "Deep clean"];

const viewAllLink =
  "hidden items-center gap-1 text-sm font-medium text-teal-700 transition-colors hover:text-teal-800 dark:text-teal-400 dark:hover:text-teal-300 sm:flex";

export default function HomePage() {
  // Best-stocked categories first, and nothing with zero articles, so a
  // visitor never lands on an empty category from the homepage.
  const categoryTiles = populatedCategories().sort((a, b) => b.count - a.count);

  return (
    <>
      {/* Hero: headline and search. The carousel below is a featured section,
          not a second hero competing with the headline. */}
      <Container>
        <section className="pb-2 pt-8 text-center sm:pt-12" aria-labelledby="home-heading">
          <h1 id="home-heading" className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl" style={{ color: "var(--text)" }}>
            Practical Cleaning Hacks for Every Home
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-base sm:text-lg" style={{ color: "var(--text-secondary)" }}>
            Real methods. Everyday ingredients. Professional results, no guesswork.
          </p>
          <div className="mx-auto mt-6 max-w-3xl rounded-2xl p-4 sm:p-5" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
            <HeroSearch />
            <div className="mt-3 flex flex-wrap justify-center gap-2">
              {quickFilters.map((filter) => (
                <Link
                  key={filter}
                  href={`/cleaning-hacks?q=${encodeURIComponent(filter.toLowerCase())}`}
                  prefetch={false}
                  className="rounded-lg px-3 py-1.5 text-xs font-medium text-th-text-secondary transition-colors duration-200 hover:text-teal-700 dark:hover:text-teal-400"
                  style={{ background: "var(--badge-bg)", border: "1px solid var(--badge-border)" }}
                >
                  {filter}
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="pb-2 pt-6" aria-label="Featured guides">
          <HeroSlider slides={heroPosts.map(toCardData)} />
        </section>
      </Container>

      {/* Browse by Category, horizontal scroll */}
      <Container>
        <section className="py-8">
          <div className="mb-6 flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl" style={{ color: "var(--text)" }}>
                Browse by Category
              </h2>
              <p className="mt-1 text-sm" style={{ color: "var(--text-secondary)" }}>Find the perfect hack for every room and surface.</p>
            </div>
            <Link href="/categories" className={viewAllLink}>
              View all
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="hide-scrollbar -mx-1 flex gap-4 overflow-x-auto px-1 pb-4">
            {categoryTiles.map((cat) => (
              <Link
                key={cat.id}
                href={`/categories/${cat.slug}`}
                prefetch={false}
                className="group relative w-[168px] flex-shrink-0 overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1.5"
                style={{ boxShadow: "var(--card-shadow)" }}
              >
                {/* Category-tinted gradient behind the photo */}
                <div className="relative aspect-[4/5] w-full overflow-hidden" style={{ background: categoryGradient(cat.slug) }}>
                  {categoryImages[cat.slug] && (
                    <Image
                      src={categoryImages[cat.slug]}
                      alt=""
                      fill
                      sizes="168px"
                      className="object-cover opacity-90 transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <span className="mb-2 flex h-9 w-9 items-center justify-center rounded-xl bg-white/20 text-white backdrop-blur-sm">
                    <CategoryIcon slug={cat.slug} className="h-[18px] w-[18px]" />
                  </span>
                  <h3 className="text-sm font-semibold text-white">{cat.name}</h3>
                  <p className="mt-0.5 line-clamp-1 text-xs text-white/85">{cat.count} {cat.count === 1 ? "hack" : "hacks"}</p>
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
                <Star className="h-3.5 w-3.5" aria-hidden="true" />
                Featured
              </span>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight sm:text-3xl" style={{ color: "var(--text)" }}>
                Featured This Week
              </h2>
              <p className="mt-2 text-sm" style={{ color: "var(--text-secondary)" }}>Hand-picked hacks our editors love right now.</p>
            </div>
            <Link href="/cleaning-hacks" className={viewAllLink}>
              View all
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <Reveal>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {featuredThisWeek.map((post) => (
                <PostCard key={post.slug} post={toCardData(post)} featured={true} />
              ))}
            </div>
          </Reveal>
        </section>
      </Container>

      {/* Trending Now */}
      <Container>
        <section className="py-10">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="flex items-center gap-2 text-2xl font-semibold tracking-tight sm:text-3xl" style={{ color: "var(--text)" }}>
                Trending Now
                <Flame className="h-6 w-6 text-orange-500" aria-hidden="true" />
              </h2>
              <p className="mt-2 text-sm" style={{ color: "var(--text-secondary)" }}>Most popular hacks this week.</p>
            </div>
            <Link href="/cleaning-hacks" className={viewAllLink}>
              See all
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <Reveal>
            <TrendingCarousel posts={trendingPosts} />
          </Reveal>
        </section>
      </Container>

      {/* Quick Wins */}
      <Container>
        <section className="py-10">
          <div className="mb-8">
            <h2 className="flex items-center gap-2 text-2xl font-semibold tracking-tight sm:text-3xl" style={{ color: "var(--text)" }}>
              <span className="flex h-8 w-8 items-center justify-center rounded-lg" style={{ background: "var(--accent-light)", color: "var(--accent)" }}>
                <Zap className="h-4 w-4" aria-hidden="true" />
              </span>
              Quick Wins
            </h2>
            <p className="mt-2 text-sm" style={{ color: "var(--text-secondary)" }}>Shorter guides with a fast payoff.</p>
          </div>
          <Reveal>
          <div className="grid gap-4 sm:grid-cols-2">
            {quickWinPosts.map((post) => (
              <Link key={post.slug} href={`/cleaning-hacks/${post.slug}`}>
                <article
                  className="group h-full rounded-card p-5 transition-all duration-300 hover:-translate-y-0.5"
                  style={{ background: "var(--card-bg)", border: "1px solid var(--border)", boxShadow: "var(--card-shadow)" }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div
                        className="mb-2 inline-flex items-center gap-1 rounded-lg px-2 py-0.5 text-xs font-medium"
                        style={{ background: "var(--accent-light)", color: "var(--accent)" }}
                      >
                        <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                        {post.readTime}
                      </div>
                      <h3 className="text-[15px] font-semibold transition-colors group-hover:text-teal-700 dark:group-hover:text-teal-400" style={{ color: "var(--text)" }}>
                        {post.title}
                      </h3>
                      <p className="mt-1.5 line-clamp-2 text-sm" style={{ color: "var(--text-secondary)" }}>{post.excerpt}</p>
                    </div>
                    <ArrowRight
                      className="mt-1 h-5 w-5 shrink-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-teal-700 dark:group-hover:text-teal-400"
                      style={{ color: "var(--muted)" }}
                      aria-hidden="true"
                    />
                  </div>
                </article>
              </Link>
            ))}
          </div>
          </Reveal>
        </section>
      </Container>

      {/* Complete guide index, collapsed. Gives every article a link from the
          homepage so deeper posts are not reachable only via the sitemap. */}
      <Container>
        <AllGuidesIndex />
      </Container>

      {/* Newsletter */}
      <Container>
        <Reveal>
        <section className="my-16 overflow-hidden rounded-2xl" style={{ background: "var(--accent-light)", border: "1px solid var(--accent-surface)" }}>
          <div className="px-6 py-12 sm:px-10 sm:py-14">
            <div className="mx-auto max-w-xl text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl" style={{ background: "var(--accent-surface)", color: "var(--accent)" }}>
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              </div>
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl" style={{ color: "var(--text)" }}>Get Premium Cleaning Briefs</h2>
              <p className="mt-3 text-sm" style={{ color: "var(--text-secondary)" }}>Weekly high-impact hacks, curated for a spotless home. No spam, unsubscribe anytime.</p>
              <NewsletterForm />
            </div>
          </div>
        </section>
        </Reveal>
      </Container>
    </>
  );
}

"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { PostGrid } from "@/components/posts/PostGrid";
import { Input } from "@/components/ui/Input";
import { categories } from "@/data/categories";
import { posts } from "@/data/posts";
import { filterPosts } from "@/lib/search";

const tags = ["all", "quick wins", "deep clean", "budget", "odor control", "bathroom", "kitchen"];

function PostsPageContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");
  const [tag, setTag] = useState("all");

  useEffect(() => {
    const categoryParam = searchParams.get("category") ?? "all";
    const tagParam = searchParams.get("tag") ?? "all";
    const queryParam = searchParams.get("q") ?? "";

    setCategory(categoryParam);
    setTag(tagParam);
    setSearchTerm(queryParam);
  }, [searchParams]);

  useEffect(() => {
    const params = new URLSearchParams();
    if (category !== "all") {
      params.set("category", category);
    }
    if (tag !== "all") {
      params.set("tag", tag);
    }
    if (searchTerm.trim()) {
      params.set("q", searchTerm.trim());
    }
    const nextUrl = params.toString() ? `${pathname}?${params.toString()}` : pathname;
    router.replace(nextUrl);
  }, [category, tag, searchTerm, pathname, router]);

  const filtered = useMemo(() => filterPosts(posts, { searchTerm, category, tag }), [searchTerm, category, tag]);

  return (
    <>
        {/* Filters */}
        <div className="mb-8 rounded-xl p-5" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="relative">
              <svg className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2" style={{ color: "var(--muted)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
              </svg>
              <Input
                type="search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search by stain, room, or ingredient…"
                className="pl-10"
                aria-label="Search posts"
              />
            </div>
            <label className="sr-only" htmlFor="category-select">Filter category</label>
            <select
              id="category-select"
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="rounded-xl px-4 py-3 text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
              style={{ background: "var(--select-bg)", border: "1px solid var(--input-border)", color: "var(--text)" }}
            >
              <option value="all">All categories</option>
              {categories.map((item) => (
                <option key={item.id} value={item.slug}>{item.name}</option>
              ))}
            </select>
            <label className="sr-only" htmlFor="tag-select">Filter tag</label>
            <select
              id="tag-select"
              value={tag}
              onChange={(event) => setTag(event.target.value)}
              className="rounded-xl px-4 py-3 text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
              style={{ background: "var(--select-bg)", border: "1px solid var(--input-border)", color: "var(--text)" }}
            >
              {tags.map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
          </div>

          {/* Active filter count */}
          <div className="mt-3 flex items-center gap-2">
            <span className="text-xs" style={{ color: "var(--muted)" }}>
              {filtered.length} hack{filtered.length !== 1 ? "s" : ""} found
            </span>
            {(category !== "all" || tag !== "all" || searchTerm.trim()) && (
              <button
                onClick={() => { setCategory("all"); setTag("all"); setSearchTerm(""); }}
                className="rounded-lg px-2.5 py-1 text-xs font-medium transition-all"
                style={{ background: "var(--surface-hover)", border: "1px solid var(--border)", color: "var(--text-secondary)" }}
              >
                Clear filters
              </button>
            )}
          </div>
        </div>

        <PostGrid posts={filtered} />

      {/* Mobile nav bar */}
      <div className="fixed bottom-0 left-0 right-0 z-30 border-t p-3 backdrop-blur-xl md:hidden" style={{ background: "var(--nav-bg)", borderColor: "var(--nav-border)" }}>
        <div className="mx-auto flex max-w-md gap-3">
          <a href="/cleaning-hacks" className="flex-1 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 px-4 py-3 text-center text-sm font-semibold text-white shadow-sm">Browse</a>
          <a href="#category-select" className="flex-1 rounded-xl px-4 py-3 text-center text-sm font-medium" style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text)" }}>Filter</a>
        </div>
      </div>
    </>
  );
}

export default function PostsPage() {
  return (
    <Container>
      <section className="py-12">
        {/* SEO-rich page header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl" style={{ color: "var(--text)" }}>All Cleaning Hacks</h1>
          <p className="mt-3 text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            Browse our complete library of tested cleaning hacks — from kitchen grease busters and bathroom mildew removers to laundry stain solutions and whole-home deep cleans. Every guide is verified by our editorial team using real-world testing, so you get professional-grade results with everyday ingredients like vinegar, baking soda, Dawn dish soap, and hydrogen peroxide.
          </p>
          <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            Use the filters below to narrow results by category, tag, or keyword. Whether you need a quick five-minute fix for a coffee stain or a full weekend deep-clean routine, you&apos;ll find a step-by-step hack that works. New hacks are added weekly — bookmark this page and never run out of cleaning inspiration.
          </p>
        </div>

        {/* Client-side filters and grid */}
        <Suspense fallback={<div className="h-8 w-48 animate-pulse rounded-lg" style={{ background: "var(--surface)" }} />}>
          <PostsPageContent />
        </Suspense>

        {/* SEO content below the grid */}
        <div className="mt-16 rounded-xl p-6 sm:p-8" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
          <h2 className="text-xl font-semibold tracking-tight mb-4" style={{ color: "var(--text)" }}>
            Why Our Cleaning Hacks Work
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: "🧪", title: "Tested & Verified", desc: "Every hack is tested on real surfaces before publishing. We document the ingredients, timing, and technique so you can replicate results exactly." },
              { icon: "💰", title: "Budget-Friendly", desc: "Most hacks use ingredients you already own — vinegar, baking soda, dish soap, and lemon. No expensive specialty products required." },
              { icon: "🌿", title: "Eco-Conscious", desc: "We prioritize natural, non-toxic solutions that are safe for kids, pets, and the environment. Harsh chemicals are always a last resort." },
              { icon: "⏱️", title: "Time-Saving", desc: "Tagged by effort level so you can find quick five-minute fixes or thorough weekend deep-clean routines at a glance." },
              { icon: "🏠", title: "Every Room Covered", desc: "Kitchen, bathroom, bedroom, garage, outdoor spaces — we cover every room and surface type including granite, stainless steel, tile, grout, fabric, and wood." },
              { icon: "📱", title: "Easy to Follow", desc: "Step-by-step instructions with clear ingredient lists, safety notes, and pro tips. No guesswork, no vague advice — just results." },
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
            <li><strong style={{ color: "var(--text)" }}>Vinegar Hacks</strong> — Descale appliances, remove hard water stains, deodorize drains, and clean glass streak-free using white distilled vinegar.</li>
            <li><strong style={{ color: "var(--text)" }}>Baking Soda Hacks</strong> — Scrub grout, freshen carpets, neutralize fridge odors, and polish stainless steel naturally.</li>
            <li><strong style={{ color: "var(--text)" }}>Dawn Dish Soap Hacks</strong> — Cut through grease on stovetops, clean bathtubs effortlessly, and make DIY all-purpose sprays.</li>
            <li><strong style={{ color: "var(--text)" }}>Deep Clean Guides</strong> — Room-by-room checklists for spring cleaning, move-out prep, and seasonal refreshes.</li>
            <li><strong style={{ color: "var(--text)" }}>Laundry &amp; Kitchen</strong> — Remove tough stains from clothing, whites brightening tricks, oven cleaning, and microwave steam hacks.</li>
            <li><strong style={{ color: "var(--text)" }}>Dollar Store Finds</strong> — Budget cleaning tools and products that deliver premium results for under a dollar.</li>
          </ul>
        </div>
      </section>
    </Container>
  );
}

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
    <Container>
      <section className="py-12">
        <h1 className="text-3xl font-semibold text-white sm:text-4xl">All posts</h1>
        <p className="mt-3 text-slate-300">Search and filter your cleaning hacks by category and vibe.</p>

        <div className="mt-6 grid gap-3 rounded-premium border border-white/10 bg-white/5 p-4 sm:grid-cols-3">
          <Input
            type="search"
            value={searchTerm}
            onChange={(event) => setSearchTerm(event.target.value)}
            placeholder="Search hacks"
            aria-label="Search posts"
          />
          <label className="sr-only" htmlFor="category-select">Filter category</label>
          <select
            id="category-select"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white focus:border-premium-teal focus:outline-none"
          >
            <option value="all" className="bg-premium-charcoal">All categories</option>
            {categories.map((item) => (
              <option key={item.id} value={item.slug} className="bg-premium-charcoal">{item.name}</option>
            ))}
          </select>
          <label className="sr-only" htmlFor="tag-select">Filter tag</label>
          <select
            id="tag-select"
            value={tag}
            onChange={(event) => setTag(event.target.value)}
            className="rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-sm text-white focus:border-premium-teal focus:outline-none"
          >
            {tags.map((item) => (
              <option key={item} value={item} className="bg-premium-charcoal">{item}</option>
            ))}
          </select>
        </div>

        <div className="mt-8">
          <PostGrid posts={filtered} />
        </div>
      </section>

      <div className="fixed bottom-0 left-0 right-0 z-30 border-t border-white/10 bg-premium-charcoal/95 p-3 md:hidden">
        <div className="mx-auto flex max-w-md gap-3">
          <a href="/posts" className="flex-1 rounded-full bg-premium-teal px-4 py-3 text-center text-sm font-medium text-white">Browse</a>
          <a href="#category-select" className="flex-1 rounded-full border border-white/20 bg-white/10 px-4 py-3 text-center text-sm font-medium text-white">Search</a>
        </div>
      </div>
    </Container>
  );
}

export default function PostsPage() {
  return (
    <Suspense fallback={<Container><section className="py-12 text-slate-300">Loading posts...</section></Container>}>
      <PostsPageContent />
    </Suspense>
  );
}

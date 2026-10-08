"use client";

import { Children, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/Input";

export type PostLibraryItem = {
  slug: string;
  category: string;
  tags: string[];
  /** Lower-cased title, excerpt and tags, what the search box matches on. */
  text: string;
};

type PostLibraryProps = {
  items: PostLibraryItem[];
  categories: { slug: string; name: string }[];
  tags: string[];
  /** One server-rendered card per item, in the same order as `items`. */
  children: ReactNode;
};

/**
 * Client-side filtering over server-rendered cards.
 *
 * The cards arrive as children, already rendered on the server, so every
 * article is in the static HTML for crawlers and the page can be cached at
 * the edge. Filtering only decides which of those children to show, and it
 * never asks the server for anything. The previous version re-rendered the
 * whole page on the server for each keystroke and could not be cached.
 */
export function PostLibrary({ items, categories, tags, children }: PostLibraryProps) {
  const cards = useMemo(() => Children.toArray(children), [children]);

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [tag, setTag] = useState("all");

  // Read the initial filters from the URL once on the client. Reading them
  // with useSearchParams would push this subtree to client rendering and drop
  // the cards from the static HTML.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setSearch(params.get("q") ?? "");
    setCategory(params.get("category") ?? "all");
    setTag(params.get("tag") ?? "all");
  }, []);

  // Mirror the filters into the URL so a filtered view can be shared.
  const firstRun = useRef(true);
  useEffect(() => {
    if (firstRun.current) {
      firstRun.current = false;
      return;
    }
    const params = new URLSearchParams();
    if (category !== "all") params.set("category", category);
    if (tag !== "all") params.set("tag", tag);
    if (search.trim()) params.set("q", search.trim());
    const query = params.toString();
    const next = query ? `${window.location.pathname}?${query}` : window.location.pathname;
    if (next !== `${window.location.pathname}${window.location.search}`) {
      window.history.replaceState(window.history.state, "", next);
    }
  }, [search, category, tag]);

  const visible = useMemo(() => {
    const term = search.trim().toLowerCase();
    return cards.filter((_, i) => {
      const item = items[i];
      if (!item) return false;
      const searchMatch = !term || item.text.includes(term);
      const categoryMatch = category === "all" || item.category === category;
      const tagMatch = tag === "all" || item.tags.includes(tag);
      return searchMatch && categoryMatch && tagMatch;
    });
  }, [cards, items, search, category, tag]);

  const hasActiveFilters = category !== "all" || tag !== "all" || search.trim() !== "";

  function clearFilters() {
    setSearch("");
    setCategory("all");
    setTag("all");
  }

  const selectClass =
    "rounded-xl px-4 py-3 text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20";
  const selectStyle = { background: "var(--select-bg)", border: "1px solid var(--input-border)", color: "var(--text)" };

  return (
    <>
      <div className="mb-8 rounded-xl p-5" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="relative">
            <Search
              className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2"
              style={{ color: "var(--muted)" }}
              aria-hidden="true"
            />
            <Input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by stain, room, or ingredient"
              className="pl-10"
              aria-label="Search posts"
            />
          </div>

          <label className="sr-only" htmlFor="category-select">Filter category</label>
          <select
            id="category-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={selectClass}
            style={selectStyle}
          >
            <option value="all">All categories</option>
            {categories.map((item) => (
              <option key={item.slug} value={item.slug}>{item.name}</option>
            ))}
          </select>

          <label className="sr-only" htmlFor="tag-select">Filter tag</label>
          <select
            id="tag-select"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            className={selectClass}
            style={selectStyle}
          >
            <option value="all">All tags</option>
            {tags.map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
        </div>

        <div className="mt-3 flex items-center gap-2" aria-live="polite">
          <span className="text-xs" style={{ color: "var(--muted)" }}>
            {visible.length} hack{visible.length !== 1 ? "s" : ""} found
          </span>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="rounded-lg px-2.5 py-1 text-xs font-medium transition-all"
              style={{ background: "var(--surface-hover)", border: "1px solid var(--border)", color: "var(--text-secondary)" }}
            >
              Clear filters
            </button>
          )}
        </div>
      </div>

      {visible.length > 0 ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{visible}</div>
      ) : (
        <div
          className="rounded-card p-12 text-center"
          style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
        >
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl" style={{ background: "var(--surface-hover)" }}>
            <Search className="h-6 w-6" style={{ color: "var(--muted)" }} aria-hidden="true" />
          </div>
          <p style={{ color: "var(--text-secondary)" }}>No hacks match your current filters.</p>
          <p className="mt-1 text-sm" style={{ color: "var(--muted)" }}>Try adjusting your search or browse all categories.</p>
        </div>
      )}
    </>
  );
}

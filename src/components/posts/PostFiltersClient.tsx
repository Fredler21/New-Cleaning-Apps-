"use client";

import { useRef, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Input } from "@/components/ui/Input";
import { categories } from "@/data/categories";

const tags = ["all", "quick wins", "deep clean", "budget", "odor control", "bathroom", "kitchen"];

type Props = {
  category: string;
  tag: string;
  searchTerm: string;
  resultCount: number;
};

export function PostFiltersClient({ category: initialCategory, tag: initialTag, searchTerm: initialSearch, resultCount }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const debounceRef = useRef<ReturnType<typeof setTimeout>>();

  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [category, setCategory] = useState(initialCategory);
  const [tag, setTag] = useState(initialTag);

  function updateUrl(search: string, cat: string, t: string) {
    const params = new URLSearchParams();
    if (cat !== "all") params.set("category", cat);
    if (t !== "all") params.set("tag", t);
    if (search.trim()) params.set("q", search.trim());
    const nextUrl = params.toString() ? `${pathname}?${params.toString()}` : pathname;
    router.replace(nextUrl, { scroll: false });
  }

  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setSearchTerm(value);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => updateUrl(value, category, tag), 300);
  }

  function handleCategoryChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value;
    setCategory(value);
    updateUrl(searchTerm, value, tag);
  }

  function handleTagChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value;
    setTag(value);
    updateUrl(searchTerm, category, value);
  }

  function clearFilters() {
    setCategory("all");
    setTag("all");
    setSearchTerm("");
    updateUrl("", "all", "all");
  }

  const hasActiveFilters = category !== "all" || tag !== "all" || searchTerm.trim() !== "";

  return (
    <div className="mb-8 rounded-xl p-5" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
      <div className="grid gap-3 sm:grid-cols-3">
        <div className="relative">
          <svg
            className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2"
            style={{ color: "var(--muted)" }}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <Input
            type="search"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search by stain, room, or ingredient…"
            className="pl-10"
            aria-label="Search posts"
          />
        </div>

        <label className="sr-only" htmlFor="category-select">Filter category</label>
        <select
          id="category-select"
          value={category}
          onChange={handleCategoryChange}
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
          onChange={handleTagChange}
          className="rounded-xl px-4 py-3 text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500/20"
          style={{ background: "var(--select-bg)", border: "1px solid var(--input-border)", color: "var(--text)" }}
        >
          {tags.map((item) => (
            <option key={item} value={item}>{item}</option>
          ))}
        </select>
      </div>

      <div className="mt-3 flex items-center gap-2">
        <span className="text-xs" style={{ color: "var(--muted)" }}>
          {resultCount} hack{resultCount !== 1 ? "s" : ""} found
        </span>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="rounded-lg px-2.5 py-1 text-xs font-medium transition-all"
            style={{ background: "var(--surface-hover)", border: "1px solid var(--border)", color: "var(--text-secondary)" }}
          >
            Clear filters
          </button>
        )}
      </div>
    </div>
  );
}

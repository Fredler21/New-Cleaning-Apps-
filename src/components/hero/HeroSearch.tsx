"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

export function HeroSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = query.trim();
    router.push(trimmed ? `/posts?q=${encodeURIComponent(trimmed)}` : "/posts");
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <div className="relative flex-1">
        <svg className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2" style={{ color: "var(--muted)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by stain, room, or ingredient…"
          className="w-full rounded-xl py-3 pl-10 pr-4 text-sm transition-colors duration-200 outline-none"
          style={{ background: "var(--input-bg)", border: "1px solid var(--input-border)", color: "var(--text)" }}
          aria-label="Search cleaning hacks"
        />
      </div>
      <button
        type="submit"
        className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:shadow-md hover:brightness-105 active:scale-[0.98]"
      >
        Search Hacks
      </button>
    </form>
  );
}

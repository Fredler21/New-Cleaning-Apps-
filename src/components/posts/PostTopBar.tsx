"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

export function PostTopBar() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/posts?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <div
      className="sticky top-0 z-30 border-b backdrop-blur-md"
      style={{ background: "var(--surface)/90", borderColor: "var(--border)" }}
    >
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3 sm:px-6">
        {/* Back button */}
        <button
          onClick={() => router.back()}
          className="inline-flex shrink-0 items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200 hover:opacity-80 active:scale-[0.97]"
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            color: "var(--text-secondary)",
          }}
        >
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M11 17l-5-5m0 0l5-5m-5 5h12"
            />
          </svg>
          <span className="hidden sm:inline">Back</span>
        </button>

        {/* Search bar */}
        <form onSubmit={handleSearch} className="relative flex-1">
          <svg
            className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search cleaning hacks..."
            className="w-full rounded-xl py-2.5 pl-10 pr-4 text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-teal-500/30"
            style={{
              background: "var(--input-bg)",
              border: "1px solid var(--input-border)",
              color: "var(--text)",
            }}
          />
        </form>
      </div>
    </div>
  );
}

"use client";

import { useMemo } from "react";

type ShareBarProps = {
  title: string;
  slug: string;
};

export function ShareBar({ title, slug }: ShareBarProps) {
  const encoded = encodeURIComponent(title);
  const url = useMemo(() => {
    if (typeof window === "undefined") {
      return `https://cleaninghax.example/posts/${slug}`;
    }
    return `${window.location.origin}/posts/${slug}`;
  }, [slug]);

  return (
    <div className="flex flex-wrap items-center gap-3 rounded-premium border border-white/10 bg-white/5 p-4">
      <span className="text-sm text-slate-300">Share:</span>
      <a
        className="rounded-full border border-white/20 px-3 py-1 text-xs text-white hover:bg-white/10"
        href={`https://twitter.com/intent/tweet?text=${encoded}&url=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noreferrer"
      >
        X
      </a>
      <a
        className="rounded-full border border-white/20 px-3 py-1 text-xs text-white hover:bg-white/10"
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noreferrer"
      >
        Facebook
      </a>
    </div>
  );
}

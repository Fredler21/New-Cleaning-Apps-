"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import type { Post } from "@/types/post";

type HeroSliderProps = {
  posts: Post[];
};

const slideImages = [
  "/graphics/posts/hero-slide-1.png",
  "/graphics/posts/hero-slide-2.png",
  "/graphics/posts/hero-slide-3.png",
  "/graphics/posts/hero-slide-4.png"
];

export function HeroSlider({ posts }: HeroSliderProps) {
  const slides = posts.slice(0, 4);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setActive((i) => (i + 1) % slides.length), [slides.length]);
  const prev = useCallback(() => setActive((i) => (i - 1 + slides.length) % slides.length), [slides.length]);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, 5500);
    return () => clearInterval(id);
  }, [paused, next]);

  return (
    <section
      className="relative w-full overflow-hidden rounded-slider shadow-slider"
      style={{ aspectRatio: "21/9", minHeight: 340, maxHeight: 520 }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Featured cleaning hacks"
    >
      {/* Slides */}
      {slides.map((post, i) => (
        <div
          key={post.slug}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${i === active ? "opacity-100 z-10" : "opacity-0 z-0"}`}
          role="group"
          aria-roledescription="slide"
          aria-label={`Slide ${i + 1} of ${slides.length}`}
          aria-hidden={i !== active}
        >
          {/* Background image */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${post.coverImage || slideImages[i % slideImages.length]})` }}
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

          {/* Content */}
          <div className="relative z-20 flex h-full flex-col justify-end p-8 md:p-12 lg:p-16 max-w-2xl">
            {/* Badges */}
            <div className="flex items-center gap-2 mb-3">
              <span className="inline-flex items-center rounded-full bg-teal-500 px-3 py-1 text-xs font-semibold text-white uppercase tracking-wide">
                Featured
              </span>
              <span className="inline-flex items-center rounded-full bg-white/20 backdrop-blur-sm px-3 py-1 text-xs font-medium text-white capitalize">
                {post.category.replace(/-/g, " ")}
              </span>
            </div>

            {/* Title */}
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-white leading-tight mb-2">
              {post.title}
            </h2>

            {/* Excerpt */}
            <p className="text-sm md:text-base text-white/80 line-clamp-2 mb-4 max-w-lg">
              {post.excerpt}
            </p>

            {/* Meta + CTA */}
            <div className="flex items-center gap-4">
              <Link
                href={`/posts/${post.slug}`}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:shadow-md hover:brightness-105 active:scale-[0.98]"
              >
                View Hack
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
              <span className="flex items-center gap-1.5 text-xs text-white/60">
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {post.readTime}
              </span>
            </div>
          </div>
        </div>
      ))}

      {/* Arrow buttons — visible on hover */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 z-30 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm text-white transition opacity-0 hover:bg-white/30 group-hover:opacity-100"
        style={{ opacity: paused ? 1 : 0 }}
        aria-label="Previous slide"
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 z-30 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm text-white transition opacity-0 hover:bg-white/30 group-hover:opacity-100"
        style={{ opacity: paused ? 1 : 0 }}
        aria-label="Next slide"
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-4 left-1/2 z-30 -translate-x-1/2 flex items-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === active ? "w-6 bg-teal-400" : "w-2 bg-white/40 hover:bg-white/60"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

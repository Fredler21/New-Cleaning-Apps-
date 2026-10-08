"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";
import type { PostCardData } from "@/components/posts/PostCard";
import { categoryName } from "@/lib/categories";

type HeroSliderProps = {
  slides: PostCardData[];
};

export function HeroSlider({ slides: allSlides }: HeroSliderProps) {
  const slides = allSlides.slice(0, 4);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  // Which slides have had their image mounted. The first two are in the
  // initial HTML; the rest mount just before they are shown, so the page does
  // not download four full-size hero images on load.
  const [mounted, setMounted] = useState<number[]>([0, 1]);

  const next = useCallback(() => setActive((i) => (i + 1) % slides.length), [slides.length]);
  const prev = useCallback(() => setActive((i) => (i - 1 + slides.length) % slides.length), [slides.length]);

  useEffect(() => {
    const upcoming = (active + 1) % slides.length;
    setMounted((list) => {
      const additions = [active, upcoming].filter((i) => !list.includes(i));
      return additions.length ? [...list, ...additions] : list;
    });
  }, [active, slides.length]);

  // Swipe support for touch screens.
  const touchStartX = useRef<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0]?.clientX ?? null;
    setPaused(true);
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const start = touchStartX.current;
    touchStartX.current = null;
    setPaused(false);
    if (start == null) return;
    const dx = (e.changedTouches[0]?.clientX ?? start) - start;
    if (Math.abs(dx) > 40) (dx < 0 ? next : prev)();
  };

  useEffect(() => {
    if (paused) return;
    const id = setInterval(next, 5500);
    return () => clearInterval(id);
  }, [paused, next]);

  return (
    <section
      className="group relative w-full touch-pan-y overflow-hidden rounded-slider shadow-slider"
      style={{ aspectRatio: "16/10", minHeight: 320, maxHeight: 520 }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      aria-roledescription="carousel"
      aria-label="Featured cleaning hacks"
    >
      {slides.map((post, i) => (
        <div
          key={post.slug}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${i === active ? "opacity-100 z-10" : "opacity-0 z-0"}`}
          role="group"
          aria-roledescription="slide"
          aria-label={`Slide ${i + 1} of ${slides.length}`}
          aria-hidden={i !== active}
        >
          {/* Background image, served through next/image so it is resized,
              converted to AVIF/WebP and, for the first slide, preloaded as
              the page's largest paint. */}
          <div className="absolute inset-0 bg-slate-800">
            {mounted.includes(i) && (
              <Image
                src={post.coverImage}
                alt=""
                fill
                priority={i === 0}
                sizes="(max-width: 1152px) 100vw, 1152px"
                className="object-cover"
              />
            )}
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-transparent" />

          <div className="relative z-20 flex h-full max-w-2xl flex-col justify-end p-5 sm:p-8 md:p-12 lg:p-16">
            <div className="mb-3 flex items-center gap-2">
              <span className="inline-flex items-center rounded-full bg-teal-700 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
                Featured
              </span>
              <span className="inline-flex items-center rounded-full bg-white/20 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
                {categoryName(post.category)}
              </span>
            </div>

            <h2 className="mb-2 text-2xl font-bold leading-tight text-white md:text-3xl lg:text-4xl">
              {post.title}
            </h2>

            <p className="mb-4 line-clamp-2 max-w-lg text-sm text-white/80 md:text-base">
              {post.excerpt}
            </p>

            <div className="flex items-center gap-4">
              <Link
                href={`/cleaning-hacks/${post.slug}`}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-teal-700 to-emerald-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:shadow-md hover:brightness-110 active:scale-[0.98]"
              >
                View Hack
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <span className="flex items-center gap-1.5 text-xs text-white/80">
                <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                {post.readTime}
              </span>
            </div>
          </div>
        </div>
      ))}

      {/* Arrow buttons, visible on hover and on keyboard focus */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 z-30 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white opacity-0 backdrop-blur-sm transition hover:bg-white/30 focus-visible:opacity-100 group-hover:opacity-100"
        style={{ opacity: paused ? 1 : undefined }}
        aria-label="Previous slide"
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 z-30 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white opacity-0 backdrop-blur-sm transition hover:bg-white/30 focus-visible:opacity-100 group-hover:opacity-100"
        style={{ opacity: paused ? 1 : undefined }}
        aria-label="Next slide"
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-4 left-1/2 z-30 flex -translate-x-1/2 items-center gap-1">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className="flex h-6 items-center justify-center px-1"
            aria-label={`Go to slide ${i + 1}`}
            aria-current={i === active}
          >
            <span
              className={`block h-2 rounded-full transition-all duration-300 ${
                i === active ? "w-6 bg-teal-400" : "w-2 bg-white/50 hover:bg-white/70"
              }`}
            />
          </button>
        ))}
      </div>
    </section>
  );
}

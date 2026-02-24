"use client";

import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { SaveHackButton } from "@/components/posts/SaveHackButton";
import type { Post } from "@/types/post";

type PostCardProps = {
  post: Post;
  featured?: boolean;
  trending?: boolean;
};

export function PostCard({ post, featured, trending }: PostCardProps) {
  return (
    <article
      className="group relative overflow-hidden rounded-card transition-all duration-300 hover:-translate-y-1"
      style={{ background: "var(--card-bg)", border: "1px solid var(--border)", boxShadow: "var(--card-shadow)" }}
    >
      <Link href={`/posts/${post.slug}`} aria-label={post.title} className="block">
        <div className="relative overflow-hidden">
          <Image
            src={post.coverImage}
            alt={post.title}
            width={900}
            height={600}
            className="h-52 w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

          {/* Badges */}
          <div className="absolute left-3 top-3 flex items-center gap-2">
            {featured && <Badge variant="featured">★ Featured</Badge>}
            {trending && <Badge variant="trending">🔥 Trending</Badge>}
          </div>

          {/* Time estimate */}
          <div className="absolute bottom-3 right-3">
            <span className="inline-flex items-center gap-1 rounded-lg bg-black/50 px-2.5 py-1 text-xs font-medium text-white backdrop-blur-sm">
              ⏱ {post.readTime}
            </span>
          </div>
        </div>
      </Link>

      <div className="space-y-3 p-5">
        <div className="flex items-center gap-2">
          <Badge variant="teal">{post.tags[0]}</Badge>
          <span className="text-xs" style={{ color: "var(--muted)" }}>Easy</span>
        </div>

        <h3 className="text-[17px] font-semibold leading-snug" style={{ color: "var(--text)" }}>
          <Link href={`/posts/${post.slug}`} className="transition-colors duration-200 hover:text-teal-600">
            {post.title}
          </Link>
        </h3>

        <p className="line-clamp-2 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{post.excerpt}</p>

        <div className="flex items-center justify-between pt-3" style={{ borderTop: "1px solid var(--border)" }}>
          <Link
            href={`/posts/${post.slug}`}
            className="inline-flex items-center gap-1 text-sm font-medium text-teal-600 transition-colors hover:text-teal-700"
          >
            View Hack
            <svg className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
          <SaveHackButton slug={post.slug} variant="icon" />
        </div>
      </div>
    </article>
  );
}

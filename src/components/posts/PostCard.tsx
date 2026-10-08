import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, Flame, Star } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { SaveHackButton } from "@/components/posts/SaveHackButton";
import { categoryGradient } from "@/lib/category-color";
import { categoryName } from "@/lib/categories";
import type { Post } from "@/types/post";

/**
 * The slice of a post a card needs. Cards used to take the whole Post, and
 * because the card was a client component the full article body of every
 * card on a page was serialized into the HTML (the hacks index was 2 MB).
 * This is a server component now, and its client children only get scalars.
 */
export type PostCardData = Pick<Post, "slug" | "title" | "excerpt" | "coverImage" | "category" | "readTime">;

export function toCardData(post: Post): PostCardData {
  return {
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    coverImage: post.coverImage,
    category: post.category,
    readTime: post.readTime,
  };
}

type PostCardProps = {
  post: PostCardData;
  featured?: boolean;
  trending?: boolean;
};

export function PostCard({ post, featured, trending }: PostCardProps) {
  const href = `/cleaning-hacks/${post.slug}`;
  return (
    <article
      className="group relative flex h-full flex-col overflow-hidden rounded-card transition-all duration-300 hover:-translate-y-1.5"
      style={{
        background: "var(--card-bg)",
        border: "1px solid var(--border)",
        boxShadow: "var(--card-shadow)",
        // Skip rendering/layout of off-screen cards. Big paint-time win on the
        // 85-card /cleaning-hacks grid; the intrinsic size reserves scroll space
        // so the scrollbar stays stable. Progressive enhancement (ignored where
        // unsupported).
        contentVisibility: "auto",
        containIntrinsicSize: "auto 420px",
      }}
    >
      {/* Category color accent along the top */}
      <div className="absolute inset-x-0 top-0 z-10 h-1" style={{ background: categoryGradient(post.category) }} />

      <div className="relative overflow-hidden">
        <Image
          src={post.coverImage}
          alt=""
          width={900}
          height={600}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="h-52 w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

        {(featured || trending) && (
          <div className="absolute left-3 top-3 flex items-center gap-2">
            {featured && (
              <Badge variant="featured">
                <Star className="h-3.5 w-3.5" aria-hidden="true" />
                Featured
              </Badge>
            )}
            {trending && (
              <Badge variant="trending">
                <Flame className="h-3.5 w-3.5" aria-hidden="true" />
                Trending
              </Badge>
            )}
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center justify-between gap-3">
          <span
            className="inline-flex items-center rounded-lg px-2.5 py-1 text-xs font-semibold text-white"
            style={{ background: categoryGradient(post.category) }}
          >
            {categoryName(post.category)}
          </span>
          <span className="inline-flex shrink-0 items-center gap-1 text-xs font-medium" style={{ color: "var(--text-secondary)" }}>
            <Clock className="h-3.5 w-3.5" aria-hidden="true" />
            {post.readTime}
          </span>
        </div>

        <h3 className="text-[17px] font-semibold leading-snug" style={{ color: "var(--text)" }}>
          {/* The one link on the card. ::after stretches its hit area over the
              whole card, so there is no second link on the image and no
              redundant "View" link in the footer. */}
          <Link
            href={href}
            prefetch={false}
            className="transition-colors duration-200 after:absolute after:inset-0 after:content-[''] hover:text-teal-700 dark:hover:text-teal-400"
          >
            {post.title}
          </Link>
        </h3>

        <p className="line-clamp-2 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{post.excerpt}</p>

        <div className="mt-auto flex items-center justify-between pt-3" style={{ borderTop: "1px solid var(--border)" }}>
          <span className="inline-flex items-center gap-1 text-sm font-medium text-teal-700 dark:text-teal-400" aria-hidden="true">
            Read guide
            <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
          </span>
          {/* Sits above the stretched link so it stays clickable. */}
          <div className="relative z-20">
            <SaveHackButton slug={post.slug} variant="icon" />
          </div>
        </div>
      </div>
    </article>
  );
}

import { categories } from "@/data/categories";
import { posts } from "@/data/posts";
import type { Category } from "@/types/category";
import type { Post } from "@/types/post";

export type CategoryWithCount = Category & { count: number };

const byDateDesc = (a: Post, b: Post) => b.datePublished.localeCompare(a.datePublished);

/** Posts filed under a category, newest first. */
export function postsInCategory(slug: string): Post[] {
  return posts.filter((post) => post.category === slug).sort(byDateDesc);
}

/** Every category with its live article count, in the order they are defined. */
export function categoriesWithCounts(): CategoryWithCount[] {
  const counts = new Map<string, number>();
  for (const post of posts) {
    counts.set(post.category, (counts.get(post.category) ?? 0) + 1);
  }
  return categories.map((category) => ({ ...category, count: counts.get(category.slug) ?? 0 }));
}

/** Categories that actually have something to show. Empty ones stay hidden. */
export function populatedCategories(): CategoryWithCount[] {
  return categoriesWithCounts().filter((category) => category.count > 0);
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((category) => category.slug === slug);
}

/** Display name for a category slug, falling back to a readable version of the slug. */
export function categoryName(slug: string): string {
  return getCategoryBySlug(slug)?.name ?? slug.replace(/-/g, " ");
}

/** Where a category link should go. Known categories have their own page. */
export function categoryHref(slug: string): string {
  return getCategoryBySlug(slug) ? `/categories/${slug}` : `/cleaning-hacks?category=${slug}`;
}

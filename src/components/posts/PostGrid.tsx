import type { Post } from "@/types/post";
import { PostCard } from "@/components/posts/PostCard";

type PostGridProps = {
  posts: Post[];
  featured?: boolean;
};

export function PostGrid({ posts, featured }: PostGridProps) {
  if (!posts.length) {
    return (
      <div
        className="rounded-card p-12 text-center"
        style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
      >
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl" style={{ background: "var(--surface-hover)" }}>
          <svg className="h-6 w-6" style={{ color: "var(--muted)" }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
        </div>
        <p style={{ color: "var(--text-secondary)" }}>No hacks match your current filters.</p>
        <p className="mt-1 text-sm" style={{ color: "var(--muted)" }}>Try adjusting your search or browse all categories.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post, i) => (
        <PostCard key={post.slug} post={post} featured={featured && i === 0} />
      ))}
    </div>
  );
}

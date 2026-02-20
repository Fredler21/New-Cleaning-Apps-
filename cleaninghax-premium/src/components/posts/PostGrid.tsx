import type { Post } from "@/types/post";
import { PostCard } from "@/components/posts/PostCard";

type PostGridProps = {
  posts: Post[];
};

export function PostGrid({ posts }: PostGridProps) {
  if (!posts.length) {
    return (
      <div className="rounded-premium border border-white/10 bg-white/5 p-8 text-center text-slate-300">
        No posts match your current filters.
      </div>
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <PostCard key={post.slug} post={post} />
      ))}
    </div>
  );
}

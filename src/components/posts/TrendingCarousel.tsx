import { PostCard } from "@/components/posts/PostCard";
import type { Post } from "@/types/post";

type TrendingCarouselProps = {
  posts: Post[];
};

export function TrendingCarousel({ posts }: TrendingCarouselProps) {
  return (
    <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2">
      {posts.map((post) => (
        <div key={post.slug} className="min-w-[280px] snap-start sm:min-w-[340px] lg:min-w-[360px]">
          <PostCard post={post} />
        </div>
      ))}
    </div>
  );
}

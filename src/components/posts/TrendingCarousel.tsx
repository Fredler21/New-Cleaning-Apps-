import { PostCard } from "@/components/posts/PostCard";
import type { Post } from "@/types/post";

type TrendingCarouselProps = {
  posts: Post[];
};

export function TrendingCarousel({ posts }: TrendingCarouselProps) {
  return (
    <div className="-mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-4 sm:-mx-0 sm:px-0">
      {posts.map((post) => (
        <div key={post.slug} className="min-w-[300px] snap-start sm:min-w-[340px] lg:min-w-[360px]">
          <PostCard post={post} trending={true} />
        </div>
      ))}
    </div>
  );
}

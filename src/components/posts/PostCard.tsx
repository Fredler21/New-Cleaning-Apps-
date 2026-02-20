import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import type { Post } from "@/types/post";

type PostCardProps = {
  post: Post;
};

export function PostCard({ post }: PostCardProps) {
  return (
    <article className="group overflow-hidden rounded-premium border border-white/10 bg-white/5 shadow-glass transition-all duration-300 hover:-translate-y-1 hover:border-premium-teal/40">
      <Link href={`/posts/${post.slug}`} aria-label={post.title}>
        <Image src={post.coverImage} alt={post.title} width={900} height={600} className="h-48 w-full object-cover" loading="lazy" />
      </Link>
      <div className="space-y-3 p-5">
        <div className="flex items-center justify-between">
          <Badge>{post.readTime}</Badge>
          <span className="text-xs text-premium-gold">{post.tags[0]}</span>
        </div>
        <h3 className="text-lg font-semibold text-white">
          <Link href={`/posts/${post.slug}`} className="hover:text-premium-teal">
            {post.title}
          </Link>
        </h3>
        <p className="text-sm leading-relaxed text-slate-300">{post.excerpt}</p>
      </div>
    </article>
  );
}

import Link from "next/link";
import type { Post } from "@/types/post";

type RelatedGuidesProps = {
  posts: Post[];
};

export function RelatedGuides({ posts }: RelatedGuidesProps) {
  if (posts.length === 0) return null;

  return (
    <section className="rounded-xl p-6" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
      <h2 className="flex items-center gap-2 text-xl font-semibold" style={{ color: "var(--text)" }}>
        <svg className="h-5 w-5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
        Related Cleaning Guides
      </h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/cleaning-hacks/${post.slug}`}
            className="group flex items-start gap-3 rounded-lg px-4 py-3 transition-all duration-200 hover:-translate-y-0.5"
            style={{ background: "var(--surface-hover)", border: "1px solid var(--border)" }}
          >
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-teal-50 text-xs text-teal-600 dark:bg-teal-500/10 dark:text-teal-400">→</span>
            <div>
              <span className="text-sm font-medium transition-colors group-hover:text-teal-600" style={{ color: "var(--text)" }}>
                {post.title}
              </span>
              <span className="mt-1 block text-xs" style={{ color: "var(--text-secondary)" }}>
                {post.readTime} read
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

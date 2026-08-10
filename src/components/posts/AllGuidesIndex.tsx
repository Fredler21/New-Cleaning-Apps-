import Link from "next/link";
import { posts } from "@/data/posts";
import { categories } from "@/data/categories";

/**
 * A complete, text-only index of every published guide, grouped by category.
 *
 * SEO purpose: this lives on the homepage (the site's most-crawled, highest-
 * authority page) and gives EVERY article a descriptive-anchor link from it.
 * Pages that are otherwise only reachable from the flat /cleaning-hacks list
 * (a common cause of "Crawled - currently not indexed") get a strong internal
 * link here, which is one of the most effective nudges to get them indexed.
 */
export function AllGuidesIndex() {
  const nameBySlug = new Map(categories.map((c) => [c.slug, c.name]));

  // Group posts by category, then order categories by how many posts they hold.
  const grouped = new Map<string, typeof posts>();
  for (const post of posts) {
    const list = grouped.get(post.category) ?? [];
    list.push(post);
    grouped.set(post.category, list);
  }
  const orderedCategories = [...grouped.entries()].sort(
    (a, b) => b[1].length - a[1].length
  );

  return (
    <section className="py-10" aria-labelledby="all-guides-heading">
      <div className="mb-8">
        <h2
          id="all-guides-heading"
          className="text-2xl font-semibold tracking-tight sm:text-3xl"
          style={{ color: "var(--text)" }}
        >
          Every Cleaning Guide
        </h2>
        <p className="mt-2 text-sm" style={{ color: "var(--text-secondary)" }}>
          Browse the complete library of {posts.length} step-by-step guides, organized by category.
        </p>
      </div>

      <div className="grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
        {orderedCategories.map(([categorySlug, categoryPosts]) => {
          const categoryName =
            nameBySlug.get(categorySlug) ??
            categorySlug.replace(/-/g, " ");
          return (
            <div key={categorySlug}>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide" style={{ color: "var(--accent)" }}>
                <Link
                  href={`/cleaning-hacks?category=${categorySlug}`}
                  className="hover:underline capitalize"
                >
                  {categoryName}
                </Link>
              </h3>
              <ul className="space-y-2">
                {categoryPosts.map((post) => (
                  <li key={post.slug}>
                    <Link
                      href={`/cleaning-hacks/${post.slug}`}
                      className="text-sm leading-snug hover:underline"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {post.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
}

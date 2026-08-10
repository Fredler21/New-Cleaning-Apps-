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
 *
 * It renders collapsed inside a <details>. That is a deliberate compromise:
 * an 84-item list dominates the bottom of the homepage visually, but the links
 * still have to be in the markup to do their job. Content inside a closed
 * <details> is present in the served HTML and is crawled and followed
 * normally, so collapsing costs nothing in crawlability while giving the page
 * back to the reader. Do NOT swap this for a JS-rendered or fetch-on-click
 * list, which would remove the links from the HTML and defeat the point.
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
      <details className="group">
        <summary
          className="flex cursor-pointer select-none items-center justify-between gap-4 rounded-xl px-5 py-4 transition-colors"
          style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
        >
          <span>
            <span
              id="all-guides-heading"
              className="text-base font-semibold sm:text-lg"
              style={{ color: "var(--text)" }}
            >
              Browse all {posts.length} guides
            </span>
            <span className="mt-0.5 block text-sm" style={{ color: "var(--text-secondary)" }}>
              The complete library, organized by category.
            </span>
          </span>
          <svg
            className="h-5 w-5 shrink-0 transition-transform duration-200 group-open:rotate-180"
            style={{ color: "var(--text-secondary)" }}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </summary>

        <div className="mt-8 grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
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
      </details>
    </section>
  );
}

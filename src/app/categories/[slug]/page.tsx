import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { CategoryChips } from "@/components/categories/CategoryChips";
import { PostGrid } from "@/components/posts/PostGrid";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMeta, SITE_URL } from "@/components/seo/Meta";
import { CategoryIcon } from "@/components/ui/CategoryIcon";
import { categories } from "@/data/categories";
import { getCategoryBySlug, populatedCategories, postsInCategory } from "@/lib/categories";

type Props = { params: { slug: string } };

// Only the categories defined in src/data/categories.ts exist; anything else
// is a 404 rather than a dynamically rendered empty page.
export const dynamicParams = false;

export function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const category = getCategoryBySlug(params.slug);
  if (!category) return {};
  const count = postsInCategory(category.slug).length;
  return buildMeta({
    title: `${category.name}: ${count} Cleaning ${count === 1 ? "Guide" : "Guides"}`,
    description: category.description,
    path: `/categories/${category.slug}`,
    noIndex: count === 0,
  });
}

export default function CategoryPage({ params }: Props) {
  const category = getCategoryBySlug(params.slug);
  if (!category) notFound();

  const categoryPosts = postsInCategory(category.slug);
  const count = categoryPosts.length;
  const otherCategories = populatedCategories().filter((item) => item.slug !== category.slug);
  const url = `${SITE_URL}/categories/${category.slug}`;

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "@id": url,
          url,
          name: category.name,
          description: category.description,
          isPartOf: { "@id": SITE_URL },
          mainEntity: {
            "@type": "ItemList",
            numberOfItems: count,
            itemListElement: categoryPosts.map((post, i) => ({
              "@type": "ListItem",
              position: i + 1,
              url: `${SITE_URL}/cleaning-hacks/${post.slug}`,
              name: post.title,
            })),
          },
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
            { "@type": "ListItem", position: 2, name: "Categories", item: `${SITE_URL}/categories` },
            { "@type": "ListItem", position: 3, name: category.name, item: url },
          ],
        }}
      />

      <Container>
        <section className="py-12">
          <nav aria-label="Breadcrumb" className="mb-6 text-sm" style={{ color: "var(--text-secondary)" }}>
            <ol className="flex flex-wrap items-center gap-1.5">
              <li><Link href="/" className="hover:underline" style={{ color: "var(--accent)" }}>Home</Link></li>
              <li aria-hidden="true">/</li>
              <li><Link href="/categories" className="hover:underline" style={{ color: "var(--accent)" }}>Categories</Link></li>
              <li aria-hidden="true">/</li>
              <li aria-current="page" className="font-medium" style={{ color: "var(--text)" }}>{category.name}</li>
            </ol>
          </nav>

          <div className="mb-10 flex items-start gap-4">
            <span
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
              style={{ background: "var(--accent-light)", color: "var(--accent)" }}
            >
              <CategoryIcon slug={category.slug} className="h-6 w-6" />
            </span>
            <div>
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl" style={{ color: "var(--text)" }}>
                {category.name}
              </h1>
              <p className="mt-2 max-w-2xl text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                {category.description}
              </p>
              <p className="mt-2 text-sm" style={{ color: "var(--muted)" }}>
                {count} {count === 1 ? "guide" : "guides"}
              </p>
            </div>
          </div>

          <PostGrid posts={categoryPosts} />

          {otherCategories.length > 0 && (
            <div className="mt-16">
              <h2 className="mb-4 text-xl font-semibold tracking-tight" style={{ color: "var(--text)" }}>
                Other categories
              </h2>
              <CategoryChips categories={otherCategories} />
            </div>
          )}
        </section>
      </Container>
    </>
  );
}

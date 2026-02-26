import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { PostTOC } from "@/components/posts/PostTOC";
import { PostTopBar } from "@/components/posts/PostTopBar";
import { SafetyNote } from "@/components/posts/SafetyNote";
import { ShareBar } from "@/components/posts/ShareBar";
import { SaveHackButton } from "@/components/posts/SaveHackButton";
import { PostGrid } from "@/components/posts/PostGrid";
import { Badge } from "@/components/ui/Badge";
import { JsonLd } from "@/components/seo/JsonLd";
import { SITE_URL, SITE_NAME } from "@/components/seo/Meta";
import { posts, getPostBySlug } from "@/data/posts";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getPostBySlug(params.slug);
  if (!post) {
    return {
      title: "Post not found | TryCleaningHacks",
      description: "The requested post was not found.",
    };
  }

  const url = `${SITE_URL}/posts/${post.slug}`;
  const fullTitle = `${post.title} | ${SITE_NAME}`;

  return {
    title: fullTitle,
    description: post.excerpt,
    keywords: [post.category.replace("-", " "), ...post.tags, "cleaning hacks", "home cleaning"],
    alternates: { canonical: url },
    openGraph: {
      title: fullTitle,
      description: post.excerpt,
      url,
      siteName: SITE_NAME,
      images: [{ url: post.coverImage, width: 1200, height: 630, alt: post.title }],
      locale: "en_US",
      type: "article",
      publishedTime: "2025-06-01T00:00:00Z",
      authors: [SITE_NAME],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: post.excerpt,
      images: [post.coverImage],
    },
  };
}

export default function PostDetailPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const related = posts.filter((item) => item.category === post.category && item.slug !== post.slug).slice(0, 3);

  return (
    <>
      <PostTopBar />

      {/* Hero banner */}
      <section className="relative h-[320px] overflow-hidden sm:h-[400px] lg:h-[440px]">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/20" />
        <Container>
          <div className="relative flex h-[320px] flex-col justify-end pb-8 sm:h-[400px] lg:h-[440px]">
            <div className="flex items-center gap-2">
              <Badge variant="teal">{post.category.replace("-", " ")}</Badge>
              <Badge>⏱ {post.readTime}</Badge>
            </div>
            <h1 className="mt-3 max-w-3xl text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              {post.title}
            </h1>
            <p className="mt-3 max-w-2xl text-base text-slate-300">{post.excerpt}</p>
          </div>
        </Container>
      </section>

      <Container>
        <article className="py-10">
          {/* Article + HowTo structured data */}
          <JsonLd
            data={{
              "@context": "https://schema.org",
              "@type": "Article",
              headline: post.title,
              description: post.excerpt,
              image: `${SITE_URL}${post.coverImage}`,
              datePublished: "2025-06-01T00:00:00Z",
              dateModified: new Date().toISOString(),
              author: { "@type": "Organization", name: SITE_NAME, url: SITE_URL },
              publisher: {
                "@type": "Organization",
                name: SITE_NAME,
                logo: { "@type": "ImageObject", url: `${SITE_URL}/og/og-home.png` },
              },
              mainEntityOfPage: {
                "@type": "WebPage",
                "@id": `${SITE_URL}/posts/${post.slug}`,
              },
            }}
          />
          <JsonLd
            data={{
              "@context": "https://schema.org",
              "@type": "HowTo",
              name: post.title,
              description: post.excerpt,
              image: `${SITE_URL}${post.coverImage}`,
              totalTime: `PT${parseInt(post.readTime)}M`,
              estimatedCost: {
                "@type": "MonetaryAmount",
                currency: "USD",
                value: "0",
              },
              supply: post.supplies.map((s) => ({ "@type": "HowToSupply", name: s })),
              step: post.steps.map((step, i) => ({
                "@type": "HowToStep",
                position: i + 1,
                name: step.title,
                text: step.body,
                url: `${SITE_URL}/posts/${post.slug}#step-${i + 1}`,
              })),
            }}
          />
          <JsonLd
            data={{
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
                { "@type": "ListItem", position: 2, name: "Posts", item: `${SITE_URL}/posts` },
                { "@type": "ListItem", position: 3, name: post.title, item: `${SITE_URL}/posts/${post.slug}` },
              ],
            }}
          />

          {/* Action bar */}
          <div className="mb-10 flex flex-wrap items-center gap-3 rounded-xl px-5 py-3" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
            <SaveHackButton slug={post.slug} variant="full" />
            <ShareBar title={post.title} slug={post.slug} />
          </div>

          <div className="grid gap-10 lg:grid-cols-[1fr_300px]">
            <div className="space-y-8">
              {/* Supplies / Ingredients */}
              <section id="supplies" className="rounded-xl p-6" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
                <h2 className="flex items-center gap-2 text-xl font-semibold" style={{ color: "var(--text)" }}>
                  <svg className="h-5 w-5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  What You&apos;ll Need
                </h2>
                <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {post.supplies.map((supply) => (
                    <div key={supply} className="flex items-center gap-2.5 rounded-lg px-3 py-2.5" style={{ background: "var(--surface-hover)", border: "1px solid var(--border)" }}>
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-teal-50 text-xs text-teal-600 dark:bg-teal-500/10 dark:text-teal-400">✓</span>
                      <span className="text-sm" style={{ color: "var(--text-secondary)" }}>{supply}</span>
                    </div>
                  ))}
                </div>
              </section>

              {/* Steps */}
              <section id="steps" className="space-y-5">
                <h2 className="flex items-center gap-2 text-xl font-semibold" style={{ color: "var(--text)" }}>
                  <svg className="h-5 w-5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Step-by-Step Instructions
                </h2>
                {post.steps.map((step, index) => (
                  <section key={step.title} id={`step-${index + 1}`} className="rounded-xl p-6 transition-all duration-200" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
                    <div className="flex items-start gap-4">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-teal-50 text-sm font-bold text-teal-600 dark:bg-teal-500/10 dark:text-teal-400">{index + 1}</span>
                      <div>
                        <h3 className="text-lg font-semibold" style={{ color: "var(--text)" }}>{step.title}</h3>
                        <p className="mt-3 text-[15px] leading-7" style={{ color: "var(--text-secondary)" }}>{step.body}</p>
                      </div>
                    </div>
                  </section>
                ))}
              </section>

              {/* Pro tips */}
              <section id="pro-tips" className="rounded-xl border border-teal-200 bg-teal-50 p-6 dark:border-teal-400/20 dark:bg-teal-500/5">
                <h2 className="flex items-center gap-2 text-xl font-semibold" style={{ color: "var(--text)" }}>
                  <svg className="h-5 w-5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                  Pro Tips
                </h2>
                <ul className="mt-4 space-y-3">
                  {post.proTips.map((tip) => (
                    <li key={tip} className="flex items-start gap-3 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-teal-100 text-xs text-teal-600 dark:bg-teal-500/10 dark:text-teal-400">✓</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </section>

              <SafetyNote notes={post.safetyNotes} />
            </div>

            {/* Sidebar */}
            <div className="space-y-5 lg:sticky lg:top-[88px] lg:self-start">
              <PostTOC steps={post.steps} />

              {/* Back nav */}
              <Link
                href="/posts"
                className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200"
                style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text-secondary)" }}
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                </svg>
                Browse All Hacks
              </Link>
            </div>
          </div>

          {/* Related */}
          {related.length > 0 && (
            <section className="mt-16">
              <h2 className="mb-6 text-2xl font-semibold tracking-tight" style={{ color: "var(--text)" }}>You might also like</h2>
              <PostGrid posts={related} />
            </section>
          )}
        </article>
      </Container>
    </>
  );
}

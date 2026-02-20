import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/Container";
import { PostTOC } from "@/components/posts/PostTOC";
import { SafetyNote } from "@/components/posts/SafetyNote";
import { ShareBar } from "@/components/posts/ShareBar";
import { PostGrid } from "@/components/posts/PostGrid";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMeta } from "@/components/seo/Meta";
import { posts, getPostBySlug } from "@/data/posts";
import { titleToId } from "@/lib/format";

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getPostBySlug(params.slug);
  if (!post) {
    return buildMeta({ title: "Post not found", description: "The requested post was not found.", path: "/posts" });
  }

  return buildMeta({
    title: post.title,
    description: post.excerpt,
    path: `/posts/${post.slug}`,
    image: "/og/og-default.png"
  });
}

export default function PostDetailPage({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const related = posts.filter((item) => item.category === post.category && item.slug !== post.slug).slice(0, 3);

  return (
    <Container>
      <article className="py-12">
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            description: post.excerpt,
            image: post.coverImage,
            author: { "@type": "Organization", name: "CleaningHax Premium" }
          }}
        />

        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          <div>
            <p className="text-sm uppercase tracking-wide text-premium-gold">{post.category.replace("-", " ")}</p>
            <h1 className="mt-2 text-3xl font-semibold text-white sm:text-4xl">{post.title}</h1>
            <p className="mt-4 text-base leading-relaxed text-slate-300">{post.excerpt}</p>

            <div className="mt-6 overflow-hidden rounded-premium border border-white/10 bg-white/5 shadow-glass">
              <Image
                src={post.coverImage}
                alt={post.title}
                width={1400}
                height={900}
                priority
                className="h-[260px] w-full object-cover sm:h-[340px]"
              />
            </div>

            <div className="mt-8 space-y-8">
              <section id="supplies" className="rounded-premium border border-white/10 bg-white/5 p-5">
                <h2 className="text-xl font-semibold text-white">What you&apos;ll need</h2>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-slate-300">
                  {post.supplies.map((supply) => (
                    <li key={supply}>{supply}</li>
                  ))}
                </ul>
              </section>

              <section id="steps" className="space-y-5">
                <h2 className="text-xl font-semibold text-white">Steps</h2>
                {post.steps.map((step, index) => (
                  <section key={step.title} id={titleToId(step.title)} className="rounded-premium border border-white/10 bg-white/5 p-5">
                    <h3 className="text-lg font-semibold text-white">{index + 1}. {step.title}</h3>
                    <p className="mt-3 text-[15px] leading-7 text-slate-300">{step.body}</p>
                  </section>
                ))}
              </section>

              <section id="pro-tips" className="rounded-premium border border-white/10 bg-white/5 p-5">
                <h2 className="text-xl font-semibold text-white">Pro tips</h2>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-300">
                  {post.proTips.map((tip) => (
                    <li key={tip}>{tip}</li>
                  ))}
                </ul>
              </section>

              <SafetyNote notes={post.safetyNotes} />
              <ShareBar title={post.title} slug={post.slug} />
            </div>
          </div>

          <div className="space-y-4 lg:sticky lg:top-24 lg:self-start">
            <PostTOC steps={post.steps} />
          </div>
        </div>

        <section className="mt-12">
          <h2 className="mb-4 text-2xl font-semibold text-white">Related posts</h2>
          <PostGrid posts={related} />
        </section>
      </article>
    </Container>
  );
}

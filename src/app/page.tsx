import { Hero } from "@/components/hero/Hero";
import { Container } from "@/components/layout/Container";
import { CategoryChips } from "@/components/categories/CategoryChips";
import { categories } from "@/data/categories";
import { featuredPosts, quickWinPosts } from "@/data/featured";
import { TrendingCarousel } from "@/components/posts/TrendingCarousel";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Container>
        <section className="space-y-5 py-8">
          <h2 className="text-2xl font-semibold text-white sm:text-3xl">Featured categories</h2>
          <CategoryChips categories={categories} />
        </section>

        <section className="space-y-5 py-8">
          <h2 className="text-2xl font-semibold text-white sm:text-3xl">Trending now</h2>
          <TrendingCarousel posts={featuredPosts} />
        </section>

        <section className="py-8">
          <h2 className="text-2xl font-semibold text-white sm:text-3xl">Quick wins (2–5 minute hacks)</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {quickWinPosts.map((post) => (
              <article key={post.slug} className="rounded-premium border border-white/10 bg-white/5 p-5">
                <h3 className="text-lg font-semibold text-white">{post.title}</h3>
                <p className="mt-2 text-sm text-slate-300">{post.excerpt}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="my-12 rounded-premium border border-white/10 bg-white/5 p-6 sm:p-8">
          <h2 className="text-2xl font-semibold text-white sm:text-3xl">Get premium cleaning briefs</h2>
          <p className="mt-2 text-sm text-slate-300">Weekly high-impact hacks, curated for a spotless home.</p>
          <form className="mt-5 flex flex-col gap-3 sm:flex-row" aria-label="Email capture form">
            <Input type="email" placeholder="Enter your email" aria-label="Email address" required />
            <Button type="submit" className="sm:min-w-40">Subscribe</Button>
          </form>
        </section>
      </Container>
    </>
  );
}

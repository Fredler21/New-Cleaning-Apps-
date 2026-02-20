import type { Metadata } from "next";
import { CategoryCard } from "@/components/categories/CategoryCard";
import { Container } from "@/components/layout/Container";
import { buildMeta } from "@/components/seo/Meta";
import { categories } from "@/data/categories";

export const metadata: Metadata = buildMeta({
  title: "Categories",
  description: "Explore premium cleaning categories including Dawn, vinegar, baking soda, deep clean, and budget hacks.",
  path: "/categories"
});

export default function CategoriesPage() {
  return (
    <Container>
      <section className="py-12">
        <div className="mb-10">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl" style={{ color: "var(--text)" }}>Browse Categories</h1>
          <p className="mt-3 max-w-2xl" style={{ color: "var(--text-secondary)" }}>Choose your focus and get highly practical routines with clear steps and safety-first guidance.</p>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>
    </Container>
  );
}

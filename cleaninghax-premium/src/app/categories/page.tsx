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
        <h1 className="text-3xl font-semibold text-white sm:text-4xl">Cleaning categories</h1>
        <p className="mt-3 max-w-2xl text-slate-300">Choose your focus and get highly practical routines with clear steps and safety-first guidance.</p>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>
    </Container>
  );
}

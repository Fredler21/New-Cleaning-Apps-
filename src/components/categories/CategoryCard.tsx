import Image from "next/image";
import Link from "next/link";
import type { Category } from "@/types/category";

type CategoryCardProps = {
  category: Category;
};

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <article
      className="group relative overflow-hidden rounded-card p-6 transition-all duration-300 hover:-translate-y-1"
      style={{ background: "var(--card-bg)", border: "1px solid var(--border)", boxShadow: "var(--card-shadow)" }}
    >
      <div className="relative">
        <div
          className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl"
          style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
        >
          <Image src={category.icon} alt={category.name} width={22} height={22} className="opacity-80" />
        </div>

        <h3 className="text-lg font-semibold" style={{ color: "var(--text)" }}>{category.name}</h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{category.description}</p>

        <Link
          href={`/posts?category=${category.slug}`}
          className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-teal-600 transition-all duration-200 hover:text-teal-700"
        >
          Explore
          <svg className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
          </svg>
        </Link>
      </div>
    </article>
  );
}

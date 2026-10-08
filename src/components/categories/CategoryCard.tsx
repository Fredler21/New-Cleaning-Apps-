import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CategoryIcon } from "@/components/ui/CategoryIcon";
import type { Category } from "@/types/category";

type CategoryCardProps = {
  category: Category;
  count?: number;
};

export function CategoryCard({ category, count }: CategoryCardProps) {
  const href = `/categories/${category.slug}`;

  return (
    <article
      className="group relative overflow-hidden rounded-card p-6 transition-all duration-300 hover:-translate-y-1"
      style={{ background: "var(--card-bg)", border: "1px solid var(--border)", boxShadow: "var(--card-shadow)" }}
    >
      <div
        className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl"
        style={{ background: "var(--accent-light)", color: "var(--accent)" }}
      >
        <CategoryIcon slug={category.slug} className="h-6 w-6" />
      </div>

      <h3 className="text-lg font-semibold" style={{ color: "var(--text)" }}>
        {/* The single link on the card, stretched over the whole tile. */}
        <Link
          href={href}
          prefetch={false}
          className="transition-colors duration-200 after:absolute after:inset-0 after:content-[''] hover:text-teal-700 dark:hover:text-teal-400"
        >
          {category.name}
        </Link>
      </h3>
      <p className="mt-2 line-clamp-2 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{category.description}</p>

      <div className="mt-5 flex items-center justify-between text-sm">
        <span className="inline-flex items-center gap-1.5 font-medium text-teal-700 dark:text-teal-400" aria-hidden="true">
          Explore
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" />
        </span>
        {typeof count === "number" && (
          <span className="text-xs" style={{ color: "var(--muted)" }}>
            {count} {count === 1 ? "hack" : "hacks"}
          </span>
        )}
      </div>
    </article>
  );
}

import Link from "next/link";
import type { Category } from "@/types/category";

type CategoryChipsProps = {
  categories: Category[];
};

export function CategoryChips({ categories }: CategoryChipsProps) {
  return (
    <ul className="flex flex-wrap gap-2" aria-label="Featured categories">
      {categories.map((category) => (
        <li key={category.id}>
          <Link
            href={`/posts?category=${category.slug}`}
            className="inline-flex rounded-full border border-white/15 bg-white/10 px-3 py-1 text-xs text-slate-100 transition hover:border-premium-teal/50 hover:text-white"
          >
            {category.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}

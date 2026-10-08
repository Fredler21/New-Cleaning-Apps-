import Link from "next/link";
import { CategoryIcon } from "@/components/ui/CategoryIcon";
import type { Category } from "@/types/category";

type CategoryChipsProps = {
  categories: Category[];
};

export function CategoryChips({ categories }: CategoryChipsProps) {
  return (
    <div className="hide-scrollbar -mx-4 flex gap-3 overflow-x-auto px-4 pb-2 sm:-mx-0 sm:flex-wrap sm:px-0" aria-label="Browse categories">
      {categories.map((category) => (
        <Link
          key={category.id}
          href={`/categories/${category.slug}`}
          prefetch={false}
          className="group flex shrink-0 items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-th-text-secondary transition-all duration-200 hover:text-teal-700 active:scale-[0.97] dark:hover:text-teal-400"
          style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
        >
          <CategoryIcon slug={category.slug} className="h-4 w-4" />
          {category.name}
        </Link>
      ))}
    </div>
  );
}

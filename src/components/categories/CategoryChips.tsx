import Link from "next/link";
import type { Category } from "@/types/category";

type CategoryChipsProps = {
  categories: Category[];
};

const chipIcons: Record<string, string> = {
  "dawn-hacks": "🧽",
  "vinegar-hacks": "✨",
  "baking-soda": "🧂",
  "listerine-hacks": "🌿",
  "peroxide-hacks": "💧",
  "deep-clean": "🧹",
  "dollar-store": "💰",
  "laundry-kitchen": "👕",
  "wd40-hacks": "🔧",
  "pest-control": "🪲",
  "home-fragrance": "🌸",
  "bathroom-cleaning": "🚿",
  "paint-colors": "🎨",
  "diy-cleaners": "🧪"
};

export function CategoryChips({ categories }: CategoryChipsProps) {
  return (
    <div className="hide-scrollbar -mx-4 flex gap-3 overflow-x-auto px-4 pb-2 sm:-mx-0 sm:flex-wrap sm:px-0" aria-label="Browse categories">
      {categories.map((category) => (
        <Link
          key={category.id}
          href={`/posts?category=${category.slug}`}
          className="group flex shrink-0 items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200 hover:text-teal-600 active:scale-[0.97]"
          style={{ background: "var(--surface)", border: "1px solid var(--border)", color: "var(--text-secondary)" }}
        >
          <span className="text-base">{chipIcons[category.slug] ?? "🧹"}</span>
          {category.name}
        </Link>
      ))}
    </div>
  );
}

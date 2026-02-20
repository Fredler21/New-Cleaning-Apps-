import Image from "next/image";
import Link from "next/link";
import type { Category } from "@/types/category";

type CategoryCardProps = {
  category: Category;
};

export function CategoryCard({ category }: CategoryCardProps) {
  return (
    <article className="group rounded-premium border border-white/10 bg-white/5 p-5 shadow-glass transition-all duration-300 hover:-translate-y-1 hover:border-premium-teal/40">
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-white/10">
        <Image src={category.icon} alt={category.name} width={20} height={20} className="opacity-90" />
      </div>
      <h3 className="text-lg font-semibold text-white">{category.name}</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-300">{category.description}</p>
      <Link href={`/posts?category=${category.slug}`} className="mt-4 inline-flex rounded-full border border-premium-teal/40 bg-premium-teal/10 px-4 py-2 text-sm font-medium text-premium-teal transition hover:border-premium-teal hover:bg-premium-teal/20 hover:text-teal-200">
        Explore {category.name}
      </Link>
    </article>
  );
}

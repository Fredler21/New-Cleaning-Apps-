// A small, hand-picked color per category so cards, badges, and accents feel
// distinct and lively instead of every tile being the same teal. Keyed by the
// category slug (which is also what post.category stores). Anything unmapped
// falls back to the brand teal so nothing ever looks broken.

export type CategoryColor = {
  from: string; // gradient start
  to: string; // gradient end
  solid: string; // single accent (dots, borders, text)
};

const COLORS: Record<string, CategoryColor> = {
  "dawn-hacks": { from: "#0ea5e9", to: "#2563eb", solid: "#0284c7" },
  "vinegar-hacks": { from: "#f59e0b", to: "#d97706", solid: "#d97706" },
  "baking-soda": { from: "#38bdf8", to: "#6366f1", solid: "#4f46e5" },
  "listerine-hacks": { from: "#10b981", to: "#059669", solid: "#059669" },
  "peroxide-hacks": { from: "#06b6d4", to: "#0891b2", solid: "#0891b2" },
  "deep-clean": { from: "#8b5cf6", to: "#6d28d9", solid: "#7c3aed" },
  "dollar-store": { from: "#22c55e", to: "#16a34a", solid: "#16a34a" },
  "laundry-kitchen": { from: "#6366f1", to: "#4338ca", solid: "#4f46e5" },
  "wd40-hacks": { from: "#f97316", to: "#ea580c", solid: "#ea580c" },
  "pest-control": { from: "#f43f5e", to: "#e11d48", solid: "#e11d48" },
  "home-fragrance": { from: "#ec4899", to: "#db2777", solid: "#db2777" },
  "bathroom-cleaning": { from: "#14b8a6", to: "#0d9488", solid: "#0d9488" },
  "paint-colors": { from: "#a855f7", to: "#9333ea", solid: "#9333ea" },
  "diy-cleaners": { from: "#2dd4bf", to: "#0d9488", solid: "#0f766e" },
};

const FALLBACK: CategoryColor = { from: "#14b8a6", to: "#0d9488", solid: "#0d9488" };

export function categoryColor(slug: string | undefined | null): CategoryColor {
  if (!slug) return FALLBACK;
  return COLORS[slug] ?? FALLBACK;
}

export function categoryGradient(slug: string | undefined | null): string {
  const c = categoryColor(slug);
  return `linear-gradient(135deg, ${c.from} 0%, ${c.to} 100%)`;
}

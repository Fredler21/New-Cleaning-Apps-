import {
  Bath,
  Bug,
  DollarSign,
  Droplet,
  Droplets,
  FlaskConical,
  Flower2,
  House,
  Leaf,
  Paintbrush,
  Shirt,
  Sparkles,
  SprayCan,
  Wrench,
  type LucideIcon,
} from "lucide-react";

/**
 * One line icon per category, from a single icon set, so the tiles, chips and
 * cards look the same on every operating system. Emoji were used before and
 * rendered differently on each platform.
 */
const ICONS: Record<string, LucideIcon> = {
  "dawn-hacks": Droplets,
  "vinegar-hacks": FlaskConical,
  "baking-soda": Sparkles,
  "listerine-hacks": Leaf,
  "peroxide-hacks": Droplet,
  "deep-clean": House,
  "dollar-store": DollarSign,
  "laundry-kitchen": Shirt,
  "wd40-hacks": Wrench,
  "pest-control": Bug,
  "home-fragrance": Flower2,
  "bathroom-cleaning": Bath,
  "paint-colors": Paintbrush,
  "diy-cleaners": SprayCan,
};

type CategoryIconProps = {
  slug: string;
  className?: string;
};

export function CategoryIcon({ slug, className = "h-5 w-5" }: CategoryIconProps) {
  const Icon = ICONS[slug] ?? Sparkles;
  return <Icon className={className} strokeWidth={1.75} aria-hidden="true" />;
}

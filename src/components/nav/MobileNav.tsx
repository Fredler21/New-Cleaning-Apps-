import Link from "next/link";

type MobileNavProps = {
  open: boolean;
  links: { href: string; label: string }[];
};

export function MobileNav({ open, links }: MobileNavProps) {
  if (!open) {
    return null;
  }

  return (
    <nav id="mobile-nav" className="border-t border-white/10 bg-premium-charcoal px-4 py-3 md:hidden" aria-label="Mobile navigation">
      <ul className="grid gap-2">
        {links.map((item) => (
          <li key={item.href}>
            <Link href={item.href} className="block rounded-xl bg-white/5 px-4 py-3 text-sm text-white hover:bg-white/10">
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

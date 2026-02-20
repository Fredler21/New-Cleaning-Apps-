import Link from "next/link";

type MobileNavProps = {
  open: boolean;
  links: { href: string; label: string }[];
  onClose?: () => void;
};

export function MobileNav({ open, links, onClose }: MobileNavProps) {
  return (
    <div
      id="mobile-nav"
      className={`overflow-hidden transition-all duration-300 ease-in-out md:hidden ${
        open ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
      }`}
      aria-label="Mobile navigation"
    >
      <nav className="border-t px-4 py-4" style={{ background: "var(--nav-bg)", borderColor: "var(--nav-border)" }}>
        <ul className="grid gap-1">
          {links.map((item, i) => (
            <li key={item.href} style={{ animationDelay: `${i * 50}ms` }}>
              <Link
                href={item.href}
                onClick={onClose}
                className="flex items-center gap-3 rounded-xl px-4 py-3.5 text-[15px] font-medium transition-all duration-200 active:scale-[0.98]"
                style={{ color: "var(--text-secondary)" }}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-3 px-4 pb-2">
          <Link
            href="/posts"
            onClick={onClose}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 px-5 py-3.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:shadow-md active:scale-[0.98]"
          >
            Browse All Hacks
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </nav>
    </div>
  );
}

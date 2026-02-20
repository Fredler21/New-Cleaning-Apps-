import Link from "next/link";
import { Container } from "@/components/layout/Container";

const footerLinks = {
  explore: [
    { href: "/posts", label: "All Hacks" },
    { href: "/categories", label: "Categories" },
    { href: "/posts?tag=quick+wins", label: "Quick Wins" },
    { href: "/posts?tag=deep+clean", label: "Deep Clean" }
  ],
  company: [
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
    { href: "/privacy", label: "Privacy" }
  ]
};

export function Footer() {
  return (
    <footer className="mt-20 border-t" style={{ borderColor: "var(--border)" }}>
      <Container>
        <div className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-teal-500 to-emerald-500">
                <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <span className="text-base font-semibold" style={{ color: "var(--text)" }}>CleaningHacks</span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              The best place on the internet for tested, reliable cleaning solutions. Professional results using everyday ingredients.
            </p>
          </div>

          {/* Explore */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--muted)" }}>Explore</h3>
            <ul className="space-y-2.5">
              {footerLinks.explore.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm transition-colors hover:text-teal-600" style={{ color: "var(--text-secondary)" }}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--muted)" }}>Company</h3>
            <ul className="space-y-2.5">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm transition-colors hover:text-teal-600" style={{ color: "var(--text-secondary)" }}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col items-center justify-between gap-3 border-t py-6 sm:flex-row" style={{ borderColor: "var(--border)" }}>
          <p className="text-xs" style={{ color: "var(--muted)" }}>© {new Date().getFullYear()} CleaningHacks. Smart cleaning, premium results.</p>
          <p className="text-xs" style={{ color: "var(--muted)" }}>Designed for professionals, families & homeowners.</p>
        </div>
      </Container>
    </footer>
  );
}

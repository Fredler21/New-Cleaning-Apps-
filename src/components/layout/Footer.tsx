"use client";

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
    { href: "/privacy", label: "Privacy" },
    { href: "/terms", label: "Terms" },
    { href: "/faq", label: "FAQ" }
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
              <span className="text-base font-semibold" style={{ color: "var(--text)" }}>TryCleaningHacks</span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              The best place on the internet for tested, reliable cleaning solutions. Professional results using everyday ingredients.
            </p>
            <div className="mt-5 flex items-center gap-3">
              <a
                href="https://pin.it/5TQpWRWSn"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg transition-colors duration-200"
                style={{ background: "var(--surface)", color: "var(--text-secondary)" }}
                onMouseEnter={(e) => { e.currentTarget.style.color = "#E60023"; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-secondary)"; }}
                aria-label="Follow us on Pinterest"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345c-.091.379-.293 1.194-.333 1.361-.052.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
                </svg>
              </a>
            </div>
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
          <p className="text-xs" style={{ color: "var(--muted)" }}>© {new Date().getFullYear()} TryCleaningHacks. Smart cleaning, real results.</p>
          <div className="flex items-center gap-3">
            <a
              href="https://pin.it/5TQpWRWSn"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs transition-colors hover:text-[#E60023]"
              style={{ color: "var(--muted)" }}
            >
              Pinterest
            </a>
            <span className="text-xs" style={{ color: "var(--muted)" }}>·</span>
            <p className="text-xs" style={{ color: "var(--muted)" }}>Designed for professionals, families & homeowners.</p>
          </div>
        </div>
      </Container>
    </footer>
  );
}

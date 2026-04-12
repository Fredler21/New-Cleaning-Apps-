"use client";

import Link from "next/link";
import { useState } from "react";
import { Container } from "@/components/layout/Container";
import { MobileNav } from "@/components/nav/MobileNav";
import { useTheme } from "@/context/ThemeContext";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/categories", label: "Categories" },
  { href: "/cleaning-hacks", label: "Hacks" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact Us" }
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { theme, toggle } = useTheme();

  return (
    <header className="sticky top-0 z-50 border-b transition-all duration-300" style={{ background: "var(--nav-bg)", borderColor: "var(--nav-border)" }}>
      <Container>
        <div className="flex h-[68px] items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-3 shrink-0" aria-label="TryCleaningHacks home">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl overflow-hidden transition-transform duration-200 group-hover:scale-105">
              <svg viewBox="0 0 48 48" fill="none" className="h-9 w-9" aria-hidden="true">
                <defs>
                  <linearGradient id="nav-drop-grad" x1="0" y1="0" x2=".6" y2="1">
                    <stop offset="0%" stopColor="#2dd4bf"/>
                    <stop offset="100%" stopColor="#0d9488"/>
                  </linearGradient>
                  <radialGradient id="nav-shine" cx="35%" cy="30%" r="55%">
                    <stop offset="0%" stopColor="rgba(255,255,255,0.22)"/>
                    <stop offset="100%" stopColor="rgba(255,255,255,0)"/>
                  </radialGradient>
                </defs>
                <path d="M24 5 C17 11 8 19 8 30 A16 16 0 0 1 40 30 C40 19 31 11 24 5Z" fill="url(#nav-drop-grad)"/>
                <path d="M24 5 C17 11 8 19 8 30 A16 16 0 0 1 40 30 C40 19 31 11 24 5Z" fill="url(#nav-shine)"/>
                <path d="M24 21.5 L25.5 25.5 L29.5 27 L25.5 28.5 L24 32.5 L22.5 28.5 L18.5 27 L22.5 25.5 Z" fill="white" opacity="0.95"/>
                <circle cx="17" cy="15" r="2.5" fill="white" opacity="0.3"/>
              </svg>
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-[11px] font-semibold tracking-[0.15em] uppercase opacity-50" style={{ color: "var(--text-secondary)" }}>Try</span>
              <span className="text-[17px] font-bold tracking-tight leading-none" style={{ color: "var(--text)" }}>
                Cleaning<span className="text-teal-500">Hacks</span>
              </span>
            </div>
          </Link>

          {/* Desktop nav — centered */}
          <nav className="hidden items-center gap-1 md:flex flex-1 justify-center" aria-label="Primary navigation">
            {navLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-lg px-3.5 py-2 text-sm font-medium transition-colors duration-200"
                style={{ color: "var(--text-secondary)" }}
                onMouseEnter={(e) => { e.currentTarget.style.color = "var(--text)"; e.currentTarget.style.background = "var(--surface)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = "var(--text-secondary)"; e.currentTarget.style.background = "transparent"; }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Right side: theme toggle + CTA */}
          <div className="hidden items-center gap-3 md:flex shrink-0">
            {/* Dark mode toggle */}
            <button
              onClick={toggle}
              className="flex h-10 w-10 items-center justify-center rounded-xl transition-colors duration-200"
              style={{ color: "var(--text-secondary)", background: "var(--surface)" }}
              aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            >
              {theme === "light" ? (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                </svg>
              ) : (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                </svg>
              )}
            </button>
            <Link
              href="/cleaning-hacks"
              className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-teal-500 to-emerald-500 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:shadow-md hover:brightness-105 active:scale-[0.98]"
            >
              Browse Hacks
            </Link>
          </div>

          {/* Mobile: theme toggle + hamburger */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={toggle}
              className="flex h-10 w-10 items-center justify-center rounded-xl transition-colors duration-200"
              style={{ color: "var(--text-secondary)", background: "var(--surface)" }}
              aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            >
              {theme === "light" ? (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
                </svg>
              ) : (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                </svg>
              )}
            </button>
            <button
              className="relative flex h-10 w-10 items-center justify-center rounded-xl transition-colors"
              style={{ color: "var(--text)", border: "1px solid var(--border)", background: "var(--surface)" }}
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label="Toggle mobile navigation"
            >
              <svg className={`h-5 w-5 transition-transform duration-300 ${open ? "rotate-90" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                {open ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </Container>
      <MobileNav open={open} links={navLinks} onClose={() => setOpen(false)} />
    </header>
  );
}

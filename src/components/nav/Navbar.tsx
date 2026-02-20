"use client";

import Link from "next/link";
import { useState } from "react";
import { Container } from "@/components/layout/Container";
import { MobileNav } from "@/components/nav/MobileNav";
import { Button } from "@/components/ui/Button";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/categories", label: "Categories" },
  { href: "/posts", label: "Posts" },
  { href: "/about", label: "About" },
  { href: "/privacy", label: "Privacy" },
  { href: "/contact", label: "Contact" }
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-premium-charcoal/85 backdrop-blur-lg">
      <Container>
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="text-base font-semibold tracking-tight text-white" aria-label="CleaningHax Premium home">
            CleaningHax <span className="text-premium-gold">Premium</span>
          </Link>
          <nav className="hidden items-center gap-6 text-sm text-slate-200 md:flex" aria-label="Primary navigation">
            {navLinks.map((item) => (
              <Link key={item.href} href={item.href} className="hover:text-white">
                {item.label}
              </Link>
            ))}
            <Link href="/posts">
              <Button variant="primary" className="px-4 py-2">Browse Hacks</Button>
            </Link>
          </nav>
          <button
            className="rounded-lg border border-white/20 px-3 py-2 text-xs text-white md:hidden"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label="Toggle mobile navigation"
          >
            Menu
          </button>
        </div>
      </Container>
      <MobileNav open={open} links={navLinks} />
    </header>
  );
}

"use client";

import { titleToId } from "@/lib/format";
import type { PostStep } from "@/types/post";

type MobileTOCProps = {
  steps: PostStep[];
};

/**
 * A collapsible "jump to" menu shown only on phones (hidden from `lg` up,
 * where the sticky sidebar TOC takes over). On the desktop layout the sidebar
 * lives beside the article; on mobile that sidebar falls to the very bottom,
 * so this gives phone readers the same quick navigation right up top.
 */
export function MobileTOC({ steps }: MobileTOCProps) {
  const links = [
    { href: "#supplies", label: "What you'll need" },
    { href: "#steps", label: "Step-by-step" },
    ...steps.slice(0, 6).map((s) => ({ href: `#${titleToId(s.title)}`, label: s.title })),
    { href: "#pro-tips", label: "Pro tips" },
    { href: "#faq", label: "FAQ" },
  ];

  return (
    <details
      className="group rounded-xl lg:hidden"
      style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
    >
      <summary className="flex cursor-pointer select-none items-center justify-between gap-2 px-4 py-3.5 text-sm font-semibold">
        <span className="flex items-center gap-2" style={{ color: "var(--text)" }}>
          <svg className="h-4 w-4 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h7" />
          </svg>
          Jump to a section
        </span>
        <svg
          className="h-4 w-4 transition-transform duration-200 group-open:rotate-180"
          style={{ color: "var(--muted)" }}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
        </svg>
      </summary>
      <ol className="grid gap-0.5 px-2 pb-3 text-sm">
        {links.map((l) => (
          <li key={l.href}>
            <a
              href={l.href}
              className="block rounded-lg px-3 py-2 transition-colors hover:text-teal-600"
              style={{ color: "var(--text-secondary)" }}
            >
              {l.label}
            </a>
          </li>
        ))}
      </ol>
    </details>
  );
}

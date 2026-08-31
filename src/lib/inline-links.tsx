import Link from "next/link";
import type { ReactNode } from "react";
import { affiliateUrl, isAffiliateHref } from "@/data/affiliate";

/**
 * Render text that may contain inline markdown links: [text](url).
 *
 * Three kinds of href are understood:
 *
 *   /cleaning-hacks/...       internal, uses next/link so it prefetches
 *   product:rat-snap-trap     an Associates product, see src/data/affiliate.ts
 *   https://...               any other external link
 *
 * Paid links get `rel="sponsored nofollow"` on top of the usual safety
 * attributes. Google treats an undisclosed affiliate link as a link scheme, so
 * this is not optional, and applying it here means it cannot be forgotten on an
 * individual link. A bare Amazon URL written straight into a post is caught by
 * the same rule.
 */
export function renderInlineLinks(text: string): ReactNode[] {
  const pattern = /\[([^\]]+)\]\(([^)]+)\)/g;
  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  const linkClass = "font-medium underline underline-offset-2 hover:opacity-80";
  const linkStyle = { color: "var(--accent)" };

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }
    const [, label, href] = match;

    if (href.startsWith("product:")) {
      const url = affiliateUrl(href.slice("product:".length));
      // An unknown key degrades to plain text. A missing link costs a click.
      // A link pointing nowhere costs the reader's trust.
      if (url) {
        nodes.push(
          <a
            key={`link-${key++}`}
            href={url}
            target="_blank"
            rel="sponsored nofollow noopener noreferrer"
            className={linkClass}
            style={linkStyle}
          >
            {label}
          </a>
        );
      } else {
        nodes.push(label);
      }
    } else if (href.startsWith("/")) {
      nodes.push(
        <Link key={`link-${key++}`} href={href} className={linkClass} style={linkStyle}>
          {label}
        </Link>
      );
    } else {
      nodes.push(
        <a
          key={`link-${key++}`}
          href={href}
          target="_blank"
          rel={
            isAffiliateHref(href)
              ? "sponsored nofollow noopener noreferrer"
              : "noopener noreferrer"
          }
          className={linkClass}
          style={linkStyle}
        >
          {label}
        </a>
      );
    }
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes.length > 0 ? nodes : [text];
}

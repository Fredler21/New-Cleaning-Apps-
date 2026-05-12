import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Render text that may contain inline markdown links: [text](url).
 * Internal links (starting with /) use Next.js Link with prefetching.
 * External links (starting with http) open in a new tab with rel safety.
 */
export function renderInlineLinks(text: string): ReactNode[] {
  const pattern = /\[([^\]]+)\]\(([^)]+)\)/g;
  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }
    const [, label, href] = match;
    if (href.startsWith("/")) {
      nodes.push(
        <Link
          key={`link-${key++}`}
          href={href}
          className="font-medium underline underline-offset-2 hover:opacity-80"
          style={{ color: "var(--accent)" }}
        >
          {label}
        </Link>
      );
    } else {
      nodes.push(
        <a
          key={`link-${key++}`}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium underline underline-offset-2 hover:opacity-80"
          style={{ color: "var(--accent)" }}
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

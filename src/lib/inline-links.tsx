import Link from "next/link";
import { Fragment, type CSSProperties, type ReactNode } from "react";
import { affiliateUrl, isAffiliateHref } from "@/data/affiliate";
import { ProductBox } from "@/components/posts/ProductBox";

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

/**
 * Product box token inside a step body: {{box:<id>|<label>|<context>}}.
 * Label and context are optional. See ProductBox for what each part does.
 */
export const BOX_TOKEN_SOURCE = "\\{\\{box:([a-z0-9-]+)(?:\\|([^|}]*))?(?:\\|([^}]*))?\\}\\}";

/** The step text with every box token removed, for structured data and word counts. */
export function stripBoxTokens(text: string): string {
  return text.replace(new RegExp(BOX_TOKEN_SOURCE, "g"), "").replace(/\s{2,}/g, " ").trim();
}

/**
 * Render a step body: the step's text as one paragraph, then its product
 * boxes underneath, in the order they appear in the text. The token stays
 * next to the sentence that names the product (so the data records why the
 * box is there), but the box renders at the bottom of the paragraph rather
 * than splitting it, which the owner prefers for the look of the page.
 */
export function renderStepBody(body: string, paragraphClass: string, paragraphStyle: CSSProperties): ReactNode[] {
  const nodes: ReactNode[] = [];
  const pattern = new RegExp(BOX_TOKEN_SOURCE, "g");
  const text = stripBoxTokens(body);
  if (text) {
    nodes.push(
      <p key="p" className={paragraphClass} style={paragraphStyle}>
        {renderInlineLinks(text)}
      </p>
    );
  }

  let match: RegExpExecArray | null;
  let key = 0;
  while ((match = pattern.exec(body)) !== null) {
    const [, id, label, context] = match;
    nodes.push(
      <Fragment key={`box-${key++}`}>
        <ProductBox id={id} label={label?.trim() || undefined} context={context?.trim() || undefined} />
      </Fragment>
    );
  }

  return nodes;
}

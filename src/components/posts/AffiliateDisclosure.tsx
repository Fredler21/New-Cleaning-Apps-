import { AMAZON_REQUIRED_STATEMENT } from "@/data/affiliate";

/**
 * Disclosure for posts that carry affiliate links.
 *
 * Placed above the article body, not in the footer. The FTC requires a
 * disclosure to be clear and conspicuous, which it reads as close to the links
 * and visible without scrolling or clicking. A line buried under the site
 * navigation does not satisfy that, and burying it is also the version readers
 * resent when they find out later.
 *
 * Rendered only when the post actually contains a paid link. See
 * `hasAffiliateLinks` in src/data/affiliate.ts.
 */
export function AffiliateDisclosure() {
  return (
    <aside
      className="mt-6 rounded-lg px-4 py-3 text-sm leading-6"
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        color: "var(--text-secondary)",
      }}
    >
      <span className="font-medium" style={{ color: "var(--text)" }}>
        Some links in this guide are affiliate links.
      </span>{" "}
      If you buy through one, this site earns a commission at no extra cost to
      you. {AMAZON_REQUIRED_STATEMENT} Products are recommended because the
      method calls for them, never because of what they pay.
    </aside>
  );
}

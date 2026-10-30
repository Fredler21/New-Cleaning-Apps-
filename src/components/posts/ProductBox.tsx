import { ExternalLink } from "lucide-react";
import { AFFILIATE_PRODUCTS, affiliateUrl, type AffiliateProduct } from "@/data/affiliate";

type ProductBoxProps = {
  /** Key in AFFILIATE_PRODUCTS, the one registry every paid link comes from. */
  id: string;
  /** "Top Pick" or "Budget Pick". Set per placement, since one product can be the top pick on one post and the budget pick on another. */
  label?: string;
  /** Short context for this placement, e.g. "if yours is beyond saving". */
  context?: string;
};

/**
 * Affiliate product box, placed inside an article at the sentence that talks
 * about the product. Written into a step body as a token:
 *
 *   {{box:bissell-little-green|Budget Pick}}
 *   {{box:roomba-self-emptying|Top Pick|if yours is beyond saving}}
 *
 * The product name, the reason it is worth buying and the link all come from
 * the registry in src/data/affiliate.ts. A product whose link has not been
 * pasted yet renders nothing at all, so a post can carry the token before the
 * link exists and the box appears the moment the ASIN is filled in. Never
 * shows a price: prices change, and a stale one is worse than none.
 */
export function ProductBox({ id, label, context }: ProductBoxProps) {
  const product = (AFFILIATE_PRODUCTS as Record<string, AffiliateProduct>)[id];
  const url = affiliateUrl(id);
  if (!product || !url) return null;

  return (
    <aside
      className="mt-4 rounded-xl p-4 sm:p-5"
      style={{ background: "var(--card-bg)", border: "1px solid var(--border)", boxShadow: "var(--card-shadow)" }}
      aria-label={`Recommended product: ${product.name}`}
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
        <div className="min-w-0">
          {/* Explicit spaces and a separator between the badge, the context and
              the name, so the text reads correctly when styling is stripped
              (reader mode, copy and paste, screen readers): "Top Pick · context". */}
          {(label || context) && (
            <p className="mb-1.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs">
              {label && (
                <span
                  className="inline-flex items-center rounded-full px-2.5 py-0.5 font-semibold"
                  style={{ background: "var(--accent-light)", color: "var(--accent)" }}
                >
                  {label}
                </span>
              )}
              {label && context && (
                <>
                  {" "}
                  <span aria-hidden="true" style={{ color: "var(--muted)" }}>
                    ·
                  </span>{" "}
                </>
              )}
              {context && <span style={{ color: "var(--muted)" }}>{context}</span>}
            </p>
          )}{" "}
          <p className="text-[15px] font-semibold leading-snug" style={{ color: "var(--text)" }}>
            {product.name}
          </p>{" "}
          <p className="mt-1 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            {product.note}
          </p>
        </div>
        <a
          href={url}
          target="_blank"
          rel="sponsored nofollow noopener noreferrer"
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-teal-700 to-emerald-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:shadow-md hover:brightness-110 active:scale-[0.98]"
        >
          See it on Amazon
          <ExternalLink className="h-4 w-4" aria-hidden="true" />
        </a>
      </div>
    </aside>
  );
}

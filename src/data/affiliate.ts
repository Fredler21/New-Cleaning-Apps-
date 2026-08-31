/**
 * Amazon Associates wiring.
 *
 * Posts never contain a raw Amazon URL. They reference a key from the registry
 * below, written as a normal inline link with a `product:` scheme:
 *
 *   "Set [rat size snap traps](product:rat-snap-trap) along the wall."
 *
 * Everything else is handled centrally, which matters for three reasons.
 * Changing the tracking tag, or swapping a product that went out of stock, is
 * one edit here instead of a hunt through 80-odd posts. The `rel` attributes
 * that Google requires on paid links cannot be forgotten on an individual link.
 * And a key that does not resolve renders as plain text rather than a dead link,
 * so a typo costs a missing link, never a broken one.
 */

/** Associates tracking ID. Every outbound product URL carries it. */
export const AMAZON_TAG = "trycleaningha-20";

/**
 * Required verbatim by the Associates operating agreement. Amazon checks for
 * it, so do not reword it.
 */
export const AMAZON_REQUIRED_STATEMENT =
  "As an Amazon Associate I earn from qualifying purchases.";

export type AffiliateProduct = {
  /** Plain name for the product, used when a post does not give its own label. */
  name: string;
  /**
   * Amazon product ID, the `/dp/<ASIN>` segment of a product URL. Prefer this:
   * it lands the reader on one specific page.
   *
   * Get it from the SiteStripe bar that appears at the top of Amazon once you
   * are logged into Associates, or copy it out of the product URL by hand.
   */
  asin?: string;
  /**
   * Fallback used while no ASIN has been chosen. Sends the reader to an Amazon
   * search for this phrase. It is a legitimate Associates link and it earns
   * normally, but a search page converts worse than a product page and can show
   * competing or out of stock listings. Treat every `search` entry below as a
   * placeholder to replace, not a finished destination.
   */
  search?: string;
  /** Why a reader would actually need this. Keeps the reasoning in one place. */
  note: string;
};

export const AFFILIATE_PRODUCTS = {
  /* ── Pest control. The highest intent posts on the site: someone reading
        these is usually trying to solve the problem the same day. ───────── */
  "rat-snap-trap": {
    name: "rat size snap traps",
    asin: "B0746NGR9M",
    note: "Mouse traps are too small to kill a rat cleanly. Rat size is a separate product.",
  },
  "hardware-cloth": {
    name: "quarter inch galvanized hardware cloth",
    asin: "B09W8XZDVS",
    note: "The mesh size matters. Anything wider than a quarter inch lets young rats through.",
  },
  "copper-mesh": {
    name: "copper mesh",
    asin: "B0GFT351DJ",
    note: "Packs into gaps that are the wrong shape for hardware cloth, and does not rust out like steel wool.",
  },
  "nitrile-gloves": {
    name: "disposable nitrile gloves",
    asin: "B00GS8W3T4",
    note: "Rodent droppings and urine carry disease. Bare hands are not an option for cleanup.",
  },
  "roach-bait-station": {
    name: "roach bait stations",
    search: "roach bait stations",
    note: "Bait carried back to the nest reaches the roaches a spray never touches.",
  },
  "mattress-encasement": {
    name: "a zippered mattress encasement",
    search: "zippered mattress encasement bed bug proof",
    note: "Traps anything already in the mattress and stops it being reinfested.",
  },

  /* ── Tools a post already tells the reader to get hold of. ───────────── */
  "sneaker-cleaning-kit": {
    name: "a sneaker cleaning kit",
    asin: "B0G7G6R1MH",
    note: "Covers the stiff brush, the soft brush and the solution the post calls for in one purchase.",
  },
  "cedar-blocks": {
    name: "cedar blocks",
    asin: "B0BT487XG2",
    note: "Blocks rather than spray, which is what the closet post specifies.",
  },
  "bottle-brush-set": {
    name: "a bottle brush set",
    asin: "B08HMZZLZT",
    note: "Includes the straw brush, which is the piece most people do not already own.",
  },
  "drawer-organizer": {
    name: "a drawer organizer set",
    asin: "B0GKV2SQT4",
    note: "Multiple sizes, so it fits more desks than a single fixed tray.",
  },
  "cable-ties": {
    name: "reusable velcro cable ties",
    asin: "B081HH5X61",
    note: "Reusable, so cables can be unbundled without cutting anything.",
  },
  "dryer-vent-brush": {
    name: "a long flexible dryer vent brush",
    asin: "B0FSXWBYSG",
    note: "The laundry post lists this by name. Vacuuming at the wall does not reach along the duct.",
  },

  /* Sourced but not placed yet. The fruit fly post teaches a DIY trap and does
     not recommend buying one, and no post on the site mentions a spin scrubber
     at all. Linking either would mean inserting a recommendation the article
     never makes, so they wait for an editorial decision rather than a link. */
  "fruit-fly-trap": {
    name: "a ready made fruit fly trap",
    asin: "B01MRHXM0I",
    note: "Liquid lure trap. Only for a reader who will not make the vinegar trap themselves.",
  },
  "spin-scrubber": {
    name: "an electric spin scrubber",
    asin: "B0GWQ7249P",
    note: "Unplaced. Would suit tub, tile and grout work if a post ever recommends one.",
  },

  /* ── Named products a post already tells the reader to look for. ─────── */
  borax: {
    name: "20 Mule Team borax",
    asin: "B018HUUK40",
    note: "Unlike baking soda or vinegar, borax is not stocked in every grocery store, so the reader may genuinely need to order it.",
  },

  /* ── Descaling and drains. Consumables, so these repeat. ──────────────── */
  "appliance-descaler": {
    name: "an appliance descaler",
    asin: "B0G5YX8HXS",
    note: "For scale that vinegar has stopped shifting, or appliances whose makers void warranties over vinegar.",
  },
  "toilet-pumice-stick": {
    name: "a pumice stick made for toilet bowls",
    search: "pumice stick toilet bowl cleaner",
    note: "The only thing that reliably takes off a hardened mineral ring without scratching porcelain.",
  },
  "drain-snake": {
    name: "a drain snake",
    search: "drain snake hair clog remover",
    note: "Pulls the hair clog out whole. Chemical drain cleaner just tunnels through it.",
  },
  "enzyme-cleaner": {
    name: "an enzyme cleaner",
    search: "enzyme cleaner pet urine",
    note: "Digests the proteins that cause the smell. Ordinary detergent only masks them.",
  },
} satisfies Record<string, AffiliateProduct>;

export type ProductKey = keyof typeof AFFILIATE_PRODUCTS;

const AMAZON_BASE = "https://www.amazon.com";

/**
 * Build the outbound URL for a product key.
 *
 * Returns null for an unknown key so the renderer can fall back to plain text.
 * Failing that way round is deliberate: a missing link is a small loss, a link
 * pointing at nothing is a broken page.
 */
export function affiliateUrl(key: string): string | null {
  const product = (AFFILIATE_PRODUCTS as Record<string, AffiliateProduct>)[key];
  if (!product) return null;

  if (product.asin) {
    return `${AMAZON_BASE}/dp/${product.asin}?tag=${AMAZON_TAG}`;
  }
  if (product.search) {
    return `${AMAZON_BASE}/s?k=${encodeURIComponent(product.search)}&tag=${AMAZON_TAG}`;
  }
  return null;
}

/** True for any URL that should be treated as a paid link. */
export function isAffiliateHref(href: string): boolean {
  return (
    href.startsWith("product:") ||
    /^https?:\/\/(www\.)?(amazon\.[a-z.]+|amzn\.to)\//i.test(href)
  );
}

/**
 * Whether a post carries any affiliate link, which is what decides if the
 * disclosure renders. Checked against the fields that run through
 * `renderInlineLinks`, since those are the only places a link can appear.
 */
export function hasAffiliateLinks(post: {
  steps?: { body: string }[];
  proTips?: string[];
  faqs?: { answer: string }[];
}): boolean {
  const haystack = [
    ...(post.steps ?? []).map((s) => s.body),
    ...(post.proTips ?? []),
    ...(post.faqs ?? []).map((f) => f.answer),
  ].join(" ");

  return /\]\(product:/.test(haystack) || /\]\(https?:\/\/(www\.)?(amazon\.|amzn\.to)/i.test(haystack);
}

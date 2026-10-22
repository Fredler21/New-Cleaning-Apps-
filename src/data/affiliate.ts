/**
 * Amazon Associates wiring. The one registry every paid link comes from.
 *
 * Posts never contain a raw Amazon URL. They reference a key from the registry
 * below, either as an inline link in a step:
 *
 *   "Use [an enzyme cleaner](product:rocco-roxie) on the spot."
 *
 * or as a product box placed right after the sentence that talks about it:
 *
 *   "...rent a carpet cleaner with an extraction function. {{box:bissell-proheat-pet|Top Pick}}"
 *
 * Everything else is handled centrally. Changing the tracking tag, or swapping
 * a product that went out of stock, is one edit here instead of a hunt through
 * 80-odd posts. The `rel` attributes Google requires on paid links cannot be
 * forgotten on an individual link. A key that does not resolve renders as
 * plain text (inline) or nothing at all (box), so a typo or an unpasted link
 * costs a missing link, never a broken one.
 */

/** Associates tracking ID. Every outbound product URL carries it. */
export const AMAZON_TAG = "trycleaningha-20";

/**
 * Required verbatim by the Associates operating agreement. Amazon checks for
 * it, so do not reword it.
 */
export const AMAZON_REQUIRED_STATEMENT =
  "As an Amazon Associate I earn from qualifying purchases.";

/**
 * Leave this in `asin` (or `url`) until the real link is pasted. A product
 * carrying it is hidden everywhere on the site: its boxes do not render and
 * its inline links fall back to plain text.
 */
export const LINK_PLACEHOLDER = "PASTE_ASIN_HERE";

export type AffiliateProduct = {
  /** Product name as shown in the box. */
  name: string;
  /**
   * Amazon product ID, the `/dp/<ASIN>` segment of a product URL. Get it from
   * the SiteStripe bar on Amazon once you are logged into Associates, or copy
   * it out of the product URL by hand. Leave LINK_PLACEHOLDER until then.
   */
  asin?: string;
  /** A full affiliate URL (for example an amzn.to short link). Wins over `asin` when set. */
  url?: string;
  /**
   * Fallback used while no ASIN has been chosen. Sends the reader to an Amazon
   * search for this phrase. Converts worse than a product page.
   */
  search?: string;
  /** Why a reader would actually want this. Shown in the box, so keep it to one or two plain sentences. */
  note: string;
};

export const AFFILIATE_PRODUCTS = {
  /* Pet stains */
  "bissell-proheat-pet": {
    name: "Bissell ProHeat 2X Revolution Pet Pro Carpet Cleaner",
    asin: LINK_PLACEHOLDER,
    note: "A full size upright extractor. It injects solution into the padding and pulls it back out, which is the only way to reach urine that has soaked below the carpet.",
  },
  "bissell-little-green": {
    name: "Bissell Little Green Portable Carpet Cleaner",
    asin: LINK_PLACEHOLDER,
    note: "A small spray and extract cleaner for single spots, stairs and upholstery. Does the inject and pull back job without renting a machine.",
  },
  "rocco-roxie": {
    name: "Rocco & Roxie Stain & Odor Eliminator",
    // The retired "enzyme-cleaner" entry used ASIN B083FBGDJM. Reuse it here if that listing is Rocco & Roxie.
    asin: LINK_PLACEHOLDER,
    note: "An enzyme cleaner. The enzymes digest the uric acid crystals that keep producing the smell, which ordinary carpet shampoo only masks.",
  },

  /* Mattress, bed bugs and oven share the steam cleaner */
  "dupray-neat": {
    name: "Dupray Neat Steam Cleaner",
    // The retired "steam-cleaner" entry used ASIN B0HFHVQXVZ. Reuse it here if that listing is the Dupray Neat.
    asin: LINK_PLACEHOLDER,
    note: "A canister steam cleaner with a hose and nozzle attachments. Heat does the work, so there is no chemical residue, and the nozzle reaches seams and hinges a cloth cannot.",
  },
  "shark-handheld-vacuum": {
    name: "Shark handheld vacuum with upholstery tool",
    asin: LINK_PLACEHOLDER,
    note: "Cordless, with the upholstery attachment the mattress and couch steps call for. Light enough to work seams in slow overlapping rows.",
  },
  "saferest-protector": {
    name: "SafeRest Waterproof Mattress Protector",
    asin: LINK_PLACEHOLDER,
    note: "A fitted waterproof layer that goes on before the sheets. The next spill stays on the protector and goes through the wash instead of into the mattress.",
  },
  "mattress-vacuum": {
    name: "Mattress vacuum",
    asin: LINK_PLACEHOLDER,
    note: "A handheld vacuum built for mattresses and bedding, with a wide head and a crevice tool for the seams and the bed frame joints.",
  },
  "sureguard-encasement": {
    name: "SureGuard Zippered Mattress Encasement",
    // The retired "mattress-encasement" entry used ASIN B01413355S. Reuse it here if that listing is the SureGuard.
    asin: LINK_PLACEHOLDER,
    note: "A fully zippered, bed bug certified encasement for the mattress and box spring. Traps anything already inside where it cannot bite you.",
  },

  /* Robot vacuum */
  "roomba-self-emptying": {
    name: "iRobot Roomba self-emptying model",
    asin: LINK_PLACEHOLDER,
    note: "A Roomba with a base that empties the bin on its own after each run, so the dustbin wash in this guide becomes an occasional job instead of a weekly one.",
  },
  "shark-ai-robot": {
    name: "Shark AI Robot Vacuum with Self-Empty Base",
    asin: LINK_PLACEHOLDER,
    note: "Self emptying base and a bagless bin, so the robot dumps its own dust and the base only needs emptying every few weeks.",
  },
  "roomba-replenishment-kit": {
    name: "iRobot Roomba Replenishment Kit",
    asin: LINK_PLACEHOLDER,
    note: "Replacement filters, side brushes and a brush roll in one pack. The filter is the part that grays out and costs suction, and this keeps a spare on hand.",
  },

  /* Hardwood floors */
  "bissell-crosswave": {
    name: "Bissell CrossWave HydroSteam",
    asin: LINK_PLACEHOLDER,
    note: "A wet dry floor washer that vacuums and mops in one pass. On its lowest water setting it keeps the floor as dry as sealed hardwood needs.",
  },
  "shark-steam-scrub": {
    name: "Shark Steam & Scrub Mop",
    asin: LINK_PLACEHOLDER,
    note: "A steam mop with rotating pads for tile and stone floors. Keep it off hardwood, where the steam swells the plank edges.",
  },
  "bona-spray": {
    name: "Bona Hardwood Floor Cleaner Spray",
    asin: LINK_PLACEHOLDER,
    note: "A pH neutral cleaner made for sealed wood. It leaves no film and needs no rinse, which is what the rules in this guide come down to.",
  },

  /* Dryer vent */
  linteater: {
    name: "LintEater Rotary Dryer Vent Cleaning System",
    // The retired "dryer-vent-brush" entry used ASIN B0FSXWBYSG. Reuse it here if that listing is the LintEater kit.
    asin: LINK_PLACEHOLDER,
    note: "A brush head on flexible rods that screw together and spin with a drill, so the whole length of the duct gets mechanical contact rather than just the end you can reach.",
  },
  "sealegend-vent-vacuum": {
    name: "Sealegend Dryer Vent Vacuum Hose Attachment",
    asin: LINK_PLACEHOLDER,
    note: "A long flexible hose that fits a household vacuum and goes down the lint trap slot and into the duct, where a crevice tool stops short.",
  },

  /* Air fryer */
  "ninja-dualzone": {
    name: "Ninja Foodi DualZone Air Fryer",
    asin: LINK_PLACEHOLDER,
    note: "Two independent baskets, each smaller and lighter than a single large one, which makes the after every use wash in this guide quicker.",
  },
  "katbite-liners": {
    name: "Katbite Disposable Air Fryer Liners",
    asin: LINK_PLACEHOLDER,
    note: "Perforated parchment liners cut to fit the basket. They catch the grease from bacon and wings before it bakes onto the basket floor.",
  },

  /* Coffee maker */
  "breville-barista": {
    name: "Breville Barista Express",
    asin: LINK_PLACEHOLDER,
    note: "A home espresso machine with a built in grinder. Its boiler is exactly the kind the guide says to protect with a proper descaler rather than vinegar.",
  },
  "keurig-k-elite": {
    name: "Keurig K-Elite",
    asin: LINK_PLACEHOLDER,
    note: "A pod brewer with a removable reservoir and a descale mode, so the acid step in this guide runs from a menu rather than by hand.",
  },
  "impresa-descaler": {
    name: "Impresa Descaling Solution 2-pack",
    // The retired "appliance-descaler" entry used ASIN B0G5YX8HXS. Reuse it here if that listing is the Impresa 2-pack.
    asin: LINK_PLACEHOLDER,
    note: "A citric acid descaler made for coffee machines. Rinses clean in fewer cycles than vinegar and is safe on the aluminum boilers vinegar can damage.",
  },

  /* Fruit flies */
  "katchy-trap": {
    name: "Katchy Indoor Insect Trap",
    asin: LINK_PLACEHOLDER,
    note: "A plug in trap that draws adults in with UV light and a fan, onto a sticky board. Catches around the clock without an open cup of vinegar on the counter.",
  },
  "terro-fruit-fly-traps": {
    name: "TERRO Fruit Fly Traps 2-pack",
    // Carried over from the retired "fruit-fly-trap" entry. Confirm this ASIN is the TERRO 2-pack before relying on it.
    asin: "B01MRHXM0I",
    note: "A liquid lure trap in a small apple shaped cup. The soapy cider vinegar trap from this guide, in a tidier package.",
  },

  /* Humidifier */
  "levoit-lv600s": {
    name: "Levoit LV600S Smart Hybrid Humidifier",
    asin: LINK_PLACEHOLDER,
    note: "A warm and cool mist humidifier with a wide mouth tank you can get a hand into, which is what makes the weekly clean in this guide quick.",
  },
  "levoit-filters": {
    name: "Levoit Replacement Filters",
    asin: LINK_PLACEHOLDER,
    note: "Spare cartridges for Levoit units. A filter cannot be scrubbed back to life, so a spare on the shelf is what ends the musty smell for good.",
  },

  /* Oven */
  "easy-off": {
    name: "Easy-Off Heavy Duty Oven Cleaner",
    asin: LINK_PLACEHOLDER,
    note: "The commercial spray for the nights you cannot wait twelve hours for a baking soda paste. Window open, gloves on, and rinse twice before the oven is heated.",
  },

  /* Washing machine */
  "affresh-tablets": {
    name: "Affresh Washing Machine Cleaner Tablets 6-pack",
    asin: LINK_PLACEHOLDER,
    note: "A tablet dropped in the empty drum once a month. It dissolves slowly through a hot cycle and does the job of the vinegar and baking soda runs in one step.",
  },

  /* Cast iron */
  "lodge-set": {
    name: "Lodge 5-Piece Cast Iron Set",
    asin: LINK_PLACEHOLDER,
    note: "Pre seasoned skillet, griddle and Dutch oven. The replacement for a pan that is cracked, warped or pitted through, which no amount of scrubbing restores.",
  },
  "ringer-chainmail": {
    name: "The Ringer Chainmail Scrubber",
    asin: LINK_PLACEHOLDER,
    note: "Stainless chainmail that lifts stuck food without stripping the seasoning. The scrubber the maintenance step in this guide reaches for.",
  },

  /* Grout */
  "bissell-spinwave": {
    name: "Bissell SpinWave Plus",
    asin: LINK_PLACEHOLDER,
    note: "A powered spin mop with rotating pads. Does the morning rinse after an overnight soak faster than a string mop, without leaving solution pooled in the lines.",
  },
  "spin-scrubber": {
    name: "Cordless Electric Spin Scrubber",
    asin: "B0GWQ7249P",
    note: "A battery scrubber with a grout head on an extending handle. For the stubborn line that still wants a brush after the dwell, with your knees off the floor.",
  },

  /* Sneakers */
  "pink-miracle-kit": {
    name: "Pink Miracle Shoe Cleaner Kit",
    // The retired "sneaker-cleaning-kit" entry used ASIN B0G7G6R1MH. Reuse it here if that listing is the Pink Miracle kit.
    asin: LINK_PLACEHOLDER,
    note: "Cleaning solution and a brush in one kit. Covers canvas, leather and mesh, which is every material this guide walks through.",
  },

  /* Showerhead */
  "aquabliss-showerhead": {
    name: "AquaBliss High-Output Filtered Showerhead",
    asin: LINK_PLACEHOLDER,
    note: "A showerhead with a filter cartridge in the connection. Catches sediment and scale before the nozzles, and the cartridge is the part you swap instead of soaking.",
  },
  "clr-remover": {
    name: "CLR Calcium, Lime & Rust Remover",
    asin: LINK_PLACEHOLDER,
    note: "The commercial descaler for a head that one overnight vinegar soak did not clear. Gloves on and the bathroom ventilated.",
  },

  /* Microfiber couch (shares the Little Green above) */
  "upholstery-brush-set": {
    name: "Upholstery brush set",
    asin: LINK_PLACEHOLDER,
    note: "Soft bristle brushes in a few sizes for lifting the nap back up once a section dries. The step that makes an alcohol cleaned couch look restored.",
  },

  /* Baseboards */
  "baseboard-buddy": {
    name: "Baseboard Buddy with Extension Handle",
    asin: LINK_PLACEHOLDER,
    note: "A pad shaped to the molding on an extending handle, so the whole run gets wiped standing up.",
  },
} satisfies Record<string, AffiliateProduct>;

export type ProductKey = keyof typeof AFFILIATE_PRODUCTS;

const AMAZON_BASE = "https://www.amazon.com";

const isPlaceholder = (value: string | undefined): boolean =>
  !value ||
  value.trim() === "" ||
  value === LINK_PLACEHOLDER ||
  value === "PASTE_AFFILIATE_LINK_HERE";

/**
 * Build the outbound URL for a product key.
 *
 * Returns null for an unknown key, or for a product whose link has not been
 * pasted yet, so the renderer can fall back to plain text or hide the box.
 * Failing that way round is deliberate: a missing link is a small loss, a
 * link pointing at nothing is a broken page.
 */
export function affiliateUrl(key: string): string | null {
  const product = (AFFILIATE_PRODUCTS as Record<string, AffiliateProduct>)[key];
  if (!product) return null;

  if (!isPlaceholder(product.url)) {
    return product.url as string;
  }
  if (!isPlaceholder(product.asin)) {
    return `${AMAZON_BASE}/dp/${product.asin}?tag=${AMAZON_TAG}`;
  }
  if (product.search) {
    return `${AMAZON_BASE}/s?k=${encodeURIComponent(product.search)}&tag=${AMAZON_TAG}`;
  }
  return null;
}

/** Keys whose link is still the placeholder. Handy for a quick audit. */
export function productsMissingLinks(): string[] {
  return Object.keys(AFFILIATE_PRODUCTS).filter((key) => affiliateUrl(key) === null);
}

/** True for any URL that should be treated as a paid link. */
export function isAffiliateHref(href: string): boolean {
  return (
    href.startsWith("product:") ||
    /^https?:\/\/(www\.)?(amazon\.[a-z.]+|amzn\.to)\//i.test(href)
  );
}

/**
 * Whether a post will actually render a paid link or product box, which is
 * what decides if the disclosure shows. Checked against the fields that run
 * through `renderInlineLinks`, since those are the only places a link can
 * appear, plus the box tokens inside step bodies. A product whose link is
 * still the placeholder renders nothing, so it does not count: the disclosure
 * appears the moment the first real link does, and not before.
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

  if (/\]\(https?:\/\/(www\.)?(amazon\.|amzn\.to)/i.test(haystack)) return true;

  const keys = [...haystack.matchAll(/\]\(product:([a-z0-9-]+)\)|\{\{box:([a-z0-9-]+)/g)].map(
    (m) => m[1] ?? m[2]
  );
  return keys.some((key) => affiliateUrl(key) !== null);
}

/**
 * Shorter search-result title overrides, keyed by post slug.
 *
 * The on-page H1 (post.title in posts.ts) stays long and descriptive. Some of
 * those titles, once the " | TryCleaningHacks" brand suffix is appended, exceed
 * Google's ~60-character display limit and get truncated mid-phrase, hiding the
 * useful part of the title and hurting click-through.
 *
 * Only titles that overflow are listed here. `generateMetadata` uses this for
 * the <title> tag when present and falls back to post.title otherwise, so the
 * visible article heading is never changed.
 *
 * Keep every value short enough that "<value> | TryCleaningHacks" stays under
 * ~60 characters (roughly 41 characters or fewer for the value). A build-time
 * guard lives in scripts/audit-seo-titles is not required — keep values tight.
 */
export const seoTitles: Record<string, string> = {
  /* ── Existing overrides ─────────────────────────────────── */
  "how-to-deep-clean-your-mattress": "How to Deep Clean Your Mattress at Home",
  "how-to-clean-hardwood-floors": "How to Clean Hardwood Floors Properly",
  "how-to-organize-your-refrigerator": "How to Organize Your Refrigerator",
  "how-to-get-rid-of-maggots-in-trash-can": "How to Get Rid of Maggots in a Trash Can",
  "how-to-clean-a-dishwasher": "How to Clean a Dishwasher (Like New)",
  "how-to-clean-an-air-fryer": "How to Clean an Air Fryer, Inside & Out",
  "how-to-get-rid-of-bed-bugs-fast": "How to Get Rid of Bed Bugs Fast",
  "how-to-declutter-your-room": "How to Declutter Your Room Fast",
  "how-to-keep-flies-away-outdoors": "How to Keep Flies Away Outdoors",
  "how-to-clean-a-robot-vacuum": "How to Clean a Robot Vacuum",
  "how-to-clean-a-humidifier": "Clean a Humidifier & Stop White Dust",
  "how-to-clean-a-reusable-water-bottle": "How to Clean a Reusable Water Bottle",
  "how-to-organize-your-office-desk": "How to Organize Your Office Desk",
  "how-to-clean-your-closet": "How to Clean Your Closet (Top to Bottom)",
  "how-to-clean-an-ac-vent": "How to Clean an AC Vent the Safe Way",

  /* ── Listicles / ingredient hubs ────────────────────────── */
  "13-mind-blowing-listerine-hacks": "13 Surprising Listerine Cleaning Hacks",
  "7-game-changing-ultra-cleaning-hacks": "7 Deep-Cleaning Tricks That Save Hours",
  "8-incredible-vinegar-hacks": "8 Genius Vinegar Cleaning Hacks",
  "16-hydrogen-peroxide-cleaning-hacks": "16 Hydrogen Peroxide Cleaning Hacks",
  "12-shower-cleaning-hacks": "How to Deep Clean a Shower (10 Ways)",
  "5-dollar-store-hacks-you-should-know": "5 Dollar Store Cleaning Must-Haves",
  "30-cleaning-myths-you-should-be-wary-of": "30 Cleaning Myths to Stop Believing",
  "11-dawn-dish-soap-hacks-for-greasy-kitchens": "11 Dawn Dish Soap Cleaning Hacks",
  "9-laundry-room-cleaning-hacks-that-actually-save-time": "Clean Your Laundry Room in 30 Minutes",
  "10-kitchen-sink-detox-hacks-for-odor-free-results": "Get Rid of Kitchen Sink Odor (10 Fixes)",
  "15-bathroom-deep-clean-hacks-for-hotel-level-shine": "15 Hotel-Level Bathroom Cleaning Tips",
  "6-budget-cleaning-kits-you-can-build-in-20-minutes": "6 Budget Cleaning Kits Under $20",
  "18-quick-wins-for-busy-mornings": "18 Five-Minute Cleaning Tasks",
  "20-declutter-clean-pairing-hacks": "Declutter & Clean Checklist (20 Pairs)",
  "8-easy-wd40-cleaning-hacks": "8 Things You Can Clean With WD-40",
  "10-best-ways-to-combat-cockroaches": "How to Get Rid of Cockroaches Naturally",
  "10-genius-ways-to-make-your-house-smell-great": "10 Ways to Make Your House Smell Great",
  "12-microwave-cleaning-hacks-for-a-sparkling-kitchen": "How to Clean a Microwave (12 Methods)",
  "the-ultimate-weekly-cleaning-schedule-for-a-spotless-home": "Weekly Cleaning Schedule, Room by Room",
  "12-genius-rubbing-alcohol-cleaning-hacks": "12 Rubbing Alcohol Cleaning Hacks",
  "12-oven-cleaning-hacks-baked-on-grease": "12 Oven Hacks for Baked-On Grease",
  "10-borax-cleaning-hacks-that-actually-work": "10 Borax Cleaning Hacks That Work",
  "diy-all-natural-cleaning-sprays": "10 DIY All-Natural Cleaning Sprays",
  "diy-bathroom-cleaning-recipes": "8 DIY Bathroom Cleaning Recipes",
  "baseboard-cleaning-hacks-that-save-time": "10 Time-Saving Baseboard Hacks",

  /* ── How-to guides ──────────────────────────────────────── */
  "how-to-remove-hard-water-stains-from-glass-faucets-and-tiles": "Remove Hard Water Stains (Glass & Chrome)",
  "how-to-clean-grout-without-scrubbing": "Clean Grout Without Scrubbing (7 Ways)",
  "how-to-clean-an-oven-without-harsh-chemicals": "Clean an Oven Without Harsh Chemicals",
  "remove-hard-water-stains-from-toilet": "Remove Hard Water Stains From a Toilet",
  "how-to-clean-stainless-steel-appliances-without-streaks": "Clean Stainless Steel Without Streaks",
  "how-to-remove-mold-from-bathroom-caulk": "Remove Mold From Bathroom Caulk (8 Ways)",
  "how-to-clean-and-deodorize-garbage-disposal": "Clean & Deodorize a Garbage Disposal",
  "how-to-remove-pet-stains-and-odors-from-carpet": "Remove Pet Stains & Odors From Carpet",
  "best-paint-colors-to-hide-dust": "Best Paint Colors to Hide Dust",
  "best-floor-colors-to-hide-dust-and-dirt": "Best Floor Colors to Hide Dust & Dirt",
  "best-cabinet-colors-to-hide-fingerprints-and-dust": "Best Cabinet Colors to Hide Fingerprints",
  "how-to-remove-yellow-armpit-stains-from-shirts": "Remove Yellow Armpit Stains From Shirts",
  "how-to-whiten-yellow-pillows-washing-machine": "How to Whiten Yellow Pillows at Home",
  "how-to-clean-a-glass-stovetop-without-scratching": "Clean a Glass Stovetop Scratch-Free",
  "how-to-make-laundry-smell-good-after-washing": "Make Laundry Smell Good After Washing",
  "how-to-clean-leather-mold-safely": "How to Clean Mold Off Leather Safely",
  "how-to-sterilize-kitchen-sponge": "How to Sterilize a Kitchen Sponge",
  "how-to-clean-plastic-shower-curtain-liner-by-hand-and-in-a-washer": "Clean a Plastic Shower Curtain Liner",
  "how-to-clean-baseboards": "How to Clean Baseboards Fast",
  "how-to-rage-clean": "How to Rage Clean Your Whole House",
  "how-to-stop-losing-socks-in-the-washing-machine": "Stop Losing Socks in the Washer",
  "how-to-clean-a-showerhead": "How to Clean a Clogged Showerhead",
  "how-to-clean-a-washing-machine": "How to Clean a Washing Machine",
  "how-to-make-your-entire-home-smell-like-cinnamon": "Make Your Home Smell Like Cinnamon",
  "how-to-get-cooking-grease-smell-out-of-the-house": "Get Cooking Grease Smell Out of a House",
  "how-to-get-rid-of-fruit-flies-fast": "How to Get Rid of Fruit Flies Fast",
  "how-to-clean-a-coffee-maker": "How to Clean a Coffee Maker (Descale)",
  "how-to-clean-white-sneakers": "How to Clean White Sneakers Like New",
};

/**
 * Internal link map — connects related posts for SEO cross-linking.
 * Each key is a post slug; the value is an array of related slugs
 * (ordered by relevance, max 4 per post).
 */
export const internalLinks: Record<string, string[]> = {
  /* ─── Listerine ─── */
  "13-mind-blowing-listerine-hacks": [
    "10-genius-ways-to-make-your-house-smell-great",
    "15-bathroom-deep-clean-hacks-for-hotel-level-shine",
    "12-genius-rubbing-alcohol-cleaning-hacks",
    "10-kitchen-sink-detox-hacks-for-odor-free-results",
  ],

  /* ─── Deep Clean ─── */
  "7-game-changing-ultra-cleaning-hacks": [
    "the-ultimate-weekly-cleaning-schedule-for-a-spotless-home",
    "18-quick-wins-for-busy-mornings",
    "20-declutter-clean-pairing-hacks",
    "15-bathroom-deep-clean-hacks-for-hotel-level-shine",
  ],

  /* ─── Baking Soda ─── */
  "14-ways-to-use-baking-soda-in-your-house": [
    "8-incredible-vinegar-hacks",
    "how-to-clean-grout-without-scrubbing",
    "how-to-clean-an-oven-without-harsh-chemicals",
    "remove-hard-water-stains-from-toilet",
  ],

  /* ─── Vinegar ─── */
  "8-incredible-vinegar-hacks": [
    "14-ways-to-use-baking-soda-in-your-house",
    "how-to-remove-hard-water-stains-from-glass-faucets-and-tiles",
    "remove-hard-water-stains-from-toilet",
    "12-shower-cleaning-hacks",
  ],

  /* ─── Hydrogen Peroxide ─── */
  "16-hydrogen-peroxide-cleaning-hacks": [
    "12-genius-rubbing-alcohol-cleaning-hacks",
    "how-to-remove-mold-from-bathroom-caulk",
    "how-to-clean-grout-without-scrubbing",
    "how-to-remove-pet-stains-and-odors-from-carpet",
  ],

  /* ─── Shower Cleaning ─── */
  "12-shower-cleaning-hacks": [
    "15-bathroom-deep-clean-hacks-for-hotel-level-shine",
    "how-to-remove-mold-from-bathroom-caulk",
    "how-to-clean-grout-without-scrubbing",
    "how-to-remove-hard-water-stains-from-glass-faucets-and-tiles",
  ],

  /* ─── Dollar Store ─── */
  "5-dollar-store-hacks-you-should-know": [
    "6-budget-cleaning-kits-you-can-build-in-20-minutes",
    "18-quick-wins-for-busy-mornings",
    "10-genius-toothpaste-cleaning-hacks-you-never-knew",
    "7-game-changing-ultra-cleaning-hacks",
  ],

  /* ─── Cleaning Myths ─── */
  "30-cleaning-myths-you-should-be-wary-of": [
    "the-ultimate-weekly-cleaning-schedule-for-a-spotless-home",
    "7-game-changing-ultra-cleaning-hacks",
    "14-ways-to-use-baking-soda-in-your-house",
    "8-incredible-vinegar-hacks",
  ],

  /* ─── Dawn Dish Soap ─── */
  "11-dawn-dish-soap-hacks-for-greasy-kitchens": [
    "10-kitchen-sink-detox-hacks-for-odor-free-results",
    "how-to-clean-an-oven-without-harsh-chemicals",
    "how-to-clean-stainless-steel-appliances-without-streaks",
    "12-microwave-cleaning-hacks-for-a-sparkling-kitchen",
  ],

  /* ─── Laundry Room ─── */
  "9-laundry-room-cleaning-hacks-that-actually-save-time": [
    "the-ultimate-weekly-cleaning-schedule-for-a-spotless-home",
    "14-ways-to-use-baking-soda-in-your-house",
    "10-genius-ways-to-make-your-house-smell-great",
    "18-quick-wins-for-busy-mornings",
  ],

  /* ─── Kitchen Sink Odor ─── */
  "10-kitchen-sink-detox-hacks-for-odor-free-results": [
    "how-to-clean-and-deodorize-garbage-disposal",
    "11-dawn-dish-soap-hacks-for-greasy-kitchens",
    "14-ways-to-use-baking-soda-in-your-house",
    "10-genius-ways-to-make-your-house-smell-great",
  ],

  /* ─── Bathroom Deep Clean ─── */
  "15-bathroom-deep-clean-hacks-for-hotel-level-shine": [
    "12-shower-cleaning-hacks",
    "remove-hard-water-stains-from-toilet",
    "how-to-remove-mold-from-bathroom-caulk",
    "how-to-clean-grout-without-scrubbing",
  ],

  /* ─── Budget Kits ─── */
  "6-budget-cleaning-kits-you-can-build-in-20-minutes": [
    "5-dollar-store-hacks-you-should-know",
    "14-ways-to-use-baking-soda-in-your-house",
    "8-incredible-vinegar-hacks",
    "18-quick-wins-for-busy-mornings",
  ],

  /* ─── Quick Wins ─── */
  "18-quick-wins-for-busy-mornings": [
    "the-ultimate-weekly-cleaning-schedule-for-a-spotless-home",
    "7-game-changing-ultra-cleaning-hacks",
    "5-dollar-store-hacks-you-should-know",
    "10-genius-toothpaste-cleaning-hacks-you-never-knew",
  ],

  /* ─── Declutter ─── */
  "20-declutter-clean-pairing-hacks": [
    "7-game-changing-ultra-cleaning-hacks",
    "the-ultimate-weekly-cleaning-schedule-for-a-spotless-home",
    "18-quick-wins-for-busy-mornings",
    "9-laundry-room-cleaning-hacks-that-actually-save-time",
  ],

  /* ─── WD-40 ─── */
  "8-easy-wd40-cleaning-hacks": [
    "how-to-remove-hard-water-stains-from-glass-faucets-and-tiles",
    "10-genius-toothpaste-cleaning-hacks-you-never-knew",
    "8-incredible-vinegar-hacks",
    "how-to-clean-stainless-steel-appliances-without-streaks",
  ],

  /* ─── Pest Control ─── */
  "10-best-ways-to-combat-cockroaches": [
    "10-kitchen-sink-detox-hacks-for-odor-free-results",
    "7-game-changing-ultra-cleaning-hacks",
    "14-ways-to-use-baking-soda-in-your-house",
    "10-genius-ways-to-make-your-house-smell-great",
  ],

  /* ─── Home Fragrance ─── */
  "10-genius-ways-to-make-your-house-smell-great": [
    "13-mind-blowing-listerine-hacks",
    "14-ways-to-use-baking-soda-in-your-house",
    "10-kitchen-sink-detox-hacks-for-odor-free-results",
    "how-to-clean-and-deodorize-garbage-disposal",
  ],

  /* ─── Vacuum Tips ─── */
  "10-fascinating-vacuum-hacks-you-need-to-know": [
    "7-game-changing-ultra-cleaning-hacks",
    "how-to-remove-pet-stains-and-odors-from-carpet",
    "the-ultimate-weekly-cleaning-schedule-for-a-spotless-home",
    "20-declutter-clean-pairing-hacks",
  ],

  /* ─── Microwave ─── */
  "12-microwave-cleaning-hacks-for-a-sparkling-kitchen": [
    "how-to-clean-an-oven-without-harsh-chemicals",
    "11-dawn-dish-soap-hacks-for-greasy-kitchens",
    "8-incredible-vinegar-hacks",
    "how-to-clean-stainless-steel-appliances-without-streaks",
  ],

  /* ─── Toothpaste ─── */
  "10-genius-toothpaste-cleaning-hacks-you-never-knew": [
    "14-ways-to-use-baking-soda-in-your-house",
    "8-easy-wd40-cleaning-hacks",
    "how-to-remove-hard-water-stains-from-glass-faucets-and-tiles",
    "6-budget-cleaning-kits-you-can-build-in-20-minutes",
  ],

  /* ─── Weekly Schedule ─── */
  "the-ultimate-weekly-cleaning-schedule-for-a-spotless-home": [
    "7-game-changing-ultra-cleaning-hacks",
    "18-quick-wins-for-busy-mornings",
    "20-declutter-clean-pairing-hacks",
    "15-bathroom-deep-clean-hacks-for-hotel-level-shine",
  ],

  /* ─── Rubbing Alcohol ─── */
  "12-genius-rubbing-alcohol-cleaning-hacks": [
    "16-hydrogen-peroxide-cleaning-hacks",
    "13-mind-blowing-listerine-hacks",
    "8-incredible-vinegar-hacks",
    "how-to-clean-stainless-steel-appliances-without-streaks",
  ],

  /* ─── Hard Water (Glass/Faucets) ─── */
  "how-to-remove-hard-water-stains-from-glass-faucets-and-tiles": [
    "remove-hard-water-stains-from-toilet",
    "8-incredible-vinegar-hacks",
    "12-shower-cleaning-hacks",
    "how-to-clean-grout-without-scrubbing",
  ],

  /* ─── Grout Cleaning ─── */
  "how-to-clean-grout-without-scrubbing": [
    "15-bathroom-deep-clean-hacks-for-hotel-level-shine",
    "12-shower-cleaning-hacks",
    "16-hydrogen-peroxide-cleaning-hacks",
    "14-ways-to-use-baking-soda-in-your-house",
  ],

  /* ─── Oven Cleaning ─── */
  "how-to-clean-an-oven-without-harsh-chemicals": [
    "12-microwave-cleaning-hacks-for-a-sparkling-kitchen",
    "11-dawn-dish-soap-hacks-for-greasy-kitchens",
    "14-ways-to-use-baking-soda-in-your-house",
    "how-to-clean-stainless-steel-appliances-without-streaks",
  ],

  /* ─── Hard Water (Toilet) ─── */
  "remove-hard-water-stains-from-toilet": [
    "how-to-remove-hard-water-stains-from-glass-faucets-and-tiles",
    "15-bathroom-deep-clean-hacks-for-hotel-level-shine",
    "8-incredible-vinegar-hacks",
    "how-to-remove-mold-from-bathroom-caulk",
  ],

  /* ─── Stainless Steel ─── */
  "how-to-clean-stainless-steel-appliances-without-streaks": [
    "12-microwave-cleaning-hacks-for-a-sparkling-kitchen",
    "how-to-clean-an-oven-without-harsh-chemicals",
    "11-dawn-dish-soap-hacks-for-greasy-kitchens",
    "8-incredible-vinegar-hacks",
  ],

  /* ─── Bathroom Caulk Mold ─── */
  "how-to-remove-mold-from-bathroom-caulk": [
    "12-shower-cleaning-hacks",
    "15-bathroom-deep-clean-hacks-for-hotel-level-shine",
    "16-hydrogen-peroxide-cleaning-hacks",
    "remove-hard-water-stains-from-toilet",
  ],

  /* ─── Garbage Disposal ─── */
  "how-to-clean-and-deodorize-garbage-disposal": [
    "10-kitchen-sink-detox-hacks-for-odor-free-results",
    "11-dawn-dish-soap-hacks-for-greasy-kitchens",
    "14-ways-to-use-baking-soda-in-your-house",
    "10-genius-ways-to-make-your-house-smell-great",
  ],

  /* ─── Pet Stains ─── */
  "how-to-remove-pet-stains-and-odors-from-carpet": [
    "14-ways-to-use-baking-soda-in-your-house",
    "16-hydrogen-peroxide-cleaning-hacks",
    "10-genius-ways-to-make-your-house-smell-great",
    "10-fascinating-vacuum-hacks-you-need-to-know",
  ],
};

/**
 * Internal link map, connects related posts for SEO cross-linking.
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
    "baseboard-cleaning-hacks-that-save-time",
    "the-ultimate-weekly-cleaning-schedule-for-a-spotless-home",
    "18-quick-wins-for-busy-mornings",
    "20-declutter-clean-pairing-hacks",
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
    "how-to-remove-limescale-from-a-kettle",
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
    "how-to-make-laundry-smell-good-after-washing",
    "how-to-get-cigarette-smell-out-of-clothes",
    "14-ways-to-use-baking-soda-in-your-house",
    "10-genius-ways-to-make-your-house-smell-great",
  ],

  /* ─── Kitchen Sink Odor ─── */
  "10-kitchen-sink-detox-hacks-for-odor-free-results": [
    "how-to-sterilize-kitchen-sponge",
    "how-to-clean-and-deodorize-garbage-disposal",
    "11-dawn-dish-soap-hacks-for-greasy-kitchens",
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
    "how-to-get-rid-of-maggots-in-trash-can",
    "10-kitchen-sink-detox-hacks-for-odor-free-results",
    "7-game-changing-ultra-cleaning-hacks",
    "14-ways-to-use-baking-soda-in-your-house",
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
    "how-to-clean-leather-mold-safely",
    "12-shower-cleaning-hacks",
    "16-hydrogen-peroxide-cleaning-hacks",
    "15-bathroom-deep-clean-hacks-for-hotel-level-shine",
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

  /* ─── Oven Cleaning Hacks ─── */
  "12-oven-cleaning-hacks-baked-on-grease": [
    "how-to-clean-an-oven-without-harsh-chemicals",
    "14-ways-to-use-baking-soda-in-your-house",
    "11-dawn-dish-soap-hacks-for-greasy-kitchens",
    "8-incredible-vinegar-hacks",
    "12-microwave-cleaning-hacks-for-a-sparkling-kitchen",
  ],

  /* ─── DIY All-Natural Sprays ─── */
  "diy-all-natural-cleaning-sprays": [
    "diy-bathroom-cleaning-recipes",
    "8-incredible-vinegar-hacks",
    "14-ways-to-use-baking-soda-in-your-house",
    "10-genius-ways-to-make-your-house-smell-great",
  ],

  /* ─── DIY Bathroom Recipes ─── */
  "diy-bathroom-cleaning-recipes": [
    "diy-all-natural-cleaning-sprays",
    "12-shower-cleaning-hacks",
    "15-bathroom-deep-clean-hacks-for-hotel-level-shine",
    "how-to-remove-mold-from-bathroom-caulk",
  ],

  /* ─── Borax Cleaning ─── */
  "10-borax-cleaning-hacks-that-actually-work": [
    "baseboard-cleaning-hacks-that-save-time",
    "how-to-clean-grout-without-scrubbing",
    "16-hydrogen-peroxide-cleaning-hacks",
    "14-ways-to-use-baking-soda-in-your-house",
  ],

  /* ─── Whiten Yellow Pillows ─── */
  "how-to-whiten-yellow-pillows-washing-machine": [
    "9-laundry-room-cleaning-hacks-that-actually-save-time",
    "how-to-remove-yellow-armpit-stains-from-shirts",
    "14-ways-to-use-baking-soda-in-your-house",
    "8-incredible-vinegar-hacks",
  ],

  /* ─── Glass Stovetop ─── */
  "how-to-clean-a-glass-stovetop-without-scratching": [
    "11-dawn-dish-soap-hacks-for-greasy-kitchens",
    "12-oven-cleaning-hacks-baked-on-grease",
    "8-incredible-vinegar-hacks",
    "how-to-clean-stainless-steel-appliances-without-streaks",
  ],

  /* ─── Mattress Deep Clean ─── */
  "how-to-deep-clean-your-mattress": [
    "16-hydrogen-peroxide-cleaning-hacks",
    "14-ways-to-use-baking-soda-in-your-house",
    "how-to-remove-pet-stains-and-odors-from-carpet",
    "7-game-changing-ultra-cleaning-hacks",
  ],

  /* ─── Hardwood Floors ─── */
  "how-to-clean-hardwood-floors": [
    "8-incredible-vinegar-hacks",
    "how-to-remove-pet-stains-and-odors-from-carpet",
    "10-fascinating-vacuum-hacks-you-need-to-know",
    "the-ultimate-weekly-cleaning-schedule-for-a-spotless-home",
  ],

  /* ─── Armpit Stains ─── */
  "how-to-remove-yellow-armpit-stains-from-shirts": [
    "how-to-whiten-yellow-pillows-washing-machine",
    "9-laundry-room-cleaning-hacks-that-actually-save-time",
    "16-hydrogen-peroxide-cleaning-hacks",
    "14-ways-to-use-baking-soda-in-your-house",
  ],

  /* ─── Best Paint Colors (dust) ─── */
  "best-paint-colors-to-hide-dust": [
    "best-floor-colors-to-hide-dust-and-dirt",
    "best-cabinet-colors-to-hide-fingerprints-and-dust",
    "the-ultimate-weekly-cleaning-schedule-for-a-spotless-home",
    "18-quick-wins-for-busy-mornings",
  ],

  /* ─── Best Floor Colors (dust) ─── */
  "best-floor-colors-to-hide-dust-and-dirt": [
    "best-paint-colors-to-hide-dust",
    "best-cabinet-colors-to-hide-fingerprints-and-dust",
    "how-to-clean-hardwood-floors",
    "10-fascinating-vacuum-hacks-you-need-to-know",
  ],

  /* ─── Best Cabinet Colors (fingerprints) ─── */
  "best-cabinet-colors-to-hide-fingerprints-and-dust": [
    "best-paint-colors-to-hide-dust",
    "best-floor-colors-to-hide-dust-and-dirt",
    "11-dawn-dish-soap-hacks-for-greasy-kitchens",
    "how-to-clean-stainless-steel-appliances-without-streaks",
  ],

  /* ─── Maggots in Trash Can ─── */
  "how-to-get-rid-of-maggots-in-trash-can": [
    "10-best-ways-to-combat-cockroaches",
    "how-to-clean-and-deodorize-garbage-disposal",
    "10-genius-ways-to-make-your-house-smell-great",
    "10-kitchen-sink-detox-hacks-for-odor-free-results",
  ],

  /* ─── Dishwasher ─── */
  "how-to-clean-a-dishwasher": [
    "how-to-clean-an-air-fryer",
    "12-microwave-cleaning-hacks-for-a-sparkling-kitchen",
    "11-dawn-dish-soap-hacks-for-greasy-kitchens",
    "8-incredible-vinegar-hacks",
  ],

  /* ─── Air Fryer ─── */
  "how-to-clean-an-air-fryer": [
    "how-to-clean-a-dishwasher",
    "12-microwave-cleaning-hacks-for-a-sparkling-kitchen",
    "how-to-clean-an-oven-without-harsh-chemicals",
    "11-dawn-dish-soap-hacks-for-greasy-kitchens",
  ],

  /* ─── Cigarette Smell Out of Clothes ─── */
  "how-to-get-cigarette-smell-out-of-clothes": [
    "how-to-make-laundry-smell-good-after-washing",
    "9-laundry-room-cleaning-hacks-that-actually-save-time",
    "14-ways-to-use-baking-soda-in-your-house",
    "how-to-remove-pet-stains-and-odors-from-carpet",
  ],

  /* ─── Limescale from Kettle ─── */
  "how-to-remove-limescale-from-a-kettle": [
    "8-incredible-vinegar-hacks",
    "how-to-remove-hard-water-stains-from-glass-faucets-and-tiles",
    "remove-hard-water-stains-from-toilet",
    "how-to-clean-a-dishwasher",
  ],

  /* ─── Wooden Cutting Board ─── */
  "how-to-clean-a-wooden-cutting-board": [
    "13-mind-blowing-listerine-hacks",
    "11-dawn-dish-soap-hacks-for-greasy-kitchens",
    "14-ways-to-use-baking-soda-in-your-house",
    "how-to-clean-a-dishwasher",
  ],

  /* ─── Laundry Smell ─── */
  "how-to-make-laundry-smell-good-after-washing": [
    "9-laundry-room-cleaning-hacks-that-actually-save-time",
    "how-to-get-cigarette-smell-out-of-clothes",
    "10-genius-ways-to-make-your-house-smell-great",
    "how-to-whiten-yellow-pillows-washing-machine",
  ],

  /* ─── Leather Mold ─── */
  "how-to-clean-leather-mold-safely": [
    "how-to-remove-mold-from-bathroom-caulk",
    "16-hydrogen-peroxide-cleaning-hacks",
    "12-genius-rubbing-alcohol-cleaning-hacks",
    "7-game-changing-ultra-cleaning-hacks",
  ],

  /* ─── Kitchen Sponge ─── */
  "how-to-sterilize-kitchen-sponge": [
    "how-to-clean-a-wooden-cutting-board",
    "10-kitchen-sink-detox-hacks-for-odor-free-results",
    "11-dawn-dish-soap-hacks-for-greasy-kitchens",
    "14-ways-to-use-baking-soda-in-your-house",
  ],

  /* ─── Plastic Shower Curtain Liner ─── */
  "how-to-clean-plastic-shower-curtain-liner-by-hand-and-in-a-washer": [
    "12-shower-cleaning-hacks",
    "15-bathroom-deep-clean-hacks-for-hotel-level-shine",
    "how-to-remove-mold-from-bathroom-caulk",
    "diy-bathroom-cleaning-recipes",
  ],

  /* ─── Ketchup ─── */
  "how-to-clean-with-ketchup": [
    "10-genius-toothpaste-cleaning-hacks-you-never-knew",
    "how-to-clean-stainless-steel-appliances-without-streaks",
    "8-incredible-vinegar-hacks",
    "11-dawn-dish-soap-hacks-for-greasy-kitchens",
  ],

  /* ─── Cast Iron Skillet ─── */
  "how-to-deep-clean-a-cast-iron-skillet": [
    "how-to-clean-with-ketchup",
    "how-to-clean-a-wooden-cutting-board",
    "11-dawn-dish-soap-hacks-for-greasy-kitchens",
    "how-to-clean-a-glass-stovetop-without-scratching",
  ],

  /* ─── Baseboards ─── */
  "how-to-clean-baseboards": [
    "best-paint-colors-to-hide-dust",
    "how-to-clean-hardwood-floors",
    "7-game-changing-ultra-cleaning-hacks",
    "the-ultimate-weekly-cleaning-schedule-for-a-spotless-home",
  ],

  /* ─── Bathroom Drain Smell ─── */
  "how-to-clean-a-bathroom-drain-that-smells": [
    "how-to-clean-and-deodorize-garbage-disposal",
    "10-kitchen-sink-detox-hacks-for-odor-free-results",
    "15-bathroom-deep-clean-hacks-for-hotel-level-shine",
    "14-ways-to-use-baking-soda-in-your-house",
  ],

  /* ─── Declutter Your Room ─── */
  "how-to-declutter-your-room": [
    "20-declutter-clean-pairing-hacks",
    "7-game-changing-ultra-cleaning-hacks",
    "18-quick-wins-for-busy-mornings",
    "the-ultimate-weekly-cleaning-schedule-for-a-spotless-home",
  ],

  /* ─── Keep Flies Away Outdoors ─── */
  "how-to-keep-flies-away-outdoors": [
    "how-to-get-rid-of-maggots-in-trash-can",
    "10-best-ways-to-combat-cockroaches",
    "diy-all-natural-cleaning-sprays",
    "10-genius-ways-to-make-your-house-smell-great",
  ],

  /* ─── Organize Refrigerator ─── */
  "how-to-organize-your-refrigerator": [
    "how-to-clean-a-dishwasher",
    "7-game-changing-ultra-cleaning-hacks",
    "the-ultimate-weekly-cleaning-schedule-for-a-spotless-home",
    "how-to-clean-and-deodorize-garbage-disposal",
  ],

  /* ─── Rage Clean ─── */
  "how-to-rage-clean": [
    "7-game-changing-ultra-cleaning-hacks",
    "18-quick-wins-for-busy-mornings",
    "the-ultimate-weekly-cleaning-schedule-for-a-spotless-home",
    "11-dawn-dish-soap-hacks-for-greasy-kitchens",
  ],

  /* ─── Lost Socks ─── */
  "how-to-stop-losing-socks-in-the-washing-machine": [
    "9-laundry-room-cleaning-hacks-that-actually-save-time",
    "how-to-make-laundry-smell-good-after-washing",
    "how-to-whiten-yellow-pillows-washing-machine",
    "how-to-remove-yellow-armpit-stains-from-shirts",
  ],

  /* ─── Clean Showerhead ─── */
  "how-to-clean-a-showerhead": [
    "12-shower-cleaning-hacks",
    "15-bathroom-deep-clean-hacks-for-hotel-level-shine",
    "how-to-remove-hard-water-stains-from-glass-faucets-and-tiles",
    "how-to-remove-limescale-from-a-kettle",
  ],

  /* ─── Bed Bugs ─── */
  "how-to-get-rid-of-bed-bugs-fast": [
    "how-to-deep-clean-your-mattress",
    "10-best-ways-to-combat-cockroaches",
    "how-to-get-rid-of-maggots-in-trash-can",
    "how-to-keep-flies-away-outdoors",
  ],

  /* ─── Clean Washing Machine ─── */
  "how-to-clean-a-washing-machine": [
    "how-to-whiten-yellow-pillows-washing-machine",
    "how-to-make-laundry-smell-good-after-washing",
    "9-laundry-room-cleaning-hacks-that-actually-save-time",
    "how-to-stop-losing-socks-in-the-washing-machine",
  ],
  /* ─── 10 Baseboard Cleaning Hacks That Actually Save Time and Your Back ─── */
  "baseboard-cleaning-hacks-that-save-time": [
    "7-game-changing-ultra-cleaning-hacks",
    "10-borax-cleaning-hacks-that-actually-work",
    "how-to-clean-a-dishwasher",
    "10-fascinating-vacuum-hacks-you-need-to-know",
  ],

  /* ─── How to Get Onion Smell Out of the House ─── */
  "how-to-get-onions-smell-out-of-the-house": [
    "how-to-get-garlic-smell-out-of-the-house",
    "10-genius-ways-to-make-your-house-smell-great",
    "10-kitchen-sink-detox-hacks-for-odor-free-results",
    "how-to-make-your-entire-home-smell-like-cinnamon",
  ],

  /* ─── How to Get Garlic Smell Out of the House ─── */
  "how-to-get-garlic-smell-out-of-the-house": [
    "how-to-get-onions-smell-out-of-the-house",
    "how-to-get-fish-smell-out-of-the-house",
    "10-genius-ways-to-make-your-house-smell-great",
    "10-kitchen-sink-detox-hacks-for-odor-free-results",
  ],

  /* ─── How to Get Fish Smell Out of the House ─── */
  "how-to-get-fish-smell-out-of-the-house": [
    "how-to-get-cooking-grease-smell-out-of-the-house",
    "how-to-get-garlic-smell-out-of-the-house",
    "10-kitchen-sink-detox-hacks-for-odor-free-results",
    "how-to-make-your-entire-home-smell-like-cinnamon",
  ],

  /* ─── How to Get Cooking Grease Smell Out of the House ─── */
  "how-to-get-cooking-grease-smell-out-of-the-house": [
    "11-dawn-dish-soap-hacks-for-greasy-kitchens",
    "12-oven-cleaning-hacks-baked-on-grease",
    "how-to-get-fish-smell-out-of-the-house",
    "10-genius-ways-to-make-your-house-smell-great",
  ],

  /* ─── How to Deep Clean a Plunger ─── */
  "how-to-deep-clean-a-plunger": [
    "15-bathroom-deep-clean-hacks-for-hotel-level-shine",
    "diy-bathroom-cleaning-recipes",
    "how-to-clean-a-bathroom-drain-that-smells",
    "remove-hard-water-stains-from-toilet",
  ],

  /* ─── How to Make Your Entire Home Smell Like Cinnamon ─── */
  "how-to-make-your-entire-home-smell-like-cinnamon": [
    "10-genius-ways-to-make-your-house-smell-great",
    "how-to-get-onions-smell-out-of-the-house",
    "how-to-make-laundry-smell-good-after-washing",
    "diy-all-natural-cleaning-sprays",
  ],

};

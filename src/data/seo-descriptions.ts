/**
 * Search-result meta descriptions, keyed by post slug.
 *
 * Why this file exists: the on-page `excerpt` in posts.ts is written as an
 * engaging narrative hook (200-600 characters) for the article header and
 * cards. That is far too long for a Google search snippet, which truncates at
 * ~155-160 characters, and it buries the keyword behind a personal anecdote.
 *
 * Each entry below is a tight, keyword-front-loaded description (~150-160
 * chars) optimized for click-through from search results. `generateMetadata`
 * uses this when present and falls back to the post excerpt otherwise, so the
 * on-page excerpt is never changed.
 *
 * Keep every value under ~160 characters and lead with the primary keyword.
 */
export const seoDescriptions: Record<string, string> = {
  "13-mind-blowing-listerine-hacks":
    "Listerine isn't just for your mouth. 13 tested ways to clean, deodorize, and disinfect your home with it, plus the surfaces you should avoid.",
  "7-game-changing-ultra-cleaning-hacks":
    "7 deep-cleaning tricks that cut my cleaning time nearly in half, including the pro routine, the right order, and the mistake that wastes the most time.",
  "14-ways-to-use-baking-soda-in-your-house":
    "14 proven ways to clean with baking soda, from sinks and ovens to carpets and laundry, plus exactly where it works best and where to skip it.",
  "8-incredible-vinegar-hacks":
    "Clean almost anything with white vinegar using these 8 tested methods, plus the surfaces vinegar can permanently damage if you use it wrong.",
  "16-hydrogen-peroxide-cleaning-hacks":
    "16 ways to clean and disinfect with cheap 3% hydrogen peroxide, from grout and laundry to cutting boards, plus safe-use tips that actually work.",
  "12-shower-cleaning-hacks":
    "How to deep clean a shower the easy way: 10 proven methods for soap scum, glass, grout, and mildew, plus the order that saves the most scrubbing.",
  "5-dollar-store-hacks-you-should-know":
    "5 dollar-store cleaning products that genuinely work as well as name brands, tested side by side, plus the cheap buys that aren't worth your money.",
  "30-cleaning-myths-you-should-be-wary-of":
    "30 common cleaning myths debunked, from bleach-on-grease to vinegar-on-everything, so you stop wasting time and damaging your surfaces.",
  "11-dawn-dish-soap-hacks-for-greasy-kitchens":
    "11 surprising ways to use Dawn dish soap beyond dishes, from greasy stovetops to laundry stains and floors, with simple dilution tips.",
  "9-laundry-room-cleaning-hacks-that-actually-save-time":
    "Clean your whole laundry room in under 30 minutes with this room-by-room routine, including the washer, dryer, lint traps, and hidden grime.",
  "10-kitchen-sink-detox-hacks-for-odor-free-results":
    "How to get rid of kitchen sink odor for good with 10 easy fixes for the drain, disposal, and P-trap, plus what actually causes the smell.",
  "15-bathroom-deep-clean-hacks-for-hotel-level-shine":
    "15 bathroom cleaning tips for a hotel-level shine, covering tile, glass, grout, and fixtures, plus the finishing touches that make it feel new.",
  "6-budget-cleaning-kits-you-can-build-in-20-minutes":
    "Build 6 budget cleaning kits for under $20 each, organized by room, so the right supplies are always within reach when you need them.",
  "18-quick-wins-for-busy-mornings":
    "18 quick cleaning tasks you can finish in 5 minutes or less, perfect for busy mornings, that keep your home tidy with almost no effort.",
  "20-declutter-clean-pairing-hacks":
    "A complete declutter-and-clean checklist with 20 room pairings, so you tidy and clean in one pass instead of doing the same space twice.",
  "8-easy-wd40-cleaning-hacks":
    "8 surprising things you can clean with WD-40, from glass shower doors to crayon marks and sticky residue, plus where you should never use it.",
  "10-best-ways-to-combat-cockroaches":
    "How to get rid of cockroaches naturally with 10 effective methods, from bait and gel to prevention, so they leave and don't come back.",
  "10-genius-ways-to-make-your-house-smell-great":
    "10 easy ways to make your house smell amazing all day without artificial sprays, from simmer pots to removing odors at the source.",
  "10-fascinating-vacuum-hacks-you-need-to-know":
    "10 vacuum cleaning tips most people miss, from the right technique to attachments and settings, so you finally pick up the dirt you walk on.",
  "12-microwave-cleaning-hacks-for-a-sparkling-kitchen":
    "How to clean a microwave inside and out with 12 easy methods, from the steam-and-wipe trick to degreasing the door, vents, and turntable.",
  "10-genius-toothpaste-cleaning-hacks-you-never-knew":
    "10 things you can clean with plain white toothpaste, from silver and headlights to scuffed walls, plus which versions to use and which to avoid.",
  "the-ultimate-weekly-cleaning-schedule-for-a-spotless-home":
    "A complete weekly cleaning schedule broken down room by room and day by day, so you keep a spotless home without ever doing it all at once.",
  "12-genius-rubbing-alcohol-cleaning-hacks":
    "12 ways to clean and disinfect with rubbing alcohol, from electronics and stainless steel to streak-free glass, plus surfaces to keep it off.",
  "how-to-remove-hard-water-stains-from-glass-faucets-and-tiles":
    "How to remove hard water stains from glass, faucets, and tiles, even years-old buildup, with proven methods and tips to stop them coming back.",
  "how-to-clean-grout-without-scrubbing":
    "How to clean grout without scrubbing using 7 easy methods that let dwell time do the work, so dingy lines come clean with almost no effort.",
  "how-to-clean-an-oven-without-harsh-chemicals":
    "How to clean an oven without harsh chemicals using 8 natural methods, including a baking soda paste that lifts baked-on grease overnight.",
  "remove-hard-water-stains-from-toilet":
    "How to remove hard water stains and mineral rings from a toilet with 7 proven methods, even thick buildup, without scrubbing or scratching.",
  "how-to-clean-stainless-steel-appliances-without-streaks":
    "How to clean stainless steel appliances without streaks using 9 methods, plus the right direction to wipe and what to use for a lasting shine.",
  "how-to-remove-mold-from-bathroom-caulk":
    "How to remove mold and mildew from bathroom caulk with 8 methods, from bleach gels to homemade paste, plus how to stop it from growing back.",
  "how-to-clean-and-deodorize-garbage-disposal":
    "How to clean and deodorize a garbage disposal with 10 easy methods, plus the real source of the lingering smell that most people miss.",
  "how-to-remove-pet-stains-and-odors-from-carpet":
    "How to remove pet stains and odors from carpet with 8 proven methods, including the right way to treat old stains so the smell doesn't return.",
  "12-oven-cleaning-hacks-baked-on-grease":
    "12 oven cleaning hacks that cut through baked-on grease fast, from steam tricks to baking soda paste, so even a neglected oven comes clean.",
  "best-paint-colors-to-hide-dust":
    "The best paint colors to hide dust and make your home look cleaner longer, plus the shades and finishes that show every speck of it.",
  "best-floor-colors-to-hide-dust-and-dirt":
    "The best floor colors to hide dust, dirt, and pet hair in busy homes, plus the flooring shades and finishes that show the most mess.",
  "best-cabinet-colors-to-hide-fingerprints-and-dust":
    "The best cabinet colors and finishes to hide fingerprints, dust, and smudges, so your kitchen looks clean between wipe-downs.",
  "diy-all-natural-cleaning-sprays":
    "10 DIY all-natural cleaning spray recipes you can make at home with simple ingredients, tested for real results on everyday messes.",
  "diy-bathroom-cleaning-recipes":
    "8 DIY bathroom cleaning recipes that work better than store-bought, for tile, grout, glass, and fixtures, using simple kitchen ingredients.",
  "how-to-deep-clean-your-mattress":
    "How to deep clean your mattress at home to remove dust mites, sweat, stains, and odors, with a simple step-by-step routine that actually works.",
  "how-to-clean-hardwood-floors":
    "How to clean hardwood floors the right way with 9 rules that prevent dullness and water damage, so your floors stay shiny for years.",
  "how-to-remove-yellow-armpit-stains-from-shirts":
    "How to remove yellow armpit stains from shirts with 5 tested methods, plus the common treatments that actually set the stain in deeper.",
  "10-borax-cleaning-hacks-that-actually-work":
    "10 borax cleaning hacks that actually work, from laundry boosting to scrubbing pastes and drain care, plus safe-use tips you should know.",
  "how-to-whiten-yellow-pillows-washing-machine":
    "How to whiten yellow pillows in the washing machine with a simple booster mix that lifts sweat and saliva stains and brings back bright white.",
  "how-to-clean-a-glass-stovetop-without-scratching":
    "How to clean a glass stovetop without scratching it, including how to safely remove burnt-on residue with baking soda and a razor scraper.",
  "how-to-get-rid-of-maggots-in-trash-can":
    "How to get rid of maggots in a trash can fast and stop them coming back, with simple steps to kill, clean, and prevent future infestations.",
  "how-to-clean-a-dishwasher":
    "How to clean a dishwasher so it stops smelling and leaving film, including the filter, spray arms, and a deep-clean cycle that restores it.",
  "how-to-clean-an-air-fryer":
    "How to clean an air fryer inside and out so it stops smoking and smelling, including the basket, heating element, and baked-on grease.",
  "how-to-get-cigarette-smell-out-of-clothes":
    "How to get cigarette smell out of clothes with tested methods for washable and delicate fabrics, even when regular washing doesn't work.",
  "how-to-remove-limescale-from-a-kettle":
    "How to remove limescale from a kettle using vinegar, lemon, or citric acid, plus how often to descale to keep water clear and the kettle efficient.",
  "how-to-clean-a-wooden-cutting-board":
    "How to clean and disinfect a wooden cutting board the safe way, remove odors and stains, and oil it so it lasts for years without cracking.",
  "how-to-make-laundry-smell-good-after-washing":
    "How to make laundry smell good after washing with 7 methods that work, plus why your clothes come out musty and how to fix it for good.",
  "how-to-clean-leather-mold-safely":
    "How to clean mold off leather safely with 5 methods that remove the bloom without damaging the surface, plus how to stop it from returning.",
  "how-to-sterilize-kitchen-sponge":
    "How to sterilize a kitchen sponge with 5 methods ranked by effectiveness, plus how often to replace it and which popular method barely works.",
  "how-to-clean-plastic-shower-curtain-liner-by-hand-and-in-a-washer":
    "How to clean a plastic shower curtain liner by hand or in the washer to remove soap scum, mildew, and pink bacteria without ruining it.",
  "how-to-clean-with-ketchup":
    "How to clean with ketchup to polish tarnished copper, brass, and silver, why the acid works, and exactly how long to leave it on for best results.",
  "how-to-deep-clean-a-cast-iron-skillet":
    "How to deep clean a cast iron skillet and restore even a rusty thrift-store find, then re-season it so it stays nonstick and rust-free.",
  "how-to-clean-baseboards":
    "How to clean baseboards fast without bending over for hours, plus a simple trick that keeps them dust-free and looking new for longer.",
  "how-to-clean-a-bathroom-drain-that-smells":
    "How to clean a smelly bathroom drain and trace the real source of the sewer odor, with simple steps to clear buildup and keep it fresh.",
  "how-to-declutter-your-room":
    "How to declutter your room in one afternoon without burning out, using a simple order and decision rules that keep you moving past the overwhelm.",
  "how-to-keep-flies-away-outdoors":
    "How to keep flies away outdoors with 10 methods tested on a real patio, from plants and fans to traps, so you can actually enjoy the space.",
  "how-to-organize-your-refrigerator":
    "How to organize your refrigerator with the zone method that cuts food waste in half, so you see what you have and nothing rots in the back.",
  "how-to-rage-clean":
    "How to rage clean: turn stress and big feelings into a spotless home with a focused routine that channels the energy where it does the most good.",
  "how-to-stop-losing-socks-in-the-washing-machine":
    "How to stop losing socks in the washing machine for good, including where they really go and simple systems that keep every pair together.",
  "how-to-clean-a-showerhead":
    "How to clean a showerhead and restore full water pressure by dissolving the mineral buildup clogging the nozzles, with or without removing it.",
  "how-to-clean-a-washing-machine":
    "How to clean a washing machine, top-loader or front-loader, to kill the musty smell, including the gasket, drawer, and a hot deep-clean cycle.",
  "how-to-get-rid-of-bed-bugs-fast":
    "How to get rid of bed bugs fast with a 24-hour first response plan that contains the infestation quickly and sets up successful treatment.",
  "how-to-get-onions-smell-out-of-the-house":
    "How to get onion smell out of the house fast, with the deodorizing methods that clear the air quickest and the mistakes that just spread it.",
  "how-to-deep-clean-a-plunger":
    "How to deep clean and disinfect a plunger, both the cup and handle, without splashing, so the dirtiest tool in your bathroom is actually clean.",
  "how-to-make-your-entire-home-smell-like-cinnamon":
    "How to make your entire home smell like cinnamon with simmer pots and layered methods that fill every room evenly, upstairs and down.",
  "how-to-get-garlic-smell-out-of-the-house":
    "How to get garlic smell out of the house fast, with the methods that clear the air quickest and the mistakes that just spread the odor around.",
  "how-to-get-fish-smell-out-of-the-house":
    "How to get fish smell out of the house fast, with the deodorizing routine that clears the air and stops it soaking into the whole home.",
  "how-to-get-cooking-grease-smell-out-of-the-house":
    "How to get cooking grease smell out of the house, including why it clings to walls and cabinets and the routine that clears the greasy film.",
};

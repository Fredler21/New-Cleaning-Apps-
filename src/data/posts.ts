import type { Post } from "@/types/post";

const universalSafety = [
  "Never mix bleach and ammonia. This can create dangerous chloramine gas.",
  "Never mix bleach and vinegar. This can create toxic chlorine gas.",
  "Open windows or run ventilation, wear gloves, patch-test surfaces, and keep products away from children and pets."
];

const longStep = (topic: string, angle: string, focus: string): string =>
  `${topic} works best when you apply it with a simple system instead of random scrubbing. Start by clearing the area fully so you can see edges, corners, seams, and hidden buildup that usually gets missed on a fast pass. Use a microfiber cloth first to remove loose dust and dry debris, then apply your solution in thin, even coverage so it stays controlled and does not drip onto nearby finishes. Let it dwell briefly so the formula can loosen residue, then work in small sections from top to bottom with steady pressure and overlapping strokes. ${angle} Keep your cloth folded so you always have a clean side available, and rinse tools often so you do not re-spread grime. ${focus} Finish by buffing dry to reveal a streak-free surface and to prevent water marks that make spaces look dull in natural light. This process gives polished, repeatable results and saves time on your next cleaning cycle because less residue is left behind.`;

const detailedSteps = (topic: string): Post["steps"] => [
  { title: "Reset and prep your zone", body: longStep(topic, "A quick reset at the start protects your finish quality.", "If you prep once, the rest of the routine becomes faster and far more consistent.") },
  { title: "Apply product with control", body: longStep(topic, "Use moderate product amounts for a premium finish.", "Controlled application gives better shine and avoids sticky residue on touch surfaces.") },
  { title: "Use a dwell window", body: longStep(topic, "Dwell time reduces heavy scrubbing and protects delicate materials.", "Two to five minutes usually makes a visible difference in effort and final clarity.") },
  { title: "Detail seams and edges", body: longStep(topic, "Corners and seams hold hidden buildup that dulls the room.", "A soft brush and short directional strokes make grout lines and trim look refreshed.") },
  { title: "Rinse and neutral wipe", body: longStep(topic, "A clean-water wipe removes leftover film and keeps surfaces balanced.", "This is where most professional-looking shine comes from.") },
  { title: "Buff for final sheen", body: longStep(topic, "Buffing transforms a clean space into a finished space.", "Use a dry microfiber to catch faint haze before it dries into streaks.") },
  { title: "Treat high-touch points", body: longStep(topic, "Handles, switches, and pulls are visual anchors and hygiene priorities.", "Polishing these details instantly makes the whole room feel intentional.") },
  { title: "Target odor zones", body: longStep(topic, "Odor control is part of premium cleanliness.", "Work drains, bins, and soft-texture zones so freshness lasts beyond day one.") },
  { title: "Set a weekly rhythm", body: longStep(topic, "Consistency beats marathon cleaning sessions.", "A repeat schedule keeps buildup light and helps each pass take less time.") },
  { title: "Audit and upgrade tools", body: longStep(topic, "Tool quality affects results as much as product choice.", "Retire worn cloths and sponges to maintain finish quality and sanitation.") }
];

export const posts: Post[] = [
  {
    title: "13 Mind-Blowing Listerine Hacks",
    slug: "13-mind-blowing-listerine-hacks",
    category: "listerine-hacks",
    readTime: "11 min",
    tags: ["quick wins", "odor control", "bathroom"],
    excerpt:
      "Mint-fresh techniques that neutralize stale smells and refresh forgotten corners in minutes.",
    coverImage: "/graphics/posts/13-mind-blowing-listerine-hacks.png",
    supplies: ["Listerine", "Spray bottle", "Microfiber cloths", "Soft brush", "Warm water", "Gloves"],
    steps: detailedSteps("Listerine-based cleaning"),
    proTips: [
      "Use cool or lukewarm water to preserve active ingredients.",
      "Always test on an unseen area before first use.",
      "Store mixed solutions in labeled bottles and remake weekly."
    ],
    safetyNotes: universalSafety
  },
  {
    title: "7 Game-Changing Ultra Cleaning Hacks",
    slug: "7-game-changing-ultra-cleaning-hacks",
    category: "deep-clean",
    readTime: "12 min",
    tags: ["deep clean", "weekend", "routine"],
    excerpt:
      "A premium room-reset framework that delivers polished, camera-ready results without chaos.",
    coverImage: "/graphics/posts/7-game-changing-ultra-cleaning-hacks.png",
    supplies: ["All-purpose cleaner", "Degreaser", "Microfiber bundle", "Detail brush", "Bucket", "Gloves"],
    steps: detailedSteps("Ultra cleaning routines"),
    proTips: [
      "Clean top-down to avoid rework.",
      "Keep two cloth zones: one for product, one for finishing.",
      "Set a timer block per room to maintain momentum."
    ],
    safetyNotes: universalSafety
  },
  {
    title: "14 Ways to Use Baking Soda in Your House",
    slug: "14-ways-to-use-baking-soda-in-your-house",
    category: "baking-soda",
    readTime: "13 min",
    tags: ["kitchen", "laundry", "odor control"],
    excerpt:
      "Gentle, effective baking soda workflows for sinks, fabrics, bins, and everyday odor control.",
    coverImage: "/graphics/posts/14-ways-to-use-baking-soda-in-your-house.png",
    supplies: ["Baking soda", "Warm water", "Soft sponge", "Measuring spoon", "Cloth", "Gloves"],
    steps: detailedSteps("Baking soda methods"),
    proTips: [
      "Create a paste for vertical surfaces so product stays in place.",
      "Use non-scratch tools on polished stone and glass.",
      "Vacuum powder residues thoroughly to prevent haze."
    ],
    safetyNotes: universalSafety
  },
  {
    title: "8 Incredible Vinegar Hacks",
    slug: "8-incredible-vinegar-hacks",
    category: "vinegar-hacks",
    readTime: "10 min",
    tags: ["quick wins", "glass", "bathroom"],
    excerpt:
      "Mineral-busting vinegar routines that restore shine and clarity across high-use surfaces.",
    coverImage: "/graphics/posts/8-incredible-vinegar-hacks.png",
    supplies: ["White vinegar", "Spray bottle", "Warm water", "Microfiber", "Brush", "Gloves"],
    steps: detailedSteps("Vinegar cleaning"),
    proTips: [
      "Dilute according to surface sensitivity.",
      "Do not use on natural stone unless manufacturer-approved.",
      "Rinse metal fixtures after treatment to maintain finish."
    ],
    safetyNotes: universalSafety
  },
  {
    title: "16 Hydrogen Peroxide Cleaning Hacks",
    slug: "16-hydrogen-peroxide-cleaning-hacks",
    category: "peroxide-hacks",
    readTime: "14 min",
    tags: ["deep clean", "bathroom", "laundry"],
    excerpt:
      "Targeted brightening and stain lifting with careful methods for safer, cleaner outcomes.",
    coverImage: "/graphics/posts/16-hydrogen-peroxide-cleaning-hacks.png",
    supplies: ["Hydrogen peroxide 3%", "Spray bottle", "Cotton pads", "Brush", "Microfiber", "Gloves"],
    steps: detailedSteps("Hydrogen peroxide cleaning"),
    proTips: [
      "Keep peroxide in opaque containers to protect potency.",
      "Work small areas to monitor fabric and finish reactions.",
      "Rinse after treatment to prevent residue patterns."
    ],
    safetyNotes: universalSafety
  },
  {
    title: "12 Shower Cleaning Hacks",
    slug: "12-shower-cleaning-hacks",
    category: "deep-clean",
    readTime: "11 min",
    tags: ["bathroom", "deep clean", "quick wins"],
    excerpt:
      "Spa-grade shower maintenance tactics that cut soap scum and keep glass bright all week.",
    coverImage: "/graphics/posts/12-shower-cleaning-hacks.png",
    supplies: ["Bathroom cleaner", "Squeegee", "Soft brush", "Microfiber", "Vinegar solution", "Gloves"],
    steps: detailedSteps("Shower cleaning"),
    proTips: [
      "Squeegee after each use to slow residue buildup.",
      "Ventilate for 20 minutes post-cleaning.",
      "Rotate grout and glass focus days to stay consistent."
    ],
    safetyNotes: universalSafety
  },
  {
    title: "5 Dollar Store Hacks You Should Know",
    slug: "5-dollar-store-hacks-you-should-know",
    category: "dollar-store",
    readTime: "9 min",
    tags: ["budget", "quick wins", "routine"],
    excerpt:
      "Low-cost tools that deliver premium results when paired with a smart process.",
    coverImage: "/graphics/posts/5-dollar-store-hacks-you-should-know.png",
    supplies: ["Organizer bins", "Spray bottles", "Microfiber packs", "Brush set", "Labels", "Gloves"],
    steps: detailedSteps("Dollar-store cleaning systems"),
    proTips: [
      "Choose tools by material quality, not packaging claims.",
      "Label each bottle with dilution and date.",
      "Build room-based kits to reduce setup friction."
    ],
    safetyNotes: universalSafety
  },
  {
    title: "30 Cleaning Myths You Should Be Wary Of",
    slug: "30-cleaning-myths-you-should-be-wary-of",
    category: "deep-clean",
    readTime: "15 min",
    tags: ["deep clean", "education", "safety"],
    excerpt:
      "Myth-busting guidance that protects your home, your tools, and your time.",
    coverImage: "/graphics/posts/30-cleaning-myths-you-should-be-wary-of.png",
    supplies: ["Notebook", "Trusted cleaner labels", "Microfiber", "Timer", "Gloves", "Ventilation fan"],
    steps: detailedSteps("Evidence-based cleaning"),
    proTips: [
      "Follow label instructions before social media shortcuts.",
      "Track what actually works for your surfaces.",
      "Prioritize safety over speed every time."
    ],
    safetyNotes: universalSafety
  },
  {
    title: "11 Dawn Dish Soap Hacks for Greasy Kitchens",
    slug: "11-dawn-dish-soap-hacks-for-greasy-kitchens",
    category: "dawn-hacks",
    readTime: "12 min",
    tags: ["kitchen", "quick wins", "deep clean"],
    excerpt:
      "Grease-cutting Dawn routines that leave stovetops, cabinet faces, and backsplashes clean and polished.",
    coverImage: "/graphics/posts/11-dawn-dish-soap-hacks-for-greasy-kitchens.png",
    supplies: ["Dawn dish soap", "Warm water", "Spray bottle", "Microfiber", "Soft brush", "Gloves"],
    steps: detailedSteps("Dawn dish-soap cleaning"),
    proTips: [
      "Use light foam, not heavy suds, for easier wipe-downs.",
      "Rinse cloths often to avoid grease transfer.",
      "Dry buff stainless surfaces for a higher-end finish."
    ],
    safetyNotes: universalSafety
  },
  {
    title: "9 Laundry Room Cleaning Hacks That Actually Save Time",
    slug: "9-laundry-room-cleaning-hacks-that-actually-save-time",
    category: "laundry-kitchen",
    readTime: "10 min",
    tags: ["laundry", "quick wins", "routine"],
    excerpt:
      "Fast systems for lint zones, detergent shelves, and machine surrounds that keep laundry spaces crisp.",
    coverImage: "/graphics/posts/9-laundry-room-cleaning-hacks-that-actually-save-time.png",
    supplies: ["Lint brush", "Microfiber", "Mild cleaner", "Vacuum crevice tool", "Bin liners", "Gloves"],
    steps: detailedSteps("Laundry room maintenance"),
    proTips: [
      "Do a 5-minute lint sweep after heavy laundry days.",
      "Use labeled bins to prevent clutter rebound.",
      "Wipe machine tops weekly to avoid product rings."
    ],
    safetyNotes: universalSafety
  },
  {
    title: "10 Kitchen Sink Detox Hacks for Odor-Free Results",
    slug: "10-kitchen-sink-detox-hacks-for-odor-free-results",
    category: "laundry-kitchen",
    readTime: "11 min",
    tags: ["kitchen", "odor control", "quick wins"],
    excerpt:
      "Simple sink and drain routines that remove buildup and keep your kitchen smelling clean all week.",
    coverImage: "/graphics/posts/10-kitchen-sink-detox-hacks-for-odor-free-results.png",
    supplies: ["Baking soda", "Dish soap", "Brush", "Hot water", "Microfiber", "Gloves"],
    steps: detailedSteps("Kitchen sink detoxing"),
    proTips: [
      "Scrub strainers separately for better odor control.",
      "Flush with hot water after each deep pass.",
      "Finish with dry wipe to prevent dull water marks."
    ],
    safetyNotes: universalSafety
  },
  {
    title: "15 Bathroom Deep Clean Hacks for Hotel-Level Shine",
    slug: "15-bathroom-deep-clean-hacks-for-hotel-level-shine",
    category: "deep-clean",
    readTime: "16 min",
    tags: ["bathroom", "deep clean", "weekend"],
    excerpt:
      "Structured bathroom reset tactics that brighten grout, glass, fixtures, and mirror edges with less effort.",
    coverImage: "/graphics/posts/15-bathroom-deep-clean-hacks-for-hotel-level-shine.png",
    supplies: ["Bathroom cleaner", "Grout brush", "Squeegee", "Microfiber", "Vinegar solution", "Gloves"],
    steps: detailedSteps("Bathroom deep cleaning"),
    proTips: [
      "Start with dry dust removal before any liquid product.",
      "Use separate cloths for toilet and vanity zones.",
      "Always finish glass last for best visual impact."
    ],
    safetyNotes: universalSafety
  },
  {
    title: "6 Budget Cleaning Kits You Can Build in 20 Minutes",
    slug: "6-budget-cleaning-kits-you-can-build-in-20-minutes",
    category: "dollar-store",
    readTime: "9 min",
    tags: ["budget", "quick wins", "routine"],
    excerpt:
      "Room-by-room cleaning kits using low-cost tools that still deliver premium, consistent outcomes.",
    coverImage: "/graphics/posts/6-budget-cleaning-kits-you-can-build-in-20-minutes.png",
    supplies: ["Spray bottles", "Microfiber packs", "Labels", "Bucket caddy", "Brushes", "Gloves"],
    steps: detailedSteps("Budget kit building"),
    proTips: [
      "Color-code kits by room to avoid cross-use.",
      "Refill weekly so kits are always ready.",
      "Keep one mini kit in each bathroom cabinet."
    ],
    safetyNotes: universalSafety
  },
  {
    title: "18 Quick Wins for Busy Mornings",
    slug: "18-quick-wins-for-busy-mornings",
    category: "deep-clean",
    readTime: "12 min",
    tags: ["quick wins", "routine", "kitchen"],
    excerpt:
      "Short, repeatable cleaning moves that keep your home polished when you only have a few minutes.",
    coverImage: "/graphics/posts/18-quick-wins-for-busy-mornings.png",
    supplies: ["Microfiber cloths", "All-purpose spray", "Mini brush", "Trash liners", "Timer", "Gloves"],
    steps: detailedSteps("Fast morning cleaning"),
    proTips: [
      "Batch similar tasks to reduce switching time.",
      "Use a timer to keep momentum high.",
      "Do high-visibility surfaces first."
    ],
    safetyNotes: universalSafety
  },
  {
    title: "20 Declutter + Clean Pairing Hacks",
    slug: "20-declutter-clean-pairing-hacks",
    category: "deep-clean",
    readTime: "14 min",
    tags: ["deep clean", "routine", "education"],
    excerpt:
      "Pair decluttering and cleaning in one flow to keep rooms lighter, clearer, and easier to maintain.",
    coverImage: "/graphics/posts/20-declutter-clean-pairing-hacks.png",
    supplies: ["Storage bins", "Labels", "Microfiber", "Vacuum", "All-purpose cleaner", "Gloves"],
    steps: detailedSteps("Declutter-clean workflows"),
    proTips: [
      "Use one keep box and one donate box per room.",
      "Clean immediately after removing clutter.",
      "End with a two-minute reset checklist."
    ],
    safetyNotes: universalSafety
  }
];

export const getPostBySlug = (slug: string): Post | undefined =>
  posts.find((post) => post.slug === slug);

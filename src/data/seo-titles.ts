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
 * ~60 characters (roughly 40 characters or fewer for the value).
 */
export const seoTitles: Record<string, string> = {
  "how-to-deep-clean-your-mattress": "How to Deep Clean Your Mattress at Home",
  "how-to-clean-hardwood-floors": "How to Clean Hardwood Floors the Right Way",
  "how-to-organize-your-refrigerator": "How to Organize Your Refrigerator",
  "how-to-get-rid-of-maggots-in-trash-can": "How to Get Rid of Maggots in a Trash Can",
  "how-to-clean-a-dishwasher": "How to Clean a Dishwasher (Like New Again)",
  "how-to-clean-an-air-fryer": "How to Clean an Air Fryer (Inside and Out)",
  "how-to-get-rid-of-bed-bugs-fast": "How to Get Rid of Bed Bugs Fast",
  "how-to-declutter-your-room": "How to Declutter Your Room in One Afternoon",
  "how-to-keep-flies-away-outdoors": "How to Keep Flies Away Outdoors (10 Methods)",
};

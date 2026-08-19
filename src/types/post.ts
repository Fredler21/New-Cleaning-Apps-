export type PostStep = {
  title: string;
  body: string;
};

export type PostFAQ = {
  question: string;
  answer: string;
};

/**
 * A real photo shot for this post, shown in the body — additional to the cover
 * image, never a replacement for it. Before/after pairs belong here too,
 * whether as one composite image or as two entries.
 *
 * Only ever point this at genuine photography. A real before/after is the one
 * thing on the page a competitor cannot copy off us, and it is worth nothing
 * the moment it is padded out with generated or stock imagery.
 */
export type PostPhoto = {
  src: string;
  /** Shown under the photo. Say what the reader is looking at, specifically. */
  caption: string;
  alt: string;
  /**
   * Where the photo sits in the article.
   *   "intro"       — under the opening, showing the problem the post solves.
   *   "after-steps" — below the steps, showing the result. The default.
   * A before/after pair reads better split across the two than stacked
   * together, because the reader meets the mess first and the result after
   * they have read how it was done.
   */
  placement?: "intro" | "after-steps";
};

export type Post = {
  title: string;
  slug: string;
  /**
   * Slugs this post used to live at. When you rename `slug`, move the old
   * value here instead of deleting it. The post route will 308-redirect every
   * previous slug to the current one, so URLs Google already indexed keep
   * working and never 404 (which is what drops them from the index).
   */
  previousSlugs?: string[];
  datePublished: string;   // ISO 8601 date, e.g. "2025-06-10"
  /**
   * ISO 8601 date the post was last *materially* updated (new section, rewritten
   * steps, new photos, etc.). Leave undefined if untouched. Do NOT bump this
   * just because you re-deployed — Google penalizes fake freshness.
   */
  dateUpdated?: string;
  author?: string;          // Defaults to "TryCleaningHacks Editorial Team"
  category: string;
  readTime: string;
  tags: string[];
  excerpt: string;
  coverImage: string;
  /**
   * Caption for the hero image. Set this when coverImage is a real photo, so
   * the figure says what the reader is actually looking at instead of falling
   * back to the generic "illustrated for TryCleaningHacks" line.
   */
  coverCaption?: string;
  /** Alt text for the hero image. Falls back to the post title. */
  coverAlt?: string;
  /**
   * Real photos shot for this post, rendered in the body after the steps.
   * Additional to coverImage — setting this never replaces the cover.
   */
  photos?: PostPhoto[];
  supplies: string[];
  steps: PostStep[];
  proTips: string[];
  safetyNotes: string[];
  faqs?: PostFAQ[];
};

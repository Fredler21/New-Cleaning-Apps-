export type PostStep = {
  title: string;
  body: string;
};

export type PostFAQ = {
  question: string;
  answer: string;
};

/**
 * A real before/after photo pair for a post. Only set this when both photos are
 * genuine shots of the same spot from the same angle — that pairing is the whole
 * value, and it is the one thing on the page a competitor cannot copy. Leave it
 * undefined rather than filling it with generated or stock imagery; the section
 * does not render at all when it is absent.
 */
export type PostBeforeAfter = {
  before: string;
  after: string;
  /** Shown under the pair. Say what changed and roughly how long it took. */
  caption: string;
  beforeAlt?: string;
  afterAlt?: string;
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
  /** Real photo pair, if one exists for this post. See PostBeforeAfter. */
  beforeAfter?: PostBeforeAfter;
  supplies: string[];
  steps: PostStep[];
  proTips: string[];
  safetyNotes: string[];
  faqs?: PostFAQ[];
};

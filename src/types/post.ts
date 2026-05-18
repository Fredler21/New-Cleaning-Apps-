export type PostStep = {
  title: string;
  body: string;
};

export type PostFAQ = {
  question: string;
  answer: string;
};

export type Post = {
  title: string;
  slug: string;
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
  supplies: string[];
  steps: PostStep[];
  proTips: string[];
  safetyNotes: string[];
  faqs?: PostFAQ[];
};

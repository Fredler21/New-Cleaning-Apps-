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

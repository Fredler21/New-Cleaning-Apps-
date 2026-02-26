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

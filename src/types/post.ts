export type PostStep = {
  title: string;
  body: string;
};

export type PostFAQ = {
  question: string;
  answer: string;
};

/**
 * An original photograph taken by the site owner.
 *
 * These are the opposite of the AI cover illustrations: they are evidence.
 * A `PostPhoto` must only ever describe a real photo of a real surface. Do not
 * point this at a generated image — the whole value of this field is that a
 * reader (or a reviewer) can tell the difference between "here is a picture of
 * the technique" and "here is what actually happened in my bathroom".
 */
export type PostPhoto = {
  /** Path under /public, e.g. "/photos/clean-oven-door/before.jpg" */
  src: string;
  /** Describes what is visibly in the frame, for screen readers and SEO. */
  alt: string;
  /** Shown under the photo. Say what the reader is looking at. */
  caption: string;
  /** Optional pairing label so before/after shots render side by side. */
  pair?: "before" | "after";
  /** ISO date the photo was taken. Used for the "photographed on" line. */
  takenOn?: string;
  /**
   * Real pixel dimensions of the file. Set these on full-width photos so the
   * browser reserves the correct space and the page does not jump as the image
   * loads. Portrait shots in particular need it, since the fallback assumes a
   * landscape 4:3. Print them with:
   *   node -e "require('sharp')('public/<path>').metadata().then(m=>console.log(m.width,m.height))"
   */
  width?: number;
  height?: number;
};

/**
 * An illustrated before-and-after of the surface a post is about.
 *
 * Deliberately NOT a `PostPhoto`. A photo on this site is evidence: it says a
 * real person cleaned a real thing and here is the proof. A `BeforeAfter` is a
 * rendered illustration of the problem and the result, the same class of asset
 * as `coverImage`, and `BeforeAfterFigure` captions it as one. Keeping the two
 * fields apart is what stops an illustration from quietly reading as a claim
 * that somebody photographed their own bathroom.
 *
 * The BEFORE and AFTER labels are burned into the file by
 * scripts/build-before-after.mjs rather than drawn by the component, so they
 * survive the image being lifted onto Pinterest or into a search result.
 */
export type BeforeAfter = {
  /** Path under /public, e.g. "/before-after/showerhead.jpg" */
  src: string;
  /** Describes what is visibly in each half, for screen readers and SEO. */
  alt: string;
  /** Shown under the image. Describe the change; never claim it was tested. */
  caption: string;
  /**
   * Real pixel dimensions of the file, so the browser reserves the right space.
   * These composites are mostly tall portraits and the usual landscape guess is
   * badly wrong for them. Print them with:
   *   node -e "require('sharp')('public/<path>').metadata().then(m=>console.log(m.width,m.height))"
   */
  width: number;
  height: number;
};

/**
 * A record of actually running the method described in the post.
 *
 * This is the ONLY place the site is allowed to make first-person claims about
 * testing, timing, or results. If a post has no `fieldNotes`, the article must
 * not claim anyone tested anything (see scripts/agent/writer.mjs, which
 * enforces this on generated drafts).
 *
 * Fill this in after you have genuinely done the thing. Partial notes are fine
 * and are more credible than polished ones: "took longer than expected, second
 * pass needed" is worth more than a tidy success story.
 */
export type FieldNote = {
  /** ISO date the method was actually carried out. */
  testedOn: string;
  /** The specific surface/item, e.g. "12-year-old glass shower door, hard water area". */
  surface: string;
  /** How long it actually took, in your own words, e.g. "about 25 minutes plus an overnight soak". */
  duration?: string;
  /** What happened. Be specific and include partial failures. */
  result: string;
  /** What you would change next time. Optional but this is the most useful part for readers. */
  wouldChange?: string;
  /** Photos taken during this run. */
  photos?: PostPhoto[];
};

/** A row in a "what this costs versus buying it" table. */
export type CostRow = {
  label: string;
  /** e.g. "$0.40 per batch" */
  cost: string;
  /** Optional note, e.g. "makes 16 oz, keeps about 2 weeks" */
  note?: string;
};

/** A row comparing one method against the others in the same post. */
export type ComparisonRow = {
  method: string;
  /** e.g. "10 minutes active, 12 hours dwell" */
  effort: string;
  /** e.g. "Heavy baked-on grease" */
  bestFor: string;
  /** The honest limitation. Required, because a comparison with no downsides is not a comparison. */
  limitation: string;
};

/**
 * Which optional sections this post renders, and in what order.
 *
 * Every article using the identical intro → supplies → steps → tips → FAQ
 * skeleton is what makes a site read as templated. Posts can opt into a
 * different arrangement, or drop sections that add nothing for that topic.
 * Omit the field entirely to get the default order.
 */
export type SectionKey =
  | "supplies"
  | "steps"
  | "beforeAfter"
  | "comparison"
  | "cost"
  | "fieldNotes"
  | "photos"
  | "proTips"
  | "faq";

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
  supplies: string[];
  steps: PostStep[];
  proTips: string[];
  safetyNotes: string[];
  faqs?: PostFAQ[];

  /* ── Originality fields ───────────────────────────────────────────────
     Everything below is optional and absent from most posts today. They
     exist so that firsthand work, once actually done, has somewhere to live
     that is clearly separated from researched advice.                     */

  /** Original photographs for this post. Real photos only, never generated. */
  photos?: PostPhoto[];
  /** Illustrated before-and-after for this post. An illustration, not a photo. */
  beforeAfter?: BeforeAfter;
  /** Records of actually performing the method. Gates all first-person claims. */
  fieldNotes?: FieldNote[];
  /** What the DIY approach costs against the commercial product. */
  costBreakdown?: CostRow[];
  /** Side-by-side comparison of the methods covered in this post. */
  comparison?: ComparisonRow[];
  /** Override the default section order / omit sections. */
  sectionOrder?: SectionKey[];
};

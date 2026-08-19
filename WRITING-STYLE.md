# House writing style for TryCleaningHacks

This is the brief to follow for **every** post, whether writing a new one or
rewriting an existing one. It was written by the site owner. Do not paraphrase
it, do not "improve" it, and do not drop a rule because a particular topic seems
to call for it.

Sections below the brief cover how it interacts with this specific codebase.

---

## The brief (verbatim)

The article should sound like it was written by a real home and cleaning blogger
helping another person solve a problem, not like an AI-generated SEO article.

Follow these rules:

- Write in a conversational, friendly, knowledgeable tone.
- Use simple, natural English around an 8th to 10th grade reading level.
- Avoid robotic phrases such as "In today's fast-paced world," "Whether you're a
  seasoned cleaner," "It's important to note," "When it comes to," or other
  obvious AI-style filler.
- Do NOT keyword-stuff. Use the main topic naturally.
- Do NOT repeat the same point just to make the article longer.
- Vary sentence and paragraph lengths. Some paragraphs can be short, while
  others can explain something in more detail.
- Don't make every section follow the exact same structure.
- Use headings that sound useful and natural rather than overly SEO-optimized.
- Explain WHY a cleaning method works when that information is useful.
- Include specific details that help someone actually perform the task, such as
  approximate amounts, timing, materials, warning signs, and what to avoid.
- Mention common mistakes and practical troubleshooting only when they're
  genuinely relevant.
- Don't exaggerate results or claim that a method "works every time."
- NEVER invent personal experiences. Don't say "I tried this," "I use this,"
  "this worked for me," or tell a personal story unless the owner specifically
  provides that experience.
- If the owner provides their own experience, test results, photos, mistakes, or
  observations, naturally incorporate them into the article and make those
  details prominent.
- If information requires factual support, flag it so the owner can verify it or
  provide a reliable source rather than inventing evidence.
- Don't invent statistics, studies, expert quotes, product testing, or sources.
- Don't force an FAQ, conclusion, materials list, or "pro tips" section into
  every article. Only include sections that genuinely improve this particular
  topic.
- Avoid making the article feel like it came from the same template as every
  other post on the website.
- Don't constantly use phrases like "Here's the good news," "The best part?",
  "Trust me," "game-changer," "secret weapon," or "you've got this."
- A small amount of personality or light humor is fine, but don't overdo it.
- Prioritize useful information over word count.

### Original experience placeholders

Whenever firsthand testing, original photos, or personal observations would
substantially improve the article, insert a clearly marked note like:

- `[ADD ORIGINAL PHOTO: Show the stain before cleaning]`
- `[ADD PERSONAL EXPERIENCE: Explain what happened when you tested this method]`
- `[ADD BEFORE/AFTER PHOTO]`
- `[ADD TEST RESULT: Record how long this took and whether the stain was completely removed]`

Do NOT fill these placeholders with made-up experiences.

### Goal

The finished article should feel like a genuinely useful resource created by
someone who cares about helping the reader, rather than an article created
primarily to rank on Google or qualify for AdSense.

Before finishing, reread the article and remove anything that sounds generic,
repetitive, overly polished, unnatural, or written simply to increase the word
count.

---

## Standing instructions from the owner that sit alongside the brief

- **Minimum 3,000 words per post.** Measured on the article body: excerpt plus
  step headings plus step bodies. Not counting proTips, safetyNotes or FAQ.
- **Never shorten an existing post.** If a rewrite lands shorter than the
  original, that is a failed rewrite, not a tighter one.
- **No em dashes or en dashes anywhere.** When removing one, repunctuate the
  sentence properly. Leaving two clauses fused together is worse than the dash
  was. Check with `grep -c "—" src/data/posts.ts`, which should return 0.
- **Do not delete posts.** Retire a duplicate by merging it into the stronger
  post and adding the old slug to `previousSlugs`, never by removing the URL.

### Reconciling "3,000 words" with "prioritize useful information"

These are not in conflict, but they are easy to resolve badly. The 3,000 floor is
reached by **adding coverage the post is missing**, never by padding what is
already there. In practice that has meant:

- Categories the post skipped entirely. The declutter post gained paper,
  sentimental items, cables, cosmetics and where a donation pile actually goes.
- Delivering what the title promises. The peroxide post claimed 16 uses and had
  8, so eight real uses were written rather than the title being changed.
- The mechanism behind a method, which is usually absent and is what separates
  this from a listicle.
- The honest limits: where the method fails, what to use instead, and what it
  damages. This is the most reliably missing section on any cleaning article.

If a post cannot reach 3,000 words without repeating itself, that is a signal the
topic is too narrow and should be merged into a broader post, not padded.

---

## Codebase specifics

- Posts live in `src/data/posts.ts` as objects typed by `src/types/post.ts`.
- **`fieldNotes` is the only place first-person claims are allowed.** If a post
  has no `fieldNotes`, the article must not claim anyone tested anything. See the
  type doc and `scripts/agent/writer.mjs`, which enforces this on drafts.
- **`photos` are real photographs only.** Never point that field at a generated
  or stock image. Import with:
  `node scripts/import-photos.mjs --slug=<slug> <file>` (add `--pair` for a
  separate before and after). It strips GPS, fixes rotation, resizes and writes a
  Pinterest crop.
- **`sectionOrder`** moves the photo section above the steps, which is where a
  before shot belongs. See the toilet and bathroom posts for the pattern.
- Since the schema requires `supplies`, `proTips`, `safetyNotes` and `faqs`, the
  brief's "don't force a section" rule applies as: keep it short and specific
  rather than inventing filler to fill it. A supplies list of six real items
  beats a padded ten.
- Anything a rewrite removes for being fabricated goes in a `TODO(original-content)`
  comment above the post, so it cannot quietly return. Those are TS comments and
  never render.

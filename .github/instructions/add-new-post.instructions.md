---
applyTo: "src/data/posts.ts,src/data/internal-links.ts,scripts/gemini-image-prompts.json"
description: "Workflow for adding new cleaning-hack posts to this site, including image generation, post data, and SEO internal links."
---

# Add New Post Workflow

Use this instruction whenever the user provides post titles to add to the site.

## Required context before writing posts

Read the LAST post in `src/data/posts.ts` as the style and length template.
Read `src/data/categories.ts` to pick the correct category.
Read `src/data/internal-links.ts` to understand existing slugs for cross-linking.

## Step 1 — Add image prompts

Append a new entry for each post to `scripts/gemini-image-prompts.json`:

```json
{
  "slug": "<post-slug>",
  "prompt": "Premium editorial photography showing [specific scene matching post topic], ultra-realistic 4K photography style, no people, no text, no logos, no watermarks"
}
```

Then generate all images by running:

```
GEMINI_API_KEY=<key> node scripts/generate-gemini-images.mjs
```

Images land in `public/graphics/posts/<slug>.png`.

If a **new category** is introduced, also generate a category icon:

```json
{
  "slug": "<category-id>",
  "dir": "icons",
  "prompt": "..."
}
```

## Step 2 — Write the post object

Append each post to the `posts` array in `src/data/posts.ts` **before** the closing `];`.
Always add a **comma after the preceding post's closing brace** to avoid a syntax error.

### Post shape

```ts
{
  title: "...",
  slug: "...",
  datePublished: "YYYY-MM-DD",  // today's date
  category: "<category-id>",
  readTime: "X min",
  tags: ["...", "..."],
  excerpt: "One compelling paragraph. First-person where relevant. No em-dashes.",
  coverImage: "/graphics/posts/<slug>.png",
  supplies: ["Item 1", "Item 2"],
  steps: [
    { title: "Step title", body: "Long paragraph body — 100+ words, no em-dashes, no bullet lists inside body." },
    ...  // aim for 10-12 steps
  ],
  proTips: ["Sentence tip 1.", "Sentence tip 2.", "Sentence tip 3."],
  safetyNotes: ["Safety sentence 1.", "Safety sentence 2.", "Safety sentence 3."],
  faqs: [
    { question: "Question?", answer: "Full answer." },
    ...  // 3-5 FAQs
  ]
}
```

### Writing rules (MUST follow)

- **No em-dashes (—) or hyphens as list markers** in any text field.
- Use commas and the word "and" rather than dashes to connect clauses.
- Step bodies must be flowing paragraphs, not bullet lists.
- Write in a first-person editorial voice ("I tested...", "After two weeks...").
- Each step body must be at least 100 words.
- SEO: use the target keyword naturally in the title, excerpt, and first step.
- Date is always today's ISO date (YYYY-MM-DD).

### Category selection guide

| Topic                   | Category id       |
|-------------------------|-------------------|
| Laundry / kitchen items | `laundry-kitchen` |
| Vinegar-based cleaning  | `vinegar-hacks`   |
| Baking soda             | `baking-soda`     |
| Full deep clean         | `deep-clean`      |
| Bathroom                | `bathroom-cleaning` |
| Odor / fragrance        | `home-fragrance`  |
| Dawn dish soap          | `dawn-hacks`      |
| Pest control            | `pest-control`    |
| DIY cleaners            | `diy-cleaners`    |

## Step 3 — Add internal links

Append new entries to `src/data/internal-links.ts` inside the `internalLinks` object, just before the closing `};`:

```ts
/* --- Post Title --- */
"<new-slug>": [
  "<related-slug-1>",
  "<related-slug-2>",
  "<related-slug-3>",
  "<related-slug-4>",
],
```

Also update 1-2 **existing** entries whose topic is closest to the new post so they link back to the new slug.

## Step 4 — Validate TypeScript

Run `npx tsc --noEmit` and fix any errors before finishing.
The most common mistake is a missing comma between post objects in `posts.ts`.

## Step 5 — Done

Confirm:
- [ ] Image file exists at `public/graphics/posts/<slug>.png`
- [ ] Post object is in `src/data/posts.ts` with correct category and slug
- [ ] `internalLinks` entry exists for every new slug
- [ ] `npx tsc --noEmit` produces no output (no errors)

# TryCleaningHacks

Next.js 14 content site. Posts are data, not MDX: every article is an object in
`src/data/posts.ts` typed by `src/types/post.ts`, rendered by
`src/app/cleaning-hacks/[slug]/page.tsx`.

## Before writing or rewriting any post

**Read [WRITING-STYLE.md](WRITING-STYLE.md) first, every time.** It holds the
owner's writing brief verbatim plus the standing rules. It is not optional and it
is not a starting point to adapt. The short version, which does not replace
reading it:

- Never invent personal experience, testing, statistics, studies, or sources.
  `fieldNotes` is the only place first-person claims may appear, and only when the
  owner has supplied real notes.
- Flag anything needing factual support instead of inventing evidence.
- Minimum 3,000 words in the article body. Never shorten an existing post.
- No em dashes or en dashes. `grep -c "—" src/data/posts.ts` must return 0.
- Never delete a post. Merge duplicates and add the retired slug to
  `previousSlugs` so the old URL 308s instead of 404ing.
- `photos` is for real photographs only, never generated or stock images.

## Why this site is being reworked

Google crawled roughly 25 posts and declined to index them. An audit of the
article text found the cause was not length, since not one was under 1,500 words
and several were over 3,500. It was fabricated experience: 15 of 21 audited posts
made first-person claims that were never recorded anywhere, up to 48 in a single
post, plus invented statistics and studies. Two structural problems were found
alongside it: a retired slug still serving a cached 200 alongside its replacement,
and a title promising 16 items on a post that had 8.

So the fix for a non-indexed post is, in order: strip fabricated claims, deliver
what the title promises, add the coverage the post is missing until it clears
3,000 words, and add real photos and `fieldNotes` where the owner has them.

`ORIGINALITY-PLAYBOOK.md` covers the longer-term originality work.

## Commands

```bash
npm run dev            # localhost:3000
npm run typecheck      # tsc --noEmit
npx next build         # always run before pushing; catches data errors
node scripts/import-photos.mjs --slug=<slug> <file>   # real photos, strips GPS
node scripts/check-broken-images.mjs
```

## Conventions

- Run `npx tsc --noEmit` and `npx next build` before every push. A malformed post
  object typechecks fine and fails at build.
- `dateUpdated` moves only on a material change to the post, never on a redeploy.
- Retired slugs go in `previousSlugs`, not `next.config.mjs`. The one exception is
  documented in that file: a stale prerender needed a routing-level redirect to
  override the CDN cache.
- Record anything removed for being fabricated in a `TODO(original-content)`
  comment above the post so it cannot quietly return.

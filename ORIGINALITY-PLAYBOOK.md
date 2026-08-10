# Originality Playbook

The code in this repo can now hold original photos, real testing notes, cost
tables, and method comparisons. None of that helps until the photos are taken
and the methods are actually run. This file is the checklist for doing that.

**Do not reapply to AdSense until at least items 1-3 are done on 10+ posts.**
Applying against essentially the same site is what produced the last rejection.

---

## The one rule

First-person claims are gated on `fieldNotes`.

If a post has no `fieldNotes`, nothing in it may say "I tested", "I timed",
"in my testing", or report a measured result. `scripts/agent/writer.mjs`
enforces this on generated drafts and will refuse to emit a post that breaks
it. That guard exists because fabricated testing claims are what got the site
rejected.

Once you have genuinely run a method, put it in `fieldNotes` and say so
plainly. Real firsthand experience is the single most valuable thing the site
can add. Invented firsthand experience is the single most damaging.

---

## 1. Photograph 10-20 posts

Pick the posts you can actually shoot at home. Best candidates are the ones
with a visible before and after: oven door glass, shower head descaling,
grout, yellowed pillows, sneakers, stainless steel, cutting boards.

```bash
# a pair
npm run import:photos -- --slug=how-to-clean-an-air-fryer --pair before.jpg after.jpg

# loose shots
npm run import:photos -- --slug=how-to-clean-a-wooden-cutting-board shot1.jpg shot2.jpg
```

The script strips EXIF (**including the GPS coordinates of your house**), fixes
rotation, and writes a web copy plus a 1000x1500 Pinterest copy. It prints a
`photos:` block to paste into `src/data/posts.ts`.

Write the `alt` and `caption` yourself. A caption from the person who took the
photo is the entire point of the section.

Shooting notes that matter more than camera quality:
- Same angle, same light, before and after. A pair that doesn't line up reads as staged.
- Daylight from a window beats overhead kitchen lighting.
- Include something for scale and context. A bare crop of tile could be anyone's tile.
- Do not clean up the frame. Visible clutter is what makes it look real.

## 2. Actually run the method, and write down what happened

Fill in `fieldNotes` on the post:

```ts
fieldNotes: [
  {
    testedOn: "2026-08-14",
    surface: "Glass oven door, gas range, not cleaned in ~2 years",
    duration: "10 minutes of work plus an overnight soak",
    result:
      "The paste lifted most of the brown film but not the ring baked around the vent holes. Needed a second application on that area and a plastic scraper.",
    wouldChange:
      "Mix it thicker. My first batch ran down the glass and pooled at the bottom edge.",
    photos: [/* ... */],
  },
],
```

The failures are the valuable part. "Needed a second pass" and "I mixed it too
thin" are the details nobody can generate from existing web content, and they
are what a reviewer reads as a real person.

## 3. Add cost and comparison data

Both are original, verifiable, and do not require claiming you tested anything.

```ts
costBreakdown: [
  { label: "DIY paste (baking soda + vinegar)", cost: "$0.35", note: "enough for one oven door" },
  { label: "Commercial oven spray", cost: "$6.49", note: "typical 16 oz can" },
],
comparison: [
  {
    method: "Overnight baking soda paste",
    effort: "10 min active, 12 hr dwell",
    bestFor: "Heavy carbonized buildup",
    limitation: "Useless if you are in a hurry; needs the full dwell",
  },
],
```

`limitation` is required by the type. A comparison where everything wins tells
the reader nothing.

## 4. Break the template

Posts render `supplies → steps → fieldNotes → photos → comparison → cost →
proTips → faq` by default. Override per post:

```ts
sectionOrder: ["fieldNotes", "photos", "steps", "comparison", "supplies", "faq"],
```

Omit a key to drop that section. A short post does not need a supplies grid and
a FAQ bolted on to hit a shape. Vary this across the 10-20 posts you improve so
the library stops reading as one generated pattern.

## 5. Author page

Add a square headshot at `public/photos/author/fredler.jpg`, then set
`HAS_AUTHOR_PHOTO = true` in `src/app/author/fredler-pierre-louis/page.tsx`.

While you are there, the bio should answer: why do you know about this, and
what do you actually do to check a method before publishing it. Concrete beats
impressive.

---

## Sequencing

| Weeks | Do this |
|---|---|
| 1-2 | Photograph and test 5 posts. Fill in fieldNotes and photos. |
| 3-4 | Another 5-10. Add cost/comparison. Vary `sectionOrder`. |
| 5-6 | Author photo and bio. Request indexing in Search Console for the improved URLs. |
| 7-8 | Let it settle. Watch indexed-page count and traffic. |
| Then | Reapply, once the site a reviewer lands on is visibly different from last time. |

Do not publish 30 more articles instead. Quantity is what the current rejection
is about. Twenty genuinely improved posts beat a hundred more of the same.

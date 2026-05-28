// Pick the N most-related existing posts for a brand new post.
// Updates src/data/internal-links.ts in-place, adding both:
//   - A new entry for the new slug -> related slugs
//   - Reciprocal links: the new slug appended to the top 2 related posts'
//     existing lists (with a cap so no list exceeds 4 entries).

import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const LINKS_PATH = path.join(process.cwd(), "src", "data", "internal-links.ts");
const POSTS_PATH = path.join(process.cwd(), "src", "data", "posts.ts");

const MAX_LINKS_PER_POST = 4;
const NUM_RELATED = 4;
const NUM_RECIPROCAL = 2;

// Same niche stopwords as topic-picker — these tokens are too generic to count.
const NICHE_STOPWORDS = new Set([
  "cleaning", "clean", "hacks", "hack", "tips", "tricks", "guide",
  "best", "easy", "quick", "diy", "home", "house", "ways",
  "ultimate", "genius", "amazing", "your", "with", "from", "that",
  "this", "what", "without", "into"
]);

const tokenize = (s) =>
  new Set(
    (s || "")
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, " ")
      .split(/\s+/)
      .filter((w) => w.length > 3 && !NICHE_STOPWORDS.has(w))
  );

// ---------------------------------------------------------------------------
// Read every existing post (slug + title + category + tags) from posts.ts.
// We use a robust regex on the raw file — good enough for ranking purposes.
// ---------------------------------------------------------------------------
const extractAllPostMeta = async () => {
  const src = await readFile(POSTS_PATH, "utf8");
  // Match each post object's leading metadata block.
  const re = /title:\s*"([^"]+)",\s*slug:\s*"([^"]+)",[\s\S]*?category:\s*"([^"]+)",[\s\S]*?tags:\s*\[([^\]]*)\]/g;
  const out = [];
  let m;
  while ((m = re.exec(src)) !== null) {
    const tags = Array.from(m[4].matchAll(/"([^"]+)"/g)).map((x) => x[1]);
    out.push({
      title: m[1],
      slug: m[2],
      category: m[3],
      tags
    });
  }
  return out;
};

// ---------------------------------------------------------------------------
// Score: title token overlap + tag overlap + category match boost.
// ---------------------------------------------------------------------------
const scoreRelevance = (newPost, candidate) => {
  const A = tokenize(newPost.title);
  const B = tokenize(candidate.title);
  let titleOverlap = 0;
  for (const t of A) if (B.has(t)) titleOverlap++;

  const tagsA = new Set((newPost.tags || []).map((t) => t.toLowerCase()));
  const tagsB = new Set((candidate.tags || []).map((t) => t.toLowerCase()));
  let tagOverlap = 0;
  for (const t of tagsA) if (tagsB.has(t)) tagOverlap++;

  const categoryBoost = newPost.category === candidate.category ? 3 : 0;

  return titleOverlap * 4 + tagOverlap * 2 + categoryBoost;
};

/**
 * Returns the top related slugs for a new post.
 * Excludes the new post's own slug from results.
 */
export const pickRelatedSlugs = async (newPost, { limit = NUM_RELATED } = {}) => {
  const all = await extractAllPostMeta();
  const scored = all
    .filter((p) => p.slug !== newPost.slug)
    .map((p) => ({ ...p, score: scoreRelevance(newPost, p) }))
    .sort((a, b) => b.score - a.score);

  // Require at least 1 signal to avoid pure-random picks. Fall back to
  // same-category posts if scoring produces all zeroes.
  const meaningful = scored.filter((p) => p.score > 0);
  const pool = meaningful.length > 0 ? meaningful : scored;
  return pool.slice(0, limit).map((p) => p.slug);
};

// ---------------------------------------------------------------------------
// Write into src/data/internal-links.ts
// ---------------------------------------------------------------------------

/**
 * Inject a new entry for `newPost.slug` AND reciprocally add it to the
 * top-2 related posts' existing entries (without exceeding MAX_LINKS_PER_POST).
 *
 * Returns { related, reciprocated[] }.
 */
export const updateInternalLinksFile = async (newPost, relatedSlugs) => {
  const src = await readFile(LINKS_PATH, "utf8");

  // Find the closing "};" of the exported object.
  const closeMatch = src.match(/\n\};\s*$/);
  if (!closeMatch) {
    throw new Error("Could not find closing `};` in internal-links.ts");
  }
  const closeIdx = closeMatch.index;

  // 1. Append the new entry.
  const newEntry =
    `\n  /* ─── ${escapeComment(newPost.title)} ─── */\n` +
    `  "${newPost.slug}": [\n` +
    relatedSlugs.map((s) => `    "${s}",`).join("\n") +
    `\n  ],\n`;

  let updated = src.slice(0, closeIdx) + newEntry + src.slice(closeIdx);

  // 2. Reciprocally inject the new slug into the top N related posts'
  //    existing lists, capped at MAX_LINKS_PER_POST entries.
  const reciprocated = [];
  for (const recipSlug of relatedSlugs.slice(0, NUM_RECIPROCAL)) {
    const result = injectIntoEntry(updated, recipSlug, newPost.slug);
    if (result.changed) {
      updated = result.content;
      reciprocated.push(recipSlug);
    }
  }

  await writeFile(LINKS_PATH, updated);
  return { related: relatedSlugs, reciprocated };
};

const escapeComment = (s) => s.replace(/\*\//g, "* /");

/**
 * Find the entry for `targetSlug` in `content` and append `newSlug` to its
 * array (capping length at MAX_LINKS_PER_POST by dropping the last item).
 * Returns { changed, content }.
 */
const injectIntoEntry = (content, targetSlug, newSlug) => {
  // Match: "target-slug": [  ...  ],
  const entryRe = new RegExp(
    `("${escapeRegex(targetSlug)}":\\s*\\[)([\\s\\S]*?)(\\n\\s*\\],)`,
    "m"
  );
  const m = content.match(entryRe);
  if (!m) return { changed: false, content };

  const head = m[1];
  const body = m[2];
  const tail = m[3];

  const existing = Array.from(body.matchAll(/"([^"]+)"/g)).map((x) => x[1]);
  if (existing.includes(newSlug)) {
    return { changed: false, content };
  }

  const next = [newSlug, ...existing].slice(0, MAX_LINKS_PER_POST);
  // Detect indentation from the original body (default 4 spaces).
  const indentMatch = body.match(/\n(\s+)"/);
  const indent = indentMatch ? indentMatch[1] : "    ";

  const newBody = "\n" + next.map((s) => `${indent}"${s}",`).join("\n");
  const replaced = head + newBody + tail;

  return {
    changed: true,
    content: content.replace(entryRe, replaced)
  };
};

const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

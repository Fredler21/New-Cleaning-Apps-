// Topic picker — fuses Pinterest Trends + Google Trends signals into a single
// ranked list, filters out anything we've already covered, and returns a winner.
//
// Scoring:
//   - A topic that appears in BOTH sources gets a +10 boost (cross-validation).
//   - Pinterest weekly_change is normalized to ~0-100.
//   - Google "rising" % is clamped to 0-200.
//
// Dedup:
//   - Against state.publishedSlugs (slugified topic)
//   - Against state.queuedTopics (anything we considered recently and skipped)
//   - Fuzzy match against existing post titles via simple token overlap.

import { getTrendingPinterestKeywords } from "./pinterest.mjs";
import { getTrendingGoogleQueries } from "./google-trends.mjs";

const slugify = (s) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

// Words that are too generic in this niche to count toward similarity.
const NICHE_STOPWORDS = new Set([
  "cleaning",
  "clean",
  "hacks",
  "hack",
  "tips",
  "tricks",
  "guide",
  "best",
  "easy",
  "quick",
  "diy",
  "home",
  "house",
  "ways",
  "ultimate",
  "genius",
  "amazing"
]);

const tokens = (s) =>
  new Set(
    s
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, " ")
      .split(/\s+/)
      .filter((w) => w.length > 3 && !NICHE_STOPWORDS.has(w))
  );

// Jaccard similarity — intersection over union. More conservative than
// min-overlap and avoids tiny candidates matching everything.
const jaccard = (a, b) => {
  const A = tokens(a);
  const B = tokens(b);
  if (A.size === 0 || B.size === 0) return 0;
  let inter = 0;
  for (const t of A) if (B.has(t)) inter++;
  const union = A.size + B.size - inter;
  return inter / union;
};

const isAlreadyCovered = (candidate, { publishedSlugs, existingTitles, queuedTopics }) => {
  const slug = slugify(candidate);
  if (publishedSlugs.includes(slug)) return "slug-match";
  if (queuedTopics.some((q) => slugify(q) === slug)) return "queued";
  for (const title of existingTitles) {
    if (jaccard(candidate, title) >= 0.5) return `similar-to:${title}`;
  }
  return null;
};

/**
 * Returns ranked topic candidates.
 *
 * @param {object} opts
 * @param {string} opts.pinterestToken - optional. If missing, only Google is used.
 * @param {string[]} opts.publishedSlugs - ledger
 * @param {string[]} opts.existingTitles - all existing post titles
 * @param {string[]} opts.queuedTopics   - ledger
 * @param {number} [opts.limit=10]
 */
export const pickTopics = async ({
  pinterestToken,
  publishedSlugs = [],
  existingTitles = [],
  queuedTopics = [],
  limit = 10
}) => {
  const log = (...m) => console.log("[topics]", ...m);

  // ---- Pinterest ----
  let pinterest = [];
  if (pinterestToken) {
    try {
      log("Fetching Pinterest trending keywords...");
      pinterest = await getTrendingPinterestKeywords({
        token: pinterestToken,
        trendType: "growing",
        limit: 25
      });
      log(`  -> ${pinterest.length} Pinterest trends`);
    } catch (err) {
      log("  ! Pinterest trends unavailable:", err.message);
    }
  } else {
    log("No Pinterest token — skipping Pinterest trends.");
  }

  // ---- Google ----
  let google = [];
  try {
    log("Fetching Google rising queries...");
    google = await getTrendingGoogleQueries({ limit: 25 });
    log(`  -> ${google.length} Google rising queries`);
  } catch (err) {
    log("  ! Google trends unavailable:", err.message);
  }

  if (pinterest.length === 0 && google.length === 0) {
    throw new Error("Both trend sources failed — no topics to pick from.");
  }

  // ---- Merge + score ----
  const merged = new Map();

  for (const p of pinterest) {
    const key = p.keyword.toLowerCase().trim();
    const change = Math.max(p.weeklyChange ?? 0, p.monthlyChange ?? 0);
    const score = Math.min(Math.abs(change), 100); // cap
    merged.set(key, {
      keyword: p.keyword,
      sources: ["pinterest"],
      pinterestScore: score,
      googleScore: 0
    });
  }

  for (const g of google) {
    const key = g.keyword.toLowerCase().trim();
    const gScore = Math.min(g.rising, 200) / 2; // 0-100
    const existing = merged.get(key);
    if (existing) {
      existing.sources.push("google");
      existing.googleScore = gScore;
    } else {
      merged.set(key, {
        keyword: g.keyword,
        sources: ["google"],
        pinterestScore: 0,
        googleScore: gScore
      });
    }
  }

  const ranked = [...merged.values()]
    .map((t) => ({
      ...t,
      score:
        t.pinterestScore +
        t.googleScore +
        (t.sources.length > 1 ? 10 : 0) // cross-source boost
    }))
    .sort((a, b) => b.score - a.score);

  // ---- Filter out already-covered ----
  const fresh = [];
  for (const t of ranked) {
    const reason = isAlreadyCovered(t.keyword, {
      publishedSlugs,
      existingTitles,
      queuedTopics
    });
    if (reason) {
      log(`  skip "${t.keyword}" (${reason})`);
      continue;
    }
    fresh.push(t);
    if (fresh.length >= limit) break;
  }

  return fresh;
};

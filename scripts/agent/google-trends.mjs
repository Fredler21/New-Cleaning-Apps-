// Google Trends — rising queries in the cleaning niche.
// Uses the unofficial `google-trends-api` npm package (free, no key).
//
// We pull "rising" related queries for a set of seed terms and merge them.
// Rising > Top because rising = momentum, top = already-saturated.

import googleTrends from "google-trends-api";

const SEEDS = [
  "cleaning hacks",
  "deep cleaning",
  "kitchen cleaning",
  "bathroom cleaning"
];

const safeParse = (raw) => {
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

/**
 * Pull rising related queries for a single seed term.
 */
const relatedRising = async (keyword, geo = "US") => {
  const raw = await googleTrends.relatedQueries({
    keyword,
    geo,
    // Last 30 days
    startTime: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
  });

  const parsed = safeParse(raw);
  const rising = parsed?.default?.rankedList?.[1]?.rankedKeyword ?? [];

  return rising.map((r) => ({
    source: "google",
    keyword: r.query,
    // `value` is either a percent growth number or the string "Breakout"
    rising: r.value === "Breakout" ? 99999 : Number(r.value) || 0
  }));
};

/**
 * Pull rising queries across all cleaning seeds and dedupe.
 */
export const getTrendingGoogleQueries = async ({
  geo = "US",
  seeds = SEEDS,
  limit = 25
} = {}) => {
  const all = [];

  for (const seed of seeds) {
    try {
      const results = await relatedRising(seed, geo);
      all.push(...results);
    } catch (err) {
      console.warn(
        `  ! google-trends failed for seed "${seed}": ${err.message}`
      );
    }
  }

  // Dedupe by lowercase keyword, keep the highest rising value.
  const byKey = new Map();
  for (const item of all) {
    const key = item.keyword.toLowerCase().trim();
    const existing = byKey.get(key);
    if (!existing || item.rising > existing.rising) {
      byKey.set(key, item);
    }
  }

  return [...byKey.values()]
    .sort((a, b) => b.rising - a.rising)
    .slice(0, limit);
};

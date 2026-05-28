// Pinterest API v5 — niche trend discovery.
//
// We use TWO endpoints:
//   1. /trends/keywords/{region}/top  — top trending search terms (competitor-agnostic)
//   2. /pins/{pinId}/analytics        — for our OWN pins only (kept for future use)
//
// Pinterest does NOT expose engagement metrics for Pins we don't own,
// so "spy on competitor Pins" has to come from search trends, not analytics.
//
// Required env: PINTEREST_ACCESS_TOKEN  (scope: pins:read, user_accounts:read,
// and trial-access tokens already include trend keyword access).

const API_BASE = "https://api.pinterest.com/v5";

const authHeaders = (token) => ({
  Authorization: `Bearer ${token}`,
  "Content-Type": "application/json"
});

const isoDaysAgo = (days) => {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() - days);
  return d.toISOString().slice(0, 10);
};

/**
 * List the user's Pins (paginated). Returns up to `max` Pins.
 */
export const listUserPins = async ({ token, max = 100 }) => {
  const pins = [];
  let bookmark;

  while (pins.length < max) {
    const url = new URL(`${API_BASE}/pins`);
    url.searchParams.set("page_size", "100");
    if (bookmark) url.searchParams.set("bookmark", bookmark);

    const res = await fetch(url, { headers: authHeaders(token) });
    if (!res.ok) {
      const body = await res.text();
      throw new Error(`Pinterest listUserPins failed: ${res.status} ${body}`);
    }
    const data = await res.json();
    pins.push(...(data.items ?? []));
    bookmark = data.bookmark;
    if (!bookmark) break;
  }

  return pins.slice(0, max);
};

/**
 * Get analytics for a single Pin.
 * metric_types: IMPRESSION, SAVE, PIN_CLICK, OUTBOUND_CLICK, etc.
 */
export const getPinAnalytics = async ({ token, pinId, days = 30 }) => {
  const url = new URL(`${API_BASE}/pins/${pinId}/analytics`);
  url.searchParams.set("start_date", isoDaysAgo(days));
  url.searchParams.set("end_date", isoDaysAgo(1));
  url.searchParams.set(
    "metric_types",
    "IMPRESSION,SAVE,PIN_CLICK,OUTBOUND_CLICK"
  );

  const res = await fetch(url, { headers: authHeaders(token) });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(
      `Pinterest analytics failed for pin ${pinId}: ${res.status} ${body}`
    );
  }
  return res.json();
};

/**
 * Score a Pin: weighted blend of impressions, saves, and outbound clicks.
 * Outbound clicks matter most (actual site traffic).
 */
const scorePin = (metrics) => {
  const impressions = metrics?.IMPRESSION?.summary_metrics?.lifetime_metrics?.IMPRESSION ?? 0;
  const saves = metrics?.SAVE?.summary_metrics?.lifetime_metrics?.SAVE ?? 0;
  const outbound = metrics?.OUTBOUND_CLICK?.summary_metrics?.lifetime_metrics?.OUTBOUND_CLICK ?? 0;
  return impressions * 0.1 + saves * 3 + outbound * 10;
};

/**
 * Returns top Pins by composite score, with topic hints extracted.
 */
export const getTopPerformingPins = async ({
  token,
  days = 30,
  limit = 10,
  excludePinIds = []
}) => {
  const pins = await listUserPins({ token, max: 100 });
  const excluded = new Set(excludePinIds);

  const scored = [];
  for (const pin of pins) {
    if (excluded.has(pin.id)) continue;
    try {
      const analytics = await getPinAnalytics({ token, pinId: pin.id, days });
      scored.push({
        id: pin.id,
        title: pin.title ?? "",
        description: pin.description ?? "",
        link: pin.link ?? "",
        boardId: pin.board_id,
        score: scorePin(analytics),
        impressions:
          analytics?.IMPRESSION?.summary_metrics?.lifetime_metrics?.IMPRESSION ?? 0,
        saves: analytics?.SAVE?.summary_metrics?.lifetime_metrics?.SAVE ?? 0,
        outboundClicks:
          analytics?.OUTBOUND_CLICK?.summary_metrics?.lifetime_metrics?.OUTBOUND_CLICK ?? 0
      });
    } catch (err) {
      console.warn(`  ! analytics fetch failed for ${pin.id}: ${err.message}`);
    }
  }

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit);
};

/**
 * Pinterest Trends API — top trending search keywords in a region/interest.
 *
 * Endpoint: GET /v5/trends/keywords/{region}/top
 * trend_type: "growing" (fastest-rising) | "monthly" | "yearly" | "seasonal"
 * interests:  Pinterest interest IDs. "991" = "Cleaning" (Pinterest's taxonomy).
 *             We default to growing + monthly merged for broad cleaning coverage.
 *
 * Returns: [{ keyword, weekly_change, monthly_change, yearly_change, pct_growth_wow }, ...]
 */
export const getTrendingPinterestKeywords = async ({
  token,
  region = "US",
  trendType = "growing",
  interests = ["991"], // Cleaning
  limit = 25
}) => {
  const url = new URL(`${API_BASE}/trends/keywords/${region}/top`);
  url.searchParams.set("trend_type", trendType);
  url.searchParams.set("limit", String(limit));
  if (interests.length > 0) {
    url.searchParams.set("interests", interests.join(","));
  }

  const res = await fetch(url, { headers: authHeaders(token) });

  if (!res.ok) {
    const body = await res.text();
    // 401/403 typically means the trial token doesn't have trend access yet.
    throw new Error(
      `Pinterest Trends API failed: ${res.status} ${body}`
    );
  }

  const data = await res.json();
  const items = data?.trends ?? data?.items ?? [];

  return items.map((it) => ({
    source: "pinterest",
    keyword: it.keyword,
    weeklyChange: it.weekly_change ?? null,
    monthlyChange: it.monthly_change ?? null,
    yearlyChange: it.yearly_change ?? null
  }));
};

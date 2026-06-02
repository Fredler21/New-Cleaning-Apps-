// Audit post hero images for AI-look risk.
//
// Heuristics:
//  - Source from sidecar .meta.json (gemini / gemini-candid / unsplash / unknown)
//  - File size (very small or suspiciously round-numbered AI exports)
//  - Identical hashes (near-duplicates that look like spun content)
//
// Run:  node scripts/audit-post-images.mjs
//
// Output: a table sorted by AI-risk, plus a summary.

import { readFile, readdir, stat } from "node:fs/promises";
import { createHash } from "node:crypto";
import path from "node:path";

const POSTS_DIR = path.join(process.cwd(), "public", "uploads");

const loadSlugsFromPostsTs = async () => {
  try {
    const file = await readFile(path.join(process.cwd(), "src", "data", "posts.ts"), "utf8");
    const matches = [...file.matchAll(/slug:\s*"([^"]+)"/g)];
    return matches.map((m) => m[1]);
  } catch {
    return [];
  }
};

const readMeta = async (dir, slug) => {
  try {
    const raw = await readFile(path.join(dir, `${slug}.meta.json`), "utf8");
    return JSON.parse(raw);
  } catch {
    return null;
  }
};

const findImage = async (dir, slug) => {
  for (const ext of ["png", "jpg", "jpeg", "webp"]) {
    try {
      const p = path.join(dir, `${slug}.${ext}`);
      await stat(p);
      return p;
    } catch {
      /* try next */
    }
  }
  return null;
};

const hashFile = async (p) => {
  const buf = await readFile(p);
  return createHash("md5").update(buf).digest("hex");
};

const scoreRisk = ({ source, sizeBytes }) => {
  let score = 0;
  const reasons = [];
  if (source === "gemini") {
    score += 4;
    reasons.push("AI source");
  } else if (source === "gemini-candid") {
    score += 2;
    reasons.push("AI candid");
  } else if (source === "unsplash") {
    reasons.push("real photo");
  } else {
    score += 3;
    reasons.push("unknown source");
  }
  if (sizeBytes && sizeBytes < 80_000) {
    score += 1;
    reasons.push("tiny file");
  }
  if (sizeBytes && sizeBytes > 3_000_000) {
    score += 1;
    reasons.push("huge file");
  }
  return { score, reasons };
};

const run = async () => {
  const slugs = await loadSlugsFromPostsTs();
  if (slugs.length === 0) {
    console.error("No slugs found in src/data/posts.ts");
    process.exit(1);
  }

  const rows = [];
  const hashes = new Map();

  for (const slug of slugs) {
    const imagePath = await findImage(POSTS_DIR, slug);
    if (!imagePath) {
      rows.push({ slug, source: "MISSING", sizeKB: 0, risk: 99, reasons: ["no image file"] });
      continue;
    }
    const meta = await readMeta(POSTS_DIR, slug);
    const source = meta?.source ?? "unknown";
    const st = await stat(imagePath);
    const hash = await hashFile(imagePath);
    if (!hashes.has(hash)) hashes.set(hash, []);
    hashes.get(hash).push(slug);

    const { score, reasons } = scoreRisk({ source, sizeBytes: st.size });
    rows.push({
      slug,
      source,
      sizeKB: Math.round(st.size / 1024),
      risk: score,
      reasons,
      hash
    });
  }

  // Mark duplicate-hash entries.
  for (const [hash, dupSlugs] of hashes) {
    if (dupSlugs.length > 1) {
      for (const r of rows) {
        if (r.hash === hash) {
          r.risk += 3;
          r.reasons.push(`dup of ${dupSlugs.filter((s) => s !== r.slug).join(", ")}`);
        }
      }
    }
  }

  rows.sort((a, b) => b.risk - a.risk);

  console.log("\nAI-risk audit (higher = more likely to look AI-generated):\n");
  console.log("RISK  SRC             KB     SLUG  /  REASONS");
  console.log("----  --------------  -----  -----------------------------------");
  for (const r of rows) {
    const src = r.source.padEnd(14).slice(0, 14);
    console.log(
      `${String(r.risk).padStart(4)}  ${src}  ${String(r.sizeKB).padStart(5)}  ${r.slug}  [${r.reasons.join(", ")}]`
    );
  }

  const totals = rows.reduce(
    (acc, r) => {
      acc[r.source] = (acc[r.source] ?? 0) + 1;
      return acc;
    },
    {}
  );
  console.log("\nSummary:", totals);

  const high = rows.filter((r) => r.risk >= 5);
  console.log(`\nHigh-risk images (replace first): ${high.length}`);
  for (const r of high.slice(0, 10)) console.log("  -", r.slug);
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});

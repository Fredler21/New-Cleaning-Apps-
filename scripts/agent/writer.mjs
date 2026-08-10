// Generate a brand-new Post (matching src/types/post.ts) from a topic brief.
// Uses Claude (Anthropic Messages API). Outputs strict JSON.

import { readFile, access } from "node:fs/promises";
import { constants as FS } from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

const ANTHROPIC_API = "https://api.anthropic.com/v1/messages";
const DEFAULT_MODEL = "claude-sonnet-4-5";

// Word-count targets (step-body content, not metadata).
// Calibrated against existing posts: median 1,600, avg 1,780, range 1,294-2,955.
const MIN_WORDS = 1500;
const TARGET_WORDS = 2000;
const MAX_WORDS = 2800;

const POSTS_PATH = path.join(process.cwd(), "src", "data", "posts.ts");
const POSTS_IMG_DIR = path.join(process.cwd(), "public", "uploads");

// ---------------------------------------------------------------------------
// Dash stripping: the user wants no em-dashes / en-dashes / stylistic " - "
// in prose. We keep intra-word hyphens ("anti-bacterial") intact.
// ---------------------------------------------------------------------------
export const stripDashes = (text) => {
  if (typeof text !== "string") return text;
  return text
    .replace(/\s*[\u2014\u2013]\s*/g, ", ") // em & en dash -> comma
    .replace(/\s+-\s+/g, ", ")              // " - " stylistic dash -> comma
    .replace(/,\s*,/g, ",")                 // collapse double commas
    .replace(/\s{2,}/g, " ")                // collapse double spaces
    .replace(/\s+([.,;:!?])/g, "$1")        // tidy punctuation spacing
    .trim();
};

// Recursively strip dashes from every string in the Post object.
export const sanitizePost = (post) => {
  const walk = (val) => {
    if (typeof val === "string") return stripDashes(val);
    if (Array.isArray(val)) return val.map(walk);
    if (val && typeof val === "object") {
      const out = {};
      for (const [k, v] of Object.entries(val)) out[k] = walk(v);
      return out;
    }
    return val;
  };
  return walk(post);
};

// ---------------------------------------------------------------------------
// Few-shot example: pull the first complete post object literal from posts.ts
// so Claude has a real, current example of the exact shape + voice.
// ---------------------------------------------------------------------------
const extractFirstPostLiteral = (src) => {
  // Find the start of the posts array, then the first "{" inside it.
  const arrStart = src.indexOf("posts: Post[]");
  if (arrStart === -1) return null;

  const firstBrace = src.indexOf("{", arrStart);
  if (firstBrace === -1) return null;

  // Walk forward tracking brace depth, ignoring braces inside string literals.
  let depth = 0;
  let inString = false;
  let stringChar = "";
  let escape = false;

  for (let i = firstBrace; i < src.length; i++) {
    const c = src[i];

    if (escape) {
      escape = false;
      continue;
    }
    if (c === "\\") {
      escape = true;
      continue;
    }
    if (inString) {
      if (c === stringChar) inString = false;
      continue;
    }
    if (c === '"' || c === "'" || c === "`") {
      inString = true;
      stringChar = c;
      continue;
    }
    if (c === "{") depth++;
    else if (c === "}") {
      depth--;
      if (depth === 0) {
        return src.slice(firstBrace, i + 1);
      }
    }
  }
  return null;
};

export const loadExamplePost = async () => {
  try {
    const src = await readFile(POSTS_PATH, "utf8");
    return extractFirstPostLiteral(src);
  } catch {
    return null;
  }
};

// ---------------------------------------------------------------------------
// Prompt
// ---------------------------------------------------------------------------
const VOICE_GUIDE = `
VOICE & STYLE RULES (non-negotiable):
- Write authoritatively and clearly. Use "I" sparingly and never invent personal anecdotes.
  Prefer phrasing like "this method works well on", "the most reliable approach is",
  "for stubborn buildup, do X", "this is what holds up best in real homes".
- Every step body is 4-8 sentences. Concrete details (times, quantities, surface types,
  what to look for, what can go wrong).
- Include at least one "what doesn't work well" or "what to watch out for" moment per post.
- No emojis. No marketing adjectives ("amazing", "incredible", "ultimate").
- No "in conclusion" / "in summary" type wrap-ups.
- Do NOT fabricate first-person test stories (e.g., "I scrubbed for 20 minutes and watched
  the grime lift"). Stick to factual, instructive language.
- HARD RULE, no invented evidence. Never claim that anyone tested, timed, measured, tracked,
  or compared anything, and never invent a result from such a claim. That means no
  "I tested X methods", no "in my testing", no "side by side test", no "after N trials",
  no invented percentages, flow rates, minute counts, or before/after numbers.
  Publishing fabricated evidence is a Google misrepresentation-policy violation and it is
  what got this site rejected from AdSense. Explain the underlying chemistry and cite what
  a method does and why; do not manufacture a study to justify it.
- Quantities and dwell times must come from documented cleaning chemistry or manufacturer
  guidance, presented as instructions ("give it 12 hours"), never as measured findings
  ("12 hours was what worked in my trial").

LENGTH RULES (CRITICAL — readers expect long-form, SEO depends on it):
- Step bodies combined MUST total ${MIN_WORDS}-${MAX_WORDS} words (target: ~${TARGET_WORDS}).
- Each step body should be 150-250 words. NEVER less than 120 words per step.
- Pack each step with: specific quantities, dwell times, surface types, what to look for,
  the common way this step goes wrong, roughly how long it takes, and how it compares in
  cost to a commercial product. State these as instruction, not as findings from a trial.
- If you are tempted to wrap up early or summarize, instead go deeper on mechanism: why the
  chemistry works, which surfaces it damages, what the failure mode looks like.

PUNCTUATION RULES (CRITICAL):
- DO NOT use em-dashes (—) anywhere. Never.
- DO NOT use en-dashes (–) anywhere. Never.
- DO NOT use " - " (space-hyphen-space) as a stylistic break. Use commas, periods, or parentheses instead.
- Hyphens inside compound words are fine ("anti-bacterial", "front-loader").

STRUCTURE RULES:
- Last two steps MUST be:
    (a) "What actually worked best and what I kept using afterward"
    (b) "Mistakes that..." (specific to the topic)
`;

const buildPrompt = ({
  topic,
  sourceHint,
  existingCategories,
  existingSlugs,
  examplePostLiteral
}) => `
You are writing a new cleaning-hacks blog post for trycleaninghacks.com.

TOPIC: ${topic}

${sourceHint ? `INSPIRATION (re-cover the angle, do NOT copy wording):\n${sourceHint}\n` : ""}

EXISTING CATEGORIES (pick the best match for "category"):
${existingCategories.join(", ")}

DO NOT USE THESE SLUGS (collisions):
${existingSlugs.slice(-50).join(", ")}

${VOICE_GUIDE}

${
  examplePostLiteral
    ? `EXAMPLE of an existing post on this site. Match this exact shape, length, and tone.
Notice: 10-12 steps, supplies list, proTips, safetyNotes, faqs. Match it.

=== EXAMPLE POST (do NOT copy content, only structure & voice) ===
${examplePostLiteral}
=== END EXAMPLE ===
`
    : ""
}

OUTPUT FORMAT: return ONLY a JSON object matching this TypeScript type.

type Post = {
  title: string;            // 8-14 words, specific, no clickbait, NO dashes
  slug: string;             // kebab-case, unique, 4-9 words
  datePublished: string;    // today's ISO date YYYY-MM-DD
  author: "Fredler Pierre-Louis";
  category: string;         // one of the existing categories above
  readTime: string;         // e.g. "11 min"
  tags: string[];           // 3-5 short tags
  excerpt: string;          // 2-3 sentences framing the problem and what the guide solves.
                            // NO dashes. NO claims that anyone tested or measured anything.
  coverImage: string;       // "/uploads/<slug>.jpg"
  supplies: string[];       // 5-8 items
  steps: { title: string; body: string }[];  // 10-12 steps, last two per the voice rules
  proTips: string[];        // 3 items
  safetyNotes: string[];    // 3 items, real chemistry/material warnings
  faqs: { question: string; answer: string }[];  // 3 items
};

Return ONLY the JSON. No markdown fences, no commentary.
`;

export const generatePost = async ({
  topic,
  sourceHint,
  existingCategories,
  existingSlugs,
  apiKey = process.env.ANTHROPIC_API_KEY,
  model = process.env.ANTHROPIC_MODEL || DEFAULT_MODEL
}) => {
  if (!apiKey) throw new Error("ANTHROPIC_API_KEY is required");

  const examplePostLiteral = await loadExamplePost();

  // Generate once. If the result is too thin, retry once with an explicit
  // length-boost note. Two attempts max so we never burn through credits.
  let post = await callClaude({
    apiKey,
    model,
    prompt: buildPrompt({
      topic,
      sourceHint,
      existingCategories,
      existingSlugs,
      examplePostLiteral
    })
  });

  let { words } = wordStats(post);
  console.log(`[writer] step-body words: ${words} (target ${MIN_WORDS}-${MAX_WORDS})`);

  if (words < MIN_WORDS) {
    console.log(`[writer] post is too short (${words} < ${MIN_WORDS}). Retrying once...`);
    const retryPrompt =
      buildPrompt({
        topic,
        sourceHint,
        existingCategories,
        existingSlugs,
        examplePostLiteral
      }) +
      `\n\nIMPORTANT: Your previous draft was only ${words} words and was rejected. ` +
      `This time, write step bodies of 180-250 words each. ` +
      `Add specific test details: how long it took, what you used, what surprised you, ` +
      `quantities, dwell times, before/after measurements. Hit at least ${MIN_WORDS} words total.`;

    post = await callClaude({ apiKey, model, prompt: retryPrompt });
    words = wordStats(post).words;
    console.log(`[writer] retry produced ${words} words.`);
  }

  if (words < MIN_WORDS) {
    throw new Error(
      `Generated post is below the minimum word count after retry (${words} < ${MIN_WORDS}). Aborting.`
    );
  }

  // Force-fix a few fields the model sometimes drifts on.
  post.author = post.author || "Fredler Pierre-Louis";
  post.datePublished = new Date().toISOString().slice(0, 10);
  post.coverImage = `/uploads/${post.slug}.png`;

  // Post-process: strip any em/en/stylistic dashes from every string field.
  post = sanitizePost(post);

  // Hard gate: refuse to emit a post that fabricates evidence.
  assertNoFabricatedEvidence(post);

  return post;
};

// ---------------------------------------------------------------------------
// Fabricated-evidence guard.
//
// The site was rejected from AdSense for content that claimed hands-on testing
// that never happened, complete with invented percentages and timings. Prompt
// wording alone is not a sufficient safeguard against that recurring, so this
// is enforced in code: any draft that claims someone tested, timed, measured,
// or compared something is rejected outright rather than published.
// ---------------------------------------------------------------------------
const FABRICATION_PATTERNS = [
  /\bI (tested|timed|measured|tracked|compared|trialled|trialed)\b/i,
  /\bI (spent|ran) [^.]{0,40}\b(testing|trials?|test|comparing|measuring|tracking)\b/i,
  /\bin my (testing|tests|trial|trials|experiment|experiments)\b/i,
  /\bside[ -]by[ -]side (test|tests|testing|trial|trials)\b/i,
  /\bafter \d+ (trials?|tests?|rounds? of testing)\b/i,
  /\b(we|our team) (tested|timed|measured|verified by testing)\b/i,
  /\bmy (test|testing|trial|experiment)\b/i,
  /\btest runs?\b/i,
  /\bhands[ -]on (tested|testing)\b/i,
];

export const findFabricatedEvidence = (post) => {
  const hits = [];
  const walk = (val, path) => {
    if (typeof val === "string") {
      for (const re of FABRICATION_PATTERNS) {
        const m = val.match(re);
        if (m) hits.push({ path, phrase: m[0] });
      }
      return;
    }
    if (Array.isArray(val)) return val.forEach((v, i) => walk(v, `${path}[${i}]`));
    if (val && typeof val === "object") {
      for (const [k, v] of Object.entries(val)) walk(v, path ? `${path}.${k}` : k);
    }
  };
  walk(post, "");
  return hits;
};

export const assertNoFabricatedEvidence = (post) => {
  const hits = findFabricatedEvidence(post);
  if (hits.length === 0) return;
  const detail = hits.map((h) => `  ${h.path}: "${h.phrase}"`).join("\n");
  throw new Error(
    `Draft claims testing that did not happen, refusing to publish.\n${detail}\n\n` +
      `Rewrite these as instruction or mechanism ("give it 12 hours", "the acid ` +
      `dissolves the oxide") rather than as findings from a trial. See the ` +
      `"How We Use AI" section of the editorial policy for why this matters.`
  );
};

// ---------------------------------------------------------------------------
// Internal: single Claude call returning a parsed Post.
// ---------------------------------------------------------------------------
const callClaude = async ({ apiKey, model, prompt }) => {
  const res = await fetch(ANTHROPIC_API, {
    method: "POST",
    headers: {
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
      "content-type": "application/json"
    },
    body: JSON.stringify({
      model,
      max_tokens: 12000, // bumped to give Claude room for long bodies
      messages: [{ role: "user", content: prompt }]
    })
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Claude API error ${res.status}: ${body}`);
  }

  const data = await res.json();
  const text = data?.content?.[0]?.text?.trim();
  if (!text) throw new Error("Claude returned no text content");

  const cleaned = text.replace(/^```(?:json)?\s*/i, "").replace(/```$/i, "").trim();

  try {
    return JSON.parse(cleaned);
  } catch (err) {
    throw new Error(`Claude output was not valid JSON: ${err.message}\n--- raw ---\n${text}`);
  }
};

// ---------------------------------------------------------------------------
// Word counter for step bodies.
// ---------------------------------------------------------------------------
export const wordStats = (post) => {
  const bodies = (post?.steps || []).map((s) => s?.body || "");
  const totalWords = bodies.join(" ").split(/\s+/).filter(Boolean).length;
  return {
    words: totalWords,
    stepCount: bodies.length,
    avgPerStep: bodies.length ? Math.round(totalWords / bodies.length) : 0
  };
};

// ---------------------------------------------------------------------------
// Image-prompt builder with variety + collision check.
// ---------------------------------------------------------------------------
const SETTING_POOL = [
  "bright modern kitchen counter with morning sunlight",
  "small apartment bathroom with overhead light",
  "older home laundry room with a single window",
  "kitchen sink area with a checkered dish towel nearby",
  "tiled bathroom vanity with a folded hand towel",
  "rustic wooden countertop with potted herbs in the background",
  "white subway-tile backsplash, daylight from the side",
  "warm-toned kitchen with butcher-block counter"
];

const ANGLE_POOL = [
  "slight top-down angle",
  "eye-level angle, shallow depth of field",
  "45-degree angle from the side",
  "close-up product-focused angle",
  "wide angle showing the surrounding surface"
];

// Deterministic pick: same slug -> same image variation (so reruns are stable),
// but different slugs -> different settings/angles -> no duplicate-looking images.
const pickByHash = (slug, pool, salt) => {
  const h = crypto.createHash("sha1").update(slug + salt).digest();
  return pool[h[0] % pool.length];
};

/**
 * Returns { slug, prompt } and also throws if a cover image already exists
 * for this slug (caller can decide what to do).
 */
export const buildImagePrompt = (post) => {
  const setting = pickByHash(post.slug, SETTING_POOL, "setting");
  const angle = pickByHash(post.slug, ANGLE_POOL, "angle");

  return {
    slug: post.slug,
    prompt:
      `Candid smartphone-style photo for a cleaning post about ${post.title}. ` +
      `Show ${post.supplies.slice(0, 3).join(", ")} in a ${setting}. ` +
      `${angle}. Natural daylight, lived-in, no text, no logos, no people's faces. ` +
      `Vertical 2:3 framing. Slight imperfection, realistic depth of field.`
  };
};

/**
 * Throws if /uploads/<slug>.{jpg,png} already exists.
 * Call this BEFORE running the Gemini pipeline to avoid silently overwriting
 * a real human-curated cover image with an AI one.
 */
export const assertNoExistingCover = async (slug) => {
  for (const ext of ["jpg", "jpeg", "png", "webp"]) {
    const p = path.join(POSTS_IMG_DIR, `${slug}.${ext}`);
    try {
      await access(p, FS.F_OK);
      throw new Error(
        `Cover image already exists at public/uploads/${slug}.${ext}. ` +
          `Refusing to overwrite. Pick a different slug or remove the existing file.`
      );
    } catch (err) {
      if (err.code !== "ENOENT") throw err;
    }
  }
};

#!/usr/bin/env node
// Orchestrator for the auto-post agent.
//
// Flow:
//   1. Load state ledger
//   2. Pick a topic:
//        --topic="..."  -> use it directly
//        else           -> Pinterest Trends + Google Trends (merged, deduped)
//   3. Generate Post JSON (Claude)
//   4. Append to src/data/posts.ts
//   5. Generate cover image (Gemini, via existing pipeline) UNLESS --dry-run
//   6. Run `npm run typecheck`
//   7. Commit on a new branch + open PR (unless --no-pr)
//   8. Update state ledger

import { readFile, writeFile } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import path from "node:path";
import "dotenv/config";
import dotenv from "dotenv";
dotenv.config({ path: path.join(process.cwd(), ".env.local"), override: true });

import { pickTopics } from "./topic-picker.mjs";
import { generatePost, buildImagePrompt, assertNoExistingCover } from "./writer.mjs";
import { pickRelatedSlugs, updateInternalLinksFile } from "./related-picker.mjs";

const ROOT = process.cwd();
const STATE_PATH = path.join(ROOT, "scripts", "agent", "state.json");
const POSTS_PATH = path.join(ROOT, "src", "data", "posts.ts");
const CATS_PATH = path.join(ROOT, "src", "data", "categories.ts");
const GEMINI_PROMPTS_PATH = path.join(ROOT, "scripts", "gemini-image-prompts.json");

const args = process.argv.slice(2);
const flag = (name) => args.includes(`--${name}`);
const argv = (name) => {
  const hit = args.find((a) => a.startsWith(`--${name}=`));
  return hit ? hit.split("=").slice(1).join("=") : undefined;
};

const DRY_RUN = flag("dry-run");
const NO_PR = flag("no-pr");
const FORCED_TOPIC = argv("topic");
const MAX = Number(argv("max") ?? 1);

const log = (...m) => console.log("[agent]", ...m);
const die = (msg) => {
  console.error("[agent] FATAL:", msg);
  process.exit(1);
};

const loadJson = async (p) => JSON.parse(await readFile(p, "utf8"));
const saveJson = async (p, data) =>
  writeFile(p, JSON.stringify(data, null, 2) + "\n");

const extractCategorySlugs = async () => {
  const src = await readFile(CATS_PATH, "utf8");
  return Array.from(src.matchAll(/slug:\s*"([^"]+)"/g)).map((m) => m[1]);
};

const extractExistingSlugs = async () => {
  const src = await readFile(POSTS_PATH, "utf8");
  return Array.from(src.matchAll(/\bslug:\s*"([^"]+)"/g)).map((m) => m[1]);
};

const extractExistingTitles = async () => {
  const src = await readFile(POSTS_PATH, "utf8");
  return Array.from(src.matchAll(/\btitle:\s*"([^"]+)"/g)).map((m) => m[1]);
};

const appendPostToFile = async (post) => {
  const src = await readFile(POSTS_PATH, "utf8");
  // Find the final "];" that closes the posts array.
  const closeIdx = src.lastIndexOf("];");
  if (closeIdx === -1) die("Could not find closing `];` in posts.ts");

  const before = src.slice(0, closeIdx).trimEnd();
  const after = src.slice(closeIdx);
  const needsComma = !before.endsWith(",");

  const literal = `${needsComma ? "," : ""}\n  ${JSON.stringify(post, null, 2)
    .split("\n")
    .join("\n  ")}\n`;

  await writeFile(POSTS_PATH, before + literal + after);
};

const queueImagePrompt = async ({ slug, prompt }) => {
  let list = [];
  try {
    list = await loadJson(GEMINI_PROMPTS_PATH);
  } catch {
    list = [];
  }
  const idx = list.findIndex((it) => it.slug === slug);
  const entry = { slug, prompt };
  if (idx >= 0) list[idx] = entry;
  else list.push(entry);
  await saveJson(GEMINI_PROMPTS_PATH, list);
};

const sh = (cmd, args, opts = {}) => {
  log(`$ ${cmd} ${args.join(" ")}`);
  const r = spawnSync(cmd, args, { stdio: "inherit", cwd: ROOT, ...opts });
  if (r.status !== 0) throw new Error(`${cmd} ${args.join(" ")} failed (${r.status})`);
};

const main = async () => {
  log(DRY_RUN ? "DRY RUN" : "LIVE RUN", NO_PR ? "(no PR)" : "");
  const state = await loadJson(STATE_PATH);

  // ---------- 1. Pick topic ----------
  let topic = FORCED_TOPIC;
  let sourceHint = "";
  let pickedFrom = "forced";

  if (!topic) {
    const existingTitles = await extractExistingTitles();
    const candidates = await pickTopics({
      pinterestToken: process.env.PINTEREST_ACCESS_TOKEN,
      publishedSlugs: state.publishedSlugs,
      existingTitles,
      queuedTopics: state.queuedTopics,
      limit: 5
    });

    if (candidates.length === 0) {
      die("No fresh topics found after filtering. Try widening seeds or clearing queuedTopics.");
    }

    log("Top 5 candidates:");
    for (const c of candidates) {
      log(
        `  - "${c.keyword}"  score=${c.score.toFixed(1)} ` +
          `[${c.sources.join("+")}] (pin=${c.pinterestScore.toFixed(1)}, goog=${c.googleScore.toFixed(1)})`
      );
    }

    const winner = candidates[0];
    topic = winner.keyword;
    sourceHint = `Trending in ${winner.sources.join(" + ")} (score ${winner.score.toFixed(1)}).`;
    pickedFrom = winner.sources.join("+");
  }

  log(`Topic: ${topic}`);

  // ---------- 2. Generate post ----------
  const existingCategories = await extractCategorySlugs();
  const existingSlugs = await extractExistingSlugs();

  if (DRY_RUN) {
    log("Dry-run — skipping Claude call.");
    log("Would generate post for topic:", topic);
    return;
  }

  log("Generating post with Claude...");
  const post = await generatePost({
    topic,
    sourceHint,
    existingCategories,
    existingSlugs
  });

  if (existingSlugs.includes(post.slug)) {
    die(`Slug collision: ${post.slug} already exists. Aborting.`);
  }

  // Refuse to overwrite an existing cover image with the same slug.
  await assertNoExistingCover(post.slug);

  log(`Generated post: ${post.slug}  (${post.steps.length} steps)`);

  // ---------- 3. Append to posts.ts ----------
  await appendPostToFile(post);
  log("Appended to src/data/posts.ts");

  // ---------- 3b. Update internal-links.ts (cross-linking) ----------
  try {
    const related = await pickRelatedSlugs(post, { limit: 4 });
    if (related.length > 0) {
      const { reciprocated } = await updateInternalLinksFile(post, related);
      log(
        `Internal links: new entry -> [${related.join(", ")}]` +
          (reciprocated.length > 0
            ? ` ; reciprocated into [${reciprocated.join(", ")}]`
            : "")
      );
    } else {
      log("No related posts found — skipping internal-links update.");
    }
  } catch (err) {
    log("Internal links update failed (continuing):", err.message);
  }

  // ---------- 4. Queue image generation ----------
  const imgPrompt = buildImagePrompt(post);
  await queueImagePrompt(imgPrompt);
  log("Queued Gemini image prompt.");

  // ---------- 5. Typecheck ----------
  sh("npm", ["run", "typecheck"]);

  // ---------- 6. Generate image (best-effort) ----------
  if (process.env.GEMINI_API_KEY) {
    try {
      sh("npm", ["run", "generate:images:candid"]);
    } catch (err) {
      log("Image generation failed (continuing):", err.message);
    }
  } else {
    log("GEMINI_API_KEY not set — skipping image gen.");
  }

  // ---------- 7. Commit + PR ----------
  if (!NO_PR) {
    const branch = `agent/post-${post.slug}`;
    sh("git", ["checkout", "-b", branch]);
    sh("git", ["add", "-A"]);
    sh("git", ["commit", "-m", `chore(agent): add post "${post.title}"`]);
    sh("git", ["push", "-u", "origin", branch]);

    // gh CLI is preinstalled on GitHub Actions runners.
    try {
      sh("gh", [
        "pr",
        "create",
        "--title",
        `Auto-post: ${post.title}`,
        "--body",
        `Generated by the auto-post agent.\n\n- Slug: \`${post.slug}\`\n- Topic source: ${pickedFrom}\n- Review the post body & cover image before merging.`,
        "--base",
        "main",
        "--head",
        branch
      ]);
    } catch (err) {
      log("gh pr create failed (branch is pushed, open PR manually):", err.message);
    }
  } else {
    log("--no-pr set: skipping commit/PR.");
  }

  // ---------- 8. Update ledger ----------
  state.lastRun = new Date().toISOString();
  state.publishedSlugs.push(post.slug);
  state.runs.push({
    at: state.lastRun,
    pickedFrom,
    topic,
    slug: post.slug
  });
  await saveJson(STATE_PATH, state);
  log("Ledger updated. Done.");
};

main().catch((err) => die(err.stack || err.message));

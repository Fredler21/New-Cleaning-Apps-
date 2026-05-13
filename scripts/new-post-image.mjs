// Add (or update) a single Unsplash query and immediately fetch the image.
//
// Usage:
//   npm run new:post-image -- --slug=my-new-slug --query="kitchen sink modern"
//   npm run new:post-image -- --slug=my-slug --query="..." --orientation=landscape
//   npm run new:post-image -- --slug=my-slug --query="..." --force   (re-download)
//
// What it does:
//   1. Adds the slug+query to scripts/unsplash-image-queries.json
//      (or updates the existing entry).
//   2. Spawns scripts/fetch-unsplash-images.mjs which downloads only this
//      slug (because all others already exist and are auto-skipped).
//   3. The fetcher auto-updates src/data/posts.ts coverImage paths
//      from .png -> .jpg if needed.

import { readFile, writeFile } from "node:fs/promises";
import { spawn } from "node:child_process";
import path from "node:path";

const args = process.argv.slice(2);
const getArg = (name) => {
  const hit = args.find((a) => a.startsWith(`--${name}=`));
  return hit ? hit.split("=").slice(1).join("=") : undefined;
};

const slug = getArg("slug");
const query = getArg("query");
const orientation = getArg("orientation") ?? "portrait";
const force = args.includes("--force");

if (!slug || !query) {
  console.error(
    'Usage: npm run new:post-image -- --slug=<slug> --query="<search>" [--orientation=portrait|landscape|squarish] [--force]'
  );
  process.exit(1);
}

const queriesPath = path.join(process.cwd(), "scripts", "unsplash-image-queries.json");

const raw = await readFile(queriesPath, "utf8");
const list = JSON.parse(raw);
const idx = list.findIndex((item) => item.slug === slug);
const entry = { slug, query, orientation };

if (idx >= 0) {
  list[idx] = entry;
  console.log(`Updated existing entry for ${slug}`);
} else {
  list.push(entry);
  console.log(`Added new entry for ${slug}`);
}

await writeFile(queriesPath, JSON.stringify(list, null, 2) + "\n");

// Run the fetcher; it will skip everything except the new/updated slug.
const child = spawn(
  "node",
  ["scripts/fetch-unsplash-images.mjs", ...(force ? ["--force"] : [])],
  { stdio: "inherit" }
);

child.on("exit", (code) => process.exit(code ?? 0));

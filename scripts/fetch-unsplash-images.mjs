// Fetch real photos from Unsplash to replace AI-generated images.
//
// Why: AI cleaning images often look "stock-y" and trigger ad-network
// (Ezoic / AdSense / Mediavine) rejections + can hurt Google trust signals.
// Mixing in real photos strengthens E-E-A-T and brand-safety signals.
//
// Setup:
//   1. Create a free Unsplash developer app: https://unsplash.com/developers
//   2. Copy the Access Key.
//   3. Run:  UNSPLASH_ACCESS_KEY=xxx npm run fetch:unsplash
//
// Behavior:
//   - Reads scripts/unsplash-image-queries.json -> [{ slug, query, orientation? }]
//   - Downloads the top match for each query into public/uploads/<slug>.jpg
//   - Writes a sidecar <slug>.meta.json with attribution (required by
//     Unsplash API guidelines).
//   - Skips slugs whose .jpg already exists unless --force is passed.
//
// Flags:
//   --force        Overwrite existing files
//   --dry-run      List actions without downloading
//   --dir=<sub>    Output to public/graphics/<sub> instead of /posts

import { readFile, writeFile, mkdir, access } from "node:fs/promises";
import path from "node:path";
import "dotenv/config";
import dotenv from "dotenv";
// .env.local takes precedence (Next.js convention)
dotenv.config({ path: path.join(process.cwd(), ".env.local"), override: true });

const accessKey = process.env.UNSPLASH_ACCESS_KEY;
if (!accessKey) {
  console.error("Missing UNSPLASH_ACCESS_KEY. Get one at https://unsplash.com/developers");
  process.exit(1);
}

const args = process.argv.slice(2);
const flag = (name) => args.includes(name);
const FORCE = flag("--force");
const DRY = flag("--dry-run");
const SKIP_POSTS_UPDATE = flag("--no-update-posts");
const dirArg = args.find((a) => a.startsWith("--dir="));
const subDir = dirArg ? dirArg.split("=")[1] : "posts";

const queriesPath = path.join(process.cwd(), "scripts", "unsplash-image-queries.json");
const outDir = path.join(process.cwd(), "public", "graphics", subDir);
const postsPath = path.join(process.cwd(), "src", "data", "posts.ts");

const updatedSlugs = new Set();

const triggerDownload = async (downloadLocation) => {
  // Per Unsplash API guidelines, hit the download endpoint to register the use.
  await fetch(`${downloadLocation}?client_id=${accessKey}`).catch(() => {});
};

const searchOne = async ({ query, orientation = "portrait" }) => {
  const url = new URL("https://api.unsplash.com/search/photos");
  url.searchParams.set("query", query);
  url.searchParams.set("per_page", "5");
  url.searchParams.set("orientation", orientation);
  url.searchParams.set("content_filter", "high");

  const res = await fetch(url, {
    headers: { Authorization: `Client-ID ${accessKey}` }
  });
  if (!res.ok) {
    throw new Error(`Unsplash search failed (${res.status}): ${await res.text()}`);
  }
  const data = await res.json();
  const photo = data.results?.[0];
  if (!photo) throw new Error(`No Unsplash results for "${query}"`);
  return photo;
};

const run = async () => {
  await mkdir(outDir, { recursive: true });
  const raw = await readFile(queriesPath, "utf8");
  const items = JSON.parse(raw);

  for (const item of items) {
    const filePath = path.join(outDir, `${item.slug}.jpg`);
    const metaPath = path.join(outDir, `${item.slug}.meta.json`);

    if (!FORCE) {
      try {
        await access(filePath);
        console.log(`Skip ${item.slug} (exists)`);
        continue;
      } catch {
        /* not present */
      }
    }

    try {
      const photo = await searchOne(item);
      const downloadUrl = photo.urls.regular; // ~1080px wide, JPEG
      console.log(`${DRY ? "[dry-run] " : ""}${item.slug} <- ${photo.user.name} (${photo.id})`);

      if (DRY) continue;

      const imgRes = await fetch(downloadUrl);
      if (!imgRes.ok) throw new Error(`Image fetch failed: ${imgRes.status}`);
      const buf = Buffer.from(await imgRes.arrayBuffer());
      await writeFile(filePath, buf);

      // Required attribution sidecar.
      await writeFile(
        metaPath,
        JSON.stringify(
          {
            slug: item.slug,
            source: "unsplash",
            unsplashId: photo.id,
            photographer: photo.user.name,
            photographerUrl: `${photo.user.links.html}?utm_source=cleaninghax&utm_medium=referral`,
            photoUrl: `${photo.links.html}?utm_source=cleaninghax&utm_medium=referral`,
            altDescription: photo.alt_description ?? null,
            fetchedAt: new Date().toISOString()
          },
          null,
          2
        )
      );

      // Register a download with Unsplash (API requirement).
      if (photo.links.download_location) {
        await triggerDownload(photo.links.download_location);
      }

      updatedSlugs.add(item.slug);
    } catch (err) {
      console.error(`Failed ${item.slug}:`, err.message);
    }
  }

  // Auto-update coverImage paths in src/data/posts.ts from .png -> .jpg
  if (!DRY && !SKIP_POSTS_UPDATE && updatedSlugs.size > 0) {
    try {
      let posts = await readFile(postsPath, "utf8");
      let changed = 0;
      for (const slug of updatedSlugs) {
        const before = `/graphics/${subDir}/${slug}.png`;
        const after = `/graphics/${subDir}/${slug}.jpg`;
        if (posts.includes(before)) {
          posts = posts.split(before).join(after);
          changed += 1;
        }
      }
      if (changed > 0) {
        await writeFile(postsPath, posts);
        console.log(`\nUpdated ${changed} coverImage path(s) in src/data/posts.ts`);
      }
    } catch (err) {
      console.warn("Could not auto-update posts.ts:", err.message);
    }
  }
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});

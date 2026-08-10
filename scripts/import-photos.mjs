#!/usr/bin/env node
/**
 * Import original photographs for a post.
 *
 * Phone photos are 3-5 MB, often rotated via EXIF, and carry GPS coordinates
 * of the house they were taken in. This script fixes all three: it strips
 * metadata (including location), applies the EXIF rotation for real, resizes
 * to something a web page should serve, and writes both a web-sized and a
 * Pinterest-sized (1000x1500) version.
 *
 * Usage:
 *   node scripts/import-photos.mjs --slug=how-to-clean-an-air-fryer ./shots/*.jpg
 *   node scripts/import-photos.mjs --slug=<slug> --pair before.jpg after.jpg
 *
 * Output:
 *   public/photos/<slug>/<name>.jpg          1600px wide, stripped
 *   public/photos/<slug>/<name>@pin.jpg      1000x1500, for Pinterest
 *
 * It then prints a ready-to-paste `photos:` block for src/data/posts.ts.
 * Captions are left as TODO on purpose: a caption written by whoever took the
 * photo is the entire point, and is not something to generate.
 */

import { readdir, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const args = process.argv.slice(2);
const flag = (n) => args.includes(`--${n}`);
const val = (n) => {
  const hit = args.find((a) => a.startsWith(`--${n}=`));
  return hit ? hit.slice(n.length + 3) : undefined;
};

const slug = val("slug");
const files = args.filter((a) => !a.startsWith("--"));
const isPair = flag("pair");

if (!slug || files.length === 0) {
  console.error(`
Import original photos for a post.

  node scripts/import-photos.mjs --slug=<post-slug> <image>...
  node scripts/import-photos.mjs --slug=<post-slug> --pair <before> <after>

Strips EXIF (including GPS), fixes rotation, and writes web + Pinterest sizes.
`);
  process.exit(1);
}

if (isPair && files.length !== 2) {
  console.error("--pair expects exactly two files: before then after");
  process.exit(1);
}

const OUT_DIR = path.join(process.cwd(), "public", "photos", slug);
await mkdir(OUT_DIR, { recursive: true });

const entries = [];

for (const [i, file] of files.entries()) {
  const base = path
    .basename(file, path.extname(file))
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  const webName = `${base}.jpg`;
  const pinName = `${base}@pin.jpg`;

  // .rotate() with no argument applies the EXIF orientation and then drops it,
  // so the pixels are physically correct and no viewer has to interpret a tag.
  // Not passing `withMetadata` means EXIF (and therefore GPS) is discarded.
  const src = sharp(file).rotate();

  await src
    .clone()
    .resize({ width: 1600, withoutEnlargement: true })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(path.join(OUT_DIR, webName));

  await src
    .clone()
    .resize({ width: 1000, height: 1500, fit: "cover", position: "attention" })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(path.join(OUT_DIR, pinName));

  entries.push({
    src: `/photos/${slug}/${webName}`,
    pair: isPair ? (i === 0 ? "before" : "after") : undefined,
  });

  console.log(`  ✓ ${webName}  +  ${pinName}`);
}

const today = new Date().toISOString().slice(0, 10);

const block =
  `  photos: [\n` +
  entries
    .map(
      (e) =>
        `    {\n` +
        `      src: "${e.src}",\n` +
        `      alt: "TODO: describe what is visibly in the frame",\n` +
        `      caption: "TODO: tell the reader what they are looking at",\n` +
        (e.pair ? `      pair: "${e.pair}",\n` : "") +
        `      takenOn: "${today}",\n` +
        `    },`
    )
    .join("\n") +
  `\n  ],`;

await writeFile(path.join(OUT_DIR, "_snippet.txt"), block + "\n");

console.log(`\nWrote ${entries.length} photo(s) to public/photos/${slug}/`);
console.log(`Paste this into the "${slug}" post in src/data/posts.ts:\n`);
console.log(block);
console.log(`\n(also saved to public/photos/${slug}/_snippet.txt)`);
console.log(
  `\nFill in the alt and caption yourself. A caption from the person who took\n` +
    `the photo is the whole value of the section.`
);

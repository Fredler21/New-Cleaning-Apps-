/**
 * Bring a REAL photo into /public/uploads properly.
 *
 *   node scripts/add-real-photo.mjs <slug> <path-to-photo> [--name custom-file-name]
 *
 * What it does, and why:
 *   - Strips ALL EXIF. Phone photos carry GPS coordinates of where they were
 *     taken, and these go on a public website. This is the important part.
 *   - Resizes to 1600px wide max and re-encodes at quality 82, which is where
 *     these stop getting visibly better and start costing page speed.
 *   - Writes a sidecar <name>.meta.json with source "original" so the image is
 *     recorded as ours rather than inheriting a "gemini" tag from whatever file
 *     it replaced.
 *   - Leaves posts.ts alone. Point coverImage (and coverCaption / coverAlt) at
 *     the result yourself so the change is visible in the diff.
 *
 * Never point this at a generated or stock image. The "original" tag is a
 * provenance claim and it is the only one on the site that has to hold up.
 */
import { readFile, writeFile, mkdir, access } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const args = process.argv.slice(2);
const flagIndex = args.indexOf("--name");
const customName = flagIndex !== -1 ? args[flagIndex + 1] : null;
const positional = args.filter((a, i) => a !== "--name" && i !== flagIndex + 1);
const [slug, sourcePath] = positional;

if (!slug || !sourcePath) {
  console.error("Usage: node scripts/add-real-photo.mjs <slug> <path-to-photo> [--name file-name]");
  process.exit(1);
}

const MAX_WIDTH = 1600;
const QUALITY = 82;
const uploadsDir = path.join(process.cwd(), "public", "uploads");
const baseName = (customName ?? slug).replace(/\.jpe?g$/i, "");

const run = async () => {
  try {
    await access(sourcePath);
  } catch {
    console.error(`Cannot read ${sourcePath} — check the path.`);
    process.exit(1);
  }

  await mkdir(uploadsDir, { recursive: true });
  const input = await readFile(sourcePath);
  const before = await sharp(input).metadata();

  const outPath = path.join(uploadsDir, `${baseName}.jpg`);
  const image = sharp(input).rotate(); // bake in EXIF orientation before we drop EXIF
  if (before.width && before.width > MAX_WIDTH) {
    image.resize({ width: MAX_WIDTH, withoutEnlargement: true });
  }
  // .jpeg() re-encodes from raw pixels, so EXIF/GPS/IPTC do not survive.
  const output = await image.jpeg({ quality: QUALITY, mozjpeg: true }).toBuffer();
  await writeFile(outPath, output);

  const after = await sharp(output).metadata();
  await writeFile(
    path.join(uploadsDir, `${baseName}.meta.json`),
    `${JSON.stringify({ slug, source: "original", width: after.width, height: after.height }, null, 2)}\n`
  );

  const hadGps = Boolean(before.exif);
  const kb = (n) => `${Math.round(n / 1024)} KB`;
  console.log(`  in : ${before.width}x${before.height}  ${kb(input.length)}  exif: ${hadGps ? "present (stripped)" : "none"}`);
  console.log(`  out: ${after.width}x${after.height}  ${kb(output.length)}  -> public/uploads/${baseName}.jpg`);
  console.log(`\n  Now set in posts.ts for "${slug}":`);
  console.log(`    coverImage: "/uploads/${baseName}.jpg",`);
};

run().catch((error) => {
  console.error(error);
  process.exit(1);
});

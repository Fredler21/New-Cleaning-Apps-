/**
 * Cut a side-by-side before/after composite into two separate photos.
 *
 *   node scripts/split-before-after.mjs <name> <path-to-composite> [--gap 8]
 *
 * Writes public/uploads/<name>-before.jpg and <name>-after.jpg, so the two
 * halves can sit in different places in the article — the "before" under the
 * intro where the problem is introduced, the "after" below the steps.
 *
 * --gap trims N pixels off the inner edge of each half, for composites with a
 * divider line down the middle. Default 6, which clears a typical hairline
 * without eating into the photo.
 *
 * Same handling as add-real-photo.mjs: EXIF stripped (phone photos carry GPS
 * of the house and these go on a public site), orientation baked in first, and
 * a sidecar meta written with source "original".
 *
 * Only for real photography. "original" is a provenance claim.
 */
import { readFile, writeFile, mkdir, access } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const args = process.argv.slice(2);
const gapIndex = args.indexOf("--gap");
const gap = gapIndex !== -1 ? Number.parseInt(args[gapIndex + 1], 10) : 6;
// Drop the flag and its value only when the flag is actually present —
// gapIndex + 1 would otherwise be 0 and swallow the first real argument.
const positional = args.filter((_, i) => gapIndex === -1 || (i !== gapIndex && i !== gapIndex + 1));
const [name, sourcePath] = positional;

if (!name || !sourcePath || Number.isNaN(gap)) {
  console.error("Usage: node scripts/split-before-after.mjs <name> <path-to-composite> [--gap 6]");
  process.exit(1);
}

const MAX_WIDTH = 1200;
const QUALITY = 82;
const uploadsDir = path.join(process.cwd(), "public", "uploads");

const run = async () => {
  try {
    await access(sourcePath);
  } catch {
    console.error(`Cannot read ${sourcePath} — check the path.`);
    process.exit(1);
  }

  await mkdir(uploadsDir, { recursive: true });
  const input = await readFile(sourcePath);
  // .rotate() with no argument applies the EXIF orientation, so the crop maths
  // below operate on the image as it actually looks rather than as stored.
  const upright = await sharp(input).rotate().toBuffer();
  const meta = await sharp(upright).metadata();
  const width = meta.width ?? 0;
  const height = meta.height ?? 0;

  if (!width || !height) {
    console.error("Could not read image dimensions.");
    process.exit(1);
  }

  const half = Math.floor(width / 2);
  const halfWidth = half - gap;
  if (halfWidth < 1) {
    console.error(`--gap ${gap} is too large for a ${width}px wide image.`);
    process.exit(1);
  }

  console.log(`  source: ${width}x${height}, splitting at ${half}px with a ${gap}px gap`);

  const halves = [
    { label: "before", left: 0 },
    { label: "after", left: half + gap },
  ];

  for (const { label, left } of halves) {
    // Clamp so an odd-width source cannot ask for a pixel past the edge.
    const extractWidth = Math.min(halfWidth, width - left);
    const pipeline = sharp(upright)
      .extract({ left, top: 0, width: extractWidth, height })
      .resize({ width: MAX_WIDTH, withoutEnlargement: true });
    // .jpeg() re-encodes from raw pixels, so EXIF/GPS/IPTC do not survive.
    const output = await pipeline.jpeg({ quality: QUALITY, mozjpeg: true }).toBuffer();
    const outName = `${name}-${label}`;
    await writeFile(path.join(uploadsDir, `${outName}.jpg`), output);

    const outMeta = await sharp(output).metadata();
    await writeFile(
      path.join(uploadsDir, `${outName}.meta.json`),
      `${JSON.stringify({ slug: outName, source: "original", width: outMeta.width, height: outMeta.height }, null, 2)}\n`
    );
    console.log(`  ${label.padEnd(6)} -> ${outMeta.width}x${outMeta.height}  ${Math.round(output.length / 1024)} KB  public/uploads/${outName}.jpg`);
  }

  console.log(`\n  exif on source: ${meta.exif ? "present (stripped from both halves)" : "none"}`);
};

run().catch((error) => {
  console.error(error);
  process.exit(1);
});

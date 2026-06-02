import { readFile, writeFile, readdir, unlink, stat } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const DIR = path.join(process.cwd(), "public", "uploads");
const files = await readdir(DIR);
const metas = files.filter((f) => f.endsWith(".meta.json"));

let restored = 0, skipped = 0;
for (const m of metas) {
  const slug = m.replace(/\.meta\.json$/, "");
  const metaPath = path.join(DIR, m);
  const meta = JSON.parse(await readFile(metaPath, "utf8"));
  if (meta.source !== "unsplash") { skipped++; continue; }

  const pngPath = path.join(DIR, `${slug}.png`);
  const jpgPath = path.join(DIR, `${slug}.jpg`);
  try {
    await stat(pngPath);
  } catch {
    console.log(`No PNG fallback for ${slug}, leaving as Unsplash`);
    skipped++;
    continue;
  }

  // Re-process the original Gemini PNG into a clean JPEG.
  const buf = await readFile(pngPath);
  const out = await sharp(buf)
    .rotate()
    .resize({ width: 1600, withoutEnlargement: true })
    .jpeg({ quality: 82, mozjpeg: true })
    .withMetadata({})
    .toBuffer();
  await writeFile(jpgPath, out);
  await unlink(pngPath);

  // Rewrite sidecar to gemini, drop unsplash fields.
  const newMeta = {
    slug,
    source: meta.source === "gemini-candid" ? "gemini-candid" : "gemini",
    model: meta.model || "gemini-image",
    generatedAt: meta.generatedAt || new Date().toISOString(),
    restoredFromUnsplashAt: new Date().toISOString(),
  };
  await writeFile(metaPath, JSON.stringify(newMeta, null, 2));
  restored++;
  console.log(`Restored ${slug}`);
}
console.log(`\nDone. Restored ${restored}, skipped ${skipped}.`);

#!/usr/bin/env node
/**
 * Burns BEFORE / AFTER labels onto the illustrated comparison images.
 *
 * Input:  assets/before-after/*.jpg   the delivered composites
 * Output: public/before-after/*.jpg   the same images, labelled
 *
 * Each composite already contains both halves. What it does not carry is any
 * indication of which half is which, and a reader landing mid-scroll has no
 * reason to assume left is the dirty one. The labels go on here rather than in
 * the component so they travel with the image into Pinterest, search results
 * and anywhere else it gets lifted out of the page.
 *
 *   npm run build:before-after
 */
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SRC_DIR = path.join(ROOT, "assets", "before-after");
const OUT_DIR = path.join(ROOT, "public", "before-after");

/**
 * How each composite is put together, and whether it arrived already labelled.
 * "split" is where the two halves meet: side-by-side images are cut left/right,
 * stacked ones top/bottom.
 */
const IMAGES = [
  { file: "baseboards.jpg", split: "side-by-side" },
  { file: "bathroom-caulk.jpg", split: "side-by-side" },
  { file: "bathroom-sink.jpg", split: "side-by-side" },
  { file: "faucet.jpg", split: "side-by-side" },
  { file: "humidifier.jpg", split: "side-by-side" },
  { file: "laundry-room.jpg", split: "side-by-side" },
  { file: "living-room.jpg", split: "side-by-side" },
  { file: "plunger.jpg", split: "side-by-side" },
  { file: "shower-stall.jpg", split: "side-by-side" },
  // Ships with its own BEFORE/AFTER set into the artwork. Labelling it again
  // would put two sets of type on one image.
  { file: "showerhead.jpg", split: "stacked", preLabelled: true },
  { file: "tile-grout.jpg", split: "side-by-side" },
  { file: "washing-machine.jpg", split: "stacked" },
];

// Label styling. This is the badge PostPhotos already draws over paired photos,
// reproduced in pixels: white uppercase on a translucent black pill, which is
// the one combination that stays readable over both a grimy corner and a
// bright white tile.
const PILL_ALPHA = 0.72;
const TEXT_COLOR = "#ffffff";
const FONT = "Arial, Helvetica, DejaVu Sans, sans-serif";

/** Rough advance width for bold uppercase sans, good enough to size a pill. */
const textWidth = (text, size, tracking) => text.length * size * 0.66 + (text.length - 1) * tracking;

function labelSvg(text, size) {
  const tracking = Math.round(size * 0.1);
  const padX = Math.round(size * 0.62);
  const padY = Math.round(size * 0.38);
  const w = Math.round(textWidth(text, size, tracking) + padX * 2);
  const h = Math.round(size + padY * 2);
  const baseline = Math.round(h / 2 + size * 0.36);
  return {
    width: w,
    height: h,
    svg: Buffer.from(
      `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}">` +
        `<rect width="${w}" height="${h}" rx="${Math.round(h * 0.22)}" fill="rgba(0,0,0,${PILL_ALPHA})"/>` +
        `<text x="${padX}" y="${baseline}" font-family="${FONT}" font-size="${size}" font-weight="700"` +
        ` letter-spacing="${tracking}" fill="${TEXT_COLOR}">${text}</text>` +
        `</svg>`
    ),
  };
}

async function main() {
  await fs.mkdir(OUT_DIR, { recursive: true });
  const rows = [];

  for (const { file, split, preLabelled } of IMAGES) {
    const src = path.join(SRC_DIR, file);
    const out = path.join(OUT_DIR, file);
    const meta = await sharp(src).metadata();
    const { width: W, height: H } = meta;

    let pipeline = sharp(src);

    if (!preLabelled) {
      // Size the type off the short edge of one half, so a label never grows
      // past the thing it is labelling.
      const halfW = split === "side-by-side" ? W / 2 : W;
      const halfH = split === "side-by-side" ? H : H / 2;
      const size = Math.max(15, Math.round(Math.min(halfW, halfH) * 0.075));
      const inset = Math.round(size * 0.6);

      const before = labelSvg("BEFORE", size);
      const after = labelSvg("AFTER", size);
      pipeline = pipeline.composite([
        { input: before.svg, left: inset, top: inset },
        {
          input: after.svg,
          left: split === "side-by-side" ? Math.round(W / 2) + inset : inset,
          top: split === "side-by-side" ? inset : Math.round(H / 2) + inset,
        },
      ]);
    }

    await pipeline.jpeg({ quality: 86, chromaSubsampling: "4:4:4", mozjpeg: true }).toFile(out);
    const { size } = await fs.stat(out);
    rows.push(
      `  ${file.padEnd(22)} ${String(W).padStart(4)}x${String(H).padEnd(5)} ${split.padEnd(13)}` +
        `${preLabelled ? "already labelled" : "labelled"}  ${(size / 1024).toFixed(0)} KB`
    );
  }

  console.log(`wrote ${rows.length} images to ${path.relative(ROOT, OUT_DIR).replace(/\\/g, "/")}`);
  console.log(rows.join("\n"));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

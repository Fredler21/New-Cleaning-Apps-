#!/usr/bin/env node
/**
 * Builds every brand asset the site serves, from the two delivered master logos.
 *
 * Input:  assets/brand/logo-source.png        the day logo, on a flat white field
 *         assets/brand/logo-source-night.png  the Night Shift logo, on a dark field
 * Output: public/brand/*.png                  transparent lockups and icons
 *         public/favicon.ico                  browser tab and search result icon
 *
 * Why a script instead of checked-in exports only: both masters are rasters with
 * a baked-in background, so every derivative (transparent lockup, emblem crop,
 * favicon sizes) is a deterministic transform of them. Replace a master, re-run
 * this, and every size stays in sync.
 *
 *   npm run build:brand
 */
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import pngToIco from "png-to-ico";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SRC_DAY = path.join(ROOT, "assets", "brand", "logo-source.png");
const SRC_NIGHT = path.join(ROOT, "assets", "brand", "logo-source-night.png");
const BRAND_DIR = path.join(ROOT, "public", "brand");
const PUBLIC_DIR = path.join(ROOT, "public");
const DIMS_MODULE = path.join(ROOT, "src", "data", "brand.ts");
// Height the components declare for a lockup. next/image builds its srcset from
// the declared size, so quoting the 240px export would ship a 1080w source for a
// logo painted at ~160px. The ratio is what matters; CSS sets the real height.
const DECLARED_H = 60;

// ── Background removal, day logo ──────────────────────────────────────────────
// The art sits on a flat ~#fdfdfd field, and the only near-white shapes that
// must survive (the house wall, the bottle label) are fully enclosed by dark
// linework, so a flood fill seeded from the border separates them safely.
// Verified against those two shapes: at luminance 225 the fill leaks into the
// bottle label, at 235 it does not.
const BG_LUM = 235; // max channel at or above this reads as background
const BG_SAT = 16; // ...and only when the pixel is near-neutral
// Feather band: pixels this close to the background get luminance-based alpha,
// which dissolves the soft drop shadow and the antialiased edges instead of
// leaving a gray halo when the logo sits on a dark navbar.
const FEATHER_PX = 5;
const FEATHER_CLEAR = 250; // fully transparent at or above this luminance
const FEATHER_SOLID = 215; // fully opaque at or below

// ── Background removal, Night Shift logo ──────────────────────────────────────
// This one is drawn on a flat near-black field that measures 22 to 30, and its
// darkest surviving detail, the house windows, sits at 97. Nothing depends on
// enclosure the way the white shapes do, so a straight luminance ramp beats a
// flood fill here. The ramp starts above the field and ends below the windows,
// which drops the field completely and leaves the blue glow hugging the ring,
// about 16px of it, as the soft edge it was drawn to be.
const NIGHT_CLEAR = 40; // fully transparent at or below this luminance
const NIGHT_SOLID = 90; // fully opaque at or above

/** @typedef {{ raw: Buffer, W: number, H: number }} Master */

/**
 * Lift the day logo off its white field.
 * @returns {Promise<Master>}
 */
async function liftOffWhite(src) {
  const { data, info } = await sharp(src).raw().toBuffer({ resolveWithObject: true });
  const { width: W, height: H, channels: C } = info;
  const n = W * H;

  const lum = new Uint8Array(n);
  const sat = new Uint8Array(n);
  for (let p = 0; p < n; p++) {
    const i = p * C;
    const r = data[i], g = data[i + 1], b = data[i + 2];
    const hi = Math.max(r, g, b);
    lum[p] = hi;
    sat[p] = hi - Math.min(r, g, b);
  }

  // 1. Flood fill the background inward from the image border.
  const bg = new Uint8Array(n);
  const stack = [];
  const seed = (x, y) => {
    const p = y * W + x;
    if (!bg[p] && lum[p] >= BG_LUM && sat[p] <= BG_SAT) { bg[p] = 1; stack.push(p); }
  };
  for (let x = 0; x < W; x++) { seed(x, 0); seed(x, H - 1); }
  for (let y = 0; y < H; y++) { seed(0, y); seed(W - 1, y); }
  while (stack.length) {
    const p = stack.pop();
    const x = p % W, y = (p - x) / W;
    if (x > 0) seed(x - 1, y);
    if (x < W - 1) seed(x + 1, y);
    if (y > 0) seed(x, y - 1);
    if (y < H - 1) seed(x, y + 1);
  }

  // 2. Chebyshev distance from the background, capped, via two sweeps. Only
  //    pixels inside that band are eligible for soft alpha.
  const CAP = FEATHER_PX + 1;
  const dist = new Int16Array(n);
  for (let p = 0; p < n; p++) dist[p] = bg[p] ? 0 : CAP;
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const p = y * W + x;
      let d = dist[p];
      if (y > 0) d = Math.min(d, dist[p - W] + 1);
      if (x > 0) d = Math.min(d, dist[p - 1] + 1);
      if (y > 0 && x > 0) d = Math.min(d, dist[p - W - 1] + 1);
      if (y > 0 && x < W - 1) d = Math.min(d, dist[p - W + 1] + 1);
      dist[p] = d;
    }
  }
  for (let y = H - 1; y >= 0; y--) {
    for (let x = W - 1; x >= 0; x--) {
      const p = y * W + x;
      let d = dist[p];
      if (y < H - 1) d = Math.min(d, dist[p + W] + 1);
      if (x < W - 1) d = Math.min(d, dist[p + 1] + 1);
      if (y < H - 1 && x < W - 1) d = Math.min(d, dist[p + W + 1] + 1);
      if (y < H - 1 && x > 0) d = Math.min(d, dist[p + W - 1] + 1);
      dist[p] = d;
    }
  }

  const out = Buffer.alloc(n * 4);
  const span = FEATHER_CLEAR - FEATHER_SOLID;
  for (let p = 0; p < n; p++) {
    const i = p * C;
    out[p * 4] = data[i];
    out[p * 4 + 1] = data[i + 1];
    out[p * 4 + 2] = data[i + 2];
    let a = 255;
    if (bg[p]) a = 0;
    else if (dist[p] <= FEATHER_PX && sat[p] <= 20) {
      a = Math.max(0, Math.min(255, Math.round(((FEATHER_CLEAR - lum[p]) * 255) / span)));
    }
    out[p * 4 + 3] = a;
  }
  return { raw: out, W, H };
}

/**
 * Lift the Night Shift logo off its near-black field.
 * @returns {Promise<Master>}
 */
async function liftOffBlack(src) {
  const { data, info } = await sharp(src).raw().toBuffer({ resolveWithObject: true });
  const { width: W, height: H, channels: C } = info;
  const n = W * H;
  const out = Buffer.alloc(n * 4);
  const span = NIGHT_SOLID - NIGHT_CLEAR;
  for (let p = 0; p < n; p++) {
    const i = p * C;
    const r = data[i], g = data[i + 1], b = data[i + 2];
    out[p * 4] = r;
    out[p * 4 + 1] = g;
    out[p * 4 + 2] = b;
    const hi = Math.max(r, g, b);
    out[p * 4 + 3] = Math.max(0, Math.min(255, Math.round(((hi - NIGHT_CLEAR) * 255) / span)));
  }
  return { raw: out, W, H };
}

/** Rows and columns that hold any meaningfully opaque pixel. */
function inkProfile({ raw, W, H }) {
  const rows = new Int32Array(H);
  const cols = new Int32Array(W);
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      if (raw[(y * W + x) * 4 + 3] > 24) { rows[y]++; cols[x]++; }
    }
  }
  return { rows, cols };
}

function bounds(counts, minInk = 1) {
  let lo = 0, hi = counts.length - 1;
  while (lo < counts.length && counts[lo] < minInk) lo++;
  while (hi > lo && counts[hi] < minInk) hi--;
  return { lo, hi };
}

/**
 * Both masters are an emblem stacked over a wordmark, and in this artwork the
 * two almost touch: the leaf tips and the tail of the outer ring sit a pixel or
 * two above the wordmark's cap line, so there is no empty row to split on. Take
 * the quietest row in the middle of the artwork instead, then walk down to the
 * last row before ink steps up into that cap line.
 *
 * @returns the last row that belongs to the emblem
 */
function findStackSplit(rows, top, bottom) {
  const from = top + Math.round((bottom - top) * 0.45);
  const to = top + Math.round((bottom - top) * 0.75);
  let min = Infinity, at = from;
  for (let y = from; y <= to; y++) if (rows[y] < min) { min = rows[y]; at = y; }
  const ceiling = Math.max(min * 2, min + 40);
  let y = at;
  while (y + 1 <= to && rows[y + 1] <= ceiling) y++;
  return y;
}

/**
 * Contiguous bands of ink, split on runs of near-empty rows. Bands only a few
 * rows tall are discarded: on the Night Shift master a sparkle sitting just
 * above the sub-line reads as its own two-row band, and would otherwise be
 * counted as a line of type.
 */
function inkBands(rows, top, bottom, minHeight = 6) {
  let peak = 0;
  for (let y = top; y <= bottom; y++) peak = Math.max(peak, rows[y]);
  const quiet = Math.max(2, Math.round(peak * 0.02));
  const bands = [];
  let band = null;
  for (let y = top; y <= bottom; y++) {
    if (rows[y] > quiet) {
      band = band ?? { top: y, bottom: y };
      band.bottom = y;
    } else if (band) {
      bands.push(band);
      band = null;
    }
  }
  if (band) bands.push(band);
  return bands.filter((b) => b.bottom - b.top + 1 >= minHeight);
}

const PNG = { compressionLevel: 9, effort: 10, palette: true, quality: 100, dither: 1 };
const PNG_TRUE = { compressionLevel: 9, effort: 10 };
const CLEAR = { r: 0, g: 0, b: 0, alpha: 0 };
const WHITE = { r: 255, g: 255, b: 255, alpha: 1 };

const written = [];
async function write(file, pipeline) {
  const target = path.join(file.startsWith("favicon") ? PUBLIC_DIR : BRAND_DIR, file);
  await pipeline.toFile(target);
  const { size } = await fs.stat(target);
  const meta = await sharp(target).metadata();
  written.push(`  ${path.relative(ROOT, target).replace(/\\/g, "/")}  ${meta.width}x${meta.height}  ${(size / 1024).toFixed(1)} KB`);
}

/**
 * Cut one master into the lockups the site uses.
 *
 * @param {Master} master
 * @param {string} prefix file prefix, "logo" or "logo-night"
 * @returns the emblem art tight to its own ink, for the caller to build icons from
 */
async function buildLockups(master, prefix, { dropSubline = false } = {}) {
  const { W } = master;
  const create = () => sharp(master.raw, { raw: { width: master.W, height: master.H, channels: 4 } });
  const { rows, cols } = inkProfile(master);

  const rowB = bounds(rows, 2);
  const colB = bounds(cols, 2);
  const split = findStackSplit(rows, rowB.lo, rowB.hi);
  const emblem = { top: rowB.lo, bottom: split };
  const wordmark = { top: split + 1, bottom: rowB.hi };

  // The wordmark is a stack of type bands. The tagline ("cleaner home smarter
  // life") is the last of them, set much smaller and set off by a wide gap: it
  // is unreadable in a 68px navbar, so the horizontal lockup stops above it
  // while the stacked exports keep it.
  const bands = inkBands(rows, wordmark.top, wordmark.bottom);
  const last = bands[bands.length - 1];
  const prior = bands[bands.length - 2];
  const isTagline =
    bands.length > 1 &&
    last.top - prior.bottom >= 12 &&
    last.bottom - last.top <= (prior.bottom - bands[0].top) * 0.4;
  const tagline = isTagline ? last : null;

  // The Night Shift master carries one extra line of type between the name and
  // the tagline. The site uses that artwork purely as the dark-mode cut of the
  // one logo, so the sub-line comes out and the tagline closes back up under
  // the name, at the spacing the artwork already puts above it.
  const nameBands = tagline ? bands.slice(0, -1) : bands.slice();
  const subline = dropSubline && nameBands.length >= 3 ? nameBands.pop() : null;
  const nameEnd = nameBands[nameBands.length - 1].bottom;
  const nameOnly = { top: wordmark.top, bottom: nameEnd };
  const taglineGap = tagline
    ? tagline.top - (subline ?? nameBands[nameBands.length - 1]).bottom - 1
    : 0;

  console.log(`\n${prefix}`);
  console.log(`  content rows  ${rowB.lo}..${rowB.hi}   cols ${colB.lo}..${colB.hi}`);
  console.log(`  emblem rows   ${emblem.top}..${emblem.bottom}`);
  console.log(`  wordmark      ${wordmark.top}..${wordmark.bottom}  bands ${bands.map((b) => `${b.top}..${b.bottom}`).join(", ")}`);
  console.log(`  name only     ${nameOnly.top}..${nameOnly.bottom}${tagline ? " (tagline dropped from the horizontal lockup)" : ""}`);
  if (subline) {
    console.log(`  sub-line      ${subline.top}..${subline.bottom} removed, tagline reflowed ${taglineGap}px under the name`);
  }

  /**
   * The rows that survive into an export, as one sharp pipeline. With nothing
   * removed they are still contiguous and come straight off the master. With a
   * band taken out, the remaining pieces are stacked back up with the gap the
   * artwork put above the tagline; cropping every piece at the same columns is
   * what keeps each line centered where it was drawn.
   */
  const keptRows = async (top, bottom, left, width) => {
    const cut = (t, b) =>
      create().extract({ left, top: t, width, height: b - t + 1 }).png(PNG_TRUE).toBuffer();
    if (!subline) return create().extract({ left, top, width, height: bottom - top + 1 });

    const head = await cut(top, nameEnd);
    const tail = await cut(tagline.top, tagline.bottom);
    const headH = nameEnd - top + 1;
    const tailH = tagline.bottom - tagline.top + 1;
    // Materialised before returning: sharp runs resize ahead of composite
    // whatever order the caller chains them in, and resizing the canvas first
    // would leave the pieces too big to land on it.
    const stacked = await sharp({
      create: { width, height: headH + taglineGap + tailH, channels: 4, background: CLEAR },
    })
      .composite([
        { input: head, left: 0, top: 0 },
        { input: tail, left: 0, top: headH + taglineGap },
      ])
      .png(PNG_TRUE)
      .toBuffer();
    return sharp(stacked);
  };

  // 1. Full stacked lockup, trimmed to its ink.
  await write(
    `${prefix}.png`,
    (await keptRows(rowB.lo, rowB.hi, colB.lo, colB.hi - colB.lo + 1))
      .resize({ width: 1000, fit: "inside", kernel: "lanczos3" })
      .png(PNG)
  );

  /** Crop a row band tight to its own ink and return it as a PNG buffer. */
  const cropBand = async ({ top, bottom }) => {
    const bandCols = new Int32Array(W);
    for (let y = top; y <= bottom; y++) {
      for (let x = 0; x < W; x++) if (master.raw[(y * W + x) * 4 + 3] > 24) bandCols[x]++;
    }
    const b = bounds(bandCols, 2);
    return create()
      .extract({ left: b.lo, top, width: b.hi - b.lo + 1, height: bottom - top + 1 })
      .png(PNG)
      .toBuffer();
  };

  // 2. Emblem on its own, squared on a transparent canvas.
  const embArt = await cropBand(emblem);
  const embMeta = await sharp(embArt).metadata();
  const side = Math.max(embMeta.width, embMeta.height);
  // sharp runs resize before extend whatever order they are called in, so the
  // square canvas has to be materialised before it can be scaled down.
  const embSquare = await sharp(embArt)
    .extend({
      left: Math.floor((side - embMeta.width) / 2),
      right: Math.ceil((side - embMeta.width) / 2),
      top: Math.floor((side - embMeta.height) / 2),
      bottom: Math.ceil((side - embMeta.height) / 2),
      background: CLEAR,
    })
    .png(PNG)
    .toBuffer();
  await write(`${prefix}-mark.png`, sharp(embSquare).resize(512, 512, { kernel: "lanczos3" }).png(PNG));

  // 3. Wordmark on its own, name plus tagline.
  const wordCols = new Int32Array(W);
  for (let y = wordmark.top; y <= wordmark.bottom; y++) {
    if (subline && y >= subline.top && y <= subline.bottom) continue;
    for (let x = 0; x < W; x++) if (master.raw[(y * W + x) * 4 + 3] > 24) wordCols[x]++;
  }
  const wordB = bounds(wordCols, 2);
  await write(
    `${prefix}-wordmark.png`,
    (await keptRows(wordmark.top, wordmark.bottom, wordB.lo, wordB.hi - wordB.lo + 1))
      .resize({ width: 800, fit: "inside", kernel: "lanczos3" })
      .png(PNG)
  );

  // 4. Horizontal lockup for the 68px navbar. The delivered logo is a square
  //    stack: shrink that to a readable header height and the name goes
  //    illegible. Setting the emblem and the name side by side keeps both
  //    readable at about 40px tall.
  const LOCK_H = 240;
  const embScaled = await sharp(embArt).resize({ height: LOCK_H, kernel: "lanczos3" }).png(PNG).toBuffer();
  const nameScaled = await sharp(await cropBand(nameOnly))
    .resize({ height: Math.round(LOCK_H * 0.68), kernel: "lanczos3" }) // optical balance against the emblem
    .png(PNG)
    .toBuffer();
  const em = await sharp(embScaled).metadata();
  const nm = await sharp(nameScaled).metadata();
  const GAP = Math.round(LOCK_H * 0.08);
  const lockW = em.width + GAP + nm.width;
  await write(
    `${prefix}-horizontal.png`,
    sharp({ create: { width: lockW, height: LOCK_H, channels: 4, background: CLEAR } })
      .composite([
        { input: embScaled, left: 0, top: 0 },
        { input: nameScaled, left: em.width + GAP, top: Math.round((LOCK_H - nm.height) / 2) },
      ])
      .png(PNG)
  );

  return {
    embArt,
    embMeta,
    lockup: {
      src: `/brand/${prefix}-horizontal.png`,
      width: Math.round((lockW * DECLARED_H) / LOCK_H),
      height: DECLARED_H,
    },
  };
}

/**
 * Every icon is the emblem, never the full stack: the wordmark is unreadable
 * below ~96px, and Google sources the search-result favicon from a square image
 * it then renders at roughly 16 to 24px.
 *
 * The emblem is 1.38:1, because the decorative outer ring is much wider than
 * the scene is tall. Letterboxing it into a square wastes 27% of the linear
 * size and the house stops reading at 24px, so the icon crop is a centered
 * square just taller than the scene: the far left and right of the ring trim
 * off, the subject grows by about a third, and one piece of artwork covers
 * every size, so a tab, a home screen and a search result all show one mark.
 */
async function buildIcons(embArt, embMeta) {
  const { data, info } = await sharp(embArt).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  let inkSum = 0, inkWeighted = 0;
  for (let x = 0; x < info.width; x++) {
    let col = 0;
    for (let y = 0; y < info.height; y++) if (data[(y * info.width + x) * 4 + 3] > 24) col++;
    inkSum += col;
    inkWeighted += col * x;
  }
  const centroidX = Math.round(inkWeighted / inkSum);
  const cropSide = Math.min(embMeta.width, Math.round(embMeta.height * 1.04));
  const cropLeft = Math.max(0, Math.min(embMeta.width - cropSide, centroidX - Math.round(cropSide / 2)));
  const padY = Math.max(0, cropSide - embMeta.height);
  const iconArt = await sharp(
    await sharp(embArt)
      .extract({ left: cropLeft, top: 0, width: cropSide, height: embMeta.height })
      .png(PNG)
      .toBuffer()
  )
    .extend({ top: Math.floor(padY / 2), bottom: Math.ceil(padY / 2), background: CLEAR })
    .png(PNG)
    .toBuffer();
  console.log(`\nicons\n  crop ${cropSide}px square at x=${cropLeft} (ink centroid x=${centroidX})`);

  const iconSquare = async (size, { background = CLEAR, padRatio = 0.02 } = {}) => {
    const inner = Math.round(size * (1 - padRatio * 2));
    const pad = Math.round((size - inner) / 2);
    const art = await sharp(iconArt).resize(inner, inner, { kernel: "lanczos3" }).png(PNG).toBuffer();
    return sharp({ create: { width: size, height: size, channels: 4, background } })
      .composite([{ input: art, left: pad, top: pad }])
      .png(PNG);
  };

  for (const size of [512, 192, 96, 48, 32, 16]) {
    await write(`icon-${size}.png`, await iconSquare(size));
  }
  // iOS composites a transparent touch icon onto black, so this one keeps the
  // logo's own white field.
  await write("apple-touch-icon.png", await iconSquare(180, { background: WHITE, padRatio: 0.05 }));
  // Maskable Android icon: the launcher crops to a circle, so pull the art in.
  await write("icon-maskable-512.png", await iconSquare(512, { background: WHITE, padRatio: 0.16 }));

  // favicon.ico. 48px is the size Google asks for; 16 and 32 keep browser tabs
  // crisp. Flattened onto white because .ico alpha renders inconsistently.
  const frames = await Promise.all(
    [16, 32, 48].map(async (size) => (await iconSquare(size, { background: WHITE })).png(PNG_TRUE).toBuffer())
  );
  const ico = await pngToIco(frames);
  await fs.writeFile(path.join(PUBLIC_DIR, "favicon.ico"), ico);
  written.push(`  public/favicon.ico  16/32/48  ${(ico.length / 1024).toFixed(1)} KB`);
}

/**
 * The navbar and the footer need each lockup's aspect ratio, and the two
 * masters do not share one. Emitting it beside the images means a redrawn logo
 * cannot leave a stale hard-coded size behind in a component.
 */
async function writeDimsModule(day, night) {
  const line = (name, l) =>
    `  ${name}: { src: "${l.src}", width: ${l.width}, height: ${l.height} },`;
  const body = [
    "// Generated by scripts/build-brand-assets.mjs. Do not edit by hand.",
    "//",
    "// The site paints these at a fixed height with w-auto, so the numbers below",
    "// are each lockup scaled to a common declared height: what next/image reads",
    "// off them is the aspect ratio and a sane srcset width, not the final size.",
    "",
    "export type BrandLockup = { src: string; width: number; height: number };",
    "",
    "export const BRAND_LOCKUP: Record<\"day\" | \"night\", BrandLockup> = {",
    line("day", day),
    line("night", night),
    "};",
    "",
  ].join("\n");
  await fs.mkdir(path.dirname(DIMS_MODULE), { recursive: true });
  await fs.writeFile(DIMS_MODULE, body);
  written.push(`  ${path.relative(ROOT, DIMS_MODULE).replace(/\\/g, "/")}  day ${day.width}x${day.height}, night ${night.width}x${night.height}`);
}

async function main() {
  await fs.mkdir(BRAND_DIR, { recursive: true });

  const day = await liftOffWhite(SRC_DAY);
  console.log(`day master    ${day.W}x${day.H}`);
  const { embArt, embMeta, lockup: dayLockup } = await buildLockups(day, "logo");
  await buildIcons(embArt, embMeta);
  let nightLockup = null;

  // The Night Shift master is optional, so the day assets still build without it.
  const hasNight = await fs.access(SRC_NIGHT).then(() => true, () => false);
  if (hasNight) {
    const night = await liftOffBlack(SRC_NIGHT);
    console.log(`\nnight master  ${night.W}x${night.H}`);
    ({ lockup: nightLockup } = await buildLockups(night, "logo-night", { dropSubline: true }));
  } else {
    console.log("\nno Night Shift master, skipping logo-night-*");
  }

  await writeDimsModule(dayLockup, nightLockup ?? dayLockup);

  console.log("\nwrote:");
  console.log(written.join("\n"));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

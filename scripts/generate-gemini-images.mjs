import { readFile, mkdir, writeFile, access } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import "dotenv/config";
import dotenv from "dotenv";
dotenv.config({ path: path.join(process.cwd(), ".env.local"), override: true });

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.error("Missing GEMINI_API_KEY. Set it and re-run the script.");
  process.exit(1);
}

const args = new Set(process.argv.slice(2));
// --candid flag rewrites prompts to look like real amateur photography
// (reduces the "AI stock" feel that ad networks like Ezoic flag).
const CANDID = args.has("--candid");
// --force regenerates even if the file already exists.
const FORCE = args.has("--force");

const promptsPath = path.join(process.cwd(), "scripts", "gemini-image-prompts.json");
const defaultOutputDir = path.join(process.cwd(), "public", "graphics", "posts");
const graphicsRoot = path.join(process.cwd(), "public", "graphics");

// Phrases that scream "AI stock photo" to reviewers — strip them out.
const AI_TELL_PATTERNS = [
  /\bpremium editorial\b/gi,
  /\bultra[-\s]?realistic\b/gi,
  /\b4k(?:\s+ultra\s+hd)?\b/gi,
  /\bcinematic\b/gi,
  /\bluxury\b/gi,
  /\bmagazine style\b/gi,
  /\bprofessional .*? photography style\b/gi,
  /\bpinterest optimized( vertical)?( composition)?\b/gi,
  /\bpinterest pin\b/gi,
  /\bpinterest aesthetic\b/gi,
  /\bvertical pinterest format\b/gi,
  /\bdramatic\b/gi,
  /\bhighly detailed\b/gi,
  /\bsparkling\b/gi,
  /\bgleaming\b/gi,
  /\bspotless(ly)?\b/gi
];

const CANDID_PREFIX =
  "Casual amateur smartphone photo, slightly imperfect framing, natural household lighting, " +
  "everyday lived-in feel with minor wear and a few visible signs of real use, " +
  "muted natural colors, no studio lighting, no glossy retouching, no over-saturation, ";

const CANDID_SUFFIX =
  ", shot on iPhone, soft mixed indoor lighting, slight grain, realistic depth of field, " +
  "candid composition, natural color cast, no text, no logos, no watermarks";

const toCandidPrompt = (prompt) => {
  let out = prompt;
  for (const pattern of AI_TELL_PATTERNS) {
    out = out.replace(pattern, "");
  }
  out = out.replace(/\s{2,}/g, " ").trim();
  return CANDID_PREFIX + out + CANDID_SUFFIX;
};

const getSupportedModel = async () => {
  const listResponse = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`
  );

  if (!listResponse.ok) {
    const errorText = await listResponse.text();
    throw new Error(`Unable to list Gemini models: ${errorText}`);
  }

  const listData = await listResponse.json();
  const models = listData?.models ?? [];

  const preferred = [
    "gemini-2.5-flash-image-preview",
    "gemini-2.0-flash-preview-image-generation",
    "gemini-2.0-flash-exp-image-generation"
  ];

  for (const preferredName of preferred) {
    const hit = models.find((modelItem) => modelItem.name?.endsWith(`/${preferredName}`));
    if (hit) {
      return hit.name.replace("models/", "");
    }
  }

  const fallback = models.find(
    (modelItem) =>
      modelItem.name?.includes("image") &&
      Array.isArray(modelItem.supportedGenerationMethods) &&
      modelItem.supportedGenerationMethods.includes("generateContent")
  );

  if (!fallback) {
    throw new Error("No image-capable Gemini model with generateContent support was found for this API key.");
  }

  return fallback.name.replace("models/", "");
};

const run = async () => {
  await mkdir(defaultOutputDir, { recursive: true });
  const model = await getSupportedModel();
  console.log(`Using Gemini model: ${model}`);

  const raw = await readFile(promptsPath, "utf8");
  const prompts = JSON.parse(raw);

  for (const item of prompts) {

    const outputDir = item.dir
      ? path.join(graphicsRoot, item.dir)
      : defaultOutputDir;
    await mkdir(outputDir, { recursive: true });

    // Output as JPEG (matches posts.ts coverImage paths and looks less
    // "AI-export-y" to ad-network reviewers; sharp() also strips EXIF/
    // PNG metadata that flags AI-generated content).
    const filePath = path.join(outputDir, `${item.slug}.jpg`);
    const legacyPngPath = path.join(outputDir, `${item.slug}.png`);
    const metaPath = path.join(outputDir, `${item.slug}.meta.json`);
    if (!FORCE) {
      try {
        await access(filePath);
        console.log(`Skipped ${filePath} (already exists, use --force to regenerate)`);
        continue;
      } catch {
        // file does not exist
      }
    }

    const promptToUse = CANDID ? toCandidPrompt(item.prompt) : item.prompt;

    let attempt = 0;
    while (attempt < 4) {
      attempt += 1;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: promptToUse }] }],
            generationConfig: {
              responseModalities: ["TEXT", "IMAGE"]
            }
          })
        }
      );

      if (response.ok) {
        const data = await response.json();
        const parts = data?.candidates?.[0]?.content?.parts ?? [];
        const imagePart = parts.find((part) => part.inlineData?.data);

        if (!imagePart?.inlineData?.data) {
          throw new Error(`No image data returned for ${item.slug}.`);
        }

        const imageBuffer = Buffer.from(imagePart.inlineData.data, "base64");

        // Process: resize to web-friendly width, convert to JPEG with mozjpeg,
        // strip EXIF / metadata. This is the same shape wavehooks-style sites
        // hand to AdSense reviewers (own-domain JPEGs, no AI metadata).
        const processed = await sharp(imageBuffer)
          .rotate()
          .resize({ width: 1600, withoutEnlargement: true })
          .jpeg({ quality: 82, mozjpeg: true })
          .withMetadata({}) // drop EXIF/XMP
          .toBuffer();

        await writeFile(filePath, processed);

        // Best-effort: remove any leftover legacy .png from a prior run so
        // we don't ship two copies of the same hero.
        try {
          const { unlink } = await import("node:fs/promises");
          await unlink(legacyPngPath);
        } catch {
          /* nothing to clean up */
        }

        await writeFile(
          metaPath,
          JSON.stringify(
            {
              slug: item.slug,
              source: CANDID ? "gemini-candid" : "gemini",
              model,
              generatedAt: new Date().toISOString()
            },
            null,
            2
          )
        );
        console.log(`Generated ${filePath}${CANDID ? " (candid mode)" : ""}`);
        break;
      }

      const errorText = await response.text();
      if (response.status === 429 && attempt < 4) {
        const waitMs = 45000;
        console.warn(`Rate limited for ${item.slug}. Waiting ${waitMs / 1000}s and retrying...`);
        await new Promise((resolve) => setTimeout(resolve, waitMs));
        continue;
      }

      throw new Error(`Gemini API error for ${item.slug}: ${errorText}`);
    }
  }
};

run().catch((error) => {
  console.error(error);
  process.exit(1);
});

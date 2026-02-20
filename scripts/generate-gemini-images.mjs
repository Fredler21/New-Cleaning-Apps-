import { readFile, mkdir, writeFile, access } from "node:fs/promises";
import path from "node:path";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  console.error("Missing GEMINI_API_KEY. Set it and re-run the script.");
  process.exit(1);
}

const promptsPath = path.join(process.cwd(), "scripts", "gemini-image-prompts.json");
const defaultOutputDir = path.join(process.cwd(), "public", "graphics", "posts");
const graphicsRoot = path.join(process.cwd(), "public", "graphics");

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

    const filePath = path.join(outputDir, `${item.slug}.png`);
    try {
      await access(filePath);
      console.log(`Skipped ${filePath} (already exists)`);
      continue;
    } catch {
      // file does not exist
    }

    let attempt = 0;
    while (attempt < 4) {
      attempt += 1;

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: item.prompt }] }],
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
        await writeFile(filePath, imageBuffer);
        console.log(`Generated ${filePath}`);
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

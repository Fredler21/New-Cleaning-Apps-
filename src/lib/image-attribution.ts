import { readFileSync } from "node:fs";
import path from "node:path";

export type ImageAttribution = {
  source: "unsplash" | "gemini" | "gemini-candid" | "unknown";
  photographer?: string;
  photographerUrl?: string;
  photoUrl?: string;
};

/**
 * Reads the sidecar `<slug>.meta.json` written by our image scripts
 * (fetch-unsplash-images.mjs / generate-gemini-images.mjs) and returns
 * the attribution info. Returns null if no sidecar exists.
 *
 * Safe to call from server components — reads the file synchronously
 * from /public at build/render time on the server only.
 */
export function getImageAttribution(slug: string): ImageAttribution | null {
  const candidates = [
    path.join(process.cwd(), "public", "graphics", "posts", `${slug}.meta.json`),
  ];
  for (const file of candidates) {
    try {
      const raw = readFileSync(file, "utf8");
      const meta = JSON.parse(raw) as ImageAttribution & Record<string, unknown>;
      return meta;
    } catch {
      // sidecar missing — that's fine
    }
  }
  return null;
}

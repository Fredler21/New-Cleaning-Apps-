import { readFileSync } from "node:fs";
import path from "node:path";

export type ImageAttribution = {
  /**
   * "original" means a real photo we shot ourselves. Do not use it for
   * anything generated or licensed — it is the one value here that makes a
   * provenance claim we would have to be able to defend.
   */
  source: "original" | "unsplash" | "gemini" | "gemini-candid" | "unknown";
  photographer?: string;
  photographerUrl?: string;
  photoUrl?: string;
};

/**
 * Reads the sidecar `<slug>.meta.json` written by our image scripts
 * (fetch-unsplash-images.mjs / generate-gemini-images.mjs) and returns
 * the attribution info. Returns null if no sidecar exists.
 *
 * Safe to call from server components, reads the file synchronously
 * from /public at build/render time on the server only.
 */
export function getImageAttribution(slug: string): ImageAttribution | null {
  const candidates = [
    path.join(process.cwd(), "public", "uploads", `${slug}.meta.json`),
  ];
  for (const file of candidates) {
    try {
      const raw = readFileSync(file, "utf8");
      const meta = JSON.parse(raw) as ImageAttribution & Record<string, unknown>;
      return meta;
    } catch {
      // sidecar missing, that's fine
    }
  }
  return null;
}

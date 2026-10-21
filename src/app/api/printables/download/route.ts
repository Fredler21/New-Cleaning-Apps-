import { readFile } from "node:fs/promises";
import path from "node:path";
import { getPrintable } from "@/data/printables";
import { verifyPrintableToken } from "@/lib/printable-token";

export const dynamic = "force-dynamic";

const PRINTABLES_DIR = path.join(process.cwd(), "private", "printables");

function plain(message: string, status: number) {
  return new Response(message, {
    status,
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "private, no-store" },
  });
}

/**
 * GET /api/printables/download?t=<token>
 *
 * Streams a printable from /private/printables for a valid, unexpired token.
 * The folder is outside /public, so this route is the only way to reach it.
 */
export async function GET(request: Request) {
  const token = new URL(request.url).searchParams.get("t");
  const payload = verifyPrintableToken(token);
  if (!payload) {
    return plain("This download link has expired. Enter your email on the article again to get a fresh one.", 403);
  }

  const printable = getPrintable(payload.pdf);
  if (!printable) {
    return plain("That printable is not available.", 404);
  }

  let file: Buffer;
  try {
    file = await readFile(path.join(PRINTABLES_DIR, printable.file));
  } catch {
    console.error(`[PRINTABLE] Missing file: private/printables/${printable.file}`);
    return plain("This printable is not available yet. Please check back soon.", 404);
  }

  return new Response(new Uint8Array(file), {
    status: 200,
    headers: {
      "Content-Type": "application/pdf",
      "Content-Length": String(file.length),
      "Content-Disposition": `attachment; filename="${printable.file}"`,
      "Cache-Control": "private, no-store",
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
}

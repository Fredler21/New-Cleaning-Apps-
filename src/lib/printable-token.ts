import { createHash, createHmac, timingSafeEqual } from "node:crypto";

/**
 * Signed download tokens for email-gated printables.
 *
 * After a valid email is recorded, the signup route hands the browser a
 * token. The download route accepts only a token with a valid signature that
 * has not expired. The token never appears in the page source, and it is tied
 * to one printable, so it cannot be reused for another file.
 */

const TOKEN_TTL_MS = 24 * 60 * 60 * 1000;

export type PrintableTokenPayload = {
  pdf: string;
  email: string;
  exp: number;
};

function signingSecret(): string {
  const explicit = process.env.PRINTABLE_SIGNING_SECRET;
  if (explicit && explicit.length >= 16) return explicit;
  // Fallback so a missing variable degrades to a derived key rather than an
  // outage. The Firebase private key is already a high-entropy secret on the
  // server; hashing it gives an independent key that never leaves this module.
  const fallback = process.env.FIREBASE_PRIVATE_KEY;
  if (!fallback) throw new Error("No signing secret available for printable tokens.");
  return createHash("sha256").update(`printable:${fallback}`).digest("hex");
}

export function signPrintableToken(pdf: string, email: string, now = Date.now()): string {
  const payload = Buffer.from(JSON.stringify({ pdf, email, exp: now + TOKEN_TTL_MS })).toString("base64url");
  const signature = createHmac("sha256", signingSecret()).update(payload).digest("base64url");
  return `${payload}.${signature}`;
}

export function verifyPrintableToken(token: string | null | undefined, now = Date.now()): PrintableTokenPayload | null {
  if (!token) return null;
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return null;

  const expected = createHmac("sha256", signingSecret()).update(payload).digest();
  const given = Buffer.from(signature, "base64url");
  if (given.length !== expected.length || !timingSafeEqual(given, expected)) return null;

  try {
    const data = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as Partial<PrintableTokenPayload>;
    if (typeof data.pdf !== "string" || typeof data.email !== "string" || typeof data.exp !== "number") return null;
    if (data.exp < now) return null;
    return { pdf: data.pdf, email: data.email, exp: data.exp };
  } catch {
    return null;
  }
}

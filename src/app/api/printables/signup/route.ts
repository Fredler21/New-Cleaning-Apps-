import { NextResponse } from "next/server";
import { getPrintable } from "@/data/printables";
import { validateEmail } from "@/lib/email-validation";
import { recordPrintableSignup } from "@/lib/firebase/collections";
import { signPrintableToken } from "@/lib/printable-token";

/** Allow for a Firestore cold start. */
export const maxDuration = 15;

/** A real person needs at least this long between seeing the form and sending it. */
const MIN_FORM_AGE_MS = 1500;

type SignupBody = {
  email?: string;
  pdf?: string;
  postUrl?: string;
  /** Honeypot. Hidden from people, filled in by bots. */
  website?: string;
  /** Milliseconds between the form rendering and the submit, measured in the browser. */
  formAgeMs?: number;
};

/**
 * POST /api/printables/signup
 * Body: { email, pdf, postUrl, website, formAgeMs }
 *
 * Validates the email, records the signup in Firestore (one document per
 * email, with the download history appended), and returns a signed token the
 * browser exchanges for the PDF at /api/printables/download.
 */
export async function POST(request: Request) {
  let body: SignupBody;
  try {
    body = (await request.json()) as SignupBody;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const printable = getPrintable(body.pdf);
  if (!printable) {
    return NextResponse.json({ error: "That printable is not available." }, { status: 400 });
  }

  // Honeypot tripped: answer as if it worked, hand out nothing, record nothing.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const formAge = typeof body.formAgeMs === "number" ? body.formAgeMs : 0;
  if (formAge < MIN_FORM_AGE_MS) {
    return NextResponse.json({ error: "Please try again." }, { status: 400 });
  }

  const { sanitised: email, valid, suspicious } = validateEmail(body.email ?? "");
  if (!valid) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }
  if (suspicious) {
    return NextResponse.json({ error: "Please use a regular email address, not a throwaway one." }, { status: 400 });
  }

  const postUrl =
    typeof body.postUrl === "string" && body.postUrl.startsWith("/") ? body.postUrl.slice(0, 200) : "/";

  let repeat = false;
  try {
    ({ repeat } = await recordPrintableSignup(email, printable.id, postUrl));
  } catch (err) {
    // The reader still gets the file. Losing one signup is better than a
    // visitor who typed a real email and got an error for it.
    console.error("[PRINTABLE] Firestore write failed:", err instanceof Error ? err.message : err);
  }

  const token = signPrintableToken(printable.id, email);
  return NextResponse.json({ ok: true, token, repeat, title: printable.title });
}

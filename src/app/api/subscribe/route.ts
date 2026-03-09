import { NextResponse } from "next/server";
import { sendMailWithRetry, unsubUrl, FROM_EMAIL } from "@/lib/mail";
import { addSubscriber } from "@/lib/firebase/collections";
import { sanitiseEmail, isValidEmail } from "@/lib/email-validation";
import { welcomeEmailHtml, welcomeEmailText } from "@/lib/email-template";

/** Allow up to 30 s for cold-start + email API call */
export const maxDuration = 30;

export async function POST(request: Request) {
  let body: { email?: string };

  try {
    body = (await request.json()) as { email?: string };
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!body.email) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  const email = sanitiseEmail(body.email);

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  /* ---------- Save to Firestore ---------- */
  try {
    const { duplicate, invalid } = await addSubscriber(email);
    if (invalid) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }
    if (duplicate) {
      return NextResponse.json({ message: "You're already subscribed!" });
    }
  } catch (err) {
    console.error("Firestore error (subscriber):", err);
  }

  /* ---------- Send emails (in parallel) ---------- */
  try {
    const unsub = unsubUrl(email);

    const welcomeEmail = sendMailWithRetry({
      to: email,
      subject: "Welcome to TryCleaningHacks!",
      html: welcomeEmailHtml(unsub),
      text: welcomeEmailText(unsub),
    });

    const adminNotif = sendMailWithRetry({
      to: FROM_EMAIL,
      subject: `New subscriber: ${email}`,
      isNewsletter: false,
      html: `<p><strong>New subscriber:</strong> ${email.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</p>
             <p>Saved to Firestore. Welcome email sent.</p>`,
    }, 1);

    const [welcomeResult, adminResult] = await Promise.allSettled([welcomeEmail, adminNotif]);

    if (welcomeResult.status === "fulfilled") {
      const r = welcomeResult.value;
      if (r.success) {
        console.log(`[SUBSCRIBE] Welcome email sent to ${email} via ${r.provider} (${r.id})`);
      } else {
        console.warn(`[SUBSCRIBE] Welcome email failed for ${email}: ${r.error}`);
      }
    }

    if (adminResult.status === "fulfilled" && !adminResult.value.success) {
      console.warn(`[SUBSCRIBE] Admin notification failed: ${adminResult.value.error}`);
    }
  } catch (err: unknown) {
    const errMsg = err instanceof Error ? err.message : String(err);
    console.error("[SUBSCRIBE] EMAIL_SEND_FAILED:", errMsg);
  }

  return NextResponse.json({ message: "You're subscribed! Check your inbox for weekly cleaning tips." });
}

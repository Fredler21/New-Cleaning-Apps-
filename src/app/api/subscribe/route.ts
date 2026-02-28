import { NextResponse } from "next/server";
import { sendMail, unsubUrl } from "@/lib/mail";
import { addSubscriber } from "@/lib/firebase/collections";

/** Allow up to 30 s for cold-start + SMTP handshake */
export const maxDuration = 30;

const CONTACT_EMAIL = "support@trycleaninghacks.com";

const isValidEmail = (value: string): boolean => /\S+@\S+\.\S+/.test(value);

export async function POST(request: Request) {
  let body: { email?: string };

  try {
    body = (await request.json()) as { email?: string };
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!body.email || !isValidEmail(body.email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }

  const trimmedEmail = body.email.trim().toLowerCase();

  /* ---------- Save to Firestore ---------- */
  try {
    const { duplicate } = await addSubscriber(trimmedEmail);
    if (duplicate) {
      return NextResponse.json({ message: "You're already subscribed!" });
    }
  } catch (err) {
    console.error("Firestore error (subscriber):", err);
  }

  /* ---------- Send emails via Zoho SMTP (in parallel) ---------- */
  try {
    const unsub = unsubUrl(trimmedEmail);

    const welcomeEmail = sendMail({
      to: trimmedEmail,
      subject: "Thanks for signing up",
      html: `<p>Hi,</p>
<p>Thanks for signing up at TryCleaningHacks. We will send you a quick cleaning tip each week.</p>
<p>In the meantime, you can check out our guides here: <a href="https://trycleaninghacks.com/posts">trycleaninghacks.com/posts</a></p>
<p>Cheers,<br>The TryCleaningHacks Team</p>
<p style="font-size:12px;color:#999;"><a href="${unsub}">Unsubscribe</a></p>`,
    });

    const adminNotif = sendMail({
      to: CONTACT_EMAIL,
      subject: `New subscriber: ${trimmedEmail}`,
      isNewsletter: false,
      html: `
        <p><strong>New subscriber:</strong> ${trimmedEmail.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</p>
        <p>Saved to Firestore. Welcome email sent.</p>
      `,
    });

    // Send both in parallel — cuts cold-start time in half
    await Promise.allSettled([welcomeEmail, adminNotif]);
  } catch (err: unknown) {
    const errMsg = err instanceof Error ? err.message : String(err);
    console.error("EMAIL_SEND_FAILED:", errMsg);
  }

  return NextResponse.json({ message: "You're subscribed! Check your inbox for weekly cleaning tips." });
}

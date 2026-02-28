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
      subject: "Welcome to TryCleaningHacks",
      html: `
        <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:560px;margin:0 auto;color:#1f2937;">
          <p style="font-size:16px;line-height:1.6;">Hi there,</p>
          <p style="font-size:16px;line-height:1.6;">
            Thanks for subscribing to <strong>TryCleaningHacks</strong>. Every week we will send you
            practical cleaning tips you can use right away — no fluff, just results.
          </p>
          <p style="font-size:16px;line-height:1.6;">Here is what you will get:</p>
          <ul style="font-size:15px;color:#374151;line-height:1.8;padding-left:20px;">
            <li>Weekly cleaning hacks that actually work</li>
            <li>DIY solutions using everyday ingredients</li>
            <li>Time-saving routines and schedules</li>
          </ul>
          <p style="font-size:16px;line-height:1.6;">
            <a href="https://trycleaninghacks.com/posts" style="color:#0d9488;font-weight:600;">Browse our latest hacks</a>
          </p>
          <p style="font-size:14px;color:#6b7280;margin-top:32px;padding-top:16px;border-top:1px solid #e5e7eb;">
            You are receiving this because you signed up at trycleaninghacks.com.<br/>
            <a href="${unsub}" style="color:#6b7280;">Unsubscribe</a>
          </p>
        </div>
      `,
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

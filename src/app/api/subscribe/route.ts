import { NextResponse } from "next/server";
import { Resend } from "resend";
import { addSubscriber } from "@/lib/firebase/collections";

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
      return NextResponse.json({ message: "You're already subscribed! 🎉" });
    }
  } catch (err) {
    console.error("Firestore error (subscriber):", err);
    // Continue to send email even if Firestore fails
  }

  /* ---------- Send notification email ---------- */
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set");
    return NextResponse.json(
      { error: "Service is not configured. Please try again later." },
      { status: 500 }
    );
  }

  try {
    const resend = new Resend(apiKey);

    /* --- Welcome email TO the subscriber --- */
    await resend.emails.send({
      from: `TryCleaningHacks <noreply@contact.trycleaninghacks.com>`,
      to: trimmedEmail,
      subject: `Welcome to TryCleaningHacks! 🧹✨`,
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden;">
          <div style="background: linear-gradient(135deg, #0d9488, #14b8a6); padding: 32px 24px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 28px;">Welcome to TryCleaningHacks!</h1>
            <p style="color: #ccfbf1; margin: 8px 0 0; font-size: 16px;">Your home is about to get a whole lot cleaner ✨</p>
          </div>
          <div style="padding: 32px 24px;">
            <p style="font-size: 16px; color: #1f2937; line-height: 1.6;">
              Thank you for subscribing to <strong>Premium Cleaning Briefs</strong>! 🎉
            </p>
            <p style="font-size: 16px; color: #1f2937; line-height: 1.6;">
              Every week, you'll receive our best cleaning hacks, tips, and tricks — straight to your inbox. No spam, just sparkling results.
            </p>
            <h3 style="color: #0d9488; margin-top: 24px;">Here's what to expect:</h3>
            <ul style="font-size: 15px; color: #374151; line-height: 1.8;">
              <li>🏠 Weekly cleaning hacks that actually work</li>
              <li>💡 DIY solutions using everyday ingredients</li>
              <li>⏱️ Time-saving routines & schedules</li>
              <li>🌿 Eco-friendly & budget-friendly tips</li>
            </ul>
            <div style="text-align: center; margin: 32px 0;">
              <a href="https://trycleaninghacks.com/posts" style="background: #0d9488; color: #ffffff; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 16px; display: inline-block;">
                Browse Our Latest Hacks →
              </a>
            </div>
            <p style="font-size: 14px; color: #6b7280; line-height: 1.6; border-top: 1px solid #e5e7eb; padding-top: 20px; margin-top: 24px;">
              You're receiving this because you subscribed at <a href="https://trycleaninghacks.com" style="color: #0d9488;">trycleaninghacks.com</a>. 
              If this wasn't you, simply ignore this email.
            </p>
          </div>
          <div style="background: #f9fafb; padding: 16px 24px; text-align: center;">
            <p style="font-size: 13px; color: #9ca3af; margin: 0;">© ${new Date().getFullYear()} TryCleaningHacks — Clean smarter, not harder.</p>
          </div>
        </div>
      `,
    });

    /* --- Notification email TO you --- */
    const { error } = await resend.emails.send({
      from: `TryCleaningHacks <noreply@contact.trycleaninghacks.com>`,
      to: CONTACT_EMAIL,
      subject: `New Newsletter Subscriber: ${trimmedEmail}`,
      html: `
        <h2>New Newsletter Subscription</h2>
        <p><strong>Email:</strong> ${trimmedEmail.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</p>
        <p>This person subscribed to the Premium Cleaning Briefs newsletter on your website.</p>
        <p><em>Subscriber saved to Firestore. Welcome email sent.</em></p>
      `,
    });

    if (error) {
      console.error("Resend API error:", error);
      return NextResponse.json(
        { error: "Unable to process your subscription right now. Please try again later." },
        { status: 500 }
      );
    }
  } catch (err) {
    console.error("Resend error:", err);
    return NextResponse.json(
      { error: "Unable to process your subscription right now. Please try again later." },
      { status: 500 }
    );
  }

  return NextResponse.json({ message: "You're subscribed! Check your inbox for weekly cleaning briefs." });
}

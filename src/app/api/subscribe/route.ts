import { NextResponse } from "next/server";
import { Resend } from "resend";

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
    const { error } = await resend.emails.send({
      from: `TryCleaningHacks <noreply@contact.trycleaninghacks.com>`,
      to: CONTACT_EMAIL,
      subject: `New Newsletter Subscriber: ${body.email.trim()}`,
      html: `
        <h2>New Newsletter Subscription</h2>
        <p><strong>Email:</strong> ${body.email.trim()}</p>
        <p>This person subscribed to the Premium Cleaning Briefs newsletter on your website.</p>
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

import { NextResponse } from "next/server";
import { Resend } from "resend";
import { addContact } from "@/lib/firebase/collections";

const CONTACT_EMAIL = "support@trycleaninghacks.com";

type ContactPayload = {
  name: string;
  email: string;
  message: string;
};

const isValidEmail = (value: string): boolean => /\S+@\S+\.\S+/.test(value);

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(request: Request) {
  let body: Partial<ContactPayload>;

  try {
    body = (await request.json()) as Partial<ContactPayload>;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!body.name || body.name.trim().length < 2) {
    return NextResponse.json({ error: "Name must be at least 2 characters." }, { status: 400 });
  }
  if (!body.email || !isValidEmail(body.email)) {
    return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
  }
  if (!body.message || body.message.trim().length < 10) {
    return NextResponse.json({ error: "Message must be at least 10 characters." }, { status: 400 });
  }

  const trimmedName = body.name.trim();
  const trimmedEmail = body.email.trim();
  const trimmedMessage = body.message.trim();

  /* ---------- Save to Firestore ---------- */
  try {
    await addContact(trimmedName, trimmedEmail, trimmedMessage);
  } catch (err) {
    console.error("Firestore error (contact):", err);
    // Continue to send email even if Firestore fails
  }

  /* ---------- Send notification email ---------- */
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set");
    return NextResponse.json(
      { error: "Email service is not configured. Please try again later." },
      { status: 500 }
    );
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: `TryCleaningHacks <noreply@contact.trycleaninghacks.com>`,
      to: CONTACT_EMAIL,
      replyTo: trimmedEmail,
      subject: `New Contact Form Message from ${trimmedName}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${escapeHtml(trimmedName)}</p>
        <p><strong>Email:</strong> ${escapeHtml(trimmedEmail)}</p>
        <hr />
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(trimmedMessage).replace(/\n/g, "<br />")}</p>
        <p><em>Contact saved to Firestore.</em></p>
      `,
    });

    if (error) {
      console.error("Resend API error:", error);
      return NextResponse.json(
        { error: "Unable to send your message right now. Please try again later." },
        { status: 500 }
      );
    }
  } catch (err) {
    console.error("Resend error:", err);
    return NextResponse.json(
      { error: "Unable to send your message right now. Please try again later." },
      { status: 500 }
    );
  }

  return NextResponse.json({ message: "Thanks for reaching out! We'll reply to your email shortly." });
}

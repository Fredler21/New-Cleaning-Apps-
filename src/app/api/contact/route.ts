import { NextResponse } from "next/server";
import { sendMail } from "@/lib/mail";
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
  }

  /* ---------- Send notification email via Zoho SMTP ---------- */
  try {
    await sendMail({
      to: CONTACT_EMAIL,
      replyTo: trimmedEmail,
      subject: `New Contact Form Message from ${trimmedName}`,
      isNewsletter: false,
      html: `
        <p><strong>Name:</strong> ${escapeHtml(trimmedName)}</p>
        <p><strong>Email:</strong> ${escapeHtml(trimmedEmail)}</p>
        <hr />
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(trimmedMessage).replace(/\n/g, "<br />")}</p>
      `,
    });
  } catch (err) {
    // Log the error but don't fail — the contact is already saved to Firestore
    console.error("Email send error (contact still saved):", err);
  }

  return NextResponse.json({ message: "Thanks for reaching out! We'll reply to your email shortly." });
}

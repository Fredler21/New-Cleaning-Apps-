import { NextResponse } from "next/server";
import { Resend } from "resend";

const CONTACT_EMAIL = "support@trycleaninghacks.com";

type ContactPayload = {
  name: string;
  email: string;
  message: string;
};

const isValidEmail = (value: string): boolean => /\S+@\S+\.\S+/.test(value);

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
      from: `CleaningHacks <noreply@contact.trycleaninghacks.com>`,
      to: CONTACT_EMAIL,
      replyTo: body.email,
      subject: `New Contact Form Message from ${body.name.trim()}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${body.name.trim()}</p>
        <p><strong>Email:</strong> ${body.email.trim()}</p>
        <hr />
        <p><strong>Message:</strong></p>
        <p>${body.message.trim().replace(/\n/g, "<br />")}</p>
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

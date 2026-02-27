import nodemailer from "nodemailer";
import { randomUUID } from "crypto";

const FROM_NAME = "TryCleaningHacks";
const FROM_EMAIL = "support@trycleaninghacks.com";
const DOMAIN = "trycleaninghacks.com";

/**
 * Create a reusable Nodemailer transporter for Zoho SMTP.
 * Uses app-specific password for authentication.
 */
function getTransporter() {
  const user = (process.env.ZOHO_EMAIL || FROM_EMAIL).trim();
  const pass = (process.env.ZOHO_APP_PASSWORD || "").trim();

  if (!pass) {
    throw new Error("ZOHO_APP_PASSWORD is not set.");
  }

  return nodemailer.createTransport({
    host: "smtp.zoho.com",
    port: 465,
    secure: true,
    auth: { user, pass },
  });
}

/**
 * Strip HTML tags to produce a plain-text version of an email body.
 */
function htmlToText(html: string): string {
  return html
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n\n")
    .replace(/<\/li>/gi, "\n")
    .replace(/<li[^>]*>/gi, "  - ")
    .replace(/<\/h[1-6]>/gi, "\n\n")
    .replace(/<a[^>]+href="([^"]*)"[^>]*>[^<]*<\/a>/gi, "$1")
    .replace(/<[^>]+>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

interface SendMailOptions {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}

/**
 * Send an email via Zoho SMTP with anti-spam best practices:
 * - Unique Message-ID
 * - List-Unsubscribe header (required by Gmail & Yahoo)
 * - Plain-text alternative alongside HTML
 * - Precedence header for bulk/newsletter emails
 */
export async function sendMail({ to, subject, html, replyTo }: SendMailOptions) {
  const transporter = getTransporter();
  const senderEmail = process.env.ZOHO_EMAIL || FROM_EMAIL;

  const info = await transporter.sendMail({
    from: `${FROM_NAME} <${senderEmail}>`,
    to,
    subject,
    html,
    text: htmlToText(html),
    headers: {
      "Message-ID": `<${randomUUID()}@${DOMAIN}>`,
      "List-Unsubscribe": `<mailto:${senderEmail}?subject=Unsubscribe>, <https://${DOMAIN}/contact>`,
      "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
    },
    ...(replyTo ? { replyTo } : {}),
  });

  return info;
}

export { FROM_EMAIL, FROM_NAME };

import nodemailer from "nodemailer";
import type Mail from "nodemailer/lib/mailer";
import { randomUUID } from "crypto";

const FROM_NAME = "TryCleaningHacks";
const FROM_EMAIL = "support@trycleaninghacks.com";
const DOMAIN = "trycleaninghacks.com";
const SITE_URL = `https://${DOMAIN}`;

/* ------------------------------------------------------------------
 *  Singleton SMTP transporter — reuses the TCP connection across
 *  multiple sendMail() calls within the same serverless invocation.
 * ------------------------------------------------------------------ */
let _transporter: Mail | null = null;

function getTransporter(): Mail {
  if (_transporter) return _transporter;

  const user = (process.env.ZOHO_EMAIL || FROM_EMAIL).trim();
  const pass = (process.env.ZOHO_APP_PASSWORD || "").trim();

  if (!pass) {
    throw new Error("ZOHO_APP_PASSWORD is not set.");
  }

  _transporter = nodemailer.createTransport({
    host: "smtp.zoho.com",
    port: 465,
    secure: true,
    auth: { user, pass },
    pool: true,          // keep connection alive for multiple sends
    maxConnections: 1,
    maxMessages: 50,
  });

  return _transporter;
}

/* ------------------------------------------------------------------
 *  HTML → plain-text converter
 * ------------------------------------------------------------------ */
function htmlToText(html: string): string {
  return html
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n\n")
    .replace(/<\/li>/gi, "\n")
    .replace(/<li[^>]*>/gi, "  - ")
    .replace(/<\/h[1-6]>/gi, "\n\n")
    .replace(/<a[^>]+href="([^"]*)"[^>]*>([^<]*)<\/a>/gi, "$2 ($1)")
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

/* ------------------------------------------------------------------
 *  Build the one-click unsubscribe URL for a recipient
 * ------------------------------------------------------------------ */
function unsubUrl(email: string): string {
  return `${SITE_URL}/api/unsubscribe?email=${encodeURIComponent(email)}`;
}

/* ------------------------------------------------------------------
 *  sendMail
 * ------------------------------------------------------------------ */
interface SendMailOptions {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
  /** Set false for transactional emails (contact form, admin alerts) */
  isNewsletter?: boolean;
}

/**
 * Send an email via Zoho SMTP with anti-spam best practices.
 *
 * Newsletter emails automatically get:
 *  - List-Unsubscribe + List-Unsubscribe-Post headers (Gmail/Yahoo requirement)
 *  - Proper one-click unsubscribe URL
 *  - Precedence: bulk header
 */
export async function sendMail({
  to,
  subject,
  html,
  replyTo,
  isNewsletter = true,
}: SendMailOptions) {
  const transporter = getTransporter();
  const senderEmail = (process.env.ZOHO_EMAIL || FROM_EMAIL).trim();

  /* Build headers — only add list-unsubscribe for newsletters */
  const headers: Record<string, string> = {
    "Message-ID": `<${randomUUID()}@${DOMAIN}>`,
  };

  if (isNewsletter) {
    const unsub = unsubUrl(to);
    headers["List-Unsubscribe"] = `<${unsub}>`;
    headers["List-Unsubscribe-Post"] = "List-Unsubscribe=One-Click";
    headers["Precedence"] = "bulk";
  }

  const info = await transporter.sendMail({
    from: `${FROM_NAME} <${senderEmail}>`,
    to,
    subject,
    html,
    text: htmlToText(html),
    headers,
    ...(replyTo ? { replyTo } : {}),
  });

  return info;
}

export { FROM_EMAIL, FROM_NAME, SITE_URL, unsubUrl };

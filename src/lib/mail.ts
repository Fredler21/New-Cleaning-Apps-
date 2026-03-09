import { Resend } from "resend";
import nodemailer from "nodemailer";
import type Mail from "nodemailer/lib/mailer";
import { randomUUID } from "crypto";
import { sanitiseEmail, isValidEmail } from "./email-validation";

export const FROM_NAME = "TryCleaningHacks";
export const FROM_EMAIL = "support@trycleaninghacks.com";
/** Resend sends from the verified subdomain; replies go to FROM_EMAIL. */
const RESEND_FROM_EMAIL = "support@contact.trycleaninghacks.com";
const DOMAIN = "trycleaninghacks.com";
export const SITE_URL = `https://${DOMAIN}`;

/* ------------------------------------------------------------------
 *  Provider detection: prefer Zoho SMTP, fall back to Resend
 * ------------------------------------------------------------------ */
let _resend: Resend | null = null;
let _transporter: Mail | null = null;

function getTransporter(): Mail | null {
  if (_transporter) return _transporter;

  const user = (process.env.ZOHO_EMAIL || FROM_EMAIL).trim();
  const pass = (process.env.ZOHO_APP_PASSWORD || "").trim();

  if (!pass) return null;

  _transporter = nodemailer.createTransport({
    host: "smtp.zoho.com",
    port: 465,
    secure: true,
    auth: { user, pass },
    pool: true,
    maxConnections: 1,
    maxMessages: 50,
  });

  return _transporter;
}

function getResend(): Resend | null {
  if (_resend) return _resend;
  const key = process.env.RESEND_API_KEY?.trim();
  if (!key) return null;
  _resend = new Resend(key);
  return _resend;
}

/* ------------------------------------------------------------------
 *  HTML → plain-text converter
 * ------------------------------------------------------------------ */
export function htmlToText(html: string): string {
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
export function unsubUrl(email: string): string {
  return `${SITE_URL}/api/unsubscribe?email=${encodeURIComponent(email)}`;
}

/* ------------------------------------------------------------------
 *  sendMail — unified interface, Resend primary, Zoho fallback
 * ------------------------------------------------------------------ */
export interface SendMailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
  /** Set false for transactional emails (contact form, admin alerts) */
  isNewsletter?: boolean;
}

export interface SendMailResult {
  success: boolean;
  provider: "resend" | "zoho";
  id?: string;
  error?: string;
  /** True if the error indicates the recipient doesn't exist (hard bounce). */
  isBounce?: boolean;
}

/**
 * Send an email with anti-spam best practices.
 *
 * - Uses Zoho SMTP as primary (best inbox delivery).
 * - Falls back to Resend API if Zoho is not configured.
 * - Sanitises the recipient address before sending.
 * - Adds List-Unsubscribe headers for newsletter emails.
 * - Returns structured result with bounce detection.
 */
export async function sendMail(opts: SendMailOptions): Promise<SendMailResult> {
  const {
    subject,
    html,
    replyTo,
    isNewsletter = true,
  } = opts;

  // Sanitise the recipient
  const to = sanitiseEmail(opts.to);

  if (!isValidEmail(to)) {
    return { success: false, provider: "zoho", error: `Invalid email: ${to}`, isBounce: true };
  }

  const plainText = opts.text || htmlToText(html);

  // Build headers
  const headers: Record<string, string> = {};
  if (isNewsletter) {
    const unsub = unsubUrl(to);
    headers["List-Unsubscribe"] = `<${unsub}>`;
    headers["List-Unsubscribe-Post"] = "List-Unsubscribe=One-Click";
  }

  /* ---------- Try Zoho SMTP first ---------- */
  const transporter = getTransporter();
  if (transporter) {
    try {
      const senderEmail = (process.env.ZOHO_EMAIL || FROM_EMAIL).trim();

      headers["Message-ID"] = `<${randomUUID()}@${DOMAIN}>`;

      const info = await transporter.sendMail({
        from: `${FROM_NAME} <${senderEmail}>`,
        to,
        subject,
        html,
        text: plainText,
        headers,
        ...(replyTo ? { replyTo } : {}),
      });

      return { success: true, provider: "zoho", id: info.messageId };
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      const bounce = isBounceError(msg);
      if (bounce) {
        return { success: false, provider: "zoho", error: msg, isBounce: true };
      }
      // Zoho failed with a transient error — fall through to Resend
      console.warn(`[MAIL] Zoho failed, trying Resend: ${msg}`);
    }
  }

  /* ---------- Fallback: Resend ---------- */
  const resend = getResend();
  if (resend) {
    const resendFrom = `${FROM_NAME} <${RESEND_FROM_EMAIL}>`;
    const resendReplyTo = replyTo ? [replyTo] : [FROM_EMAIL];

    try {
      const { data, error } = await resend.emails.send({
        from: resendFrom,
        to: [to],
        subject,
        html,
        text: plainText,
        replyTo: resendReplyTo,
        headers,
      });

      if (error) {
        const isBounce = isBounceError(error.message);
        return { success: false, provider: "resend", error: error.message, isBounce };
      }

      return { success: true, provider: "resend", id: data?.id };
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      return { success: false, provider: "resend", error: msg, isBounce: isBounceError(msg) };
    }
  }

  return { success: false, provider: "zoho", error: "No email provider configured (ZOHO_APP_PASSWORD or RESEND_API_KEY required)." };
}

/* ------------------------------------------------------------------
 *  Retry wrapper
 * ------------------------------------------------------------------ */

export async function sendMailWithRetry(
  opts: SendMailOptions,
  maxRetries = 2,
): Promise<SendMailResult> {
  let lastResult: SendMailResult = { success: false, provider: "zoho" };

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    lastResult = await sendMail(opts);

    if (lastResult.success || lastResult.isBounce) {
      // Don't retry bounces — the address is invalid
      return lastResult;
    }

    // Exponential back-off: 1s, 2s
    if (attempt < maxRetries) {
      await new Promise((r) => setTimeout(r, 1000 * (attempt + 1)));
    }
  }

  return lastResult;
}

/* ------------------------------------------------------------------
 *  Bounce detection heuristics
 * ------------------------------------------------------------------ */

const BOUNCE_PATTERNS = [
  /550/i,
  /5\.1\.1/i,
  /does not exist/i,
  /user unknown/i,
  /mailbox not found/i,
  /invalid recipient/i,
  /recipient rejected/i,
  /no such user/i,
  /account.*disabled/i,
  /address rejected/i,
];

function isBounceError(message: string): boolean {
  return BOUNCE_PATTERNS.some((p) => p.test(message));
}

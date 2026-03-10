/**
 * Test script: Send a test email through the notification pipeline.
 *
 * Run:  node scripts/test-email-system.mjs
 *
 * This tests the full pipeline:
 *  1. Email sanitisation (whitespace, invisible chars, case)
 *  2. Email validation (format check)
 *  3. Sending via Resend (primary) or Zoho SMTP (fallback)
 *  4. Logging of success/failure/bounce
 */

import { createRequire } from "module";
const require = createRequire(import.meta.url);
const dotenv = require("dotenv");
dotenv.config({ path: ".env.local" });

const { Resend } = require("resend");
const nodemailer = require("nodemailer");

// ── Config ───────────────────────────────────────────────────────
const FROM_RESEND = "TryCleaningHacks <support@contact.trycleaninghacks.com>";
const FROM_ZOHO = "TryCleaningHacks <support@trycleaninghacks.com>";
const REPLY_TO = "support@trycleaninghacks.com";
const SITE = "https://trycleaninghacks.com";

// ── Test recipients ──────────────────────────────────────────────
// Add your own Gmail/Outlook test addresses here
const RAW_TEST_EMAILS = [
  "  support@trycleaninghacks.com  ",   // has whitespace — should be trimmed
  "SUPPORT@trycleaninghacks.com",       // uppercase — should be lowercased (deduped)
  "not-a-real-email",                   // invalid — should be skipped
  "  @broken.com",                      // invalid — should be skipped
  "",                                   // empty — should be skipped
];

// ── Email validation (same logic as production) ──────────────────
const EMAIL_REGEX =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/;

function sanitise(raw) {
  return raw
    .replace(/[\u200B-\u200D\uFEFF\u00A0]/g, "")
    .replace(/[\u2000-\u200A]/g, "")
    .replace(/[\r\n\t]/g, "")
    .trim()
    .toLowerCase();
}

function isValid(email) {
  return email.length > 0 && email.length <= 254 && EMAIL_REGEX.test(email);
}

// ── Email template ───────────────────────────────────────────────
function makeHtml() {
  return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"/><meta name="viewport" content="width=device-width, initial-scale=1.0"/></head>
<body style="margin:0;padding:0;background-color:#f3f4f6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f3f4f6;">
    <tr><td align="center" style="padding:32px 16px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,.08);">
        <tr><td style="background-color:#0d9488;padding:24px 32px;text-align:center;">
          <a href="${SITE}" style="color:#ffffff;text-decoration:none;font-size:22px;font-weight:700;">TryCleaningHacks</a>
        </td></tr>
        <tr><td style="padding:32px;">
          <h1 style="margin:0 0 16px;font-size:22px;color:#1f2937;">Test Email - Notification System</h1>
          <p style="margin:0 0 16px;font-size:16px;color:#374151;line-height:1.6;">
            This is a test of the TryCleaningHacks email notification system.
          </p>
          <p style="margin:0 0 16px;font-size:16px;color:#374151;line-height:1.6;">
            If you are reading this, the system is working correctly. Emails are being sent, validated, and delivered.
          </p>
          <p style="margin:0 0 24px;font-size:14px;color:#6b7280;">
            Sent at: ${new Date().toISOString()}
          </p>
          <table role="presentation" cellpadding="0" cellspacing="0">
            <tr><td style="border-radius:8px;background-color:#0d9488;">
              <a href="${SITE}/cleaning-hacks" target="_blank" style="display:inline-block;padding:14px 32px;color:#ffffff;text-decoration:none;font-size:16px;font-weight:600;border-radius:8px;">
                Visit TryCleaningHacks
              </a>
            </td></tr>
          </table>
        </td></tr>
        <tr><td style="padding:24px 32px;border-top:1px solid #e5e7eb;text-align:center;">
          <p style="margin:0;font-size:13px;color:#6b7280;">
            This is a test email from <a href="${SITE}" style="color:#0d9488;text-decoration:none;">TryCleaningHacks</a>.
          </p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

function makeText() {
  return [
    "Test Email - TryCleaningHacks Notification System",
    "=".repeat(50),
    "",
    "This is a test of the TryCleaningHacks email notification system.",
    "If you are reading this, the system is working correctly.",
    "",
    `Sent at: ${new Date().toISOString()}`,
    "",
    `Visit: ${SITE}/cleaning-hacks`,
  ].join("\n");
}

// ── Send function ────────────────────────────────────────────────
async function sendEmail(to) {
  const resendKey = process.env.RESEND_API_KEY?.trim();
  if (resendKey) {
    const resend = new Resend(resendKey);
    const { data, error } = await resend.emails.send({
      from: FROM_RESEND,
      to: [to],
      subject: "Test Email - TryCleaningHacks Notification System",
      html: makeHtml(),
      text: makeText(),
      replyTo: [REPLY_TO],
      headers: {
        "List-Unsubscribe": `<${SITE}/api/unsubscribe?email=${encodeURIComponent(to)}>`,
        "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
      },
    });
    if (error) throw new Error(`Resend error: ${error.message}`);
    return { provider: "Resend", id: data?.id };
  }

  // Fallback: Zoho
  const transporter = nodemailer.createTransport({
    host: "smtp.zoho.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.ZOHO_EMAIL || "support@trycleaninghacks.com",
      pass: process.env.ZOHO_APP_PASSWORD,
    },
  });

  const info = await transporter.sendMail({
    from: FROM_ZOHO,
    to,
    subject: "Test Email - TryCleaningHacks Notification System",
    html: makeHtml(),
    text: makeText(),
  });
  return { provider: "Zoho SMTP", id: info.messageId };
}

// ── Main ─────────────────────────────────────────────────────────
console.log("=== TryCleaningHacks Email System Test ===\n");
console.log(`Provider: ${process.env.RESEND_API_KEY ? "Resend (primary)" : "Zoho SMTP (fallback)"}`);
console.log(`From: ${process.env.RESEND_API_KEY ? FROM_RESEND : FROM_ZOHO}`);
console.log(`Time: ${new Date().toISOString()}\n`);

// Step 1: Sanitise & validate
console.log("--- Step 1: Email Sanitisation & Validation ---\n");

const seen = new Set();
const validEmails = [];

for (const raw of RAW_TEST_EMAILS) {
  const display = JSON.stringify(raw);
  const cleaned = sanitise(raw);

  if (!cleaned) {
    console.log(`  SKIP (empty)      : ${display}`);
    continue;
  }

  if (!isValid(cleaned)) {
    console.log(`  SKIP (invalid)    : ${display} -> "${cleaned}"`);
    continue;
  }

  if (seen.has(cleaned)) {
    console.log(`  SKIP (duplicate)  : ${display} -> "${cleaned}"`);
    continue;
  }

  seen.add(cleaned);
  validEmails.push(cleaned);
  console.log(`  VALID             : ${display} -> "${cleaned}"`);
}

console.log(`\n  Result: ${validEmails.length} valid, ${RAW_TEST_EMAILS.length - validEmails.length} skipped\n`);

// Step 2: Send
console.log("--- Step 2: Sending Test Emails ---\n");

let sent = 0;
let failed = 0;

for (const email of validEmails) {
  try {
    const result = await sendEmail(email);
    sent++;
    console.log(`  SUCCESS : ${email}`);
    console.log(`            Provider: ${result.provider}`);
    console.log(`            ID: ${result.id}\n`);
  } catch (err) {
    failed++;
    const msg = err.message || String(err);
    console.error(`  FAILED  : ${email}`);
    console.error(`            Error: ${msg}`);

    if (/550|5\.1\.1|does not exist|user unknown/i.test(msg)) {
      console.error(`            Type: HARD BOUNCE (address does not exist)\n`);
    } else {
      console.error(`            Type: TRANSIENT ERROR\n`);
    }
  }
}

// Summary
console.log("--- Summary ---\n");
console.log(`  Total test addresses : ${RAW_TEST_EMAILS.length}`);
console.log(`  Valid after cleanup  : ${validEmails.length}`);
console.log(`  Sent successfully    : ${sent}`);
console.log(`  Failed               : ${failed}`);
console.log(`\n  Check your inbox at support@trycleaninghacks.com`);
console.log("  If it lands in spam, you need to add SPF/DKIM/DMARC DNS records.\n");
console.log("=== Test Complete ===");

process.exit(0);

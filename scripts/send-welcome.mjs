/**
 * Send welcome emails to all ACTIVE subscribers who haven't bounced.
 *
 * Run:  node scripts/send-welcome.mjs
 *
 * Uses the same email pipeline as the production API routes:
 *  - Resend (primary) → Zoho SMTP (fallback)
 *  - Email validation & sanitisation
 *  - Bounce detection & auto-marking
 *  - Only sends to status === "active"
 */

import { createRequire } from "module";
const require = createRequire(import.meta.url);
const dotenv = require("dotenv");
dotenv.config({ path: ".env.local" });

const admin = require("firebase-admin");
const { Resend } = require("resend");
const nodemailer = require("nodemailer");

// ── Firebase init ────────────────────────────────────────────────
if (!admin.apps.length) {
  const rawKey = process.env.FIREBASE_PRIVATE_KEY || "";
  const privateKey = rawKey.includes("\\n")
    ? rawKey.replace(/\\n/g, "\n")
    : rawKey;

  admin.initializeApp({
    credential: admin.credential.cert({
      projectId:
        process.env.FIREBASE_PROJECT_ID ||
        process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey,
    }),
  });
}

const db = admin.firestore();

// ── Email validation ─────────────────────────────────────────────
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

// ── Email sending (Resend primary, Zoho fallback) ────────────────
const FROM = "TryCleaningHacks <support@trycleaninghacks.com>";
const SITE = "https://trycleaninghacks.com";

function makeUnsubUrl(email) {
  return `${SITE}/api/unsubscribe?email=${encodeURIComponent(email)}`;
}

function makeHtml(unsubUrl) {
  return `
<div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:600px;margin:0 auto;">
  <h1 style="color:#0d9488;">Welcome to TryCleaningHacks!</h1>
  <p>Thanks for subscribing. We'll send you our best cleaning tips and guides — no spam, just helpful content.</p>
  <p>In the meantime, check out our latest guides:</p>
  <p><a href="${SITE}/posts" style="display:inline-block;padding:12px 28px;background:#0d9488;color:#fff;text-decoration:none;border-radius:8px;font-weight:600;">Browse Guides →</a></p>
  <hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0;"/>
  <p style="font-size:13px;color:#6b7280;">
    You received this because you subscribed at <a href="${SITE}" style="color:#0d9488;">TryCleaningHacks</a>.<br/>
    <a href="${unsubUrl}" style="color:#6b7280;">Unsubscribe</a>
  </p>
</div>`;
}

function makeText(unsubUrl) {
  return `Welcome to TryCleaningHacks!\n\nThanks for subscribing. We'll send you our best cleaning tips and guides.\n\nBrowse guides: ${SITE}/posts\n\n---\nUnsubscribe: ${unsubUrl}`;
}

async function sendEmail(to, subject, html, text) {
  // Try Resend first
  const resendKey = process.env.RESEND_API_KEY?.trim();
  if (resendKey) {
    const resend = new Resend(resendKey);
    const { data, error } = await resend.emails.send({
      from: FROM,
      to: [to],
      subject,
      html,
      text,
      headers: {
        "List-Unsubscribe": `<${makeUnsubUrl(to)}>`,
        "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
      },
    });
    if (error) throw new Error(error.message);
    return { provider: "resend", id: data?.id };
  }

  // Fallback: Zoho SMTP
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
    from: FROM,
    to,
    subject,
    html,
    text,
    headers: {
      "List-Unsubscribe": `<${makeUnsubUrl(to)}>`,
      "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
    },
  });
  return { provider: "zoho", id: info.messageId };
}

// ── Main ─────────────────────────────────────────────────────────
const snap = await db
  .collection("subscribers")
  .where("status", "==", "active")
  .get();

// Also grab legacy subscribers that don't have a status field yet
const legacySnap = await db.collection("subscribers").get();
const activeDocs = snap.docs;
const legacyDocs = legacySnap.docs.filter(
  (d) => !d.data().status && d.data().email,
);
const allDocs = [...activeDocs, ...legacyDocs];

// De-duplicate
const seen = new Set();
const subscribers = [];
for (const doc of allDocs) {
  const email = sanitise(doc.data().email || "");
  if (!seen.has(email) && EMAIL_REGEX.test(email)) {
    seen.add(email);
    subscribers.push({ email, ref: doc.ref });
  }
}

console.log(`Found ${subscribers.length} active subscriber(s).`);

if (subscribers.length === 0) {
  console.log("No subscribers to send to.");
  process.exit(0);
}

let sent = 0;
let failed = 0;

for (const { email, ref } of subscribers) {
  const unsubUrl = makeUnsubUrl(email);

  try {
    const result = await sendEmail(
      email,
      "Welcome to TryCleaningHacks!",
      makeHtml(unsubUrl),
      makeText(unsubUrl),
    );
    sent++;
    console.log(`✅ Sent to ${email} via ${result.provider} (${result.id})`);
  } catch (err) {
    failed++;
    const msg = err.message || String(err);
    console.error(`❌ Failed: ${email} — ${msg}`);

    // Auto-mark bounce
    if (/550|5\.1\.1|does not exist|user unknown|mailbox not found/i.test(msg)) {
      await ref.update({
        status: "bounced",
        bouncedAt: new Date().toISOString(),
        bounceReason: msg,
      });
      console.log(`   ↳ Marked as bounced in Firestore.`);
    }
  }

  // Rate limit between sends
  await new Promise((r) => setTimeout(r, 300));
}

console.log(`\nDone! Sent: ${sent}, Failed: ${failed}`);
process.exit(0);

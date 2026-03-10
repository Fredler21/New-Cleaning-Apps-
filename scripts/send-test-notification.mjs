import { createRequire } from "module";
const require = createRequire(import.meta.url);
const dotenv = require("dotenv");
dotenv.config({ path: ".env.local" });

const admin = require("firebase-admin");
const { Resend } = require("resend");

// ── Firebase init ────────────────────────────────────────────────
if (!admin.apps.length) {
  const rawKey = process.env.FIREBASE_PRIVATE_KEY || "";
  const privateKey = rawKey.includes("\\n") ? rawKey.replace(/\\n/g, "\n") : rawKey;
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey,
    }),
  });
}

const db = admin.firestore();

// ── Check state ──────────────────────────────────────────────────
const notifiedSnap = await db.collection("notifiedPosts").get();
const notifiedSlugs = new Set(notifiedSnap.docs.map((d) => d.id));
console.log(`Already notified posts: ${notifiedSlugs.size}`);

const subsSnap = await db.collection("subscribers").where("status", "==", "active").get();
const subscribers = subsSnap.docs.map((d) => d.data().email);
console.log(`Active subscribers: ${subscribers.length}`);
subscribers.forEach((e) => console.log(`  - ${e}`));

// ── Import posts list ────────────────────────────────────────────
// We need to find un-notified posts from the data file
const { execSync } = await import("child_process");
const postsRaw = execSync(
  `node -e "const { posts } = require('./src/data/posts.ts'); console.log(JSON.stringify(posts.map(p => ({ slug: p.slug, title: p.title, excerpt: p.excerpt, readTime: p.readTime }))))"`,
  { cwd: process.cwd(), encoding: "utf-8" }
).trim();

let posts;
try {
  posts = JSON.parse(postsRaw);
} catch {
  // If that doesn't work, grep manually
  console.log("\nCannot parse posts file directly. Sending a general test notification instead.\n");
  posts = [];
}

const newPosts = posts.filter((p) => !notifiedSlugs.has(p.slug));
console.log(`\nNew un-notified posts: ${newPosts.length}`);
if (newPosts.length > 0) {
  newPosts.forEach((p) => console.log(`  - ${p.slug}: ${p.title}`));
}

// ── Send notification ────────────────────────────────────────────
const RESEND_FROM = "TryCleaningHacks <support@contact.trycleaninghacks.com>";
const REPLY_TO = "support@trycleaninghacks.com";
const SITE = "https://trycleaninghacks.com";

function makeUnsubUrl(email) {
  return `${SITE}/api/unsubscribe?email=${encodeURIComponent(email)}`;
}

function makePostHtml(title, excerpt, postUrl, readTime, unsubUrl) {
  return `<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width, initial-scale=1.0"/></head>
<body style="margin:0;padding:0;background-color:#f3f4f6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f3f4f6;">
    <tr><td align="center" style="padding:32px 16px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,.08);">
        <tr><td style="background-color:#0d9488;padding:24px 32px;text-align:center;">
          <a href="${SITE}" style="color:#ffffff;text-decoration:none;font-size:22px;font-weight:700;">TryCleaningHacks</a>
        </td></tr>
        <tr><td style="padding:32px;">
          <h1 style="margin:0 0 16px;font-size:22px;color:#1f2937;line-height:1.3;">${title}</h1>
          <p style="margin:0 0 20px;font-size:16px;color:#374151;line-height:1.6;">${excerpt}</p>
          ${readTime ? `<p style="margin:0 0 24px;font-size:14px;color:#6b7280;">${readTime}</p>` : ""}
          <table role="presentation" cellpadding="0" cellspacing="0">
            <tr><td style="border-radius:8px;background-color:#0d9488;">
              <a href="${postUrl}" target="_blank" style="display:inline-block;padding:14px 32px;color:#ffffff;text-decoration:none;font-size:16px;font-weight:600;border-radius:8px;">Read the Post</a>
            </td></tr>
          </table>
        </td></tr>
        <tr><td style="padding:24px 32px;border-top:1px solid #e5e7eb;text-align:center;">
          <p style="margin:0 0 8px;font-size:13px;color:#6b7280;">You received this because you subscribed at <a href="${SITE}" style="color:#0d9488;text-decoration:none;">TryCleaningHacks</a>.</p>
          <p style="margin:0;font-size:13px;color:#6b7280;"><a href="${unsubUrl}" style="color:#6b7280;text-decoration:underline;">Unsubscribe</a></p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}

function makePostText(title, excerpt, postUrl, readTime, unsubUrl) {
  return `${title}\n${"=".repeat(title.length)}\n\n${excerpt}\n${readTime ? `(${readTime})\n` : ""}\nRead the post: ${postUrl}\n\n---\nUnsubscribe: ${unsubUrl}\nTryCleaningHacks — ${SITE}`;
}

async function sendViaResend(to, subject, html, text, unsubUrl) {
  const resend = new Resend(process.env.RESEND_API_KEY.trim());
  const { data, error } = await resend.emails.send({
    from: RESEND_FROM,
    to: [to],
    subject,
    html,
    text,
    replyTo: [REPLY_TO],
    headers: {
      "List-Unsubscribe": `<${unsubUrl}>`,
      "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
    },
  });
  if (error) throw new Error(error.message);
  return data?.id;
}

// Pick the first un-notified post, or use most recent post for the test
let postToSend;
if (newPosts.length > 0) {
  postToSend = newPosts[0];
} else {
  // All posts already notified — use the most recent for a test send
  // but do NOT mark it as notified again
  postToSend = posts[posts.length - 1] || {
    slug: "test-notification",
    title: "Weekly Cleaning Schedule That Works",
    excerpt: "A simple, realistic cleaning plan you can actually stick to. Break your chores into daily, weekly, and monthly tasks so your home stays clean without burnout.",
    readTime: "6 min read",
  };
  console.log("\nAll posts already notified. Sending test with most recent post.\n");
}

const postUrl = `${SITE}/cleaning-hacks/${postToSend.slug}`;
const subject = `New Post on TryCleaningHacks: ${postToSend.title}`;

console.log(`\n--- Sending: "${postToSend.title}" to ${subscribers.length} subscribers ---\n`);

let sent = 0;
let failed = 0;
let bounced = 0;

for (const email of subscribers) {
  const unsubUrl = makeUnsubUrl(email);
  const html = makePostHtml(postToSend.title, postToSend.excerpt, postUrl, postToSend.readTime, unsubUrl);
  const text = makePostText(postToSend.title, postToSend.excerpt, postUrl, postToSend.readTime, unsubUrl);

  try {
    const id = await sendViaResend(email, subject, html, text, unsubUrl);
    sent++;
    console.log(`  SUCCESS: ${email} (${id})`);
  } catch (err) {
    const msg = err.message || String(err);
    if (/550|5\.1\.1|does not exist|user unknown|mailbox not found/i.test(msg)) {
      bounced++;
      console.log(`  BOUNCE:  ${email} — ${msg}`);
      await db.collection("subscribers")
        .where("email", "==", email)
        .limit(1)
        .get()
        .then((snap) => {
          if (!snap.empty) {
            snap.docs[0].ref.update({
              status: "bounced",
              bouncedAt: new Date().toISOString(),
              bounceReason: msg,
            });
          }
        });
    } else {
      failed++;
      console.log(`  FAILED:  ${email} — ${msg}`);
    }
  }

  await new Promise((r) => setTimeout(r, 300));
}

console.log(`\n--- Results ---`);
console.log(`  Sent:    ${sent}`);
console.log(`  Bounced: ${bounced}`);
console.log(`  Failed:  ${failed}`);
console.log(`  Total:   ${subscribers.length}\n`);

// Mark as notified if it was a genuinely new post
if (newPosts.length > 0 && postToSend.slug === newPosts[0].slug) {
  await db.collection("notifiedPosts").doc(postToSend.slug).set({
    slug: postToSend.slug,
    notifiedAt: admin.firestore.FieldValue.serverTimestamp(),
  });
  console.log(`Post "${postToSend.slug}" marked as notified.\n`);
}

process.exit(0);

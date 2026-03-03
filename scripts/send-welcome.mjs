import { createRequire } from "module";
const require = createRequire(import.meta.url);
const dotenv = require("dotenv");
dotenv.config({ path: ".env.local" });

const admin = require("firebase-admin");
const nodemailer = require("nodemailer");

// Init Firebase
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

// Get all subscribers
const snap = await db.collection("subscribers").get();
const emails = snap.docs.map((d) => d.data().email);
console.log(`Found ${emails.length} subscriber(s):`, emails);

if (emails.length === 0) {
  console.log("No subscribers found.");
  process.exit(0);
}

// Setup Zoho transporter
const transporter = nodemailer.createTransport({
  host: "smtp.zoho.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.ZOHO_EMAIL || "support@trycleaninghacks.com",
    pass: process.env.ZOHO_APP_PASSWORD,
  },
});

const year = new Date().getFullYear();

for (const email of emails) {
  try {
    await transporter.sendMail({
      from: `TryCleaningHacks <${process.env.ZOHO_EMAIL || "support@trycleaninghacks.com"}>`,
      to: email,
      subject: "Thanks for signing up",
      text: `Hi,\n\nThanks for signing up at TryCleaningHacks. We will send you a quick cleaning tip each week.\n\nIn the meantime, you can check out our guides here: https://trycleaninghacks.com/posts\n\nCheers,\nThe TryCleaningHacks Team`,
      html: `<p>Hi,</p>
<p>Thanks for signing up at TryCleaningHacks. We will send you a quick cleaning tip each week.</p>
<p>In the meantime, you can check out our guides here: <a href="https://trycleaninghacks.com/posts">trycleaninghacks.com/posts</a></p>
<p>Cheers,<br>The TryCleaningHacks Team</p>
<p style="font-size:12px;"><a href="https://trycleaninghacks.com/api/unsubscribe?email=${encodeURIComponent(email)}">Unsubscribe</a></p>`,
    });
    console.log(`✅ Sent welcome email to ${email}`);
  } catch (err) {
    console.error(`❌ Failed to send to ${email}:`, err.message);
  }
}

console.log("Done!");
process.exit(0);

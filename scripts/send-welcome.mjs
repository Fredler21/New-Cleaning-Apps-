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
      subject: "Welcome to TryCleaningHacks",
      html: `
        <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden;">
          <div style="background: linear-gradient(135deg, #0d9488, #14b8a6); padding: 32px 24px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 28px;">Welcome to TryCleaningHacks!</h1>
            <p style="color: #ccfbf1; margin: 8px 0 0; font-size: 16px;">Your home is about to get a whole lot cleaner</p>
          </div>
          <div style="padding: 32px 24px;">
            <p style="font-size: 16px; color: #1f2937; line-height: 1.6;">
              Thank you for subscribing to <strong>Premium Cleaning Briefs</strong>!
            </p>
            <p style="font-size: 16px; color: #1f2937; line-height: 1.6;">
              Every week, you'll receive our best cleaning hacks, tips, and tricks — straight to your inbox. No spam, just sparkling results.
            </p>
            <h3 style="color: #0d9488; margin-top: 24px;">Here's what to expect:</h3>
            <ul style="font-size: 15px; color: #374151; line-height: 1.8;">
              <li>Weekly cleaning hacks that actually work</li>
              <li>DIY solutions using everyday ingredients</li>
              <li>Time-saving routines and schedules</li>
              <li>Eco-friendly and budget-friendly tips</li>
            </ul>
            <div style="text-align: center; margin: 32px 0;">
              <a href="https://trycleaninghacks.com/posts" style="background: #0d9488; color: #ffffff; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 16px; display: inline-block;">
                Browse Our Latest Hacks →
              </a>
            </div>
            <p style="font-size: 14px; color: #6b7280; line-height: 1.6; border-top: 1px solid #e5e7eb; padding-top: 20px; margin-top: 24px;">
              You're receiving this because you subscribed at <a href="https://trycleaninghacks.com" style="color: #0d9488;">trycleaninghacks.com</a>.
              If this wasn't you, simply ignore this email.
            </p>
          </div>
          <div style="background: #f9fafb; padding: 16px 24px; text-align: center;">
            <p style="font-size: 13px; color: #9ca3af; margin: 0;">© ${year} TryCleaningHacks — Clean smarter, not harder.</p>
          </div>
        </div>
      `,
    });
    console.log(`✅ Sent welcome email to ${email}`);
  } catch (err) {
    console.error(`❌ Failed to send to ${email}:`, err.message);
  }
}

console.log("Done!");
process.exit(0);

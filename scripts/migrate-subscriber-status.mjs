/**
 * One-time migration: Add `status: "active"` to all existing subscribers
 * that don't have a status field yet.
 *
 * Run once:  node scripts/migrate-subscriber-status.mjs
 *
 * Prerequisites:
 *   - .env.local with FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY
 *   - Or set them as environment variables
 */

import { createRequire } from "module";
const require = createRequire(import.meta.url);
const dotenv = require("dotenv");
dotenv.config({ path: ".env.local" });

import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const rawKey = process.env.FIREBASE_PRIVATE_KEY || "";
const privateKey = rawKey.includes("\\n") ? rawKey.replace(/\\n/g, "\n") : rawKey;

const app = initializeApp({
  credential: cert({
    projectId:
      process.env.FIREBASE_PROJECT_ID ||
      process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey,
  }),
});

const db = getFirestore(app);

async function migrate() {
  const snap = await db.collection("subscribers").get();

  if (snap.empty) {
    console.log("No subscribers found. Nothing to migrate.");
    process.exit(0);
  }

  let updated = 0;
  let skipped = 0;
  let invalidFixed = 0;

  // Firestore batches can hold max 500 operations
  const batchSize = 400;
  let batch = db.batch();
  let batchCount = 0;

  for (const doc of snap.docs) {
    const data = doc.data();

    // Clean up the email while we're at it
    const rawEmail = (data.email || "").toString();
    const cleaned = rawEmail
      .replace(/[\u200B-\u200D\uFEFF\u00A0]/g, "")
      .replace(/[\u2000-\u200A]/g, "")
      .replace(/[\r\n\t]/g, "")
      .trim()
      .toLowerCase();

    const updates = {};

    // Add status if missing
    if (!data.status) {
      updates.status = "active";
    }

    // Fix email if it had invisible chars or wrong case
    if (cleaned !== rawEmail) {
      updates.email = cleaned;
      invalidFixed++;
      console.log(`  Fixed email: "${rawEmail}" → "${cleaned}"`);
    }

    if (Object.keys(updates).length > 0) {
      batch.update(doc.ref, updates);
      updated++;
      batchCount++;
    } else {
      skipped++;
    }

    // Commit batch if approaching limit
    if (batchCount >= batchSize) {
      await batch.commit();
      console.log(`  Committed batch of ${batchCount} updates...`);
      batch = db.batch();
      batchCount = 0;
    }
  }

  // Commit remaining
  if (batchCount > 0) {
    await batch.commit();
  }

  console.log("\n========= Migration Complete =========");
  console.log(`  Total subscribers:  ${snap.size}`);
  console.log(`  Updated:            ${updated}`);
  console.log(`  Skipped (already ok): ${skipped}`);
  console.log(`  Emails cleaned:     ${invalidFixed}`);
  console.log("======================================\n");
}

migrate()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("Migration failed:", err);
    process.exit(1);
  });

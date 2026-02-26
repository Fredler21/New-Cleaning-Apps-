/**
 * One-time script: Mark all EXISTING posts as "notified"
 * so the cron job only emails about truly NEW posts.
 *
 * Run once:  node scripts/seed-notified-posts.mjs
 */

import { initializeApp, cert } from "firebase-admin/app";
import { getFirestore, FieldValue } from "firebase-admin/firestore";

const posts = [
  "13-mind-blowing-listerine-hacks",
  "7-game-changing-ultra-cleaning-hacks",
  "14-ways-to-use-baking-soda-in-your-house",
  "7-hydrogen-peroxide-hacks",
  "5-cleaning-hacks-for-pet-owners",
  "10-lazy-cleaning-hacks",
  "how-to-deep-clean-your-bathroom-in-15-minutes",
  "remove-any-stain-with-these-5-tricks",
  "diy-all-purpose-cleaner-3-ingredients",
  "cleaning-myths-that-are-ruining-your-home",
  "7-kitchen-cleaning-hacks-with-vinegar",
  "speed-clean-your-entire-house-in-30-minutes",
  "5-ways-to-remove-hard-water-stains",
  "organize-under-your-sink-in-10-minutes",
  "how-to-clean-your-dishwasher-naturally",
  "3-ingredient-grout-cleaner-that-works",
  "best-way-to-clean-stainless-steel-appliances",
  "how-to-freshen-carpets-without-a-machine",
  "ultimate-fridge-cleaning-guide",
  "how-to-clean-your-microwave-in-5-minutes",
  "10-surprising-toothpaste-cleaning-hacks",
  "weekly-cleaning-schedule-that-works",
];

const app = initializeApp({
  credential: cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  }),
});

const db = getFirestore(app);

async function seed() {
  const batch = db.batch();

  for (const slug of posts) {
    const ref = db.collection("notifiedPosts").doc(slug);
    batch.set(ref, {
      slug,
      notifiedAt: FieldValue.serverTimestamp(),
    });
  }

  await batch.commit();
  console.log(`✅ Marked ${posts.length} existing posts as notified.`);
  process.exit(0);
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});

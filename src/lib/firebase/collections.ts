import { adminDb } from "./admin";
import { FieldValue } from "firebase-admin/firestore";

/* ------------------------------------------------------------------ */
/*  Collection names                                                   */
/* ------------------------------------------------------------------ */
export const COLLECTIONS = {
  SUBSCRIBERS: "subscribers",
  CONTACTS: "contacts",
  ANALYTICS: "analytics",
  NOTIFIED_POSTS: "notifiedPosts",
} as const;

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */
export interface Subscriber {
  email: string;
  subscribedAt: FirebaseFirestore.Timestamp;
  source: string;
}

export interface Contact {
  name: string;
  email: string;
  message: string;
  submittedAt: FirebaseFirestore.Timestamp;
  read: boolean;
}

export interface PostAnalytics {
  slug: string;
  views: number;
  lastViewedAt: FirebaseFirestore.Timestamp;
}

/* ------------------------------------------------------------------ */
/*  Subscribers                                                        */
/* ------------------------------------------------------------------ */

/** Add a newsletter subscriber. Returns the new document ID. */
export async function addSubscriber(email: string, source = "website") {
  const ref = adminDb.collection(COLLECTIONS.SUBSCRIBERS);

  // Prevent duplicates
  const existing = await ref.where("email", "==", email).limit(1).get();
  if (!existing.empty) {
    return { id: existing.docs[0].id, duplicate: true };
  }

  const doc = await ref.add({
    email,
    subscribedAt: FieldValue.serverTimestamp(),
    source,
  });
  return { id: doc.id, duplicate: false };
}

/** Remove a subscriber by email. Returns true if found and deleted. */
export async function removeSubscriber(email: string): Promise<boolean> {
  const snap = await adminDb
    .collection(COLLECTIONS.SUBSCRIBERS)
    .where("email", "==", email.trim().toLowerCase())
    .limit(1)
    .get();
  if (snap.empty) return false;
  await snap.docs[0].ref.delete();
  return true;
}

/** Get all subscribers (newest first). */
export async function getSubscribers(limit = 100) {
  const snap = await adminDb
    .collection(COLLECTIONS.SUBSCRIBERS)
    .orderBy("subscribedAt", "desc")
    .limit(limit)
    .get();
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Subscriber) }));
}

/* ------------------------------------------------------------------ */
/*  Contacts                                                           */
/* ------------------------------------------------------------------ */

/** Save a contact form submission. */
export async function addContact(name: string, email: string, message: string) {
  const doc = await adminDb.collection(COLLECTIONS.CONTACTS).add({
    name,
    email,
    message,
    submittedAt: FieldValue.serverTimestamp(),
    read: false,
  });
  return doc.id;
}

/** Get all contact submissions (newest first). */
export async function getContacts(limit = 100) {
  const snap = await adminDb
    .collection(COLLECTIONS.CONTACTS)
    .orderBy("submittedAt", "desc")
    .limit(limit)
    .get();
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Contact) }));
}

/* ------------------------------------------------------------------ */
/*  Analytics                                                          */
/* ------------------------------------------------------------------ */

/** Increment the view count for a post. Creates the document if needed. */
export async function trackPostView(slug: string) {
  const ref = adminDb.collection(COLLECTIONS.ANALYTICS).doc(slug);
  await ref.set(
    {
      slug,
      views: FieldValue.increment(1),
      lastViewedAt: FieldValue.serverTimestamp(),
    },
    { merge: true }
  );
}

/** Get analytics for all posts, ordered by views descending. */
export async function getPostAnalytics(limit = 50) {
  const snap = await adminDb
    .collection(COLLECTIONS.ANALYTICS)
    .orderBy("views", "desc")
    .limit(limit)
    .get();
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as PostAnalytics) }));
}

/** Get analytics for a single post. */
export async function getPostAnalyticsBySlug(slug: string) {
  const doc = await adminDb.collection(COLLECTIONS.ANALYTICS).doc(slug).get();
  if (!doc.exists) return null;
  return { id: doc.id, ...(doc.data() as PostAnalytics) };
}

/* ------------------------------------------------------------------ */
/*  Notified Posts (tracks which posts subscribers were emailed about) */
/* ------------------------------------------------------------------ */

/** Mark a post as "notified" so we don't email about it again. */
export async function markPostNotified(slug: string) {
  await adminDb.collection(COLLECTIONS.NOTIFIED_POSTS).doc(slug).set({
    slug,
    notifiedAt: FieldValue.serverTimestamp(),
  });
}

/** Get all post slugs that subscribers have already been notified about. */
export async function getNotifiedSlugs(): Promise<Set<string>> {
  const snap = await adminDb.collection(COLLECTIONS.NOTIFIED_POSTS).get();
  return new Set(snap.docs.map((d) => d.id));
}

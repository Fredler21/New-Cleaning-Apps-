import { adminDb } from "./admin";
import { FieldValue } from "firebase-admin/firestore";
import { sanitiseEmail, isValidEmail } from "../email-validation";

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
export type SubscriberStatus = "active" | "unsubscribed" | "bounced";

export interface Subscriber {
  email: string;
  subscribedAt: FirebaseFirestore.Timestamp;
  source: string;
  status: SubscriberStatus;
  /** ISO string of when the address bounced, if applicable. */
  bouncedAt?: string;
  /** The bounce error message, for debugging. */
  bounceReason?: string;
  /** ISO string of when the subscriber unsubscribed, if applicable. */
  unsubscribedAt?: string;
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

/** Add a newsletter subscriber. Sanitises email first. Returns the new document ID. */
export async function addSubscriber(rawEmail: string, source = "website") {
  const email = sanitiseEmail(rawEmail);

  if (!isValidEmail(email)) {
    return { id: "", duplicate: false, invalid: true };
  }

  const ref = adminDb.collection(COLLECTIONS.SUBSCRIBERS);

  // Prevent duplicates
  const existing = await ref.where("email", "==", email).limit(1).get();
  if (!existing.empty) {
    const data = existing.docs[0].data() as Subscriber;
    // Re-activate if previously unsubscribed
    if (data.status === "unsubscribed") {
      await existing.docs[0].ref.update({ status: "active", unsubscribedAt: FieldValue.delete() });
    }
    return { id: existing.docs[0].id, duplicate: true, invalid: false };
  }

  const doc = await ref.add({
    email,
    subscribedAt: FieldValue.serverTimestamp(),
    source,
    status: "active",
  });
  return { id: doc.id, duplicate: false, invalid: false };
}

/** Mark a subscriber as unsubscribed (soft-delete). */
export async function removeSubscriber(rawEmail: string): Promise<boolean> {
  const email = sanitiseEmail(rawEmail);
  const snap = await adminDb
    .collection(COLLECTIONS.SUBSCRIBERS)
    .where("email", "==", email)
    .limit(1)
    .get();
  if (snap.empty) return false;
  await snap.docs[0].ref.update({
    status: "unsubscribed",
    unsubscribedAt: new Date().toISOString(),
  });
  return true;
}

/** Mark a subscriber as bounced so we never send to them again. */
export async function markSubscriberBounced(
  rawEmail: string,
  reason = "Hard bounce",
): Promise<boolean> {
  const email = sanitiseEmail(rawEmail);
  const snap = await adminDb
    .collection(COLLECTIONS.SUBSCRIBERS)
    .where("email", "==", email)
    .limit(1)
    .get();
  if (snap.empty) return false;
  await snap.docs[0].ref.update({
    status: "bounced",
    bouncedAt: new Date().toISOString(),
    bounceReason: reason,
  });
  return true;
}

/** Get all ACTIVE subscribers only (excludes bounced & unsubscribed). */
export async function getActiveSubscribers(limit = 10000) {
  const snap = await adminDb
    .collection(COLLECTIONS.SUBSCRIBERS)
    .where("status", "==", "active")
    .orderBy("subscribedAt", "desc")
    .limit(limit)
    .get();
  return snap.docs.map((d) => ({ id: d.id, ...(d.data() as Subscriber) }));
}

/** Get all subscribers regardless of status (for admin views). */
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

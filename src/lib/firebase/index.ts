// Firebase, barrel exports
export { app, db } from "./config";
export { adminDb, getAdminDb } from "./admin";
export {
  addSubscriber,
  getSubscribers,
  getActiveSubscribers,
  removeSubscriber,
  markSubscriberBounced,
  addContact,
  getContacts,
  trackPostView,
  getPostAnalytics,
  getPostAnalyticsBySlug,
  markPostNotified,
  getNotifiedSlugs,
  recordPrintableSignup,
  COLLECTIONS,
} from "./collections";

export type { Subscriber, SubscriberStatus, Contact, PostAnalytics, PrintableSignup, PrintableDownload } from "./collections";

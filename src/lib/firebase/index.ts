// Firebase – barrel exports
export { app, db } from "./config";
export { adminApp, adminDb } from "./admin";
export {
  addSubscriber,
  getSubscribers,
  addContact,
  getContacts,
  trackPostView,
  getPostAnalytics,
  getPostAnalyticsBySlug,
  COLLECTIONS,
} from "./collections";

export type { Subscriber, Contact, PostAnalytics } from "./collections";

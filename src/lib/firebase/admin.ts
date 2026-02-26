import { initializeApp, getApps, cert, getApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

function getAdminApp() {
  if (getApps().length) return getApp();

  // Option 1: Service account JSON file path
  if (process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    return initializeApp();
  }

  // Option 2: Inline credentials via env vars
  const projectId = process.env.FIREBASE_PROJECT_ID || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  let privateKey = process.env.FIREBASE_PRIVATE_KEY;

  // Handle both escaped and unescaped newlines from env vars
  if (privateKey) {
    // If the key contains literal \n (escaped), replace with actual newlines
    if (privateKey.includes("\\n")) {
      privateKey = privateKey.replace(/\\n/g, "\n");
    }
    // If the key is wrapped in quotes, remove them
    if (privateKey.startsWith('"') && privateKey.endsWith('"')) {
      privateKey = privateKey.slice(1, -1).replace(/\\n/g, "\n");
    }
  }

  if (projectId && clientEmail && privateKey) {
    return initializeApp({
      credential: cert({ projectId, clientEmail, privateKey }),
    });
  }

  console.error("Firebase Admin: Missing credentials.", {
    hasProjectId: !!projectId,
    hasClientEmail: !!clientEmail,
    hasPrivateKey: !!privateKey,
  });

  // Fallback: ADC (works in Google Cloud environments)
  return initializeApp();
}

const adminApp = getAdminApp();
const adminDb = getFirestore(adminApp);

export { adminApp, adminDb };

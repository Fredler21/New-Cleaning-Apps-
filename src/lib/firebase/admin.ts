import {
  initializeApp,
  getApps,
  cert,
  getApp,
  type App,
} from "firebase-admin/app";
import { getFirestore, type Firestore } from "firebase-admin/firestore";

/**
 * Parse the private key from the FIREBASE_PRIVATE_KEY env var.
 * Vercel can store the key in several formats:
 *   1. Raw PEM with real newlines (ideal)
 *   2. JSON-escaped string with literal \n characters
 *   3. Wrapped in double quotes with literal \n
 * We normalise all of them to a real PEM.
 */
function parsePrivateKey(raw: string): string {
  let key = raw.trim();

  // Strip surrounding double-quotes if present
  if (key.startsWith('"') && key.endsWith('"')) {
    key = key.slice(1, -1);
  }
  // Strip surrounding single-quotes if present
  if (key.startsWith("'") && key.endsWith("'")) {
    key = key.slice(1, -1);
  }

  // Replace escaped newlines with real newlines
  key = key.replace(/\\n/g, "\n");

  return key;
}

/**
 * Lazy singleton — Firebase Admin is initialised on first call, not at import time.
 * This prevents module-level crashes from breaking the whole API route.
 */
let _app: App | null = null;
let _db: Firestore | null = null;

function getAdminApp(): App {
  if (_app) return _app;
  if (getApps().length) {
    _app = getApp();
    return _app;
  }

  const projectId =
    process.env.FIREBASE_PROJECT_ID ||
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
  const rawKey = process.env.FIREBASE_PRIVATE_KEY;

  if (!projectId || !clientEmail || !rawKey) {
    const missing = [
      !projectId && "FIREBASE_PROJECT_ID",
      !clientEmail && "FIREBASE_CLIENT_EMAIL",
      !rawKey && "FIREBASE_PRIVATE_KEY",
    ].filter(Boolean);
    throw new Error(
      `Firebase Admin: missing env var(s): ${missing.join(", ")}`
    );
  }

  const privateKey = parsePrivateKey(rawKey);

  // Sanity-check: the key should look like a PEM
  if (!privateKey.includes("-----BEGIN")) {
    throw new Error(
      `Firebase Admin: FIREBASE_PRIVATE_KEY does not look like a PEM key (starts with: ${privateKey.substring(0, 40)}…)`
    );
  }

  _app = initializeApp({
    credential: cert({ projectId, clientEmail, privateKey }),
  });

  return _app;
}

/**
 * Get the Firestore instance (lazy).
 * Call this from API routes instead of importing a module-level `adminDb`.
 */
export function getAdminDb(): Firestore {
  if (_db) return _db;
  _db = getFirestore(getAdminApp());
  return _db;
}

// Keep backward-compatible named exports (lazy getters)
export const adminDb = new Proxy({} as Firestore, {
  get(_target, prop, receiver) {
    // Proxy every property access to the real Firestore instance
    const db = getAdminDb();
    const val = Reflect.get(db, prop, receiver);
    return typeof val === "function" ? val.bind(db) : val;
  },
});

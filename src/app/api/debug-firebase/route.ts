import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const DEPLOY_VERSION = "2026-02-26-v2";

export async function GET() {
  const envCheck = {
    hasProjectId: !!process.env.FIREBASE_PROJECT_ID,
    hasClientEmail: !!process.env.FIREBASE_CLIENT_EMAIL,
    hasPrivateKey: !!process.env.FIREBASE_PRIVATE_KEY,
    privateKeyLength: process.env.FIREBASE_PRIVATE_KEY?.length || 0,
    privateKeyStart: process.env.FIREBASE_PRIVATE_KEY?.substring(0, 30) || "NOT SET",
    privateKeyEnd: process.env.FIREBASE_PRIVATE_KEY?.substring(
      (process.env.FIREBASE_PRIVATE_KEY?.length || 0) - 20
    ) || "NOT SET",
  };

  let adminStatus = "not tested";
  try {
    const { getAdminDb } = await import("@/lib/firebase/admin");
    const db = getAdminDb();
    const testRef = db.collection("notifiedPosts").limit(1);
    const snap = await testRef.get();
    adminStatus = `connected – found ${snap.size} doc(s)`;
  } catch (err) {
    adminStatus = `error: ${err instanceof Error ? err.message : String(err)}`;
  }

  return NextResponse.json({ envCheck, adminStatus, v: DEPLOY_VERSION });
}

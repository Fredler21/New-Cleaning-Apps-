import { NextResponse } from "next/server";

export async function GET() {
  const envCheck = {
    hasProjectId: !!process.env.FIREBASE_PROJECT_ID,
    hasClientEmail: !!process.env.FIREBASE_CLIENT_EMAIL,
    hasPrivateKey: !!process.env.FIREBASE_PRIVATE_KEY,
    privateKeyStart: process.env.FIREBASE_PRIVATE_KEY?.substring(0, 30) || "NOT SET",
    privateKeyLength: process.env.FIREBASE_PRIVATE_KEY?.length || 0,
  };

  let adminStatus = "not tested";
  try {
    const { adminDb } = await import("@/lib/firebase/admin");
    // Try a simple read
    const testRef = adminDb.collection("notifiedPosts").limit(1);
    const snap = await testRef.get();
    adminStatus = `connected – found ${snap.size} doc(s)`;
  } catch (err) {
    adminStatus = `error: ${err instanceof Error ? err.message : String(err)}`;
  }

  return NextResponse.json({ envCheck, adminStatus });
}

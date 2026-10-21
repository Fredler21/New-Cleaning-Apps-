// Export the email-gated printable signups from Firestore as CSV.
//
// Usage:
//   node scripts/export-printable-signups.mjs                       # everyone
//   node scripts/export-printable-signups.mjs --pdf=thanksgiving-cleaning-checklist
//   node scripts/export-printable-signups.mjs --out=signups.csv     # write to a file
//
// Needs the Firebase admin credentials in .env.local (FIREBASE_PROJECT_ID,
// FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY). `vercel env pull .env.local
// --environment=production` fills that in from the Vercel project.

import { writeFile } from "node:fs/promises";
import path from "node:path";
import dotenv from "dotenv";
import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

dotenv.config({ path: path.join(process.cwd(), ".env.local") });

const args = process.argv.slice(2);
const getArg = (name) => {
  const hit = args.find((a) => a.startsWith(`--${name}=`));
  return hit ? hit.split("=").slice(1).join("=") : undefined;
};
const pdfFilter = getArg("pdf");
const outFile = getArg("out");

function parsePrivateKey(raw) {
  let key = raw.trim();
  if ((key.startsWith('"') && key.endsWith('"')) || (key.startsWith("'") && key.endsWith("'"))) key = key.slice(1, -1);
  return key.replace(/\\n/g, "\n");
}

const projectId = process.env.FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const rawKey = process.env.FIREBASE_PRIVATE_KEY;
if (!projectId || !clientEmail || !rawKey) {
  console.error("Missing FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL or FIREBASE_PRIVATE_KEY in .env.local");
  process.exit(1);
}

if (!getApps().length) {
  initializeApp({ credential: cert({ projectId, clientEmail, privateKey: parsePrivateKey(rawKey) }) });
}
const db = getFirestore();

let query = db.collection("printableSignups");
if (pdfFilter) query = query.where("pdfs", "array-contains", pdfFilter);
const snap = await query.get();

const toIso = (value) => (value && typeof value.toDate === "function" ? value.toDate().toISOString() : value ?? "");
const csvCell = (value) => {
  const text = String(value ?? "");
  return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
};

const rows = [["email", "first_seen", "last_seen", "pdfs", "download_count", "last_download", "post_urls"]];
for (const doc of snap.docs) {
  const d = doc.data();
  const downloads = Array.isArray(d.downloads) ? d.downloads : [];
  const last = downloads.reduce((latest, item) => (item.at > latest ? item.at : latest), "");
  const postUrls = [...new Set(downloads.map((item) => item.postUrl).filter(Boolean))].join("; ");
  rows.push([
    d.email ?? doc.id,
    toIso(d.firstSeenAt),
    toIso(d.lastSeenAt),
    (d.pdfs ?? []).join("; "),
    downloads.length,
    last,
    postUrls,
  ]);
}
rows.sort((a, b) => (a === rows[0] ? -1 : b === rows[0] ? 1 : String(b[1]).localeCompare(String(a[1]))));

const csv = rows.map((row) => row.map(csvCell).join(",")).join("\n") + "\n";
if (outFile) {
  await writeFile(outFile, csv, "utf8");
  console.error(`${snap.size} signup(s)${pdfFilter ? ` for ${pdfFilter}` : ""} written to ${outFile}`);
} else {
  process.stdout.write(csv);
  console.error(`${snap.size} signup(s)${pdfFilter ? ` for ${pdfFilter}` : ""}`);
}

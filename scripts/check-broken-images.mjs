import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { glob } from "node:fs/promises";

const files = [
  "src/data/posts.ts",
  "src/data/categories.ts",
  "src/data/featured.ts",
];

const checkRef = async (ref) => {
  if (!ref || ref.startsWith("http")) return null;
  const rel = ref.replace(/^\//, "");
  const abs = path.join(process.cwd(), "public", rel);
  try {
    const s = await stat(abs);
    return { ok: true, size: s.size };
  } catch {
    return { ok: false };
  }
};

let totalMissing = 0;
let totalTiny = 0;

for (const f of files) {
  let txt;
  try {
    txt = await readFile(f, "utf8");
  } catch {
    continue;
  }
  const refs = [...txt.matchAll(/"(\/(?:uploads|graphics|og|images)[^"]+)"/g)].map(
    (m) => m[1],
  );
  console.log(`\n--- ${f} (${refs.length} refs) ---`);
  for (const r of refs) {
    const res = await checkRef(r);
    if (!res || !res.ok) {
      console.log("  MISSING:", r);
      totalMissing++;
    } else if (res.size < 5000) {
      console.log("  TINY:", r, res.size + "B");
      totalTiny++;
    }
  }
}

console.log(`\nTotal missing: ${totalMissing}, tiny: ${totalTiny}`);

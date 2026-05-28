// /ads.txt route.
//
// AdSense requires a 200-OK text/plain response at the site root with the
// actual content inline. A cross-domain 301 redirect (Ezoic's default
// adstxtmanager.com integration) does NOT satisfy AdSense's crawler.
//
// Strategy (in order):
//   1. Fetch Ezoic's managed list. If it returns 200 with a non-empty body,
//      serve that body inline. (This preserves Ezoic's auto-update of the
//      authorized seller list.)
//   2. If Ezoic returns 4xx/5xx or empty, fall back to a hand-maintained
//      list defined in the ADS_TXT_FALLBACK env var (set on Vercel).
//   3. Last resort, return the minimum required AdSense ownership line so
//      AdSense can still verify the site even if everything upstream is down.
//
// To set or update the fallback, set ADS_TXT_FALLBACK in the Vercel project
// env vars. Newlines should be encoded as \n.

export const dynamic = "force-dynamic";
export const revalidate = 0;

const EZOIC_ADS_TXT =
  "https://srv.adstxtmanager.com/19390/trycleaninghacks.com";

// Hard-coded AdSense ownership line. Reads from env first so we can rotate
// without a deploy, but ships with a baseline so the route is never empty.
const ADSENSE_PUB_ID = process.env.ADSENSE_PUB_ID || ""; // e.g. "pub-1234567890123456"

const buildMinimalAdsTxt = () => {
  const lines = [
    "# trycleaninghacks.com authorized digital sellers",
  ];
  if (ADSENSE_PUB_ID) {
    lines.push(
      `google.com, ${ADSENSE_PUB_ID}, DIRECT, f08c47fec0942fa0`
    );
  }
  return lines.join("\n") + "\n";
};

const respondText = (body: string) =>
  new Response(body, {
    status: 200,
    headers: {
      "content-type": "text/plain; charset=utf-8",
      // Cache 1 hour on the edge so we don't hammer Ezoic on every request.
      "cache-control": "public, max-age=3600, s-maxage=3600",
    },
  });

export async function GET() {
  // 1. Try Ezoic.
  try {
    const upstream = await fetch(EZOIC_ADS_TXT, {
      // Avoid Next caching the upstream response indefinitely.
      cache: "no-store",
      headers: {
        // Some ads.txt managers gate on user-agent. Identify ourselves clearly.
        "user-agent": "trycleaninghacks-ads-txt-proxy/1.0",
      },
    });

    if (upstream.ok) {
      const body = (await upstream.text()).trim();
      if (body.length > 0) {
        return respondText(body + "\n");
      }
    }
  } catch {
    // fall through to fallback
  }

  // 2. Fallback list from env var (newline-separated).
  const fallback = (process.env.ADS_TXT_FALLBACK || "").replace(/\\n/g, "\n").trim();
  if (fallback.length > 0) {
    return respondText(fallback + "\n");
  }

  // 3. Last-resort minimum: AdSense ownership line (if pub id is configured).
  return respondText(buildMinimalAdsTxt());
}


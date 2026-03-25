import { NextRequest, NextResponse } from "next/server";

/**
 * SEO Canonical Enforcement Middleware
 *
 * Ensures all traffic is served from the single canonical host:
 *   https://www.trycleaninghacks.com
 *
 * Any request arriving on a non-www variant (e.g. trycleaninghacks.com)
 * is issued a 301 permanent redirect to the www version in a SINGLE hop,
 * preventing the redirect chains that cause Google Search Console to flag
 * pages as "Page with redirect".
 *
 * Skipped for:
 *  - localhost / 127.x (local development)
 *  - *.vercel.app (Vercel preview deployments)
 */

const CANONICAL_HOST = "www.trycleaninghacks.com";

export function middleware(request: NextRequest) {
  const host = request.headers.get("host") ?? "";
  const bareHost = host.split(":")[0]; // Remove port if present

  const isLocalhost =
    bareHost === "localhost" || bareHost.startsWith("127.");
  const isVercelPreview = bareHost.endsWith(".vercel.app");

  if (!isLocalhost && !isVercelPreview && bareHost !== CANONICAL_HOST) {
    // Build the canonical URL in one hop (always https + www)
    const url = request.nextUrl.clone();
    url.protocol = "https:";
    url.host = CANONICAL_HOST;
    return NextResponse.redirect(url, { status: 301 });
  }

  return NextResponse.next();
}

export const config = {
  // Run on all routes except Next.js internals and static assets
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};

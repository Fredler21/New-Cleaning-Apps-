import { NextRequest, NextResponse } from "next/server";

/**
 * Enforce apex (no www) so Google never sees the apex and the www host as
 * two separate (duplicate) origins.
 *
 * www requests are 301-redirected to the apex equivalent.
 * Apex is the primary host so that ads.txt and other root-level files
 * are served directly without redirects (required for AdSense crawlers).
 */
export function middleware(req: NextRequest) {
  const host = req.headers.get("host") ?? "";
  const isWww = host.startsWith("www.");

  if (isWww) {
    const url = req.nextUrl.clone();
    url.host = host.replace(/^www\./, "");
    return NextResponse.redirect(url, { status: 301 });
  }

  return NextResponse.next();
}

export const config = {
  // Run on all navigable routes; skip Next.js internals, static assets, and ads.txt.
  matcher: ["/((?!_next/static|_next/image|favicon.ico|ads.txt).*)"],
};

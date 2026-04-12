import { NextRequest, NextResponse } from "next/server";

/**
 * Enforce www. prefix so Google never sees trycleaninghacks.com and
 * www.trycleaninghacks.com as two separate (duplicate) origins.
 *
 * Non-www requests are 301-redirected to the www equivalent.
 * This eliminates the www / non-www duplicate-canonical signal that
 * triggers "Duplicate, Google chose different canonical than user".
 */
export function middleware(req: NextRequest) {
  const host = req.headers.get("host") ?? "";
  const isNonWww =
    host === "trycleaninghacks.com" || host.startsWith("trycleaninghacks.com:");

  if (isNonWww) {
    const url = req.nextUrl.clone();
    url.host = "www.trycleaninghacks.com";
    return NextResponse.redirect(url, { status: 301 });
  }

  return NextResponse.next();
}

export const config = {
  // Run on all navigable routes; skip Next.js internals and static assets.
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};

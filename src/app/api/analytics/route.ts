import { NextResponse } from "next/server";

const DEPLOY_VERSION = "2026-10-08-v3";

/**
 * POST /api/analytics , Track a page view
 * Body: { slug: string }
 */
export async function POST(request: Request) {
  let body: { slug?: string };

  try {
    body = (await request.json()) as { slug?: string };
  } catch {
    return NextResponse.json({ error: "Invalid request.", v: DEPLOY_VERSION }, { status: 400 });
  }

  if (!body.slug || typeof body.slug !== "string" || body.slug.trim().length === 0) {
    return NextResponse.json({ error: "A valid slug is required.", v: DEPLOY_VERSION }, { status: 400 });
  }

  try {
    // Dynamic import so module-level init errors are caught here
    const { trackPostView } = await import("@/lib/firebase/collections");
    await trackPostView(body.slug.trim());
    return NextResponse.json({ success: true, v: DEPLOY_VERSION });
  } catch (err) {
    console.error("Analytics tracking error:", err instanceof Error ? err.message : err);
    return NextResponse.json(
      { error: "Failed to track view.", v: DEPLOY_VERSION },
      { status: 500 }
    );
  }
}

/**
 * GET /api/analytics?slug=xxx , Get the view count for one post
 *
 * The unfiltered form used to dump every post's counters and timestamps to
 * anyone who asked. Nothing on the site reads that, so it is gone.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug")?.trim();

  if (!slug) {
    return NextResponse.json({ error: "A slug query parameter is required.", v: DEPLOY_VERSION }, { status: 400 });
  }

  try {
    const { getPostAnalyticsBySlug } = await import("@/lib/firebase/collections");
    const data = await getPostAnalyticsBySlug(slug);
    return NextResponse.json({ ...(data ?? { slug, views: 0 }), v: DEPLOY_VERSION });
  } catch (err) {
    console.error("Analytics fetch error:", err instanceof Error ? err.message : err);
    return NextResponse.json({ error: "Failed to fetch analytics.", v: DEPLOY_VERSION }, { status: 500 });
  }
}

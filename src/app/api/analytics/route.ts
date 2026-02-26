import { NextResponse } from "next/server";

const DEPLOY_VERSION = "2026-02-26-v2";

/**
 * POST /api/analytics  – Track a page view
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
    const message = err instanceof Error ? err.message : String(err);
    const stack = err instanceof Error ? err.stack?.split("\n").slice(0, 3).join(" | ") : undefined;
    console.error("Analytics tracking error:", message, err);
    return NextResponse.json(
      { error: "Failed to track view.", detail: message, stack, v: DEPLOY_VERSION },
      { status: 500 }
    );
  }
}

/**
 * GET /api/analytics           – Get all post analytics
 * GET /api/analytics?slug=xxx  – Get analytics for one post
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get("slug");

  try {
    const { getPostAnalytics, getPostAnalyticsBySlug } = await import("@/lib/firebase/collections");
    if (slug) {
      const data = await getPostAnalyticsBySlug(slug);
      return NextResponse.json({ ...(data ?? { slug, views: 0 }), v: DEPLOY_VERSION });
    }

    const data = await getPostAnalytics();
    return NextResponse.json({ data, v: DEPLOY_VERSION });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("Analytics fetch error:", err);
    return NextResponse.json({ error: "Failed to fetch analytics.", detail: message, v: DEPLOY_VERSION }, { status: 500 });
  }
}

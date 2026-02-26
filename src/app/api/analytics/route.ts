import { NextResponse } from "next/server";
import { trackPostView, getPostAnalytics, getPostAnalyticsBySlug } from "@/lib/firebase/collections";

/**
 * POST /api/analytics  – Track a page view
 * Body: { slug: string }
 */
export async function POST(request: Request) {
  let body: { slug?: string };

  try {
    body = (await request.json()) as { slug?: string };
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!body.slug || typeof body.slug !== "string" || body.slug.trim().length === 0) {
    return NextResponse.json({ error: "A valid slug is required." }, { status: 400 });
  }

  try {
    await trackPostView(body.slug.trim());
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Analytics tracking error:", err);
    return NextResponse.json({ error: "Failed to track view." }, { status: 500 });
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
    if (slug) {
      const data = await getPostAnalyticsBySlug(slug);
      return NextResponse.json(data ?? { slug, views: 0 });
    }

    const data = await getPostAnalytics();
    return NextResponse.json(data);
  } catch (err) {
    console.error("Analytics fetch error:", err);
    return NextResponse.json({ error: "Failed to fetch analytics." }, { status: 500 });
  }
}

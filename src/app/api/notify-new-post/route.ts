import { NextResponse } from "next/server";
import { sendMailWithRetry, unsubUrl } from "@/lib/mail";
import { getActiveSubscribers, markSubscriberBounced } from "@/lib/firebase/collections";
import { posts } from "@/data/posts";
import { newPostEmailHtml, newPostEmailText } from "@/lib/email-template";

export const maxDuration = 60;

/**
 * POST /api/notify-new-post
 * Body: { slug: string, secret: string }
 *
 * Sends a "New post!" email to all ACTIVE subscribers.
 * Protected by a secret key to prevent abuse.
 *
 * Improvements:
 *  - Only sends to active subscribers
 *  - Validates & sanitises emails
 *  - Retry logic with exponential backoff
 *  - Bounce detection and auto-marking
 *  - Professional HTML template
 *  - Per-email logging
 */
export async function POST(request: Request) {
  let body: { slug?: string; secret?: string };

  try {
    body = (await request.json()) as { slug?: string; secret?: string };
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  /* ---------- Auth check ---------- */
  const expectedSecret = process.env.NOTIFY_SECRET;
  if (!expectedSecret || body.secret !== expectedSecret) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  /* ---------- Find the post ---------- */
  if (!body.slug) {
    return NextResponse.json({ error: "slug is required." }, { status: 400 });
  }

  const post = posts.find((p) => p.slug === body.slug);
  if (!post) {
    return NextResponse.json({ error: `Post "${body.slug}" not found.` }, { status: 404 });
  }

  /* ---------- Get ACTIVE subscribers only ---------- */
  let subscribers: { email: string }[];
  try {
    subscribers = await getActiveSubscribers();
  } catch (err) {
    console.error("[NOTIFY] Failed to fetch subscribers:", err);
    return NextResponse.json({ error: "Failed to fetch subscribers." }, { status: 500 });
  }

  if (subscribers.length === 0) {
    return NextResponse.json({ message: "No active subscribers to notify." });
  }

  console.log(`[NOTIFY] Sending "${post.title}" to ${subscribers.length} subscriber(s).`);

  /* ---------- Send emails ---------- */
  const postUrl = `https://trycleaninghacks.com/posts/${post.slug}`;

  let sent = 0;
  let failed = 0;
  let bounced = 0;

  for (const sub of subscribers) {
    const unsub = unsubUrl(sub.email);

    const result = await sendMailWithRetry({
      to: sub.email,
      subject: `New Post on TryCleaningHacks: ${post.title}`,
      html: newPostEmailHtml({
        title: post.title,
        excerpt: post.excerpt,
        postUrl,
        readTime: post.readTime,
        unsubscribeUrl: unsub,
      }),
      text: newPostEmailText({
        title: post.title,
        excerpt: post.excerpt,
        postUrl,
        readTime: post.readTime,
        unsubscribeUrl: unsub,
      }),
    });

    if (result.success) {
      sent++;
      console.log(`[NOTIFY] Sent to ${sub.email} via ${result.provider} (${result.id})`);
    } else if (result.isBounce) {
      bounced++;
      console.warn(`[NOTIFY] BOUNCE ${sub.email}: ${result.error}`);
      await markSubscriberBounced(sub.email, result.error).catch((e) =>
        console.error(`[NOTIFY] Failed to mark bounce for ${sub.email}:`, e),
      );
    } else {
      failed++;
      console.error(`[NOTIFY] FAILED ${sub.email}: ${result.error}`);
    }

    // Small delay between sends to respect rate limits
    await new Promise((r) => setTimeout(r, 300));
  }

  console.log(`[NOTIFY] Done: sent=${sent}, failed=${failed}, bounced=${bounced}`);

  return NextResponse.json({
    message: `Notification sent for "${post.title}"`,
    sent,
    failed,
    bounced,
    total: subscribers.length,
  });
}

import { NextResponse } from "next/server";
import { sendMailWithRetry, unsubUrl } from "@/lib/mail";
import {
  getActiveSubscribers,
  getNotifiedSlugs,
  markPostNotified,
  markSubscriberBounced,
} from "@/lib/firebase/collections";
import { posts } from "@/data/posts";
import { newPostEmailHtml, newPostEmailText } from "@/lib/email-template";

export const maxDuration = 60;

/**
 * GET /api/cron/notify-new-posts
 *
 * Automatically detects new posts that subscribers haven't been
 * emailed about yet, sends notification emails, and marks them as done.
 *
 * Called by Vercel Cron daily at 8am UTC.
 *
 * Improvements over previous version:
 *  - Only sends to active subscribers (excludes bounced/unsubscribed)
 *  - Validates emails before sending
 *  - Retries transient failures
 *  - Marks bounced addresses automatically
 *  - Professional HTML template with plain-text fallback
 *  - Detailed per-email logging
 */
export async function GET(request: Request) {
  /* ---------- Auth: only allow Vercel Cron or secret ---------- */
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  /* ---------- Find posts not yet notified ---------- */
  let notifiedSlugs: Set<string>;
  try {
    notifiedSlugs = await getNotifiedSlugs();
  } catch (err) {
    console.error("[CRON] Failed to fetch notified slugs:", err);
    return NextResponse.json({ error: "Failed to check notified posts." }, { status: 500 });
  }

  const newPosts = posts.filter((p) => !notifiedSlugs.has(p.slug));

  if (newPosts.length === 0) {
    return NextResponse.json({ message: "No new posts to notify about." });
  }

  /* ---------- Get ACTIVE subscribers only ---------- */
  let subscribers: { email: string }[];
  try {
    subscribers = await getActiveSubscribers();
  } catch (err) {
    console.error("[CRON] Failed to fetch subscribers:", err);
    return NextResponse.json({ error: "Failed to fetch subscribers." }, { status: 500 });
  }

  if (subscribers.length === 0) {
    for (const post of newPosts) {
      await markPostNotified(post.slug);
    }
    return NextResponse.json({ message: "No active subscribers. Posts marked as notified." });
  }

  console.log(`[CRON] Sending notifications for ${newPosts.length} post(s) to ${subscribers.length} subscriber(s).`);

  /* ---------- Send emails for each new post ---------- */
  const results: { slug: string; sent: number; failed: number; bounced: number }[] = [];

  for (const post of newPosts) {
    const postUrl = `https://www.trycleaninghacks.com/cleaning-hacks/${post.slug}`;

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
        console.log(`[CRON] Sent to ${sub.email} via ${result.provider} (${result.id})`);
      } else if (result.isBounce) {
        bounced++;
        console.warn(`[CRON] BOUNCE ${sub.email}: ${result.error}`);
        await markSubscriberBounced(sub.email, result.error).catch((e) =>
          console.error(`[CRON] Failed to mark bounce for ${sub.email}:`, e),
        );
      } else {
        failed++;
        console.error(`[CRON] FAILED ${sub.email}: ${result.error}`);
      }

      // Delay between sends to respect Resend free-tier rate limit (2 req/s)
      await new Promise((r) => setTimeout(r, 600));
    }

    await markPostNotified(post.slug);
    results.push({ slug: post.slug, sent, failed, bounced });
    console.log(`[CRON] Post "${post.slug}": sent=${sent}, failed=${failed}, bounced=${bounced}`);
  }

  return NextResponse.json({
    message: `Notified subscribers about ${newPosts.length} new post(s).`,
    results,
  });
}

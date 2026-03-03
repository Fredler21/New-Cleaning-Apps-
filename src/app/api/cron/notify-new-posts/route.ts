import { NextResponse } from "next/server";
import { sendMail, unsubUrl } from "@/lib/mail";
import {
  getSubscribers,
  getNotifiedSlugs,
  markPostNotified,
} from "@/lib/firebase/collections";
import { posts } from "@/data/posts";

export const maxDuration = 60;

/**
 * GET /api/cron/notify-new-posts
 *
 * Automatically detects new posts that subscribers haven't been
 * emailed about yet, sends notification emails, and marks them as done.
 *
 * Called by Vercel Cron daily at 8am UTC.
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
    console.error("Failed to fetch notified slugs:", err);
    return NextResponse.json({ error: "Failed to check notified posts." }, { status: 500 });
  }

  const newPosts = posts.filter((p) => !notifiedSlugs.has(p.slug));

  if (newPosts.length === 0) {
    return NextResponse.json({ message: "No new posts to notify about." });
  }

  /* ---------- Get subscribers ---------- */
  let subscribers: { email: string }[];
  try {
    subscribers = await getSubscribers(10000);
  } catch (err) {
    console.error("Failed to fetch subscribers:", err);
    return NextResponse.json({ error: "Failed to fetch subscribers." }, { status: 500 });
  }

  if (subscribers.length === 0) {
    for (const post of newPosts) {
      await markPostNotified(post.slug);
    }
    return NextResponse.json({ message: "No subscribers yet. Posts marked as notified." });
  }

  /* ---------- Send emails for each new post via Zoho SMTP ---------- */
  const results: { slug: string; sent: number; failed: number }[] = [];

  for (const post of newPosts) {
    const postUrl = `https://trycleaninghacks.com/posts/${post.slug}`;

    let sent = 0;
    let failed = 0;

    for (const sub of subscribers) {
      try {
        const unsub = unsubUrl(sub.email);

        await sendMail({
          to: sub.email,
          subject: `${post.title}`,
          html: `<p>Hi,</p>
<p>We just published a new cleaning guide you might like:</p>
<p><a href="${postUrl}">${post.title}</a></p>
<p>${post.excerpt}</p>
<p>${post.readTime}</p>
<p><a href="${postUrl}">Read the full guide</a></p>
<p style="font-size:12px;">You received this because you subscribed at trycleaninghacks.com.<br/>
<a href="${unsub}">Unsubscribe</a></p>`,
        });
        sent++;
      } catch (err) {
        console.error(`Failed to send to ${sub.email}:`, err);
        failed++;
      }

      // Small delay between sends to avoid Zoho rate limits
      await new Promise((r) => setTimeout(r, 500));
    }

    await markPostNotified(post.slug);
    results.push({ slug: post.slug, sent, failed });
  }

  return NextResponse.json({
    message: `Notified subscribers about ${newPosts.length} new post(s).`,
    results,
  });
}

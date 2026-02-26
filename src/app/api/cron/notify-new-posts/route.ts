import { NextResponse } from "next/server";
import { Resend } from "resend";
import {
  getSubscribers,
  getNotifiedSlugs,
  markPostNotified,
} from "@/lib/firebase/collections";
import { posts } from "@/data/posts";

/**
 * GET /api/cron/notify-new-posts
 *
 * Automatically detects new posts that subscribers haven't been
 * emailed about yet, sends notification emails, and marks them as done.
 *
 * Called by Vercel Cron after every deploy.
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
    // Still mark posts as notified so we don't keep retrying
    for (const post of newPosts) {
      await markPostNotified(post.slug);
    }
    return NextResponse.json({ message: "No subscribers yet. Posts marked as notified." });
  }

  /* ---------- Send emails for each new post ---------- */
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "RESEND_API_KEY not set." }, { status: 500 });
  }

  const resend = new Resend(apiKey);
  const results: { slug: string; sent: number; failed: number }[] = [];

  for (const post of newPosts) {
    const postUrl = `https://trycleaninghacks.com/posts/${post.slug}`;
    const coverUrl = `https://trycleaninghacks.com${post.coverImage}`;

    let sent = 0;
    let failed = 0;

    // Send in batches of 10
    const batchSize = 10;
    for (let i = 0; i < subscribers.length; i += batchSize) {
      const batch = subscribers.slice(i, i + batchSize);

      const batchResults = await Promise.allSettled(
        batch.map((sub) =>
          resend.emails.send({
            from: `TryCleaningHacks <noreply@contact.trycleaninghacks.com>`,
            to: sub.email,
            subject: `🧹 New Hack: ${post.title}`,
            html: `
              <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden;">
                <div style="background: linear-gradient(135deg, #0d9488, #14b8a6); padding: 24px; text-align: center;">
                  <h1 style="color: #ffffff; margin: 0; font-size: 22px;">New Cleaning Hack! 🎉</h1>
                </div>
                <div style="padding: 24px;">
                  <img src="${coverUrl}" alt="${post.title}" style="width: 100%; border-radius: 8px; margin-bottom: 16px;" />
                  <h2 style="color: #1f2937; font-size: 20px; margin: 0 0 12px;">${post.title}</h2>
                  <p style="font-size: 15px; color: #4b5563; line-height: 1.6; margin: 0 0 8px;">
                    ${post.excerpt}
                  </p>
                  <p style="font-size: 13px; color: #9ca3af; margin: 0 0 24px;">
                    📖 ${post.readTime} &nbsp;·&nbsp; 🏷️ ${post.category}
                  </p>
                  <div style="text-align: center;">
                    <a href="${postUrl}" style="background: #0d9488; color: #ffffff; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 16px; display: inline-block;">
                      Read the Full Hack →
                    </a>
                  </div>
                </div>
                <div style="background: #f9fafb; padding: 16px 24px; text-align: center;">
                  <p style="font-size: 12px; color: #9ca3af; margin: 0;">
                    You're receiving this because you subscribed at 
                    <a href="https://trycleaninghacks.com" style="color: #0d9488;">trycleaninghacks.com</a>.
                  </p>
                </div>
              </div>
            `,
          })
        )
      );

      for (const r of batchResults) {
        if (r.status === "fulfilled") sent++;
        else failed++;
      }

      // Small delay between batches
      if (i + batchSize < subscribers.length) {
        await new Promise((r) => setTimeout(r, 1000));
      }
    }

    // Mark this post as notified
    await markPostNotified(post.slug);
    results.push({ slug: post.slug, sent, failed });
  }

  return NextResponse.json({
    message: `Notified subscribers about ${newPosts.length} new post(s).`,
    results,
  });
}

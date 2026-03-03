import { NextResponse } from "next/server";
import { sendMail, unsubUrl } from "@/lib/mail";
import { getSubscribers } from "@/lib/firebase/collections";
import { posts } from "@/data/posts";

export const maxDuration = 60;

/**
 * POST /api/notify-new-post
 * Body: { slug: string, secret: string }
 *
 * Sends a "New post!" email to all subscribers via Zoho SMTP.
 * Protected by a secret key to prevent abuse.
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

  /* ---------- Get all subscribers ---------- */
  let subscribers: { email: string }[];
  try {
    subscribers = await getSubscribers(10000);
  } catch (err) {
    console.error("Failed to fetch subscribers:", err);
    return NextResponse.json({ error: "Failed to fetch subscribers." }, { status: 500 });
  }

  if (subscribers.length === 0) {
    return NextResponse.json({ message: "No subscribers to notify." });
  }

  /* ---------- Send emails via Zoho SMTP ---------- */
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

  return NextResponse.json({
    message: `Notification sent for "${post.title}"`,
    sent,
    failed,
    total: subscribers.length,
  });
}

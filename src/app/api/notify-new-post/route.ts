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
        subject: `New from TryCleaningHacks: ${post.title}`,
        html: `
          <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;max-width:560px;margin:0 auto;color:#1f2937;">
            <p style="font-size:16px;line-height:1.6;">Hi,</p>
            <p style="font-size:16px;line-height:1.6;">We just published a new cleaning guide you might like:</p>
            <p style="font-size:18px;line-height:1.4;font-weight:600;">
              <a href="${postUrl}" style="color:#0d9488;text-decoration:none;">${post.title}</a>
            </p>
            <p style="font-size:15px;color:#4b5563;line-height:1.6;">${post.excerpt}</p>
            <p style="font-size:13px;color:#9ca3af;">${post.readTime} &middot; ${post.category}</p>
            <p style="margin-top:24px;"><a href="${postUrl}" style="color:#0d9488;font-weight:600;">Read the full guide</a></p>
            <p style="font-size:13px;color:#9ca3af;margin-top:32px;padding-top:16px;border-top:1px solid #e5e7eb;">
              You are receiving this because you subscribed at trycleaninghacks.com.<br/>
              <a href="${unsub}" style="color:#9ca3af;">Unsubscribe</a>
            </p>
          </div>
        `,
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

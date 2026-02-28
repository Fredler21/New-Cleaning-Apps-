import { NextResponse } from "next/server";
import { sendMail } from "@/lib/mail";
import { getSubscribers } from "@/lib/firebase/collections";
import { posts } from "@/data/posts";

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
  const coverUrl = `https://trycleaninghacks.com${post.coverImage}`;

  let sent = 0;
  let failed = 0;

  for (const sub of subscribers) {
    try {
      await sendMail({
        to: sub.email,
        subject: `New from TryCleaningHacks: ${post.title}`,
        html: `
          <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden;">
            <div style="background: linear-gradient(135deg, #0d9488, #14b8a6); padding: 24px; text-align: center;">
              <h1 style="color: #ffffff; margin: 0; font-size: 22px;">New Cleaning Hack!</h1>
            </div>
            <div style="padding: 24px;">
              <img src="${coverUrl}" alt="${post.title}" style="width: 100%; border-radius: 8px; margin-bottom: 16px;" />
              <h2 style="color: #1f2937; font-size: 20px; margin: 0 0 12px;">${post.title}</h2>
              <p style="font-size: 15px; color: #4b5563; line-height: 1.6; margin: 0 0 8px;">
                ${post.excerpt}
              </p>
              <p style="font-size: 13px; color: #9ca3af; margin: 0 0 24px;">
                ${post.readTime} · ${post.category}
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
              <p style="font-size: 12px; color: #9ca3af; margin: 4px 0 0;">Don't want these emails? <a href="https://trycleaninghacks.com/contact" style="color: #0d9488;">Unsubscribe here</a>.</p>
            </div>
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

import { NextResponse } from "next/server";
import { sendMail, unsubUrl } from "@/lib/mail";
import { getSubscribers } from "@/lib/firebase/collections";

export const maxDuration = 60;

/**
 * POST /api/send-thankyou
 * One-time endpoint to send a thank-you to all subscribers.
 * Protected by secret.
 */
export async function POST(request: Request) {
  const body = (await request.json()) as { secret?: string };
  if (body.secret !== process.env.NOTIFY_SECRET) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const subscribers = await getSubscribers(10000);

  if (subscribers.length === 0) {
    return NextResponse.json({ message: "No subscribers." });
  }

  let sent = 0;
  let failed = 0;

  for (const sub of subscribers) {
    try {
      const unsub = unsubUrl(sub.email);

      await sendMail({
        to: sub.email,
        subject: "A quick thank you",
        html: `<p>Hi,</p>
<p>Just wanted to say thank you for being a TryCleaningHacks subscriber. It means a lot to us that you are part of this community.</p>
<p>We have plenty of new cleaning guides coming your way soon. In the meantime, feel free to check out our latest posts: <a href="https://trycleaninghacks.com/posts">trycleaninghacks.com/posts</a></p>
<p>Thanks again for your support!</p>
<p>— The TryCleaningHacks Team</p>
<p style="font-size:12px;color:#999;margin-top:24px;"><a href="${unsub}">Unsubscribe</a></p>`,
      });
      sent++;
    } catch (err) {
      console.error(`Failed to send to ${sub.email}:`, err);
      failed++;
    }

    await new Promise((r) => setTimeout(r, 500));
  }

  return NextResponse.json({ message: "Thank you emails sent.", sent, failed, total: subscribers.length });
}

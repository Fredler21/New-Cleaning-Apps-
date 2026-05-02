import { NextResponse } from "next/server";
import { markSubscriberBounced } from "@/lib/firebase/collections";

/**
 * POST /api/webhooks/resend
 *
 * Receives webhook events from Resend for automatic bounce detection.
 *
 * Setup in Resend dashboard:
 *   1. Go to Settings → Webhooks
 *   2. Add endpoint: https://trycleaninghacks.com/api/webhooks/resend
 *   3. Select events: email.bounced, email.complained
 *   4. Copy the signing secret to RESEND_WEBHOOK_SECRET env var
 */
export async function POST(request: Request) {
  const webhookSecret = process.env.RESEND_WEBHOOK_SECRET;

  // Verify the webhook signature if secret is configured
  if (webhookSecret) {
    const signature = request.headers.get("svix-signature");
    if (!signature) {
      return NextResponse.json({ error: "Missing signature." }, { status: 401 });
    }
    // Note: For production, use the svix package for full signature verification.
    // This basic check ensures the header is present.
  }

  let event: {
    type?: string;
    data?: {
      to?: string[];
      email_id?: string;
      bounce_type?: string;
      reason?: string;
    };
  };

  try {
    event = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const eventType = event.type;

  if (!eventType || !event.data) {
    return NextResponse.json({ error: "Invalid event." }, { status: 400 });
  }

  console.log(`[WEBHOOK] Received Resend event: ${eventType}`);

  switch (eventType) {
    case "email.bounced": {
      const recipients = event.data.to || [];
      const reason = event.data.reason || `Bounce (${event.data.bounce_type || "unknown"})`;

      for (const email of recipients) {
        console.warn(`[WEBHOOK] Hard bounce: ${email} — ${reason}`);
        await markSubscriberBounced(email, reason).catch((e) =>
          console.error(`[WEBHOOK] Failed to mark bounce for ${email}:`, e),
        );
      }
      break;
    }

    case "email.complained": {
      // Spam complaints should also suppress future sends
      const recipients = event.data.to || [];
      for (const email of recipients) {
        console.warn(`[WEBHOOK] Spam complaint: ${email}`);
        await markSubscriberBounced(email, "Spam complaint").catch((e) =>
          console.error(`[WEBHOOK] Failed to mark complaint for ${email}:`, e),
        );
      }
      break;
    }

    default:
      // Other events (delivered, opened, clicked) — just acknowledge
      console.log(`[WEBHOOK] Ignoring event type: ${eventType}`);
  }

  return NextResponse.json({ received: true });
}

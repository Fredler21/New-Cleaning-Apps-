import { NextResponse } from "next/server";
import { removeSubscriber } from "@/lib/firebase/collections";

/**
 * POST /api/unsubscribe
 * Body: { email: string } OR List-Unsubscribe=One-Click (RFC 8058)
 *
 * Removes a subscriber from the mailing list.
 * Supports both JSON body and URL-encoded form (for one-click unsubscribe).
 */
export async function POST(request: Request) {
  let email = "";

  const contentType = request.headers.get("content-type") || "";

  try {
    if (contentType.includes("application/x-www-form-urlencoded")) {
      // One-click unsubscribe (RFC 8058) — email is in the URL search params
      const url = new URL(request.url);
      email = url.searchParams.get("email") || "";

      // Also check the body for the List-Unsubscribe=One-Click field
      if (!email) {
        const body = await request.text();
        const params = new URLSearchParams(body);
        email = params.get("email") || "";
      }
    } else {
      const body = (await request.json()) as { email?: string };
      email = body.email || "";
    }
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  email = email.trim().toLowerCase();

  if (!email || !/\S+@\S+\.\S+/.test(email)) {
    return NextResponse.json(
      { error: "A valid email address is required." },
      { status: 400 }
    );
  }

  try {
    const removed = await removeSubscriber(email);

    if (removed) {
      return NextResponse.json({
        message: "You have been unsubscribed successfully.",
      });
    }

    return NextResponse.json({
      message: "That email was not found in our subscriber list.",
    });
  } catch (err) {
    console.error("Unsubscribe error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}

/**
 * GET /api/unsubscribe?email=...
 *
 * Shows a simple confirmation page when users click unsubscribe links.
 */
export async function GET(request: Request) {
  const url = new URL(request.url);
  const email = url.searchParams.get("email") || "";

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Unsubscribe – TryCleaningHacks</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; background: #f3f4f6; }
    .card { background: #fff; border-radius: 12px; padding: 40px; max-width: 420px; text-align: center; box-shadow: 0 1px 3px rgba(0,0,0,.1); }
    h1 { font-size: 22px; color: #1f2937; margin: 0 0 12px; }
    p { font-size: 15px; color: #6b7280; line-height: 1.6; margin: 0 0 24px; }
    button { background: #dc2626; color: #fff; border: none; padding: 12px 32px; border-radius: 8px; font-size: 15px; font-weight: 600; cursor: pointer; }
    button:hover { background: #b91c1c; }
    .success { color: #059669; font-weight: 600; }
    .error { color: #dc2626; }
    a { color: #0d9488; }
  </style>
</head>
<body>
  <div class="card">
    <h1>Unsubscribe</h1>
    <p id="msg">Click the button below to unsubscribe <strong>${email.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</strong> from TryCleaningHacks emails.</p>
    <button id="btn" onclick="doUnsub()">Unsubscribe</button>
  </div>
  <script>
    async function doUnsub() {
      const btn = document.getElementById('btn');
      const msg = document.getElementById('msg');
      btn.disabled = true;
      btn.textContent = 'Processing...';
      try {
        const res = await fetch('/api/unsubscribe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: '${email.replace(/'/g, "\\'")}' })
        });
        const data = await res.json();
        msg.innerHTML = '<span class="success">' + data.message + '</span><br><br><a href="https://trycleaninghacks.com">Back to TryCleaningHacks</a>';
        btn.style.display = 'none';
      } catch {
        msg.innerHTML = '<span class="error">Something went wrong. Please try again.</span>';
        btn.disabled = false;
        btn.textContent = 'Unsubscribe';
      }
    }
  </script>
</body>
</html>`;

  return new Response(html, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}

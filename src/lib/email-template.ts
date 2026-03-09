/**
 * Professional HTML email templates for TryCleaningHacks.
 *
 * Design principles:
 *  - Clean, mobile-responsive layout
 *  - Inline CSS only (email clients strip <style> blocks)
 *  - No external images in the initial load (avoids spam filters)
 *  - Plain-text fallback for every template
 *  - Unsubscribe link in the footer of every email
 */

const BRAND = "TryCleaningHacks";
const SITE_URL = "https://trycleaninghacks.com";
const BRAND_COLOR = "#0d9488"; // teal-600
const FOOTER_COLOR = "#6b7280"; // gray-500

/* ------------------------------------------------------------------ */
/*  Shared layout wrapper                                              */
/* ------------------------------------------------------------------ */

function emailWrapper(body: string, unsubscribeUrl: string): string {
  return `<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <meta name="color-scheme" content="light"/>
  <meta name="supported-color-schemes" content="light"/>
  <title>${BRAND}</title>
</head>
<body style="margin:0;padding:0;background-color:#f3f4f6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;-webkit-font-smoothing:antialiased;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f3f4f6;">
    <tr>
      <td align="center" style="padding:32px 16px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background-color:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,.08);">
          <!-- Header -->
          <tr>
            <td style="background-color:${BRAND_COLOR};padding:24px 32px;text-align:center;">
              <a href="${SITE_URL}" style="color:#ffffff;text-decoration:none;font-size:22px;font-weight:700;letter-spacing:-0.3px;">${BRAND}</a>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding:32px;">
              ${body}
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding:24px 32px;border-top:1px solid #e5e7eb;text-align:center;">
              <p style="margin:0 0 8px;font-size:13px;color:${FOOTER_COLOR};">
                You received this because you subscribed at
                <a href="${SITE_URL}" style="color:${BRAND_COLOR};text-decoration:none;">${BRAND}</a>.
              </p>
              <p style="margin:0;font-size:13px;color:${FOOTER_COLOR};">
                <a href="${unsubscribeUrl}" style="color:${FOOTER_COLOR};text-decoration:underline;">Unsubscribe</a>
                &nbsp;&middot;&nbsp;
                <a href="${SITE_URL}/privacy" style="color:${FOOTER_COLOR};text-decoration:underline;">Privacy Policy</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/* ------------------------------------------------------------------ */
/*  New-post notification                                              */
/* ------------------------------------------------------------------ */

interface NewPostEmailData {
  title: string;
  excerpt: string;
  postUrl: string;
  readTime?: string;
  unsubscribeUrl: string;
}

export function newPostEmailHtml(data: NewPostEmailData): string {
  const body = `
    <h1 style="margin:0 0 16px;font-size:22px;color:#1f2937;line-height:1.3;">
      ${escapeHtml(data.title)}
    </h1>
    <p style="margin:0 0 20px;font-size:16px;color:#374151;line-height:1.6;">
      ${escapeHtml(data.excerpt)}
    </p>
    ${data.readTime ? `<p style="margin:0 0 24px;font-size:14px;color:${FOOTER_COLOR};">${escapeHtml(data.readTime)}</p>` : ""}
    <table role="presentation" cellpadding="0" cellspacing="0">
      <tr>
        <td style="border-radius:8px;background-color:${BRAND_COLOR};">
          <a href="${data.postUrl}" target="_blank"
             style="display:inline-block;padding:14px 32px;color:#ffffff;text-decoration:none;font-size:16px;font-weight:600;border-radius:8px;">
            Read the Post &rarr;
          </a>
        </td>
      </tr>
    </table>`;

  return emailWrapper(body, data.unsubscribeUrl);
}

export function newPostEmailText(data: NewPostEmailData): string {
  return [
    data.title,
    "=".repeat(data.title.length),
    "",
    data.excerpt,
    data.readTime ? `(${data.readTime})` : "",
    "",
    `Read the post: ${data.postUrl}`,
    "",
    "---",
    `Unsubscribe: ${data.unsubscribeUrl}`,
    `${BRAND} — ${SITE_URL}`,
  ]
    .filter(Boolean)
    .join("\n");
}

/* ------------------------------------------------------------------ */
/*  Welcome email                                                      */
/* ------------------------------------------------------------------ */

export function welcomeEmailHtml(unsubscribeUrl: string): string {
  const body = `
    <h1 style="margin:0 0 16px;font-size:22px;color:#1f2937;">Welcome to ${BRAND}!</h1>
    <p style="margin:0 0 16px;font-size:16px;color:#374151;line-height:1.6;">
      Thanks for subscribing. We'll send you our best cleaning tips and guides — no spam, just helpful content.
    </p>
    <p style="margin:0 0 24px;font-size:16px;color:#374151;line-height:1.6;">
      In the meantime, check out our latest guides:
    </p>
    <table role="presentation" cellpadding="0" cellspacing="0">
      <tr>
        <td style="border-radius:8px;background-color:${BRAND_COLOR};">
          <a href="${SITE_URL}/posts" target="_blank"
             style="display:inline-block;padding:14px 32px;color:#ffffff;text-decoration:none;font-size:16px;font-weight:600;border-radius:8px;">
            Browse Guides &rarr;
          </a>
        </td>
      </tr>
    </table>`;

  return emailWrapper(body, unsubscribeUrl);
}

export function welcomeEmailText(unsubscribeUrl: string): string {
  return [
    `Welcome to ${BRAND}!`,
    "",
    "Thanks for subscribing. We'll send you our best cleaning tips and guides — no spam, just helpful content.",
    "",
    `Browse our guides: ${SITE_URL}/posts`,
    "",
    "---",
    `Unsubscribe: ${unsubscribeUrl}`,
  ].join("\n");
}

/* ------------------------------------------------------------------ */
/*  Utility                                                            */
/* ------------------------------------------------------------------ */

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

import nodemailer from "nodemailer";

const FROM_NAME = "TryCleaningHacks";
const FROM_EMAIL = "support@trycleaninghacks.com";

/**
 * Create a reusable Nodemailer transporter for Zoho SMTP.
 * Uses app-specific password for authentication.
 */
function getTransporter() {
  const user = process.env.ZOHO_EMAIL || FROM_EMAIL;
  const pass = process.env.ZOHO_APP_PASSWORD;

  if (!pass) {
    throw new Error("ZOHO_APP_PASSWORD is not set.");
  }

  return nodemailer.createTransport({
    host: "smtp.zoho.com",
    port: 465,
    secure: true,
    auth: { user, pass },
  });
}

interface SendMailOptions {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}

/**
 * Send an email via Zoho SMTP.
 */
export async function sendMail({ to, subject, html, replyTo }: SendMailOptions) {
  const transporter = getTransporter();
  const senderEmail = process.env.ZOHO_EMAIL || FROM_EMAIL;

  const info = await transporter.sendMail({
    from: `${FROM_NAME} <${senderEmail}>`,
    to,
    subject,
    html,
    ...(replyTo ? { replyTo } : {}),
  });

  return info;
}

export { FROM_EMAIL, FROM_NAME };

import { NextResponse } from "next/server";
import { sendMail } from "@/lib/mail";

export async function GET() {
  const diagnostics: Record<string, unknown> = {
    ZOHO_EMAIL_SET: !!process.env.ZOHO_EMAIL,
    ZOHO_APP_PASSWORD_SET: !!process.env.ZOHO_APP_PASSWORD,
    ZOHO_EMAIL_VALUE: process.env.ZOHO_EMAIL || "(not set)",
    ZOHO_APP_PASSWORD_LENGTH: process.env.ZOHO_APP_PASSWORD?.length ?? 0,
    NODE_VERSION: process.version,
    timestamp: new Date().toISOString(),
  };

  try {
    const start = Date.now();
    await sendMail({
      to: "support@trycleaninghacks.com",
      subject: "Vercel SMTP Test",
      html: "<p>This is a diagnostic test email sent from Vercel serverless function.</p>",
    });
    diagnostics.emailResult = "SUCCESS";
    diagnostics.durationMs = Date.now() - start;
  } catch (err: unknown) {
    diagnostics.emailResult = "FAILED";
    diagnostics.errorMessage = err instanceof Error ? err.message : String(err);
    diagnostics.errorName = err instanceof Error ? err.name : "unknown";
    diagnostics.errorCode = (err as Record<string, unknown>)?.code ?? null;
    diagnostics.errorStack = err instanceof Error ? err.stack : null;
  }

  return NextResponse.json(diagnostics, { status: 200 });
}

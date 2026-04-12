export const dynamic = "force-static";

const ADS_TXT_CONTENT = `google.com, pub-5416667362161343, DIRECT, f08c47fec0942fa0`;

export function GET() {
  return new Response(ADS_TXT_CONTENT, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=0, must-revalidate",
    },
  });
}

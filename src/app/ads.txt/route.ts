// Ezoic-managed ads.txt: redirect to Ezoic's Ads.txt Manager so the
// authorized seller list (including AdSense entries) stays current
// automatically. See: https://srv.adstxtmanager.com/
export const dynamic = "force-static";

const ADS_TXT_REDIRECT =
  "https://srv.adstxtmanager.com/19390/trycleaninghacks.com";

export function GET() {
  return Response.redirect(ADS_TXT_REDIRECT, 301);
}

import { posts } from "@/data/posts";
import { SITE_NAME, SITE_URL } from "@/components/seo/Meta";

export const dynamic = "force-static";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/**
 * RSS 2.0 feed of the most recent guides. Built at deploy time from the post
 * data, so it never drifts from what is published.
 */
export function GET() {
  const sorted = [...posts].sort((a, b) => b.datePublished.localeCompare(a.datePublished));
  const latest = sorted[0]?.datePublished ?? "2025-09-08";

  const items = sorted
    .slice(0, 50)
    .map((post) => {
      const url = `${SITE_URL}/cleaning-hacks/${post.slug}`;
      return [
        "<item>",
        `<title>${escapeXml(post.title)}</title>`,
        `<link>${url}</link>`,
        `<guid isPermaLink="true">${url}</guid>`,
        `<pubDate>${new Date(post.datePublished).toUTCString()}</pubDate>`,
        `<description>${escapeXml(post.excerpt)}</description>`,
        `<category>${escapeXml(post.category)}</category>`,
        "</item>",
      ].join("");
    })
    .join("");

  const xml =
    `<?xml version="1.0" encoding="UTF-8"?>` +
    `<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel>` +
    `<title>${SITE_NAME}</title>` +
    `<link>${SITE_URL}</link>` +
    `<atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml"/>` +
    `<description>Practical cleaning guides using everyday ingredients, with clear steps for kitchen, bathroom, laundry, and whole-home deep cleans.</description>` +
    `<language>en-us</language>` +
    `<lastBuildDate>${new Date(latest).toUTCString()}</lastBuildDate>` +
    items +
    `</channel></rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, must-revalidate",
    },
  });
}

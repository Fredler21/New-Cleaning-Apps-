import type { MetadataRoute } from "next";
import { posts } from "@/data/posts";

const SITE_URL = "https://www.trycleaninghacks.com";

/**
 * Use the most recent post.datePublished as a deterministic "site freshness"
 * timestamp, rather than `new Date()`. Sending a different lastModified on
 * every build (when nothing changed) trains Google to ignore our freshness
 * signals — and recent updates penalize sites that fake freshness.
 */
function latestPostDate(): string {
  const latest = posts
    .map((p) => p.datePublished)
    .sort()
    .reverse()[0];
  return latest ?? "2025-09-08";
}

export default function sitemap(): MetadataRoute.Sitemap {
  const siteFreshness = latestPostDate();

  /* ── Static pages ─────────────────────────────────────── */
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: siteFreshness,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/cleaning-hacks`,
      lastModified: siteFreshness,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/categories`,
      lastModified: siteFreshness,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: "2025-09-08",
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/faq`,
      lastModified: "2025-09-08",
      changeFrequency: "yearly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: "2025-09-08",
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${SITE_URL}/privacy`,
      lastModified: "2025-09-08",
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified: "2025-09-08",
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/editorial-policy`,
      lastModified: "2025-09-08",
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${SITE_URL}/author/fredler-pierre-louis`,
      lastModified: siteFreshness,
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  /* ── Post pages ───────────────────────────────────────── */
  const postPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/cleaning-hacks/${post.slug}`,
    lastModified: post.dateUpdated ?? post.datePublished,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...postPages];
}

import type { MetadataRoute } from "next";
import { posts } from "@/data/posts";

const SITE_URL = "https://trycleaninghacks.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  /* ── Static pages ─────────────────────────────────────── */
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/posts`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/categories`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/faq`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${SITE_URL}/contact`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${SITE_URL}/privacy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/terms`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  /* ── Post pages ───────────────────────────────────────── */
  const postPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/posts/${post.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...postPages];
}

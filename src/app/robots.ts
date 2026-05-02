import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/categories?*",
          "/cleaning-hacks?*",
        ],
      },
    ],
    sitemap: "https://trycleaninghacks.com/sitemap.xml",
  };
}

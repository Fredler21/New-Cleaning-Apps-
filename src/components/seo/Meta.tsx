import type { Metadata } from "next";

type MetaInput = {
  title: string;
  description: string;
  path?: string;
  image?: string;
  ogType?: "website" | "article";
};

export const buildMeta = ({ title, description, path = "/", image = "/og/og-default.png", ogType = "website" }: MetaInput): Metadata => {
  const fullTitle = `${title} | TryCleaningHacks`;
  const url = `https://trycleaninghacks.com${path}`;

  return {
    title: fullTitle,
    description,
    openGraph: {
      title: fullTitle,
      description,
      url,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
      type: ogType
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image]
    }
  };
};

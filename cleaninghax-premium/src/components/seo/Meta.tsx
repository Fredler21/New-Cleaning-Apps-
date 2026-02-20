import type { Metadata } from "next";

type MetaInput = {
  title: string;
  description: string;
  path?: string;
  image?: string;
};

export const buildMeta = ({ title, description, path = "/", image = "/og/og-default.png" }: MetaInput): Metadata => {
  const fullTitle = `${title} | CleaningHax Premium`;
  const url = `https://cleaninghax.example${path}`;

  return {
    title: fullTitle,
    description,
    openGraph: {
      title: fullTitle,
      description,
      url,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
      type: "article"
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image]
    }
  };
};

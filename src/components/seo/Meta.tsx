import type { Metadata } from "next";

export const SITE_URL = "https://trycleaninghacks.com";
export const SITE_NAME = "TryCleaningHacks";

type MetaInput = {
  title: string;
  description: string;
  path?: string;
  image?: string;
  ogType?: "website" | "article";
  keywords?: string[];
  noIndex?: boolean;
};

export const buildMeta = ({
  title,
  description,
  path = "/",
  image = "/og/og-default.png",
  ogType = "website",
  keywords,
  noIndex = false,
}: MetaInput): Metadata => {
  const fullTitle = `${title} | ${SITE_NAME}`;
  const url = `${SITE_URL}${path}`;

  return {
    title: fullTitle,
    description,
    ...(keywords && { keywords }),
    alternates: { canonical: url },
    ...(noIndex && { robots: { index: false, follow: true } }),
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SITE_NAME,
      images: [{ url: image, width: 1200, height: 630, alt: title }],
      locale: "en_US",
      type: ogType,
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [image],
    },
  };
};

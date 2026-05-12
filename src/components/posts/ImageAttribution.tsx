import { getImageAttribution } from "@/lib/image-attribution";

/**
 * Renders a small photo credit under hero images when the sidecar metadata
 * indicates the image came from Unsplash. Required by Unsplash's API
 * guidelines (https://help.unsplash.com/en/articles/2511315).
 *
 * Renders nothing for AI / unknown sources.
 */
export function ImageAttribution({ slug }: { slug: string }) {
  const meta = getImageAttribution(slug);
  if (!meta || meta.source !== "unsplash" || !meta.photographer) return null;

  return (
    <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
      Photo by{" "}
      <a
        href={meta.photographerUrl}
        target="_blank"
        rel="noopener noreferrer nofollow"
        className="underline hover:text-teal-600"
      >
        {meta.photographer}
      </a>{" "}
      on{" "}
      <a
        href={meta.photoUrl}
        target="_blank"
        rel="noopener noreferrer nofollow"
        className="underline hover:text-teal-600"
      >
        Unsplash
      </a>
    </p>
  );
}

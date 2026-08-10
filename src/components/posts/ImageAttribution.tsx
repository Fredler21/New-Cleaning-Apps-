import { getImageAttribution } from "@/lib/image-attribution";

/**
 * Renders the credit line under a post hero image.
 *
 * Two cases matter:
 *
 *  - Unsplash photos must be credited to the photographer. Required by
 *    Unsplash's API guidelines (https://help.unsplash.com/en/articles/2511315).
 *
 *  - AI-generated covers must say so. These images are illustrations, not
 *    documentation of a real result, and presenting them silently alongside a
 *    how-to guide implies a photograph of an actual outcome. Labeling them is
 *    both an honesty requirement and an AdSense/Search policy expectation
 *    around misrepresented content.
 *
 * Only genuinely unknown-origin images render nothing.
 */
export function ImageAttribution({ slug }: { slug: string }) {
  const meta = getImageAttribution(slug);
  if (!meta) return null;

  const cls = "mt-2 text-xs text-slate-500 dark:text-slate-400";

  if (meta.source === "gemini" || meta.source === "gemini-candid") {
    return (
      <p className={cls}>
        Illustration generated with AI. It shows the technique described below,
        not a photograph of a specific result.
      </p>
    );
  }

  if (meta.source !== "unsplash" || !meta.photographer) return null;

  return (
    <p className={cls}>
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

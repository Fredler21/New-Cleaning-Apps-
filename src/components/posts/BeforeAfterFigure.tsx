import Image from "next/image";
import type { BeforeAfter } from "@/types/post";

/**
 * The illustrated before-and-after for a post.
 *
 * Rendered at the image's own proportions rather than inside a fixed frame.
 * Every one of these is a composite that already carries both halves and its
 * own BEFORE/AFTER labels, and object-cover on a mismatched box crops exactly
 * the edges that make it readable.
 *
 * This is not a `PostPhoto` and must never be treated as one: photos on this
 * site are evidence that someone did the work. What keeps these honest is the
 * captions, which describe the change and never claim anyone carried it out.
 * Keep it that way when writing new ones.
 */
export function BeforeAfterFigure({ image }: { image: BeforeAfter }) {
  return (
    <section
      id="before-after"
      className="rounded-xl p-6"
      style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
    >
      <h2 className="flex items-center gap-2 text-xl font-semibold" style={{ color: "var(--text)" }}>
        <svg className="h-5 w-5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
        What the difference looks like
      </h2>

      {/* Fills the content column, the same as PostPhotos and the cover image.
          Capping the height instead leaves a portrait composite floating as a
          narrow strip with dead margin either side of it, which reads as a
          picture dropped in at whatever size it happened to be rather than one
          laid out with the article. */}
      <figure className="mt-4">
        <div className="overflow-hidden rounded-lg">
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            sizes="(min-width: 1024px) 720px, 100vw"
            className="h-auto w-full"
          />
        </div>
        <figcaption className="mt-3 text-[15px] leading-7" style={{ color: "var(--text-secondary)" }}>
          {image.caption}
        </figcaption>
      </figure>
    </section>
  );
}

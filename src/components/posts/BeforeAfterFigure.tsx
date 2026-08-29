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
 * The heading and the note under the image both say "illustration" out loud.
 * This is not a `PostPhoto` and must never be mistaken for one: photos on this
 * site are evidence that someone did the work, and nothing here would survive
 * that reading.
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

      {/* Capped by viewport height, not by column width. Most of these are tall
          portrait composites, and at the full 700px column one would run past
          1200px and swallow a whole screen of scroll on its own. Landscape ones
          never reach the cap and are unaffected. */}
      <figure className="mt-4">
        <div className="flex justify-center">
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            sizes="(min-width: 1024px) 720px, 100vw"
            className="h-auto max-h-[75vh] w-auto max-w-full rounded-lg"
          />
        </div>
        <figcaption className="mt-3 text-[15px] leading-7" style={{ color: "var(--text-secondary)" }}>
          {image.caption}{" "}
          <span style={{ color: "var(--muted)" }}>
            Illustration, not a photograph of a specific home.
          </span>
        </figcaption>
      </figure>
    </section>
  );
}

import Image from "next/image";
import type { PostPhoto } from "@/types/post";

/**
 * Gallery of original photographs for a post.
 *
 * Before/after pairs are grouped so the comparison is immediate, which is the
 * whole reason to shoot them. Anything without a `pair` falls through to a
 * plain grid.
 *
 * These are real photos by definition (see the `PostPhoto` type). They are the
 * one thing on the site that genuinely cannot be produced from existing web
 * content, so they carry disproportionate weight for both readers and review.
 */
export function PostPhotos({ photos }: { photos: PostPhoto[] }) {
  if (!photos?.length) return null;

  const before = photos.filter((p) => p.pair === "before");
  const after = photos.filter((p) => p.pair === "after");
  const pairCount = Math.min(before.length, after.length);
  const paired = Array.from({ length: pairCount }, (_, i) => [before[i], after[i]] as const);
  const pairedSrcs = new Set(paired.flat().map((p) => p.src));
  const singles = photos.filter((p) => !pairedSrcs.has(p.src));

  const Figure = ({
    photo,
    badge,
    full,
  }: {
    photo: PostPhoto;
    badge?: string;
    /** Photo occupies the whole content column rather than half of a pair. */
    full?: boolean;
  }) => (
    <figure>
      {/* A full-width photo keeps its own proportions instead of being forced
          into a fixed box. Composites arrive at whatever ratio the phone shot,
          and object-cover on a mismatched frame quietly crops the edges, which
          on a before/after pair means clipping the labels. Paired thumbnails
          still use the fixed frame so two shots line up beside each other. */}
      <div className={full ? "overflow-hidden rounded-lg" : "relative aspect-[4/3] overflow-hidden rounded-lg"}>
        <Image
          src={photo.src}
          alt={photo.alt}
          {...(full
            ? {
                // Real dimensions when the entry supplies them, so the space
                // reserved before load matches the image and the page does not
                // jump. The 4:3 fallback is only a guess and is wrong for any
                // portrait shot.
                width: photo.width ?? 1600,
                height: photo.height ?? 1200,
                className: "h-auto w-full",
              }
            : { fill: true as const, className: "object-cover" })}
          sizes={full ? "(min-width: 1024px) 720px, 100vw" : "(min-width: 640px) 50vw, 100vw"}
        />
        {badge && (
          <span className="absolute left-2 top-2 rounded bg-black/70 px-2 py-0.5 text-xs font-medium uppercase tracking-wide text-white">
            {badge}
          </span>
        )}
      </div>
      <figcaption className="mt-2 text-[15px] leading-7" style={{ color: "var(--text-secondary)" }}>
        {photo.caption}
      </figcaption>
    </figure>
  );

  return (
    <section
      id="photos"
      className="rounded-xl p-6"
      style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
    >
      <h2 className="text-xl font-semibold" style={{ color: "var(--text)" }}>
        Photos
      </h2>

      {paired.length > 0 && (
        <div className="mt-4 space-y-6">
          {paired.map(([b, a]) => (
            <div key={b.src} className="grid gap-4 sm:grid-cols-2">
              <Figure photo={b} badge="Before" />
              <Figure photo={a} badge="After" />
            </div>
          ))}
        </div>
      )}

      {singles.length > 0 && (
        // A lone photo gets the full content column. Half-width only makes
        // sense when there is a second photo to sit beside it, and a composite
        // that already contains its own before and after reads as one image.
        <div className={singles.length > 1 ? "mt-6 grid gap-4 sm:grid-cols-2" : "mt-4"}>
          {singles.map((photo) => (
            <Figure key={photo.src} photo={photo} full={singles.length === 1} />
          ))}
        </div>
      )}
    </section>
  );
}

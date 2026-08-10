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

  const Figure = ({ photo, badge }: { photo: PostPhoto; badge?: string }) => (
    <figure>
      <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes="(min-width: 640px) 50vw, 100vw"
          className="object-cover"
        />
        {badge && (
          <span className="absolute left-2 top-2 rounded bg-black/70 px-2 py-0.5 text-xs font-medium uppercase tracking-wide text-white">
            {badge}
          </span>
        )}
      </div>
      <figcaption className="mt-1.5 text-xs leading-5" style={{ color: "var(--text-secondary)" }}>
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
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {singles.map((photo) => (
            <Figure key={photo.src} photo={photo} />
          ))}
        </div>
      )}
    </section>
  );
}

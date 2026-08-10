import Image from "next/image";
import type { FieldNote } from "@/types/post";

const fmt = (iso: string) =>
  new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

/**
 * Renders genuine firsthand testing.
 *
 * This section only appears when a post actually has `fieldNotes`, which are
 * only filled in after the method has really been carried out. That is the
 * point: it is the one part of an article allowed to say "I did this and here
 * is what happened", and its absence on other posts is honest rather than a
 * gap to be papered over.
 *
 * The layout deliberately gives equal weight to what did not work. A tidy
 * success story reads like marketing; "needed a second pass, and I would use
 * less water next time" reads like someone who was actually there.
 */
export function FieldNotes({ notes }: { notes: FieldNote[] }) {
  if (!notes?.length) return null;

  return (
    <section
      id="field-notes"
      className="rounded-xl border border-amber-200 bg-amber-50 p-6 dark:border-amber-400/20 dark:bg-amber-500/5"
    >
      <h2 className="flex items-center gap-2 text-xl font-semibold" style={{ color: "var(--text)" }}>
        <span aria-hidden>🧪</span>
        {notes.length > 1 ? "What happened when I ran these" : "What happened when I ran this"}
      </h2>
      <p className="mt-2 text-sm" style={{ color: "var(--text-secondary)" }}>
        Notes from actually doing it, including the parts that did not go to plan.
      </p>

      <div className="mt-5 space-y-6">
        {notes.map((note, i) => (
          <article
            key={`${note.testedOn}-${i}`}
            className="rounded-lg p-5"
            style={{ background: "var(--card-bg)", border: "1px solid var(--border)" }}
          >
            <div
              className="flex flex-wrap items-baseline gap-x-3 gap-y-1 text-sm"
              style={{ color: "var(--text-secondary)" }}
            >
              <span className="font-medium" style={{ color: "var(--text)" }}>
                {note.surface}
              </span>
              <time dateTime={note.testedOn}>{fmt(note.testedOn)}</time>
              {note.duration && <span>· took {note.duration}</span>}
            </div>

            <p className="mt-3 text-[15px] leading-7" style={{ color: "var(--text-secondary)" }}>
              {note.result}
            </p>

            {note.wouldChange && (
              <p className="mt-3 text-[15px] leading-7" style={{ color: "var(--text-secondary)" }}>
                <strong style={{ color: "var(--text)" }}>Next time:</strong> {note.wouldChange}
              </p>
            )}

            {note.photos && note.photos.length > 0 && (
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {note.photos.map((photo) => (
                  <figure key={photo.src}>
                    <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                      <Image
                        src={photo.src}
                        alt={photo.alt}
                        fill
                        sizes="(min-width: 640px) 50vw, 100vw"
                        className="object-cover"
                      />
                      {photo.pair && (
                        <span className="absolute left-2 top-2 rounded bg-black/70 px-2 py-0.5 text-xs font-medium uppercase tracking-wide text-white">
                          {photo.pair}
                        </span>
                      )}
                    </div>
                    <figcaption
                      className="mt-1.5 text-xs leading-5"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {photo.caption}
                    </figcaption>
                  </figure>
                ))}
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}

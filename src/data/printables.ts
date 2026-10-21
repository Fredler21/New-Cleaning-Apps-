/**
 * Registry of email-gated printables.
 *
 * The download route only serves IDs listed here, and the files live in
 * /private/printables (outside /public), so nothing on the site links to a
 * PDF directly and the file URL cannot be guessed from the page source. A
 * signed, short-lived token issued after a successful email signup is the
 * only way to fetch one.
 *
 * To add a printable: drop the PDF in /private/printables, add an entry
 * below, then set `printable: { id: "<key>", ... }` on the post that offers it.
 */
export type Printable = {
  /** Stable ID, also what is stored against each signup in Firestore. */
  id: string;
  /** File name inside /private/printables. */
  file: string;
  /** Shown in the thank-you state and used as the download file name. */
  title: string;
};

export const PRINTABLES: Record<string, Printable> = {
  "thanksgiving-cleaning-checklist": {
    id: "thanksgiving-cleaning-checklist",
    file: "thanksgiving-cleaning-checklist-printable.pdf",
    title: "Thanksgiving Cleaning Checklist",
  },
};

export function getPrintable(id: string | undefined | null): Printable | undefined {
  if (!id) return undefined;
  return Object.prototype.hasOwnProperty.call(PRINTABLES, id) ? PRINTABLES[id] : undefined;
}

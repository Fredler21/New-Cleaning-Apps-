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
  "diy-all-natural-cleaning-sprays": {
    id: "diy-all-natural-cleaning-sprays",
    file: "diy-cleaning-spray-recipe-cards-printable.pdf",
    title: "DIY Cleaning Spray Recipe Cards",
  },
  "the-ultimate-weekly-cleaning-schedule-for-a-spotless-home": {
    id: "the-ultimate-weekly-cleaning-schedule-for-a-spotless-home",
    file: "weekly-cleaning-schedule-printable.pdf",
    title: "Weekly Cleaning Schedule",
  },
  "10-genius-ways-to-make-your-house-smell-great": {
    id: "10-genius-ways-to-make-your-house-smell-great",
    file: "make-your-house-smell-amazing-printable.pdf",
    title: "House Scent Recipe Cards",
  },
  "what-cleans-what-card": {
    id: "what-cleans-what-card",
    file: "what-cleans-what-card-printable.pdf",
    title: "What Cleans What: Vinegar, Peroxide, Listerine",
  },
  "how-to-organize-your-refrigerator": {
    id: "how-to-organize-your-refrigerator",
    file: "refrigerator-zone-map-printable.pdf",
    title: "Refrigerator Zone Map",
  },
  "thanksgiving-cleaning-checklist": {
    id: "thanksgiving-cleaning-checklist",
    file: "thanksgiving-cleaning-checklist-printable.pdf",
    title: "Thanksgiving Cleaning Checklist",
  },
  "12-day-christmas-cleaning-countdown": {
    id: "12-day-christmas-cleaning-countdown",
    file: "12-day-christmas-cleaning-countdown-printable.pdf",
    title: "12-Day Christmas Cleaning Countdown",
  },
  "new-year-cleaning-checklist": {
    id: "new-year-cleaning-checklist",
    file: "new-year-cleaning-checklist-printable.pdf",
    title: "7-Day New Year Home Reset",
  },
  "things-youre-forgetting-to-clean": {
    id: "things-youre-forgetting-to-clean",
    file: "things-youre-forgetting-to-clean-printable.pdf",
    title: "25 Forgotten Spots Walkthrough",
  },
};

export function getPrintable(id: string | undefined | null): Printable | undefined {
  if (!id) return undefined;
  return Object.prototype.hasOwnProperty.call(PRINTABLES, id) ? PRINTABLES[id] : undefined;
}

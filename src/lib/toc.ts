import { titleToId } from "@/lib/format";

export type TocEntry = { label: string; href: string };

/**
 * The step entries for a post's table of contents.
 *
 * Most posts list every step. A long post whose steps are grouped by a
 * shared prefix ("Entryway: the doormat", "Kitchen: the trash can") lists one
 * entry per group instead, linking to the first step of that group, so a 25
 * step guide gives the reader five rooms to jump to rather than a wall of
 * links. A group needs at least two steps and the post at least two groups,
 * and nearly every step must carry a prefix, otherwise the full list is used.
 */
export function stepTocEntries(steps: { title: string }[]): TocEntry[] {
  const groups = new Map<string, string>();
  let prefixed = 0;
  const counts = new Map<string, number>();
  for (const step of steps) {
    const match = step.title.match(/^([A-Za-z][A-Za-z '&-]{1,28}):\s+\S/);
    if (!match) continue;
    prefixed++;
    const label = match[1].trim();
    counts.set(label, (counts.get(label) ?? 0) + 1);
    if (!groups.has(label)) groups.set(label, titleToId(step.title));
  }
  const grouped =
    steps.length >= 8 &&
    groups.size >= 2 &&
    prefixed >= Math.ceil(steps.length * 0.8) &&
    [...counts.values()].every((n) => n >= 2);

  if (grouped) {
    return [...groups.entries()].map(([label, id]) => ({ label, href: `#${id}` }));
  }
  return steps.map((step) => ({ label: step.title, href: `#${titleToId(step.title)}` }));
}

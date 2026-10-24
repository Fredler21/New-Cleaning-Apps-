import { stepTocEntries } from "@/lib/toc";
import type { PostStep } from "@/types/post";

type PostTOCProps = {
  steps: Pick<PostStep, "title">[];
};

export function PostTOC({ steps }: PostTOCProps) {
  const entries = stepTocEntries(steps);
  return (
    <nav
      aria-label="Table of contents"
      className="rounded-xl p-5 lg:max-h-[calc(100vh-7rem)] lg:overflow-y-auto"
      style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
    >
      <h2 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wider" style={{ color: "var(--text-secondary)" }}>
        <svg className="h-4 w-4 text-teal-700 dark:text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h7" />
        </svg>
        Contents
      </h2>
      <ol className="space-y-1 text-sm">
        <li>
          <a href="#supplies" className="flex rounded-lg px-2.5 py-1.5 transition-colors hover:text-teal-700 dark:hover:text-teal-400" style={{ color: "var(--text-secondary)" }}>
            What you&apos;ll need
          </a>
        </li>
        <li>
          <a href="#steps" className="flex rounded-lg px-2.5 py-1.5 transition-colors hover:text-teal-700 dark:hover:text-teal-400" style={{ color: "var(--text-secondary)" }}>
            Steps
          </a>
        </li>
        <li>
          <a href="#pro-tips" className="flex rounded-lg px-2.5 py-1.5 transition-colors hover:text-teal-700 dark:hover:text-teal-400" style={{ color: "var(--text-secondary)" }}>
            Pro tips
          </a>
        </li>
        <li>
          <a href="#safety" className="flex rounded-lg px-2.5 py-1.5 transition-colors hover:text-teal-700 dark:hover:text-teal-400" style={{ color: "var(--text-secondary)" }}>
            Safety notes
          </a>
        </li>
        {entries.map((entry) => (
          <li key={entry.href}>
            <a href={entry.href} className="flex rounded-lg px-2.5 py-1.5 transition-colors hover:text-teal-700 dark:hover:text-teal-400" style={{ color: "var(--text-secondary)" }}>
              {entry.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

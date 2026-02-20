type SafetyNoteProps = {
  notes: string[];
};

export function SafetyNote({ notes }: SafetyNoteProps) {
  return (
    <section id="safety" className="rounded-xl border border-red-200 bg-red-50 p-6 dark:border-red-400/20 dark:bg-red-500/5" aria-label="Safety notes">
      <h2 className="flex items-center gap-2 text-lg font-semibold" style={{ color: "var(--text)" }}>
        <svg className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
        </svg>
        Safety Notes
      </h2>
      <ul className="mt-4 space-y-3">
        {notes.map((note) => (
          <li key={note} className="flex items-start gap-3 text-sm leading-relaxed text-red-700 dark:text-red-200/80">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-red-100 text-xs text-red-500 dark:bg-red-500/10 dark:text-red-400">⚠</span>
            {note}
          </li>
        ))}
      </ul>
    </section>
  );
}

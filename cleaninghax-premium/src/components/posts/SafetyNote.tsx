type SafetyNoteProps = {
  notes: string[];
};

export function SafetyNote({ notes }: SafetyNoteProps) {
  return (
    <section id="safety" className="rounded-premium border border-red-300/25 bg-red-500/10 p-5" aria-label="Safety notes">
      <h2 className="text-lg font-semibold text-white">Safety notes</h2>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-red-100">
        {notes.map((note) => (
          <li key={note}>{note}</li>
        ))}
      </ul>
    </section>
  );
}

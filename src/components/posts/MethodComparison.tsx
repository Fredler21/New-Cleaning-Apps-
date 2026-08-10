import type { ComparisonRow } from "@/types/post";

/**
 * Side-by-side comparison of the methods a post covers.
 *
 * Note that `limitation` is a required field on the type. A comparison table
 * where every method is good at everything tells the reader nothing and is the
 * single clearest sign that nobody thought hard about the topic. Forcing an
 * honest downside per row is what makes this section worth reading.
 */
export function MethodComparison({ rows }: { rows: ComparisonRow[] }) {
  if (!rows?.length) return null;

  return (
    <section
      id="comparison"
      className="rounded-xl p-6"
      style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
    >
      <h2 className="text-xl font-semibold" style={{ color: "var(--text)" }}>
        Which method to use
      </h2>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-sm">
          <thead>
            <tr className="border-b" style={{ borderColor: "var(--border)" }}>
              {["Method", "Effort", "Best for", "Where it falls short"].map((h) => (
                <th
                  key={h}
                  scope="col"
                  className="py-2.5 pr-4 text-left text-xs font-semibold uppercase tracking-wide last:pr-0"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.method} className="border-b last:border-0" style={{ borderColor: "var(--border)" }}>
                <th
                  scope="row"
                  className="py-3 pr-4 text-left align-top font-medium"
                  style={{ color: "var(--text)" }}
                >
                  {row.method}
                </th>
                <td className="py-3 pr-4 align-top" style={{ color: "var(--text-secondary)" }}>
                  {row.effort}
                </td>
                <td className="py-3 pr-4 align-top" style={{ color: "var(--text-secondary)" }}>
                  {row.bestFor}
                </td>
                <td className="py-3 align-top" style={{ color: "var(--text-secondary)" }}>
                  {row.limitation}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

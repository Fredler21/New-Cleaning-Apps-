import type { CostRow } from "@/types/post";

/**
 * "What this actually costs" table.
 *
 * Cost figures are one of the few things a cleaning article can offer that a
 * competitor's generic listicle usually does not, and unlike a testing claim
 * it is verifiable by the reader at their own shop. Keep the numbers current
 * and say what a batch makes, so the comparison is like for like.
 */
export function CostBreakdown({ rows }: { rows: CostRow[] }) {
  if (!rows?.length) return null;

  return (
    <section
      id="cost"
      className="rounded-xl p-6"
      style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
    >
      <h2 className="text-xl font-semibold" style={{ color: "var(--text)" }}>
        What it costs
      </h2>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[420px] border-collapse text-sm">
          <tbody>
            {rows.map((row) => (
              <tr key={row.label} className="border-b last:border-0" style={{ borderColor: "var(--border)" }}>
                <th
                  scope="row"
                  className="py-3 pr-4 text-left font-medium align-top"
                  style={{ color: "var(--text)" }}
                >
                  {row.label}
                  {row.note && (
                    <span className="mt-0.5 block text-xs font-normal" style={{ color: "var(--text-secondary)" }}>
                      {row.note}
                    </span>
                  )}
                </th>
                <td
                  className="whitespace-nowrap py-3 text-right font-semibold align-top"
                  style={{ color: "var(--accent)" }}
                >
                  {row.cost}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-xs" style={{ color: "var(--text-secondary)" }}>
        Prices are approximate US retail and will vary by store and region.
      </p>
    </section>
  );
}

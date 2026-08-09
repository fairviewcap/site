/** Canonical measured figures for Fairview — always shown with provenance. */

export type MeasuredFigure = {
  /** Short key shown near the value (e.g. AUM). */
  key: string;
  /** Display value — keep stable formatting; use tabular numerals in UI. */
  value: string;
  /** Longer plain-language label when space allows. */
  label: string;
  /** ISO date the figure was true, or null when timeless (e.g. founded year). */
  asOf: string | null;
};

export const FIGURES = {
  aum: {
    key: "AUM",
    value: "$2.14B",
    label: "Assets under management",
    asOf: "2026-03-29",
  },
  established: {
    key: "Est.",
    value: "1995",
    label: "Established",
    asOf: null,
  },
  /** Year partners took / hold outright ownership (not a third-party buyer). */
  partnerOwned: {
    key: "Owned",
    value: "2026",
    label: "Partner-owned",
    asOf: null,
  },
} as const satisfies Record<string, MeasuredFigure>;

const AS_OF_FORMAT = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
});

/** “As of 31 Mar 2026” — honest provenance for any measured claim. */
export function formatAsOf(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  const date = new Date(Date.UTC(y, m - 1, d));
  return `As of ${AS_OF_FORMAT.format(date)}`;
}

import { formatAsOf, type MeasuredFigure } from "@/lib/figures";

type Variant = "eyebrow" | "row" | "hero";

type LedgerFigureProps = {
  figure: MeasuredFigure;
  variant?: Variant;
  className?: string;
  /** Show the top hairline (default true for row/hero). */
  rule?: boolean;
};

/**
 * Ledger line: measured value + optional “as of” provenance.
 * Brand material for nav, pages, and print — not decoration.
 */
export default function LedgerFigure({
  figure,
  variant = "row",
  className = "",
  rule,
}: LedgerFigureProps) {
  const showRule = rule ?? variant !== "eyebrow";
  const asOf = figure.asOf ? formatAsOf(figure.asOf) : null;

  if (variant === "eyebrow") {
    return (
      <div className={`fv-ledger fv-ledger--eyebrow ${className}`.trim()}>
        <div className="fv-ledger__line">
          <span className="fv-ledger__value">{figure.value}</span>
          <span className="fv-ledger__key">{figure.key}</span>
        </div>
        {asOf ? <p className="fv-ledger__asof">{asOf}</p> : null}
      </div>
    );
  }

  if (variant === "hero") {
    return (
      <div className={`fv-ledger fv-ledger--hero ${className}`.trim()}>
        {showRule ? <div className="fv-ledger__rule" aria-hidden /> : null}
        <p className="fv-ledger__label">{figure.label}</p>
        <p className="fv-ledger__value">{figure.value}</p>
        {asOf ? <p className="fv-ledger__asof">{asOf}</p> : null}
      </div>
    );
  }

  return (
    <div className={`fv-ledger fv-ledger--row ${className}`.trim()}>
      {showRule ? <div className="fv-ledger__rule" aria-hidden /> : null}
      <div className="fv-ledger__line">
        <span className="fv-ledger__label">{figure.label}</span>
        <span className="fv-ledger__value">{figure.value}</span>
      </div>
      {asOf ? <p className="fv-ledger__asof">{asOf}</p> : null}
    </div>
  );
}

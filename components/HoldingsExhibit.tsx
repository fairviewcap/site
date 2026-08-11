import { HOLDINGS_CONCENTRATION, HOLDINGS_REFUSALS } from "@/lib/holdings";

/**
 * Lean diligence exhibit — concentration contrast + what we refuse.
 * Pipeline and implementation live in the page copy above/below.
 */
export default function HoldingsExhibit() {
  const { index, fairview } = HOLDINGS_CONCENTRATION;

  return (
    <div className="fv-hold">
      <header className="fv-hold__intro">
        <p className="fv-hold__eyebrow">Holdings philosophy</p>
        <h3 className="fv-hold__title">Fewer names. Deeper work.</h3>
        <p className="fv-hold__lede">
          No tip sheet. No ticker list. Just the shape of the book — and what
          we refuse.
        </p>
      </header>

      <section className="fv-hold__block" aria-labelledby="hold-concentrate">
        <h4 id="hold-concentrate" className="fv-hold__label">
          Concentration
        </h4>
        <div className="fv-hold__compare">
          <div className="fv-hold__compare-col">
            <p className="fv-hold__compare-count fv-nums">{index.count}</p>
            <p className="fv-hold__compare-name">{index.label}</p>
            <p className="fv-hold__compare-note">{index.note}</p>
            <div className="fv-hold__bar" aria-hidden>
              <span className="fv-hold__bar-fill fv-hold__bar-fill--wide" />
            </div>
          </div>
          <div className="fv-hold__compare-col fv-hold__compare-col--accent">
            <p className="fv-hold__compare-count fv-nums">{fairview.count}</p>
            <p className="fv-hold__compare-name">{fairview.label}</p>
            <p className="fv-hold__compare-note">{fairview.note}</p>
            <div className="fv-hold__bar" aria-hidden>
              <span className="fv-hold__bar-fill fv-hold__bar-fill--narrow" />
            </div>
          </div>
        </div>
      </section>

      <section className="fv-hold__block" aria-labelledby="hold-refuse">
        <h4 id="hold-refuse" className="fv-hold__label">
          What we refuse
        </h4>
        <ul className="fv-hold__refuse">
          {HOLDINGS_REFUSALS.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}

/**
 * Two books, type only.
 */
export default function WhyResearchBook() {
  return (
    <figure className="fv-why__book">
      <div className="fv-why__book-plane">
        <div className="fv-why__book-pair">
          <div className="fv-why__book-side">
            <p className="fv-why__book-kicker">
              <span className="fv-why__book-idx">01</span>
              Our book
            </p>
            <p className="fv-why__book-stat">
              <span className="fv-why__book-num fv-nums">25–30</span>
              companies
            </p>
          </div>
          <div className="fv-why__book-side fv-why__book-side--theirs">
            <p className="fv-why__book-kicker">
              <span className="fv-why__book-idx">02</span>
              A typical book
            </p>
            <p className="fv-why__book-stat fv-why__book-stat--quiet">
              Other people&apos;s funds
            </p>
          </div>
        </div>
      </div>
      <figcaption className="fv-why__book-cap">
        We can name every one.
      </figcaption>
    </figure>
  );
}

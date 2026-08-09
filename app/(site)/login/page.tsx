import type { Metadata } from "next";
import { PORTALS } from "@/lib/portals";

export const metadata: Metadata = {
  title: "Log in | Fairview Capital",
  description:
    "Client portals for planning, investments, and custodian account access.",
};

export default function LoginPage() {
  return (
    <main className="fv-frame bg-[var(--fv-bg)] pt-10 pb-20 sm:pt-14 sm:pb-28">
      <div className="fv-portals">
        <header className="fv-portals__intro">
          <p className="fv-portals__eyebrow">Client access</p>
          <h1 className="fv-portals__title">Your portals.</h1>
          <p className="fv-portals__lede">
            Planning, investments, and custodian records — each in its own
            secure place.
          </p>
        </header>

        <ol className="fv-portals__schedule" aria-label="Client portals">
          <li className="fv-portals__row">
            <span className="fv-portals__index" aria-hidden>
              01
            </span>
            <span className="fv-portals__rule" aria-hidden />
            <div className="fv-portals__body">
              <div className="fv-portals__copy">
                <h2 className="fv-portals__name">{PORTALS.planning.label}</h2>
                <p className="fv-portals__desc">
                  {PORTALS.planning.description}
                </p>
                <p className="fv-portals__powered">
                  Powered by {PORTALS.planning.poweredBy}
                </p>
              </div>
              <a
                href={PORTALS.planning.href}
                className="fv-portals__btn"
                target="_blank"
                rel="noopener noreferrer"
              >
                Log in
              </a>
            </div>
          </li>

          <li className="fv-portals__row">
            <span className="fv-portals__index" aria-hidden>
              02
            </span>
            <span className="fv-portals__rule" aria-hidden />
            <div className="fv-portals__body">
              <div className="fv-portals__copy">
                <h2 className="fv-portals__name">{PORTALS.investments.label}</h2>
                <p className="fv-portals__desc">
                  {PORTALS.investments.description}
                </p>
              </div>
              <a
                href={PORTALS.investments.href}
                className="fv-portals__btn"
                target="_blank"
                rel="noopener noreferrer"
              >
                Log in
              </a>
            </div>
          </li>

          <li className="fv-portals__row fv-portals__row--compact">
            <span className="fv-portals__index" aria-hidden>
              03
            </span>
            <span className="fv-portals__rule" aria-hidden />
            <div className="fv-portals__body">
              <div className="fv-portals__copy">
                <h2 className="fv-portals__name">{PORTALS.custodians.label}</h2>
                <p className="fv-portals__desc">
                  {PORTALS.custodians.description}
                </p>
              </div>
              <div className="fv-portals__actions">
                {PORTALS.custodians.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="fv-portals__btn fv-portals__btn--secondary"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </li>
        </ol>

        <p className="fv-portals__note">
          Custodian links leave the Fairview site. Schwab and Fidelity are
          independent of Fairview Capital and are not affiliated with us.
        </p>
      </div>
    </main>
  );
}

import type { Metadata } from "next";
import PageEnter from "@/components/PageEnter";
import { PORTALS } from "@/lib/portals";

export const metadata: Metadata = {
  title: "Log in | Fairview Capital",
  description:
    "Client portals for planning, investments, and custodian account access.",
};

export default function LoginPage() {
  return (
    <main className="fv-frame bg-[var(--fv-bg)] pt-10 pb-20 sm:pt-14 sm:pb-28">
      <PageEnter>
        <div className="fv-portals">
          <header className="fv-portals__intro" data-enter="0">
            <p className="fv-portals__eyebrow">Client access</p>
            <h1 className="fv-portals__title">
              Three doors.
              <br />
              Pick one.
            </h1>
            <p className="fv-portals__lede">
              Planning, investments, and custodian records — each in its own
              secure place.
            </p>
            <p className="fv-portals__trust">
              You never enter a password on this site. Each login opens a secure
              session with the provider.
            </p>
          </header>

          <nav className="fv-portals__doors" aria-label="Client portals">
            <a
              href={PORTALS.planning.href}
              className="fv-portals__door"
              target="_blank"
              rel="noopener noreferrer"
              data-enter="1"
            >
              <span className="fv-portals__door-head">
                <span className="fv-portals__door-index">01</span>
                <span className="fv-portals__door-seal">Secure session</span>
              </span>
              <span className="fv-portals__door-main">
                <span className="fv-portals__door-name">
                  {PORTALS.planning.label}
                </span>
                <span className="fv-portals__door-desc">
                  {PORTALS.planning.description}
                </span>
                <span className="fv-portals__powered">
                  <span className="fv-portals__powered-label">Powered by</span>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={PORTALS.planning.logo}
                    alt={PORTALS.planning.poweredBy}
                    className="fv-portals__logo fv-portals__logo--emoney"
                    width={84}
                    height={23}
                  />
                </span>
              </span>
              <span className="fv-portals__door-foot">
                <span className="fv-portals__door-go">Log in</span>
              </span>
            </a>

            <a
              href={PORTALS.investments.href}
              className="fv-portals__door"
              target="_blank"
              rel="noopener noreferrer"
              data-enter="2"
            >
              <span className="fv-portals__door-head">
                <span className="fv-portals__door-index">02</span>
                <span className="fv-portals__door-seal">Secure session</span>
              </span>
              <span className="fv-portals__door-main">
                <span className="fv-portals__door-name">
                  {PORTALS.investments.label}
                </span>
                <span className="fv-portals__door-desc">
                  {PORTALS.investments.description}
                </span>
              </span>
              <span className="fv-portals__door-foot">
                <span className="fv-portals__door-go">Log in</span>
              </span>
            </a>

            <div
              className="fv-portals__door fv-portals__door--custodians"
              data-enter="3"
            >
              <div className="fv-portals__door-head">
                <span className="fv-portals__door-index">03</span>
                <span className="fv-portals__door-seal">Custodian login</span>
              </div>
              <div className="fv-portals__door-main">
                <p className="fv-portals__door-name">
                  {PORTALS.custodians.label}
                </p>
                <p className="fv-portals__door-desc">
                  {PORTALS.custodians.description}
                </p>
              </div>
              <div className="fv-portals__door-foot">
                <ul className="fv-portals__door-actions">
                  {PORTALS.custodians.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="fv-portals__door-go"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </nav>

          <p className="fv-portals__note" data-enter="4">
            Schwab and Fidelity are independent of Fairview Capital and are not
            affiliated with us.
          </p>
        </div>
      </PageEnter>
    </main>
  );
}

import type { Metadata } from "next";
import LinkArrow from "@/components/LinkArrow";
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
          <h1 className="fv-portals__title">
            Three doors.
            <br />
            Pick one.
          </h1>
          <p className="fv-portals__lede">
            Planning, investments, and custodian records — each in its own
            secure place.
          </p>
        </header>

        <nav className="fv-portals__doors" aria-label="Client portals">
          <a
            href={PORTALS.planning.href}
            className="fv-portals__door"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="fv-portals__door-main">
              <span className="fv-portals__door-name">
                {PORTALS.planning.label}
              </span>
              <span className="fv-portals__door-desc">
                {PORTALS.planning.description}
              </span>
              <span className="fv-portals__door-meta">
                Powered by {PORTALS.planning.poweredBy}
              </span>
            </span>
            <span className="fv-portals__door-go">
              <span>Log in</span>
              <LinkArrow size={16} />
            </span>
          </a>

          <a
            href={PORTALS.investments.href}
            className="fv-portals__door"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="fv-portals__door-main">
              <span className="fv-portals__door-name">
                {PORTALS.investments.label}
              </span>
              <span className="fv-portals__door-desc">
                {PORTALS.investments.description}
              </span>
            </span>
            <span className="fv-portals__door-go">
              <span>Log in</span>
              <LinkArrow size={16} />
            </span>
          </a>
        </nav>

        <section
          className="fv-portals__custodians"
          aria-labelledby="portals-custodians"
        >
          <h2 id="portals-custodians" className="fv-portals__custodians-title">
            {PORTALS.custodians.label}
          </h2>
          <p className="fv-portals__custodians-desc">
            {PORTALS.custodians.description}
          </p>
          <ul className="fv-portals__custodian-list">
            {PORTALS.custodians.links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="fv-portals__custodian-link"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {link.label}
                  <LinkArrow />
                </a>
              </li>
            ))}
          </ul>
          <p className="fv-portals__note">
            Custodian links leave the Fairview site. Schwab and Fidelity are
            independent of Fairview Capital and are not affiliated with us.
          </p>
        </section>
      </div>
    </main>
  );
}

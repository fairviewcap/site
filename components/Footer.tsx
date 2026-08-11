import Link from "next/link";
import { FIRM } from "@/lib/firm";

/**
 * Quiet ledger footer — contact & disclosures as line items.
 * Prospectus cues: small-cap labels, tabular figures, CRD.
 */
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="fv-footer bg-[var(--fv-bg)] pt-8 pb-8 sm:pt-10 sm:pb-10">
      <div className="fv-frame">
        <div className="max-w-3xl">
          <span className="fv-footer__rule" aria-hidden />
          <dl className="fv-footer__ledger m-0">
            <div className="fv-footer__row">
              <dt>Contact</dt>
              <dd className="fv-footer__nums">
                <a href={FIRM.offices.greenbrae.phoneHref}>
                  {FIRM.offices.greenbrae.phone}
                </a>
                <span className="fv-footer__sep" aria-hidden>
                  ·
                </span>
                <a href={FIRM.offices.pittsburgh.phoneHref}>
                  {FIRM.offices.pittsburgh.phone}
                </a>
                <span className="fv-footer__sep" aria-hidden>
                  ·
                </span>
                <a href={`mailto:${FIRM.email}`}>{FIRM.email}</a>
              </dd>
            </div>

            <div className="fv-footer__row">
              <dt>{FIRM.offices.greenbrae.label}</dt>
              <dd className="fv-footer__nums">
                {FIRM.offices.greenbrae.lines.join(", ")}
              </dd>
            </div>

            <div className="fv-footer__row">
              <dt>{FIRM.offices.pittsburgh.label}</dt>
              <dd className="fv-footer__nums">
                {FIRM.offices.pittsburgh.lines.join(", ")}
              </dd>
            </div>

            <div className="fv-footer__row">
              <dt>Disclosures</dt>
              <dd className="fv-footer__links">
                <Link href="/disclosures/form-adv" className="fv-footer__chip">
                  Form ADV
                </Link>
                <Link href="/disclosures/form-crs" className="fv-footer__chip">
                  Form CRS
                </Link>
                <span className="fv-footer__crd" title="SEC / IAPD identifiers">
                  CRD {FIRM.crd}
                  <span className="fv-footer__sep" aria-hidden>
                    ·
                  </span>
                  SEC {FIRM.sec}
                </span>
                <span className="fv-footer__sep" aria-hidden>
                  ·
                </span>
                <Link href="/firm/privacy">Privacy</Link>
                <span className="fv-footer__sep" aria-hidden>
                  ·
                </span>
                <Link href="/legal/terms">Terms</Link>
              </dd>
            </div>
          </dl>

          <p className="fv-footer__legal mt-6 m-0 max-w-2xl">
            Nothing in these materials should be construed as investment or legal
            advice or a recommendation to purchase or sell securities. The
            information is not intended as an offer to provide advisory services
            in any state or jurisdiction where such offer would not be permitted
            under applicable law.
          </p>

          <p className="fv-footer__copy mt-4 m-0">
            © {year} {FIRM.legalName}
          </p>
        </div>
      </div>
    </footer>
  );
}

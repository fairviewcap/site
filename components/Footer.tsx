import Image from "next/image";
import Link from "next/link";
import { FIRM } from "@/lib/firm";

/**
 * Quiet ledger footer — contact & disclosures as line items.
 * Prospectus cues: small-cap labels, tabular figures, CRD.
 */
export default function Footer() {
  const year = new Date().getFullYear();
  const bay = FIRM.offices.greenbrae;
  const pit = FIRM.offices.pittsburgh;

  return (
    <footer className="fv-footer pt-8 pb-8 sm:pt-10 sm:pb-10">
      <div className="fv-frame">
        <div className="max-w-3xl">
          <Image
            src="/fv-icon.svg"
            alt=""
            width={31}
            height={31}
            className="fv-footer__mark"
            aria-hidden
          />
          <dl className="fv-footer__ledger m-0">
            <div className="fv-footer__row">
              <dt>Contact</dt>
              <dd className="fv-footer__cluster fv-footer__nums">
                <a href={bay.phoneHref}>{bay.phone}</a>
                <a href={pit.phoneHref}>{pit.phone}</a>
                <a href={`mailto:${FIRM.email}`}>{FIRM.email}</a>
              </dd>
            </div>

            <div className="fv-footer__row">
              <dt>{bay.label}</dt>
              <dd className="fv-footer__address fv-footer__nums">
                <span>{bay.lines[0]}</span>
                <span>{bay.lines[1]}</span>
              </dd>
            </div>

            <div className="fv-footer__row">
              <dt>{pit.label}</dt>
              <dd className="fv-footer__address fv-footer__nums">
                <span>{pit.lines[0]}</span>
                <span>{pit.lines[1]}</span>
              </dd>
            </div>

            <div className="fv-footer__row">
              <dt>Disclosures</dt>
              <dd className="fv-footer__cluster fv-footer__links">
                <a
                  href={FIRM.disclosures.formAdv}
                  className="fv-footer__chip"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Form ADV
                </a>
                <a
                  href={FIRM.disclosures.formCrs}
                  className="fv-footer__chip"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Form CRS
                </a>
                <span className="fv-footer__crd" title="SEC / IAPD identifiers">
                  CRD {FIRM.crd}
                  <span className="fv-footer__sep" aria-hidden>
                    ·
                  </span>
                  SEC {FIRM.sec}
                </span>
                <Link href="/privacy-policy">Privacy</Link>
                <Link href="/terms-and-conditions">Terms</Link>
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

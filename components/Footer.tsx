import Image from "next/image";
import Link from "next/link";
import { FIRM } from "@/lib/firm";

/**
 * Site footer — mark, then a full-frame instrument: contact, offices, disclosures.
 */
export default function Footer() {
  const year = new Date().getFullYear();
  const bay = FIRM.offices.greenbrae;
  const pit = FIRM.offices.pittsburgh;

  return (
    <footer className="fv-footer">
      <div className="fv-frame">
        <Image
          src="/fv-icon.svg"
          alt=""
          width={31}
          height={31}
          className="fv-footer__mark"
          aria-hidden
        />

        <div className="fv-footer__grid">
          <div className="fv-footer__col">
            <p className="fv-footer__label">Contact</p>
            <a href={`mailto:${FIRM.email}`}>{FIRM.email}</a>
          </div>

          <div className="fv-footer__col">
            <p className="fv-footer__label">{bay.label}</p>
            <a className="fv-footer__nums" href={bay.phoneHref}>
              {bay.phone}
            </a>
            <address className="fv-footer__address fv-footer__nums">
              <span>{bay.lines[0]}</span>
              <span>{bay.lines[1]}</span>
            </address>
          </div>

          <div className="fv-footer__col">
            <p className="fv-footer__label">{pit.label}</p>
            <a className="fv-footer__nums" href={pit.phoneHref}>
              {pit.phone}
            </a>
            <address className="fv-footer__address fv-footer__nums">
              <span>{pit.lines[0]}</span>
              <span>{pit.lines[1]}</span>
            </address>
          </div>

          <div className="fv-footer__col">
            <p className="fv-footer__label">Disclosures</p>
            <div className="fv-footer__cluster">
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
            </div>
            <p className="fv-footer__crd fv-footer__nums" title="SEC / IAPD identifiers">
              CRD {FIRM.crd}
              <span className="fv-footer__sep" aria-hidden>
                ·
              </span>
              SEC {FIRM.sec}
            </p>
            <div className="fv-footer__cluster">
              <Link href="/privacy-policy">Privacy</Link>
              <Link href="/terms-and-conditions">Terms</Link>
            </div>
          </div>
        </div>

        <div className="fv-footer__base">
          <p className="fv-footer__legal">
            Nothing in these materials should be construed as investment or legal
            advice or a recommendation to purchase or sell securities. The
            information is not intended as an offer to provide advisory services
            in any state or jurisdiction where such offer would not be permitted
            under applicable law.
          </p>
          <p className="fv-footer__copy">
            © {year} {FIRM.legalName}
          </p>
        </div>
      </div>
    </footer>
  );
}

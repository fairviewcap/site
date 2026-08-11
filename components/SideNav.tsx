import Image from "next/image";
import Link from "next/link";
import NavLink from "@/components/NavLink";
import { FIGURES, formatAsOf } from "@/lib/figures";
import { FIRM } from "@/lib/firm";
import { MENUS, type MenuKey } from "@/lib/nav";

/**
 * Sitewide sticky ledger rail (desktop ≥ --fv-rail-bp).
 * Mobile uses Navbar in the shell.
 *
 * Order: brand → instrument list → actions → measured figures.
 */
export default function SideNav() {
  const aumAsOf = FIGURES.aum.asOf ? formatAsOf(FIGURES.aum.asOf) : null;

  return (
    <aside className="fv-rail" aria-label="Site">
      <div className="fv-rail__inner">
        <Link href="/" className="fv-rail__brand" aria-label="Fairview Capital home">
          <Image
            src="/fairview-capital.png"
            alt="Fairview Capital"
            width={165}
            height={15}
            priority
            className="fv-rail__logo"
          />
        </Link>

        <nav className="fv-rail__nav" aria-label="Primary">
          {(Object.keys(MENUS) as MenuKey[]).map((key) => {
            const menu = MENUS[key];
            return (
              <div key={key} className="fv-rail__group">
                <p className="fv-rail__group-label">{menu.label}</p>
                <ul className="fv-rail__list">
                  {menu.items.map((item) => (
                    <li key={item.href}>
                      <NavLink
                        href={item.href}
                        className="fv-rail__link"
                        activeClassName="fv-rail__link--active"
                      >
                        {item.short ?? item.label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}

          <div className="fv-rail__group">
            <ul className="fv-rail__list">
              <li>
                <NavLink
                  href="/learn"
                  className="fv-rail__link fv-rail__link--top"
                  activeClassName="fv-rail__link--active"
                >
                  Learn
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>

        <div className="fv-rail__actions">
          <NavLink
            href={FIRM.contactHref}
            className="fv-rail__link fv-rail__link--top"
            activeClassName="fv-rail__link--active"
          >
            Let&apos;s talk
          </NavLink>
          <NavLink href="/login" className="fv-rail__login">
            Log in
          </NavLink>
        </div>

        <div className="fv-rail__foot">
          <p className="fv-rail__figure">
            <span className="fv-nums">{FIGURES.aum.value}</span> under
            management
            {aumAsOf ? (
              <>
                {" "}
                <span className="fv-rail__figure-sep" aria-hidden>
                  ·
                </span>{" "}
                <span className="fv-nums">{aumAsOf}</span>
              </>
            ) : null}
          </p>
          <p className="fv-rail__figure">
            Established{" "}
            <span className="fv-nums">{FIGURES.established.value}</span>
          </p>
        </div>
      </div>
    </aside>
  );
}

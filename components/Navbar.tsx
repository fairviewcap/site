"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  Cpu,
  Hash,
  Lock,
  Smartphone,
  Trees,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { FIRM } from "@/lib/firm";
import { HEROES } from "@/lib/heroes";
import { MENUS, PRIMARY_LINKS, menuItemLine, type MenuKey } from "@/lib/nav";

const FIRM_ICONS: Record<string, LucideIcon> = {
  "/firm/why-fairview": Zap,
  "/team": Smartphone,
  "/firm/fees": Hash,
  "/firm/privacy": Lock,
  "/firm/technology": Cpu,
  "/firm/community": Trees,
};

const SCROLL_PX = 16;

function navOnDark(pathname: string) {
  return pathname === "/firm/privacy" || pathname === "/firm/why-fairview";
}

type MobilePane = "root" | MenuKey;

/**
 * Rivian chip: logo left, links centered, talk/login right.
 * Desktop (≥900px): image-button mega under the chip.
 * Mobile: Apple-style full-screen sheet + drill-down (ported to body).
 */
export default function Navbar() {
  const pathname = usePathname();
  const onDark = navOnDark(pathname);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobilePane, setMobilePane] = useState<MobilePane>("root");
  const [openMenu, setOpenMenu] = useState<MenuKey | null>(null);
  const [shownMenu, setShownMenu] = useState<MenuKey | null>(null);
  const [portalReady, setPortalReady] = useState(false);
  const rootRef = useRef<HTMLElement>(null);
  const closeTimer = useRef<number | null>(null);
  const menuId = useId();

  const closeMobile = () => {
    setMobileOpen(false);
    setMobilePane("root");
  };

  const clearCloseTimer = () => {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const scheduleClose = () => {
    clearCloseTimer();
    closeTimer.current = window.setTimeout(() => setOpenMenu(null), 140);
  };

  const openDesktopMenu = (key: MenuKey) => {
    clearCloseTimer();
    closeMobile();
    setOpenMenu(key);
  };

  useEffect(() => {
    setPortalReady(true);
  }, []);

  useEffect(() => {
    const glassAt = () => {
      if (pathname === "/firm/why-fairview") {
        const cine = document.querySelector(".fv-why-cine");
        if (cine instanceof HTMLElement) {
          return window.scrollY >= cine.offsetHeight - window.innerHeight * 0.2;
        }
        return false;
      }
      return window.scrollY > SCROLL_PX;
    };

    const onScroll = () => setScrolled(glassAt());
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  useEffect(() => {
    if (!mobileOpen && !openMenu) return;

    const onPointerDown = (event: MouseEvent) => {
      if (mobileOpen) return;
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpenMenu(null);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (mobileOpen && mobilePane !== "root") {
          setMobilePane("root");
          return;
        }
        closeMobile();
        setOpenMenu(null);
      }
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [mobileOpen, openMenu, mobilePane]);

  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = prev;
    };
  }, [mobileOpen]);

  useEffect(() => () => clearCloseTimer(), []);

  useEffect(() => {
    if (openMenu) {
      setShownMenu(openMenu);
      return;
    }
    const id = window.setTimeout(() => setShownMenu(null), 340);
    return () => window.clearTimeout(id);
  }, [openMenu]);

  const linkClass = (active?: boolean) =>
    `font-sans text-[13px] font-medium tracking-[-0.015em] transition-colors ${
      onDark
        ? active
          ? "text-[#f2f1ef]"
          : "text-[#f2f1ef]/75 hover:text-[#f2f1ef]"
        : active
          ? "text-[var(--fv-fg)]"
          : "text-[var(--fv-fg)]/75 hover:text-[var(--fv-fg)]"
    }`;

  const mega = shownMenu ? MENUS[shownMenu] : null;

  const subMenu = mobilePane === "root" ? null : MENUS[mobilePane];

  const mobileSheet =
    portalReady &&
    createPortal(
      <div
        className={`fv-nav-apple min-[900px]:!hidden ${mobileOpen ? "is-open" : ""}`}
        aria-hidden={!mobileOpen}
      >
        <button
          type="button"
          className="fv-nav-apple__close"
          aria-label="Close menu"
          onClick={closeMobile}
        >
          <span className="fv-nav-apple__close-x" aria-hidden />
        </button>

        <div
          className={`fv-nav-apple__track${mobilePane !== "root" ? " is-drilled" : ""}`}
        >
          <nav className="fv-nav-apple__pane" aria-label="Mobile">
            <ul className="fv-nav-apple__list">
              {(Object.keys(MENUS) as MenuKey[]).map((key) => (
                <li key={key}>
                  <button
                    type="button"
                    className="fv-nav-apple__item"
                    onClick={() => setMobilePane(key)}
                  >
                    <span>{MENUS[key].label}</span>
                    <ChevronRight size={18} strokeWidth={1.75} aria-hidden />
                  </button>
                </li>
              ))}
              <li>
                <Link
                  href="/answers"
                  className="fv-nav-apple__item"
                  onClick={closeMobile}
                >
                  Answers
                </Link>
              </li>
              <li>
                <Link
                  href="/learn"
                  className="fv-nav-apple__item"
                  onClick={closeMobile}
                >
                  Learn
                </Link>
              </li>
            </ul>

            <ul className="fv-nav-apple__list fv-nav-apple__list--util">
              <li>
                <Link
                  href={FIRM.contactHref}
                  className="fv-nav-apple__util"
                  onClick={closeMobile}
                >
                  Let&apos;s talk
                </Link>
              </li>
              <li>
                <Link
                  href="/login"
                  className="fv-nav-apple__util"
                  onClick={closeMobile}
                >
                  Log in
                </Link>
              </li>
            </ul>
          </nav>

          <nav
            className="fv-nav-apple__pane"
            aria-label={subMenu?.label ?? "Section"}
            aria-hidden={mobilePane === "root"}
          >
            <button
              type="button"
              className="fv-nav-apple__back"
              onClick={() => setMobilePane("root")}
            >
              <ChevronLeft size={18} strokeWidth={1.75} aria-hidden />
              <span>{subMenu?.label ?? "Back"}</span>
            </button>
            <ul className="fv-nav-apple__list">
              {subMenu?.items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="fv-nav-apple__item"
                    onClick={closeMobile}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>,
      document.body,
    );

  return (
    <header
      ref={rootRef}
      className="fv-nav"
      onMouseLeave={scheduleClose}
    >
      <div
        className={`fv-nav-shell${onDark ? " fv-nav-shell--on-dark" : ""}${openMenu || mobileOpen ? " is-open" : ""}${scrolled ? " is-scrolled" : ""}`}
      >
      <div className="fv-nav-chip">
        <Link
          href="/"
          onClick={() => {
            closeMobile();
            setOpenMenu(null);
          }}
          className="fv-nav-chip__brand"
          aria-label="Fairview Capital home"
        >
          <Image
            src="/fairview-capital.png"
            alt="Fairview Capital"
            width={165}
            height={15}
            priority
            className="fv-nav-chip__logo fv-nav-chip__logo--ink"
          />
          <Image
            src="/fairview-capital-white.png"
            alt=""
            width={165}
            height={15}
            priority
            className="fv-nav-chip__logo fv-nav-chip__logo--paper"
          />
        </Link>

        <nav className="fv-nav-chip__links" aria-label="Primary">
          <div onMouseEnter={() => openDesktopMenu("work")}>
            <button
              type="button"
              className={linkClass(openMenu === "work")}
              aria-expanded={openMenu === "work"}
              aria-controls={`${menuId}-mega`}
              aria-haspopup="menu"
              onFocus={() => openDesktopMenu("work")}
              onClick={() => {
                if (openMenu === "work") setOpenMenu(null);
                else openDesktopMenu("work");
              }}
            >
              Work
            </button>
          </div>

          <div onMouseEnter={() => openDesktopMenu("firm")}>
            <button
              type="button"
              className={linkClass(openMenu === "firm")}
              aria-expanded={openMenu === "firm"}
              aria-controls={`${menuId}-mega`}
              aria-haspopup="menu"
              onFocus={() => openDesktopMenu("firm")}
              onClick={() => {
                if (openMenu === "firm") setOpenMenu(null);
                else openDesktopMenu("firm");
              }}
            >
              Firm
            </button>
          </div>

          {PRIMARY_LINKS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={linkClass()}
              onMouseEnter={() => {
                clearCloseTimer();
                setOpenMenu(null);
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="fv-nav-chip__actions">
          <Link href="/login" className="fv-nav-chip__login">
            Log in
          </Link>
          <Link
            href={FIRM.contactHref}
            className="fv-nav-chip__talk"
            onClick={closeMobile}
          >
            Let&apos;s talk
          </Link>
          <button
            type="button"
            className={`fv-nav-chip__menu${mobileOpen ? " is-hidden" : ""}`}
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            onClick={() => {
              setOpenMenu(null);
              setMobilePane("root");
              setMobileOpen(true);
            }}
          >
            <span className="fv-nav-chip__menu-line" aria-hidden />
            <span className="fv-nav-chip__menu-line" aria-hidden />
          </button>
        </div>
      </div>

      <div className="fv-mega-slot">
        <div
          id={`${menuId}-mega`}
          className="fv-mega"
          role="menu"
          aria-hidden={!openMenu}
          aria-label={mega?.label}
          onMouseEnter={clearCloseTimer}
        >
          {mega && shownMenu === "work" ? (
            <ul className="fv-mega__grid fv-mega__grid--work">
              {mega.items.map((item) => {
                const hero = HEROES[item.hero];
                return (
                  <li key={item.href} role="none">
                    <Link
                      href={item.href}
                      role="menuitem"
                      className="fv-mega__card"
                      onClick={() => setOpenMenu(null)}
                    >
                      <span className="fv-mega__shot">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={hero.desktop}
                          alt=""
                          width={2400}
                          height={1200}
                          className="fv-mega__img"
                        />
                        <span className="fv-mega__shade" aria-hidden />
                        <span className="fv-mega__onshot">{item.label}</span>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          ) : null}

          {mega && shownMenu === "firm" ? (
            <ul className="fv-mega__grid fv-mega__grid--firm">
              {mega.items.map((item) => {
                const Icon = FIRM_ICONS[item.href];
                const line = menuItemLine(item);
                return (
                  <li key={item.href} role="none">
                    <Link
                      href={item.href}
                      role="menuitem"
                      className="fv-mega__card"
                      onClick={() => setOpenMenu(null)}
                    >
                      <span className="fv-mega__plate">
                        {Icon ? (
                          <Icon
                            className="fv-mega__plate-icon"
                            size={16}
                            strokeWidth={1.5}
                            aria-hidden
                          />
                        ) : null}
                        <span className="fv-mega__plate-name">{item.label}</span>
                        {line ? (
                          <span className="fv-mega__plate-line">{line}</span>
                        ) : null}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          ) : null}
        </div>
      </div>
      </div>

      {mobileSheet}
    </header>
  );
}

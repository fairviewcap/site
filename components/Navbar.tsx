"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import LedgerFigure from "@/components/LedgerFigure";
import { FIGURES } from "@/lib/figures";
import { FIRM } from "@/lib/firm";
import { MENUS, PRIMARY_LINKS, type MenuKey } from "@/lib/nav";

const SCROLL_PX = 16;

type MobilePane = "root" | MenuKey;

/**
 * Clear on load. On scroll: slim frosted bar.
 * Desktop: Work/Firm hover panels.
 * Mobile (<900px): Apple-style full-screen sheet + drill-down (ported to body).
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobilePane, setMobilePane] = useState<MobilePane>("root");
  const [openMenu, setOpenMenu] = useState<MenuKey | null>(null);
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
    const onScroll = () => setScrolled(window.scrollY > SCROLL_PX);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

  const barOn = scrolled || mobileOpen;

  const linkClass = (active?: boolean) =>
    `font-sans text-[13px] font-medium tracking-[-0.01em] transition-colors ${
      active
        ? "text-[var(--fv-fg)]"
        : "text-[var(--fv-fg)]/80 hover:text-[var(--fv-fg)]"
    }`;

  const renderMenu = (key: MenuKey) => {
    const menu = MENUS[key];
    const open = openMenu === key;
    return (
      <div
        className={`
          absolute top-full left-0 z-[60] pt-2.5
          transition-opacity duration-150 ease-out
          ${open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}
        `}
        id={open ? `${menuId}-panel` : undefined}
        role="menu"
        aria-hidden={!open}
        onMouseEnter={clearCloseTimer}
      >
        <div className="fv-menu">
          {key === "firm" ? (
            <div className="fv-menu__head">
              <LedgerFigure figure={FIGURES.established} variant="eyebrow" />
            </div>
          ) : null}
          <ul className="fv-menu__list">
            {menu.items.map((item) => (
              <li key={item.href} role="none">
                <Link
                  href={item.href}
                  role="menuitem"
                  onClick={() => setOpenMenu(null)}
                  className="fv-menu__link"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  };

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
      className={`
        sticky top-0 z-[200] w-full pointer-events-none
        transition-[background-color,border-color,backdrop-filter,padding] duration-300 ease-out
        ${
          barOn
            ? "fv-nav-bar py-0"
            : "bg-transparent border-transparent pt-3 pb-3 sm:pt-4 sm:pb-4"
        }
      `}
    >
      <div
        className={`
          fv-frame pointer-events-auto flex items-center gap-3
          transition-[height] duration-300 ease-out
          ${barOn ? "h-12" : "h-auto"}
        `}
      >
        <Link
          href="/"
          onClick={() => {
            closeMobile();
            setOpenMenu(null);
          }}
          className="shrink-0 flex items-center"
          aria-label="Fairview Capital home"
        >
          <Image
            src="/fairview-capital.png"
            alt="Fairview Capital"
            width={165}
            height={15}
            priority
            className={`w-auto select-none transition-[height] duration-300 ${
              barOn ? "h-[10px]" : "h-[11px]"
            }`}
          />
        </Link>

        <nav
          className="fv-nav-desktop hidden min-[900px]:flex items-center gap-3 ml-3"
          aria-label="Primary"
        >
          <div
            className="relative"
            onMouseEnter={() => openDesktopMenu("work")}
            onMouseLeave={scheduleClose}
          >
            <button
              type="button"
              className={linkClass(openMenu === "work")}
              aria-expanded={openMenu === "work"}
              aria-controls={`${menuId}-panel`}
              aria-haspopup="menu"
              onFocus={() => openDesktopMenu("work")}
              onClick={() => {
                if (openMenu === "work") setOpenMenu(null);
                else openDesktopMenu("work");
              }}
            >
              Work
            </button>
            {renderMenu("work")}
          </div>

          <div
            className="relative"
            onMouseEnter={() => openDesktopMenu("firm")}
            onMouseLeave={scheduleClose}
          >
            <button
              type="button"
              className={linkClass(openMenu === "firm")}
              aria-expanded={openMenu === "firm"}
              aria-controls={`${menuId}-panel`}
              aria-haspopup="menu"
              onFocus={() => openDesktopMenu("firm")}
              onClick={() => {
                if (openMenu === "firm") setOpenMenu(null);
                else openDesktopMenu("firm");
              }}
            >
              Firm
            </button>
            {renderMenu("firm")}
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

        <div className="ml-auto flex items-center gap-3 sm:gap-4">
          <Link
            href={FIRM.contactHref}
            className="font-sans text-[13px] font-semibold tracking-[-0.01em] text-[var(--fv-fg)] hover:text-[var(--fv-muted)] transition-colors"
            onClick={closeMobile}
          >
            Let&apos;s talk
          </Link>
          <Link
            href="/login"
            className="hidden min-[900px]:inline-flex font-sans text-[13px] font-medium tracking-[-0.01em] text-[var(--fv-muted)] hover:text-[var(--fv-fg)] transition-colors"
          >
            Log in
          </Link>
          <button
            type="button"
            className={`min-[900px]:hidden relative w-8 h-8 flex items-center justify-center text-[var(--fv-fg)]${mobileOpen ? " invisible pointer-events-none" : ""}`}
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            onClick={() => {
              setOpenMenu(null);
              setMobilePane("root");
              setMobileOpen(true);
            }}
          >
            <span className="absolute left-1/2 top-1/2 block w-3.5 h-px bg-current -translate-x-1/2 -translate-y-[3.5px]" />
            <span className="absolute left-1/2 top-1/2 block w-3.5 h-px bg-current -translate-x-1/2 translate-y-[3.5px]" />
          </button>
        </div>
      </div>

      {mobileSheet}
    </header>
  );
}

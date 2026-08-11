"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import LedgerFigure from "@/components/LedgerFigure";
import { FIGURES } from "@/lib/figures";
import { FIRM } from "@/lib/firm";
import { MENUS, PRIMARY_LINKS, type MenuKey } from "@/lib/nav";

const SCROLL_PX = 16;

/**
 * Clear on load. On scroll: slim frosted bar.
 * Work/Firm open as quiet panels (desktop ≥900px, if this chrome is shown).
 * Under the ledger shell, this component is mobile-only (<900px).
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<MenuKey | null>(null);
  const [mobileSection, setMobileSection] = useState<MenuKey | null>(null);
  const rootRef = useRef<HTMLElement>(null);
  const closeTimer = useRef<number | null>(null);
  const menuId = useId();

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
    setMobileOpen(false);
    setOpenMenu(key);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_PX);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen && !openMenu) return;

    const onPointerDown = (event: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setMobileOpen(false);
        setOpenMenu(null);
        setMobileSection(null);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
        setOpenMenu(null);
        setMobileSection(null);
      }
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [mobileOpen, openMenu]);

  useEffect(() => () => clearCloseTimer(), []);

  // Desktop menus float — don't force the scroll bar open.
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

  return (
    <header
      ref={rootRef}
      className={`
        sticky top-0 z-50 w-full pointer-events-none
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
            setMobileOpen(false);
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
            className="min-[900px]:hidden relative w-8 h-8 flex items-center justify-center text-[var(--fv-fg)]"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            onClick={() => {
              setOpenMenu(null);
              setMobileOpen((o) => !o);
            }}
          >
            <span
              className={`absolute left-1/2 top-1/2 block w-3.5 h-px bg-current transition-transform duration-300 origin-center
                ${mobileOpen ? "-translate-x-1/2 -translate-y-1/2 rotate-45" : "-translate-x-1/2 -translate-y-[3.5px]"}`}
            />
            <span
              className={`absolute left-1/2 top-1/2 block w-3.5 h-px bg-current transition-transform duration-300 origin-center
                ${mobileOpen ? "-translate-x-1/2 -translate-y-1/2 -rotate-45" : "-translate-x-1/2 translate-y-[3.5px]"}`}
            />
          </button>
        </div>
      </div>

      {/* Mobile sheet */}
      <div
        className={`
          pointer-events-auto min-[900px]:hidden grid overflow-hidden
          transition-[grid-template-rows,opacity] duration-300 ease-out
          ${mobileOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}
        `}
      >
        <div className="fv-frame min-h-0 overflow-hidden">
          <nav
            className="pb-4 pt-1 border-t border-[var(--fv-rule)]"
            aria-label="Mobile"
          >
            {(["work", "firm"] as const).map((key) => {
              const menu = MENUS[key];
              const expanded = mobileSection === key;
              return (
                <div key={key} className="border-b border-[var(--fv-rule)]">
                  <button
                    type="button"
                    className="w-full flex items-center justify-between py-2.5 font-sans text-[13px] font-medium text-[var(--fv-fg)] text-left capitalize"
                    aria-expanded={expanded}
                    onClick={() =>
                      setMobileSection((c) => (c === key ? null : key))
                    }
                  >
                    <span>{key}</span>
                    <span className="text-[var(--fv-muted)]">
                      {expanded ? "–" : "+"}
                    </span>
                  </button>
                  <div
                    className={`grid transition-[grid-template-rows] duration-200 ${
                      expanded ? "grid-rows-[1fr] pb-2.5" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      {key === "firm" ? (
                        <LedgerFigure
                          figure={FIGURES.established}
                          variant="eyebrow"
                          className="mb-1.5"
                        />
                      ) : null}
                      <ul className="m-0 p-0 list-none flex flex-col gap-1.5">
                        {menu.items.map((item) => (
                          <li key={item.href}>
                            <Link
                              href={item.href}
                              onClick={() => {
                                setMobileOpen(false);
                                setMobileSection(null);
                              }}
                              className="font-sans text-[14px] font-medium text-[var(--fv-fg)]"
                            >
                              {item.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
            {PRIMARY_LINKS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="block py-2.5 font-sans text-[13px] font-medium text-[var(--fv-fg)] border-b border-[var(--fv-rule)]"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={FIRM.contactHref}
              onClick={() => setMobileOpen(false)}
              className="block py-2.5 font-sans text-[13px] font-semibold text-[var(--fv-fg)] border-b border-[var(--fv-rule)]"
            >
              Let&apos;s talk
            </Link>
            <Link
              href="/login"
              onClick={() => setMobileOpen(false)}
              className="block py-2.5 font-sans text-[13px] font-medium text-[var(--fv-muted)]"
            >
              Log in
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}

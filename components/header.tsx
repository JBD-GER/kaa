"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Logo } from "@/components/brand/logo";
import { services } from "@/content/services";
import { primaryNavigation } from "@/config/site";

export function Header() {
  const pathname = usePathname();
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const mobileDialogRef = useRef<HTMLDivElement>(null);
  const mobileTriggerRef = useRef<HTMLButtonElement>(null);
  const megaRef = useRef<HTMLDivElement>(null);
  const megaTriggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!mobileOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusable = mobileDialogRef.current?.querySelector<HTMLElement>("a, button");
    focusable?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
        mobileTriggerRef.current?.focus();
        return;
      }
      if (event.key !== "Tab" || !mobileDialogRef.current) return;
      const items = Array.from(
        mobileDialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      );
      const first = items[0];
      const last = items[items.length - 1];
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    const onResize = () => {
      if (window.matchMedia("(min-width: 68.01rem)").matches) {
        setMobileOpen(false);
      }
    };
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("resize", onResize);
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!megaOpen) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!megaRef.current?.contains(event.target as Node)) setMegaOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMegaOpen(false);
        megaTriggerRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [megaOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === href : pathname.startsWith(href);

  return (
    <header
      className={`site-header${mobileOpen ? " site-header--nav-open" : ""}`}
    >
      <div className="container site-header__inner">
        <Link
          href="/"
          className="site-header__logo"
          aria-label="KAA – KI-Automatisierungs-Agentur, Startseite"
        >
            <Logo variant="dark" size="compact" decorative />
        </Link>

        <nav className="desktop-nav" aria-label="Hauptnavigation">
          {primaryNavigation.map((item) =>
            "megaMenu" in item && item.megaMenu ? (
              <div className="desktop-nav__mega" ref={megaRef} key={item.href}>
                <Link
                  href={item.href}
                  className={isActive(item.href) ? "is-active" : ""}
                  aria-current={pathname === item.href ? "page" : undefined}
                  onClick={() => setMegaOpen(false)}
                >
                  {item.label}
                </Link>
                <button
                  ref={megaTriggerRef}
                  type="button"
                  className={isActive(item.href) ? "is-active" : ""}
                  aria-expanded={megaOpen}
                  aria-haspopup="true"
                  aria-controls="services-mega-menu"
                  aria-label={
                    megaOpen
                      ? "Leistungsmenü schließen"
                      : "Leistungsmenü öffnen"
                  }
                  onClick={() => setMegaOpen((open) => !open)}
                >
                  <span aria-hidden="true">⌄</span>
                </button>
                {megaOpen ? (
                  <div className="mega-menu" id="services-mega-menu">
                    <div className="mega-menu__intro">
                      <span className="eyebrow">Leistungen</span>
                      <strong>KI entlang Ihres tatsächlichen Ablaufs.</strong>
                      <Link href="/leistungen" onClick={() => setMegaOpen(false)}>Alle Leistungen ansehen <span aria-hidden="true">→</span></Link>
                    </div>
                    <ul>
                      {services.map((service, index) => (
                        <li key={service.slug}>
                          <Link href={`/leistungen/${service.slug}`} onClick={() => setMegaOpen(false)}>
                            <span className="mega-menu__index">0{index + 1}</span>
                            <span><strong>{service.name}</strong><small>{service.shortDescription}</small></span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            ) : (
              <Link
                href={item.href}
                key={item.href}
                className={isActive(item.href) ? "is-active" : ""}
                aria-current={isActive(item.href) ? "page" : undefined}
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <Link
          href="/ki-potenzialanalyse"
          className="header-cta"
          prefetch={false}
        >
          KI-Potenzial prüfen <span aria-hidden="true">↗</span>
        </Link>

        <button
          ref={mobileTriggerRef}
          type="button"
          className="mobile-nav-trigger"
          aria-expanded={mobileOpen}
          aria-controls="mobile-navigation"
          aria-label={mobileOpen ? "Menü schließen" : "Menü öffnen"}
          onClick={() => setMobileOpen((open) => !open)}
        >
          <span /><span />
        </button>
      </div>

      {mobileOpen ? (
        <div
          className="mobile-nav-backdrop"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
          id="mobile-navigation"
          onPointerDown={(event) => {
            if (event.target === event.currentTarget) {
              setMobileOpen(false);
              mobileTriggerRef.current?.focus();
            }
          }}
        >
          <div className="mobile-nav" ref={mobileDialogRef}>
            <div className="mobile-nav__top">
              <Link
                href="/"
                aria-label="KAA – KI-Automatisierungs-Agentur, Startseite"
                onClick={() => setMobileOpen(false)}
              >
                <Logo variant="light" size="compact" decorative />
              </Link>
              <button type="button" onClick={() => { setMobileOpen(false); mobileTriggerRef.current?.focus(); }}>
                Schließen <span aria-hidden="true">×</span>
              </button>
            </div>
            <nav aria-label="Mobile Hauptnavigation">
              <Link
                href="/leistungen"
                aria-current={pathname === "/leistungen" ? "page" : undefined}
                onClick={() => setMobileOpen(false)}
              >
                Leistungen
              </Link>
              <div className="mobile-nav__services">
                {services.map((service) => (
                  <Link
                    href={`/leistungen/${service.slug}`}
                    key={service.slug}
                    aria-current={
                      pathname === `/leistungen/${service.slug}`
                        ? "page"
                        : undefined
                    }
                    onClick={() => setMobileOpen(false)}
                  >
                    {service.name}
                  </Link>
                ))}
              </div>
              {primaryNavigation.slice(1).map((item) => (
                <Link
                  href={item.href}
                  key={item.href}
                  aria-current={pathname === item.href ? "page" : undefined}
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <Link className="mobile-nav__cta" href="/ki-potenzialanalyse" onClick={() => setMobileOpen(false)}>KI-Potenzial prüfen <span aria-hidden="true">↗</span></Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}

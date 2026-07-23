import Link from "next/link";
import { Logo } from "@/components/brand/logo";
import { CookieSettingsTrigger } from "@/components/consent/cookie-settings-trigger";
import { company, companyNavigation, legalNavigation } from "@/config/site";
import { services } from "@/content/services";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="site-footer__top">
          <div className="site-footer__brand">
            <Link
              href="/"
              aria-label="KAA – KI-Automatisierungs-Agentur, Startseite"
            >
              <Logo variant="light" size="horizontal" decorative />
            </Link>
            <p>
              KAA entwickelt individuelle KI-Lösungen, automatisiert
              wiederkehrende Aufgaben und verbindet bestehende Systeme zu
              intelligenten Unternehmensprozessen.
            </p>
            {company.email || company.phone ? (
              <address>
                {company.email ? (
                  <a href={`mailto:${company.email}`}>{company.email}</a>
                ) : null}
                {company.phone ? (
                  <a href={`tel:${company.phone.replace(/\s/g, "")}`}>
                    {company.phone}
                  </a>
                ) : null}
                <span>
                  {company.street}, {company.postalCode} {company.city}
                </span>
              </address>
            ) : null}
          </div>

          <div className="site-footer__nav">
            <nav aria-label="Leistungen im Footer">
              <h2>Leistungen</h2>
              <ul>
                {services.map((service) => (
                  <li key={service.slug}>
                    <Link href={`/leistungen/${service.slug}`}>
                      {service.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <nav aria-label="Unternehmen im Footer">
              <h2>Unternehmen</h2>
              <ul>
                {companyNavigation.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href}>{item.label}</Link>
                  </li>
                ))}
              </ul>
            </nav>
            <nav aria-label="Rechtliches im Footer">
              <h2>Rechtliches</h2>
              <ul>
                {legalNavigation.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href}>{item.label}</Link>
                  </li>
                ))}
              </ul>
              <CookieSettingsTrigger className="footer-consent-trigger">
                Auswahl direkt ändern
              </CookieSettingsTrigger>
            </nav>
          </div>
        </div>
        <div className="site-footer__bottom">
          <p>© {new Date().getFullYear()} KAA. Alle Rechte vorbehalten.</p>
          <p>
            KI, Automatisierung und Software – kontrolliert zusammengedacht.
          </p>
        </div>
      </div>
    </footer>
  );
}

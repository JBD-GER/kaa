import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CookieSettingsTrigger } from "@/components/consent/cookie-settings-trigger";
import { Container } from "@/components/ui/container";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Cookie-Einstellungen verwalten",
  description:
    "Cookie-Auswahl für notwendige Funktionen, Statistik, Marketing und externe Medien verwalten oder widerrufen.",
  path: "/cookie-einstellungen",
});

const categories = [
  {
    title: "Notwendig",
    text: "Speichert ausschließlich die von Ihnen getroffene Consent-Auswahl. Diese Kategorie ist für die Funktion der Einstellungen erforderlich.",
  },
  {
    title: "Statistik",
    text: "Optional. Aktuell ist kein Statistikdienst eingebunden. Ein künftiger Dienst würde erst nach Ihrer Zustimmung geladen.",
  },
  {
    title: "Marketing",
    text: "Optional. Ihre Zustimmung erlaubt Werbe-Cookies und die vollständige Google-Ads-Messung. Ohne Zustimmung übermittelt das Tag nur cookielose Messimpulse mit verweigerten Werbe-Signalen.",
  },
  {
    title: "Externe Medien",
    text: "Optional. Aktuell werden keine zustimmungspflichtigen externen Medien geladen. Künftige Einbettungen bleiben bis zur Zustimmung blockiert.",
  },
];

export default function CookieSettingsPage() {
  const items = [
    { label: "Startseite", href: "/" },
    { label: "Cookie-Einstellungen", href: "/cookie-einstellungen" },
  ];
  return (
    <>
      <section className="page-hero">
        <Container>
          <Breadcrumbs items={items} />
          <div className="page-hero__inner">
            <div>
              <p className="eyebrow">Datenschutz-Einstellungen</p>
              <h1>Sie behalten die Kontrolle über optionale Dienste.</h1>
            </div>
            <div className="page-hero__aside">
              <p>
                Optionale Kategorien sind zu Beginn deaktiviert. Ihre
                Entscheidung wird mit Consent-Version und Zeitstempel lokal in
                Ihrem Browser gespeichert.
              </p>
              <CookieSettingsTrigger style={{ marginTop: "1.25rem" }}>
                Auswahl öffnen oder widerrufen
              </CookieSettingsTrigger>
            </div>
          </div>
        </Container>
      </section>
      <section className="section section--white">
        <Container>
          <div className="service-detail-grid">
            {categories.map((category) => (
              <article className="service-detail-card" key={category.title}>
                <h2 style={{ fontSize: "1.35rem" }}>{category.title}</h2>
                <p>{category.text}</p>
              </article>
            ))}
          </div>
          <div
            className="legal-note"
            style={{ marginTop: "2rem", maxWidth: "52rem" }}
          >
            Das Google Ads-Tag verwendet den Advanced Consent Mode. Die
            werbebezogenen Google-Consent-Signale stehen standardmäßig auf
            „denied“. Werbe-Cookies und vollständige Marketingmessung werden
            erst nach Ihrer Zustimmung aktiviert. Bei Ablehnung oder Widerruf
            bleiben die Signale verweigert.
          </div>
        </Container>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CtaSection } from "@/components/cta-section";
import { JsonLd } from "@/components/json-ld";
import { UseCaseFilter } from "@/components/use-case-filter";
import { Container } from "@/components/ui/container";
import { services } from "@/content/services";
import { useCaseCategories, useCases } from "@/content/use-cases";
import { absoluteUrl, createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Anwendungsfälle für KI-Automatisierung",
  description:
    "Konkrete Beispiele für KI-Automatisierung in Kundenservice, Vertrieb, Verwaltung, Dokumentenarbeit, internem Wissen und weiteren Bereichen.",
  path: "/anwendungsfaelle",
});

const breadcrumbs = [
  { label: "Startseite", href: "/" },
  { label: "Anwendungsfälle", href: "/anwendungsfaelle" },
];

const servicesBySlug = Object.fromEntries(
  services.map((service) => [
    service.slug,
    {
      href: `/leistungen/${service.slug}`,
      name: service.name,
    },
  ]),
);

const pageUrl = absoluteUrl("/anwendungsfaelle");

const pageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${pageUrl}#webpage`,
  url: pageUrl,
  name: "Anwendungsfälle für KI-Automatisierung",
  description:
    "Konkrete, kontrollierbare Abläufe für den Einsatz von KI und Automatisierung im Unternehmen.",
  inLanguage: "de-DE",
  mainEntity: {
    "@type": "ItemList",
    numberOfItems: useCases.length,
    itemListElement: useCases.map((useCase, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: useCase.title,
      url: `${pageUrl}#${useCase.id}`,
    })),
  },
};

export default function UseCasesPage() {
  return (
    <>
      <JsonLd data={pageJsonLd} />

      <section className="page-hero page-hero--dark">
        <Container>
          <Breadcrumbs items={breadcrumbs} />
          <div className="page-hero__inner">
            <div>
              <p className="eyebrow">Anwendungsfälle</p>
              <h1>Was sich mit KI automatisieren lässt</h1>
              <p className="lead">
                Konkrete Aufgaben werden zu nachvollziehbaren Abläufen – mit
                definierten Systemaktionen, sichtbarem Nutzen und menschlicher
                Kontrolle an den richtigen Stellen.
              </p>
            </div>
            <aside className="page-hero__aside" aria-label="Einordnung">
              <p>
                Die Beispiele zeigen mögliche Lösungswege. Welche Schritte und
                Systeme sinnvoll sind, wird immer für den tatsächlichen Prozess
                geprüft.
              </p>
              <p>
                Es werden keine pauschalen Ergebnisse, Einsparungen oder eine
                vollständige Autonomie versprochen.
              </p>
            </aside>
          </div>
        </Container>
      </section>

      <section
        className="section section--white"
        aria-label="Filterbare Anwendungsfälle"
      >
        <Container>
          <UseCaseFilter
            categories={useCaseCategories}
            items={useCases}
            servicesBySlug={servicesBySlug}
          />
        </Container>
      </section>

      <CtaSection
        title="Welcher manuelle Ablauf soll in Ihrem Unternehmen leichter werden?"
        text="Beschreiben Sie uns die heutige Aufgabe. Gemeinsam klären wir, welche Schritte sinnvoll automatisiert werden können und wo Kontrolle wichtig bleibt."
        primaryLabel="KI-Potenzial prüfen"
        primaryHref="/ki-potenzialanalyse"
        secondaryLabel="Prozess besprechen"
        secondaryHref="/kontakt"
      />
    </>
  );
}

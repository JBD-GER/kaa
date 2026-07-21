import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CtaSection } from "@/components/cta-section";
import { JsonLd } from "@/components/json-ld";
import { Container } from "@/components/ui/container";
import { industries } from "@/content/industries";
import { absoluteUrl, createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "KI-Automatisierung für unterschiedliche Branchen",
  description:
    "Mögliche KI- und Automatisierungsansätze für Handwerk, Dienstleistungen, E-Commerce, Immobilien, Kanzleien und weitere Branchen.",
  path: "/branchen",
});

const breadcrumbs = [
  { label: "Startseite", href: "/" },
  { label: "Branchen", href: "/branchen" },
];

const pageUrl = absoluteUrl("/branchen");

const pageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${pageUrl}#webpage`,
  url: pageUrl,
  name: "KI-Automatisierung für unterschiedliche Branchen",
  description:
    "Mögliche Ansatzpunkte für individuelle KI-Lösungen und kontrollierbare Automatisierungen in verschiedenen Branchen.",
  inLanguage: "de-DE",
  mainEntity: {
    "@type": "ItemList",
    numberOfItems: industries.length,
    itemListElement: industries.map((industry, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: industry.name,
    })),
  },
};

export default function IndustriesPage() {
  return (
    <>
      <JsonLd data={pageJsonLd} />

      <section className="page-hero page-hero--dark">
        <Container>
          <Breadcrumbs items={breadcrumbs} />
          <div className="page-hero__inner">
            <div>
              <p className="eyebrow">Branchen</p>
              <h1>Individuelle KI-Lösungen für unterschiedliche Branchen</h1>
              <p className="lead">
                Wiederkehrende Kommunikation, Dokumentenarbeit und
                Systemübergaben gibt es in vielen Branchen. Die passende Lösung
                richtet sich jedoch immer nach dem konkreten Ablauf.
              </p>
            </div>
            <aside
              className="page-hero__aside"
              aria-label="Wichtige Einordnung"
            >
              <p>
                Die folgenden Beispiele sind mögliche Ansatzpunkte – keine
                Aussage über bestehende Referenzprojekte oder eine pauschale
                Eignung.
              </p>
              <p>
                Systeme, Daten, Verantwortlichkeiten und fachliche Grenzen
                werden vor jeder Umsetzung individuell geprüft.
              </p>
            </aside>
          </div>
        </Container>
      </section>

      <section
        className="section section--white"
        aria-label="Branchen und mögliche Automatisierungen"
      >
        <Container>
          <div className="industry-grid">
            {industries.map((industry, index) => (
              <article className="industry-card" key={industry.name}>
                <span className="industry-card__number" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h2>{industry.name}</h2>
                <p>{industry.intro}</p>
                <ul
                  aria-label={`Mögliche Automatisierungen für ${industry.name}`}
                >
                  {industry.examples.map((example) => (
                    <li key={example}>{example}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <CtaSection
        title="Welche Abläufe prägen Ihr Unternehmen?"
        text="Statt ein Branchenpaket vorauszusetzen, betrachten wir Ihre Aufgaben, Systeme und Kontrollpunkte und entwickeln daraus einen passenden Lösungsweg."
        primaryLabel="KI-Potenzial prüfen"
        primaryHref="/ki-potenzialanalyse"
        secondaryLabel="Anwendungsfälle ansehen"
        secondaryHref="/anwendungsfaelle"
      />
    </>
  );
}

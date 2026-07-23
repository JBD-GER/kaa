import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CtaSection } from "@/components/cta-section";
import { JsonLd } from "@/components/json-ld";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { company } from "@/config/site";
import { absoluteUrl, createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Über KAA: KI muss funktionieren",
  description:
    "KAA verbindet technisches Verständnis mit einem klaren Blick auf reale Unternehmensprozesse – individuell, verständlich und kontrollierbar.",
  path: "/ueber-uns",
});

const principles = [
  "Lösungen statt KI-Spielereien",
  "verständliche Kommunikation",
  "individuelle Entwicklung",
  "Nutzung vorhandener Systeme",
  "kontrollierbare Abläufe",
  "messbarer geschäftlicher Nutzen",
  "langfristig erweiterbare Architektur",
  "menschliche Kontrolle an wichtigen Stellen",
  "keine unnötige technische Komplexität",
];

const competency = [
  {
    title: "Philosophie",
    text: "Technologie ist nur dann sinnvoll, wenn sie eine konkrete Aufgabe verlässlich unterstützt. Deshalb beginnen wir nicht mit einem Modell oder Tool, sondern mit dem Arbeitsablauf.",
  },
  {
    title: "Arbeitsweise",
    text: "Wir machen Auslöser, Daten, Regeln, Schnittstellen und Freigaben sichtbar. So entsteht eine Lösung, deren Verhalten fachlich verstanden und kontrolliert werden kann.",
  },
  {
    title: "Qualitätsanspruch",
    text: "Realistische Testfälle, nachvollziehbare Fehlerwege, klare Verantwortlichkeiten und eine wartbare Architektur gehören zur Lösung – nicht nur die glückliche Demo.",
  },
  {
    title: "Technische Kompetenz",
    text: "KAA verbindet Softwareentwicklung, Systemintegration, Datenverarbeitung und KI-Funktionen zu einer Anwendung, die in der bestehenden Systemlandschaft funktionieren kann.",
  },
];

export default function AboutPage() {
  const items = [
    { label: "Startseite", href: "/" },
    { label: "Über uns", href: "/ueber-uns" },
  ];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "Über KAA",
    url: absoluteUrl("/ueber-uns"),
    description:
      "KAA verbindet technisches Verständnis mit einem klaren Blick auf reale Unternehmensprozesse.",
    about: { "@id": `${absoluteUrl()}/#organization` },
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <section className="page-hero page-hero--dark">
        <Container>
          <Breadcrumbs items={items} />
          <div className="page-hero__inner">
            <div>
              <p className="eyebrow">Über KAA</p>
              <h1>KI muss nicht beeindrucken. Sie muss funktionieren.</h1>
            </div>
            <div className="page-hero__aside">
              <p>
                KAA verbindet technisches Verständnis mit einem klaren Blick auf
                reale Unternehmensprozesse.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="section section--white">
        <Container>
          <div className="split-grid">
            <div className="sticky-copy">
              <p className="eyebrow">Unser Ausgangspunkt</p>
              <h2>Der tatsächliche Ablauf kommt zuerst.</h2>
              <p>
                Nicht jede Aufgabe benötigt KI. Nicht jede mögliche
                Automatisierung ist wirtschaftlich sinnvoll. Deshalb beginnt
                jedes Projekt mit dem Verständnis der tatsächlichen Arbeit: Was
                löst den Vorgang aus, welche Informationen werden gebraucht und
                wo ist eine Entscheidung notwendig?
              </p>
            </div>
            <ul className="principles-grid">
              {principles.map((principle, index) => (
                <li key={principle}>
                  <span>0{index + 1}</span>
                  {principle}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section className="section">
        <Container>
          <SectionHeader
            eyebrow="Wofür wir stehen"
            title="Klar im Prozess. Sorgfältig in der Umsetzung."
          />
          <div className="about-grid">
            {competency.map((item) => (
              <article key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="section section--dark">
        <Container>
          <div className="split-grid">
            <div>
              <p className="eyebrow">Ansprechpartner</p>
              <h2>Direkter Austausch über Aufgabe, Systeme und Ziel.</h2>
              <p className="lead">
                Von der ersten Prozesseinordnung bis zur technischen Umsetzung
                haben Sie einen direkten Ansprechpartner. Entscheidungen, offene
                Punkte und nächste Schritte bleiben dadurch nachvollziehbar.
              </p>
            </div>
            <div
              className="founder-placeholder"
              aria-label="Direkter Ansprechpartner bei KAA"
            >
              <div className="founder-placeholder__mark" aria-hidden="true">
                KAA
              </div>
              <div>
                <h3>{company.founder.name}</h3>
                <p>{company.founder.role}</p>
                <p>{company.founder.biography}</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <CtaSection />
    </>
  );
}

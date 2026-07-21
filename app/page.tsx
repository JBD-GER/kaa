import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { ProcessVisualization } from "@/components/process-visualization";
import { ServiceOverview } from "@/components/service-overview";
import { CtaSection } from "@/components/cta-section";
import { JsonLd } from "@/components/json-ld";
import { services } from "@/content/services";
import { useCases } from "@/content/use-cases";
import { absoluteUrl, createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "KAA: KI-Automatisierungs-Agentur für Unternehmen",
  description:
    "KAA entwickelt individuelle KI-Lösungen, automatisiert wiederkehrende Aufgaben und verbindet bestehende Systeme zu kontrollierbaren Prozessen.",
  path: "/",
});

const problems = [
  "Informationen werden zwischen Programmen kopiert",
  "E-Mails müssen manuell geprüft werden",
  "Dokumente werden einzeln ausgelesen",
  "Mitarbeiter suchen lange nach Informationen",
  "Kundenanfragen bleiben liegen",
  "Daten werden mehrfach erfasst",
  "Termine werden manuell abgestimmt",
  "Nachfassaktionen werden vergessen",
  "Internes Wissen ist schwer auffindbar",
];

const analysisPoints = [
  "welche Aufgabe heute manuell ausgeführt wird",
  "welche Informationen benötigt werden",
  "welche Programme beteiligt sind",
  "wo Entscheidungen oder Freigaben erforderlich sind",
  "welche Schritte automatisiert werden können",
  "wo menschliche Kontrolle sinnvoll bleibt",
];

const benefits = [
  "weniger wiederkehrende Handarbeit",
  "schnellere Bearbeitung",
  "strukturierte Daten",
  "weniger Medienbrüche",
  "besser auffindbares Wissen",
  "nachvollziehbare Abläufe",
  "kontrollierte Automatisierungen",
  "erweiterbare Lösungen",
];

const workflow = [
  { title: "Auslöser", text: "Eine E-Mail, ein Anruf, ein Formular, ein Dokument oder ein Systemereignis startet den Prozess." },
  { title: "Verarbeitung", text: "Die KI liest, versteht, strukturiert oder bewertet die Informationen." },
  { title: "Systemaktion", text: "Daten werden übertragen, Aufgaben erstellt, Termine gebucht oder Antwortentwürfe vorbereitet." },
  { title: "Kontrolle", text: "Wichtige Schritte können durch einen Mitarbeiter geprüft oder freigegeben werden." },
  { title: "Ergebnis", text: "Der Prozess wird schneller, strukturierter und nachvollziehbar abgeschlossen." },
];

const approach = [
  { title: "Abläufe verstehen", text: "Wir analysieren, wie die Aufgabe heute ausgeführt wird und welche Systeme daran beteiligt sind." },
  { title: "Potenzial bewerten", text: "Wir prüfen Nutzen, Umsetzbarkeit, Aufwand, Risiken und mögliche Einsparungen." },
  { title: "Lösung konzipieren", text: "Wir entwickeln einen klaren Ablauf und definieren Schnittstellen, Freigaben und Kontrollpunkte." },
  { title: "Umsetzung und Integration", text: "Wir entwickeln die Lösung und verbinden sie mit Ihren vorhandenen Programmen." },
  { title: "Test und Einführung", text: "Die Automatisierung wird mit realistischen Fällen getestet und kontrolliert eingeführt." },
  { title: "Optimierung und Erweiterung", text: "Nach der Einführung kann die Lösung überwacht, verbessert und erweitert werden." },
];

const before = [
  "Informationen werden kopiert",
  "E-Mails werden einzeln geprüft",
  "Daten werden mehrfach eingegeben",
  "Mitarbeiter suchen lange",
  "Rückfragen verzögern Abläufe",
  "Nachfassaktionen werden vergessen",
  "Systeme arbeiten getrennt",
];

const after = [
  "Informationen werden automatisch strukturiert",
  "Anfragen werden richtig zugeordnet",
  "Daten werden zwischen Systemen übertragen",
  "Wissen wird schnell gefunden",
  "Aufgaben werden automatisch erstellt",
  "Nachfassaktionen werden ausgelöst",
  "Wichtige Schritte bleiben kontrollierbar",
];

const integrations = ["E-Mail", "CRM", "Kalender", "Telefonie", "Buchhaltung", "Dokumentenmanagement", "Onlineshops", "Formulare", "Cloud-Speicher", "interne Datenbanken", "Projektmanagement", "Kommunikationsplattformen"];

export default function HomePage() {
  const pageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${absoluteUrl()}/#webpage`,
    url: absoluteUrl(),
    name: "KI-Automatisierungs-Agentur für Unternehmen",
    description: "KAA macht KI in realen Unternehmensabläufen praktisch nutzbar.",
    inLanguage: "de-DE",
    about: services.map((service) => ({ "@type": "Service", name: service.name, description: service.shortDescription, url: absoluteUrl(`/leistungen/${service.slug}`) })),
  };

  return (
    <>
      <JsonLd data={pageJsonLd} />

      <section className="hero">
        <Container className="hero__inner">
          <div className="hero__copy">
            <p className="eyebrow">KI-Automatisierungs-Agentur</p>
            <h1>KI, die in Ihrem Unternehmen wirklich arbeitet.</h1>
            <p className="lead">KAA entwickelt individuelle KI-Lösungen, automatisiert wiederkehrende Aufgaben und verbindet Ihre bestehenden Systeme zu intelligenten Prozessen.</p>
            <div className="button-row">
              <ButtonLink href="/ki-potenzialanalyse" variant="light">KI-Potenzial prüfen</ButtonLink>
              <ButtonLink href="/leistungen" variant="ghost">Leistungen entdecken</ButtonLink>
            </div>
            <ul className="trust-points" aria-label="Grundsätze unserer Lösungen">
              <li>Individuell entwickelt</li>
              <li>Mit bestehenden Systemen kombinierbar</li>
              <li>Kontrollierbare Abläufe</li>
              <li>Verständlich umgesetzt</li>
            </ul>
          </div>
          <div className="hero__visual">
            <ProcessVisualization />
          </div>
        </Container>
      </section>

      <section className="section section--white">
        <Container>
          <div className="split-grid">
            <div className="sticky-copy">
              <p className="eyebrow">Der manuelle Zwischenraum</p>
              <h2>Wenn Software vorhanden ist, aber trotzdem noch alles manuell erledigt wird</h2>
              <p>Viele Unternehmen arbeiten bereits mit E-Mail-Programmen, CRM-Systemen, Buchhaltungssoftware, Kalendern, Dokumenten und internen Plattformen. Trotzdem müssen Informationen weiterhin kopiert, geprüft, weitergeleitet und manuell eingetragen werden.</p>
              <p>KAA verbindet diese einzelnen Schritte zu intelligenten und kontrollierbaren Abläufen.</p>
            </div>
            <ul className="problem-list">{problems.map((problem) => <li key={problem}>{problem}</li>)}</ul>
          </div>
        </Container>
      </section>

      <section className="section section--dark" id="leistungen">
        <Container>
          <SectionHeader
            eyebrow="Leistungen"
            title="Individuelle KI-Lösungen für Unternehmen"
            description={<p>Wir automatisieren wiederkehrende Aufgaben, verbinden bestehende Systeme und entwickeln KI-Lösungen, die zu Ihrem Unternehmen passen.</p>}
            inverse
          />
          <ServiceOverview />
        </Container>
      </section>

      <section className="section section--white">
        <Container>
          <div className="split-grid">
            <div className="sticky-copy">
              <p className="eyebrow">Prozess vor Produkt</p>
              <h2>Automatisierung beginnt nicht mit einem Tool, sondern mit Ihrem Ablauf</h2>
              <p>KAA verkauft keine isolierten Standardtools. Zuerst betrachten wir den heutigen Ablauf, die beteiligten Informationen und die Stellen, an denen eine Entscheidung oder Kontrolle wichtig bleibt.</p>
              <ButtonLink href="/vorgehensweise" variant="secondary">Vorgehensweise ansehen</ButtonLink>
            </div>
            <div className="service-detail-grid">
              <div className="service-detail-card">
                <h3>Was wir analysieren</h3>
                <ul className="check-list">{analysisPoints.map((point) => <li key={point}>{point}</li>)}</ul>
              </div>
              <div className="service-detail-card">
                <h3>Was dadurch entstehen kann</h3>
                <ul className="check-list">{benefits.map((benefit) => <li key={benefit}>{benefit}</li>)}</ul>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="section section--blue">
        <Container>
          <SectionHeader
            eyebrow="Konkrete Aufgaben"
            title="Was sich mit KI automatisieren lässt"
            description={<p>Nicht als abstrakte Funktion, sondern als nachvollziehbarer Ablauf mit Auslöser, Systemaktion und möglichem Nutzen.</p>}
          />
          <div className="use-case-preview">
            {useCases.map((useCase) => (
              <article className="use-case-mini" key={useCase.id}>
                <span>{useCase.category.replace("-", " ")}</span>
                <h3>{useCase.title}</h3>
                <p>{useCase.automatedFlow}</p>
              </article>
            ))}
          </div>
          <div className="button-row" style={{ marginTop: "2rem" }}>
            <ButtonLink href="/anwendungsfaelle">Alle Anwendungsfälle mit Ablauf ansehen</ButtonLink>
          </div>
        </Container>
      </section>

      <section className="section">
        <Container>
          <SectionHeader
            eyebrow="Ein Prinzip, viele Prozesse"
            title="Von der manuellen Aufgabe zum automatisierten Ablauf"
            description={<p>Jede Automatisierung wird als nachvollziehbare Kette aufgebaut. Die Inhalte bleiben sichtbar – die Animation unterstützt nur das Verständnis.</p>}
          />
          <ol className="workflow">{workflow.map((step) => <li key={step.title}><h3>{step.title}</h3><p>{step.text}</p></li>)}</ol>
        </Container>
      </section>

      <section className="section section--white section--line">
        <Container>
          <SectionHeader eyebrow="Projektablauf" title="So entsteht Ihre individuelle KI-Lösung" />
          <div className="steps-grid">{approach.map((step) => <article className="step-card" key={step.title}><h3>{step.title}</h3><p>{step.text}</p></article>)}</div>
          <div className="button-row" style={{ marginTop: "2rem" }}><ButtonLink href="/vorgehensweise" variant="secondary">Alle Phasen im Detail</ButtonLink></div>
        </Container>
      </section>

      <section className="section">
        <Container>
          <SectionHeader eyebrow="Vorher / mit KAA" title="Weniger Übergaben per Hand. Mehr Kontrolle im Ablauf." description={<p>Automatisierung soll nicht unsichtbar werden. Sie soll manuelle Brüche reduzieren und zugleich zeigen, was mit einem Vorgang passiert.</p>} />
          <div className="comparison">
            <article className="comparison__panel"><h3>Vorher <span>MANUELL</span></h3><ul>{before.map((item) => <li key={item}>{item}</li>)}</ul></article>
            <article className="comparison__panel comparison__panel--after"><h3>Mit KAA <span>KONTROLLIERT</span></h3><ul>{after.map((item) => <li key={item}>{item}</li>)}</ul></article>
          </div>
        </Container>
      </section>

      <section className="section section--white section--line">
        <Container>
          <SectionHeader eyebrow="Systemintegration" title="In Ihre bestehende Systemlandschaft integrierbar" description={<p>Nach technischer Prüfung können vorhandene Programme, Datenquellen und Kommunikationskanäle in einen gemeinsamen Ablauf eingebunden werden.</p>} />
          <div className="integration-grid">{integrations.map((item) => <div className="integration-item" key={item}><span>{item}</span><i aria-hidden="true" /></div>)}</div>
          <p className="integration-statement">Nicht jedes bestehende System muss ersetzt werden. Häufig entsteht der größte Nutzen, wenn vorhandene Programme sinnvoll miteinander verbunden werden.</p>
          <p style={{ color: "var(--muted)", fontSize: ".82rem" }}>Eine Anbindung setzt geeignete Schnittstellen, Berechtigungen und eine technische Prüfung des jeweiligen Systems voraus.</p>
        </Container>
      </section>

      <CtaSection />
    </>
  );
}

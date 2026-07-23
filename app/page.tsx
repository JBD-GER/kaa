import type { Metadata } from "next";
import Link from "next/link";
import { CtaSection } from "@/components/cta-section";
import { FaqAccordion } from "@/components/faq-accordion";
import { JsonLd } from "@/components/json-ld";
import { ProcessVisualization } from "@/components/process-visualization";
import { ServiceOverview } from "@/components/service-overview";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { homeFaqs } from "@/content/faqs";
import { services } from "@/content/services";
import { useCases } from "@/content/use-cases";
import { absoluteUrl, createMetadata, faqJsonLd } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "KI-Automatisierungs-Agentur für Unternehmen",
  description:
    "KAA automatisiert wiederkehrende Aufgaben, verbindet bestehende Systeme und entwickelt kontrollierbare KI-Lösungen für Unternehmen.",
  path: "/",
});

const frictionPoints = [
  {
    area: "Kommunikation",
    text: "E-Mails werden einzeln gelesen, sortiert und weitergeleitet.",
  },
  {
    area: "Dokumente",
    text: "Informationen werden aus PDFs und Formularen per Hand übertragen.",
  },
  {
    area: "Systeme",
    text: "Dieselben Daten werden in mehreren Programmen erneut erfasst.",
  },
  {
    area: "Wissen",
    text: "Mitarbeiter suchen lange nach der richtigen, aktuellen Information.",
  },
  {
    area: "Vertrieb",
    text: "Anfragen, Termine und Nachfassaktionen bleiben im Tagesgeschäft liegen.",
  },
  {
    area: "Freigaben",
    text: "Rückfragen und Entscheidungen verteilen sich über Postfächer und Chats.",
  },
];

const analysisPoints = [
  "Auslöser und gewünschtes Ergebnis",
  "benötigte Informationen und Datenqualität",
  "beteiligte Programme und Schnittstellen",
  "Regeln, Ausnahmen und Zuständigkeiten",
  "notwendige Prüfungen und Freigaben",
  "Nutzen, Aufwand und sinnvolle Ausbaustufen",
];

const outcomes = [
  "weniger wiederkehrende Handarbeit",
  "schnellere, einheitliche Bearbeitung",
  "strukturierte und auffindbare Informationen",
  "nachvollziehbare Übergaben zwischen Systemen",
  "menschliche Kontrolle an wichtigen Stellen",
  "eine Lösung, die kontrolliert erweitert werden kann",
];

const approach = [
  {
    title: "Ablauf verstehen",
    text: "Wir betrachten die tatsächliche Arbeit, nicht nur das gewünschte Tool.",
  },
  {
    title: "Potenzial bewerten",
    text: "Nutzen, Machbarkeit, Daten, Risiken und Schnittstellen werden eingeordnet.",
  },
  {
    title: "Lösung entwerfen",
    text: "Auslöser, Systemaktionen, Regeln und Kontrollpunkte werden sichtbar geplant.",
  },
  {
    title: "Systeme verbinden",
    text: "Die Lösung wird entwickelt und in die vorhandene Umgebung integriert.",
  },
  {
    title: "Realistisch testen",
    text: "Normale Fälle, Ausnahmen und Übergaben werden vor der Einführung geprüft.",
  },
  {
    title: "Kontrolliert verbessern",
    text: "Nach dem Start wird der Ablauf beobachtet, optimiert und sinnvoll erweitert.",
  },
];

const before = [
  "Informationen kopieren",
  "Postfächer einzeln prüfen",
  "Daten mehrfach eingeben",
  "Zuständigkeiten nachfragen",
  "Nachfassaktionen merken",
  "Status manuell zusammentragen",
];

const after = [
  "Informationen automatisch strukturieren",
  "Anliegen passend zuordnen",
  "Daten kontrolliert übertragen",
  "Aufgaben automatisch anlegen",
  "Fällige Schritte sichtbar machen",
  "Ausnahmen gezielt übergeben",
];

const integrations = [
  "E-Mail",
  "CRM",
  "Kalender",
  "Telefonie",
  "Buchhaltung",
  "Dokumentenmanagement",
  "Onlineshop",
  "Formulare",
  "Cloud-Speicher",
  "Datenbanken",
  "Projektmanagement",
  "Kommunikationsplattformen",
];

const featuredUseCases = useCases
  .filter((useCase) => useCase.featured)
  .slice(0, 6);

export default function HomePage() {
  const pageUrl = absoluteUrl();
  const pageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${pageUrl}/#webpage`,
    url: pageUrl,
    name: "KI-Automatisierungs-Agentur für Unternehmen",
    description:
      "KAA entwickelt individuelle KI-Lösungen und Prozessautomatisierungen für Unternehmen.",
    inLanguage: "de-DE",
    isPartOf: { "@id": `${pageUrl}/#website` },
    about: { "@id": `${pageUrl}/#organization` },
    dateModified: "2026-07-23",
  };
  const serviceListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "KI-Leistungen von KAA",
    numberOfItems: services.length,
    itemListElement: services.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Service",
        name: service.name,
        description: service.shortDescription,
        url: absoluteUrl(`/leistungen/${service.slug}`),
        provider: { "@id": `${pageUrl}/#organization` },
      },
    })),
  };

  return (
    <>
      <JsonLd
        data={[pageJsonLd, serviceListJsonLd, faqJsonLd(homeFaqs)]}
      />

      <section className="hero" aria-labelledby="home-hero-title">
        <Container className="hero__inner">
          <div className="hero__copy">
            <p className="hero__status">
              <span aria-hidden="true" />
              Individuelle KI-Systeme · deutschlandweit
            </p>
            <h1 id="home-hero-title">
              <span className="hero__title-primary">
                KI‑Auto&shy;matisierung
              </span>
              <span>für Unter&shy;nehmen,</span>
              <em>die im Alltag mitarbeitet.</em>
            </h1>
            <p className="lead">
              KAA macht aus manuellen Übergaben einen klaren, kontrollierbaren
              Ablauf – von der ersten Information bis zum nächsten sinnvollen
              Schritt in Ihren bestehenden Systemen.
            </p>
            <div className="button-row hero__actions">
              <ButtonLink
                href="/ki-potenzialanalyse"
                variant="light"
                prefetch={false}
              >
                KI-Potenzial prüfen
              </ButtonLink>
              <ButtonLink href="/anwendungsfaelle" variant="ghost">
                Konkrete Abläufe ansehen
              </ButtonLink>
            </div>
            <dl className="hero__principles">
              <div>
                <dt>01</dt>
                <dd>
                  <strong>Prozess zuerst</strong>
                  <span>Wir beginnen bei der echten Aufgabe.</span>
                </dd>
              </div>
              <div>
                <dt>02</dt>
                <dd>
                  <strong>Systeme verbinden</strong>
                  <span>Vorhandene Software bleibt nutzbar.</span>
                </dd>
              </div>
              <div>
                <dt>03</dt>
                <dd>
                  <strong>Kontrolle behalten</strong>
                  <span>Freigaben bleiben bewusst im Ablauf.</span>
                </dd>
              </div>
            </dl>
          </div>
          <div className="hero__visual">
            <ProcessVisualization />
          </div>
          <div className="hero__capability-rail" aria-label="Leistungsspektrum">
            <span>Prozesse verstehen</span>
            <i aria-hidden="true" />
            <span>KI sinnvoll einsetzen</span>
            <i aria-hidden="true" />
            <span>Systeme integrieren</span>
            <i aria-hidden="true" />
            <span>Ergebnisse kontrollieren</span>
          </div>
        </Container>
      </section>

      <section className="signal-section" aria-labelledby="signal-title">
        <Container className="signal-section__inner">
          <p className="eyebrow">Worum es wirklich geht</p>
          <h2 id="signal-title">
            Nicht noch ein Tool.
            <span> Sondern weniger Reibung zwischen Menschen, Daten und Software.</span>
          </h2>
          <div className="signal-section__note">
            <span aria-hidden="true">↳</span>
            <p>
              Wir ersetzen funktionierende Systeme nicht pauschal. Wir
              schließen die manuellen Lücken dazwischen.
            </p>
          </div>
        </Container>
      </section>

      <section className="section section--white friction-section">
        <Container>
          <div className="split-grid">
            <div className="sticky-copy">
              <p className="eyebrow">Der manuelle Zwischenraum</p>
              <h2>Die teuerste Softwarelücke ist oft die Arbeit dazwischen.</h2>
              <p>
                Unternehmen nutzen bereits E-Mail, CRM, Buchhaltung,
                Dokumentenablage und Fachsoftware. Trotzdem wandern
                Informationen per Kopieren, Nachfragen und Erinnern von einem
                Schritt zum nächsten.
              </p>
              <ButtonLink href="/ki-potenzialanalyse" variant="secondary">
                Eigenen Prozess einordnen
              </ButtonLink>
            </div>
            <ol className="friction-list">
              {frictionPoints.map((point, index) => (
                <li key={point.text}>
                  <span className="friction-list__index">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="friction-list__area">{point.area}</span>
                  <p>{point.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </Container>
      </section>

      <section className="section section--dark home-services" id="leistungen">
        <Container>
          <div className="section-heading-grid">
            <SectionHeader
              eyebrow="Sechs Leistungsbereiche"
              title="Eine Architektur für den gesamten Ablauf."
              description={
                <p>
                  Von der Analyse bis zur individuellen Anwendung: Jeder
                  Baustein löst eine konkrete Aufgabe und lässt sich mit den
                  anderen verbinden.
                </p>
              }
              inverse
            />
            <p className="section-heading-grid__aside">
              Beratung · Assistenten · Automatisierung · Wissen · Vertrieb ·
              Software
            </p>
          </div>
          <ServiceOverview />
          <div className="section-link">
            <ButtonLink href="/leistungen" variant="ghost">
              Alle Leistungen im Detail
            </ButtonLink>
          </div>
        </Container>
      </section>

      <section className="section section--blue operating-section">
        <Container>
          <div className="operating-section__intro">
            <p className="eyebrow">Prozess vor Produkt</p>
            <h2>
              Erst verstehen, <em>dann</em> automatisieren.
            </h2>
            <p className="lead">
              Eine belastbare Lösung entsteht nicht aus einer Funktionsliste.
              Sie entsteht, wenn Aufgabe, Informationen, Systeme und
              Entscheidungen gemeinsam betrachtet werden.
            </p>
          </div>
          <div className="operating-board">
            <article className="operating-board__panel">
              <header>
                <span>INPUT / ANALYSE</span>
                <strong>Was wir sichtbar machen</strong>
              </header>
              <ol>
                {analysisPoints.map((point, index) => (
                  <li key={point}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    {point}
                  </li>
                ))}
              </ol>
            </article>
            <div className="operating-board__core" aria-hidden="true">
              <span>KAA</span>
              <i />
              <strong>Prozesslogik</strong>
              <small>prüfen · verbinden · steuern</small>
            </div>
            <article className="operating-board__panel operating-board__panel--result">
              <header>
                <span>OUTPUT / ERGEBNIS</span>
                <strong>Was daraus entstehen kann</strong>
              </header>
              <ol>
                {outcomes.map((outcome, index) => (
                  <li key={outcome}>
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    {outcome}
                  </li>
                ))}
              </ol>
            </article>
          </div>
          <div className="section-link">
            <ButtonLink href="/vorgehensweise" variant="secondary">
              Unsere Vorgehensweise
            </ButtonLink>
          </div>
        </Container>
      </section>

      <section className="section use-cases-section">
        <Container>
          <div className="section-heading-grid">
            <SectionHeader
              eyebrow="Konkrete Anwendungsfälle"
              title="KI wird dann wertvoll, wenn eine echte Aufgabe leichter wird."
              description={
                <p>
                  Sechs typische Abläufe zeigen, wie Informationen erkannt,
                  Systemaktionen vorbereitet und wichtige Entscheidungen beim
                  Menschen belassen werden.
                </p>
              }
            />
            <div className="section-heading-grid__index" aria-hidden="true">
              06
              <span>Prozessbeispiele</span>
            </div>
          </div>
          <div className="use-case-preview">
            {featuredUseCases.map((useCase, index) => (
              <article className="use-case-mini" key={useCase.id}>
                <div className="use-case-mini__meta">
                  <span>{useCase.category.replaceAll("-", " ")}</span>
                  <b>{String(index + 1).padStart(2, "0")}</b>
                </div>
                <h3>
                  <Link href={`/anwendungsfaelle/${useCase.id}`}>
                    {useCase.title}
                  </Link>
                </h3>
                <p>{useCase.automatedFlow}</p>
                <div className="use-case-mini__actions">
                  {useCase.systemActions.slice(0, 3).map((action) => (
                    <span key={action}>{action}</span>
                  ))}
                </div>
                <span className="use-case-mini__link" aria-hidden="true">
                  Ablauf ansehen ↗
                </span>
              </article>
            ))}
          </div>
          <div className="section-link">
            <ButtonLink href="/anwendungsfaelle">
              Alle Anwendungsfälle ansehen
            </ButtonLink>
          </div>
        </Container>
      </section>

      <section className="section section--white roadmap-section">
        <Container>
          <SectionHeader
            eyebrow="Von Aufgabe zu Betrieb"
            title="Ein klarer Weg. Keine Blackbox."
            description={
              <p>
                Jede Phase erzeugt ein prüfbares Ergebnis. So bleibt
                verständlich, was gebaut wird, warum es sinnvoll ist und wie es
                sich im Alltag verhalten soll.
              </p>
            }
          />
          <ol className="roadmap">
            {approach.map((step, index) => (
              <li key={step.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="section transformation-section">
        <Container>
          <SectionHeader
            eyebrow="Vorher / mit KAA"
            title="Weniger Übergaben per Hand. Mehr Klarheit im Prozess."
            description={
              <p>
                Automatisierung macht Arbeit nicht unsichtbar. Sie reduziert
                manuelle Brüche und macht Status, Ausnahmen und Verantwortung
                besser nachvollziehbar.
              </p>
            }
          />
          <div className="comparison">
            <article className="comparison__panel">
              <h3>
                Heute <span>MANUELL</span>
              </h3>
              <ul>
                {before.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
            <div className="comparison__bridge" aria-hidden="true">
              <span>Prozess</span>
              <i>→</i>
              <span>neu gedacht</span>
            </div>
            <article className="comparison__panel comparison__panel--after">
              <h3>
                Mit KAA <span>KONTROLLIERT</span>
              </h3>
              <ul>
                {after.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </div>
        </Container>
      </section>

      <section className="section section--dark integration-section">
        <Container>
          <div className="integration-section__header">
            <div>
              <p className="eyebrow">Systemintegration</p>
              <h2>Ihre Systeme. Ein verbundener Ablauf.</h2>
            </div>
            <p>
              Geeignete Schnittstellen, Berechtigungen und eine technische
              Prüfung vorausgesetzt, verbindet KAA vorhandene Programme und
              Datenquellen zu einer nachvollziehbaren Prozesskette.
            </p>
          </div>
          <div className="integration-grid">
            {integrations.map((item, index) => (
              <div className="integration-item" key={item}>
                <span>{item}</span>
                <i aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </i>
              </div>
            ))}
          </div>
          <p className="integration-statement">
            Vorhandenes sinnvoll verbinden, statt funktionierende Software
            reflexartig zu ersetzen.
          </p>
        </Container>
      </section>

      <section className="section section--white home-faq">
        <Container>
          <div className="split-grid">
            <div className="sticky-copy">
              <p className="eyebrow">Häufige Fragen</p>
              <h2>Gute Entscheidungen beginnen mit klaren Antworten.</h2>
              <p>
                Möglichkeiten, Aufwand und Betrieb hängen vom tatsächlichen
                Prozess ab. Diese Antworten schaffen eine erste belastbare
                Einordnung.
              </p>
              <ButtonLink href="/haeufige-fragen" variant="secondary">
                Alle Antworten lesen
              </ButtonLink>
            </div>
            <FaqAccordion faqs={homeFaqs} />
          </div>
        </Container>
      </section>

      <CtaSection
        title="Welcher Ablauf kostet Ihr Team jeden Tag unnötig Zeit?"
        text="Beschreiben Sie uns eine konkrete Aufgabe. Wir prüfen, welche Schritte sinnvoll automatisiert werden können, welche Systeme beteiligt sind und wo Kontrolle wichtig bleibt."
      />
    </>
  );
}

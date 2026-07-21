import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { PotentialAnalysisForm } from "@/components/forms/potential-analysis-form";
import { Container } from "@/components/ui/container";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "KI-Potenzialanalyse für Unternehmensprozesse",
  description: "KAA analysiert wiederkehrende Aufgaben, Systeme, Medienbrüche und Kontrollpunkte und prüft, wo KI-Automatisierung sinnvoll sein kann.",
  path: "/ki-potenzialanalyse",
});

const areas = ["wiederkehrende manuelle Aufgaben", "E-Mail-Verarbeitung", "Dokumentenverarbeitung", "Kundenanfragen", "Vertriebsprozesse", "interne Kommunikation", "Wissensmanagement", "Dateneingaben", "Freigaben", "bestehende Software", "Medienbrüche", "häufige Rückfragen"];

export default function PotentialAnalysisPage() {
  const items = [{ label: "Startseite", href: "/" }, { label: "KI-Potenzialanalyse", href: "/ki-potenzialanalyse" }];
  return (
    <>
      <section className="page-hero page-hero--dark">
        <Container><Breadcrumbs items={items} /><div className="page-hero__inner"><div><p className="eyebrow">KI-Potenzialanalyse</p><h1>Welche Prozesse in Ihrem Unternehmen lassen sich automatisieren?</h1><p className="lead">KAA analysiert Ihre bestehenden Abläufe und prüft, wo KI und Automatisierung sinnvoll eingesetzt werden können.</p></div><div className="page-hero__aside"><p>Im Mittelpunkt stehen wiederkehrende Aufgaben, beteiligte Systeme, fachliche Ausnahmen und der Nutzen eines kontrollierten neuen Ablaufs.</p></div></div></Container>
      </section>
      <section className="section section--blue">
        <Container><p className="eyebrow">Mögliche Prüffelder</p><ul className="potential-areas">{areas.map((area, index) => <li key={area}><span>{String(index + 1).padStart(2, "0")}</span>{area}</li>)}</ul></Container>
      </section>
      <section className="section section--white">
        <Container className="form-layout">
          <div className="form-card"><PotentialAnalysisForm /></div>
          <aside className="form-aside"><p className="eyebrow">Ihre Angaben</p><h2 style={{ fontSize: "1.8rem" }}>Je konkreter der heutige Ablauf, desto besser die erste Einordnung.</h2><p>Hilfreich sind ein typischer Auslöser, beteiligte Programme, wiederkehrende manuelle Schritte und das gewünschte Ergebnis. Optionale Felder können Sie offenlassen, wenn die Information noch nicht feststeht.</p><ul className="check-list"><li>Keine fertige KI-Idee erforderlich</li><li>Alle sechs Leistungsbereiche auswählbar</li><li>Kontrollpunkte und Ausnahmen mitdenken</li><li>Sichtbare Rückmeldung nach dem Versand</li></ul><p style={{ marginTop: "1.5rem", color: "var(--muted)", fontSize: ".76rem" }}>Die Anfrage ist noch keine pauschale Eignungs- oder Einsparungszusage. Die Bewertung erfolgt anhand der konkreten Informationen.</p></aside>
        </Container>
      </section>
    </>
  );
}

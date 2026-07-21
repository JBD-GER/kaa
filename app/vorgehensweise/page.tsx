import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CtaSection } from "@/components/cta-section";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Vorgehensweise: von der Prozessanalyse zur KI-Lösung",
  description: "So entwickelt KAA individuelle KI-Automatisierungen: Erstgespräch, Prozessanalyse, Konzept, Entwicklung, Test, Einführung und Weiterentwicklung.",
  path: "/vorgehensweise",
});

const phases = [
  { title: "Erstgespräch", short: "Ziele, Probleme und bestehende Abläufe verstehen.", detail: "Wir klären, welche Aufgabe heute Aufwand verursacht, wer beteiligt ist und was ein sinnvoller nächster Zustand wäre. Das Gespräch dient der Einordnung – noch nicht der vorschnellen Festlegung auf ein Tool." },
  { title: "Prozessanalyse", short: "Aufgaben, Systeme, Datenquellen und Verantwortlichkeiten aufnehmen.", detail: "Der Ist-Ablauf wird mit Auslösern, Eingaben, Entscheidungen, Übergaben, Ausnahmen und beteiligten Programmen beschrieben. Offene technische oder fachliche Fragen werden sichtbar." },
  { title: "Lösungskonzept", short: "Automatisierung, Schnittstellen, Freigaben und Kontrollpunkte definieren.", detail: "Wir bestimmen, welche Schritte automatisch laufen können, wo eine menschliche Prüfung bleibt und wie unsichere Fälle behandelt werden. Der Soll-Ablauf wird verständlich dokumentiert." },
  { title: "Entwicklung", short: "Technische Umsetzung der individuellen Lösung.", detail: "Schnittstellen, Datenverarbeitung, Benutzeroberflächen und KI-Funktionen werden modular umgesetzt. Dabei entstehen keine isolierten Experimente, sondern ein in den Zielablauf integrierbarer Softwarestand." },
  { title: "Testphase", short: "Reale Anwendungsfälle prüfen und Fehlerfälle berücksichtigen.", detail: "Neben typischen Fällen prüfen wir unvollständige Angaben, unerwartete Formate, technische Ausfälle und Übergaben. Fachliche Rückmeldungen fließen kontrolliert in die Lösung ein." },
  { title: "Einführung", short: "Kontrollierte Übergabe und Dokumentation.", detail: "Die Lösung wird schrittweise in den vorgesehenen Betrieb überführt. Verantwortliche erhalten eine verständliche Dokumentation zu Ablauf, Kontrollpunkten und bekannten Grenzen." },
  { title: "Betrieb und Weiterentwicklung", short: "Überwachung, Optimierung und mögliche Erweiterungen.", detail: "Nach der Einführung können Qualität, Fehlerwege und technische Stabilität beobachtet werden. Erweiterungen folgen dem realen Bedarf und werden vorab auf Auswirkungen geprüft." },
];

export default function ProcessPage() {
  const items = [{ label: "Startseite", href: "/" }, { label: "Vorgehensweise", href: "/vorgehensweise" }];
  return (
    <>
      <section className="page-hero">
        <Container>
          <Breadcrumbs items={items} />
          <div className="page-hero__inner"><div><p className="eyebrow">Vorgehensweise</p><h1>Aus einer manuellen Aufgabe wird ein kontrollierter Ablauf.</h1></div><div className="page-hero__aside"><p>Projektumfang und genauer Ablauf variieren je nach Lösung. Diese sieben Phasen schaffen einen belastbaren Rahmen, werden aber sinnvoll an Prozess, Risiko und Systemlandschaft angepasst.</p></div></div>
        </Container>
      </section>

      <section className="section">
        <Container>
          <SectionHeader eyebrow="Sieben Phasen" title="Vom ersten Verständnis bis zur Weiterentwicklung" description={<p>Jede Phase liefert eine klare Entscheidungsgrundlage für die nächste. Umfangreiche Projekte können phasenweise umgesetzt werden; eng begrenzte Aufgaben lassen sich entsprechend kompakter strukturieren.</p>} />
          <ol className="phase-list">
            {phases.map((phase, index) => <li key={phase.title}><span className="phase-list__number">0{index + 1}</span><div><p className="eyebrow">Phase {index + 1}</p><h2>{phase.title}</h2></div><div><strong>{phase.short}</strong><p>{phase.detail}</p></div></li>)}
          </ol>
        </Container>
      </section>

      <section className="section section--dark">
        <Container><div className="split-grid"><div><p className="eyebrow">Kontrollpunkte</p><h2>Automatisierung bleibt verständlich.</h2></div><div><ul className="check-list"><li>Verantwortlichkeiten werden im Soll-Ablauf festgelegt.</li><li>Unsichere Fälle erhalten einen definierten Ausnahmeweg.</li><li>Freigaben bleiben erhalten, wenn sie fachlich oder rechtlich nötig sind.</li><li>Erweiterungen werden auf Auswirkungen und Wartbarkeit geprüft.</li></ul></div></div></Container>
      </section>
      <CtaSection title="Welcher Prozess soll leichter werden?" text="Im ersten Schritt reicht eine Beschreibung der heutigen Aufgabe. Daraus lässt sich ableiten, welche Analyse sinnvoll ist und wie ein realistischer Projektablauf aussehen kann." />
    </>
  );
}

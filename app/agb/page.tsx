import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Container } from "@/components/ui/container";
import { company } from "@/config/site";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Allgemeine Geschäftsbedingungen",
  description:
    "Allgemeine Geschäftsbedingungen der KAA für KI-Beratung, Automatisierung und individuelle Softwarelösungen.",
  path: "/agb",
});

export default function TermsPage() {
  const items = [
    { label: "Startseite", href: "/" },
    { label: "AGB", href: "/agb" },
  ];

  return (
    <>
      <section className="page-hero">
        <Container>
          <Breadcrumbs items={items} />
          <div className="page-hero__inner">
            <div>
              <p className="eyebrow">Rechtliches</p>
              <h1>Allgemeine Geschäftsbedingungen</h1>
            </div>
            <div className="page-hero__aside">
              <p>
                Vertragsbedingungen für KI-Beratung, Prozessautomatisierung,
                Systemintegration und individuelle Softwareentwicklung durch
                KAA.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="section section--white">
        <Container>
          <div className="legal-layout">
            <aside>
              <div className="legal-note legal-note--neutral">
                <strong>Stand</strong>
                <br />
                21. Juli 2026
                <br />
                <br />
                Gilt ausschließlich gegenüber Unternehmen.
              </div>
            </aside>

            <div className="legal-content">
              <section>
                <h2>1. Anbieter und Geltungsbereich</h2>
                <p>
                  Diese Allgemeinen Geschäftsbedingungen gelten für Verträge
                  zwischen der {company.legalName}, handelnd unter der Marke KAA
                  – KI-Automatisierungs-Agentur, {company.street},{" "}
                  {company.postalCode} {company.city} („KAA“), und ihren Kunden.
                </p>
                <p>
                  Das Angebot richtet sich ausschließlich an Unternehmer im
                  Sinne des § 14 BGB, juristische Personen des öffentlichen
                  Rechts und öffentlich-rechtliche Sondervermögen. Abweichende
                  Bedingungen des Kunden gelten nur, wenn KAA ihnen ausdrücklich
                  in Textform zugestimmt hat.
                </p>
                <p>
                  Individuelle Angebote, Leistungsbeschreibungen und
                  Projektvereinbarungen gehen diesen AGB im Fall eines
                  Widerspruchs vor.
                </p>
              </section>

              <section>
                <h2>2. Vertragsschluss</h2>
                <p>
                  Darstellungen auf der Website sind unverbindlich. Ein Vertrag
                  kommt durch Annahme eines individuellen Angebots, durch eine
                  beiderseitige Vereinbarung in Textform oder durch Beginn der
                  Leistung auf ausdrücklichen Wunsch des Kunden zustande.
                  Angebote sind für die dort angegebene Frist bindend; fehlt
                  eine Angabe, gilt eine Bindungsfrist von 14 Kalendertagen.
                </p>
              </section>

              <section>
                <h2>3. Leistungen</h2>
                <p>
                  Art und Umfang der Leistungen ergeben sich aus dem jeweiligen
                  Angebot oder der Leistungsbeschreibung. Mögliche Leistungen
                  sind insbesondere Analyse und Beratung, Konzeption,
                  Prototyping, Entwicklung, Konfiguration, Systemintegration,
                  Datenverarbeitung, Dokumentation, Schulung, Wartung und
                  technischer Betrieb.
                </p>
                <p>
                  Soweit nicht ausdrücklich ein bestimmter Erfolg vereinbart
                  wird, schuldet KAA eine fachgerechte Dienstleistung. Bei
                  werkvertraglichen Leistungen gelten zusätzlich die Regelungen
                  zur Abnahme in Ziffer 8.
                </p>
              </section>

              <section>
                <h2>4. Projektorganisation und Änderungen</h2>
                <p>
                  Ansprechpartner, Arbeitspakete, Meilensteine und
                  Abstimmungswege können im Angebot oder Projektplan festgelegt
                  werden. Bei iterativen Projekten werden Anforderungen im
                  vereinbarten Verfahren konkretisiert und priorisiert.
                </p>
                <p>
                  Änderungswünsche, die den vereinbarten Umfang, Aufwand oder
                  Zeitplan beeinflussen, werden vor Umsetzung hinsichtlich ihrer
                  Auswirkungen abgestimmt. Zusätzliche Leistungen werden nach
                  vereinbarter Vergütung oder, wenn eine solche fehlt, nach dem
                  angebotenen Zeitaufwand abgerechnet.
                </p>
              </section>

              <section>
                <h2>5. Mitwirkungspflichten des Kunden</h2>
                <p>
                  Der Kunde stellt rechtzeitig alle für das Projekt benötigten
                  Informationen, Entscheidungen, Testdaten, Zugänge,
                  Schnittstellendokumentationen und fachlichen Ansprechpartner
                  bereit. Er prüft Zwischenergebnisse innerhalb angemessener
                  Frist und meldet erkennbare Fehler nachvollziehbar.
                </p>
                <p>
                  Der Kunde ist für die Rechtmäßigkeit der von ihm
                  bereitgestellten Daten, Inhalte, Weisungen und Nutzungsrechte
                  verantwortlich. Produktive Zugangsdaten sind auf sicheren
                  Wegen zu übermitteln und dürfen nicht in allgemein
                  zugänglichen Projektunterlagen hinterlegt werden.
                </p>
                <p>
                  Verzögerungen oder Mehraufwand aufgrund nicht rechtzeitig oder
                  nicht vollständig erbrachter Mitwirkung verlängern vereinbarte
                  Fristen angemessen und können gesondert berechnet werden, wenn
                  KAA den Kunden auf die benötigte Mitwirkung hingewiesen hat.
                </p>
              </section>

              <section>
                <h2>6. Drittanbieter und Schnittstellen</h2>
                <p>
                  Leistungen können von der Verfügbarkeit und den Bedingungen
                  externer Systeme, KI-Modelle, APIs, Cloud- oder
                  Softwareanbieter abhängen. Gebühren solcher Anbieter sind nur
                  enthalten, wenn dies ausdrücklich vereinbart ist. Änderungen,
                  Einschränkungen oder Ausfälle externer Dienste liegen
                  außerhalb des Einflussbereichs von KAA; KAA informiert den
                  Kunden über erkennbare wesentliche Auswirkungen und stimmt
                  sinnvolle Anpassungen mit ihm ab.
                </p>
                <p>
                  KAA darf geeignete Unterauftragnehmer einsetzen, bleibt dem
                  Kunden gegenüber jedoch für die vertragsgemäße Leistung
                  verantwortlich.
                </p>
              </section>

              <section>
                <h2>7. Termine und höhere Gewalt</h2>
                <p>
                  Termine sind nur verbindlich, wenn sie ausdrücklich als
                  verbindlich bezeichnet wurden. Leistungsfristen beginnen erst,
                  wenn der Kunde die erforderlichen Mitwirkungen erbracht hat.
                  Ereignisse außerhalb des zumutbaren Einflussbereichs einer
                  Partei – insbesondere Ausfälle kritischer Infrastruktur,
                  Cyberangriffe, behördliche Maßnahmen oder vergleichbare Fälle
                  höherer Gewalt – verlängern betroffene Fristen um die Dauer
                  der Beeinträchtigung zuzüglich einer angemessenen
                  Wiederanlaufzeit. Die Parteien informieren sich hierüber
                  unverzüglich.
                </p>
              </section>

              <section>
                <h2>8. Abnahme werkvertraglicher Leistungen</h2>
                <p>
                  Soweit eine Abnahme vereinbart oder gesetzlich vorgesehen ist,
                  stellt KAA die Leistung nach Fertigstellung zur Prüfung
                  bereit. Der Kunde prüft sie innerhalb angemessener Frist
                  anhand der vereinbarten Abnahmekriterien. Wegen unwesentlicher
                  Mängel darf die Abnahme nicht verweigert werden. Festgestellte
                  Mängel sind mit einer nachvollziehbaren Beschreibung
                  mitzuteilen. Im Übrigen gelten die gesetzlichen Abnahmeregeln.
                </p>
              </section>

              <section>
                <h2>9. Vergütung und Zahlungsbedingungen</h2>
                <p>
                  Vergütung, Abrechnungsmodell und gegebenenfalls
                  Zahlungsmeilensteine ergeben sich aus dem Angebot. Alle Preise
                  verstehen sich zuzüglich gesetzlicher Umsatzsteuer.
                  Reisekosten und sonstige Auslagen werden nur berechnet, soweit
                  dies vereinbart oder vom Kunden vorab freigegeben wurde.
                </p>
                <p>
                  Rechnungen sind innerhalb von 14 Kalendertagen ab Zugang ohne
                  Abzug fällig, sofern die Rechnung keine andere Frist nennt.
                  Bei Zahlungsverzug gelten die gesetzlichen Regelungen. KAA
                  kann weitere Leistungen nach vorheriger Ankündigung aussetzen,
                  wenn fällige, unbestrittene Forderungen trotz Mahnung nicht
                  beglichen werden.
                </p>
              </section>

              <section>
                <h2>10. Nutzungsrechte</h2>
                <p>
                  Nach vollständiger Zahlung erhält der Kunde die im Angebot
                  bestimmten Nutzungsrechte an den individuell für ihn
                  erstellten Arbeitsergebnissen. Fehlt eine ausdrückliche
                  Regelung, erhält er ein einfaches, zeitlich und räumlich
                  unbeschränktes Recht, die übergebenen Ergebnisse für den
                  vertraglich vorausgesetzten eigenen Geschäftszweck zu nutzen.
                </p>
                <p>
                  Vorbestehende Werkzeuge, Bibliotheken, Methoden, Templates und
                  allgemein wiederverwendbare Bausteine von KAA verbleiben bei
                  KAA; der Kunde erhält daran die für die Nutzung des
                  Arbeitsergebnisses erforderlichen Rechte. Für Open-Source- und
                  Drittsoftware gelten ergänzend deren jeweilige
                  Lizenzbedingungen.
                </p>
              </section>

              <section>
                <h2>11. KI-gestützte Funktionen</h2>
                <p>
                  Ausgaben KI-gestützter Systeme können trotz sorgfältiger
                  Konzeption unvollständig, mehrdeutig oder sachlich falsch
                  sein. KAA schuldet die vereinbarten Prüf-, Schutz- und
                  Qualitätsmaßnahmen, nicht jedoch eine darüber hinausgehende
                  Fehlerfreiheit probabilistischer Modellausgaben. Der Kunde
                  stellt sicher, dass Ausgaben vor rechtlich, finanziell,
                  personell oder anderweitig wesentlichen Entscheidungen durch
                  fachlich geeignete Personen geprüft werden, sofern keine
                  abweichende kontrollierte Freigabelogik vereinbart ist.
                </p>
              </section>

              <section>
                <h2>12. Mängel</h2>
                <p>
                  Für Mängel gelten die gesetzlichen Vorschriften. Der Kunde
                  beschreibt einen Mangel so konkret wie möglich und stellt die
                  für die Reproduktion erforderlichen Informationen bereit. KAA
                  ist zunächst Gelegenheit zur Nacherfüllung innerhalb
                  angemessener Frist zu geben. Kein Mangel liegt vor, soweit
                  eine Beeinträchtigung auf nicht freigegebenen Änderungen des
                  Kunden, ungeeigneter Systemumgebung oder nicht vertragsgemäßer
                  Nutzung beruht und KAA die Ursache nicht zu vertreten hat.
                </p>
              </section>

              <section>
                <h2>13. Haftung</h2>
                <p>
                  KAA haftet unbeschränkt bei Vorsatz und grober Fahrlässigkeit,
                  bei schuldhafter Verletzung von Leben, Körper oder Gesundheit,
                  nach dem Produkthaftungsgesetz sowie im Umfang einer
                  ausdrücklich übernommenen Garantie.
                </p>
                <p>
                  Bei leicht fahrlässiger Verletzung einer wesentlichen
                  Vertragspflicht ist die Haftung auf den bei Vertragsschluss
                  vorhersehbaren, vertragstypischen Schaden begrenzt.
                  Wesentliche Vertragspflichten sind solche, deren Erfüllung die
                  ordnungsgemäße Durchführung des Vertrags erst ermöglicht und
                  auf deren Einhaltung der Kunde regelmäßig vertrauen darf. Im
                  Übrigen ist die Haftung für leichte Fahrlässigkeit
                  ausgeschlossen.
                </p>
                <p>
                  Die vorstehenden Beschränkungen gelten auch zugunsten der
                  gesetzlichen Vertreter, Mitarbeitenden und Erfüllungsgehilfen
                  von KAA. Für Datenverlust haftet KAA im Rahmen dieser
                  Regelungen nur in Höhe des typischen
                  Wiederherstellungsaufwands, der bei ordnungsgemäßer
                  Datensicherung durch den Kunden entstanden wäre.
                </p>
              </section>

              <section>
                <h2>14. Vertraulichkeit und Datenschutz</h2>
                <p>
                  Beide Parteien behandeln nicht allgemein bekannte
                  geschäftliche, technische und organisatorische Informationen
                  der jeweils anderen Partei vertraulich und verwenden sie nur
                  zur Vertragsdurchführung. Gesetzliche Offenlegungspflichten
                  bleiben unberührt.
                </p>
                <p>
                  Die Parteien beachten die anwendbaren Datenschutzvorschriften.
                  Verarbeitet KAA personenbezogene Daten im Auftrag des Kunden,
                  schließen die Parteien vor Beginn der Verarbeitung eine
                  Vereinbarung zur Auftragsverarbeitung, soweit gesetzlich
                  erforderlich.
                </p>
              </section>

              <section>
                <h2>15. Laufzeit und Kündigung</h2>
                <p>
                  Laufzeit und ordentliche Kündigungsfristen von
                  Dauerschuldverhältnissen ergeben sich aus dem Angebot. Fehlt
                  dort eine Regelung, können unbefristete Dienstleistungs- oder
                  Wartungsverträge mit einer Frist von vier Wochen zum
                  Monatsende gekündigt werden. Das Recht zur außerordentlichen
                  Kündigung aus wichtigem Grund bleibt unberührt. Kündigungen
                  bedürfen der Textform.
                </p>
              </section>

              <section>
                <h2>16. Schlussbestimmungen</h2>
                <p>
                  Es gilt deutsches Recht unter Ausschluss des UN-Kaufrechts.
                  Ist der Kunde Kaufmann, eine juristische Person des
                  öffentlichen Rechts oder ein öffentlich-rechtliches
                  Sondervermögen, ist ausschließlicher Gerichtsstand für
                  Streitigkeiten aus dem Vertragsverhältnis der Sitz von KAA.
                  KAA bleibt berechtigt, am allgemeinen Gerichtsstand des Kunden
                  zu klagen.
                </p>
                <p>
                  Sollten einzelne Bestimmungen unwirksam sein oder werden,
                  bleibt die Wirksamkeit der übrigen Bestimmungen unberührt. An
                  die Stelle der unwirksamen Bestimmung treten die gesetzlichen
                  Vorschriften.
                </p>
                <p>
                  Fragen zu diesen AGB richten Sie an{" "}
                  <a href={`mailto:${company.email}`}>{company.email}</a>.
                </p>
              </section>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

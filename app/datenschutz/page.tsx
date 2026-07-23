import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CookieSettingsTrigger } from "@/components/consent/cookie-settings-trigger";
import { Container } from "@/components/ui/container";
import { company } from "@/config/site";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Datenschutz",
  description:
    "Informationen zur Verarbeitung personenbezogener Daten auf der Website der KAA.",
  path: "/datenschutz",
});

export default function PrivacyPage() {
  const items = [
    { label: "Startseite", href: "/" },
    { label: "Datenschutz", href: "/datenschutz" },
  ];

  return (
    <>
      <section className="page-hero">
        <Container>
          <Breadcrumbs items={items} />
          <div className="page-hero__inner">
            <div>
              <p className="eyebrow">Rechtliches</p>
              <h1>Datenschutzerklärung</h1>
            </div>
            <div className="page-hero__aside">
              <p>
                Hier erfahren Sie, welche personenbezogenen Daten beim Besuch
                dieser Website und bei einer Kontaktaufnahme verarbeitet werden.
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
                23. Juli 2026
              </div>
            </aside>

            <div className="legal-content">
              <section>
                <h2>1. Verantwortlicher</h2>
                <p>
                  {company.legalName}
                  <br />
                  {company.street}
                  <br />
                  {company.postalCode} {company.city}
                  <br />
                  {company.country}
                </p>
                <p>
                  Telefon:{" "}
                  <a href={`tel:${company.phone.replace(/\s/g, "")}`}>
                    {company.phone}
                  </a>
                  <br />
                  E-Mail:{" "}
                  <a href={`mailto:${company.email}`}>{company.email}</a>
                </p>
              </section>

              <section>
                <h2>2. Allgemeine Hinweise und Rechtsgrundlagen</h2>
                <p>
                  Wir verarbeiten personenbezogene Daten nur, soweit dies für
                  die Bereitstellung dieser Website, die Bearbeitung von
                  Anfragen, die Durchführung vorvertraglicher Maßnahmen oder die
                  Erfüllung eines Vertrags erforderlich ist.
                </p>
                <p>Je nach Verarbeitung stützen wir uns insbesondere auf:</p>
                <ul>
                  <li>
                    Art. 6 Abs. 1 lit. b DSGVO für vorvertragliche Maßnahmen und
                    Verträge,
                  </li>
                  <li>
                    Art. 6 Abs. 1 lit. c DSGVO für rechtliche Verpflichtungen,
                  </li>
                  <li>
                    Art. 6 Abs. 1 lit. f DSGVO für den sicheren, stabilen und
                    wirtschaftlichen Betrieb der Website sowie die Bearbeitung
                    allgemeiner geschäftlicher Kommunikation und
                  </li>
                  <li>
                    Art. 6 Abs. 1 lit. a DSGVO, sofern wir eine Einwilligung
                    einholen.
                  </li>
                </ul>
              </section>

              <section>
                <h2>3. Hosting und Server-Logdateien</h2>
                <p>
                  Diese Website wird über Vercel bereitgestellt. Anbieter ist
                  Vercel Inc., 440 N Barranca Avenue #4133, Covina, CA 91723,
                  USA. Beim Aufruf der Website werden technisch erforderliche
                  Daten verarbeitet. Dazu können IP-Adresse, Datum und Uhrzeit,
                  aufgerufene Ressource, Referrer, Browser-, Betriebssystem- und
                  Geräteinformationen sowie Status- und Fehlerdaten gehören.
                </p>
                <p>
                  Die Verarbeitung dient der Auslieferung, Stabilität,
                  Fehleranalyse und Abwehr von Missbrauch. Rechtsgrundlage ist
                  Art. 6 Abs. 1 lit. f DSGVO. Protokolldaten werden nur so lange
                  aufbewahrt, wie sie für Betrieb und Sicherheit erforderlich
                  sind; bei einem konkreten Sicherheitsvorfall können betroffene
                  Daten bis zur Klärung länger gespeichert werden.
                </p>
                <p>
                  Vercel kann Daten in den USA verarbeiten. Für erforderliche
                  Drittlandübermittlungen werden die anwendbaren Garantien nach
                  Art. 44 ff. DSGVO eingesetzt. Weitere Informationen finden Sie
                  in der{" "}
                  <a
                    href="https://vercel.com/legal/privacy-notice"
                    rel="noreferrer"
                  >
                    Datenschutzerklärung von Vercel
                  </a>
                  .
                </p>
              </section>

              <section>
                <h2>4. Kontaktaufnahme und Formulare</h2>
                <p>
                  Bei einer Kontaktaufnahme per E-Mail, Telefon oder Formular
                  verarbeiten wir Ihre Angaben, um die Anfrage zu prüfen und zu
                  beantworten. In den Formularen können insbesondere Name,
                  Unternehmen, geschäftliche Kontaktdaten, gewünschte Leistung,
                  Nachricht sowie Angaben zu Branche, Unternehmensgröße,
                  Prozessen, eingesetzten Systemen und Zielen verarbeitet
                  werden. Pflicht- und optionale Felder sind jeweils
                  gekennzeichnet.
                </p>
                <p>
                  Für die Missbrauchsabwehr verwendet das Formular ein
                  unsichtbares Honeypot-Feld, eine Herkunftsprüfung, eine
                  Größenbegrenzung und ein Rate-Limit. Hierfür wird aus
                  IP-Adresse und gekürzter Browserkennung ein Hash gebildet, der
                  ausschließlich im Arbeitsspeicher liegt und regulär nach zehn
                  Minuten nicht mehr verwendet wird.
                </p>
                <p>
                  Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, soweit die
                  Anfrage auf einen Vertrag gerichtet ist, andernfalls Art. 6
                  Abs. 1 lit. f DSGVO. Unser berechtigtes Interesse liegt in der
                  Bearbeitung geschäftlicher Anfragen und im Schutz des
                  Formulars vor Missbrauch. Die Bestätigung im Formular
                  dokumentiert, dass Sie diese Datenschutzerklärung zur Kenntnis
                  genommen haben; sie ersetzt keine gesondert erforderliche
                  Einwilligung.
                </p>
              </section>

              <section>
                <h2>5. E-Mail-Versand über Resend</h2>
                <p>
                  Formularanfragen und Eingangsbestätigungen werden über Resend
                  versendet. Anbieter ist Plus Five Five, Inc., 2261 Market
                  Street #5039, San Francisco, CA 94114, USA. Dabei werden die
                  im Formular angegebenen Kontaktdaten und Inhalte sowie
                  Versandmetadaten verarbeitet.
                </p>
                <p>
                  Resend verarbeitet Daten nach eigenen Angaben hauptsächlich in
                  den USA und sieht für Übermittlungen aus dem Europäischen
                  Wirtschaftsraum insbesondere EU-Standardvertragsklauseln vor.
                  Details enthält das{" "}
                  <a href="https://resend.com/legal/dpa" rel="noreferrer">
                    Data Processing Addendum von Resend
                  </a>
                  . Die Rechtsgrundlage entspricht derjenigen der jeweiligen
                  Kontaktaufnahme.
                </p>
              </section>

              <section>
                <h2>6. Cookies, lokale Speicherung und Einwilligungen</h2>
                <p>
                  Die Website speichert Ihre Datenschutz-Auswahl unter dem
                  Schlüssel <code>kaa.cookie-consent</code> im lokalen Speicher
                  Ihres Browsers. Gespeichert werden die Consent-Version, ein
                  Zeitstempel und die gewählten Kategorien. Diese Speicherung
                  ist erforderlich, um Ihre Auswahl zu berücksichtigen. Sie
                  beruht auf § 25 Abs. 2 Nr. 2 TDDDG und Art. 6 Abs. 1 lit. f
                  DSGVO.
                </p>
                <p>
                  Optionale Kategorien sind standardmäßig deaktiviert. Sie
                  können Ihre Auswahl jederzeit mit Wirkung für die Zukunft
                  ändern oder vollständig widerrufen.
                </p>
                <CookieSettingsTrigger>
                  Cookie-Auswahl öffnen
                </CookieSettingsTrigger>
              </section>

              <section>
                <h2>7. Google Ads und Google Tag</h2>
                <p>
                  Nach Ihrer Einwilligung in die Kategorie „Marketing“ laden wir
                  das Google Tag für Google Ads mit der Kennung{" "}
                  <code>AW-18344623572</code>. Anbieter für Nutzer im
                  Europäischen Wirtschaftsraum ist Google Ireland Limited,
                  Gordon House, Barrow Street, Dublin 4, Irland.
                </p>
                <p>
                  Das Tag dient dazu, die Wirksamkeit unserer
                  Google-Ads-Kampagnen zu messen und nachzuvollziehen, ob ein
                  Anzeigenkontakt zu einem Besuch oder einer später
                  eingerichteten Conversion auf unserer Website führt. Dabei
                  können insbesondere IP-Adresse, Zeitpunkt, aufgerufene Seite,
                  Referrer, Browser- und Geräteinformationen, der
                  Einwilligungsstatus sowie vorhandene Anzeigenklick-Kennungen
                  verarbeitet werden. Bei erteilter Einwilligung kann Google
                  außerdem Cookies oder vergleichbare Kennungen auf Ihrem Gerät
                  speichern oder auslesen.
                </p>
                <p>
                  Wir verwenden den Advanced Consent Mode. Das Google Tag wird
                  bei einem Seitenaufruf geladen, die werbebezogenen
                  Consent-Signale stehen jedoch standardmäßig auf „denied“. Ohne
                  Einwilligung setzt oder liest das Tag keine Werbe-Cookies. Es
                  kann cookielose Messimpulse an Google senden. Diese können
                  insbesondere den Einwilligungsstatus, Zeitpunkt,
                  Browserinformationen, Referrer und gekürzte IP-Informationen
                  enthalten. Mit der zusätzlichen Anzeigen-Datenredaktion werden
                  Anzeigenklick-Kennungen bei verweigerter Speicherung weiter
                  reduziert.
                </p>
                <p>
                  Erst nach Ihrer Zustimmung zur Kategorie „Marketing“ werden
                  die werbebezogenen Consent-Signale auf „granted“ gesetzt und
                  die vollständige Google-Ads-Messung freigeschaltet. Bei einer
                  Ablehnung oder einem Widerruf setzen wir die Signale wieder
                  auf „denied“ und entfernen erreichbare, von diesem Dienst
                  gesetzte First-Party-Cookies.
                </p>
                <p>
                  Rechtsgrundlagen sind Ihre Einwilligung nach Art. 6 Abs. 1
                  lit. a DSGVO sowie, soweit Informationen auf Ihrem Endgerät
                  gespeichert oder ausgelesen werden, § 25 Abs. 1 TDDDG. Sie
                  können die Einwilligung jederzeit über die
                  Cookie-Einstellungen mit Wirkung für die Zukunft widerrufen.
                </p>
                <p>
                  Eine Verarbeitung durch Google LLC in den USA und in anderen
                  Drittländern kann nicht ausgeschlossen werden. Weitere
                  Informationen finden Sie in der{" "}
                  <a
                    href="https://policies.google.com/privacy?hl=de"
                    rel="noreferrer"
                  >
                    Datenschutzerklärung von Google
                  </a>
                  , in den{" "}
                  <a
                    href="https://business.safety.google/adscookies/"
                    rel="noreferrer"
                  >
                    Hinweisen zu Cookies für Google-Werbeprodukte
                  </a>{" "}
                  und in den{" "}
                  <a
                    href="https://support.google.com/google-ads/answer/10000067?hl=de"
                    rel="noreferrer"
                  >
                    Informationen zum Google Consent Mode
                  </a>
                  .
                </p>
              </section>

              <section>
                <h2>8. Empfänger</h2>
                <p>
                  Zugriff auf personenbezogene Daten erhalten nur die intern
                  zuständigen Personen und die zur Bereitstellung eingesetzten
                  IT-Dienstleister, soweit dies für den jeweiligen Zweck
                  erforderlich ist. Eine Weitergabe kann außerdem erfolgen, wenn
                  wir gesetzlich dazu verpflichtet sind oder Sie zuvor
                  eingewilligt haben. Wir verkaufen keine personenbezogenen
                  Daten.
                </p>
              </section>

              <section>
                <h2>9. Speicherdauer</h2>
                <p>
                  Wir löschen personenbezogene Daten, sobald der Zweck entfällt
                  und keine gesetzlichen oder vertraglichen Gründe für eine
                  weitere Speicherung bestehen. Allgemeine Anfragen ohne
                  anschließenden Vertrag werden regelmäßig nach abschließender
                  Bearbeitung gelöscht. Soweit Daten zur Abwehr oder
                  Durchsetzung von Ansprüchen benötigt werden, können sie bis
                  zum Ablauf der gesetzlichen Verjährungsfristen gespeichert
                  bleiben. Vertrags- und Abrechnungsunterlagen bewahren wir
                  entsprechend den jeweils geltenden handels- und
                  steuerrechtlichen Fristen auf.
                </p>
              </section>

              <section>
                <h2>10. Ihre Rechte</h2>
                <p>
                  Sie haben im Rahmen der gesetzlichen Voraussetzungen das Recht
                  auf Auskunft, Berichtigung, Löschung, Einschränkung der
                  Verarbeitung und Datenübertragbarkeit. Außerdem können Sie
                  einer Verarbeitung auf Grundlage von Art. 6 Abs. 1 lit. f
                  DSGVO aus Gründen widersprechen, die sich aus Ihrer besonderen
                  Situation ergeben. Eine Einwilligung können Sie jederzeit mit
                  Wirkung für die Zukunft widerrufen. Die Rechtmäßigkeit der bis
                  zum Widerruf erfolgten Verarbeitung bleibt unberührt.
                </p>
                <p>
                  Zur Ausübung Ihrer Rechte genügt eine Nachricht an die unter
                  Ziffer 1 genannte Kontaktadresse. Zur Vermeidung
                  unberechtigter Auskünfte können wir einen Identitätsnachweis
                  verlangen.
                </p>
              </section>

              <section>
                <h2>11. Beschwerderecht</h2>
                <p>
                  Sie können sich bei einer Datenschutzaufsichtsbehörde
                  beschweren. Für unseren Sitz ist insbesondere zuständig:
                </p>
                <p>
                  Der Landesbeauftragte für den Datenschutz Niedersachsen
                  <br />
                  Prinzenstraße 5
                  <br />
                  30159 Hannover
                  <br />
                  <a href="https://www.lfd.niedersachsen.de/" rel="noreferrer">
                    www.lfd.niedersachsen.de
                  </a>
                </p>
              </section>

              <section>
                <h2>12. Automatisierte Entscheidungen</h2>
                <p>
                  Im Zusammenhang mit dieser Website findet keine ausschließlich
                  automatisierte Entscheidungsfindung einschließlich Profiling
                  im Sinne des Art. 22 DSGVO statt.
                </p>
              </section>

              <section>
                <h2>13. Datensicherheit</h2>
                <p>
                  Wir treffen angemessene technische und organisatorische
                  Maßnahmen, um personenbezogene Daten vor Verlust, Missbrauch
                  und unbefugtem Zugriff zu schützen. Die Übertragung dieser
                  Website erfolgt verschlüsselt über HTTPS, soweit sie über die
                  vorgesehene Produktivdomain aufgerufen wird.
                </p>
              </section>

              <section>
                <h2>14. Änderungen dieser Datenschutzerklärung</h2>
                <p>
                  Wir passen diese Erklärung an, wenn sich Funktionen,
                  Dienstleister oder rechtliche Anforderungen ändern. Es gilt
                  die jeweils auf dieser Seite veröffentlichte Fassung.
                </p>
              </section>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

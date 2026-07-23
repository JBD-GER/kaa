# KAA – KI-Automatisierungs-Agentur

Produktionsnahe Unternehmenswebsite für **KAA** auf Basis von Next.js App Router, React, TypeScript und Tailwind CSS. Die Website enthält alle Leistungs-, Unternehmens-, Ratgeber-, Kontakt- und Rechtsseiten sowie ein echtes Consent-System, serverseitig validierte Formulare und eine vollständige SEO-Grundlage.

Die zentrale Domain ist `https://www.ki-automatisierungs-agentur.de`.

> Wichtig vor dem Go-live: E-Mail-Umgebungsvariablen setzen, Absenderdomain verifizieren und Impressum, Datenschutzerklärung sowie AGB anhand der tatsächlichen Verträge und eingesetzten Dienstleister juristisch prüfen lassen.

## Lokal starten

Voraussetzung ist eine aktuelle LTS-Version von Node.js und npm.

```bash
npm install
cp .env.example .env.local
npm run dev
```

Die Website ist anschließend unter `http://localhost:3000` erreichbar.

Produktions-Build und lokale Produktionsvorschau:

```bash
npm run build
npm run start
```

Vollständige technische Prüfung:

```bash
npm run check
```

## Umgebungsvariablen

Die Vorlage liegt in `.env.example`.

| Variable                    | Zweck                                                                          |
| --------------------------- | ------------------------------------------------------------------------------ |
| `NEXT_PUBLIC_SITE_URL`      | Kanonische Website-URL; produktiv `https://www.ki-automatisierungs-agentur.de` |
| `RESEND_API_KEY`            | Geheimer API-Schlüssel für Resend                                              |
| `CONTACT_EMAIL`             | Interne Empfängeradresse für neue Anfragen                                     |
| `FROM_EMAIL`                | Bei Resend verifizierter Absender, inklusive optionalem Anzeigenamen           |
| `NEXT_PUBLIC_BOOKING_URL`   | Optionaler öffentlicher Terminbuchungslink                                     |
| `NEXT_PUBLIC_CONTACT_EMAIL` | Optional sichtbare geschäftliche E-Mail-Adresse                                |
| `NEXT_PUBLIC_CONTACT_PHONE` | Optional sichtbare Telefonnummer                                               |

Geheime Werte niemals in `NEXT_PUBLIC_*`-Variablen oder den Quellcode eintragen. Ohne E-Mail-Konfiguration simuliert die API den Versand ausschließlich in der lokalen Entwicklungsumgebung. In Produktion antwortet sie sichtbar mit Status 503; eine Anfrage verschwindet dadurch nicht unbemerkt.

## Auf Vercel veröffentlichen

1. Repository in Vercel importieren.
2. Framework-Preset **Next.js** verwenden.
3. Alle benötigten Umgebungsvariablen für Production und Preview setzen.
4. Die Absenderdomain in Resend verifizieren.
5. Domain `ki-automatisierungs-agentur.de` dem Projekt zuordnen.
6. `npm run check` vor dem Deployment ausführen.
7. Nach Deployment Formulare, Bestätigungsmail, interne Mail, Canonicals, `robots.txt` und `sitemap.xml` prüfen.

Für mehrere parallele Serverless-Instanzen sollte das vorhandene In-Memory-Rate-Limit vor hohem Anfragevolumen durch einen zentralen Store oder einen passenden Schutz auf Plattformebene ergänzt werden. Honeypot, Body-Limit, Origin-Prüfung und serverseitige Validierung greifen unabhängig davon.

## Zentrale Inhalte verwalten

### Unternehmens- und Kontaktdaten

`config/site.ts` enthält Domain, Marke, Consent-Version, Navigation sowie die zentral verwendeten Unternehmens-, Kontakt- und Registerdaten. Die Angaben werden in Impressum, Datenschutz, AGB, Footer, Kontaktseite und strukturierten Daten wiederverwendet. Optionale Social-Media-Profile und Terminlinks werden nur angezeigt, wenn sie konfiguriert sind.

### Leistungen

`content/services.ts` ist die einzige Inhaltsquelle für die exakt sechs Leistungsnamen und verbindlichen Kurzbeschreibungen. Die Daten werden für Startseite, Übersichtsseite, Detailseiten, Navigation, Footer, Formulare, strukturierte Daten und Sitemap wiederverwendet.

Keine siebte Leistung ergänzen und die verbindlichen Kurzbeschreibungen nicht lokal in Seiten duplizieren oder umformulieren.

### Navigation

Die Haupt-, Unternehmens- und Rechtsnavigation liegt ebenfalls in `config/site.ts`. Die sechs Links im Mega-Menü und im Footer werden direkt aus `content/services.ts` erzeugt.

## Ratgeber verwalten

Alle Artikel liegen strukturiert und typisiert in `content/articles.ts`. Ein Artikel enthält:

- Slug, Titel, Kategorie und Einleitung
- Veröffentlichungs- und Aktualisierungsdatum
- Organisationsautor und Lesezeit
- individuellen SEO-Titel und Beschreibung
- H2-/H3-Abschnitte mit Text, Listen, Beispielen und Hinweisen
- sichtbare FAQs
- verknüpfte Leistungen und CTA

Für einen neuen Artikel:

1. Ein neues Objekt in `articles` ergänzen.
2. Einen eindeutigen Kleinbuchstaben-Slug verwenden.
3. Nur eine der zentral definierten Kategorien wählen.
4. Mindestens eine passende Leistung verknüpfen.
5. Inhalt, FAQ, SEO-Daten und Datumsangaben vollständig pflegen.
6. `npm run check` ausführen und `/ratgeber/[slug]` sowie die Sitemap prüfen.

Die Artikel werden serverseitig gerendert und über `generateStaticParams` statisch erzeugt. Inhaltsverzeichnis, Breadcrumbs, Article-/BlogPosting- und FAQ-Strukturdaten entstehen aus derselben Quelle wie der sichtbare Inhalt.

## Formulare und E-Mail-Versand testen

Die Formulare liegen in `components/forms`; die gemeinsamen Zod-Schemas in `lib/validation.ts`. Die API-Route `app/api/contact/route.ts` validiert unabhängig vom Browser erneut.

Implementiert sind:

- React Hook Form und clientseitige Zod-Validierung
- serverseitige Zod-Validierung
- Honeypot und Größenbegrenzung
- Origin-Prüfung
- gehashtes Rate-Limit ohne Speicherung von Formularinhalten
- HTML-Escaping für E-Mail-Inhalte
- interne Benachrichtigungsmail und Bestätigungsmail
- Lade-, Fehler- und Erfolgszustände
- Weiterleitung auf die nicht indexierbare Danke-Seite

Zum Testen in einer Preview-Umgebung echte, separat freigegebene Testadressen verwenden. Folgende Fälle prüfen:

- leere und ungültige Pflichtfelder
- alle sieben Leistungsoptionen
- überlange Eingaben
- ausgefülltes Honeypot-Feld
- wiederholte Anfragen bis Status 429
- fehlende Resend-Konfiguration
- erfolgreicher interner Versand und Bestätigungsmail
- sichtbare Fehlermeldung bei Netzwerk- oder Versandfehler

Formularinhalte werden nicht in Serverlogs geschrieben.

## Cookie-Consent konfigurieren

Das Consent-System liegt in `components/consent` und `lib/consent.ts`. Gespeichert werden ausschließlich:

- Consent-Version
- ISO-Zeitstempel
- Auswahl für Notwendig, Statistik, Marketing und Externe Medien

Optionale Kategorien sind standardmäßig deaktiviert. Das Google Ads-Tag `AW-18344623572` ist global mit Advanced Consent Mode eingebunden. Die werbebezogenen Signale stehen standardmäßig auf `denied`; ohne Marketing-Einwilligung arbeitet das Tag ohne Werbe-Cookies, mit cookielosen Messimpulsen und aktivierter Anzeigen-Datenredaktion. Erst nach Zustimmung zur Kategorie „Marketing“ wird die vollständige Messung freigeschaltet. Aktuell sind keine Statistik- oder externen Mediendienste eingebunden.

Bei einem neuen Dienst:

1. Dienst und Datenschutzfolgen juristisch prüfen.
2. Den Loader als kleine Client-Komponente implementieren.
3. Vor jedem Laden `useConsent().hasConsent("statistics" | "marketing" | "externalMedia")` prüfen.
4. Ohne Zustimmung weder Skript, Pixel, iframe noch zugehörige Cookies laden.
5. Widerruf und gegebenenfalls das Entfernen kontrollierbarer Anbieter-Cookies implementieren.
6. Datenschutz- und Cookie-Seite vor Aktivierung ergänzen.
7. Die Consent-Version in `config/site.ts` erhöhen, damit eine neue Entscheidung verlangt wird.

Der dauerhafte Footer-Link und `/cookie-einstellungen` öffnen den Dialog jederzeit erneut.

## Logo und Design anpassen

SVG-Markenassets liegen in `public/brand`:

- horizontale und kompakte Dark-/Light-Varianten
- reine Bildmarke und Mono-Variante
- Navigation-, Footer- und Open-Graph-Logo

Die React-Komponente liegt in `components/brand/logo.tsx`. Favicon und Apple-Touch-Icon liegen als Next-Metadata-Assets in `app/icon.svg` und `app/apple-icon.png`.

Farben, Typografie, Abstände und responsive Regeln werden über CSS-Variablen und Komponentenklassen in `app/globals.css` gesteuert. Die primären Tokens stehen am Dateianfang. Animationen respektieren `prefers-reduced-motion`.

## SEO und Sitemap prüfen

- `lib/seo.ts`: zentrale Metadata- und strukturierte Daten-Helfer
- `app/sitemap.ts`: statische Seiten sowie alle Leistungs-, Anwendungsfall-, Branchen- und Ratgeberseiten
- `app/robots.ts`: Robots-Regeln und Sitemap-Verweis
- `app/opengraph-image.tsx`: serverseitig erzeugtes Social-Preview
- `next.config.ts`: vorbereitete Redirect-Verwaltung und Security-Header

Nach jedem größeren Inhaltsupdate prüfen:

```text
https://www.ki-automatisierungs-agentur.de/robots.txt
https://www.ki-automatisierungs-agentur.de/sitemap.xml
```

Außerdem Canonical, Meta-Titel, Meta-Beschreibung, Open Graph, X-Metadaten, Breadcrumbs und JSON-LD auf Startseite, Leistungsdetailseite, Artikel, FAQ, Kontakt und Über uns kontrollieren.

## Release-Checkliste

- Unternehmens- und Rechtsdaten vollständig und freigegeben
- Rechtstexte juristisch geprüft
- Absenderdomain und Empfängeradresse getestet
- keine Preview- oder Platzhalterwerte in Produktion
- alle internen Links ohne 4xx/5xx
- beide Formulare inklusive Fehlerfällen getestet
- optionale Dienste vor Consent vollständig blockiert
- Widerruf und Consent-Versionswechsel getestet
- Tastaturbedienung, Fokus und 200–400 % Zoom geprüft
- keine horizontale Überbreite bei 320–1920 px
- `npm run check` erfolgreich
- Lighthouse und Screenreader-Smoke-Test auf repräsentativen Seiten durchgeführt

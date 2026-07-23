export const useCaseCategories = [
  { id: "alle", label: "Alle" },
  { id: "kundenservice", label: "Kundenservice" },
  { id: "vertrieb", label: "Vertrieb" },
  { id: "verwaltung", label: "Verwaltung" },
  { id: "dokumente", label: "Dokumente" },
  { id: "internes-wissen", label: "internes Wissen" },
  { id: "personal", label: "Personal" },
  { id: "marketing", label: "Marketing" },
  { id: "management", label: "Management" },
] as const;

export type UseCaseCategory = (typeof useCaseCategories)[number]["id"];

export type UseCase = {
  id: string;
  title: string;
  seoTitle: string;
  category: Exclude<UseCaseCategory, "alle">;
  situation: string;
  automatedFlow: string;
  systemActions: string[];
  benefits: string[];
  serviceSlug: string;
  cta: string;
  featured?: boolean;
};

export const useCases: readonly UseCase[] = [
  {
    id: "anfragen-qualifizieren",
    title: "Kundenanfragen automatisch qualifizieren",
    seoTitle: "Kundenanfragen mit KI automatisch qualifizieren",
    category: "vertrieb",
    situation:
      "Anfragen treffen über Website, E-Mail oder Telefon ein und enthalten häufig noch nicht alle Angaben für die weitere Bearbeitung.",
    automatedFlow:
      "Die KI erkennt das Anliegen, strukturiert die Angaben und fragt bei Bedarf fehlende Informationen ab. Danach wird der nächste Schritt vorbereitet.",
    systemActions: ["Kontakt im CRM anlegen", "Zuständigkeit bestimmen", "Aufgabe erstellen"],
    benefits: ["Vollständigere Anfragen", "Klare Zuständigkeit", "Schnellere Weiterbearbeitung"],
    serviceSlug: "vertriebsautomatisierung",
    cta: "Qualifizierung besprechen",
    featured: true,
  },
  {
    id: "emails-zuordnen",
    title: "Eingehende E-Mails erkennen und zuordnen",
    seoTitle: "E-Mails mit KI erkennen und automatisch zuordnen",
    category: "verwaltung",
    situation:
      "Ein zentrales Postfach enthält Angebote, Supportfragen, Belege und allgemeine Nachrichten, die einzeln geprüft werden.",
    automatedFlow:
      "Inhalt, Absender und Anhänge werden erfasst. Die Nachricht wird kategorisiert und mit einem Bearbeitungsvorschlag an die richtige Stelle geleitet.",
    systemActions: ["Kategorie setzen", "Anhang ablegen", "Aufgabe zuweisen"],
    benefits: ["Weniger manuelle Sortierung", "Klare Übergaben", "Nachvollziehbare Bearbeitung"],
    serviceSlug: "prozessautomatisierung",
    cta: "E-Mail-Prozess prüfen",
    featured: true,
  },
  {
    id: "dokumente-auslesen",
    title: "Daten aus Rechnungen und Dokumenten auslesen",
    seoTitle: "Dokumente mit KI auslesen und Daten prüfen",
    category: "dokumente",
    situation:
      "Angaben aus Rechnungen, Formularen oder Auftragsdokumenten werden manuell in andere Systeme übertragen.",
    automatedFlow:
      "Relevante Felder werden ausgelesen, plausibilisiert und für die Freigabe oder Übertragung strukturiert bereitgestellt.",
    systemActions: ["Felder extrahieren", "Werte prüfen", "Datensatz vorbereiten"],
    benefits: ["Weniger Übertragungsarbeit", "Einheitliche Daten", "Kontrollierbare Prüfung"],
    serviceSlug: "prozessautomatisierung",
    cta: "Dokumentenablauf ansehen",
    featured: true,
  },
  {
    id: "fehlende-daten",
    title: "Fehlende Kundendaten gezielt abfragen",
    seoTitle: "Fehlende Kundendaten automatisch abfragen",
    category: "kundenservice",
    situation:
      "Eine Bearbeitung stockt, weil Pflichtangaben, Unterlagen oder eine eindeutige Auswahl fehlen.",
    automatedFlow:
      "Die vorhandenen Angaben werden gegen definierte Anforderungen geprüft. Nur die tatsächlich fehlenden Informationen werden verständlich angefordert.",
    systemActions: ["Vollständigkeit prüfen", "Rückfrage vorbereiten", "Status aktualisieren"],
    benefits: ["Weniger Rückfrageschleifen", "Klarere Kommunikation", "Vollständigere Vorgänge"],
    serviceSlug: "ki-assistenten",
    cta: "Assistenten besprechen",
  },
  {
    id: "antwortentwuerfe",
    title: "Antwortentwürfe für wiederkehrende Anliegen vorbereiten",
    seoTitle: "KI-Antwortentwürfe für Kundenanfragen erstellen",
    category: "kundenservice",
    situation:
      "Mitarbeiter formulieren ähnliche Antworten immer wieder neu und suchen dafür Informationen in verschiedenen Quellen.",
    automatedFlow:
      "Anliegen und Kontext werden zusammengeführt. Ein Entwurf mit relevanten Informationen wird erstellt und vor dem Versand zur Prüfung vorgelegt.",
    systemActions: ["Kontext abrufen", "Entwurf erstellen", "Freigabe anfordern"],
    benefits: ["Kürzere Vorbereitung", "Einheitliche Qualität", "Menschliche Kontrolle"],
    serviceSlug: "ki-assistenten",
    cta: "Antwortprozess klären",
    featured: true,
  },
  {
    id: "termine-koordinieren",
    title: "Termine koordinieren",
    seoTitle: "Terminkoordination mit KI automatisieren",
    category: "kundenservice",
    situation:
      "Mehrere Nachrichten sind nötig, bis Zweck, Teilnehmer und ein passender Termin geklärt sind.",
    automatedFlow:
      "Der Terminbedarf wird aufgenommen, freie Zeitfenster werden berücksichtigt und eine passende Auswahl wird angeboten.",
    systemActions: ["Verfügbarkeit prüfen", "Termine anbieten", "Kalendereintrag vorbereiten"],
    benefits: ["Weniger Abstimmung", "Vollständige Terminangaben", "Klare Bestätigung"],
    serviceSlug: "ki-assistenten",
    cta: "Terminablauf besprechen",
  },
  {
    id: "crm-aktualisieren",
    title: "CRM-Daten automatisch aktualisieren",
    seoTitle: "CRM-Daten mit KI automatisch aktualisieren",
    category: "vertrieb",
    situation:
      "Kontaktdaten, Gesprächsstände und nächste Schritte werden verspätet oder unvollständig im CRM gepflegt.",
    automatedFlow:
      "Neue Informationen werden aus freigegebenen Quellen strukturiert und dem richtigen Kontakt oder Vorgang zugeordnet.",
    systemActions: ["Datensatz finden", "Felder aktualisieren", "Änderung protokollieren"],
    benefits: ["Aktuellere Datengrundlage", "Weniger Doppelerfassung", "Bessere Nachvollziehbarkeit"],
    serviceSlug: "vertriebsautomatisierung",
    cta: "CRM-Prozess prüfen",
  },
  {
    id: "aufgaben-verteilen",
    title: "Aufgaben an zuständige Mitarbeiter verteilen",
    seoTitle: "Aufgaben mit KI automatisch verteilen",
    category: "verwaltung",
    situation:
      "Neue Vorgänge werden manuell gelesen, bewertet und anhand von Fachgebiet oder Verfügbarkeit weitergeleitet.",
    automatedFlow:
      "Definierte Merkmale und Regeln bestimmen eine passende Zuständigkeit. Sonderfälle gehen an eine zentrale Prüfung.",
    systemActions: ["Vorgang klassifizieren", "Zuständigkeit ermitteln", "Aufgabe anlegen"],
    benefits: ["Klarere Verteilung", "Weniger Liegezeit", "Kontrollierte Ausnahmen"],
    serviceSlug: "prozessautomatisierung",
    cta: "Aufgabenfluss analysieren",
  },
  {
    id: "gespraechsnotizen",
    title: "Gesprächsnotizen zusammenfassen",
    seoTitle: "Gesprächsnotizen mit KI zusammenfassen",
    category: "vertrieb",
    situation:
      "Nach Gesprächen müssen Kernaussagen, Vereinbarungen und nächste Schritte manuell dokumentiert werden.",
    automatedFlow:
      "Ein freigegebenes Transkript wird in Zusammenfassung, Entscheidungen, offene Fragen und Aufgaben gegliedert.",
    systemActions: ["Zusammenfassung erzeugen", "Aufgaben extrahieren", "CRM-Eintrag vorbereiten"],
    benefits: ["Strukturierte Dokumentation", "Sichtbare nächste Schritte", "Prüfung vor Ablage"],
    serviceSlug: "vertriebsautomatisierung",
    cta: "Dokumentation besprechen",
  },
  {
    id: "berichte",
    title: "Wiederkehrende Berichte vorbereiten",
    seoTitle: "Berichte mit KI automatisch vorbereiten",
    category: "management",
    situation:
      "Kennzahlen und Statusinformationen werden regelmäßig aus mehreren Quellen zusammengetragen und formatiert.",
    automatedFlow:
      "Freigegebene Datenquellen werden abgefragt, Werte zusammengeführt und Abweichungen für eine Prüfung hervorgehoben.",
    systemActions: ["Daten abrufen", "Bericht strukturieren", "Prüfhinweise markieren"],
    benefits: ["Weniger Zusammenstellungsarbeit", "Einheitliches Format", "Schnellerer Überblick"],
    serviceSlug: "individuelle-ki-software",
    cta: "Berichtslösung planen",
  },
  {
    id: "wissen-durchsuchen",
    title: "Interne Dokumente gezielt durchsuchen",
    seoTitle: "Interne Dokumente mit KI durchsuchen",
    category: "internes-wissen",
    situation:
      "Richtlinien, Handbücher und Projektunterlagen liegen verteilt; die gültige Antwort ist schwer auffindbar.",
    automatedFlow:
      "Eine Frage wird in berechtigten Quellen gesucht. Die Antwort verweist auf passende Fundstellen und macht Unsicherheit sichtbar.",
    systemActions: ["Berechtigte Quellen suchen", "Antwort formulieren", "Fundstellen anzeigen"],
    benefits: ["Kürzere Suche", "Nachvollziehbare Antworten", "Respektierte Zugriffsrechte"],
    serviceSlug: "wissenssysteme",
    cta: "Wissenssystem planen",
    featured: true,
  },
  {
    id: "onboarding",
    title: "Neue Mitarbeiter beim Onboarding unterstützen",
    seoTitle: "KI-Assistent für das Mitarbeiter-Onboarding",
    category: "personal",
    situation:
      "Neue Mitarbeiter stellen ähnliche Fragen und müssen sich durch viele verstreute Unterlagen arbeiten.",
    automatedFlow:
      "Ein Assistent beantwortet Fragen aus freigegebenen Onboarding-Unterlagen und verweist auf Ansprechpartner, wenn eine Einordnung nötig ist.",
    systemActions: ["Frage einordnen", "Quelle suchen", "Ansprechpartner nennen"],
    benefits: ["Strukturierter Einstieg", "Entlastete Ansprechpartner", "Verfügbare Quellen"],
    serviceSlug: "wissenssysteme",
    cta: "Onboarding-Assistenten prüfen",
  },
  {
    id: "nachfassen",
    title: "Kunden kontrolliert nachfassen",
    seoTitle: "Kunden mit KI kontrolliert nachfassen",
    category: "vertrieb",
    situation:
      "Vereinbarte Rückmeldungen und nächste Schritte werden im Tagesgeschäft übersehen.",
    automatedFlow:
      "Fällige Vorgänge werden anhand definierter Regeln erkannt. Eine passende Erinnerung oder Nachricht wird vorbereitet.",
    systemActions: ["Fälligkeit prüfen", "Entwurf vorbereiten", "Aktivität dokumentieren"],
    benefits: ["Weniger vergessene Schritte", "Relevantes Nachfassen", "Nachvollziehbarer Verlauf"],
    serviceSlug: "vertriebsautomatisierung",
    cta: "Nachfassprozess prüfen",
    featured: true,
  },
  {
    id: "kanaele-zusammenfuehren",
    title: "Anfragen aus Website, Telefon und E-Mail zusammenführen",
    seoTitle: "Kundenanfragen aus mehreren Kanälen bündeln",
    category: "kundenservice",
    situation:
      "Kundenkontakte liegen getrennt in Postfächern, Formularen und Telefonnotizen vor.",
    automatedFlow:
      "Kontakte werden anhand eindeutiger Merkmale einem Vorgang zugeordnet und als gemeinsame Bearbeitungshistorie vorbereitet.",
    systemActions: ["Kanäle erfassen", "Kontakt zuordnen", "Vorgang aktualisieren"],
    benefits: ["Gemeinsamer Kontext", "Weniger Doppelerfassung", "Bessere Übergaben"],
    serviceSlug: "individuelle-ki-software",
    cta: "Kanäle verbinden",
  },
  {
    id: "freigaben",
    title: "Freigabeprozesse digital abbilden",
    seoTitle: "Freigabeprozesse digital automatisieren",
    category: "verwaltung",
    situation:
      "Freigaben laufen über E-Mail, Rückfragen verteilen sich und der aktuelle Status bleibt unklar.",
    automatedFlow:
      "Ein Vorgang wird mit benötigten Informationen an die richtige Freigabestelle geleitet; Entscheidung und Begründung werden protokolliert.",
    systemActions: ["Prüfpaket erstellen", "Freigabe anfordern", "Status protokollieren"],
    benefits: ["Sichtbarer Status", "Klare Verantwortung", "Nachvollziehbare Entscheidungen"],
    serviceSlug: "prozessautomatisierung",
    cta: "Freigabeprozess planen",
  },
  {
    id: "content-recycling",
    title: "Freigegebene Inhalte für mehrere Kanäle aufbereiten",
    seoTitle: "Content mit KI für mehrere Kanäle aufbereiten",
    category: "marketing",
    situation:
      "Ein fachlicher Ausgangstext muss wiederholt für Newsletter, Website oder interne Kommunikation angepasst werden.",
    automatedFlow:
      "Aus einem freigegebenen Inhalt entstehen kanalbezogene Entwürfe entlang definierter Sprach- und Prüfregeln.",
    systemActions: ["Ausgangstext erfassen", "Varianten erstellen", "Freigabe bündeln"],
    benefits: ["Weniger Formatierungsarbeit", "Konsistente Kernaussage", "Prüfung vor Veröffentlichung"],
    serviceSlug: "ki-assistenten",
    cta: "Content-Ablauf besprechen",
  },
] as const;

export function getUseCase(slug: string) {
  return useCases.find((useCase) => useCase.id === slug);
}

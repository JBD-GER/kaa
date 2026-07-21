export type Industry = {
  name: string;
  intro: string;
  examples: string[];
};

export const industries: readonly Industry[] = [
  {
    name: "Handwerk",
    intro: "Anfragen, Dokumente und Terminabstimmungen lassen sich rund um den operativen Betrieb strukturieren.",
    examples: ["Kundenanfragen vorsortieren", "Fehlende Projektinformationen abfragen", "Fotos und Dokumente zuordnen", "Angebotsprozesse vorbereiten"],
  },
  {
    name: "Dienstleistungen",
    intro: "Wiederkehrende Kommunikation und interne Übergaben können ohne starre Standardpakete unterstützt werden.",
    examples: ["Anliegen qualifizieren", "Termine koordinieren", "Leistungsinformationen bereitstellen", "Aufgaben verteilen"],
  },
  {
    name: "E-Commerce",
    intro: "Informationen aus Shop, Support, Logistik und Warenwirtschaft können zu kontrollierbaren Abläufen verbunden werden.",
    examples: ["Serviceanfragen einordnen", "Bestellinformationen zusammenführen", "Produktfragen beantworten", "Ausnahmen eskalieren"],
  },
  {
    name: "Immobilien",
    intro: "Viele Anfragen, Objektdokumente und koordinative Schritte profitieren von einer strukturierten Vorbearbeitung.",
    examples: ["Interessentenanfragen erfassen", "Unterlagen auf Vollständigkeit prüfen", "Termine vorbereiten", "Vorgänge zuordnen"],
  },
  {
    name: "Kanzleien",
    intro: "Bei sensiblen Vorgängen stehen Berechtigungen, Quellen und menschliche Prüfung besonders im Mittelpunkt.",
    examples: ["Erstanfragen strukturieren", "Dokumente kategorisieren", "Internes Wissen durchsuchen", "Fristen und Aufgaben vorbereiten"],
  },
  {
    name: "Beratung",
    intro: "Projektwissen, Gesprächsinhalte und wiederkehrende Berichtsschritte können leichter nutzbar gemacht werden.",
    examples: ["Notizen zusammenfassen", "Projektwissen auffindbar machen", "Berichte vorbereiten", "Follow-ups strukturieren"],
  },
  {
    name: "Gesundheit und Pflege",
    intro: "Administrative Aufgaben können unter besonderer Berücksichtigung von Datenschutz und Verantwortlichkeiten entlastet werden.",
    examples: ["Nicht-medizinische Anfragen zuordnen", "Termine koordinieren", "Unterlagen prüfen", "Interne Richtlinien finden"],
  },
  {
    name: "Industrie",
    intro: "Technische Dokumentation, Serviceprozesse und bereichsübergreifende Datenflüsse bieten Ansatzpunkte für individuelle Systeme.",
    examples: ["Dokumentation durchsuchen", "Servicefälle klassifizieren", "Prüfberichte vorbereiten", "Systemdaten verbinden"],
  },
  {
    name: "Handel",
    intro: "Kommunikation, Wareninformationen und administrative Vorgänge lassen sich über mehrere Systeme hinweg ordnen.",
    examples: ["Lieferantenanfragen zuordnen", "Produktdaten prüfen", "Dokumente auslesen", "Aufgaben erstellen"],
  },
  {
    name: "Agenturen",
    intro: "Briefings, Projektwissen und wiederkehrende Abstimmungen können standardisiert vorbereitet werden, ohne kreative Entscheidungen zu ersetzen.",
    examples: ["Briefings vervollständigen", "Projektwissen bündeln", "Statusberichte erstellen", "Freigaben koordinieren"],
  },
  {
    name: "Bildung",
    intro: "Informationen, Kursorganisation und interne Wissensbestände können leichter zugänglich und konsistent bearbeitet werden.",
    examples: ["Organisatorische Fragen beantworten", "Anmeldungen strukturieren", "Unterlagen zuordnen", "Wissensassistenten bereitstellen"],
  },
  {
    name: "Hotellerie und Gastronomie",
    intro: "Gästeanfragen, Reservierungsinformationen und interne Übergaben lassen sich kanalübergreifend vorbereiten.",
    examples: ["Anfragen kategorisieren", "Informationen mehrsprachig vorbereiten", "Reservierungswünsche erfassen", "Aufgaben weiterleiten"],
  },
] as const;

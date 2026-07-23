export const industryServiceSlugs = [
  "ki-beratung",
  "ki-assistenten",
  "prozessautomatisierung",
  "wissenssysteme",
  "vertriebsautomatisierung",
  "individuelle-ki-software",
] as const;

export type IndustryServiceSlug = (typeof industryServiceSlugs)[number];

export type Industry = {
  slug: string;
  name: string;
  seoTitle: string;
  seoDescription: string;
  h1: string;
  intro: string;
  context: string;
  examples: readonly string[];
  systems: readonly string[];
  guardrails: readonly string[];
  serviceSlugs: readonly IndustryServiceSlug[];
};

export const industries = [
  {
    slug: "handwerk",
    name: "Handwerk",
    seoTitle: "KI-Automatisierung für das Handwerk",
    seoDescription:
      "KI-Automatisierung für Handwerksbetriebe: Anfragen, Angebote, Dokumente und Termine strukturiert bearbeiten und bestehende Systeme verbinden.",
    h1: "KI-Automatisierung für Handwerksbetriebe",
    intro:
      "Zwischen Baustelle, Werkstatt und Büro treffen Anfragen, Fotos, Dokumente und Terminänderungen über verschiedene Kanäle ein. KI kann diese Informationen strukturiert für die weitere Bearbeitung vorbereiten.",
    context:
      "Entscheidend ist ein Ablauf, der zum Gewerk und zur vorhandenen Arbeitsweise passt. Fachliche Einschätzungen, Kalkulationen und Freigaben bleiben bei den zuständigen Mitarbeitern.",
    examples: [
      "Kundenanfragen vorsortieren",
      "Fehlende Projektinformationen abfragen",
      "Fotos und Dokumente einem Vorgang zuordnen",
      "Angebots- und Terminprozesse vorbereiten",
    ],
    systems: [
      "E-Mail",
      "Handwerkersoftware",
      "CRM",
      "Kalender",
      "Dokumentenablage",
    ],
    guardrails: [
      "Angebote und technische Bewertungen werden nach definierten Regeln vorbereitet, nicht ungeprüft versendet.",
      "Fotos, Pläne und Kundendaten werden nur in den vorgesehenen Systemen und mit passenden Zugriffsrechten verarbeitet.",
      "Sonderfälle und unvollständige Angaben werden sichtbar an einen zuständigen Mitarbeiter übergeben.",
    ],
    serviceSlugs: [
      "prozessautomatisierung",
      "ki-assistenten",
      "vertriebsautomatisierung",
    ],
  },
  {
    slug: "dienstleistungen",
    name: "Dienstleistungen",
    seoTitle: "KI-Automatisierung für Dienstleistungsunternehmen",
    seoDescription:
      "KI für Dienstleistungsunternehmen: Anfragen qualifizieren, Termine koordinieren, Wissen bereitstellen und interne Übergaben nachvollziehbar gestalten.",
    h1: "KI-Automatisierung für Dienstleistungsunternehmen",
    intro:
      "Dienstleistungsunternehmen koordinieren Kundenanliegen, Termine, Informationen und interne Zuständigkeiten häufig parallel. KI kann wiederkehrende Schritte vorbereiten und Informationen gezielt weiterleiten.",
    context:
      "Die Lösung richtet sich nach Leistungsangebot, Beratungsanteil und Verantwortlichkeiten. Persönliche Betreuung bleibt dort erhalten, wo Einordnung, Vertrauen oder eine individuelle Entscheidung gefragt sind.",
    examples: [
      "Anliegen und Bedarf qualifizieren",
      "Termine und Rückfragen koordinieren",
      "Leistungsinformationen bereitstellen",
      "Aufgaben und Follow-ups verteilen",
    ],
    systems: ["Website", "E-Mail", "CRM", "Kalender", "Projektmanagement"],
    guardrails: [
      "Kundenkommunikation folgt freigegebenen Inhalten und klaren Übergaberegeln.",
      "Komplexe oder beratungsintensive Anliegen werden nicht in starre Standardantworten gezwungen.",
      "Zuständigkeiten und Bearbeitungsstände bleiben für Mitarbeiter nachvollziehbar.",
    ],
    serviceSlugs: [
      "ki-assistenten",
      "vertriebsautomatisierung",
      "prozessautomatisierung",
    ],
  },
  {
    slug: "e-commerce",
    name: "E-Commerce",
    seoTitle: "KI-Automatisierung für E-Commerce",
    seoDescription:
      "KI-Automatisierung im E-Commerce: Shop, Support, Logistik und Warenwirtschaft für schnellere, kontrollierbare Abläufe sinnvoll verbinden.",
    h1: "KI-Automatisierung für E-Commerce-Unternehmen",
    intro:
      "Im E-Commerce entstehen zwischen Shop, Support, Logistik und Warenwirtschaft viele wiederkehrende Informationswege. KI kann Anfragen einordnen, Kontext zusammenführen und definierte nächste Schritte anstoßen.",
    context:
      "Automatisiert wird nur, was durch verlässliche Daten und Regeln abgedeckt ist. Reklamationen, Kulanzentscheidungen und unklare Bestelllagen benötigen weiterhin eine kontrollierte Übergabe.",
    examples: [
      "Serviceanfragen nach Anliegen einordnen",
      "Bestell- und Versandinformationen zusammenführen",
      "Produktfragen aus freigegebenen Daten beantworten",
      "Ausnahmen und Reklamationen gezielt eskalieren",
    ],
    systems: [
      "Onlineshop",
      "Helpdesk",
      "Warenwirtschaft",
      "CRM",
      "Versanddienstleister",
    ],
    guardrails: [
      "Auskünfte zu Bestand, Bestellung und Versand basieren auf aktuellen angebundenen Systemdaten.",
      "Erstattungen, Kulanz und rechtlich relevante Aussagen erhalten definierte Freigabeschritte.",
      "Unsichere Produktzuordnungen oder widersprüchliche Daten werden nicht automatisch aufgelöst.",
    ],
    serviceSlugs: [
      "ki-assistenten",
      "prozessautomatisierung",
      "individuelle-ki-software",
    ],
  },
  {
    slug: "immobilien",
    name: "Immobilien",
    seoTitle: "KI-Automatisierung für die Immobilienwirtschaft",
    seoDescription:
      "KI für Immobilienunternehmen: Interessentenanfragen, Objektdokumente, Termine und Vorgänge strukturiert vorbereiten und sicher weiterleiten.",
    h1: "KI-Automatisierung für die Immobilienwirtschaft",
    intro:
      "In der Immobilienwirtschaft treffen viele Interessentenanfragen, Objektdaten, Unterlagen und koordinative Schritte zusammen. KI kann Vorgänge vorstrukturieren und fehlende Informationen sichtbar machen.",
    context:
      "Ob Vermarktung, Verwaltung oder Bestand: Die Prozesslogik unterscheidet sich deutlich. Deshalb werden Datenquellen, Rollen und fachliche Grenzen für jeden konkreten Ablauf festgelegt.",
    examples: [
      "Interessentenanfragen strukturiert erfassen",
      "Unterlagen auf definierte Vollständigkeit prüfen",
      "Besichtigungs- und Rückruftermine vorbereiten",
      "Nachrichten einem Objekt oder Vorgang zuordnen",
    ],
    systems: [
      "Immobiliensoftware",
      "CRM",
      "Portale",
      "E-Mail",
      "Dokumentenmanagement",
    ],
    guardrails: [
      "Objekt- und Interessentendaten werden nur entsprechend der festgelegten Rollen verarbeitet.",
      "Bewertungen, Zusagen und Vertragsentscheidungen bleiben bei den fachlich Verantwortlichen.",
      "Automatische Antworten greifen ausschließlich auf geprüfte Objekt- und Prozessinformationen zurück.",
    ],
    serviceSlugs: [
      "vertriebsautomatisierung",
      "prozessautomatisierung",
      "ki-assistenten",
    ],
  },
  {
    slug: "kanzleien",
    name: "Kanzleien",
    seoTitle: "KI-Automatisierung für Kanzleien",
    seoDescription:
      "KI-Automatisierung für Kanzleien: Erstanfragen, Dokumente und internes Wissen mit Berechtigungen und menschlicher Prüfung strukturieren.",
    h1: "KI-Automatisierung für Kanzleien",
    intro:
      "Kanzleien bearbeiten vertrauliche Anfragen, umfangreiche Dokumente und wissensintensive Vorgänge. KI kann administrative Vorarbeiten unterstützen, wenn Quellen, Berechtigungen und Prüfschritte klar geregelt sind.",
    context:
      "Die technische Unterstützung ersetzt keine rechtliche oder steuerliche Prüfung. Mandatsannahme, fachliche Würdigung und verbindliche Kommunikation verbleiben bei den zuständigen Berufsträgern.",
    examples: [
      "Erstanfragen strukturiert aufnehmen",
      "Eingehende Dokumente kategorisieren",
      "Internes Wissen mit Quellen durchsuchen",
      "Fristen und Aufgaben zur Prüfung vorbereiten",
    ],
    systems: [
      "Kanzleisoftware",
      "DMS",
      "E-Mail",
      "Wissensdatenbank",
      "Aufgabenverwaltung",
    ],
    guardrails: [
      "Mandats- und Dokumentenzugriffe werden rollenbasiert und nach dem Need-to-know-Prinzip geplant.",
      "Fachliche Bewertungen sowie verbindliche Auskünfte werden nicht autonom durch ein KI-System erteilt.",
      "Ergebnisse zeigen nach Möglichkeit Quellen und werden bei sensiblen Vorgängen zur Prüfung vorgelegt.",
    ],
    serviceSlugs: [
      "wissenssysteme",
      "prozessautomatisierung",
      "individuelle-ki-software",
    ],
  },
  {
    slug: "beratung",
    name: "Beratung",
    seoTitle: "KI-Automatisierung für Beratungsunternehmen",
    seoDescription:
      "KI für Beratungsunternehmen: Projektwissen, Gesprächsnotizen, Berichte und Follow-ups strukturiert aufbereiten und besser auffindbar machen.",
    h1: "KI-Automatisierung für Beratungsunternehmen",
    intro:
      "In Beratungsprojekten verteilen sich Gesprächsinhalte, Aufgaben und Wissen auf viele Dokumente und Werkzeuge. KI kann freigegebene Informationen strukturieren und wiederkehrende Berichtsschritte vorbereiten.",
    context:
      "Methodische Einordnung, Empfehlungen und Kundenentscheidungen bleiben menschliche Aufgaben. Automatisierung soll die Informationsarbeit entlasten, nicht fachliches Urteil vortäuschen.",
    examples: [
      "Gesprächs- und Workshopnotizen zusammenfassen",
      "Projektwissen gezielt auffindbar machen",
      "Statusberichte und Präsentationsgrundlagen vorbereiten",
      "Aufgaben und Follow-ups strukturieren",
    ],
    systems: [
      "Projektmanagement",
      "Cloud-Speicher",
      "CRM",
      "E-Mail",
      "Wissensplattform",
    ],
    guardrails: [
      "Nur freigegebene Projektquellen fließen in Zusammenfassungen und Wissensabfragen ein.",
      "Entwürfe trennen belegbare Inhalte von offenen Punkten und notwendiger fachlicher Einordnung.",
      "Kundenbezogene Wissensräume und Zugriffsrechte werden konsequent voneinander getrennt.",
    ],
    serviceSlugs: [
      "wissenssysteme",
      "ki-assistenten",
      "prozessautomatisierung",
    ],
  },
  {
    slug: "gesundheit-pflege",
    name: "Gesundheit und Pflege",
    seoTitle: "KI-Automatisierung für Gesundheit und Pflege",
    seoDescription:
      "KI für Gesundheit und Pflege: administrative Anfragen, Termine, Unterlagen und internes Wissen datenschutzbewusst und kontrolliert unterstützen.",
    h1: "KI-Automatisierung für Gesundheit und Pflege",
    intro:
      "Einrichtungen im Gesundheits- und Pflegebereich bewältigen neben der fachlichen Arbeit viele administrative Anfragen, Terminabsprachen und Dokumentenwege. KI kann ausgewählte nicht-medizinische Abläufe unterstützen.",
    context:
      "Medizinische, pflegerische und diagnostische Entscheidungen sind nicht Gegenstand einer pauschalen Automatisierung. Besondere Datenkategorien erfordern eine sorgfältige technische und organisatorische Prüfung.",
    examples: [
      "Nicht-medizinische Anfragen zuordnen",
      "Termine und organisatorische Rückfragen koordinieren",
      "Unterlagen auf definierte Vollständigkeit prüfen",
      "Interne Richtlinien mit Quellen auffindbar machen",
    ],
    systems: [
      "Terminverwaltung",
      "E-Mail",
      "Dokumentenmanagement",
      "Intranet",
      "Fachsoftware",
    ],
    guardrails: [
      "Gesundheitsdaten werden nur verarbeitet, wenn Zweck, Rechtsgrundlage, Zugriff und Schutzmaßnahmen geklärt sind.",
      "Medizinische oder pflegerische Bewertungen werden nicht durch administrative Assistenten ersetzt.",
      "Dringende, unklare oder fachliche Anliegen werden eindeutig an qualifizierte Menschen übergeben.",
    ],
    serviceSlugs: ["ki-beratung", "wissenssysteme", "prozessautomatisierung"],
  },
  {
    slug: "industrie",
    name: "Industrie",
    seoTitle: "KI-Automatisierung für Industrieunternehmen",
    seoDescription:
      "KI für Industrieunternehmen: technische Dokumentation, Servicefälle, Prüfberichte und Systemdaten kontrolliert erschließen und verbinden.",
    h1: "KI-Automatisierung für Industrieunternehmen",
    intro:
      "Industrieunternehmen arbeiten mit technischen Dokumentationen, Servicevorgängen und Daten aus unterschiedlichen Fachsystemen. KI kann Informationen auffindbar machen und definierte Prozessschritte vorbereiten.",
    context:
      "Anlagen-, Qualitäts- und Sicherheitsentscheidungen benötigen belastbare Daten und klare Verantwortlichkeiten. Jede Anbindung wird daher anhand des tatsächlichen Prozesses und der Systemgrenzen geplant.",
    examples: [
      "Technische Dokumentation mit Quellen durchsuchen",
      "Servicefälle klassifizieren und weiterleiten",
      "Prüfberichte aus freigegebenen Daten vorbereiten",
      "Informationen aus Fachsystemen zusammenführen",
    ],
    systems: ["ERP", "MES", "DMS", "Service-Management", "Qualitätsmanagement"],
    guardrails: [
      "Maschinen-, Qualitäts- und Sicherheitsdaten werden nicht ohne definierte Plausibilitätsprüfung weiterverarbeitet.",
      "Operative Eingriffe in Anlagen oder Produktionssysteme erfordern gesonderte Regeln und Freigaben.",
      "Technische Antworten verweisen nach Möglichkeit auf die zugrunde liegende Dokumentation und deren Stand.",
    ],
    serviceSlugs: [
      "wissenssysteme",
      "prozessautomatisierung",
      "individuelle-ki-software",
    ],
  },
  {
    slug: "handel",
    name: "Handel",
    seoTitle: "KI-Automatisierung für Handelsunternehmen",
    seoDescription:
      "KI für Handelsunternehmen: Produktdaten, Lieferantenkommunikation, Dokumente und Aufgaben über bestehende Systeme hinweg strukturiert bearbeiten.",
    h1: "KI-Automatisierung für Handelsunternehmen",
    intro:
      "Im Handel müssen Produktinformationen, Lieferantenanfragen, Dokumente und interne Aufgaben über mehrere Systeme hinweg koordiniert werden. KI kann Inhalte erfassen und kontrolliert weiterverarbeiten.",
    context:
      "Ob Groß-, Fach- oder Einzelhandel beeinflusst Datenquellen und Prozesslogik. Preise, Verfügbarkeiten und Konditionen dürfen nur aus aktuellen, dafür freigegebenen Systemen stammen.",
    examples: [
      "Lieferantenanfragen nach Zuständigkeit zuordnen",
      "Produktdaten auf definierte Felder prüfen",
      "Angaben aus Auftragsdokumenten auslesen",
      "Aufgaben und Rückfragen automatisch vorbereiten",
    ],
    systems: [
      "ERP",
      "Warenwirtschaft",
      "PIM",
      "E-Mail",
      "Dokumentenmanagement",
    ],
    guardrails: [
      "Preis-, Bestands- und Produktinformationen werden mit der jeweils führenden Datenquelle abgeglichen.",
      "Abweichungen in Lieferanten- oder Produktdaten werden markiert, statt stillschweigend überschrieben.",
      "Bestellungen, Freigaben und Konditionsentscheidungen folgen festgelegten Rollen und Wertgrenzen.",
    ],
    serviceSlugs: [
      "prozessautomatisierung",
      "individuelle-ki-software",
      "wissenssysteme",
    ],
  },
  {
    slug: "agenturen",
    name: "Agenturen",
    seoTitle: "KI-Automatisierung für Agenturen",
    seoDescription:
      "KI für Agenturen: Briefings, Projektwissen, Statusberichte und Freigaben strukturiert vorbereiten, ohne kreative Entscheidungen zu ersetzen.",
    h1: "KI-Automatisierung für Agenturen",
    intro:
      "Agenturen koordinieren Briefings, Projektwissen, Feedback und Freigaben unter hohem Zeitdruck. KI kann fehlende Angaben erkennen, Informationen bündeln und wiederkehrende Abstimmungen vorbereiten.",
    context:
      "Kreative Richtung, Tonalität und finale Qualität bleiben bewusste menschliche Entscheidungen. Automatisierung ist besonders dort sinnvoll, wo Informationen geordnet und Übergaben verlässlich gemacht werden.",
    examples: [
      "Briefings auf fehlende Angaben prüfen",
      "Projektwissen und Entscheidungen bündeln",
      "Statusberichte aus Projektinformationen vorbereiten",
      "Feedback und Freigaben koordinieren",
    ],
    systems: [
      "Projektmanagement",
      "Cloud-Speicher",
      "E-Mail",
      "CRM",
      "Freigabeplattformen",
    ],
    guardrails: [
      "Kunden- und Projektdaten bleiben in getrennten, berechtigten Arbeitsbereichen.",
      "Generierte Inhalte werden vor externer Verwendung entlang der vereinbarten Qualitätsregeln geprüft.",
      "Kreative Entscheidungen und verbindliche Kundenzusagen werden nicht aus unvollständigem Kontext abgeleitet.",
    ],
    serviceSlugs: [
      "ki-assistenten",
      "wissenssysteme",
      "prozessautomatisierung",
    ],
  },
  {
    slug: "bildung",
    name: "Bildung",
    seoTitle: "KI-Automatisierung für Bildungsträger",
    seoDescription:
      "KI für Bildungsträger: organisatorische Fragen, Anmeldungen, Unterlagen und internes Wissen zugänglich und kontrolliert bearbeiten.",
    h1: "KI-Automatisierung für Bildungsträger",
    intro:
      "Bildungsträger bearbeiten organisatorische Fragen, Anmeldungen, Kursinformationen und umfangreiche interne Wissensbestände. KI kann Informationen zugänglicher machen und administrative Abläufe strukturieren.",
    context:
      "Pädagogische Entscheidungen, Bewertungen und individuelle Betreuung werden dadurch nicht ersetzt. Bei Daten von Lernenden und Beschäftigten sind Zweckbindung und Zugriffsrechte besonders wichtig.",
    examples: [
      "Organisatorische Fragen aus geprüften Quellen beantworten",
      "Anmeldungen und fehlende Angaben strukturieren",
      "Unterlagen Kursen oder Vorgängen zuordnen",
      "Interne Wissensassistenten bereitstellen",
    ],
    systems: ["Lernplattform", "Kursverwaltung", "DMS", "E-Mail", "Intranet"],
    guardrails: [
      "Antworten trennen organisatorische Auskünfte klar von pädagogischer oder fachlicher Bewertung.",
      "Personenbezogene Daten werden nur für definierte Zwecke und innerhalb passender Rollen verarbeitet.",
      "Wissensantworten basieren auf freigegebenen, möglichst aktuellen Quellen.",
    ],
    serviceSlugs: [
      "wissenssysteme",
      "ki-assistenten",
      "prozessautomatisierung",
    ],
  },
  {
    slug: "hotellerie-gastronomie",
    name: "Hotellerie und Gastronomie",
    seoTitle: "KI-Automatisierung für Hotellerie und Gastronomie",
    seoDescription:
      "KI für Hotellerie und Gastronomie: Gästeanfragen, Reservierungswünsche und interne Übergaben kanalübergreifend strukturiert vorbereiten.",
    h1: "KI-Automatisierung für Hotellerie und Gastronomie",
    intro:
      "Gästeanfragen, Reservierungswünsche und interne Übergaben erreichen Hotels und Gastronomiebetriebe über verschiedene Kanäle und Sprachen. KI kann Inhalte erfassen und an den passenden Ablauf übergeben.",
    context:
      "Verfügbarkeiten, Preise, Allergiehinweise und Sonderwünsche benötigen aktuelle Daten und klare Zuständigkeiten. Nicht eindeutig beantwortbare Anliegen werden gezielt an Mitarbeiter weitergeleitet.",
    examples: [
      "Gästeanfragen nach Anliegen kategorisieren",
      "Antwortentwürfe mehrsprachig vorbereiten",
      "Reservierungswünsche vollständig erfassen",
      "Aufgaben an Rezeption, Service oder Verwaltung leiten",
    ],
    systems: [
      "Buchungssystem",
      "Reservierungssoftware",
      "E-Mail",
      "Telefonie",
      "Aufgabenverwaltung",
    ],
    guardrails: [
      "Verfügbarkeiten, Preise und Buchungsbedingungen stammen aus den dafür vorgesehenen aktuellen Systemen.",
      "Allergieangaben und besondere Anforderungen werden sichtbar und ohne automatische fachliche Bewertung weitergegeben.",
      "Beschwerden, Ausnahmen und verbindliche Zusagen erhalten eine definierte menschliche Übergabe.",
    ],
    serviceSlugs: [
      "ki-assistenten",
      "prozessautomatisierung",
      "individuelle-ki-software",
    ],
  },
] as const satisfies readonly Industry[];

export function getIndustry(slug: string) {
  return industries.find((industry) => industry.slug === slug);
}

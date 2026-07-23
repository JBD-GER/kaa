export type ServiceIcon =
  | "compass"
  | "assistant"
  | "workflow"
  | "knowledge"
  | "sales"
  | "software";

export type Service = {
  slug: string;
  name: string;
  seoTitle: string;
  seoDescription: string;
  shortDescription: string;
  h1: string;
  eyebrow: string;
  icon: ServiceIcon;
  accent: string;
  introduction: string;
  situations: string[];
  capabilities: string[];
  benefits: string[];
  systems: string[];
  principles: string[];
  process?: string[];
  cta: string;
};

/** Verbindliche Single Source of Truth für exakt sechs Leistungen. */
export const services: readonly Service[] = [
  {
    slug: "ki-beratung",
    name: "KI-Beratung",
    seoTitle: "KI-Beratung für Unternehmensprozesse",
    seoDescription:
      "KAA analysiert Abläufe, Systeme und Automatisierungspotenziale und entwickelt eine belastbare KI-Roadmap für Ihr Unternehmen.",
    shortDescription:
      "Wir analysieren Ihre Abläufe und zeigen, wo KI Zeit und Kosten spart.",
    h1: "KI-Beratung für konkrete Unternehmensprozesse",
    eyebrow: "Orientierung mit Substanz",
    icon: "compass",
    accent: "blue",
    introduction:
      "Eine sinnvolle KI-Initiative beginnt mit dem tatsächlichen Arbeitsablauf. Wir erfassen Aufgaben, Daten, Systeme und Verantwortlichkeiten und leiten daraus eine realistische, priorisierte Umsetzungsroadmap ab.",
    situations: [
      "Viele Ideen, aber keine belastbare Priorisierung",
      "Wiederkehrende Handarbeit ohne klaren Automatisierungsansatz",
      "Unklare technische Voraussetzungen und Schnittstellen",
      "Unsicherheit über Nutzen, Risiken und sinnvolle Kontrollpunkte",
    ],
    capabilities: [
      "Erstgespräch und Prozessaufnahme",
      "Systemübersicht und technische Prüfung",
      "Potenzialanalyse und Priorisierung",
      "Lösungskonzept mit Kontrollpunkten",
      "Aufwand-Nutzen-Gegenüberstellung",
      "Umsetzungsplan und Ergebnispräsentation",
    ],
    benefits: [
      "Investitionen auf sinnvolle Anwendungsfälle konzentrieren",
      "Risiken und Abhängigkeiten früh erkennen",
      "Eine klare Entscheidungsgrundlage schaffen",
      "Schrittweise und kontrolliert starten",
    ],
    systems: ["E-Mail", "CRM", "ERP", "Dokumentenablage", "Fachsoftware"],
    principles: [
      "Nicht jeder Prozess muss automatisiert werden.",
      "Wir empfehlen nur Lösungen, die technisch und wirtschaftlich sinnvoll erscheinen.",
      "Menschliche Entscheidungen bleiben dort erhalten, wo sie wichtig sind.",
    ],
    process: [
      "Erstgespräch",
      "Prozessaufnahme",
      "Systemübersicht",
      "Potenzialanalyse",
      "Priorisierung",
      "Lösungskonzept",
      "Umsetzungsplan",
      "Ergebnispräsentation",
    ],
    cta: "KI-Potenzial analysieren lassen",
  },
  {
    slug: "ki-assistenten",
    name: "KI-Assistenten",
    seoTitle: "KI-Assistenten für Kunden und Mitarbeiter",
    seoDescription:
      "Individuelle KI-Assistenten für Kundenservice, Telefon, Website und interne Aufgaben – integriert, kontrollierbar und verständlich.",
    shortDescription:
      "Digitale Mitarbeiter für Kundenservice, Telefon, Website und interne Aufgaben.",
    h1: "KI-Assistenten für Kunden, Mitarbeiter und interne Aufgaben",
    eyebrow: "Unterstützung im richtigen Moment",
    icon: "assistant",
    accent: "cyan",
    introduction:
      "KI-Assistenten nehmen Informationen auf, verstehen Anliegen und bereiten passende nächste Schritte vor. Je nach Aufgabe antworten sie direkt oder übergeben strukturiert an einen Menschen.",
    situations: [
      "Wiederkehrende Fragen binden Kapazität",
      "Anliegen erreichen nicht sofort die richtige Stelle",
      "Terminabstimmungen und Vorqualifizierung laufen manuell",
      "Mitarbeiter suchen Informationen in mehreren Quellen",
    ],
    capabilities: [
      "Website- und Kundenservice-Assistenten",
      "Telefon- und Terminassistenten",
      "Interne Mitarbeiterassistenten",
      "Support- und Onboarding-Assistenten",
      "Gesprächsinhalte zusammenfassen",
      "Informationen an Systeme übertragen",
    ],
    benefits: [
      "Anfragen strukturiert aufnehmen",
      "Antworten und Aufgaben vorbereiten",
      "Routinefragen schneller bearbeiten",
      "Gezielt an zuständige Mitarbeiter übergeben",
    ],
    systems: ["Website", "Telefonie", "Kalender", "CRM", "Wissensquellen"],
    principles: [
      "Der Grad der Automatisierung wird pro Anwendungsfall festgelegt.",
      "Freigaben und Übergaben an Menschen sind feste Bestandteile des Konzepts.",
      "Es wird keine pauschale vollständige Autonomie versprochen.",
    ],
    cta: "KI-Assistenten besprechen",
  },
  {
    slug: "prozessautomatisierung",
    name: "Prozessautomatisierung",
    seoTitle: "Prozessautomatisierung mit KI",
    seoDescription:
      "KAA automatisiert E-Mails, Dokumente, Dateneingaben und Büroprozesse und verbindet die dafür benötigten Unternehmenssysteme.",
    shortDescription:
      "E-Mails, Dokumente, Dateneingaben und wiederkehrende Büroarbeit automatisch erledigen.",
    h1: "Wiederkehrende Aufgaben automatisch erledigen",
    eyebrow: "Vom Eingang bis zur erledigten Aufgabe",
    icon: "workflow",
    accent: "violet",
    introduction:
      "KAA verbindet vorhandene Systeme und ergänzt bestehende Abläufe um intelligente Funktionen. So werden Informationen erkannt, strukturiert und kontrolliert in den nächsten Arbeitsschritt überführt.",
    situations: [
      "Postfächer werden manuell sortiert",
      "Anhänge und Dokumente werden einzeln ausgelesen",
      "Daten werden zwischen Programmen kopiert",
      "Aufgaben, Ablage und Benachrichtigungen erfolgen per Hand",
    ],
    capabilities: [
      "E-Mails sortieren und Inhalte erkennen",
      "Anhänge auslesen und Informationen strukturieren",
      "Daten übertragen und Zuständigkeiten bestimmen",
      "Aufgaben erstellen und Dokumente ablegen",
      "Freigaben einholen und Benachrichtigungen versenden",
      "Antwortentwürfe und Berichte vorbereiten",
    ],
    benefits: [
      "Weniger wiederkehrende Dateneingabe",
      "Schnellere und einheitlichere Bearbeitung",
      "Nachvollziehbare Übergaben zwischen Systemen",
      "Kontrolle bei wichtigen Prozessschritten",
    ],
    systems: ["E-Mail", "CRM", "DMS", "Buchhaltung", "Projektmanagement"],
    principles: [
      "KAA verbindet vorhandene Systeme und ergänzt bestehende Abläufe um intelligente Funktionen.",
      "Fehler- und Sonderfälle werden im Prozesskonzept berücksichtigt.",
      "Freigaben bleiben dort bestehen, wo sie fachlich erforderlich sind.",
    ],
    process: [
      "E-Mail",
      "Inhalt erkennen",
      "Kundendaten prüfen",
      "CRM aktualisieren",
      "Aufgabe erstellen",
      "Antwort vorbereiten",
    ],
    cta: "Prozess prüfen lassen",
  },
  {
    slug: "wissenssysteme",
    name: "Wissenssysteme",
    seoTitle: "KI-Wissenssysteme für Unternehmen",
    seoDescription:
      "Interne KI-Wissenssysteme erschließen Dokumente und Unternehmenswissen mit nachvollziehbaren Quellen und passenden Zugriffsrechten.",
    shortDescription:
      "Eine interne KI, die Ihre Dokumente kennt und Mitarbeiterfragen zuverlässig beantwortet.",
    h1: "Unternehmenswissen schnell und zuverlässig verfügbar machen",
    eyebrow: "Antworten mit nachvollziehbaren Quellen",
    icon: "knowledge",
    accent: "green",
    introduction:
      "Ein internes Wissenssystem erschließt Handbücher, Richtlinien und Projektdokumente über natürliche Fragen. Antworten können mit Quellen belegt und Zugriffsrechte berücksichtigt werden.",
    situations: [
      "Wissen verteilt sich auf Ordner und Plattformen",
      "Mitarbeiter suchen lange nach der gültigen Information",
      "Wiederkehrende interne Fragen binden erfahrene Kollegen",
      "Einarbeitung hängt von einzelnen Wissensträgern ab",
    ],
    capabilities: [
      "Natürliche Fragen an interne Quellen stellen",
      "Antworten mit Fundstellen anzeigen",
      "Zugriffsrechte und Dokumentbereiche berücksichtigen",
      "Dokumente kategorisieren und schneller auffinden",
      "Onboarding und interne Auskünfte unterstützen",
      "Wissensstände kontrolliert aktualisieren",
    ],
    benefits: [
      "Informationen schneller finden",
      "Antworten besser nachvollziehen",
      "Einarbeitung systematisch unterstützen",
      "Wiederkehrende Rückfragen reduzieren",
    ],
    systems: ["DMS", "Cloud-Speicher", "Intranet", "Wiki", "Projektablage"],
    principles: [
      "Antworten sollen nachvollziehbar sein und nach Möglichkeit Quellen enthalten.",
      "Zugriffsrechte werden bereits in der Architektur berücksichtigt.",
      "Absolute Fehlerfreiheit wird nicht versprochen; sensible Antworten können geprüft werden.",
    ],
    cta: "Wissenssystem planen",
  },
  {
    slug: "vertriebsautomatisierung",
    name: "Vertriebsautomatisierung",
    seoTitle: "Vertriebsautomatisierung mit KI",
    seoDescription:
      "KAA automatisiert Anfrageerfassung, Lead-Qualifizierung, CRM-Pflege, Terminbuchung und kontrollierte Nachfassprozesse.",
    shortDescription:
      "Anfragen erfassen, Kunden qualifizieren, Termine buchen und automatisch nachfassen.",
    h1: "Vertriebsprozesse vom Erstkontakt bis zum Nachfassen automatisieren",
    eyebrow: "Jede Anfrage strukturiert weiterführen",
    icon: "sales",
    accent: "orange",
    introduction:
      "Vertriebsautomatisierung sorgt dafür, dass neue Anfragen vollständig erfasst, sinnvoll eingeordnet und an die richtige Person übergeben werden – ohne unpersönliche Spam-Automatisierung.",
    situations: [
      "Anfragen kommen über mehrere Kanäle",
      "Kontaktdaten und Bedarf werden uneinheitlich erfasst",
      "Reaktionen und Nachfassaktionen verzögern sich",
      "Gesprächsnotizen erreichen das CRM nicht vollständig",
    ],
    capabilities: [
      "Leads aus mehreren Kanälen erfassen",
      "Anfragen kategorisieren und Daten strukturieren",
      "Fehlende Informationen gezielt abfragen",
      "Leads nach definierten Kriterien qualifizieren",
      "Termine anbieten und CRM-Einträge erstellen",
      "Antwortentwürfe, Notizen und nächste Schritte vorbereiten",
    ],
    benefits: [
      "Schneller und konsistenter reagieren",
      "Weniger Anfragen aus dem Blick verlieren",
      "Bearbeitung im CRM nachvollziehbar machen",
      "Qualifiziert an Mitarbeiter übergeben",
    ],
    systems: ["Formulare", "E-Mail", "Telefonie", "CRM", "Kalender"],
    principles: [
      "Der Fokus liegt auf Relevanz und strukturierter Bearbeitung, nicht auf Massenversand.",
      "Personalisierte Kommunikation bleibt überprüfbar.",
      "Mitarbeiter übernehmen, wenn Beratung oder Entscheidung gefragt ist.",
    ],
    cta: "Vertriebsprozess analysieren",
  },
  {
    slug: "individuelle-ki-software",
    name: "Individuelle KI-Software",
    seoTitle: "Individuelle KI-Software für Unternehmen",
    seoDescription:
      "Maßgeschneiderte KI-Anwendungen, Portale und Integrationen für besondere Prozesse – von Architektur und UX bis Betrieb und Wartung.",
    shortDescription:
      "Maßgeschneiderte KI-Anwendungen und Integrationen für besondere Anforderungen.",
    h1: "Individuelle KI-Software für besondere Anforderungen",
    eyebrow: "Software, die Ihrem Prozess folgt",
    icon: "software",
    accent: "pink",
    introduction:
      "Wenn Standardsoftware einen Prozess nicht ausreichend abbilden kann, entwickelt KAA eine individuelle Anwendung – vom Interface über Daten und Rechte bis zu Schnittstellen und KI-Funktionen.",
    situations: [
      "Standardsoftware bildet den Kernprozess nur teilweise ab",
      "Mitarbeiter wechseln zwischen zu vielen Einzellösungen",
      "Eine branchenspezifische Logik fehlt",
      "Datenverarbeitung und Freigaben benötigen eine eigene Oberfläche",
    ],
    capabilities: [
      "Interne Webanwendungen und Unternehmensportale",
      "KI-gestützte Dashboards und Dokumentenplattformen",
      "Assistenz-, Kunden- und Verwaltungssysteme",
      "Individuelle Datenverarbeitung und Workflows",
      "Frontend, Backend, Datenbank und Benutzerkonten",
      "Rollen, Rechte, Schnittstellen, Hosting und Wartung",
    ],
    benefits: [
      "Abläufe ohne unnötige Umwege abbilden",
      "Bestehende Systeme gezielt ergänzen",
      "Zugriffe und Verantwortlichkeiten klar steuern",
      "Die Lösung später kontrolliert erweitern",
    ],
    systems: ["APIs", "Datenbanken", "Fachsoftware", "Cloud-Dienste", "Portale"],
    principles: [
      "Konzeption, UX und technische Architektur werden gemeinsam gedacht.",
      "Sicherheit, Rollen und Wartbarkeit sind keine nachträglichen Ergänzungen.",
      "Die Anwendung wird so einfach wie möglich und so individuell wie nötig gebaut.",
    ],
    cta: "Individuelle Lösung besprechen",
  },
] as const;

export const serviceOptions = [
  ...services.map(({ name }) => name),
  "Noch nicht sicher",
] as const;

export function getService(slug: string) {
  return services.find((service) => service.slug === slug);
}

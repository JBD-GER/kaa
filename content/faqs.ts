export type Faq = { question: string; answer: string };

export const faqs: readonly Faq[] = [
  {
    question: "Was macht eine KI-Automatisierungs-Agentur?",
    answer:
      "Eine KI-Automatisierungs-Agentur analysiert reale Arbeitsabläufe, entwickelt passende Automatisierungen und verbindet die beteiligten Systeme. KAA konzentriert sich darauf, welche Aufgabe übernommen werden soll, welche Daten benötigt werden und wo eine menschliche Prüfung sinnvoll bleibt.",
  },
  {
    question: "Welche Prozesse lassen sich automatisieren?",
    answer:
      "Besonders geeignet sind wiederkehrende, regelbasierte und informationsintensive Abläufe: etwa E-Mail-Zuordnung, Dokumentenverarbeitung, Dateneingabe, Anfragequalifizierung, Terminabstimmung, Wissenssuche oder die Vorbereitung von Berichten. Die Eignung wird immer im konkreten Prozess geprüft.",
  },
  {
    question: "Muss vorhandene Software ersetzt werden?",
    answer:
      "Nein. Häufig entsteht der größte Nutzen, wenn vorhandene Programme sinnvoll verbunden oder um eine gezielte Funktion ergänzt werden. Ein Austausch wird nur betrachtet, wenn technische Grenzen oder fehlende Schnittstellen ihn tatsächlich erforderlich machen.",
  },
  {
    question: "Können bestehende Programme angebunden werden?",
    answer:
      "Viele Systeme lassen sich über vorhandene Schnittstellen, Exporte oder kontrollierte Integrationen verbinden. Vor einer Zusage prüfen wir technische Möglichkeiten, Berechtigungen, Datenqualität und die Bedingungen des jeweiligen Anbieters.",
  },
  {
    question: "Wie individuell sind die Lösungen?",
    answer:
      "Auslöser, Regeln, Datenquellen, Systemaktionen, Freigaben und Benutzeroberflächen werden an den jeweiligen Ablauf angepasst. Bewährte technische Bausteine können wiederverwendet werden; der Prozess selbst folgt jedoch nicht einem beliebigen Standardpaket.",
  },
  {
    question: "Wie lange dauert eine Umsetzung?",
    answer:
      "Das hängt von Prozessumfang, Schnittstellen, Datenlage, Sicherheitsanforderungen und Testaufwand ab. Nach der Analyse lässt sich ein belastbarer Ablauf in Phasen planen. Pauschale Laufzeiten wären ohne diesen Kontext nicht seriös.",
  },
  {
    question: "Was kostet eine KI-Automatisierung?",
    answer:
      "Die Kosten richten sich nach Umfang und Komplexität: Anzahl der Systeme, benötigte Oberfläche, Datenverarbeitung, Freigaben, Betrieb und gewünschte Betreuung. KAA grenzt den sinnvollen Projektumfang zunächst ein und schafft dann eine nachvollziehbare Entscheidungsgrundlage.",
  },
  {
    question: "Ist eine KI-Automatisierung auch für kleine Unternehmen geeignet?",
    answer:
      "Ja, wenn ein klarer, wiederkehrender Ablauf genug Entlastungspotenzial bietet. Oft ist ein eng abgegrenzter Einstieg sinnvoller als ein großes Gesamtprojekt. Entscheidend sind nicht Unternehmensgröße oder Trend, sondern Aufgabe, Häufigkeit und Nutzen.",
  },
  {
    question: "Können Mitarbeiter wichtige Schritte weiterhin kontrollieren?",
    answer:
      "Ja. Freigaben, Prüfungen und Übergaben lassen sich gezielt in den Ablauf einbauen. Kritische Entscheidungen können beim Menschen bleiben, während die KI Informationen sammelt, strukturiert und einen nächsten Schritt vorbereitet.",
  },
  {
    question: "Wie werden Unternehmensdaten geschützt?",
    answer:
      "Datenschutz und Sicherheit werden bereits im Lösungskonzept berücksichtigt. Dazu gehören Datenminimierung, Rollen und Rechte, geeignete Anbieter, klare Aufbewahrung, Protokollierung und eine Prüfung, welche Daten überhaupt verarbeitet werden müssen. Die konkrete Ausgestaltung hängt vom Anwendungsfall ab.",
  },
  {
    question: "Was passiert, wenn die KI eine Information nicht eindeutig erkennt?",
    answer:
      "Unsichere oder unvollständige Fälle können gekennzeichnet, mit einer Rückfrage ergänzt oder an einen Mitarbeiter übergeben werden. Solche Ausnahmewege werden vor der Umsetzung definiert und mit realistischen Beispielen getestet.",
  },
  {
    question: "Können Lösungen später erweitert werden?",
    answer:
      "Ja. Eine saubere Architektur ermöglicht zusätzliche Datenquellen, Regeln, Benutzergruppen oder Prozessschritte. Erweiterungen werden trotzdem einzeln geprüft, damit der Ablauf verständlich und wartbar bleibt.",
  },
  {
    question: "Bietet KAA auch individuelle Softwareentwicklung an?",
    answer:
      "Ja. Wenn Standardsoftware einen besonderen Prozess nicht ausreichend abbildet, kann KAA eine individuelle Webanwendung, ein Portal, Dashboard, Assistenzsystem oder eine gezielte Integration entwickeln.",
  },
  {
    question: "Wie beginnt ein gemeinsames Projekt?",
    answer:
      "Am Anfang steht ein Gespräch über die heutige Aufgabe, beteiligte Personen und Systeme sowie das gewünschte Ergebnis. Darauf folgt je nach Ausgangslage eine Prozess- oder Potenzialanalyse und erst danach ein konkretes Lösungskonzept.",
  },
] as const;

export const homeFaqs = faqs.slice(0, 6);

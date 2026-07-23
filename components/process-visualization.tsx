type ProcessIconName = "inbox" | "logic" | "approval" | "output";

const processSteps: {
  number: string;
  eyebrow: string;
  title: string;
  description: string;
  icon: ProcessIconName;
  tone?: "core" | "approval" | "output";
  sources?: string[];
  meta: string;
}[] = [
  {
    number: "01",
    eyebrow: "Eingang",
    title: "Anfrage kommt an",
    description:
      "Informationen treffen aus Ihren bestehenden Systemen ein.",
    icon: "inbox",
    sources: ["E-Mail", "PDF", "CRM"],
    meta: "Mehrere Quellen",
  },
  {
    number: "02",
    eyebrow: "KAA verarbeitet",
    title: "KI ordnet und gleicht ab",
    description:
      "Anliegen, Daten und Regeln werden zu einem nächsten Schritt verbunden.",
    icon: "logic",
    tone: "core",
    meta: "KI + Regeln + Schnittstellen",
  },
  {
    number: "03",
    eyebrow: "Freigabe",
    title: "Mitarbeiter prüft",
    description:
      "Ausnahmen und sensible Aktionen bleiben bewusst unter menschlicher Kontrolle.",
    icon: "approval",
    tone: "approval",
    meta: "Human in the loop",
  },
  {
    number: "04",
    eyebrow: "Ergebnis",
    title: "Systeme werden aktualisiert",
    description:
      "Das CRM ist gepflegt und die Antwort liegt als freigegebener Entwurf bereit.",
    icon: "output",
    tone: "output",
    meta: "Nachvollziehbar protokolliert",
  },
];

function ProcessIcon({ name }: { name: ProcessIconName }) {
  if (name === "inbox") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M4 5.5h16v13H4z" />
        <path d="m5 7 7 6 7-6" />
      </svg>
    );
  }

  if (name === "logic") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="6" cy="6" r="2.25" />
        <circle cx="18" cy="6" r="2.25" />
        <circle cx="12" cy="18" r="2.25" />
        <path d="M8.2 6h7.6M7.2 7.9l3.6 7.8M16.8 7.9l-3.6 7.8" />
      </svg>
    );
  }

  if (name === "approval") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 3.5 19 6v5.4c0 4.2-2.8 7.3-7 9.1-4.2-1.8-7-4.9-7-9.1V6z" />
        <path d="m8.5 12 2.2 2.2 4.8-5" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M5 19V9h5v10zM14 19V4h5v15z" />
      <path d="M3.5 19.5h17M7.5 6.5l3-3 3 2 4-3" />
    </svg>
  );
}

export function ProcessVisualization() {
  return (
    <figure
      className="process-map"
      aria-labelledby="process-map-title"
      aria-describedby="process-map-note"
    >
      <figcaption className="process-map__caption">
        <span>BEISPIELABLAUF · ANFRAGE → CRM</span>
        <strong id="process-map-title">
          Vom Eingang bis zur kontrollierten Aktion.
        </strong>
      </figcaption>

      <ol
        className="process-map__flow"
        role="list"
        aria-label="Vier Schritte des Beispielprozesses"
      >
        {processSteps.map((step) => (
          <li
            className={`process-step${step.tone ? ` process-step--${step.tone}` : ""}`}
            key={step.number}
          >
            <header className="process-step__header">
              <span className="process-step__number" aria-hidden="true">
                {step.number}
              </span>
              <span className="process-step__icon">
                <ProcessIcon name={step.icon} />
              </span>
            </header>

            <div className="process-step__body">
              <span className="process-step__eyebrow">{step.eyebrow}</span>
              <strong>{step.title}</strong>
              <p>{step.description}</p>
            </div>

            {step.sources ? (
              <ul className="process-step__sources" aria-label="Mögliche Eingänge">
                {step.sources.map((source) => (
                  <li key={source}>{source}</li>
                ))}
              </ul>
            ) : (
              <span className="process-step__meta">{step.meta}</span>
            )}
          </li>
        ))}
      </ol>

      <p className="process-map__note" id="process-map-note">
        Automatisiert bis zum definierten Prüfpunkt. Ausnahmen werden gezielt
        an Ihr Team übergeben.
      </p>
    </figure>
  );
}

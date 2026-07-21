const processNodes = [
  { index: "01", label: "Eingang", detail: "Anfrage trifft ein", icon: "↘" },
  { index: "02", label: "KI-Verarbeitung", detail: "Inhalt wird erkannt", icon: "⌁" },
  { index: "03", label: "Integration", detail: "Daten werden übertragen", icon: "⇄" },
  { index: "04", label: "Freigabe", detail: "Mitarbeiter prüft", icon: "✓" },
  { index: "05", label: "Ergebnis", detail: "Nächster Schritt steht", icon: "→" },
];

export function ProcessVisualization({ compact = false }: { compact?: boolean }) {
  return (
    <figure className={`process-visual${compact ? " process-visual--compact" : ""}`} aria-labelledby="process-caption">
      <div className="process-visual__topline">
        <span>LIVE PROCESS</span><span className="status-dot">Kontrollierter Ablauf</span>
      </div>
      <ol>
        {processNodes.map((node) => (
          <li key={node.label}>
            <div className="process-node__signal" aria-hidden="true">{node.icon}</div>
            <div><span>{node.index}</span><strong>{node.label}</strong><small>{node.detail}</small></div>
          </li>
        ))}
      </ol>
      <figcaption id="process-caption">
        Beispiel: Eine Anfrage wird verstanden, mit vorhandenen Systemen verbunden und vor dem Ergebnis kontrolliert freigegeben.
      </figcaption>
    </figure>
  );
}

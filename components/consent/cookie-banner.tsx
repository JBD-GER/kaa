"use client";

import { useId } from "react";

export type CookieBannerProps = {
  open: boolean;
  onAcceptAll: () => void;
  onRejectAll: () => void;
  onOpenSettings: () => void;
};

export function CookieBanner({
  open,
  onAcceptAll,
  onRejectAll,
  onOpenSettings,
}: CookieBannerProps) {
  const titleId = useId();
  const descriptionId = useId();
  if (!open) return null;

  return (
    <section
      className="consent-banner"
      role="dialog"
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
      aria-live="polite"
      data-consent-banner="true"
    >
      <div className="consent-banner__inner">
        <div className="consent-banner__content">
          <p className="consent-banner__eyebrow">Datenschutz-Einstellungen</p>
          <h2 className="consent-banner__title" id={titleId}>
            Sie entscheiden, welche Dienste aktiv sein dürfen.
          </h2>
          <p className="consent-banner__description" id={descriptionId}>
            Notwendige Funktionen sind immer aktiv. Das Google Ads-Tag arbeitet
            zunächst ohne Werbe-Cookies und mit verweigerten Werbe-Signalen.
            Vollständige Marketingmessung, Statistik und externe Medien
            verwenden wir nur mit Ihrer Einwilligung. Ihre Auswahl können Sie
            jederzeit über „Cookie-Einstellungen“ ändern.{" "}
            <a href="/datenschutz">Mehr zum Datenschutz</a>
          </p>
        </div>

        <div className="consent-banner__actions" aria-label="Cookie-Auswahl">
          <button
            className="consent-button consent-button--choice"
            type="button"
            onClick={onAcceptAll}
          >
            Alle akzeptieren
          </button>
          <button
            className="consent-button consent-button--choice"
            type="button"
            onClick={onRejectAll}
          >
            Alle ablehnen
          </button>
          <button
            className="consent-button consent-button--secondary"
            type="button"
            onClick={onOpenSettings}
          >
            Individuell einstellen
          </button>
        </div>
      </div>
    </section>
  );
}

export default CookieBanner;

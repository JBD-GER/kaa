import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: { absolute: "Seite nicht gefunden | KAA" },
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="not-found">
      <Container className="not-found__inner">
        <div className="broken-flow" aria-label="Unterbrochener Datenfluss"><i /><i /><span /><i /><i /></div>
        <p className="eyebrow" style={{ justifyContent: "center" }}>Fehler 404</p>
        <h1>Diese Seite wurde nicht gefunden.</h1>
        <p>Die gesuchte Seite ist nicht verfügbar oder wurde verschoben.</p>
        <div className="button-row">
          <ButtonLink href="/" variant="light">Zur Startseite</ButtonLink>
          <ButtonLink href="/leistungen" variant="ghost">Leistungen ansehen</ButtonLink>
          <ButtonLink href="/kontakt" variant="ghost">Kontakt aufnehmen</ButtonLink>
        </div>
      </Container>
    </section>
  );
}

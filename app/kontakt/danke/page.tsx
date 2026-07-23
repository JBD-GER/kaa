import type { Metadata } from "next";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: { absolute: "Vielen Dank für Ihre Anfrage | KAA" },
  description: "Ihre Anfrage wurde erfolgreich übermittelt.",
  robots: { index: false, follow: true },
};

type Props = { searchParams: Promise<{ typ?: string }> };

export default async function ThankYouPage({ searchParams }: Props) {
  const { typ } = await searchParams;
  const potential = typ === "potenzialanalyse";
  return (
    <section className="thank-you">
      <Container className="thank-you__inner">
        <div className="thank-you__mark" aria-hidden="true">✓</div>
        <p className="eyebrow" style={{ justifyContent: "center" }}>Anfrage übermittelt</p>
        <h1>Vielen Dank. Ihre Anfrage ist eingegangen.</h1>
        <p>{potential ? "Die Angaben zu Ihrer KI-Potenzialanalyse wurden erfolgreich übermittelt." : "Ihre Kontaktanfrage wurde erfolgreich übermittelt."} KAA prüft das Anliegen und die möglichen nächsten Schritte. Eine Bestätigung wurde an die angegebene E-Mail-Adresse versendet, sofern der Mailversand produktiv konfiguriert ist.</p>
        <div className="button-row"><ButtonLink href="/" variant="light">Zur Startseite</ButtonLink><ButtonLink href="/ratgeber" variant="ghost">Im Ratgeber weiterlesen</ButtonLink><ButtonLink href="/leistungen" variant="ghost">Leistungen ansehen</ButtonLink></div>
      </Container>
    </section>
  );
}

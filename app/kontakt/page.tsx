import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ContactForm } from "@/components/forms/contact-form";
import { JsonLd } from "@/components/json-ld";
import { Container } from "@/components/ui/container";
import { company } from "@/config/site";
import { getIndustry } from "@/content/industries";
import { getService } from "@/content/services";
import { getUseCase } from "@/content/use-cases";
import { absoluteUrl, createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Kontakt: unverbindliche KI-Anfrage senden",
  description:
    "Senden Sie KAA Ihre Kontaktdaten und wählen Sie die gewünschte KI-Leistung für ein unverbindliches Erstgespräch aus.",
  path: "/kontakt",
});

type Props = {
  searchParams: Promise<{
    leistung?: string;
    anwendungsfall?: string;
    branche?: string;
  }>;
};

export default async function ContactPage({ searchParams }: Props) {
  const { leistung, anwendungsfall, branche } = await searchParams;
  const selectedUseCase = anwendungsfall
    ? getUseCase(anwendungsfall)
    : undefined;
  const selectedIndustry = branche ? getIndustry(branche) : undefined;
  const selectedService =
    (leistung ? getService(leistung) : undefined) ??
    (selectedUseCase ? getService(selectedUseCase.serviceSlug) : undefined) ??
    (selectedIndustry
      ? getService(selectedIndustry.serviceSlugs[0])
      : undefined);
  const items = [
    { label: "Startseite", href: "/" },
    { label: "Kontakt", href: "/kontakt" },
  ];
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Kontakt zu KAA",
    url: absoluteUrl("/kontakt"),
    description:
      "Kontaktformular für individuelle KI-Lösungen und Prozessautomatisierung.",
    about: { "@id": `${absoluteUrl()}/#organization` },
  };
  const address =
    company.street && company.postalCode && company.city
      ? `${company.street}, ${company.postalCode} ${company.city}`
      : null;

  return (
    <>
      <JsonLd data={jsonLd} />
      <section className="page-hero page-hero--dark">
        <Container>
          <Breadcrumbs items={items} />
          <div className="page-hero__inner">
            <div>
              <p className="eyebrow">Kontakt</p>
              <h1>Unverbindliche Anfrage senden</h1>
              <p className="lead">
                Ihre Kontaktdaten und die gewünschte Leistung genügen für den
                ersten Schritt.
              </p>
            </div>
            <div className="page-hero__aside">
              <p>
                Im Erstgespräch klären wir gemeinsam, welcher Prozess,
                welche Systeme und welches Ziel für Sie relevant sind.
              </p>
            </div>
          </div>
        </Container>
      </section>
      <section className="section section--white">
        <Container className="form-layout">
          <div className="form-card">
            <ContactForm initialService={selectedService?.name} />
          </div>
          <aside className="form-aside">
            <p className="eyebrow">Wie es weitergeht</p>
            <h2 style={{ fontSize: "1.8rem" }}>
              Vom Anliegen zum möglichen nächsten Schritt
            </h2>
            <ol className="form-aside__list">
              <li>
                <span>
                  <strong>Anfrage senden</strong>
                  <br />
                  Sie tragen Ihre Kontaktdaten ein und wählen eine Leistung.
                </span>
              </li>
              <li>
                <span>
                  <strong>KAA prüft das Anliegen</strong>
                  <br />
                  Wir ordnen ein, welche Informationen noch benötigt werden.
                </span>
              </li>
              <li>
                <span>
                  <strong>Gemeinsames Erstgespräch</strong>
                  <br />
                  Ablauf, Systeme und Ziel werden verständlich besprochen.
                </span>
              </li>
              <li>
                <span>
                  <strong>Mögliche nächste Schritte</strong>
                  <br />
                  Je nach Ausgangslage folgt eine Analyse oder ein konkretes
                  Konzept.
                </span>
              </li>
            </ol>
            <div className="contact-channels">
              <h3>Direkter Kontakt</h3>
              <address>
                <div>
                  <span>E-Mail</span>
                  {company.email ? (
                    <a href={`mailto:${company.email}`}>{company.email}</a>
                  ) : (
                    <em>Wird vor Veröffentlichung zentral ergänzt</em>
                  )}
                </div>
                <div>
                  <span>Telefon</span>
                  {company.phone ? (
                    <a href={`tel:${company.phone.replace(/\s/g, "")}`}>
                      {company.phone}
                    </a>
                  ) : (
                    <em>Wird vor Veröffentlichung zentral ergänzt</em>
                  )}
                </div>
                <div>
                  <span>Anschrift</span>
                  {address ? (
                    <strong>{address}</strong>
                  ) : (
                    <em>Wird vor Veröffentlichung zentral ergänzt</em>
                  )}
                </div>
                {company.bookingUrl ? (
                  <div>
                    <span>Terminbuchung</span>
                    <a href={company.bookingUrl} rel="noreferrer">
                      Termin auswählen
                    </a>
                  </div>
                ) : null}
              </address>
            </div>
            <p style={{ color: "var(--muted)", fontSize: ".76rem" }}>
              Eine konkrete Antwortzeit wird nicht pauschal versprochen. Jede
              Anfrage erhält nach erfolgreichem Versand eine sichtbare
              Bestätigung.
            </p>
          </aside>
        </Container>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ContactForm } from "@/components/forms/contact-form";
import { JsonLd } from "@/components/json-ld";
import { Container } from "@/components/ui/container";
import { company } from "@/config/site";
import { absoluteUrl, createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Kontakt: Sprechen wir über Ihren Prozess",
  description:
    "Beschreiben Sie den manuellen Ablauf oder die individuelle KI-Lösung, die Sie mit KAA besprechen möchten.",
  path: "/kontakt",
});

export default function ContactPage() {
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
              <h1>Sprechen wir über Ihren Prozess</h1>
              <p className="lead">
                Beschreiben Sie kurz, welche Aufgabe heute noch manuell erledigt
                wird oder welche Lösung Sie entwickeln möchten.
              </p>
            </div>
            <div className="page-hero__aside">
              <p>
                Sie müssen noch kein technisches Konzept haben. Ein konkretes
                Beispiel aus dem Arbeitsalltag ist der beste Ausgangspunkt.
              </p>
            </div>
          </div>
        </Container>
      </section>
      <section className="section section--white">
        <Container className="form-layout">
          <div className="form-card">
            <ContactForm />
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
                  Sie beschreiben Aufgabe, Kontext und gewünschte Leistung.
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

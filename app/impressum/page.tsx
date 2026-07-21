import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Container } from "@/components/ui/container";
import { company } from "@/config/site";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Impressum",
  description: "Impressum und Anbieterkennzeichnung der KAA Website.",
  path: "/impressum",
});

export default function ImprintPage() {
  const items = [
    { label: "Startseite", href: "/" },
    { label: "Impressum", href: "/impressum" },
  ];

  return (
    <>
      <section className="page-hero">
        <Container>
          <Breadcrumbs items={items} />
          <div className="page-hero__inner">
            <div>
              <p className="eyebrow">Rechtliches</p>
              <h1>Impressum</h1>
            </div>
            <div className="page-hero__aside">
              <p>
                Anbieterkennzeichnung und Kontaktangaben für die Website der KAA
                – KI-Automatisierungs-Agentur.
              </p>
            </div>
          </div>
        </Container>
      </section>

      <section className="section section--white">
        <Container>
          <div className="legal-layout">
            <aside>
              <div className="legal-note legal-note--neutral">
                <strong>Anbieter</strong>
                <br />
                KAA ist ein Angebot der {company.legalName}.
              </div>
            </aside>

            <div className="legal-content">
              <section>
                <h2>Angaben gemäß § 5 DDG</h2>
                <p>
                  {company.legalName}
                  <br />
                  {company.street}
                  <br />
                  {company.postalCode} {company.city}
                  <br />
                  {company.country}
                </p>
              </section>

              <section>
                <h2>Vertretungsberechtigung</h2>
                <p>Geschäftsführer: {company.managingDirector}</p>
              </section>

              <section>
                <h2>Kontakt</h2>
                <p>
                  Telefon:{" "}
                  <a href={`tel:${company.phone.replace(/\s/g, "")}`}>
                    {company.phone}
                  </a>
                  <br />
                  E-Mail:{" "}
                  <a href={`mailto:${company.email}`}>{company.email}</a>
                </p>
              </section>

              <section>
                <h2>Registereintrag</h2>
                <p>
                  Registergericht: {company.registerCourt}
                  <br />
                  Handelsregisternummer: {company.registerNumber}
                </p>
              </section>

              <section>
                <h2>Umsatzsteuer</h2>
                <p>
                  Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG:{" "}
                  {company.vatId}
                </p>
              </section>

              <section>
                <h2>Verantwortlich für redaktionelle Inhalte</h2>
                <p>
                  Verantwortlich im Sinne des § 18 Abs. 2 MStV:
                  <br />
                  {company.managingDirector}
                  <br />
                  {company.street}, {company.postalCode} {company.city}
                </p>
              </section>

              <section>
                <h2>Verbraucherstreitbeilegung</h2>
                <p>
                  Wir sind nicht bereit oder verpflichtet, an
                  Streitbeilegungsverfahren vor einer
                  Verbraucherschlichtungsstelle teilzunehmen.
                </p>
              </section>

              <section>
                <h2>Urheberrecht</h2>
                <p>
                  Die auf dieser Website veröffentlichten Inhalte und Werke
                  unterliegen dem deutschen Urheberrecht. Jede Verwertung
                  außerhalb der gesetzlichen Grenzen bedarf der vorherigen
                  Zustimmung des jeweiligen Rechteinhabers.
                </p>
              </section>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}

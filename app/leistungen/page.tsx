import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { ServiceIcon } from "@/components/ui/service-icon";
import { CtaSection } from "@/components/cta-section";
import { JsonLd } from "@/components/json-ld";
import { services } from "@/content/services";
import { absoluteUrl, createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "KI-Lösungen und Prozessautomatisierung",
  description: "KI-Beratung, KI-Assistenten, Prozessautomatisierung, Wissenssysteme, Vertriebsautomatisierung und individuelle KI-Software von KAA.",
  path: "/leistungen",
});

export default function ServicesPage() {
  const items = [{ label: "Startseite", href: "/" }, { label: "Leistungen", href: "/leistungen" }];
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: services.map((service, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Service",
        name: service.name,
        description: service.shortDescription,
        url: absoluteUrl(`/leistungen/${service.slug}`),
        provider: { "@id": `${absoluteUrl()}/#organization` },
      },
    })),
  };

  return (
    <>
      <JsonLd data={itemList} />
      <section className="page-hero page-hero--dark">
        <Container>
          <Breadcrumbs items={items} />
          <div className="page-hero__inner">
            <div>
              <p className="eyebrow">Leistungen</p>
              <h1>Individuelle KI-Lösungen und Prozessautomatisierung</h1>
            </div>
            <div className="page-hero__aside">
              <p>Jedes Unternehmen arbeitet anders. Deshalb entwickelt KAA keine beliebigen Standardlösungen, sondern analysiert bestehende Abläufe und erstellt darauf abgestimmte KI-Systeme und Automatisierungen.</p>
            </div>
          </div>
        </Container>
      </section>

      <section className="section">
        <Container>
          <SectionHeader eyebrow="Sechs Leistungsbereiche" title="Von der ersten Analyse bis zur individuellen Anwendung" description={<p>Der Einstieg kann eine Prozessanalyse, ein klar abgegrenzter Assistent oder eine vollständige Softwarelösung sein. Entscheidend ist die Aufgabe, nicht das Etikett des Tools.</p>} />
          <div className="services-long-list">
            {services.map((service, index) => (
              <article className="service-long" key={service.slug}>
                <div className="service-long__head">
                  <span className="service-long__index">0{index + 1}</span>
                  <span className="service-card__icon"><ServiceIcon name={service.icon} /></span>
                  <div><h2>{service.name}</h2><p>{service.shortDescription}</p></div>
                </div>
                <div className="service-long__body">
                  <div><h3>Typische Ausgangssituation</h3><ul className="plain-list">{service.situations.slice(0, 3).map((item) => <li key={item}>{item}</li>)}</ul></div>
                  <div><h3>Mögliche Lösung</h3><p>{service.introduction}</p><h3>Beispiele</h3><ul className="tag-list">{service.capabilities.slice(0, 4).map((item) => <li key={item}>{item}</li>)}</ul></div>
                  <div><h3>Möglicher geschäftlicher Nutzen</h3><ul className="check-list">{service.benefits.map((item) => <li key={item}>{item}</li>)}</ul><h3>Beteiligte Systeme</h3><ul className="tag-list">{service.systems.map((item) => <li key={item}>{item}</li>)}</ul></div>
                </div>
                <div className="service-long__footer">
                  <ButtonLink href={`/leistungen/${service.slug}`}>{service.name} im Detail</ButtonLink>
                  <ButtonLink href={`/kontakt?leistung=${service.slug}`} variant="secondary">{service.cta}</ButtonLink>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <CtaSection title="Welcher Leistungsbereich passt zu Ihrem Prozess?" text="Wenn die passende Lösung noch nicht feststeht, beginnen wir mit der Aufgabe: Was wird heute manuell erledigt, und welches Ergebnis soll verlässlich entstehen?" />
    </>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CtaSection } from "@/components/cta-section";
import { JsonLd } from "@/components/json-ld";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { ServiceIcon } from "@/components/ui/service-icon";
import { getService, services } from "@/content/services";
import { absoluteUrl, createMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return createMetadata({
    title: service.seoTitle,
    description: service.seoDescription,
    path: `/leistungen/${service.slug}`,
    imagePath: `/leistungen/${service.slug}/opengraph-image`,
    imageAlt: `${service.name} – KAA KI-Automatisierungs-Agentur`,
  });
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();
  const serviceIndex = services.findIndex((item) => item.slug === service.slug);
  const relatedServices = [
    ...services.slice(serviceIndex + 1),
    ...services.slice(0, serviceIndex),
  ].slice(0, 3);

  const breadcrumbItems = [
    { label: "Startseite", href: "/" },
    { label: "Leistungen", href: "/leistungen" },
    { label: service.name, href: `/leistungen/${service.slug}` },
  ];

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${absoluteUrl(`/leistungen/${service.slug}`)}#service`,
    name: service.name,
    description: service.shortDescription,
    serviceType: service.name,
    url: absoluteUrl(`/leistungen/${service.slug}`),
    provider: { "@id": `${absoluteUrl()}/#organization` },
    areaServed: { "@type": "Country", name: "Deutschland" },
  };

  return (
    <>
      <JsonLd data={serviceJsonLd} />
      <section className="page-hero page-hero--dark">
        <Container>
          <Breadcrumbs items={breadcrumbItems} />
          <div className="page-hero__inner">
            <div>
              <p className="eyebrow">{service.eyebrow}</p>
              <h1>{service.h1}</h1>
            </div>
            <div className="page-hero__aside">
              <span className="service-card__icon"><ServiceIcon name={service.icon} size={30} /></span>
              <p style={{ marginTop: "1rem", fontSize: "1.12rem", color: "#d7dfeb" }}>{service.shortDescription}</p>
              <div className="button-row" style={{ marginTop: "1.5rem" }}><ButtonLink href={`/kontakt?leistung=${service.slug}`} variant="light">{service.cta}</ButtonLink></div>
            </div>
          </div>
        </Container>
      </section>

      <section className="section section--white">
        <Container>
          <div className="split-grid">
            <div className="sticky-copy"><p className="eyebrow">Ausgangspunkt</p><h2>Die Aufgabe entscheidet über die Lösung.</h2><p>{service.introduction}</p></div>
            <div>
              <h3 style={{ marginBottom: "1rem" }}>Typische Ausgangssituationen</h3>
              <ul className="problem-list">{service.situations.map((item) => <li key={item}>{item}</li>)}</ul>
            </div>
          </div>
        </Container>
      </section>

      <section className="section">
        <Container>
          <SectionHeader eyebrow="Leistungsumfang" title={`Was ${service.name} konkret umfassen kann`} description={<p>Die Bausteine werden nach Prozess, Systemlandschaft und Verantwortlichkeiten ausgewählt. Nicht jeder Baustein ist für jedes Projekt erforderlich.</p>} />
          <div className="capability-grid">
            {service.capabilities.map((item, index) => <article className="capability-card" key={item}><span>0{index + 1}</span><h3>{item}</h3></article>)}
          </div>
        </Container>
      </section>

      {service.process ? (
        <section className="section section--dark">
          <Container>
            <SectionHeader eyebrow="Beispielhafter Ablauf" title="Von einem Signal zum kontrollierten nächsten Schritt" inverse description={<p>Eine mögliche Kette – technisch konkretisiert wird sie erst nach Prüfung Ihrer Systeme und Regeln.</p>} />
            <ol className="service-process">{service.process.map((step, index) => <li key={step}><span>0{index + 1}</span><strong>{step}</strong></li>)}</ol>
          </Container>
        </section>
      ) : null}

      <section className="section section--white">
        <Container>
          <div className="split-grid split-grid--reverse">
            <div>
              <p className="eyebrow">Möglicher Nutzen</p>
              <h2>Weniger Reibung im Alltag, ohne Kontrolle abzugeben.</h2>
              <ul className="check-list" style={{ marginTop: "2rem" }}>{service.benefits.map((item) => <li key={item}>{item}</li>)}</ul>
            </div>
            <div className="principle-panel">
              <h3>Wichtige Leitplanken</h3>
              <ul>{service.principles.map((principle) => <li key={principle}>{principle}</li>)}</ul>
              <h3>Mögliche beteiligte Systeme</h3>
              <ul className="tag-list">{service.systems.map((system) => <li key={system}>{system}</li>)}</ul>
            </div>
          </div>
        </Container>
      </section>

      <section className="section section--blue">
        <Container>
          <SectionHeader eyebrow="Weitere Leistungen" title="Der Prozess kann mehrere Bausteine verbinden" />
          <div className="related-services">
            {relatedServices.map((item) => (
              <article key={item.slug}><ServiceIcon name={item.icon} /><h3>{item.name}</h3><p>{item.shortDescription}</p><ButtonLink href={`/leistungen/${item.slug}`} variant="secondary">Details ansehen</ButtonLink></article>
            ))}
          </div>
        </Container>
      </section>

      <CtaSection title={service.cta} text="Beschreiben Sie kurz den heutigen Ablauf. Gemeinsam klären wir, welche Schritte sinnvoll automatisiert, angebunden oder weiterhin durch Menschen kontrolliert werden sollten." primaryLabel={service.cta} primaryHref={`/kontakt?leistung=${service.slug}`} />
    </>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CtaSection } from "@/components/cta-section";
import { JsonLd } from "@/components/json-ld";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { ServiceIcon } from "@/components/ui/service-icon";
import { getIndustry, industries } from "@/content/industries";
import { getService } from "@/content/services";
import { absoluteUrl, createMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return industries.map((industry) => ({ slug: industry.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustry(slug);

  if (!industry) return {};

  return createMetadata({
    title: industry.seoTitle,
    description: industry.seoDescription,
    path: `/branchen/${industry.slug}`,
    imagePath: `/branchen/${industry.slug}/opengraph-image`,
    imageAlt: `${industry.seoTitle} – KAA`,
  });
}

export default async function IndustryDetailPage({ params }: Props) {
  const { slug } = await params;
  const industry = getIndustry(slug);

  if (!industry) notFound();

  const industryIndex = industries.findIndex(
    (item) => item.slug === industry.slug,
  );
  const relatedIndustries = [
    ...industries.slice(industryIndex + 1),
    ...industries.slice(0, industryIndex),
  ].slice(0, 3);
  const relatedServices = industry.serviceSlugs
    .map((serviceSlug) => getService(serviceSlug))
    .filter((service) => service !== undefined);

  const pagePath = `/branchen/${industry.slug}`;
  const pageUrl = absoluteUrl(pagePath);
  const webPageId = `${pageUrl}#webpage`;
  const serviceId = `${pageUrl}#service`;

  const breadcrumbItems = [
    { label: "Startseite", href: "/" },
    { label: "Branchen", href: "/branchen" },
    { label: industry.name, href: pagePath },
  ];

  const pageJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": webPageId,
        url: pageUrl,
        name: industry.seoTitle,
        description: industry.seoDescription,
        inLanguage: "de-DE",
        isPartOf: { "@id": `${absoluteUrl()}/#website` },
        about: { "@id": serviceId },
        mainEntity: { "@id": serviceId },
      },
      {
        "@type": "Service",
        "@id": serviceId,
        name: industry.seoTitle,
        description: industry.seoDescription,
        serviceType: "KI-Automatisierung und individuelle KI-Lösungen",
        url: pageUrl,
        mainEntityOfPage: { "@id": webPageId },
        provider: { "@id": `${absoluteUrl()}/#organization` },
        areaServed: { "@type": "Country", name: "Deutschland" },
        audience: {
          "@type": "BusinessAudience",
          name: industry.name,
        },
        category: relatedServices.map((service) => service.name),
      },
    ],
  };

  return (
    <>
      <JsonLd data={pageJsonLd} />

      <section className="page-hero page-hero--dark">
        <Container>
          <Breadcrumbs items={breadcrumbItems} />
          <div className="page-hero__inner">
            <header>
              <p className="eyebrow">Branche · {industry.name}</p>
              <h1>{industry.h1}</h1>
              <p className="lead">{industry.intro}</p>
            </header>

            <aside
              className="page-hero__aside"
              aria-label={`Einordnung für ${industry.name}`}
            >
              <p>
                Typische Schnittstellen sind {industry.systems.join(", ")}.
                Welche davon tatsächlich angebunden werden, entscheidet der
                konkrete Ablauf.
              </p>
              <p>
                <ButtonLink
                  href={`/kontakt?branche=${industry.slug}`}
                  variant="light"
                >
                  Prozess besprechen
                </ButtonLink>
              </p>
            </aside>
          </div>
        </Container>
      </section>

      <section
        className="section section--white"
        aria-labelledby="industry-approach-heading"
      >
        <Container>
          <div className="split-grid">
            <div className="sticky-copy">
              <p className="eyebrow">Der passende Ansatz</p>
              <h2 id="industry-approach-heading">
                Der Prozess bestimmt, was sinnvoll ist.
              </h2>
              <p>{industry.context}</p>
            </div>

            <div>
              <header className="section-header">
                <h3>Typische Ansatzpunkte in {industry.name}</h3>
              </header>
              <ul className="problem-list">
                {industry.examples.map((example) => (
                  <li key={example}>{example}</li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      <section className="section" aria-labelledby="industry-systems-heading">
        <Container>
          <div className="split-grid split-grid--reverse">
            <div>
              <p className="eyebrow">Systeme und Kontrolle</p>
              <h2 id="industry-systems-heading">
                Informationen verbinden, Verantwortung erhalten.
              </h2>
              <p className="lead">
                Eine Lösung ergänzt die vorhandene Systemlandschaft. Bevor Daten
                verarbeitet oder Aktionen ausgelöst werden, klären wir Quellen,
                Zugriffe, Ausnahmen und notwendige Freigaben.
              </p>
            </div>

            <aside
              className="principle-panel"
              aria-label="Technische Einordnung"
            >
              <h3>Typische beteiligte Systeme</h3>
              <ul className="tag-list">
                {industry.systems.map((system) => (
                  <li key={system}>{system}</li>
                ))}
              </ul>

              <h3>Wichtige Leitplanken</h3>
              <ul>
                {industry.guardrails.map((guardrail) => (
                  <li key={guardrail}>{guardrail}</li>
                ))}
              </ul>
            </aside>
          </div>
        </Container>
      </section>

      <section
        className="section section--blue"
        aria-labelledby="industry-services-heading"
      >
        <Container>
          <SectionHeader
            eyebrow="Passende Leistungsbausteine"
            title={
              <span id="industry-services-heading">
                KI-Lösungen für {industry.name} entstehen modular.
              </span>
            }
            description={
              <p>
                Je nach Aufgabe werden Beratung, Assistenz, Automatisierung,
                Wissenszugriff oder individuelle Software kombiniert. Die
                folgenden Leistungen sind für die beschriebenen Ansatzpunkte
                besonders relevant.
              </p>
            }
          />

          <div className="related-services">
            {relatedServices.map((service) => (
              <article key={service.slug}>
                <ServiceIcon name={service.icon} />
                <h3>{service.name}</h3>
                <p>{service.shortDescription}</p>
                <ButtonLink
                  href={`/leistungen/${service.slug}`}
                  variant="secondary"
                >
                  Leistung ansehen
                </ButtonLink>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section
        className="section section--white"
        aria-labelledby="related-industries-heading"
      >
        <Container>
          <SectionHeader
            eyebrow="Weitere Branchen"
            title={
              <span id="related-industries-heading">
                Verwandte Prozessmuster entdecken
              </span>
            }
            description={
              <p>
                Branchen unterscheiden sich fachlich. Wiederkehrende
                Informationswege, Dokumentenarbeit und Systemübergaben lassen
                sich dennoch über Branchengrenzen hinweg vergleichen.
              </p>
            }
          />

          <div className="related-services">
            {relatedIndustries.map((relatedIndustry, index) => (
              <article key={relatedIndustry.slug}>
                <span className="industry-card__number" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3>{relatedIndustry.name}</h3>
                <p>{relatedIndustry.intro}</p>
                <ButtonLink
                  href={`/branchen/${relatedIndustry.slug}`}
                  variant="secondary"
                >
                  Branche ansehen
                </ButtonLink>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <CtaSection
        title={`Welcher Ablauf soll in Ihrem Unternehmen leichter werden?`}
        text={`Beschreiben Sie uns eine konkrete Aufgabe aus ${industry.name}. Gemeinsam prüfen wir, welche Schritte sich sinnvoll unterstützen lassen, welche Systeme beteiligt sind und wo menschliche Kontrolle erhalten bleiben muss.`}
        primaryLabel="KI-Potenzial prüfen"
        primaryHref="/ki-potenzialanalyse"
        secondaryLabel="Prozess besprechen"
        secondaryHref={`/kontakt?branche=${industry.slug}`}
      />
    </>
  );
}

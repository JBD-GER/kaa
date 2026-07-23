import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CtaSection } from "@/components/cta-section";
import { JsonLd } from "@/components/json-ld";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { getService } from "@/content/services";
import {
  getUseCase,
  useCaseCategories,
  useCases,
} from "@/content/use-cases";
import { absoluteUrl, createMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return useCases.map((useCase) => ({ slug: useCase.id }));
}

function descriptionFrom(text: string, maximum = 155) {
  if (text.length <= maximum) return text;
  const shortened = text.slice(0, maximum - 1);
  const lastSpace = shortened.lastIndexOf(" ");
  return `${shortened.slice(0, lastSpace > 110 ? lastSpace : maximum - 1)}…`;
}

function categoryLabel(category: string) {
  return (
    useCaseCategories.find((item) => item.id === category)?.label ?? category
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const useCase = getUseCase(slug);
  if (!useCase) return {};

  return createMetadata({
    title: useCase.seoTitle,
    description: descriptionFrom(useCase.automatedFlow),
    path: `/anwendungsfaelle/${useCase.id}`,
    imagePath: `/anwendungsfaelle/${useCase.id}/opengraph-image`,
    imageAlt: `${useCase.title} – Anwendungsfall für KI-Automatisierung`,
  });
}

export default async function UseCaseDetailPage({ params }: Props) {
  const { slug } = await params;
  const useCase = getUseCase(slug);
  if (!useCase) notFound();

  const service = getService(useCase.serviceSlug);
  const currentIndex = useCases.findIndex((item) => item.id === useCase.id);
  const relatedUseCases = [
    ...useCases.slice(currentIndex + 1),
    ...useCases.slice(0, currentIndex),
  ]
    .filter(
      (item) =>
        item.category === useCase.category ||
        item.serviceSlug === useCase.serviceSlug,
    )
    .slice(0, 3);
  const pageUrl = absoluteUrl(`/anwendungsfaelle/${useCase.id}`);
  const breadcrumbs = [
    { label: "Startseite", href: "/" },
    { label: "Anwendungsfälle", href: "/anwendungsfaelle" },
    { label: useCase.title, href: `/anwendungsfaelle/${useCase.id}` },
  ];
  const pageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: useCase.title,
    description: useCase.automatedFlow,
    inLanguage: "de-DE",
    isPartOf: { "@id": `${absoluteUrl()}/#website` },
    mainEntity: {
      "@type": "Service",
      name: useCase.title,
      serviceType: "KI-Automatisierung",
      description: useCase.automatedFlow,
      provider: { "@id": `${absoluteUrl()}/#organization` },
      areaServed: { "@type": "Country", name: "Deutschland" },
    },
  };

  return (
    <>
      <JsonLd data={pageJsonLd} />

      <section className="page-hero page-hero--dark">
        <Container>
          <Breadcrumbs items={breadcrumbs} />
          <div className="page-hero__inner">
            <div>
              <p className="eyebrow">
                KI-Automatisierung · {categoryLabel(useCase.category)}
              </p>
              <h1>{useCase.title}</h1>
              <p className="lead">{useCase.automatedFlow}</p>
            </div>
            <aside className="page-hero__aside" aria-label="Einordnung">
              <p>
                Dieses Szenario zeigt einen möglichen Ablauf. Systeme, Regeln,
                Datenqualität und notwendige Kontrollen werden vor einer
                Umsetzung individuell geprüft.
              </p>
              {service ? (
                <p>
                  Passender Leistungsbereich:{" "}
                  <Link href={`/leistungen/${service.slug}`}>
                    {service.name}
                  </Link>
                </p>
              ) : null}
            </aside>
          </div>
        </Container>
      </section>

      <section className="section section--white">
        <Container>
          <div className="split-grid">
            <div className="sticky-copy">
              <p className="eyebrow">Ausgangssituation</p>
              <h2>Wo heute manuelle Arbeit entsteht.</h2>
              <p>{useCase.situation}</p>
              <ButtonLink
                href={`/kontakt?anwendungsfall=${useCase.id}&leistung=${useCase.serviceSlug}`}
                variant="secondary"
              >
                Diesen Ablauf besprechen
              </ButtonLink>
            </div>
            <div className="use-case-detail-flow" aria-hidden="true">
              <span>HEUTIGER PROZESSBRUCH</span>
              <p>{useCase.situation}</p>
              <i aria-hidden="true">↓</i>
              <span>MÖGLICHER NEUER ABLAUF</span>
              <p>{useCase.automatedFlow}</p>
            </div>
          </div>
        </Container>
      </section>

      <section className="section">
        <Container>
          <SectionHeader
            eyebrow="Mögliche Systemaktionen"
            title="Vom Eingang zum kontrollierten Ergebnis."
            description={
              <p>
                Die konkrete Reihenfolge richtet sich nach Ihren Systemen und
                Regeln. Diese Bausteine machen sichtbar, welche Aufgaben eine
                Lösung übernehmen kann.
              </p>
            }
          />
          <ol className="use-case-process">
            {useCase.systemActions.map((action, index) => (
              <li key={action}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{action}</strong>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="section section--blue">
        <Container>
          <div className="split-grid split-grid--reverse">
            <div>
              <p className="eyebrow">Möglicher Nutzen</p>
              <h2>Was der neue Ablauf im Alltag verbessern kann.</h2>
              <ul className="check-list use-case-benefits">
                {useCase.benefits.map((benefit) => (
                  <li key={benefit}>{benefit}</li>
                ))}
              </ul>
            </div>
            <aside className="principle-panel">
              <h3>Wichtige Leitplanken</h3>
              <ul>
                <li>Unsichere Fälle können an Mitarbeiter übergeben werden.</li>
                <li>
                  Berechtigungen und Datenzugriffe werden vorab festgelegt.
                </li>
                <li>
                  Ergebnisse und Einsparungen werden nicht pauschal
                  versprochen.
                </li>
              </ul>
              {service ? (
                <>
                  <h3>Passende Leistung</h3>
                  <p>{service.shortDescription}</p>
                  <ButtonLink
                    href={`/leistungen/${service.slug}`}
                    variant="secondary"
                  >
                    {service.name} ansehen
                  </ButtonLink>
                </>
              ) : null}
            </aside>
          </div>
        </Container>
      </section>

      {relatedUseCases.length ? (
        <section className="section section--white">
          <Container>
            <SectionHeader
              eyebrow="Weitere Prozessbeispiele"
              title="Ähnliche Aufgaben sinnvoll verbinden."
            />
            <div className="related-use-cases">
              {relatedUseCases.map((related) => (
                <article key={related.id}>
                  <span>{categoryLabel(related.category)}</span>
                  <h3>
                    <Link href={`/anwendungsfaelle/${related.id}`}>
                      {related.title}
                    </Link>
                  </h3>
                  <p>{related.automatedFlow}</p>
                  <span aria-hidden="true">Ablauf ansehen ↗</span>
                </article>
              ))}
            </div>
          </Container>
        </section>
      ) : null}

      <CtaSection
        title={useCase.cta}
        text="Beschreiben Sie kurz, wie die Aufgabe heute erledigt wird. Gemeinsam klären wir Daten, Systeme, Regeln und die sinnvollen Kontrollpunkte."
        primaryLabel={useCase.cta}
        primaryHref={`/kontakt?anwendungsfall=${useCase.id}&leistung=${useCase.serviceSlug}`}
        secondaryLabel="Alle Anwendungsfälle"
        secondaryHref="/anwendungsfaelle"
      />
    </>
  );
}

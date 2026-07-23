import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CtaSection } from "@/components/cta-section";
import { FaqAccordion } from "@/components/faq-accordion";
import { JsonLd } from "@/components/json-ld";
import { Container } from "@/components/ui/container";
import type { Article, ArticleContentBlock } from "@/content/articles";
import { articles } from "@/content/articles";
import { getService } from "@/content/services";
import { absoluteUrl, createMetadata, faqJsonLd } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() { return articles.map((article) => ({ slug: article.slug })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug) as Article | undefined;
  if (!article) return {};
  return createMetadata({
    title: article.seo.title,
    description: article.seo.description,
    path: `/ratgeber/${article.slug}`,
    type: "article",
    publishedTime: article.publishedAt,
    modifiedTime: article.updatedAt,
    imagePath: `/ratgeber/${article.slug}/opengraph-image`,
    imageAlt: `${article.title} – KAA Ratgeber`,
  });
}

const dateFormatter = new Intl.DateTimeFormat("de-DE", { day: "2-digit", month: "long", year: "numeric" });

function Block({ block }: { block: ArticleContentBlock }) {
  if (block.type === "paragraph") return <p>{block.text}</p>;
  if (block.type === "bullet-list") return <ul>{block.items.map((item) => <li key={item}>{item}</li>)}</ul>;
  if (block.type === "callout") return <aside className="article-callout">{block.title ? <strong>{block.title}</strong> : null}<span>{block.text}</span></aside>;
  return (
    <div className="article-example">
      <strong>{block.title}</strong>
      <p>{block.text}</p>
      {block.steps ? <ol>{block.steps.map((step) => <li key={step}>{step}</li>)}</ol> : null}
    </div>
  );
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug) as Article | undefined;
  if (!article) notFound();

  const breadcrumbs = [
    { label: "Startseite", href: "/" },
    { label: "Ratgeber", href: "/ratgeber" },
    { label: article.title, href: `/ratgeber/${article.slug}` },
  ];
  const articleUrl = absoluteUrl(`/ratgeber/${article.slug}`);
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": ["Article", "BlogPosting"],
    "@id": `${articleUrl}#article`,
    headline: article.title,
    description: article.excerpt,
    url: articleUrl,
    mainEntityOfPage: articleUrl,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt,
    inLanguage: "de-DE",
    author: { "@type": "Organization", name: article.author, url: absoluteUrl("/ueber-uns") },
    publisher: { "@id": `${absoluteUrl()}/#organization` },
    image: {
      "@type": "ImageObject",
      url: absoluteUrl(`/ratgeber/${article.slug}/opengraph-image`),
      width: 1200,
      height: 630,
    },
    articleSection: article.category,
  };

  const visibleFaqs = article.faqs.map((faq) => ({ question: faq.question, answer: faq.answer }));
  const currentIndex = articles.findIndex((item) => item.slug === article.slug);
  const rotatedArticles = [
    ...articles.slice(currentIndex + 1),
    ...articles.slice(0, currentIndex),
  ];
  const related = rotatedArticles
    .map((item, rotationIndex) => ({
      item,
      rotationIndex,
      relevance:
        (item.category === article.category ? 2 : 0) +
        item.serviceSlugs.filter((service) =>
          article.serviceSlugs.includes(service),
        ).length,
    }))
    .filter(({ relevance }) => relevance > 0)
    .sort(
      (left, right) =>
        right.relevance - left.relevance ||
        left.rotationIndex - right.rotationIndex,
    )
    .slice(0, 3)
    .map(({ item }) => item);

  return (
    <>
      <JsonLd data={[articleJsonLd, faqJsonLd(visibleFaqs)]} />
      <article className="article-page">
        <header className="article-hero">
          <Container>
            <Breadcrumbs items={breadcrumbs} />
            <p className="eyebrow">{article.category}</p>
            <h1>{article.title}</h1>
            <p className="article-hero__intro">{article.excerpt}</p>
            <div className="article-meta">
              <span>Autor: {article.author}</span>
              <span>Veröffentlicht: <time dateTime={article.publishedAt}>{dateFormatter.format(new Date(`${article.publishedAt}T12:00:00Z`))}</time></span>
              <span>Aktualisiert: <time dateTime={article.updatedAt}>{dateFormatter.format(new Date(`${article.updatedAt}T12:00:00Z`))}</time></span>
              <span>{article.readingTime} Minuten Lesezeit</span>
            </div>
          </Container>
        </header>

        <section className="section section--white">
          <Container className="article-layout">
            <aside className="toc" aria-label="Inhaltsverzeichnis">
              <strong>Inhalt</strong>
              <ol>{article.sections.map((section) => <li key={section.id}><a href={`#${section.id}`}>{section.heading}</a></li>)}</ol>
            </aside>
            <div className="article-content">
            {article.introduction.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            {article.sections.map((section) => (
              <section id={section.id} key={section.id}>
                <h2>{section.heading}</h2>
                {section.blocks.map((block, index) => <Block block={block} key={`${block.type}-${index}`} />)}
                {section.subsections?.map((subsection) => <div id={subsection.id} key={subsection.id}><h3>{subsection.heading}</h3>{subsection.blocks.map((block, index) => <Block block={block} key={`${block.type}-${index}`} />)}</div>)}
              </section>
            ))}

            <section aria-labelledby="article-faq-title"><h2 id="article-faq-title">Häufige Fragen</h2><FaqAccordion faqs={visibleFaqs} /></section>

            <section aria-labelledby="article-services-title">
              <h2 id="article-services-title">Passende Leistungen</h2>
              <div className="article-service-links">{article.serviceSlugs.map((serviceSlug) => { const service = getService(serviceSlug); return service ? <Link href={`/leistungen/${service.slug}`} key={service.slug}><strong>{service.name}</strong><span>{service.shortDescription}</span></Link> : null; })}</div>
            </section>

              <aside className="article-author"><strong>{article.author}</strong><p>Die KAA Redaktion bereitet Grundlagen zu KI-Automatisierung, Systemintegration und individueller Software verständlich für Unternehmensentscheider auf.</p><Link href="/ueber-uns">Mehr über KAA und unsere Arbeitsweise</Link></aside>
            </div>
          </Container>
        </section>
      </article>

      {related.length ? (
        <section className="section"><Container><h2 style={{ marginBottom: "2rem" }}>Weiterlesen</h2><div className="article-grid">{related.map((item) => <article className="article-card" key={item.slug}><div className="article-card__meta"><span>{item.category}</span><span>{item.readingTime} Min.</span></div><h3><Link href={`/ratgeber/${item.slug}`}>{item.title}</Link></h3><p>{item.excerpt}</p><span className="article-card__link">Artikel lesen ↗</span></article>)}</div></Container></section>
      ) : null}

      <CtaSection title={article.cta.title} text={article.cta.text} primaryLabel={article.cta.label} primaryHref={article.cta.href} secondaryLabel="Leistungen ansehen" secondaryHref="/leistungen" />
    </>
  );
}

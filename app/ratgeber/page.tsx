import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CtaSection } from "@/components/cta-section";
import { Container } from "@/components/ui/container";
import { articleCategories, articles } from "@/content/articles";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Ratgeber zu KI-Automatisierung im Unternehmen",
  description: "Fundierte Artikel über KI-Automatisierung, Prozesse, KI-Assistenten, Wissenssysteme, Schnittstellen, Kosten und individuelle KI-Software.",
  path: "/ratgeber",
});

const dateFormatter = new Intl.DateTimeFormat("de-DE", { day: "2-digit", month: "long", year: "numeric" });

export default function GuidesPage() {
  const items = [{ label: "Startseite", href: "/" }, { label: "Ratgeber", href: "/ratgeber" }];
  const populatedCategories = articleCategories.filter((category) =>
    articles.some((article) => article.category === category),
  );
  return (
    <>
      <section className="page-hero page-hero--dark">
        <Container><Breadcrumbs items={items} /><div className="page-hero__inner"><div><p className="eyebrow">Ratgeber</p><h1>KI-Automatisierung verständlich eingeordnet.</h1></div><div className="page-hero__aside"><p>Konkrete Grundlagen für Unternehmen, die Prozesse nicht nur ausprobieren, sondern sinnvoll analysieren, integrieren und kontrollieren möchten.</p></div></div></Container>
      </section>
      <section className="section section--tight section--white">
        <Container>
          <p className="eyebrow">Themen</p>
          <ul className="category-list">{populatedCategories.map((category) => <li key={category}>{category}</li>)}</ul>
        </Container>
      </section>
      <section className="section">
        <Container>
          <div className="article-grid">
            {articles.map((article) => (
              <article className="article-card" key={article.slug}>
                <div className="article-card__meta"><span>{article.category}</span><span>{article.readingTime} Min. Lesezeit</span></div>
                <h2><Link href={`/ratgeber/${article.slug}`}>{article.title}</Link></h2>
                <p>{article.excerpt}</p>
                <div className="article-card__link">Artikel lesen <span aria-hidden="true">↗</span></div>
                <time dateTime={article.updatedAt} style={{ marginTop: ".8rem", color: "var(--muted)", fontSize: ".7rem" }}>Aktualisiert am {dateFormatter.format(new Date(`${article.updatedAt}T12:00:00Z`))}</time>
              </article>
            ))}
          </div>
        </Container>
      </section>
      <CtaSection title="Welches Thema betrifft Ihren Prozess?" text="Der Ratgeber schafft Orientierung. Für eine belastbare Entscheidung betrachten wir anschließend den konkreten Ablauf, die Systeme und die fachlichen Kontrollpunkte." />
    </>
  );
}

import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { CtaSection } from "@/components/cta-section";
import { FaqAccordion } from "@/components/faq-accordion";
import { JsonLd } from "@/components/json-ld";
import { Container } from "@/components/ui/container";
import { faqs } from "@/content/faqs";
import { createMetadata, faqJsonLd } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Häufige Fragen zu KI-Automatisierung",
  description: "Verständliche Antworten zu Prozessen, Kosten, Dauer, Datenschutz, bestehenden Systemen und individueller KI-Software.",
  path: "/haeufige-fragen",
});

export default function FaqPage() {
  const items = [{ label: "Startseite", href: "/" }, { label: "Häufige Fragen", href: "/haeufige-fragen" }];
  return (
    <>
      <JsonLd data={faqJsonLd(faqs)} />
      <section className="page-hero">
        <Container><Breadcrumbs items={items} /><div className="page-hero__inner"><div><p className="eyebrow">Häufige Fragen</p><h1>Was Unternehmen vor dem Start wissen möchten.</h1></div><div className="page-hero__aside"><p>Klare Antworten ohne pauschale Versprechen. Kosten, Zeit und technische Möglichkeiten hängen vom tatsächlichen Ablauf und den beteiligten Systemen ab.</p></div></div></Container>
      </section>
      <section className="section section--white"><Container><FaqAccordion faqs={faqs} /></Container></section>
      <CtaSection title="Ihre Frage beginnt mit einem konkreten Ablauf?" text="Beschreiben Sie kurz, welche Aufgabe heute manuell erledigt wird. Wir ordnen ein, welche Informationen für eine fundierte Prüfung nötig sind." />
    </>
  );
}

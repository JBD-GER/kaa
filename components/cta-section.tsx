import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

type Props = {
  title?: string;
  text?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
};

export function CtaSection({
  title = "Welche Aufgaben kosten Ihr Unternehmen jeden Tag unnötig Zeit?",
  text = "Gemeinsam prüfen wir, welche Abläufe sich sinnvoll automatisieren lassen und welche Lösung zu Ihren bestehenden Systemen passt.",
  primaryLabel = "KI-Potenzial prüfen",
  primaryHref = "/ki-potenzialanalyse",
  secondaryLabel = "Kontakt aufnehmen",
  secondaryHref = "/kontakt",
}: Props) {
  return (
    <section className="cta-section">
      <Container>
        <div className="cta-panel">
          <div className="cta-panel__signal" aria-hidden="true">
            <i /><i /><i /><span />
          </div>
          <div className="cta-panel__content">
            <p className="eyebrow">Der nächste sinnvolle Schritt</p>
            <h2>{title}</h2>
            <p>{text}</p>
          </div>
          <div className="button-row">
            <ButtonLink href={primaryHref} variant="light">{primaryLabel}</ButtonLink>
            <ButtonLink href={secondaryHref} variant="ghost">{secondaryLabel}</ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}

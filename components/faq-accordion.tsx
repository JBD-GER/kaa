import type { Faq } from "@/content/faqs";

export function FaqAccordion({ faqs }: { faqs: readonly Faq[] }) {
  return (
    <div className="faq-list">
      {faqs.map((faq, index) => (
        <details className="faq-item" key={faq.question} open={index === 0}>
          <summary>
            <span>{faq.question}</span>
            <span className="faq-item__icon" aria-hidden="true">+</span>
          </summary>
          <div className="faq-item__answer"><p>{faq.answer}</p></div>
        </details>
      ))}
    </div>
  );
}

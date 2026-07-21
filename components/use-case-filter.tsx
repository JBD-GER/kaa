"use client";

import Link from "next/link";
import { useState } from "react";
import type { UseCase, UseCaseCategory } from "@/content/use-cases";

type CategoryOption = {
  id: UseCaseCategory;
  label: string;
};

type ServiceReference = {
  href: string;
  name: string;
};

type UseCaseFilterProps = {
  categories: readonly CategoryOption[];
  items: readonly UseCase[];
  servicesBySlug: Record<string, ServiceReference>;
};

function resultLabel(count: number) {
  return count === 1 ? "1 Anwendungsfall" : `${count} Anwendungsfälle`;
}

export function UseCaseFilter({
  categories,
  items,
  servicesBySlug,
}: UseCaseFilterProps) {
  const [activeCategory, setActiveCategory] = useState<UseCaseCategory>("alle");
  const activeLabel =
    categories.find((category) => category.id === activeCategory)?.label ??
    "Alle";
  const visibleCount =
    activeCategory === "alle"
      ? items.length
      : items.filter((item) => item.category === activeCategory).length;

  return (
    <>
      <div
        className="filter-bar"
        role="group"
        aria-label="Anwendungsfälle nach Bereich filtern"
      >
        {categories.map((category) => (
          <button
            className="filter-button"
            type="button"
            key={category.id}
            aria-controls="use-case-results"
            aria-pressed={activeCategory === category.id}
            onClick={() => setActiveCategory(category.id)}
          >
            {category.label}
          </button>
        ))}
      </div>

      <p
        className="filter-summary"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {resultLabel(visibleCount)} {visibleCount === 1 ? "wird" : "werden"}{" "}
        angezeigt
        {activeCategory === "alle" ? "." : ` · Bereich: ${activeLabel}.`}
      </p>

      <div className="use-case-grid" id="use-case-results">
        {items.map((useCase) => {
          const isVisible =
            activeCategory === "alle" || useCase.category === activeCategory;
          const categoryLabel =
            categories.find((category) => category.id === useCase.category)
              ?.label ?? useCase.category;
          const service = servicesBySlug[useCase.serviceSlug];

          return (
            <article
              className="use-case-card"
              data-category={useCase.category}
              hidden={!isVisible}
              id={useCase.id}
              key={useCase.id}
              aria-labelledby={`${useCase.id}-title`}
            >
              <div className="use-case-card__meta">
                <span>{categoryLabel}</span>
                <span>Prozessbeispiel</span>
              </div>

              <h2 id={`${useCase.id}-title`}>{useCase.title}</h2>

              <h3>Ausgangssituation</h3>
              <p>{useCase.situation}</p>

              <h3>Automatisierter Ablauf</h3>
              <p className="use-case-card__flow">{useCase.automatedFlow}</p>

              <h3>Mögliche Systemaktionen</h3>
              <ul className="tag-list">
                {useCase.systemActions.map((action) => (
                  <li key={action}>{action}</li>
                ))}
              </ul>

              <h3>Möglicher Nutzen</h3>
              <ul className="tag-list">
                {useCase.benefits.map((benefit) => (
                  <li key={benefit}>{benefit}</li>
                ))}
              </ul>

              <footer className="use-case-card__footer">
                {service ? (
                  <Link
                    href={service.href}
                    aria-label={`Passende Leistung: ${service.name}`}
                  >
                    {service.name}
                  </Link>
                ) : null}
                <Link
                  href={{
                    pathname: "/kontakt",
                    query: {
                      anwendungsfall: useCase.id,
                      leistung: useCase.serviceSlug,
                    },
                  }}
                  aria-label={`${useCase.cta}: ${useCase.title}`}
                >
                  {useCase.cta} <span aria-hidden="true">→</span>
                </Link>
              </footer>
            </article>
          );
        })}
      </div>
    </>
  );
}

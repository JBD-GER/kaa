import Link from "next/link";
import { ServiceIcon } from "@/components/ui/service-icon";
import type { Service } from "@/content/services";

export function ServiceCard({ service, index }: { service: Service; index: number }) {
  return (
    <article className={`service-card service-card--${service.accent}`}>
      <div className="service-card__top">
        <span className="service-card__index">0{index + 1}</span>
        <span className="service-card__icon"><ServiceIcon name={service.icon} /></span>
      </div>
      <p className="service-card__eyebrow">{service.eyebrow}</p>
      <h3>
        <Link
          href={`/leistungen/${service.slug}`}
          aria-label={`${service.name} im Detail`}
        >
          {service.name}
        </Link>
      </h3>
      <p>{service.shortDescription}</p>
      <ul className="service-card__capabilities">
        {service.capabilities.slice(0, 2).map((capability) => (
          <li key={capability}>{capability}</li>
        ))}
      </ul>
      <span className="service-card__link" aria-hidden="true">
        Details ansehen <span aria-hidden="true">↗</span>
      </span>
    </article>
  );
}

import Link from "next/link";
import { MotionCard } from "@/components/ui/motion-card";
import { ServiceIcon } from "@/components/ui/service-icon";
import type { Service } from "@/content/services";

export function ServiceCard({ service, index }: { service: Service; index: number }) {
  return (
    <MotionCard className={`service-card service-card--${service.accent}`}>
      <div className="service-card__top">
        <span className="service-card__index">0{index + 1}</span>
        <span className="service-card__icon"><ServiceIcon name={service.icon} /></span>
      </div>
      <h3><Link href={`/leistungen/${service.slug}`}>{service.name}</Link></h3>
      <p>{service.shortDescription}</p>
      <div className="service-card__flow" aria-hidden="true"><i /><i /><i /><span /></div>
      <Link className="service-card__link" href={`/leistungen/${service.slug}`} aria-label={`${service.name}: Details ansehen`}>
        Details ansehen <span aria-hidden="true">↗</span>
      </Link>
    </MotionCard>
  );
}

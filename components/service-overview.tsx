import { services } from "@/content/services";
import { ServiceCard } from "@/components/service-card";

export function ServiceOverview() {
  return <div className="service-grid">{services.map((service, index) => <ServiceCard service={service} index={index} key={service.slug} />)}</div>;
}

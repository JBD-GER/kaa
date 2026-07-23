import type { MetadataRoute } from "next";
import { SITE_URL } from "@/config/site";
import { articles } from "@/content/articles";
import { industries } from "@/content/industries";
import { services } from "@/content/services";
import { useCases } from "@/content/use-cases";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = [
    "",
    "/leistungen",
    "/anwendungsfaelle",
    "/branchen",
    "/ki-potenzialanalyse",
    "/ueber-uns",
    "/vorgehensweise",
    "/ratgeber",
    "/haeufige-fragen",
    "/kontakt",
    "/impressum",
    "/datenschutz",
    "/agb",
    "/cookie-einstellungen",
  ];

  return [
    ...staticPaths.map((path) => ({
      url: `${SITE_URL}${path}`,
    })),
    ...services.map((service) => ({
      url: `${SITE_URL}/leistungen/${service.slug}`,
    })),
    ...useCases.map((useCase) => ({
      url: `${SITE_URL}/anwendungsfaelle/${useCase.id}`,
    })),
    ...industries.map((industry) => ({
      url: `${SITE_URL}/branchen/${industry.slug}`,
    })),
    ...articles.map((article) => ({
      url: `${SITE_URL}/ratgeber/${article.slug}`,
      lastModified: new Date(`${article.updatedAt}T00:00:00.000Z`),
    })),
  ];
}

import type { MetadataRoute } from "next";
import { SITE_LAST_MODIFIED, SITE_URL } from "@/config/site";
import { articles } from "@/content/articles";
import { industries } from "@/content/industries";
import { services } from "@/content/services";
import { useCases } from "@/content/use-cases";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(`${SITE_LAST_MODIFIED}T00:00:00.000Z`);
  const staticPages = [
    { path: "", changeFrequency: "weekly", priority: 1 },
    { path: "/leistungen", changeFrequency: "monthly", priority: 0.9 },
    { path: "/anwendungsfaelle", changeFrequency: "monthly", priority: 0.9 },
    { path: "/branchen", changeFrequency: "monthly", priority: 0.9 },
    { path: "/ki-potenzialanalyse", changeFrequency: "monthly", priority: 0.9 },
    { path: "/ratgeber", changeFrequency: "weekly", priority: 0.9 },
    { path: "/ueber-uns", changeFrequency: "monthly", priority: 0.7 },
    { path: "/vorgehensweise", changeFrequency: "monthly", priority: 0.7 },
    { path: "/haeufige-fragen", changeFrequency: "monthly", priority: 0.7 },
    { path: "/kontakt", changeFrequency: "monthly", priority: 0.7 },
    { path: "/impressum", changeFrequency: "yearly", priority: 0.2 },
    { path: "/datenschutz", changeFrequency: "yearly", priority: 0.2 },
    { path: "/agb", changeFrequency: "yearly", priority: 0.2 },
    {
      path: "/cookie-einstellungen",
      changeFrequency: "yearly",
      priority: 0.1,
    },
  ] as const;

  return [
    ...staticPages.map(({ path, changeFrequency, priority }) => ({
      url: `${SITE_URL}${path}`,
      lastModified,
      changeFrequency,
      priority,
    })),
    ...services.map((service) => ({
      url: `${SITE_URL}/leistungen/${service.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...useCases.map((useCase) => ({
      url: `${SITE_URL}/anwendungsfaelle/${useCase.id}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...industries.map((industry) => ({
      url: `${SITE_URL}/branchen/${industry.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
    ...articles.map((article) => ({
      url: `${SITE_URL}/ratgeber/${article.slug}`,
      lastModified: new Date(`${article.updatedAt}T00:00:00.000Z`),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}

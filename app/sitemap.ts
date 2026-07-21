import type { MetadataRoute } from "next";
import { SITE_URL } from "@/config/site";
import { articles } from "@/content/articles";
import { services } from "@/content/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date("2026-07-20T00:00:00.000Z");
  const staticPages: Array<{
    path: string;
    priority: number;
    changeFrequency: "weekly" | "monthly" | "yearly";
  }> = [
    { path: "", priority: 1, changeFrequency: "weekly" },
    { path: "/leistungen", priority: 0.9, changeFrequency: "monthly" },
    { path: "/anwendungsfaelle", priority: 0.85, changeFrequency: "monthly" },
    { path: "/branchen", priority: 0.75, changeFrequency: "monthly" },
    { path: "/ki-potenzialanalyse", priority: 0.9, changeFrequency: "monthly" },
    { path: "/ueber-uns", priority: 0.65, changeFrequency: "monthly" },
    { path: "/vorgehensweise", priority: 0.75, changeFrequency: "monthly" },
    { path: "/ratgeber", priority: 0.85, changeFrequency: "weekly" },
    { path: "/haeufige-fragen", priority: 0.7, changeFrequency: "monthly" },
    { path: "/kontakt", priority: 0.8, changeFrequency: "monthly" },
    { path: "/impressum", priority: 0.2, changeFrequency: "yearly" },
    { path: "/datenschutz", priority: 0.2, changeFrequency: "yearly" },
    { path: "/agb", priority: 0.2, changeFrequency: "yearly" },
    { path: "/cookie-einstellungen", priority: 0.2, changeFrequency: "yearly" },
  ];

  return [
    ...staticPages.map((page) => ({
      url: `${SITE_URL}${page.path}`,
      lastModified: now,
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    })),
    ...services.map((service) => ({
      url: `${SITE_URL}/leistungen/${service.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    })),
    ...articles.map((article) => ({
      url: `${SITE_URL}/ratgeber/${article.slug}`,
      lastModified: new Date(`${article.updatedAt}T00:00:00.000Z`),
      changeFrequency: "monthly" as const,
      priority: 0.72,
    })),
  ];
}

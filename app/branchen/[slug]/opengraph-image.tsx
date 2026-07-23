import { getIndustry } from "@/content/industries";
import { createSocialImage } from "@/lib/social-image";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function IndustryOpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const industry = getIndustry(slug);

  return createSocialImage({
    category: "Branchenlösung",
    title: industry?.seoTitle ?? "KI-Automatisierung für Unternehmen",
    summary: industry?.intro,
  });
}

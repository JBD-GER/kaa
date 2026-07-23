import { getService } from "@/content/services";
import { createSocialImage } from "@/lib/social-image";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function ServiceOpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);

  return createSocialImage({
    category: "Leistung",
    title: service?.name ?? "Individuelle KI-Lösung",
    summary: service?.shortDescription,
  });
}

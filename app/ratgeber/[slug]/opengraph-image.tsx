import { articles } from "@/content/articles";
import { createSocialImage } from "@/lib/social-image";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function ArticleOpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);

  return createSocialImage({
    category: article?.category ?? "KAA Ratgeber",
    title: article?.title ?? "KI-Automatisierung verständlich eingeordnet",
  });
}

import { getUseCase } from "@/content/use-cases";
import { createSocialImage } from "@/lib/social-image";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function UseCaseOpenGraphImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const useCase = getUseCase(slug);

  return createSocialImage({
    category: "Anwendungsfall",
    title: useCase?.seoTitle ?? "KI-Automatisierung im Unternehmen",
    summary: useCase?.automatedFlow,
  });
}

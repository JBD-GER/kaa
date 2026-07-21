import type { Metadata } from "next";
import { company, SITE_URL, siteConfig } from "@/config/site";

type MetadataInput = {
  title: string;
  description: string;
  path: string;
  noIndex?: boolean;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
};

export function absoluteUrl(path = "/") {
  return `${SITE_URL}${path === "/" ? "" : path}`;
}

export function createMetadata({
  title,
  description,
  path,
  noIndex = false,
  type = "website",
  publishedTime,
  modifiedTime,
}: MetadataInput): Metadata {
  const canonical = absoluteUrl(path);
  const socialImage = absoluteUrl("/opengraph-image");

  return {
    title,
    description,
    alternates: { canonical },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      type,
      locale: siteConfig.locale,
      siteName: siteConfig.name,
      title,
      description,
      url: canonical,
      images: [
        {
          url: socialImage,
          width: 1200,
          height: 630,
          alt: "KAA – KI-Automatisierungs-Agentur",
        },
      ],
      ...(type === "article" ? { publishedTime, modifiedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [socialImage],
    },
  };
}

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: "KAA",
  alternateName: "KI-Automatisierungs-Agentur",
  legalName: company.legalName,
  url: SITE_URL,
  logo: absoluteUrl("/brand/og-logo.svg"),
  description: siteConfig.description,
  email: company.email,
  telephone: company.phone,
  address: {
    "@type": "PostalAddress",
    streetAddress: company.street,
    postalCode: company.postalCode,
    addressLocality: company.city,
    addressCountry: company.countryCode,
  },
};

export const professionalServiceJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${SITE_URL}/#professional-service`,
  name: "KAA – KI-Automatisierungs-Agentur",
  url: SITE_URL,
  description: siteConfig.description,
  email: company.email,
  telephone: company.phone,
  address: {
    "@type": "PostalAddress",
    streetAddress: company.street,
    postalCode: company.postalCode,
    addressLocality: company.city,
    addressCountry: company.countryCode,
  },
  areaServed: { "@type": "Country", name: "Deutschland" },
  serviceType: [
    "KI-Beratung",
    "KI-Assistenten",
    "Prozessautomatisierung",
    "Wissenssysteme",
    "Vertriebsautomatisierung",
    "Individuelle KI-Software",
  ],
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: siteConfig.name,
  inLanguage: "de-DE",
  publisher: { "@id": `${SITE_URL}/#organization` },
};

export function breadcrumbJsonLd(
  items: Array<{ label: string; href: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      item: absoluteUrl(item.href),
    })),
  };
}

export function faqJsonLd(
  faqs: readonly { question: string; answer: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

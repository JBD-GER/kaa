import type { Metadata } from "next";
import { company, SITE_URL, siteConfig } from "@/config/site";
import { services } from "@/content/services";

type MetadataInput = {
  title: string;
  description: string;
  path: string;
  noIndex?: boolean;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  imagePath?: string;
  imageAlt?: string;
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
  imagePath = "/opengraph-image",
  imageAlt,
}: MetadataInput): Metadata {
  const canonical = absoluteUrl(path);
  const socialImage = absoluteUrl(imagePath);

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        "de-DE": canonical,
        "x-default": canonical,
      },
    },
    robots: noIndex
      ? { index: false, follow: true }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
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
          alt: imageAlt ?? `${title} – KAA`,
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

const organizationEntity = {
  "@type": ["Organization", "ProfessionalService"],
  "@id": `${SITE_URL}/#organization`,
  name: "KAA",
  alternateName: "KI-Automatisierungs-Agentur",
  legalName: company.legalName,
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    "@id": `${SITE_URL}/#logo`,
    url: absoluteUrl("/apple-icon.png"),
    contentUrl: absoluteUrl("/apple-icon.png"),
    width: 180,
    height: 180,
    caption: "KAA – KI-Automatisierungs-Agentur",
  },
  image: {
    "@type": "ImageObject",
    url: absoluteUrl("/opengraph-image"),
    width: 1200,
    height: 630,
  },
  description: siteConfig.description,
  email: company.email,
  telephone: company.phoneInternational,
  vatID: company.vatId,
  address: {
    "@type": "PostalAddress",
    "@id": `${SITE_URL}/#postal-address`,
    streetAddress: company.street,
    postalCode: company.postalCode,
    addressLocality: company.city,
    addressRegion: company.state,
    addressCountry: company.countryCode,
  },
  contactPoint: {
    "@type": "ContactPoint",
    "@id": `${SITE_URL}/#contact-point`,
    contactType: "customer service",
    email: company.email,
    telephone: company.phoneInternational,
    availableLanguage: ["German"],
    areaServed: "DE",
  },
  founder: {
    "@type": "Person",
    "@id": `${SITE_URL}/#founder`,
    name: company.founder.name,
    jobTitle: company.founder.role,
    description: company.founder.biography,
    url: absoluteUrl("/ueber-uns"),
    worksFor: { "@id": `${SITE_URL}/#organization` },
  },
  areaServed: { "@type": "Country", name: "Deutschland" },
  knowsAbout: [
    "KI-Automatisierung",
    "Prozessautomatisierung",
    "KI-Assistenten",
    "Systemintegration",
    "Wissenssysteme",
    "Individuelle KI-Software",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "KI-Leistungen für Unternehmen",
    itemListElement: services.map((service) => ({
      "@type": "Offer",
      "@id": `${absoluteUrl(`/leistungen/${service.slug}`)}#offer`,
      itemOffered: {
        "@type": "Service",
        "@id": `${absoluteUrl(`/leistungen/${service.slug}`)}#service`,
        name: service.name,
        description: service.shortDescription,
        url: absoluteUrl(`/leistungen/${service.slug}`),
      },
    })),
  },
  ...(company.social.length
    ? { sameAs: company.social.map((profile) => profile.href) }
    : {}),
};

const websiteEntity = {
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: siteConfig.name,
  alternateName: "KAA",
  description: siteConfig.description,
  inLanguage: "de-DE",
  publisher: { "@id": `${SITE_URL}/#organization` },
};

export const siteGraphJsonLd = {
  "@context": "https://schema.org",
  "@graph": [organizationEntity, websiteEntity],
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

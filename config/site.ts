export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://www.ki-automatisierungs-agentur.de";

export const SITE_LAST_MODIFIED = "2026-07-23";

export const company = {
  brand: "KAA",
  descriptor: "KI-Automatisierungs-Agentur",
  legalName: "Flaaq Holding GmbH",
  managingDirector: "Christoph Pfad",
  street: "Großer Kamp 5a",
  postalCode: "31633",
  city: "Leese",
  state: "Niedersachsen",
  country: "Deutschland",
  countryCode: "DE",
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || "05761 8429666",
  phoneInternational:
    process.env.NEXT_PUBLIC_CONTACT_PHONE_INTERNATIONAL ||
    "+49 5761 8429666",
  email:
    process.env.NEXT_PUBLIC_CONTACT_EMAIL ||
    "kontakt@ki-automatisierungs-agentur.de",
  registerCourt: "Amtsgericht Hannover",
  registerNumber: "HRB 230241",
  vatId: "DE460472563",
  founder: {
    name: "Christoph Pfad",
    role: "Geschäftsführer und direkter Ansprechpartner",
    biography:
      "Christoph Pfad begleitet KAA-Projekte von der Einordnung des Geschäftsprozesses bis zur technischen Umsetzung.",
    image: null as string | null,
  },
  social: [] as Array<{ label: string; href: string }>,
  bookingUrl: process.env.NEXT_PUBLIC_BOOKING_URL || null,
} as const;

export const siteConfig = {
  name: "KAA – KI-Automatisierungs-Agentur",
  shortName: "KAA",
  url: SITE_URL,
  locale: "de_DE",
  language: "de",
  titleTemplate: "%s | KAA",
  defaultTitle: "KAA – KI-Automatisierungs-Agentur für Unternehmen",
  description:
    "KAA entwickelt individuelle KI-Lösungen, automatisiert wiederkehrende Aufgaben und verbindet bestehende Systeme zu intelligenten Unternehmensprozessen.",
  consentVersion: "1.0",
  author: "KAA Redaktion",
  themeColor: "#071018",
} as const;

export const primaryNavigation = [
  { label: "Leistungen", href: "/leistungen", megaMenu: true },
  { label: "Anwendungsfälle", href: "/anwendungsfaelle" },
  { label: "Branchen", href: "/branchen" },
  { label: "Über uns", href: "/ueber-uns" },
  { label: "Ratgeber", href: "/ratgeber" },
  { label: "Kontakt", href: "/kontakt" },
] as const;

export const companyNavigation = [
  { label: "Über uns", href: "/ueber-uns" },
  { label: "Vorgehensweise", href: "/vorgehensweise" },
  { label: "Anwendungsfälle", href: "/anwendungsfaelle" },
  { label: "Branchen", href: "/branchen" },
  { label: "Ratgeber", href: "/ratgeber" },
  { label: "Häufige Fragen", href: "/haeufige-fragen" },
  { label: "Kontakt", href: "/kontakt" },
] as const;

export const legalNavigation = [
  { label: "Impressum", href: "/impressum" },
  { label: "Datenschutz", href: "/datenschutz" },
  { label: "AGB", href: "/agb" },
  { label: "Cookie-Einstellungen", href: "/cookie-einstellungen" },
] as const;

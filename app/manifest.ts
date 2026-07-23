import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "KAA – KI-Automatisierungs-Agentur",
    short_name: "KAA",
    description: "Individuelle KI-Lösungen und Prozessautomatisierung für Unternehmen.",
    start_url: "/",
    display: "standalone",
    background_color: "#f3f1e9",
    theme_color: "#071018",
    lang: "de-DE",
    icons: [
      { src: "/icon.svg", sizes: "any", type: "image/svg+xml", purpose: "any" },
      { src: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
  };
}

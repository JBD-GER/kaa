import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./redesign.css";
import { ConsentProvider } from "@/components/consent/consent-provider";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { SITE_URL, siteConfig } from "@/config/site";
import { siteGraphJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: siteConfig.defaultTitle,
    template: siteConfig.titleTemplate,
  },
  description: siteConfig.description,
  applicationName: "KAA",
  authors: [{ name: siteConfig.author }],
  creator: "KAA",
  publisher: "KAA",
  category: "business",
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml", sizes: "any" }],
    apple: [{ url: "/apple-icon.png", type: "image/png", sizes: "180x180" }],
  },
  manifest: "/manifest.webmanifest",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f3f1e9" },
    { media: "(prefers-color-scheme: dark)", color: "#071018" },
  ],
  colorScheme: "light",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de-DE">
      <body>
        <a href="#main-content" className="skip-link">Zum Hauptinhalt springen</a>
        <ConsentProvider>
          <Header />
          <main id="main-content" tabIndex={-1}>{children}</main>
          <Footer />
        </ConsentProvider>
        <JsonLd data={siteGraphJsonLd} />
      </body>
    </html>
  );
}

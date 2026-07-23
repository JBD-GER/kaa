import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import "./redesign.css";
import { ConsentProvider } from "@/components/consent/consent-provider";
import { GoogleAdsTag } from "@/components/consent/google-ads-tag";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { JsonLd } from "@/components/json-ld";
import { GOOGLE_ADS_ID, SITE_URL, siteConfig } from "@/config/site";
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

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de-DE">
      <head>
        <Script id="google-consent-default" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            window.gtag = window.gtag || function gtag(){window.dataLayer.push(arguments);};
            window.gtag('consent', 'default', {
              ad_storage: 'denied',
              analytics_storage: 'denied',
              ad_user_data: 'denied',
              ad_personalization: 'denied',
              personalization_storage: 'denied',
              functionality_storage: 'denied',
              security_storage: 'granted',
              wait_for_update: 500
            });
            window.gtag('set', 'ads_data_redaction', true);
            window.gtag('js', new Date());
            window.gtag('config', '${GOOGLE_ADS_ID}');
            window.__kaaConsentModeInitialized = true;
          `}
        </Script>
        <Script
          id="google-ads-gtag"
          src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`}
          strategy="beforeInteractive"
        />
      </head>
      <body>
        <a href="#main-content" className="skip-link">
          Zum Hauptinhalt springen
        </a>
        <ConsentProvider>
          <GoogleAdsTag />
          <Header />
          <main id="main-content" tabIndex={-1}>
            {children}
          </main>
          <Footer />
        </ConsentProvider>
        <JsonLd data={siteGraphJsonLd} />
      </body>
    </html>
  );
}

import type { NextConfig } from "next";

const canonicalUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://www.ki-automatisierungs-agentur.de"
).replace(/\/$/, "");
const canonicalHost = new URL(canonicalUrl).host;
const alternateHost = canonicalHost.startsWith("www.")
  ? canonicalHost.slice(4)
  : `www.${canonicalHost}`;

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: alternateHost }],
        destination: `${canonicalUrl}/:path*`,
        permanent: true,
      },
      {
        source: "/:path*",
        has: [
          {
            type: "header",
            key: "x-forwarded-proto",
            value: "http",
          },
        ],
        destination: `${canonicalUrl}/:path*`,
        permanent: true,
      },
    ];
  },
};

export default nextConfig;

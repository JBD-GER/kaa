const siteUrl = process.env.QA_SITE_URL ?? "http://127.0.0.1:3000";
const canonicalOrigin = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://www.ki-automatisierungs-agentur.de"
).replace(/\/$/, "");
const queue = ["/"];
const checked = new Map();

const fixedRoutes = [
  "/impressum",
  "/datenschutz",
  "/agb",
  "/cookie-einstellungen",
  "/haeufige-fragen",
  "/kontakt/danke?typ=kontakt",
  "/robots.txt",
  "/sitemap.xml",
  "/manifest.webmanifest",
  "/icon.svg",
  "/apple-icon.png",
  "/opengraph-image",
];

for (const route of fixedRoutes) queue.push(route);

function internalPath(href) {
  if (
    !href ||
    href.startsWith("#") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:")
  )
    return null;
  try {
    const url = new URL(href, siteUrl);
    if (url.origin !== new URL(siteUrl).origin) return null;
    if (url.pathname.startsWith("/_next/") || url.pathname.startsWith("/api/"))
      return null;
    return `${url.pathname}${url.search}`;
  } catch {
    return null;
  }
}

while (queue.length) {
  const path = queue.shift();
  const key = path.split("#")[0];
  if (checked.has(key)) continue;

  const response = await fetch(`${siteUrl}${key}`, { redirect: "manual" });
  const contentType = response.headers.get("content-type") ?? "";
  const body = await response.text();
  const entry = {
    status: response.status,
    contentType,
    h1Count: contentType.includes("text/html")
      ? (body.match(/<h1(?:\s|>)/g) ?? []).length
      : null,
    noIndex: /<meta\s+name="robots"\s+content="[^"]*noindex/i.test(body),
    canonical:
      body.match(/<link\s+rel="canonical"\s+href="([^"]+)"/i)?.[1] ?? null,
  };
  checked.set(key, entry);

  if (!contentType.includes("text/html") || response.status !== 200) continue;
  for (const match of body.matchAll(/href="([^"]+)"/g)) {
    const discovered = internalPath(match[1]);
    if (discovered && !checked.has(discovered)) queue.push(discovered);
  }
}

const failures = [];
for (const [path, result] of checked) {
  if (result.status !== 200)
    failures.push({ path, problem: `HTTP ${result.status}` });
  if (result.contentType.includes("text/html") && result.h1Count !== 1)
    failures.push({ path, problem: `${result.h1Count} H1-Elemente` });
  const shouldBeNoIndex = path.startsWith("/kontakt/danke");
  if (shouldBeNoIndex && !result.noIndex)
    failures.push({ path, problem: "noindex fehlt" });
  if (
    result.contentType.includes("text/html") &&
    !shouldBeNoIndex &&
    !result.canonical
  )
    failures.push({ path, problem: "Canonical fehlt" });
  if (result.canonical && !result.canonical.startsWith(canonicalOrigin))
    failures.push({
      path,
      problem: `Canonical-Domain falsch: ${result.canonical}`,
    });
}

const missingServicePages = [
  "ki-beratung",
  "ki-assistenten",
  "prozessautomatisierung",
  "wissenssysteme",
  "vertriebsautomatisierung",
  "individuelle-ki-software",
].filter((slug) => !checked.has(`/leistungen/${slug}`));

if (missingServicePages.length)
  failures.push({
    problem: "Leistungsseiten nicht entdeckt",
    missingServicePages,
  });

console.log(
  JSON.stringify(
    { checked: checked.size, failures, routes: Object.fromEntries(checked) },
    null,
    2,
  ),
);
if (failures.length) process.exitCode = 1;

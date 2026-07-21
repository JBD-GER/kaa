import { writeFile } from "node:fs/promises";

const devtoolsUrl = process.env.CDP_URL ?? "http://127.0.0.1:9222";
const siteUrl = process.env.QA_SITE_URL ?? "http://127.0.0.1:3000";

const tabResponse = await fetch(
  `${devtoolsUrl}/json/new?${encodeURIComponent(`${siteUrl}/`)}`,
  { method: "PUT" },
);

if (!tabResponse.ok) {
  throw new Error(
    `Chrome-Tab konnte nicht geöffnet werden: ${tabResponse.status}`,
  );
}

const tab = await tabResponse.json();
const socket = new WebSocket(tab.webSocketDebuggerUrl);
const pending = new Map();
const eventWaiters = new Map();
let commandId = 0;

socket.addEventListener("message", (event) => {
  const message = JSON.parse(event.data);
  if (message.id && pending.has(message.id)) {
    const { resolve, reject } = pending.get(message.id);
    pending.delete(message.id);
    if (message.error) reject(new Error(message.error.message));
    else resolve(message.result);
    return;
  }

  const waiters = eventWaiters.get(message.method);
  if (!waiters?.length) return;
  const resolve = waiters.shift();
  resolve(message.params);
});

await new Promise((resolve, reject) => {
  socket.addEventListener("open", resolve, { once: true });
  socket.addEventListener("error", reject, { once: true });
});

function command(method, params = {}) {
  const id = ++commandId;
  socket.send(JSON.stringify({ id, method, params }));
  return new Promise((resolve, reject) => pending.set(id, { resolve, reject }));
}

function waitForEvent(method) {
  return new Promise((resolve) => {
    const waiters = eventWaiters.get(method) ?? [];
    waiters.push(resolve);
    eventWaiters.set(method, waiters);
  });
}

const pause = (milliseconds) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));

await command("Page.enable");
await command("Runtime.enable");

async function evaluate(expression) {
  const result = await command("Runtime.evaluate", {
    expression,
    returnByValue: true,
    awaitPromise: true,
  });
  if (result.exceptionDetails) {
    throw new Error(result.exceptionDetails.text);
  }
  return result.result.value;
}

async function visit(path, width, height = 900) {
  await command("Emulation.setDeviceMetricsOverride", {
    width,
    height,
    deviceScaleFactor: 1,
    mobile: width <= 768,
  });

  const loaded = waitForEvent("Page.loadEventFired");
  await command("Page.navigate", { url: `${siteUrl}${path}` });
  await loaded;
  await pause(450);

  return evaluate(`(() => {
    const mobileTrigger = document.querySelector('.mobile-nav-trigger');
    const resources = performance.getEntriesByType('resource').map((entry) => entry.name);
    const externalResources = resources.filter((url) => {
      try { return new URL(url).origin !== location.origin; } catch { return false; }
    });
    const emptyLinks = [...document.querySelectorAll('a[href]')].filter((link) => !link.textContent.trim() && !link.getAttribute('aria-label')).length;
    const viewportWidth = document.documentElement.clientWidth;
    const overflowElements = [...document.querySelectorAll('body *')]
      .map((element) => {
        const rect = element.getBoundingClientRect();
        return {
          element: element.tagName.toLowerCase() + (element.id ? '#' + element.id : '') + (element.className && typeof element.className === 'string' ? '.' + element.className.trim().replace(/\\s+/g, '.') : ''),
          left: Math.round(rect.left),
          right: Math.round(rect.right),
          width: Math.round(rect.width),
          scrollWidth: element.scrollWidth,
          clientWidth: element.clientWidth,
        };
      })
      .filter((item) => item.right > viewportWidth + 1 || item.left < -1 || item.scrollWidth > item.clientWidth + 1)
      .slice(0, 20);
    return {
      path: location.pathname,
      statusTitle: document.title,
      innerWidth,
      clientWidth: document.documentElement.clientWidth,
      scrollWidth: document.documentElement.scrollWidth,
      bodyScrollWidth: document.body.scrollWidth,
      h1Count: document.querySelectorAll('h1').length,
      mainExists: Boolean(document.querySelector('main#main-content')),
      skipLinkExists: Boolean(document.querySelector('a.skip-link[href="#main-content"]')),
      mobileTriggerDisplay: mobileTrigger ? getComputedStyle(mobileTrigger).display : null,
      mobileTriggerRight: mobileTrigger ? Math.round(mobileTrigger.getBoundingClientRect().right) : null,
      cookieBannerVisible: Boolean(document.querySelector('[data-consent-banner="true"]')),
      externalResources,
      emptyLinks,
      canonical: document.querySelector('link[rel="canonical"]')?.href ?? null,
      description: document.querySelector('meta[name="description"]')?.content ?? null,
      overflowElements,
    };
  })()`);
}

const results = [];
const widths = [320, 360, 375, 390, 430, 768, 1024, 1280, 1440, 1920];

for (const width of widths) {
  const result = await visit("/", width);
  results.push(result);
  if (result.cookieBannerVisible) {
    await evaluate(
      `document.querySelector('.consent-banner__actions .consent-button:nth-child(2)')?.click()`,
    );
    await pause(100);
  }
}

for (const path of [
  "/leistungen",
  "/leistungen/prozessautomatisierung",
  "/anwendungsfaelle",
  "/branchen",
  "/ki-potenzialanalyse",
  "/ueber-uns",
  "/vorgehensweise",
  "/ratgeber",
  "/ratgeber/was-ist-eine-ki-automatisierungs-agentur",
  "/haeufige-fragen",
  "/kontakt",
  "/impressum",
  "/datenschutz",
  "/agb",
  "/cookie-einstellungen",
  "/nicht-vorhanden",
]) {
  results.push(await visit(path, 390, 844));
  results.push(await visit(path, 1440, 1000));
}

await visit("/", 390, 844);
const mobileShot = await command("Page.captureScreenshot", {
  format: "png",
  captureBeyondViewport: false,
});
await writeFile(
  "/private/tmp/kaa-cdp-mobile.png",
  Buffer.from(mobileShot.data, "base64"),
);

await visit("/kontakt", 1440, 1100);
const desktopShot = await command("Page.captureScreenshot", {
  format: "png",
  captureBeyondViewport: false,
});
await writeFile(
  "/private/tmp/kaa-cdp-contact.png",
  Buffer.from(desktopShot.data, "base64"),
);

await visit("/leistungen/individuelle-ki-software", 1440, 900);
await evaluate(
  `document.querySelector('.capability-grid')?.scrollIntoView({ block: 'center' })`,
);
await pause(250);
const capabilityShot = await command("Page.captureScreenshot", {
  format: "png",
  captureBeyondViewport: false,
});
await writeFile(
  "/private/tmp/kaa-cdp-capabilities.png",
  Buffer.from(capabilityShot.data, "base64"),
);

const failures = results.filter((result) => {
  const overflow =
    result.scrollWidth > result.clientWidth ||
    result.bodyScrollWidth > result.clientWidth;
  const mobileMenuMissing =
    result.innerWidth <= 768 && result.mobileTriggerDisplay === "none";
  const mobileMenuOutside =
    result.innerWidth <= 768 && result.mobileTriggerRight > result.innerWidth;
  return (
    overflow ||
    result.h1Count !== 1 ||
    !result.mainExists ||
    !result.skipLinkExists ||
    mobileMenuMissing ||
    mobileMenuOutside ||
    result.externalResources.length > 0 ||
    result.emptyLinks > 0 ||
    !result.description
  );
});

console.log(
  JSON.stringify(
    {
      checked: results.length,
      passed: results.length - failures.length,
      failures,
    },
    null,
    2,
  ),
);

await fetch(`${devtoolsUrl}/json/close/${tab.id}`);
socket.close();

if (failures.length) process.exitCode = 1;

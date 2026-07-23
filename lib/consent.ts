import { siteConfig } from "@/config/site";

export const CONSENT_STORAGE_KEY = "kaa.cookie-consent";
export const CONSENT_CHANGE_EVENT = "kaa:consent-change";

export const CONSENT_CATEGORIES = [
  "necessary",
  "statistics",
  "marketing",
  "externalMedia",
] as const;

export type ConsentCategory = (typeof CONSENT_CATEGORIES)[number];
export type OptionalConsentCategory = Exclude<ConsentCategory, "necessary">;

export type ConsentPreferences = {
  necessary: true;
  statistics: boolean;
  marketing: boolean;
  externalMedia: boolean;
};

export type ConsentRecord = {
  version: string;
  timestamp: string;
  categories: ConsentPreferences;
};

export const DEFAULT_CONSENT_PREFERENCES: ConsentPreferences = Object.freeze({
  necessary: true,
  statistics: false,
  marketing: false,
  externalMedia: false,
});

export const ACCEPT_ALL_CONSENT_PREFERENCES: ConsentPreferences = Object.freeze(
  {
    necessary: true,
    statistics: true,
    marketing: true,
    externalMedia: true,
  },
);

type GoogleConsentState = "granted" | "denied";
type GoogleConsentCommand = "default" | "update";
type ConsentWindow = Window & {
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
  __kaaConsentModeInitialized?: boolean;
};

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isIsoTimestamp(value: unknown): value is string {
  if (typeof value !== "string") return false;

  const parsed = new Date(value);
  return !Number.isNaN(parsed.getTime()) && parsed.toISOString() === value;
}

export function normalizeConsentPreferences(
  preferences?: Partial<ConsentPreferences>,
): ConsentPreferences {
  return {
    necessary: true,
    statistics: preferences?.statistics === true,
    marketing: preferences?.marketing === true,
    externalMedia: preferences?.externalMedia === true,
  };
}

export function isConsentRecord(value: unknown): value is ConsentRecord {
  if (!isObject(value) || value.version !== siteConfig.consentVersion) {
    return false;
  }

  if (!isIsoTimestamp(value.timestamp) || !isObject(value.categories)) {
    return false;
  }

  return (
    value.categories.necessary === true &&
    typeof value.categories.statistics === "boolean" &&
    typeof value.categories.marketing === "boolean" &&
    typeof value.categories.externalMedia === "boolean"
  );
}

export function createConsentRecord(
  preferences: Partial<ConsentPreferences>,
): ConsentRecord {
  return {
    version: siteConfig.consentVersion,
    timestamp: new Date().toISOString(),
    categories: normalizeConsentPreferences(preferences),
  };
}

export function readStoredConsent(): ConsentRecord | null {
  if (typeof window === "undefined") return null;

  try {
    const serialized = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!serialized) return null;

    const value: unknown = JSON.parse(serialized);
    return isConsentRecord(value) ? value : null;
  } catch {
    return null;
  }
}

export function writeStoredConsent(record: ConsentRecord): boolean {
  if (typeof window === "undefined") return false;

  try {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(record));
    return true;
  } catch {
    return false;
  }
}

export function removeStoredConsent(): void {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.removeItem(CONSENT_STORAGE_KEY);
  } catch {
    // A blocked storage API must not make the consent controls unusable.
  }
}

/**
 * Removes first-party Google Ads cookies that are visible to this website.
 * Provider cookies on Google domains cannot be removed from this origin.
 */
export function clearGoogleAdsCookies(): void {
  if (typeof window === "undefined") return;

  const googleAdsCookieNames = document.cookie
    .split(";")
    .map((cookie) => cookie.split("=")[0]?.trim())
    .filter(
      (name): name is string =>
        Boolean(name) && (name.startsWith("_gcl_") || name.startsWith("_gac_")),
    );

  if (!googleAdsCookieNames.length) return;

  const hostname = window.location.hostname;
  const domainParts = hostname.split(".");
  const registrableDomain =
    domainParts.length > 1 ? domainParts.slice(-2).join(".") : hostname;
  const domains = [
    "",
    hostname,
    `.${hostname}`,
    registrableDomain,
    `.${registrableDomain}`,
  ];

  for (const name of googleAdsCookieNames) {
    for (const domain of new Set(domains)) {
      document.cookie = `${name}=; Max-Age=0; path=/; SameSite=Lax${
        domain ? `; domain=${domain}` : ""
      }`;
    }
  }
}

function queueGoogleConsentCommand(
  command: GoogleConsentCommand,
  values: Record<string, GoogleConsentState | number>,
): void {
  if (typeof window === "undefined") return;

  const consentWindow = window as ConsentWindow;

  consentWindow.dataLayer ??= [];
  if (typeof consentWindow.gtag !== "function") {
    consentWindow.gtag = function gtag() {
      // gtag.js uses the function's Arguments object as its command format.
      // eslint-disable-next-line prefer-rest-params
      consentWindow.dataLayer?.push(arguments);
    };
  }

  consentWindow.gtag("consent", command, values);
}

/**
 * Prepares Consent Mode without loading an external Google script.
 * The queued commands are consumed if marketing consent later loads the tag.
 */
export function initializeGoogleConsentMode(): void {
  if (typeof window === "undefined") return;

  const consentWindow = window as ConsentWindow;
  if (consentWindow.__kaaConsentModeInitialized) return;

  consentWindow.__kaaConsentModeInitialized = true;
  queueGoogleConsentCommand("default", {
    ad_storage: "denied",
    analytics_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    personalization_storage: "denied",
    functionality_storage: "denied",
    security_storage: "granted",
    wait_for_update: 500,
  });
}

export function updateGoogleConsentMode(preferences: ConsentPreferences): void {
  queueGoogleConsentCommand("update", {
    analytics_storage: preferences.statistics ? "granted" : "denied",
    ad_storage: preferences.marketing ? "granted" : "denied",
    ad_user_data: preferences.marketing ? "granted" : "denied",
    ad_personalization: preferences.marketing ? "granted" : "denied",
    personalization_storage: preferences.marketing ? "granted" : "denied",
    functionality_storage: preferences.externalMedia ? "granted" : "denied",
    security_storage: "granted",
  });
}

export function announceConsentChange(record: ConsentRecord): void {
  if (typeof window === "undefined") return;

  window.dispatchEvent(
    new CustomEvent<ConsentRecord>(CONSENT_CHANGE_EVENT, {
      detail: record,
    }),
  );
}

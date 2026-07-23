"use client";

import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  ACCEPT_ALL_CONSENT_PREFERENCES,
  announceConsentChange,
  clearGoogleAdsCookies,
  CONSENT_STORAGE_KEY,
  createConsentRecord,
  DEFAULT_CONSENT_PREFERENCES,
  initializeGoogleConsentMode,
  type ConsentCategory,
  type ConsentPreferences,
  normalizeConsentPreferences,
  readStoredConsent,
  removeStoredConsent,
  updateGoogleConsentMode,
  writeStoredConsent,
} from "@/lib/consent";

import { CookieBanner } from "./cookie-banner";
import { CookieSettingsDialog } from "./cookie-settings-dialog";

export type ConsentContextValue = {
  preferences: ConsentPreferences;
  isReady: boolean;
  hasDecision: boolean;
  isBannerOpen: boolean;
  isSettingsOpen: boolean;
  hasConsent: (category: ConsentCategory) => boolean;
  acceptAll: () => void;
  rejectAll: () => void;
  savePreferences: (preferences: ConsentPreferences) => void;
  openSettings: () => void;
  closeSettings: () => void;
  withdrawConsent: () => void;
};

const ConsentContext = createContext<ConsentContextValue | null>(null);

export type ConsentProviderProps = {
  children: ReactNode;
};

export function ConsentProvider({ children }: ConsentProviderProps) {
  const [preferences, setPreferences] = useState<ConsentPreferences>(
    DEFAULT_CONSENT_PREFERENCES,
  );
  const [isReady, setIsReady] = useState(false);
  const [hasDecision, setHasDecision] = useState(false);
  const [isBannerOpen, setIsBannerOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  useEffect(() => {
    initializeGoogleConsentMode();

    const storedConsent = readStoredConsent();
    let cancelled = false;
    if (!storedConsent) removeStoredConsent();
    updateGoogleConsentMode(
      storedConsent?.categories ?? DEFAULT_CONSENT_PREFERENCES,
    );

    queueMicrotask(() => {
      if (cancelled) return;
      if (storedConsent) {
        setPreferences(storedConsent.categories);
        setHasDecision(true);
        setIsBannerOpen(false);
      } else {
        clearGoogleAdsCookies();
        setPreferences(DEFAULT_CONSENT_PREFERENCES);
        setHasDecision(false);
        setIsBannerOpen(true);
      }
      setIsReady(true);
    });

    function handleStorage(event: StorageEvent) {
      if (event.key !== CONSENT_STORAGE_KEY) return;

      const updatedConsent = readStoredConsent();
      if (updatedConsent) {
        if (!updatedConsent.categories.marketing) clearGoogleAdsCookies();
        setPreferences(updatedConsent.categories);
        setHasDecision(true);
        setIsBannerOpen(false);
        setIsSettingsOpen(false);
        updateGoogleConsentMode(updatedConsent.categories);
      } else {
        clearGoogleAdsCookies();
        setPreferences(DEFAULT_CONSENT_PREFERENCES);
        setHasDecision(false);
        setIsBannerOpen(true);
        setIsSettingsOpen(false);
        updateGoogleConsentMode(DEFAULT_CONSENT_PREFERENCES);
      }
    }

    window.addEventListener("storage", handleStorage);
    return () => {
      cancelled = true;
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  const commitConsent = useCallback(
    (nextPreferences: Partial<ConsentPreferences>) => {
      const normalizedPreferences =
        normalizeConsentPreferences(nextPreferences);
      const record = createConsentRecord(normalizedPreferences);

      writeStoredConsent(record);
      if (!record.categories.marketing) clearGoogleAdsCookies();
      setPreferences(record.categories);
      setHasDecision(true);
      setIsBannerOpen(false);
      setIsSettingsOpen(false);
      updateGoogleConsentMode(record.categories);
      announceConsentChange(record);
    },
    [],
  );

  const acceptAll = useCallback(() => {
    commitConsent(ACCEPT_ALL_CONSENT_PREFERENCES);
  }, [commitConsent]);

  const rejectAll = useCallback(() => {
    commitConsent(DEFAULT_CONSENT_PREFERENCES);
  }, [commitConsent]);

  const savePreferences = useCallback(
    (nextPreferences: ConsentPreferences) => {
      commitConsent(nextPreferences);
    },
    [commitConsent],
  );

  const openSettings = useCallback(() => setIsSettingsOpen(true), []);
  const closeSettings = useCallback(() => setIsSettingsOpen(false), []);
  const withdrawConsent = rejectAll;

  const hasConsent = useCallback(
    (category: ConsentCategory) => preferences[category],
    [preferences],
  );

  const contextValue = useMemo<ConsentContextValue>(
    () => ({
      preferences,
      isReady,
      hasDecision,
      isBannerOpen,
      isSettingsOpen,
      hasConsent,
      acceptAll,
      rejectAll,
      savePreferences,
      openSettings,
      closeSettings,
      withdrawConsent,
    }),
    [
      preferences,
      isReady,
      hasDecision,
      isBannerOpen,
      isSettingsOpen,
      hasConsent,
      acceptAll,
      rejectAll,
      savePreferences,
      openSettings,
      closeSettings,
      withdrawConsent,
    ],
  );

  return (
    <ConsentContext.Provider value={contextValue}>
      {children}
      <CookieBanner
        open={isReady && isBannerOpen}
        onAcceptAll={acceptAll}
        onRejectAll={rejectAll}
        onOpenSettings={openSettings}
      />
      {isReady && isSettingsOpen ? (
        <CookieSettingsDialog
          open
          preferences={preferences}
          hasDecision={hasDecision}
          onClose={closeSettings}
          onSave={savePreferences}
          onAcceptAll={acceptAll}
          onRejectAll={rejectAll}
          onWithdraw={withdrawConsent}
        />
      ) : null}
    </ConsentContext.Provider>
  );
}

export function useConsent(): ConsentContextValue {
  const context = useContext(ConsentContext);
  if (!context) {
    throw new Error(
      "useConsent muss innerhalb eines ConsentProvider verwendet werden.",
    );
  }

  return context;
}

export default ConsentProvider;

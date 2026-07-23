const LEAD_CONVERSION_PENDING_KEY = "kaa.google-ads.lead-conversion-pending";

export function markGoogleAdsLeadConversionPending(): void {
  try {
    window.sessionStorage.setItem(LEAD_CONVERSION_PENDING_KEY, "true");
  } catch {
    // Tracking must never block a successful form submission.
  }
}

export function consumeGoogleAdsLeadConversionPending(): boolean {
  try {
    const pending =
      window.sessionStorage.getItem(LEAD_CONVERSION_PENDING_KEY) === "true";
    if (pending) window.sessionStorage.removeItem(LEAD_CONVERSION_PENDING_KEY);
    return pending;
  } catch {
    return false;
  }
}

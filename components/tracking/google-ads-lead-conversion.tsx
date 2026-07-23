"use client";

import { useEffect, useRef } from "react";

import { GOOGLE_ADS_LEAD_CONVERSION } from "@/config/site";

type GoogleAdsWindow = Window & {
  gtag?: (...args: unknown[]) => void;
};

export function GoogleAdsLeadConversion() {
  const sent = useRef(false);

  useEffect(() => {
    if (sent.current) return;

    const googleWindow = window as GoogleAdsWindow;
    if (typeof googleWindow.gtag !== "function") return;

    sent.current = true;
    googleWindow.gtag("event", "conversion", {
      send_to: GOOGLE_ADS_LEAD_CONVERSION,
      value: 1.0,
      currency: "EUR",
    });
  }, []);

  return null;
}

export default GoogleAdsLeadConversion;

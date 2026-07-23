"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

import { GOOGLE_ADS_ID } from "@/config/site";

export function GoogleAdsTag() {
  const pathname = usePathname();
  const previousPathname = useRef<string | null>(null);

  useEffect(() => {
    if (previousPathname.current === null) {
      previousPathname.current = pathname;
      return;
    }

    if (previousPathname.current === pathname) return;
    previousPathname.current = pathname;

    const googleWindow = window as Window & {
      gtag?: (...args: unknown[]) => void;
    };
    googleWindow.gtag?.("config", GOOGLE_ADS_ID, {
      page_path: pathname,
    });
  }, [pathname]);

  return null;
}

export default GoogleAdsTag;

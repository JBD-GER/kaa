"use client";

import {
  forwardRef,
  type ButtonHTMLAttributes,
  type MouseEvent,
  type ReactNode,
} from "react";

import { useConsent } from "./consent-provider";

export type CookieSettingsTriggerProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "type" | "children"
> & {
  children?: ReactNode;
};

export const CookieSettingsTrigger = forwardRef<
  HTMLButtonElement,
  CookieSettingsTriggerProps
>(function CookieSettingsTrigger(
  { children = "Cookie-Einstellungen", className, onClick, ...props },
  ref,
) {
  const { hasDecision, isSettingsOpen, openSettings } = useConsent();

  function handleClick(event: MouseEvent<HTMLButtonElement>) {
    onClick?.(event);
    if (!event.defaultPrevented) openSettings();
  }

  return (
    <button
      {...props}
      className={
        className
          ? `consent-settings-trigger ${className}`
          : "consent-settings-trigger"
      }
      ref={ref}
      type="button"
      onClick={handleClick}
      aria-haspopup="dialog"
      aria-expanded={isSettingsOpen}
      data-consent-status={hasDecision ? "saved" : "pending"}
    >
      {children}
    </button>
  );
});

export default CookieSettingsTrigger;

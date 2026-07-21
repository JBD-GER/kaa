"use client";

import {
  type ChangeEvent,
  type FormEvent,
  type KeyboardEvent,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";

import type {
  ConsentPreferences,
  OptionalConsentCategory,
} from "@/lib/consent";

export type CookieSettingsDialogProps = {
  open: boolean;
  preferences: ConsentPreferences;
  hasDecision: boolean;
  onClose: () => void;
  onSave: (preferences: ConsentPreferences) => void;
  onAcceptAll: () => void;
  onRejectAll: () => void;
  onWithdraw: () => void;
};

const categoryCopy: Array<{
  key: keyof ConsentPreferences;
  title: string;
  description: string;
}> = [
  {
    key: "necessary",
    title: "Notwendig",
    description:
      "Ermöglicht grundlegende Funktionen wie das Speichern Ihrer Cookie-Auswahl. Diese Kategorie kann nicht deaktiviert werden.",
  },
  {
    key: "statistics",
    title: "Statistik",
    description:
      "Hilft uns nach Ihrer Einwilligung zu verstehen, wie die Website genutzt wird.",
  },
  {
    key: "marketing",
    title: "Marketing",
    description:
      "Erlaubt nach Ihrer Einwilligung Dienste zur Messung und Steuerung von Marketingmaßnahmen.",
  },
  {
    key: "externalMedia",
    title: "Externe Medien",
    description:
      "Erlaubt nach Ihrer Einwilligung das Laden eingebetteter Inhalte externer Anbieter.",
  },
];

function getFocusableElements(container: HTMLElement): HTMLElement[] {
  return Array.from(
    container.querySelectorAll<HTMLElement>(
      'button:not([disabled]), input:not([disabled]), [href], [tabindex]:not([tabindex="-1"])',
    ),
  ).filter((element) => !element.hasAttribute("hidden"));
}

export function CookieSettingsDialog({
  open,
  preferences,
  hasDecision,
  onClose,
  onSave,
  onAcceptAll,
  onRejectAll,
  onWithdraw,
}: CookieSettingsDialogProps) {
  const titleId = useId();
  const descriptionId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const [selection, setSelection] = useState<ConsentPreferences>(preferences);

  useEffect(() => {
    if (!open) return;

    returnFocusRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const frame = window.requestAnimationFrame(() =>
      closeButtonRef.current?.focus(),
    );

    return () => {
      window.cancelAnimationFrame(frame);
      document.body.style.overflow = previousOverflow;

      const returnTarget = returnFocusRef.current;
      window.requestAnimationFrame(() => {
        if (returnTarget?.isConnected) returnTarget.focus();
      });
    };
  }, [open]);

  function handleDialogKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape") {
      event.preventDefault();
      onClose();
      return;
    }

    if (event.key !== "Tab" || !dialogRef.current) return;

    const focusableElements = getFocusableElements(dialogRef.current);
    if (focusableElements.length === 0) {
      event.preventDefault();
      dialogRef.current.focus();
      return;
    }

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus();
    } else if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }
  }

  function handleSelectionChange(event: ChangeEvent<HTMLInputElement>) {
    const category = event.currentTarget.name as OptionalConsentCategory;
    const checked = event.currentTarget.checked;

    setSelection((current) => ({
      ...current,
      necessary: true,
      [category]: checked,
    }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSave(selection);
  }

  if (!open) return null;

  return (
    <div
      className="consent-dialog__backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        className="consent-dialog"
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        tabIndex={-1}
        onKeyDown={handleDialogKeyDown}
      >
        <div className="consent-dialog__header">
          <div>
            <p className="consent-dialog__eyebrow">Datenschutz-Einstellungen</p>
            <h2 className="consent-dialog__title" id={titleId}>
              Cookie-Auswahl verwalten
            </h2>
          </div>
          <button
            className="consent-dialog__close"
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Cookie-Einstellungen schließen"
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>

        <p className="consent-dialog__description" id={descriptionId}>
          Optionale Kategorien bleiben deaktiviert, bis Sie ausdrücklich
          zustimmen. Eine Auswahl kann später jederzeit geändert oder widerrufen
          werden.
        </p>

        <form className="consent-dialog__form" onSubmit={handleSubmit}>
          <fieldset className="consent-dialog__categories">
            <legend className="consent-dialog__legend">
              Kategorien auswählen
            </legend>

            {categoryCopy.map((category) => {
              const inputId = `${titleId}-${category.key}`;
              const categoryDescriptionId = `${inputId}-description`;
              const isNecessary = category.key === "necessary";

              return (
                <div className="consent-category" key={category.key}>
                  <div className="consent-category__heading">
                    <label
                      className="consent-category__label"
                      htmlFor={inputId}
                    >
                      {category.title}
                    </label>
                    <span className="consent-category__control">
                      <input
                        className="consent-category__checkbox"
                        id={inputId}
                        name={category.key}
                        type="checkbox"
                        checked={selection[category.key]}
                        disabled={isNecessary}
                        onChange={handleSelectionChange}
                        aria-describedby={categoryDescriptionId}
                      />
                      <span
                        className="consent-category__switch"
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                  <p
                    className="consent-category__description"
                    id={categoryDescriptionId}
                  >
                    {category.description}
                  </p>
                </div>
              );
            })}
          </fieldset>

          <div className="consent-dialog__choice-actions">
            <button
              className="consent-button consent-button--choice"
              type="button"
              onClick={onAcceptAll}
            >
              Alle akzeptieren
            </button>
            <button
              className="consent-button consent-button--choice"
              type="button"
              onClick={onRejectAll}
            >
              Alle ablehnen
            </button>
          </div>

          <div className="consent-dialog__footer">
            <button
              className="consent-button consent-button--save"
              type="submit"
            >
              Auswahl speichern
            </button>
            {hasDecision ? (
              <button
                className="consent-dialog__withdraw"
                type="button"
                onClick={onWithdraw}
              >
                Einwilligung widerrufen
              </button>
            ) : null}
          </div>
        </form>
      </div>
    </div>
  );
}

export default CookieSettingsDialog;

"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useId, useState } from "react";
import {
  type FieldError as ReactHookFormFieldError,
  type FieldPath,
  useForm,
} from "react-hook-form";

import { serviceOptions } from "@/content/services";
import {
  companySizeOptions,
  potentialAnalysisFormSchema,
  type PotentialAnalysisFormValues,
} from "@/lib/validation";
import { markGoogleAdsLeadConversionPending } from "@/lib/google-ads-conversion";

type SubmissionStatus =
  | { state: "idle" }
  | { state: "error"; message: string }
  | { state: "success"; message: string };

type ApiResponse = {
  ok?: boolean;
  message?: string;
  fieldErrors?: Record<string, string[]>;
};

const defaultValues: PotentialAnalysisFormValues = {
  formType: "potential-analysis",
  firstName: "",
  lastName: "",
  company: "",
  email: "",
  phone: "",
  industry: "",
  companySize: "",
  desiredService: "",
  processDescription: "",
  currentSystems: "",
  desiredGoal: "",
  privacyAccepted: false,
  website: "",
};

const validFieldNames = new Set(Object.keys(defaultValues));

function FieldError({
  error,
  id,
}: {
  error?: ReactHookFormFieldError;
  id: string;
}) {
  if (!error?.message) return null;

  return (
    <p className="form-field__error" id={id} role="alert">
      {String(error.message)}
    </p>
  );
}

export function PotentialAnalysisForm() {
  const router = useRouter();
  const formId = useId();
  const [submissionStatus, setSubmissionStatus] = useState<SubmissionStatus>({
    state: "idle",
  });
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<PotentialAnalysisFormValues>({
    resolver: zodResolver(potentialAnalysisFormSchema),
    defaultValues,
    mode: "onBlur",
    shouldFocusError: true,
  });

  function fieldId(name: string) {
    return `${formId}-${name}`;
  }

  function applyServerErrors(fieldErrors?: Record<string, string[]>) {
    if (!fieldErrors) return;

    for (const [field, messages] of Object.entries(fieldErrors)) {
      const message = messages[0];
      if (!message || !validFieldNames.has(field)) continue;

      setError(field as FieldPath<PotentialAnalysisFormValues>, {
        type: "server",
        message,
      });
    }
  }

  async function onSubmit(values: PotentialAnalysisFormValues) {
    setSubmissionStatus({ state: "idle" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const result = (await response
        .json()
        .catch(() => null)) as ApiResponse | null;

      if (!response.ok || !result?.ok) {
        applyServerErrors(result?.fieldErrors);
        setSubmissionStatus({
          state: "error",
          message:
            result?.message ??
            "Ihre Anfrage konnte nicht gesendet werden. Bitte versuchen Sie es erneut.",
        });
        return;
      }

      setSubmissionStatus({
        state: "success",
        message:
          "Vielen Dank. Ihre Anfrage zur Potenzialanalyse wurde erfolgreich gesendet.",
      });
      markGoogleAdsLeadConversionPending();
      router.push("/kontakt/danke?typ=potenzialanalyse");
    } catch {
      setSubmissionStatus({
        state: "error",
        message:
          "Die Verbindung ist fehlgeschlagen. Bitte prüfen Sie Ihre Internetverbindung und versuchen Sie es erneut.",
      });
    }
  }

  return (
    <form
      className="form form--potential-analysis"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      aria-busy={isSubmitting}
    >
      <input type="hidden" {...register("formType")} />

      <div className="form-grid form-grid--two-columns">
        <div className="form-field">
          <label className="form-field__label" htmlFor={fieldId("first-name")}>
            Vorname <span aria-hidden="true">*</span>
          </label>
          <input
            className="form-field__control"
            id={fieldId("first-name")}
            type="text"
            autoComplete="given-name"
            aria-required="true"
            aria-invalid={Boolean(errors.firstName)}
            aria-describedby={
              errors.firstName ? fieldId("first-name-error") : undefined
            }
            {...register("firstName")}
          />
          <FieldError
            error={errors.firstName}
            id={fieldId("first-name-error")}
          />
        </div>

        <div className="form-field">
          <label className="form-field__label" htmlFor={fieldId("last-name")}>
            Nachname <span aria-hidden="true">*</span>
          </label>
          <input
            className="form-field__control"
            id={fieldId("last-name")}
            type="text"
            autoComplete="family-name"
            aria-required="true"
            aria-invalid={Boolean(errors.lastName)}
            aria-describedby={
              errors.lastName ? fieldId("last-name-error") : undefined
            }
            {...register("lastName")}
          />
          <FieldError error={errors.lastName} id={fieldId("last-name-error")} />
        </div>
      </div>

      <div className="form-field">
        <label className="form-field__label" htmlFor={fieldId("company")}>
          Unternehmen <span aria-hidden="true">*</span>
        </label>
        <input
          className="form-field__control"
          id={fieldId("company")}
          type="text"
          autoComplete="organization"
          aria-required="true"
          aria-invalid={Boolean(errors.company)}
          aria-describedby={
            errors.company ? fieldId("company-error") : undefined
          }
          {...register("company")}
        />
        <FieldError error={errors.company} id={fieldId("company-error")} />
      </div>

      <div className="form-grid form-grid--two-columns">
        <div className="form-field">
          <label className="form-field__label" htmlFor={fieldId("email")}>
            Geschäftliche E-Mail-Adresse <span aria-hidden="true">*</span>
          </label>
          <input
            className="form-field__control"
            id={fieldId("email")}
            type="email"
            inputMode="email"
            autoComplete="email"
            spellCheck="false"
            aria-required="true"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? fieldId("email-error") : undefined}
            {...register("email")}
          />
          <FieldError error={errors.email} id={fieldId("email-error")} />
        </div>

        <div className="form-field">
          <label className="form-field__label" htmlFor={fieldId("phone")}>
            Telefonnummer <span className="form-field__optional">optional</span>
          </label>
          <input
            className="form-field__control"
            id={fieldId("phone")}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? fieldId("phone-error") : undefined}
            {...register("phone")}
          />
          <FieldError error={errors.phone} id={fieldId("phone-error")} />
        </div>
      </div>

      <div className="form-grid form-grid--two-columns">
        <div className="form-field">
          <label className="form-field__label" htmlFor={fieldId("industry")}>
            Branche <span aria-hidden="true">*</span>
          </label>
          <input
            className="form-field__control"
            id={fieldId("industry")}
            type="text"
            autoComplete="off"
            aria-required="true"
            aria-invalid={Boolean(errors.industry)}
            aria-describedby={
              errors.industry ? fieldId("industry-error") : undefined
            }
            {...register("industry")}
          />
          <FieldError error={errors.industry} id={fieldId("industry-error")} />
        </div>

        <div className="form-field">
          <label
            className="form-field__label"
            htmlFor={fieldId("company-size")}
          >
            Unternehmensgröße <span aria-hidden="true">*</span>
          </label>
          <select
            className="form-field__control form-field__select"
            id={fieldId("company-size")}
            autoComplete="off"
            aria-required="true"
            aria-invalid={Boolean(errors.companySize)}
            aria-describedby={
              errors.companySize ? fieldId("company-size-error") : undefined
            }
            {...register("companySize")}
          >
            <option value="">Bitte auswählen</option>
            {companySizeOptions.map((option) => (
              <option value={option} key={option}>
                {option}
              </option>
            ))}
          </select>
          <FieldError
            error={errors.companySize}
            id={fieldId("company-size-error")}
          />
        </div>
      </div>

      <div className="form-field">
        <label className="form-field__label" htmlFor={fieldId("service")}>
          Gewünschte Leistung <span aria-hidden="true">*</span>
        </label>
        <select
          className="form-field__control form-field__select"
          id={fieldId("service")}
          autoComplete="off"
          aria-required="true"
          aria-invalid={Boolean(errors.desiredService)}
          aria-describedby={
            errors.desiredService ? fieldId("service-error") : undefined
          }
          {...register("desiredService")}
        >
          <option value="">Bitte auswählen</option>
          {serviceOptions.map((option) => (
            <option value={option} key={option}>
              {option}
            </option>
          ))}
        </select>
        <FieldError
          error={errors.desiredService}
          id={fieldId("service-error")}
        />
      </div>

      <div className="form-field">
        <label className="form-field__label" htmlFor={fieldId("process")}>
          Kurze Beschreibung des Ablaufs <span aria-hidden="true">*</span>
        </label>
        <textarea
          className="form-field__control form-field__textarea"
          id={fieldId("process")}
          rows={7}
          aria-required="true"
          aria-invalid={Boolean(errors.processDescription)}
          aria-describedby={
            errors.processDescription ? fieldId("process-error") : undefined
          }
          {...register("processDescription")}
        />
        <FieldError
          error={errors.processDescription}
          id={fieldId("process-error")}
        />
      </div>

      <div className="form-field">
        <label className="form-field__label" htmlFor={fieldId("systems")}>
          Aktuell verwendete Systeme{" "}
          <span className="form-field__optional">optional</span>
        </label>
        <textarea
          className="form-field__control form-field__textarea"
          id={fieldId("systems")}
          rows={4}
          aria-invalid={Boolean(errors.currentSystems)}
          aria-describedby={
            errors.currentSystems ? fieldId("systems-error") : undefined
          }
          {...register("currentSystems")}
        />
        <FieldError
          error={errors.currentSystems}
          id={fieldId("systems-error")}
        />
      </div>

      <div className="form-field">
        <label className="form-field__label" htmlFor={fieldId("goal")}>
          Gewünschtes Ziel{" "}
          <span className="form-field__optional">optional</span>
        </label>
        <textarea
          className="form-field__control form-field__textarea"
          id={fieldId("goal")}
          rows={4}
          aria-invalid={Boolean(errors.desiredGoal)}
          aria-describedby={
            errors.desiredGoal ? fieldId("goal-error") : undefined
          }
          {...register("desiredGoal")}
        />
        <FieldError error={errors.desiredGoal} id={fieldId("goal-error")} />
      </div>

      <div className="form-field form-field--checkbox">
        <input
          className="form-field__checkbox"
          id={fieldId("privacy")}
          type="checkbox"
          aria-required="true"
          aria-invalid={Boolean(errors.privacyAccepted)}
          aria-describedby={
            errors.privacyAccepted ? fieldId("privacy-error") : undefined
          }
          {...register("privacyAccepted")}
        />
        <div className="form-field__checkbox-copy">
          <label htmlFor={fieldId("privacy")}>
            Ich habe die Datenschutzerklärung zur Verarbeitung meiner Angaben
            zur Kenntnis genommen. <span aria-hidden="true">*</span>
          </label>
          <p>
            Weitere Informationen finden Sie in der{" "}
            <Link href="/datenschutz">Datenschutzerklärung</Link>.
          </p>
          <FieldError
            error={errors.privacyAccepted}
            id={fieldId("privacy-error")}
          />
        </div>
      </div>

      <div className="form-honeypot" aria-hidden="true">
        <label htmlFor={fieldId("website")}>Website</label>
        <input
          id={fieldId("website")}
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("website")}
        />
      </div>

      <div className="form-actions">
        <button
          className="button button--primary form-submit"
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting
            ? "Potenzialanalyse wird angefragt …"
            : "Potenzialanalyse anfragen"}
        </button>
        <p className="form-required-note">
          <span aria-hidden="true">*</span> Pflichtfeld
        </p>
      </div>

      <div className="form-status" aria-live="polite" aria-atomic="true">
        {submissionStatus.state === "error" ? (
          <p className="form-status__error" role="alert">
            {submissionStatus.message}
          </p>
        ) : null}
        {submissionStatus.state === "success" ? (
          <p className="form-status__success" role="status">
            {submissionStatus.message}
          </p>
        ) : null}
      </div>
    </form>
  );
}

export default PotentialAnalysisForm;

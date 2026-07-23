import { z } from "zod";

import { serviceOptions } from "@/content/services";

export const companySizeOptions = [
  "1–9 Mitarbeitende",
  "10–49 Mitarbeitende",
  "50–249 Mitarbeitende",
  "250–999 Mitarbeitende",
  "1.000 oder mehr Mitarbeitende",
] as const;

const requiredShortText = (label: string, maximum = 120) =>
  z
    .string({ error: `${label} ist erforderlich.` })
    .trim()
    .min(1, `${label} ist erforderlich.`)
    .max(maximum, `${label} darf höchstens ${maximum} Zeichen enthalten.`);

const optionalText = (label: string, maximum: number) =>
  z
    .string({ error: `${label} muss als Text angegeben werden.` })
    .trim()
    .max(maximum, `${label} darf höchstens ${maximum} Zeichen enthalten.`);

const emailSchema = z
  .string({ error: "Bitte geben Sie Ihre E-Mail-Adresse ein." })
  .trim()
  .min(1, "Bitte geben Sie Ihre E-Mail-Adresse ein.")
  .max(254, "Die E-Mail-Adresse ist zu lang.")
  .email("Bitte geben Sie eine gültige E-Mail-Adresse ein.");

const phoneSchema = z
  .string({ error: "Bitte geben Sie eine gültige Telefonnummer ein." })
  .trim()
  .max(50, "Die Telefonnummer darf höchstens 50 Zeichen enthalten.")
  .refine(
    (value) => value === "" || /^[+()\d\s./-]{5,50}$/.test(value),
    "Bitte geben Sie eine gültige Telefonnummer ein.",
  );

const desiredServiceSchema = z
  .string({ error: "Bitte wählen Sie eine gewünschte Leistung aus." })
  .refine(
    (value) => serviceOptions.some((option) => option === value),
    "Bitte wählen Sie eine gewünschte Leistung aus.",
  );

const privacyConsentSchema = z
  .boolean({ error: "Bitte bestätigen Sie die Datenschutzhinweise." })
  .refine((accepted) => accepted, {
    error:
      "Bitte bestätigen Sie, dass Sie die Datenschutzerklärung gelesen haben.",
  });

const termsConsentSchema = z
  .boolean({ error: "Bitte akzeptieren Sie die AGB." })
  .refine((accepted) => accepted, {
    error: "Bitte bestätigen Sie, dass Sie die AGB akzeptieren.",
  });

const honeypotSchema = z
  .string()
  .max(0, "Die Anfrage konnte nicht verarbeitet werden.");

export const contactFormSchema = z
  .object({
    formType: z.literal("contact"),
    firstName: requiredShortText("Vorname"),
    lastName: requiredShortText("Nachname"),
    company: requiredShortText("Unternehmensname", 160),
    email: emailSchema,
    desiredService: desiredServiceSchema,
    privacyAccepted: privacyConsentSchema,
    termsAccepted: termsConsentSchema,
    website: honeypotSchema,
  })
  .strict();

export const potentialAnalysisFormSchema = z
  .object({
    formType: z.literal("potential-analysis"),
    firstName: requiredShortText("Vorname"),
    lastName: requiredShortText("Nachname"),
    company: requiredShortText("Unternehmen", 160),
    email: emailSchema,
    phone: phoneSchema,
    industry: requiredShortText("Branche", 160),
    companySize: z
      .string({ error: "Bitte wählen Sie eine Unternehmensgröße aus." })
      .refine(
        (value) => companySizeOptions.some((option) => option === value),
        "Bitte wählen Sie eine Unternehmensgröße aus.",
      ),
    desiredService: desiredServiceSchema,
    processDescription: requiredShortText(
      "Kurze Beschreibung des Ablaufs",
      5_000,
    ),
    currentSystems: optionalText("Aktuell verwendete Systeme", 2_000),
    desiredGoal: optionalText("Gewünschtes Ziel", 2_000),
    privacyAccepted: privacyConsentSchema,
    website: honeypotSchema,
  })
  .strict();

export const formSubmissionSchema = z.discriminatedUnion("formType", [
  contactFormSchema,
  potentialAnalysisFormSchema,
]);

export type ContactFormValues = z.infer<typeof contactFormSchema>;
export type PotentialAnalysisFormValues = z.infer<
  typeof potentialAnalysisFormSchema
>;
export type FormSubmission = z.infer<typeof formSubmissionSchema>;

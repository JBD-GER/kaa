import { Resend } from "resend";

import type { FormSubmission } from "@/lib/validation";

export class EmailConfigurationError extends Error {
  constructor(public readonly missingVariables: string[]) {
    super("Die E-Mail-Konfiguration ist unvollständig.");
    this.name = "EmailConfigurationError";
  }
}

export class EmailDeliveryError extends Error {
  constructor() {
    super("Die E-Mail konnte nicht versendet werden.");
    this.name = "EmailDeliveryError";
  }
}

export type EmailDeliveryResult = {
  mode: "sent" | "simulated";
};

type EmailConfig = {
  apiKey: string;
  contactEmail: string;
  fromEmail: string;
};

type EmailRow = [label: string, value: string];

export function escapeHtml(value: string): string {
  return value.replace(/[&<>'"]/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "'": "&#39;",
      '"': "&quot;",
    };

    return entities[character];
  });
}

function readEmailConfig(): EmailConfig | null {
  const values = {
    RESEND_API_KEY: process.env.RESEND_API_KEY?.trim(),
    CONTACT_EMAIL: process.env.CONTACT_EMAIL?.trim(),
    FROM_EMAIL: process.env.FROM_EMAIL?.trim(),
  };

  const missingVariables = Object.entries(values)
    .filter(([, value]) => !value)
    .map(([key]) => key);

  if (missingVariables.length > 0) {
    if (process.env.NODE_ENV === "production") {
      throw new EmailConfigurationError(missingVariables);
    }

    return null;
  }

  return {
    apiKey: values.RESEND_API_KEY as string,
    contactEmail: values.CONTACT_EMAIL as string,
    fromEmail: values.FROM_EMAIL as string,
  };
}

function displayValue(value: string): string {
  return value.trim() || "Nicht angegeben";
}

function submissionRows(submission: FormSubmission): EmailRow[] {
  const commonRows: EmailRow[] = [
    ["Vorname", submission.firstName],
    ["Nachname", submission.lastName],
    ["Unternehmen", submission.company],
    ["E-Mail-Adresse", submission.email],
    ["Telefonnummer", displayValue(submission.phone)],
    ["Gewünschte Leistung", submission.desiredService],
  ];

  if (submission.formType === "contact") {
    return [
      ["Formular", "Kontaktanfrage"],
      ...commonRows,
      ["Nachricht", submission.message],
      ["Bevorzugte Kontaktart", displayValue(submission.preferredContact)],
    ];
  }

  return [
    ["Formular", "KI-Potenzialanalyse"],
    ...commonRows,
    ["Branche", submission.industry],
    ["Unternehmensgröße", submission.companySize],
    ["Beschreibung des Ablaufs", submission.processDescription],
    ["Aktuell verwendete Systeme", displayValue(submission.currentSystems)],
    ["Gewünschtes Ziel", displayValue(submission.desiredGoal)],
  ];
}

function rowsAsHtml(rows: EmailRow[]): string {
  return rows
    .map(
      ([label, value]) => `
        <tr>
          <th style="padding:10px 12px;text-align:left;vertical-align:top;border-bottom:1px solid #dbe3ee;font-family:Arial,sans-serif;font-size:14px;color:#243248;">${escapeHtml(label)}</th>
          <td style="padding:10px 12px;vertical-align:top;border-bottom:1px solid #dbe3ee;font-family:Arial,sans-serif;font-size:14px;line-height:1.55;color:#07111f;white-space:pre-wrap;">${escapeHtml(value)}</td>
        </tr>`,
    )
    .join("");
}

function rowsAsText(rows: EmailRow[]): string {
  return rows.map(([label, value]) => `${label}: ${value}`).join("\n\n");
}

function internalEmailHtml(submission: FormSubmission): string {
  const heading =
    submission.formType === "contact"
      ? "Neue Kontaktanfrage"
      : "Neue Anfrage zur KI-Potenzialanalyse";

  return `<!doctype html>
    <html lang="de">
      <body style="margin:0;padding:24px;background:#f3f6fa;">
        <main style="max-width:720px;margin:0 auto;padding:28px;background:#ffffff;border-radius:16px;">
          <h1 style="margin:0 0 20px;font-family:Arial,sans-serif;font-size:24px;color:#07111f;">${heading}</h1>
          <table role="presentation" style="width:100%;border-collapse:collapse;">${rowsAsHtml(submissionRows(submission))}</table>
        </main>
      </body>
    </html>`;
}

function confirmationEmailHtml(submission: FormSubmission): string {
  const formLabel =
    submission.formType === "contact"
      ? "Kontaktanfrage"
      : "Anfrage zur KI-Potenzialanalyse";

  return `<!doctype html>
    <html lang="de">
      <body style="margin:0;padding:24px;background:#f3f6fa;">
        <main style="max-width:640px;margin:0 auto;padding:28px;background:#ffffff;border-radius:16px;font-family:Arial,sans-serif;color:#07111f;">
          <p style="margin:0 0 12px;font-size:16px;line-height:1.6;">Guten Tag ${escapeHtml(submission.firstName)} ${escapeHtml(submission.lastName)},</p>
          <h1 style="margin:0 0 16px;font-size:24px;">Ihre Anfrage ist bei uns eingegangen.</h1>
          <p style="margin:0 0 16px;font-size:16px;line-height:1.6;">Vielen Dank für Ihre ${formLabel}. Wir prüfen Ihre Angaben und melden uns mit möglichen nächsten Schritten.</p>
          <p style="margin:0;font-size:14px;line-height:1.6;color:#526176;">Gewünschte Leistung: ${escapeHtml(submission.desiredService)}</p>
        </main>
      </body>
    </html>`;
}

export async function sendSubmissionEmails(
  submission: FormSubmission,
): Promise<EmailDeliveryResult> {
  const config = readEmailConfig();
  if (!config) return { mode: "simulated" };

  const resend = new Resend(config.apiKey);
  const rows = submissionRows(submission);
  const internalSubject =
    submission.formType === "contact"
      ? "Neue Kontaktanfrage über die KAA-Website"
      : "Neue Anfrage zur KI-Potenzialanalyse";
  const confirmationSubject =
    submission.formType === "contact"
      ? "Ihre Anfrage bei KAA"
      : "Ihre Anfrage zur KI-Potenzialanalyse bei KAA";

  try {
    const [internalResult, confirmationResult] = await Promise.all([
      resend.emails.send({
        from: config.fromEmail,
        to: config.contactEmail,
        replyTo: submission.email,
        subject: internalSubject,
        html: internalEmailHtml(submission),
        text: `${internalSubject}\n\n${rowsAsText(rows)}`,
      }),
      resend.emails.send({
        from: config.fromEmail,
        to: submission.email,
        subject: confirmationSubject,
        html: confirmationEmailHtml(submission),
        text: `Guten Tag ${submission.firstName} ${submission.lastName},\n\nvielen Dank für Ihre Anfrage. Wir haben Ihre Angaben erhalten und prüfen die möglichen nächsten Schritte.\n\nGewünschte Leistung: ${submission.desiredService}`,
      }),
    ]);

    if (internalResult.error || confirmationResult.error) {
      throw new EmailDeliveryError();
    }
  } catch (error) {
    if (error instanceof EmailDeliveryError) throw error;
    throw new EmailDeliveryError();
  }

  return { mode: "sent" };
}

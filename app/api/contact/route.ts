import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

import { siteConfig } from "@/config/site";
import {
  EmailConfigurationError,
  EmailDeliveryError,
  sendSubmissionEmails,
} from "@/lib/email";
import { consumeRateLimit, createRateLimitIdentifier } from "@/lib/rate-limit";
import { formSubmissionSchema } from "@/lib/validation";

export const runtime = "nodejs";

const MAX_BODY_BYTES = 32_000;
const RATE_LIMIT = { limit: 5, windowMs: 10 * 60 * 1_000 } as const;

type ApiBody = {
  ok: boolean;
  message: string;
  fieldErrors?: Record<string, string[]>;
  simulated?: boolean;
};

function jsonResponse(
  body: ApiBody,
  status: number,
  extraHeaders: Record<string, string> = {},
) {
  return NextResponse.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store",
      ...extraHeaders,
    },
  });
}

function originIsAllowed(request: NextRequest): boolean {
  const originHeader = request.headers.get("origin");
  if (!originHeader) return true;

  try {
    const submittedOrigin = new URL(originHeader).origin;
    const allowedOrigins = new Set([
      new URL(siteConfig.url).origin,
      request.nextUrl.origin,
      "http://localhost:3000",
      "http://127.0.0.1:3000",
    ]);

    const forwardedHost = request.headers.get("x-forwarded-host");
    const requestHost = forwardedHost ?? request.headers.get("host");
    if (requestHost) {
      const forwardedProtocol = request.headers.get("x-forwarded-proto");
      const protocol = forwardedProtocol ?? request.nextUrl.protocol.replace(":", "");
      if (protocol === "http" || protocol === "https") {
        allowedOrigins.add(`${protocol}://${requestHost}`);
      }
    }

    return allowedOrigins.has(submittedOrigin);
  } catch {
    return false;
  }
}

function fieldErrorsFromIssues(
  issues: ReadonlyArray<{ path: PropertyKey[]; message: string }>,
): Record<string, string[]> {
  const fieldErrors: Record<string, string[]> = {};

  for (const issue of issues) {
    const field = String(issue.path[0] ?? "form");
    fieldErrors[field] ??= [];
    if (!fieldErrors[field].includes(issue.message)) {
      fieldErrors[field].push(issue.message);
    }
  }

  return fieldErrors;
}

export async function POST(request: NextRequest) {
  if (!originIsAllowed(request)) {
    return jsonResponse(
      {
        ok: false,
        message:
          "Die Anfrage konnte aus Sicherheitsgründen nicht verarbeitet werden.",
      },
      403,
    );
  }

  const contentType = request.headers.get("content-type")?.toLowerCase() ?? "";
  if (!contentType.startsWith("application/json")) {
    return jsonResponse(
      {
        ok: false,
        message: "Bitte senden Sie die Formulardaten im JSON-Format.",
      },
      415,
    );
  }

  const declaredLength = Number(request.headers.get("content-length"));
  if (Number.isFinite(declaredLength) && declaredLength > MAX_BODY_BYTES) {
    return jsonResponse(
      {
        ok: false,
        message: "Die Anfrage ist zu groß. Bitte kürzen Sie Ihre Angaben.",
      },
      413,
    );
  }

  const rateLimit = consumeRateLimit(
    createRateLimitIdentifier(request.headers),
    RATE_LIMIT,
  );
  const rateLimitHeaders = {
    "X-RateLimit-Limit": String(rateLimit.limit),
    "X-RateLimit-Remaining": String(rateLimit.remaining),
    "X-RateLimit-Reset": String(Math.ceil(rateLimit.resetAt / 1_000)),
  };

  if (!rateLimit.allowed) {
    return jsonResponse(
      {
        ok: false,
        message:
          "Zu viele Anfragen in kurzer Zeit. Bitte versuchen Sie es später erneut.",
      },
      429,
      {
        ...rateLimitHeaders,
        "Retry-After": String(rateLimit.retryAfterSeconds),
      },
    );
  }

  let rawBody: string;
  try {
    rawBody = await request.text();
  } catch {
    return jsonResponse(
      { ok: false, message: "Die Anfrage konnte nicht gelesen werden." },
      400,
      rateLimitHeaders,
    );
  }

  if (new TextEncoder().encode(rawBody).byteLength > MAX_BODY_BYTES) {
    return jsonResponse(
      {
        ok: false,
        message: "Die Anfrage ist zu groß. Bitte kürzen Sie Ihre Angaben.",
      },
      413,
      rateLimitHeaders,
    );
  }

  let body: unknown;
  try {
    body = JSON.parse(rawBody);
  } catch {
    return jsonResponse(
      { ok: false, message: "Die Formulardaten sind nicht gültig." },
      400,
      rateLimitHeaders,
    );
  }

  if (
    typeof body === "object" &&
    body !== null &&
    "website" in body &&
    typeof body.website === "string" &&
    body.website.trim() !== ""
  ) {
    return jsonResponse(
      { ok: true, message: "Vielen Dank. Ihre Anfrage wurde übermittelt." },
      200,
      rateLimitHeaders,
    );
  }

  const validation = formSubmissionSchema.safeParse(body);
  if (!validation.success) {
    return jsonResponse(
      {
        ok: false,
        message: "Bitte prüfen Sie die markierten Formularfelder.",
        fieldErrors: fieldErrorsFromIssues(validation.error.issues),
      },
      422,
      rateLimitHeaders,
    );
  }

  try {
    const delivery = await sendSubmissionEmails(validation.data);
    return jsonResponse(
      {
        ok: true,
        message: "Vielen Dank. Ihre Anfrage wurde erfolgreich übermittelt.",
        simulated: delivery.mode === "simulated" || undefined,
      },
      200,
      rateLimitHeaders,
    );
  } catch (error) {
    if (error instanceof EmailConfigurationError) {
      return jsonResponse(
        {
          ok: false,
          message:
            "Der Formularversand ist vorübergehend nicht verfügbar. Bitte versuchen Sie es später erneut.",
        },
        503,
        rateLimitHeaders,
      );
    }

    if (error instanceof EmailDeliveryError) {
      return jsonResponse(
        {
          ok: false,
          message:
            "Die Anfrage konnte momentan nicht versendet werden. Bitte versuchen Sie es später erneut.",
        },
        502,
        rateLimitHeaders,
      );
    }

    return jsonResponse(
      {
        ok: false,
        message:
          "Es ist ein unerwarteter Fehler aufgetreten. Bitte versuchen Sie es später erneut.",
      },
      500,
      rateLimitHeaders,
    );
  }
}

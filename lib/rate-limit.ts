import { createHash } from "node:crypto";

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

type RateLimitStore = Map<string, RateLimitEntry>;

type RateLimitGlobal = typeof globalThis & {
  __kaaContactRateLimitStore?: RateLimitStore;
};

export type RateLimitOptions = {
  limit: number;
  windowMs: number;
};

export type RateLimitResult = {
  allowed: boolean;
  limit: number;
  remaining: number;
  resetAt: number;
  retryAfterSeconds: number;
};

const rateLimitGlobal = globalThis as RateLimitGlobal;
const rateLimitStore =
  rateLimitGlobal.__kaaContactRateLimitStore ??
  new Map<string, RateLimitEntry>();

rateLimitGlobal.__kaaContactRateLimitStore = rateLimitStore;

function removeExpiredEntries(now: number): void {
  for (const [key, entry] of rateLimitStore) {
    if (entry.resetAt <= now) rateLimitStore.delete(key);
  }
}

export function createRateLimitIdentifier(headers: Headers): string {
  const forwardedAddress = headers
    .get("x-forwarded-for")
    ?.split(",")[0]
    ?.trim();
  const directAddress = headers.get("x-real-ip")?.trim();
  const address = forwardedAddress || directAddress || "unknown";
  const userAgent = headers.get("user-agent")?.slice(0, 200) || "unknown";

  return createHash("sha256").update(`${address}|${userAgent}`).digest("hex");
}

export function consumeRateLimit(
  identifier: string,
  { limit, windowMs }: RateLimitOptions,
  now = Date.now(),
): RateLimitResult {
  if (rateLimitStore.size > 1_000) removeExpiredEntries(now);

  const current = rateLimitStore.get(identifier);
  if (!current || current.resetAt <= now) {
    const resetAt = now + windowMs;
    rateLimitStore.set(identifier, { count: 1, resetAt });

    return {
      allowed: true,
      limit,
      remaining: Math.max(0, limit - 1),
      resetAt,
      retryAfterSeconds: Math.ceil(windowMs / 1_000),
    };
  }

  if (current.count >= limit) {
    return {
      allowed: false,
      limit,
      remaining: 0,
      resetAt: current.resetAt,
      retryAfterSeconds: Math.max(
        1,
        Math.ceil((current.resetAt - now) / 1_000),
      ),
    };
  }

  current.count += 1;
  rateLimitStore.set(identifier, current);

  return {
    allowed: true,
    limit,
    remaining: Math.max(0, limit - current.count),
    resetAt: current.resetAt,
    retryAfterSeconds: Math.max(1, Math.ceil((current.resetAt - now) / 1_000)),
  };
}

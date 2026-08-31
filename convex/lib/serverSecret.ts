const MINIMUM_SECRET_LENGTH = 32;

/**
 * Protects public Convex functions that are only meant to be called by the
 * trusted Next.js server. ConvexHttpClient cannot invoke internal functions,
 * so these gateway functions authenticate with a shared, server-only secret.
 *
 * Configure the same high-entropy CONVEX_SERVER_SECRET in both the Convex
 * deployment and the Next.js server runtime. Never expose it through a
 * NEXT_PUBLIC_* variable.
 */
export function requireServerSecret(providedSecret: string): void {
  const expectedSecret = process.env.CONVEX_SERVER_SECRET;

  if (
    !expectedSecret ||
    expectedSecret.length < MINIMUM_SECRET_LENGTH ||
    providedSecret.length !== expectedSecret.length
  ) {
    throw new Error("Unauthorized");
  }

  // Compare every character instead of returning at the first mismatch.
  let mismatch = 0;
  for (let index = 0; index < expectedSecret.length; index += 1) {
    mismatch |= providedSecret.charCodeAt(index) ^ expectedSecret.charCodeAt(index);
  }

  if (mismatch !== 0) {
    throw new Error("Unauthorized");
  }
}


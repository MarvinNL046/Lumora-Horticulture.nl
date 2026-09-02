const CANONICAL_PRODUCTION_HOST = 'lumorahorticulture.nl';
const TRUSTED_VERCEL_PREVIEW_HOST =
  /^lumorahorticulture-[a-z0-9-]+-marvinnl046s-projects\.vercel\.app$/;

export class InvalidCanonicalBaseUrlError extends Error {
  constructor() {
    super('NEXT_PUBLIC_BASE_URL must be a trusted canonical origin');
    this.name = 'InvalidCanonicalBaseUrlError';
  }
}

export function parseCanonicalBaseUrl(
  value: unknown,
  options: { allowLocalhost?: boolean } = {},
): string {
  if (typeof value !== 'string' || value.length === 0 || value.length > 2_048) {
    throw new InvalidCanonicalBaseUrlError();
  }

  let url: URL;
  try {
    url = new URL(value);
  } catch {
    throw new InvalidCanonicalBaseUrlError();
  }

  const isLocalhost =
    options.allowLocalhost === true &&
    (url.hostname === 'localhost' || url.hostname === '127.0.0.1');
  const hasCleanOrigin =
    url.username === '' &&
    url.password === '' &&
    url.pathname === '/' &&
    url.search === '' &&
    url.hash === '';
  const isTrustedProduction =
    url.protocol === 'https:' &&
    url.port === '' &&
    url.hostname === CANONICAL_PRODUCTION_HOST;
  const isTrustedLocal =
    isLocalhost &&
    (url.protocol === 'http:' || url.protocol === 'https:') &&
    /^\d*$/.test(url.port);

  if (!hasCleanOrigin || (!isTrustedProduction && !isTrustedLocal)) {
    throw new InvalidCanonicalBaseUrlError();
  }

  return url.origin;
}

export function getCanonicalBaseUrl(): string {
  return parseCanonicalBaseUrl(process.env.NEXT_PUBLIC_BASE_URL, {
    allowLocalhost: process.env.NODE_ENV !== 'production',
  });
}

/**
 * Payment callbacks must stay on the environment that created the payment.
 * Vercel provides VERCEL_URL itself, so Preview can use that exact deployment
 * origin without trusting request headers or a broadly configurable hostname.
 */
export function parseTrustedVercelPreviewBaseUrl(value: unknown): string {
  if (typeof value !== 'string' || value.length === 0 || value.length > 253) {
    throw new InvalidCanonicalBaseUrlError();
  }

  const host = value.toLowerCase();
  if (host !== value || !TRUSTED_VERCEL_PREVIEW_HOST.test(host)) {
    throw new InvalidCanonicalBaseUrlError();
  }

  return `https://${host}`;
}

export function getPaymentCallbackBaseUrl(): string {
  if (process.env.VERCEL_ENV === 'preview') {
    return parseTrustedVercelPreviewBaseUrl(process.env.VERCEL_URL);
  }

  return getCanonicalBaseUrl();
}

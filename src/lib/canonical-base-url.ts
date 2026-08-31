const TRUSTED_PRODUCTION_HOSTS = new Set([
  'lumorahorticulture.nl',
  'www.lumorahorticulture.nl',
  'lumorahorticulture.com',
  'www.lumorahorticulture.com',
  'lumorahorticulture.de',
  'www.lumorahorticulture.de',
]);

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
    TRUSTED_PRODUCTION_HOSTS.has(url.hostname);
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

export type SavedAddressInput = {
  name: string;
  street: string;
  city: string;
  postal_code: string;
  country: 'NL' | 'BE' | 'DE';
  phone?: string;
  is_default: boolean;
};

function cleanBoundedString(
  value: unknown,
  minimum: number,
  maximum: number,
): string | null {
  if (typeof value !== 'string') return null;
  const clean = value.trim();
  return clean.length >= minimum && clean.length <= maximum ? clean : null;
}

export function parseSavedAddressInput(value: unknown): SavedAddressInput | null {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
  const body = value as Record<string, unknown>;
  const name = cleanBoundedString(body.name, 1, 100);
  const street = cleanBoundedString(body.street, 2, 200);
  const city = cleanBoundedString(body.city, 2, 100);
  const postalCode = cleanBoundedString(body.postal_code, 3, 20);
  const countryValue = typeof body.country === 'string'
    ? body.country.trim().toUpperCase()
    : '';
  const phone = body.phone == null || body.phone === ''
    ? undefined
    : cleanBoundedString(body.phone, 3, 40);

  if (
    !name ||
    !street ||
    !city ||
    !postalCode ||
    (countryValue !== 'NL' && countryValue !== 'BE' && countryValue !== 'DE') ||
    phone === null ||
    (body.is_default != null && typeof body.is_default !== 'boolean')
  ) {
    return null;
  }

  return {
    name,
    street,
    city,
    postal_code: postalCode,
    country: countryValue,
    phone,
    is_default: body.is_default === true,
  };
}

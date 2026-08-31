export function parseEuroAmountToCents(value: unknown): number | null {
  if (typeof value !== 'string' || !/^(0|[1-9]\d{0,9})\.\d{2}$/.test(value)) {
    return null;
  }

  const [euros, cents] = value.split('.');
  const result = Number(euros) * 100 + Number(cents);
  return Number.isSafeInteger(result) && result > 0 ? result : null;
}

export function centsToEuroAmount(cents: number): number {
  if (!Number.isSafeInteger(cents) || cents < 1) {
    throw new Error('Invalid monetary amount');
  }
  return cents / 100;
}

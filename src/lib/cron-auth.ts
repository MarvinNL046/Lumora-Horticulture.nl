import { timingSafeEqual } from 'node:crypto';

const MINIMUM_CRON_SECRET_LENGTH = 32;

export function isAuthorizedCronRequest(authorizationHeader: string | null): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret || secret.length < MINIMUM_CRON_SECRET_LENGTH || !authorizationHeader) {
    return false;
  }

  const supplied = Buffer.from(authorizationHeader, 'utf8');
  const expected = Buffer.from(`Bearer ${secret}`, 'utf8');
  return supplied.length === expected.length && timingSafeEqual(supplied, expected);
}

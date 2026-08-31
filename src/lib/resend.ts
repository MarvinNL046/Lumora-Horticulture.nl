import { Resend } from 'resend';

export function assertResendConfigured(): void {
  if (!process.env.RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY is not configured');
  }
}

let resendClient: Resend | null = null;

function getResendClient(): Resend {
  assertResendConfigured();
  resendClient ??= new Resend(process.env.RESEND_API_KEY!);
  return resendClient;
}

// Do not throw while this module is imported. Durable webhook callers must be
// able to claim their outbox effect and record a retryable configuration error.
export const resend = new Proxy({} as Resend, {
  get(_target, property) {
    const client = getResendClient() as unknown as Record<string | symbol, unknown>;
    const value = client[property];
    return typeof value === 'function' ? value.bind(client) : value;
  },
});

// Email configuration
export const EMAIL_FROM = 'Lumora Horticulture <orders@lumorahorticulture.com>';
export const EMAIL_REPLY_TO = 'info@lumorahorticulture.com';
export const EMAIL_NOTIFICATION_TO = 'info@lumorahorticulture.com'; // Business notifications

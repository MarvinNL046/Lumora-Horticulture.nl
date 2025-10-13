import { Resend } from 'resend';

if (!process.env.RESEND_API_KEY) {
  throw new Error('RESEND_API_KEY is not set in environment variables');
}

export const resend = new Resend(process.env.RESEND_API_KEY);

// Email configuration
export const EMAIL_FROM = 'Lumora Horticulture <orders@lumorahorticulture.nl>';
export const EMAIL_REPLY_TO = 'info@lumorahorticulture.nl';

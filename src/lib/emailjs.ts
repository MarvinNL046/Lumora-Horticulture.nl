// Interface for email parameters
export interface EmailParams {
  name: string;
  email: string;
  message: string;
  company?: string;
  phone?: string;
  time?: string;
  [key: string]: unknown;
}

// Helper function to dynamically load EmailJS
const loadEmailJs = async (): Promise<typeof import('@emailjs/browser')> => {
  try {
    // Dynamic import to prevent build-time errors
    const emailjsModule = await import('@emailjs/browser');
    
    // EmailJS configuration
    const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '';
    const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '';
    const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '';

    // Validate that required environment variables are set
    if (!PUBLIC_KEY || !SERVICE_ID || !TEMPLATE_ID) {
      console.warn('EmailJS environment variables are not properly set up. Emails will not be sent.');
    }

    // Initialize EmailJS with public key
    emailjsModule.init(PUBLIC_KEY);
    
    return emailjsModule;
  } catch (error) {
    console.error('Failed to load EmailJS:', error);
    // Return a mock implementation that doesn't break runtime
    return {
      init: () => {},
      send: async () => ({ status: 0, text: 'EmailJS not available' })
    } as unknown as typeof import('@emailjs/browser');
  }
};

/**
 * Send an email using EmailJS
 * @param params Email parameters to send
 * @returns Promise with the result
 */
export const sendEmail = async (params: EmailParams): Promise<{ success: boolean; error?: any }> => {
  try {
    // Add current time if not provided
    if (!params.time) {
      const now = new Date();
      params.time = now.toLocaleString('nl-NL');
    }

    // Load EmailJS dynamically
    const emailjs = await loadEmailJs();
    
    // Get configuration from environment
    const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || '';
    const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || '';
    
    if (!SERVICE_ID || !TEMPLATE_ID) {
      console.error('Missing EmailJS configuration');
      return { success: false, error: 'Missing configuration' };
    }

    // Send the email
    const result = await emailjs.send(SERVICE_ID, TEMPLATE_ID, params as Record<string, unknown>);
    
    return {
      success: true
    };
  } catch (error) {
    console.error('Error sending email:', error);
    
    return {
      success: false,
      error
    };
  }
};

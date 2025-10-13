'use client';

import { useEffect, useRef } from 'react';
import { useUser } from '@stackframe/stack';
import { useParams } from 'next/navigation';

/**
 * Component that automatically sends welcome email to newly registered users
 * This component should be placed in the layout or a page that loads after authentication
 */
export default function WelcomeEmailTrigger() {
  const user = useUser();
  const params = useParams();
  const locale = (params?.locale as string) || 'nl';
  const hasSentEmail = useRef(false);

  useEffect(() => {
    const sendWelcomeEmail = async () => {
      // Only send email if user exists and we haven't sent it yet
      if (!user || hasSentEmail.current) {
        return;
      }

      // Check localStorage to see if we've already sent a welcome email for this user
      const welcomeEmailSentKey = `welcome_email_sent_${user.id}`;
      const emailAlreadySent = localStorage.getItem(welcomeEmailSentKey);

      // Only send email if it hasn't been sent before for this user
      if (!emailAlreadySent) {
        try {
          hasSentEmail.current = true;

          const response = await fetch('/api/auth/welcome-email', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ locale }),
          });

          if (!response.ok) {
            console.error('Failed to send welcome email:', await response.text());
          } else {
            console.log('Welcome email sent successfully');
            // Mark that we've sent the welcome email for this user
            localStorage.setItem(welcomeEmailSentKey, 'true');
          }
        } catch (error) {
          console.error('Error sending welcome email:', error);
        }
      }
    };

    sendWelcomeEmail();
  }, [user, locale]);

  // This component doesn't render anything
  return null;
}

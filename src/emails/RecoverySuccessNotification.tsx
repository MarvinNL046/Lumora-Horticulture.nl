import * as React from 'react';
import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Section,
  Heading,
  Text,
  Hr,
  Link,
} from '@react-email/components';

interface RecoverySuccessNotificationProps {
  orderNumber: string;
  orderId: string;
  customerName: string;
  customerEmail: string;
  totalAmount: number;
  recoveryAttempts: number;
  originalCreatedAt: string;
  paidAt: string;
}

export function RecoverySuccessNotification({
  orderNumber,
  orderId,
  customerName,
  customerEmail,
  totalAmount,
  recoveryAttempts,
  originalCreatedAt,
  paidAt,
}: RecoverySuccessNotificationProps) {
  return (
    <Html>
      <Head />
      <Preview>
        🎉 Recovery succesvol! Bestelling {orderNumber} is alsnog betaald - €{totalAmount.toFixed(2)}
      </Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={headerSection}>
            <Heading style={headerTitle}>🎉 Recovery Succesvol!</Heading>
          </Section>

          <Section style={contentSection}>
            <Text style={introText}>
              Goed nieuws! Een verlopen bestelling is alsnog betaald via de payment recovery flow.
            </Text>

            <Section style={highlightBox}>
              <Text style={highlightLabel}>Teruggewonnen Omzet</Text>
              <Text style={highlightAmount}>€{totalAmount.toFixed(2)}</Text>
            </Section>

            <Hr style={divider} />

            <Heading as="h2" style={sectionTitle}>
              Bestelgegevens
            </Heading>

            <table style={detailsTable}>
              <tbody>
                <tr>
                  <td style={labelCell}>Bestelnummer:</td>
                  <td style={valueCell}>{orderNumber}</td>
                </tr>
                <tr>
                  <td style={labelCell}>Order ID:</td>
                  <td style={valueCell}>{orderId.substring(0, 8).toUpperCase()}</td>
                </tr>
                <tr>
                  <td style={labelCell}>Klant:</td>
                  <td style={valueCell}>{customerName}</td>
                </tr>
                <tr>
                  <td style={labelCell}>Email:</td>
                  <td style={valueCell}>
                    <Link href={`mailto:${customerEmail}`} style={linkStyle}>
                      {customerEmail}
                    </Link>
                  </td>
                </tr>
                <tr>
                  <td style={labelCell}>Oorspronkelijk aangemaakt:</td>
                  <td style={valueCell}>{originalCreatedAt}</td>
                </tr>
                <tr>
                  <td style={labelCell}>Betaald op:</td>
                  <td style={valueCell}>{paidAt}</td>
                </tr>
                <tr>
                  <td style={labelCell}>Recovery emails verstuurd:</td>
                  <td style={valueCell}>{recoveryAttempts}</td>
                </tr>
              </tbody>
            </table>

            <Hr style={divider} />

            <Section style={statsBox}>
              <Text style={statsTitle}>💡 Payment Recovery werkt!</Text>
              <Text style={statsText}>
                Deze bestelling zou verloren zijn gegaan zonder de automatische recovery emails.
                De klant heeft na {recoveryAttempts} herinnering(en) alsnog betaald.
              </Text>
            </Section>
          </Section>

          <Section style={footerSection}>
            <Text style={footerText}>
              Dit is een automatische notificatie van het Lumora Payment Recovery Systeem.
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

// Styles
const main = {
  backgroundColor: '#f6f9fc',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '0',
  marginBottom: '64px',
  borderRadius: '12px',
  overflow: 'hidden',
  boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
};

const headerSection = {
  backgroundColor: '#2D7D46',
  padding: '32px 40px',
  textAlign: 'center' as const,
};

const headerTitle = {
  color: '#ffffff',
  fontSize: '28px',
  fontWeight: 'bold',
  margin: '0',
};

const contentSection = {
  padding: '32px 40px',
};

const introText = {
  color: '#404F4A',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '0 0 24px',
};

const highlightBox = {
  backgroundColor: '#F0F9F3',
  borderRadius: '12px',
  padding: '24px',
  textAlign: 'center' as const,
  marginBottom: '24px',
};

const highlightLabel = {
  color: '#404F4A',
  fontSize: '14px',
  fontWeight: '600',
  margin: '0 0 8px',
  textTransform: 'uppercase' as const,
  letterSpacing: '0.5px',
};

const highlightAmount = {
  color: '#2D7D46',
  fontSize: '36px',
  fontWeight: 'bold',
  margin: '0',
};

const divider = {
  borderColor: '#e6ebf1',
  margin: '24px 0',
};

const sectionTitle = {
  color: '#404F4A',
  fontSize: '18px',
  fontWeight: 'bold',
  margin: '0 0 16px',
};

const detailsTable = {
  width: '100%',
  borderCollapse: 'collapse' as const,
};

const labelCell = {
  color: '#666666',
  fontSize: '14px',
  padding: '8px 0',
  width: '40%',
  verticalAlign: 'top' as const,
};

const valueCell = {
  color: '#404F4A',
  fontSize: '14px',
  fontWeight: '500',
  padding: '8px 0',
};

const linkStyle = {
  color: '#2D7D46',
  textDecoration: 'underline',
};

const statsBox = {
  backgroundColor: '#FFF9E6',
  borderRadius: '12px',
  padding: '20px',
  border: '1px solid #F5E6B3',
};

const statsTitle = {
  color: '#404F4A',
  fontSize: '16px',
  fontWeight: 'bold',
  margin: '0 0 8px',
};

const statsText = {
  color: '#666666',
  fontSize: '14px',
  lineHeight: '20px',
  margin: '0',
};

const footerSection = {
  backgroundColor: '#f6f9fc',
  padding: '20px 40px',
  textAlign: 'center' as const,
};

const footerText = {
  color: '#8898aa',
  fontSize: '12px',
  margin: '0',
};

export default RecoverySuccessNotification;

import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface ShippedEmailProps {
  orderNumber: string;
  customerName: string;
  trackingUrl: string;
  trackingCode?: string;
  carrier: string;
  pickup?: {
    locationName: string;
    street: string;
    number: string;
    postalCode: string;
    city: string;
  } | null;
  locale?: 'nl' | 'en' | 'de';
}

const COPY = {
  nl: {
    preview: (num: string) => `Je bestelling ${num} is onderweg`,
    heading: 'Je pakket is onderweg!',
    greeting: (name: string) => `Hallo ${name},`,
    intro: (num: string) =>
      `Goed nieuws — je bestelling ${num} is zojuist overgedragen aan de vervoerder. Je kunt je zending hieronder volgen.`,
    cta: 'Volg je pakket',
    trackingLabel: 'Trackingcode',
    carrierLabel: 'Vervoerder',
    pickupHeading: 'Ophalen bij',
    pickupHint: 'Zodra je pakket klaar ligt, stuurt de vervoerder je een bericht met ophaalinstructies.',
    footer: 'Vragen? Beantwoord deze mail en we helpen je graag verder.',
  },
  en: {
    preview: (num: string) => `Your order ${num} is on its way`,
    heading: 'Your parcel is on the way!',
    greeting: (name: string) => `Hi ${name},`,
    intro: (num: string) =>
      `Good news — your order ${num} has been handed over to the carrier. You can track the shipment below.`,
    cta: 'Track your parcel',
    trackingLabel: 'Tracking code',
    carrierLabel: 'Carrier',
    pickupHeading: 'Pickup at',
    pickupHint: 'You will receive a separate notification from the carrier as soon as the parcel is ready for pickup.',
    footer: 'Questions? Reply to this email and we will help.',
  },
  de: {
    preview: (num: string) => `Deine Bestellung ${num} ist unterwegs`,
    heading: 'Dein Paket ist unterwegs!',
    greeting: (name: string) => `Hallo ${name},`,
    intro: (num: string) =>
      `Gute Nachrichten — deine Bestellung ${num} wurde an den Paketdienst übergeben. Du kannst die Sendung unten verfolgen.`,
    cta: 'Paket verfolgen',
    trackingLabel: 'Sendungsnummer',
    carrierLabel: 'Paketdienst',
    pickupHeading: 'Abholung bei',
    pickupHint: 'Sobald dein Paket bereitliegt, erhältst du eine separate Benachrichtigung vom Paketdienst.',
    footer: 'Fragen? Antworte einfach auf diese E-Mail.',
  },
};

export const ShippedEmail = ({
  orderNumber = 'ORD-12345',
  customerName = 'Jan Jansen',
  trackingUrl = 'https://postnl.nl/tracktrace/',
  trackingCode,
  carrier = 'PostNL',
  pickup,
  locale = 'nl',
}: ShippedEmailProps) => {
  const t = COPY[locale] ?? COPY.nl;
  return (
    <Html>
      <Head />
      <Preview>{t.preview(orderNumber)}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Heading style={headerTitle}>{t.heading}</Heading>
          </Section>

          <Section style={section}>
            <Text style={greeting}>{t.greeting(customerName || '')}</Text>
            <Text style={paragraph}>{t.intro(orderNumber)}</Text>

            <Section style={infoBox}>
              <Text style={infoLabel}>{t.carrierLabel}</Text>
              <Text style={infoValue}>{carrier}</Text>
              {trackingCode && (
                <>
                  <Text style={infoLabel}>{t.trackingLabel}</Text>
                  <Text style={infoValue}>{trackingCode}</Text>
                </>
              )}
            </Section>

            <Section style={{ textAlign: 'center', margin: '24px 0' }}>
              <Button href={trackingUrl} style={ctaButton}>
                {t.cta} →
              </Button>
            </Section>

            {pickup && (
              <>
                <Hr style={hr} />
                <Heading as="h2" style={pickupHeading}>
                  {t.pickupHeading}
                </Heading>
                <Text style={paragraph}>
                  <strong>{pickup.locationName}</strong>
                  <br />
                  {pickup.street} {pickup.number}
                  <br />
                  {pickup.postalCode} {pickup.city}
                </Text>
                <Text style={paragraphMuted}>{t.pickupHint}</Text>
              </>
            )}

            <Hr style={hr} />
            <Text style={paragraphMuted}>{t.footer}</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default ShippedEmail;

const main: React.CSSProperties = {
  backgroundColor: '#f6f7f4',
  fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
};
const container: React.CSSProperties = {
  margin: '0 auto',
  padding: '24px 0',
  maxWidth: '600px',
};
const header: React.CSSProperties = {
  backgroundColor: '#2d5a3d',
  padding: '40px 32px',
  textAlign: 'center',
  borderRadius: '16px 16px 0 0',
};
const headerTitle: React.CSSProperties = {
  color: '#ffffff',
  fontSize: '28px',
  fontWeight: 700,
  margin: 0,
};
const section: React.CSSProperties = {
  backgroundColor: '#ffffff',
  padding: '32px',
  borderRadius: '0 0 16px 16px',
};
const greeting: React.CSSProperties = {
  fontSize: '16px',
  fontWeight: 600,
  color: '#1a3a2a',
  margin: '0 0 16px',
};
const paragraph: React.CSSProperties = {
  fontSize: '15px',
  lineHeight: '24px',
  color: '#3a3a3a',
  margin: '0 0 16px',
};
const paragraphMuted: React.CSSProperties = {
  ...paragraph,
  color: '#6b6b6b',
  fontSize: '13px',
};
const infoBox: React.CSSProperties = {
  backgroundColor: '#f6f7f4',
  padding: '16px 20px',
  borderRadius: '12px',
  margin: '16px 0',
};
const infoLabel: React.CSSProperties = {
  fontSize: '12px',
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  color: '#6b6b6b',
  margin: '8px 0 2px',
};
const infoValue: React.CSSProperties = {
  fontSize: '15px',
  fontWeight: 600,
  color: '#1a3a2a',
  margin: '0 0 8px',
};
const ctaButton: React.CSSProperties = {
  backgroundColor: '#2d5a3d',
  color: '#ffffff',
  fontSize: '16px',
  fontWeight: 600,
  padding: '14px 32px',
  borderRadius: '12px',
  textDecoration: 'none',
  display: 'inline-block',
};
const hr: React.CSSProperties = {
  borderColor: '#e6e6e1',
  margin: '24px 0',
};
const pickupHeading: React.CSSProperties = {
  fontSize: '18px',
  fontWeight: 700,
  color: '#1a3a2a',
  margin: '0 0 12px',
};

import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from '@react-email/components';

interface NewCustomerNotificationProps {
  customerName: string;
  customerEmail: string;
  registrationDate: string;
}

export const NewCustomerNotification = ({
  customerName,
  customerEmail,
  registrationDate,
}: NewCustomerNotificationProps) => {
  return (
    <Html>
      <Head />
      <Preview>Nieuwe klant geregistreerd: {customerName}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Heading style={h1}>Nieuwe Klant Registratie</Heading>
          </Section>

          <Section style={content}>
            <Text style={paragraph}>
              Een nieuwe klant heeft zich geregistreerd op de Lumora Horticulture website.
            </Text>

            <Section style={infoBox}>
              <Text style={infoLabel}>Naam:</Text>
              <Text style={infoValue}>{customerName}</Text>

              <Text style={infoLabel}>Email:</Text>
              <Text style={infoValue}>
                <Link href={`mailto:${customerEmail}`}>{customerEmail}</Link>
              </Text>

              <Text style={infoLabel}>Registratiedatum:</Text>
              <Text style={infoValue}>{new Date(registrationDate).toLocaleString('nl-NL')}</Text>
            </Section>

            <Text style={paragraph}>
              Deze klant kan nu bestellingen plaatsen en heeft toegang tot alle klantfuncties.
            </Text>
          </Section>

          <Section style={footer}>
            <Text style={footerText}>
              Dit is een geautomatiseerde notificatie van Lumora Horticulture
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default NewCustomerNotification;

// Styles
const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
  maxWidth: '600px',
};

const header = {
  backgroundColor: '#404F4A',
  padding: '24px 20px',
  textAlign: 'center' as const,
};

const h1 = {
  color: '#FAF3C3',
  fontSize: '28px',
  fontWeight: 'bold',
  margin: '0',
  padding: '0',
};

const content = {
  padding: '32px 20px',
};

const paragraph = {
  color: '#404F4A',
  fontSize: '16px',
  lineHeight: '26px',
  margin: '16px 0',
};

const infoBox = {
  backgroundColor: '#f6f9fc',
  border: '1px solid #e6ebf1',
  borderRadius: '8px',
  padding: '20px',
  margin: '24px 0',
};

const infoLabel = {
  color: '#8898aa',
  fontSize: '14px',
  fontWeight: 'bold',
  margin: '12px 0 4px 0',
  textTransform: 'uppercase' as const,
};

const infoValue = {
  color: '#404F4A',
  fontSize: '16px',
  margin: '0 0 12px 0',
};

const footer = {
  borderTop: '1px solid #eaeaea',
  padding: '20px',
  textAlign: 'center' as const,
};

const footerText = {
  color: '#666666',
  fontSize: '12px',
  lineHeight: '16px',
  margin: '0',
};

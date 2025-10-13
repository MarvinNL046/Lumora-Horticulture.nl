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

interface WelcomeEmailProps {
  customerName: string;
  locale: 'nl' | 'en' | 'de';
}

export const WelcomeEmail = ({ customerName, locale = 'nl' }: WelcomeEmailProps) => {
  const translations = {
    nl: {
      preview: 'Welkom bij Lumora Horticulture!',
      title: `Welkom ${customerName}!`,
      intro: 'Bedankt dat je een account hebt aangemaakt bij Lumora Horticulture.',
      benefits: [
        'Snel en gemakkelijk bestellen',
        'Opgeslagen adressen voor snellere checkout',
        'Bestelgeschiedenis en tracking',
        'Exclusieve aanbiedingen en vroege toegang tot nieuwe producten',
      ],
      benefitsTitle: 'Als klant kun je nu genieten van:',
      shopNow: 'Bekijk onze producten',
      needHelp: 'Vragen? Neem gerust contact met ons op via',
      footer: '© 2025 Lumora Horticulture. Alle rechten voorbehouden.',
    },
    en: {
      preview: 'Welcome to Lumora Horticulture!',
      title: `Welcome ${customerName}!`,
      intro: 'Thank you for creating an account with Lumora Horticulture.',
      benefits: [
        'Quick and easy ordering',
        'Saved addresses for faster checkout',
        'Order history and tracking',
        'Exclusive offers and early access to new products',
      ],
      benefitsTitle: 'As a customer, you can now enjoy:',
      shopNow: 'Browse our products',
      needHelp: 'Questions? Feel free to contact us at',
      footer: '© 2025 Lumora Horticulture. All rights reserved.',
    },
    de: {
      preview: 'Willkommen bei Lumora Horticulture!',
      title: `Willkommen ${customerName}!`,
      intro: 'Vielen Dank, dass Sie ein Konto bei Lumora Horticulture erstellt haben.',
      benefits: [
        'Schnell und einfach bestellen',
        'Gespeicherte Adressen für schnellere Kasse',
        'Bestellhistorie und Tracking',
        'Exklusive Angebote und früher Zugang zu neuen Produkten',
      ],
      benefitsTitle: 'Als Kunde können Sie jetzt Folgendes genießen:',
      shopNow: 'Unsere Produkte ansehen',
      needHelp: 'Fragen? Kontaktieren Sie uns gerne unter',
      footer: '© 2025 Lumora Horticulture. Alle Rechte vorbehalten.',
    },
  };

  const t = translations[locale];
  const siteUrl = locale === 'nl'
    ? 'https://lumorahorticulture.nl'
    : locale === 'de'
    ? 'https://lumorahorticulture.de'
    : 'https://lumorahorticulture.com';

  const shopUrl = locale === 'nl'
    ? `${siteUrl}/winkel`
    : locale === 'de'
    ? `${siteUrl}/shop`
    : `${siteUrl}/shop`;

  return (
    <Html>
      <Head />
      <Preview>{t.preview}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Heading style={h1}>{t.title}</Heading>
          </Section>

          <Section style={content}>
            <Text style={paragraph}>{t.intro}</Text>

            <Text style={paragraph}>
              <strong>{t.benefitsTitle}</strong>
            </Text>

            <ul style={list}>
              {t.benefits.map((benefit, index) => (
                <li key={index} style={listItem}>
                  {benefit}
                </li>
              ))}
            </ul>

            <Section style={buttonContainer}>
              <Link href={shopUrl} style={button}>
                {t.shopNow}
              </Link>
            </Section>

            <Text style={paragraph}>
              {t.needHelp} <Link href="mailto:info@lumorahorticulture.nl">info@lumorahorticulture.nl</Link>
            </Text>
          </Section>

          <Section style={footer}>
            <Text style={footerText}>{t.footer}</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default WelcomeEmail;

// Styles
const main = {
  backgroundColor: '#FAF3C3',
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
  padding: '32px 20px',
  textAlign: 'center' as const,
};

const h1 = {
  color: '#FAF3C3',
  fontSize: '32px',
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

const list = {
  color: '#404F4A',
  fontSize: '16px',
  lineHeight: '26px',
  paddingLeft: '20px',
};

const listItem = {
  margin: '8px 0',
};

const buttonContainer = {
  textAlign: 'center' as const,
  margin: '32px 0',
};

const button = {
  backgroundColor: '#2D7D46',
  borderRadius: '8px',
  color: '#ffffff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'inline-block',
  padding: '12px 32px',
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

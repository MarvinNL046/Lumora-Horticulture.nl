import {
  Body,
  Container,
  Column,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface OrderConfirmationEmailProps {
  orderNumber: string;
  customerName: string;
  orderDate: string;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
    total: number;
  }>;
  subtotal: number;
  discount: number;
  totalAmount: number;
  shippingAddress: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
}

export const OrderConfirmationEmail = ({
  orderNumber = 'ORD-12345',
  customerName = 'Jan Jansen',
  orderDate = '7 oktober 2025',
  items = [
    {
      name: 'Paperbus Pluggen TRAY 84',
      quantity: 10,
      price: 79.8,
      total: 798.0,
    },
  ],
  subtotal = 840.0,
  discount = 42.0,
  totalAmount = 798.0,
  shippingAddress = {
    street: 'Voorbeeldstraat 123',
    city: 'Amsterdam',
    postalCode: '1234 AB',
    country: 'Nederland',
  },
}: OrderConfirmationEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Bedankt voor je bestelling bij Lumora Horticulture! 🌱</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header with Logo */}
          <Section style={header}>
            <Heading style={headerTitle}>Lumora Horticulture</Heading>
            <Text style={headerSubtitle}>Professionele Kweekoplossingen</Text>
          </Section>

          {/* Success Message */}
          <Section style={successBox}>
            <Text style={successIcon}>✅</Text>
            <Heading style={successTitle}>Bestelling Bevestigd!</Heading>
            <Text style={successText}>
              Bedankt voor je bestelling, {customerName}! We hebben je order succesvol ontvangen.
            </Text>
          </Section>

          {/* Order Details */}
          <Section style={orderInfo}>
            <Row>
              <Column style={orderInfoColumn}>
                <Text style={orderInfoLabel}>Bestelnummer</Text>
                <Text style={orderInfoValue}>{orderNumber}</Text>
              </Column>
              <Column style={orderInfoColumn}>
                <Text style={orderInfoLabel}>Besteldatum</Text>
                <Text style={orderInfoValue}>{orderDate}</Text>
              </Column>
            </Row>
          </Section>

          {/* Shipping Badge */}
          <Section style={shippingBadge}>
            <Text style={shippingIcon}>📦</Text>
            <Text style={shippingText}>
              <strong>Altijd Gratis Verzending!</strong>
              <br />
              <span style={shippingSubtext}>Voor Nederland, België en Duitsland</span>
            </Text>
          </Section>

          {/* Order Items */}
          <Section style={itemsSection}>
            <Heading style={sectionTitle}>Bestelde Producten</Heading>
            {items.map((item, index) => (
              <div key={index}>
                <Row style={itemRow}>
                  <Column style={itemDetails}>
                    <Text style={itemName}>{item.name}</Text>
                    <Text style={itemQuantity}>Aantal: {item.quantity}</Text>
                  </Column>
                  <Column style={itemPrice}>
                    <Text style={itemPriceText}>€{item.price.toFixed(2)}</Text>
                    <Text style={itemTotalText}>€{item.total.toFixed(2)}</Text>
                  </Column>
                </Row>
                {index < items.length - 1 && <Hr style={itemDivider} />}
              </div>
            ))}
          </Section>

          {/* Price Summary */}
          <Section style={summarySection}>
            <Row style={summaryRow}>
              <Column>
                <Text style={summaryLabel}>Subtotaal</Text>
              </Column>
              <Column style={summaryValueColumn}>
                <Text style={summaryValue}>€{subtotal.toFixed(2)}</Text>
              </Column>
            </Row>
            {discount > 0 && (
              <Row style={summaryRow}>
                <Column>
                  <Text style={discountLabel}>💰 Staffelkorting</Text>
                </Column>
                <Column style={summaryValueColumn}>
                  <Text style={discountValue}>-€{discount.toFixed(2)}</Text>
                </Column>
              </Row>
            )}
            <Row style={summaryRow}>
              <Column>
                <Text style={summaryLabel}>Verzendkosten</Text>
              </Column>
              <Column style={summaryValueColumn}>
                <Text style={freeShipping}>GRATIS</Text>
              </Column>
            </Row>
            <Hr style={totalDivider} />
            <Row style={totalRow}>
              <Column>
                <Text style={totalLabel}>Totaal</Text>
              </Column>
              <Column style={summaryValueColumn}>
                <Text style={totalValue}>€{totalAmount.toFixed(2)}</Text>
              </Column>
            </Row>
          </Section>

          {/* Shipping Address */}
          <Section style={addressSection}>
            <Heading style={sectionTitle}>Verzendadres</Heading>
            <Text style={addressText}>
              {shippingAddress.street}
              <br />
              {shippingAddress.postalCode} {shippingAddress.city}
              <br />
              {shippingAddress.country}
            </Text>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Text style={footerText}>
              Vragen over je bestelling?
              <br />
              Neem contact met ons op via{' '}
              <Link href="mailto:info@lumorahorticulture.com" style={footerLink}>
                info@lumorahorticulture.com
              </Link>
            </Text>
            <Hr style={footerDivider} />
            <Text style={footerSmall}>
              Lumora Horticulture
              <br />
              Aan de Bogen 11, 6118AS Nieuwstadt, Nederland
              <br />
              KvK: 96669772 | BTW: NL005224624B80
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default OrderConfirmationEmail;

// Styles
const main = {
  backgroundColor: '#FAF8F3',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
  maxWidth: '600px',
};

const header = {
  backgroundColor: '#2F7157',
  borderRadius: '12px 12px 0 0',
  padding: '32px 24px',
  textAlign: 'center' as const,
};

const headerTitle = {
  color: '#D4AF37',
  fontSize: '32px',
  fontWeight: 'bold',
  margin: '0 0 8px',
  letterSpacing: '-0.5px',
};

const headerSubtitle = {
  color: '#FAF8F3',
  fontSize: '14px',
  margin: '0',
  opacity: 0.9,
};

const successBox = {
  backgroundColor: '#ffffff',
  padding: '32px 24px',
  textAlign: 'center' as const,
};

const successIcon = {
  fontSize: '48px',
  margin: '0 0 16px',
};

const successTitle = {
  color: '#1A3A2E',
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '0 0 12px',
};

const successText = {
  color: '#1A3A2E',
  fontSize: '16px',
  lineHeight: '24px',
  margin: '0',
  opacity: 0.8,
};

const orderInfo = {
  backgroundColor: '#ffffff',
  padding: '0 24px 24px',
};

const orderInfoColumn = {
  width: '50%',
};

const orderInfoLabel = {
  color: '#1A3A2E',
  fontSize: '12px',
  fontWeight: '600',
  margin: '0 0 4px',
  opacity: 0.6,
  textTransform: 'uppercase' as const,
};

const orderInfoValue = {
  color: '#1A3A2E',
  fontSize: '16px',
  fontWeight: 'bold',
  margin: '0',
};

const shippingBadge = {
  backgroundColor: '#2F7157',
  borderRadius: '12px',
  padding: '16px 24px',
  margin: '0 24px 24px',
  display: 'flex',
  alignItems: 'center',
};

const shippingIcon = {
  fontSize: '32px',
  margin: '0 16px 0 0',
  display: 'inline-block',
};

const shippingText = {
  color: '#FAF8F3',
  fontSize: '16px',
  fontWeight: 'bold',
  margin: '0',
  display: 'inline-block',
};

const shippingSubtext = {
  fontSize: '12px',
  fontWeight: 'normal',
  opacity: 0.9,
};

const itemsSection = {
  backgroundColor: '#ffffff',
  padding: '24px',
  margin: '0 0 16px',
};

const sectionTitle = {
  color: '#1A3A2E',
  fontSize: '18px',
  fontWeight: 'bold',
  margin: '0 0 16px',
};

const itemRow = {
  padding: '12px 0',
};

const itemDetails = {
  width: '70%',
};

const itemName = {
  color: '#1A3A2E',
  fontSize: '14px',
  fontWeight: '600',
  margin: '0 0 4px',
};

const itemQuantity = {
  color: '#1A3A2E',
  fontSize: '12px',
  margin: '0',
  opacity: 0.6,
};

const itemPrice = {
  width: '30%',
  textAlign: 'right' as const,
};

const itemPriceText = {
  color: '#1A3A2E',
  fontSize: '12px',
  margin: '0 0 4px',
  opacity: 0.6,
};

const itemTotalText = {
  color: '#1A3A2E',
  fontSize: '14px',
  fontWeight: '600',
  margin: '0',
};

const itemDivider = {
  borderColor: '#1A3A2E',
  opacity: 0.1,
  margin: '8px 0',
};

const summarySection = {
  backgroundColor: '#ffffff',
  padding: '24px',
  margin: '0 0 16px',
};

const summaryRow = {
  marginBottom: '12px',
};

const summaryLabel = {
  color: '#1A3A2E',
  fontSize: '14px',
  margin: '0',
  opacity: 0.8,
};

const summaryValueColumn = {
  textAlign: 'right' as const,
};

const summaryValue = {
  color: '#1A3A2E',
  fontSize: '14px',
  fontWeight: '600',
  margin: '0',
};

const discountLabel = {
  color: '#2F7157',
  fontSize: '14px',
  fontWeight: '600',
  margin: '0',
};

const discountValue = {
  color: '#2F7157',
  fontSize: '14px',
  fontWeight: 'bold',
  margin: '0',
};

const freeShipping = {
  color: '#2F7157',
  fontSize: '14px',
  fontWeight: 'bold',
  margin: '0',
};

const totalDivider = {
  borderColor: '#1A3A2E',
  borderWidth: '2px',
  opacity: 0.2,
  margin: '16px 0',
};

const totalRow = {
  marginTop: '16px',
};

const totalLabel = {
  color: '#1A3A2E',
  fontSize: '18px',
  fontWeight: 'bold',
  margin: '0',
};

const totalValue = {
  color: '#2F7157',
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '0',
};

const addressSection = {
  backgroundColor: '#ffffff',
  padding: '24px',
  margin: '0 0 16px',
};

const addressText = {
  color: '#1A3A2E',
  fontSize: '14px',
  lineHeight: '22px',
  margin: '0',
};

const footer = {
  backgroundColor: '#ffffff',
  borderRadius: '0 0 12px 12px',
  padding: '24px',
  textAlign: 'center' as const,
};

const footerText = {
  color: '#1A3A2E',
  fontSize: '14px',
  lineHeight: '22px',
  margin: '0 0 16px',
};

const footerLink = {
  color: '#2F7157',
  fontWeight: '600',
  textDecoration: 'underline',
};

const footerDivider = {
  borderColor: '#1A3A2E',
  opacity: 0.1,
  margin: '16px 0',
};

const footerSmall = {
  color: '#1A3A2E',
  fontSize: '12px',
  lineHeight: '18px',
  margin: '0',
  opacity: 0.6,
};

import {
  Body,
  Container,
  Column,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Row,
  Section,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface AdminNotificationEmailProps {
  orderNumber: string;
  orderDate: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
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
  billingAddress?: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
  paymentId?: string;
  deliveryPreference?: {
    kind: 'home' | 'pickup';
    carrier: string;
    date?: string | null;
    timeStart?: string | null;
    timeEnd?: string | null;
    label?: string;
    pickup?: {
      locationName: string;
      street: string;
      number: string;
      postalCode: string;
      city: string;
    } | null;
  } | null;
}

export const AdminNotificationEmail = ({
  orderNumber = 'ORD-12345',
  orderDate = '7 oktober 2025',
  customerName = 'Jan Jansen',
  customerEmail = 'jan@example.com',
  customerPhone = '+31 6 12345678',
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
  billingAddress,
  paymentId = 'tr_12345abcde',
  deliveryPreference,
}: AdminNotificationEmailProps) => {
  return (
    <Html>
      <Head>
        <style>{`
          @media only screen and (max-width: 600px) {
            .mobile-padding {
              padding: 16px !important;
            }
            .mobile-text-small {
              font-size: 14px !important;
            }
            .mobile-heading {
              font-size: 20px !important;
            }
            .mobile-header-title {
              font-size: 24px !important;
            }
            .mobile-stack {
              display: block !important;
              width: 100% !important;
              margin-bottom: 12px !important;
            }
            .mobile-full-width {
              width: 100% !important;
            }
          }
        `}</style>
      </Head>
      <Preview>Nieuwe bestelling ontvangen - {orderNumber} - €{totalAmount.toFixed(2)}</Preview>
      <Body style={main}>
        <Container style={container}>
          {/* Header */}
          <Section style={header} className="mobile-padding">
            <Text style={alertIcon}>🔔</Text>
            <Heading style={headerTitle} className="mobile-header-title">Nieuwe Bestelling Ontvangen!</Heading>
            <Text style={headerSubtitle}>Lumora Horticulture Webshop</Text>
          </Section>

          {/* Order Summary Badge */}
          <Section style={summaryBadge} className="mobile-padding">
            <Row>
              <Column style={summaryColumn} className="mobile-stack">
                <Text style={summaryLabel}>Bestelnummer</Text>
                <Text style={summaryValue}>{orderNumber}</Text>
              </Column>
              <Column style={summaryColumn} className="mobile-stack">
                <Text style={summaryLabel}>Datum</Text>
                <Text style={summaryValue}>{orderDate}</Text>
              </Column>
              <Column style={summaryColumn} className="mobile-stack">
                <Text style={summaryLabel}>Totaal</Text>
                <Text style={summaryValueGreen}>€{totalAmount.toFixed(2)}</Text>
              </Column>
            </Row>
          </Section>

          {/* Customer Information */}
          <Section style={section} className="mobile-padding">
            <Heading style={sectionTitle} className="mobile-heading">📋 Klantgegevens</Heading>
            <div style={infoBox}>
              <Row style={infoRow}>
                <Column style={infoLabel}>
                  <Text style={infoLabelText}>Naam:</Text>
                </Column>
                <Column>
                  <Text style={infoValue}>{customerName}</Text>
                </Column>
              </Row>
              <Row style={infoRow}>
                <Column style={infoLabel}>
                  <Text style={infoLabelText}>Email:</Text>
                </Column>
                <Column>
                  <Link href={`mailto:${customerEmail}`} style={infoLink}>
                    {customerEmail}
                  </Link>
                </Column>
              </Row>
              <Row style={infoRow}>
                <Column style={infoLabel}>
                  <Text style={infoLabelText}>Telefoon:</Text>
                </Column>
                <Column>
                  <Link href={`tel:${customerPhone}`} style={infoLink}>
                    {customerPhone}
                  </Link>
                </Column>
              </Row>
            </div>
          </Section>

          {/* Order Items */}
          <Section style={section} className="mobile-padding">
            <Heading style={sectionTitle} className="mobile-heading">📦 Bestelde Producten</Heading>
            <div style={itemsBox}>
              {items.map((item, index) => (
                <div key={index}>
                  <Row style={itemRow}>
                    <Column style={itemDetailsColumn}>
                      <Text style={itemName}>{item.name}</Text>
                      <Text style={itemMeta}>
                        Aantal: {item.quantity} × €{item.price.toFixed(2)}
                      </Text>
                    </Column>
                    <Column style={itemTotalColumn}>
                      <Text style={itemTotal}>€{item.total.toFixed(2)}</Text>
                    </Column>
                  </Row>
                  {index < items.length - 1 && <Hr style={itemDivider} />}
                </div>
              ))}

              {/* Price Summary */}
              <Hr style={summaryDivider} />
              <Row style={priceRow}>
                <Column>
                  <Text style={priceLabel}>Subtotaal</Text>
                </Column>
                <Column style={priceValueColumn}>
                  <Text style={priceValue}>€{subtotal.toFixed(2)}</Text>
                </Column>
              </Row>
              {discount > 0 && (
                <Row style={priceRow}>
                  <Column>
                    <Text style={discountLabel}>💰 Staffelkorting</Text>
                  </Column>
                  <Column style={priceValueColumn}>
                    <Text style={discountValue}>-€{discount.toFixed(2)}</Text>
                  </Column>
                </Row>
              )}
              <Row style={priceRow}>
                <Column>
                  <Text style={priceLabel}>Verzendkosten</Text>
                </Column>
                <Column style={priceValueColumn}>
                  <Text style={freeText}>GRATIS</Text>
                </Column>
              </Row>
              <Hr style={totalDivider} />
              <Row style={totalRow}>
                <Column>
                  <Text style={totalLabel}>Totaalbedrag</Text>
                </Column>
                <Column style={priceValueColumn}>
                  <Text style={totalValue}>€{totalAmount.toFixed(2)}</Text>
                </Column>
              </Row>
            </div>
          </Section>

          {/* Shipping Address */}
          <Section style={section} className="mobile-padding">
            <Heading style={sectionTitle} className="mobile-heading">🚚 Verzendadres</Heading>
            <div style={addressBox}>
              <Text style={addressText}>
                {shippingAddress.street}
                <br />
                {shippingAddress.postalCode} {shippingAddress.city}
                <br />
                {shippingAddress.country}
              </Text>
            </div>
          </Section>

          {/* Bezorgvoorkeur van klant (MyParcel) */}
          {deliveryPreference && (
            <Section style={section} className="mobile-padding">
              <Heading style={sectionTitle} className="mobile-heading">
                📦 Door klant gekozen bezorgoptie
              </Heading>
              <div style={addressBox}>
                <Text style={addressText}>
                  <strong>
                    {deliveryPreference.kind === 'pickup' ? 'Afhaalpunt' : 'Thuisbezorging'}
                  </strong>{' '}
                  ({deliveryPreference.carrier?.toUpperCase()})
                  <br />
                  {deliveryPreference.label || ''}
                  {deliveryPreference.date && (
                    <>
                      <br />Datum: {deliveryPreference.date}
                    </>
                  )}
                  {deliveryPreference.timeStart && deliveryPreference.timeEnd && (
                    <>
                      <br />Tijdsvak: {deliveryPreference.timeStart.slice(0, 5)}–{deliveryPreference.timeEnd.slice(0, 5)}
                    </>
                  )}
                  {deliveryPreference.kind === 'pickup' && deliveryPreference.pickup && (
                    <>
                      <br />
                      <strong>{deliveryPreference.pickup.locationName}</strong>
                      <br />
                      {deliveryPreference.pickup.street} {deliveryPreference.pickup.number},{' '}
                      {deliveryPreference.pickup.postalCode} {deliveryPreference.pickup.city}
                    </>
                  )}
                </Text>
              </div>
            </Section>
          )}

          {/* Billing Address (if different) */}
          {billingAddress &&
            billingAddress.street !== shippingAddress.street && (
              <Section style={section} className="mobile-padding">
                <Heading style={sectionTitle} className="mobile-heading">💳 Factuuradres</Heading>
                <div style={addressBox}>
                  <Text style={addressText}>
                    {billingAddress.street}
                    <br />
                    {billingAddress.postalCode} {billingAddress.city}
                    <br />
                    {billingAddress.country}
                  </Text>
                </div>
              </Section>
            )}

          {/* Payment Information */}
          {paymentId && (
            <Section style={section} className="mobile-padding">
              <Heading style={sectionTitle} className="mobile-heading">💳 Betalingsinformatie</Heading>
              <div style={paymentBox}>
                <Text style={paymentText}>
                  Payment ID: <strong>{paymentId}</strong>
                </Text>
                <Link
                  href={`https://www.mollie.com/dashboard/payments/${paymentId}`}
                  style={mollieButton}
                >
                  Bekijk in Mollie Dashboard →
                </Link>
              </div>
            </Section>
          )}

          {/* Action Required */}
          <Section style={actionSection}>
            <Text style={actionTitle}>⚡ Actie Vereist</Text>
            <Text style={actionText}>
              • Controleer voorraad voor de bestelde producten
              <br />
              • Bereid de verzending voor naar het opgegeven adres
              <br />
              • Bevestig de betaling in het Mollie dashboard
              <br />• Informeer de klant over de verwachte levertijd
            </Text>
          </Section>

          {/* Footer */}
          <Section style={footer}>
            <Hr style={footerDivider} />
            <Text style={footerText}>
              Deze email is automatisch gegenereerd door de Lumora Horticulture webshop.
              <br />
              <Link href="https://lumorahorticulture.nl/admin" style={footerLink}>
                Bekijk alle bestellingen
              </Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default AdminNotificationEmail;

// Styles
const main = {
  backgroundColor: '#F5F5F5',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: '0 auto',
  padding: '20px 0 48px',
  maxWidth: '640px',
  width: '100%',
};

const header = {
  backgroundColor: '#1A3A2E',
  borderRadius: '12px 12px 0 0',
  padding: '32px 24px',
  textAlign: 'center' as const,
};

const alertIcon = {
  fontSize: '48px',
  margin: '0 0 12px',
};

const headerTitle = {
  color: '#D4AF37',
  fontSize: '28px',
  fontWeight: 'bold',
  margin: '0 0 8px',
  letterSpacing: '-0.5px',
};

const headerSubtitle = {
  color: '#FAF8F3',
  fontSize: '14px',
  margin: '0',
  opacity: 0.8,
};

const summaryBadge = {
  backgroundColor: '#2F7157',
  padding: '20px 24px',
};

const summaryColumn = {
  width: '33.33%',
  textAlign: 'center' as const,
};

const summaryLabel = {
  color: '#FAF8F3',
  fontSize: '11px',
  fontWeight: '600',
  margin: '0 0 6px',
  opacity: 0.8,
  textTransform: 'uppercase' as const,
  letterSpacing: '0.5px',
};

const summaryValue = {
  color: '#FAF8F3',
  fontSize: '16px',
  fontWeight: 'bold',
  margin: '0',
};

const summaryValueGreen = {
  color: '#D4AF37',
  fontSize: '20px',
  fontWeight: 'bold',
  margin: '0',
};

const section = {
  backgroundColor: '#ffffff',
  padding: '24px',
  margin: '0',
  borderBottom: '1px solid #E5E5E5',
};

const sectionTitle = {
  color: '#1A3A2E',
  fontSize: '16px',
  fontWeight: 'bold',
  margin: '0 0 16px',
};

const infoBox = {
  backgroundColor: '#FAF8F3',
  borderRadius: '8px',
  padding: '16px',
};

const infoRow = {
  marginBottom: '8px',
};

const infoLabel = {
  width: '120px',
};

const infoLabelText = {
  color: '#1A3A2E',
  fontSize: '14px',
  fontWeight: '600',
  margin: '0',
  opacity: 0.7,
};

const infoValue = {
  color: '#1A3A2E',
  fontSize: '14px',
  margin: '0',
};

const infoLink = {
  color: '#2F7157',
  fontSize: '14px',
  fontWeight: '600',
  textDecoration: 'underline',
};

const itemsBox = {
  backgroundColor: '#FAF8F3',
  borderRadius: '8px',
  padding: '16px',
};

const itemRow = {
  padding: '12px 0',
};

const itemDetailsColumn = {
  width: '70%',
};

const itemName = {
  color: '#1A3A2E',
  fontSize: '14px',
  fontWeight: '600',
  margin: '0 0 4px',
};

const itemMeta = {
  color: '#1A3A2E',
  fontSize: '12px',
  margin: '0',
  opacity: 0.6,
};

const itemTotalColumn = {
  width: '30%',
  textAlign: 'right' as const,
};

const itemTotal = {
  color: '#1A3A2E',
  fontSize: '16px',
  fontWeight: 'bold',
  margin: '0',
};

const itemDivider = {
  borderColor: '#1A3A2E',
  opacity: 0.1,
  margin: '8px 0',
};

const summaryDivider = {
  borderColor: '#1A3A2E',
  opacity: 0.15,
  margin: '16px 0',
};

const priceRow = {
  marginBottom: '8px',
};

const priceLabel = {
  color: '#1A3A2E',
  fontSize: '14px',
  margin: '0',
  opacity: 0.7,
};

const priceValueColumn = {
  textAlign: 'right' as const,
};

const priceValue = {
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

const freeText = {
  color: '#2F7157',
  fontSize: '14px',
  fontWeight: 'bold',
  margin: '0',
};

const totalDivider = {
  borderColor: '#1A3A2E',
  borderWidth: '2px',
  opacity: 0.2,
  margin: '12px 0',
};

const totalRow = {
  marginTop: '12px',
};

const totalLabel = {
  color: '#1A3A2E',
  fontSize: '16px',
  fontWeight: 'bold',
  margin: '0',
};

const totalValue = {
  color: '#2F7157',
  fontSize: '20px',
  fontWeight: 'bold',
  margin: '0',
};

const addressBox = {
  backgroundColor: '#FAF8F3',
  borderRadius: '8px',
  padding: '16px',
};

const addressText = {
  color: '#1A3A2E',
  fontSize: '14px',
  lineHeight: '22px',
  margin: '0',
};

const paymentBox = {
  backgroundColor: '#FAF8F3',
  borderRadius: '8px',
  padding: '16px',
  textAlign: 'center' as const,
};

const paymentText = {
  color: '#1A3A2E',
  fontSize: '13px',
  margin: '0 0 12px',
};

const mollieButton = {
  backgroundColor: '#2F7157',
  borderRadius: '8px',
  color: '#FAF8F3',
  display: 'inline-block',
  fontSize: '14px',
  fontWeight: '600',
  padding: '12px 24px',
  textDecoration: 'none',
};

const actionSection = {
  backgroundColor: '#FFF9E6',
  border: '2px solid #D4AF37',
  borderRadius: '8px',
  padding: '20px 24px',
  margin: '0 24px',
};

const actionTitle = {
  color: '#1A3A2E',
  fontSize: '16px',
  fontWeight: 'bold',
  margin: '0 0 12px',
};

const actionText = {
  color: '#1A3A2E',
  fontSize: '14px',
  lineHeight: '24px',
  margin: '0',
};

const footer = {
  backgroundColor: '#ffffff',
  borderRadius: '0 0 12px 12px',
  padding: '24px',
  textAlign: 'center' as const,
};

const footerDivider = {
  borderColor: '#1A3A2E',
  opacity: 0.1,
  margin: '0 0 16px',
};

const footerText = {
  color: '#1A3A2E',
  fontSize: '12px',
  lineHeight: '20px',
  margin: '0',
  opacity: 0.6,
};

const footerLink = {
  color: '#2F7157',
  fontWeight: '600',
  textDecoration: 'underline',
};

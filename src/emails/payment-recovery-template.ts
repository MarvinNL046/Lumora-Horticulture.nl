import { formatPrice } from '@/lib/volume-discount';

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
  image_url?: string;
}

interface PaymentRecoveryEmailProps {
  customerName: string;
  orderId: string;
  orderItems: OrderItem[];
  totalAmount: number;
  locale: string;
  paymentUrl: string;
  retryPageUrl: string; // Link to self-service retry page
  expiresAt?: Date; // When the new payment link expires
  isSecondReminder?: boolean; // Is this the 2nd follow-up email?
}

type EmailLocale = 'nl' | 'en' | 'de';

const MAX_ORDER_ITEMS = 20;
const MAX_URL_LENGTH = 2_048;
const MAX_ITEM_NAME_LENGTH = 200;
const MAX_QUANTITY = 100;
const MAX_AMOUNT = 250_000;
const TRUSTED_LUMORA_HOSTS = new Set([
  'lumorahorticulture.nl',
  'lumorahorticulture.com',
  'lumorahorticulture.de',
]);
const TRUSTED_PAYMENT_HOSTS = new Set([
  'lumorahorticulture.nl',
  'lumorahorticulture.com',
  'lumorahorticulture.de',
  'www.mollie.com',
  'checkout.mollie.com',
]);

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;',
    };
    return entities[character];
  });
}

function normaliseLocale(value: unknown): EmailLocale {
  return value === 'en' || value === 'de' ? value : 'nl';
}

function safeHttpsUrl(
  value: unknown,
  allowedHosts: ReadonlySet<string>,
  allowRelative = false,
): string {
  if (typeof value !== 'string' || value.length === 0 || value.length > MAX_URL_LENGTH) return '';

  try {
    const isRelative = value.startsWith('/') && !value.startsWith('//');
    if (isRelative && !allowRelative) return '';
    const url = isRelative
      ? new URL(value, 'https://lumorahorticulture.nl')
      : new URL(value);
    if (
      url.protocol !== 'https:' ||
      url.username !== '' ||
      url.password !== '' ||
      url.port !== '' ||
      !allowedHosts.has(url.hostname)
    ) {
      return '';
    }
    return escapeHtml(url.toString());
  } catch {
    return '';
  }
}

function isBoundedAmount(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value) && value >= 0 && value <= MAX_AMOUNT;
}

function normaliseItems(value: unknown): OrderItem[] {
  if (!Array.isArray(value)) return [];

  return value.slice(0, MAX_ORDER_ITEMS).flatMap((candidate) => {
    if (!candidate || typeof candidate !== 'object' || Array.isArray(candidate)) return [];
    const item = candidate as Partial<OrderItem>;
    if (
      typeof item.name !== 'string' ||
      item.name.length === 0 ||
      item.name.length > MAX_ITEM_NAME_LENGTH ||
      !Number.isInteger(item.quantity) ||
      typeof item.quantity !== 'number' ||
      item.quantity < 1 ||
      item.quantity > MAX_QUANTITY ||
      !isBoundedAmount(item.price) ||
      item.price * item.quantity > MAX_AMOUNT
    ) {
      return [];
    }

    return [{
      name: item.name,
      quantity: item.quantity,
      price: item.price,
      image_url: typeof item.image_url === 'string' ? item.image_url : undefined,
    }];
  });
}

export function getPaymentRecoveryEmailContent(props: PaymentRecoveryEmailProps) {
  const { customerName, orderId, orderItems, totalAmount, locale, paymentUrl, retryPageUrl, expiresAt, isSecondReminder = false } = props;
  const emailLocale = normaliseLocale(locale);
  const safeCustomerName =
    typeof customerName === 'string' && customerName.length <= 100
      ? escapeHtml(customerName.trim())
      : '';
  const safeOrderId =
    typeof orderId === 'string' && orderId.length <= 128
      ? escapeHtml(orderId.slice(0, 8).toUpperCase())
      : '';
  const safeItems = normaliseItems(orderItems);
  const computedTotal = safeItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const safeTotalAmount = isBoundedAmount(totalAmount)
    ? totalAmount
    : Math.min(computedTotal, MAX_AMOUNT);
  const safePaymentUrl = safeHttpsUrl(paymentUrl, TRUSTED_PAYMENT_HOSTS);
  const safeRetryPageUrl = safeHttpsUrl(retryPageUrl, TRUSTED_LUMORA_HOSTS);

  const expiryDate = expiresAt ? new Date(expiresAt) : null;
  const expiryText = expiryDate && Number.isFinite(expiryDate.getTime())
    ? expiryDate.toLocaleDateString(emailLocale === 'de' ? 'de-DE' : emailLocale === 'en' ? 'en-GB' : 'nl-NL', {
        day: 'numeric',
        month: 'long',
        hour: '2-digit',
        minute: '2-digit',
      })
    : null;

  const t = {
    subject: isSecondReminder
      ? (emailLocale === 'de'
          ? 'Letzte Erinnerung: Ihre Bestellung wartet noch ⏰'
          : emailLocale === 'en'
          ? 'Final reminder: Your order is still waiting ⏰'
          : 'Laatste herinnering: Je bestelling wacht nog ⏰')
      : (emailLocale === 'de'
          ? 'Ihre Bestellung wartet noch auf Zahlung 💳'
          : emailLocale === 'en'
          ? 'Your order is still waiting for payment 💳'
          : 'Je bestelling wacht nog op betaling 💳'),
    greeting:
      emailLocale === 'de'
        ? `Hallo${safeCustomerName ? ` ${safeCustomerName}` : ''},`
        : emailLocale === 'en'
        ? `Hi${safeCustomerName ? ` ${safeCustomerName}` : ''},`
        : `Hoi${safeCustomerName ? ` ${safeCustomerName}` : ''},`,
    intro: isSecondReminder
      ? (emailLocale === 'de'
          ? 'Dies ist unsere letzte Erinnerung: Ihre Bestellung wartet noch auf Zahlung. Wir möchten Ihnen nicht entgehen lassen!'
          : emailLocale === 'en'
          ? "This is our final reminder: your order is still waiting for payment. We don't want you to miss out!"
          : 'Dit is onze laatste herinnering: je bestelling wacht nog steeds op betaling. We willen niet dat je dit mist!')
      : (emailLocale === 'de'
          ? 'Wir haben bemerkt, dass die Zahlung für Ihre Bestellung nicht abgeschlossen wurde. Kein Problem – Sie können die Zahlung jetzt ganz einfach nachholen!'
          : emailLocale === 'en'
          ? "We noticed that the payment for your order wasn't completed. No problem – you can easily complete the payment now!"
          : 'We zagen dat de betaling voor je bestelling niet is afgerond. Geen probleem – je kunt de betaling nu eenvoudig alsnog voltooien!'),
    yourOrder: emailLocale === 'de' ? 'Ihre Bestellung:' : emailLocale === 'en' ? 'Your Order:' : 'Jouw Bestelling:',
    orderId: emailLocale === 'de' ? 'Bestellnummer' : emailLocale === 'en' ? 'Order ID' : 'Bestelnummer',
    quantity: emailLocale === 'de' ? 'Anzahl' : emailLocale === 'en' ? 'Qty' : 'Aantal',
    total: emailLocale === 'de' ? 'Gesamt' : emailLocale === 'en' ? 'Total' : 'Totaal',
    freeShipping:
      emailLocale === 'de'
        ? '✅ Kostenloser Versand innerhalb NL, BE & DE'
        : emailLocale === 'en'
        ? '✅ Free shipping within NL, BE & DE'
        : '✅ Gratis verzending binnen NL, BE & DE',
    securePayment:
      emailLocale === 'de'
        ? '🔒 Sichere Zahlung über Mollie'
        : emailLocale === 'en'
        ? '🔒 Secure payment via Mollie'
        : '🔒 Veilig betalen via Mollie',
    payNowButton:
      emailLocale === 'de'
        ? 'Jetzt bezahlen'
        : emailLocale === 'en'
        ? 'Complete Payment'
        : 'Nu Betalen',
    linkExpiry: expiryText
      ? emailLocale === 'de'
        ? `Dieser Link ist gültig bis ${expiryText}`
        : emailLocale === 'en'
        ? `This link is valid until ${expiryText}`
        : `Deze link is geldig tot ${expiryText}`
      : '',
    questions:
      emailLocale === 'de'
        ? 'Fragen oder Probleme mit der Zahlung?'
        : emailLocale === 'en'
        ? 'Questions or issues with payment?'
        : 'Vragen of problemen met betalen?',
    contactUs:
      emailLocale === 'de'
        ? 'Kontaktieren Sie uns unter'
        : emailLocale === 'en'
        ? 'Contact us at'
        : 'Neem contact op via',
    footer:
      emailLocale === 'de'
        ? 'Mit freundlichen Grüßen,<br/>Das Lumora Horticulture Team'
        : emailLocale === 'en'
        ? 'Best regards,<br/>The Lumora Horticulture Team'
        : 'Met vriendelijke groet,<br/>Het Lumora Horticulture Team',
    cancelNote:
      emailLocale === 'de'
        ? 'Möchten Sie diese Bestellung stornieren? Antworten Sie einfach auf diese E-Mail.'
        : emailLocale === 'en'
        ? "Want to cancel this order? Simply reply to this email."
        : 'Wil je deze bestelling annuleren? Reageer gewoon op deze email.',
    selfServiceNote:
      emailLocale === 'de'
        ? 'Link nicht mehr gültig? Erstellen Sie einen neuen'
        : emailLocale === 'en'
        ? 'Link expired? Generate a new one'
        : 'Link niet meer geldig? Maak een nieuwe aan',
    selfServiceLink:
      emailLocale === 'de'
        ? 'hier'
        : emailLocale === 'en'
        ? 'here'
        : 'hier',
  };

  const html = `
<!DOCTYPE html>
<html lang="${emailLocale}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${t.subject}</title>
</head>
<body style="margin: 0; padding: 0; font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #FAF3C3;">
  <table role="presentation" style="width: 100%; border-collapse: collapse;">
    <tr>
      <td align="center" style="padding: 40px 20px;">
        <table role="presentation" style="max-width: 600px; width: 100%; background-color: #ffffff; border-radius: 16px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          <!-- Header -->
          <tr>
            <td style="padding: 40px 40px 20px; text-align: center; background: linear-gradient(135deg, #2D7D46 0%, #404F4A 100%); border-radius: 16px 16px 0 0;">
              <h1 style="margin: 0; color: #FAF3C3; font-size: 28px; font-weight: bold;">🌱 Lumora Horticulture</h1>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              <p style="margin: 0 0 20px; font-size: 18px; color: #404F4A; font-weight: 600;">${t.greeting}</p>

              <p style="margin: 0 0 30px; font-size: 16px; line-height: 1.6; color: #404F4A;">${t.intro}</p>

              <!-- Order ID Badge -->
              <div style="background-color: #F0F9F3; border-radius: 8px; padding: 12px 16px; margin-bottom: 24px; display: inline-block;">
                <span style="font-size: 14px; color: #404F4A;">${t.orderId}: </span>
                <span style="font-size: 14px; color: #2D7D46; font-weight: 600;">${safeOrderId}</span>
              </div>

              <h2 style="margin: 0 0 20px; font-size: 20px; font-weight: bold; color: #404F4A;">${t.yourOrder}</h2>

              <!-- Order Items -->
              ${safeItems
                .map((item) => {
                  const itemTotal = item.price * item.quantity;
                  const safeItemName = escapeHtml(item.name);
                  const safeImageUrl = safeHttpsUrl(
                    item.image_url,
                    TRUSTED_LUMORA_HOSTS,
                    true,
                  );
                  return `
                <table role="presentation" style="width: 100%; border-collapse: collapse; margin-bottom: 16px; background-color: #FAF3C3; border-radius: 12px; overflow: hidden;">
                  <tr>
                    <td style="padding: 16px;">
                      <table role="presentation" style="width: 100%;">
                        <tr>
                          ${safeImageUrl ? `
                          <td style="width: 70px;">
                            <img src="${safeImageUrl}" alt="${safeItemName}" style="width: 60px; height: 60px; object-fit: cover; border-radius: 8px;" />
                          </td>
                          ` : ''}
                          <td style="${safeImageUrl ? 'padding-left: 12px;' : ''}">
                            <p style="margin: 0 0 4px; font-size: 15px; font-weight: 600; color: #404F4A;">${safeItemName}</p>
                            <p style="margin: 0; font-size: 14px; color: #2D7D46; font-weight: 500;">
                              ${t.quantity}: ${item.quantity} × ${formatPrice(item.price)} = <strong>${formatPrice(itemTotal)}</strong>
                            </p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              `;
                })
                .join('')}

              <!-- Total -->
              <table role="presentation" style="width: 100%; border-collapse: collapse; margin: 24px 0; border-top: 2px solid #404F4A; padding-top: 16px;">
                <tr>
                  <td style="padding: 12px 0; font-size: 20px; font-weight: bold; color: #404F4A;">${t.total}:</td>
                  <td style="padding: 12px 0; text-align: right; font-size: 28px; font-weight: bold; color: #2D7D46;">
                    ${formatPrice(safeTotalAmount)}
                  </td>
                </tr>
              </table>

              <!-- Benefits -->
              <div style="background-color: #F0F9F3; border-radius: 12px; padding: 16px 20px; margin: 24px 0;">
                <p style="margin: 0 0 8px; font-size: 14px; color: #404F4A;">${t.freeShipping}</p>
                <p style="margin: 0; font-size: 14px; color: #404F4A;">${t.securePayment}</p>
              </div>

              <!-- CTA Button -->
              <table role="presentation" style="width: 100%; margin: 32px 0;">
                <tr>
                  <td align="center">
                    <a href="${safePaymentUrl}" style="display: inline-block; padding: 18px 48px; background: linear-gradient(135deg, #2D7D46 0%, #26673B 100%); color: #ffffff; text-decoration: none; border-radius: 12px; font-size: 20px; font-weight: bold; box-shadow: 0 4px 12px rgba(45, 125, 70, 0.3);">
                      💳 ${t.payNowButton}
                    </a>
                  </td>
                </tr>
                ${t.linkExpiry ? `
                <tr>
                  <td align="center" style="padding-top: 12px;">
                    <p style="margin: 0; font-size: 13px; color: #888888;">${t.linkExpiry}</p>
                  </td>
                </tr>
                ` : ''}
                <tr>
                  <td align="center" style="padding-top: 16px;">
                    <p style="margin: 0; font-size: 13px; color: #888888;">
                      ${t.selfServiceNote} <a href="${safeRetryPageUrl}" style="color: #2D7D46; text-decoration: underline;">${t.selfServiceLink}</a>
                    </p>
                  </td>
                </tr>
              </table>

              <!-- Help -->
              <div style="text-align: center; margin-top: 40px; padding-top: 24px; border-top: 1px solid #E0E0E0;">
                <p style="margin: 0 0 8px; font-size: 14px; color: #404F4A;">${t.questions}</p>
                <p style="margin: 0 0 16px; font-size: 14px; color: #2D7D46;">
                  ${t.contactUs} <a href="mailto:info@lumorahorticulture.nl" style="color: #2D7D46; text-decoration: underline;">info@lumorahorticulture.nl</a>
                </p>
                <p style="margin: 0; font-size: 12px; color: #888888; font-style: italic;">${t.cancelNote}</p>
              </div>

              <p style="margin: 30px 0 0; font-size: 14px; line-height: 1.6; color: #404F4A;">${t.footer}</p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 24px; text-align: center; background-color: #F5F5F5; border-radius: 0 0 16px 16px;">
              <p style="margin: 0; font-size: 12px; color: #888888;">
                © ${new Date().getFullYear()} Lumora Horticulture. Alle rechten voorbehouden.
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;

  return {
    subject: t.subject,
    html,
  };
}

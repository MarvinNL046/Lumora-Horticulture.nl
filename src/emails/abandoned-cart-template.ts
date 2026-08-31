import type { CartItem } from '@/contexts/CartContext';
import { formatPrice, calculateDiscountedPrice, calculateTotalPrice } from '@/lib/volume-discount';

interface AbandonedCartEmailProps {
  customerName?: string;
  cartItems: CartItem[];
  totalAmount: number;
  locale: string;
  checkoutUrl: string;
}

type EmailLocale = 'nl' | 'en' | 'de';

const MAX_CART_ITEMS = 20;
const MAX_ITEM_NAME_LENGTH = 200;
const MAX_URL_LENGTH = 2_048;
const MAX_QUANTITY = 100;
const MAX_UNIT_PRICE = 100_000;
const MAX_TOTAL_AMOUNT = 1_000_000;
const TRUSTED_LUMORA_HOSTS = new Set([
  'lumorahorticulture.nl',
  'lumorahorticulture.com',
  'lumorahorticulture.de',
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

function safeLumoraHttpsUrl(value: unknown, allowRelative = false): string {
  if (typeof value !== 'string' || value.length === 0 || value.length > MAX_URL_LENGTH) return '';

  try {
    const isRelativePath = value.startsWith('/') && !value.startsWith('//');
    if (isRelativePath && !allowRelative) return '';

    const url = isRelativePath
      ? new URL(value, 'https://lumorahorticulture.nl')
      : new URL(value);
    if (
      url.protocol !== 'https:' ||
      url.username !== '' ||
      url.password !== '' ||
      url.port !== '' ||
      !TRUSTED_LUMORA_HOSTS.has(url.hostname)
    ) {
      return '';
    }
    return escapeHtml(url.toString());
  } catch {
    return '';
  }
}

function normaliseLocale(value: unknown): EmailLocale {
  return value === 'en' || value === 'de' ? value : 'nl';
}

function isBoundedNumber(value: unknown, maximum: number): value is number {
  return typeof value === 'number' && Number.isFinite(value) && value >= 0 && value <= maximum;
}

function normaliseCartItems(value: unknown): CartItem[] {
  if (!Array.isArray(value)) return [];

  const items: CartItem[] = [];
  for (const candidate of value.slice(0, MAX_CART_ITEMS)) {
    if (!candidate || typeof candidate !== 'object' || Array.isArray(candidate)) continue;

    const item = candidate as Partial<CartItem>;
    if (
      typeof item.name !== 'string' ||
      item.name.length === 0 ||
      item.name.length > MAX_ITEM_NAME_LENGTH ||
      !Number.isInteger(item.quantity) ||
      !isBoundedNumber(item.quantity, MAX_QUANTITY) ||
      item.quantity < 1 ||
      !isBoundedNumber(item.price, MAX_UNIT_PRICE) ||
      calculateTotalPrice(item.price, item.quantity) > MAX_TOTAL_AMOUNT
    ) {
      continue;
    }

    items.push({
      product_id: typeof item.product_id === 'string' ? item.product_id.slice(0, 128) : '',
      slug: typeof item.slug === 'string' ? item.slug.slice(0, 200) : '',
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      image_url: typeof item.image_url === 'string' ? item.image_url : '',
    });
  }

  return items;
}

export function getAbandonedCartEmailContent(props: AbandonedCartEmailProps) {
  const { customerName, cartItems, totalAmount, locale, checkoutUrl } = props;
  const emailLocale = normaliseLocale(locale);
  const safeCustomerName =
    typeof customerName === 'string' && customerName.length <= 100
      ? escapeHtml(customerName)
      : undefined;
  const safeCheckoutUrl = safeLumoraHttpsUrl(checkoutUrl);
  const safeCartItems = normaliseCartItems(cartItems);
  const computedTotal = safeCartItems.reduce(
    (sum, item) => sum + calculateTotalPrice(item.price, item.quantity),
    0,
  );
  const safeTotalAmount = isBoundedNumber(totalAmount, MAX_TOTAL_AMOUNT)
    ? totalAmount
    : Math.min(computedTotal, MAX_TOTAL_AMOUNT);

  const t = {
    subject:
      emailLocale === 'de'
        ? 'Ihre Produkte warten noch auf Sie! 🌱'
        : emailLocale === 'en'
        ? 'Your products are still waiting for you! 🌱'
        : 'Je producten wachten nog op je! 🌱',
    greeting:
      safeCustomerName
        ? emailLocale === 'de'
          ? `Hallo ${safeCustomerName},`
          : emailLocale === 'en'
          ? `Hi ${safeCustomerName},`
          : `Hoi ${safeCustomerName},`
        : emailLocale === 'de'
        ? 'Hallo,'
        : emailLocale === 'en'
        ? 'Hi,'
        : 'Hoi,',
    intro:
      emailLocale === 'de'
        ? 'Sie haben einige großartige Produkte in Ihrem Warenkorb gelassen! Wir möchten Sie daran erinnern, dass diese noch auf Sie warten.'
        : emailLocale === 'en'
        ? 'You left some great products in your cart! We wanted to remind you that they\'re still waiting for you.'
        : 'Je hebt een aantal geweldige producten achtergelaten in je winkelwagen! We wilden je eraan herinneren dat ze nog op je wachten.',
    yourCart: emailLocale === 'de' ? 'Ihr Warenkorb:' : emailLocale === 'en' ? 'Your Cart:' : 'Jouw Winkelwagen:',
    quantity: emailLocale === 'de' ? 'Anzahl' : emailLocale === 'en' ? 'Quantity' : 'Aantal',
    total: emailLocale === 'de' ? 'Gesamt' : emailLocale === 'en' ? 'Total' : 'Totaal',
    freeShipping:
      emailLocale === 'de'
        ? '✅ Kostenloser Versand innerhalb NL, BE & DE'
        : emailLocale === 'en'
        ? '✅ Free shipping within NL, BE & DE'
        : '✅ Gratis verzending binnen NL, BE & DE',
    volumeDiscounts:
      emailLocale === 'de'
        ? '✅ Automatische Mengenrabatte'
        : emailLocale === 'en'
        ? '✅ Automatic volume discounts'
        : '✅ Automatische staffelkortingen',
    checkoutButton:
      emailLocale === 'de'
        ? 'Bestellung abschließen'
        : emailLocale === 'en'
        ? 'Complete Your Order'
        : 'Bestelling Afronden',
    needHelp: emailLocale === 'de' ? 'Brauchen Sie Hilfe?' : emailLocale === 'en' ? 'Need help?' : 'Hulp nodig?',
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

              <h2 style="margin: 0 0 20px; font-size: 20px; font-weight: bold; color: #404F4A;">${t.yourCart}</h2>

              <!-- Cart Items -->
              ${safeCartItems
                .map((item) => {
                  const discountedPrice = calculateDiscountedPrice(item.price, item.quantity);
                  const itemTotal = calculateTotalPrice(item.price, item.quantity);
                  const safeItemName = escapeHtml(item.name);
                  const safeImageUrl = safeLumoraHttpsUrl(item.image_url, true);

                  return `
                <table role="presentation" style="width: 100%; border-collapse: collapse; margin-bottom: 20px; background-color: #FAF3C3; border-radius: 12px; overflow: hidden;">
                  <tr>
                    <td style="padding: 20px;">
                      <table role="presentation" style="width: 100%;">
                        <tr>
                          <td style="width: 80px;">
                            <img src="${safeImageUrl}" alt="${safeItemName}" style="width: 70px; height: 70px; object-fit: cover; border-radius: 8px;" />
                          </td>
                          <td style="padding-left: 15px;">
                            <p style="margin: 0 0 5px; font-size: 16px; font-weight: 600; color: #404F4A;">${safeItemName}</p>
                            <p style="margin: 0 0 5px; font-size: 14px; color: #404F4A;">${t.quantity}: ${item.quantity}</p>
                            <p style="margin: 0; font-size: 14px; color: #2D7D46; font-weight: 600;">
                              ${formatPrice(discountedPrice)} × ${item.quantity} = ${formatPrice(itemTotal)}
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
              <table role="presentation" style="width: 100%; border-collapse: collapse; margin: 30px 0; border-top: 2px solid #404F4A; padding-top: 20px;">
                <tr>
                  <td style="padding: 10px 0; font-size: 20px; font-weight: bold; color: #404F4A;">${t.total}:</td>
                  <td style="padding: 10px 0; text-align: right; font-size: 24px; font-weight: bold; color: #2D7D46;">
                    ${formatPrice(safeTotalAmount)}
                  </td>
                </tr>
              </table>

              <!-- Benefits -->
              <div style="background-color: #F0F9F3; border-radius: 12px; padding: 20px; margin: 30px 0;">
                <p style="margin: 0 0 10px; font-size: 14px; color: #404F4A;">${t.freeShipping}</p>
                <p style="margin: 0; font-size: 14px; color: #404F4A;">${t.volumeDiscounts}</p>
              </div>

              <!-- CTA Button -->
              <table role="presentation" style="width: 100%; margin: 30px 0;">
                <tr>
                  <td align="center">
                    <a href="${safeCheckoutUrl}" style="display: inline-block; padding: 16px 40px; background: linear-gradient(135deg, #2D7D46 0%, #26673B 100%); color: #ffffff; text-decoration: none; border-radius: 12px; font-size: 18px; font-weight: bold; box-shadow: 0 4px 12px rgba(45, 125, 70, 0.3);">
                      ${t.checkoutButton}
                    </a>
                  </td>
                </tr>
              </table>

              <!-- Help -->
              <div style="text-align: center; margin-top: 40px; padding-top: 30px; border-top: 1px solid #E0E0E0;">
                <p style="margin: 0 0 10px; font-size: 14px; color: #404F4A;">${t.needHelp}</p>
                <p style="margin: 0; font-size: 14px; color: #2D7D46;">
                  ${t.contactUs} <a href="mailto:info@lumorahorticulture.nl" style="color: #2D7D46; text-decoration: underline;">info@lumorahorticulture.nl</a>
                </p>
              </div>

              <p style="margin: 30px 0 0; font-size: 14px; line-height: 1.6; color: #404F4A;">${t.footer}</p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 30px; text-align: center; background-color: #F5F5F5; border-radius: 0 0 16px 16px;">
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

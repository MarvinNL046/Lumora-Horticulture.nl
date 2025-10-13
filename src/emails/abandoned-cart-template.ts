import { CartItem } from '@/contexts/CartContext';
import { formatPrice, calculateDiscountedPrice, calculateTotalPrice } from '@/lib/volume-discount';

interface AbandonedCartEmailProps {
  customerName?: string;
  cartItems: CartItem[];
  totalAmount: number;
  locale: string;
  checkoutUrl: string;
}

export function getAbandonedCartEmailContent(props: AbandonedCartEmailProps) {
  const { customerName, cartItems, totalAmount, locale, checkoutUrl } = props;

  const t = {
    subject:
      locale === 'de'
        ? 'Ihre Produkte warten noch auf Sie! 🌱'
        : locale === 'en'
        ? 'Your products are still waiting for you! 🌱'
        : 'Je producten wachten nog op je! 🌱',
    greeting:
      customerName
        ? locale === 'de'
          ? `Hallo ${customerName},`
          : locale === 'en'
          ? `Hi ${customerName},`
          : `Hoi ${customerName},`
        : locale === 'de'
        ? 'Hallo,'
        : locale === 'en'
        ? 'Hi,'
        : 'Hoi,',
    intro:
      locale === 'de'
        ? 'Sie haben einige großartige Produkte in Ihrem Warenkorb gelassen! Wir möchten Sie daran erinnern, dass diese noch auf Sie warten.'
        : locale === 'en'
        ? 'You left some great products in your cart! We wanted to remind you that they\'re still waiting for you.'
        : 'Je hebt een aantal geweldige producten achtergelaten in je winkelwagen! We wilden je eraan herinneren dat ze nog op je wachten.',
    yourCart: locale === 'de' ? 'Ihr Warenkorb:' : locale === 'en' ? 'Your Cart:' : 'Jouw Winkelwagen:',
    quantity: locale === 'de' ? 'Anzahl' : locale === 'en' ? 'Quantity' : 'Aantal',
    total: locale === 'de' ? 'Gesamt' : locale === 'en' ? 'Total' : 'Totaal',
    freeShipping:
      locale === 'de'
        ? '✅ Kostenloser Versand innerhalb NL, BE & DE'
        : locale === 'en'
        ? '✅ Free shipping within NL, BE & DE'
        : '✅ Gratis verzending binnen NL, BE & DE',
    volumeDiscounts:
      locale === 'de'
        ? '✅ Automatische Mengenrabatte'
        : locale === 'en'
        ? '✅ Automatic volume discounts'
        : '✅ Automatische staffelkortingen',
    checkoutButton:
      locale === 'de'
        ? 'Bestellung abschließen'
        : locale === 'en'
        ? 'Complete Your Order'
        : 'Bestelling Afronden',
    needHelp: locale === 'de' ? 'Brauchen Sie Hilfe?' : locale === 'en' ? 'Need help?' : 'Hulp nodig?',
    contactUs:
      locale === 'de'
        ? 'Kontaktieren Sie uns unter'
        : locale === 'en'
        ? 'Contact us at'
        : 'Neem contact op via',
    footer:
      locale === 'de'
        ? 'Mit freundlichen Grüßen,<br/>Das Lumora Horticulture Team'
        : locale === 'en'
        ? 'Best regards,<br/>The Lumora Horticulture Team'
        : 'Met vriendelijke groet,<br/>Het Lumora Horticulture Team',
  };

  const html = `
<!DOCTYPE html>
<html lang="${locale}">
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
              ${cartItems
                .map((item) => {
                  const discountedPrice = calculateDiscountedPrice(item.price, item.quantity);
                  const itemTotal = calculateTotalPrice(item.price, item.quantity);

                  return `
                <table role="presentation" style="width: 100%; border-collapse: collapse; margin-bottom: 20px; background-color: #FAF3C3; border-radius: 12px; overflow: hidden;">
                  <tr>
                    <td style="padding: 20px;">
                      <table role="presentation" style="width: 100%;">
                        <tr>
                          <td style="width: 80px;">
                            <img src="${item.image_url}" alt="${item.name}" style="width: 70px; height: 70px; object-fit: cover; border-radius: 8px;" />
                          </td>
                          <td style="padding-left: 15px;">
                            <p style="margin: 0 0 5px; font-size: 16px; font-weight: 600; color: #404F4A;">${item.name}</p>
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
                    ${formatPrice(totalAmount)}
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
                    <a href="${checkoutUrl}" style="display: inline-block; padding: 16px 40px; background: linear-gradient(135deg, #2D7D46 0%, #26673B 100%); color: #ffffff; text-decoration: none; border-radius: 12px; font-size: 18px; font-weight: bold; box-shadow: 0 4px 12px rgba(45, 125, 70, 0.3);">
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

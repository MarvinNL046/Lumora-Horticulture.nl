import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/db';
import { products } from '@/db/schema';
import { asc } from 'drizzle-orm';

/**
 * GET /api/feed/google-shopping?locale=nl
 *
 * Generates Google Shopping product feed in XML format
 * Supports multi-language: nl (default), en, de
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const locale = searchParams.get('locale') || 'nl';

    // Domain mapping voor link URL's
    const domainMap: Record<string, string> = {
      nl: 'https://lumorahorticulture.nl',
      en: 'https://lumorahorticulture.com',
      de: 'https://lumorahorticulture.de',
    };

    const baseUrl = domainMap[locale] || domainMap.nl;

    // Haal alle producten op
    const allProducts = await db
      .select()
      .from(products)
      .orderBy(asc(products.display_order));

    // Genereer XML feed
    const xml = generateGoogleShoppingXML(allProducts, locale, baseUrl);

    // Return XML met correcte headers
    return new NextResponse(xml, {
      status: 200,
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600', // Cache voor 1 uur
      },
    });
  } catch (error) {
    console.error('Error generating Google Shopping feed:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to generate product feed',
      },
      { status: 500 }
    );
  }
}

/**
 * Genereer Google Shopping XML feed
 */
function generateGoogleShoppingXML(
  productList: any[],
  locale: string,
  baseUrl: string
): string {
  // XML header
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">\n';
  xml += '  <channel>\n';
  xml += `    <title>Lumora Horticulture - ${locale.toUpperCase()}</title>\n`;
  xml += `    <link>${baseUrl}</link>\n`;
  xml += `    <description>Professional horticulture products - Steenwol pluggen, kweektrays en verpakkingen</description>\n`;

  // Product items
  productList.forEach((product) => {
    // Lokalisatie: gebruik juiste naam en beschrijving
    const productName =
      locale === 'en' && product.name_en
        ? product.name_en
        : locale === 'de' && product.name_de
        ? product.name_de
        : product.name;

    const productDescription =
      locale === 'en' && product.description_en
        ? product.description_en
        : locale === 'de' && product.description_de
        ? product.description_de
        : product.description;

    // Product URL
    const shopPath = locale === 'nl' ? 'winkel' : locale === 'de' ? 'shop' : 'shop';
    const productUrl = `${baseUrl}/${shopPath}/${product.slug}`;

    // Image URL (absolute URL)
    let imageUrl = product.image_url;
    if (!imageUrl.startsWith('http')) {
      imageUrl = `${baseUrl}${imageUrl}`;
    }

    // Prijs formatting
    const price = parseFloat(product.price).toFixed(2);

    // Availability mapping
    const availabilityMap: Record<string, string> = {
      'in stock': 'in_stock',
      'out of stock': 'out_of_stock',
      preorder: 'preorder',
    };
    const availability = availabilityMap[product.availability] || 'in_stock';

    xml += '    <item>\n';
    xml += `      <g:id>${escapeXml(product.id)}</g:id>\n`;
    xml += `      <g:title>${escapeXml(productName)}</g:title>\n`;
    xml += `      <g:description>${escapeXml(stripHtml(productDescription))}</g:description>\n`;
    xml += `      <g:link>${escapeXml(productUrl)}</g:link>\n`;
    xml += `      <g:image_link>${escapeXml(imageUrl)}</g:image_link>\n`;
    xml += `      <g:price>${price} EUR</g:price>\n`;
    xml += `      <g:availability>${availability}</g:availability>\n`;
    xml += `      <g:condition>${product.condition || 'new'}</g:condition>\n`;
    xml += `      <g:brand>${escapeXml(product.brand || 'Lumora')}</g:brand>\n`;

    // GTIN (EAN barcode) - optioneel maar sterk aanbevolen
    if (product.gtin) {
      xml += `      <g:gtin>${escapeXml(product.gtin)}</g:gtin>\n`;
    }

    // MPN (Manufacturer Part Number) - optioneel
    if (product.mpn) {
      xml += `      <g:mpn>${escapeXml(product.mpn)}</g:mpn>\n`;
    }

    // Google Product Category - aanbevolen
    if (product.google_product_category) {
      xml += `      <g:google_product_category>${escapeXml(product.google_product_category)}</g:google_product_category>\n`;
    } else {
      // Default category voor tuinbouw producten
      xml += `      <g:google_product_category>2962</g:google_product_category>\n`; // Business & Industrial > Agriculture > Horticulture
    }

    // Product Type - eigen categorisering
    if (product.product_type) {
      xml += `      <g:product_type>${escapeXml(product.product_type)}</g:product_type>\n`;
    }

    // Shipping - Gratis verzending
    xml += '      <g:shipping>\n';
    xml += '        <g:country>NL</g:country>\n';
    xml += '        <g:price>0.00 EUR</g:price>\n';
    xml += '      </g:shipping>\n';
    xml += '      <g:shipping>\n';
    xml += '        <g:country>BE</g:country>\n';
    xml += '        <g:price>0.00 EUR</g:price>\n';
    xml += '      </g:shipping>\n';
    xml += '      <g:shipping>\n';
    xml += '        <g:country>DE</g:country>\n';
    xml += '        <g:price>0.00 EUR</g:price>\n';
    xml += '      </g:shipping>\n';

    // Identifier exists - verplicht als je geen GTIN/MPN hebt
    if (!product.gtin && !product.mpn) {
      xml += `      <g:identifier_exists>false</g:identifier_exists>\n`;
    }

    xml += '    </item>\n';
  });

  xml += '  </channel>\n';
  xml += '</rss>';

  return xml;
}

/**
 * Escape XML special characters
 */
function escapeXml(text: string): string {
  if (!text) return '';
  return text
    .toString()
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * Strip HTML tags from description
 */
function stripHtml(html: string): string {
  if (!html) return '';
  return html.replace(/<[^>]*>/g, '').trim();
}

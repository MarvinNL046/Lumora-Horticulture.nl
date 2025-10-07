import { NextResponse } from 'next/server';
import { db } from '@/db';
import { products } from '@/db/schema';

/**
 * GET /api/google-merchant-feed
 * Genereer Google Merchant Center RSS 2.0 feed
 */
export async function GET() {
  try {
    const allProducts = await db.select().from(products);

    const storeName = process.env.NEXT_PUBLIC_STORE_NAME || 'Lumora Horticulture';
    const storeDomain = process.env.NEXT_PUBLIC_STORE_DOMAIN || 'https://lumora-horticulture.nl';

    // Genereer RSS 2.0 feed volgens Google Merchant specificaties
    const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>${storeName}</title>
    <link>${storeDomain}</link>
    <description>Professionele tuinbouw en groeiverlichting producten</description>
${allProducts
  .map(
    (product) => `    <item>
      <g:id>${product.id}</g:id>
      <g:title>${escapeXml(product.name)}</g:title>
      <g:description>${escapeXml(product.description)}</g:description>
      <g:link>${storeDomain}/products/${product.id}</g:link>
      <g:image_link>${storeDomain}${product.image_url}</g:image_link>
      <g:availability>${product.availability}</g:availability>
      <g:price>${product.price} EUR</g:price>
      <g:brand>${product.brand}</g:brand>
      <g:condition>${product.condition}</g:condition>
      ${product.gtin ? `<g:gtin>${product.gtin}</g:gtin>` : ''}
      ${product.mpn ? `<g:mpn>${product.mpn}</g:mpn>` : ''}
      ${product.google_product_category ? `<g:google_product_category>${product.google_product_category}</g:google_product_category>` : ''}
      ${product.product_type ? `<g:product_type>${escapeXml(product.product_type)}</g:product_type>` : ''}
    </item>`
  )
  .join('\n')}
  </channel>
</rss>`;

    return new NextResponse(feed, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600', // Cache voor 1 uur
      },
    });
  } catch (error) {
    console.error('Error generating Google Merchant feed:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to generate feed',
      },
      { status: 500 }
    );
  }
}

/**
 * Escape XML special characters
 */
function escapeXml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

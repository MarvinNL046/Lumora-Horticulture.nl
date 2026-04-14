import { NextRequest, NextResponse } from 'next/server';
import { convex } from '@/lib/convex';
import { api } from '@/../convex/_generated/api';
import { isHiddenProductSlug } from '@/lib/hidden-products';
import { localizePathForLocale } from '@/lib/url-localizations';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';
export const revalidate = 0;

/**
 * GET /api/meta-feed?locale=nl|en|de
 * Meta Commerce Manager product feed (RSS 2.0 + g: namespace).
 * Paste this URL in Commerce Manager → Catalogue → Data sources → Scheduled feed.
 */
export async function GET(request: NextRequest) {
  try {
    const locale = (request.nextUrl.searchParams.get('locale') || 'nl').toLowerCase();
    const products = await convex.query(api.products.list, { locale });

    const domains: Record<string, string> = {
      nl: 'https://lumorahorticulture.nl',
      en: 'https://lumorahorticulture.com',
      de: 'https://lumorahorticulture.de',
    };
    const domain = domains[locale] || domains.nl;
    const currency = 'EUR';

    const items = products
      .filter((p) => !isHiddenProductSlug(p.slug))
      .map((p) => {
        const name =
          locale === 'en' && (p as any).name_en
            ? (p as any).name_en
            : locale === 'de' && (p as any).name_de
            ? (p as any).name_de
            : p.name;
        const description =
          locale === 'en' && (p as any).description_en
            ? (p as any).description_en
            : locale === 'de' && (p as any).description_de
            ? (p as any).description_de
            : p.description;

        const shopPath = localizePathForLocale(`/shop/${p.slug}`, locale);
        const link = `${domain}${shopPath}`;
        const imageUrl = p.image_url?.startsWith('http')
          ? p.image_url
          : `${domain}${p.image_url || ''}`;

        const availability =
          p.availability === 'in stock' || p.availability === 'in_stock'
            ? 'in stock'
            : 'out of stock';

        return `    <item>
      <g:id>${escapeXml(p._id)}</g:id>
      <g:title>${escapeXml(name)}</g:title>
      <g:description>${escapeXml(description || name)}</g:description>
      <g:link>${escapeXml(link)}</g:link>
      <g:image_link>${escapeXml(imageUrl)}</g:image_link>
      <g:availability>${availability}</g:availability>
      <g:price>${p.price.toFixed(2)} ${currency}</g:price>
      <g:brand>${escapeXml(p.brand || 'Lumora')}</g:brand>
      <g:condition>new</g:condition>
      <g:identifier_exists>${p.gtin ? 'yes' : 'no'}</g:identifier_exists>
      ${p.gtin ? `<g:gtin>${escapeXml(p.gtin)}</g:gtin>` : ''}
      ${(p as any).mpn ? `<g:mpn>${escapeXml((p as any).mpn)}</g:mpn>` : ''}
      ${
        (p as any).google_product_category
          ? `<g:google_product_category>${escapeXml((p as any).google_product_category)}</g:google_product_category>`
          : ''
      }
      ${
        (p as any).product_type
          ? `<g:product_type>${escapeXml((p as any).product_type)}</g:product_type>`
          : ''
      }
    </item>`;
      })
      .join('\n');

    const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>Lumora Horticulture — ${locale.toUpperCase()}</title>
    <link>${domain}</link>
    <description>Professional horticulture supplies — paper plug trays, rockwool plugs, NeemX Pro</description>
${items}
  </channel>
</rss>`;

    return new NextResponse(feed, {
      headers: {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=1800, s-maxage=1800',
      },
    });
  } catch (err) {
    console.error('Meta feed error:', err);
    return NextResponse.json({ success: false, error: 'Failed to generate feed' }, { status: 500 });
  }
}

function escapeXml(text: string): string {
  return String(text ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

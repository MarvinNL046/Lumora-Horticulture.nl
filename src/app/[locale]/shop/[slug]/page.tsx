import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { fetchQuery } from 'convex/nextjs';
import { api } from '@/../convex/_generated/api';
import ProductPageClient from './ProductPageClient';
import { isHiddenProductSlug } from '@/lib/hidden-products';
import { ShopProductSchema, ShopBreadcrumbSchema } from '@/components/StructuredData';
import { localizePathForLocale } from '@/lib/url-localizations';
import {
  getAvailableProductLocales,
  hasProductLocale,
} from '@/lib/product-locales';

// Generate static params for all product slugs and locales
export async function generateStaticParams() {
  try {
    const allProducts = await fetchQuery(api.products.list, {});
    return allProducts
      .filter((product) => !isHiddenProductSlug(product.slug))
      .flatMap((product) =>
        getAvailableProductLocales(product).map((locale) => ({
          locale,
          slug: product.slug,
        }))
      );
  } catch (error) {
    console.error('Skipping static product paths because Convex is unavailable:', error);
    return [];
  }
}

// Helper to get product from database
async function getProduct(slug: string) {
  return await fetchQuery(api.products.getBySlug, { slug });
}

// CTR-optimized product metadata configurations
const productMetaConfig: Record<string, {
  nl: { titleSuffix: string; benefits: string[] };
  en: { titleSuffix: string; benefits: string[] };
  de: { titleSuffix: string; benefits: string[] };
}> = {
  'paper-plug-tray-84': {
    nl: {
      titleSuffix: 'Kopen | 100% Biologisch Afbreekbaar | Gratis Verzending',
      benefits: ['Geen transplantatieschok', 'FP 12+ technologie', 'Binnen 48 uur geleverd', 'Staffelkorting tot 20%']
    },
    en: {
      titleSuffix: 'Buy Online | 100% Biodegradable | Free Shipping',
      benefits: ['No transplant shock', 'FP 12+ technology', 'Delivered within 48h', 'Volume discounts up to 20%']
    },
    de: {
      titleSuffix: 'Kaufen | 100% Biologisch Abbaubar | Kostenloser Versand',
      benefits: ['Kein Transplantationsschock', 'FP 12+ Technologie', 'Innerhalb 48 Std. geliefert', 'Mengenrabatt bis 20%']
    }
  },
  'paper-plug-tray-104': {
    nl: {
      titleSuffix: 'Kopen | 104 Cellen | Gratis Verzending',
      benefits: ['Optimale wortelgroei', '100% biologisch afbreekbaar', 'Direct uit voorraad', 'B2B prijzen']
    },
    en: {
      titleSuffix: 'Buy Online | 104 Cells | Free Shipping',
      benefits: ['Optimal root growth', '100% biodegradable', 'In stock', 'B2B pricing']
    },
    de: {
      titleSuffix: 'Kaufen | 104 Zellen | Kostenloser Versand',
      benefits: ['Optimale Wurzelentwicklung', '100% biologisch abbaubar', 'Auf Lager', 'B2B-Preise']
    }
  },
  'steenwol-pluggen-paperbus-35mm': {
    nl: {
      titleSuffix: 'Kopen | Professionele Stekpluggen | Gratis Verzending',
      benefits: ['Perfecte waterhuishouding', 'Optimale luchtcirculatie', 'Binnen 48 uur geleverd', 'Tot 20% korting']
    },
    en: {
      titleSuffix: 'Buy Online | Professional Propagation Plugs | Free Shipping',
      benefits: ['Perfect water management', 'Optimal air circulation', 'Delivered within 48h', 'Up to 20% discount']
    },
    de: {
      titleSuffix: 'Kaufen | Professionelle Stecklinge | Kostenloser Versand',
      benefits: ['Perfekte Wasserhaltung', 'Optimale Luftzirkulation', 'Innerhalb 48 Std. geliefert', 'Bis 20% Rabatt']
    }
  },
  'transportdoos-vouwdoos': {
    nl: {
      titleSuffix: 'Kopen | 25 Stuks per Verpakking | Gratis Verzending',
      benefits: ['Stevige kartonnen dozen', 'Optimaal voor transport', 'Direct beschikbaar', 'Staffelkorting']
    },
    en: {
      titleSuffix: 'Buy Online | 25 Units per Package | Free Shipping',
      benefits: ['Sturdy cardboard boxes', 'Optimal for transport', 'In stock', 'Volume discount']
    },
    de: {
      titleSuffix: 'Kaufen | 25 Stück pro Verpackung | Kostenloser Versand',
      benefits: ['Stabile Kartons', 'Optimal für Transport', 'Auf Lager', 'Mengenrabatt']
    }
  }
};

// Default meta config for products not in the list
const defaultMetaConfig = {
  nl: {
    titleSuffix: 'Kopen | Op Voorraad | Gratis Verzending',
    benefits: ['Direct uit voorraad leverbaar', 'Binnen 48 uur geleverd', 'Gratis verzending NL/BE/DE', 'Staffelkorting tot 20%']
  },
  en: {
    titleSuffix: 'Buy Online | In Stock | Free Shipping',
    benefits: ['Available from stock', 'Delivered within 48h', 'Free shipping NL/BE/DE', 'Volume discounts up to 20%']
  },
  de: {
    titleSuffix: 'Kaufen | Auf Lager | Kostenloser Versand',
    benefits: ['Direkt ab Lager lieferbar', 'Innerhalb 48 Std. geliefert', 'Kostenloser Versand NL/BE/DE', 'Mengenrabatt bis 20%']
  }
};

// Generate CTR-optimized metadata for product pages
export async function generateMetadata(
  props: {
    params: Promise<{ locale: string; slug: string }>
  }
): Promise<Metadata> {
  const params = await props.params;
  const { locale, slug } = params;

  if (isHiddenProductSlug(slug)) {
    notFound();
  }

  const product = await getProduct(slug);

  if (!product) {
    return {
      title: locale === 'de' ? 'Produkt nicht gefunden' : locale === 'en' ? 'Product not found' : 'Product niet gevonden',
      description: locale === 'de' ? 'Das angeforderte Produkt wurde nicht gefunden.' : locale === 'en' ? 'The requested product was not found.' : 'Het gevraagde product is niet gevonden.',
    };
  }

  if (!hasProductLocale(product, locale)) {
    notFound();
  }

  // Get translated product name
  const productName = locale === 'en' && product.name_en ? product.name_en :
                      locale === 'de' && product.name_de ? product.name_de :
                      product.name;

  // Get translated description
  const productDesc = locale === 'en' && product.description_en ? product.description_en :
                      locale === 'de' && product.description_de ? product.description_de :
                      product.description;

  // Get meta config for this product or use default
  const metaConfig = productMetaConfig[slug]?.[locale as keyof typeof defaultMetaConfig] ||
                     defaultMetaConfig[locale as keyof typeof defaultMetaConfig] ||
                     defaultMetaConfig.nl;

  const siteOrigin = 'https://lumorahorticulture.nl';
  const url = `${siteOrigin}${localizePathForLocale(`/shop/${slug}`, locale)}`;
  const availableLocales = getAvailableProductLocales(product);

  // CTR-optimized title: Product Name | Key Benefit | Trust Signal
  const title = `${productName} ${metaConfig.titleSuffix}`;

  // CTR-optimized description with benefits and call-to-action
  const benefitsList = metaConfig.benefits.map(b => `✓ ${b}`).join(' ');
  const description = locale === 'de'
    ? `${productName} bestellen bei Lumora Horticulture. ${benefitsList}. Jetzt kaufen!`
    : locale === 'en'
    ? `Order ${productName} at Lumora Horticulture. ${benefitsList}. Order now!`
    : `Bestel ${productName} bij Lumora Horticulture. ${benefitsList}. Direct bestellen!`;

  // Keywords for SEO
  const keywordsMap = {
    nl: [productName, 'kopen', 'bestellen', 'tuinbouw', 'kweekmateriaal', 'gratis verzending', 'B2B', 'staffelkorting'],
    en: [productName, 'buy', 'order', 'horticulture', 'growing supplies', 'free shipping', 'B2B', 'volume discount'],
    de: [productName, 'kaufen', 'bestellen', 'Gartenbau', 'Anzuchtmaterial', 'kostenloser Versand', 'B2B', 'Mengenrabatt']
  };

  const keywords = keywordsMap[locale as keyof typeof keywordsMap] || keywordsMap.nl;

  return {
    title: `${title} | Lumora Horticulture`,
    description,
    keywords: keywords.join(', '),
    openGraph: {
      title: `${title} | Lumora Horticulture`,
      description,
      url,
      siteName: 'Lumora Horticulture',
      images: [
        {
          url: product.image_url.startsWith('http') ? product.image_url : `${siteOrigin}${product.image_url}`,
          width: 1200,
          height: 630,
          alt: productName
        }
      ],
      locale: locale === 'nl' ? 'nl_NL' : locale === 'de' ? 'de_DE' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | Lumora Horticulture`,
      description,
      images: [product.image_url.startsWith('http') ? product.image_url : `${siteOrigin}${product.image_url}`],
    },
    alternates: {
      canonical: url,
      languages: {
        ...Object.fromEntries(
          availableLocales.map((availableLocale) => [
            availableLocale,
            `${siteOrigin}${localizePathForLocale(`/shop/${slug}`, availableLocale)}`,
          ]),
        ),
        'x-default': `${siteOrigin}${localizePathForLocale(`/shop/${slug}`, 'nl')}`,
      }
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: 'SpcTizFlTiNDDn9CpPqJ6O5Xjz2ivcEWKt3QHtxQgpQ',
    },
    // Additional product-specific meta tags
    other: {
      'product:price:amount': product.price?.toString() || '',
      'product:price:currency': 'EUR',
      'product:availability': product.availability === 'in stock' ? 'in stock' : 'out of stock',
      'product:brand': product.brand || 'Lumora',
    }
  };
}

export default async function ProductPage(
  props: {
    params: Promise<{ locale: string; slug: string }>
  }
) {
  const params = await props.params;

  if (isHiddenProductSlug(params.slug)) {
    notFound();
  }

  const product = await getProduct(params.slug);
  if (!product) notFound();
  if (!hasProductLocale(product, params.locale)) notFound();

  const productUrl = `https://lumorahorticulture.nl${localizePathForLocale(`/shop/${params.slug}`, params.locale)}`;

  // Matches the volume-discount tiers rendered on the PDP (see ProductPageClient).
  // Feeds AggregateOffer lowPrice so Google shows the "from €X" rich result.
  const volumeTiers = [
    { minQty: 5, discountPct: 20 },
    { minQty: 10, discountPct: 25 },
    { minQty: 25, discountPct: 30 },
    { minQty: 50, discountPct: 35 },
  ];

  const shopName =
    params.locale === 'de' ? 'Shop' : params.locale === 'en' ? 'Shop' : 'Winkel';
  const productName =
    params.locale === 'en' && product.name_en ? product.name_en :
    params.locale === 'de' && product.name_de ? product.name_de :
    product.name;

  return (
    <>
      <ShopProductSchema product={product} locale={params.locale} url={productUrl} volumeTiers={volumeTiers} />
      <ShopBreadcrumbSchema
        items={[
          { name: 'Home', url: `https://lumorahorticulture.nl${localizePathForLocale('/', params.locale)}` },
          { name: shopName, url: `https://lumorahorticulture.nl${localizePathForLocale('/shop', params.locale)}` },
          { name: productName, url: productUrl },
        ]}
      />
      <ProductPageClient locale={params.locale} productSlug={params.slug} />
    </>
  );
}

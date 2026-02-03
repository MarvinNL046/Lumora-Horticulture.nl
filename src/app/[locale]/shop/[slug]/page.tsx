import { Metadata } from 'next';
import { unstable_setRequestLocale } from 'next-intl/server';
import { db } from '@/db';
import { products } from '@/db/schema';
import { eq } from 'drizzle-orm';
import ProductPageClient from './ProductPageClient';

// Generate static params for all product slugs and locales
export async function generateStaticParams() {
  const allProducts = await db.select({ slug: products.slug }).from(products);
  const locales = ['nl', 'en', 'de'];

  return allProducts.flatMap((product) =>
    locales.map((locale) => ({
      locale,
      slug: product.slug,
    }))
  );
}

// Helper to get product from database
async function getProduct(slug: string) {
  const productResult = await db
    .select()
    .from(products)
    .where(eq(products.slug, slug))
    .limit(1);

  return productResult[0] || null;
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
export async function generateMetadata({
  params
}: {
  params: { locale: string; slug: string }
}): Promise<Metadata> {
  const { locale, slug } = params;
  const product = await getProduct(slug);

  if (!product) {
    return {
      title: locale === 'de' ? 'Produkt nicht gefunden' : locale === 'en' ? 'Product not found' : 'Product niet gevonden',
      description: locale === 'de' ? 'Das angeforderte Produkt wurde nicht gefunden.' : locale === 'en' ? 'The requested product was not found.' : 'Het gevraagde product is niet gevonden.',
    };
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

  // Domain mapping
  const domains = {
    nl: 'https://lumorahorticulture.nl',
    en: 'https://lumorahorticulture.com',
    de: 'https://lumorahorticulture.de'
  };

  // Shop path mapping
  const shopPaths = {
    nl: '/winkel/',
    en: '/shop/',
    de: '/shop/'
  };

  const domain = domains[locale as keyof typeof domains] || domains.nl;
  const shopPath = shopPaths[locale as keyof typeof shopPaths] || shopPaths.nl;
  const url = `${domain}${shopPath}${slug}`;

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
          url: product.image_url.startsWith('http') ? product.image_url : `${domain}${product.image_url}`,
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
      images: [product.image_url.startsWith('http') ? product.image_url : `${domain}${product.image_url}`],
    },
    alternates: {
      canonical: url,
      languages: {
        'nl': `${domains.nl}${shopPaths.nl}${slug}`,
        'en': `${domains.en}${shopPaths.en}${slug}`,
        'de': `${domains.de}${shopPaths.de}${slug}`,
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

export default async function ProductPage({
  params
}: {
  params: { locale: string; slug: string }
}) {
  unstable_setRequestLocale(params.locale);

  return <ProductPageClient locale={params.locale} productSlug={params.slug} />;
}

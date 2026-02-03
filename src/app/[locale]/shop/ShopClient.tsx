'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { localizePathForLocale } from '@/lib/url-localizations';

interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: string;
  image_url: string;
  brand: string;
  availability: string;
}

interface ShopClientProps {
  locale: string;
}

// Trust Badge Component
function TrustBadge({ icon, text }: { icon: string; text: string }) {
  return (
    <div className="flex items-center gap-2 text-sm text-lumora-dark/80">
      <span className="text-lumora-green-500">{icon}</span>
      <span>{text}</span>
    </div>
  );
}

export default function ShopClient({ locale }: ShopClientProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // Domain for structured data
  const domain = locale === 'de' ? 'lumorahorticulture.de' : locale === 'en' ? 'lumorahorticulture.com' : 'lumorahorticulture.nl';

  // Translations
  const t = {
    title: locale === 'de' ? 'Webshop' : locale === 'en' ? 'Shop' : 'Webshop',
    subtitle: locale === 'de' ? 'Professionelle Anzuchtlösungen für optimale Ergebnisse' : locale === 'en' ? 'Professional propagation solutions for optimal results' : 'Professionele kweekoplossingen voor optimale resultaten',
    freeShipping: locale === 'de' ? 'Immer Kostenloser Versand!' : locale === 'en' ? 'Always Free Shipping!' : 'Altijd Gratis Verzending!',
    freeShippingDesc: locale === 'de' ? 'Für Niederlande, Belgien und Deutschland' : locale === 'en' ? 'For Netherlands, Belgium and Germany' : 'Voor Nederland, België en Duitsland',
    b2bButton: locale === 'de' ? '🏢 Geschäftlich Bestellen? Kontaktieren Sie uns für maßgeschneiderte Lösungen' : locale === 'en' ? '🏢 Business Orders? Contact us for custom solutions' : '🏢 Zakelijk Bestellen? Neem contact op voor maatwerk',
    home: locale === 'de' ? 'Startseite' : locale === 'en' ? 'Home' : 'Home',
    shop: locale === 'de' ? 'Shop' : locale === 'en' ? 'Shop' : 'Winkel',
    inStock: locale === 'de' ? 'Auf Lager' : locale === 'en' ? 'In Stock' : 'Op voorraad',
    outOfStock: locale === 'de' ? 'Nicht verfügbar' : locale === 'en' ? 'Out of stock' : 'Niet beschikbaar',
    viewProduct: locale === 'de' ? 'Produkt ansehen' : locale === 'en' ? 'View product' : 'Bekijk product',
    delivery: locale === 'de' ? 'Innerhalb 48 Std. geliefert' : locale === 'en' ? 'Delivered within 48h' : 'Binnen 48 uur geleverd',
    trustBadges: {
      certified: locale === 'de' ? 'EU Zertifiziert' : locale === 'en' ? 'EU Certified' : 'EU Gecertificeerd',
      years: locale === 'de' ? '15+ Jahre Erfahrung' : locale === 'en' ? '15+ Years Experience' : '15+ Jaar Ervaring',
      delivery: locale === 'de' ? 'Innerhalb 48 Std. geliefert' : locale === 'en' ? 'Delivered within 48h' : 'Binnen 48 uur geleverd',
      sustainable: locale === 'de' ? '100% Nachhaltig' : locale === 'en' ? '100% Sustainable' : '100% Duurzaam',
    },
    volumeDiscount: locale === 'de' ? 'Mengenrabatt verfügbar' : locale === 'en' ? 'Volume discount available' : 'Staffelkorting beschikbaar',
  };

  useEffect(() => {
    fetch(`/api/products?locale=${locale}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setProducts(data.products);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        setLoading(false);
      });
  }, [locale]);

  // JSON-LD structured data for product catalog
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: t.title,
    description: t.subtitle,
    numberOfItems: products.length,
    itemListElement: products.map((product, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Product',
        name: product.name,
        description: product.description,
        image: `https://${domain}${product.image_url}`,
        url: `https://${domain}/${locale === 'nl' ? 'winkel' : 'shop'}/${product.slug}`,
        brand: {
          '@type': 'Brand',
          name: product.brand || 'Lumora',
        },
        offers: {
          '@type': 'Offer',
          priceCurrency: 'EUR',
          price: parseFloat(product.price).toFixed(2),
          availability: product.availability === 'in stock'
            ? 'https://schema.org/InStock'
            : 'https://schema.org/OutOfStock',
        },
      },
    })),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: t.home,
        item: `https://${domain}/`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: t.shop,
        item: `https://${domain}/${locale === 'nl' ? 'winkel' : 'shop'}`,
      },
    ],
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading products...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-lumora-cream/30 to-white">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumb Navigation */}
        <nav className="mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 text-sm text-lumora-dark/60">
            <li>
              <Link href={localizePathForLocale('/', locale)} className="hover:text-lumora-green-500 transition-colors">
                {t.home}
              </Link>
            </li>
            <li>
              <span className="mx-2">/</span>
            </li>
            <li className="text-lumora-dark font-medium">{t.shop}</li>
          </ol>
        </nav>

        {/* Trust Badges Bar */}
        <div className="bg-white rounded-xl shadow-soft p-4 mb-8 border border-lumora-dark/5">
          <div className="flex flex-wrap justify-center gap-6 md:gap-10">
            <TrustBadge icon="✓" text={t.trustBadges.certified} />
            <TrustBadge icon="★" text={t.trustBadges.years} />
            <TrustBadge icon="🚚" text={t.trustBadges.delivery} />
            <TrustBadge icon="🌱" text={t.trustBadges.sustainable} />
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-display font-bold text-lumora-dark mb-4">
            {t.title}
          </h1>
          <p className="text-xl text-lumora-dark/70 mb-6">
            {t.subtitle}
          </p>

          {/* Gratis Verzending Banner */}
          <div className="inline-block bg-gradient-to-r from-lumora-green-500 to-lumora-green-600 rounded-2xl px-8 py-4 text-white shadow-soft-lg mb-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl">📦</span>
              <div className="text-left">
                <p className="font-bold text-xl">{t.freeShipping}</p>
                <p className="text-sm text-lumora-cream/90">{t.freeShippingDesc}</p>
              </div>
            </div>
          </div>

          {/* B2B Banner */}
          <div className="text-center">
            <Link
              href={localizePathForLocale('/contact', locale)}
              className="inline-flex items-center gap-2 bg-lumora-dark text-white px-6 py-3 rounded-xl hover:bg-lumora-dark/90 transition-all duration-300 shadow-soft hover:shadow-soft-md font-semibold"
            >
              {t.b2bButton}
            </Link>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-3xl shadow-soft-lg overflow-hidden hover:shadow-soft-md transition-all duration-300 border border-lumora-dark/10 group"
            >
              {/* Product Image */}
              <div className="relative aspect-w-16 aspect-h-9 bg-lumora-cream/20">
                <img
                  src={product.image_url}
                  alt={product.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/placeholder-product.jpg';
                  }}
                />
                {/* Availability Badge */}
                <div className="absolute top-4 right-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium shadow-soft ${
                      product.availability === 'in stock'
                        ? 'bg-lumora-green-500 text-white'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {product.availability === 'in stock' ? t.inStock : t.outOfStock}
                  </span>
                </div>
                {/* Volume Discount Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full text-sm font-medium shadow-soft bg-lumora-gold text-lumora-dark">
                    💰 {t.volumeDiscount}
                  </span>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6">
                <h2 className="text-2xl font-display font-bold text-lumora-dark mb-3">
                  {product.name}
                </h2>
                <p className="text-lumora-dark/70 mb-4 leading-relaxed line-clamp-3">{product.description}</p>

                {/* Delivery indicator */}
                <div className="flex items-center gap-2 text-sm text-lumora-green-600 mb-4">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span>{t.delivery}</span>
                </div>

                {/* Price & CTA */}
                <div className="flex justify-between items-center pt-4 border-t border-lumora-dark/10">
                  <div>
                    <div className="text-3xl font-bold text-lumora-green-500">
                      €{parseFloat(product.price).toFixed(2)}
                    </div>
                    <span className="text-xs text-lumora-dark/50">{locale === 'de' ? 'inkl. MwSt.' : locale === 'en' ? 'incl. VAT' : 'incl. BTW'}</span>
                  </div>
                  <Link
                    href={localizePathForLocale(`/shop/${product.slug}`, locale)}
                    className="bg-lumora-green-500 text-white px-6 py-3 rounded-xl hover:bg-lumora-green-600 transition-all duration-300 shadow-soft hover:shadow-soft-md font-medium"
                  >
                    {t.viewProduct}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-lumora-dark/5 rounded-2xl p-8">
            <h2 className="text-2xl font-display font-bold text-lumora-dark mb-4">
              {locale === 'de' ? 'Fragen zu unseren Produkten?' : locale === 'en' ? 'Questions about our products?' : 'Vragen over onze producten?'}
            </h2>
            <p className="text-lumora-dark/70 mb-6 max-w-2xl mx-auto">
              {locale === 'de'
                ? 'Unser Team hilft Ihnen gerne bei der Auswahl der richtigen Produkte für Ihre Gärtnerei.'
                : locale === 'en'
                ? 'Our team is happy to help you choose the right products for your nursery.'
                : 'Ons team helpt u graag bij het kiezen van de juiste producten voor uw kwekerij.'}
            </p>
            <Link
              href={localizePathForLocale('/contact', locale)}
              className="inline-flex items-center gap-2 bg-lumora-green-500 text-white px-8 py-4 rounded-xl hover:bg-lumora-green-600 transition-all duration-300 shadow-soft hover:shadow-soft-md font-semibold text-lg"
            >
              {locale === 'de' ? 'Kontaktieren Sie uns' : locale === 'en' ? 'Contact us' : 'Neem contact op'}
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

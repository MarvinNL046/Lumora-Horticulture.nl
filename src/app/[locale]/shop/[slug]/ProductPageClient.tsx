'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  VOLUME_DISCOUNT_TIERS,
  calculateDiscountedPrice,
  calculateTotalPrice,
  getDiscountInfo,
  formatPrice,
} from '@/lib/volume-discount';
import { localizePathForLocale } from '@/lib/url-localizations';
import { trackViewItem, trackAddToCart } from '@/lib/google-ads';
import { useCart } from '@/contexts/CartContext';

// Trust Badge Component
function TrustBadge({ icon, text }: { icon: string; text: string }) {
  return (
    <div className="flex items-center gap-2 text-sm text-lumora-dark/80">
      <span className="text-lumora-green-500">{icon}</span>
      <span>{text}</span>
    </div>
  );
}

// USP Item Component
function USPItem({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-2">
      <svg className="w-5 h-5 text-lumora-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
      <span className="text-lumora-dark/80">{text}</span>
    </div>
  );
}

interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: string;
  image_url: string;
  brand: string;
  availability: string;
  metadata?: {
    images?: string[];
    specifications?: {
      [key: string]: any;
    };
    [key: string]: any;
  };
}

interface ProductPageClientProps {
  locale: string;
  productSlug: string;
}

export default function ProductPageClient({ locale, productSlug }: ProductPageClientProps) {
  // Translations
  const t = {
    freeShipping: locale === 'de' ? 'Immer Kostenloser Versand!' : locale === 'en' ? 'Always Free Shipping!' : 'Altijd Gratis Verzending!',
    freeShippingDesc: locale === 'de' ? 'Kostenlose Lieferung innerhalb der Niederlande, Belgien und Deutschland' : locale === 'en' ? 'Free delivery within Netherlands, Belgium and Germany' : 'Gratis levering binnen Nederland, België en Duitsland',
    volumeDiscount: locale === 'de' ? 'Mengenrabatt' : locale === 'en' ? 'Volume Discount' : 'Staffelkorting',
    normalPrice: locale === 'de' ? 'Normalpreis' : locale === 'en' ? 'Normal price' : 'Normale prijs',
    pieces: locale === 'de' ? 'Stück' : locale === 'en' ? 'pieces' : 'stuks',
    tip: locale === 'de' ? 'Tipp' : locale === 'en' ? 'Tip' : 'Tip',
    tipText: (qty: number, discount: number) =>
      locale === 'de' ? `Bei ${qty} Stück erhalten Sie ${discount}% Rabatt!` :
      locale === 'en' ? `Order ${qty} pieces and get ${discount}% discount!` :
      `Bij ${qty} stuks krijg je ${discount}% korting!`,
    pricePerPiece: locale === 'de' ? 'Preis pro Stück:' : locale === 'en' ? 'Price per piece:' : 'Prijs per stuk:',
    pricePerPackage: locale === 'de' ? 'Preis pro 25 Stück:' : locale === 'en' ? 'Price per 25 units:' : 'Prijs per 25 stuks:',
    discount: locale === 'de' ? 'Rabatt' : locale === 'en' ? 'discount' : 'korting',
    quantity: locale === 'de' ? 'Anzahl:' : locale === 'en' ? 'Quantity:' : 'Aantal:',
    quantityPackages: locale === 'de' ? 'Anzahl Verpackungen:' : locale === 'en' ? 'Number of packages:' : 'Aantal verpakkingen:',
    packageNote: locale === 'de' ? '1 Verpackung = 25 Stück' : locale === 'en' ? '1 package = 25 units' : '1 verpakking = 25 stuks',
    trayBoxNote84: locale === 'de' ? '1 Karton enthält 8 Tabletts' : locale === 'en' ? '1 box contains 8 trays' : '1 doos bevat 8 trays',
    trayBoxNote104: locale === 'de' ? '1 Karton enthält 7 Tabletts' : locale === 'en' ? '1 box contains 7 trays' : '1 doos bevat 7 trays',
    subtotalNoDiscount: locale === 'de' ? 'Zwischensumme ohne Rabatt:' : locale === 'en' ? 'Subtotal without discount:' : 'Subtotaal zonder korting:',
    volumeDiscountLabel: locale === 'de' ? 'Mengenrabatt' : locale === 'en' ? 'Volume discount' : 'Staffelkorting',
    total: locale === 'de' ? 'Gesamt:' : locale === 'en' ? 'Total:' : 'Totaal:',
    orderText: (qty: number, discount: number) =>
      locale === 'de' ? `Bestellen Sie ${qty} Stück und erhalten Sie ${discount}% Rabatt!` :
      locale === 'en' ? `Order ${qty} pieces and get ${discount}% discount!` :
      `Bestel ${qty} stuks en krijg ${discount}% korting!`,
    addToCart: locale === 'de' ? 'In den Warenkorb' : locale === 'en' ? 'Add to Cart' : 'Toevoegen aan Winkelwagen',
    addedToCart: locale === 'de' ? 'Zum Warenkorb hinzugefügt!' : locale === 'en' ? 'Added to cart!' : 'Toegevoegd aan winkelwagen!',
    viewCart: locale === 'de' ? 'Warenkorb ansehen' : locale === 'en' ? 'View cart' : 'Bekijk winkelwagen',
    continueShopping: locale === 'de' ? 'Weiter einkaufen' : locale === 'en' ? 'Continue shopping' : 'Verder winkelen',
    b2bButton: locale === 'de' ? 'Geschäftlich Bestellen (B2B)' : locale === 'en' ? 'Business Orders (B2B)' : 'Zakelijk Bestellen (B2B)',
    b2bText: locale === 'de' ? 'Große Mengen? Kontaktieren Sie uns für maßgeschneiderte Lösungen und zusätzliche Vorteile' : locale === 'en' ? 'Large orders? Contact us for custom solutions and additional benefits' : 'Grote afname? Neem contact op voor maatwerk en extra voordeel',
    // Trust badges
    inStock: locale === 'de' ? 'Auf Lager' : locale === 'en' ? 'In Stock' : 'Op voorraad',
    deliveryPlugs: locale === 'de' ? 'Innerhalb 48 Std. geliefert' : locale === 'en' ? 'Delivered within 48h' : 'Binnen 48 uur geleverd',
    deliveryNeemx: locale === 'de' ? 'Versand am selben Tag' : locale === 'en' ? 'Same day shipping' : 'Dezelfde dag verzonden',
    euCertified: locale === 'de' ? 'EU-Zertifiziert' : locale === 'en' ? 'EU Certified' : 'EU Gecertificeerd',
    yearsExperience: locale === 'de' ? '15+ Jahre Erfahrung' : locale === 'en' ? '15+ Years Experience' : '15+ Jaar Ervaring',
    sustainable: locale === 'de' ? '100% Nachhaltig' : locale === 'en' ? '100% Sustainable' : '100% Duurzaam',
    // Breadcrumbs
    home: locale === 'de' ? 'Startseite' : locale === 'en' ? 'Home' : 'Home',
    shop: locale === 'de' ? 'Webshop' : locale === 'en' ? 'Shop' : 'Webshop',
    // USPs
    usps: [
      locale === 'de' ? 'Kein Transplantationsschock' : locale === 'en' ? 'No transplant shock' : 'Geen transplantatieschok',
      locale === 'de' ? '100% biologisch abbaubar' : locale === 'en' ? '100% biodegradable' : '100% biologisch afbreekbaar',
      locale === 'de' ? 'FP 12+ Technologie (12+ Monate Stabilität)' : locale === 'en' ? 'FP 12+ Technology (12+ months stability)' : 'FP 12+ technologie (12+ maanden stabiliteit)',
      locale === 'de' ? 'Direkt pflanzbar' : locale === 'en' ? 'Directly plantable' : 'Direct plantbaar',
      locale === 'de' ? 'Optimale Wurzelentwicklung' : locale === 'en' ? 'Optimal root development' : 'Optimale wortelontwikkeling',
    ],
  };

  const { addItem, setIsCartOpen } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);
  const [showAddedMessage, setShowAddedMessage] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string>('');

  // NEEMX PRO size variants
  const [sizeVariants, setSizeVariants] = useState<Product[]>([]);
  const [selectedVariant, setSelectedVariant] = useState<Product | null>(null);
  const isNeemxPro = productSlug.startsWith('neemx-pro');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/slug/${productSlug}?locale=${locale}`);
        const data = await res.json();

        if (data.success) {
          setProduct(data.product);
          setSelectedImage(data.product.metadata?.images?.[0] || data.product.image_url);
          setSelectedVariant(data.product);

          // Track product view in GA4
          trackViewItem({
            id: data.product.id,
            name: data.product.name,
            price: parseFloat(data.product.price),
            category: 'Horticulture Products',
          });

          // Fetch all NEEMX PRO variants if this is a NEEMX PRO product
          if (productSlug.startsWith('neemx-pro')) {
            const variantsRes = await fetch(`/api/products?locale=${locale}`);
            const variantsData = await variantsRes.json();
            if (variantsData.success) {
              const neemxVariants = variantsData.products
                .filter((p: Product) => p.slug.startsWith('neemx-pro'))
                .sort((a: Product, b: Product) => parseFloat(a.price) - parseFloat(b.price));
              setSizeVariants(neemxVariants);
            }
          }
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productSlug, locale]);

  const handleAddToCart = () => {
    const cartProduct = isNeemxPro && selectedVariant ? selectedVariant : product;
    if (!cartProduct) return;

    setAddingToCart(true);

    const basePrice = parseFloat(cartProduct.price);

    trackAddToCart({
      id: cartProduct.id,
      name: cartProduct.name,
      price: calculateDiscountedPrice(basePrice, quantity),
      quantity: quantity,
      category: 'Horticulture Products',
    });

    addItem(
      {
        product_id: cartProduct.id,
        slug: cartProduct.slug,
        name: cartProduct.name,
        price: basePrice,
        image_url: cartProduct.image_url,
      },
      quantity
    );

    setShowAddedMessage(true);
    setAddingToCart(false);

    setTimeout(() => {
      setIsCartOpen(true);
    }, 300);

    setTimeout(() => {
      setShowAddedMessage(false);
    }, 3000);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading product...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Product niet gevonden</div>
      </div>
    );
  }

  // Use selectedVariant price for NEEMX PRO, otherwise use product price
  const activeProduct = isNeemxPro && selectedVariant ? selectedVariant : product;
  const basePrice = parseFloat(activeProduct.price);
  const discountInfo = getDiscountInfo(quantity);
  const discountedPrice = calculateDiscountedPrice(basePrice, quantity);
  const totalPrice = calculateTotalPrice(basePrice, quantity);
  const totalDiscount = (basePrice * quantity) - totalPrice;

  // Helper to extract size from NEEMX PRO product name
  const getSizeLabel = (slug: string) => {
    if (slug.includes('10ml')) return '10 ml';
    if (slug.includes('30ml')) return '30 ml';
    if (slug.includes('50ml')) return '50 ml';
    return '';
  };

  // Domain based on locale
  const domain = locale === 'de' ? 'lumorahorticulture.de' : locale === 'en' ? 'lumorahorticulture.com' : 'lumorahorticulture.nl';
  const shopPath = locale === 'de' || locale === 'en' ? 'shop' : 'winkel';

  // JSON-LD Product Structured Data
  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: `https://${domain}${product.image_url}`,
    brand: {
      '@type': 'Brand',
      name: product.brand || 'Lumora'
    },
    offers: {
      '@type': 'Offer',
      url: `https://${domain}/${shopPath}/${product.slug}`,
      priceCurrency: 'EUR',
      price: basePrice.toFixed(2),
      availability: product.availability === 'in stock' ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      seller: {
        '@type': 'Organization',
        name: 'Lumora Horticulture'
      },
      priceValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingRate: {
          '@type': 'MonetaryAmount',
          value: '0',
          currency: 'EUR'
        },
        deliveryTime: {
          '@type': 'ShippingDeliveryTime',
          handlingTime: {
            '@type': 'QuantitativeValue',
            minValue: 1,
            maxValue: 2,
            unitCode: 'DAY'
          }
        },
        shippingDestination: {
          '@type': 'DefinedRegion',
          addressCountry: ['NL', 'BE', 'DE']
        }
      }
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '127'
    }
  };

  // Breadcrumb Schema
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: t.home,
        item: `https://${domain}/`
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: t.shop,
        item: `https://${domain}/${shopPath}`
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: product.name,
        item: `https://${domain}/${shopPath}/${product.slug}`
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-lumora-cream/30 to-white">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb Navigation */}
        <nav className="mb-6" aria-label="Breadcrumb">
          <ol className="flex items-center gap-2 text-sm text-lumora-dark/60">
            <li>
              <Link href={localizePathForLocale('/', locale)} className="hover:text-lumora-green-500 transition-colors">
                {t.home}
              </Link>
            </li>
            <li><span className="mx-2">/</span></li>
            <li>
              <Link href={localizePathForLocale('/shop', locale)} className="hover:text-lumora-green-500 transition-colors">
                {t.shop}
              </Link>
            </li>
            <li><span className="mx-2">/</span></li>
            <li className="text-lumora-dark font-medium truncate max-w-[200px]">{product.name}</li>
          </ol>
        </nav>

        {/* Trust Badges Bar */}
        <div className="bg-white rounded-xl shadow-soft p-4 mb-8 border border-lumora-dark/5">
          <div className="flex flex-wrap justify-center gap-6 md:gap-10">
            <TrustBadge icon="✓" text={t.inStock} />
            <TrustBadge icon="🚚" text={isNeemxPro ? t.deliveryNeemx : t.deliveryPlugs} />
            <TrustBadge icon="🏆" text={t.euCertified} />
            <TrustBadge icon="⭐" text={t.yearsExperience} />
            <TrustBadge icon="♻️" text={t.sustainable} />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Product afbeelding en details */}
          <div>
            {/* Image Gallery */}
            <div className="mb-6">
              {/* Main Image */}
              <div className="relative rounded-3xl overflow-hidden shadow-soft-lg mb-4 bg-white">
                <img
                  src={selectedImage || product.image_url}
                  alt={product.name}
                  className="w-full h-auto"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/placeholder-product.jpg';
                  }}
                />
              </div>

              {/* Thumbnail Gallery */}
              {product.metadata?.images && product.metadata.images.length > 1 && (
                <div className="grid grid-cols-3 gap-3">
                  {product.metadata.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(image)}
                      className={`relative rounded-xl overflow-hidden transition-all duration-200 ${
                        selectedImage === image
                          ? 'ring-4 ring-lumora-green-500 shadow-soft-md scale-105'
                          : 'ring-2 ring-lumora-dark/10 hover:ring-lumora-green-300 hover:scale-105'
                      }`}
                    >
                      <div className="aspect-square bg-white p-2">
                        <img
                          src={image}
                          alt={`${product.name} - afbeelding ${index + 1}`}
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/placeholder-product.jpg';
                          }}
                        />
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
            <h1 className="text-4xl font-display font-bold text-lumora-dark mb-4">
              {product.name}
            </h1>

            {/* Stock Status Badge */}
            <div className="flex items-center gap-4 mb-4">
              {product.availability === 'in stock' ? (
                <span className="inline-flex items-center gap-1 bg-lumora-green-500/10 text-lumora-green-600 px-3 py-1 rounded-full text-sm font-semibold border border-lumora-green-500/20">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  {t.inStock}
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-semibold">
                  {locale === 'de' ? 'Nicht auf Lager' : locale === 'en' ? 'Out of Stock' : 'Niet op voorraad'}
                </span>
              )}
              <span className="text-sm text-lumora-dark/60">
                🚚 {isNeemxPro ? t.deliveryNeemx : t.deliveryPlugs}
              </span>
            </div>

            <p className="text-lg text-lumora-dark/70 mb-6 leading-relaxed">{product.description}</p>

            {/* USP Checklist - Only for Tray products */}
            {(productSlug.includes('paper-plug-tray') || productSlug.includes('tray')) && (
              <div className="bg-lumora-cream/50 rounded-xl p-5 mb-6 border border-lumora-dark/10">
                <h3 className="font-semibold text-lumora-dark mb-3">
                  {locale === 'de' ? 'Warum Paper Plugs wählen?' : locale === 'en' ? 'Why choose Paper Plugs?' : 'Waarom Paper Plugs kiezen?'}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {t.usps.map((usp, index) => (
                    <USPItem key={index} text={usp} />
                  ))}
                </div>
              </div>
            )}

            {/* Staffelkorting Tabel */}
            <div className="bg-gradient-to-br from-lumora-green-500/10 to-lumora-green-600/5 rounded-2xl p-6 border-2 border-lumora-green-500/20 mb-6">
              <h3 className="text-xl font-display font-semibold text-lumora-dark mb-4 flex items-center gap-2">
                <span className="text-2xl">💰</span> {t.volumeDiscount}
              </h3>
              <div className="space-y-2">
                {VOLUME_DISCOUNT_TIERS.map((tier, index) => (
                  <div
                    key={index}
                    className={`flex justify-between items-center p-3 rounded-xl transition-all ${
                      quantity >= tier.minQuantity &&
                      (tier.maxQuantity === null || quantity <= tier.maxQuantity)
                        ? 'bg-lumora-green-500 text-white font-semibold shadow-soft'
                        : 'bg-white/60 text-lumora-dark/70'
                    }`}
                  >
                    <span className="font-medium">
                      {tier.minQuantity}
                      {tier.maxQuantity ? `-${tier.maxQuantity}` : '+'} {t.pieces}
                    </span>
                    <span className="font-bold">
                      {tier.discountPercentage === 0
                        ? t.normalPrice
                        : `-${tier.discountPercentage}%`}
                    </span>
                  </div>
                ))}
              </div>
              {discountInfo.nextTier && (
                <p className="text-sm text-lumora-dark/70 mt-4 bg-white/60 rounded-lg p-3 border border-lumora-dark/10">
                  💡 <strong>{t.tip}:</strong> {t.tipText(discountInfo.nextTier.quantity, discountInfo.nextTier.discount)}
                </p>
              )}
            </div>

            {/* Gratis Verzending Badge */}
            <div className="bg-gradient-to-r from-lumora-green-500 to-lumora-green-600 rounded-2xl p-6 text-white mb-6 shadow-soft-lg">
              <div className="flex items-center gap-4">
                <span className="text-4xl">📦</span>
                <div>
                  <h3 className="text-2xl font-display font-bold mb-1">{t.freeShipping}</h3>
                  <p className="text-lumora-cream/90">
                    {t.freeShippingDesc}
                  </p>
                </div>
              </div>
            </div>

            {product.metadata?.specifications && Object.keys(product.metadata.specifications).length > 0 && (
              <div className="bg-lumora-cream/30 rounded-2xl p-6 border border-lumora-dark/10">
                <h3 className="text-xl font-display font-semibold text-lumora-dark mb-4">
                  {locale === 'de' ? 'Spezifikationen' : locale === 'en' ? 'Specifications' : 'Specificaties'}
                </h3>
                <dl className="space-y-3">
                  {Object.entries(product.metadata.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between border-b border-lumora-dark/10 pb-2">
                      <dt className="text-lumora-dark/70 capitalize font-medium">{key}:</dt>
                      <dd className="font-semibold text-lumora-dark">
                        {Array.isArray(value) ? value.join(', ') : String(value)}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}
          </div>

          {/* Checkout formulier */}
          <div>
            <div className="bg-white rounded-3xl shadow-soft-lg p-8 lg:sticky lg:top-24 border border-lumora-dark/10">
              <div className="mb-6">
                {/* Gratis Verzending Badge - Compact */}
                <div className="bg-gradient-to-r from-lumora-green-500 to-lumora-green-600 rounded-xl p-4 text-white mb-6 text-center shadow-soft">
                  <p className="font-bold text-lg">📦 {t.freeShipping}</p>
                </div>

                {/* NEEMX PRO Size Selector */}
                {isNeemxPro && sizeVariants.length > 0 && (
                  <div className="mb-6">
                    <label className="text-lumora-dark font-medium block mb-3">
                      {locale === 'de' ? 'Größe wählen:' : locale === 'en' ? 'Select size:' : 'Kies formaat:'}
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {sizeVariants.map((variant) => (
                        <button
                          key={variant.id}
                          onClick={() => setSelectedVariant(variant)}
                          className={`relative p-3 rounded-xl border-2 transition-all duration-200 ${
                            selectedVariant?.id === variant.id
                              ? 'border-amber-500 bg-amber-50 shadow-md'
                              : 'border-lumora-dark/20 hover:border-amber-300 hover:bg-amber-50/50'
                          }`}
                        >
                          {variant.slug === 'neemx-pro-30ml' && (
                            <span className="absolute -top-2 -right-2 bg-amber-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                              {locale === 'de' ? 'Beliebt' : locale === 'en' ? 'Popular' : 'Populair'}
                            </span>
                          )}
                          <div className="text-center">
                            <div className={`text-lg font-bold ${selectedVariant?.id === variant.id ? 'text-amber-600' : 'text-lumora-dark'}`}>
                              {getSizeLabel(variant.slug)}
                            </div>
                            <div className={`text-sm font-semibold ${selectedVariant?.id === variant.id ? 'text-amber-500' : 'text-lumora-dark/70'}`}>
                              €{parseFloat(variant.price).toFixed(2).replace('.', ',')}
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                    <p className="text-xs text-lumora-dark/60 mt-2 text-center">
                      {locale === 'de' ? 'Alle Größen mit Mengenrabatt' : locale === 'en' ? 'All sizes with volume discount' : 'Alle formaten met staffelkorting'}
                    </p>
                  </div>
                )}

                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-display font-semibold text-lumora-dark">
                    {productSlug === 'transportdoos-vouwdoos' ? t.pricePerPackage : t.pricePerPiece}
                  </span>
                  <div className="text-right">
                    {discountInfo.hasDiscount ? (
                      <>
                        <span className="text-lg text-lumora-dark/50 line-through block">
                          {formatPrice(basePrice)}
                        </span>
                        <span className="text-2xl font-bold text-lumora-green-500">
                          {formatPrice(discountedPrice)}
                        </span>
                        <span className="text-sm text-lumora-green-600 font-semibold block">
                          -{discountInfo.currentDiscount}% {t.discount}!
                        </span>
                      </>
                    ) : (
                      <span className="text-2xl font-bold text-lumora-dark">
                        {formatPrice(basePrice)}
                      </span>
                    )}
                  </div>
                </div>

                <div className="mb-4">
                  <label className="text-lumora-dark font-medium block mb-2">
                    {productSlug === 'transportdoos-vouwdoos' ? t.quantityPackages : t.quantity}
                  </label>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 flex items-center justify-center bg-lumora-green-500 text-white rounded-lg hover:bg-lumora-green-600 transition-colors font-bold text-xl"
                    >
                      −
                    </button>
                    <input
                      type="number"
                      min="1"
                      value={quantity}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (val === '') {
                          setQuantity(1);
                        } else {
                          const num = parseInt(val);
                          if (!isNaN(num) && num >= 1) {
                            setQuantity(num);
                          }
                        }
                      }}
                      onBlur={(e) => {
                        if (e.target.value === '' || parseInt(e.target.value) < 1) {
                          setQuantity(1);
                        }
                      }}
                      className="w-20 px-4 py-2 border-2 border-lumora-dark/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-lumora-green-500 focus:border-lumora-green-500 font-semibold text-lg text-center"
                    />
                    <button
                      type="button"
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 flex items-center justify-center bg-lumora-green-500 text-white rounded-lg hover:bg-lumora-green-600 transition-colors font-bold text-xl"
                    >
                      +
                    </button>
                  </div>
                  {productSlug === 'transportdoos-vouwdoos' && (
                    <p className="text-xs text-lumora-dark/60 mt-2 bg-lumora-cream/50 rounded-lg p-2 text-center">
                      ℹ️ {t.packageNote}
                    </p>
                  )}
                  {productSlug === 'paper-plug-tray-84' && (
                    <p className="text-xs text-lumora-dark/60 mt-2 bg-lumora-green-50 rounded-lg p-2 text-center border border-lumora-green-100">
                      📦 {t.trayBoxNote84}
                    </p>
                  )}
                  {productSlug === 'paper-plug-tray-104' && (
                    <p className="text-xs text-lumora-dark/60 mt-2 bg-lumora-green-50 rounded-lg p-2 text-center border border-lumora-green-100">
                      📦 {t.trayBoxNote104}
                    </p>
                  )}
                </div>

                {/* Korting Breakdown */}
                {discountInfo.hasDiscount && (
                  <div className="bg-lumora-green-50 rounded-xl p-4 mb-4 border border-lumora-green-200">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-lumora-dark/70">{t.subtotalNoDiscount}</span>
                      <span className="font-semibold text-lumora-dark/70 line-through">
                        {formatPrice(basePrice * quantity)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-lumora-green-600 font-semibold">
                        {t.volumeDiscountLabel} ({discountInfo.currentDiscount}%):
                      </span>
                      <span className="font-bold text-lumora-green-600">
                        -{formatPrice(totalDiscount)}
                      </span>
                    </div>
                  </div>
                )}

                <div className="flex justify-between items-center pt-4 border-t-2 border-lumora-dark/10">
                  <span className="text-xl font-display font-semibold text-lumora-dark">{t.total}</span>
                  <span className="text-3xl font-bold text-lumora-green-500">
                    {formatPrice(totalPrice)}
                  </span>
                </div>

                {productSlug === 'transportdoos-vouwdoos' && (
                  <p className="text-xs text-lumora-dark/60 mt-2 text-center">
                    = {quantity * 25} {locale === 'de' ? 'Stück' : locale === 'en' ? 'units' : 'stuks'} {locale === 'de' ? 'insgesamt' : locale === 'en' ? 'total' : 'totaal'}
                  </p>
                )}

                {/* Next Tier Tip */}
                {discountInfo.nextTier && (
                  <p className="text-xs text-lumora-dark/60 mt-3 text-center bg-lumora-cream/50 rounded-lg p-2">
                    💡 {t.orderText(discountInfo.nextTier.quantity, discountInfo.nextTier.discount)}
                  </p>
                )}
              </div>

              {/* Add to Cart Button */}
              <div className="space-y-4">
                {/* Success Message */}
                {showAddedMessage && (
                  <div className="bg-lumora-green-500 text-white px-4 py-3 rounded-xl flex items-center gap-2 animate-fade-in">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="font-semibold">{t.addedToCart}</span>
                  </div>
                )}

                <button
                  onClick={handleAddToCart}
                  disabled={addingToCart || product.availability !== 'in stock'}
                  className="w-full bg-lumora-green-500 text-white py-4 rounded-xl font-semibold text-lg hover:bg-lumora-green-600 transition-all duration-300 shadow-soft hover:shadow-soft-md disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  {addingToCart
                    ? (locale === 'de' ? 'Wird hinzugefügt...' : locale === 'en' ? 'Adding...' : 'Toevoegen...')
                    : product.availability !== 'in stock'
                    ? (locale === 'de' ? 'Nicht verfügbar' : locale === 'en' ? 'Not available' : 'Niet beschikbaar')
                    : t.addToCart}
                </button>

                {/* B2B / Zakelijk Bestellen Knop */}
                <div className="pt-4 border-t border-lumora-dark/10">
                  <Link
                    href={localizePathForLocale('/contact', locale)}
                    className="block w-full bg-gradient-to-r from-lumora-dark to-lumora-dark/90 text-white py-4 rounded-xl font-semibold text-lg hover:from-lumora-dark/90 hover:to-lumora-dark transition-all duration-300 shadow-soft hover:shadow-soft-md text-center"
                  >
                    {t.b2bButton}
                  </Link>
                  <p className="text-xs text-lumora-dark/60 mt-2 text-center">
                    {t.b2bText}
                  </p>
                </div>

                {/* Trust Bar */}
                <div className="bg-lumora-green-50 border border-lumora-green-200 rounded-xl p-3 mt-4">
                  <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs">
                    <span className="flex items-center gap-1 text-lumora-dark">
                      <span className="text-lumora-green-500">✓</span>
                      {locale === 'de' ? 'Gratis NL/BE/DE' : locale === 'en' ? 'Free NL/BE/DE' : 'Gratis NL/BE/DE'}
                    </span>
                    <span className="flex items-center gap-1 text-lumora-dark">
                      <span className="text-lumora-green-500">🚚</span>
                      {isNeemxPro
                        ? (locale === 'de' ? 'Versand am selben Tag' : locale === 'en' ? 'Same day shipping' : 'Dezelfde dag verzonden')
                        : (locale === 'de' ? 'Innerhalb 48 Std.' : locale === 'en' ? 'Within 48h' : 'Binnen 48 uur')
                      }
                    </span>
                    <span className="flex items-center gap-1 text-lumora-dark">
                      <span className="text-lumora-green-500">↩</span>
                      {locale === 'de' ? '14 Tage Rückgabe' : locale === 'en' ? '14 Days Return' : '14 dagen retour'}
                    </span>
                    <span className="flex items-center gap-1 text-lumora-dark">
                      <span className="text-lumora-green-500">🔒</span>
                      {locale === 'de' ? 'Sicher' : locale === 'en' ? 'Secure' : 'Veilig'}
                    </span>
                  </div>
                  {/* Return Policy Details for NEEMX PRO */}
                  {isNeemxPro && (
                    <div className="mt-2 pt-2 border-t border-lumora-green-200/50">
                      <p className="text-xs text-lumora-dark/70 text-center">
                        {locale === 'de'
                          ? '↩ Rückgabe nur bei ungeöffneten Flaschen. Versandkosten werden nach Prüfung erstattet.'
                          : locale === 'en'
                          ? '↩ Return only for unopened bottles. Shipping costs refunded after inspection.'
                          : '↩ Retour alleen bij ongeopende flesjes. Verzendkosten na controle terugbetaald.'
                        }
                      </p>
                    </div>
                  )}
                </div>

                {/* Help Section */}
                <div className="bg-lumora-cream/30 border border-lumora-dark/10 rounded-xl p-3 mt-3">
                  <p className="text-xs text-lumora-dark/70 text-center mb-2">
                    {locale === 'de' ? 'Fragen? Wir helfen gerne!' : locale === 'en' ? 'Questions? We\'re here to help!' : 'Vragen? We helpen je graag!'}
                  </p>
                  <div className="flex justify-center gap-2">
                    <a
                      href="https://wa.me/31638382564"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 bg-green-500 text-white px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-green-600 transition-colors"
                    >
                      <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                      WhatsApp
                    </a>
                    <a
                      href="mailto:info@lumorahorticulture.nl"
                      className="inline-flex items-center gap-1 bg-lumora-dark/10 text-lumora-dark px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-lumora-dark/20 transition-colors"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                      Email
                    </a>
                  </div>
                </div>

                <div className="text-center mt-4">
                  <p className="text-sm text-lumora-dark/60 mb-2">
                    {locale === 'de' ? 'Sicher bezahlen mit:' : locale === 'en' ? 'Secure payment with:' : 'Veilig betalen met:'}
                  </p>
                  <div className="flex justify-center items-center gap-2 text-xs text-lumora-dark/70 font-medium">
                    <span>iDEAL</span>
                    <span>•</span>
                    <span>Creditcard</span>
                    <span>•</span>
                    <span>Apple Pay</span>
                    <span>•</span>
                    <span>PayPal</span>
                  </div>
                  <p className="text-xs text-lumora-dark/50 mt-2">
                    {locale === 'de' ? 'Gesichert durch Mollie' : locale === 'en' ? 'Secured by Mollie' : 'Beveiligd door Mollie'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Mobile Add to Cart Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-lumora-dark/10 shadow-lg p-4 lg:hidden z-40">
        <div className="flex items-center justify-between gap-4 max-w-lg mx-auto">
          <div className="flex-1">
            <div className="text-xs text-lumora-dark/60">
              {locale === 'de' ? 'Gesamt' : locale === 'en' ? 'Total' : 'Totaal'}
            </div>
            <div className="text-xl font-bold text-lumora-green-500">
              {formatPrice(totalPrice)}
            </div>
            {discountInfo.hasDiscount && (
              <div className="text-xs text-lumora-green-600 font-medium">
                -{discountInfo.currentDiscount}% {locale === 'de' ? 'Rabatt' : locale === 'en' ? 'discount' : 'korting'}
              </div>
            )}
          </div>
          <button
            onClick={handleAddToCart}
            disabled={addingToCart || product.availability !== 'in stock'}
            className="flex-1 bg-lumora-green-500 text-white py-3 px-4 rounded-xl font-semibold hover:bg-lumora-green-600 transition-all duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            {addingToCart
              ? '...'
              : locale === 'de' ? 'In den Warenkorb' : locale === 'en' ? 'Add to Cart' : 'In Winkelwagen'}
          </button>
        </div>
      </div>

      {/* Spacer for sticky bar on mobile */}
      <div className="h-24 lg:hidden" />
    </div>
  );
}

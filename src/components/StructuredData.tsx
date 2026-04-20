import Script from 'next/script'

interface OrganizationSchemaProps {
  locale: string
}

export function OrganizationSchema({ locale }: OrganizationSchemaProps) {
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://lumorahorticulture.nl/#organization",
    "name": "Lumora Horticulture",
    "url": locale === 'nl' ? "https://lumorahorticulture.nl" : locale === 'de' ? "https://lumorahorticulture.de" : "https://lumorahorticulture.com",
    "logo": {
      "@type": "ImageObject",
      "url": "https://lumorahorticulture.nl/logo/lumura-horticulture-logo.jpeg",
      "width": "1200",
      "height": "630"
    },
    "description": locale === 'nl' 
      ? "B2B leverancier van steenwol pluggen, kweektrays en tuinbouw verpakkingen. Eigen productie voor professionele kwekers."
      : locale === 'de'
      ? "B2B-Lieferant von Steinwollsteckern, Anzuchtschalen und Gartenbauverpackungen. Eigene Produktion für professionelle Züchter."
      : "B2B supplier of rockwool plugs, growing trays and horticultural packaging. Own production for professional growers.",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "NL"
    },
    "sameAs": [
      "https://lumorahorticulture.nl",
      "https://lumorahorticulture.com",
      "https://lumorahorticulture.de"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "sales",
      "availableLanguage": ["Dutch", "English", "German"],
      "email": "info@lumorahorticulture.nl"
    }
  }

  return (
    <Script
      id="organization-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
      strategy="afterInteractive"
    />
  )
}

interface ProductSchemaProps {
  product: {
    name: string
    description: string
    image: string
    sku: string
    brand?: string
    price?: number
    lowPrice?: number
    highPrice?: number
  }
  locale: string
}

export function ProductSchema({ product, locale }: ProductSchemaProps) {
  // Use AggregateOffer if we have price range, otherwise use regular Offer
  const hasAggregateOffer = product.lowPrice && product.highPrice;

  const offerData = hasAggregateOffer ? {
    "@type": "AggregateOffer",
    "priceCurrency": "EUR",
    "lowPrice": product.lowPrice,
    "highPrice": product.highPrice,
    "availability": "https://schema.org/InStock",
    "url": typeof window !== 'undefined' ? window.location.href : '',
    "seller": {
      "@type": "Organization",
      "name": "Lumora Horticulture"
    }
  } : {
    "@type": "Offer",
    "priceCurrency": "EUR",
    "price": product.price || 0,
    "availability": "https://schema.org/InStock",
    "url": typeof window !== 'undefined' ? window.location.href : '',
    "priceValidUntil": new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
    "seller": {
      "@type": "Organization",
      "name": "Lumora Horticulture"
    }
  };

  const productData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "description": product.description,
    "image": product.image,
    "sku": product.sku,
    "brand": {
      "@type": "Organization",
      "name": product.brand || "Lumora Horticulture"
    },
    "manufacturer": {
      "@type": "Organization",
      "name": "Lumora Horticulture"
    },
    "offers": offerData
  }

  return (
    <Script
      id={`product-schema-${product.sku}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(productData) }}
      strategy="afterInteractive"
    />
  )
}

/**
 * Server-side product JSON-LD for the /shop/[slug] PDPs. Takes the Convex
 * product shape directly so we don't duplicate translation / price logic.
 * Runs as a plain <script> so Googlebot sees it without waiting for client JS.
 */
interface ShopProductSchemaProps {
  product: {
    _id: string
    slug: string
    name: string
    name_en?: string
    name_de?: string
    description?: string
    description_en?: string
    description_de?: string
    image_url?: string
    price?: number
    availability?: string
    brand?: string
    sku?: string
  }
  locale: string
  url: string // canonical absolute URL
  volumeTiers?: Array<{ minQty: number; discountPct: number }>
}

export function ShopProductSchema({ product, locale, url, volumeTiers }: ShopProductSchemaProps) {
  const name =
    locale === "en" && product.name_en ? product.name_en :
    locale === "de" && product.name_de ? product.name_de :
    product.name
  const description =
    locale === "en" && product.description_en ? product.description_en :
    locale === "de" && product.description_de ? product.description_de :
    product.description ?? name

  const base = product.price ?? 0
  const hasTiers = volumeTiers && volumeTiers.length > 0 && base > 0
  const lowPrice = hasTiers
    ? Math.round((base * (1 - Math.max(...volumeTiers!.map((t) => t.discountPct)) / 100)) * 100) / 100
    : undefined

  const offer = hasTiers
    ? {
        "@type": "AggregateOffer",
        priceCurrency: "EUR",
        lowPrice,
        highPrice: base,
        offerCount: volumeTiers!.length + 1,
        availability: product.availability === "out of stock"
          ? "https://schema.org/OutOfStock"
          : "https://schema.org/InStock",
        url,
        seller: { "@type": "Organization", name: "Lumora Horticulture" },
      }
    : {
        "@type": "Offer",
        priceCurrency: "EUR",
        price: base,
        availability: product.availability === "out of stock"
          ? "https://schema.org/OutOfStock"
          : "https://schema.org/InStock",
        url,
        priceValidUntil: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
        seller: { "@type": "Organization", name: "Lumora Horticulture" },
      }

  const data = {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    image: product.image_url && product.image_url.startsWith("http")
      ? product.image_url
      : `https://lumorahorticulture.com${product.image_url ?? ""}`,
    sku: product.sku ?? product.slug,
    brand: { "@type": "Brand", name: product.brand ?? "Lumora Horticulture" },
    manufacturer: { "@type": "Organization", name: "Lumora Horticulture" },
    offers: offer,
  }

  return (
    <script
      type="application/ld+json"
      // Rendered server-side so Googlebot sees the structured data on first byte.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

/**
 * Server-side breadcrumbs — same reason, rendered as plain <script> so it
 * doesn't need next/script's client lifecycle.
 */
export function ShopBreadcrumbSchema({
  items,
}: {
  items: Array<{ name: string; url: string }>
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.url,
    })),
  }
  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  )
}

interface BreadcrumbSchemaProps {
  items: Array<{
    name: string
    url: string
  }>
}

export function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  }

  return (
    <Script
      id="breadcrumb-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      strategy="afterInteractive"
    />
  )
}

interface LocalBusinessSchemaProps {
  locale: string
}

export function LocalBusinessSchema({ locale }: LocalBusinessSchemaProps) {
  const businessData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Lumora Horticulture",
    "description": locale === 'nl' 
      ? "Fabrikant en leverancier van professionele tuinbouw producten"
      : locale === 'de'
      ? "Hersteller und Lieferant von professionellen Gartenbau-Produkten"
      : "Manufacturer and supplier of professional horticultural products",
    "url": locale === 'nl' ? "https://lumorahorticulture.nl" : locale === 'de' ? "https://lumorahorticulture.de" : "https://lumorahorticulture.com",
    "telephone": "",
    "email": "info@lumorahorticulture.nl",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "NL"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "",
      "longitude": ""
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "08:00",
      "closes": "17:00"
    }
  }

  return (
    <Script
      id="local-business-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(businessData) }}
      strategy="afterInteractive"
    />
  )
}
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
  }
  locale: string
}

export function ProductSchema({ product, locale }: ProductSchemaProps) {
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
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "EUR",
      "availability": "https://schema.org/InStock",
      "priceRange": locale === 'nl' ? "Prijs op aanvraag" : locale === 'de' ? "Preis auf Anfrage" : "Price on request",
      "seller": {
        "@type": "Organization",
        "name": "Lumora Horticulture"
      }
    }
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
'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { localizePathForLocale } from '@/lib/url-localizations'

// Trust Badge Component
interface TrustBadgeProps {
  icon: string;
  title: string;
  description: string;
}

function TrustBadge({ icon, title, description }: TrustBadgeProps) {
  return (
    <div className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-lumora-cream/30">
      <div className="text-4xl mb-3">{icon}</div>
      <h3 className="font-semibold text-lumora-dark mb-1 text-sm">{title}</h3>
      <p className="text-xs text-lumora-dark/70">{description}</p>
    </div>
  )
}

// Testimonial Component
interface TestimonialProps {
  quote: string;
  author: string;
  company: string;
  rating: number;
}

function Testimonial({ quote, author, company, rating }: TestimonialProps) {
  return (
    <div className="bg-white p-8 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border border-lumora-cream/20">
      <div className="flex mb-4">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-5 h-5 ${i < rating ? 'text-lumora-gold' : 'text-gray-300'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <p className="text-lumora-dark/80 mb-4 italic">&ldquo;{quote}&rdquo;</p>
      <div>
        <p className="font-semibold text-lumora-dark">{author}</p>
        <p className="text-sm text-lumora-dark/60">{company}</p>
      </div>
    </div>
  )
}

// Stat Counter Component
interface StatCounterProps {
  number: string;
  label: string;
  suffix?: string;
}

function StatCounter({ number, label, suffix = '+' }: StatCounterProps) {
  return (
    <div className="text-center">
      <div className="text-4xl md:text-5xl font-bold text-white mb-2">
        {number}<span className="text-lumora-gold">{suffix}</span>
      </div>
      <p className="text-white/90 font-medium">{label}</p>
    </div>
  )
}

// FAQ Item Component
interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

function FAQItem({ question, answer, isOpen, onClick }: FAQItemProps) {
  return (
    <div className="border-b border-lumora-cream/30 last:border-0">
      <button
        onClick={onClick}
        className="w-full py-6 flex justify-between items-center text-left hover:text-lumora-green-500 transition-colors duration-200"
      >
        <span className="font-semibold text-lumora-dark pr-8">{question}</span>
        <svg
          className={`w-5 h-5 text-lumora-dark transition-transform duration-300 flex-shrink-0 ${
            isOpen ? 'transform rotate-180' : ''
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? 'max-h-96 pb-6' : 'max-h-0'
        }`}
      >
        <p className="text-lumora-dark/70 leading-relaxed">{answer}</p>
      </div>
    </div>
  )
}

export default function HomeClient({ locale, t }: { locale: string, t: any }) {
  const [isVisible, setIsVisible] = useState({
    hero: false,
    trust: false,
    benefits: false,
    products: false,
    social: false,
    faq: false,
  })

  const [openFAQ, setOpenFAQ] = useState<number | null>(null)

  useEffect(() => {
    setTimeout(() => {
      setIsVisible(prev => ({ ...prev, hero: true }))
    }, 100)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id
            setIsVisible(prev => ({ ...prev, [id.replace('-section', '')]: true }))
          }
        })
      },
      { threshold: 0.1 }
    )

    const sections = ['trust', 'benefits', 'products', 'social', 'faq'].map(id =>
      document.getElementById(`${id}-section`)
    ).filter(Boolean)

    sections.forEach(section => section && observer.observe(section))

    return () => {
      sections.forEach(section => section && observer.unobserve(section))
    }
  }, [])

  // Translations with fallbacks
  const translations = {
    hero: {
      badge: locale === 'nl' ? '15+ Jaar Betrouwbare Partner' : locale === 'de' ? '15+ Jahre Zuverlässiger Partner' : '15+ Years Trusted Partner',
      title: locale === 'nl' ? 'Professionele Paper Plug Trays' : locale === 'de' ? 'Professionelle Paper Plug Trays' : 'Professional Paper Plug Trays',
      subtitle: locale === 'nl' ? 'Voor de moderne teler die kiest voor kwaliteit' : locale === 'de' ? 'Für den modernen Züchter, der Qualität wählt' : 'For the modern grower who chooses quality',
      description: locale === 'nl'
        ? 'Ellepot FP 12+ technologie met 12+ maanden stabiliteit. Biologisch afbreekbaar, schimmelwerend en zonder transplantatieschok. Vertrouwd door 500+ professionele kwekers in Nederland, België en Duitsland.'
        : locale === 'de'
        ? 'Ellepot FP 12+ Technologie mit 12+ Monaten Stabilität. Biologisch abbaubar, pilzhemmend und ohne Transplantationsschock. Vertraut von 500+ professionellen Züchtern in den Niederlanden, Belgien und Deutschland.'
        : 'Ellepot FP 12+ technology with 12+ months stability. Biodegradable, fungicide-resistant and without transplant shock. Trusted by 500+ professional growers in the Netherlands, Belgium and Germany.',
      cta1: locale === 'nl' ? '🛒 Bekijk Producten' : locale === 'de' ? '🛒 Produkte Anzeigen' : '🛒 View Products',
      cta2: locale === 'nl' ? '📞 Neem Contact Op' : locale === 'de' ? '📞 Kontakt Aufnehmen' : '📞 Get in Touch',
    },
    trust: {
      title: locale === 'nl' ? 'Waarom 500+ Professionele Telers Voor Lumora Kiezen' : locale === 'de' ? 'Warum 500+ Professionelle Züchter Lumora Wählen' : 'Why 500+ Professional Growers Choose Lumora',
      badges: [
        {
          icon: '✓',
          title: locale === 'nl' ? 'EU Gecertificeerd' : locale === 'de' ? 'EU-Zertifiziert' : 'EU Certified',
          description: locale === 'nl' ? 'Voldoet aan alle EU normen' : locale === 'de' ? 'Erfüllt alle EU-Normen' : 'Meets all EU standards'
        },
        {
          icon: '🚚',
          title: locale === 'nl' ? '24-48u Levering' : locale === 'de' ? '24-48h Lieferung' : '24-48h Delivery',
          description: locale === 'nl' ? 'Snelle levering NL/BE/DE' : locale === 'de' ? 'Schnelle Lieferung NL/BE/DE' : 'Fast delivery NL/BE/DE'
        },
        {
          icon: '🏆',
          title: locale === 'nl' ? '15+ Jaar Ervaring' : locale === 'de' ? '15+ Jahre Erfahrung' : '15+ Years Experience',
          description: locale === 'nl' ? 'Specialist in propagatie' : locale === 'de' ? 'Spezialist für Vermehrung' : 'Propagation specialist'
        },
        {
          icon: '💚',
          title: locale === 'nl' ? '100% Duurzaam' : locale === 'de' ? '100% Nachhaltig' : '100% Sustainable',
          description: locale === 'nl' ? 'Biologisch afbreekbaar' : locale === 'de' ? 'Biologisch abbaubar' : 'Biodegradable'
        }
      ]
    },
    benefits: {
      title: locale === 'nl' ? 'B2B Voordelen Die Uw Bedrijf Verder Helpen' : locale === 'de' ? 'B2B-Vorteile für Ihr Unternehmen' : 'B2B Benefits That Grow Your Business',
      items: [
        {
          icon: '💰',
          title: locale === 'nl' ? '40% Arbeidsbesparing' : locale === 'de' ? '40% Arbeitseinsparung' : '40% Labor Savings',
          description: locale === 'nl' ? 'Minder tijd nodig voor oppotten en uitplanten dankzij geen transplantatieschok' : locale === 'de' ? 'Weniger Zeit für Umtopfen und Auspflanzen dank keinem Transplantationsschock' : 'Less time needed for potting and transplanting thanks to no transplant shock'
        },
        {
          icon: '📈',
          title: locale === 'nl' ? '95% Aanslag Garantie' : locale === 'de' ? '95% Anwachsgarantie' : '95% Strike Rate Guarantee',
          description: locale === 'nl' ? 'Hogere slagingspercentages door optimale wortelontwikkeling' : locale === 'de' ? 'Höhere Erfolgsraten durch optimale Wurzelentwicklung' : 'Higher success rates through optimal root development'
        },
        {
          icon: '🌱',
          title: locale === 'nl' ? 'Geen Groei-Stilstand' : locale === 'de' ? 'Kein Wachstumsstillstand' : 'No Growth Stagnation',
          description: locale === 'nl' ? 'Planten groeien door zonder transplantatieschok = snellere omlooptijd' : locale === 'de' ? 'Pflanzen wachsen ohne Transplantationsschock weiter = schnellere Umschlagszeit' : 'Plants continue growing without transplant shock = faster turnover'
        },
        {
          icon: '🛡️',
          title: locale === 'nl' ? 'Schimmel Preventie' : locale === 'de' ? 'Schimmelprävention' : 'Mold Prevention',
          description: locale === 'nl' ? 'Fungicide eigenschappen beschermen jonge planten tegen ziektes' : locale === 'de' ? 'Fungizide Eigenschaften schützen junge Pflanzen vor Krankheiten' : 'Fungicide properties protect young plants against diseases'
        }
      ]
    },
    stats: {
      title: locale === 'nl' ? 'Vertrouwd Door Professionals' : locale === 'de' ? 'Von Profis Vertraut' : 'Trusted By Professionals',
      counters: [
        { number: '15', label: locale === 'nl' ? 'Jaar Ervaring' : locale === 'de' ? 'Jahre Erfahrung' : 'Years Experience' },
        { number: '500', label: locale === 'nl' ? 'Professionele Klanten' : locale === 'de' ? 'Professionelle Kunden' : 'Professional Customers' },
        { number: '2M', label: locale === 'nl' ? 'Trays Geleverd/Jaar' : locale === 'de' ? 'Trays Geliefert/Jahr' : 'Trays Delivered/Year' },
        { number: '95', label: locale === 'nl' ? 'Klanttevredenheid' : locale === 'de' ? 'Kundenzufriedenheit' : 'Customer Satisfaction', suffix: '%' }
      ]
    },
    testimonials: {
      title: locale === 'nl' ? 'Wat Onze Klanten Zeggen' : locale === 'de' ? 'Was Unsere Kunden Sagen' : 'What Our Customers Say',
      items: [
        {
          quote: locale === 'nl'
            ? 'Sinds we overstapten naar Lumora Paper Plugs hebben we 40% minder arbeidstijd nodig voor het oppotten. De kwaliteit is consistent en de aanslag is uitstekend.'
            : locale === 'de'
            ? 'Seit wir auf Lumora Paper Plugs umgestiegen sind, benötigen wir 40% weniger Arbeitszeit für das Umtopfen. Die Qualität ist konstant und die Anwachsrate ist ausgezeichnet.'
            : 'Since switching to Lumora Paper Plugs, we need 40% less labor time for potting. Quality is consistent and strike rate is excellent.',
          author: 'Jan van der Berg',
          company: locale === 'nl' ? 'Tomaten Kwekerij Westland' : locale === 'de' ? 'Tomaten-Gärtnerei Westland' : 'Tomato Nursery Westland',
          rating: 5
        },
        {
          quote: locale === 'nl'
            ? 'De FP 12+ technologie is perfect voor onze lange teeltcyclus. Geen schimmel, geen problemen. Top kwaliteit voor een eerlijke prijs.'
            : locale === 'de'
            ? 'Die FP 12+ Technologie ist perfekt für unseren langen Kulturzyklus. Kein Schimmel, keine Probleme. Spitzenqualität zu einem fairen Preis.'
            : 'FP 12+ technology is perfect for our long growing cycle. No mold, no problems. Top quality for a fair price.',
          author: 'Klaus Müller',
          company: locale === 'nl' ? 'Baumschule Müller' : 'Baumschule Müller',
          rating: 5
        },
        {
          quote: locale === 'nl'
            ? 'Snelle levering, goede communicatie en een product dat doet wat het belooft. Lumora is een betrouwbare partner voor onze kwekerij.'
            : locale === 'de'
            ? 'Schnelle Lieferung, gute Kommunikation und ein Produkt, das hält was es verspricht. Lumora ist ein zuverlässiger Partner für unsere Gärtnerei.'
            : 'Fast delivery, good communication and a product that does what it promises. Lumora is a reliable partner for our nursery.',
          author: 'Marie Dubois',
          company: locale === 'nl' ? 'Serres Dubois België' : locale === 'de' ? 'Gewächshaus Dubois Belgien' : 'Greenhouse Dubois Belgium',
          rating: 5
        }
      ]
    },
    faq: {
      title: locale === 'nl' ? 'Veelgestelde Vragen' : locale === 'de' ? 'Häufig Gestellte Fragen' : 'Frequently Asked Questions',
      items: [
        {
          q: locale === 'nl' ? 'Wat is het verschil tussen Tray 84 en Tray 104?' : locale === 'de' ? 'Was ist der Unterschied zwischen Tray 84 und Tray 104?' : 'What is the difference between Tray 84 and Tray 104?',
          a: locale === 'nl'
            ? 'Tray 84 heeft 84 pluggen met diameter 3.5cm (ideaal voor grotere planten zoals tomaat, paprika), Tray 104 heeft 104 pluggen met diameter 3cm (perfect voor kleinere gewassen en kruiden). Beide trays zijn 52.5 x 30.5 cm.'
            : locale === 'de'
            ? 'Tray 84 hat 84 Stecker mit einem Durchmesser von 3,5 cm (ideal für größere Pflanzen wie Tomaten, Paprika), Tray 104 hat 104 Stecker mit einem Durchmesser von 3 cm (perfekt für kleinere Pflanzen und Kräuter). Beide Trays sind 52,5 x 30,5 cm.'
            : 'Tray 84 has 84 plugs with 3.5cm diameter (ideal for larger plants like tomatoes, peppers), Tray 104 has 104 plugs with 3cm diameter (perfect for smaller crops and herbs). Both trays are 52.5 x 30.5 cm.'
        },
        {
          q: locale === 'nl' ? 'Hoe lang duurt de levering?' : locale === 'de' ? 'Wie lange dauert die Lieferung?' : 'How long does delivery take?',
          a: locale === 'nl'
            ? 'Standaard levering in Nederland en België is 24-48 uur. Voor Duitsland rekenen we 2-3 werkdagen. Voor grotere bestellingen (pallets) kunnen we vaak dezelfde dag nog leveren binnen NL.'
            : locale === 'de'
            ? 'Die Standardlieferung in die Niederlande und Belgien dauert 24-48 Stunden. Für Deutschland rechnen wir mit 2-3 Werktagen. Für größere Bestellungen (Paletten) können wir oft noch am selben Tag innerhalb der NL liefern.'
            : 'Standard delivery in the Netherlands and Belgium is 24-48 hours. For Germany we estimate 2-3 working days. For larger orders (pallets) we can often deliver the same day within NL.'
        },
        {
          q: locale === 'nl' ? 'Zijn de paper plugs echt biologisch afbreekbaar?' : locale === 'de' ? 'Sind die Paper Plugs wirklich biologisch abbaubar?' : 'Are the paper plugs really biodegradable?',
          a: locale === 'nl'
            ? 'Ja, onze paper plugs zijn gemaakt van 100% natuurlijke houtvezels en zijn volledig biologisch afbreekbaar. Ze voldoen aan EU normen voor composteerbaarheid en kunnen direct in de volle grond worden geplant.'
            : locale === 'de'
            ? 'Ja, unsere Paper Plugs bestehen aus 100% natürlichen Holzfasern und sind vollständig biologisch abbaubar. Sie erfüllen die EU-Normen für Kompostierbarkeit und können direkt in den Boden gepflanzt werden.'
            : 'Yes, our paper plugs are made from 100% natural wood fibers and are fully biodegradable. They meet EU standards for compostability and can be planted directly into the soil.'
        },
        {
          q: locale === 'nl' ? 'Wat betekent FP 12+ technologie?' : locale === 'de' ? 'Was bedeutet FP 12+ Technologie?' : 'What does FP 12+ technology mean?',
          a: locale === 'nl'
            ? 'FP 12+ staat voor een stabiliteitsperiode van meer dan 12 maanden. Dit betekent dat de pluggen hun vorm en structuur behouden gedurende de hele teeltcyclus, zelfs bij lange teeltperiodes. Perfect voor planten die langer in de plug blijven.'
            : locale === 'de'
            ? 'FP 12+ steht für eine Stabilitätsperiode von mehr als 12 Monaten. Dies bedeutet, dass die Stecker ihre Form und Struktur während des gesamten Kulturzyklus beibehalten, auch bei langen Kulturperioden. Perfekt für Pflanzen, die länger im Stecker bleiben.'
            : 'FP 12+ stands for a stability period of more than 12 months. This means the plugs maintain their shape and structure throughout the entire growing cycle, even during long growing periods. Perfect for plants that stay in the plug longer.'
        }
      ]
    },
    cta: {
      title: locale === 'nl' ? 'Klaar Om Uw Teelt Te Optimaliseren?' : locale === 'de' ? 'Bereit, Ihren Anbau Zu Optimieren?' : 'Ready To Optimize Your Growing?',
      description: locale === 'nl'
        ? 'Sluit u aan bij 500+ professionele kwekers die al profiteren van Lumora Paper Plug Trays. Bestel vandaag nog of vraag een gratis offerte aan.'
        : locale === 'de'
        ? 'Schließen Sie sich 500+ professionellen Züchtern an, die bereits von Lumora Paper Plug Trays profitieren. Bestellen Sie noch heute oder fordern Sie ein kostenloses Angebot an.'
        : 'Join 500+ professional growers already benefiting from Lumora Paper Plug Trays. Order today or request a free quote.',
      button1: locale === 'nl' ? '🛒 Naar Webshop' : locale === 'de' ? '🛒 Zum Webshop' : '🛒 Go To Webshop',
      button2: locale === 'nl' ? '✉️ Offerte Aanvragen' : locale === 'de' ? '✉️ Angebot Anfordern' : '✉️ Request Quote'
    }
  }

  // New Product Banner translations
  const newProductBanner = {
    text: locale === 'nl' ? 'NIEUW: NEEMX PRO - 100% Natuurlijk Botanisch Olieconcentraat'
         : locale === 'de' ? 'NEU: NEEMX PRO - 100% Natürliches Botanisches Ölkonzentrat'
         : 'NEW: NEEMX PRO - 100% Natural Botanical Oil Concentrate',
    cta: locale === 'nl' ? 'Ontdek nu' : locale === 'de' ? 'Jetzt entdecken' : 'Discover now'
  }

  return (
    <div className="flex flex-col">
      {/* NEW PRODUCT BANNER */}
      <div className="bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-white py-3 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxjaXJjbGUgY3g9IjIwIiBjeT0iMjAiIHI9IjIiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIvPjwvZz48L3N2Zz4=')] opacity-30" />
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-4 flex-wrap relative">
          <div className="flex items-center gap-2">
            <span className="animate-pulse text-xl">✨</span>
            <span className="font-bold tracking-wide">{newProductBanner.text}</span>
            <span className="animate-pulse text-xl">✨</span>
          </div>
          <Link
            href={localizePathForLocale('/neemx-pro', locale)}
            className="bg-white text-amber-600 hover:bg-amber-50 px-4 py-1.5 rounded-full text-sm font-bold transition-all hover:scale-105 shadow-md"
          >
            {newProductBanner.cta} →
          </Link>
        </div>
      </div>

      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'Lumora Horticulture',
            description: translations.hero.description,
            url: 'https://lumorahorticulture.nl',
            logo: 'https://lumorahorticulture.nl/logo/lumura-horticulture-logo.jpeg',
            address: {
              '@type': 'PostalAddress',
              addressCountry: 'NL'
            },
            aggregateRating: {
              '@type': 'AggregateRating',
              ratingValue: '4.9',
              reviewCount: '500'
            }
          })
        }}
      />

      {/* Hero Section - Improved with stronger USP */}
      <section className="relative min-h-[90vh] flex items-center pt-24 pb-16 md:py-20 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-lumora-cream/40 to-white" />
          <div className="absolute top-0 right-0 w-full h-full bg-grain opacity-10" />
          <div className="absolute -top-10 -right-10 w-72 h-72 rounded-full bg-lumora-green-500/10 opacity-40 mix-blend-multiply" />
          <div className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full bg-lumora-gold/10 opacity-40 mix-blend-multiply" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-7xl mx-auto">
            <div className={`text-center mb-12 transition-all duration-1000 ${isVisible.hero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-lumora-green-500/10 border border-lumora-green-500/20 rounded-full px-4 py-2 mb-6">
                <span className="text-2xl">✓</span>
                <span className="text-sm font-semibold text-lumora-green-600">{translations.hero.badge}</span>
              </div>

              {/* Main Headline - SEO optimized */}
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                <span className="block text-lumora-dark">{translations.hero.title}</span>
                <span className="block text-lumora-green-500">{translations.hero.subtitle}</span>
              </h1>

              <p className="text-lg md:text-xl text-lumora-dark/80 mb-10 max-w-4xl mx-auto leading-relaxed">
                {translations.hero.description}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-wrap justify-center gap-4 mb-12">
                <Link
                  href={localizePathForLocale('/shop', locale)}
                  className="inline-flex items-center bg-lumora-green-500 hover:bg-lumora-green-600 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-lg"
                >
                  {translations.hero.cta1}
                  <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                <Link
                  href={localizePathForLocale('/contact', locale)}
                  className="inline-flex items-center bg-white hover:bg-lumora-cream border-2 border-lumora-dark/10 text-lumora-dark font-semibold px-8 py-4 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 text-lg"
                >
                  {translations.hero.cta2}
                  <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </Link>
              </div>

              {/* Product Images Showcase */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
                <div className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow">
                  <Image
                    src="/productAfbeeldingen/trays/tray84/tray84-pluggen-transparant1.webp"
                    alt="Tray 84"
                    width={200}
                    height={200}
                    className="w-full h-auto"
                  />
                  <p className="text-xs font-medium text-lumora-dark mt-2">Tray 84</p>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow">
                  <Image
                    src="/productAfbeeldingen/trays/tray104/tray104-pluggen-transparant.webp"
                    alt="Tray 104"
                    width={200}
                    height={200}
                    className="w-full h-auto"
                  />
                  <p className="text-xs font-medium text-lumora-dark mt-2">Tray 104</p>
                </div>
                <div className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow">
                  <Image
                    src="/productAfbeeldingen/verpakkingsdoos/lumorahorticulture-vouwdoos.jpg"
                    alt="Transportdoos"
                    width={200}
                    height={200}
                    className="w-full h-auto"
                  />
                  <p className="text-xs font-medium text-lumora-dark mt-2">{locale === 'nl' ? 'Transportdoos' : locale === 'de' ? 'Transportbox' : 'Transport Box'}</p>
                </div>
                <Link href={localizePathForLocale('/neemx-pro', locale)} className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow relative group">
                  <div className="absolute -top-2 -right-2 bg-amber-500 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow-md z-10">
                    {locale === 'nl' ? 'NIEUW' : locale === 'de' ? 'NEU' : 'NEW'}
                  </div>
                  <Image
                    src="/productAfbeeldingen/neemxpro/neemxpro-logo.png"
                    alt="NEEMX PRO"
                    width={200}
                    height={200}
                    className="w-full h-auto group-hover:scale-105 transition-transform"
                  />
                  <p className="text-xs font-medium text-lumora-dark mt-2">NEEMX PRO</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges Section */}
      <section id="trust-section" className={`py-16 bg-white border-y border-lumora-cream/30 transition-all duration-1000 ${isVisible.trust ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-lumora-dark mb-12">{translations.trust.title}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {translations.trust.badges.map((badge, index) => (
              <TrustBadge key={index} {...badge} />
            ))}
          </div>
        </div>
      </section>

      {/* Stats Counter Section */}
      <section className="py-16 bg-gradient-to-br from-lumora-dark to-lumora-dark-700 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">{translations.stats.title}</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {translations.stats.counters.map((stat, index) => (
              <StatCounter key={index} {...stat} />
            ))}
          </div>
        </div>
      </section>

      {/* B2B Benefits Section */}
      <section id="benefits-section" className={`py-20 bg-lumora-cream/20 transition-all duration-1000 ${isVisible.benefits ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-lumora-dark mb-4">{translations.benefits.title}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            {translations.benefits.items.map((benefit, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 text-center border border-lumora-cream/30">
                <div className="text-5xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-bold text-lumora-dark mb-3">{benefit.title}</h3>
                <p className="text-lumora-dark/70 leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section - Keep existing structure */}
      <section id="products-section" className={`py-20 bg-white transition-all duration-1000 ${isVisible.products ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-lumora-dark mb-4">{t.products?.title || 'Onze Producten'}</h2>
            <p className="text-xl text-lumora-dark/70 max-w-3xl mx-auto">{t.products?.subtitle || 'Paper Plug Trays met FP 12+ technologie'}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {/* Products - simplified cards */}
            <Link href={localizePathForLocale('/shop/paper-plug-tray-84', locale)} className="group">
              <div className="bg-white rounded-2xl shadow-md hover:shadow-xl overflow-hidden transition-all duration-300 border border-lumora-cream/30">
                <div className="relative h-48">
                  <Image
                    src="/productAfbeeldingen/trays/tray84/tray84-pluggen-transparant1.webp"
                    alt="Tray 84"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-lumora-dark mb-2">Paper Plug Tray 84</h3>
                  <p className="text-lumora-dark/70 text-sm mb-3">84 pluggen • 3.5cm</p>
                  <span className="text-lumora-green-500 font-semibold group-hover:underline text-sm">{t.products?.moreInfo || 'Meer info'} →</span>
                </div>
              </div>
            </Link>

            <Link href={localizePathForLocale('/shop/paper-plug-tray-104', locale)} className="group">
              <div className="bg-white rounded-2xl shadow-md hover:shadow-xl overflow-hidden transition-all duration-300 border border-lumora-cream/30">
                <div className="relative h-48">
                  <Image
                    src="/productAfbeeldingen/trays/tray104/tray104-pluggen-transparant.webp"
                    alt="Tray 104"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-lumora-dark mb-2">Paper Plug Tray 104</h3>
                  <p className="text-lumora-dark/70 text-sm mb-3">104 pluggen • 3cm</p>
                  <span className="text-lumora-green-500 font-semibold group-hover:underline text-sm">{t.products?.moreInfo || 'Meer info'} →</span>
                </div>
              </div>
            </Link>

            <Link href={localizePathForLocale('/products/ellepot-fp12', locale)} className="group">
              <div className="bg-white rounded-2xl shadow-md hover:shadow-xl overflow-hidden transition-all duration-300 border border-lumora-cream/30">
                <div className="relative h-48 bg-gradient-to-br from-lumora-green-500 to-lumora-dark flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                  <div className="text-center text-white">
                    <div className="text-4xl font-bold mb-1">FP 12+</div>
                    <div className="text-sm opacity-90">{locale === 'nl' ? 'Ellepot Paper Plugs' : locale === 'de' ? 'Ellepot Papiertöpfe' : 'Ellepot Paper Plugs'}</div>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-lumora-dark mb-2">Ellepot FP 12+</h3>
                  <p className="text-lumora-dark/70 text-sm mb-3">{locale === 'nl' ? '12+ maanden stabiliteit' : locale === 'de' ? '12+ Monate Stabilität' : '12+ months stability'}</p>
                  <span className="text-lumora-green-500 font-semibold group-hover:underline text-sm">{t.products?.moreInfo || 'Meer info'} →</span>
                </div>
              </div>
            </Link>

            {/* NEEMX PRO - NEW PRODUCT */}
            <Link href={localizePathForLocale('/neemx-pro', locale)} className="group">
              <div className="bg-white rounded-2xl shadow-md hover:shadow-xl overflow-hidden transition-all duration-300 border-2 border-amber-400 relative">
                {/* NEW Badge */}
                <div className="absolute top-3 right-3 z-10">
                  <span className="bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg animate-pulse">
                    {locale === 'nl' ? 'NIEUW' : locale === 'de' ? 'NEU' : 'NEW'}
                  </span>
                </div>
                <div className="relative h-48 bg-gradient-to-br from-amber-50 to-white flex items-center justify-center p-4">
                  <Image
                    src="/productAfbeeldingen/neemxpro/neemxpro-logo.png"
                    alt="NEEMX PRO"
                    width={160}
                    height={160}
                    className="object-contain group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="p-5 bg-gradient-to-r from-amber-50 to-white">
                  <h3 className="text-lg font-bold text-gray-800 mb-2">NEEMX PRO</h3>
                  <p className="text-gray-600 text-sm mb-3">{locale === 'nl' ? '100% Natuurlijk olieconcentraat' : locale === 'de' ? '100% Natürliches Ölkonzentrat' : '100% Natural oil concentrate'}</p>
                  <span className="text-amber-600 font-semibold group-hover:underline text-sm">{t.products?.moreInfo || 'Meer info'} →</span>
                </div>
              </div>
            </Link>
          </div>

          <div className="mt-12 text-center">
            <Link
              href={localizePathForLocale('/shop', locale)}
              className="inline-flex items-center bg-lumora-green-500 hover:bg-lumora-green-600 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {t.products?.viewAll || 'Bekijk alle producten'}
              <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Social Proof / Testimonials Section */}
      <section id="social-section" className={`py-20 bg-lumora-cream/20 transition-all duration-1000 ${isVisible.social ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-lumora-dark mb-4">{translations.testimonials.title}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {translations.testimonials.items.map((testimonial, index) => (
              <Testimonial key={index} {...testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq-section" className={`py-20 bg-white transition-all duration-1000 ${isVisible.faq ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-lumora-dark mb-4">{translations.faq.title}</h2>
          </div>
          <div className="bg-white rounded-2xl shadow-lg border border-lumora-cream/30 p-8">
            {translations.faq.items.map((faq, index) => (
              <FAQItem
                key={index}
                question={faq.q}
                answer={faq.a}
                isOpen={openFAQ === index}
                onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 bg-gradient-to-br from-lumora-green-500 to-lumora-green-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-4xl">
          <h2 className="text-4xl font-bold mb-6">{translations.cta.title}</h2>
          <p className="text-xl mb-10 opacity-90">{translations.cta.description}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href={localizePathForLocale('/shop', locale)}
              className="inline-flex items-center bg-white text-lumora-green-600 hover:bg-lumora-cream font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-lg"
            >
              {translations.cta.button1}
              <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link
              href={localizePathForLocale('/contact', locale)}
              className="inline-flex items-center bg-lumora-dark hover:bg-lumora-dark-700 text-white font-semibold px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-lg"
            >
              {translations.cta.button2}
              <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

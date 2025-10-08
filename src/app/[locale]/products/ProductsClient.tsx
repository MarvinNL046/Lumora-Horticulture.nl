'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Tab } from '@headlessui/react'
import { ProductSchema, BreadcrumbSchema } from '@/components/StructuredData'
import { localizePathForLocale } from '@/lib/url-localizations'

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as any }
  }
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    }
  }
}

// Product page component with modern styling
export default function ProductsClient({ t, locale }: { t: any, locale: string }) {
  // Breadcrumb data
  const breadcrumbItems = [
    {
      name: locale === 'nl' ? 'Home' : locale === 'de' ? 'Startseite' : 'Home',
      url: locale === 'nl' ? 'https://lumorahorticulture.nl' : locale === 'de' ? 'https://lumorahorticulture.de' : 'https://lumorahorticulture.com'
    },
    {
      name: locale === 'nl' ? 'Producten' : locale === 'de' ? 'Produkte' : 'Products',
      url: locale === 'nl' ? 'https://lumorahorticulture.nl/producten/' : locale === 'de' ? 'https://lumorahorticulture.de/produkte/' : 'https://lumorahorticulture.com/products/'
    }
  ]

  // Product data for structured data
  const products = [
    {
      name: "Tray-84st: PAPER PLUG TRAY 84",
      description: locale === 'nl'
        ? "Professionele TRANSPLANT 84 tray met 84 cellen voor efficiënte kweek van zaailingen. Direct van de fabrikant. Verpakking: 8 trays per doos."
        : locale === 'de'
        ? "Professionelles TRANSPLANT 84 Tablett mit 84 Zellen für effiziente Sämlingsanzucht. Direkt vom Hersteller. Verpackung: 8 Tabletts pro Karton."
        : "Professional TRANSPLANT 84 tray with 84 cells for efficient seedling cultivation. Direct from manufacturer. Packaging: 8 trays per box.",
      image: "https://lumorahorticulture.nl/productAfbeeldingen/trays/tray84/lumorahorticulture-tray84.jpg",
      sku: "TRAY-84"
    },
    {
      name: "Tray-104st: PAPER PLUG TRAY 104",
      description: locale === 'nl'
        ? "PAPER PLUG TRAY 104 met 104 cellen voor optimale wortelontwikkeling. Geschikt voor professionele glastuinbouw. Verpakking: 7 trays per doos."
        : locale === 'de'
        ? "PAPER PLUG TRAY 104 mit 104 Zellen für optimale Wurzelentwicklung. Geeignet für professionellen Gewächshausgartenbau. Verpackung: 7 Tabletts pro Karton."
        : "PAPER PLUG TRAY 104 with 104 cells for optimal root development. Suitable for professional greenhouse horticulture. Packaging: 7 trays per box.",
      image: "https://lumorahorticulture.nl/productAfbeeldingen/trays/tray104/lumorahorticulture-tray104.jpg",
      sku: "TRAY-104"
    },
    {
      name: locale === 'nl' ? "Transportdoos (Vouwdoos)" : locale === 'de' ? "Transportbox (Faltbox)" : "Transport Box (Folding Box)",
      description: locale === 'nl'
        ? "Duurzame vouwbare transportdoos voor veilig transport van tuinbouwproducten. Stapelbaar en efficiënt. Verkocht per 25 stuks (inclusief verzendkosten)."
        : locale === 'de'
        ? "Nachhaltige faltbare Transportbox für sicheren Transport von Gartenbauprodukten. Stapelbar und effizient. Verkauft pro 25 Stück (inklusive Versandkosten)."
        : "Sustainable folding transport box for safe transport of horticultural products. Stackable and efficient. Sold per 25 units (including shipping costs).",
      image: "https://lumorahorticulture.nl/productAfbeeldingen/verpakkingsdoos/lumorahorticulture-vouwdoos.jpg",
      sku: "TRANSPORT-BOX"
    },
    {
      name: locale === 'nl' ? "Inlegvellen 60x80cm LDPE" : locale === 'de' ? "Einlegeblätter 60x80cm LDPE" : "Insert Sheets 60x80cm LDPE",
      description: locale === 'nl'
        ? "Transparante inlegvellen voor extra bescherming en organisatie in transportdozen. Afmetingen: 60 x 80 cm, 20 mu LDPE kwaliteit. Verkocht per 500 stuks."
        : locale === 'de'
        ? "Transparente Einlegeblätter für zusätzlichen Schutz und Organisation in Transportboxen. Abmessungen: 60 x 80 cm, 20 mu LDPE Qualität. Verkauft pro 500 Stück."
        : "Transparent insert sheets for extra protection and organization in transport boxes. Dimensions: 60 x 80 cm, 20 mu LDPE quality. Sold per 500 units.",
      image: "https://lumorahorticulture.nl/productAfbeeldingen/inlegvellen/lumorahorticulture-inlegvellen-transparant.jpg",
      sku: "INSERT-SHEETS-LDPE"
    },
    {
      name: locale === 'nl' ? "Inlegvellen 40x60cm HDPE" : locale === 'de' ? "Einlegeblätter 40x60cm HDPE" : "Insert Sheets 40x60cm HDPE",
      description: locale === 'nl'
        ? "Transparante inlegvellen voor extra bescherming en organisatie in transportdozen. Afmetingen: 40 x 60 cm, HDPE kwaliteit. Verkocht per 500 stuks."
        : locale === 'de'
        ? "Transparente Einlegeblätter für zusätzlichen Schutz und Organisation in Transportboxen. Abmessungen: 40 x 60 cm, HDPE Qualität. Verkauft pro 500 Stück."
        : "Transparent insert sheets for extra protection and organization in transport boxes. Dimensions: 40 x 60 cm, HDPE quality. Sold per 500 units.",
      image: "https://lumorahorticulture.nl/productAfbeeldingen/inlegvellen/lumorahorticulture-inlegvellen-transparant.jpg",
      sku: "INSERT-SHEETS-HDPE"
    }
  ]

  return (
    <div className="relative min-h-screen">
      {/* Structured data */}
      <BreadcrumbSchema items={breadcrumbItems} />
      {products.map(product => (
        <ProductSchema key={product.sku} product={product} locale={locale} />
      ))}
      
      {/* Background elements - adjusted for better mobile display with new brand colors */}
      <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[20vh] bg-gradient-to-b from-lumora-cream/20 to-transparent"></div>
        <div className="absolute -top-20 right-0 md:-right-40 w-64 md:w-96 h-64 md:h-96 rounded-full bg-lumora-dark/10 mix-blend-multiply blur-3xl"></div>
        <div className="absolute top-1/3 left-0 md:-left-40 w-64 md:w-96 h-64 md:h-96 rounded-full bg-lumora-gold/10 mix-blend-multiply blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-full h-[20vh] bg-gradient-to-t from-lumora-dark/5 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
        <ProductsHeader t={t} />
        
        {/* Reduced vertical spacing on mobile */}
        <section className="mt-12 md:mt-24 space-y-16 md:space-y-32">
          {/* Benefits Grid before first product */}
          <motion.div 
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="mb-12"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Benefit 1 - Milieuvriendelijk */}
              <div className="bg-gradient-to-br from-lumora-green-50 to-lumora-cream/30 rounded-2xl p-6 border border-lumora-green-100 shadow-soft hover:shadow-md transition-all duration-300">
                <div className="flex flex-col items-center text-center">
                  <span className="text-4xl mb-4">🌱</span>
                  <h3 className="font-semibold text-lumora-dark text-lg mb-2">
                    {locale === 'nl' ? 'Milieuvriendelijk' : locale === 'de' ? 'Umweltfreundlich' : 'Eco-friendly'}
                  </h3>
                  <p className="text-lumora-dark/70 text-sm">
                    {locale === 'nl' 
                      ? 'Gemaakt van houtvezels uit hernieuwbare bronnen met minimale impact op het milieu' 
                      : locale === 'de'
                      ? 'Hergestellt aus Holzfasern aus erneuerbaren Quellen mit minimaler Umweltbelastung'
                      : 'Made from wood fibers from renewable sources with minimal environmental impact'}
                  </p>
                </div>
              </div>
              
              {/* Benefit 2 - 12+ Maanden Afbraaktijd */}
              <div className="bg-gradient-to-br from-lumora-green-50 to-lumora-cream/30 rounded-2xl p-6 border border-lumora-green-100 shadow-soft hover:shadow-md transition-all duration-300">
                <div className="flex flex-col items-center text-center">
                  <span className="text-4xl mb-4">⏰</span>
                  <h3 className="font-semibold text-lumora-dark text-lg mb-2">
                    {locale === 'nl' ? '12+ Maanden Afbraaktijd' : locale === 'de' ? '12+ Monate Abbauzeit' : '12+ Months Degradation Time'}
                  </h3>
                  <p className="text-lumora-dark/70 text-sm">
                    {locale === 'nl' 
                      ? 'Perfect voor gewassen met een langere productietijd voordat ze uitgeplant of opgepot worden' 
                      : locale === 'de'
                      ? 'Perfekt für Kulturen mit längerer Produktionszeit vor dem Auspflanzen oder Umtopfen'
                      : 'Perfect for crops with longer production time before transplanting or potting'}
                  </p>
                </div>
              </div>
              
              {/* Benefit 3 - Schimmelwerend */}
              <div className="bg-gradient-to-br from-lumora-green-50 to-lumora-cream/30 rounded-2xl p-6 border border-lumora-green-100 shadow-soft hover:shadow-md transition-all duration-300">
                <div className="flex flex-col items-center text-center">
                  <span className="text-4xl mb-4">🛡️</span>
                  <h3 className="font-semibold text-lumora-dark text-lg mb-2">
                    {locale === 'nl' ? 'Schimmelwerend' : locale === 'de' ? 'Pilzhemmend' : 'Fungicide Protection'}
                  </h3>
                  <p className="text-lumora-dark/70 text-sm">
                    {locale === 'nl' 
                      ? 'Voorzien van fungicide eigenschappen om jonge planten extra te beschermen tegen schimmels' 
                      : locale === 'de'
                      ? 'Mit pilzhemmenden Eigenschaften ausgestattet, um junge Pflanzen zusätzlich vor Pilzen zu schützen'
                      : 'Equipped with fungicide properties to provide extra protection against fungi for young plants'}
                  </p>
                </div>
              </div>
              
              {/* Benefit 4 - Geen Transplantatieschok */}
              <div className="bg-gradient-to-br from-lumora-green-50 to-lumora-cream/30 rounded-2xl p-6 border border-lumora-green-100 shadow-soft hover:shadow-md transition-all duration-300">
                <div className="flex flex-col items-center text-center">
                  <span className="text-4xl mb-4">🌿</span>
                  <h3 className="font-semibold text-lumora-dark text-lg mb-2">
                    {locale === 'nl' ? 'Geen Transplantatieschok' : locale === 'de' ? 'Kein Transplantationsschock' : 'No Transplant Shock'}
                  </h3>
                  <p className="text-lumora-dark/70 text-sm">
                    {locale === 'nl' 
                      ? 'Wortels groeien moeiteloos door het papier heen, waardoor planten sterk en gezond verder groeien zonder groeistilstand' 
                      : locale === 'de'
                      ? 'Wurzeln wachsen mühelos durch das Papier, wodurch Pflanzen stark und gesund ohne Wachstumsstillstand weiterwachsen'
                      : 'Roots grow effortlessly through the paper, allowing plants to continue growing strong and healthy without growth stagnation'}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <ProductDetail
            t={t}
            id="tray84"
            title="Tray-84st: Paperbus Steenwol Pluggen (84)"
            subtitle="Perfect voor professionele zaailingenkweek"
            description="Onze paperbus steenwol pluggen tray met 84 cellen is ontworpen voor professionele tuinbouwapplicaties. Elke plug is verpakt in Ellepot FP 12+ papier voor optimale wortelontwikkeling en gemakkelijk uitplanten zonder transplantatieschok. Verpakking: 8 trays per doos."
            imageSrc="/productAfbeeldingen/trays/tray84/lumorahorticulture-tray84.jpg"
            specs={[
              { label: "Plug diameter", value: "3.5 cm" },
              { label: "Afmetingen", value: "52.5 x 30.5 cm" },
              { label: "Hoogte", value: "4 cm" },
              { label: "CC", value: "48 cc" },
              { label: "Cellen per m²", value: "525" },
              { label: "Pluggen per tray", value: "84" },
              { label: "Trays per doos", value: "8" },
              { label: "Pluggen per doos", value: "672" },
              { label: "Dozen per pallet", value: "30" },
              { label: "Trays per pallet", value: "240" },
              { label: "Pluggen per pallet", value: "20.160" },
              { label: "Bodemgaten", value: "1 x 9" },
              { label: "l x b", value: "7 x 12" },
              { label: "Materiaal type", value: "PS" },
              { label: "Hengelslot", value: "Straight 25" }
            ]}
            locale={locale}
          />
          
          {/* Benefits Grid before second product */}
          <motion.div 
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="mb-12"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Benefit 1 - Milieuvriendelijk */}
              <div className="bg-gradient-to-br from-lumora-green-50 to-lumora-cream/30 rounded-2xl p-6 border border-lumora-green-100 shadow-soft hover:shadow-md transition-all duration-300">
                <div className="flex flex-col items-center text-center">
                  <span className="text-4xl mb-4">🌱</span>
                  <h3 className="font-semibold text-lumora-dark text-lg mb-2">
                    {locale === 'nl' ? 'Milieuvriendelijk' : locale === 'de' ? 'Umweltfreundlich' : 'Eco-friendly'}
                  </h3>
                  <p className="text-lumora-dark/70 text-sm">
                    {locale === 'nl' 
                      ? 'Gemaakt van houtvezels uit hernieuwbare bronnen met minimale impact op het milieu' 
                      : locale === 'de'
                      ? 'Hergestellt aus Holzfasern aus erneuerbaren Quellen mit minimaler Umweltbelastung'
                      : 'Made from wood fibers from renewable sources with minimal environmental impact'}
                  </p>
                </div>
              </div>
              
              {/* Benefit 2 - 12+ Maanden Afbraaktijd */}
              <div className="bg-gradient-to-br from-lumora-green-50 to-lumora-cream/30 rounded-2xl p-6 border border-lumora-green-100 shadow-soft hover:shadow-md transition-all duration-300">
                <div className="flex flex-col items-center text-center">
                  <span className="text-4xl mb-4">⏰</span>
                  <h3 className="font-semibold text-lumora-dark text-lg mb-2">
                    {locale === 'nl' ? '12+ Maanden Afbraaktijd' : locale === 'de' ? '12+ Monate Abbauzeit' : '12+ Months Degradation Time'}
                  </h3>
                  <p className="text-lumora-dark/70 text-sm">
                    {locale === 'nl' 
                      ? 'Perfect voor gewassen met een langere productietijd voordat ze uitgeplant of opgepot worden' 
                      : locale === 'de'
                      ? 'Perfekt für Kulturen mit längerer Produktionszeit vor dem Auspflanzen oder Umtopfen'
                      : 'Perfect for crops with longer production time before transplanting or potting'}
                  </p>
                </div>
              </div>
              
              {/* Benefit 3 - Schimmelwerend */}
              <div className="bg-gradient-to-br from-lumora-green-50 to-lumora-cream/30 rounded-2xl p-6 border border-lumora-green-100 shadow-soft hover:shadow-md transition-all duration-300">
                <div className="flex flex-col items-center text-center">
                  <span className="text-4xl mb-4">🛡️</span>
                  <h3 className="font-semibold text-lumora-dark text-lg mb-2">
                    {locale === 'nl' ? 'Schimmelwerend' : locale === 'de' ? 'Pilzhemmend' : 'Fungicide Protection'}
                  </h3>
                  <p className="text-lumora-dark/70 text-sm">
                    {locale === 'nl' 
                      ? 'Voorzien van fungicide eigenschappen om jonge planten extra te beschermen tegen schimmels' 
                      : locale === 'de'
                      ? 'Mit pilzhemmenden Eigenschaften ausgestattet, um junge Pflanzen zusätzlich vor Pilzen zu schützen'
                      : 'Equipped with fungicide properties to provide extra protection against fungi for young plants'}
                  </p>
                </div>
              </div>
              
              {/* Benefit 4 - Geen Transplantatieschok */}
              <div className="bg-gradient-to-br from-lumora-green-50 to-lumora-cream/30 rounded-2xl p-6 border border-lumora-green-100 shadow-soft hover:shadow-md transition-all duration-300">
                <div className="flex flex-col items-center text-center">
                  <span className="text-4xl mb-4">🌿</span>
                  <h3 className="font-semibold text-lumora-dark text-lg mb-2">
                    {locale === 'nl' ? 'Geen Transplantatieschok' : locale === 'de' ? 'Kein Transplantationsschock' : 'No Transplant Shock'}
                  </h3>
                  <p className="text-lumora-dark/70 text-sm">
                    {locale === 'nl' 
                      ? 'Wortels groeien moeiteloos door het papier heen, waardoor planten sterk en gezond verder groeien zonder groeistilstand' 
                      : locale === 'de'
                      ? 'Wurzeln wachsen mühelos durch das Papier, wodurch Pflanzen stark und gesund ohne Wachstumsstillstand weiterwachsen'
                      : 'Roots grow effortlessly through the paper, allowing plants to continue growing strong and healthy without growth stagnation'}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <ProductDetail
            t={t}
            id="tray104"
            title="Tray-104st: Paperbus Steenwol Pluggen (104)"
            subtitle="Geavanceerde trays voor optimale wortelontwikkeling"
            description="Onze paperbus steenwol pluggen tray met 104 cellen biedt uitstekende groeiomstandigheden voor zaailingen. Elke plug is verpakt in Ellepot FP 12+ papier voor optimale wortelontwikkeling en het succes bij het overplanten. Verpakking: 7 trays per doos."
            imageSrc="/productAfbeeldingen/trays/tray104/lumorahorticulture-tray104.jpg"
            imagePosition="right"
            specs={[
              { label: "Plug diameter", value: "3 cm" },
              { label: "Afmetingen", value: "52.5 x 30.5 cm" },
              { label: "Hoogte", value: "4 cm" },
              { label: "CC", value: "34 cc" },
              { label: "Cellen per m²", value: "649" },
              { label: "Pluggen per tray", value: "104" },
              { label: "Trays per doos", value: "7" },
              { label: "Pluggen per doos", value: "728" },
              { label: "Dozen per pallet", value: "30" },
              { label: "Trays per pallet", value: "210" },
              { label: "Pluggen per pallet", value: "21.840" },
              { label: "Bodemgaten", value: "1 x 11" },
              { label: "l x b", value: "8 x 13" },
              { label: "Materiaal type", value: "PS" }
            ]}
            locale={locale}
          />
          
          <ProductDetail
            t={t}
            id="transportbox"
            title={locale === 'nl' ? 'Transportdoos (Vouwdoos)' : locale === 'de' ? 'Transportbox (Faltbox)' : 'Transport Box (Folding Box)'}
            subtitle={locale === 'nl' ? 'Duurzame en efficiënte oplossing voor transport' : locale === 'de' ? 'Nachhaltige und effiziente Transportlösung' : 'Sustainable and efficient transport solution'}
            description={locale === 'nl'
              ? 'Onze transportdozen zijn ontworpen voor veilig en efficiënt transport van tuinbouwproducten. Het vouwontwerp zorgt voor gemakkelijke opslag en hantering, terwijl maximale bescherming wordt geboden. Verkocht per 25 stuks (inclusief verzendkosten).'
              : locale === 'de'
              ? 'Unsere Transportboxen sind für den sicheren und effizienten Transport von Gartenbauprodukten konzipiert. Das Faltdesign ermöglicht einfache Lagerung und Handhabung bei maximalem Schutz. Verkauft pro 25 Stück (inklusive Versandkosten).'
              : 'Our transport boxes are designed for safe and efficient transport of horticultural products. The folding design ensures easy storage and handling while providing maximum protection. Sold per 25 units (including shipping costs).'}
            imageSrc="/productAfbeeldingen/verpakkingsdoos/lumorahorticulture-vouwdoos.jpg"
            specs={[
              { label: locale === 'nl' ? 'Afmetingen' : locale === 'de' ? 'Abmessungen' : 'Dimensions', value: "557 x 322 x 180mm" },
              { label: locale === 'nl' ? 'Per verpakking' : locale === 'de' ? 'Pro Verpackung' : 'Per package', value: locale === 'nl' ? '25 stuks' : locale === 'de' ? '25 Stück' : '25 units' }
            ]}
            badges={locale === 'nl' ? ['Duurzaam', 'Efficiënt', 'Stapelbaar'] : locale === 'de' ? ['Nachhaltig', 'Effizient', 'Stapelbar'] : ['Sustainable', 'Efficient', 'Stackable']}
            locale={locale}
          />
          
          <ProductDetail
            t={t}
            id="insertsheets-ldpe"
            title="Inlegvellen 60x80cm LDPE"
            subtitle="Extra bescherming voor uw producten"
            description="Onze transparante inlegvellen zijn ontworpen om extra bescherming en organisatie te bieden in onze transportdozen. Ze helpen bij het scheiden van lagen producten en zorgen voor stabiliteit tijdens transport. Afmetingen: 60 x 80 cm, 20 mu LDPE kwaliteit. Verkocht per 500 stuks."
            imageSrc="/productAfbeeldingen/inlegvellen/lumorahorticulture-inlegvellen-transparant.jpg"
            imagePosition="right"
            showSpecs={false}
            badges={["Transparant", "Lichtgewicht", "LDPE"]}
            locale={locale}
          />

          <ProductDetail
            t={t}
            id="insertsheets-hdpe"
            title="Inlegvellen 40x60cm HDPE"
            subtitle="Duurzame en stevige bescherming"
            description="Onze HDPE inlegvellen bieden extra stevigheid en bescherming voor uw producten tijdens transport. Perfect voor zwaardere producten. Afmetingen: 40 x 60 cm, HDPE kwaliteit. Verkocht per 500 stuks."
            imageSrc="/productAfbeeldingen/inlegvellen/lumorahorticulture-inlegvellen-transparant.jpg"
            showSpecs={false}
            badges={["Transparant", "Stevig", "HDPE"]}
            locale={locale}
          />
          
          {/* Ellepot FP 12+ Product Link */}
          <motion.div 
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="bg-gradient-to-br from-lumora-green-50 to-lumora-cream/30 rounded-3xl p-8 md:p-12 text-center border border-lumora-green-100"
          >
            <h2 className="font-display text-2xl md:text-3xl font-bold text-lumora-dark mb-4">
              {locale === 'nl' ? 'Onze pluggen met Ellepot® FP 12+ Papier' : locale === 'de' ? 'Unsere Stecker mit Ellepot® FP 12+ Papier' : 'Our plugs with Ellepot® FP 12+ Paper'}
            </h2>
            <p className="text-lumora-dark/80 mb-6 max-w-2xl mx-auto">
              {locale === 'nl' 
                ? 'Alle Lumora paperbus steenwol pluggen zijn verpakt met milieuvriendelijk Ellepot FP 12+ papier. Ontdek de voordelen van deze duurzame verpakking.' 
                : locale === 'de'
                ? 'Alle Lumora Papiertopf-Steinwollstecker sind mit umweltfreundlichem Ellepot FP 12+ Papier umhüllt. Entdecken Sie die Vorteile dieser nachhaltigen Verpackung.'
                : 'All Lumora paper pot rockwool plugs are wrapped with eco-friendly Ellepot FP 12+ paper. Discover the benefits of this sustainable wrapping.'}
            </p>
            
            {/* Schimmelwerend highlight */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 mb-6 max-w-xl mx-auto border border-lumora-green-200 shadow-soft">
              <div className="flex items-start gap-4">
                <span className="text-3xl">🛡️</span>
                <div className="text-left">
                  <h3 className="font-semibold text-lumora-dark mb-2">
                    {locale === 'nl' ? 'Schimmelwerend' : locale === 'de' ? 'Pilzhemmend' : 'Fungicide Protection'}
                  </h3>
                  <p className="text-lumora-dark/70 text-sm">
                    {locale === 'nl' 
                      ? 'Voorzien van fungicide eigenschappen om jonge planten extra te beschermen tegen schimmels' 
                      : locale === 'de'
                      ? 'Mit pilzhemmenden Eigenschaften ausgestattet, um junge Pflanzen zusätzlich vor Pilzen zu schützen'
                      : 'Equipped with fungicide properties to provide extra protection against fungi for young plants'}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href={localizePathForLocale('/products/ellepot-fp12', locale || 'nl')}
                className="inline-flex items-center justify-center bg-lumora-dark text-lumora-cream 
                        hover:bg-lumora-dark-800 px-6 py-3 rounded-xl shadow-soft 
                        hover:shadow-soft-md transition-all duration-300 
                        font-medium group"
              >
                <span>{locale === 'nl' ? 'Meer informatie' : locale === 'de' ? 'Mehr Informationen' : 'Learn More'}</span>
                <svg className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
              
              <div className="inline-flex items-center gap-2">
                <a
                  href="/downloads/Lumora-Ellepot-FP12-Folder.pdf"
                  download="Lumora-Ellepot-FP12-Folder.pdf"
                  className="inline-flex items-center justify-center bg-lumora-green-600 text-white 
                          hover:bg-lumora-green-700 px-6 py-3 rounded-xl shadow-soft 
                          hover:shadow-soft-md transition-all duration-300 
                          font-medium group"
                >
                  <svg className="mr-2 w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span>{locale === 'nl' ? 'Download Lumora productfolder (PDF)' : locale === 'de' ? 'Lumora Produktbroschüre herunterladen (PDF)' : 'Download Lumora product brochure (PDF)'}</span>
                </a>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg animate-pulse">
                  NEW
                </span>
              </div>
            </div>
          </motion.div>
        </section>
        
        <ContactCTA t={t} locale={locale} />
      </div>
    </div>
  )
}

// Header component with animations
function ProductsHeader({ t }: { t: any }) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  })
  
  return (
    <motion.div 
      ref={ref}
      variants={fadeIn}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="max-w-4xl mx-auto text-center"
    >
      <motion.span 
        className="inline-block text-lumora-dark mb-3 font-medium px-4 py-1.5 rounded-full bg-lumora-cream/60 border border-lumora-cream"
      >
        {t.title?.tag}
      </motion.span>
      <h1 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-lumora-dark mb-4 md:mb-6 tracking-tight">
        {t.title?.main}
      </h1>
      <p className="text-lg md:text-xl text-lumora-dark/80 max-w-3xl mx-auto leading-relaxed">
        {t.title?.subtitle}
      </p>
    </motion.div>
  )
}

// TypeScript interfaces
interface ProductSpec {
  label: string;
  value: string;
}

interface ProductDetailProps {
  t: any;
  id: string;
  title: string;
  subtitle: string;
  description: string;
  imageSrc: string;
  imagePosition?: 'left' | 'right';
  specs?: ProductSpec[];
  showSpecs?: boolean;
  badges?: string[];
  locale?: string;
}

// Product detail component with animations
function ProductDetail({ 
  t,
  id, 
  title, 
  subtitle,
  description, 
  imageSrc, 
  imagePosition = "left",
  specs = [],
  showSpecs = true,
  badges = [],
  locale
}: ProductDetailProps) {
  const { ref, inView } = useInView({
    threshold: 0.1, // Reduced threshold for better mobile visibility
    triggerOnce: true
  })
  
  const [activeTab, setActiveTab] = useState(0)
  
  return (
    <motion.div 
      id={id}
      ref={ref}
      variants={fadeIn}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="scroll-mt-16 md:scroll-mt-24 w-full"
    >
      <div className={`flex flex-col ${imagePosition === "right" ? "lg:flex-row-reverse" : "lg:flex-row"} gap-6 md:gap-8 lg:gap-16 items-center`}>
        {/* Product Image - reduced height for mobile */}
        <div className="w-full lg:w-1/2">
          <div className="relative group">
            <div className="absolute inset-0 bg-lumora-green-500/10 rounded-3xl transform group-hover:scale-[1.03] transition-transform duration-500 -z-10"></div>
            <div className="relative h-[300px] sm:h-[350px] md:h-[400px] w-full overflow-hidden rounded-3xl shadow-soft-lg">
              <Image
                src={imageSrc}
                alt={title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority={id === "tray84"}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-3xl opacity-60"></div>
              
              {/* Product badges */}
              {badges.length > 0 && (
                <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 flex flex-wrap gap-2">
                  {badges.map((badge, index) => (
                    <span 
                      key={index}
                      className="inline-block text-white text-xs sm:text-sm font-medium px-2 sm:px-3 py-1 rounded-full bg-lumora-green-600/80 backdrop-blur-sm"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        
        {/* Product Info */}
        <div className="w-full lg:w-1/2">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="space-y-4 md:space-y-6"
          >
            <motion.div variants={fadeIn} className="space-y-2 md:space-y-3">
              <div className="inline-block text-lumora-dark font-medium px-3 py-1 md:px-4 md:py-1.5 rounded-full bg-lumora-cream/60 border border-lumora-cream text-sm">
                {t.detail?.qualityTag}
              </div>
              <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-lumora-dark tracking-tight">
                {title}
              </h2>
              <p className="text-lg md:text-xl font-medium text-lumora-gold">
                {subtitle}
              </p>
            </motion.div>
            
            <motion.p variants={fadeIn} className="text-lumora-dark/80 leading-relaxed text-sm md:text-base">
              {description}
            </motion.p>
            
            {showSpecs && (
              <motion.div variants={fadeIn} className="mt-4 md:mt-8">
                <Tab.Group onChange={setActiveTab}>
                  <Tab.List className="flex space-x-2 rounded-xl bg-lumora-green-50/50 p-1.5 mb-4 md:mb-6">
                    <Tab className={({ selected }) =>
                      `w-full rounded-lg py-2 md:py-2.5 text-xs md:text-sm font-medium leading-5 transition-all duration-300
                       ${selected
                        ? 'bg-white text-lumora-green-700 shadow-soft'
                        : 'text-gray-600 hover:bg-white/30 hover:text-lumora-green-600'
                      }`
                    }>
                      {t.detail?.tabs?.specs}
                    </Tab>
                    <Tab className={({ selected }) =>
                      `w-full rounded-lg py-2 md:py-2.5 text-xs md:text-sm font-medium leading-5 transition-all duration-300
                       ${selected
                        ? 'bg-white text-lumora-green-700 shadow-soft'
                        : 'text-gray-600 hover:bg-white/30 hover:text-lumora-green-600'
                      }`
                    }>
                      {t.detail?.tabs?.benefits}
                    </Tab>
                  </Tab.List>
                  <Tab.Panels>
                    <Tab.Panel>
                      <div className="overflow-hidden rounded-2xl bg-white shadow-soft">
                        <motion.table 
                          className="min-w-full"
                          variants={staggerContainer}
                          initial="hidden"
                          animate={activeTab === 0 ? "visible" : "hidden"}
                        >
                          <tbody>
                            {specs.map((spec, index) => (
                              <motion.tr 
                                key={index}
                                variants={fadeIn}
                                className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
                              >
                                <td className="py-2 px-3 md:py-3 md:px-6 text-xs md:text-sm font-medium text-gray-900 border-r border-gray-100">
                                  {spec.label}
                                </td>
                                <td className="py-2 px-3 md:py-3 md:px-6 text-xs md:text-sm text-gray-600">
                                  {spec.value}
                                </td>
                              </motion.tr>
                            ))}
                          </tbody>
                        </motion.table>
                      </div>
                    </Tab.Panel>
                    <Tab.Panel>
                      <div className="overflow-hidden rounded-2xl bg-white shadow-soft p-4 md:p-6">
                        <motion.ul 
                          className="space-y-3 md:space-y-4"
                          variants={staggerContainer}
                          initial="hidden"
                          animate={activeTab === 1 ? "visible" : "hidden"}
                        >
                          <motion.li variants={fadeIn} className="flex items-start">
                            <span className="flex-shrink-0 h-5 w-5 md:h-6 md:w-6 rounded-full bg-lumora-green-100 flex items-center justify-center text-lumora-green-600 mr-2 md:mr-3 mt-0.5">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3 md:w-4 md:h-4">
                                <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                              </svg>
                            </span>
                            <span className="text-sm md:text-base">{t.detail?.benefits?.durable}</span>
                          </motion.li>
                          <motion.li variants={fadeIn} className="flex items-start">
                            <span className="flex-shrink-0 h-5 w-5 md:h-6 md:w-6 rounded-full bg-lumora-green-100 flex items-center justify-center text-lumora-green-600 mr-2 md:mr-3 mt-0.5">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3 md:w-4 md:h-4">
                                <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                              </svg>
                            </span>
                            <span className="text-sm md:text-base">{t.detail?.benefits?.optimal}</span>
                          </motion.li>
                          <motion.li variants={fadeIn} className="flex items-start">
                            <span className="flex-shrink-0 h-5 w-5 md:h-6 md:w-6 rounded-full bg-lumora-green-100 flex items-center justify-center text-lumora-green-600 mr-2 md:mr-3 mt-0.5">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3 md:w-4 md:h-4">
                                <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                              </svg>
                            </span>
                            <span className="text-sm md:text-base">{t.detail?.benefits?.efficient}</span>
                          </motion.li>
                          <motion.li variants={fadeIn} className="flex items-start">
                            <span className="flex-shrink-0 h-5 w-5 md:h-6 md:w-6 rounded-full bg-lumora-green-100 flex items-center justify-center text-lumora-green-600 mr-2 md:mr-3 mt-0.5">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3 md:w-4 md:h-4">
                                <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                              </svg>
                            </span>
                            <span className="text-sm md:text-base">{t.detail?.benefits?.compatible}</span>
                          </motion.li>
                        </motion.ul>
                      </div>
                    </Tab.Panel>
                  </Tab.Panels>
                </Tab.Group>
              </motion.div>
            )}
            
            <motion.div variants={fadeIn} className="pt-4 md:pt-6 space-y-3">
              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href={`${localizePathForLocale('/shop', locale || 'nl')}`}
                  className="inline-flex items-center justify-center px-6 py-3 bg-lumora-green-600 text-white font-semibold rounded-lg hover:bg-lumora-green-700 transition-all duration-300 shadow-md hover:shadow-lg text-sm md:text-base"
                >
                  <svg
                    className="mr-2 w-5 h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  Bestel nu
                </Link>

                <Link
                  href={`${localizePathForLocale('/contact', locale || 'nl')}?product=${encodeURIComponent(title)}`}
                  className="inline-flex items-center justify-center px-6 py-3 text-white font-semibold bg-lumora-dark hover:bg-lumora-dark/90 transition-all duration-300 group text-sm md:text-base border-2 border-lumora-dark rounded-lg shadow-soft hover:shadow-soft-md"
                >
                  <span>🏢 Zakelijk Bestellen (B2B)</span>
                  <svg
                    className="ml-2 w-4 h-4 md:w-5 md:h-5 transition-transform duration-300 group-hover:translate-x-1"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>

              {/* Download PDF link for plugs products */}
              {(id === "tray84" || id === "tray104") && (
                <div>
                  <div className="inline-flex items-center gap-2">
                    <a
                      href="/downloads/Lumora-Ellepot-FP12-Folder.pdf"
                      download="Lumora-Ellepot-FP12-Folder.pdf"
                      className="inline-flex items-center text-lumora-green-600 font-medium hover:text-lumora-green-700 transition-all duration-300 group text-sm md:text-base"
                    >
                      <svg 
                        className="mr-2 w-4 h-4 md:w-5 md:h-5"
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <span>{locale === 'nl' ? 'Download Lumora productfolder (PDF)' : locale === 'de' ? 'Lumora Produktbroschüre herunterladen (PDF)' : 'Download Lumora product brochure (PDF)'}</span>
                    </a>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md animate-pulse">
                      NEW
                    </span>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

// Contact CTA with glass morphism effect
function ContactCTA({ t, locale }: { t: any, locale: string }) {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true
  })
  
  return (
    <motion.div 
      ref={ref}
      variants={fadeIn}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="mt-16 md:mt-32 relative rounded-3xl overflow-hidden"
    >
      {/* Background with radial gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-lumora-dark to-lumora-dark-800"></div>
        <div className="absolute inset-0 bg-grain opacity-5 mix-blend-overlay"></div>
        <div className="absolute -top-20 -right-20 w-64 md:w-96 h-64 md:h-96 rounded-full bg-lumora-dark/30 mix-blend-overlay blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-64 md:w-96 h-64 md:h-96 rounded-full bg-lumora-gold/10 mix-blend-overlay blur-3xl"></div>
      </div>
      
      <div className="glass-dark rounded-3xl p-6 sm:p-8 md:p-16 shadow-soft-lg backdrop-blur-md relative">
        <motion.div 
          className="max-w-3xl mx-auto text-center"
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <motion.h3 variants={fadeIn} className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white mb-4 md:mb-6">
            {t.cta?.title}
          </motion.h3>
          <motion.p variants={fadeIn} className="text-base sm:text-lg md:text-xl text-white/90 mb-6 md:mb-10 max-w-2xl mx-auto leading-relaxed">
            {t.cta?.description}
          </motion.p>
          <motion.div variants={fadeIn}>
            <Link
              href={localizePathForLocale('/contact', locale || 'nl')}
              className="inline-flex items-center justify-center bg-lumora-dark text-white
                      hover:bg-lumora-dark/90 px-6 sm:px-8 py-3 sm:py-4 rounded-xl shadow-soft
                      hover:shadow-soft-md transition-all duration-300
                      font-semibold text-base sm:text-lg group"
            >
              <span>🏢 Zakelijk Bestellen (B2B)</span>
              <svg className="ml-2 -mr-1 w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  )
}

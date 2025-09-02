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

// Ellepot FP 12+ product page component
export default function EllepotClient({ t, locale }: { t: any, locale: string }) {
  const { ref: headerRef, inView: headerInView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

  const { ref: productRef, inView: productInView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

  const { ref: featuresRef, inView: featuresInView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

  const [activeTab, setActiveTab] = useState(0)

  // Translations
  const translations = {
    nl: {
      breadcrumbHome: 'Home',
      breadcrumbProducts: 'Producten',
      breadcrumbEllepot: 'Ellepot FP 12+',
      tag: 'Milieuvriendelijk',
      title: 'Ellepot® FP 12+ Papier',
      subtitle: 'Het milieuvriendelijke omhulsel van onze paperbus steenwol pluggen',
      description: 'Al onze paperbus steenwol pluggen zijn verpakt met Ellepot FP 12+ papier – een duurzame en innovatieve oplossing voor het kweken van sterke en gezonde planten. Dit speciale papier is gemaakt van milieuvriendelijke houtvezels uit hernieuwbare bronnen, met een toevoeging van polyester voor versterking.',
      specTab: 'Specificaties',
      benefitsTab: 'Voordelen',
      features: {
        title: 'Waarom kiezen voor Ellepot FP 12+?',
        items: [
          {
            icon: '🌱',
            title: 'Milieuvriendelijk',
            description: 'Gemaakt van houtvezels uit hernieuwbare bronnen met minimale impact op het milieu'
          },
          {
            icon: '⏰',
            title: '12+ Maanden Afbraaktijd',
            description: 'Perfect voor gewassen met een langere productietijd voordat ze uitgeplant of opgepot worden'
          },
          {
            icon: '🛡️',
            title: 'Schimmelwerend',
            description: 'Voorzien van fungicide eigenschappen om jonge planten extra te beschermen tegen schimmels'
          },
          {
            icon: '🌿',
            title: 'Geen Transplantatieschok',
            description: 'Wortels groeien moeiteloos door het papier heen, waardoor planten sterk en gezond verder groeien zonder groeistilstand'
          }
        ]
      },
      whatIsTransplantShock: {
        title: 'Wat is transplantatieschok?',
        description: 'Bij het verplanten van jonge planten raken wortels vaak beschadigd. Hierdoor stopt de plant tijdelijk met groeien of ziet hij er slap uit – dit heet transplantatieschok. Met onze paperbus steenwol pluggen in Ellepot FP 12+ papier gebeurt dit niet: de wortels groeien moeiteloos door het papier heen, zodat je planten sterk en gezond verder groeien zonder groeistilstand.'
      },
      specs: [
        { label: 'Materiaal', value: 'Houtvezels + polyester versterking' },
        { label: 'Afbraaktijd', value: '12+ maanden' },
        { label: 'Toepassing', value: 'Langdurige teelt' },
        { label: 'Eigenschappen', value: 'Schimmelwerend (fungicide)' },
        { label: 'Milieukenmerk', value: 'Afbreekbaar & duurzaam' }
      ],
      benefits: [
        'Sterke wortelontwikkeling zonder beschadiging',
        'Langdurig bruikbaar voor uitgebreide teeltperiode',
        'Bescherming tegen schimmels en ziektes',
        'Gemakkelijk uit te planten zonder wortelschade',
        'Milieuvriendelijk en afbreekbaar materiaal'
      ],
      applications: {
        title: 'Onze pluggen zijn perfect geschikt voor',
        items: ['Groente- en kruidenkwekerijen', 'Sierteelt', 'Boomkwekerijen', 'Hobby- en moestuiniers']
      },
      cta: {
        title: 'Start met duurzaam kweken',
        description: 'Ontdek hoe onze Ellepot FP 12+ steenwolpluggen uw kweekproces kunnen verbeteren',
        button: 'Vraag informatie aan'
      }
    },
    en: {
      breadcrumbHome: 'Home',
      breadcrumbProducts: 'Products',
      breadcrumbEllepot: 'Ellepot FP 12+',
      tag: 'Eco-Friendly',
      title: 'Ellepot® FP 12+ Paper',
      subtitle: 'The eco-friendly wrapper of our paper pot rockwool plugs',
      description: 'All our paper pot rockwool plugs are wrapped with Ellepot FP 12+ paper – a sustainable and innovative solution for growing strong and healthy plants. This special paper is made from eco-friendly wood fibers from renewable sources, with polyester added for reinforcement.',
      specTab: 'Specifications',
      benefitsTab: 'Benefits',
      features: {
        title: 'Why choose Ellepot FP 12+?',
        items: [
          {
            icon: '🌱',
            title: 'Eco-Friendly',
            description: 'Made from wood fibers from renewable sources with minimal environmental impact'
          },
          {
            icon: '⏰',
            title: '12+ Months Degradation',
            description: 'Perfect for crops with longer production time before transplanting or potting'
          },
          {
            icon: '🛡️',
            title: 'Fungicide Protection',
            description: 'Equipped with fungicide properties to provide extra protection against fungi'
          },
          {
            icon: '🌿',
            title: 'No Transplant Shock',
            description: 'Roots grow effortlessly through the paper, allowing plants to continue growing strong and healthy without growth stagnation'
          }
        ]
      },
      whatIsTransplantShock: {
        title: 'What is transplant shock?',
        description: 'When transplanting young plants, roots often get damaged. This causes the plant to temporarily stop growing or appear limp – this is called transplant shock. With our paper pot rockwool plugs in Ellepot FP 12+ paper, this doesn\'t happen: roots grow effortlessly through the paper, so your plants continue to grow strong and healthy without growth stagnation.'
      },
      specs: [
        { label: 'Material', value: 'Wood fibers + polyester reinforcement' },
        { label: 'Degradation time', value: '12+ months' },
        { label: 'Application', value: 'Long-term cultivation' },
        { label: 'Properties', value: 'Fungicide protection' },
        { label: 'Environmental', value: 'Biodegradable & sustainable' }
      ],
      benefits: [
        'Strong root development without damage',
        'Long-lasting for extended growing periods',
        'Protection against fungi and diseases',
        'Easy transplanting without root damage',
        'Eco-friendly and biodegradable material'
      ],
      applications: {
        title: 'Our plugs are perfect for',
        items: ['Vegetable and herb nurseries', 'Ornamental cultivation', 'Tree nurseries', 'Hobby and vegetable gardeners']
      },
      cta: {
        title: 'Start sustainable growing',
        description: 'Discover how our Ellepot FP 12+ rockwool plugs can improve your growing process',
        button: 'Request information'
      }
    },
    de: {
      breadcrumbHome: 'Startseite',
      breadcrumbProducts: 'Produkte',
      breadcrumbEllepot: 'Ellepot FP 12+',
      tag: 'Umweltfreundlich',
      title: 'Ellepot® FP 12+ Papier',
      subtitle: 'Die umweltfreundliche Umhüllung unserer Papiertopf-Steinwollstecker',
      description: 'Alle unsere Papiertopf-Steinwollstecker sind mit Ellepot FP 12+ Papier umhüllt – eine nachhaltige und innovative Lösung für die Anzucht starker und gesunder Pflanzen. Dieses spezielle Papier besteht aus umweltfreundlichen Holzfasern aus erneuerbaren Quellen mit Polyesterverstärkung.',
      specTab: 'Spezifikationen',
      benefitsTab: 'Vorteile',
      features: {
        title: 'Warum Ellepot FP 12+ wählen?',
        items: [
          {
            icon: '🌱',
            title: 'Umweltfreundlich',
            description: 'Hergestellt aus Holzfasern aus erneuerbaren Quellen mit minimaler Umweltbelastung'
          },
          {
            icon: '⏰',
            title: '12+ Monate Abbauzeit',
            description: 'Perfekt für Kulturen mit längerer Produktionszeit vor dem Umpflanzen oder Umtopfen'
          },
          {
            icon: '🛡️',
            title: 'Pilzhemmend',
            description: 'Mit pilzhemmenden Eigenschaften ausgestattet, um junge Pflanzen zusätzlich vor Pilzen zu schützen'
          },
          {
            icon: '🌿',
            title: 'Kein Transplantationsschock',
            description: 'Wurzeln wachsen mühelos durch das Papier, sodass Pflanzen stark und gesund weiterwachsen ohne Wachstumsstillstand'
          }
        ]
      },
      whatIsTransplantShock: {
        title: 'Was ist Transplantationsschock?',
        description: 'Beim Umpflanzen junger Pflanzen werden Wurzeln oft beschädigt. Dadurch hört die Pflanze vorübergehend auf zu wachsen oder sieht schlaff aus – das nennt man Transplantationsschock. Mit unseren Papiertopf-Steinwollsteckern in Ellepot FP 12+ Papier passiert das nicht: Die Wurzeln wachsen mühelos durch das Papier, sodass Ihre Pflanzen stark und gesund weiterwachsen ohne Wachstumsstillstand.'
      },
      specs: [
        { label: 'Material', value: 'Holzfasern + Polyesterverstärkung' },
        { label: 'Abbauzeit', value: '12+ Monate' },
        { label: 'Anwendung', value: 'Langzeitkultur' },
        { label: 'Eigenschaften', value: 'Pilzhemmend (Fungizid)' },
        { label: 'Umwelt', value: 'Abbaubar & nachhaltig' }
      ],
      benefits: [
        'Starke Wurzelentwicklung ohne Beschädigung',
        'Langlebig für erweiterte Wachstumsperioden',
        'Schutz gegen Pilze und Krankheiten',
        'Einfaches Umpflanzen ohne Wurzelschäden',
        'Umweltfreundliches und abbaubares Material'
      ],
      applications: {
        title: 'Unsere Stecker sind perfekt geeignet für',
        items: ['Gemüse- und Kräutergärtnereien', 'Zierpflanzenbau', 'Baumschulen', 'Hobby- und Gemüsegärtner']
      },
      cta: {
        title: 'Beginnen Sie mit nachhaltigem Anbau',
        description: 'Entdecken Sie, wie unsere Ellepot FP 12+ Steinwollstecker Ihren Anbauprozess verbessern können',
        button: 'Informationen anfordern'
      }
    }
  }

  const content = translations[locale as keyof typeof translations] || translations.nl

  // Breadcrumb data
  const breadcrumbItems = [
    {
      name: content.breadcrumbHome,
      url: locale === 'nl' ? 'https://lumorahorticulture.nl' : locale === 'de' ? 'https://lumorahorticulture.de' : 'https://lumorahorticulture.com'
    },
    {
      name: content.breadcrumbProducts,
      url: locale === 'nl' ? 'https://lumorahorticulture.nl/producten/' : locale === 'de' ? 'https://lumorahorticulture.de/produkte/' : 'https://lumorahorticulture.com/products/'
    },
    {
      name: content.breadcrumbEllepot,
      url: locale === 'nl' ? 'https://lumorahorticulture.nl/producten/ellepot-fp12/' : locale === 'de' ? 'https://lumorahorticulture.de/produkte/ellepot-fp12/' : 'https://lumorahorticulture.com/products/ellepot-fp12/'
    }
  ]

  // Product data for structured data
  const productData = {
    name: content.title,
    description: content.description,
    image: "https://lumorahorticulture.nl/productAfbeeldingen/trays/tray84/lumorahorticulture-tray84.jpg",
    sku: "ELLEPOT-FP12"
  }

  return (
    <div className="relative min-h-screen">
      {/* Structured data */}
      <BreadcrumbSchema items={breadcrumbItems} />
      <ProductSchema product={productData} locale={locale} />
      
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[20vh] bg-gradient-to-b from-lumora-cream/20 to-transparent"></div>
        <div className="absolute -top-20 right-0 md:-right-40 w-64 md:w-96 h-64 md:h-96 rounded-full bg-lumora-dark/10 mix-blend-multiply blur-3xl"></div>
        <div className="absolute top-1/3 left-0 md:-left-40 w-64 md:w-96 h-64 md:h-96 rounded-full bg-lumora-gold/10 mix-blend-multiply blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-full h-[20vh] bg-gradient-to-t from-lumora-dark/5 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
        {/* Header */}
        <motion.div 
          ref={headerRef}
          variants={fadeIn}
          initial="hidden"
          animate={headerInView ? "visible" : "hidden"}
          className="max-w-4xl mx-auto text-center mb-12 md:mb-16"
        >
          <motion.span 
            className="inline-block text-lumora-dark mb-3 font-medium px-4 py-1.5 rounded-full bg-lumora-cream/60 border border-lumora-cream"
          >
            {content.tag}
          </motion.span>
          <h1 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-lumora-dark mb-4 md:mb-6 tracking-tight">
            {content.title}
          </h1>
          <p className="text-lg md:text-xl text-lumora-dark/80 max-w-3xl mx-auto leading-relaxed">
            {content.subtitle}
          </p>
        </motion.div>

        {/* Main product section */}
        <motion.div 
          ref={productRef}
          variants={fadeIn}
          initial="hidden"
          animate={productInView ? "visible" : "hidden"}
          className="mb-16 md:mb-24"
        >
          <div className="flex flex-col lg:flex-row gap-6 md:gap-8 lg:gap-16 items-center">
            {/* Product Image */}
            <div className="w-full lg:w-1/2">
              <div className="relative group">
                <div className="absolute inset-0 bg-lumora-green-500/10 rounded-3xl transform group-hover:scale-[1.03] transition-transform duration-500 -z-10"></div>
                <div className="relative h-[300px] sm:h-[350px] md:h-[400px] w-full overflow-hidden rounded-3xl shadow-soft-lg">
                  <Image
                    src="/productAfbeeldingen/trays/tray84/lumorahorticulture-tray84.jpg"
                    alt={content.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-3xl opacity-60"></div>
                  
                  {/* Product badges */}
                  <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 flex flex-wrap gap-2">
                    <span className="inline-block text-white text-xs sm:text-sm font-medium px-2 sm:px-3 py-1 rounded-full bg-lumora-green-600/80 backdrop-blur-sm">
                      {content.tag}
                    </span>
                    <span className="inline-block text-white text-xs sm:text-sm font-medium px-2 sm:px-3 py-1 rounded-full bg-lumora-green-600/80 backdrop-blur-sm">
                      12+ maanden
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Product Info */}
            <div className="w-full lg:w-1/2">
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate={productInView ? "visible" : "hidden"}
                className="space-y-4 md:space-y-6"
              >
                <motion.p variants={fadeIn} className="text-lumora-dark/80 leading-relaxed text-sm md:text-base">
                  {content.description}
                </motion.p>
                
                {/* Tabs */}
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
                        {content.specTab}
                      </Tab>
                      <Tab className={({ selected }) =>
                        `w-full rounded-lg py-2 md:py-2.5 text-xs md:text-sm font-medium leading-5 transition-all duration-300
                         ${selected
                          ? 'bg-white text-lumora-green-700 shadow-soft'
                          : 'text-gray-600 hover:bg-white/30 hover:text-lumora-green-600'
                        }`
                      }>
                        {content.benefitsTab}
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
                              {content.specs.map((spec, index) => (
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
                            {content.benefits.map((benefit, index) => (
                              <motion.li key={index} variants={fadeIn} className="flex items-start">
                                <span className="flex-shrink-0 h-5 w-5 md:h-6 md:w-6 rounded-full bg-lumora-green-100 flex items-center justify-center text-lumora-green-600 mr-2 md:mr-3 mt-0.5">
                                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3 md:w-4 md:h-4">
                                    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                                  </svg>
                                </span>
                                <span className="text-sm md:text-base">{benefit}</span>
                              </motion.li>
                            ))}
                          </motion.ul>
                        </div>
                      </Tab.Panel>
                    </Tab.Panels>
                  </Tab.Group>
                </motion.div>
                
                <motion.div variants={fadeIn} className="pt-4 md:pt-6 space-y-3">
                  <Link
                    href={`${localizePathForLocale('/contact', locale || 'nl')}?product=${encodeURIComponent(content.title)}`}
                    className="inline-flex items-center text-lumora-dark font-medium hover:text-lumora-gold transition-all duration-300 group text-sm md:text-base"
                  >
                    <span>{t.products?.detail?.requestQuote || 'Vraag offerte aan'}</span>
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
                  
                  {/* Download flyer link */}
                  <div>
                    <a
                      href="/downloads/ellepot-fp12-folder.pdf"
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
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Features section */}
        <motion.div 
          ref={featuresRef}
          variants={fadeIn}
          initial="hidden"
          animate={featuresInView ? "visible" : "hidden"}
          className="mb-16 md:mb-24"
        >
          <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-lumora-dark mb-8 md:mb-12 text-center">
            {content.features.title}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {content.features.items.map((feature, index) => (
              <motion.div
                key={index}
                variants={fadeIn}
                className="bg-white rounded-2xl shadow-soft p-6 md:p-8 hover:shadow-soft-md transition-shadow duration-300"
              >
                <div className="flex items-start">
                  <div className="text-3xl md:text-4xl mr-4 md:mr-6">
                    {feature.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg md:text-xl text-lumora-dark mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm md:text-base text-lumora-dark/70 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* What is transplant shock section */}
        <motion.div 
          variants={fadeIn}
          initial="hidden"
          animate={featuresInView ? "visible" : "hidden"}
          className="mb-16 md:mb-24 bg-lumora-cream/20 rounded-3xl p-6 md:p-10"
        >
          <h3 className="font-display text-xl md:text-2xl font-bold text-lumora-dark mb-4">
            {content.whatIsTransplantShock.title}
          </h3>
          <p className="text-sm md:text-base text-lumora-dark/80 leading-relaxed">
            {content.whatIsTransplantShock.description}
          </p>
        </motion.div>

        {/* Applications section */}
        <motion.div 
          variants={fadeIn}
          initial="hidden"
          animate={featuresInView ? "visible" : "hidden"}
          className="mb-16 md:mb-24"
        >
          <h3 className="font-display text-xl md:text-2xl font-bold text-lumora-dark mb-6 text-center">
            {content.applications.title}
          </h3>
          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            {content.applications.items.map((item, index) => (
              <span 
                key={index}
                className="inline-block text-lumora-dark font-medium px-4 py-2 rounded-full bg-lumora-green-50 border border-lumora-green-100"
              >
                {item}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Contact CTA */}
        <motion.div 
          variants={fadeIn}
          initial="hidden"
          animate={featuresInView ? "visible" : "hidden"}
          className="relative rounded-3xl overflow-hidden"
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
              animate={featuresInView ? "visible" : "hidden"}
            >
              <motion.h3 variants={fadeIn} className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white mb-4 md:mb-6">
                {content.cta.title}
              </motion.h3>
              <motion.p variants={fadeIn} className="text-base sm:text-lg md:text-xl text-white/90 mb-6 md:mb-10 max-w-2xl mx-auto leading-relaxed">
                {content.cta.description}
              </motion.p>
              <motion.div variants={fadeIn}>
                <Link 
                  href={localizePathForLocale('/contact', locale || 'nl')}
                  className="inline-flex items-center justify-center bg-lumora-cream text-lumora-dark 
                          hover:bg-lumora-cream/90 px-6 sm:px-8 py-3 sm:py-4 rounded-xl shadow-soft 
                          hover:shadow-soft-md transition-all duration-300 
                          font-medium text-base sm:text-lg group"
                >
                  <span>{content.cta.button}</span>
                  <svg className="ml-2 -mr-1 w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-300 group-hover:translate-x-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </Link>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
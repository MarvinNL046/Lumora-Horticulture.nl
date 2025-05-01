'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Tab } from '@headlessui/react'

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
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
  return (
    <div className="relative min-h-screen">
      {/* Background elements - adjusted for better mobile display */}
      <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[20vh] bg-gradient-to-b from-lumora-green-50/30 to-transparent"></div>
        <div className="absolute -top-20 right-0 md:-right-40 w-64 md:w-96 h-64 md:h-96 rounded-full bg-lumora-green-100/20 mix-blend-multiply blur-3xl"></div>
        <div className="absolute top-1/3 left-0 md:-left-40 w-64 md:w-96 h-64 md:h-96 rounded-full bg-lumora-gold-100/20 mix-blend-multiply blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-full h-[20vh] bg-gradient-to-t from-lumora-gold-50/30 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
        <ProductsHeader t={t} />
        
        {/* Reduced vertical spacing on mobile */}
        <section className="mt-12 md:mt-24 space-y-16 md:space-y-32">
          <ProductDetail
            t={t}
            id="tray84"
            title="Tray-84st: PAPER PLUG TRAY 84"
            subtitle="Perfect voor professionele zaailingenkweek"
            description="Onze TRANSPLANT 84 tray is ontworpen voor professionele tuinbouwapplicaties, met 84 cellen voor efficiënte kweek van zaailingen. De precieze afstand en afmetingen zorgen voor optimale groeiomstandigheden."
            imageSrc="/public/productAfbeeldingen/trays/tray84/lumorahorticulture-tray84.jpg"
            specs={[
              { label: "Plug diameter", value: "3.5 cm" },
              { label: "Afmetingen", value: "52.5 x 30.5 cm" },
              { label: "Hoogte", value: "3.4 cm" },
              { label: "CC", value: "48 cc" },
              { label: "Cellen per m²", value: "525" },
              { label: "Pallet aantal", value: "1680" },
              { label: "Bodemgaten", value: "1 x 9" },
              { label: "l x b", value: "7 x 12" },
              { label: "Materiaal type", value: "PS" },
              { label: "Hengelslot", value: "Straight 25" }
            ]}
            locale={locale}
          />
          
          <ProductDetail
            t={t}
            id="tray104"
            title="Tray-104st: PAPER PLUG TRAY 104"
            subtitle="Geavanceerde trays voor optimale wortelontwikkeling"
            description="De PAPER PLUG TRAY 104 biedt uitstekende groeiomstandigheden met 104 cellen voor zaailingen. De speciaal ontworpen paper plug-technologie verbetert de wortelontwikkeling en het succes bij het overplanten."
            imageSrc="/public/productAfbeeldingen/trays/tray104/lumorahorticulture-tray104.jpg"
            imagePosition="right"
            specs={[
              { label: "Plug diameter", value: "3 cm" },
              { label: "Afmetingen", value: "52.5 x 30.5 cm" },
              { label: "Hoogte", value: "3.5 cm" },
              { label: "CC", value: "34 cc" },
              { label: "Cellen per m²", value: "649" },
              { label: "Pallet aantal", value: "1400" },
              { label: "Bodemgaten", value: "1 x 11" },
              { label: "l x b", value: "8 x 13" },
              { label: "Materiaal type", value: "PS" }
            ]}
            locale={locale}
          />
          
          <ProductDetail
            t={t}
            id="transportbox"
            title="Transportdoos (Vouwdoos)"
            subtitle="Duurzame en efficiënte oplossing voor transport"
            description="Onze transportdozen zijn ontworpen voor veilig en efficiënt transport van tuinbouwproducten. Het vouwontwerp zorgt voor gemakkelijke opslag en hantering, terwijl maximale bescherming wordt geboden."
            imageSrc="/public/productAfbeeldingen/verpakkingsdoos/lumorahorticulture-vouwdoos.jpg"
            specs={[
              { label: "Afmetingen", value: "557 x 322 x 180mm" }
            ]}
            badges={["Duurzaam", "Efficiënt", "Stapelbaar"]}
            locale={locale}
          />
          
          <ProductDetail
            t={t}
            id="insertsheets"
            title="Inlegvellen"
            subtitle="Extra bescherming voor uw producten"
            description="Onze transparante inlegvellen zijn ontworpen om extra bescherming en organisatie te bieden in onze transportdozen. Ze helpen bij het scheiden van lagen producten en zorgen voor stabiliteit tijdens transport."
            imageSrc="/public/productAfbeeldingen/inlegvellen/lumorahorticulture-inlegvellen-transparant.jpg"
            imagePosition="right"
            showSpecs={false}
            badges={["Transparant", "Lichtgewicht", "Compatibel"]}
            locale={locale}
          />
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
        className="inline-block text-lumora-green-600 mb-3 font-medium px-4 py-1.5 rounded-full bg-lumora-green-50 border border-lumora-green-100"
      >
        {t.title?.tag}
      </motion.span>
      <h1 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4 md:mb-6 tracking-tight">
        {t.title?.main}
      </h1>
      <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
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
              <div className="inline-block text-lumora-green-600 font-medium px-3 py-1 md:px-4 md:py-1.5 rounded-full bg-lumora-green-50 border border-lumora-green-100 text-sm">
                {t.detail?.qualityTag}
              </div>
              <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight">
                {title}
              </h2>
              <p className="text-lg md:text-xl font-medium text-lumora-gold-700">
                {subtitle}
              </p>
            </motion.div>
            
            <motion.p variants={fadeIn} className="text-gray-600 leading-relaxed text-sm md:text-base">
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
            
            <motion.div variants={fadeIn} className="pt-4 md:pt-6">
              <Link
                href={`/${locale}/contact?product=${encodeURIComponent(title)}`}
                className="inline-flex items-center text-lumora-green-600 font-medium hover:text-lumora-green-700 transition-all duration-300 group text-sm md:text-base"
              >
                <span>{t.detail?.requestQuote}</span>
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
        <div className="absolute inset-0 bg-gradient-to-br from-lumora-green-600 to-lumora-green-800"></div>
        <div className="absolute inset-0 bg-grain opacity-5 mix-blend-overlay"></div>
        <div className="absolute -top-20 -right-20 w-64 md:w-96 h-64 md:h-96 rounded-full bg-lumora-green-500/30 mix-blend-overlay blur-3xl"></div>
        <div className="absolute -bottom-20 -left-20 w-64 md:w-96 h-64 md:h-96 rounded-full bg-lumora-green-400/20 mix-blend-overlay blur-3xl"></div>
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
              href={`/${locale}/contact`}
              className="inline-flex items-center justify-center bg-white text-lumora-green-700 
                      hover:bg-lumora-green-50 px-6 sm:px-8 py-3 sm:py-4 rounded-xl shadow-soft 
                      hover:shadow-soft-md transition-all duration-300 
                      font-medium text-base sm:text-lg group"
            >
              <span>{t.cta?.button}</span>
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

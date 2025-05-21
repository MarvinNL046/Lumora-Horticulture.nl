'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'

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

// ApplicationSection interface
interface ApplicationSectionProps {
  id: string;
  title: string;
  description: string;
  icon: string;
  benefits: string[];
  examples: string[];
  imagePosition?: 'left' | 'right';
}

// Applications client component
export default function ApplicationsClient({ t, locale }: { t: any, locale: string }) {
  return (
    <div className="relative min-h-screen">
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[20vh] bg-gradient-to-b from-lumora-cream/20 to-transparent"></div>
        <div className="absolute -top-20 right-0 md:-right-40 w-64 md:w-96 h-64 md:h-96 rounded-full bg-lumora-dark/10 mix-blend-multiply blur-3xl"></div>
        <div className="absolute top-1/3 left-0 md:-left-40 w-64 md:w-96 h-64 md:h-96 rounded-full bg-lumora-green-200/20 mix-blend-multiply blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-full h-[20vh] bg-gradient-to-t from-lumora-dark/5 to-transparent"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
        <ApplicationsHeader t={t} />
        
        <section className="mt-12 md:mt-24 space-y-24 md:space-y-32">
          <ApplicationSection
            id="vegetables"
            title={t?.items?.vegetables?.title || "Vegetable Plant Cultivation"}
            description={t?.items?.vegetables?.description || "Perfect for growing bell peppers, tomatoes, eggplants, and cucumbers"}
            icon="🌿"
            benefits={[
              "Optimized cell size for vegetable seedlings",
              "Perfect root development for transplanting",
              "Uniform growth for consistent crop results",
              "Compatible with automated transplanting systems"
            ]}
            examples={[
              "Bell peppers",
              "Tomatoes",
              "Eggplants",
              "Cucumbers",
              "Lettuce"
            ]}
          />
          
          <ApplicationSection
            id="ornamental"
            title={t?.items?.ornamental?.title || "Ornamental & Perennial Plants"}
            description={t?.items?.ornamental?.description || "Ideal for gerbera, chrysanthemum, lavender, and other ornamental crops"}
            icon="🌼"
            benefits={[
              "Consistent quality for ornamental production",
              "Strong root development for healthier plants",
              "Suitable for a wide range of ornamental varieties",
              "Reduced transplant shock"
            ]}
            examples={[
              "Gerbera",
              "Chrysanthemum",
              "Lavender",
              "Ornamental grasses",
              "Perennial flowers"
            ]}
            imagePosition="right"
          />
          
          <ApplicationSection
            id="herbs"
            title={t?.items?.herbs?.title || "Herbs & Microgreens"}
            description={t?.items?.herbs?.description || "Excellent for basil, parsley, oregano, and other herbs"}
            icon="🌿"
            benefits={[
              "Optimal moisture retention for delicate herbs",
              "Perfect for small-scale and commercial herb production",
              "Consistent growth for predictable harvests",
              "Suitable for diverse herb varieties"
            ]}
            examples={[
              "Basil",
              "Parsley",
              "Oregano",
              "Microgreens",
              "Cilantro"
            ]}
          />
          
          <ApplicationSection
            id="grafting"
            title={t?.items?.grafting?.title || "Grafting Plugs for Rootstocks"}
            description={t?.items?.grafting?.description || "Specially designed for grafting tomato and pepper plants"}
            icon="🌱"
            benefits={[
              "Perfect dimensions for grafting applications",
              "Ensures strong union between rootstock and scion",
              "Improves success rate of grafting operations",
              "Compatible with most grafting techniques"
            ]}
            examples={[
              "Tomato rootstocks",
              "Pepper rootstocks",
              "Cucumber rootstocks",
              "Melon rootstocks",
              "Specialty crops"
            ]}
            imagePosition="right"
          />
          
          <ApplicationSection
            id="vertical"
            title={t?.items?.vertical?.title || "Vertical Farming & Hydroponics"}
            description={t?.items?.vertical?.description || "Perfect for modern cultivation systems and vertical agriculture"}
            icon="🌾"
            benefits={[
              "Compatible with modern hydroponics systems",
              "Stackable design for vertical farming applications",
              "Promotes healthy plant development in soilless environments",
              "Durable material suitable for reuse in hydroponic systems"
            ]}
            examples={[
              "LED vertical farms",
              "NFT hydroponic systems",
              "DWC hydroponic systems",
              "Urban farming applications",
              "Container farming"
            ]}
          />
        </section>
        
        <ContactCTA t={t} locale={locale} />
      </div>
    </div>
  )
}

// Header component with animations
function ApplicationsHeader({ t }: { t: any }) {
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
        {t?.title?.tag || "Applications"}
      </motion.span>
      <h1 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-lumora-dark mb-4 md:mb-6 tracking-tight">
        {t?.title?.main || "Greenhouse Horticulture Applications"}
      </h1>
      <p className="text-lg md:text-xl text-lumora-dark/80 max-w-3xl mx-auto leading-relaxed">
        {t?.title?.subtitle || "Our plugs are perfectly suited for various application areas"}
      </p>
    </motion.div>
  )
}

// Application section component with animations
function ApplicationSection({ 
  id, 
  title, 
  description, 
  icon,
  benefits,
  examples,
  imagePosition = "left"
}: ApplicationSectionProps) {
  const { ref, inView } = useInView({
    threshold: 0.1,
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
      className="scroll-mt-24 w-full"
    >
      <div className={`flex flex-col ${imagePosition === "right" ? "lg:flex-row-reverse" : "lg:flex-row"} gap-8 lg:gap-16 items-center`}>
        {/* Application Image/Visual */}
        <div className="w-full lg:w-1/2">
          <div className="relative group">
            <div className="absolute inset-0 bg-lumora-green-500/10 rounded-3xl transform group-hover:scale-[1.03] transition-transform duration-500 -z-10"></div>
            <div className="relative h-[300px] sm:h-[350px] w-full overflow-hidden rounded-3xl shadow-soft-lg bg-lumora-cream/30 flex items-center justify-center">
              <div className="text-9xl">{icon}</div>
              <div className="absolute inset-0 bg-gradient-to-t from-lumora-green-200/30 to-transparent rounded-3xl opacity-60"></div>
            </div>
          </div>
        </div>
        
        {/* Application Info */}
        <div className="w-full lg:w-1/2">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="space-y-6"
          >
            <motion.div variants={fadeIn} className="space-y-3">
              <div className="inline-block text-lumora-dark font-medium px-4 py-1.5 rounded-full bg-lumora-cream/60 border border-lumora-cream text-sm">
                {icon} {title}
              </div>
              <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-lumora-dark tracking-tight">
                {title}
              </h2>
              <p className="text-lg md:text-xl text-lumora-green-700">
                {description}
              </p>
            </motion.div>
            
            <motion.div variants={fadeIn} className="mt-8">
              <div className="flex space-x-2 rounded-xl bg-lumora-green-50/50 p-1.5 mb-6">
                <button
                  className={`w-full rounded-lg py-2.5 text-sm font-medium leading-5 transition-all duration-300
                    ${activeTab === 0
                    ? 'bg-white text-lumora-green-700 shadow-soft'
                    : 'text-gray-600 hover:bg-white/30 hover:text-lumora-green-600'
                    }`}
                  onClick={() => setActiveTab(0)}
                >
                  Benefits
                </button>
                <button
                  className={`w-full rounded-lg py-2.5 text-sm font-medium leading-5 transition-all duration-300
                    ${activeTab === 1
                    ? 'bg-white text-lumora-green-700 shadow-soft'
                    : 'text-gray-600 hover:bg-white/30 hover:text-lumora-green-600'
                    }`}
                  onClick={() => setActiveTab(1)}
                >
                  Examples
                </button>
              </div>
              
              <div className="overflow-hidden rounded-2xl bg-white shadow-soft min-h-[200px]">
                {activeTab === 0 ? (
                  <motion.ul 
                    className="p-6 space-y-3"
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                  >
                    {benefits.map((benefit, index) => (
                      <motion.li key={index} variants={fadeIn} className="flex items-start">
                        <span className="flex-shrink-0 h-5 w-5 rounded-full bg-lumora-green-100 flex items-center justify-center text-lumora-green-600 mr-3 mt-0.5">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3 h-3">
                            <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                          </svg>
                        </span>
                        <span className="text-lumora-dark/80">{benefit}</span>
                      </motion.li>
                    ))}
                  </motion.ul>
                ) : (
                  <motion.div 
                    className="p-6"
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                  >
                    <div className="flex flex-wrap gap-2">
                      {examples.map((example, index) => (
                        <motion.span 
                          key={index} 
                          variants={fadeIn}
                          className="inline-block px-3 py-1 rounded-full bg-lumora-green-50 text-lumora-green-700 text-sm border border-lumora-green-100"
                        >
                          {example}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </div>
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
      className="mt-20 md:mt-32 relative rounded-3xl overflow-hidden"
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
            {t?.cta?.title || "Get in touch with us"}
          </motion.h3>
          <motion.p variants={fadeIn} className="text-base sm:text-lg md:text-xl text-white/90 mb-6 md:mb-10 max-w-2xl mx-auto leading-relaxed">
            {t?.cta?.description || "Do you have questions about our products or would you like to place an order? We are happy to provide personal advice."}
          </motion.p>
          <motion.div variants={fadeIn}>
            <Link 
              href={`/${locale}/contact`}
              className="inline-flex items-center justify-center bg-lumora-cream text-lumora-dark 
                      hover:bg-lumora-cream/90 px-6 sm:px-8 py-3 sm:py-4 rounded-xl shadow-soft 
                      hover:shadow-soft-md transition-all duration-300 
                      font-medium text-base sm:text-lg group"
            >
              <span>{t?.cta?.contactUs || "Request advice"}</span>
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

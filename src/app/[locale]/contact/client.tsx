'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { ReactNode } from 'react'
import { LocalBusinessSchema, BreadcrumbSchema } from '@/components/StructuredData'

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

interface ClientComponentProps {
  t: Record<string, any>;
  form?: ReactNode;
  locale?: string;
}

export default function ContactPageClient({ t, form, locale = 'nl' }: ClientComponentProps) {
  // Breadcrumb data
  const breadcrumbItems = [
    {
      name: locale === 'nl' ? 'Home' : locale === 'de' ? 'Startseite' : 'Home',
      url: locale === 'nl' ? 'https://lumorahorticulture.nl' : locale === 'de' ? 'https://lumorahorticulture.de' : 'https://lumorahorticulture.com'
    },
    {
      name: locale === 'nl' ? 'Contact' : locale === 'de' ? 'Kontakt' : 'Contact',
      url: locale === 'nl' ? 'https://lumorahorticulture.nl/contact/' : locale === 'de' ? 'https://lumorahorticulture.de/kontakt/' : 'https://lumorahorticulture.com/contact/'
    }
  ]

  return (
    <div className="relative min-h-screen py-16 md:py-24">
      {/* Structured data */}
      <LocalBusinessSchema locale={locale} />
      <BreadcrumbSchema items={breadcrumbItems} />
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-[30vh] bg-gradient-to-b from-lumora-cream/20 to-transparent"></div>
        <div className="absolute -top-20 -right-40 w-96 h-96 rounded-full bg-lumora-dark/10 mix-blend-multiply blur-3xl"></div>
        <div className="absolute top-1/3 -left-40 w-96 h-96 rounded-full bg-lumora-gold/10 mix-blend-multiply blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-full h-[20vh] bg-gradient-to-t from-lumora-dark/5 to-transparent"></div>
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <PageHeader t={t} />
        
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
            {/* Contact Information */}
            <ContactInfo t={t} />
            
            {/* Form container */}
            <div className="lg:w-2/3">
              {form}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// PageHeader component
function PageHeader({ t }: { t: any }) {
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
      className="max-w-4xl mx-auto text-center mb-16 md:mb-24"
    >
      <motion.span 
        className="inline-block text-lumora-dark mb-3 font-medium px-4 py-1.5 rounded-full bg-lumora-cream/60 border border-lumora-cream"
      >
        {t.title.tag}
      </motion.span>
      <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-lumora-dark mb-6 tracking-tight">
        {t.title.main}
      </h1>
      <p className="text-xl text-lumora-dark/80 max-w-3xl mx-auto leading-relaxed">
        {t.title.subtitle}
      </p>
    </motion.div>
  )
}

// ContactInfo component
function ContactInfo({ t }: { t: any }) {
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true
  })
  
  return (
    <motion.div 
      ref={ref}
      variants={staggerContainer}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="lg:w-1/3"
    >
      <div className="glass-dark bg-lumora-dark/90 backdrop-blur-md text-white rounded-3xl shadow-soft-lg overflow-hidden relative h-full p-8 md:p-10">
        {/* Decorative elements */}
        <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-lumora-dark/30 mix-blend-overlay blur-xl"></div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-lumora-gold/10 mix-blend-overlay blur-xl"></div>
        
        <motion.div variants={fadeIn} className="relative z-10">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-6">Lumora Horticulture</h2>
          
          <div className="space-y-8">
            <motion.div variants={fadeIn} className="flex items-start">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-lumora-cream/20 flex items-center justify-center mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">{t.info.email.title}</h3>
                <a 
                  href="mailto:info@lumorahorticulture.com" 
                  className="text-white/90 hover:text-white transition-colors duration-300"
                >
                  info@lumorahorticulture.com
                </a>
              </div>
            </motion.div>
            
            <motion.div variants={fadeIn} className="flex items-start">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-lumora-cream/20 flex items-center justify-center mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">{t.info.web.title}</h3>
                <a 
                  href="https://lumorahorticulture.nl" 
                  className="text-white/90 hover:text-white transition-colors duration-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  lumorahorticulture.nl
                </a>
              </div>
            </motion.div>
            
            <motion.div variants={fadeIn} className="flex items-start">
              <div className="flex-shrink-0 h-10 w-10 rounded-full bg-lumora-cream/20 flex items-center justify-center mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-white mb-2">{t.info.whatsapp.title}</h3>
                <a 
                  href="https://wa.me/31638382564" 
                  className="text-white/90 hover:text-white transition-colors duration-300"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  +31 6 38382564
                </a>
              </div>
            </motion.div>
          </div>
          
          <motion.div variants={fadeIn} className="mt-12 pt-12 border-t border-white/10">
            <h3 className="font-display text-xl font-semibold text-white mb-4">{t.info.collaboration.title}</h3>
            <p className="text-white/80 leading-relaxed">
              {t.info.collaboration.description}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  )
}

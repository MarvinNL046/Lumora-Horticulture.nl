'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Link from 'next/link'
import Image from 'next/image'
import { BreadcrumbSchema, OrganizationSchema } from '@/components/StructuredData'

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

interface AboutClientProps {
  t: any
  locale: string
}

export default function AboutClient({ t, locale }: AboutClientProps) {
  // Breadcrumb data
  const breadcrumbItems = [
    {
      name: locale === 'nl' ? 'Home' : locale === 'de' ? 'Startseite' : 'Home',
      url: locale === 'nl' ? 'https://lumorahorticulture.nl' : locale === 'de' ? 'https://lumorahorticulture.de' : 'https://lumorahorticulture.com'
    },
    {
      name: locale === 'nl' ? 'Over Ons' : locale === 'de' ? 'Über Uns' : 'About Us',
      url: locale === 'nl' ? 'https://lumorahorticulture.nl/over-ons/' : locale === 'de' ? 'https://lumorahorticulture.de/uber-uns/' : 'https://lumorahorticulture.com/about/'
    }
  ]

  return (
    <div className="relative min-h-screen">
      {/* Structured data */}
      <BreadcrumbSchema items={breadcrumbItems} />
      <OrganizationSchema locale={locale} />
      
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[30vh] bg-gradient-to-b from-lumora-cream/20 to-transparent"></div>
        <div className="absolute -top-20 right-0 md:-right-40 w-64 md:w-96 h-64 md:h-96 rounded-full bg-lumora-dark/10 mix-blend-multiply blur-3xl"></div>
        <div className="absolute top-1/3 left-0 md:-left-40 w-64 md:w-96 h-64 md:h-96 rounded-full bg-lumora-gold/10 mix-blend-multiply blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-24">
        {/* Header */}
        <PageHeader t={t} />
        
        {/* Content sections */}
        <div className="mt-12 md:mt-20 space-y-16 md:space-y-24">
          <IntroSection t={t} />
          <OurStorySection t={t} locale={locale} />
          <ProductionSection t={t} />
          <WhyUsSection t={t} />
          <CertificationsSection t={t} />
          <ContactCTA t={t} locale={locale} />
        </div>
      </div>
    </div>
  )
}

// Page header component
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

// Intro section
function IntroSection({ t }: { t: any }) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  })
  
  return (
    <motion.section 
      ref={ref}
      variants={staggerContainer}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="max-w-5xl mx-auto"
    >
      <motion.div variants={fadeIn} className="bg-white rounded-3xl shadow-soft-lg p-8 md:p-12">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-lumora-dark mb-6">
          {t.intro?.title}
        </h2>
        <p className="text-lg text-lumora-dark/80 leading-relaxed">
          {t.intro?.description}
        </p>
      </motion.div>
    </motion.section>
  )
}

// Our story section
function OurStorySection({ t, locale }: { t: any; locale: string }) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  })
  
  return (
    <motion.section 
      ref={ref}
      variants={staggerContainer}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="grid md:grid-cols-2 gap-8 md:gap-12 items-center"
    >
      <motion.div variants={fadeIn}>
        <h2 className="font-display text-2xl md:text-3xl font-bold text-lumora-dark mb-6">
          {t.ourStory?.title}
        </h2>
        <p className="text-lumora-dark/80 leading-relaxed">
          {t.ourStory?.description}
        </p>
      </motion.div>
      
      <motion.div variants={fadeIn} className="relative h-[300px] md:h-[400px] rounded-2xl overflow-hidden shadow-soft-lg">
        <Image
          src="/images/greenhouse-1.jpg"
          alt={locale === 'nl' ? 'Lumora Horticulture glastuinbouw' : locale === 'de' ? 'Lumora Horticulture Gewächshaus' : 'Lumora Horticulture greenhouse'}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-lumora-dark/30 to-transparent"></div>
      </motion.div>
    </motion.section>
  )
}

// Production section
function ProductionSection({ t }: { t: any }) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  })
  
  return (
    <motion.section 
      ref={ref}
      variants={staggerContainer}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="bg-lumora-cream/30 rounded-3xl p-8 md:p-12"
    >
      <motion.div variants={fadeIn} className="max-w-3xl mx-auto text-center mb-8">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-lumora-dark mb-4">
          {t.production?.title}
        </h2>
        <p className="text-lumora-dark/80 leading-relaxed">
          {t.production?.description}
        </p>
      </motion.div>
      
      <motion.div 
        variants={staggerContainer}
        className="grid md:grid-cols-2 gap-4 md:gap-6 mt-8"
      >
        {t.production?.features?.map((feature: string, index: number) => (
          <motion.div 
            key={index}
            variants={fadeIn}
            className="flex items-start bg-white rounded-xl p-4 shadow-soft"
          >
            <div className="flex-shrink-0 h-8 w-8 rounded-full bg-lumora-green-100 flex items-center justify-center mr-3">
              <svg className="h-5 w-5 text-lumora-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <p className="text-lumora-dark/80">{feature}</p>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  )
}

// Why us section
function WhyUsSection({ t }: { t: any }) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  })
  
  return (
    <motion.section 
      ref={ref}
      variants={staggerContainer}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
    >
      <motion.h2 
        variants={fadeIn}
        className="font-display text-2xl md:text-3xl font-bold text-lumora-dark mb-8 md:mb-12 text-center"
      >
        {t.whyUs?.title}
      </motion.h2>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {t.whyUs?.reasons?.map((reason: any, index: number) => (
          <motion.div 
            key={index}
            variants={fadeIn}
            className="bg-white rounded-2xl p-6 shadow-soft hover:shadow-soft-lg transition-shadow duration-300"
          >
            <div className="h-12 w-12 rounded-full bg-lumora-gold/20 flex items-center justify-center mb-4">
              <span className="text-2xl font-bold text-lumora-gold">{index + 1}</span>
            </div>
            <h3 className="font-semibold text-lumora-dark mb-2">{reason.title}</h3>
            <p className="text-sm text-lumora-dark/70">{reason.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.section>
  )
}

// Certifications section
function CertificationsSection({ t }: { t: any }) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  })
  
  return (
    <motion.section 
      ref={ref}
      variants={fadeIn}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="bg-lumora-dark text-white rounded-3xl p-8 md:p-12 text-center"
    >
      <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
        {t.certifications?.title}
      </h2>
      <p className="text-white/90 max-w-3xl mx-auto leading-relaxed">
        {t.certifications?.description}
      </p>
    </motion.section>
  )
}

// Contact CTA
function ContactCTA({ t, locale }: { t: any, locale: string }) {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  })
  
  return (
    <motion.section 
      ref={ref}
      variants={fadeIn}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className="mt-16 md:mt-24 text-center"
    >
      <div className="bg-gradient-to-br from-lumora-green-50 to-lumora-cream/50 rounded-3xl p-8 md:p-12">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-lumora-dark mb-4">
          {t.cta?.title}
        </h2>
        <p className="text-lumora-dark/80 mb-8 max-w-2xl mx-auto">
          {t.cta?.description}
        </p>
        <Link 
          href={locale === 'nl' ? '/contact' : locale === 'de' ? '/kontakt' : '/contact'}
          className="inline-flex items-center justify-center bg-lumora-dark text-white 
                  hover:bg-lumora-dark-800 px-8 py-4 rounded-xl shadow-soft 
                  hover:shadow-soft-md transition-all duration-300 
                  font-medium text-lg group"
        >
          <span>{t.cta?.button}</span>
          <svg className="ml-2 -mr-1 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" 
               xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </motion.section>
  )
}
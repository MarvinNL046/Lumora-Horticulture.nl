'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import HeroContactForm from '@/components/HeroContactForm'
import { localizePathForLocale } from '@/lib/url-localizations'

// Define TypeScript interface for ApplicationCard props
interface ApplicationCardProps {
  icon: string;
  title: string;
  description: string;
}

function ApplicationCard({ icon, title, description }: ApplicationCardProps) {
  return (
    <div className="bg-white hover:bg-lumora-cream/30 rounded-2xl shadow-sm hover:shadow-md p-6 transition-all duration-300 transform hover:-translate-y-1 border border-lumora-cream/20">
      <div className="text-3xl mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-lumora-dark mb-2">{title}</h3>
      <p className="text-lumora-dark/80 text-sm">{description}</p>
    </div>
  )
}

// Define TypeScript interface for ProductCard props
interface ProductCardProps {
  visible: boolean;
  delay: number;
  imageSrc: string;
  altText: string;
  title: string;
  description: string;
  href: string;
  moreInfoText: string;
}

function ProductCard({ visible, delay, imageSrc, altText, title, description, href, moreInfoText }: ProductCardProps) {
  return (
    <div 
      className={`bg-white rounded-2xl shadow-md hover:shadow-lg overflow-hidden transition-all duration-1000 transform ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${delay * 150}ms` }}
    >
      <div className="relative h-72 overflow-hidden">
        <Image
          src={imageSrc}
          alt={altText}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-lumora-dark/40 to-transparent"></div>
      </div>
      <div className="p-8">
        <h3 className="text-xl font-semibold text-lumora-dark mb-3">{title}</h3>
        <p className="text-lumora-dark/80 mb-5">{description}</p>
        <Link 
          href={href} 
          className="group inline-flex items-center text-lumora-dark font-medium hover:text-lumora-gold transition-all duration-300"
        >
          <span>{moreInfoText}</span>
          <svg 
            className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </div>
    </div>
  )
}

export default function HomeClient({ locale, t }: { locale: string, t: any }) {
  const [isVisible, setIsVisible] = useState({
    hero: false,
    products: false,
    applications: false,
    cta: false
  })

  useEffect(() => {
    // Initial visibility setup with a slight delay for animation
    setTimeout(() => {
      setIsVisible({
        hero: true,
        products: false,
        applications: false,
        cta: false
      })
    }, 100)

    // Set up intersection observer for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target.id === 'products-section') {
              setIsVisible(prev => ({ ...prev, products: true }))
            } else if (entry.target.id === 'applications-section') {
              setIsVisible(prev => ({ ...prev, applications: true }))
            } else if (entry.target.id === 'cta-section') {
              setIsVisible(prev => ({ ...prev, cta: true }))
            }
          }
        })
      },
      { threshold: 0.2 }
    )

    // Observe elements
    const productsSection = document.getElementById('products-section')
    const applicationsSection = document.getElementById('applications-section')
    const ctaSection = document.getElementById('cta-section')
    
    if (productsSection) observer.observe(productsSection)
    if (applicationsSection) observer.observe(applicationsSection)
    if (ctaSection) observer.observe(ctaSection)

    return () => {
      if (productsSection) observer.unobserve(productsSection)
      if (applicationsSection) observer.unobserve(applicationsSection)
      if (ctaSection) observer.unobserve(ctaSection)
    }
  }, [])

  return (
    <div className="flex flex-col">
      {/* Hero Section with enhanced visuals */}
      <section className="relative min-h-[95vh] flex items-center pt-24 pb-16 md:py-32 overflow-hidden">
        {/* Background Elements with updated brand colors */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-lumora-cream/40 to-white" />
          <div className="absolute top-0 right-0 w-full h-full bg-grain opacity-10" />
          <div className="absolute -top-10 -right-10 w-72 h-72 rounded-full bg-lumora-dark/5 opacity-40 mix-blend-multiply" />
          <div className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full bg-lumora-gold/10 opacity-40 mix-blend-multiply" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex flex-col md:flex-row items-center">
            <div 
              className={`md:w-1/2 md:pr-12 mb-12 md:mb-0 max-w-xl transition-all duration-1000 transform ${
                isVisible.hero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                <span className="block bg-clip-text text-transparent bg-gradient-to-r from-lumora-dark to-lumora-dark-700">
                  Lumora
                </span> 
                <span className="block bg-clip-text text-transparent bg-gradient-to-r from-lumora-gold/90 to-lumora-gold">
                  Horticulture
                </span>
              </h1>
              <p className="text-xl md:text-2xl font-light text-lumora-dark/90 mb-8 leading-relaxed">
                {t.hero.subtitle}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link 
                  href={localizePathForLocale('/products', locale)} 
                  className="bg-lumora-dark hover:bg-lumora-dark-700 text-lumora-cream font-medium px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center group"
                >
                  <span>{t.hero.viewProducts}</span>
                  <svg className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                <Link 
                  href={localizePathForLocale('/contact', locale)}
                  className="bg-lumora-cream hover:bg-lumora-cream/90 text-lumora-dark border border-lumora-dark/10 font-medium px-6 py-3 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 flex items-center justify-center group"
                >
                  <span>{t.hero.contactUs}</span>
                  <svg className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </Link>
              </div>
            </div>

            <div 
              className={`md:w-1/2 transition-all duration-1000 delay-300 transform ${
                isVisible.hero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <div className="relative flex items-center justify-center">
                {/* Decorative elements */}
                <div className="absolute -z-10 w-full h-full max-w-[500px] max-h-[500px]">
                  <div className="absolute -top-6 -right-6 w-64 h-64 rounded-full bg-lumora-green-200/30 mix-blend-multiply blur-2xl animate-pulse-slow"></div>
                  <div className="absolute -bottom-8 -left-8 w-64 h-64 rounded-full bg-lumora-gold-200/30 mix-blend-multiply blur-2xl animate-pulse-slow"></div>
                </div>

                {/* Main image */}
              {/* Glassy contact form - full width of the right column */}
              <div className="relative z-10 w-full transform animate-float">
                <HeroContactForm 
                  translations={{
                    name: t.contactForm?.name || "Name",
                    email: t.contactForm?.email || "Email",
                    phone: t.contactForm?.phone || "Phone",
                    message: t.contactForm?.message || "Message",
                    submit: t.contactForm?.submit || "Send",
                    success: t.contactForm?.success || "Message sent!",
                    error: t.contactForm?.error || "Error sending message",
                    quickContact: t.contactForm?.quickContact || "Quick Contact"
                  }}
                />
              </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Products Section */}
      <section id="products-section" className="py-24 bg-lumora-cream/5 relative">
        {/* Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-white to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-lumora-dark/5 to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            className={`text-center mb-16 transition-all duration-1000 transform ${
              isVisible.products ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-lumora-dark mb-4">
              <span className="relative">
                {t.products.title}
                <span className="absolute bottom-1 left-0 w-full h-1 bg-lumora-gold/30 rounded-full transform -translate-y-1"></span>
              </span>
            </h2>
            <p className="text-xl text-lumora-dark/80 max-w-3xl mx-auto leading-relaxed">
              {t.products.subtitle}
            </p>
          </div>
          
          {/* Benefits Grid */}
          <div 
            className={`mb-12 transition-all duration-1000 delay-300 transform ${
              isVisible.products ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
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
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {/* Product Card 1 - Tray 84 */}
            <ProductCard 
              visible={isVisible.products}
              delay={0}
              imageSrc="/productAfbeeldingen/trays/tray84/lumorahorticulture-tray84.jpg"
              altText="Tray 84"
              title="Tray-84st: Paperbus Steenwol Pluggen"
              description="84 pluggen, 3.5 cm diameter, 52.5 x 30.5 cm"
              href={localizePathForLocale('/products', locale) + '#tray84'}
              moreInfoText={t.products.moreInfo}
            />
            
            {/* Product Card 2 - Tray 104 */}
            <ProductCard 
              visible={isVisible.products}
              delay={1}
              imageSrc="/productAfbeeldingen/trays/tray104/lumorahorticulture-tray104.jpg"
              altText="Tray 104"
              title="Tray-104st: Paperbus Steenwol Pluggen"
              description="104 pluggen, 3 cm diameter, 52.5 x 30.5 cm"
              href={localizePathForLocale('/products', locale) + '#tray104'}
              moreInfoText={t.products.moreInfo}
            />
            
            {/* Product Card 3 - Transport Box */}
            <ProductCard 
              visible={isVisible.products}
              delay={2}
              imageSrc="/productAfbeeldingen/verpakkingsdoos/lumorahorticulture-vouwdoos.jpg"
              altText="Transport Box"
              title="Transportdoos (Vouwdoos)"
              description="557 x 322 x 180mm"
              href={localizePathForLocale('/products', locale) + '#transportbox'}
              moreInfoText={t.products.moreInfo}
            />
          </div>
          
          <div 
            className={`mt-16 text-center transition-all duration-1000 delay-700 transform ${
              isVisible.products ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <Link 
              href={localizePathForLocale('/products', locale)}
              className="bg-lumora-dark hover:bg-lumora-dark-700 text-lumora-cream font-medium px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center group"
            >
              <span>{t.products.viewAll}</span>
              <svg className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Applications Section */}
      <section id="applications-section" className="py-20 bg-white relative">
        {/* Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-lumora-cream/5 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-lumora-dark/5 to-transparent"></div>
          <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-lumora-green-100/20 opacity-40 mix-blend-multiply blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-lumora-gold/10 opacity-30 mix-blend-multiply blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            className={`text-center mb-12 transition-all duration-1000 transform ${
              isVisible.applications ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-lumora-dark mb-4">
              <span className="relative">
                {t.applications?.title || "Toepassingen in de Glastuinbouw"}
                <span className="absolute bottom-1 left-0 w-full h-1 bg-lumora-gold/30 rounded-full transform -translate-y-1"></span>
              </span>
            </h2>
            <p className="text-xl text-lumora-dark/80 max-w-3xl mx-auto leading-relaxed">
              {t.applications?.subtitle || "Onze pluggen zijn perfect inzetbaar voor diverse toepassingsgebieden"}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {/* Application items */}
            <ApplicationCard
              icon="🌿"
              title={t.applications?.items?.vegetables?.title || "Groenteplanten-opkweek"}
              description={t.applications?.items?.vegetables?.description || "Perfect voor de opkweek van paprika, tomaat, aubergine en komkommer"}
            />
            
            <ApplicationCard
              icon="🌼"
              title={t.applications?.items?.ornamental?.title || "Sierplanten & vaste planten"}
              description={t.applications?.items?.ornamental?.description || "Ideaal voor gerbera, chrysant, lavendel en andere siergewassen"}
            />
            
            <ApplicationCard
              icon="🌿"
              title={t.applications?.items?.herbs?.title || "Kruiden & microgreens"}
              description={t.applications?.items?.herbs?.description || "Uitstekend voor basilicum, peterselie, oregano en andere kruiden"}
            />
            
            <ApplicationCard
              icon="🌱"
              title={t.applications?.items?.grafting?.title || "Graftpluggen voor onderstammen"}
              description={t.applications?.items?.grafting?.description || "Speciaal voor het enten van tomaat en paprika planten"}
            />
            
            <ApplicationCard
              icon="🌾"
              title={t.applications?.items?.vertical?.title || "Vertical farming & hydroponics"}
              description={t.applications?.items?.vertical?.description || "Perfect voor moderne teeltsystemen en verticale landbouw"}
            />
          </div>
          
          <div 
            className={`mt-8 text-center transition-all duration-1000 delay-500 transform ${
              isVisible.applications ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <Link 
              href={localizePathForLocale('/applications', locale)}
              className="bg-lumora-dark hover:bg-lumora-dark-700 text-lumora-cream font-medium px-6 py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center inline-flex group"
            >
              <span>{t.applications?.viewAll || "Bekijk alle toepassingen"}</span>
              <svg className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Call to Action Section */}
      <section id="cta-section" className="relative py-24 overflow-hidden">
        {/* Background with gradient overlay */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-lumora-dark to-lumora-dark-800"></div>
          <div className="absolute inset-0 bg-grain opacity-5 mix-blend-overlay"></div>
          <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-lumora-dark/20 mix-blend-overlay blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full bg-lumora-gold/10 mix-blend-overlay blur-3xl"></div>
        </div>

        <div 
          className={`container mx-auto px-4 sm:px-6 lg:px-8 relative max-w-4xl transition-all duration-1000 transform ${
            isVisible.cta ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="glass-dark rounded-3xl p-10 md:p-16 shadow-soft-lg backdrop-blur-md">
            <div className="text-center">
              <h2 className="heading-2 text-white mb-6">{t.cta.title}</h2>
              <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
                {t.cta.description}
              </p>
              <Link 
                href={localizePathForLocale('/contact', locale)}
                className="inline-flex items-center justify-center bg-lumora-cream text-lumora-dark 
                         hover:bg-lumora-cream/90 px-8 py-4 rounded-xl shadow-soft 
                         hover:shadow-soft-md transition-all duration-300 
                         font-medium text-lg group"
              >
                <span>{t.cta.button}</span>
                <svg className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

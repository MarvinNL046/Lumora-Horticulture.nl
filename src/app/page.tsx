'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

export default function Home() {
  const [isVisible, setIsVisible] = useState({
    hero: false,
    products: false,
    cta: false
  })

  useEffect(() => {
    // Initial visibility setup with a slight delay for animation
    setTimeout(() => {
      setIsVisible({
        hero: true,
        products: false,
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
    const ctaSection = document.getElementById('cta-section')
    
    if (productsSection) observer.observe(productsSection)
    if (ctaSection) observer.observe(ctaSection)

    return () => {
      if (productsSection) observer.unobserve(productsSection)
      if (ctaSection) observer.unobserve(ctaSection)
    }
  }, [])

  return (
    <div className="flex flex-col">
      {/* Hero Section with enhanced visuals */}
      <section className="relative min-h-[95vh] flex items-center pt-24 pb-16 md:py-32 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-lumora-green-50 to-lumora-gold-50" />
          <div className="absolute top-0 right-0 w-full h-full bg-grain opacity-10" />
          <div className="absolute -top-10 -right-10 w-72 h-72 rounded-full backdrop-glow-green opacity-30 mix-blend-multiply" />
          <div className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full backdrop-glow-gold opacity-30 mix-blend-multiply" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex flex-col md:flex-row items-center">
            <div 
              className={`md:w-1/2 md:pr-12 mb-12 md:mb-0 max-w-xl transition-all duration-1000 transform ${
                isVisible.hero ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
            >
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
                <span className="block bg-clip-text text-transparent bg-gradient-to-r from-lumora-green-500 to-lumora-green-700">
                  Lumora
                </span> 
                <span className="block bg-clip-text text-transparent bg-gradient-to-r from-lumora-gold-500 to-lumora-gold-700">
                  Horticulture
                </span>
              </h1>
              <p className="text-xl md:text-2xl font-light text-gray-700 mb-8 leading-relaxed">
                Duurzame en professionele tuinbouw oplossingen voor de moderne teler.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link 
                  href="/products" 
                  className="btn-primary group"
                >
                  <span>Bekijk onze producten</span>
                  <svg className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
                <Link 
                  href="/contact" 
                  className="btn-secondary group"
                >
                  <span>Neem contact op</span>
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
                <div className="relative rounded-3xl overflow-hidden shadow-soft-lg backdrop-glow-green animate-float max-w-[500px]">
                  <div className="aspect-w-16 aspect-h-9 w-full relative spotlight">
                    <Image
                      src="/images/greenhouse-1.jpg" 
                      alt="Lumora Horticulture Professional Solutions"
                      width={600}
                      height={400}
                      className="object-cover rounded-3xl transition-transform duration-700 hover:scale-105"
                      style={{ width: '100%', height: '100%' }}
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-3xl"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Products Section */}
      <section id="products-section" className="py-24 bg-white relative">
        {/* Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-lumora-green-50/70 to-transparent"></div>
          <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-lumora-gold-50/50 to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            className={`text-center mb-16 transition-all duration-1000 transform ${
              isVisible.products ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <h2 className="heading-2 text-gray-900 mb-4">
              <span className="animated-gradient-text">Onze Producten</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Hoogwaardige, duurzame oplossingen voor de professionele tuinbouw
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {/* Product Card 1 - Tray 84 */}
            <ProductCard 
              visible={isVisible.products}
              delay={0}
              imageSrc="/productAfbeeldingen/trays/tray84/lumorahorticulture-tray84.jpg"
              altText="Tray 84"
              title="Tray-84st: TRANSPLANT 84"
              description="Plug 3.5 cm diameter, 52.5 x 30.5 cm"
              href="/products#tray84"
            />
            
            {/* Product Card 2 - Tray 104 */}
            <ProductCard 
              visible={isVisible.products}
              delay={1}
              imageSrc="/productAfbeeldingen/trays/tray104/lumorahorticulture-tray104.jpg"
              altText="Tray 104"
              title="Tray-104st: PAPER PLUG TRAY 104"
              description="Plug 3 cm diameter, 52.5 x 30.5 cm"
              href="/products#tray104"
            />
            
            {/* Product Card 3 - Transport Box */}
            <ProductCard 
              visible={isVisible.products}
              delay={2}
              imageSrc="/productAfbeeldingen/verpakkingsdoos/lumorahorticulture-vouwdoos.jpg"
              altText="Transport Box"
              title="Transportdoos (Vouwdoos)"
              description="557 x 322 x 180mm"
              href="/products#transportbox"
            />
          </div>
          
          <div 
            className={`mt-16 text-center transition-all duration-1000 delay-700 transform ${
              isVisible.products ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
          >
            <Link 
              href="/products" 
              className="btn-primary group"
            >
              <span>Bekijk alle producten</span>
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
          <div className="absolute inset-0 bg-gradient-to-br from-lumora-green-600 to-lumora-green-800"></div>
          <div className="absolute inset-0 bg-grain opacity-5 mix-blend-overlay"></div>
          <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-lumora-green-500/30 mix-blend-overlay blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-96 h-96 rounded-full bg-lumora-green-400/20 mix-blend-overlay blur-3xl"></div>
        </div>

        <div 
          className={`container mx-auto px-4 sm:px-6 lg:px-8 relative max-w-4xl transition-all duration-1000 transform ${
            isVisible.cta ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="glass-dark rounded-3xl p-10 md:p-16 shadow-soft-lg backdrop-blur-md">
            <div className="text-center">
              <h2 className="heading-2 text-white mb-6">Neem contact met ons op</h2>
              <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
                Heeft u vragen over onze producten of wilt u een bestelling plaatsen? 
                Wij helpen u graag verder met persoonlijk advies.
              </p>
              <Link 
                href="/contact" 
                className="inline-flex items-center justify-center bg-white text-lumora-green-700 
                         hover:bg-lumora-green-50 px-8 py-4 rounded-xl shadow-soft 
                         hover:shadow-soft-md transition-all duration-300 
                         font-medium text-lg group"
              >
                <span>Contact opnemen</span>
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

// Define TypeScript interface for ProductCard props
interface ProductCardProps {
  visible: boolean;
  delay: number;
  imageSrc: string;
  altText: string;
  title: string;
  description: string;
  href: string;
}

function ProductCard({ visible, delay, imageSrc, altText, title, description, href }: ProductCardProps) {
  return (
    <div 
      className={`card card-hover spotlight transition-all duration-1000 transform ${
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
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
      </div>
      <div className="p-8">
        <h3 className="text-xl font-semibold text-gray-900 mb-3">{title}</h3>
        <p className="text-gray-600 mb-5">{description}</p>
        <Link 
          href={href} 
          className="group inline-flex items-center text-lumora-green-600 font-medium hover:text-lumora-green-700 transition-all duration-300"
        >
          <span>Meer informatie</span>
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

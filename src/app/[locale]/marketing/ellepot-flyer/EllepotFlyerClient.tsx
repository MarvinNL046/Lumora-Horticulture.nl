'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import QRCode from 'react-qr-code'
import './flyer.css'

export default function EllepotFlyerClient() {
  // Set up print-friendly page
  useEffect(() => {
    // Add print styles
    const style = document.createElement('style')
    style.innerHTML = `
      @media print {
        @page {
          size: A4;
          margin: 0;
        }
        body {
          margin: 0;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
          color-adjust: exact;
        }
        .no-print {
          display: none !important;
        }
      }
    `
    document.head.appendChild(style)
    
    return () => {
      document.head.removeChild(style)
    }
  }, [])

  return (
    <>
      {/* Download button */}
      <div className="no-print fixed top-4 right-4 z-50">
        <a
          href="/downloads/ellepot-fp12-folder.pdf"
          download="Lumora-Ellepot-FP12-Folder.pdf"
          className="inline-block bg-lumora-dark text-lumora-cream px-6 py-3 rounded-lg shadow-lg hover:bg-lumora-dark-800 transition-colors duration-200"
        >
          Download Lumora Productfolder (PDF)
        </a>
      </div>

      {/* A4 Flyer Content */}
      <div className="print-page bg-white w-[210mm] h-[297mm] mx-auto relative overflow-hidden print:m-0">
        {/* Header with brand colors */}
        <div className="bg-gradient-to-r from-lumora-dark to-lumora-green-700 text-white p-6 relative">
          <div className="absolute inset-0 bg-grain opacity-10"></div>
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-4">
              <div className="bg-white rounded-lg p-2">
                <Image 
                  src="/logo/lumura-horticulture-logo.jpeg" 
                  alt="Lumora Horticulture" 
                  width={120} 
                  height={48}
                  className="object-contain"
                />
              </div>
              <div className="text-right">
                <h3 className="text-lumora-cream font-semibold text-base mb-1">Milieuvriendelijk</h3>
                <p className="text-lumora-cream/80 text-xs">Duurzame kweekoplossing</p>
              </div>
            </div>
            <h1 className="text-3xl font-bold mb-2">Ellepot® FP 12+ Papier</h1>
            <p className="text-lg text-lumora-cream/90">Het innovatieve omhulsel voor onze steenwolpluggen</p>
          </div>
        </div>

        {/* Main content */}
        <div className="p-6 pb-44">
          {/* Introduction */}
          <div className="mb-3">
            <p className="text-gray-700 text-xs leading-relaxed">
              Al onze <strong>paperbus steenwol pluggen</strong> zijn verpakt met <strong>Ellepot FP 12+ papier</strong> – een duurzame en 
              innovatieve oplossing voor het kweken van sterke en gezonde planten. Dit speciale papier is gemaakt 
              van milieuvriendelijke houtvezels uit hernieuwbare bronnen, met een toevoeging van polyester voor 
              versterking.
            </p>
          </div>

          {/* Key features in grid */}
          <div className="grid grid-cols-2 gap-2 mb-3">
            <div className="bg-lumora-cream/30 rounded-lg p-3 border border-lumora-green-100">
              <div className="flex items-start gap-3">
                <div className="text-2xl">🌱</div>
                <div>
                  <h3 className="font-semibold text-lumora-dark mb-1 text-sm">Milieuvriendelijk</h3>
                  <p className="text-xs text-gray-600">
                    Gemaakt van houtvezels uit hernieuwbare bronnen met minimale impact op het milieu
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-lumora-cream/30 rounded-lg p-3 border border-lumora-green-100">
              <div className="flex items-start gap-3">
                <div className="text-2xl">⏰</div>
                <div>
                  <h3 className="font-semibold text-lumora-dark mb-1 text-sm">12+ Maanden Afbraaktijd</h3>
                  <p className="text-xs text-gray-600">
                    Perfect voor gewassen met een langere productietijd voordat ze uitgeplant worden
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-lumora-cream/30 rounded-lg p-3 border border-lumora-green-100">
              <div className="flex items-start gap-3">
                <div className="text-2xl">🛡️</div>
                <div>
                  <h3 className="font-semibold text-lumora-dark mb-1 text-sm">Schimmelwerend</h3>
                  <p className="text-xs text-gray-600">
                    Voorzien van fungicide eigenschappen om jonge planten extra te beschermen
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-lumora-cream/30 rounded-lg p-3 border border-lumora-green-100">
              <div className="flex items-start gap-3">
                <div className="text-2xl">🌿</div>
                <div>
                  <h3 className="font-semibold text-lumora-dark mb-1 text-sm">Geen Transplantatieschok</h3>
                  <p className="text-xs text-gray-600">
                    Wortels groeien moeiteloos door het papier heen zonder groeistilstand
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Product Image */}
          <div className="mb-3 flex justify-center">
            <div className="relative w-full max-w-xs rounded-lg overflow-hidden shadow-md">
              <Image
                src="/productAfbeeldingen/trays/tray84/lumorahorticulture-tray84.jpg"
                alt="Ellepot FP 12+ Steenwolpluggen"
                width={280}
                height={140}
                className="object-cover w-full h-32"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/50 to-transparent p-2">
                <p className="text-white text-xs font-medium">Lumora paperbus steenwol pluggen met Ellepot FP 12+ papier</p>
              </div>
            </div>
          </div>

          {/* Transplant shock explanation */}
          <div className="bg-gray-50 rounded-lg p-3 mb-3">
            <h3 className="font-semibold text-lumora-dark mb-1 text-sm">Wat is transplantatieschok?</h3>
            <p className="text-xs text-gray-700 leading-normal">
              Bij het verplanten van jonge planten raken wortels vaak beschadigd. Hierdoor stopt de plant 
              tijdelijk met groeien of ziet hij er slap uit. Met onze paperbus steenwol pluggen in Ellepot FP 12+ 
              papier gebeurt dit niet: de wortels groeien moeiteloos door het papier heen, zodat je planten 
              sterk en gezond verder groeien.
            </p>
          </div>

          {/* Applications */}
          <div>
            <h3 className="font-semibold text-lumora-dark mb-2 text-sm">Perfect geschikt voor:</h3>
            <div className="grid grid-cols-2 gap-2">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-lumora-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                </svg>
                <span className="text-xs">Groente- en kruidenkwekerijen</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-lumora-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                </svg>
                <span className="text-xs">Sierteelt</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-lumora-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                </svg>
                <span className="text-xs">Boomkwekerijen</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-lumora-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                </svg>
                <span className="text-xs">Hobby- en moestuiniers</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer with contact info and QR code */}
        <div className="absolute bottom-0 left-0 right-0 bg-lumora-dark text-white p-5">
          <div className="flex justify-between items-end">
            <div>
              <h3 className="font-semibold text-base mb-2">Neem contact met ons op</h3>
              <div className="space-y-1 text-xs">
                <p className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  info@lumorahorticulture.com
                </p>
                <p className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                  </svg>
                  lumorahorticulture.nl
                </p>
                <p className="flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
                  </svg>
                  +31 6 38382564
                </p>
              </div>
            </div>
            
            <div className="text-center">
              <p className="text-xs mb-1 text-lumora-cream/80">Scan voor meer info</p>
              <div className="bg-white p-2 rounded">
                <QRCode
                  size={60}
                  value="https://lumorahorticulture.nl/producten/ellepot-fp12"
                  viewBox={`0 0 60 60`}
                  style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
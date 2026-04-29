'use client'

import { useEffect, type ComponentType } from 'react'
import Image from 'next/image'
import QRCodeRaw from 'react-qr-code'

// See ellepot-flyer/EllepotFlyerClient.tsx — react-qr-code's TS shape drifts
// between minor versions; cast once so JSX call sites are version-agnostic.
const QRCode = QRCodeRaw as unknown as ComponentType<{
  size?: number
  value: string
  viewBox?: string
  bgColor?: string
  fgColor?: string
  level?: 'L' | 'M' | 'H' | 'Q'
  style?: React.CSSProperties
}>

interface Props {
  locale: string
}

export default function NeemxProFlyerClient({ locale }: Props) {
  useEffect(() => {
    // Add print styles to hide website elements
    const style = document.createElement('style')
    style.id = 'flyer-print-styles'
    style.innerHTML = `
      @media print {
        @page {
          size: A4;
          margin: 0;
        }

        /* Hide all website elements */
        body > *:not(#flyer-container):not(script):not(style) {
          display: none !important;
        }

        /* Also hide specific elements by tag/class */
        header, footer, nav,
        [class*="Header"], [class*="Footer"], [class*="Nav"],
        [class*="Cart"], [class*="sidebar"], [class*="Sidebar"] {
          display: none !important;
        }

        /* Reset body styles for print */
        body {
          margin: 0 !important;
          padding: 0 !important;
          background: white !important;
          -webkit-print-color-adjust: exact;
          print-color-adjust: exact;
          color-adjust: exact;
        }

        /* Make sure flyer takes full page */
        #flyer-container {
          position: absolute !important;
          top: 0 !important;
          left: 0 !important;
          margin: 0 !important;
          padding: 0 !important;
          box-shadow: none !important;
        }

        .no-print {
          display: none !important;
        }

        main {
          padding: 0 !important;
          margin: 0 !important;
        }
      }

      /* Screen styles - hide website elements on this page */
      @media screen {
        body > header,
        body > footer,
        body > nav {
          display: none !important;
        }

        main {
          padding-top: 0 !important;
        }
      }
    `
    document.head.appendChild(style)

    // Hide header and footer on screen as well
    const header = document.querySelector('header')
    const footer = document.querySelector('footer')
    const main = document.querySelector('main')

    if (header) header.style.display = 'none'
    if (footer) footer.style.display = 'none'
    if (main) main.style.paddingTop = '0'

    return () => {
      const existingStyle = document.getElementById('flyer-print-styles')
      if (existingStyle) document.head.removeChild(existingStyle)

      // Restore header and footer
      if (header) header.style.display = ''
      if (footer) footer.style.display = ''
      if (main) main.style.paddingTop = ''
    }
  }, [])

  const content = {
    nl: {
      headerTitle: '100% Natuurlijke Gewasbescherming',
      headerSubtitle: 'Premium Kwaliteit voor Professionals',
      title: 'NEEMXPRO',
      badge: 'NEW',
      subtitle: '100% Natuurlijk Botanisch Olieconcentraat',
      tagline: 'Premium bladverzorging voor professionele telers',
      intro: 'NEEMX PRO is een hoogwaardig, 100% natuurlijk botanisch olieconcentraat voor professionele bladverzorging. Het ondersteunt gezonde planten en helpt bij het voorkomen en verminderen van insectendruk door een beschermende oliefilm op het blad te vormen.',
      badges: ['100% Natuurlijk', '4x Geconcentreerd', 'Preventief & Curatief', 'Professionele Kwaliteit'],
      stronger: '4x Sterker',
      whyTitle: 'Waarom NEEMX PRO?',
      features: [
        { icon: '🌿', title: 'Gezonde Bladeren', description: 'Ondersteunt gezonde en sterke bladeren voor optimale groei' },
        { icon: '🛡️', title: 'Preventief & Curatief', description: 'Helpt bij preventieve en curatieve gewasverzorging' },
        { icon: '💧', title: 'Beschermende Film', description: 'Vormt een beschermende oliefilm op het bladoppervlak' },
        { icon: '🌱', title: 'Geschikt voor Stekken', description: 'Veilig voor jonge planten en stekken bij juiste dosering' },
        { icon: '⚡', title: 'Zeer Geconcentreerd', description: 'Lage dosering nodig - 4x sterker dan standaard' },
        { icon: '💦', title: 'Makkelijk Mengbaar', description: 'Eenvoudig te mengen met water dankzij milde emulgator' }
      ],
      dosageTitle: 'Dosering per liter water',
      shakeText: 'Schudden voor gebruik!',
      dosageLevels: [
        { amount: '2,5 ml/L', use: 'Preventief', description: '(wekelijks)' },
        { amount: '5 ml/L', use: 'Normaal', description: 'gebruik' },
        { amount: '7 ml/L', use: 'Intensieve', description: 'verzorging' },
        { amount: '10 ml/L', use: 'Professioneel', description: '/ Zwaar' }
      ],
      yieldTitle: 'Opbrengst per flesje',
      yieldItems: [
        { size: '10 ml', yield: 'tot 4 liter spuitoplossing', coverage: '± 5-40 m²' },
        { size: '30 ml', yield: 'tot 12 liter spuitoplossing', coverage: '± 15-120 m²' },
        { size: '50 ml', yield: 'tot 20 liter spuitoplossing', coverage: '± 25-200 m²' }
      ],
      bulkNote: 'Ook leverbaar in bulkverpakking 1L · 5L · 10L tot 1000L IBC — vraag offerte aan',
      effectiveTitle: 'Effectief tegen:',
      effectiveItems: [
        { icon: '🕷️', name: 'Spint' },
        { icon: '🦟', name: 'Zuigende insecten' },
        { icon: '🐛', name: 'Bladluis' },
        { icon: '🦗', name: 'Trips' },
        { icon: '🪰', name: 'Witte vlieg' },
        { icon: '🍄', name: 'Meeldauw' }
      ],
      footerTitle: 'Meer informatie & Bestellen',
      footerText: 'Scan de QR-code of bezoek onze website voor productdetails, doseringsinstructies en om direct te bestellen.',
      domain: 'lumorahorticulture.nl',
      scanText: 'Scan mij!'
    },
    en: {
      headerTitle: '100% Natural Crop Protection',
      headerSubtitle: 'Premium Quality for Professionals',
      title: 'NEEMXPRO',
      badge: 'NEW',
      subtitle: '100% Natural Botanical Oil Concentrate',
      tagline: 'Premium leaf care for professional growers',
      intro: 'NEEMX PRO is a high-quality, 100% natural botanical oil concentrate for professional leaf care. It supports healthy plants and helps prevent and reduce insect pressure by forming a protective oil film on the leaf.',
      badges: ['100% Natural', '4x Concentrated', 'Preventive & Curative', 'Professional Quality'],
      stronger: '4x Stronger',
      whyTitle: 'Why NEEMX PRO?',
      features: [
        { icon: '🌿', title: 'Healthy Leaves', description: 'Supports healthy and strong leaves for optimal growth' },
        { icon: '🛡️', title: 'Preventive & Curative', description: 'Helps with preventive and curative crop care' },
        { icon: '💧', title: 'Protective Film', description: 'Forms a protective oil film on the leaf surface' },
        { icon: '🌱', title: 'Suitable for Cuttings', description: 'Safe for young plants and cuttings at correct dosage' },
        { icon: '⚡', title: 'Highly Concentrated', description: 'Low dosage needed - 4x stronger than standard' },
        { icon: '💦', title: 'Easy to Mix', description: 'Easy to mix with water thanks to mild emulsifier' }
      ],
      dosageTitle: 'Dosage per liter of water',
      shakeText: 'Shake before use!',
      dosageLevels: [
        { amount: '2.5 ml/L', use: 'Preventive', description: '(weekly)' },
        { amount: '5 ml/L', use: 'Normal', description: 'use' },
        { amount: '7 ml/L', use: 'Intensive', description: 'care' },
        { amount: '10 ml/L', use: 'Professional', description: '/ Heavy' }
      ],
      yieldTitle: 'Yield per bottle',
      yieldItems: [
        { size: '10 ml', yield: 'up to 4 liters spray solution', coverage: '± 5-40 m²' },
        { size: '30 ml', yield: 'up to 12 liters spray solution', coverage: '± 15-120 m²' },
        { size: '50 ml', yield: 'up to 20 liters spray solution', coverage: '± 25-200 m²' }
      ],
      bulkNote: 'Also available in bulk packaging 1L · 5L · 10L up to 1000L IBC — request a quote',
      effectiveTitle: 'Effective against:',
      effectiveItems: [
        { icon: '🕷️', name: 'Spider mites' },
        { icon: '🦟', name: 'Sucking insects' },
        { icon: '🐛', name: 'Aphids' },
        { icon: '🦗', name: 'Thrips' },
        { icon: '🪰', name: 'Whitefly' },
        { icon: '🍄', name: 'Mildew' }
      ],
      footerTitle: 'More Information & Order',
      footerText: 'Scan the QR code or visit our website for product details, dosage instructions and to order directly.',
      domain: 'lumorahorticulture.com',
      scanText: 'Scan me!'
    },
    de: {
      headerTitle: '100% Natürlicher Pflanzenschutz',
      headerSubtitle: 'Premium Qualität für Profis',
      title: 'NEEMXPRO',
      badge: 'NEU',
      subtitle: '100% Natürliches Botanisches Ölkonzentrat',
      tagline: 'Premium Blattpflege für professionelle Züchter',
      intro: 'NEEMX PRO ist ein hochwertiges, 100% natürliches botanisches Ölkonzentrat für professionelle Blattpflege. Es unterstützt gesunde Pflanzen und hilft, Insektendruck zu verhindern und zu reduzieren, indem es einen schützenden Ölfilm auf dem Blatt bildet.',
      badges: ['100% Natürlich', '4x Konzentriert', 'Präventiv & Kurativ', 'Professionelle Qualität'],
      stronger: '4x Stärker',
      whyTitle: 'Warum NEEMX PRO?',
      features: [
        { icon: '🌿', title: 'Gesunde Blätter', description: 'Unterstützt gesunde und starke Blätter für optimales Wachstum' },
        { icon: '🛡️', title: 'Präventiv & Kurativ', description: 'Hilft bei präventiver und kurativer Pflanzenpflege' },
        { icon: '💧', title: 'Schutzfilm', description: 'Bildet einen schützenden Ölfilm auf der Blattoberfläche' },
        { icon: '🌱', title: 'Geeignet für Stecklinge', description: 'Sicher für junge Pflanzen und Stecklinge bei richtiger Dosierung' },
        { icon: '⚡', title: 'Hochkonzentriert', description: 'Niedrige Dosierung nötig - 4x stärker als Standard' },
        { icon: '💦', title: 'Leicht Mischbar', description: 'Einfach mit Wasser mischbar dank mildem Emulgator' }
      ],
      dosageTitle: 'Dosierung pro Liter Wasser',
      shakeText: 'Vor Gebrauch schütteln!',
      dosageLevels: [
        { amount: '2,5 ml/L', use: 'Präventiv', description: '(wöchentlich)' },
        { amount: '5 ml/L', use: 'Normale', description: 'Verwendung' },
        { amount: '7 ml/L', use: 'Intensive', description: 'Pflege' },
        { amount: '10 ml/L', use: 'Professionell', description: '/ Schwer' }
      ],
      yieldTitle: 'Ertrag pro Flasche',
      yieldItems: [
        { size: '10 ml', yield: 'bis zu 4 Liter Sprühlösung', coverage: '± 5-40 m²' },
        { size: '30 ml', yield: 'bis zu 12 Liter Sprühlösung', coverage: '± 15-120 m²' },
        { size: '50 ml', yield: 'bis zu 20 Liter Sprühlösung', coverage: '± 25-200 m²' }
      ],
      bulkNote: 'Auch in Großverpackung erhältlich 1L · 5L · 10L bis 1000L IBC — Angebot anfordern',
      effectiveTitle: 'Wirksam gegen:',
      effectiveItems: [
        { icon: '🕷️', name: 'Spinnmilben' },
        { icon: '🦟', name: 'Saugende Insekten' },
        { icon: '🐛', name: 'Blattläuse' },
        { icon: '🦗', name: 'Thripse' },
        { icon: '🪰', name: 'Weiße Fliege' },
        { icon: '🍄', name: 'Mehltau' }
      ],
      footerTitle: 'Mehr Informationen & Bestellen',
      footerText: 'Scannen Sie den QR-Code oder besuchen Sie unsere Website für Produktdetails, Dosierungsanweisungen und um direkt zu bestellen.',
      domain: 'lumorahorticulture.de',
      scanText: 'Scannen!'
    }
  }

  const t = content[locale as keyof typeof content] || content.de

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 print:p-0 print:bg-white">
      {/* Print button */}
      <div className="no-print fixed top-4 right-4 z-50 flex gap-2">
        <button
          onClick={() => window.print()}
          className="bg-amber-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-amber-600 transition-colors duration-200"
        >
          Print / Download PDF
        </button>
      </div>

      {/* A4 Flyer Content */}
      <div id="flyer-container" className="print-page bg-white w-[210mm] h-[297mm] mx-auto relative overflow-hidden print:m-0 shadow-2xl flex flex-col">

        {/* Header - Orange gradient */}
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-5 py-3 flex-shrink-0">
          <div className="flex justify-between items-center">
            <div className="bg-white rounded-lg p-2">
              <Image
                src="/logo/lumura-horticulture-logo.jpeg"
                alt="Lumora Horticulture"
                width={80}
                height={32}
                className="object-contain"
              />
            </div>
            <div className="text-right">
              <h3 className="font-bold text-lg">{t.headerTitle}</h3>
              <p className="text-white/90 text-sm">{t.headerSubtitle}</p>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <div className="px-5 py-3 bg-gradient-to-b from-gray-50 to-white flex-shrink-0">
          <div className="flex gap-4">
            {/* Left side - Text */}
            <div className="flex-1">
              {/* Title */}
              <div className="flex items-center gap-3 mb-1">
                <h1 className="text-3xl font-black">
                  <span className="text-gray-800">NEEMX</span>
                  <span className="text-amber-500">PRO</span>
                </h1>
                <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-2 py-0.5 rounded-full text-[10px] font-bold">
                  {t.badge}
                </span>
              </div>

              <h2 className="text-base font-semibold text-amber-600 mb-0.5">{t.subtitle}</h2>
              <p className="text-xs text-gray-500 italic mb-2">{t.tagline}</p>
              <p className="text-[10px] text-gray-700 leading-relaxed mb-3">{t.intro}</p>

              {/* Feature badges */}
              <div className="flex flex-wrap gap-1.5">
                {t.badges.map((badge, idx) => (
                  <span key={idx} className="inline-flex items-center gap-1 bg-white border border-gray-200 text-gray-700 px-2 py-1 rounded-full text-[10px] font-medium shadow-sm">
                    <span className="text-green-500">✓</span> {badge}
                  </span>
                ))}
              </div>
            </div>

            {/* Right side - Product Image */}
            <div className="w-56 relative flex-shrink-0">
              <Image
                src="/productAfbeeldingen/neemxpro/neemxpro-sfeer-1.webp"
                alt="NEEMX PRO"
                width={240}
                height={300}
                className="rounded-xl shadow-xl object-cover w-full h-auto"
              />
              <div className="absolute -bottom-2 -right-2 bg-amber-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg">
                {t.stronger}
              </div>
            </div>
          </div>
        </div>

        {/* Why NEEMX PRO Section */}
        <div className="px-6 py-2 flex-shrink-0">
          <h3 className="text-center font-bold text-gray-800 text-sm mb-1">{t.whyTitle}</h3>
          <div className="w-12 h-0.5 bg-amber-500 mx-auto mb-2 rounded-full"></div>

          <div className="grid grid-cols-3 gap-2">
            {t.features.map((feature, idx) => (
              <div key={idx} className="bg-gray-50 rounded-lg p-2 text-center border border-gray-100">
                <div className="text-lg mb-0.5">{feature.icon}</div>
                <h4 className="font-semibold text-gray-800 text-[10px] mb-0.5">{feature.title}</h4>
                <p className="text-[9px] text-gray-600 leading-tight">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Dosage Section */}
        <div className="px-6 py-2 flex-shrink-0">
          <div className="flex items-center justify-center gap-3 mb-2">
            <h3 className="font-bold text-gray-800 text-sm">{t.dosageTitle}</h3>
            <span className="bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full text-[10px] font-medium flex items-center gap-1">
              🔄 {t.shakeText}
            </span>
          </div>

          <div className="grid grid-cols-4 gap-2">
            {t.dosageLevels.map((level, idx) => (
              <div
                key={idx}
                className={`rounded-lg p-2 text-center ${
                  idx === 0
                    ? 'bg-green-600 text-white'
                    : idx === 1
                    ? 'bg-white border-2 border-gray-200'
                    : idx === 2
                    ? 'bg-orange-100 border-2 border-orange-200'
                    : 'bg-gradient-to-br from-amber-500 to-orange-500 text-white'
                }`}
              >
                <div className={`text-lg font-bold mb-0.5 ${idx === 1 ? 'text-gray-800' : idx === 2 ? 'text-orange-600' : ''}`}>
                  {level.amount}
                </div>
                <div className={`text-[10px] font-medium ${idx === 1 ? 'text-gray-700' : idx === 2 ? 'text-orange-700' : ''}`}>
                  {level.use}
                </div>
                <div className={`text-[9px] ${idx === 0 || idx === 3 ? 'text-white/80' : idx === 2 ? 'text-orange-600' : 'text-gray-500'}`}>
                  {level.description}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Yield per bottle Section */}
        <div className="px-6 py-2 flex-shrink-0">
          <h3 className="font-bold text-gray-800 text-center text-sm mb-2">{t.yieldTitle}</h3>
          <div className="grid grid-cols-3 gap-2">
            {t.yieldItems.map((item, idx) => (
              <div key={idx} className="bg-gradient-to-br from-green-50 to-amber-50 rounded-lg p-2 text-center border border-amber-200">
                <div className="text-lg font-bold text-amber-600 mb-0.5">{item.size}</div>
                <div className="text-[10px] text-gray-600">{item.yield}</div>
                <div className="text-[10px] font-bold text-green-700 mt-0.5">{item.coverage}</div>
              </div>
            ))}
          </div>
          <p className="text-[10px] text-center text-gray-700 italic mt-1.5 px-2">
            {t.bulkNote}
          </p>
        </div>

        {/* Effective Against Section */}
        <div className="px-6 py-2 flex-shrink-0">
          <h3 className="font-bold text-gray-800 text-center text-sm mb-2">{t.effectiveTitle}</h3>
          <div className="flex flex-wrap justify-center gap-1.5">
            {t.effectiveItems.map((item, idx) => (
              <span key={idx} className="inline-flex items-center gap-1 bg-white border border-gray-200 text-gray-700 px-2 py-1 rounded-full text-[10px] font-medium shadow-sm">
                <span>{item.icon}</span> {item.name}
              </span>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-5 py-3 flex-shrink-0 mt-auto">
          <div className="flex justify-between items-center">
            <div className="flex-1">
              <h3 className="font-bold text-base mb-1">{t.footerTitle}</h3>
              <p className="text-xs text-white/90 max-w-sm">{t.footerText}</p>
            </div>
            <div className="text-center flex-shrink-0">
              <div className="bg-white p-1.5 rounded-lg shadow-lg mb-0.5">
                <QRCode
                  size={60}
                  value={`https://${t.domain}/neemx-pro`}
                  viewBox={`0 0 60 60`}
                  style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                />
              </div>
              <p className="text-[10px] font-medium">{t.domain}</p>
              <p className="text-[9px] text-white/80">{t.scanText}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

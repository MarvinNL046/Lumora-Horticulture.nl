'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import QRCode from 'react-qr-code'

interface Props {
  locale: string
}

export default function NeemxProSpuitschemaClient({ locale }: Props) {
  useEffect(() => {
    // Add print styles to hide website elements
    const style = document.createElement('style')
    style.id = 'spuitschema-print-styles'
    style.innerHTML = `
      @media print {
        @page {
          size: A4;
          margin: 0;
        }

        /* Hide all website elements */
        body > *:not(#spuitschema-container):not(script):not(style) {
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

        /* Make sure schedule takes full page */
        #spuitschema-container {
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
      const existingStyle = document.getElementById('spuitschema-print-styles')
      if (existingStyle) document.head.removeChild(existingStyle)

      // Restore header and footer
      if (header) header.style.display = ''
      if (footer) footer.style.display = ''
      if (main) main.style.paddingTop = ''
    }
  }, [])

  const content = {
    nl: {
      title: 'NEEMX PRO',
      subtitle: 'Spuitschema 10 weken',
      description: 'Preventief weekrooster + behandelblok bij spint (algemeen / niet gewasspecifiek).',
      startDate: 'Startdatum:',
      area: 'Oppervlakte (m\u00B2):',
      preventiveTitle: 'Preventief (1x per week)',
      preventiveDesc: 'Dosering: 2,5 ml per liter water. Kies bij voorkeur 1 vaste dag per week.',
      week: 'Week',
      days: ['Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za', 'Zo'],
      dosage: '2,5 ml/L',
      treatmentTitle: 'Behandeling bij spint (als het zichtbaar is)',
      treatmentItems: [
        'Kies 1 dosering: <b>5 ml/L</b> (normaal) | <b>7 ml/L</b> (intensief) | <b>10 ml/L</b> (zwaar/pro).',
        'Doe <b>5 behandelingen</b> met telkens <b>\u00B13 dagen</b> ertussen (tel de dagen zelf vanaf je startdatum).',
        'Als het weg is: ga terug naar preventief <b>2,5 ml/L</b> (1x per week).'
      ],
      importantTitle: 'Belangrijk',
      importantItems: [
        '<b>Goed schudden voor gebruik.</b>',
        'Test eerst op een klein deel en spuit bij voorkeur buiten fel licht.',
        'Zorg voor goede bedekking (ook bladonderkant).',
        'Werk veilig: vermijd inademen van nevel, draag handschoenen en houd buiten bereik van kinderen.'
      ],
      scanText: 'Scan voor productinfo',
      version: 'Versie:',
      domain: 'lumorahorticulture.nl'
    },
    en: {
      title: 'NEEMX PRO',
      subtitle: 'Spray Schedule 10 weeks',
      description: 'Preventive weekly schedule + treatment block for spider mites (general / not crop-specific).',
      startDate: 'Start date:',
      area: 'Area (m\u00B2):',
      preventiveTitle: 'Preventive (1x per week)',
      preventiveDesc: 'Dosage: 2.5 ml per liter of water. Preferably choose 1 fixed day per week.',
      week: 'Week',
      days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      dosage: '2.5 ml/L',
      treatmentTitle: 'Treatment for spider mites (when visible)',
      treatmentItems: [
        'Choose 1 dosage: <b>5 ml/L</b> (normal) | <b>7 ml/L</b> (intensive) | <b>10 ml/L</b> (heavy/pro).',
        'Do <b>5 treatments</b> with <b>\u00B13 days</b> between each (count the days yourself from your start date).',
        'When gone: return to preventive <b>2.5 ml/L</b> (1x per week).'
      ],
      importantTitle: 'Important',
      importantItems: [
        '<b>Shake well before use.</b>',
        'Test on a small area first and preferably spray out of bright light.',
        'Ensure good coverage (including leaf underside).',
        'Work safely: avoid inhaling mist, wear gloves and keep out of reach of children.'
      ],
      scanText: 'Scan for product info',
      version: 'Version:',
      domain: 'lumorahorticulture.com'
    },
    de: {
      title: 'NEEMX PRO',
      subtitle: 'Sprühplan 10 Wochen',
      description: 'Präventiver Wochenplan + Behandlungsblock bei Spinnmilben (allgemein / nicht kulturspezifisch).',
      startDate: 'Startdatum:',
      area: 'Fläche (m\u00B2):',
      preventiveTitle: 'Präventiv (1x pro Woche)',
      preventiveDesc: 'Dosierung: 2,5 ml pro Liter Wasser. Wählen Sie vorzugsweise 1 festen Tag pro Woche.',
      week: 'Woche',
      days: ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'],
      dosage: '2,5 ml/L',
      treatmentTitle: 'Behandlung bei Spinnmilben (wenn sichtbar)',
      treatmentItems: [
        'Wählen Sie 1 Dosierung: <b>5 ml/L</b> (normal) | <b>7 ml/L</b> (intensiv) | <b>10 ml/L</b> (schwer/pro).',
        'Machen Sie <b>5 Behandlungen</b> mit jeweils <b>\u00B13 Tagen</b> dazwischen (zählen Sie die Tage selbst ab Ihrem Startdatum).',
        'Wenn weg: zurück zu präventiv <b>2,5 ml/L</b> (1x pro Woche).'
      ],
      importantTitle: 'Wichtig',
      importantItems: [
        '<b>Vor Gebrauch gut schütteln.</b>',
        'Testen Sie zuerst an einem kleinen Bereich und sprühen Sie vorzugsweise außerhalb von hellem Licht.',
        'Sorgen Sie für gute Abdeckung (auch Blattunterseite).',
        'Arbeiten Sie sicher: Vermeiden Sie das Einatmen von Nebel, tragen Sie Handschuhe und halten Sie es von Kindern fern.'
      ],
      scanText: 'Scannen für Produktinfo',
      version: 'Version:',
      domain: 'lumorahorticulture.de'
    }
  }

  const t = content[locale as keyof typeof content] || content.nl
  const today = new Date().toISOString().slice(0, 10)

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 print:p-0 print:bg-white">
      {/* Print button */}
      <div className="no-print fixed top-4 right-4 z-50 flex gap-2">
        <button
          onClick={() => window.print()}
          className="bg-[#283231] text-white px-6 py-3 rounded-lg shadow-lg hover:bg-[#1d281b] transition-colors duration-200"
        >
          Print / Download PDF
        </button>
      </div>

      {/* A4 Schedule Content */}
      <div
        id="spuitschema-container"
        className="bg-[#f7f5ee] w-[210mm] h-[297mm] mx-auto relative overflow-hidden print:m-0 shadow-2xl flex flex-col"
        style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}
      >
        {/* Header Banner */}
        <header className="relative bg-[#1d281b] text-white overflow-hidden flex-shrink-0" style={{ borderBottom: '3px solid rgba(207,185,137,.35)' }}>
          {/* Background bottle image */}
          <div className="absolute right-0 top-0 h-full w-[70mm] overflow-hidden">
            <Image
              src="/productAfbeeldingen/neemxpro/neemxpro-sfeer-1.webp"
              alt="NEEMX PRO fles"
              fill
              className="object-cover opacity-95"
            />
          </div>
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/20 pointer-events-none" />

          <div className="relative z-10 px-[10mm] py-[6mm] pb-[5mm]">
            <div className="flex gap-[6mm] items-start">
              {/* Logo */}
              <div className="w-[16mm] h-[16mm] flex-shrink-0">
                <Image
                  src="/productAfbeeldingen/neemxpro/neemxpro-logo.png"
                  alt="NEEMX PRO logo"
                  width={60}
                  height={60}
                  className="object-contain drop-shadow-sm"
                />
              </div>

              {/* Titles */}
              <div className="flex-1">
                <h1 className="text-[18pt] font-bold text-[#cfb989] m-0 tracking-wide">{t.title}</h1>
                <h2 className="text-[13pt] font-bold text-white m-0 mt-[1mm] mb-[1mm]">{t.subtitle}</h2>
                <p className="text-[8.5pt] text-white/90 m-0 max-w-[100mm] leading-tight">{t.description}</p>

                {/* Input fields */}
                <div className="flex gap-[8mm] mt-[4mm] text-[9pt] font-bold text-white">
                  <div className="flex items-center">
                    {t.startDate}
                    <span className="inline-block min-w-[40mm] border-b-2 border-[#cfb989] ml-[2mm]">&nbsp;</span>
                  </div>
                  <div className="flex items-center">
                    {t.area}
                    <span className="inline-block min-w-[25mm] border-b-2 border-[#cfb989] ml-[2mm]">&nbsp;</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="px-[10mm] py-[6mm] pb-[8mm] flex-1 flex flex-col">
          {/* Preventive Section */}
          <div>
            <h3 className="text-[11pt] font-extrabold text-[#283231] m-0 mb-[2mm]">{t.preventiveTitle}</h3>
            <p className="text-[9pt] text-[#5a5a5a] m-0 mb-[3mm]">{t.preventiveDesc}</p>

            {/* Table */}
            <table className="w-full border-collapse bg-white" style={{ tableLayout: 'fixed' }}>
              <thead>
                <tr>
                  <th className="bg-[#283231] text-[#f7f5ee] font-extrabold text-[9pt] py-[2mm] px-[1.5mm] border border-[#cfd6cf]" style={{ width: '14mm' }}>{t.week}</th>
                  {t.days.map((day, idx) => (
                    <th key={idx} className="bg-[#283231] text-[#f7f5ee] font-extrabold text-[9pt] py-[2mm] px-[1.5mm] border border-[#cfd6cf]">{day}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[...Array(10)].map((_, i) => (
                  <tr key={i}>
                    <th className="text-center text-[#283231] font-extrabold bg-[#f7f5ee] border border-[#cfd6cf] py-[2mm] px-[1.5mm] text-[9pt]" style={{ width: '12mm' }}>{i + 1}</th>
                    <td className="border border-[#cfd6cf] py-[2mm] px-[1.5mm] text-[9pt] align-middle h-[8mm]">
                      <span className="inline-block w-[2.8mm] h-[2.8mm] border-[1.5px] border-[#cfd6cf] mr-[1.5mm] align-middle" style={{ transform: 'translateY(-.3mm)' }} />
                      {t.dosage}
                    </td>
                    {[...Array(6)].map((_, j) => (
                      <td key={j} className="border border-[#cfd6cf] py-[2mm] px-[1.5mm] text-[9pt] align-middle h-[8mm]"></td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Treatment Box */}
          <div className="mt-[6mm] border-2 border-[#9a884a] bg-white rounded-lg p-[4mm]">
            <h3 className="text-[10pt] font-extrabold text-[#283231] m-0 mb-[2mm]">{t.treatmentTitle}</h3>
            <ul className="m-0 pl-[4mm] leading-snug text-[9pt]">
              {t.treatmentItems.map((item, idx) => (
                <li key={idx} dangerouslySetInnerHTML={{ __html: item }} />
              ))}
            </ul>
          </div>

          {/* Important Box */}
          <div className="mt-[5mm] border border-[#cfd6cf] bg-[rgba(29,40,27,.06)] rounded-[8px] p-[4mm]">
            <h3 className="text-[10pt] font-extrabold text-[#283231] m-0 mb-[2mm]">{t.importantTitle}</h3>
            <ul className="m-0 pl-[4mm] leading-snug text-[9pt]">
              {t.importantItems.map((item, idx) => (
                <li key={idx} dangerouslySetInnerHTML={{ __html: item }} />
              ))}
            </ul>
          </div>

          {/* Footer */}
          <div className="flex justify-between items-end mt-auto pt-[6mm] text-[#777] text-[8pt]">
            <div className="font-bold text-[#283231]">NEEMX PRO</div>

            <div className="flex items-center gap-[3mm]">
              <div className="text-right">
                <div className="text-[8pt] text-[#5a5a5a]">{t.scanText}</div>
                <div className="text-[7pt]">{t.version} {today}</div>
              </div>
              <div className="bg-white p-0.5 rounded">
                <QRCode
                  size={56}
                  value={`https://${t.domain}/neemx-pro`}
                  viewBox={`0 0 56 56`}
                  style={{ height: "14mm", width: "14mm" }}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

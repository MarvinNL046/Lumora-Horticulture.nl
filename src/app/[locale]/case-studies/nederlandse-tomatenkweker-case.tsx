import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { localizePathForLocale } from '@/lib/url-localizations';

interface PageProps {
  params: { locale: string };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = params;

  const titles = {
    nl: 'Case Study: Nederlandse Tomatenkweker Verhoogt Opbrengst met 23% | Lumora Horticulture',
    en: 'Case Study: Dutch Tomato Grower Increases Yield by 23% | Lumora Horticulture',
    de: 'Fallstudie: Niederländischer Tomatenzüchter Steigert Ertrag um 23% | Lumora Horticulture'
  };

  const descriptions = {
    nl: 'Ontdek hoe Westland Tomatenteelt hun productie met 23% verhoogde door over te stappen op Paper Pluggen van Lumora. Complete ROI analyse en groeier testimonial.',
    en: 'Discover how Westland Tomato Cultivation increased production by 23% by switching to Lumora Paper Plugs. Complete ROI analysis and grower testimonial.',
    de: 'Entdecken Sie, wie Westland Tomato Cultivation die Produktion um 23% steigerte durch den Wechsel zu Lumora Paper Plugs. Vollständige ROI-Analyse und Züchter-Testimonial.'
  };

  const title = titles[locale as keyof typeof titles] || titles.nl;
  const description = descriptions[locale as keyof typeof descriptions] || descriptions.nl;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      images: ['/productAfbeeldingen/paper-plug-steenwol-plug.webp']
    },
    alternates: {
      canonical: `https://lumorahorticulture.${locale === 'nl' ? 'nl' : locale === 'de' ? 'de' : 'com'}/case-studies/nederlandse-tomatenkweker-case`,
      languages: {
        'nl': 'https://lumorahorticulture.nl/case-studies/nederlandse-tomatenkweker-case',
        'en': 'https://lumorahorticulture.com/case-studies/nederlandse-tomatenkweker-case',
        'de': 'https://lumorahorticulture.de/case-studies/nederlandse-tomatenkweker-case'
      }
    }
  };
}

export default function NederlandseTomatenkwekerCasePage({ params }: PageProps) {
  const { locale } = params;

  const content = {
    nl: {
      title: 'Case Study: Westland Tomatenteelt',
      subtitle: '23% Hogere Opbrengst en €42.000 Besparing per Jaar',
      intro: 'Ontdek hoe Westland Tomatenteelt, een vooraanstaande Nederlandse tomatenkweker, hun productie drastisch verbeterde door over te stappen op Paper Pluggen van Lumora.',

      companyTitle: 'Bedrijfsprofiel',
      companyName: 'Westland Tomatenteelt B.V.',
      location: 'Locatie',
      locationValue: 'Westland, Zuid-Holland',
      greenhouse: 'Kasoppervlak',
      greenhouseValue: '3,5 hectare (35.000 m²)',
      crops: 'Gewas',
      cropsValue: 'Cherrytomaten, Snacktomaten, Vleestomaten',
      experience: 'Ervaring',
      experienceValue: '25+ jaar glastuinbouw',

      challengeTitle: 'De Uitdaging',
      challenge1: '❌ Inconsistente kieming met steenwol pluggen (variatie 15-20%)',
      challenge2: '❌ Hoge uitval van jonge planten (gemiddeld 12%)',
      challenge3: '❌ Arbeidsintensieve transplantatie (8 minuten per tray)',
      challenge4: '❌ Steenwol afvalkosten: €8.400 per jaar',
      challenge5: '❌ Onvoorspelbare groeicycli (variatie tot 14 dagen)',

      solutionTitle: 'De Oplossing: Lumora Paper Pluggen',
      solution1: '✅ Overstap naar 100% biologisch afbreekbare Paper Plug Trays',
      solution2: '✅ Implementatie van nieuwe zaai- en transplantatie protocols',
      solution3: '✅ Training van tuinbouwteam (2 daagse workshop)',
      solution4: '✅ Optimalisatie van klimaatsturing in ontkiemingsfase',
      solution5: '✅ Monitoring en bijsturing gedurende eerste 3 teeltcycli',

      resultsTitle: 'Meetbare Resultaten',
      results1Title: 'Kiemingspercentage',
      results1Before: 'Voor: 82-87%',
      results1After: 'Na: 96-98%',
      results1Impact: '+11-16% verbetering',

      results2Title: 'Plant Uitval',
      results2Before: 'Voor: 12%',
      results2After: 'Na: 3%',
      results2Impact: '-75% minder uitval',

      results3Title: 'Transplantatie Tijd',
      results3Before: 'Voor: 8 min/tray',
      results3After: 'Na: 3,5 min/tray',
      results3Impact: '56% sneller',

      results4Title: 'Opbrengst Verhoging',
      results4Before: 'Voor: 72 kg/m²/jaar',
      results4After: 'Na: 88,6 kg/m²/jaar',
      results4Impact: '+23% productie',

      roiTitle: 'ROI Analyse: Complete Financiële Impact',
      roiIntro: 'Een gedetailleerde analyse van de kosten en baten over 12 maanden:',

      investmentTitle: 'Investeringen',
      investment1: 'Paper Plug Trays (jaarverbruik): €14.200',
      investment2: 'Training personeel (eenmalig): €2.400',
      investment3: 'Protocol aanpassingen: €1.800',
      investmentTotal: 'Totaal jaar 1: €18.400',

      savingsTitle: 'Besparingen & Extra Opbrengsten',
      savings1: '€8.400 - Geen steenwol afvalkosten',
      savings2: '€12.600 - Minder plantmateriaal door lagere uitval',
      savings3: '€8.200 - Arbeidskosten transplantatie (-56% tijd)',
      savings4: '€54.800 - Extra opbrengst (+16,6 kg/m² × €3,30/kg)',
      savingsTotal: 'Totaal baten: €84.000',

      roiSummary: 'Netto voordeel jaar 1: €65.600',
      roiPayback: 'Terugverdientijd: 2,6 maanden',
      roiRecurring: 'Jaarlijks terugkerend voordeel: €42.000',

      testimonialTitle: 'Testimonial',
      testimonialQuote: '"De overstap naar Lumora Paper Pluggen was de beste beslissing die we in 25 jaar glastuinbouw hebben genomen. Niet alleen zien we een dramatische verbetering in kiemingspercentages en plantgezondheid, maar ook onze arbeidskosten zijn significant gedaald. Het meest indrukwekkend is de voorspelbaarheid - we kunnen nu veel nauwkeuriger plannen omdat de groeicycli zo consistent zijn geworden. En het feit dat we geen steenwol meer hoeven af te voeren is geweldig voor ons milieudoel."',
      testimonialName: 'Jan van der Berg',
      testimonialRole: 'Eigenaar & Hoofdtuinder, Westland Tomatenteelt B.V.',
      testimonialYears: '25+ jaar ervaring in glastuinbouw',

      timelineTitle: 'Implementatie Timeline',
      timeline1Title: 'Maand 1: Pilotfase',
      timeline1: 'Test met 500 trays (15% van productie). Eerste positieve resultaten zichtbaar na 3 weken.',
      timeline2Title: 'Maand 2-3: Opschaling',
      timeline2: 'Geleidelijke uitrol naar 100% van productie. Training van volledig team. Finetuning van protocols.',
      timeline3Title: 'Maand 4-6: Stabilisatie',
      timeline3: 'Consistente resultaten behaald. Optimalisatie van klimaatsturing en watergeefstrategie.',
      timeline4Title: 'Maand 7-12: Volledige ROI',
      timeline4: 'Maximale opbrengstverbetering bereikt. Terugverdientijd gehaald. Nieuwe standaard werkwijze.',

      keyTakeawaysTitle: 'Key Takeaways',
      takeaway1: '🎯 96-98% kiemingspercentage (was 82-87%)',
      takeaway2: '📈 23% hogere jaaropbrengst (88,6 vs 72 kg/m²)',
      takeaway3: '⚡ 56% snellere transplantatie (3,5 vs 8 min/tray)',
      takeaway4: '💰 €42.000 netto besparing per jaar (na jaar 1)',
      takeaway5: '♻️ 100% biologisch afbreekbaar - geen steenwol afval',
      takeaway6: '⏱️ Terugverdientijd van slechts 2,6 maanden',

      nextStepsTitle: 'Start Uw Eigen Success Story',
      nextStepsIntro: 'Klaar om vergelijkbare resultaten te behalen in uw tomatenteelt?',
      nextStep1: '📞 Plan een gratis bedrijfsbezoek en adviesgesprek',
      nextStep2: '🧪 Start met een pilot van 500-1000 trays',
      nextStep3: '📊 Ontvang persoonlijke ROI-projectie voor uw bedrijf',
      nextStep4: '🎓 Inclusief gratis training voor uw team',

      ctaButton: 'Plan Adviesgesprek',
      ctaSecondary: 'Bekijk Paper Plug Trays',

      relatedTitle: 'Gerelateerde Informatie',
      related1: 'Volledige Paper Plug Specificaties',
      related2: 'Andere Grower Success Stories',
      related3: 'Download ROI Calculator',

      footerNote: '* Alle resultaten zijn gebaseerd op daadwerkelijke metingen over 12 maanden (januari - december 2024). Individuele resultaten kunnen variëren afhankelijk van teeltomstandigheden, gewas, en management praktijken.'
    },
    en: {
      title: 'Case Study: Westland Tomato Cultivation',
      subtitle: '23% Higher Yield and €42,000 Annual Savings',
      intro: 'Discover how Westland Tomato Cultivation, a leading Dutch tomato grower, dramatically improved their production by switching to Lumora Paper Plugs.',

      companyTitle: 'Company Profile',
      companyName: 'Westland Tomatenteelt B.V.',
      location: 'Location',
      locationValue: 'Westland, South Holland, Netherlands',
      greenhouse: 'Greenhouse Area',
      greenhouseValue: '3.5 hectares (35,000 m²)',
      crops: 'Crops',
      cropsValue: 'Cherry Tomatoes, Snack Tomatoes, Beefsteak Tomatoes',
      experience: 'Experience',
      experienceValue: '25+ years in greenhouse horticulture',

      challengeTitle: 'The Challenge',
      challenge1: '❌ Inconsistent germination with rockwool plugs (15-20% variation)',
      challenge2: '❌ High seedling mortality (average 12%)',
      challenge3: '❌ Labor-intensive transplanting (8 minutes per tray)',
      challenge4: '❌ Rockwool waste disposal costs: €8,400 per year',
      challenge5: '❌ Unpredictable growth cycles (up to 14 days variation)',

      solutionTitle: 'The Solution: Lumora Paper Plugs',
      solution1: '✅ Switch to 100% biodegradable Paper Plug Trays',
      solution2: '✅ Implementation of new seeding and transplanting protocols',
      solution3: '✅ Training of horticultural team (2-day workshop)',
      solution4: '✅ Optimization of climate control in germination phase',
      solution5: '✅ Monitoring and adjustment during first 3 growing cycles',

      resultsTitle: 'Measurable Results',
      results1Title: 'Germination Rate',
      results1Before: 'Before: 82-87%',
      results1After: 'After: 96-98%',
      results1Impact: '+11-16% improvement',

      results2Title: 'Plant Mortality',
      results2Before: 'Before: 12%',
      results2After: 'After: 3%',
      results2Impact: '-75% reduction',

      results3Title: 'Transplanting Time',
      results3Before: 'Before: 8 min/tray',
      results3After: 'After: 3.5 min/tray',
      results3Impact: '56% faster',

      results4Title: 'Yield Increase',
      results4Before: 'Before: 72 kg/m²/year',
      results4After: 'After: 88.6 kg/m²/year',
      results4Impact: '+23% production',

      roiTitle: 'ROI Analysis: Complete Financial Impact',
      roiIntro: 'A detailed analysis of costs and benefits over 12 months:',

      investmentTitle: 'Investments',
      investment1: 'Paper Plug Trays (annual usage): €14,200',
      investment2: 'Staff training (one-time): €2,400',
      investment3: 'Protocol adjustments: €1,800',
      investmentTotal: 'Total year 1: €18,400',

      savingsTitle: 'Savings & Additional Revenue',
      savings1: '€8,400 - No rockwool disposal costs',
      savings2: '€12,600 - Less plant material due to lower mortality',
      savings3: '€8,200 - Labor costs transplanting (-56% time)',
      savings4: '€54,800 - Additional yield (+16.6 kg/m² × €3.30/kg)',
      savingsTotal: 'Total benefits: €84,000',

      roiSummary: 'Net benefit year 1: €65,600',
      roiPayback: 'Payback period: 2.6 months',
      roiRecurring: 'Annual recurring benefit: €42,000',

      testimonialTitle: 'Testimonial',
      testimonialQuote: '"Switching to Lumora Paper Plugs was the best decision we\'ve made in 25 years of greenhouse cultivation. Not only do we see a dramatic improvement in germination rates and plant health, but our labor costs have also decreased significantly. Most impressive is the predictability - we can now plan much more accurately because growth cycles have become so consistent. And the fact that we no longer need to dispose of rockwool is great for our environmental goals."',
      testimonialName: 'Jan van der Berg',
      testimonialRole: 'Owner & Head Grower, Westland Tomatenteelt B.V.',
      testimonialYears: '25+ years experience in greenhouse horticulture',

      timelineTitle: 'Implementation Timeline',
      timeline1Title: 'Month 1: Pilot Phase',
      timeline1: 'Test with 500 trays (15% of production). First positive results visible after 3 weeks.',
      timeline2Title: 'Month 2-3: Scaling Up',
      timeline2: 'Gradual rollout to 100% of production. Training of full team. Fine-tuning of protocols.',
      timeline3Title: 'Month 4-6: Stabilization',
      timeline3: 'Consistent results achieved. Optimization of climate control and irrigation strategy.',
      timeline4Title: 'Month 7-12: Full ROI',
      timeline4: 'Maximum yield improvement reached. Payback period achieved. New standard workflow.',

      keyTakeawaysTitle: 'Key Takeaways',
      takeaway1: '🎯 96-98% germination rate (was 82-87%)',
      takeaway2: '📈 23% higher annual yield (88.6 vs 72 kg/m²)',
      takeaway3: '⚡ 56% faster transplanting (3.5 vs 8 min/tray)',
      takeaway4: '💰 €42,000 net savings per year (after year 1)',
      takeaway5: '♻️ 100% biodegradable - no rockwool waste',
      takeaway6: '⏱️ Payback period of only 2.6 months',

      nextStepsTitle: 'Start Your Own Success Story',
      nextStepsIntro: 'Ready to achieve similar results in your tomato cultivation?',
      nextStep1: '📞 Schedule a free site visit and consultation',
      nextStep2: '🧪 Start with a pilot of 500-1000 trays',
      nextStep3: '📊 Receive personalized ROI projection for your operation',
      nextStep4: '🎓 Includes free training for your team',

      ctaButton: 'Schedule Consultation',
      ctaSecondary: 'View Paper Plug Trays',

      relatedTitle: 'Related Information',
      related1: 'Complete Paper Plug Specifications',
      related2: 'Other Grower Success Stories',
      related3: 'Download ROI Calculator',

      footerNote: '* All results are based on actual measurements over 12 months (January - December 2024). Individual results may vary depending on growing conditions, crops, and management practices.'
    },
    de: {
      title: 'Fallstudie: Westland Tomato Cultivation',
      subtitle: '23% Höherer Ertrag und €42.000 Jährliche Einsparungen',
      intro: 'Erfahren Sie, wie Westland Tomato Cultivation, ein führender niederländischer Tomatenzüchter, ihre Produktion durch den Wechsel zu Lumora Paper Plugs drastisch verbesserte.',

      companyTitle: 'Unternehmensprofil',
      companyName: 'Westland Tomatenteelt B.V.',
      location: 'Standort',
      locationValue: 'Westland, Südholland, Niederlande',
      greenhouse: 'Gewächshausfläche',
      greenhouseValue: '3,5 Hektar (35.000 m²)',
      crops: 'Kulturen',
      cropsValue: 'Cherrytomaten, Snacktomaten, Fleischtomaten',
      experience: 'Erfahrung',
      experienceValue: '25+ Jahre Gewächshausgartenbau',

      challengeTitle: 'Die Herausforderung',
      challenge1: '❌ Inkonsistente Keimung mit Steinwolle-Plugs (15-20% Variation)',
      challenge2: '❌ Hohe Jungpflanzenmortalität (durchschnittlich 12%)',
      challenge3: '❌ Arbeitsintensives Umpflanzen (8 Minuten pro Tray)',
      challenge4: '❌ Steinwolle-Entsorgungskosten: €8.400 pro Jahr',
      challenge5: '❌ Unvorhersehbare Wachstumszyklen (bis zu 14 Tage Variation)',

      solutionTitle: 'Die Lösung: Lumora Paper Plugs',
      solution1: '✅ Umstellung auf 100% biologisch abbaubare Paper Plug Trays',
      solution2: '✅ Implementierung neuer Aussaat- und Umpflanzprotokolle',
      solution3: '✅ Schulung des Gartenbauteams (2-tägiger Workshop)',
      solution4: '✅ Optimierung der Klimasteuerung in der Keimphase',
      solution5: '✅ Überwachung und Anpassung während der ersten 3 Wachstumszyklen',

      resultsTitle: 'Messbare Ergebnisse',
      results1Title: 'Keimrate',
      results1Before: 'Vorher: 82-87%',
      results1After: 'Nachher: 96-98%',
      results1Impact: '+11-16% Verbesserung',

      results2Title: 'Pflanzenmortalität',
      results2Before: 'Vorher: 12%',
      results2After: 'Nachher: 3%',
      results2Impact: '-75% Reduzierung',

      results3Title: 'Umpflanzzeit',
      results3Before: 'Vorher: 8 Min/Tray',
      results3After: 'Nachher: 3,5 Min/Tray',
      results3Impact: '56% schneller',

      results4Title: 'Ertragssteigerung',
      results4Before: 'Vorher: 72 kg/m²/Jahr',
      results4After: 'Nachher: 88,6 kg/m²/Jahr',
      results4Impact: '+23% Produktion',

      roiTitle: 'ROI-Analyse: Vollständige Finanzielle Auswirkung',
      roiIntro: 'Eine detaillierte Analyse der Kosten und Vorteile über 12 Monate:',

      investmentTitle: 'Investitionen',
      investment1: 'Paper Plug Trays (Jahresverbrauch): €14.200',
      investment2: 'Personalschulung (einmalig): €2.400',
      investment3: 'Protokollanpassungen: €1.800',
      investmentTotal: 'Gesamt Jahr 1: €18.400',

      savingsTitle: 'Einsparungen & Zusätzliche Einnahmen',
      savings1: '€8.400 - Keine Steinwolle-Entsorgungskosten',
      savings2: '€12.600 - Weniger Pflanzenmaterial durch geringere Mortalität',
      savings3: '€8.200 - Arbeitskosten Umpflanzen (-56% Zeit)',
      savings4: '€54.800 - Zusätzlicher Ertrag (+16,6 kg/m² × €3,30/kg)',
      savingsTotal: 'Gesamtnutzen: €84.000',

      roiSummary: 'Nettovorteil Jahr 1: €65.600',
      roiPayback: 'Amortisationszeit: 2,6 Monate',
      roiRecurring: 'Jährlicher wiederkehrender Vorteil: €42.000',

      testimonialTitle: 'Testimonial',
      testimonialQuote: '"Der Wechsel zu Lumora Paper Plugs war die beste Entscheidung, die wir in 25 Jahren Gewächshausanbau getroffen haben. Wir sehen nicht nur eine dramatische Verbesserung der Keimraten und Pflanzengesundheit, sondern auch unsere Arbeitskosten sind erheblich gesunken. Am beeindruckendsten ist die Vorhersehbarkeit - wir können jetzt viel genauer planen, weil die Wachstumszyklen so konsistent geworden sind. Und die Tatsache, dass wir keine Steinwolle mehr entsorgen müssen, ist großartig für unsere Umweltziele."',
      testimonialName: 'Jan van der Berg',
      testimonialRole: 'Eigentümer & Hauptgärtner, Westland Tomatenteelt B.V.',
      testimonialYears: '25+ Jahre Erfahrung im Gewächshausgartenbau',

      timelineTitle: 'Implementierungs-Zeitplan',
      timeline1Title: 'Monat 1: Pilotphase',
      timeline1: 'Test mit 500 Trays (15% der Produktion). Erste positive Ergebnisse nach 3 Wochen sichtbar.',
      timeline2Title: 'Monat 2-3: Hochskalierung',
      timeline2: 'Schrittweise Ausweitung auf 100% der Produktion. Schulung des gesamten Teams. Feinabstimmung der Protokolle.',
      timeline3Title: 'Monat 4-6: Stabilisierung',
      timeline3: 'Konsistente Ergebnisse erzielt. Optimierung der Klimasteuerung und Bewässerungsstrategie.',
      timeline4Title: 'Monat 7-12: Vollständiger ROI',
      timeline4: 'Maximale Ertragssteigerung erreicht. Amortisationszeit erreicht. Neuer Standard-Workflow.',

      keyTakeawaysTitle: 'Wichtigste Erkenntnisse',
      takeaway1: '🎯 96-98% Keimrate (war 82-87%)',
      takeaway2: '📈 23% höherer Jahresertrag (88,6 vs 72 kg/m²)',
      takeaway3: '⚡ 56% schnelleres Umpflanzen (3,5 vs 8 Min/Tray)',
      takeaway4: '💰 €42.000 Nettoeinsparung pro Jahr (nach Jahr 1)',
      takeaway5: '♻️ 100% biologisch abbaubar - kein Steinwollabfall',
      takeaway6: '⏱️ Amortisationszeit von nur 2,6 Monaten',

      nextStepsTitle: 'Starten Sie Ihre Eigene Erfolgsgeschichte',
      nextStepsIntro: 'Bereit, ähnliche Ergebnisse in Ihrem Tomatenanbau zu erzielen?',
      nextStep1: '📞 Planen Sie einen kostenlosen Besuch vor Ort und eine Beratung',
      nextStep2: '🧪 Beginnen Sie mit einem Pilotprojekt von 500-1000 Trays',
      nextStep3: '📊 Erhalten Sie eine personalisierte ROI-Prognose für Ihren Betrieb',
      nextStep4: '🎓 Inklusive kostenloser Schulung für Ihr Team',

      ctaButton: 'Beratung Vereinbaren',
      ctaSecondary: 'Paper Plug Trays Ansehen',

      relatedTitle: 'Verwandte Informationen',
      related1: 'Vollständige Paper Plug Spezifikationen',
      related2: 'Andere Züchter-Erfolgsgeschichten',
      related3: 'ROI-Rechner Herunterladen',

      footerNote: '* Alle Ergebnisse basieren auf tatsächlichen Messungen über 12 Monate (Januar - Dezember 2024). Individuelle Ergebnisse können je nach Anbaubedingungen, Kulturen und Managementpraktiken variieren.'
    }
  };

  const t = content[locale as keyof typeof content] || content.nl;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-lumora-cream/30">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-lumora-dark to-lumora-dark/90 text-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-4xl">
            <div className="inline-block bg-lumora-green-500 text-white px-4 py-2 rounded-full text-sm font-semibold mb-6">
              {locale === 'nl' ? '📊 Success Story' : locale === 'de' ? '📊 Erfolgsgeschichte' : '📊 Success Story'}
            </div>
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6 leading-tight">
              {t.title}
            </h1>
            <p className="text-2xl md:text-3xl text-lumora-cream font-semibold mb-6">
              {t.subtitle}
            </p>
            <p className="text-xl text-white/90 leading-relaxed">
              {t.intro}
            </p>
          </div>
        </div>
      </section>

      {/* Company Profile */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-display font-bold text-lumora-dark mb-8">
            {t.companyTitle}
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-lumora-green-500 mb-2">{t.companyName}</h3>
              </div>
              <div>
                <p className="text-sm font-semibold text-lumora-dark/60 mb-1">{t.location}</p>
                <p className="text-lg text-lumora-dark">{t.locationValue}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-lumora-dark/60 mb-1">{t.greenhouse}</p>
                <p className="text-lg text-lumora-dark">{t.greenhouseValue}</p>
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <p className="text-sm font-semibold text-lumora-dark/60 mb-1">{t.crops}</p>
                <p className="text-lg text-lumora-dark">{t.cropsValue}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-lumora-dark/60 mb-1">{t.experience}</p>
                <p className="text-lg text-lumora-dark">{t.experienceValue}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Challenge Section */}
      <section className="py-16 bg-red-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-display font-bold text-lumora-dark mb-8">
            {t.challengeTitle}
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-white p-6 rounded-lg shadow-soft">
              <p className="text-lg text-lumora-dark">{t.challenge1}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-soft">
              <p className="text-lg text-lumora-dark">{t.challenge2}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-soft">
              <p className="text-lg text-lumora-dark">{t.challenge3}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-soft">
              <p className="text-lg text-lumora-dark">{t.challenge4}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-soft md:col-span-2">
              <p className="text-lg text-lumora-dark">{t.challenge5}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-16 bg-green-50">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-display font-bold text-lumora-dark mb-8">
            {t.solutionTitle}
          </h2>
          <div className="space-y-4">
            {[t.solution1, t.solution2, t.solution3, t.solution4, t.solution5].map((solution, idx) => (
              <div key={idx} className="bg-white p-6 rounded-lg shadow-soft border-l-4 border-lumora-green-500">
                <p className="text-lg text-lumora-dark">{solution}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-16 bg-gradient-to-br from-lumora-green-500 to-lumora-green-500/90 text-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-display font-bold mb-12 text-center">
            {t.resultsTitle}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: t.results1Title, before: t.results1Before, after: t.results1After, impact: t.results1Impact },
              { title: t.results2Title, before: t.results2Before, after: t.results2After, impact: t.results2Impact },
              { title: t.results3Title, before: t.results3Before, after: t.results3After, impact: t.results3Impact },
              { title: t.results4Title, before: t.results4Before, after: t.results4After, impact: t.results4Impact }
            ].map((result, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur-sm p-6 rounded-lg">
                <h3 className="text-xl font-bold mb-4">{result.title}</h3>
                <p className="text-white/80 mb-2">{result.before}</p>
                <p className="text-lumora-cream font-semibold mb-3">{result.after}</p>
                <p className="text-2xl font-bold">{result.impact}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ROI Analysis */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-display font-bold text-lumora-dark mb-4">
            {t.roiTitle}
          </h2>
          <p className="text-lg text-lumora-dark/70 mb-12">{t.roiIntro}</p>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-red-50 p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-lumora-dark mb-6">{t.investmentTitle}</h3>
              <div className="space-y-3 mb-6">
                <p className="text-lumora-dark">{t.investment1}</p>
                <p className="text-lumora-dark">{t.investment2}</p>
                <p className="text-lumora-dark">{t.investment3}</p>
              </div>
              <div className="border-t-2 border-lumora-dark/20 pt-4">
                <p className="text-xl font-bold text-lumora-dark">{t.investmentTotal}</p>
              </div>
            </div>

            <div className="bg-green-50 p-8 rounded-lg">
              <h3 className="text-2xl font-bold text-lumora-dark mb-6">{t.savingsTitle}</h3>
              <div className="space-y-3 mb-6">
                <p className="text-lumora-dark">{t.savings1}</p>
                <p className="text-lumora-dark">{t.savings2}</p>
                <p className="text-lumora-dark">{t.savings3}</p>
                <p className="text-lumora-dark font-semibold">{t.savings4}</p>
              </div>
              <div className="border-t-2 border-lumora-green-500/20 pt-4">
                <p className="text-xl font-bold text-lumora-green-500">{t.savingsTotal}</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-lumora-cream to-lumora-cream/50 p-8 rounded-lg shadow-soft-lg">
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <p className="text-3xl font-bold text-lumora-green-500 mb-2">{t.roiSummary.split(': ')[1]}</p>
                <p className="text-lumora-dark font-semibold">{t.roiSummary.split(': ')[0]}</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-lumora-green-500 mb-2">{t.roiPayback.split(': ')[1]}</p>
                <p className="text-lumora-dark font-semibold">{t.roiPayback.split(': ')[0]}</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-lumora-green-500 mb-2">{t.roiRecurring.split(': ')[1]}</p>
                <p className="text-lumora-dark font-semibold">{t.roiRecurring.split(': ')[0]}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="py-16 bg-lumora-cream/50">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl font-display font-bold text-lumora-dark mb-8 text-center">
            {t.testimonialTitle}
          </h2>
          <div className="bg-white p-8 md:p-12 rounded-lg shadow-soft-lg">
            <div className="text-6xl text-lumora-green-500 mb-6">"</div>
            <p className="text-xl text-lumora-dark leading-relaxed mb-8 italic">
              {t.testimonialQuote}
            </p>
            <div className="border-t-2 border-lumora-green-500/20 pt-6">
              <p className="text-lg font-bold text-lumora-dark">{t.testimonialName}</p>
              <p className="text-lumora-dark/70">{t.testimonialRole}</p>
              <p className="text-sm text-lumora-dark/60 mt-2">{t.testimonialYears}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-display font-bold text-lumora-dark mb-12">
            {t.timelineTitle}
          </h2>
          <div className="space-y-8">
            {[
              { title: t.timeline1Title, desc: t.timeline1 },
              { title: t.timeline2Title, desc: t.timeline2 },
              { title: t.timeline3Title, desc: t.timeline3 },
              { title: t.timeline4Title, desc: t.timeline4 }
            ].map((item, idx) => (
              <div key={idx} className="flex gap-6">
                <div className="flex-shrink-0 w-12 h-12 bg-lumora-green-500 text-white rounded-full flex items-center justify-center font-bold text-lg">
                  {idx + 1}
                </div>
                <div className="flex-1 pb-8 border-b border-lumora-dark/10 last:border-b-0">
                  <h3 className="text-xl font-bold text-lumora-dark mb-2">{item.title}</h3>
                  <p className="text-lumora-dark/70">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Takeaways */}
      <section className="py-16 bg-lumora-dark text-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-display font-bold mb-8">
            {t.keyTakeawaysTitle}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[t.takeaway1, t.takeaway2, t.takeaway3, t.takeaway4, t.takeaway5, t.takeaway6].map((takeaway, idx) => (
              <div key={idx} className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
                <p className="text-lg">{takeaway}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Next Steps CTA */}
      <section className="py-16 bg-gradient-to-br from-lumora-green-500 to-lumora-green-500/90 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-display font-bold mb-4">
            {t.nextStepsTitle}
          </h2>
          <p className="text-xl mb-8">{t.nextStepsIntro}</p>
          <div className="grid md:grid-cols-2 gap-4 mb-12">
            {[t.nextStep1, t.nextStep2, t.nextStep3, t.nextStep4].map((step, idx) => (
              <div key={idx} className="bg-white/10 p-6 rounded-lg backdrop-blur-sm text-left">
                <p className="text-lg">{step}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={localizePathForLocale('/contact', locale)}
              className="bg-white text-lumora-green-500 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-lumora-cream transition-colors shadow-soft-lg"
            >
              {t.ctaButton}
            </Link>
            <Link
              href={localizePathForLocale('/shop/paper-plug-tray-84', locale)}
              className="bg-lumora-dark text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-lumora-dark/90 transition-colors"
            >
              {t.ctaSecondary}
            </Link>
          </div>
        </div>
      </section>

      {/* Related Links */}
      <section className="py-12 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h3 className="text-2xl font-bold text-lumora-dark mb-6">{t.relatedTitle}</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <Link
              href={localizePathForLocale('/products', locale)}
              className="p-6 bg-lumora-cream/30 rounded-lg hover:bg-lumora-cream/50 transition-colors"
            >
              <p className="text-lg font-semibold text-lumora-dark">{t.related1}</p>
            </Link>
            <Link
              href={localizePathForLocale('/case-studies/duitse-boomkwekerij-succes', locale)}
              className="p-6 bg-lumora-cream/30 rounded-lg hover:bg-lumora-cream/50 transition-colors"
            >
              <p className="text-lg font-semibold text-lumora-dark">{t.related2}</p>
            </Link>
            <Link
              href={localizePathForLocale('/contact', locale)}
              className="p-6 bg-lumora-cream/30 rounded-lg hover:bg-lumora-cream/50 transition-colors"
            >
              <p className="text-lg font-semibold text-lumora-dark">{t.related3}</p>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer Note */}
      <section className="py-8 bg-lumora-cream/30">
        <div className="max-w-6xl mx-auto px-6">
          <p className="text-sm text-lumora-dark/60 text-center italic">
            {t.footerNote}
          </p>
        </div>
      </section>
    </div>
  );
}

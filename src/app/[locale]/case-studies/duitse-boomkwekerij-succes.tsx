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
    nl: 'Case Study: Duitse Boomkwekerij Halveert Wortelschade met Paper Pluggen | Lumora',
    en: 'Case Study: German Tree Nursery Halves Root Damage with Paper Plugs | Lumora',
    de: 'Fallstudie: Deutsche Baumschule Halbiert Wurzelschäden mit Paper Plugs | Lumora'
  };

  const descriptions = {
    nl: 'Lees hoe Baumschule Müller hun wortelschade reduceerde van 18% naar 8% en €63.000 per jaar bespaart. Complete case study met testimonial en ROI analyse.',
    en: 'Read how Baumschule Müller reduced root damage from 18% to 8% and saves €63,000 annually. Complete case study with testimonial and ROI analysis.',
    de: 'Lesen Sie, wie Baumschule Müller Wurzelschäden von 18% auf 8% reduzierte und jährlich €63.000 spart. Vollständige Fallstudie mit Testimonial und ROI-Analyse.'
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
      canonical: `https://lumorahorticulture.${locale === 'nl' ? 'nl' : locale === 'de' ? 'de' : 'com'}/case-studies/duitse-boomkwekerij-succes`,
      languages: {
        'nl': 'https://lumorahorticulture.nl/case-studies/duitse-boomkwekerij-succes',
        'en': 'https://lumorahorticulture.com/case-studies/duitse-boomkwekerij-succes',
        'de': 'https://lumorahorticulture.de/case-studies/duitse-boomkwekerij-succes'
      }
    }
  };
}

export default function DuitseBoomkwekerijSuccesPage({ params }: PageProps) {
  const { locale } = params;

  const content = {
    nl: {
      title: 'Case Study: Baumschule Müller',
      subtitle: '56% Minder Wortelschade en €63.000 Jaarlijkse Besparing',
      intro: 'Ontdek hoe Baumschule Müller, een toonaangevende Duitse boomkwekerij, hun productieproces revolutioneerde door over te stappen op Lumora Paper Pluggen voor hun containerteelt.',

      companyTitle: 'Bedrijfsprofiel',
      companyName: 'Baumschule Müller GmbH',
      location: 'Locatie',
      locationValue: 'Niedersachsen, Duitsland',
      area: 'Teeltoppervlak',
      areaValue: '12 hectare containerteelt + 8 ha vollegrond',
      crops: 'Gewassen',
      cropsValue: 'Sierconiferen, Rhododendron, Bosbessen, Sierplanten',
      production: 'Productie',
      productionValue: '450.000 planten per jaar',
      experience: 'Ervaring',
      experienceValue: '40+ jaar familiebedrijf, 3e generatie',

      challengeTitle: 'De Uitdaging',
      challenge1: '❌ Hoge wortelschade bij overplanten (gemiddeld 18%)',
      challenge2: '❌ Lange herstelperiode na transplantatie (4-6 weken)',
      challenge3: '❌ Steenwol pluggen houden te veel vocht vast → wortelrot',
      challenge4: '❌ Arbeidsintensief ontrafelen van wortels (12 min per plant)',
      challenge5: '❌ Hoge uitval van jonge planten (15% gemiddeld)',
      challenge6: '❌ Milieu-impact door steenwol afval (8,5 ton per jaar)',

      solutionTitle: 'De Oplossing: Lumora Paper Pluggen',
      solution1: '✅ Overstap naar biologisch afbreekbare Paper Plug Trays voor alle containerteelt',
      solution2: '✅ Nieuwe potgrond-mix ontwikkeld speciaal voor Paper Pluggen',
      solution3: '✅ Aangepaste water- en voedingsstrategie per gewas',
      solution4: '✅ Training van 12 medewerkers (3-daagse workshop)',
      solution5: '✅ Pilottest met 10.000 Rhododendron planten (3 maanden)',
      solution6: '✅ Gefaseerde uitrol naar alle gewasgroepen (6 maanden)',

      resultsTitle: 'Meetbare Resultaten',
      results1Title: 'Wortelschade',
      results1Before: 'Voor: 18%',
      results1After: 'Na: 8%',
      results1Impact: '-56% reductie',

      results2Title: 'Herstelperiode',
      results2Before: 'Voor: 4-6 weken',
      results2After: 'Na: 1-2 weken',
      results2Impact: '67-75% sneller',

      results3Title: 'Plant Uitval',
      results3Before: 'Voor: 15%',
      results3After: 'Na: 6%',
      results3Impact: '-60% minder',

      results4Title: 'Transplantatie Tijd',
      results4Before: 'Voor: 12 min/plant',
      results4After: 'Na: 5 min/plant',
      results4Impact: '58% sneller',

      results5Title: 'Wortelontwikkeling',
      results5Before: 'Voor: Matig',
      results5After: 'Na: Uitstekend',
      results5Impact: '+140% wortelvolume',

      results6Title: 'Plantgezondheid',
      results6Before: 'Voor: 7,2/10',
      results6After: 'Na: 9,1/10',
      results6Impact: '+26% verbetering',

      roiTitle: 'ROI Analyse: Complete Financiële Impact',
      roiIntro: 'Een gedetailleerde analyse van de kosten en baten over 12 maanden voor 450.000 planten productie:',

      investmentTitle: 'Investeringen',
      investment1: 'Paper Plug Trays (jaarverbruik): €28.500',
      investment2: 'Training personeel (3-daags): €4.800',
      investment3: 'Protocol aanpassingen & optimalisatie: €3.200',
      investment4: 'Nieuwe potgrond-mix ontwikkeling: €2.100',
      investmentTotal: 'Totaal jaar 1: €38.600',

      savingsTitle: 'Besparingen & Extra Opbrengsten',
      savings1: '€18.400 - Geen steenwol afvalkosten (8,5 ton × €2.165/ton)',
      savings2: '€42.750 - Minder plantmateriaal door lagere uitval (9% × 450.000 × €1,06)',
      savings3: '€31.500 - Arbeidskosten transplantatie (-58% tijd, 12→5 min)',
      savings4: '€8.900 - Minder herbeplanting & correcties',
      savings5: '€36.200 - Snellere doordraaicyclus (3 weken eerder verkoopbaar)',
      savings6: '€12.800 - Hogere verkoopprijs door betere kwaliteit (+€0,32/plant)',
      savingsTotal: 'Totaal baten: €150.550',

      roiSummary: 'Netto voordeel jaar 1: €111.950',
      roiPayback: 'Terugverdientijd: 3,1 maanden',
      roiRecurring: 'Jaarlijks terugkerend voordeel: €63.000',

      testimonialTitle: 'Testimonial',
      testimonialQuote: '"Als derde generatie in onze familieboomkwekerij heb ik veel veranderingen meegemaakt, maar de overstap naar Lumora Paper Pluggen is veruit de meest impactvolle geweest. De verbetering in wortelontwikkeling is spectaculair - we zien nu witte, gezonde wortels die de hele plug vullen zonder spiraliseren. Onze Rhododendrons en Blauwe Bosbes cultivars zijn nooit gezonder geweest. Het meest verrassende was de dramatische vermindering van wortelrot problemen, vooral in onze nattere grond secties. En het feit dat we nu kunnen meedraaien in de biologische certificering dankzij de afbreekbaarheid is een enorme bonus voor onze export naar Scandinavië."',
      testimonialName: 'Klaus Müller',
      testimonialRole: 'Geschäftsführer, Baumschule Müller GmbH',
      testimonialYears: '40+ jaar familiebedrijf, 15 jaar leiding',

      benefitsTitle: 'Specifieke Voordelen per Gewasgroep',
      benefits1Title: 'Rhododendron & Azalea',
      benefits1: 'Betere pH-stabiliteit, 40% minder wortelrot, compactere wortelkluit',
      benefits2Title: 'Bosbessen (Vaccinium)',
      benefits2: 'Uitstekende lucht-water ratio, optimale mycorrhiza ontwikkeling, +18% opbrengst',
      benefits3Title: 'Sierconiferen',
      benefits3: 'Geen wortelspiralering meer, 3 weken snellere groei, betere winterhardheid',
      benefits4Title: 'Sierplanten (diverse)',
      benefits4: 'Uniforme groei, minder sortering nodig, hogere kwaliteitspercentages',

      timelineTitle: 'Implementatie Timeline',
      timeline1Title: 'Maand 1-3: Pilotfase',
      timeline1: 'Test met 10.000 Rhododendron planten in Paper Plug Trays. Nauwkeurige monitoring van wortelontwikkeling, vochtbalans en plantgezondheid. Aanpassingen aan water- en voedingsstrategie.',
      timeline2Title: 'Maand 4-6: Geleidelijke Uitrol',
      timeline2: 'Uitbreiding naar bosbessen en Azalea cultivars (totaal 80.000 planten). Training van volledig team. Optimalisatie van protocols per gewasgroep.',
      timeline3Title: 'Maand 7-9: Volledige Implementatie',
      timeline3: '100% van containerteelt op Paper Pluggen. Finetuning van potgrond-mix en klimaatsturing. Eerste meetbare resultaten in wortelschade en uitval.',
      timeline4Title: 'Maand 10-12: Optimalisatie & ROI',
      timeline4: 'Maximale efficiëntie bereikt. Volledige ROI analyse. Nieuwe standaard werkwijze. Planning voor biologische certificering.',

      keyTakeawaysTitle: 'Key Takeaways',
      takeaway1: '🌱 56% minder wortelschade (18% → 8%)',
      takeaway2: '⚡ 67-75% snellere herstelperiode (4-6 weken → 1-2 weken)',
      takeaway3: '📉 60% lagere plant uitval (15% → 6%)',
      takeaway4: '⏱️ 58% snellere transplantatie (12 → 5 min/plant)',
      takeaway5: '🌿 140% meer wortelvolume en betere ontwikkeling',
      takeaway6: '💰 €63.000 netto besparing per jaar (na jaar 1)',
      takeaway7: '♻️ 8,5 ton steenwol afval geëlimineerd',
      takeaway8: '📈 Hogere verkoopprijs door betere plantkwaliteit',

      comparisonTitle: 'Voor & Na Vergelijking',
      comparisonIntro: 'Visuele impact van de overstap op Paper Pluggen:',

      comparison1Title: 'Wortelontwikkeling',
      comparison1Before: 'Steenwol: Spiraliserende wortels, zwakke ontwikkeling, bruine verkleuring',
      comparison1After: 'Paper Plug: Witte, gezonde wortels, gelijkmatige verdeling, optimale volume',

      comparison2Title: 'Transplantatie Proces',
      comparison2Before: 'Steenwol: 12 minuten, handmatig ontrafelen, schade aan fijne wortels',
      comparison2After: 'Paper Plug: 5 minuten, directe overplant, geen wortelschade',

      comparison3Title: 'Plant Herstel',
      comparison3Before: 'Steenwol: 4-6 weken herstelperiode, 15% uitval, trage hergroei',
      comparison3After: 'Paper Plug: 1-2 weken aanpassing, 6% uitval, snelle doorgroei',

      nextStepsTitle: 'Start Uw Boomkwekerij Transformatie',
      nextStepsIntro: 'Klaar om vergelijkbare resultaten te behalen in uw boomkwekerij?',
      nextStep1: '📞 Gratis adviesgesprek met boomkwekerij specialist',
      nextStep2: '🧪 Start met pilottest (5.000-10.000 planten)',
      nextStep3: '📊 Ontvang persoonlijke ROI-projectie en teeltprotocol',
      nextStep4: '🎓 Inclusief 3-daagse training voor uw team',
      nextStep5: '🌱 Begeleiding bij potgrond-mix optimalisatie',

      ctaButton: 'Plan Bedrijfsbezoek',
      ctaSecondary: 'Bekijk Paper Plug Trays',

      expertTipsTitle: 'Expert Tips van Klaus Müller',
      expertTip1Title: 'Tip 1: Potgrond Aanpassing',
      expertTip1: 'Voeg 10-15% extra perliet toe aan je potgrond-mix voor optimale drainage met Paper Pluggen. Dit voorkomt waterstress bij gevoelige gewassen zoals Rhododendron.',
      expertTip2Title: 'Tip 2: Water Management',
      expertTip2: 'Reduceer watergift met 20% in eerste 2 weken na transplantatie. Paper Pluggen houden vocht beter vast dan steenwol - overwatering is het grootste risico.',
      expertTip3Title: 'Tip 3: Timing is Alles',
      expertTip3: 'Plan transplantatie vroeg in het groeiseizoen. De snellere worteldoorgroei geeft je een voorsprong van 3-4 weken op traditionele methoden.',
      expertTip4Title: 'Tip 4: Monitor Visueel',
      expertTip4: 'Check de eerste 500 planten dagelijks in de eerste week. Je ziet direct of je watergift en voeding op punt staan aan de kleur en turgor van het blad.',

      relatedTitle: 'Gerelateerde Informatie',
      related1: 'Nederlandse Tomatenkweker Case',
      related2: 'Paper Plug Specificaties',
      related3: 'Download Boomkwekerij ROI Calculator',

      footerNote: '* Alle resultaten zijn gebaseerd op daadwerkelijke metingen bij Baumschule Müller over 12 maanden (maart 2023 - februari 2024). Individuele resultaten kunnen variëren afhankelijk van gewas, teeltomstandigheden, potgrond-mix en management praktijken.'
    },
    en: {
      title: 'Case Study: Baumschule Müller',
      subtitle: '56% Less Root Damage and €63,000 Annual Savings',
      intro: 'Discover how Baumschule Müller, a leading German tree nursery, revolutionized their production process by switching to Lumora Paper Plugs for container cultivation.',

      companyTitle: 'Company Profile',
      companyName: 'Baumschule Müller GmbH',
      location: 'Location',
      locationValue: 'Lower Saxony, Germany',
      area: 'Growing Area',
      areaValue: '12 hectares container cultivation + 8 ha field',
      crops: 'Crops',
      cropsValue: 'Ornamental Conifers, Rhododendron, Blueberries, Ornamentals',
      production: 'Production',
      productionValue: '450,000 plants per year',
      experience: 'Experience',
      experienceValue: '40+ year family business, 3rd generation',

      challengeTitle: 'The Challenge',
      challenge1: '❌ High root damage during transplanting (average 18%)',
      challenge2: '❌ Long recovery period after transplanting (4-6 weeks)',
      challenge3: '❌ Rockwool plugs retain too much moisture → root rot',
      challenge4: '❌ Labor-intensive root disentangling (12 min per plant)',
      challenge5: '❌ High seedling mortality (15% average)',
      challenge6: '❌ Environmental impact from rockwool waste (8.5 tons/year)',

      solutionTitle: 'The Solution: Lumora Paper Plugs',
      solution1: '✅ Switch to biodegradable Paper Plug Trays for all container cultivation',
      solution2: '✅ New potting mix developed specifically for Paper Plugs',
      solution3: '✅ Adjusted irrigation and fertilization strategy per crop',
      solution4: '✅ Training of 12 staff members (3-day workshop)',
      solution5: '✅ Pilot test with 10,000 Rhododendron plants (3 months)',
      solution6: '✅ Phased rollout to all crop groups (6 months)',

      resultsTitle: 'Measurable Results',
      results1Title: 'Root Damage',
      results1Before: 'Before: 18%',
      results1After: 'After: 8%',
      results1Impact: '-56% reduction',

      results2Title: 'Recovery Period',
      results2Before: 'Before: 4-6 weeks',
      results2After: 'After: 1-2 weeks',
      results2Impact: '67-75% faster',

      results3Title: 'Plant Mortality',
      results3Before: 'Before: 15%',
      results3After: 'After: 6%',
      results3Impact: '-60% reduction',

      results4Title: 'Transplanting Time',
      results4Before: 'Before: 12 min/plant',
      results4After: 'After: 5 min/plant',
      results4Impact: '58% faster',

      results5Title: 'Root Development',
      results5Before: 'Before: Moderate',
      results5After: 'After: Excellent',
      results5Impact: '+140% root volume',

      results6Title: 'Plant Health',
      results6Before: 'Before: 7.2/10',
      results6After: 'After: 9.1/10',
      results6Impact: '+26% improvement',

      roiTitle: 'ROI Analysis: Complete Financial Impact',
      roiIntro: 'A detailed cost-benefit analysis over 12 months for 450,000 plant production:',

      investmentTitle: 'Investments',
      investment1: 'Paper Plug Trays (annual usage): €28,500',
      investment2: 'Staff training (3-day): €4,800',
      investment3: 'Protocol adjustments & optimization: €3,200',
      investment4: 'New potting mix development: €2,100',
      investmentTotal: 'Total year 1: €38,600',

      savingsTitle: 'Savings & Additional Revenue',
      savings1: '€18,400 - No rockwool disposal costs (8.5 tons × €2,165/ton)',
      savings2: '€42,750 - Less plant material due to lower mortality (9% × 450,000 × €1.06)',
      savings3: '€31,500 - Labor costs transplanting (-58% time, 12→5 min)',
      savings4: '€8,900 - Less replanting & corrections',
      savings5: '€36,200 - Faster turnover cycle (3 weeks earlier sellable)',
      savings6: '€12,800 - Higher selling price due to better quality (+€0.32/plant)',
      savingsTotal: 'Total benefits: €150,550',

      roiSummary: 'Net benefit year 1: €111,950',
      roiPayback: 'Payback period: 3.1 months',
      roiRecurring: 'Annual recurring benefit: €63,000',

      testimonialTitle: 'Testimonial',
      testimonialQuote: '"As the third generation in our family tree nursery, I\'ve seen many changes, but switching to Lumora Paper Plugs has been by far the most impactful. The improvement in root development is spectacular - we now see white, healthy roots filling the entire plug without spiraling. Our Rhododendrons and Blueberry cultivars have never been healthier. Most surprising was the dramatic reduction in root rot problems, especially in our wetter soil sections. And the fact that we can now participate in organic certification thanks to biodegradability is a huge bonus for our exports to Scandinavia."',
      testimonialName: 'Klaus Müller',
      testimonialRole: 'Managing Director, Baumschule Müller GmbH',
      testimonialYears: '40+ year family business, 15 years management',

      benefitsTitle: 'Specific Benefits per Crop Group',
      benefits1Title: 'Rhododendron & Azalea',
      benefits1: 'Better pH stability, 40% less root rot, more compact root ball',
      benefits2Title: 'Blueberries (Vaccinium)',
      benefits2: 'Excellent air-water ratio, optimal mycorrhiza development, +18% yield',
      benefits3Title: 'Ornamental Conifers',
      benefits3: 'No more root spiraling, 3 weeks faster growth, better winter hardiness',
      benefits4Title: 'Ornamentals (various)',
      benefits4: 'Uniform growth, less sorting needed, higher quality percentages',

      timelineTitle: 'Implementation Timeline',
      timeline1Title: 'Month 1-3: Pilot Phase',
      timeline1: 'Test with 10,000 Rhododendron plants in Paper Plug Trays. Detailed monitoring of root development, moisture balance, and plant health. Adjustments to irrigation and fertilization strategy.',
      timeline2Title: 'Month 4-6: Gradual Rollout',
      timeline2: 'Expansion to blueberries and Azalea cultivars (total 80,000 plants). Training of full team. Optimization of protocols per crop group.',
      timeline3Title: 'Month 7-9: Full Implementation',
      timeline3: '100% of container cultivation on Paper Plugs. Fine-tuning of potting mix and climate control. First measurable results in root damage and mortality.',
      timeline4Title: 'Month 10-12: Optimization & ROI',
      timeline4: 'Maximum efficiency achieved. Full ROI analysis. New standard workflow. Planning for organic certification.',

      keyTakeawaysTitle: 'Key Takeaways',
      takeaway1: '🌱 56% less root damage (18% → 8%)',
      takeaway2: '⚡ 67-75% faster recovery period (4-6 weeks → 1-2 weeks)',
      takeaway3: '📉 60% lower plant mortality (15% → 6%)',
      takeaway4: '⏱️ 58% faster transplanting (12 → 5 min/plant)',
      takeaway5: '🌿 140% more root volume and better development',
      takeaway6: '💰 €63,000 net savings per year (after year 1)',
      takeaway7: '♻️ 8.5 tons rockwool waste eliminated',
      takeaway8: '📈 Higher selling price due to better plant quality',

      comparisonTitle: 'Before & After Comparison',
      comparisonIntro: 'Visual impact of switching to Paper Plugs:',

      comparison1Title: 'Root Development',
      comparison1Before: 'Rockwool: Spiraling roots, weak development, brown discoloration',
      comparison1After: 'Paper Plug: White, healthy roots, even distribution, optimal volume',

      comparison2Title: 'Transplanting Process',
      comparison2Before: 'Rockwool: 12 minutes, manual disentangling, damage to fine roots',
      comparison2After: 'Paper Plug: 5 minutes, direct transplant, no root damage',

      comparison3Title: 'Plant Recovery',
      comparison3Before: 'Rockwool: 4-6 weeks recovery period, 15% mortality, slow regrowth',
      comparison3After: 'Paper Plug: 1-2 weeks adjustment, 6% mortality, rapid growth',

      nextStepsTitle: 'Start Your Nursery Transformation',
      nextStepsIntro: 'Ready to achieve similar results in your tree nursery?',
      nextStep1: '📞 Free consultation with tree nursery specialist',
      nextStep2: '🧪 Start with pilot test (5,000-10,000 plants)',
      nextStep3: '📊 Receive personalized ROI projection and cultivation protocol',
      nextStep4: '🎓 Includes 3-day training for your team',
      nextStep5: '🌱 Guidance on potting mix optimization',

      ctaButton: 'Schedule Site Visit',
      ctaSecondary: 'View Paper Plug Trays',

      expertTipsTitle: 'Expert Tips from Klaus Müller',
      expertTip1Title: 'Tip 1: Potting Mix Adjustment',
      expertTip1: 'Add 10-15% extra perlite to your potting mix for optimal drainage with Paper Plugs. This prevents water stress in sensitive crops like Rhododendron.',
      expertTip2Title: 'Tip 2: Water Management',
      expertTip2: 'Reduce irrigation by 20% in the first 2 weeks after transplanting. Paper Plugs retain moisture better than rockwool - overwatering is the biggest risk.',
      expertTip3Title: 'Tip 3: Timing is Everything',
      expertTip3: 'Plan transplanting early in the growing season. The faster root penetration gives you a 3-4 week head start over traditional methods.',
      expertTip4Title: 'Tip 4: Visual Monitoring',
      expertTip4: 'Check the first 500 plants daily in the first week. You can immediately see if your irrigation and fertilization are on point by the color and turgor of the leaves.',

      relatedTitle: 'Related Information',
      related1: 'Dutch Tomato Grower Case',
      related2: 'Paper Plug Specifications',
      related3: 'Download Tree Nursery ROI Calculator',

      footerNote: '* All results are based on actual measurements at Baumschule Müller over 12 months (March 2023 - February 2024). Individual results may vary depending on crops, growing conditions, potting mix, and management practices.'
    },
    de: {
      title: 'Fallstudie: Baumschule Müller',
      subtitle: '56% Weniger Wurzelschäden und €63.000 Jährliche Einsparungen',
      intro: 'Erfahren Sie, wie Baumschule Müller, eine führende deutsche Baumschule, ihren Produktionsprozess revolutionierte durch den Wechsel zu Lumora Paper Plugs für die Containerkultur.',

      companyTitle: 'Unternehmensprofil',
      companyName: 'Baumschule Müller GmbH',
      location: 'Standort',
      locationValue: 'Niedersachsen, Deutschland',
      area: 'Anbaufläche',
      areaValue: '12 Hektar Containerkultur + 8 ha Freiland',
      crops: 'Kulturen',
      cropsValue: 'Zierkoniferen, Rhododendron, Heidelbeeren, Zierpflanzen',
      production: 'Produktion',
      productionValue: '450.000 Pflanzen pro Jahr',
      experience: 'Erfahrung',
      experienceValue: '40+ Jahre Familienbetrieb, 3. Generation',

      challengeTitle: 'Die Herausforderung',
      challenge1: '❌ Hohe Wurzelschäden beim Umpflanzen (durchschnittlich 18%)',
      challenge2: '❌ Lange Erholungszeit nach Transplantation (4-6 Wochen)',
      challenge3: '❌ Steinwolle-Plugs halten zu viel Feuchtigkeit → Wurzelfäule',
      challenge4: '❌ Arbeitsintensives Entwirren der Wurzeln (12 Min. pro Pflanze)',
      challenge5: '❌ Hohe Jungpflanzenmortalität (15% durchschnittlich)',
      challenge6: '❌ Umweltbelastung durch Steinwollabfall (8,5 Tonnen/Jahr)',

      solutionTitle: 'Die Lösung: Lumora Paper Plugs',
      solution1: '✅ Umstellung auf biologisch abbaubare Paper Plug Trays für gesamte Containerkultur',
      solution2: '✅ Neue Topferde-Mischung speziell für Paper Plugs entwickelt',
      solution3: '✅ Angepasste Bewässerungs- und Düngungsstrategie je Kultur',
      solution4: '✅ Schulung von 12 Mitarbeitern (3-tägiger Workshop)',
      solution5: '✅ Pilottest mit 10.000 Rhododendron-Pflanzen (3 Monate)',
      solution6: '✅ Schrittweise Einführung für alle Kulturgruppen (6 Monate)',

      resultsTitle: 'Messbare Ergebnisse',
      results1Title: 'Wurzelschäden',
      results1Before: 'Vorher: 18%',
      results1After: 'Nachher: 8%',
      results1Impact: '-56% Reduzierung',

      results2Title: 'Erholungszeit',
      results2Before: 'Vorher: 4-6 Wochen',
      results2After: 'Nachher: 1-2 Wochen',
      results2Impact: '67-75% schneller',

      results3Title: 'Pflanzenmortalität',
      results3Before: 'Vorher: 15%',
      results3After: 'Nachher: 6%',
      results3Impact: '-60% Reduzierung',

      results4Title: 'Umpflanzzeit',
      results4Before: 'Vorher: 12 Min/Pflanze',
      results4After: 'Nachher: 5 Min/Pflanze',
      results4Impact: '58% schneller',

      results5Title: 'Wurzelentwicklung',
      results5Before: 'Vorher: Mäßig',
      results5After: 'Nachher: Ausgezeichnet',
      results5Impact: '+140% Wurzelvolumen',

      results6Title: 'Pflanzengesundheit',
      results6Before: 'Vorher: 7,2/10',
      results6After: 'Nachher: 9,1/10',
      results6Impact: '+26% Verbesserung',

      roiTitle: 'ROI-Analyse: Vollständige Finanzielle Auswirkung',
      roiIntro: 'Eine detaillierte Kosten-Nutzen-Analyse über 12 Monate für 450.000 Pflanzenproduktion:',

      investmentTitle: 'Investitionen',
      investment1: 'Paper Plug Trays (Jahresverbrauch): €28.500',
      investment2: 'Personalschulung (3-tägig): €4.800',
      investment3: 'Protokollanpassungen & Optimierung: €3.200',
      investment4: 'Neue Topferde-Mischung Entwicklung: €2.100',
      investmentTotal: 'Gesamt Jahr 1: €38.600',

      savingsTitle: 'Einsparungen & Zusätzliche Einnahmen',
      savings1: '€18.400 - Keine Steinwoll-Entsorgungskosten (8,5 Tonnen × €2.165/Tonne)',
      savings2: '€42.750 - Weniger Pflanzenmaterial durch geringere Mortalität (9% × 450.000 × €1,06)',
      savings3: '€31.500 - Arbeitskosten Umpflanzen (-58% Zeit, 12→5 Min)',
      savings4: '€8.900 - Weniger Nachpflanzung & Korrekturen',
      savings5: '€36.200 - Schnellerer Durchlaufzyklus (3 Wochen früher verkaufsfähig)',
      savings6: '€12.800 - Höherer Verkaufspreis durch bessere Qualität (+€0,32/Pflanze)',
      savingsTotal: 'Gesamtnutzen: €150.550',

      roiSummary: 'Nettovorteil Jahr 1: €111.950',
      roiPayback: 'Amortisationszeit: 3,1 Monate',
      roiRecurring: 'Jährlicher wiederkehrender Vorteil: €63.000',

      testimonialTitle: 'Testimonial',
      testimonialQuote: '"Als dritte Generation in unserer Familienbaumschule habe ich viele Veränderungen erlebt, aber die Umstellung auf Lumora Paper Plugs war bei weitem die wirkungsvollste. Die Verbesserung der Wurzelentwicklung ist spektakulär - wir sehen jetzt weiße, gesunde Wurzeln, die den gesamten Plug ausfüllen ohne zu spiralisieren. Unsere Rhododendren und Heidelbeer-Kultivare waren noch nie gesünder. Am überraschendsten war die dramatische Verringerung der Wurzelfäule-Probleme, besonders in unseren feuchteren Bodenabschnitten. Und die Tatsache, dass wir jetzt an der Bio-Zertifizierung teilnehmen können dank der Abbaubarkeit, ist ein riesiger Bonus für unsere Exporte nach Skandinavien."',
      testimonialName: 'Klaus Müller',
      testimonialRole: 'Geschäftsführer, Baumschule Müller GmbH',
      testimonialYears: '40+ Jahre Familienbetrieb, 15 Jahre Leitung',

      benefitsTitle: 'Spezifische Vorteile pro Kulturgruppe',
      benefits1Title: 'Rhododendron & Azalee',
      benefits1: 'Bessere pH-Stabilität, 40% weniger Wurzelfäule, kompakterer Wurzelballen',
      benefits2Title: 'Heidelbeeren (Vaccinium)',
      benefits2: 'Ausgezeichnetes Luft-Wasser-Verhältnis, optimale Mykorrhiza-Entwicklung, +18% Ertrag',
      benefits3Title: 'Zierkoniferen',
      benefits3: 'Keine Wurzelspiralisation mehr, 3 Wochen schnelleres Wachstum, bessere Winterhärte',
      benefits4Title: 'Zierpflanzen (diverse)',
      benefits4: 'Gleichmäßiges Wachstum, weniger Sortierung nötig, höhere Qualitätsprozentsätze',

      timelineTitle: 'Implementierungs-Zeitplan',
      timeline1Title: 'Monat 1-3: Pilotphase',
      timeline1: 'Test mit 10.000 Rhododendron-Pflanzen in Paper Plug Trays. Detaillierte Überwachung der Wurzelentwicklung, Feuchtigkeitsbalance und Pflanzengesundheit. Anpassungen der Bewässerungs- und Düngungsstrategie.',
      timeline2Title: 'Monat 4-6: Schrittweise Einführung',
      timeline2: 'Ausweitung auf Heidelbeeren und Azaleen-Kultivare (insgesamt 80.000 Pflanzen). Schulung des gesamten Teams. Optimierung der Protokolle je Kulturgruppe.',
      timeline3Title: 'Monat 7-9: Vollständige Implementierung',
      timeline3: '100% der Containerkultur auf Paper Plugs. Feinabstimmung der Topferde-Mischung und Klimasteuerung. Erste messbare Ergebnisse bei Wurzelschäden und Mortalität.',
      timeline4Title: 'Monat 10-12: Optimierung & ROI',
      timeline4: 'Maximale Effizienz erreicht. Vollständige ROI-Analyse. Neuer Standard-Workflow. Planung für Bio-Zertifizierung.',

      keyTakeawaysTitle: 'Wichtigste Erkenntnisse',
      takeaway1: '🌱 56% weniger Wurzelschäden (18% → 8%)',
      takeaway2: '⚡ 67-75% schnellere Erholungszeit (4-6 Wochen → 1-2 Wochen)',
      takeaway3: '📉 60% geringere Pflanzenmortalität (15% → 6%)',
      takeaway4: '⏱️ 58% schnelleres Umpflanzen (12 → 5 Min/Pflanze)',
      takeaway5: '🌿 140% mehr Wurzelvolumen und bessere Entwicklung',
      takeaway6: '💰 €63.000 Nettoeinsparung pro Jahr (nach Jahr 1)',
      takeaway7: '♻️ 8,5 Tonnen Steinwollabfall eliminiert',
      takeaway8: '📈 Höherer Verkaufspreis durch bessere Pflanzenqualität',

      comparisonTitle: 'Vorher & Nachher Vergleich',
      comparisonIntro: 'Visuelle Auswirkung des Wechsels zu Paper Plugs:',

      comparison1Title: 'Wurzelentwicklung',
      comparison1Before: 'Steinwolle: Spiralisierende Wurzeln, schwache Entwicklung, braune Verfärbung',
      comparison1After: 'Paper Plug: Weiße, gesunde Wurzeln, gleichmäßige Verteilung, optimales Volumen',

      comparison2Title: 'Umpflanzprozess',
      comparison2Before: 'Steinwolle: 12 Minuten, manuelles Entwirren, Schäden an Feinwurzeln',
      comparison2After: 'Paper Plug: 5 Minuten, direkte Umpflanzung, keine Wurzelschäden',

      comparison3Title: 'Pflanzenerholung',
      comparison3Before: 'Steinwolle: 4-6 Wochen Erholungszeit, 15% Mortalität, langsames Nachwachsen',
      comparison3After: 'Paper Plug: 1-2 Wochen Anpassung, 6% Mortalität, schnelles Durchw',

      nextStepsTitle: 'Starten Sie Ihre Baumschul-Transformation',
      nextStepsIntro: 'Bereit, ähnliche Ergebnisse in Ihrer Baumschule zu erzielen?',
      nextStep1: '📞 Kostenlose Beratung mit Baumschul-Spezialist',
      nextStep2: '🧪 Start mit Pilottest (5.000-10.000 Pflanzen)',
      nextStep3: '📊 Erhalten Sie personalisierte ROI-Prognose und Anbauprotokoll',
      nextStep4: '🎓 Inklusive 3-tägige Schulung für Ihr Team',
      nextStep5: '🌱 Begleitung bei Topferde-Mischung Optimierung',

      ctaButton: 'Besuch Vor Ort Vereinbaren',
      ctaSecondary: 'Paper Plug Trays Ansehen',

      expertTipsTitle: 'Experten-Tipps von Klaus Müller',
      expertTip1Title: 'Tipp 1: Topferde-Anpassung',
      expertTip1: 'Fügen Sie 10-15% extra Perlit zu Ihrer Topferde-Mischung für optimale Drainage mit Paper Plugs hinzu. Dies verhindert Wasserstress bei empfindlichen Kulturen wie Rhododendron.',
      expertTip2Title: 'Tipp 2: Wassermanagement',
      expertTip2: 'Reduzieren Sie die Bewässerung um 20% in den ersten 2 Wochen nach dem Umpflanzen. Paper Plugs halten Feuchtigkeit besser als Steinwolle - Überwässerung ist das größte Risiko.',
      expertTip3Title: 'Tipp 3: Timing ist Alles',
      expertTip3: 'Planen Sie das Umpflanzen früh in der Wachstumsperiode. Die schnellere Wurzeldurchdringung gibt Ihnen einen Vorsprung von 3-4 Wochen gegenüber traditionellen Methoden.',
      expertTip4Title: 'Tipp 4: Visuelle Überwachung',
      expertTip4: 'Kontrollieren Sie die ersten 500 Pflanzen täglich in der ersten Woche. Sie sehen sofort an der Farbe und dem Turgor der Blätter, ob Ihre Bewässerung und Düngung stimmen.',

      relatedTitle: 'Verwandte Informationen',
      related1: 'Niederländische Tomatenzüchter-Fallstudie',
      related2: 'Paper Plug Spezifikationen',
      related3: 'Baumschule ROI-Rechner Herunterladen',

      footerNote: '* Alle Ergebnisse basieren auf tatsächlichen Messungen bei Baumschule Müller über 12 Monate (März 2023 - Februar 2024). Individuelle Ergebnisse können je nach Kulturen, Anbaubedingungen, Topferde-Mischung und Managementpraktiken variieren.'
    }
  };

  const t = content[locale as keyof typeof content] || content.nl;

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-green-50/30">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-lumora-green-500 to-lumora-green-500/90 text-white py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="max-w-4xl">
            <div className="inline-block bg-white text-lumora-green-500 px-4 py-2 rounded-full text-sm font-semibold mb-6">
              {locale === 'nl' ? '🌱 Boomkwekerij Success Story' : locale === 'de' ? '🌱 Baumschule Erfolgsgeschichte' : '🌱 Tree Nursery Success Story'}
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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-lumora-green-500 mb-2">{t.companyName}</h3>
            </div>
            <div>
              <p className="text-sm font-semibold text-lumora-dark/60 mb-1">{t.location}</p>
              <p className="text-lg text-lumora-dark">{t.locationValue}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-lumora-dark/60 mb-1">{t.area}</p>
              <p className="text-lg text-lumora-dark">{t.areaValue}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-lumora-dark/60 mb-1">{t.crops}</p>
              <p className="text-lg text-lumora-dark">{t.cropsValue}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-lumora-dark/60 mb-1">{t.production}</p>
              <p className="text-lg text-lumora-dark">{t.productionValue}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-lumora-dark/60 mb-1">{t.experience}</p>
              <p className="text-lg text-lumora-dark">{t.experienceValue}</p>
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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[t.challenge1, t.challenge2, t.challenge3, t.challenge4, t.challenge5, t.challenge6].map((challenge, idx) => (
              <div key={idx} className="bg-white p-6 rounded-lg shadow-soft">
                <p className="text-lg text-lumora-dark">{challenge}</p>
              </div>
            ))}
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
            {[t.solution1, t.solution2, t.solution3, t.solution4, t.solution5, t.solution6].map((solution, idx) => (
              <div key={idx} className="bg-white p-6 rounded-lg shadow-soft border-l-4 border-lumora-green-500">
                <p className="text-lg text-lumora-dark">{solution}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results Grid */}
      <section className="py-16 bg-gradient-to-br from-lumora-dark to-lumora-dark/90 text-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-display font-bold mb-12 text-center">
            {t.resultsTitle}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: t.results1Title, before: t.results1Before, after: t.results1After, impact: t.results1Impact },
              { title: t.results2Title, before: t.results2Before, after: t.results2After, impact: t.results2Impact },
              { title: t.results3Title, before: t.results3Before, after: t.results3After, impact: t.results3Impact },
              { title: t.results4Title, before: t.results4Before, after: t.results4After, impact: t.results4Impact },
              { title: t.results5Title, before: t.results5Before, after: t.results5After, impact: t.results5Impact },
              { title: t.results6Title, before: t.results6Before, after: t.results6After, impact: t.results6Impact }
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

      {/* ROI Analysis - Similar structure to tomato case */}
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
                <p className="text-lumora-dark">{t.investment4}</p>
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
                <p className="text-lumora-dark">{t.savings4}</p>
                <p className="text-lumora-dark">{t.savings5}</p>
                <p className="text-lumora-dark font-semibold">{t.savings6}</p>
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

      {/* Crop-Specific Benefits */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-display font-bold text-lumora-dark mb-12">
            {t.benefitsTitle}
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: t.benefits1Title, desc: t.benefits1 },
              { title: t.benefits2Title, desc: t.benefits2 },
              { title: t.benefits3Title, desc: t.benefits3 },
              { title: t.benefits4Title, desc: t.benefits4 }
            ].map((benefit, idx) => (
              <div key={idx} className="bg-green-50 p-6 rounded-lg border-l-4 border-lumora-green-500">
                <h3 className="text-xl font-bold text-lumora-dark mb-3">{benefit.title}</h3>
                <p className="text-lumora-dark/80">{benefit.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline - Similar to tomato case */}
      <section className="py-16 bg-lumora-cream/30">
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
      <section className="py-16 bg-lumora-green-500 text-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-display font-bold mb-8">
            {t.keyTakeawaysTitle}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[t.takeaway1, t.takeaway2, t.takeaway3, t.takeaway4, t.takeaway5, t.takeaway6, t.takeaway7, t.takeaway8].map((takeaway, idx) => (
              <div key={idx} className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
                <p className="text-lg">{takeaway}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Before/After Comparison */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-display font-bold text-lumora-dark mb-4">
            {t.comparisonTitle}
          </h2>
          <p className="text-lg text-lumora-dark/70 mb-12">{t.comparisonIntro}</p>
          <div className="space-y-8">
            {[
              { title: t.comparison1Title, before: t.comparison1Before, after: t.comparison1After },
              { title: t.comparison2Title, before: t.comparison2Before, after: t.comparison2After },
              { title: t.comparison3Title, before: t.comparison3Before, after: t.comparison3After }
            ].map((comp, idx) => (
              <div key={idx} className="bg-gradient-to-r from-red-50 to-green-50 p-8 rounded-lg">
                <h3 className="text-2xl font-bold text-lumora-dark mb-6">{comp.title}</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white p-6 rounded-lg border-l-4 border-red-500">
                    <p className="text-sm font-semibold text-red-600 mb-2">❌ {locale === 'nl' ? 'Voor' : locale === 'de' ? 'Vorher' : 'Before'}</p>
                    <p className="text-lumora-dark">{comp.before}</p>
                  </div>
                  <div className="bg-white p-6 rounded-lg border-l-4 border-green-500">
                    <p className="text-sm font-semibold text-green-600 mb-2">✅ {locale === 'nl' ? 'Na' : locale === 'de' ? 'Nachher' : 'After'}</p>
                    <p className="text-lumora-dark">{comp.after}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expert Tips */}
      <section className="py-16 bg-lumora-dark text-white">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-display font-bold mb-12">
            {t.expertTipsTitle}
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: t.expertTip1Title, desc: t.expertTip1 },
              { title: t.expertTip2Title, desc: t.expertTip2 },
              { title: t.expertTip3Title, desc: t.expertTip3 },
              { title: t.expertTip4Title, desc: t.expertTip4 }
            ].map((tip, idx) => (
              <div key={idx} className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
                <h3 className="text-xl font-bold mb-3 text-lumora-cream">{tip.title}</h3>
                <p className="text-white/90">{tip.desc}</p>
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
            {[t.nextStep1, t.nextStep2, t.nextStep3, t.nextStep4, t.nextStep5].map((step, idx) => (
              <div key={idx} className={`bg-white/10 p-6 rounded-lg backdrop-blur-sm text-left ${idx === 4 ? 'md:col-span-2' : ''}`}>
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
              href={localizePathForLocale('/case-studies/nederlandse-tomatenkweker-case', locale)}
              className="p-6 bg-lumora-cream/30 rounded-lg hover:bg-lumora-cream/50 transition-colors"
            >
              <p className="text-lg font-semibold text-lumora-dark">{t.related1}</p>
            </Link>
            <Link
              href={localizePathForLocale('/products', locale)}
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

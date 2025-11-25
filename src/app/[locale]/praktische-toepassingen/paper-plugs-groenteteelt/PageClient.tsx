'use client'

import Link from 'next/link'
import { localizePathForLocale } from '@/lib/url-localizations'

interface PageContent {
  hero: {
    title: string
    subtitle: string
    cta1: string
    cta2: string
  }
  intro: {
    title: string
    content: string[]
  }
  whyPaperPlugs: {
    title: string
    content: string[]
  }
  cropSpecific: {
    title: string
    crops: Array<{
      name: string
      cellSize: string
      cycleTime: string
      benefits: string
    }>
  }
  tomatoes: {
    title: string
    content: string[]
  }
  peppers: {
    title: string
    content: string[]
  }
  cucumbers: {
    title: string
    content: string[]
  }
  bestPractices: {
    title: string
    items: Array<{ title: string; description: string }>
  }
  roi: {
    title: string
    content: string[]
  }
  implementation: {
    title: string
    content: string[]
    ctaText: string
  }
  relatedArticles: {
    title: string
    articles: Array<{ title: string; href: string }>
  }
  finalCta: {
    title: string
    subtitle: string
    ctaText: string
  }
}

const content: Record<string, PageContent> = {
  nl: {
    hero: {
      title: 'Paper Plug Trays voor Professionele Groenteteelt: Tomaten, Paprika, Komkommer',
      subtitle: 'Verhoog uw groenteopbrengst met 30% door optimale wortelontwikkeling en stressvrije transplantatie. Complete gids voor commerciële groentekwekers.',
      cta1: 'Bestel Paper Plug Trays',
      cta2: 'Download Groenteteelt Gids'
    },
    intro: {
      title: 'Revolutionaire propagatie voor commerciële groenteteelt',
      content: [
        'Paper plug trays hebben bewezen hun waarde in professionele groenteteelt wereldwijd. Nederlandse glastuinbouwbedrijven die paper plugs gebruiken voor tomaten, paprika\'s en komkommers rapporteren consistente opbrengstverhogingen van 25-35%, dramatisch lagere uitvalpercentages, en significant kortere kweektijden.',
        'Voor commerciële groentekwekers telt elke procent marge. Paper plugs elimineren transplantatieschok - het grootste probleem in traditionele propagatie - waardoor planten 2-3 weken sneller productierijp zijn. Dit vertaalt direct naar meer omzet en lagere arbeidskosten.',
        'Deze gids richt zich specifiek op de vier belangrijkste kasgroenten: tomaten, paprika\'s, komkommers en aubergines. We behandelen gewas-specifieke celgroottes, optimale kweekprotocollen, en bewezen ROI-cijfers van Nederlandse en Duitse kwekerijen.'
      ]
    },
    whyPaperPlugs: {
      title: 'Waarom paper plugs superieur zijn voor groenteteelt',
      content: [
        'Groenteplanten zoals tomaten en paprika\'s zijn bijzonder gevoelig voor wortelbeschadiging tijdens transplantatie. Het traditionele systeem - planten uit plastic trays halen en overzetten - veroorzaakt altijd microschade aan haarwortels. Dit resulteert in transplantatieschok: de plant stopt 7-14 dagen met groei om het wortelsysteem te herstellen.',
        'Paper plugs elimineren dit probleem volledig. De hele plug gaat de grond in, wortels blijven volledig intact, en de plant groeit ononderbroken door. University of Wageningen studies tonen aan dat tomatenplanten in paper plugs 40% meer haarwortels ontwikkelen, wat direct correleert met hogere nutriëntopname en uiteindelijk hogere vruchtzetting.',
        'Het poreuze papiermateriaal heeft een tweede cruciaal voordeel: air-pruning. Wortels die de zijkant van de plug bereiken worden "gesnoeid" door luchcontact, wat de plant stimuleert om meer secundaire wortels te vormen. Dit resulteert in een dicht, fibreus wortelstelsel - precies wat nodig is voor optimale groenteopbrengst.',
        'Voor grootschalige commerciële teelt betekent dit: uniformere gewassen (essentieel voor planning en marketing), kortere kweektijden (meer rondes per jaar), en hogere kwaliteit eindproduct (grotere vruchten, betere smaak). Een tomatenkweker in Westland verhoogde zijn jaaropbrengst met €120.000 simpelweg door over te stappen naar paper plugs.'
      ]
    },
    cropSpecific: {
      title: 'Gewas-specifieke aanbevelingen',
      crops: [
        {
          name: 'Tomaten (Solanum lycopersicum)',
          cellSize: '84-cell trays (4.5 cm diameter)',
          cycleTime: '4-6 weken zaailing tot transplantatie',
          benefits: 'Sterker wortelstelsel, 30-40% hogere vruchtzetting, betere smaak door optimale nutriëntopname'
        },
        {
          name: 'Paprika (Capsicum annuum)',
          cellSize: '84-cell trays (4.5 cm diameter)',
          cycleTime: '5-7 weken zaailing tot transplantatie',
          benefits: '35% snellere groei, uniformere vruchtontwikkeling, hogere Brix-waarden (zoeter)'
        },
        {
          name: 'Komkommer (Cucumis sativus)',
          cellSize: '84-cell trays (4.5 cm diameter)',
          cycleTime: '3-4 weken zaailing tot transplantatie',
          benefits: 'Minimale kans op Pythium (wortelrot), 25% kortere productietijd, 20% hogere opbrengst'
        },
        {
          name: 'Aubergine (Solanum melongena)',
          cellSize: '84-cell trays (4.5 cm diameter)',
          cycleTime: '5-7 weken zaailing tot transplantatie',
          benefits: 'Betere hittetolerantie, sterkere stammen, uniformere vruchtvorm'
        }
      ]
    },
    tomatoes: {
      title: 'Tomaten kweken in paper plugs: complete protocol',
      content: [
        'Tomaten zijn het meest geteelde kasgewas in Nederland, en paper plugs zijn de ideale propagatie-oplossing. Start met zaad in PAPER PLUG TRAY 84 gevuld met hoogwaardige zaaigrond (60% veen, 30% kokos, 10% perliet). Zaai één zaad per cel op 0.5 cm diepte.',
        'Kiemtemperatuur: 22-25°C gedurende 5-7 dagen. Zodra kiemplanten verschijnen, verlaag naar 18-20°C dag en 16°C nacht. Dit voorkomt lengte-groei en stimuleert wortelontwikkeling. Lichtintensiteit minimaal 10.000 lux, idealiter 15.000+ lux met LED groeilicht.',
        'Voeding: Start met EC 1.2 na 10 dagen, verhoog geleidelijk naar EC 2.0 bij transplantatie. pH handhaven tussen 5.8-6.2. Paper plugs hebben uitstekende drainage, dus dagelijkse irrigatie is meestal voldoende met 50-75ml per plug.',
        'Transplantatie: Na 4-6 weken zijn zaailingen klaar (15-20 cm hoogte, 4-6 echte bladeren). Plant direct in eindsubstraat of grotere pot inclusief plug. Wortels zullen binnen 48 uur door het papier heen groeien. Geen aangroeiperiode nodig - productie start onmiddellijk.',
        'Resultaten: Kwekers rapporteren gemiddeld 8-9 kg tomaten per plant versus 6-7 kg met traditionele methodes. Het sterkere wortelstelsel ondersteunt meer vruchten, langere productieperiode, en betere stressbestendigheid.'
      ]
    },
    peppers: {
      title: 'Paprika productie met paper plug technologie',
      content: [
        'Paprika\'s zijn notoir moeilijk te transplanteren door hun gevoelige wortels. Paper plugs lossen dit probleem elegant op. Gebruik dezelfde PAPER PLUG TRAY 84 als voor tomaten, maar met aangepaste teeltcondities.',
        'Kiemcondities zijn cruciaal: 26-28°C grondtemperatuur gedurende 7-10 dagen. Paprika zaad is traag en ongelijkmatig, dus consistent hoge temperatuur is essentieel. Overweeg verwarmingsmatten onder trays. Zodra gekiemd, verlaag naar 22-24°C dag.',
        'Paprika\'s vereisen hogere luchtvochtigheid dan tomaten: 70-80% RH tijdens kiemfase, 60-70% tijdens groei. Het poreuze papier helpt overtollig vocht weg te leiden, wat schimmelproblemen voorkomt die vaak optreden in plastic trays bij hoge luchtvochtigheid.',
        'Voedingsstrategie: Begin met EC 1.0, verhoog zeer geleidelijk naar EC 1.8 bij transplantatie. Paprika\'s zijn gevoelig voor zoutopbouw. Wekelijks doorspoelen met EC 0.5 water voorkomt problemen. Calcium is kritiek - zorg voor minimaal 150 ppm Ca in voedingsoplossing.',
        'Transplantatie na 5-7 weken levert optimale resultaten. Planten moeten 10-15 cm hoog zijn met minimaal 6 echte bladeren. Het robuuste wortelsysteem ontwikkeld in paper plugs zorgt dat planten direct doorgroeien - geen groeionderbreking, 2-3 weken eerder producerend.'
      ]
    },
    cucumbers: {
      title: 'Komkommer propagatie: snelheid en kwaliteit',
      content: [
        'Komkommers groeien snel en paper plugs maximaliseren deze natuurlijke eigenschap. De korte kweekperiode (3-4 weken van zaad tot transplantatie) maakt hoogvolume productie mogelijk - sommige kwekers starten elke week nieuwe batches.',
        'Zaai komkommerzaad plat (horizontaal) in plugs op 1 cm diepte. Kiemtemperatuur 24-26°C, kiem binnen 3-5 dagen. Verlaag naar 20-22°C dag, 18°C nacht na kiemen. Komkommers zijn gevoelig voor lage temperaturen - ga nooit onder 16°C.',
        'Snelle groei betekent honger: Start voeding bij EC 1.4 direct na kiemen, verhoog naar EC 2.2 bij transplantatie. Komkommers consumeren veel water - verwacht 100-150ml per plug per dag bij warme condities. De uitstekende drainage van paper plugs voorkomt wateroverlast.',
        'Pythium (wortelrot) is de grootste vijand van komkommerteelt. Paper plugs bieden significant betere bescherming dan plastic omdat overtollig water direct wegvloeit en zuurstof de wortels bereikt. Nederlandse onderzoeken tonen 80% reductie in Pythium incidentie bij paper plug gebruik.',
        'Transplanteer zodra planten 2-3 echte bladeren hebben (naast de zaadlobben). Niet langer wachten - komkommers worden wortelgebonden in plugs na 4 weken. Plant inclusief plug, en binnen 3 dagen groeien wortels door het papier. Eerste komkommers oogstbaar binnen 40-50 dagen na transplantatie.'
      ]
    },
    bestPractices: {
      title: 'Best practices voor groenteteelt met paper plugs',
      items: [
        {
          title: 'Substraatkeuze is kritiek',
          description: 'Gebruik professionele zaaigrond met pH 5.8-6.2, EC <0.8. Mix moet luchtig zijn (minimaal 30% poriënvolume) om drainage te optimaliseren. Veen-kokos blends (60/30) met perliet geven beste resultaten.'
        },
        {
          title: 'Temperatuurmanagement',
          description: 'Investeer in bodemthermometers. Grondtemperatuur is belangrijker dan luchttemperatuur voor kieming. Verwarmingsmatten onder trays zijn essentieel voor betrouwbare resultaten, vooral in koude maanden.'
        },
        {
          title: 'Voedingsschema\'s aanpassen',
          description: 'Paper plugs drogen sneller dan plastic (meer luchtstroom). Verhoog irrigatiefrequentie maar verlaag volume per keer. Dit bevordert frequente zuurstoftoevoer aan wortels zonder wateroverlast.'
        },
        {
          title: 'Lichtmanagement',
          description: 'Zorg voor minimaal 14-16 uur licht per dag bij intensiteit >10.000 lux. LED groeilampen zijn meest efficiënt. Onvoldoende licht leidt tot lange, slappe planten die niet goed produceren.'
        },
        {
          title: 'Preventieve gewasbescherming',
          description: 'Begin met gezonde planten. Paper plugs faciliteren schone teelt (minder schimmeldruk), maar blijf monitoren op trips, bladluis, en spint. Biologische bestrijding werkt uitstekend in combinatie met paper plug systemen.'
        },
        {
          title: 'Timing van transplantatie',
          description: 'Niet te lang wachten. Zaailingen moeten voldoende ontwikkeld zijn maar niet wortelgebonden. Optimale transplantatie window is 3-5 dagen breed per gewas - plan logistiek hierop.'
        }
      ]
    },
    roi: {
      title: 'Return on Investment: concrete cijfers uit de praktijk',
      content: [
        'Case study: Nederlandse tomatenkweker (10.000 m² kas, 25.000 planten/jaar). Investering paper plugs: €8.000/jaar. Voordelen: €12.000 arbeidsbesparing (40% sneller transplanteren), €15.000 minder uitval (van 8% naar 1%), €35.000 extra omzet (15% meer productie door kortere cyclus). Totaal voordeel: €62.000. ROI: 775%.',
        'Duitse paprikakweker (8.000 m² kas): Schakelde over van plastic naar paper plugs. Resultaat: 2 weken kortere teeltduur per cyclus, mogelijk makend 4.5 rondes/jaar in plaats van 4. Extra ronde genereerde €45.000 additionele omzet. Investering paper plugs: €6.500/jaar. Netto voordeel: €38.500. ROI: 592%.',
        'Belgische komkommerkweker (12.000 m² kas): Hoofdprobleem was Pythium wortelrot met 15% uitval per ronde. Na overstap paper plugs daalde uitval naar <2%. Bespaarde kosten: €28.000/jaar. Plus arbeidsbesparingen €9.000. Totaal: €37.000 voordeel bij €9.000 investering. ROI: 411%.',
        'Deze cijfers zijn conservatief en geverifieerd. Grotere kwekerijen zien vaak hogere ROI omdat besparingen schalen met volume. Belangrijker: kwaliteitsverbeteringen (uniformiteit, smaak, houdbaarheid) verhogen marktwaarde maar zijn moeilijk exact te kwantificeren.',
        'Financiële tip: Check Nederlandse en EU subsidies voor duurzame innovatie. Paper plugs kwalificeren vaak voor 30-40% subsidie, wat initiële investering significant verlaagt en ROI verder verhoogt.'
      ]
    },
    implementation: {
      title: 'Implementatie in uw kwekerij: stappenplan',
      content: [
        'Start met een pilot test voordat u volledig overschakelt. Bestel 2-3 dozen PAPER PLUG TRAY 84 (elke doos bevat 8 trays) en test met één batch planten. Monitor groeisnelheid, wortelontwikkeling, en arbeidsefficiëntie versus uw huidige systeem.',
        'Documenteer alles: fotografeer wortelsystemen bij transplantatie, noteer arbeidsuren, meet uitvalpercentages. Na 6-8 weken heeft u harde data om beslissing te nemen. Vrijwel alle kwekers die correct piloten besluiten over te schakelen - de voordelen zijn onmiskenbaar.',
        'Voor volledige implementatie: bereken hoeveel trays u nodig heeft per cyclus, vermenigvuldig met aantal cycli per jaar, plus 20% buffer. Lumora levert op pallet (56 dozen) of volle truck (800+ dozen) voor volume korting. Just-in-time levering mogelijk om opslagkosten te minimaliseren.',
        'Training personeel is eenvoudig: transplantatie met paper plugs is intuïtiever dan traditionele methodes. De meeste kwekers zien productiviteit stijgen binnen 1 week. Maak duidelijke protocollen voor voeding, irrigatie en timing per gewas.',
        'Technische ondersteuning: Lumora\'s agronomische adviseurs kunnen u helpen met gewas-specifieke teeltschema\'s, probleemoplossing, en optimalisatie. Contact is kosteloos voor klanten. We zijn pas succesvol als u succesvol bent.'
      ],
      ctaText: 'Start Pilot Test - Bestel Nu'
    },
    relatedArticles: {
      title: 'Gerelateerde artikelen voor groentekwekers',
      articles: [
        { title: 'Wat zijn Paper Plug Trays? Complete introductie', href: '/propagatie-technologie/wat-zijn-paper-plug-trays' },
        { title: 'FP 12+ Technologie: 12 maanden stabiliteit', href: '/propagatie-technologie/fp-12-technologie' },
        { title: 'Wortelontwikkeling optimaliseren in paper plugs', href: '/propagatie-technologie/wortelontwikkeling' },
        { title: 'ROI berekenen voor paper plug investeringen', href: '/seo/efficientie-roi/roi-berekenen' },
        { title: 'PAPER PLUG TRAY 84 specificaties', href: '/products' }
      ]
    },
    finalCta: {
      title: 'Klaar om uw groenteopbrengst te maximaliseren?',
      subtitle: 'Sluit u aan bij honderden professionele groentekwekers die paper plugs gebruiken voor superieure resultaten. Bestel vandaag en ervaar het verschil.',
      ctaText: 'Bestel Paper Plug Trays'
    }
  },
  en: {
    hero: {
      title: 'Paper Plug Trays for Professional Vegetable Growing: Tomatoes, Peppers, Cucumber',
      subtitle: 'Increase your vegetable yield by 30% through optimal root development and stress-free transplanting. Complete guide for commercial vegetable growers.',
      cta1: 'Order Paper Plug Trays',
      cta2: 'Download Vegetable Guide'
    },
    intro: {
      title: 'Revolutionary propagation for commercial vegetable cultivation',
      content: [
        'Paper plug trays have proven their value in professional vegetable cultivation worldwide. Dutch greenhouse businesses using paper plugs for tomatoes, peppers and cucumbers report consistent yield increases of 25-35%, dramatically lower failure rates, and significantly shorter growing times.',
        'For commercial vegetable growers, every percentage margin counts. Paper plugs eliminate transplant shock - the biggest problem in traditional propagation - allowing plants to reach production maturity 2-3 weeks faster. This translates directly to higher revenue and lower labor costs.',
        'This guide focuses specifically on the four most important greenhouse vegetables: tomatoes, peppers, cucumbers and eggplants. We cover crop-specific cell sizes, optimal growing protocols, and proven ROI figures from Dutch and German nurseries.'
      ]
    },
    whyPaperPlugs: {
      title: 'Why paper plugs are superior for vegetable cultivation',
      content: [
        'Vegetable plants like tomatoes and peppers are particularly sensitive to root damage during transplanting. The traditional system - removing plants from plastic trays and transferring - always causes micro-damage to hair roots. This results in transplant shock: the plant stops growing for 7-14 days to repair the root system.',
        'Paper plugs eliminate this problem completely. The entire plug goes into the ground, roots remain fully intact, and the plant continues growing uninterrupted. University of Wageningen studies show that tomato plants in paper plugs develop 40% more hair roots, directly correlating with higher nutrient uptake and ultimately higher fruit set.',
        'The porous paper material has a second crucial advantage: air-pruning. Roots reaching the side of the plug are "pruned" by air contact, stimulating the plant to form more secondary roots. This results in a dense, fibrous root system - exactly what\'s needed for optimal vegetable yield.',
        'For large-scale commercial cultivation this means: more uniform crops (essential for planning and marketing), shorter growing times (more cycles per year), and higher quality end product (larger fruits, better taste). A tomato grower in Westland increased annual yield by €120,000 simply by switching to paper plugs.'
      ]
    },
    cropSpecific: {
      title: 'Crop-specific recommendations',
      crops: [
        {
          name: 'Tomatoes (Solanum lycopersicum)',
          cellSize: '84-cell trays (4.5 cm diameter)',
          cycleTime: '4-6 weeks seedling to transplant',
          benefits: 'Stronger root system, 30-40% higher fruit set, better taste through optimal nutrient uptake'
        },
        {
          name: 'Peppers (Capsicum annuum)',
          cellSize: '84-cell trays (4.5 cm diameter)',
          cycleTime: '5-7 weeks seedling to transplant',
          benefits: '35% faster growth, more uniform fruit development, higher Brix values (sweeter)'
        },
        {
          name: 'Cucumber (Cucumis sativus)',
          cellSize: '84-cell trays (4.5 cm diameter)',
          cycleTime: '3-4 weeks seedling to transplant',
          benefits: 'Minimal Pythium (root rot) risk, 25% shorter production time, 20% higher yield'
        },
        {
          name: 'Eggplant (Solanum melongena)',
          cellSize: '84-cell trays (4.5 cm diameter)',
          cycleTime: '5-7 weeks seedling to transplant',
          benefits: 'Better heat tolerance, stronger stems, more uniform fruit shape'
        }
      ]
    },
    tomatoes: {
      title: 'Growing tomatoes in paper plugs: complete protocol',
      content: [
        'Tomatoes are the most grown greenhouse crop in the Netherlands, and paper plugs are the ideal propagation solution. Start with seed in PAPER PLUG TRAY 84 filled with high-quality seed starting mix (60% peat, 30% coco, 10% perlite). Sow one seed per cell at 0.5 cm depth.',
        'Germination temperature: 22-25°C for 5-7 days. Once seedlings emerge, lower to 18-20°C day and 16°C night. This prevents stretching and stimulates root development. Light intensity minimum 10,000 lux, ideally 15,000+ lux with LED grow lights.',
        'Nutrition: Start with EC 1.2 after 10 days, gradually increase to EC 2.0 at transplant. Maintain pH between 5.8-6.2. Paper plugs have excellent drainage, so daily irrigation is usually sufficient at 50-75ml per plug.',
        'Transplanting: After 4-6 weeks seedlings are ready (15-20 cm height, 4-6 true leaves). Plant directly into final substrate or larger pot including plug. Roots will grow through the paper within 48 hours. No establishment period needed - production starts immediately.',
        'Results: Growers report average 8-9 kg tomatoes per plant versus 6-7 kg with traditional methods. The stronger root system supports more fruit, longer production period, and better stress resistance.'
      ]
    },
    peppers: {
      title: 'Pepper production with paper plug technology',
      content: [
        'Peppers are notoriously difficult to transplant due to their sensitive roots. Paper plugs elegantly solve this problem. Use the same PAPER PLUG TRAY 84 as for tomatoes, but with adjusted growing conditions.',
        'Germination conditions are crucial: 26-28°C soil temperature for 7-10 days. Pepper seed is slow and uneven, so consistent high temperature is essential. Consider heating mats under trays. Once germinated, lower to 22-24°C day.',
        'Peppers require higher humidity than tomatoes: 70-80% RH during germination phase, 60-70% during growth. The porous paper helps drain excess moisture, preventing fungal problems often occurring in plastic trays at high humidity.',
        'Nutrition strategy: Start with EC 1.0, increase very gradually to EC 1.8 at transplant. Peppers are sensitive to salt buildup. Weekly flushing with EC 0.5 water prevents problems. Calcium is critical - ensure minimum 150 ppm Ca in nutrient solution.',
        'Transplanting after 5-7 weeks yields optimal results. Plants should be 10-15 cm tall with minimum 6 true leaves. The robust root system developed in paper plugs ensures plants continue growing immediately - no growth interruption, 2-3 weeks earlier production.'
      ]
    },
    cucumbers: {
      title: 'Cucumber propagation: speed and quality',
      content: [
        'Cucumbers grow fast and paper plugs maximize this natural trait. The short growing period (3-4 weeks from seed to transplant) enables high-volume production - some growers start new batches every week.',
        'Sow cucumber seed flat (horizontal) in plugs at 1 cm depth. Germination temperature 24-26°C, germinate within 3-5 days. Lower to 20-22°C day, 18°C night after germination. Cucumbers are sensitive to low temperatures - never go below 16°C.',
        'Fast growth means hunger: Start feeding at EC 1.4 immediately after germination, increase to EC 2.2 at transplant. Cucumbers consume lots of water - expect 100-150ml per plug per day in warm conditions. The excellent drainage of paper plugs prevents waterlogging.',
        'Pythium (root rot) is the biggest enemy of cucumber cultivation. Paper plugs offer significantly better protection than plastic because excess water drains immediately and oxygen reaches roots. Dutch research shows 80% reduction in Pythium incidence with paper plug use.',
        'Transplant once plants have 2-3 true leaves (besides seed leaves). Don\'t wait longer - cucumbers become rootbound in plugs after 4 weeks. Plant including plug, and within 3 days roots grow through paper. First cucumbers harvestable within 40-50 days after transplant.'
      ]
    },
    bestPractices: {
      title: 'Best practices for vegetable cultivation with paper plugs',
      items: [
        {
          title: 'Substrate choice is critical',
          description: 'Use professional seed starting mix with pH 5.8-6.2, EC <0.8. Mix must be airy (minimum 30% pore volume) to optimize drainage. Peat-coco blends (60/30) with perlite give best results.'
        },
        {
          title: 'Temperature management',
          description: 'Invest in soil thermometers. Soil temperature is more important than air temperature for germination. Heating mats under trays are essential for reliable results, especially in cold months.'
        },
        {
          title: 'Adjust nutrition schedules',
          description: 'Paper plugs dry faster than plastic (more airflow). Increase irrigation frequency but reduce volume per application. This promotes frequent oxygen supply to roots without waterlogging.'
        },
        {
          title: 'Light management',
          description: 'Ensure minimum 14-16 hours light per day at intensity >10,000 lux. LED grow lights are most efficient. Insufficient light leads to tall, weak plants that don\'t produce well.'
        },
        {
          title: 'Preventive crop protection',
          description: 'Start with healthy plants. Paper plugs facilitate clean cultivation (less fungal pressure), but keep monitoring for thrips, aphids, and spider mites. Biological control works excellently combined with paper plug systems.'
        },
        {
          title: 'Transplant timing',
          description: 'Don\'t wait too long. Seedlings should be sufficiently developed but not rootbound. Optimal transplant window is 3-5 days wide per crop - plan logistics accordingly.'
        }
      ]
    },
    roi: {
      title: 'Return on Investment: concrete figures from practice',
      content: [
        'Case study: Dutch tomato grower (10,000 m² greenhouse, 25,000 plants/year). Paper plug investment: €8,000/year. Benefits: €12,000 labor savings (40% faster transplanting), €15,000 less failure (from 8% to 1%), €35,000 extra revenue (15% more production through shorter cycle). Total benefit: €62,000. ROI: 775%.',
        'German pepper grower (8,000 m² greenhouse): Switched from plastic to paper plugs. Result: 2 weeks shorter cultivation per cycle, enabling 4.5 rounds/year instead of 4. Extra round generated €45,000 additional revenue. Paper plug investment: €6,500/year. Net benefit: €38,500. ROI: 592%.',
        'Belgian cucumber grower (12,000 m² greenhouse): Main problem was Pythium root rot with 15% failure per round. After switching to paper plugs, failure dropped to <2%. Saved costs: €28,000/year. Plus labor savings €9,000. Total: €37,000 benefit on €9,000 investment. ROI: 411%.',
        'These figures are conservative and verified. Larger nurseries often see higher ROI because savings scale with volume. More importantly: quality improvements (uniformity, taste, shelf life) increase market value but are difficult to quantify exactly.',
        'Financial tip: Check Dutch and EU subsidies for sustainable innovation. Paper plugs often qualify for 30-40% subsidy, significantly reducing initial investment and further increasing ROI.'
      ]
    },
    implementation: {
      title: 'Implementation in your nursery: step-by-step plan',
      content: [
        'Start with a pilot test before fully switching. Order 2-3 boxes PAPER PLUG TRAY 84 (each box contains 8 trays) and test with one plant batch. Monitor growth rate, root development, and labor efficiency versus your current system.',
        'Document everything: photograph root systems at transplant, note labor hours, measure failure percentages. After 6-8 weeks you have hard data to make a decision. Almost all growers who pilot correctly decide to switch - the benefits are undeniable.',
        'For full implementation: calculate how many trays you need per cycle, multiply by number of cycles per year, plus 20% buffer. Lumora delivers by pallet (56 boxes) or full truck (800+ boxes) for volume discount. Just-in-time delivery possible to minimize storage costs.',
        'Staff training is simple: transplanting with paper plugs is more intuitive than traditional methods. Most growers see productivity increase within 1 week. Create clear protocols for nutrition, irrigation and timing per crop.',
        'Technical support: Lumora\'s agronomic advisors can help you with crop-specific growing schedules, troubleshooting, and optimization. Contact is free for customers. We\'re only successful when you\'re successful.'
      ],
      ctaText: 'Start Pilot Test - Order Now'
    },
    relatedArticles: {
      title: 'Related articles for vegetable growers',
      articles: [
        { title: 'What are Paper Plug Trays? Complete introduction', href: '/seo/propagation-technology/what-are-paper-plug-trays' },
        { title: 'FP 12+ Technology: 12 months stability', href: '/seo/propagation-technology/fp-12-technology' },
        { title: 'Optimize root development in paper plugs', href: '/seo/propagation-technology/root-development' },
        { title: 'Calculate ROI for paper plug investments', href: '/seo/efficiency-roi/calculate-roi' },
        { title: 'PAPER PLUG TRAY 84 specifications', href: '/products' }
      ]
    },
    finalCta: {
      title: 'Ready to maximize your vegetable yield?',
      subtitle: 'Join hundreds of professional vegetable growers using paper plugs for superior results. Order today and experience the difference.',
      ctaText: 'Order Paper Plug Trays'
    }
  },
  de: {
    hero: {
      title: 'Paper Plug Trays für professionellen Gemüseanbau: Tomaten, Paprika, Gurken',
      subtitle: 'Steigern Sie Ihren Gemüseertrag um 30% durch optimale Wurzelentwicklung und stressfreie Transplantation. Vollständiger Leitfaden für kommerzielle Gemüsezüchter.',
      cta1: 'Paper Plug Trays bestellen',
      cta2: 'Gemüseanbau-Leitfaden herunterladen'
    },
    intro: {
      title: 'Revolutionäre Vermehrung für kommerziellen Gemüseanbau',
      content: [
        'Paper Plug Trays haben ihren Wert im professionellen Gemüseanbau weltweit bewiesen. Niederländische Gewächshausbetriebe, die Paper Plugs für Tomaten, Paprika und Gurken verwenden, berichten von konsistenten Ertragssteigerungen von 25-35%, dramatisch niedrigeren Ausfallraten und deutlich kürzeren Wachstumszeiten.',
        'Für kommerzielle Gemüsezüchter zählt jeder Prozentpunkt Marge. Paper Plugs eliminieren Transplantationsschock - das größte Problem bei traditioneller Vermehrung - wodurch Pflanzen 2-3 Wochen schneller produktionsreif werden. Dies übersetzt sich direkt in höhere Einnahmen und niedrigere Arbeitskosten.',
        'Dieser Leitfaden konzentriert sich speziell auf die vier wichtigsten Gewächshausgemüse: Tomaten, Paprika, Gurken und Auberginen. Wir behandeln kulturspezifische Zellgrößen, optimale Anbauprotokolle und bewährte ROI-Zahlen von niederländischen und deutschen Gärtnereien.'
      ]
    },
    whyPaperPlugs: {
      title: 'Warum Paper Plugs dem Gemüseanbau überlegen sind',
      content: [
        'Gemüsepflanzen wie Tomaten und Paprika sind besonders empfindlich gegenüber Wurzelschäden beim Umpflanzen. Das traditionelle System - Pflanzen aus Kunststoffschalen entfernen und umsetzen - verursacht immer Mikroschäden an Haarwurzeln. Dies führt zu Transplantationsschock: Die Pflanze stellt das Wachstum für 7-14 Tage ein, um das Wurzelsystem zu reparieren.',
        'Paper Plugs eliminieren dieses Problem vollständig. Der gesamte Plug geht in den Boden, Wurzeln bleiben vollständig intakt, und die Pflanze wächst ununterbrochen weiter. Studien der Universität Wageningen zeigen, dass Tomatenpflanzen in Paper Plugs 40% mehr Haarwurzeln entwickeln, was direkt mit höherer Nährstoffaufnahme und letztlich höherem Fruchtansatz korreliert.',
        'Das poröse Papiermaterial hat einen zweiten entscheidenden Vorteil: Air-Pruning. Wurzeln, die die Seite des Plugs erreichen, werden durch Luftkontakt "beschnitten", was die Pflanze anregt, mehr sekundäre Wurzeln zu bilden. Dies führt zu einem dichten, faserigen Wurzelsystem - genau das, was für optimalen Gemüseertrag benötigt wird.',
        'Für großflächigen kommerziellen Anbau bedeutet dies: gleichmäßigere Kulturen (essentiell für Planung und Marketing), kürzere Wachstumszeiten (mehr Zyklen pro Jahr) und höhere Qualität des Endprodukts (größere Früchte, besserer Geschmack). Ein Tomatenzüchter in Westland steigerte den Jahresertrag um €120.000, einfach durch Umstellung auf Paper Plugs.'
      ]
    },
    cropSpecific: {
      title: 'Kulturspezifische Empfehlungen',
      crops: [
        {
          name: 'Tomaten (Solanum lycopersicum)',
          cellSize: '84-Zellen-Schalen (4,5 cm Durchmesser)',
          cycleTime: '4-6 Wochen Sämling bis Transplantation',
          benefits: 'Stärkeres Wurzelsystem, 30-40% höherer Fruchtansatz, besserer Geschmack durch optimale Nährstoffaufnahme'
        },
        {
          name: 'Paprika (Capsicum annuum)',
          cellSize: '84-Zellen-Schalen (4,5 cm Durchmesser)',
          cycleTime: '5-7 Wochen Sämling bis Transplantation',
          benefits: '35% schnelleres Wachstum, gleichmäßigere Fruchtentwicklung, höhere Brix-Werte (süßer)'
        },
        {
          name: 'Gurke (Cucumis sativus)',
          cellSize: '84-Zellen-Schalen (4,5 cm Durchmesser)',
          cycleTime: '3-4 Wochen Sämling bis Transplantation',
          benefits: 'Minimales Pythium-Risiko (Wurzelfäule), 25% kürzere Produktionszeit, 20% höherer Ertrag'
        },
        {
          name: 'Aubergine (Solanum melongena)',
          cellSize: '84-Zellen-Schalen (4,5 cm Durchmesser)',
          cycleTime: '5-7 Wochen Sämling bis Transplantation',
          benefits: 'Bessere Hitzetoleranz, stärkere Stämme, gleichmäßigere Fruchtform'
        }
      ]
    },
    tomatoes: {
      title: 'Tomatenanbau in Paper Plugs: vollständiges Protokoll',
      content: [
        'Tomaten sind die meistangebaute Gewächshauskultur in den Niederlanden, und Paper Plugs sind die ideale Vermehrungslösung. Beginnen Sie mit Samen in PAPER PLUG TRAY 84, gefüllt mit hochwertiger Aussaaterde (60% Torf, 30% Kokos, 10% Perlit). Säen Sie ein Samen pro Zelle in 0,5 cm Tiefe.',
        'Keimtemperatur: 22-25°C für 5-7 Tage. Sobald Sämlinge erscheinen, senken Sie auf 18-20°C Tag und 16°C Nacht. Dies verhindert Längenwachstum und stimuliert Wurzelentwicklung. Lichtintensität mindestens 10.000 Lux, idealerweise 15.000+ Lux mit LED-Wachstumslampen.',
        'Ernährung: Beginnen Sie mit EC 1,2 nach 10 Tagen, erhöhen Sie allmählich auf EC 2,0 bei Transplantation. Halten Sie pH zwischen 5,8-6,2. Paper Plugs haben ausgezeichnete Drainage, daher ist tägliche Bewässerung normalerweise ausreichend bei 50-75 ml pro Plug.',
        'Transplantation: Nach 4-6 Wochen sind Sämlinge bereit (15-20 cm Höhe, 4-6 echte Blätter). Pflanzen Sie direkt in Endsubstrat oder größeren Topf einschließlich Plug. Wurzeln wachsen innerhalb von 48 Stunden durch das Papier. Keine Etablierungsperiode erforderlich - Produktion beginnt sofort.',
        'Ergebnisse: Züchter berichten durchschnittlich 8-9 kg Tomaten pro Pflanze versus 6-7 kg mit traditionellen Methoden. Das stärkere Wurzelsystem unterstützt mehr Früchte, längere Produktionsperiode und bessere Stressresistenz.'
      ]
    },
    peppers: {
      title: 'Paprikaproduktion mit Paper Plug Technologie',
      content: [
        'Paprika sind notorisch schwierig zu verpflanzen aufgrund ihrer empfindlichen Wurzeln. Paper Plugs lösen dieses Problem elegant. Verwenden Sie dieselbe PAPER PLUG TRAY 84 wie für Tomaten, jedoch mit angepassten Anbaubedingungen.',
        'Keimbedingungen sind entscheidend: 26-28°C Bodentemperatur für 7-10 Tage. Paprikasamen ist langsam und ungleichmäßig, daher ist konstant hohe Temperatur essentiell. Erwägen Sie Heizmatten unter Schalen. Nach Keimung senken auf 22-24°C Tag.',
        'Paprika benötigt höhere Luftfeuchtigkeit als Tomaten: 70-80% RH während Keimphase, 60-70% während Wachstum. Das poröse Papier hilft überschüssige Feuchtigkeit abzuleiten und verhindert Pilzprobleme, die oft in Kunststoffschalen bei hoher Luftfeuchtigkeit auftreten.',
        'Ernährungsstrategie: Beginnen Sie mit EC 1,0, erhöhen Sie sehr allmählich auf EC 1,8 bei Transplantation. Paprika sind empfindlich gegenüber Salzansammlung. Wöchentliches Spülen mit EC 0,5 Wasser verhindert Probleme. Kalzium ist kritisch - stellen Sie mindestens 150 ppm Ca in Nährlösung sicher.',
        'Transplantation nach 5-7 Wochen liefert optimale Ergebnisse. Pflanzen sollten 10-15 cm hoch sein mit mindestens 6 echten Blättern. Das robuste Wurzelsystem, das sich in Paper Plugs entwickelt hat, sorgt dafür, dass Pflanzen sofort weiterwachsen - keine Wachstumsunterbrechung, 2-3 Wochen frühere Produktion.'
      ]
    },
    cucumbers: {
      title: 'Gurkenvermehrung: Geschwindigkeit und Qualität',
      content: [
        'Gurken wachsen schnell und Paper Plugs maximieren diese natürliche Eigenschaft. Die kurze Wachstumsperiode (3-4 Wochen von Samen bis Transplantation) ermöglicht Hochvolumenproduktion - einige Züchter starten jede Woche neue Chargen.',
        'Säen Sie Gurkensamen flach (horizontal) in Plugs in 1 cm Tiefe. Keimtemperatur 24-26°C, Keimung innerhalb 3-5 Tage. Senken auf 20-22°C Tag, 18°C Nacht nach Keimung. Gurken sind empfindlich gegenüber niedrigen Temperaturen - gehen Sie nie unter 16°C.',
        'Schnelles Wachstum bedeutet Hunger: Beginnen Sie Fütterung bei EC 1,4 unmittelbar nach Keimung, erhöhen auf EC 2,2 bei Transplantation. Gurken verbrauchen viel Wasser - erwarten Sie 100-150 ml pro Plug pro Tag bei warmen Bedingungen. Die ausgezeichnete Drainage von Paper Plugs verhindert Staunässe.',
        'Pythium (Wurzelfäule) ist der größte Feind des Gurkenanbaus. Paper Plugs bieten deutlich besseren Schutz als Kunststoff, da überschüssiges Wasser sofort abfließt und Sauerstoff die Wurzeln erreicht. Niederländische Forschungen zeigen 80% Reduktion der Pythium-Inzidenz bei Paper Plug Verwendung.',
        'Transplantieren Sie, sobald Pflanzen 2-3 echte Blätter haben (neben Keimblättern). Warten Sie nicht länger - Gurken werden wurzelgebunden in Plugs nach 4 Wochen. Pflanzen Sie einschließlich Plug, und innerhalb von 3 Tagen wachsen Wurzeln durch das Papier. Erste Gurken erntbar innerhalb 40-50 Tagen nach Transplantation.'
      ]
    },
    bestPractices: {
      title: 'Best Practices für Gemüseanbau mit Paper Plugs',
      items: [
        {
          title: 'Substratwahl ist kritisch',
          description: 'Verwenden Sie professionelle Aussaaterde mit pH 5,8-6,2, EC <0,8. Mischung muss luftig sein (mindestens 30% Porenvolumen) um Drainage zu optimieren. Torf-Kokos-Mischungen (60/30) mit Perlit liefern beste Ergebnisse.'
        },
        {
          title: 'Temperaturmanagement',
          description: 'Investieren Sie in Bodenthermometer. Bodentemperatur ist wichtiger als Lufttemperatur für Keimung. Heizmatten unter Schalen sind essentiell für zuverlässige Ergebnisse, besonders in kalten Monaten.'
        },
        {
          title: 'Ernährungspläne anpassen',
          description: 'Paper Plugs trocknen schneller als Kunststoff (mehr Luftstrom). Erhöhen Sie Bewässerungsfrequenz, aber reduzieren Sie Volumen pro Anwendung. Dies fördert häufige Sauerstoffzufuhr zu Wurzeln ohne Staunässe.'
        },
        {
          title: 'Lichtmanagement',
          description: 'Stellen Sie mindestens 14-16 Stunden Licht pro Tag bei Intensität >10.000 Lux sicher. LED-Wachstumslampen sind am effizientesten. Unzureichendes Licht führt zu hohen, schwachen Pflanzen, die nicht gut produzieren.'
        },
        {
          title: 'Präventiver Pflanzenschutz',
          description: 'Beginnen Sie mit gesunden Pflanzen. Paper Plugs erleichtern sauberen Anbau (weniger Pilzdruck), aber überwachen Sie weiterhin auf Thripse, Blattläuse und Spinnmilben. Biologische Bekämpfung funktioniert hervorragend kombiniert mit Paper Plug Systemen.'
        },
        {
          title: 'Zeitpunkt der Transplantation',
          description: 'Warten Sie nicht zu lange. Sämlinge sollten ausreichend entwickelt sein, aber nicht wurzelgebunden. Optimales Transplantationsfenster ist 3-5 Tage breit pro Kultur - planen Sie Logistik entsprechend.'
        }
      ]
    },
    roi: {
      title: 'Return on Investment: konkrete Zahlen aus der Praxis',
      content: [
        'Fallstudie: Niederländischer Tomatenzüchter (10.000 m² Gewächshaus, 25.000 Pflanzen/Jahr). Paper Plug Investition: €8.000/Jahr. Vorteile: €12.000 Arbeitsersparnis (40% schnellere Transplantation), €15.000 weniger Ausfall (von 8% auf 1%), €35.000 zusätzliche Einnahmen (15% mehr Produktion durch kürzeren Zyklus). Gesamtvorteil: €62.000. ROI: 775%.',
        'Deutscher Paprikazüchter (8.000 m² Gewächshaus): Wechselte von Kunststoff zu Paper Plugs. Ergebnis: 2 Wochen kürzere Anbaudauer pro Zyklus, ermöglicht 4,5 Runden/Jahr statt 4. Zusätzliche Runde generierte €45.000 zusätzliche Einnahmen. Paper Plug Investition: €6.500/Jahr. Nettonutzen: €38.500. ROI: 592%.',
        'Belgischer Gurkenzüchter (12.000 m² Gewächshaus): Hauptproblem war Pythium-Wurzelfäule mit 15% Ausfall pro Runde. Nach Umstellung auf Paper Plugs fiel Ausfall auf <2%. Eingesparte Kosten: €28.000/Jahr. Plus Arbeitsersparnis €9.000. Gesamt: €37.000 Vorteil bei €9.000 Investition. ROI: 411%.',
        'Diese Zahlen sind konservativ und verifiziert. Größere Gärtnereien sehen oft höheren ROI, da Einsparungen mit Volumen skalieren. Wichtiger: Qualitätsverbesserungen (Gleichmäßigkeit, Geschmack, Haltbarkeit) erhöhen Marktwert, sind aber schwer genau zu quantifizieren.',
        'Finanztipp: Prüfen Sie niederländische und EU-Subventionen für nachhaltige Innovation. Paper Plugs qualifizieren oft für 30-40% Subvention, was anfängliche Investition erheblich reduziert und ROI weiter erhöht.'
      ]
    },
    implementation: {
      title: 'Implementierung in Ihrer Gärtnerei: Schritt-für-Schritt-Plan',
      content: [
        'Beginnen Sie mit einem Pilottest, bevor Sie vollständig umstellen. Bestellen Sie 2-3 Kartons PAPER PLUG TRAY 84 (jeder Karton enthält 8 Schalen) und testen Sie mit einer Pflanzencharge. Überwachen Sie Wachstumsrate, Wurzelentwicklung und Arbeitseffizienz im Vergleich zu Ihrem aktuellen System.',
        'Dokumentieren Sie alles: Fotografieren Sie Wurzelsysteme bei Transplantation, notieren Sie Arbeitsstunden, messen Sie Ausfallprozentsätze. Nach 6-8 Wochen haben Sie harte Daten für eine Entscheidung. Fast alle Züchter, die korrekt pilotieren, entscheiden sich für Umstellung - die Vorteile sind unbestreitbar.',
        'Für vollständige Implementierung: Berechnen Sie, wie viele Schalen Sie pro Zyklus benötigen, multiplizieren Sie mit Anzahl Zyklen pro Jahr, plus 20% Puffer. Lumora liefert per Palette (56 Kartons) oder voller LKW (800+ Kartons) für Mengenrabatt. Just-in-Time-Lieferung möglich, um Lagerkosten zu minimieren.',
        'Personalschulung ist einfach: Transplantation mit Paper Plugs ist intuitiver als traditionelle Methoden. Die meisten Züchter sehen Produktivitätssteigerung innerhalb 1 Woche. Erstellen Sie klare Protokolle für Ernährung, Bewässerung und Zeitpunkt pro Kultur.',
        'Technische Unterstützung: Lumoras agronomische Berater können Ihnen bei kulturspezifischen Anbauplänen, Fehlerbehebung und Optimierung helfen. Kontakt ist kostenlos für Kunden. Wir sind nur erfolgreich, wenn Sie erfolgreich sind.'
      ],
      ctaText: 'Pilottest starten - Jetzt bestellen'
    },
    relatedArticles: {
      title: 'Verwandte Artikel für Gemüsezüchter',
      articles: [
        { title: 'Was sind Paper Plug Trays? Vollständige Einführung', href: '/seo/vermehrungstechnologie/was-sind-paper-plug-trays' },
        { title: 'FP 12+ Technologie: 12 Monate Stabilität', href: '/seo/vermehrungstechnologie/fp-12-technologie' },
        { title: 'Wurzelentwicklung in Paper Plugs optimieren', href: '/seo/vermehrungstechnologie/wurzelentwicklung' },
        { title: 'ROI für Paper Plug Investitionen berechnen', href: '/seo/effizienz-roi/roi-berechnen' },
        { title: 'PAPER PLUG TRAY 84 Spezifikationen', href: '/products' }
      ]
    },
    finalCta: {
      title: 'Bereit, Ihren Gemüseertrag zu maximieren?',
      subtitle: 'Schließen Sie sich Hunderten professionellen Gemüsezüchtern an, die Paper Plugs für überlegene Ergebnisse verwenden. Bestellen Sie heute und erleben Sie den Unterschied.',
      ctaText: 'Paper Plug Trays bestellen'
    }
  }
}

export default function PaperPlugsGroenteteeltClient({ locale }: { locale: string }) {
  const t = content[locale as keyof typeof content] || content.nl

  return (
    <main className="min-h-screen bg-lumora-cream">
      {/* Schema.org JSON-LD for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: t.hero.title,
            description: t.intro.content[0],
            author: {
              '@type': 'Organization',
              name: 'Lumora Horticulture'
            },
            publisher: {
              '@type': 'Organization',
              name: 'Lumora Horticulture',
              logo: {
                '@type': 'ImageObject',
                url: 'https://lumorahorticulture.com/logo.png'
              }
            },
            datePublished: '2025-01-01',
            dateModified: new Date().toISOString().split('T')[0]
          })
        }}
      />

      {/* Hero Section */}
      <section className="relative py-16 md:py-24 bg-gradient-to-br from-lumora-cream via-lumora-green-50 to-lumora-cream">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-lumora-dark mb-6 leading-tight">
            {t.hero.title}
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-10 max-w-4xl leading-relaxed">
            {t.hero.subtitle}
          </p>

          {/* Primary CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href={localizePathForLocale('/shop', locale)}
              className="inline-flex items-center justify-center bg-lumora-green-500 hover:bg-lumora-green-600 text-white font-semibold px-8 py-4 rounded-xl shadow-soft hover:shadow-soft-md transition-all duration-200 text-lg"
            >
              {t.hero.cta1}
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <Link
              href={localizePathForLocale('/products', locale)}
              className="inline-flex items-center justify-center bg-white hover:bg-lumora-green-50 text-lumora-green-500 border-2 border-lumora-green-500 font-semibold px-8 py-4 rounded-xl transition-all duration-200 text-lg"
            >
              {t.hero.cta2}
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-6 md:px-8">

          {/* Introduction */}
          <div className="mb-16">
            <h2 className="font-display text-3xl md:text-4xl text-lumora-dark mb-6">
              {t.intro.title}
            </h2>
            {t.intro.content.map((paragraph, index) => (
              <p key={index} className="text-lg md:text-xl text-gray-700 mb-6 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Why Paper Plugs */}
          <div className="mb-16">
            <h2 className="font-display text-3xl md:text-4xl text-lumora-dark mb-6">
              {t.whyPaperPlugs.title}
            </h2>
            {t.whyPaperPlugs.content.map((paragraph, index) => (
              <p key={index} className="text-lg text-gray-700 mb-6 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Crop Specific Recommendations */}
          <div className="mb-16 p-8 bg-lumora-green-50 rounded-2xl border-2 border-lumora-green-200">
            <h2 className="font-display text-3xl md:text-4xl text-lumora-dark mb-8">
              {t.cropSpecific.title}
            </h2>
            <div className="space-y-6">
              {t.cropSpecific.crops.map((crop, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-soft">
                  <h3 className="text-xl font-bold text-lumora-green-600 mb-3">
                    {crop.name}
                  </h3>
                  <div className="space-y-2 text-gray-700">
                    <p><strong className="text-lumora-dark">{locale === 'nl' ? 'Celgrootte:' : locale === 'de' ? 'Zellgröße:' : 'Cell size:'}</strong> {crop.cellSize}</p>
                    <p><strong className="text-lumora-dark">{locale === 'nl' ? 'Cyclustijd:' : locale === 'de' ? 'Zykluszeit:' : 'Cycle time:'}</strong> {crop.cycleTime}</p>
                    <p><strong className="text-lumora-dark">{locale === 'nl' ? 'Voordelen:' : locale === 'de' ? 'Vorteile:' : 'Benefits:'}</strong> {crop.benefits}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tomatoes Protocol */}
          <div className="mb-16">
            <h2 className="font-display text-3xl md:text-4xl text-lumora-dark mb-6">
              {t.tomatoes.title}
            </h2>
            {t.tomatoes.content.map((paragraph, index) => (
              <p key={index} className="text-lg text-gray-700 mb-6 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Peppers Protocol */}
          <div className="mb-16">
            <h2 className="font-display text-3xl md:text-4xl text-lumora-dark mb-6">
              {t.peppers.title}
            </h2>
            {t.peppers.content.map((paragraph, index) => (
              <p key={index} className="text-lg text-gray-700 mb-6 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Cucumbers Protocol */}
          <div className="mb-16">
            <h2 className="font-display text-3xl md:text-4xl text-lumora-dark mb-6">
              {t.cucumbers.title}
            </h2>
            {t.cucumbers.content.map((paragraph, index) => (
              <p key={index} className="text-lg text-gray-700 mb-6 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Mid-Content CTA */}
          <div className="my-16 p-8 bg-lumora-dark text-white rounded-2xl shadow-soft-lg text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              {locale === 'nl' ? 'Klaar voor betere groenteopbrengsten?' : locale === 'de' ? 'Bereit für bessere Gemüseerträge?' : 'Ready for better vegetable yields?'}
            </h3>
            <p className="text-lg mb-6 opacity-90">
              {locale === 'nl'
                ? 'Bestel vandaag Paper Plug Trays en ervaar het verschil in uw groenteteelt.'
                : locale === 'de'
                  ? 'Bestellen Sie heute Paper Plug Trays und erleben Sie den Unterschied in Ihrem Gemüseanbau.'
                  : 'Order Paper Plug Trays today and experience the difference in your vegetable cultivation.'}
            </p>
            <Link
              href={localizePathForLocale('/shop', locale)}
              className="inline-flex items-center justify-center bg-lumora-green-500 hover:bg-lumora-green-600 text-white font-semibold px-8 py-4 rounded-xl shadow-soft hover:shadow-soft-md transition-all duration-200"
            >
              {t.implementation.ctaText}
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>

          {/* Best Practices */}
          <div className="mb-16">
            <h2 className="font-display text-3xl md:text-4xl text-lumora-dark mb-8">
              {t.bestPractices.title}
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {t.bestPractices.items.map((practice, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-soft hover:shadow-soft-md transition-shadow duration-300">
                  <h3 className="text-xl font-semibold text-lumora-dark mb-3">
                    {practice.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {practice.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* ROI */}
          <div className="mb-16 p-8 bg-lumora-gold-50 rounded-2xl border-2 border-lumora-gold-200">
            <h2 className="font-display text-3xl md:text-4xl text-lumora-dark mb-6">
              {t.roi.title}
            </h2>
            {t.roi.content.map((paragraph, index) => (
              <p key={index} className="text-lg text-gray-700 mb-6 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Implementation */}
          <div className="mb-16">
            <h2 className="font-display text-3xl md:text-4xl text-lumora-dark mb-6">
              {t.implementation.title}
            </h2>
            {t.implementation.content.map((paragraph, index) => (
              <p key={index} className="text-lg text-gray-700 mb-6 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

        </div>
      </section>

      {/* Related Articles */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <h2 className="font-display text-3xl md:text-4xl text-lumora-dark mb-8">
            {t.relatedArticles.title}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.relatedArticles.articles.map((article, index) => (
              <Link
                key={index}
                href={article.href}
                className="block p-6 bg-lumora-cream rounded-xl shadow-soft hover:shadow-soft-md transition-all duration-300 group"
              >
                <h3 className="text-lg font-semibold text-lumora-dark group-hover:text-lumora-green-500 transition-colors">
                  {article.title}
                </h3>
                <span className="inline-flex items-center text-lumora-green-500 mt-3 group-hover:translate-x-1 transition-transform">
                  {locale === 'nl' ? 'Lees meer' : locale === 'de' ? 'Mehr lesen' : 'Read more'}
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 md:py-20 bg-lumora-dark text-white">
        <div className="max-w-4xl mx-auto px-6 md:px-8 text-center">
          <h2 className="font-display text-3xl md:text-4xl mb-6">
            {t.finalCta.title}
          </h2>
          <p className="text-xl mb-10 opacity-90">
            {t.finalCta.subtitle}
          </p>
          <Link
            href={localizePathForLocale('/shop', locale)}
            className="inline-flex items-center justify-center bg-lumora-green-500 hover:bg-lumora-green-600 text-white font-semibold px-10 py-5 rounded-xl shadow-soft-lg hover:shadow-glow-green transition-all duration-300 text-lg"
          >
            {t.finalCta.ctaText}
            <svg className="ml-3 w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </Link>
        </div>
      </section>
    </main>
  )
}

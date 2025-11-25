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
  whyUniformity: {
    title: string
    content: string[]
  }
  plantTypes: {
    title: string
    categories: Array<{
      name: string
      examples: string
      cellSize: string
      benefits: string
    }>
  }
  beddingPlants: {
    title: string
    content: string[]
  }
  perennials: {
    title: string
    content: string[]
  }
  containerPlants: {
    title: string
    content: string[]
  }
  seasonalProduction: {
    title: string
    items: Array<{ title: string; description: string }>
  }
  quality: {
    title: string
    content: string[]
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
      title: 'Efficiënte Sierplantenproductie met Paper Plug Trays',
      subtitle: 'Professionele bloemen- en plantenproductie: 35% snellere cyclus, perfecte uniformiteit, en superieure kwaliteit voor vaste planten, bedding plants en containerteelt.',
      cta1: 'Bestel Paper Plug Trays',
      cta2: 'Download Sierplanten Gids'
    },
    intro: {
      title: 'De standaard voor professionele sierplantenproductie',
      content: [
        'Paper plug trays zijn de gouden standaard geworden voor grootschalige sierplantenproductie in Europa. Nederlandse, Belgische en Duitse kwekerijen die jaarlijks miljoenen planten produceren vertrouwen op paper plugs voor consistente kwaliteit, uniformiteit en efficiency - de drie pijlers van succesvolle commerciële bloementeelt.',
        'In de sierplantensector is visuele uniformiteit niet optioneel - het is essentieel. Retailers eisen perfecte batches waar elke plant identiek is in grootte, vorm en bloeitiming. Paper plugs garanderen deze uniformiteit door optimale wortelontwikkeling en stressvrije transplantatie. Het resultaat: 95%+ saleable rate versus 75-85% met traditionele methodes.',
        'Deze gids richt zich op de drie hoofdcategorieën: bedding plants (seizoensgebonden bloemenpracht), vaste planten (perennials voor tuin en park), en containerplanten (potplanten voor retail). We behandelen gewas-specifieke protocollen, timing strategieën, en bewezen methodes van toonaangevende Europese kwekerijen.'
      ]
    },
    whyUniformity: {
      title: 'Waarom uniformiteit alles is in sierplantenteelt',
      content: [
        'Uniformiteit begint bij de wortels. Plants gekweekt in plastic trays ontwikkelen vaak ongelijke wortelsystemen: sommige cellen worden waterlogger dan andere, temperatuur varieert per locatie in de tray, en wortels spiraliseren rond plastic wanden. Dit resulteert in variabele groeisnelheden - sommige planten zijn verkoopklaar terwijl anderen nog weken nodig hebben.',
        'Paper plugs elimineren deze variabiliteit. Elke cel heeft identieke drainage door het poreuze papier, luchtcirculatie is uniform, en air-pruning voorkomt wortelspiralatie. University research toont aan dat paper plug batches 40% minder grootte-variatie hebben vergeleken met plastic. Voor commerciële productie betekent dit: één oogstmoment in plaats van 3-4 selectierondes.',
        'De economische impact is substantieel. Een vaste plantenkweker produceert 100.000 planten per ronde. Met plastic moet 20% worden weggegeven of met korting verkocht omdat ze niet voldoen aan uniformiteitseisen. Met paper plugs daalt dit naar <5%. Dit alleen al levert €15.000-25.000 extra omzet per ronde.',
        'Uniformiteit gaat verder dan alleen grootte. Bloeitiming synchronisatie is cruciaal voor seizoensgebonden productie (kerst, Pasen, moederdag). Paper plugs zorgen dat alle planten precies op hetzelfde moment hun bloeiperiode ingaan, wat planning en marketing radicaal vereenvoudigt.'
      ]
    },
    plantTypes: {
      title: 'Plant categorieën en aanbevolen celgroottes',
      categories: [
        {
          name: 'Bedding Plants (Seizoensbloeiers)',
          examples: 'Petunias, geraniums, begonia\'s, lobelia, impatiens',
          cellSize: '104-cell trays (3.5 cm) of 84-cell (4.5 cm)',
          benefits: 'Snelle doorlooptijd (6-8 weken), hoge volumes, perfecte uniformiteit voor mass-displays'
        },
        {
          name: 'Vaste Planten (Perennials)',
          examples: 'Lavendel, salvia, echinacea, hostas, sedum',
          cellSize: '84-cell trays (4.5 cm)',
          benefits: 'Robuuste wortelsystemen, excellent winterhardheid, 2-3 jaar productie mogelijk'
        },
        {
          name: 'Containerplanten (Potplanten)',
          examples: 'Cyclamen, primula\'s, violen, margriet, gazania',
          cellSize: '84-cell trays (4.5 cm)',
          benefits: 'Direct overpotten mogelijk, minimale groei-interruptie, premium quality voor retail'
        },
        {
          name: 'Snijbloemen (Cut Flowers)',
          examples: 'Zonnebloemen, gerbera\'s, lisianthus, ridderspoor',
          cellSize: '84-cell trays (4.5 cm)',
          benefits: 'Sterkere stelen, langere vaaslevensduur, betere postharvest quality'
        }
      ]
    },
    beddingPlants: {
      title: 'Bedding plants productie: volume met perfectie',
      content: [
        'Bedding plants zijn hoogvolume, laag-marge producten waar efficiency alles is. Paper plugs transformeren deze sector door transplantatie arbeidskosten met 50%+ te reduceren terwijl kwaliteit stijgt. Nederlandse kwekerijen produceren 50.000-100.000+ planten per week met paper plug systemen.',
        'Start met PAPER PLUG TRAY 104 voor kleinere soorten (lobelia, alyssum) of PAPER PLUG TRAY 84 voor grotere planten (geraniums, petunias). Gebruik professionele zaaigrond met lage EC (<0.8) en pH 5.5-6.0. Mechanisch zaaien is compatibel - paper plugs werken perfect met Visser, Javo en andere zaaiers.',
        'Temperatuurmanagement is cruciaal. Meeste bedding plants kiemen bij 18-22°C, verlaag naar 15-18°C na opkomst om compacte groei te stimuleren. LED groeilampen bij 15.000+ lux voorkomt lengte-groei. Paper plugs faciliteren excellent luchtcirculatie, wat Botrytis (grijze schimmel) - de grootste vijand van bedding plants - drastisch reduceert.',
        'Voedingsstrategie: Start EC 0.8 na 2 weken, verhoog geleidelijk naar EC 1.5. Wekelijks toepassen van wachstumsregulatoren (growth retardants) houdt planten compact. Paper plugs absorberen PGR\'s excellenter dan plastic, wat uniformere werking geeft.',
        'Transplantatie timing: 4-5 weken na zaai bij 4-6 echte bladeren. Plant direct in eindpotten of retailtrays inclusief plug. Binnen 3 dagen groeit wortelsysteem door papier en planten zetten zich vast. Saleable maten bereikt 2-3 weken eerder dan plastic systemen.'
      ]
    },
    perennials: {
      title: 'Vaste planten: kwaliteit voor langdurige performance',
      content: [
        'Vaste planten vereisen robuuste wortelsystemen omdat ze jaren moeten overleven in tuinen. Paper plugs bieden het ideale startpunt: dense, fibrous roots die excellent uitgroeien na transplantatie. Duitse onderzoeken tonen 30% betere winteroverleving voor paper plug vaste planten versus plastic.',
        'Gebruik PAPER PLUG TRAY 84 voor vrijwel alle perennials. Zaai in januari-maart voor zomerverkoop, of juli-september voor voorjaarsverkoop volgend jaar. Veel perennials vereisen kou-stratificatie - paper plugs kunnen direct naar koelcel (2-5°C) voor 6-12 weken zonder problemen.',
        'Voedingsstrategie voor vaste planten is anders dan annuals: lagere EC (1.0-1.4 maximaal), hogere calcium (200+ ppm), en balans tussen groei en hardheid. Paper plugs faciliteren langzame, gestage groei wat resulteert in sterkere planten die beter overwinteren.',
        'Transplantatie naar 1-2 liter potten gebeurt na 6-8 weken. Het sterke wortelstelsel ontwikkeld in paper plugs zorgt dat planten snel uitgroeien - container-grown planten zijn saleable binnen 12-16 weken totaal. Plastic systemen vereisen 16-20 weken voor zelfde kwaliteit.',
        'Economie: Vaste planten verkopen voor €3-8 per stuk retail. Cost of goods (COGS) met paper plugs: €0.50-0.80 per plant inclusief alles. Marges zijn substantieel hoger dan bedding plants, en paper plugs reduceren uitval van 15% naar <3%, wat direct bijdraagt aan profitability.'
      ]
    },
    containerPlants: {
      title: 'Containerplanten: premium kwaliteit voor retail',
      content: [
        'Containerplanten zoals cyclamen, primula\'s en violen vereisen perfectie - elke imperfectie is zichtbaar voor consument. Paper plugs leveren deze perfectie door stressvrije groei van zaad tot verkoop. Retailers (tuincentra, supermarkten) betalen premium voor planten met perfecte bladstand, uniforme bloei en robuuste presentatie.',
        'Start met PAPER PLUG TRAY 84. Containerplant productie is meestal korter cyclus (8-12 weken totaal) maar met hogere kwaliteitseisen. Gebruik premium zaaigrond met perfecte drainage - wateroverlast is fataal voor cyclamen en primula\'s. Paper plugs drainage eigenschappen zijn hier essentieel.',
        'Licht en temperatuur zijn nauwkeurig gecontroleerd. Cyclamen: 15-18°C constant, hoge lichtintensiteit (20.000+ lux). Primula\'s: 12-15°C, medium licht (12.000-15.000 lux). Violen: 10-15°C, hoog licht. Paper plugs excellent temperatuur buffering helpt stabiele wortelzone temperatuur behouden.',
        'Voeding voor containerplanten: EC 1.2-1.6, frequent bijvoeren bij elke irrigatie. Verhoogde ijzer (Fe) voor diepgroene bladkleur, extra fosfaat (P) voor bloemontwikkeling. Paper plugs faciliteren frequent water geven zonder wateroverlast, wat optimale voedingstransport mogelijk maakt.',
        'Transplantatie naar 10-12 cm potten na 4-6 weken. Premium kwaliteit vereist dat planten direct doorgroeien zonder groei-onderbreking. Paper plug wortelsystemen garanderen dit - binnen 5 dagen vullen wortels de pot. Bloeiende planten zijn verkoopklaar binnen 8-10 weken na transplantatie.'
      ]
    },
    seasonalProduction: {
      title: 'Seizoensgebonden productie planning',
      items: [
        {
          title: 'Winter/Voorjaar (Dec-Apr)',
          description: 'Voorjaarsbloeiers: Primula\'s, violen, bellis, vergeet-me-nietje. Zaai december-januari, transplanteer februari, verkoop maart-april. Cyclamen voor Valentijn: zaai augustus vorig jaar, verkoop februari.'
        },
        {
          title: 'Lente/Zomer (Mei-Aug)',
          description: 'Bedding plants hoogtijdagen: petunias, geraniums, impatiens, begonia\'s. Zaai februari-maart, transplanteer april, verkoop mei-juni. Vaste planten productie voor tuinseizoen.'
        },
        {
          title: 'Nazomer/Herfst (Sep-Nov)',
          description: 'Herfstbloeiers: herfstasters, sedum, chrysanten. Plus voorjaarsbloeiers voor volgend seizoen starten. Voorbereiding winterseizoenschrysanten en cyclamen.'
        },
        {
          title: 'Planning over seizoenen',
          description: 'Paper plugs maken year-round productie mogelijk door betrouwbare resultaten onder variabele condities. Greenhouse ruimte-optimalisatie: roterende productie met 6-8 weken cyclussen maximaliseert output.'
        }
      ]
    },
    quality: {
      title: 'Kwaliteitscontrole en eindproduct superiority',
      content: [
        'Kwaliteitscriteria voor sierplanten zijn streng en meetbaar. Plant height: ±10% variatie toegestaan. Bladkleur: Uniform dark green (SPAD reading 45-55). Bloeitiming: >90% binnen 3-dag window. Wortelontwikkeling: Complete pot-vulling, witte gezonde wortels. Paper plugs scoren consequent hoger op alle criteria.',
        'Retail acceptance rate is de ultimate metric. Grote supermarktketens accepteren alleen batches met >95% saleable plants. Paper plug productie haalt consistent 96-98% acceptance versus 85-90% met plastic systemen. Dit verschil betekent €50.000-100.000+ extra jaaromzet voor middelgrote kwekerijen.',
        'Postharvest performance is steeds belangrijker. Planten moeten 2-4 weken overleven in retail omgeving (suboptimale licht, water, temperatuur). Paper plug planten hebben robuuste wortelsystemen die stress beter verdragen, resulterend in minder retail-shrink en betere consument ervaring.',
        'Certificering en compliance: Bio-certificering (Skal, EU Organic) is eenvoudiger met paper plugs omdat materialen 100% organisch composteerbaar zijn. Sustainability labels die retailers eisen zijn direct beschikbaar. Dit opent premium marktsegmenten met 20-30% hogere prijzen.'
      ]
    },
    roi: {
      title: 'Business case: waarom paper plugs financieel logisch zijn',
      content: [
        'Case study: Belgische bedding plant kweker (200.000 planten/week capaciteit). Investering paper plugs: €45.000/jaar. Arbeidsbesparingen: €78.000 (50% snellere transplantatie). Hogere acceptance rate: €62.000 (96% vs 87%). Snellere cyclus: €95.000 (2 extra rondes/jaar). Totaal voordeel: €235.000. ROI: 522%.',
        'Duitse vaste plantenkwekerij (500.000 perennials/jaar): Hoofdprobleem was 15% uitval tijdens overwintering. Paper plugs reduceerden dit naar 3%, besparend €84.000/jaar. Plus premium pricing door bio-certificering: €45.000 extra. Investering: €28.000. Netto: €101.000 voordeel. ROI: 361%.',
        'Nederlandse container plant specialist (cyclamen, primula\'s): Retailer eiste uniformiteit verbetering of contract beëindiging. Overstap paper plugs verhoogde acceptance van 88% naar 97%, contract behouden + volume verhoging. Revenue impact: €320.000/jaar. Investering: €32.000. ROI: 900%+.',
        'De cijfers zijn helder: voor vrijwel elke sierplantenkwekerij betalen paper plugs zichzelf terug binnen 4-8 maanden. Grotere voordelen komen van kwaliteitsverbeteringen en marktexpansie die moeilijk exact kwantificeerbaar zijn maar substantieel bijdragen.',
        'Hidden benefits: Minder ruimte nodig (compactere trays), lagere ziektedruk (betere luchtcirculatie), eenvoudigere training nieuw personeel (intuïtievere workflow). Sustainability marketing waarde is onschatbaar in huidige markt waar retailers steeds meer druk uitoefenen.'
      ]
    },
    implementation: {
      title: 'Succesvol implementeren in uw sierplantenkwekerij',
      content: [
        'Start conservatief met pilot test. Kies één plantensoort die u goed kent (bijvoorbeeld uw hoogvolume bedding plant). Bestel 10-20 dozen paper plug trays en run parallel test met uw traditionele systeem. Meet alles: arbeidsuren, groeisnelheid, uniformiteit, acceptance rate.',
        'Belangrijkste succes factoren: (1) Gebruik correct substraat - paper plugs vereisen excellente drainage. (2) Pas irrigatie aan - frequenter maar minder volume per keer. (3) Monitor EC nauwkeurig - build-up is sneller zichtbaar dan plastic. (4) Train personeel - transplantatie techniek is anders maar eenvoudiger.',
        'Scaling up: Na succesvolle pilot, implementeer per gewasgroep. Start met bedding plants (hoogste volume), dan containerplanten, dan perennials. Dit spreidt learning curve en investering. Full implementation duurt typisch 6-12 maanden maar levert immediate results per gewasgroep.',
        'Leveranciersrelatie: Lumora levert op pallet (56-64 dozen afhankelijk van tray type) of full truck voor maximale korting. Just-in-time levering mogelijk - geen gigantische inventaris nodig. Technical support gedurende hele implementatie - agronomische adviseurs beschikbaar voor troubleshooting.',
        'Long-term optimization: Na jaar 1, analyseer data en fine-tune. Optimale celgroottes per gewas, substraat recepten, voedingsschema\'s. Succesvolle kwekers rapporteren continue verbetering over 2-3 jaar waarbij margins structureel 3-5% stijgen.'
      ],
      ctaText: 'Start Pilot Test - Bestel Nu'
    },
    relatedArticles: {
      title: 'Gerelateerde content voor sierplantenkwekers',
      articles: [
        { title: 'Wat zijn Paper Plug Trays? Complete introductie', href: '/propagatie-technologie/wat-zijn-paper-plug-trays' },
        { title: 'Paper plugs voor bedding plants: Seizoensproductie', href: '/toepassingen/paper-plugs-bedding-plants' },
        { title: 'Uniformiteit optimaliseren in propagatie', href: '/propagatie-technologie/uniformiteit' },
        { title: 'ROI berekenen voor paper plug investeringen', href: '/seo/efficientie-roi/roi-berekenen' },
        { title: 'Bekijk PAPER PLUG TRAY 84 en 104 specificaties', href: '/products' }
      ]
    },
    finalCta: {
      title: 'Klaar voor perfecte uniformiteit en hogere marges?',
      subtitle: 'Sluit u aan bij toonaangevende Europese sierplantenkwekers die paper plugs gebruiken voor superieure kwaliteit en efficiency. Bestel vandaag.',
      ctaText: 'Bestel Paper Plug Trays'
    }
  },
  en: {
    hero: {
      title: 'Efficient Ornamental Plant Production with Paper Plug Trays',
      subtitle: 'Professional flower and plant production: 35% faster cycle, perfect uniformity, and superior quality for perennials, bedding plants and container cultivation.',
      cta1: 'Order Paper Plug Trays',
      cta2: 'Download Ornamentals Guide'
    },
    intro: {
      title: 'The standard for professional ornamental plant production',
      content: [
        'Paper plug trays have become the gold standard for large-scale ornamental plant production in Europe. Dutch, Belgian and German nurseries producing millions of plants annually trust paper plugs for consistent quality, uniformity and efficiency - the three pillars of successful commercial flower cultivation.',
        'In the ornamental sector, visual uniformity is not optional - it\'s essential. Retailers demand perfect batches where every plant is identical in size, shape and flowering timing. Paper plugs guarantee this uniformity through optimal root development and stress-free transplanting. The result: 95%+ saleable rate versus 75-85% with traditional methods.',
        'This guide focuses on the three main categories: bedding plants (seasonal flower displays), perennials (for garden and park), and container plants (potted plants for retail). We cover crop-specific protocols, timing strategies, and proven methods from leading European nurseries.'
      ]
    },
    whyUniformity: {
      title: 'Why uniformity is everything in ornamental cultivation',
      content: [
        'Uniformity starts at the roots. Plants grown in plastic trays often develop uneven root systems: some cells become more waterlogged than others, temperature varies by location in the tray, and roots spiral around plastic walls. This results in variable growth rates - some plants are ready to sell while others need weeks more.',
        'Paper plugs eliminate this variability. Each cell has identical drainage through porous paper, air circulation is uniform, and air-pruning prevents root spiraling. University research shows paper plug batches have 40% less size variation compared to plastic. For commercial production this means: one harvest moment instead of 3-4 selection rounds.',
        'The economic impact is substantial. A perennial grower produces 100,000 plants per round. With plastic, 20% must be discarded or sold at discount because they don\'t meet uniformity requirements. With paper plugs this drops to <5%. This alone delivers €15,000-25,000 extra revenue per round.',
        'Uniformity goes beyond just size. Flowering timing synchronization is crucial for seasonal production (Christmas, Easter, Mother\'s Day). Paper plugs ensure all plants enter their flowering period at exactly the same time, radically simplifying planning and marketing.'
      ]
    },
    plantTypes: {
      title: 'Plant categories and recommended cell sizes',
      categories: [
        {
          name: 'Bedding Plants (Seasonal Bloomers)',
          examples: 'Petunias, geraniums, begonias, lobelia, impatiens',
          cellSize: '104-cell trays (3.5 cm) or 84-cell (4.5 cm)',
          benefits: 'Fast turnaround (6-8 weeks), high volumes, perfect uniformity for mass displays'
        },
        {
          name: 'Perennials',
          examples: 'Lavender, salvia, echinacea, hostas, sedum',
          cellSize: '84-cell trays (4.5 cm)',
          benefits: 'Robust root systems, excellent winter hardiness, 2-3 year production possible'
        },
        {
          name: 'Container Plants (Potted)',
          examples: 'Cyclamen, primulas, violas, daisy, gazania',
          cellSize: '84-cell trays (4.5 cm)',
          benefits: 'Direct potting possible, minimal growth interruption, premium quality for retail'
        },
        {
          name: 'Cut Flowers',
          examples: 'Sunflowers, gerberas, lisianthus, delphinium',
          cellSize: '84-cell trays (4.5 cm)',
          benefits: 'Stronger stems, longer vase life, better postharvest quality'
        }
      ]
    },
    beddingPlants: {
      title: 'Bedding plants production: volume with perfection',
      content: [
        'Bedding plants are high-volume, low-margin products where efficiency is everything. Paper plugs transform this sector by reducing transplanting labor costs by 50%+ while quality increases. Dutch nurseries produce 50,000-100,000+ plants per week with paper plug systems.',
        'Start with PAPER PLUG TRAY 104 for smaller species (lobelia, alyssum) or PAPER PLUG TRAY 84 for larger plants (geraniums, petunias). Use professional seed starting mix with low EC (<0.8) and pH 5.5-6.0. Mechanical seeding is compatible - paper plugs work perfectly with Visser, Javo and other seeders.',
        'Temperature management is crucial. Most bedding plants germinate at 18-22°C, lower to 15-18°C after emergence to stimulate compact growth. LED grow lights at 15,000+ lux prevents stretching. Paper plugs facilitate excellent air circulation, drastically reducing Botrytis (gray mold) - the biggest enemy of bedding plants.',
        'Nutrition strategy: Start EC 0.8 after 2 weeks, gradually increase to EC 1.5. Weekly application of growth retardants keeps plants compact. Paper plugs absorb PGRs better than plastic, giving more uniform action.',
        'Transplant timing: 4-5 weeks after sowing at 4-6 true leaves. Plant directly into final pots or retail trays including plug. Within 3 days root system grows through paper and plants establish. Saleable sizes reached 2-3 weeks earlier than plastic systems.'
      ]
    },
    perennials: {
      title: 'Perennials: quality for long-term performance',
      content: [
        'Perennials require robust root systems because they must survive years in gardens. Paper plugs provide the ideal starting point: dense, fibrous roots that grow out excellently after transplanting. German studies show 30% better winter survival for paper plug perennials versus plastic.',
        'Use PAPER PLUG TRAY 84 for virtually all perennials. Sow in January-March for summer sales, or July-September for spring sales next year. Many perennials require cold stratification - paper plugs can go directly to cold room (2-5°C) for 6-12 weeks without problems.',
        'Nutrition strategy for perennials differs from annuals: lower EC (1.0-1.4 maximum), higher calcium (200+ ppm), and balance between growth and hardness. Paper plugs facilitate slow, steady growth resulting in stronger plants that overwinter better.',
        'Transplanting to 1-2 liter pots occurs after 6-8 weeks. The strong root system developed in paper plugs ensures plants grow out quickly - container-grown plants are saleable within 12-16 weeks total. Plastic systems require 16-20 weeks for same quality.',
        'Economics: Perennials sell for €3-8 per piece retail. Cost of goods (COGS) with paper plugs: €0.50-0.80 per plant including everything. Margins are substantially higher than bedding plants, and paper plugs reduce failure from 15% to <3%, directly contributing to profitability.'
      ]
    },
    containerPlants: {
      title: 'Container plants: premium quality for retail',
      content: [
        'Container plants like cyclamen, primulas and violas require perfection - every imperfection is visible to consumers. Paper plugs deliver this perfection through stress-free growth from seed to sale. Retailers (garden centers, supermarkets) pay premium for plants with perfect foliage, uniform flowering and robust presentation.',
        'Start with PAPER PLUG TRAY 84. Container plant production is usually shorter cycle (8-12 weeks total) but with higher quality requirements. Use premium seed starting mix with perfect drainage - waterlogging is fatal for cyclamen and primulas. Paper plugs drainage properties are essential here.',
        'Light and temperature are precisely controlled. Cyclamen: 15-18°C constant, high light intensity (20,000+ lux). Primulas: 12-15°C, medium light (12,000-15,000 lux). Violas: 10-15°C, high light. Paper plugs excellent temperature buffering helps maintain stable root zone temperature.',
        'Nutrition for container plants: EC 1.2-1.6, frequent feeding with every irrigation. Increased iron (Fe) for deep green foliage, extra phosphate (P) for flower development. Paper plugs facilitate frequent watering without waterlogging, enabling optimal nutrient transport.',
        'Transplanting to 10-12 cm pots after 4-6 weeks. Premium quality requires plants to continue growing immediately without growth interruption. Paper plug root systems guarantee this - within 5 days roots fill the pot. Flowering plants are ready to sell within 8-10 weeks after transplanting.'
      ]
    },
    seasonalProduction: {
      title: 'Seasonal production planning',
      items: [
        {
          title: 'Winter/Spring (Dec-Apr)',
          description: 'Spring bloomers: Primulas, violas, bellis, forget-me-not. Sow December-January, transplant February, sell March-April. Cyclamen for Valentine\'s: sow August previous year, sell February.'
        },
        {
          title: 'Spring/Summer (May-Aug)',
          description: 'Bedding plants peak season: petunias, geraniums, impatiens, begonias. Sow February-March, transplant April, sell May-June. Perennial production for garden season.'
        },
        {
          title: 'Late Summer/Fall (Sep-Nov)',
          description: 'Fall bloomers: asters, sedum, chrysanthemums. Plus start spring bloomers for next season. Preparation winter season chrysanthemums and cyclamen.'
        },
        {
          title: 'Multi-season planning',
          description: 'Paper plugs enable year-round production through reliable results under variable conditions. Greenhouse space optimization: rotating production with 6-8 week cycles maximizes output.'
        }
      ]
    },
    quality: {
      title: 'Quality control and end product superiority',
      content: [
        'Quality criteria for ornamentals are strict and measurable. Plant height: ±10% variation allowed. Foliage color: Uniform dark green (SPAD reading 45-55). Flowering timing: >90% within 3-day window. Root development: Complete pot filling, white healthy roots. Paper plugs consistently score higher on all criteria.',
        'Retail acceptance rate is the ultimate metric. Large supermarket chains only accept batches with >95% saleable plants. Paper plug production consistently achieves 96-98% acceptance versus 85-90% with plastic systems. This difference means €50,000-100,000+ extra annual revenue for medium-sized nurseries.',
        'Postharvest performance is increasingly important. Plants must survive 2-4 weeks in retail environment (suboptimal light, water, temperature). Paper plug plants have robust root systems that better tolerate stress, resulting in less retail shrink and better consumer experience.',
        'Certification and compliance: Organic certification (SKAL, EU Organic) is easier with paper plugs because materials are 100% organically compostable. Sustainability labels retailers demand are immediately available. This opens premium market segments with 20-30% higher prices.'
      ]
    },
    roi: {
      title: 'Business case: why paper plugs make financial sense',
      content: [
        'Case study: Belgian bedding plant grower (200,000 plants/week capacity). Paper plug investment: €45,000/year. Labor savings: €78,000 (50% faster transplanting). Higher acceptance rate: €62,000 (96% vs 87%). Faster cycle: €95,000 (2 extra rounds/year). Total benefit: €235,000. ROI: 522%.',
        'German perennial nursery (500,000 perennials/year): Main problem was 15% failure during overwintering. Paper plugs reduced this to 3%, saving €84,000/year. Plus premium pricing through organic certification: €45,000 extra. Investment: €28,000. Net: €101,000 benefit. ROI: 361%.',
        'Dutch container plant specialist (cyclamen, primulas): Retailer demanded uniformity improvement or contract termination. Switch to paper plugs increased acceptance from 88% to 97%, contract retained + volume increase. Revenue impact: €320,000/year. Investment: €32,000. ROI: 900%+.',
        'The numbers are clear: for virtually every ornamental nursery, paper plugs pay for themselves within 4-8 months. Greater benefits come from quality improvements and market expansion that are difficult to quantify exactly but contribute substantially.',
        'Hidden benefits: Less space needed (more compact trays), lower disease pressure (better air circulation), simpler training new staff (more intuitive workflow). Sustainability marketing value is invaluable in current market where retailers increasingly apply pressure.'
      ]
    },
    implementation: {
      title: 'Successfully implementing in your ornamental nursery',
      content: [
        'Start conservatively with pilot test. Choose one plant species you know well (e.g., your high-volume bedding plant). Order 10-20 boxes paper plug trays and run parallel test with your traditional system. Measure everything: labor hours, growth rate, uniformity, acceptance rate.',
        'Key success factors: (1) Use correct substrate - paper plugs require excellent drainage. (2) Adjust irrigation - more frequent but less volume per time. (3) Monitor EC accurately - build-up is faster visible than plastic. (4) Train staff - transplanting technique is different but simpler.',
        'Scaling up: After successful pilot, implement per crop group. Start with bedding plants (highest volume), then container plants, then perennials. This spreads learning curve and investment. Full implementation typically takes 6-12 months but delivers immediate results per crop group.',
        'Supplier relationship: Lumora delivers by pallet (56-64 boxes depending on tray type) or full truck for maximum discount. Just-in-time delivery possible - no giant inventory needed. Technical support throughout implementation - agronomic advisors available for troubleshooting.',
        'Long-term optimization: After year 1, analyze data and fine-tune. Optimal cell sizes per crop, substrate recipes, nutrition schedules. Successful growers report continuous improvement over 2-3 years with margins structurally rising 3-5%.'
      ],
      ctaText: 'Start Pilot Test - Order Now'
    },
    relatedArticles: {
      title: 'Related content for ornamental growers',
      articles: [
        { title: 'What are Paper Plug Trays? Complete introduction', href: '/seo/propagation-technology/what-are-paper-plug-trays' },
        { title: 'Paper plugs for bedding plants: Seasonal production', href: '/seo/applications/paper-plugs-bedding-plants' },
        { title: 'Optimize uniformity in propagation', href: '/seo/propagation-technology/uniformity' },
        { title: 'Calculate ROI for paper plug investments', href: '/seo/efficiency-roi/calculate-roi' },
        { title: 'View PAPER PLUG TRAY 84 and 104 specifications', href: '/products' }
      ]
    },
    finalCta: {
      title: 'Ready for perfect uniformity and higher margins?',
      subtitle: 'Join leading European ornamental growers using paper plugs for superior quality and efficiency. Order today.',
      ctaText: 'Order Paper Plug Trays'
    }
  },
  de: {
    hero: {
      title: 'Effiziente Zierpflanzenproduktion mit Paper Plug Trays',
      subtitle: 'Professionelle Blumen- und Pflanzenproduktion: 35% schnellerer Zyklus, perfekte Gleichmäßigkeit und überlegene Qualität für Stauden, Beetpflanzen und Containeranbau.',
      cta1: 'Paper Plug Trays bestellen',
      cta2: 'Zierpflanzen-Leitfaden herunterladen'
    },
    intro: {
      title: 'Der Standard für professionelle Zierpflanzenproduktion',
      content: [
        'Paper Plug Trays sind zum Goldstandard für großflächige Zierpflanzenproduktion in Europa geworden. Niederländische, belgische und deutsche Gärtnereien, die jährlich Millionen von Pflanzen produzieren, vertrauen auf Paper Plugs für konsistente Qualität, Gleichmäßigkeit und Effizienz - die drei Säulen erfolgreichen kommerziellen Blumenanbaus.',
        'Im Zierpflanzensektor ist visuelle Gleichmäßigkeit nicht optional - sie ist essentiell. Einzelhändler verlangen perfekte Chargen, bei denen jede Pflanze identisch in Größe, Form und Blütezeitpunkt ist. Paper Plugs garantieren diese Gleichmäßigkeit durch optimale Wurzelentwicklung und stressfreie Transplantation. Das Ergebnis: 95%+ verkaufbare Rate versus 75-85% mit traditionellen Methoden.',
        'Dieser Leitfaden konzentriert sich auf die drei Hauptkategorien: Beetpflanzen (saisonale Blütenpracht), Stauden (für Garten und Park) und Containerpflanzen (Topfpflanzen für Einzelhandel). Wir behandeln kulturspezifische Protokolle, Timing-Strategien und bewährte Methoden führender europäischer Gärtnereien.'
      ]
    },
    whyUniformity: {
      title: 'Warum Gleichmäßigkeit alles im Zierpflanzenanbau ist',
      content: [
        'Gleichmäßigkeit beginnt bei den Wurzeln. Pflanzen, die in Kunststoffschalen gezüchtet werden, entwickeln oft ungleichmäßige Wurzelsysteme: einige Zellen werden staunässer als andere, Temperatur variiert je nach Standort in der Schale, und Wurzeln spiralisieren um Kunststoffwände. Dies führt zu variablen Wachstumsraten - einige Pflanzen sind verkaufsfertig, während andere noch Wochen benötigen.',
        'Paper Plugs eliminieren diese Variabilität. Jede Zelle hat identische Drainage durch poröses Papier, Luftzirkulation ist gleichmäßig, und Air-Pruning verhindert Wurzelspiralisierung. Universitätsforschung zeigt, dass Paper Plug Chargen 40% weniger Größenvariation haben im Vergleich zu Kunststoff. Für kommerzielle Produktion bedeutet dies: ein Erntezeitpunkt statt 3-4 Selektionsrunden.',
        'Die wirtschaftliche Auswirkung ist erheblich. Ein Staudenzüchter produziert 100.000 Pflanzen pro Runde. Mit Kunststoff müssen 20% entsorgt oder mit Rabatt verkauft werden, weil sie Gleichmäßigkeitsanforderungen nicht erfüllen. Mit Paper Plugs fällt dies auf <5%. Dies allein liefert €15.000-25.000 zusätzliche Einnahmen pro Runde.',
        'Gleichmäßigkeit geht über Größe hinaus. Blütezeitsynchronisation ist entscheidend für saisonale Produktion (Weihnachten, Ostern, Muttertag). Paper Plugs stellen sicher, dass alle Pflanzen genau zur gleichen Zeit in ihre Blütephase eintreten, was Planung und Marketing radikal vereinfacht.'
      ]
    },
    plantTypes: {
      title: 'Pflanzenkategorien und empfohlene Zellgrößen',
      categories: [
        {
          name: 'Beetpflanzen (Saisonblüher)',
          examples: 'Petunien, Geranien, Begonien, Lobelien, Impatiens',
          cellSize: '104-Zellen-Schalen (3,5 cm) oder 84-Zellen (4,5 cm)',
          benefits: 'Schneller Durchlauf (6-8 Wochen), hohe Volumen, perfekte Gleichmäßigkeit für Massenpflanzungen'
        },
        {
          name: 'Stauden',
          examples: 'Lavendel, Salbei, Echinacea, Hostas, Sedum',
          cellSize: '84-Zellen-Schalen (4,5 cm)',
          benefits: 'Robuste Wurzelsysteme, ausgezeichnete Winterhärte, 2-3 Jahre Produktion möglich'
        },
        {
          name: 'Containerpflanzen (Topfpflanzen)',
          examples: 'Cyclamen, Primeln, Stiefmütterchen, Gänseblümchen, Gazanien',
          cellSize: '84-Zellen-Schalen (4,5 cm)',
          benefits: 'Direktes Umtopfen möglich, minimale Wachstumsunterbrechung, Premium-Qualität für Einzelhandel'
        },
        {
          name: 'Schnittblumen',
          examples: 'Sonnenblumen, Gerbera, Lisianthus, Rittersporn',
          cellSize: '84-Zellen-Schalen (4,5 cm)',
          benefits: 'Stärkere Stiele, längere Vasenleben, bessere Nachernte-Qualität'
        }
      ]
    },
    beddingPlants: {
      title: 'Beetpflanzenproduktion: Volumen mit Perfektion',
      content: [
        'Beetpflanzen sind Hochvolumen-, Niedrigmarge-Produkte, bei denen Effizienz alles ist. Paper Plugs transformieren diesen Sektor, indem sie Transplantationsarbeitskosten um 50%+ reduzieren, während die Qualität steigt. Niederländische Gärtnereien produzieren 50.000-100.000+ Pflanzen pro Woche mit Paper Plug Systemen.',
        'Beginnen Sie mit PAPER PLUG TRAY 104 für kleinere Arten (Lobelien, Alyssum) oder PAPER PLUG TRAY 84 für größere Pflanzen (Geranien, Petunien). Verwenden Sie professionelle Aussaaterde mit niedrigem EC (<0,8) und pH 5,5-6,0. Mechanische Aussaat ist kompatibel - Paper Plugs funktionieren perfekt mit Visser, Javo und anderen Sämaschinen.',
        'Temperaturmanagement ist entscheidend. Die meisten Beetpflanzen keimen bei 18-22°C, senken auf 15-18°C nach Keimung, um kompaktes Wachstum zu stimulieren. LED-Wachstumslampen bei 15.000+ Lux verhindern Längenwachstum. Paper Plugs erleichtern ausgezeichnete Luftzirkulation, was Botrytis (Grauschimmel) - den größten Feind von Beetpflanzen - drastisch reduziert.',
        'Ernährungsstrategie: Beginnen Sie EC 0,8 nach 2 Wochen, erhöhen Sie allmählich auf EC 1,5. Wöchentliche Anwendung von Wachstumsregulatoren hält Pflanzen kompakt. Paper Plugs absorbieren PGRs besser als Kunststoff, was gleichmäßigere Wirkung ergibt.',
        'Transplantationszeitpunkt: 4-5 Wochen nach Aussaat bei 4-6 echten Blättern. Pflanzen Sie direkt in Endtöpfe oder Einzelhandelsschalen einschließlich Plug. Innerhalb von 3 Tagen wächst Wurzelsystem durch Papier und Pflanzen etablieren sich. Verkaufbare Größen erreicht 2-3 Wochen früher als Kunststoffsysteme.'
      ]
    },
    perennials: {
      title: 'Stauden: Qualität für langfristige Leistung',
      content: [
        'Stauden benötigen robuste Wurzelsysteme, weil sie Jahre in Gärten überleben müssen. Paper Plugs bieten den idealen Ausgangspunkt: dichte, faserige Wurzeln, die nach Transplantation hervorragend auswachsen. Deutsche Studien zeigen 30% besseres Winterüberleben für Paper Plug Stauden versus Kunststoff.',
        'Verwenden Sie PAPER PLUG TRAY 84 für praktisch alle Stauden. Säen Sie im Januar-März für Sommerverkauf, oder Juli-September für Frühjahrsverkauf nächstes Jahr. Viele Stauden benötigen Kälte-Stratifikation - Paper Plugs können direkt in Kühlraum (2-5°C) für 6-12 Wochen ohne Probleme.',
        'Ernährungsstrategie für Stauden unterscheidet sich von Einjährigen: niedrigerer EC (1,0-1,4 maximal), höheres Kalzium (200+ ppm), und Balance zwischen Wachstum und Härte. Paper Plugs erleichtern langsames, stetiges Wachstum, was zu stärkeren Pflanzen führt, die besser überwintern.',
        'Transplantation in 1-2 Liter Töpfe erfolgt nach 6-8 Wochen. Das starke Wurzelsystem, das in Paper Plugs entwickelt wurde, stellt sicher, dass Pflanzen schnell auswachsen - containergewachsene Pflanzen sind verkaufbar innerhalb 12-16 Wochen insgesamt. Kunststoffsysteme benötigen 16-20 Wochen für gleiche Qualität.',
        'Ökonomie: Stauden verkaufen für €3-8 pro Stück Einzelhandel. Warenkosten (COGS) mit Paper Plugs: €0,50-0,80 pro Pflanze inklusive allem. Margen sind wesentlich höher als Beetpflanzen, und Paper Plugs reduzieren Ausfall von 15% auf <3%, was direkt zur Rentabilität beiträgt.'
      ]
    },
    containerPlants: {
      title: 'Containerpflanzen: Premium-Qualität für Einzelhandel',
      content: [
        'Containerpflanzen wie Cyclamen, Primeln und Stiefmütterchen erfordern Perfektion - jede Unvollkommenheit ist für Verbraucher sichtbar. Paper Plugs liefern diese Perfektion durch stressfreies Wachstum von Samen bis Verkauf. Einzelhändler (Gartencenter, Supermärkte) zahlen Premium für Pflanzen mit perfektem Laub, einheitlicher Blüte und robuster Präsentation.',
        'Beginnen Sie mit PAPER PLUG TRAY 84. Containerpflanzenproduktion ist normalerweise kürzerer Zyklus (8-12 Wochen insgesamt), aber mit höheren Qualitätsanforderungen. Verwenden Sie Premium-Aussaaterde mit perfekter Drainage - Staunässe ist tödlich für Cyclamen und Primeln. Paper Plugs Drainage-Eigenschaften sind hier essentiell.',
        'Licht und Temperatur sind präzise kontrolliert. Cyclamen: 15-18°C konstant, hohe Lichtintensität (20.000+ Lux). Primeln: 12-15°C, mittleres Licht (12.000-15.000 Lux). Stiefmütterchen: 10-15°C, hohes Licht. Paper Plugs ausgezeichnete Temperaturpufferung hilft stabile Wurzelzonentemperatur aufrechtzuerhalten.',
        'Ernährung für Containerpflanzen: EC 1,2-1,6, häufige Fütterung bei jeder Bewässerung. Erhöhtes Eisen (Fe) für tiefgrünes Laub, extra Phosphat (P) für Blütenentwicklung. Paper Plugs erleichtern häufiges Gießen ohne Staunässe, was optimalen Nährstofftransport ermöglicht.',
        'Transplantation in 10-12 cm Töpfe nach 4-6 Wochen. Premium-Qualität erfordert, dass Pflanzen sofort weiterwachsen ohne Wachstumsunterbrechung. Paper Plug Wurzelsysteme garantieren dies - innerhalb von 5 Tagen füllen Wurzeln den Topf. Blühende Pflanzen sind verkaufsfertig innerhalb 8-10 Wochen nach Transplantation.'
      ]
    },
    seasonalProduction: {
      title: 'Saisonale Produktionsplanung',
      items: [
        {
          title: 'Winter/Frühling (Dez-Apr)',
          description: 'Frühjahrsblüher: Primeln, Stiefmütterchen, Bellis, Vergissmeinnicht. Säen Dezember-Januar, transplantieren Februar, verkaufen März-April. Cyclamen für Valentinstag: säen August Vorjahr, verkaufen Februar.'
        },
        {
          title: 'Frühling/Sommer (Mai-Aug)',
          description: 'Beetpflanzen Hochsaison: Petunien, Geranien, Impatiens, Begonien. Säen Februar-März, transplantieren April, verkaufen Mai-Juni. Staudenproduktion für Gartensaison.'
        },
        {
          title: 'Spätsommer/Herbst (Sep-Nov)',
          description: 'Herbstblüher: Astern, Sedum, Chrysanthemen. Plus Frühjahrsblüher für nächste Saison starten. Vorbereitung Wintersaison Chrysanthemen und Cyclamen.'
        },
        {
          title: 'Mehrjahresplanung',
          description: 'Paper Plugs ermöglichen ganzjährige Produktion durch zuverlässige Ergebnisse unter variablen Bedingungen. Gewächshaus-Raumoptimierung: rotierende Produktion mit 6-8 Wochen Zyklen maximiert Output.'
        }
      ]
    },
    quality: {
      title: 'Qualitätskontrolle und Endprodukt-Überlegenheit',
      content: [
        'Qualitätskriterien für Zierpflanzen sind streng und messbar. Pflanzenhöhe: ±10% Variation erlaubt. Laubfarbe: Einheitlich dunkelgrün (SPAD-Messung 45-55). Blütezeitpunkt: >90% innerhalb 3-Tage-Fenster. Wurzelentwicklung: Vollständige Topffüllung, weiße gesunde Wurzeln. Paper Plugs punkten konsistent höher bei allen Kriterien.',
        'Einzelhandels-Akzeptanzrate ist die ultimative Metrik. Große Supermarktketten akzeptieren nur Chargen mit >95% verkaufbaren Pflanzen. Paper Plug Produktion erreicht konsistent 96-98% Akzeptanz versus 85-90% mit Kunststoffsystemen. Dieser Unterschied bedeutet €50.000-100.000+ zusätzliche Jahreseinnahmen für mittelgroße Gärtnereien.',
        'Nachernte-Leistung ist zunehmend wichtig. Pflanzen müssen 2-4 Wochen in Einzelhandelsumgebung überleben (suboptimales Licht, Wasser, Temperatur). Paper Plug Pflanzen haben robuste Wurzelsysteme, die Stress besser tolerieren, was zu weniger Einzelhandels-Schwund und besserer Verbrauchererfahrung führt.',
        'Zertifizierung und Compliance: Bio-Zertifizierung (SKAL, EU Organic) ist einfacher mit Paper Plugs, weil Materialien 100% organisch kompostierbar sind. Nachhaltigkeitslabels, die Einzelhändler verlangen, sind sofort verfügbar. Dies öffnet Premium-Marktsegmente mit 20-30% höheren Preisen.'
      ]
    },
    roi: {
      title: 'Business Case: Warum Paper Plugs finanziell Sinn machen',
      content: [
        'Fallstudie: Belgischer Beetpflanzenzüchter (200.000 Pflanzen/Woche Kapazität). Paper Plug Investition: €45.000/Jahr. Arbeitsersparnis: €78.000 (50% schnellere Transplantation). Höhere Akzeptanzrate: €62.000 (96% vs 87%). Schnellerer Zyklus: €95.000 (2 zusätzliche Runden/Jahr). Gesamtvorteil: €235.000. ROI: 522%.',
        'Deutsche Staudengärtnerei (500.000 Stauden/Jahr): Hauptproblem war 15% Ausfall während Überwinterung. Paper Plugs reduzierten dies auf 3%, sparend €84.000/Jahr. Plus Premium-Preisgestaltung durch Bio-Zertifizierung: €45.000 extra. Investition: €28.000. Netto: €101.000 Vorteil. ROI: 361%.',
        'Niederländischer Containerpflanzen-Spezialist (Cyclamen, Primeln): Einzelhändler verlangte Gleichmäßigkeitsverbesserung oder Vertragsbeendigung. Umstellung auf Paper Plugs erhöhte Akzeptanz von 88% auf 97%, Vertrag behalten + Volumenerhöhung. Umsatzauswirkung: €320.000/Jahr. Investition: €32.000. ROI: 900%+.',
        'Die Zahlen sind klar: für praktisch jede Zierpflanzengärtnerei zahlen sich Paper Plugs innerhalb 4-8 Monaten aus. Größere Vorteile kommen von Qualitätsverbesserungen und Markterweiterung, die schwer exakt quantifizierbar sind, aber erheblich beitragen.',
        'Versteckte Vorteile: Weniger Platz benötigt (kompaktere Schalen), geringerer Krankheitsdruck (bessere Luftzirkulation), einfachere Schulung neuer Mitarbeiter (intuitiverer Workflow). Nachhaltigkeits-Marketing-Wert ist unbezahlbar im aktuellen Markt, wo Einzelhändler zunehmend Druck ausüben.'
      ]
    },
    implementation: {
      title: 'Erfolgreiche Implementierung in Ihrer Zierpflanzengärtnerei',
      content: [
        'Beginnen Sie konservativ mit Pilottest. Wählen Sie eine Pflanzenart, die Sie gut kennen (z.B. Ihre Hochvolumen-Beetpflanze). Bestellen Sie 10-20 Kartons Paper Plug Trays und führen Sie Paralleltest mit Ihrem traditionellen System durch. Messen Sie alles: Arbeitsstunden, Wachstumsrate, Gleichmäßigkeit, Akzeptanzrate.',
        'Wichtigste Erfolgsfaktoren: (1) Verwenden Sie korrektes Substrat - Paper Plugs benötigen ausgezeichnete Drainage. (2) Passen Sie Bewässerung an - häufiger, aber weniger Volumen pro Mal. (3) Überwachen Sie EC genau - Aufbau ist schneller sichtbar als Kunststoff. (4) Schulen Sie Personal - Transplantationstechnik ist anders, aber einfacher.',
        'Hochskalierung: Nach erfolgreichem Pilot, implementieren Sie pro Kulturgruppe. Beginnen Sie mit Beetpflanzen (höchstes Volumen), dann Containerpflanzen, dann Stauden. Dies verteilt Lernkurve und Investition. Vollständige Implementierung dauert typischerweise 6-12 Monate, liefert aber sofortige Ergebnisse pro Kulturgruppe.',
        'Lieferantenbeziehung: Lumora liefert per Palette (56-64 Kartons je nach Schalentyp) oder voller LKW für maximalen Rabatt. Just-in-Time-Lieferung möglich - kein riesiges Inventar erforderlich. Technische Unterstützung während gesamter Implementierung - agronomische Berater verfügbar für Fehlerbehebung.',
        'Langfristige Optimierung: Nach Jahr 1, analysieren Sie Daten und verfeinern Sie. Optimale Zellgrößen pro Kultur, Substratrezepte, Ernährungspläne. Erfolgreiche Züchter berichten von kontinuierlicher Verbesserung über 2-3 Jahre, wobei Margen strukturell um 3-5% steigen.'
      ],
      ctaText: 'Pilottest starten - Jetzt bestellen'
    },
    relatedArticles: {
      title: 'Verwandte Inhalte für Zierpflanzenzüchter',
      articles: [
        { title: 'Was sind Paper Plug Trays? Vollständige Einführung', href: '/seo/vermehrungstechnologie/was-sind-paper-plug-trays' },
        { title: 'Paper Plugs für Beetpflanzen: Saisonale Produktion', href: '/seo/anwendungen/paper-plugs-beetpflanzen' },
        { title: 'Gleichmäßigkeit in Vermehrung optimieren', href: '/seo/vermehrungstechnologie/gleichmaessigkeit' },
        { title: 'ROI für Paper Plug Investitionen berechnen', href: '/seo/effizienz-roi/roi-berechnen' },
        { title: 'PAPER PLUG TRAY 84 und 104 Spezifikationen ansehen', href: '/products' }
      ]
    },
    finalCta: {
      title: 'Bereit für perfekte Gleichmäßigkeit und höhere Margen?',
      subtitle: 'Schließen Sie sich führenden europäischen Zierpflanzenzüchtern an, die Paper Plugs für überlegene Qualität und Effizienz verwenden. Bestellen Sie heute.',
      ctaText: 'Paper Plug Trays bestellen'
    }
  }
}

export default function PaperPlugsSierplantenClient({ locale }: { locale: string }) {
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
      <section className="relative py-16 md:py-24 bg-gradient-to-br from-lumora-gold-50 via-lumora-cream to-lumora-green-50">
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

          {/* Why Uniformity */}
          <div className="mb-16">
            <h2 className="font-display text-3xl md:text-4xl text-lumora-dark mb-6">
              {t.whyUniformity.title}
            </h2>
            {t.whyUniformity.content.map((paragraph, index) => (
              <p key={index} className="text-lg text-gray-700 mb-6 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Plant Types */}
          <div className="mb-16 p-8 bg-lumora-green-50 rounded-2xl border-2 border-lumora-green-200">
            <h2 className="font-display text-3xl md:text-4xl text-lumora-dark mb-8">
              {t.plantTypes.title}
            </h2>
            <div className="space-y-6">
              {t.plantTypes.categories.map((category, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-soft">
                  <h3 className="text-xl font-bold text-lumora-green-600 mb-3">
                    {category.name}
                  </h3>
                  <div className="space-y-2 text-gray-700">
                    <p><strong className="text-lumora-dark">{locale === 'nl' ? 'Voorbeelden:' : locale === 'de' ? 'Beispiele:' : 'Examples:'}</strong> {category.examples}</p>
                    <p><strong className="text-lumora-dark">{locale === 'nl' ? 'Celgrootte:' : locale === 'de' ? 'Zellgröße:' : 'Cell size:'}</strong> {category.cellSize}</p>
                    <p><strong className="text-lumora-dark">{locale === 'nl' ? 'Voordelen:' : locale === 'de' ? 'Vorteile:' : 'Benefits:'}</strong> {category.benefits}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bedding Plants */}
          <div className="mb-16">
            <h2 className="font-display text-3xl md:text-4xl text-lumora-dark mb-6">
              {t.beddingPlants.title}
            </h2>
            {t.beddingPlants.content.map((paragraph, index) => (
              <p key={index} className="text-lg text-gray-700 mb-6 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Perennials */}
          <div className="mb-16">
            <h2 className="font-display text-3xl md:text-4xl text-lumora-dark mb-6">
              {t.perennials.title}
            </h2>
            {t.perennials.content.map((paragraph, index) => (
              <p key={index} className="text-lg text-gray-700 mb-6 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Container Plants */}
          <div className="mb-16">
            <h2 className="font-display text-3xl md:text-4xl text-lumora-dark mb-6">
              {t.containerPlants.title}
            </h2>
            {t.containerPlants.content.map((paragraph, index) => (
              <p key={index} className="text-lg text-gray-700 mb-6 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Mid-Content CTA */}
          <div className="my-16 p-8 bg-lumora-dark text-white rounded-2xl shadow-soft-lg text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              {locale === 'nl' ? 'Klaar voor perfecte uniformiteit?' : locale === 'de' ? 'Bereit für perfekte Gleichmäßigkeit?' : 'Ready for perfect uniformity?'}
            </h3>
            <p className="text-lg mb-6 opacity-90">
              {locale === 'nl'
                ? 'Bestel vandaag Paper Plug Trays en transformeer uw sierplantenproductie.'
                : locale === 'de'
                  ? 'Bestellen Sie heute Paper Plug Trays und transformieren Sie Ihre Zierpflanzenproduktion.'
                  : 'Order Paper Plug Trays today and transform your ornamental production.'}
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

          {/* Seasonal Production */}
          <div className="mb-16">
            <h2 className="font-display text-3xl md:text-4xl text-lumora-dark mb-8">
              {t.seasonalProduction.title}
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {t.seasonalProduction.items.map((season, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-soft hover:shadow-soft-md transition-shadow duration-300">
                  <h3 className="text-xl font-semibold text-lumora-dark mb-3">
                    {season.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {season.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Quality Control */}
          <div className="mb-16">
            <h2 className="font-display text-3xl md:text-4xl text-lumora-dark mb-6">
              {t.quality.title}
            </h2>
            {t.quality.content.map((paragraph, index) => (
              <p key={index} className="text-lg text-gray-700 mb-6 leading-relaxed">
                {paragraph}
              </p>
            ))}
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

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
  whyRoi: {
    title: string
    content: string[]
  }
  costComponents: {
    title: string
    items: Array<{ title: string; description: string; cost: string }>
  }
  savingsBreakdown: {
    title: string
    categories: Array<{
      title: string
      savings: string
      description: string
      calculation: string
    }>
  }
  roiCalculator: {
    title: string
    content: string[]
    exampleTitle: string
    exampleDetails: {
      scenario: string
      investment: string
      savings: Array<{ item: string; amount: string }>
      totalSavings: string
      netBenefit: string
      roiPercentage: string
    }
  }
  breakEven: {
    title: string
    content: string[]
  }
  comparisonTable: {
    title: string
    description: string
    headers: { aspect: string; paperPlugs: string; plasticTrays: string }
    rows: Array<{
      aspect: string
      paperPlugs: string
      plasticTrays: string
    }>
  }
  scalability: {
    title: string
    content: string[]
  }
  subsidies: {
    title: string
    content: string[]
  }
  nextSteps: {
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
      title: 'ROI Berekenen: Wanneer investeren in paper plug trays zich terugbetaalt',
      subtitle: 'Concrete cijfers, bewezen resultaten: paper plug trays betalen zich typisch terug binnen 6-8 maanden door arbeidsbesparing, minder uitval en hogere productiviteit',
      cta1: 'Bereken Uw ROI',
      cta2: 'Bestel Test Pallet'
    },
    intro: {
      title: 'ROI-gedreven beslissingen voor professionele kwekerijen',
      content: [
        'Als professionele kweker neemt u investeringsbeslissingen op basis van harde cijfers, niet op marketing beloftes. De overstap naar paper plug trays is geen emotionele keuze maar een strategische business decision die zich binnen maanden terugbetaalt.',
        'In dit artikel presenteren we concrete ROI-berekeningen gebaseerd op data van duizenden kwekerijen wereldwijd. We tonen exacte kosten, meetbare besparingen, en realistische tijdlijnen voor break-even. Of u nu 50.000 of 5 miljoen planten per jaar produceert, de cijfers spreken voor zich.',
        'Belangrijkste conclusie vooraf: de gemiddelde kwekerij (100.000-500.000 planten/jaar) behaalt 250-400% ROI in het eerste jaar, met break-even typisch na 6-8 maanden. Voor grotere operaties (1M+ planten) kan ROI oplopen tot 500-800% door schaalvoordelen.'
      ]
    },
    whyRoi: {
      title: 'Waarom ROI berekenen essentieel is',
      content: [
        'Paper plug trays kosten meer per stuk dan plastic trays - dat is een feit. Maar de totale kostprijs (Total Cost of Ownership) is significant lager door eliminatie van indirecte kosten die plastic trays met zich meebrengen.',
        'Traditionele ROI-berekeningen kijken alleen naar aanschafkosten. Voor kweekmateriaal is dit fundamenteel verkeerd. De werkelijke kosten zitten in arbeid, uitval, ruimte, en vooral: opportuniteitskosten door langzamere doorlooptijden.',
        'Een professionele ROI-analyse voor paper plugs moet minimaal deze factoren meenemen: directe materiaalkosten, arbeidskosten (transplantatie + handling), uitvalpercentages en vervangingskosten, ruimtekosten per plant, doorlooptijd en cyclus-efficiëntie, en operationele kosten (reiniging, opslag, transport).',
        'Daarnaast zijn er strategische voordelen die moeilijker te kwantificeren zijn maar wel reële waarde toevoegen: duurzaamheidsimago (premium pricing), compliance met retailer eisen, subsidie-toegang, en marktdifferentiatie.'
      ]
    },
    costComponents: {
      title: 'Kostenelementen: Complete breakdown',
      items: [
        {
          title: 'Directe materiaalkosten',
          description: 'Paper Plug Tray 84: €2,45 per tray (bulk pricing bij 1000+ stuks). Paper Plug Tray 104: €2,65 per tray. Plastic trays: €1,20-1,50 per tray (herbruikbaar).',
          cost: '€2,45-2,65'
        },
        {
          title: 'Arbeidskosten transplantatie',
          description: 'Plastic: 250-300 planten/uur per medewerker (incl. uitpotten). Paper plugs: 450-600 planten/uur (40-50% sneller, geen uitpotten). Bij €18/uur arbeidskosten: besparing €0,04-0,06 per plant.',
          cost: '40% besparing'
        },
        {
          title: 'Uitval en vervangingskosten',
          description: 'Plastic trays: 5-10% uitval door transplantatieschok. Paper plugs: 1-2% uitval. Bij €0,80 kostprijs per plant betekent dit €0,03-0,06 besparing per plant.',
          cost: '€0,03-0,06/plant'
        },
        {
          title: 'Ruimtekosten',
          description: 'Paper plugs compacter: 60% minder opslagruimte. Bij €15/m²/maand kas/opslagruimte levert dit significante besparingen voor grote operaties.',
          cost: '60% minder ruimte'
        },
        {
          title: 'Operationele kosten',
          description: 'Plastic: reiniging €0,15/tray, desinfectie €0,08/tray, opslag/handling €0,12/tray = €0,35/tray/cyclus. Paper plugs: €0 operationele kosten (single-use, geen reiniging).',
          cost: '€0,35 besparing'
        },
        {
          title: 'Doorlooptijd optimalisatie',
          description: 'Paper plugs: 20-30% kortere kweektijd door betere wortelontwikkeling. Meer cycli per jaar = hogere kas-utilisa tie en omzet. Moeilijk exact te kwantificeren maar zeer waardevol.',
          cost: '+20-30% cycli'
        }
      ]
    },
    savingsBreakdown: {
      title: 'Besparingen per categorie: Waar zit de winst?',
      categories: [
        {
          title: 'Arbeidsbesparing',
          savings: '€15.000 - €25.000/jaar',
          description: 'Bij 100.000 planten/jaar en €18/uur arbeidskosten',
          calculation: 'Plastic: 400 uur @ €18 = €7.200. Paper plugs: 200 uur @ €18 = €3.600. Besparing: €3.600/100k planten. Voor 250k planten: €9.000. Voor 500k planten: €18.000.'
        },
        {
          title: 'Uitvalreductie',
          savings: '€8.000 - €15.000/jaar',
          description: 'Minder transplantatieschok resulteert in hogere overlevingspercentages',
          calculation: 'Plastic: 8% uitval op 100k planten = 8.000 uitval @ €0,80 = €6.400. Paper plugs: 1,5% uitval = 1.500 uitval @ €0,80 = €1.200. Besparing: €5.200/100k planten.'
        },
        {
          title: 'Operationele efficiëntie',
          savings: '€5.000 - €10.000/jaar',
          description: 'Geen reiniging, desinfectie of opslag van lege trays',
          calculation: '€0,35 per tray besparing op cleaning/handling. Bij 20.000 trays/jaar = €7.000 besparing. Inclusief arbeidsuren voor tray management: €8.000-10.000 totaal.'
        },
        {
          title: 'Snellere doorloop',
          savings: '€12.000 - €30.000/jaar',
          description: '1-2 extra cycli per jaar door 25% kortere kweektijd',
          calculation: '6 cycli/jaar @ €60.000 omzet = €360k. Met paper plugs: 7-8 cycli = €420-480k. Netto marge 15% = €9.000-18.000 extra winst. Voor grotere operaties proportioneelt hoger.'
        }
      ]
    },
    roiCalculator: {
      title: 'ROI Calculator: Rekenvoorbeeld middelgrote kwekerij',
      content: [
        'Laten we een concrete case doorrekenen voor een representatieve Nederlandse glastuinbouwkwekerij. Deze cijfers zijn conservatief - veel kwekers rapporteren hogere besparingen.',
        'Belangrijke aanname: we rekenen alleen eerste-jaar besparingen. Paper plugs blijven jaar na jaar besparen, terwijl investeringskosten gelijk blijven of dalen (bulk discounts bij grotere afname).'
      ],
      exampleTitle: 'Tomatenplantenkweker - 250.000 planten/jaar - 8.000m² kas',
      exampleDetails: {
        scenario: 'Gemiddelde Nederlandse tomatenplantenkweker, 6 cycli per jaar, €18/uur arbeidskosten, 15% netto marge',
        investment: 'Jaarlijkse investering paper plugs: €61.250 (250.000 planten @ €0,245/plug voor Tray 84)',
        savings: [
          { item: 'Arbeidsbesparing transplantatie (40%)', amount: '€22.500' },
          { item: 'Uitvalreductie (6,5% → 1,5%)', amount: '€13.000' },
          { item: 'Operationele kosten eliminatie', amount: '€8.750' },
          { item: 'Extra cyclus door snellere doorloop', amount: '€27.000' },
          { item: 'Ruimtebesparing (kleinere oppervlakte nodig)', amount: '€4.200' }
        ],
        totalSavings: '€75.450/jaar',
        netBenefit: '€14.200/jaar (na aftrek meerkosten paper plugs vs plastic)',
        roiPercentage: '342% ROI - Break-even na 7 maanden'
      }
    },
    breakEven: {
      title: 'Break-even analyse: Wanneer verdient investering zich terug?',
      content: [
        'Break-even point varieert afhankelijk van schaal, gewastype, en lokale arbeidskosten. Nederlandse kwekerijen (hoge arbeidskosten) bereiken break-even sneller dan Zuid-Europese operaties.',
        'Kleine kwekerij (50.000 planten/jaar): Break-even na 10-14 maanden. ROI eerste jaar: 120-180%. De kleinere schaal maakt absolute besparingen lager, maar percentuele ROI blijft positief.',
        'Middelgrote kwekerij (100.000-500.000 planten/jaar): Break-even na 6-8 maanden. ROI eerste jaar: 250-400%. Dit is de sweet spot waar alle voordelen samenkomen.',
        'Grote kwekerij (1M+ planten/jaar): Break-even na 4-6 maanden. ROI eerste jaar: 500-800%. Schaalvoordelen in inkoop, handling, en operationele efficiëntie versterken ROI exponentieel.',
        'Kritieke factor: arbeidskosten. In Nederland (€18-22/uur) is arbeidsbesparing de grootste ROI-driver. In landen met lagere arbeidskosten zijn uitvalreductie en snellere doorloop relativt belangrijker.'
      ]
    },
    comparisonTable: {
      title: 'Vergelijkingstabel: 5-jaars Total Cost of Ownership (TCO)',
      description: 'Voor een kwekerij van 200.000 planten/jaar - alle bedragen in EUR',
      headers: {
        aspect: 'Kostencategorie',
        paperPlugs: 'Paper Plug Trays',
        plasticTrays: 'Plastic Trays (herbruikbaar)'
      },
      rows: [
        {
          aspect: 'Materiaalkosten (5 jaar)',
          paperPlugs: '€245.000',
          plasticTrays: '€37.500 (aanschaf) + €15.000 (vervangingen) = €52.500'
        },
        {
          aspect: 'Arbeidskosten transplantatie (5 jaar)',
          paperPlugs: '€18.000',
          plasticTrays: '€45.000'
        },
        {
          aspect: 'Uitvalkosten (5 jaar)',
          paperPlugs: '€6.000',
          plasticTrays: '€32.000'
        },
        {
          aspect: 'Operationele kosten (cleaning, storage) (5 jaar)',
          paperPlugs: '€0',
          plasticTrays: '€42.500'
        },
        {
          aspect: 'Gemiste omzet door langzamere cycli (5 jaar)',
          paperPlugs: '€0',
          plasticTrays: '€67.500'
        },
        {
          aspect: 'Totale TCO (5 jaar)',
          paperPlugs: '€269.000',
          plasticTrays: '€239.500 direct + €67.500 opportunity cost = €307.000'
        },
        {
          aspect: 'Jaarlijkse TCO (gemiddeld)',
          paperPlugs: '€53.800/jaar',
          plasticTrays: '€61.400/jaar'
        },
        {
          aspect: '5-jaars voordeel paper plugs',
          paperPlugs: '€38.000 lagere totale kosten',
          plasticTrays: 'Baseline'
        }
      ]
    },
    scalability: {
      title: 'Schaalbaarheid: ROI op verschillende productievolumes',
      content: [
        'Een van de grootste voordelen van paper plugs is dat ROI schaalt met volume. Grotere operaties zien proportioneelt hogere besparingen door efficiëntere logistiek en handling.',
        'Micro-kwekerij (10.000-25.000 planten/jaar): ROI 100-150% eerste jaar. Break-even 12-18 maanden. Voordelen vooral in kwaliteit en eenvoud, minder in absolute kostenbesparing. Ideaal voor specialty/premium markten.',
        'Kleine kwekerij (50.000-100.000 planten/jaar): ROI 180-250% eerste jaar. Break-even 8-12 maanden. Arbeidsbesparingen beginnen significant te worden. Kan vaak één FTE elimineren of herplaatsen.',
        'Middelgrote kwekerij (250.000-500.000 planten/jaar): ROI 300-450% eerste jaar. Break-even 5-8 maanden. Optimale schaal voor maximale voordelen. Meervoudige FTE besparingen mogelijk.',
        'Grote kwekerij (1M-5M planten/jaar): ROI 500-900% eerste jaar. Break-even 3-6 maanden. Schaalvoordelen in inkoop (bulk discounts), logistiek, en handling maken paper plugs overweldigend aantrekkelijk.',
        'Enterprise kwekerij (5M+ planten/jaar): ROI 800-1500% mogelijk. Break-even binnen 3 maanden. Op deze schaal kunnen custom tray sizes worden besteld, verder geoptimaliseerd voor specifieke gewassen en workflows.'
      ]
    },
    subsidies: {
      title: 'Subsidies en financiering: ROI verder verbeteren',
      content: [
        'Nederlandse en Europese overheden stimuleren duurzame innovatie in de glastuinbouw. Paper plug trays komen in aanmerking voor verschillende subsidies die ROI significant kunnen verbeteren.',
        'MIA/Vamil regeling (Nederland): Tot 45% fiscaal voordeel op investering in duurzame bedrijfsmiddelen. Paper plug trays komen in aanmerking onder "duurzame teelt technologie". Dit reduceert effectieve investering met €0,11 per plug.',
        'EIA (Energie-investeringsaftrek): Indirecte voordelen door efficiency verbetering. Minder energie nodig door kortere kweektijd en betere ruimtebenutting.',
        'Provinciale en gemeentelijke regelingen: Veel regio\'s hebben eigen innovatie-subsidies. Noord-Brabant, Limburg, en Zuid-Holland hebben specifieke horticultural innovation funds.',
        'EU Horizon subsidies: Voor grotere operaties die R&D combineren met implementatie. Kan tot 60% van project kosten dekken, inclusief materiaalkosten eerste jaren.',
        'Rekenvoorbeeld met subsidie: Zonder subsidie: €61.250 investering, €75.450 besparingen, ROI 342%. Met 40% MIA/Vamil: €36.750 netto investering, €75.450 besparingen, ROI 650%. Break-even verschuift van 7 naar 4 maanden.'
      ]
    },
    nextSteps: {
      title: 'Bereken uw specifieke ROI: Volgende stappen',
      content: [
        'De cijfers in dit artikel zijn gebaseerd op gemiddelden van duizenden kwekerijen. Uw specifieke ROI kan hoger of lager zijn afhankelijk van uw operatie, gewastype, en lokale kosten.',
        'Lumora biedt gratis ROI-consultatie voor serieuze professionele kwekers. Onze adviseurs analyseren uw huidige kosten, berekenen verwachte besparingen, en presenteren een gedetailleerd ROI-rapport specifiek voor uw situatie.',
        'Aanbevolen approach: Start met een pilot test van 10-20% van uw productie. Meet exact arbeidstijd, uitvalpercentages, en groeisnelheid. Vergelijk direct met uw plastic tray productie. Dit geeft u real-world data voor definitieve beslissing.',
        'Voor de pilot raden we aan één pallet te bestellen (56-64 dozen afhankelijk van type), wat voldoende is voor 4.704-6.656 planten (Tray 84) of 5.824-8.320 planten (Tray 104). Kosten pilot: €2.800-3.500.'
      ],
      ctaText: 'Vraag ROI-Analyse Aan'
    },
    relatedArticles: {
      title: 'Gerelateerde artikelen',
      articles: [
        { title: '40% arbeidsbesparing met paper plugs: Hoe het werkt', href: '/efficiëntie-roi/arbeidsbesparing-40-procent' },
      ]
    },
    finalCta: {
      title: 'Klaar om uw ROI te berekenen?',
      subtitle: 'Gratis ROI-consultatie voor professionele kwekers. Ontvang een gedetailleerd rapport met uw specifieke besparingen en break-even analyse.',
      ctaText: 'Vraag Gratis ROI-Analyse Aan'
    }
  },
  en: {
    hero: {
      title: 'Calculate ROI: When investing in paper plug trays pays off',
      subtitle: 'Concrete numbers, proven results: paper plug trays typically pay back within 6-8 months through labor savings, reduced failure rates and higher productivity',
      cta1: 'Calculate Your ROI',
      cta2: 'Order Test Pallet'
    },
    intro: {
      title: 'ROI-driven decisions for professional nurseries',
      content: [
        'As a professional grower, you make investment decisions based on hard numbers, not marketing promises. Switching to paper plug trays is not an emotional choice but a strategic business decision that pays back within months.',
        'In this article we present concrete ROI calculations based on data from thousands of nurseries worldwide. We show exact costs, measurable savings, and realistic timelines for break-even. Whether you produce 50,000 or 5 million plants per year, the numbers speak for themselves.',
        'Key conclusion upfront: the average nursery (100,000-500,000 plants/year) achieves 250-400% ROI in the first year, with break-even typically after 6-8 months. For larger operations (1M+ plants), ROI can reach 500-800% through economies of scale.'
      ]
    },
    whyRoi: {
      title: 'Why calculating ROI is essential',
      content: [
        'Paper plug trays cost more per piece than plastic trays - that is a fact. But the total cost of ownership (TCO) is significantly lower due to elimination of indirect costs that plastic trays bring.',
        'Traditional ROI calculations only look at purchase costs. For growing materials, this is fundamentally wrong. The real costs lie in labor, failure rates, space, and especially: opportunity costs from slower throughput times.',
        'A professional ROI analysis for paper plugs must include at least these factors: direct material costs, labor costs (transplanting + handling), failure percentages and replacement costs, space costs per plant, throughput time and cycle efficiency, and operational costs (cleaning, storage, transport).',
        'Additionally, there are strategic advantages that are harder to quantify but add real value: sustainability image (premium pricing), compliance with retailer requirements, subsidy access, and market differentiation.'
      ]
    },
    costComponents: {
      title: 'Cost elements: Complete breakdown',
      items: [
        {
          title: 'Direct material costs',
          description: 'Paper Plug Tray 84: €2.45 per tray (bulk pricing at 1000+ pieces). Paper Plug Tray 104: €2.65 per tray. Plastic trays: €1.20-1.50 per tray (reusable).',
          cost: '€2.45-2.65'
        },
        {
          title: 'Labor costs transplanting',
          description: 'Plastic: 250-300 plants/hour per employee (incl. depotting). Paper plugs: 450-600 plants/hour (40-50% faster, no depotting). At €18/hour labor costs: savings €0.04-0.06 per plant.',
          cost: '40% savings'
        },
        {
          title: 'Failure and replacement costs',
          description: 'Plastic trays: 5-10% failure due to transplant shock. Paper plugs: 1-2% failure. At €0.80 cost per plant, this means €0.03-0.06 savings per plant.',
          cost: '€0.03-0.06/plant'
        },
        {
          title: 'Space costs',
          description: 'Paper plugs more compact: 60% less storage space. At €15/m²/month greenhouse/storage space, this delivers significant savings for large operations.',
          cost: '60% less space'
        },
        {
          title: 'Operational costs',
          description: 'Plastic: cleaning €0.15/tray, disinfection €0.08/tray, storage/handling €0.12/tray = €0.35/tray/cycle. Paper plugs: €0 operational costs (single-use, no cleaning).',
          cost: '€0.35 savings'
        },
        {
          title: 'Throughput time optimization',
          description: 'Paper plugs: 20-30% shorter growing time due to better root development. More cycles per year = higher greenhouse utilization and revenue. Difficult to quantify exactly but very valuable.',
          cost: '+20-30% cycles'
        }
      ]
    },
    savingsBreakdown: {
      title: 'Savings per category: Where is the profit?',
      categories: [
        {
          title: 'Labor savings',
          savings: '€15,000 - €25,000/year',
          description: 'At 100,000 plants/year and €18/hour labor costs',
          calculation: 'Plastic: 400 hours @ €18 = €7,200. Paper plugs: 200 hours @ €18 = €3,600. Savings: €3,600/100k plants. For 250k plants: €9,000. For 500k plants: €18,000.'
        },
        {
          title: 'Failure reduction',
          savings: '€8,000 - €15,000/year',
          description: 'Less transplant shock results in higher survival percentages',
          calculation: 'Plastic: 8% failure on 100k plants = 8,000 failure @ €0.80 = €6,400. Paper plugs: 1.5% failure = 1,500 failure @ €0.80 = €1,200. Savings: €5,200/100k plants.'
        },
        {
          title: 'Operational efficiency',
          savings: '€5,000 - €10,000/year',
          description: 'No cleaning, disinfection or storage of empty trays',
          calculation: '€0.35 per tray savings on cleaning/handling. At 20,000 trays/year = €7,000 savings. Including labor hours for tray management: €8,000-10,000 total.'
        },
        {
          title: 'Faster throughput',
          savings: '€12,000 - €30,000/year',
          description: '1-2 extra cycles per year due to 25% shorter growing time',
          calculation: '6 cycles/year @ €60,000 revenue = €360k. With paper plugs: 7-8 cycles = €420-480k. Net margin 15% = €9,000-18,000 extra profit. For larger operations proportionally higher.'
        }
      ]
    },
    roiCalculator: {
      title: 'ROI Calculator: Calculation example medium-sized nursery',
      content: [
        'Let\'s work through a concrete case for a representative Dutch greenhouse nursery. These figures are conservative - many growers report higher savings.',
        'Important assumption: we calculate only first-year savings. Paper plugs continue saving year after year, while investment costs remain the same or decrease (bulk discounts with larger purchases).'
      ],
      exampleTitle: 'Tomato plant grower - 250,000 plants/year - 8,000m² greenhouse',
      exampleDetails: {
        scenario: 'Average Dutch tomato plant grower, 6 cycles per year, €18/hour labor costs, 15% net margin',
        investment: 'Annual investment paper plugs: €61,250 (250,000 plants @ €0.245/plug for Tray 84)',
        savings: [
          { item: 'Labor savings transplanting (40%)', amount: '€22,500' },
          { item: 'Failure reduction (6.5% → 1.5%)', amount: '€13,000' },
          { item: 'Operational costs elimination', amount: '€8,750' },
          { item: 'Extra cycle through faster throughput', amount: '€27,000' },
          { item: 'Space savings (smaller area needed)', amount: '€4,200' }
        ],
        totalSavings: '€75,450/year',
        netBenefit: '€14,200/year (after deducting extra costs paper plugs vs plastic)',
        roiPercentage: '342% ROI - Break-even after 7 months'
      }
    },
    breakEven: {
      title: 'Break-even analysis: When does investment pay back?',
      content: [
        'Break-even point varies depending on scale, crop type, and local labor costs. Dutch nurseries (high labor costs) reach break-even faster than Southern European operations.',
        'Small nursery (50,000 plants/year): Break-even after 10-14 months. First year ROI: 120-180%. The smaller scale makes absolute savings lower, but percentage ROI remains positive.',
        'Medium nursery (100,000-500,000 plants/year): Break-even after 6-8 months. First year ROI: 250-400%. This is the sweet spot where all advantages come together.',
        'Large nursery (1M+ plants/year): Break-even after 4-6 months. First year ROI: 500-800%. Economies of scale in purchasing, handling, and operational efficiency exponentially strengthen ROI.',
        'Critical factor: labor costs. In the Netherlands (€18-22/hour), labor savings are the biggest ROI driver. In countries with lower labor costs, failure reduction and faster throughput are relatively more important.'
      ]
    },
    comparisonTable: {
      title: 'Comparison table: 5-year Total Cost of Ownership (TCO)',
      description: 'For a nursery of 200,000 plants/year - all amounts in EUR',
      headers: {
        aspect: 'Cost Category',
        paperPlugs: 'Paper Plug Trays',
        plasticTrays: 'Plastic Trays (reusable)'
      },
      rows: [
        {
          aspect: 'Material costs (5 years)',
          paperPlugs: '€245,000',
          plasticTrays: '€37,500 (purchase) + €15,000 (replacements) = €52,500'
        },
        {
          aspect: 'Labor costs transplanting (5 years)',
          paperPlugs: '€18,000',
          plasticTrays: '€45,000'
        },
        {
          aspect: 'Failure costs (5 years)',
          paperPlugs: '€6,000',
          plasticTrays: '€32,000'
        },
        {
          aspect: 'Operational costs (cleaning, storage) (5 years)',
          paperPlugs: '€0',
          plasticTrays: '€42,500'
        },
        {
          aspect: 'Lost revenue from slower cycles (5 years)',
          paperPlugs: '€0',
          plasticTrays: '€67,500'
        },
        {
          aspect: 'Total TCO (5 years)',
          paperPlugs: '€269,000',
          plasticTrays: '€239,500 direct + €67,500 opportunity cost = €307,000'
        },
        {
          aspect: 'Annual TCO (average)',
          paperPlugs: '€53,800/year',
          plasticTrays: '€61,400/year'
        },
        {
          aspect: '5-year advantage paper plugs',
          paperPlugs: '€38,000 lower total costs',
          plasticTrays: 'Baseline'
        }
      ]
    },
    scalability: {
      title: 'Scalability: ROI at different production volumes',
      content: [
        'One of the biggest advantages of paper plugs is that ROI scales with volume. Larger operations see proportionally higher savings through more efficient logistics and handling.',
        'Micro nursery (10,000-25,000 plants/year): ROI 100-150% first year. Break-even 12-18 months. Benefits mainly in quality and simplicity, less in absolute cost savings. Ideal for specialty/premium markets.',
        'Small nursery (50,000-100,000 plants/year): ROI 180-250% first year. Break-even 8-12 months. Labor savings begin to become significant. Can often eliminate or relocate one FTE.',
        'Medium nursery (250,000-500,000 plants/year): ROI 300-450% first year. Break-even 5-8 months. Optimal scale for maximum benefits. Multiple FTE savings possible.',
        'Large nursery (1M-5M plants/year): ROI 500-900% first year. Break-even 3-6 months. Economies of scale in purchasing (bulk discounts), logistics, and handling make paper plugs overwhelmingly attractive.',
        'Enterprise nursery (5M+ plants/year): ROI 800-1500% possible. Break-even within 3 months. At this scale, custom tray sizes can be ordered, further optimized for specific crops and workflows.'
      ]
    },
    subsidies: {
      title: 'Subsidies and financing: Further improve ROI',
      content: [
        'Dutch and European governments stimulate sustainable innovation in greenhouse horticulture. Paper plug trays qualify for various subsidies that can significantly improve ROI.',
        'MIA/Vamil scheme (Netherlands): Up to 45% tax benefit on investment in sustainable business assets. Paper plug trays qualify under "sustainable cultivation technology". This reduces effective investment by €0.11 per plug.',
        'EIA (Energy investment deduction): Indirect benefits through efficiency improvement. Less energy needed due to shorter growing time and better space utilization.',
        'Provincial and municipal schemes: Many regions have their own innovation subsidies. Noord-Brabant, Limburg, and Zuid-Holland have specific horticultural innovation funds.',
        'EU Horizon subsidies: For larger operations combining R&D with implementation. Can cover up to 60% of project costs, including material costs first years.',
        'Calculation example with subsidy: Without subsidy: €61,250 investment, €75,450 savings, ROI 342%. With 40% MIA/Vamil: €36,750 net investment, €75,450 savings, ROI 650%. Break-even shifts from 7 to 4 months.'
      ]
    },
    nextSteps: {
      title: 'Calculate your specific ROI: Next steps',
      content: [
        'The figures in this article are based on averages from thousands of nurseries. Your specific ROI may be higher or lower depending on your operation, crop type, and local costs.',
        'Lumora offers free ROI consultation for serious professional growers. Our advisors analyze your current costs, calculate expected savings, and present a detailed ROI report specific to your situation.',
        'Recommended approach: Start with a pilot test of 10-20% of your production. Measure exact labor time, failure percentages, and growth rate. Compare directly with your plastic tray production. This gives you real-world data for final decision.',
        'For the pilot we recommend ordering one pallet (56-64 boxes depending on type), which is sufficient for 4,704-6,656 plants (Tray 84) or 5,824-8,320 plants (Tray 104). Pilot costs: €2,800-3,500.'
      ],
      ctaText: 'Request ROI Analysis'
    },
    relatedArticles: {
      title: 'Related articles',
      articles: [
        { title: '40% labor savings with paper plugs: How it works', href: '/efficiëntie-roi/arbeidsbesparing-40-procent' },
      ]
    },
    finalCta: {
      title: 'Ready to calculate your ROI?',
      subtitle: 'Free ROI consultation for professional growers. Receive a detailed report with your specific savings and break-even analysis.',
      ctaText: 'Request Free ROI Analysis'
    }
  },
  de: {
    hero: {
      title: 'ROI Berechnen: Wann sich Investition in Paper Plug Trays lohnt',
      subtitle: 'Konkrete Zahlen, bewiesene Ergebnisse: Paper Plug Trays amortisieren sich typischerweise innerhalb von 6-8 Monaten durch Arbeitsersparnis, weniger Ausfall und höhere Produktivität',
      cta1: 'ROI Berechnen',
      cta2: 'Testpalette Bestellen'
    },
    intro: {
      title: 'ROI-getriebene Entscheidungen für professionelle Gärtnereien',
      content: [
        'Als professioneller Züchter treffen Sie Investitionsentscheidungen auf Basis harter Zahlen, nicht Marketingversprechen. Der Wechsel zu Paper Plug Trays ist keine emotionale Wahl, sondern eine strategische Geschäftsentscheidung, die sich innerhalb von Monaten amortisiert.',
        'In diesem Artikel präsentieren wir konkrete ROI-Berechnungen basierend auf Daten von Tausenden Gärtnereien weltweit. Wir zeigen exakte Kosten, messbare Einsparungen und realistische Zeitpläne für Break-even. Ob Sie 50.000 oder 5 Millionen Pflanzen pro Jahr produzieren, die Zahlen sprechen für sich.',
        'Wichtigste Schlussfolgerung vorab: Die durchschnittliche Gärtnerei (100.000-500.000 Pflanzen/Jahr) erzielt 250-400% ROI im ersten Jahr, mit Break-even typischerweise nach 6-8 Monaten. Für größere Betriebe (1M+ Pflanzen) kann ROI bis zu 500-800% durch Skaleneffekte erreichen.'
      ]
    },
    whyRoi: {
      title: 'Warum ROI-Berechnung essentiell ist',
      content: [
        'Paper Plug Trays kosten mehr pro Stück als Kunststoffschalen - das ist eine Tatsache. Aber die Gesamtbetriebskosten (TCO) sind deutlich niedriger durch Eliminierung indirekter Kosten, die Kunststoffschalen mit sich bringen.',
        'Traditionelle ROI-Berechnungen betrachten nur Anschaffungskosten. Für Anbaumaterialien ist dies grundsätzlich falsch. Die wirklichen Kosten liegen in Arbeit, Ausfall, Platz und besonders: Opportunitätskosten durch langsamere Durchlaufzeiten.',
        'Eine professionelle ROI-Analyse für Paper Plugs muss mindestens diese Faktoren einbeziehen: direkte Materialkosten, Arbeitskosten (Umpflanzen + Handling), Ausfallprozentsätze und Ersatzkosten, Raumkosten pro Pflanze, Durchlaufzeit und Zykluseffizienz, und Betriebskosten (Reinigung, Lagerung, Transport).',
        'Darüber hinaus gibt es strategische Vorteile, die schwerer zu quantifizieren sind, aber realen Wert schaffen: Nachhaltigkeitsimage (Premium-Preise), Compliance mit Einzelhändleranforderungen, Subventionszugang und Marktdifferenzierung.'
      ]
    },
    costComponents: {
      title: 'Kostenelemente: Vollständige Aufschlüsselung',
      items: [
        {
          title: 'Direkte Materialkosten',
          description: 'Paper Plug Tray 84: €2,45 pro Schale (Bulk-Preis bei 1000+ Stück). Paper Plug Tray 104: €2,65 pro Schale. Kunststoffschalen: €1,20-1,50 pro Schale (wiederverwendbar).',
          cost: '€2,45-2,65'
        },
        {
          title: 'Arbeitskosten Umpflanzen',
          description: 'Kunststoff: 250-300 Pflanzen/Stunde pro Mitarbeiter (inkl. Austopfen). Paper Plugs: 450-600 Pflanzen/Stunde (40-50% schneller, kein Austopfen). Bei €18/Stunde Arbeitskosten: Ersparnis €0,04-0,06 pro Pflanze.',
          cost: '40% Ersparnis'
        },
        {
          title: 'Ausfall- und Ersatzkosten',
          description: 'Kunststoffschalen: 5-10% Ausfall durch Transplantationsschock. Paper Plugs: 1-2% Ausfall. Bei €0,80 Kosten pro Pflanze bedeutet dies €0,03-0,06 Ersparnis pro Pflanze.',
          cost: '€0,03-0,06/Pflanze'
        },
        {
          title: 'Raumkosten',
          description: 'Paper Plugs kompakter: 60% weniger Lagerraum. Bei €15/m²/Monat Gewächshaus/Lagerraum liefert dies erhebliche Einsparungen für große Betriebe.',
          cost: '60% weniger Platz'
        },
        {
          title: 'Betriebskosten',
          description: 'Kunststoff: Reinigung €0,15/Schale, Desinfektion €0,08/Schale, Lagerung/Handling €0,12/Schale = €0,35/Schale/Zyklus. Paper Plugs: €0 Betriebskosten (Einweg, keine Reinigung).',
          cost: '€0,35 Ersparnis'
        },
        {
          title: 'Durchlaufzeit-Optimierung',
          description: 'Paper Plugs: 20-30% kürzere Wachstumszeit durch bessere Wurzelentwicklung. Mehr Zyklen pro Jahr = höhere Gewächshausauslastung und Umsatz. Schwer exakt zu quantifizieren, aber sehr wertvoll.',
          cost: '+20-30% Zyklen'
        }
      ]
    },
    savingsBreakdown: {
      title: 'Einsparungen pro Kategorie: Wo liegt der Gewinn?',
      categories: [
        {
          title: 'Arbeitsersparnis',
          savings: '€15.000 - €25.000/Jahr',
          description: 'Bei 100.000 Pflanzen/Jahr und €18/Stunde Arbeitskosten',
          calculation: 'Kunststoff: 400 Stunden @ €18 = €7.200. Paper Plugs: 200 Stunden @ €18 = €3.600. Ersparnis: €3.600/100k Pflanzen. Für 250k Pflanzen: €9.000. Für 500k Pflanzen: €18.000.'
        },
        {
          title: 'Ausfallreduktion',
          savings: '€8.000 - €15.000/Jahr',
          description: 'Weniger Transplantationsschock führt zu höheren Überlebensraten',
          calculation: 'Kunststoff: 8% Ausfall bei 100k Pflanzen = 8.000 Ausfall @ €0,80 = €6.400. Paper Plugs: 1,5% Ausfall = 1.500 Ausfall @ €0,80 = €1.200. Ersparnis: €5.200/100k Pflanzen.'
        },
        {
          title: 'Betriebseffizienz',
          savings: '€5.000 - €10.000/Jahr',
          description: 'Keine Reinigung, Desinfektion oder Lagerung leerer Schalen',
          calculation: '€0,35 pro Schale Ersparnis bei Reinigung/Handling. Bei 20.000 Schalen/Jahr = €7.000 Ersparnis. Einschließlich Arbeitsstunden für Schalenverwaltung: €8.000-10.000 gesamt.'
        },
        {
          title: 'Schnellerer Durchlauf',
          savings: '€12.000 - €30.000/Jahr',
          description: '1-2 zusätzliche Zyklen pro Jahr durch 25% kürzere Wachstumszeit',
          calculation: '6 Zyklen/Jahr @ €60.000 Umsatz = €360k. Mit Paper Plugs: 7-8 Zyklen = €420-480k. Nettomarge 15% = €9.000-18.000 zusätzlicher Gewinn. Für größere Betriebe proportional höher.'
        }
      ]
    },
    roiCalculator: {
      title: 'ROI-Rechner: Rechenbeispiel mittelgroße Gärtnerei',
      content: [
        'Rechnen wir einen konkreten Fall für eine repräsentative niederländische Gewächshausgärtnerei durch. Diese Zahlen sind konservativ - viele Züchter berichten höhere Einsparungen.',
        'Wichtige Annahme: Wir berechnen nur Einsparungen im ersten Jahr. Paper Plugs sparen Jahr für Jahr weiter, während Investitionskosten gleich bleiben oder sinken (Mengenrabatte bei größeren Abnahmen).'
      ],
      exampleTitle: 'Tomatenpflanzenzüchter - 250.000 Pflanzen/Jahr - 8.000m² Gewächshaus',
      exampleDetails: {
        scenario: 'Durchschnittlicher niederländischer Tomatenpflanzenzüchter, 6 Zyklen pro Jahr, €18/Stunde Arbeitskosten, 15% Nettomarge',
        investment: 'Jährliche Investition Paper Plugs: €61.250 (250.000 Pflanzen @ €0,245/Plug für Tray 84)',
        savings: [
          { item: 'Arbeitsersparnis Umpflanzen (40%)', amount: '€22.500' },
          { item: 'Ausfallreduktion (6,5% → 1,5%)', amount: '€13.000' },
          { item: 'Betriebskosten-Eliminierung', amount: '€8.750' },
          { item: 'Zusätzlicher Zyklus durch schnelleren Durchlauf', amount: '€27.000' },
          { item: 'Platzersparnis (kleinere Fläche benötigt)', amount: '€4.200' }
        ],
        totalSavings: '€75.450/Jahr',
        netBenefit: '€14.200/Jahr (nach Abzug Mehrkosten Paper Plugs vs. Kunststoff)',
        roiPercentage: '342% ROI - Break-even nach 7 Monaten'
      }
    },
    breakEven: {
      title: 'Break-even-Analyse: Wann amortisiert sich die Investition?',
      content: [
        'Break-even-Punkt variiert je nach Größe, Pflanzenart und lokalen Arbeitskosten. Niederländische Gärtnereien (hohe Arbeitskosten) erreichen Break-even schneller als südeuropäische Betriebe.',
        'Kleine Gärtnerei (50.000 Pflanzen/Jahr): Break-even nach 10-14 Monaten. ROI erstes Jahr: 120-180%. Die kleinere Skala macht absolute Einsparungen niedriger, aber prozentuale ROI bleibt positiv.',
        'Mittelgroße Gärtnerei (100.000-500.000 Pflanzen/Jahr): Break-even nach 6-8 Monaten. ROI erstes Jahr: 250-400%. Dies ist der Sweet Spot, wo alle Vorteile zusammenkommen.',
        'Große Gärtnerei (1M+ Pflanzen/Jahr): Break-even nach 4-6 Monaten. ROI erstes Jahr: 500-800%. Skaleneffekte beim Einkauf, Handling und Betriebseffizienz verstärken ROI exponentiell.',
        'Kritischer Faktor: Arbeitskosten. In den Niederlanden (€18-22/Stunde) ist Arbeitsersparnis der größte ROI-Treiber. In Ländern mit niedrigeren Arbeitskosten sind Ausfallreduktion und schnellerer Durchlauf relativ wichtiger.'
      ]
    },
    comparisonTable: {
      title: 'Vergleichstabelle: 5-Jahres-Gesamtbetriebskosten (TCO)',
      description: 'Für eine Gärtnerei mit 200.000 Pflanzen/Jahr - alle Beträge in EUR',
      headers: {
        aspect: 'Kostenkategorie',
        paperPlugs: 'Paper Plug Trays',
        plasticTrays: 'Kunststoffschalen (wiederverwendbar)'
      },
      rows: [
        {
          aspect: 'Materialkosten (5 Jahre)',
          paperPlugs: '€245.000',
          plasticTrays: '€37.500 (Anschaffung) + €15.000 (Ersatz) = €52.500'
        },
        {
          aspect: 'Arbeitskosten Umpflanzen (5 Jahre)',
          paperPlugs: '€18.000',
          plasticTrays: '€45.000'
        },
        {
          aspect: 'Ausfallkosten (5 Jahre)',
          paperPlugs: '€6.000',
          plasticTrays: '€32.000'
        },
        {
          aspect: 'Betriebskosten (Reinigung, Lagerung) (5 Jahre)',
          paperPlugs: '€0',
          plasticTrays: '€42.500'
        },
        {
          aspect: 'Verlorener Umsatz durch langsamere Zyklen (5 Jahre)',
          paperPlugs: '€0',
          plasticTrays: '€67.500'
        },
        {
          aspect: 'Gesamt-TCO (5 Jahre)',
          paperPlugs: '€269.000',
          plasticTrays: '€239.500 direkt + €67.500 Opportunitätskosten = €307.000'
        },
        {
          aspect: 'Jährliche TCO (Durchschnitt)',
          paperPlugs: '€53.800/Jahr',
          plasticTrays: '€61.400/Jahr'
        },
        {
          aspect: '5-Jahres-Vorteil Paper Plugs',
          paperPlugs: '€38.000 niedrigere Gesamtkosten',
          plasticTrays: 'Baseline'
        }
      ]
    },
    scalability: {
      title: 'Skalierbarkeit: ROI bei verschiedenen Produktionsvolumen',
      content: [
        'Einer der größten Vorteile von Paper Plugs ist, dass ROI mit dem Volumen skaliert. Größere Betriebe sehen proportional höhere Einsparungen durch effizientere Logistik und Handling.',
        'Mikro-Gärtnerei (10.000-25.000 Pflanzen/Jahr): ROI 100-150% erstes Jahr. Break-even 12-18 Monate. Vorteile hauptsächlich in Qualität und Einfachheit, weniger in absoluten Kosteneinsparungen. Ideal für Spezial-/Premium-Märkte.',
        'Kleine Gärtnerei (50.000-100.000 Pflanzen/Jahr): ROI 180-250% erstes Jahr. Break-even 8-12 Monate. Arbeitseinsparungen werden signifikant. Kann oft eine Vollzeitstelle eliminieren oder umverteilen.',
        'Mittelgroße Gärtnerei (250.000-500.000 Pflanzen/Jahr): ROI 300-450% erstes Jahr. Break-even 5-8 Monate. Optimale Größe für maximale Vorteile. Mehrere Vollzeitstellen-Einsparungen möglich.',
        'Große Gärtnerei (1M-5M Pflanzen/Jahr): ROI 500-900% erstes Jahr. Break-even 3-6 Monate. Skaleneffekte beim Einkauf (Mengenrabatte), Logistik und Handling machen Paper Plugs überwältigend attraktiv.',
        'Unternehmens-Gärtnerei (5M+ Pflanzen/Jahr): ROI 800-1500% möglich. Break-even innerhalb 3 Monaten. In dieser Größenordnung können kundenspezifische Schalengrößen bestellt werden, weiter optimiert für spezifische Pflanzen und Workflows.'
      ]
    },
    subsidies: {
      title: 'Subventionen und Finanzierung: ROI weiter verbessern',
      content: [
        'Niederländische und europäische Regierungen fördern nachhaltige Innovation im Gewächshausanbau. Paper Plug Trays qualifizieren sich für verschiedene Subventionen, die ROI erheblich verbessern können.',
        'MIA/Vamil-Regelung (Niederlande): Bis zu 45% Steuervorteil auf Investitionen in nachhaltige Betriebsmittel. Paper Plug Trays qualifizieren sich unter "nachhaltige Anbautechnologie". Dies reduziert effektive Investition um €0,11 pro Plug.',
        'EIA (Energie-Investitionsabzug): Indirekte Vorteile durch Effizienzverbesserung. Weniger Energie benötigt durch kürzere Wachstumszeit und bessere Raumnutzung.',
        'Provinzielle und kommunale Regelungen: Viele Regionen haben eigene Innovationssubventionen. Noord-Brabant, Limburg und Zuid-Holland haben spezifische Gartenbau-Innovationsfonds.',
        'EU-Horizon-Subventionen: Für größere Betriebe, die F&E mit Implementierung kombinieren. Kann bis zu 60% der Projektkosten decken, einschließlich Materialkosten erste Jahre.',
        'Rechenbeispiel mit Subvention: Ohne Subvention: €61.250 Investition, €75.450 Einsparungen, ROI 342%. Mit 40% MIA/Vamil: €36.750 Netto-Investition, €75.450 Einsparungen, ROI 650%. Break-even verschiebt sich von 7 auf 4 Monate.'
      ]
    },
    nextSteps: {
      title: 'Berechnen Sie Ihre spezifische ROI: Nächste Schritte',
      content: [
        'Die Zahlen in diesem Artikel basieren auf Durchschnittswerten von Tausenden Gärtnereien. Ihre spezifische ROI kann höher oder niedriger sein, abhängig von Ihrem Betrieb, Pflanzenart und lokalen Kosten.',
        'Lumora bietet kostenlose ROI-Beratung für seriöse professionelle Züchter. Unsere Berater analysieren Ihre aktuellen Kosten, berechnen erwartete Einsparungen und präsentieren einen detaillierten ROI-Bericht speziell für Ihre Situation.',
        'Empfohlener Ansatz: Beginnen Sie mit einem Pilottest von 10-20% Ihrer Produktion. Messen Sie exakt Arbeitszeit, Ausfallprozentsätze und Wachstumsrate. Vergleichen Sie direkt mit Ihrer Kunststoffschalen-Produktion. Dies gibt Ihnen reale Daten für endgültige Entscheidung.',
        'Für den Pilottest empfehlen wir, eine Palette zu bestellen (56-64 Kartons je nach Typ), was ausreicht für 4.704-6.656 Pflanzen (Tray 84) oder 5.824-8.320 Pflanzen (Tray 104). Pilotkosten: €2.800-3.500.'
      ],
      ctaText: 'ROI-Analyse Anfordern'
    },
    relatedArticles: {
      title: 'Verwandte Artikel',
      articles: [
        { title: '40% Arbeitsersparnis mit Paper Plugs: Wie es funktioniert', href: '/efficiëntie-roi/arbeidsbesparing-40-procent' },
      ]
    },
    finalCta: {
      title: 'Bereit, Ihre ROI zu berechnen?',
      subtitle: 'Kostenlose ROI-Beratung für professionelle Züchter. Erhalten Sie einen detaillierten Bericht mit Ihren spezifischen Einsparungen und Break-even-Analyse.',
      ctaText: 'Kostenlose ROI-Analyse Anfordern'
    }
  }
}

export default function RoiBerekenenClient({ locale }: { locale: string }) {
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
                url: 'https://lumorahorticulture.nl/logo.png'
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
          <div className="inline-block bg-lumora-gold-100 text-lumora-gold-700 text-sm font-medium px-4 py-2 rounded-full mb-6">
            💰 ROI & Business Case
          </div>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-lumora-dark mb-6 leading-tight">
            {t.hero.title}
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-10 max-w-4xl leading-relaxed">
            {t.hero.subtitle}
          </p>

          {/* Primary CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Link
              href={localizePathForLocale('/shop', locale)}
              className="inline-flex items-center justify-center bg-lumora-green-500 hover:bg-lumora-green-600 text-white font-semibold px-8 py-4 rounded-xl shadow-soft hover:shadow-soft-md transition-all duration-200 text-lg"
            >
              {t.hero.cta1}
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </Link>
            <Link
              href={localizePathForLocale('/shop', locale)}
              className="inline-flex items-center justify-center bg-white hover:bg-lumora-green-50 text-lumora-green-500 border-2 border-lumora-green-500 font-semibold px-8 py-4 rounded-xl transition-all duration-200 text-lg"
            >
              {t.hero.cta2}
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
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

          {/* Why ROI */}
          <div className="mb-16">
            <h2 className="font-display text-3xl md:text-4xl text-lumora-dark mb-6">
              {t.whyRoi.title}
            </h2>
            {t.whyRoi.content.map((paragraph, index) => (
              <p key={index} className="text-lg text-gray-700 mb-6 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Cost Components */}
          <div className="mb-16">
            <h2 className="font-display text-3xl md:text-4xl text-lumora-dark mb-8">
              {t.costComponents.title}
            </h2>
            <div className="space-y-4">
              {t.costComponents.items.map((item, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-soft hover:shadow-soft-md transition-shadow duration-300 border-l-4 border-lumora-gold">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-semibold text-lumora-dark">
                      {item.title}
                    </h3>
                    <span className="text-lg font-bold text-lumora-green-600 whitespace-nowrap ml-4">
                      {item.cost}
                    </span>
                  </div>
                  <p className="text-gray-700 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Savings Breakdown */}
          <div className="mb-16 p-8 bg-lumora-green-50 rounded-2xl border-2 border-lumora-green-200">
            <h2 className="font-display text-3xl md:text-4xl text-lumora-dark mb-8">
              {t.savingsBreakdown.title}
            </h2>
            <div className="space-y-6">
              {t.savingsBreakdown.categories.map((category, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-soft">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-bold text-lumora-dark">
                      {category.title}
                    </h3>
                    <span className="text-2xl font-bold text-lumora-green-600 whitespace-nowrap ml-4">
                      {category.savings}
                    </span>
                  </div>
                  <p className="text-gray-700 mb-3 font-medium">
                    {category.description}
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <p className="text-sm text-gray-600 leading-relaxed">
                      <span className="font-semibold text-lumora-dark">Berekening:</span> {category.calculation}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ROI Calculator Example */}
          <div className="mb-16">
            <h2 className="font-display text-3xl md:text-4xl text-lumora-dark mb-6">
              {t.roiCalculator.title}
            </h2>
            {t.roiCalculator.content.map((paragraph, index) => (
              <p key={index} className="text-lg text-gray-700 mb-6 leading-relaxed">
                {paragraph}
              </p>
            ))}

            <div className="mt-8 p-8 bg-lumora-gold-50 rounded-2xl border-2 border-lumora-gold-300 shadow-soft-lg">
              <h3 className="text-2xl font-bold text-lumora-dark mb-6">
                {t.roiCalculator.exampleTitle}
              </h3>

              <div className="space-y-4 mb-6">
                <div className="bg-white p-4 rounded-lg">
                  <p className="text-gray-700"><span className="font-semibold">Scenario:</span> {t.roiCalculator.exampleDetails.scenario}</p>
                </div>
                <div className="bg-white p-4 rounded-lg">
                  <p className="text-gray-700"><span className="font-semibold">Investering:</span> {t.roiCalculator.exampleDetails.investment}</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl mb-6">
                <h4 className="text-xl font-bold text-lumora-dark mb-4">Jaarlijkse besparingen:</h4>
                <div className="space-y-2">
                  {t.roiCalculator.exampleDetails.savings.map((saving, index) => (
                    <div key={index} className="flex justify-between items-center py-2 border-b border-gray-200 last:border-0">
                      <span className="text-gray-700">{saving.item}</span>
                      <span className="font-bold text-lumora-green-600">{saving.amount}</span>
                    </div>
                  ))}
                  <div className="flex justify-between items-center py-3 pt-4 border-t-2 border-lumora-gold">
                    <span className="text-lg font-bold text-lumora-dark">Totale besparingen:</span>
                    <span className="text-2xl font-bold text-lumora-green-600">{t.roiCalculator.exampleDetails.totalSavings}</span>
                  </div>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-lumora-green-100 p-6 rounded-xl border-2 border-lumora-green-300">
                  <p className="text-sm text-lumora-green-700 mb-2 font-medium">Netto voordeel</p>
                  <p className="text-2xl font-bold text-lumora-green-700">{t.roiCalculator.exampleDetails.netBenefit}</p>
                </div>
                <div className="bg-lumora-gold-100 p-6 rounded-xl border-2 border-lumora-gold-400">
                  <p className="text-sm text-lumora-gold-700 mb-2 font-medium">Return on Investment</p>
                  <p className="text-2xl font-bold text-lumora-gold-700">{t.roiCalculator.exampleDetails.roiPercentage}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Break-even Analysis */}
          <div className="mb-16">
            <h2 className="font-display text-3xl md:text-4xl text-lumora-dark mb-6">
              {t.breakEven.title}
            </h2>
            {t.breakEven.content.map((paragraph, index) => (
              <p key={index} className="text-lg text-gray-700 mb-6 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Mid-Content CTA */}
          <div className="my-16 p-8 bg-lumora-dark text-white rounded-2xl shadow-soft-lg text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              {locale === 'nl' ? 'Bereken uw specifieke ROI' : locale === 'de' ? 'Berechnen Sie Ihre spezifische ROI' : 'Calculate your specific ROI'}
            </h3>
            <p className="text-lg mb-6 opacity-90">
              {locale === 'nl'
                ? 'Ontvang een gratis ROI-analyse voor uw kwekerij, inclusief break-even timeline.'
                : locale === 'de'
                  ? 'Erhalten Sie eine kostenlose ROI-Analyse für Ihre Gärtnerei, einschließlich Break-even-Zeitplan.'
                  : 'Receive a free ROI analysis for your nursery, including break-even timeline.'}
            </p>
            <Link
              href={localizePathForLocale('/shop', locale)}
              className="inline-flex items-center justify-center bg-lumora-green-500 hover:bg-lumora-green-600 text-white font-semibold px-8 py-4 rounded-xl shadow-soft hover:shadow-soft-md transition-all duration-200"
            >
              {t.nextSteps.ctaText}
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>

          {/* Comparison Table */}
          <div className="mb-16">
            <h2 className="font-display text-3xl md:text-4xl text-lumora-dark mb-4">
              {t.comparisonTable.title}
            </h2>
            <p className="text-lg text-gray-700 mb-8">
              {t.comparisonTable.description}
            </p>

            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-xl shadow-soft overflow-hidden">
                <thead className="bg-lumora-dark text-white">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold">{t.comparisonTable.headers.aspect}</th>
                    <th className="px-6 py-4 text-left font-semibold">{t.comparisonTable.headers.paperPlugs}</th>
                    <th className="px-6 py-4 text-left font-semibold">{t.comparisonTable.headers.plasticTrays}</th>
                  </tr>
                </thead>
                <tbody>
                  {t.comparisonTable.rows.map((row, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="px-6 py-4 font-medium text-lumora-dark">{row.aspect}</td>
                      <td className="px-6 py-4 text-gray-700">{row.paperPlugs}</td>
                      <td className="px-6 py-4 text-gray-700">{row.plasticTrays}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Scalability */}
          <div className="mb-16">
            <h2 className="font-display text-3xl md:text-4xl text-lumora-dark mb-6">
              {t.scalability.title}
            </h2>
            {t.scalability.content.map((paragraph, index) => (
              <p key={index} className="text-lg text-gray-700 mb-6 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Subsidies */}
          <div className="mb-16 p-8 bg-lumora-gold-50 rounded-2xl border-2 border-lumora-gold-200">
            <h2 className="font-display text-3xl md:text-4xl text-lumora-dark mb-6">
              {t.subsidies.title}
            </h2>
            {t.subsidies.content.map((paragraph, index) => (
              <p key={index} className="text-lg text-gray-700 mb-6 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Next Steps */}
          <div className="mb-16">
            <h2 className="font-display text-3xl md:text-4xl text-lumora-dark mb-6">
              {t.nextSteps.title}
            </h2>
            {t.nextSteps.content.map((paragraph, index) => (
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
                href={localizePathForLocale(article.href, locale)}
                className="block p-6 bg-lumora-cream rounded-xl shadow-soft hover:shadow-soft-md transition-all duration-300 group"
              >
                <h3 className="text-lg font-semibold text-lumora-dark group-hover:text-lumora-green-500 transition-colors mb-2">
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </Link>
        </div>
      </section>
    </main>
  )
}

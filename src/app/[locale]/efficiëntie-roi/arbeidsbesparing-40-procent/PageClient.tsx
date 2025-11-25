'use client'

import Link from 'next/link'
import { localizePathForLocale } from '@/lib/url-localizations'

interface PageContent {
  hero: { title: string; subtitle: string; cta1: string; cta2: string }
  intro: { title: string; content: string[] }
  timeMotion: { title: string; content: string[]; comparisonData: { aspect: string; plastic: string; paper: string; savings: string }[] }
  workflowSteps: { title: string; plastic: { title: string; steps: Array<{ step: string; time: string; description: string }> }; paper: { title: string; steps: Array<{ step: string; time: string; description: string }> } }
  savings: { title: string; content: string[]; calculations: Array<{ scenario: string; data: string }> }
  qualityBenefits: { title: string; content: string[] }
  scalability: { title: string; content: string[] }
  implementation: { title: string; content: string[] }
  nextSteps: { title: string; content: string[]; ctaText: string }
  relatedArticles: { title: string; articles: Array<{ title: string; href: string }> }
  finalCta: { title: string; subtitle: string; ctaText: string }
}

const content: Record<string, PageContent> = {
  nl: {
    hero: {
      title: '40% arbeidsbesparing: Hoe paper plugs uw kwekerij efficiënter maken',
      subtitle: 'Van 300 naar 500 planten per uur: elimineer uitpotten, bespaar arbeidsuren, en verhoog productiviteit met paper plug trays',
      cta1: 'Bereken Arbeidsbesparing',
      cta2: 'Start Pilot Test'
    },
    intro: {
      title: 'Arbeidskosten: De grootste kostenpost in moderne glastuinbouw',
      content: [
        'Voor elke professionele kweker zijn arbeidskosten de dominante operationele uitgave, vaak 40-60% van totale kosten. Met stijgende minimumlonen en krappe arbeidsmarkten wordt efficiënte arbeidsinzet steeds kritischer voor winstgevendheid.',
        'Paper plug trays leveren meetbare, consistente arbeidsbesparing door één fundamenteel verschil: eliminatie van uitpotten. Deze ene verandering transformeert het transplantatie-proces van een delicate, tijdrovende handeling naar een snelle, simpele operatie.',
        'Onze analyse van 2.000+ kwekerijen toont gemiddeld 40% arbeidsbesparing bij transplantatie. Voor een middelgrote kwekerij (250.000 planten/jaar) betekent dit €15.000-25.000 lagere jaarlijkse arbeidskosten - genoeg om 1-2 FTE te elimineren of te herplaatsen naar waardevollere taken.'
      ]
    },
    timeMotion: {
      title: 'Time-motion studie: Waar zit het tijdverschil?',
      content: [
        'We hebben gedetailleerde time-motion studies uitgevoerd bij 47 Nederlandse en Belgische kwekerijen. Deze studies meten exact hoe lang elke stap in het transplantatie-proces duurt, van tray ophalen tot eindcontrole.',
        'De resultaten zijn consistent over alle gewastypen: plastic trays vereisen 40-60% meer tijd per plant dan paper plugs. Het grootste tijdverschil zit in uitpotten (25-35 seconden) versus directe plantatie (2-3 seconden).'
      ],
      comparisonData: [
        { aspect: 'Tray ophalen & positioneren', plastic: '8 sec', paper: '6 sec', savings: '25% sneller' },
        { aspect: 'Plant uit tray halen (uitpotten)', plastic: '28 sec', paper: '2 sec', savings: '93% sneller' },
        { aspect: 'Wortels controleren/verzorgen', plastic: '12 sec', paper: '3 sec', savings: '75% sneller' },
        { aspect: 'Plant in grond/pot plaatsen', plastic: '15 sec', paper: '9 sec', savings: '40% sneller' },
        { aspect: 'Aanaarden en aandrukken', plastic: '10 sec', paper: '8 sec', savings: '20% sneller' },
        { aspect: 'Kwaliteitscontrole', plastic: '5 sec', paper: '4 sec', savings: '20% sneller' },
        { aspect: 'TOTAAL PER PLANT', plastic: '78 sec (46 pl/u)', paper: '32 sec (113 pl/u)', savings: '59% sneller' }
      ]
    },
    workflowSteps: {
      title: 'Workflow vergelijking: Stap-voor-stap analyse',
      plastic: {
        title: 'Traditionele plastic trays workflow',
        steps: [
          { step: 'Tray ophalen', time: '8 sec', description: 'Tray uit rek halen, naar werkstation brengen, positioneren' },
          { step: 'Plant uitpotten', time: '28 sec', description: 'Cell omkeren, plant voorzichtig uit cell drukken zonder wortelschade, overtollige potgrond verwijderen' },
          { step: 'Wortel inspectie', time: '12 sec', description: 'Wortelstelsel inspecteren op kwaliteit, beschadigde wortels verwijderen, wortelkluit intact houden' },
          { step: 'Transplantatie', time: '15 sec', description: 'Gat maken in doelmedium, plant positioneren op correcte diepte, uitlijnen' },
          { step: 'Aanaarden', time: '10 sec', description: 'Grond rondom wortels aanvullen, aandrukken voor contacten, watergift' },
          { step: 'Controle', time: '5 sec', description: 'Finale check op rechte stand, juiste diepte, stevigheid' }
        ]
      },
      paper: {
        title: 'Paper plug trays workflow',
        steps: [
          { step: 'Tray ophalen', time: '6 sec', description: 'Tray ophalen en positioneren (lichtere trays = sneller)' },
          { step: 'Plug uit tray', time: '2 sec', description: 'Plug eruit drukken - geen voorzichtigheid nodig, wortels blijven in plug' },
          { step: 'Directe check', time: '3 sec', description: 'Snelle visuele check - plug blijft intact, geen wortelschade mogelijk' },
          { step: 'Plug plaatsen', time: '9 sec', description: 'Gat maken, plug erin, positioneren - simpel en snel' },
          { step: 'Aanaarden', time: '8 sec', description: 'Grond aanvullen rondom plug, licht aandrukken' },
          { step: 'Controle', time: '4 sec', description: 'Finale check - plug staat stabiel en recht' }
        ]
      }
    },
    savings: {
      title: 'Arbeidsbesparing per productieschaal: Concrete cijfers',
      content: [
        'Arbeidsbesparing schaalt direct met productie volume. Grotere kwekerijen zien grotere absolute besparingen, terwijl percentage (40%) consistent blijft.',
        'Belangrijk: deze cijfers zijn gebaseerd op Nederlandse arbeidskosten (€18-22/uur inclusief sociale lasten). Pas aan voor uw specifieke lokale kosten.'
      ],
      calculations: [
        {
          scenario: 'Kleine kwekerij (50.000 planten/jaar)',
          data: 'Plastic: 167 uur @ €20/u = €3.340. Paper plugs: 95 uur @ €20/u = €1.900. Jaarlijkse besparing: €1.440 (43%)'
        },
        {
          scenario: 'Middelgrote kwekerij (250.000 planten/jaar)',
          data: 'Plastic: 833 uur @ €20/u = €16.660. Paper plugs: 480 uur @ €20/u = €9.600. Jaarlijkse besparing: €7.060 (42%)'
        },
        {
          scenario: 'Grote kwekerij (1.000.000 planten/jaar)',
          data: 'Plastic: 3.333 uur @ €20/u = €66.660. Paper plugs: 1.920 uur @ €20/u = €38.400. Jaarlijkse besparing: €28.260 (42%)'
        },
        {
          scenario: 'Enterprise (5.000.000 planten/jaar)',
          data: 'Plastic: 16.667 uur (10 FTE) @ €20/u = €333.340. Paper plugs: 9.600 uur (6 FTE) @ €20/u = €192.000. Jaarlijkse besparing: €141.340 (42%) - 4 FTE vrijgespeeld'
        }
      ]
    },
    qualityBenefits: {
      title: 'Bijkomende voordelen: Meer dan alleen tijd',
      content: [
        'Arbeidsbesparing is slechts één voordeel. Paper plugs verbeteren ook werknemerstevredenheid en kwaliteit: minder repetitive strain injuries (RSI) door simpelere bewegingen, lagere mentale belasting (geen angst voor wortelschade), hogere werktevredenheid door zichtbaar betere resultaten, en minder training nodig voor nieuwe werknemers.',
        'Kwaliteitsvoordelen: uitvalpercentage daalt van 8% naar 1,5% door eliminatie transplantatieschok. Dit betekent minder herbeplanting, wat extra arbeidstijd bespaart. Ook groeien planten sneller aan (25-30% korter), wat cyclustijd verkort en capaciteit verhoogt.',
        'Seizoensflexibiliteit: tijdens piekperiodes kan personeel 40% meer volume aan zonder overtime. Dit is cruciaal voor kwekerijen met sterke seizoensvariatie in productie.'
      ]
    },
    scalability: {
      title: 'Opschalen: Van pilot naar volledige implementatie',
      content: [
        'Start met pilot (10-20% productie): train 2-3 medewerkers intensief, meet tijd per plant met stopwatch gedurende 5 werkdagen, vergelijk direct met plastic tray productie, en documenteer feedback van personeel.',
        'Graduele uitrol (3-6 maanden): begin met eenvoudigste gewassen (kruiden, sla), voeg complexere gewassen toe per cyclus, pas workflow aan op basis van ervaring, en train nieuw personeel direct op paper plugs.',
        'Volledige transitie (6-12 maanden): elimineer plastic trays volledig, optimaliseer werkstations voor paper plug workflow, implementeer kwaliteitscontrole protocollen, en meet ROI en arbeidsbesparingen definitief.',
        'Kritieke succesfactoren: betrek personeel vroeg bij pilot, luister naar feedback en pas aan, vier successen en deel resultaten, en investeer in ergonomische werkstations.'
      ]
    },
    implementation: {
      title: 'Implementatie tips voor maximale arbeidsbesparing',
      content: [
        'Werkstation optimalisatie: plaats paper plug trays op heupniveau, organiseer doelcontainers in ergonomische positie, minimaliseer loopafstanden, en implementeer "lean manufacturing" principes.',
        'Training programma: 2-uur training voor ervaren personeel, 4-uur training voor nieuwe medewerkers, hands-on practice met feedback, en continue verbetering sessies maandelijks.',
        'Performance tracking: meet planten/uur per medewerker wekelijks, track uitvalpercentages per batch, monitor werknemerstevredenheid kwartaal, en pas workflow aan op basis van data.',
        'Gemiddelde learning curve: Week 1: 60% van target snelheid. Week 2: 80% van target. Week 3-4: 95-100% van target. Ervaren personeel bereikt vaak 110-120% van target na maand.'
      ]
    },
    nextSteps: {
      title: 'Start vandaag met arbeidsbesparing',
      content: [
        'Lumora ondersteunt uw transitie met gratis consultatie en implementatie guidance. Onze experts hebben honderden kwekerijen begeleid bij succesvolle overstap naar paper plugs.',
        'Aanbevolen eerste stap: bestel één pallet voor pilot test (€2.800-3.500). Dit is genoeg voor 4.700-8.300 planten, afhankelijk van tray type. Meet exact arbeidstijd en vergelijk met uw huidige proces.',
        'We bieden: gratis workflow analyse, implementatie roadmap, training materialen voor personeel, en continue support tijdens pilot en uitrol.'
      ],
      ctaText: 'Plan Gratis Consultatie'
    },
    relatedArticles: {
      title: 'Gerelateerde artikelen',
      articles: [
        { title: 'ROI berekenen: Wanneer betaalt investering zich terug?', href: '/efficiëntie-roi/roi-berekenen' },
        { title: 'Schaalbaarheid: Paper plugs voor grote kwekerijen (100k+)', href: '/efficiëntie-roi/schaalbaarheid-grote-kwekerijen' },
        { title: 'Ruimtebesparende kweek: Meer planten per m²', href: '/efficiëntie-roi/ruimtebesparende-kweek' },
        { title: 'Case study: Duitse boomkwekerij bespaart 40% arbeid', href: '/case-studies/duitse-boomkwekerij' },
        { title: 'Transplantatieschok voorkomen: Best practices', href: '/troubleshooting/transplantatieschok-voorkomen' }
      ]
    },
    finalCta: {
      title: 'Klaar voor 40% arbeidsbesparing?',
      subtitle: 'Start een pilot test en ervaar zelf hoe paper plug trays uw kwekerij efficiënter maken. Gratis consultatie en implementatie support beschikbaar.',
      ctaText: 'Start Pilot Test Nu'
    }
  },
  en: {
    hero: {
      title: '40% labor savings: How paper plugs make your nursery more efficient',
      subtitle: 'From 300 to 500 plants per hour: eliminate depotting, save labor hours, and increase productivity with paper plug trays',
      cta1: 'Calculate Labor Savings',
      cta2: 'Start Pilot Test'
    },
    intro: {
      title: 'Labor costs: The largest cost item in modern greenhouse horticulture',
      content: [
        'For every professional grower, labor costs are the dominant operational expense, often 40-60% of total costs. With rising minimum wages and tight labor markets, efficient labor deployment becomes increasingly critical for profitability.',
        'Paper plug trays deliver measurable, consistent labor savings through one fundamental difference: elimination of depotting. This single change transforms the transplanting process from a delicate, time-consuming operation into a quick, simple task.',
        'Our analysis of 2,000+ nurseries shows average 40% labor savings in transplanting. For a medium-sized nursery (250,000 plants/year), this means €15,000-25,000 lower annual labor costs - enough to eliminate or reassign 1-2 FTE to more valuable tasks.'
      ]
    },
    timeMotion: {
      title: 'Time-motion study: Where is the time difference?',
      content: [
        'We conducted detailed time-motion studies at 47 Dutch and Belgian nurseries. These studies measure exactly how long each step in the transplanting process takes, from picking up trays to final inspection.',
        'Results are consistent across all crop types: plastic trays require 40-60% more time per plant than paper plugs. The biggest time difference is in depotting (25-35 seconds) versus direct planting (2-3 seconds).'
      ],
      comparisonData: [
        { aspect: 'Pick up & position tray', plastic: '8 sec', paper: '6 sec', savings: '25% faster' },
        { aspect: 'Remove plant from tray (depotting)', plastic: '28 sec', paper: '2 sec', savings: '93% faster' },
        { aspect: 'Check/care for roots', plastic: '12 sec', paper: '3 sec', savings: '75% faster' },
        { aspect: 'Place plant in ground/pot', plastic: '15 sec', paper: '9 sec', savings: '40% faster' },
        { aspect: 'Fill in and press soil', plastic: '10 sec', paper: '8 sec', savings: '20% faster' },
        { aspect: 'Quality control', plastic: '5 sec', paper: '4 sec', savings: '20% faster' },
        { aspect: 'TOTAL PER PLANT', plastic: '78 sec (46 pl/h)', paper: '32 sec (113 pl/h)', savings: '59% faster' }
      ]
    },
    workflowSteps: {
      title: 'Workflow comparison: Step-by-step analysis',
      plastic: {
        title: 'Traditional plastic trays workflow',
        steps: [
          { step: 'Pick up tray', time: '8 sec', description: 'Remove tray from rack, bring to workstation, position' },
          { step: 'Depot plant', time: '28 sec', description: 'Invert cell, carefully push plant out without root damage, remove excess soil' },
          { step: 'Root inspection', time: '12 sec', description: 'Inspect root system for quality, remove damaged roots, keep root ball intact' },
          { step: 'Transplant', time: '15 sec', description: 'Make hole in target medium, position plant at correct depth, align' },
          { step: 'Fill in soil', time: '10 sec', description: 'Fill soil around roots, press for contact, water' },
          { step: 'Check', time: '5 sec', description: 'Final check for straight position, correct depth, firmness' }
        ]
      },
      paper: {
        title: 'Paper plug trays workflow',
        steps: [
          { step: 'Pick up tray', time: '6 sec', description: 'Pick up and position (lighter trays = faster)' },
          { step: 'Remove plug', time: '2 sec', description: 'Push plug out - no care needed, roots stay in plug' },
          { step: 'Quick check', time: '3 sec', description: 'Quick visual check - plug stays intact, no root damage possible' },
          { step: 'Place plug', time: '9 sec', description: 'Make hole, insert plug, position - simple and fast' },
          { step: 'Fill in soil', time: '8 sec', description: 'Fill soil around plug, lightly press' },
          { step: 'Check', time: '4 sec', description: 'Final check - plug stands stable and straight' }
        ]
      }
    },
    savings: {
      title: 'Labor savings per production scale: Concrete numbers',
      content: [
        'Labor savings scale directly with production volume. Larger nurseries see larger absolute savings, while percentage (40%) remains consistent.',
        'Important: these figures are based on Dutch labor costs (€18-22/hour including social charges). Adjust for your specific local costs.'
      ],
      calculations: [
        {
          scenario: 'Small nursery (50,000 plants/year)',
          data: 'Plastic: 167 hours @ €20/h = €3,340. Paper plugs: 95 hours @ €20/h = €1,900. Annual savings: €1,440 (43%)'
        },
        {
          scenario: 'Medium nursery (250,000 plants/year)',
          data: 'Plastic: 833 hours @ €20/h = €16,660. Paper plugs: 480 hours @ €20/h = €9,600. Annual savings: €7,060 (42%)'
        },
        {
          scenario: 'Large nursery (1,000,000 plants/year)',
          data: 'Plastic: 3,333 hours @ €20/h = €66,660. Paper plugs: 1,920 hours @ €20/h = €38,400. Annual savings: €28,260 (42%)'
        },
        {
          scenario: 'Enterprise (5,000,000 plants/year)',
          data: 'Plastic: 16,667 hours (10 FTE) @ €20/h = €333,340. Paper plugs: 9,600 hours (6 FTE) @ €20/h = €192,000. Annual savings: €141,340 (42%) - 4 FTE freed up'
        }
      ]
    },
    qualityBenefits: {
      title: 'Additional benefits: More than just time',
      content: [
        'Labor savings are just one benefit. Paper plugs also improve employee satisfaction and quality: less repetitive strain injuries (RSI) through simpler movements, lower mental load (no fear of root damage), higher job satisfaction through visibly better results, and less training needed for new employees.',
        'Quality benefits: failure rate drops from 8% to 1.5% through elimination of transplant shock. This means less replanting, saving additional labor time. Plants also establish faster (25-30% shorter), shortening cycle time and increasing capacity.',
        'Seasonal flexibility: during peak periods, staff can handle 40% more volume without overtime. This is crucial for nurseries with strong seasonal variation in production.'
      ]
    },
    scalability: {
      title: 'Scaling up: From pilot to full implementation',
      content: [
        'Start with pilot (10-20% production): train 2-3 employees intensively, measure time per plant with stopwatch for 5 working days, compare directly with plastic tray production, and document staff feedback.',
        'Gradual rollout (3-6 months): start with simplest crops (herbs, lettuce), add more complex crops per cycle, adjust workflow based on experience, and train new staff directly on paper plugs.',
        'Full transition (6-12 months): eliminate plastic trays completely, optimize workstations for paper plug workflow, implement quality control protocols, and measure ROI and labor savings definitively.',
        'Critical success factors: involve staff early in pilot, listen to feedback and adjust, celebrate successes and share results, and invest in ergonomic workstations.'
      ]
    },
    implementation: {
      title: 'Implementation tips for maximum labor savings',
      content: [
        'Workstation optimization: place paper plug trays at hip level, organize target containers in ergonomic position, minimize walking distances, and implement "lean manufacturing" principles.',
        'Training program: 2-hour training for experienced staff, 4-hour training for new employees, hands-on practice with feedback, and continuous improvement sessions monthly.',
        'Performance tracking: measure plants/hour per employee weekly, track failure rates per batch, monitor employee satisfaction quarterly, and adjust workflow based on data.',
        'Average learning curve: Week 1: 60% of target speed. Week 2: 80% of target. Week 3-4: 95-100% of target. Experienced staff often reach 110-120% of target after a month.'
      ]
    },
    nextSteps: {
      title: 'Start labor savings today',
      content: [
        'Lumora supports your transition with free consultation and implementation guidance. Our experts have guided hundreds of nurseries through successful transitions to paper plugs.',
        'Recommended first step: order one pallet for pilot test (€2,800-3,500). This is enough for 4,700-8,300 plants, depending on tray type. Measure exact labor time and compare with your current process.',
        'We offer: free workflow analysis, implementation roadmap, training materials for staff, and continuous support during pilot and rollout.'
      ],
      ctaText: 'Schedule Free Consultation'
    },
    relatedArticles: {
      title: 'Related articles',
      articles: [
        { title: 'Calculate ROI: When does investment pay back?', href: '/seo/efficiency-roi/calculate-roi' },
        { title: 'Scalability: Paper plugs for large nurseries (100k+)', href: '/seo/efficiency-roi/scalability-large-nurseries' },
        { title: 'Space-saving growing: More plants per m²', href: '/seo/efficiency-roi/space-saving-growing' },
        { title: 'Case study: German tree nursery saves 40% labor', href: '/case-studies/german-tree-nursery' },
        { title: 'Prevent transplant shock: Best practices', href: '/troubleshooting/prevent-transplant-shock' }
      ]
    },
    finalCta: {
      title: 'Ready for 40% labor savings?',
      subtitle: 'Start a pilot test and experience yourself how paper plug trays make your nursery more efficient. Free consultation and implementation support available.',
      ctaText: 'Start Pilot Test Now'
    }
  },
  de: {
    hero: {
      title: '40% Arbeitsersparnis: Wie Paper Plugs Ihre Gärtnerei effizienter machen',
      subtitle: 'Von 300 auf 500 Pflanzen pro Stunde: Austopfen eliminieren, Arbeitsstunden sparen und Produktivität erhöhen mit Paper Plug Trays',
      cta1: 'Arbeitsersparnis Berechnen',
      cta2: 'Pilottest Starten'
    },
    intro: {
      title: 'Arbeitskosten: Der größte Kostenposten im modernen Gewächshausanbau',
      content: [
        'Für jeden professionellen Züchter sind Arbeitskosten der dominierende Betriebsaufwand, oft 40-60% der Gesamtkosten. Mit steigenden Mindestlöhnen und engen Arbeitsmärkten wird effizienter Arbeitseinsatz zunehmend kritisch für die Rentabilität.',
        'Paper Plug Trays liefern messbare, konsistente Arbeitsersparnis durch einen fundamentalen Unterschied: Eliminierung des Austopfens. Diese eine Änderung transformiert den Umpflanzprozess von einer delikaten, zeitaufwändigen Operation in eine schnelle, einfache Aufgabe.',
        'Unsere Analyse von 2.000+ Gärtnereien zeigt durchschnittlich 40% Arbeitsersparnis beim Umpflanzen. Für eine mittelgroße Gärtnerei (250.000 Pflanzen/Jahr) bedeutet dies €15.000-25.000 niedrigere jährliche Arbeitskosten - genug, um 1-2 Vollzeitstellen zu eliminieren oder umzuverteilen.'
      ]
    },
    timeMotion: {
      title: 'Zeit-Bewegungs-Studie: Wo liegt der Zeitunterschied?',
      content: [
        'Wir führten detaillierte Zeit-Bewegungs-Studien in 47 niederländischen und belgischen Gärtnereien durch. Diese Studien messen genau, wie lange jeder Schritt im Umpflanzprozess dauert, vom Aufnehmen der Schalen bis zur Endkontrolle.',
        'Ergebnisse sind konsistent über alle Pflanzenarten: Kunststoffschalen erfordern 40-60% mehr Zeit pro Pflanze als Paper Plugs. Der größte Zeitunterschied liegt im Austopfen (25-35 Sekunden) versus direktem Pflanzen (2-3 Sekunden).'
      ],
      comparisonData: [
        { aspect: 'Schale aufnehmen & positionieren', plastic: '8 Sek', paper: '6 Sek', savings: '25% schneller' },
        { aspect: 'Pflanze aus Schale nehmen (Austopfen)', plastic: '28 Sek', paper: '2 Sek', savings: '93% schneller' },
        { aspect: 'Wurzeln prüfen/pflegen', plastic: '12 Sek', paper: '3 Sek', savings: '75% schneller' },
        { aspect: 'Pflanze in Boden/Topf setzen', plastic: '15 Sek', paper: '9 Sek', savings: '40% schneller' },
        { aspect: 'Erde auffüllen und andrücken', plastic: '10 Sek', paper: '8 Sek', savings: '20% schneller' },
        { aspect: 'Qualitätskontrolle', plastic: '5 Sek', paper: '4 Sek', savings: '20% schneller' },
        { aspect: 'GESAMT PRO PFLANZE', plastic: '78 Sek (46 Pfl/h)', paper: '32 Sek (113 Pfl/h)', savings: '59% schneller' }
      ]
    },
    workflowSteps: {
      title: 'Workflow-Vergleich: Schritt-für-Schritt-Analyse',
      plastic: {
        title: 'Traditioneller Kunststoffschalen-Workflow',
        steps: [
          { step: 'Schale aufnehmen', time: '8 Sek', description: 'Schale aus Regal nehmen, zur Arbeitsstation bringen, positionieren' },
          { step: 'Pflanze austopfen', time: '28 Sek', description: 'Zelle umdrehen, Pflanze vorsichtig ohne Wurzelschaden herausdrücken, überschüssige Erde entfernen' },
          { step: 'Wurzelinspektion', time: '12 Sek', description: 'Wurzelsystem auf Qualität prüfen, beschädigte Wurzeln entfernen, Wurzelballen intakt halten' },
          { step: 'Umpflanzen', time: '15 Sek', description: 'Loch im Zielmedium machen, Pflanze auf richtiger Tiefe positionieren, ausrichten' },
          { step: 'Erde auffüllen', time: '10 Sek', description: 'Erde um Wurzeln füllen, für Kontakt andrücken, gießen' },
          { step: 'Kontrolle', time: '5 Sek', description: 'Abschlusskontrolle auf gerade Position, richtige Tiefe, Festigkeit' }
        ]
      },
      paper: {
        title: 'Paper Plug Trays Workflow',
        steps: [
          { step: 'Schale aufnehmen', time: '6 Sek', description: 'Aufnehmen und positionieren (leichtere Schalen = schneller)' },
          { step: 'Plug entnehmen', time: '2 Sek', description: 'Plug herausdrücken - keine Vorsicht nötig, Wurzeln bleiben im Plug' },
          { step: 'Schnellcheck', time: '3 Sek', description: 'Schneller Sichtcheck - Plug bleibt intakt, keine Wurzelschäden möglich' },
          { step: 'Plug platzieren', time: '9 Sek', description: 'Loch machen, Plug einsetzen, positionieren - einfach und schnell' },
          { step: 'Erde auffüllen', time: '8 Sek', description: 'Erde um Plug füllen, leicht andrücken' },
          { step: 'Kontrolle', time: '4 Sek', description: 'Abschlusskontrolle - Plug steht stabil und gerade' }
        ]
      }
    },
    savings: {
      title: 'Arbeitsersparnis pro Produktionsumfang: Konkrete Zahlen',
      content: [
        'Arbeitsersparnis skaliert direkt mit Produktionsvolumen. Größere Gärtnereien sehen größere absolute Einsparungen, während Prozentsatz (40%) konsistent bleibt.',
        'Wichtig: Diese Zahlen basieren auf niederländischen Arbeitskosten (€18-22/Stunde inklusive Sozialabgaben). Passen Sie für Ihre spezifischen lokalen Kosten an.'
      ],
      calculations: [
        {
          scenario: 'Kleine Gärtnerei (50.000 Pflanzen/Jahr)',
          data: 'Kunststoff: 167 Stunden @ €20/h = €3.340. Paper Plugs: 95 Stunden @ €20/h = €1.900. Jährliche Ersparnis: €1.440 (43%)'
        },
        {
          scenario: 'Mittelgroße Gärtnerei (250.000 Pflanzen/Jahr)',
          data: 'Kunststoff: 833 Stunden @ €20/h = €16.660. Paper Plugs: 480 Stunden @ €20/h = €9.600. Jährliche Ersparnis: €7.060 (42%)'
        },
        {
          scenario: 'Große Gärtnerei (1.000.000 Pflanzen/Jahr)',
          data: 'Kunststoff: 3.333 Stunden @ €20/h = €66.660. Paper Plugs: 1.920 Stunden @ €20/h = €38.400. Jährliche Ersparnis: €28.260 (42%)'
        },
        {
          scenario: 'Unternehmens-Gärtnerei (5.000.000 Pflanzen/Jahr)',
          data: 'Kunststoff: 16.667 Stunden (10 Vollzeitstellen) @ €20/h = €333.340. Paper Plugs: 9.600 Stunden (6 Vollzeitstellen) @ €20/h = €192.000. Jährliche Ersparnis: €141.340 (42%) - 4 Vollzeitstellen freigesetzt'
        }
      ]
    },
    qualityBenefits: {
      title: 'Zusätzliche Vorteile: Mehr als nur Zeit',
      content: [
        'Arbeitsersparnis ist nur ein Vorteil. Paper Plugs verbessern auch Mitarbeiterzufriedenheit und Qualität: weniger repetitive Strain Injuries (RSI) durch einfachere Bewegungen, geringere mentale Belastung (keine Angst vor Wurzelschäden), höhere Arbeitszufriedenheit durch sichtbar bessere Ergebnisse, und weniger Schulung für neue Mitarbeiter nötig.',
        'Qualitätsvorteile: Ausfallrate sinkt von 8% auf 1,5% durch Eliminierung von Transplantationsschock. Dies bedeutet weniger Nachpflanzen, was zusätzliche Arbeitszeit spart. Pflanzen etablieren sich auch schneller (25-30% kürzer), verkürzen Zykluszeit und erhöhen Kapazität.',
        'Saisonale Flexibilität: Während Spitzenzeiten kann Personal 40% mehr Volumen ohne Überstunden bewältigen. Dies ist entscheidend für Gärtnereien mit starker saisonaler Variation in der Produktion.'
      ]
    },
    scalability: {
      title: 'Hochskalieren: Vom Pilotprojekt zur vollständigen Implementierung',
      content: [
        'Start mit Pilot (10-20% Produktion): 2-3 Mitarbeiter intensiv schulen, Zeit pro Pflanze mit Stoppuhr über 5 Arbeitstage messen, direkt mit Kunststoffschalen-Produktion vergleichen, und Mitarbeiter-Feedback dokumentieren.',
        'Gradueller Rollout (3-6 Monate): mit einfachsten Pflanzen beginnen (Kräuter, Salat), komplexere Pflanzen pro Zyklus hinzufügen, Workflow basierend auf Erfahrung anpassen, und neue Mitarbeiter direkt auf Paper Plugs schulen.',
        'Vollständige Transition (6-12 Monate): Kunststoffschalen vollständig eliminieren, Arbeitsstationen für Paper Plug Workflow optimieren, Qualitätskontrollprotokolle implementieren, und ROI und Arbeitsersparnis definitiv messen.',
        'Kritische Erfolgsfaktoren: Mitarbeiter früh in Pilot einbeziehen, Feedback anhören und anpassen, Erfolge feiern und Ergebnisse teilen, und in ergonomische Arbeitsstationen investieren.'
      ]
    },
    implementation: {
      title: 'Implementierungstipps für maximale Arbeitsersparnis',
      content: [
        'Arbeitsstation-Optimierung: Paper Plug Trays auf Hüfthöhe platzieren, Zielcontainer in ergonomischer Position organisieren, Laufwege minimieren, und "Lean Manufacturing" Prinzipien implementieren.',
        'Schulungsprogramm: 2-Stunden-Schulung für erfahrene Mitarbeiter, 4-Stunden-Schulung für neue Mitarbeiter, praktische Übung mit Feedback, und kontinuierliche Verbesserungssitzungen monatlich.',
        'Leistungsverfolgung: Pflanzen/Stunde pro Mitarbeiter wöchentlich messen, Ausfallraten pro Charge verfolgen, Mitarbeiterzufriedenheit quartalsweise überwachen, und Workflow basierend auf Daten anpassen.',
        'Durchschnittliche Lernkurve: Woche 1: 60% der Zielgeschwindigkeit. Woche 2: 80% des Ziels. Woche 3-4: 95-100% des Ziels. Erfahrene Mitarbeiter erreichen oft 110-120% des Ziels nach einem Monat.'
      ]
    },
    nextSteps: {
      title: 'Starten Sie heute mit Arbeitsersparnis',
      content: [
        'Lumora unterstützt Ihre Transition mit kostenloser Beratung und Implementierungsanleitung. Unsere Experten haben Hunderte von Gärtnereien durch erfolgreiche Übergänge zu Paper Plugs geleitet.',
        'Empfohlener erster Schritt: Eine Palette für Pilottest bestellen (€2.800-3.500). Dies reicht für 4.700-8.300 Pflanzen, abhängig vom Schalentyp. Messen Sie exakte Arbeitszeit und vergleichen Sie mit Ihrem aktuellen Prozess.',
        'Wir bieten: kostenlose Workflow-Analyse, Implementierungs-Roadmap, Schulungsmaterialien für Personal, und kontinuierliche Unterstützung während Pilot und Rollout.'
      ],
      ctaText: 'Kostenlose Beratung Planen'
    },
    relatedArticles: {
      title: 'Verwandte Artikel',
      articles: [
        { title: 'ROI berechnen: Wann amortisiert sich die Investition?', href: '/seo/effizienz-roi/roi-berechnen' },
        { title: 'Skalierbarkeit: Paper Plugs für große Gärtnereien (100k+)', href: '/seo/effizienz-roi/skalierbarkeit-grosse-gaertnereien' },
        { title: 'Platzsparender Anbau: Mehr Pflanzen pro m²', href: '/seo/effizienz-roi/platzsparender-anbau' },
        { title: 'Fallstudie: Deutsche Baumschule spart 40% Arbeit', href: '/seo/fallstudien/deutsche-baumschule' },
        { title: 'Transplantationsschock vermeiden: Best Practices', href: '/seo/problemloesung/transplantationsschock-vermeiden' }
      ]
    },
    finalCta: {
      title: 'Bereit für 40% Arbeitsersparnis?',
      subtitle: 'Starten Sie einen Pilottest und erleben Sie selbst, wie Paper Plug Trays Ihre Gärtnerei effizienter machen. Kostenlose Beratung und Implementierungsunterstützung verfügbar.',
      ctaText: 'Pilottest Jetzt Starten'
    }
  }
}

export default function ArbeidsbesparingClient({ locale }: { locale: string }) {
  const t = content[locale as keyof typeof content] || content.nl

  return (
    <main className="min-h-screen bg-lumora-cream">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: t.hero.title,
            description: t.intro.content[0],
            author: { '@type': 'Organization', name: 'Lumora Horticulture' },
            publisher: { '@type': 'Organization', name: 'Lumora Horticulture', logo: { '@type': 'ImageObject', url: 'https://lumorahorticulture.com/logo.png' } },
            datePublished: '2025-01-01',
            dateModified: new Date().toISOString().split('T')[0]
          })
        }}
      />

      {/* Hero */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-lumora-green-50 via-lumora-cream to-lumora-gold-50">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <div className="inline-block bg-lumora-green-100 text-lumora-green-700 text-sm font-medium px-4 py-2 rounded-full mb-6">
            ⚡ 40% Efficiency Boost
          </div>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-lumora-dark mb-6 leading-tight">
            {t.hero.title}
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-10 max-w-4xl leading-relaxed">
            {t.hero.subtitle}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href={localizePathForLocale('/shop', locale)} className="inline-flex items-center justify-center bg-lumora-green-500 hover:bg-lumora-green-600 text-white font-semibold px-8 py-4 rounded-xl shadow-soft hover:shadow-soft-md transition-all duration-200 text-lg">
              {t.hero.cta1}
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
            </Link>
            <Link href={localizePathForLocale('/shop', locale)} className="inline-flex items-center justify-center bg-white hover:bg-lumora-green-50 text-lumora-green-500 border-2 border-lumora-green-500 font-semibold px-8 py-4 rounded-xl transition-all duration-200 text-lg">
              {t.hero.cta2}
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-6 md:px-8">
          <div className="mb-16">
            <h2 className="font-display text-3xl md:text-4xl text-lumora-dark mb-6">{t.intro.title}</h2>
            {t.intro.content.map((p, i) => <p key={i} className="text-lg md:text-xl text-gray-700 mb-6 leading-relaxed">{p}</p>)}
          </div>

          {/* Time-Motion Study */}
          <div className="mb-16 p-8 bg-lumora-green-50 rounded-2xl border-2 border-lumora-green-200">
            <h2 className="font-display text-3xl md:text-4xl text-lumora-dark mb-6">{t.timeMotion.title}</h2>
            {t.timeMotion.content.map((p, i) => <p key={i} className="text-lg text-gray-700 mb-6 leading-relaxed">{p}</p>)}

            <div className="mt-8 overflow-x-auto">
              <table className="w-full bg-white rounded-xl shadow-soft overflow-hidden">
                <thead className="bg-lumora-dark text-white">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold">Stap</th>
                    <th className="px-4 py-3 text-right font-semibold">Plastic</th>
                    <th className="px-4 py-3 text-right font-semibold">Paper</th>
                    <th className="px-4 py-3 text-right font-semibold">Besparing</th>
                  </tr>
                </thead>
                <tbody>
                  {t.timeMotion.comparisonData.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                      <td className="px-4 py-3 font-medium text-lumora-dark">{row.aspect}</td>
                      <td className="px-4 py-3 text-right text-gray-700">{row.plastic}</td>
                      <td className="px-4 py-3 text-right text-lumora-green-600 font-semibold">{row.paper}</td>
                      <td className="px-4 py-3 text-right text-lumora-green-700 font-bold">{row.savings}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Workflow Steps Comparison */}
          <div className="mb-16">
            <h2 className="font-display text-3xl md:text-4xl text-lumora-dark mb-8">{t.workflowSteps.title}</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gray-100 p-6 rounded-xl border-2 border-gray-300">
                <h3 className="text-xl font-bold text-gray-700 mb-4">{t.workflowSteps.plastic.title}</h3>
                {t.workflowSteps.plastic.steps.map((s, i) => (
                  <div key={i} className="mb-4 pb-4 border-b border-gray-300 last:border-0">
                    <div className="flex justify-between mb-2">
                      <span className="font-semibold text-gray-800">{s.step}</span>
                      <span className="text-gray-600 font-mono">{s.time}</span>
                    </div>
                    <p className="text-sm text-gray-600">{s.description}</p>
                  </div>
                ))}
              </div>

              <div className="bg-lumora-green-50 p-6 rounded-xl border-2 border-lumora-green-300">
                <h3 className="text-xl font-bold text-lumora-green-700 mb-4">{t.workflowSteps.paper.title}</h3>
                {t.workflowSteps.paper.steps.map((s, i) => (
                  <div key={i} className="mb-4 pb-4 border-b border-lumora-green-200 last:border-0">
                    <div className="flex justify-between mb-2">
                      <span className="font-semibold text-lumora-dark">{s.step}</span>
                      <span className="text-lumora-green-600 font-mono font-bold">{s.time}</span>
                    </div>
                    <p className="text-sm text-gray-700">{s.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Savings per Scale */}
          <div className="mb-16">
            <h2 className="font-display text-3xl md:text-4xl text-lumora-dark mb-6">{t.savings.title}</h2>
            {t.savings.content.map((p, i) => <p key={i} className="text-lg text-gray-700 mb-6 leading-relaxed">{p}</p>)}

            <div className="space-y-4 mt-8">
              {t.savings.calculations.map((calc, i) => (
                <div key={i} className="bg-white p-6 rounded-xl shadow-soft border-l-4 border-lumora-green-500">
                  <h4 className="text-lg font-bold text-lumora-dark mb-3">{calc.scenario}</h4>
                  <p className="text-gray-700 leading-relaxed">{calc.data}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Mid-Content CTA */}
          <div className="my-16 p-8 bg-lumora-dark text-white rounded-2xl shadow-soft-lg text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              {locale === 'nl' ? 'Bereken uw specifieke arbeidsbesparing' : locale === 'de' ? 'Berechnen Sie Ihre spezifische Arbeitsersparnis' : 'Calculate your specific labor savings'}
            </h3>
            <p className="text-lg mb-6 opacity-90">
              {locale === 'nl' ? 'Gratis consultatie met workflow analyse en ROI-berekening.' : locale === 'de' ? 'Kostenlose Beratung mit Workflow-Analyse und ROI-Berechnung.' : 'Free consultation with workflow analysis and ROI calculation.'}
            </p>
            <Link href={localizePathForLocale('/shop', locale)} className="inline-flex items-center justify-center bg-lumora-green-500 hover:bg-lumora-green-600 text-white font-semibold px-8 py-4 rounded-xl shadow-soft hover:shadow-soft-md transition-all duration-200">
              {t.nextSteps.ctaText}
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
            </Link>
          </div>

          {/* Quality Benefits */}
          <div className="mb-16 p-8 bg-lumora-gold-50 rounded-2xl">
            <h2 className="font-display text-3xl md:text-4xl text-lumora-dark mb-6">{t.qualityBenefits.title}</h2>
            {t.qualityBenefits.content.map((p, i) => <p key={i} className="text-lg text-gray-700 mb-6 leading-relaxed">{p}</p>)}
          </div>

          {/* Scalability & Implementation */}
          <div className="mb-16">
            <h2 className="font-display text-3xl md:text-4xl text-lumora-dark mb-6">{t.scalability.title}</h2>
            {t.scalability.content.map((p, i) => <p key={i} className="text-lg text-gray-700 mb-6 leading-relaxed">{p}</p>)}
          </div>

          <div className="mb-16">
            <h2 className="font-display text-3xl md:text-4xl text-lumora-dark mb-6">{t.implementation.title}</h2>
            {t.implementation.content.map((p, i) => <p key={i} className="text-lg text-gray-700 mb-6 leading-relaxed">{p}</p>)}
          </div>

          <div className="mb-16">
            <h2 className="font-display text-3xl md:text-4xl text-lumora-dark mb-6">{t.nextSteps.title}</h2>
            {t.nextSteps.content.map((p, i) => <p key={i} className="text-lg text-gray-700 mb-6 leading-relaxed">{p}</p>)}
          </div>
        </div>
      </section>

      {/* Related Articles */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <h2 className="font-display text-3xl md:text-4xl text-lumora-dark mb-8">{t.relatedArticles.title}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.relatedArticles.articles.map((article, i) => (
              <Link key={i} href={article.href} className="block p-6 bg-lumora-cream rounded-xl shadow-soft hover:shadow-soft-md transition-all duration-300 group">
                <h3 className="text-lg font-semibold text-lumora-dark group-hover:text-lumora-green-500 transition-colors mb-2">{article.title}</h3>
                <span className="inline-flex items-center text-lumora-green-500 mt-3 group-hover:translate-x-1 transition-transform">
                  {locale === 'nl' ? 'Lees meer' : locale === 'de' ? 'Mehr lesen' : 'Read more'}
                  <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 md:py-20 bg-lumora-dark text-white">
        <div className="max-w-4xl mx-auto px-6 md:px-8 text-center">
          <h2 className="font-display text-3xl md:text-4xl mb-6">{t.finalCta.title}</h2>
          <p className="text-xl mb-10 opacity-90">{t.finalCta.subtitle}</p>
          <Link href={localizePathForLocale('/shop', locale)} className="inline-flex items-center justify-center bg-lumora-green-500 hover:bg-lumora-green-600 text-white font-semibold px-10 py-5 rounded-xl shadow-soft-lg hover:shadow-glow-green transition-all duration-300 text-lg">
            {t.finalCta.ctaText}
            <svg className="ml-3 w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
          </Link>
        </div>
      </section>
    </main>
  )
}

import { Metadata } from 'next';
import Link from 'next/link';
import { localizePathForLocale } from '@/lib/url-localizations';

interface Props {
  params: { locale: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;

  const metadata: Record<string, any> = {
    nl: {
      title: 'Automatisering in Propagatie met Paper Plugs | Innovatie in Kweek | Lumora',
      description: 'Ontdek hoe automatisering met paper plug trays uw propagatieproces optimaliseert. Van geautomatiseerde zaaiers tot robotica - de toekomst van efficiënte zaadvermeerdering.',
      keywords: 'automatisering propagatie, geautomatiseerde zaaiers, robotica tuinbouw, paper plug automatisering, smart greenhouse, precision agriculture, IoT kweek, industrie 4.0 tuinbouw'
    },
    en: {
      title: 'Automation in Propagation with Paper Plugs | Growing Innovation | Lumora',
      description: 'Discover how automation with paper plug trays optimizes your propagation process. From automated seeders to robotics - the future of efficient seed propagation.',
      keywords: 'propagation automation, automated seeders, horticultural robotics, paper plug automation, smart greenhouse, precision agriculture, IoT growing, industry 4.0 horticulture'
    },
    de: {
      title: 'Automatisierung in der Vermehrung mit Paper Plugs | Innovation | Lumora',
      description: 'Entdecken Sie, wie Automatisierung mit Paper Plug Trays Ihren Vermehrungsprozess optimiert. Von automatischen Sämaschinen bis Robotik - die Zukunft der effizienten Saatgutvermehrung.',
      keywords: 'Automatisierung Vermehrung, automatische Sämaschinen, Gartenbau Robotik, Paper Plug Automatisierung, Smart Greenhouse, Präzisionslandwirtschaft, IoT Anbau, Industrie 4.0 Gartenbau'
    }
  };

  const { title, description, keywords } = metadata[locale] || metadata.nl;

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: `https://lumorahorticulture.nl/innovatie-trends/automatisering-propagatie`,
      languages: {
        'nl': 'https://lumorahorticulture.nl/innovatie-trends/automatisering-propagatie',
        'en': 'https://lumorahorticulture.com/seo/innovation-trends/propagation-automation',
        'de': 'https://lumorahorticulture.de/seo/innovation-trends/vermehrung-automatisierung'
      }
    },
    openGraph: {
      title,
      description,
      type: 'article',
      url: `https://lumorahorticulture.nl/innovatie-trends/automatisering-propagatie`
    }
  };
}

export default function AutomatiseringPropagatieNL({ params }: Props) {
  const { locale } = params;

  const content = {
    nl: {
      hero: {
        title: 'Automatisering in Propagatie',
        subtitle: 'De toekomst van efficiënte zaadvermeerdering met paper plug technologie',
        description: 'Ontdek hoe automatisering en robotica uw propagatieproces transformeren naar industrie 4.0 standaarden'
      },
      intro: {
        title: 'Waarom Automatisering Essentieel is',
        paragraphs: [
          'De tuinbouwsector staat voor grote uitdagingen: arbeidstekorten, stijgende kosten en toenemende vraag naar consistente kwaliteit. Automatisering biedt de oplossing door repetitieve taken over te nemen en menselijke fouten te minimaliseren.',
          'Paper plug trays zijn speciaal ontworpen voor geautomatiseerde systemen. Hun uniforme vorm, compatibiliteit met mechanische handling en optimale gripper-vriendelijkheid maken ze ideaal voor moderne propagatielijnen.',
          'Bedrijven die investeren in automatisering zien gemiddeld 40% kostenreductie op arbeid, 25% snellere doorlooptijd en 30% hogere uniformiteit in hun jonge planten.'
        ]
      },
      benefits: {
        title: 'Voordelen van Geautomatiseerde Propagatie',
        items: [
          {
            icon: '🤖',
            title: 'Robotische Precisie',
            description: 'Consistente zaainauwkeurigheid van 99.8% elimineert menselijke variabiliteit. Geautomatiseerde systemen plaatsen elk zaad op de optimale diepte en positie.'
          },
          {
            icon: '⚡',
            title: 'Verhoogde Capaciteit',
            description: '24/7 productie mogelijk met output tot 10.000 trays per dag. Flexibele schaalvergroting zonder evenredige personeelsuitbreiding.'
          },
          {
            icon: '📊',
            title: 'Real-Time Data',
            description: 'IoT-sensoren monitoren elke stap: zaaddiepte, vochtgehalte, temperatuur. Directe feedback loop voor procesoptimalisatie.'
          },
          {
            icon: '💰',
            title: 'ROI binnen 2 jaar',
            description: 'Gemiddelde terugverdientijd van 18-24 maanden door arbeidsreductie, afvalvermindering en hogere doorvoer.'
          },
          {
            icon: '🌱',
            title: 'Verbeterde Uniformiteit',
            description: '95%+ kiemingsuniformiteit door gestandaardiseerde handling. Minder variatie betekent voorspelbare oogstplanning.'
          },
          {
            icon: '🔧',
            title: 'Flexibele Productie',
            description: 'Snelle omsteltijden tussen cultivars (<5 minuten). Pre-programmeerbare recepten voor verschillende gewassen.'
          }
        ]
      },
      technologies: {
        title: 'Automatiseringstechnologieën voor Paper Plugs',
        systems: [
          {
            title: '1. Geautomatiseerde Zaaimachines',
            description: 'Moderne precisiezaaiers verwerken 500-1000 trays per uur met minimale zaadverspilling.',
            features: [
              'Vacuüm-gebaseerde zaadopname voor uniforme plaatsing',
              'Vision systemen voor zaadherkenning en kwaliteitscontrole',
              'Automatische diepteaanpassing per gewastype',
              'Integratie met paper plug vulstations'
            ],
            specs: 'Nauwkeurigheid: 99.5% | Snelheid: 800 trays/uur | Zaadverbruik: -15%'
          },
          {
            title: '2. Robotische Handling Systemen',
            description: 'Collaborative robots (cobots) en gantry systemen voor transport en stacking.',
            features: [
              'Zachte grippers aangepast voor paper plugs (geen beschadiging)',
              'Automatische tray detectie en oriëntatie correctie',
              '3D vision voor stapelpositie optimalisatie',
              'Geïntegreerde gewicht-sensors voor vulling controle'
            ],
            specs: 'Cyclustijd: 3-5 sec/tray | Payload: 5-10 kg | Precisie: ±0.5mm'
          },
          {
            title: '3. Klimaatgestuurde Groeikasten',
            description: 'Smart propagation chambers met AI-gestuurde klimaatregeling.',
            features: [
              'Multispectrale LED-belichting met dynamische recepten',
              'Verdampingskoeling gekoppeld aan plantbehoefte',
              'CO₂-dosering op basis van fotosynthese-activiteit',
              'Predictive analytics voor optimale doorstroming'
            ],
            specs: 'Klimaatuniformiteit: ±0.5°C | Energiebesparing: 30% | Uptime: 99.5%'
          },
          {
            title: '4. Geïntegreerde Watersystemen',
            description: 'Automatische irrigatie afgestemd op paper plug eigenschappen.',
            features: [
              'Drip-irrigatie met individuele tray-sensoren',
              'Vochtigheids-mapping via capacitieve sensors',
              'Fertigatie met EC/pH realtime monitoring',
              'Automatische flush-cycli voor wortelgezondheid'
            ],
            specs: 'Waterverbruik: -40% vs. handmatig | Uniformiteit: 98% | Drainage: 0%'
          }
        ]
      },
      implementation: {
        title: 'Implementatie Roadmap',
        intro: 'Een gefaseerde aanpak minimaliseert risico en optimaliseert ROI:',
        phases: [
          {
            phase: 'Fase 1: Assessment (maand 1-2)',
            items: [
              'Analyse huidige workflow en bottlenecks',
              'Capaciteitsberekening en groeiprognose',
              'ROI-modellering per automatiseringsscenario',
              'Selectie compatibele paper plug systemen'
            ]
          },
          {
            phase: 'Fase 2: Pilot Line (maand 3-6)',
            items: [
              'Installatie basis-automatisering (zaai + handling)',
              'Integratie met bestaande kassystemen',
              'Training personeel op nieuwe technologie',
              'Performance monitoring en data-collectie'
            ]
          },
          {
            phase: 'Fase 3: Opschaling (maand 7-12)',
            items: [
              'Uitbreiding naar volledige productielijn',
              'Implementatie advanced analytics en AI',
              'Integratie met ERP/traceability systemen',
              'Certificering voor Food Safety compliance'
            ]
          },
          {
            phase: 'Fase 4: Optimalisatie (maand 13+)',
            items: [
              'Continue verbetering op basis van data-insights',
              'Uitrol best practices naar andere afdelingen',
              'Evaluatie nieuwe technologieën (machine learning)',
              'Benchmarking en KPI-rapportage'
            ]
          }
        ]
      },
      caseStudy: {
        title: 'Case Study: 300% Capaciteitsverhoging',
        company: 'Middelgroot Propagatiebedrijf (15.000m² kas)',
        challenge: 'Onvoldoende arbeidskrachten tijdens piekproductie, hoge kosten handmatige zaai.',
        solution: 'Geautomatiseerde zaailijn met paper plug trays + robotische handling.',
        results: [
          {
            metric: 'Productie',
            before: '2.500 trays/dag',
            after: '7.500 trays/dag',
            improvement: '+300%'
          },
          {
            metric: 'Arbeidsinzet',
            before: '8 FTE',
            after: '3 FTE',
            improvement: '-62%'
          },
          {
            metric: 'Kiemingspercentage',
            before: '88%',
            after: '96%',
            improvement: '+8%'
          },
          {
            metric: 'Doorlooptijd',
            before: '21 dagen',
            after: '16 dagen',
            improvement: '-24%'
          },
          {
            metric: 'ROI',
            before: '-',
            after: '22 maanden',
            improvement: 'Target: 36 maanden'
          }
        ],
        quote: '"De combinatie van paper plugs en automatisering heeft ons bedrijf getransformeerd. We zijn flexibeler, sneller en kunnen eindelijk voldoen aan de groeiende vraag zonder kwaliteitsverlies."',
        author: 'Productiemanager'
      },
      integration: {
        title: 'Integratie met Bestaande Systemen',
        intro: 'Paper plug automatisering werkt naadloos samen met uw huidige infrastructuur:',
        systems: [
          {
            system: 'Bestaande Zaaibedden',
            compatibility: 'Paper plugs passen in standaard tray-maten (84/104/128 cellen)',
            integration: 'Retrofit mogelijk met minimale aanpassingen aan zaaimachines'
          },
          {
            system: 'Transportsystemen',
            compatibility: 'Compatibel met conveyor belts, AGVs en overhead rails',
            integration: 'Uniforme gripper-punten voor robotic handling'
          },
          {
            system: 'Klimaatcomputers',
            compatibility: 'Open protocollen (Modbus, OPC-UA) voor datauitwisseling',
            integration: 'Real-time feedback voor optimale klimaatregeling'
          },
          {
            system: 'ERP/Traceability',
            compatibility: 'Barcode/RFID-tagging per tray of batch',
            integration: 'Volledige track-and-trace van zaad tot verkoop'
          }
        ]
      },
      future: {
        title: 'Toekomstperspectief: Industrie 5.0',
        intro: 'De volgende generatie automatisering combineert mens en machine:',
        trends: [
          {
            icon: '🧠',
            trend: 'AI-Assisted Decision Making',
            description: 'Machine learning voorspelt optimale oogstmomenten en detecteert afwijkingen eerder dan menselijk oog.'
          },
          {
            icon: '🔗',
            trend: 'Blockchain Traceability',
            description: 'Onveranderbare registratie van elke stap in propagatie voor voedselzekerheid en certificering.'
          },
          {
            icon: '👥',
            trend: 'Human-Robot Collaboration',
            description: 'Cobots nemen zwaar werk over, mensen focussen op kwaliteitscontrole en strategie.'
          },
          {
            icon: '🌐',
            trend: 'Digital Twins',
            description: 'Virtuele kopie van uw operatie voor scenario-testing en predictive maintenance.'
          }
        ]
      },
      faq: {
        title: 'Veelgestelde Vragen',
        questions: [
          {
            q: 'Wat zijn de minimale investeringskosten voor basis-automatisering?',
            a: 'Een entry-level geautomatiseerde zaailijn start vanaf €75.000-€150.000 afhankelijk van capaciteit en opties. ROI wordt meestal binnen 2-3 jaar bereikt door arbeidsreductie en hogere doorvoer. Financieringsopties en subsidies (bijv. MIT) zijn beschikbaar.'
          },
          {
            q: 'Kunnen we starten met gedeeltelijke automatisering?',
            a: 'Absoluut. Een gefaseerde aanpak is zelfs aan te raden: begin met automatisering van het zaaiproces (grootste bottleneck), en breid daarna uit met handling, irrigatie en klimaatregeling. Dit spreidt investeringen en geeft tijd voor personeelstraining.'
          },
          {
            q: 'Hoe lang duurt de implementatie van een geautomatiseerd systeem?',
            a: 'Een basis-zaailijn kan in 2-3 maanden operationeel zijn. Een volledige geïntegreerde propagatielijn neemt 6-12 maanden in beslag inclusief installatietijd, commissioning, training en optimalisatie.'
          },
          {
            q: 'Welke ongoing maintenance is nodig?',
            a: 'Moderne systemen vereisen preventief onderhoud 2-4x per jaar. Veel leveranciers bieden remote monitoring en predictive maintenance. Reserveonderdelen moeten op voorraad zijn voor kritische componenten. Jaarlijkse onderhoudskosten liggen op 3-5% van aanschafwaarde.'
          },
          {
            q: 'Hoe zit het met flexibiliteit voor verschillende gewassen?',
            a: 'Geavanceerde systemen bieden pre-programmeerbare recepten per cultivar. Omsteltijd tussen gewassen is typisch 5-15 minuten. Paper plugs in verschillende cell-sizes verhogen flexibiliteit verder.'
          },
          {
            q: 'Wat als we uitbreiden naar nieuwe locaties?',
            a: 'Geautomatiseerde systemen zijn modulair schaalbaar. Data en recepten van uw eerste lijn kunnen worden gerepliceerd naar nieuwe locaties. Cloud-based centrale monitoring van meerdere vestigingen is standaard.'
          }
        ]
      },
      cta: {
        title: 'Start uw Automatiserings Journey',
        description: 'Ontdek hoe paper plug trays uw automatiseringsprojecten versnellen',
        primaryButton: 'Plan Automatiserings-Scan',
        secondaryButton: 'Download ROI Calculator'
      },
      related: {
        title: 'Gerelateerde Innovaties',
        links: [
          { text: 'Data-Driven Kweek Optimalisatie', href: '/innovatie-trends/data-driven-kweek' },
          { text: 'AI in Propagatie Management', href: '/innovatie-trends/ai-propagatie' },
          { text: 'Smart Greenhouse Integratie', href: '/seo/slimme-kas/greenhouse-integratie' }
        ]
      }
    },
    en: {
      hero: {
        title: 'Automation in Propagation',
        subtitle: 'The future of efficient seed propagation with paper plug technology',
        description: 'Discover how automation and robotics transform your propagation process to industry 4.0 standards'
      },
      intro: {
        title: 'Why Automation is Essential',
        paragraphs: [
          'The horticultural sector faces major challenges: labor shortages, rising costs, and increasing demand for consistent quality. Automation provides the solution by taking over repetitive tasks and minimizing human errors.',
          'Paper plug trays are specifically designed for automated systems. Their uniform shape, compatibility with mechanical handling, and optimal gripper-friendliness make them ideal for modern propagation lines.',
          'Companies investing in automation see an average 40% reduction in labor costs, 25% faster throughput, and 30% higher uniformity in their young plants.'
        ]
      },
      benefits: {
        title: 'Benefits of Automated Propagation',
        items: [
          {
            icon: '🤖',
            title: 'Robotic Precision',
            description: 'Consistent seeding accuracy of 99.8% eliminates human variability. Automated systems place each seed at optimal depth and position.'
          },
          {
            icon: '⚡',
            title: 'Increased Capacity',
            description: '24/7 production possible with output up to 10,000 trays per day. Flexible scaling without proportional staff expansion.'
          },
          {
            icon: '📊',
            title: 'Real-Time Data',
            description: 'IoT sensors monitor every step: seed depth, moisture content, temperature. Direct feedback loop for process optimization.'
          },
          {
            icon: '💰',
            title: 'ROI within 2 years',
            description: 'Average payback period of 18-24 months through labor reduction, waste minimization, and higher throughput.'
          },
          {
            icon: '🌱',
            title: 'Improved Uniformity',
            description: '95%+ germination uniformity through standardized handling. Less variation means predictable harvest planning.'
          },
          {
            icon: '🔧',
            title: 'Flexible Production',
            description: 'Quick changeover times between cultivars (<5 minutes). Pre-programmable recipes for different crops.'
          }
        ]
      },
      technologies: {
        title: 'Automation Technologies for Paper Plugs',
        systems: [
          {
            title: '1. Automated Seeding Machines',
            description: 'Modern precision seeders process 500-1000 trays per hour with minimal seed waste.',
            features: [
              'Vacuum-based seed pickup for uniform placement',
              'Vision systems for seed recognition and quality control',
              'Automatic depth adjustment per crop type',
              'Integration with paper plug filling stations'
            ],
            specs: 'Accuracy: 99.5% | Speed: 800 trays/hour | Seed usage: -15%'
          },
          {
            title: '2. Robotic Handling Systems',
            description: 'Collaborative robots (cobots) and gantry systems for transport and stacking.',
            features: [
              'Soft grippers adapted for paper plugs (no damage)',
              'Automatic tray detection and orientation correction',
              '3D vision for stack position optimization',
              'Integrated weight sensors for fill control'
            ],
            specs: 'Cycle time: 3-5 sec/tray | Payload: 5-10 kg | Precision: ±0.5mm'
          },
          {
            title: '3. Climate-Controlled Growth Chambers',
            description: 'Smart propagation chambers with AI-driven climate control.',
            features: [
              'Multispectral LED lighting with dynamic recipes',
              'Evaporative cooling linked to plant needs',
              'CO₂ dosing based on photosynthesis activity',
              'Predictive analytics for optimal flow-through'
            ],
            specs: 'Climate uniformity: ±0.5°C | Energy saving: 30% | Uptime: 99.5%'
          },
          {
            title: '4. Integrated Water Systems',
            description: 'Automatic irrigation tuned to paper plug characteristics.',
            features: [
              'Drip irrigation with individual tray sensors',
              'Moisture mapping via capacitive sensors',
              'Fertigation with EC/pH real-time monitoring',
              'Automatic flush cycles for root health'
            ],
            specs: 'Water usage: -40% vs. manual | Uniformity: 98% | Drainage: 0%'
          }
        ]
      },
      implementation: {
        title: 'Implementation Roadmap',
        intro: 'A phased approach minimizes risk and optimizes ROI:',
        phases: [
          {
            phase: 'Phase 1: Assessment (months 1-2)',
            items: [
              'Analysis of current workflow and bottlenecks',
              'Capacity calculation and growth forecast',
              'ROI modeling per automation scenario',
              'Selection of compatible paper plug systems'
            ]
          },
          {
            phase: 'Phase 2: Pilot Line (months 3-6)',
            items: [
              'Installation of basic automation (seeding + handling)',
              'Integration with existing greenhouse systems',
              'Staff training on new technology',
              'Performance monitoring and data collection'
            ]
          },
          {
            phase: 'Phase 3: Scaling (months 7-12)',
            items: [
              'Expansion to full production line',
              'Implementation of advanced analytics and AI',
              'Integration with ERP/traceability systems',
              'Certification for Food Safety compliance'
            ]
          },
          {
            phase: 'Phase 4: Optimization (month 13+)',
            items: [
              'Continuous improvement based on data insights',
              'Rollout of best practices to other departments',
              'Evaluation of new technologies (machine learning)',
              'Benchmarking and KPI reporting'
            ]
          }
        ]
      },
      caseStudy: {
        title: 'Case Study: 300% Capacity Increase',
        company: 'Medium-Sized Propagation Company (15,000m² greenhouse)',
        challenge: 'Insufficient workforce during peak production, high manual seeding costs.',
        solution: 'Automated seeding line with paper plug trays + robotic handling.',
        results: [
          {
            metric: 'Production',
            before: '2,500 trays/day',
            after: '7,500 trays/day',
            improvement: '+300%'
          },
          {
            metric: 'Labor Input',
            before: '8 FTE',
            after: '3 FTE',
            improvement: '-62%'
          },
          {
            metric: 'Germination Rate',
            before: '88%',
            after: '96%',
            improvement: '+8%'
          },
          {
            metric: 'Lead Time',
            before: '21 days',
            after: '16 days',
            improvement: '-24%'
          },
          {
            metric: 'ROI',
            before: '-',
            after: '22 months',
            improvement: 'Target: 36 months'
          }
        ],
        quote: '"The combination of paper plugs and automation has transformed our business. We are more flexible, faster, and can finally meet growing demand without quality loss."',
        author: 'Production Manager'
      },
      integration: {
        title: 'Integration with Existing Systems',
        intro: 'Paper plug automation works seamlessly with your current infrastructure:',
        systems: [
          {
            system: 'Existing Seeding Beds',
            compatibility: 'Paper plugs fit standard tray sizes (84/104/128 cells)',
            integration: 'Retrofit possible with minimal adjustments to seeding machines'
          },
          {
            system: 'Transport Systems',
            compatibility: 'Compatible with conveyor belts, AGVs, and overhead rails',
            integration: 'Uniform gripper points for robotic handling'
          },
          {
            system: 'Climate Computers',
            compatibility: 'Open protocols (Modbus, OPC-UA) for data exchange',
            integration: 'Real-time feedback for optimal climate control'
          },
          {
            system: 'ERP/Traceability',
            compatibility: 'Barcode/RFID tagging per tray or batch',
            integration: 'Full track-and-trace from seed to sale'
          }
        ]
      },
      future: {
        title: 'Future Perspective: Industry 5.0',
        intro: 'The next generation of automation combines human and machine:',
        trends: [
          {
            icon: '🧠',
            trend: 'AI-Assisted Decision Making',
            description: 'Machine learning predicts optimal harvest moments and detects deviations earlier than human eye.'
          },
          {
            icon: '🔗',
            trend: 'Blockchain Traceability',
            description: 'Immutable registration of every propagation step for food safety and certification.'
          },
          {
            icon: '👥',
            trend: 'Human-Robot Collaboration',
            description: 'Cobots take over heavy work, humans focus on quality control and strategy.'
          },
          {
            icon: '🌐',
            trend: 'Digital Twins',
            description: 'Virtual copy of your operation for scenario testing and predictive maintenance.'
          }
        ]
      },
      faq: {
        title: 'Frequently Asked Questions',
        questions: [
          {
            q: 'What are the minimum investment costs for basic automation?',
            a: 'An entry-level automated seeding line starts from €75,000-€150,000 depending on capacity and options. ROI is typically achieved within 2-3 years through labor reduction and higher throughput. Financing options and subsidies are available.'
          },
          {
            q: 'Can we start with partial automation?',
            a: 'Absolutely. A phased approach is even recommended: start with automating the seeding process (biggest bottleneck), then expand with handling, irrigation, and climate control. This spreads investments and allows time for staff training.'
          },
          {
            q: 'How long does implementation of an automated system take?',
            a: 'A basic seeding line can be operational in 2-3 months. A fully integrated propagation line takes 6-12 months including installation, commissioning, training, and optimization.'
          },
          {
            q: 'What ongoing maintenance is required?',
            a: 'Modern systems require preventive maintenance 2-4 times per year. Many suppliers offer remote monitoring and predictive maintenance. Spare parts should be in stock for critical components. Annual maintenance costs are 3-5% of purchase value.'
          },
          {
            q: 'What about flexibility for different crops?',
            a: 'Advanced systems offer pre-programmable recipes per cultivar. Changeover time between crops is typically 5-15 minutes. Paper plugs in different cell sizes further increase flexibility.'
          },
          {
            q: 'What if we expand to new locations?',
            a: 'Automated systems are modularly scalable. Data and recipes from your first line can be replicated to new locations. Cloud-based central monitoring of multiple sites is standard.'
          }
        ]
      },
      cta: {
        title: 'Start Your Automation Journey',
        description: 'Discover how paper plug trays accelerate your automation projects',
        primaryButton: 'Plan Automation Scan',
        secondaryButton: 'Download ROI Calculator'
      },
      related: {
        title: 'Related Innovations',
        links: [
          { text: 'Data-Driven Growing Optimization', href: '/seo/innovation-trends/data-driven-growing' },
          { text: 'AI in Propagation Management', href: '/seo/innovation-trends/ai-propagation' },
          { text: 'Smart Greenhouse Integration', href: '/seo/smart-greenhouse/greenhouse-integration' }
        ]
      }
    },
    de: {
      hero: {
        title: 'Automatisierung in der Vermehrung',
        subtitle: 'Die Zukunft der effizienten Saatgutvermehrung mit Paper Plug Technologie',
        description: 'Entdecken Sie, wie Automatisierung und Robotik Ihren Vermehrungsprozess zu Industrie 4.0 Standards transformieren'
      },
      intro: {
        title: 'Warum Automatisierung Essentiell ist',
        paragraphs: [
          'Der Gartenbausektor steht vor großen Herausforderungen: Arbeitskräftemangel, steigende Kosten und zunehmende Nachfrage nach konsistenter Qualität. Automatisierung bietet die Lösung durch Übernahme repetitiver Aufgaben und Minimierung menschlicher Fehler.',
          'Paper Plug Trays sind speziell für automatisierte Systeme konzipiert. Ihre einheitliche Form, Kompatibilität mit mechanischer Handhabung und optimale Greifer-Freundlichkeit machen sie ideal für moderne Vermehrungslinien.',
          'Unternehmen, die in Automatisierung investieren, verzeichnen durchschnittlich 40% Kostenreduktion bei Arbeit, 25% schnellere Durchlaufzeit und 30% höhere Uniformität bei ihren Jungpflanzen.'
        ]
      },
      benefits: {
        title: 'Vorteile Automatisierter Vermehrung',
        items: [
          {
            icon: '🤖',
            title: 'Robotische Präzision',
            description: 'Konsistente Saatgenauigkeit von 99,8% eliminiert menschliche Variabilität. Automatisierte Systeme platzieren jedes Saatkorn in optimaler Tiefe und Position.'
          },
          {
            icon: '⚡',
            title: 'Erhöhte Kapazität',
            description: '24/7 Produktion möglich mit Output bis zu 10.000 Trays pro Tag. Flexible Skalierung ohne proportionale Personalerweiterung.'
          },
          {
            icon: '📊',
            title: 'Echtzeit-Daten',
            description: 'IoT-Sensoren überwachen jeden Schritt: Saattiefe, Feuchtigkeitsgehalt, Temperatur. Direkter Feedback-Loop für Prozessoptimierung.'
          },
          {
            icon: '💰',
            title: 'ROI innerhalb 2 Jahren',
            description: 'Durchschnittliche Amortisationszeit von 18-24 Monaten durch Arbeitsreduktion, Abfallminimierung und höheren Durchsatz.'
          },
          {
            icon: '🌱',
            title: 'Verbesserte Uniformität',
            description: '95%+ Keimungsuniformität durch standardisierte Handhabung. Weniger Variation bedeutet vorhersehbare Ernteplanung.'
          },
          {
            icon: '🔧',
            title: 'Flexible Produktion',
            description: 'Schnelle Umrüstzeiten zwischen Sorten (<5 Minuten). Vorprogrammierbare Rezepte für verschiedene Kulturen.'
          }
        ]
      },
      technologies: {
        title: 'Automatisierungstechnologien für Paper Plugs',
        systems: [
          {
            title: '1. Automatische Sämaschinen',
            description: 'Moderne Präzisionssämaschinen verarbeiten 500-1000 Trays pro Stunde mit minimalem Saatgutverlust.',
            features: [
              'Vakuum-basierte Saatgutaufnahme für einheitliche Platzierung',
              'Vision-Systeme für Saatguterkennung und Qualitätskontrolle',
              'Automatische Tiefenanpassung pro Kulturart',
              'Integration mit Paper Plug Füllstationen'
            ],
            specs: 'Genauigkeit: 99,5% | Geschwindigkeit: 800 Trays/Std. | Saatgutverbrauch: -15%'
          },
          {
            title: '2. Robotische Handhabungssysteme',
            description: 'Kollaborative Roboter (Cobots) und Portalsysteme für Transport und Stapelung.',
            features: [
              'Weiche Greifer angepasst für Paper Plugs (keine Beschädigung)',
              'Automatische Tray-Erkennung und Orientierungskorrektur',
              '3D-Vision für Stapelpositionsoptimierung',
              'Integrierte Gewichtssensoren für Füllkontrolle'
            ],
            specs: 'Zykluszeit: 3-5 Sek./Tray | Nutzlast: 5-10 kg | Präzision: ±0,5mm'
          },
          {
            title: '3. Klimagesteuerte Wachstumskammern',
            description: 'Smarte Vermehrungskammern mit KI-gesteuerter Klimaregulierung.',
            features: [
              'Multispektrale LED-Beleuchtung mit dynamischen Rezepten',
              'Verdunstungskühlung gekoppelt an Pflanzenbedarf',
              'CO₂-Dosierung basierend auf Photosynthese-Aktivität',
              'Predictive Analytics für optimalen Durchfluss'
            ],
            specs: 'Klimauniformität: ±0,5°C | Energieeinsparung: 30% | Betriebszeit: 99,5%'
          },
          {
            title: '4. Integrierte Wassersysteme',
            description: 'Automatische Bewässerung abgestimmt auf Paper Plug Eigenschaften.',
            features: [
              'Tropfbewässerung mit individuellen Tray-Sensoren',
              'Feuchtigkeitsmapping via kapazitive Sensoren',
              'Fertigation mit EC/pH Echtzeit-Monitoring',
              'Automatische Spülzyklen für Wurzelgesundheit'
            ],
            specs: 'Wasserverbrauch: -40% vs. manuell | Uniformität: 98% | Drainage: 0%'
          }
        ]
      },
      implementation: {
        title: 'Implementierungs-Roadmap',
        intro: 'Ein phasenweiser Ansatz minimiert Risiko und optimiert ROI:',
        phases: [
          {
            phase: 'Phase 1: Assessment (Monat 1-2)',
            items: [
              'Analyse aktueller Workflow und Engpässe',
              'Kapazitätsberechnung und Wachstumsprognose',
              'ROI-Modellierung pro Automatisierungsszenario',
              'Auswahl kompatibler Paper Plug Systeme'
            ]
          },
          {
            phase: 'Phase 2: Pilot-Linie (Monat 3-6)',
            items: [
              'Installation Basis-Automatisierung (Aussaat + Handling)',
              'Integration mit bestehenden Gewächshaussystemen',
              'Schulung Personal auf neue Technologie',
              'Performance-Monitoring und Datensammlung'
            ]
          },
          {
            phase: 'Phase 3: Skalierung (Monat 7-12)',
            items: [
              'Erweiterung auf vollständige Produktionslinie',
              'Implementierung fortschrittlicher Analytics und KI',
              'Integration mit ERP/Rückverfolgbarkeitssystemen',
              'Zertifizierung für Food Safety Compliance'
            ]
          },
          {
            phase: 'Phase 4: Optimierung (Monat 13+)',
            items: [
              'Kontinuierliche Verbesserung basierend auf Daten-Insights',
              'Rollout Best Practices zu anderen Abteilungen',
              'Evaluierung neuer Technologien (Machine Learning)',
              'Benchmarking und KPI-Berichterstattung'
            ]
          }
        ]
      },
      caseStudy: {
        title: 'Fallstudie: 300% Kapazitätserhöhung',
        company: 'Mittelständisches Vermehrungsunternehmen (15.000m² Gewächshaus)',
        challenge: 'Unzureichende Arbeitskräfte während Spitzenproduktion, hohe Kosten manuelle Aussaat.',
        solution: 'Automatisierte Saatlinie mit Paper Plug Trays + robotische Handhabung.',
        results: [
          {
            metric: 'Produktion',
            before: '2.500 Trays/Tag',
            after: '7.500 Trays/Tag',
            improvement: '+300%'
          },
          {
            metric: 'Arbeitseinsatz',
            before: '8 Vollzeitkräfte',
            after: '3 Vollzeitkräfte',
            improvement: '-62%'
          },
          {
            metric: 'Keimungsrate',
            before: '88%',
            after: '96%',
            improvement: '+8%'
          },
          {
            metric: 'Durchlaufzeit',
            before: '21 Tage',
            after: '16 Tage',
            improvement: '-24%'
          },
          {
            metric: 'ROI',
            before: '-',
            after: '22 Monate',
            improvement: 'Ziel: 36 Monate'
          }
        ],
        quote: '"Die Kombination aus Paper Plugs und Automatisierung hat unser Unternehmen transformiert. Wir sind flexibler, schneller und können endlich der wachsenden Nachfrage ohne Qualitätsverlust gerecht werden."',
        author: 'Produktionsleiter'
      },
      integration: {
        title: 'Integration mit Bestehenden Systemen',
        intro: 'Paper Plug Automatisierung arbeitet nahtlos mit Ihrer aktuellen Infrastruktur zusammen:',
        systems: [
          {
            system: 'Bestehende Saatbeete',
            compatibility: 'Paper Plugs passen in Standard-Tray-Größen (84/104/128 Zellen)',
            integration: 'Retrofit möglich mit minimalen Anpassungen an Sämaschinen'
          },
          {
            system: 'Transportsysteme',
            compatibility: 'Kompatibel mit Förderbändern, AGVs und Overhead-Schienen',
            integration: 'Einheitliche Greiferpunkte für robotische Handhabung'
          },
          {
            system: 'Klimacomputer',
            compatibility: 'Offene Protokolle (Modbus, OPC-UA) für Datenaustausch',
            integration: 'Echtzeit-Feedback für optimale Klimaregelung'
          },
          {
            system: 'ERP/Rückverfolgbarkeit',
            compatibility: 'Barcode/RFID-Tagging pro Tray oder Charge',
            integration: 'Vollständige Track-and-Trace von Saatgut bis Verkauf'
          }
        ]
      },
      future: {
        title: 'Zukunftsperspektive: Industrie 5.0',
        intro: 'Die nächste Generation der Automatisierung kombiniert Mensch und Maschine:',
        trends: [
          {
            icon: '🧠',
            trend: 'KI-Unterstützte Entscheidungsfindung',
            description: 'Machine Learning prognostiziert optimale Erntemomente und erkennt Abweichungen früher als das menschliche Auge.'
          },
          {
            icon: '🔗',
            trend: 'Blockchain-Rückverfolgbarkeit',
            description: 'Unveränderliche Registrierung jedes Schritts in der Vermehrung für Lebensmittelsicherheit und Zertifizierung.'
          },
          {
            icon: '👥',
            trend: 'Mensch-Roboter-Kollaboration',
            description: 'Cobots übernehmen schwere Arbeit, Menschen konzentrieren sich auf Qualitätskontrolle und Strategie.'
          },
          {
            icon: '🌐',
            trend: 'Digitale Zwillinge',
            description: 'Virtuelle Kopie Ihrer Operation für Szenario-Tests und vorausschauende Wartung.'
          }
        ]
      },
      faq: {
        title: 'Häufig Gestellte Fragen',
        questions: [
          {
            q: 'Was sind die minimalen Investitionskosten für Basis-Automatisierung?',
            a: 'Eine Einstiegs-Automatisierungslinie beginnt ab €75.000-€150.000 abhängig von Kapazität und Optionen. ROI wird typischerweise innerhalb 2-3 Jahren durch Arbeitsreduktion und höheren Durchsatz erreicht. Finanzierungsoptionen und Subventionen sind verfügbar.'
          },
          {
            q: 'Können wir mit teilweiser Automatisierung starten?',
            a: 'Absolut. Ein phasenweiser Ansatz ist sogar empfehlenswert: Beginnen Sie mit Automatisierung des Saatprozesses (größter Engpass), dann erweitern Sie mit Handling, Bewässerung und Klimaregelung. Dies verteilt Investitionen und gibt Zeit für Personalschulung.'
          },
          {
            q: 'Wie lange dauert die Implementierung eines automatisierten Systems?',
            a: 'Eine Basis-Saatlinie kann in 2-3 Monaten betriebsbereit sein. Eine vollständig integrierte Vermehrungslinie benötigt 6-12 Monate einschließlich Installation, Inbetriebnahme, Schulung und Optimierung.'
          },
          {
            q: 'Welche laufende Wartung ist erforderlich?',
            a: 'Moderne Systeme benötigen präventive Wartung 2-4 Mal pro Jahr. Viele Anbieter bieten Remote-Monitoring und vorausschauende Wartung. Ersatzteile sollten für kritische Komponenten vorrätig sein. Jährliche Wartungskosten liegen bei 3-5% des Anschaffungswertes.'
          },
          {
            q: 'Wie steht es mit Flexibilität für verschiedene Kulturen?',
            a: 'Fortschrittliche Systeme bieten vorprogrammierbare Rezepte pro Sorte. Umrüstzeit zwischen Kulturen beträgt typischerweise 5-15 Minuten. Paper Plugs in verschiedenen Zellgrößen erhöhen Flexibilität weiter.'
          },
          {
            q: 'Was wenn wir auf neue Standorte erweitern?',
            a: 'Automatisierte Systeme sind modular skalierbar. Daten und Rezepte von Ihrer ersten Linie können auf neue Standorte repliziert werden. Cloud-basiertes zentrales Monitoring mehrerer Standorte ist Standard.'
          }
        ]
      },
      cta: {
        title: 'Starten Sie Ihre Automatisierungs-Reise',
        description: 'Entdecken Sie, wie Paper Plug Trays Ihre Automatisierungsprojekte beschleunigen',
        primaryButton: 'Automatisierungs-Scan Planen',
        secondaryButton: 'ROI-Rechner Herunterladen'
      },
      related: {
        title: 'Verwandte Innovationen',
        links: [
          { text: 'Datengesteuerte Anbauoptimierung', href: '/seo/innovation-trends/datengesteuerter-anbau' },
          { text: 'KI in Vermehrungsmanagement', href: '/seo/innovation-trends/ki-vermehrung' },
          { text: 'Smart Greenhouse Integration', href: '/seo/smart-greenhouse/gewachshaus-integration' }
        ]
      }
    }
  };

  const t = content[locale as keyof typeof content] || content.nl;

  return (
    <main className="min-h-screen bg-gradient-to-b from-white via-lumora-cream/30 to-white">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-lumora-green-500/5 via-transparent to-lumora-gold/5" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block px-4 py-2 bg-lumora-green-500/10 rounded-full mb-6">
              <span className="text-lumora-green-500 font-semibold text-sm">
                {locale === 'nl' ? 'Innovatie' : locale === 'de' ? 'Innovation' : 'Innovation'} • {locale === 'nl' ? 'Industrie 4.0' : 'Industry 4.0'}
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-bold text-lumora-dark mb-6">
              {t.hero.title}
            </h1>
            <p className="text-xl md:text-2xl text-lumora-dark/70 mb-8">
              {t.hero.subtitle}
            </p>
            <p className="text-lg text-lumora-dark/60 max-w-3xl mx-auto">
              {t.hero.description}
            </p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-lumora-dark mb-8">
              {t.intro.title}
            </h2>
            <div className="prose prose-lg max-w-none space-y-6">
              {t.intro.paragraphs.map((paragraph, index) => (
                <p key={index} className="text-lumora-dark/80 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-16 bg-lumora-cream/20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-lumora-dark mb-12 text-center">
            {t.benefits.title}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {t.benefits.items.map((benefit, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-soft-md hover:shadow-soft-lg transition-shadow">
                <div className="text-5xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-bold text-lumora-dark mb-3">
                  {benefit.title}
                </h3>
                <p className="text-lumora-dark/70 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-lumora-dark mb-12 text-center">
              {t.technologies.title}
            </h2>
            <div className="space-y-12">
              {t.technologies.systems.map((system, index) => (
                <div key={index} className="bg-gradient-to-br from-lumora-cream/30 to-white rounded-2xl p-8 border border-lumora-green-500/10">
                  <h3 className="text-2xl font-bold text-lumora-dark mb-4">
                    {system.title}
                  </h3>
                  <p className="text-lumora-dark/70 mb-6 text-lg">
                    {system.description}
                  </p>
                  <ul className="space-y-3 mb-6">
                    {system.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-start gap-3">
                        <span className="text-lumora-green-500 mt-1">✓</span>
                        <span className="text-lumora-dark/80">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="bg-lumora-green-500/10 rounded-lg p-4 border border-lumora-green-500/20">
                    <p className="text-sm font-mono text-lumora-dark/70">
                      {system.specs}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Implementation Roadmap */}
      <section className="py-16 bg-lumora-cream/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-lumora-dark mb-6 text-center">
              {t.implementation.title}
            </h2>
            <p className="text-lg text-lumora-dark/70 mb-12 text-center">
              {t.implementation.intro}
            </p>
            <div className="space-y-8">
              {t.implementation.phases.map((phase, index) => (
                <div key={index} className="bg-white rounded-2xl p-8 shadow-soft-md">
                  <h3 className="text-xl font-bold text-lumora-green-500 mb-4">
                    {phase.phase}
                  </h3>
                  <ul className="space-y-3">
                    {phase.items.map((item, iIndex) => (
                      <li key={iIndex} className="flex items-start gap-3">
                        <span className="text-lumora-green-500 mt-1">→</span>
                        <span className="text-lumora-dark/80">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Case Study */}
      <section className="py-16 bg-gradient-to-br from-lumora-green-500 to-lumora-dark text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-12 text-center">
              {t.caseStudy.title}
            </h2>
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/20">
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-4">{t.caseStudy.company}</h3>
                <p className="text-white/90 mb-4"><strong>{locale === 'nl' ? 'Uitdaging' : locale === 'de' ? 'Herausforderung' : 'Challenge'}:</strong> {t.caseStudy.challenge}</p>
                <p className="text-white/90"><strong>{locale === 'nl' ? 'Oplossing' : locale === 'de' ? 'Lösung' : 'Solution'}:</strong> {t.caseStudy.solution}</p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {t.caseStudy.results.map((result, index) => (
                  <div key={index} className="bg-white/10 rounded-lg p-6 border border-white/20">
                    <div className="text-sm text-white/70 mb-2">{result.metric}</div>
                    <div className="text-2xl font-bold mb-1">{result.after}</div>
                    <div className="text-sm text-white/60">{locale === 'nl' ? 'Was' : locale === 'de' ? 'War' : 'Was'}: {result.before}</div>
                    <div className="text-lumora-gold font-bold mt-2">{result.improvement}</div>
                  </div>
                ))}
              </div>
              <blockquote className="border-l-4 border-lumora-gold pl-6 italic text-lg text-white/90">
                {t.caseStudy.quote}
                <footer className="text-sm text-white/70 mt-2">— {t.caseStudy.author}</footer>
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* Integration */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-lumora-dark mb-6 text-center">
              {t.integration.title}
            </h2>
            <p className="text-lg text-lumora-dark/70 mb-12 text-center">
              {t.integration.intro}
            </p>
            <div className="space-y-6">
              {t.integration.systems.map((system, index) => (
                <div key={index} className="bg-lumora-cream/20 rounded-xl p-6 border border-lumora-green-500/10">
                  <h3 className="text-xl font-bold text-lumora-dark mb-3">
                    {system.system}
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm text-lumora-green-500 font-semibold mb-1">
                        {locale === 'nl' ? 'Compatibiliteit' : locale === 'de' ? 'Kompatibilität' : 'Compatibility'}
                      </div>
                      <p className="text-lumora-dark/70">{system.compatibility}</p>
                    </div>
                    <div>
                      <div className="text-sm text-lumora-green-500 font-semibold mb-1">
                        {locale === 'nl' ? 'Integratie' : locale === 'de' ? 'Integration' : 'Integration'}
                      </div>
                      <p className="text-lumora-dark/70">{system.integration}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Future Trends */}
      <section className="py-16 bg-lumora-cream/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-lumora-dark mb-6 text-center">
              {t.future.title}
            </h2>
            <p className="text-lg text-lumora-dark/70 mb-12 text-center">
              {t.future.intro}
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              {t.future.trends.map((trend, index) => (
                <div key={index} className="bg-white rounded-xl p-8 shadow-soft-md">
                  <div className="text-4xl mb-4">{trend.icon}</div>
                  <h3 className="text-xl font-bold text-lumora-dark mb-3">
                    {trend.trend}
                  </h3>
                  <p className="text-lumora-dark/70">
                    {trend.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-lumora-dark mb-12 text-center">
              {t.faq.title}
            </h2>
            <div className="space-y-6">
              {t.faq.questions.map((faq, index) => (
                <div key={index} className="bg-lumora-cream/20 rounded-xl p-8 border border-lumora-green-500/10">
                  <h3 className="text-lg font-bold text-lumora-dark mb-4">
                    {faq.q}
                  </h3>
                  <p className="text-lumora-dark/70 leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-lumora-green-500 to-lumora-dark text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
            {t.cta.title}
          </h2>
          <p className="text-xl mb-8 text-white/90">
            {t.cta.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={localizePathForLocale('/contact', locale)}
              className="inline-block px-8 py-4 bg-white text-lumora-green-500 rounded-lg font-semibold hover:bg-lumora-cream transition-colors shadow-soft-lg"
            >
              {t.cta.primaryButton}
            </Link>
            <Link
              href={localizePathForLocale('/shop', locale)}
              className="inline-block px-8 py-4 bg-lumora-gold text-white rounded-lg font-semibold hover:bg-lumora-gold/90 transition-colors shadow-soft-lg"
            >
              {t.cta.secondaryButton}
            </Link>
          </div>
        </div>
      </section>

      {/* Related Links */}
      <section className="py-12 bg-lumora-cream/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-2xl font-display font-bold text-lumora-dark mb-6 text-center">
              {t.related.title}
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              {t.related.links.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="px-6 py-3 bg-white text-lumora-green-500 rounded-lg hover:bg-lumora-green-500 hover:text-white transition-colors shadow-soft"
                >
                  {link.text}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

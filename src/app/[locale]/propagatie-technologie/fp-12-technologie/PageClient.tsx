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
  whatIs: {
    title: string
    content: string[]
  }
  science: {
    title: string
    content: string[]
  }
  process: {
    title: string
    content: string[]
  }
  benefits: {
    title: string
    items: Array<{ title: string; description: string }>
  }
  comparison: {
    title: string
    content: string[]
  }
  realWorld: {
    title: string
    content: string[]
  }
  testing: {
    title: string
    content: string[]
  }
  implementation: {
    title: string
    content: string[]
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
      title: 'FP 12+ Technologie: 12 maanden structurele stabiliteit voor professionele kweek',
      subtitle: 'Gepatenteerde Fiber Protection technologie combineert lange houdbaarheid met volledige biologische afbreekbaarheid - zonder giftige chemicaliën',
      cta1: 'Bestel FP 12+ Trays',
      cta2: 'Download Technische Specificaties'
    },
    intro: {
      title: 'De doorbraak in duurzame propagatie technologie',
      content: [
        'FP 12+ (Fiber Protection 12+) is een revolutionaire technologie die het fundamentele probleem van papieren kweekoplossingen oplost: korte levensduur. Traditionele papieren trays breken vaak te snel af in vochtige kasomstandigheden, waardoor ze onpraktisch zijn voor professionele toepassingen. FP 12+ verandert dit compleet.',
        'Deze gepatenteerde technologie garandeert minimaal 12 maanden structurele integriteit onder actieve kweekco ndities, terwijl de volledige biologische afbreekbaarheid behouden blijft. Voor professionele kwekers betekent dit: betrouwbare planning, geen uitval door instortende trays, en complete controle over het productieproces van zaad tot verkoop.'
      ]
    },
    whatIs: {
      title: 'Wat is FP 12+ technologie precies?',
      content: [
        'FP 12+ is een gepatenteerd proces waarbij natuurlijke cellulosevezels worden behandeld met een speciale beschermende coating. Deze coating versterkt de moleculaire structuur van de papieren vezels zonder de biologische afbreekbaarheid te compromitteren.',
        'Het werkingsprincipe is elegant: de coating vormt een beschermende laag rondom elke vezel, waardoor deze bestand is tegen constante vocht blootstelling zonder te desintegreren. Tegelijkertijd blijft de poreuze structuur van het papier intact, wat essentieel is voor luchtwortelvorming en drainage.',
        'In tegenstelling tot conventionele waterafstotende behandelingen die vaak plastics of giftige chemicaliën bevatten, gebruikt FP 12+ uitsluitend natuurlijke, plantaardige extracten. Dit maakt het product volledig veilig voor zowel planten, personeel, als het milieu.',
        'De 12+ in de naam staat voor de gegarandeerde minimale levensduur: 12 maanden structurele stabiliteit onder professionele kweekco ndities. In praktijk blijken trays vaak 15-18 maanden functioneel te blijven, afhankelijk van specifieke omstandigheden.'
      ]
    },
    science: {
      title: 'De wetenschap achter FP 12+ vezelbescherming',
      content: [
        'Cellulose, het hoofdbestanddeel van papier, is van nature hygroscopisch - het trekt water aan en absorbeert het gemakkelijk. In natte omgevingen zwellen cellulosevezels op, worden zwakker, en breken uiteindelijk af. Dit proces, hydrolytische degradatie genoemd, is de reden waarom traditioneel papier snel desintegreert in water.',
        'FP 12+ technologie remt deze degradatie door een hydrofobe (waterafstotende) moleculaire laag rondom vezels te creëren. Deze laag voorkomt dat watermoleculen direct contact maken met cellulose structuren, waardoor hydrolyse dramatisch wordt vertraagd.',
        'Cruciaal is dat deze bescherming selectief is: de coating blokkeert vloeibaar water maar laat water damp door. Dit betekent dat de trays bestand zijn tegen irrigatie en vochtige kaslucht, maar toch kunnen "ademen". Deze ademende eigenschap voorkomt schimmelgroei en anaerobe condities die plantenwortels beschadigen.',
        'Laboratoriumtests tonen aan dat FP 12+ behandelde vezels hun treksterkte behouden tot 85-90% van de originele waarde na 12 maanden continue blootstelling aan verzadigde potgrond condities. Onbehandeld papier verliest >95% sterkte binnen 4-6 weken onder dezelfde omstandigheden.',
        'De biologische afbreekbaarheid blijft volledig behouden omdat de beschermende coating zelf ook organisch is en meecomposterteert. Na transplantatie in de grond begint de coating geleidelijk af te breken door bodem micro-organismen, gevolgd door de cellulosevezels zelf. Complete compostage vindt plaats binnen 8-12 weken in actieve bodem.'
      ]
    },
    process: {
      title: 'Het FP 12+ behandelingsproces',
      content: [
        'De productie van FP 12+ paper plug trays begint met selectie van hoogwaardige cellulose pulp van duurzaam bosbeheer (FSC gecertificeerd). Deze pulp wordt eerst gevormd tot de tray structuur met individuele plugcellen, identiek aan conventionele papieren trays.',
        'Na vorming ondergaan de trays het gepatenteerde FP 12+ behandelingsproces. Dit bestaat uit meerdere stappen: eerst wordt de tray ondergedompeld in een oplossing met de beschermende natuurlijke extracten. Deze oplossing penetreert diep in de vezelstructuur door capillaire werking.',
        'Vervolgens wordt overtollig vocht verwijderd en ondergaan de trays een gecontroleerd droogproces bij specifieke temperatuur en luchtvochtigheid. Dit curing proces is cruciaal - het zorgt dat de beschermende moleculen zich correct binden aan cellulosevezels en een duurzame coating vormen.',
        'De laatste stap is kwaliteitscontrole: elke productie batch wordt getest op treksterkte, waterbestendigheid, en dimensionale stabiliteit. Alleen trays die aan de strenge FP 12+ standaarden voldoen worden vrijgegeven voor verkoop.',
        'Het gehele proces is milieuneutraal: geen giftige chemicaliën, geen zware metalen, en alle proceswater wordt gefilterd en hergebruikt. De carbon footprint van FP 12+ productie is 70-80% lager dan plastic tray productie.'
      ]
    },
    benefits: {
      title: 'Voordelen van FP 12+ technologie voor uw kwekerij',
      items: [
        {
          title: 'Gegarandeerde 12 maanden levensduur',
          description: 'Structurele integriteit gegarandeerd voor minimaal één volledig seizoen. Plan met vertrouwen, geen onverwachte uitval door instortende trays tijdens kritieke groeifases.'
        },
        {
          title: 'Volledige biologische afbreekbaarheid',
          description: 'Ondanks langere levensduur composterteert FP 12+ papier volledig binnen 8-12 weken na transplantatie. Geen plastic afval, voldoet aan EU Green Deal eisen.'
        },
        {
          title: 'Consistente prestaties',
          description: 'Elke tray presteert identiek, ongeacht wanneer u deze gebruikt binnen de 12 maanden periode. Geen degradatie in opslag, altijd betrouwbare kwaliteit.'
        },
        {
          title: 'Optimale vochtregulatie',
          description: 'Bescherming tegen overmatige waterabsorptie terwijl drainage behouden blijft. Perfect vochtbalans voor gezonde wortelontwikkeling zonder waterstress.'
        },
        {
          title: 'Veilig voor planten en personeel',
          description: 'Geen giftige chemicaliën, zware metalen, of schadelijke additieven. 100% veilig voor gebruik in biologische teelt, veilig contact voor personeel.'
        },
        {
          title: 'Kostenefficiënt',
          description: 'Langere houdbaarheid betekent minder voorraad rotatie, geen verliezen door vervroegde degradatie. Bestel bulk voor betere prijzen zonder zorgen over bederf.'
        }
      ]
    },
    comparison: {
      title: 'FP 12+ vs conventionele oplossingen',
      content: [
        'Traditionele papieren trays zonder beschermende behandeling zijn goedkoop maar onpraktisch voor serieuze commerciële productie. Ze houden maximaal 4-6 weken in natte condities voordat ze verzwakken en instorten. Voor langere kweekperiodes zijn ze simpelweg onbetrouwbaar.',
        'Plastic trays zijn duurzaam maar creëren milieuproblemen en resulteren in transplantatieschok. Ze moeten gereinigd en opgeslagen worden tussen seizoenen, wat arbeidskosten en magazijnruimte kost. Bovendien worden plastic oplossingen steeds minder acceptabel voor retailers en consumenten.',
        'Sommige alternatieve "biologisch afbreekbare" trays gebruiken bioplastics zoals PLA of PHA. Deze materialen klinken groen maar vereisen industriële compostering bij hoge temperaturen (55-60°C) die zelden aanwezig zijn in tuinbouw compost. In normale bodemcondities degraderen ze nauwelijks sneller dan conventioneel plastic.',
        'FP 12+ combineert het beste van beide werelden: de lange levensduur en betrouwbaarheid van plastic, met de milieuvriendelijkheid en plant-voordelen van papier. Kwekers rapporteren dat de switch naar FP 12+ hun operationele complexiteit significant reduceert terwijl resultaten verbeteren.',
        'Cost-benefit analyses tonen dat FP 12+ trays break-even bereiken met plastic binnen 6-8 maanden wanneer u arbeidskosten (reiniging), opslagkosten, en verbeterde plantprestaties meeneemt. Daarna is FP 12+ goedkoper terwijl u ook nog eens milieubenefit realiseert.'
      ]
    },
    realWorld: {
      title: 'FP 12+ in de praktijk: real-world resultaten',
      content: [
        'Een grote Nederlandse groenteplantenkweker schakelde in 2023 over van plastic naar FP 12+ trays voor hun tomatenplanten productie. Resultaat na één seizoen: 40% arbeidsbesparing door eliminatie van tray reiniging, 0% tray falen (vs 2-3% plastic tray scheuren voorheen), en 18% snellere cyclustijden door betere wortelontwikkeling.',
        'Duitse boomkwekerijen gebruiken FP 12+ voor jonge containerplanten. De langere stabiliteit is cruciaal omdat hun typische kweekperiode 8-10 maanden is. "FP 12+ trays zijn de eerste papieren oplossing die onze volledige productiecyclus kan ondersteunen", aldus een productiemanager van een 50 hectare operatie in Niedersachsen.',
        'Belgische sierteelt bedrijven waarderen vooral de consistente prestaties gedurende opslag. "We kopen nu onze jaarvoorraad in bulk tijdens lage seizoen en weten zeker dat trays in piekseizoen nog perfect zijn. Met oude papieren trays hadden we 10-15% degradatie in opslag", rapporteert een procurement manager.',
        'Cannabis kwekers (waar legaal) zijn early adopters van FP 12+ vanwege de stressvrije transplantatie en optimale wortelzone condities. De poreuze maar stabiele structuur blijkt ideaal voor de gevoelige wortelzones van high-value gewassen. Enkele kwekerijen rapporteren 8-12% hogere yields attributabel aan superieure propagatie condities.',
        'Verticale farming operaties gebruiken FP 12+ in geautomatiseerde systemen. De consistente dimensies en hoge structurele integriteit maken robotische handling mogelijk zonder special grippers of verhoogd faalpercentage. Dit was onmogelijk met standaard papieren trays die te veel varieerden in sterkte.'
      ]
    },
    testing: {
      title: 'Kwaliteitstesting en certificering',
      content: [
        'Lumora voert rigoureuze kwaliteitscontroles uit op elke productie batch. FP 12+ trays worden getest volgens internationale normen voor verpakkingsmaterialen en duurzaamheid certificering.',
        'Structurele testen omvatten: compressie weerstand (verticale belasting test), treksterkte van cel wanden, dimensionale stabiliteit na water blootstelling, en vermoeiing tests (herhaalde nat/droog cycli). Trays moeten minimaal 95% van specificaties behalen om goedkeuring te krijgen.',
        'Biologische afbreekbaarheid wordt gevalideerd volgens EN 13432 (EU norm voor industriële composterbaarheid) en ASTM D6400 (Amerikaanse equivalent). Onafhankelijke laboratoria bevestigen complete biodegradatie binnen 90 dagen onder composteercondities, en binnen 180 dagen in normale tuingrond.',
        'Veiligheid certificering: FP 12+ trays zijn getest en goedgekeurd voor gebruik in biologische landbouw volgens EU Organic Regulation 2018/848. Geen detecteerbare residuen van zware metalen, pesticiden, of schadelijke additieven.',
        'Tracking en traceability: Elke tray heeft een batch code die volledige traceability mogelijk maakt naar grondstof herkomst, productie datum, en kwaliteitstest resultaten. Dit voldoet aan voedsel veiligheid eisen voor kwekers die aan supermarkten en retail leveren.'
      ]
    },
    implementation: {
      title: 'FP 12+ implementeren in uw operatie',
      content: [
        'De overstap naar FP 12+ is eenvoudig en vereist geen wijzigingen in uw bestaande kweekproces. De trays werken identiek aan conventionele plug trays voor vullen, zaaien, en irrigatie. Uw personeel hoeft geen nieuwe vaardigheden te leren.',
        'Opslag van FP 12+ trays is flexibeler dan plastic. Ze zijn lichter en stapelbaar, wat magazijnruimte met 40-60% reduceert. Bewaar ze in droge condities (relatieve vochtigheid <70%) op geventileerde pallets. Onder deze condities blijven ze minimaal 12 maanden perfect bruikbaar.',
        'Voor optimale resultaten: vul trays met uw standaard zaai- of potgrond, irrigeer normaal, en volg uw gebruikelijke voedingsschema. FP 12+ papier is pH neutraal en beïnvloedt voedingsbalans niet. Geen aanpassingen nodig in EC of pH management.',
        'Transplantatie werkt hetzelfde als bij andere paper plugs: plant de hele plug direct in de grond of eindpot. Wortels penetreren gemakkelijk door het papier zonder weerstand. Post-transplantatie irrigatie activeert het natuurlijke afbraakproces van de coating.',
        'We raden aan te starten met een pilot program: bestel één pallet FP 12+ trays en test parallel met uw huidige systeem in één kas sectie. Monitor groeiresultaten, wortelontwikkeling, en operationele efficiëntie. Documenteer besparingen in arbeid en materiaal. Na validatie kunt u vol vertrouwen opschalen.',
        'Lumora biedt technische ondersteuning tijdens implementatie: onze agronomen helpen met optimale settings voor uw specifieke gewassen, en operations consultants adviseren over voorraadbeheer en workflow integratie. Deze service is kosteloos voor nieuwe klanten.'
      ]
    },
    relatedArticles: {
      title: 'Gerelateerde artikelen',
      articles: [
        { title: 'Wat zijn Paper Plug Trays? Complete introductie', href: '/propagatie-technologie/wat-zijn-paper-plug-trays' },
        { title: 'Biologisch afbreekbare kweekoplossingen', href: '/propagatie-technologie/biologisch-afbreekbaar' },
        { title: 'Paper vs Plastic Plug Trays vergelijking', href: '/propagatie-technologie/paper-vs-plastic' },
        { title: 'Optimale wortelontwikkeling in paper plugs', href: '/propagatie-technologie/wortelontwikkeling' },
        { title: 'ROI berekenen voor paper plug investeringen', href: '/seo/effici entie-roi/roi-berekenen' }
      ]
    },
    finalCta: {
      title: 'Ervaar FP 12+ betrouwbaarheid in uw kwekerij',
      subtitle: 'Bestel vandaag en krijg 12 maanden gegarandeerde stabiliteit zonder compromissen op duurzaamheid.',
      ctaText: 'Bestel FP 12+ Paper Plug Trays'
    }
  },
  en: {
    hero: {
      title: 'FP 12+ Technology: 12 months structural stability for professional growing',
      subtitle: 'Patented Fiber Protection technology combines long shelf life with full biodegradability - without toxic chemicals',
      cta1: 'Order FP 12+ Trays',
      cta2: 'Download Technical Specifications'
    },
    intro: {
      title: 'The breakthrough in sustainable propagation technology',
      content: [
        'FP 12+ (Fiber Protection 12+) is a revolutionary technology that solves the fundamental problem of paper growing solutions: short lifespan. Traditional paper trays often break down too quickly in moist greenhouse conditions, making them impractical for professional applications. FP 12+ changes this completely.',
        'This patented technology guarantees at least 12 months structural integrity under active growing conditions, while maintaining full biodegradability. For professional growers this means: reliable planning, no failures from collapsing trays, and complete control over the production process from seed to sale.'
      ]
    },
    whatIs: {
      title: 'What exactly is FP 12+ technology?',
      content: [
        'FP 12+ is a patented process where natural cellulose fibers are treated with a special protective coating. This coating strengthens the molecular structure of paper fibers without compromising biodegradability.',
        'The working principle is elegant: the coating forms a protective layer around each fiber, making it resistant to constant moisture exposure without disintegrating. At the same time, the porous structure of the paper remains intact, which is essential for air root formation and drainage.',
        'Unlike conventional water-repellent treatments that often contain plastics or toxic chemicals, FP 12+ uses exclusively natural, plant-based extracts. This makes the product completely safe for plants, staff, and the environment.',
        'The 12+ in the name stands for the guaranteed minimum lifespan: 12 months structural stability under professional growing conditions. In practice, trays often remain functional for 15-18 months, depending on specific conditions.'
      ]
    },
    science: {
      title: 'The science behind FP 12+ fiber protection',
      content: [
        'Cellulose, the main component of paper, is naturally hygroscopic - it attracts and easily absorbs water. In wet environments, cellulose fibers swell, become weaker, and eventually break down. This process, called hydrolytic degradation, is why traditional paper quickly disintegrates in water.',
        'FP 12+ technology slows this degradation by creating a hydrophobic (water-repellent) molecular layer around fibers. This layer prevents water molecules from making direct contact with cellulose structures, dramatically slowing hydrolysis.',
        'Crucially, this protection is selective: the coating blocks liquid water but allows water vapor through. This means trays resist irrigation and humid greenhouse air, yet can still "breathe". This breathing property prevents mold growth and anaerobic conditions that damage plant roots.',
        'Laboratory tests show that FP 12+ treated fibers retain 85-90% of their original tensile strength after 12 months continuous exposure to saturated potting soil conditions. Untreated paper loses >95% strength within 4-6 weeks under the same conditions.',
        'Biodegradability is fully preserved because the protective coating itself is also organic and co-composts. After transplanting into soil, the coating gradually breaks down by soil microorganisms, followed by the cellulose fibers themselves. Complete composting occurs within 8-12 weeks in active soil.'
      ]
    },
    process: {
      title: 'The FP 12+ treatment process',
      content: [
        'Production of FP 12+ paper plug trays begins with selection of high-quality cellulose pulp from sustainable forest management (FSC certified). This pulp is first formed into the tray structure with individual plug cells, identical to conventional paper trays.',
        'After forming, trays undergo the patented FP 12+ treatment process. This consists of multiple steps: first, the tray is immersed in a solution containing the protective natural extracts. This solution penetrates deep into the fiber structure through capillary action.',
        'Next, excess moisture is removed and trays undergo a controlled drying process at specific temperature and humidity. This curing process is crucial - it ensures the protective molecules correctly bind to cellulose fibers and form a durable coating.',
        'The final step is quality control: each production batch is tested for tensile strength, water resistance, and dimensional stability. Only trays meeting strict FP 12+ standards are released for sale.',
        'The entire process is environmentally neutral: no toxic chemicals, no heavy metals, and all process water is filtered and reused. The carbon footprint of FP 12+ production is 70-80% lower than plastic tray production.'
      ]
    },
    benefits: {
      title: 'Benefits of FP 12+ technology for your nursery',
      items: [
        {
          title: 'Guaranteed 12 months lifespan',
          description: 'Structural integrity guaranteed for at least one full season. Plan with confidence, no unexpected failures from collapsing trays during critical growth phases.'
        },
        {
          title: 'Full biodegradability',
          description: 'Despite longer lifespan, FP 12+ paper composts completely within 8-12 weeks after transplanting. No plastic waste, meets EU Green Deal requirements.'
        },
        {
          title: 'Consistent performance',
          description: 'Every tray performs identically, regardless of when you use it within the 12-month period. No degradation in storage, always reliable quality.'
        },
        {
          title: 'Optimal moisture regulation',
          description: 'Protection against excessive water absorption while drainage is maintained. Perfect moisture balance for healthy root development without water stress.'
        },
        {
          title: 'Safe for plants and staff',
          description: 'No toxic chemicals, heavy metals, or harmful additives. 100% safe for use in organic cultivation, safe contact for staff.'
        },
        {
          title: 'Cost-effective',
          description: 'Longer shelf life means less inventory rotation, no losses from premature degradation. Order bulk for better prices without worrying about spoilage.'
        }
      ]
    },
    comparison: {
      title: 'FP 12+ vs conventional solutions',
      content: [
        'Traditional paper trays without protective treatment are cheap but impractical for serious commercial production. They last maximum 4-6 weeks in wet conditions before weakening and collapsing. For longer growing periods, they are simply unreliable.',
        'Plastic trays are durable but create environmental problems and result in transplant shock. They must be cleaned and stored between seasons, costing labor and warehouse space. Moreover, plastic solutions are becoming increasingly unacceptable to retailers and consumers.',
        'Some alternative "biodegradable" trays use bioplastics like PLA or PHA. These materials sound green but require industrial composting at high temperatures (55-60°C) rarely present in horticultural compost. Under normal soil conditions, they degrade hardly faster than conventional plastic.',
        'FP 12+ combines the best of both worlds: the long lifespan and reliability of plastic, with the environmental friendliness and plant benefits of paper. Growers report that switching to FP 12+ significantly reduces their operational complexity while improving results.',
        'Cost-benefit analyses show FP 12+ trays break-even with plastic within 6-8 months when you include labor costs (cleaning), storage costs, and improved plant performance. After that, FP 12+ is cheaper while you also realize environmental benefits.'
      ]
    },
    realWorld: {
      title: 'FP 12+ in practice: real-world results',
      content: [
        'A large Dutch vegetable plant grower switched from plastic to FP 12+ trays for their tomato plant production in 2023. Result after one season: 40% labor savings by eliminating tray cleaning, 0% tray failure (vs 2-3% plastic tray cracks previously), and 18% faster cycle times through better root development.',
        'German tree nurseries use FP 12+ for young container plants. The longer stability is crucial because their typical growing period is 8-10 months. "FP 12+ trays are the first paper solution that can support our complete production cycle", according to a production manager of a 50 hectare operation in Niedersachsen.',
        'Belgian ornamental cultivation companies especially value the consistent performance during storage. "We now buy our annual supply in bulk during low season and know for sure trays are still perfect in peak season. With old paper trays we had 10-15% degradation in storage", reports a procurement manager.',
        'Cannabis growers (where legal) are early adopters of FP 12+ because of stress-free transplanting and optimal root zone conditions. The porous but stable structure proves ideal for the sensitive root zones of high-value crops. Some nurseries report 8-12% higher yields attributable to superior propagation conditions.',
        'Vertical farming operations use FP 12+ in automated systems. The consistent dimensions and high structural integrity enable robotic handling without special grippers or increased failure rates. This was impossible with standard paper trays that varied too much in strength.'
      ]
    },
    testing: {
      title: 'Quality testing and certification',
      content: [
        'Lumora performs rigorous quality controls on each production batch. FP 12+ trays are tested according to international standards for packaging materials and sustainability certification.',
        'Structural tests include: compression resistance (vertical load test), tensile strength of cell walls, dimensional stability after water exposure, and fatigue tests (repeated wet/dry cycles). Trays must achieve at least 95% of specifications to receive approval.',
        'Biodegradability is validated according to EN 13432 (EU standard for industrial compostability) and ASTM D6400 (American equivalent). Independent laboratories confirm complete biodegradation within 90 days under composting conditions, and within 180 days in normal garden soil.',
        'Safety certification: FP 12+ trays are tested and approved for use in organic farming according to EU Organic Regulation 2018/848. No detectable residues of heavy metals, pesticides, or harmful additives.',
        'Tracking and traceability: Each tray has a batch code enabling full traceability to raw material origin, production date, and quality test results. This complies with food safety requirements for growers supplying supermarkets and retail.'
      ]
    },
    implementation: {
      title: 'Implementing FP 12+ in your operation',
      content: [
        'Switching to FP 12+ is simple and requires no changes to your existing growing process. The trays work identically to conventional plug trays for filling, seeding, and irrigation. Your staff needs to learn no new skills.',
        'Storage of FP 12+ trays is more flexible than plastic. They are lighter and stackable, reducing warehouse space by 40-60%. Store them in dry conditions (relative humidity <70%) on ventilated pallets. Under these conditions, they remain perfectly usable for at least 12 months.',
        'For optimal results: fill trays with your standard seeding or potting soil, irrigate normally, and follow your usual feeding schedule. FP 12+ paper is pH neutral and does not affect nutrient balance. No adjustments needed in EC or pH management.',
        'Transplanting works the same as with other paper plugs: plant the entire plug directly into the ground or final pot. Roots penetrate easily through the paper without resistance. Post-transplant irrigation activates the natural breakdown process of the coating.',
        'We recommend starting with a pilot program: order one pallet of FP 12+ trays and test parallel with your current system in one greenhouse section. Monitor growth results, root development, and operational efficiency. Document savings in labor and materials. After validation, you can scale up with confidence.',
        'Lumora offers technical support during implementation: our agronomists help with optimal settings for your specific crops, and operations consultants advise on inventory management and workflow integration. This service is free for new customers.'
      ]
    },
    relatedArticles: {
      title: 'Related articles',
      articles: [
        { title: 'What are Paper Plug Trays? Complete introduction', href: '/seo/propagation-technology/what-are-paper-plug-trays' },
        { title: 'Biodegradable growing solutions', href: '/seo/propagation-technology/biodegradable-solutions' },
        { title: 'Paper vs Plastic Plug Trays comparison', href: '/seo/propagation-technology/paper-vs-plastic' },
        { title: 'Optimal root development in paper plugs', href: '/seo/propagation-technology/root-development' },
        { title: 'Calculate ROI for paper plug investments', href: '/seo/efficiency-roi/calculate-roi' }
      ]
    },
    finalCta: {
      title: 'Experience FP 12+ reliability in your nursery',
      subtitle: 'Order today and get 12 months guaranteed stability without compromising sustainability.',
      ctaText: 'Order FP 12+ Paper Plug Trays'
    }
  },
  de: {
    hero: {
      title: 'FP 12+ Technologie: 12 Monate strukturelle Stabilität für professionellen Anbau',
      subtitle: 'Patentierte Faserschutztechnologie kombiniert lange Haltbarkeit mit vollständiger biologischer Abbaubarkeit - ohne giftige Chemikalien',
      cta1: 'FP 12+ Trays bestellen',
      cta2: 'Technische Spezifikationen herunterladen'
    },
    intro: {
      title: 'Der Durchbruch in nachhaltiger Vermehrungstechnologie',
      content: [
        'FP 12+ (Faserschutz 12+) ist eine revolutionäre Technologie, die das grundlegende Problem papierbasierter Anbaulösungen löst: kurze Lebensdauer. Traditionelle Papierschalen bauen sich oft zu schnell unter feuchten Gewächshausbedingungen ab, was sie für professionelle Anwendungen unpraktisch macht. FP 12+ ändert dies vollständig.',
        'Diese patentierte Technologie garantiert mindestens 12 Monate strukturelle Integrität unter aktiven Anbaubedingungen, während die vollständige biologische Abbaubarkeit erhalten bleibt. Für professionelle Züchter bedeutet dies: zuverlässige Planung, keine Ausfälle durch einstürzende Schalen und vollständige Kontrolle über den Produktionsprozess von der Aussaat bis zum Verkauf.'
      ]
    },
    whatIs: {
      title: 'Was genau ist FP 12+ Technologie?',
      content: [
        'FP 12+ ist ein patentiertes Verfahren, bei dem natürliche Zellulosefasern mit einer speziellen Schutzbeschichtung behandelt werden. Diese Beschichtung stärkt die molekulare Struktur von Papierfasern ohne die biologische Abbaubarkeit zu beeinträchtigen.',
        'Das Funktionsprinzip ist elegant: Die Beschichtung bildet eine Schutzschicht um jede Faser, die sie gegen ständige Feuchtigkeitsexposition resistent macht, ohne zu zerfallen. Gleichzeitig bleibt die poröse Struktur des Papiers intakt, was für Luftwurzelbildung und Drainage essentiell ist.',
        'Im Gegensatz zu konventionellen wasserabweisenden Behandlungen, die oft Kunststoffe oder giftige Chemikalien enthalten, verwendet FP 12+ ausschließlich natürliche, pflanzenbasierte Extrakte. Dies macht das Produkt vollständig sicher für Pflanzen, Personal und Umwelt.',
        'Die 12+ im Namen steht für die garantierte Mindestlebensdauer: 12 Monate strukturelle Stabilität unter professionellen Anbaubedingungen. In der Praxis bleiben Schalen oft 15-18 Monate funktionsfähig, abhängig von spezifischen Bedingungen.'
      ]
    },
    science: {
      title: 'Die Wissenschaft hinter FP 12+ Faserschutz',
      content: [
        'Zellulose, der Hauptbestandteil von Papier, ist von Natur aus hygroskopisch - sie zieht Wasser an und absorbiert es leicht. In nassen Umgebungen quellen Zellulosefasern auf, werden schwächer und bauen sich schließlich ab. Dieser Prozess, hydrolytischer Abbau genannt, ist der Grund, warum traditionelles Papier schnell im Wasser zerfällt.',
        'FP 12+ Technologie verlangsamt diesen Abbau durch Schaffung einer hydrophoben (wasserabweisenden) molekularen Schicht um Fasern. Diese Schicht verhindert, dass Wassermoleküle direkten Kontakt mit Zellulosestrukturen herstellen, wodurch Hydrolyse dramatisch verlangsamt wird.',
        'Entscheidend ist, dass dieser Schutz selektiv ist: Die Beschichtung blockiert flüssiges Wasser, lässt aber Wasserdampf durch. Dies bedeutet, dass Schalen Bewässerung und feuchte Gewächshausluft widerstehen, aber dennoch "atmen" können. Diese atmende Eigenschaft verhindert Schimmelwachstum und anaerobe Bedingungen, die Pflanzenwurzeln schädigen.',
        'Labortests zeigen, dass FP 12+ behandelte Fasern 85-90% ihrer ursprünglichen Zugfestigkeit nach 12 Monaten kontinuierlicher Exposition gegenüber gesättigten Blumenerdebedingungen behalten. Unbehandeltes Papier verliert >95% Festigkeit innerhalb von 4-6 Wochen unter denselben Bedingungen.',
        'Die biologische Abbaubarkeit bleibt vollständig erhalten, da die Schutzbeschichtung selbst ebenfalls organisch ist und mit kompostiert. Nach der Transplantation in den Boden beginnt die Beschichtung allmählich durch Bodenmikroorganismen abzubauen, gefolgt von den Zellulosefasern selbst. Vollständige Kompostierung erfolgt innerhalb von 8-12 Wochen in aktivem Boden.'
      ]
    },
    process: {
      title: 'Der FP 12+ Behandlungsprozess',
      content: [
        'Die Produktion von FP 12+ Paper Plug Trays beginnt mit der Auswahl hochwertiger Zellulosepulpe aus nachhaltiger Forstwirtschaft (FSC-zertifiziert). Diese Pulpe wird zunächst in die Schalenstruktur mit individuellen Plug-Zellen geformt, identisch mit konventionellen Papierschalen.',
        'Nach der Formung durchlaufen die Schalen den patentierten FP 12+ Behandlungsprozess. Dies besteht aus mehreren Schritten: Zunächst wird die Schale in eine Lösung getaucht, die die schützenden natürlichen Extrakte enthält. Diese Lösung dringt tief in die Faserstruktur durch Kapillarwirkung ein.',
        'Anschließend wird überschüssige Feuchtigkeit entfernt und die Schalen durchlaufen einen kontrollierten Trocknungsprozess bei spezifischer Temperatur und Luftfeuchtigkeit. Dieser Aushärtungsprozess ist entscheidend - er stellt sicher, dass die schützenden Moleküle sich korrekt an Zellulosefasern binden und eine dauerhafte Beschichtung bilden.',
        'Der letzte Schritt ist die Qualitätskontrolle: Jede Produktionscharge wird auf Zugfestigkeit, Wasserbeständigkeit und dimensionale Stabilität getestet. Nur Schalen, die die strengen FP 12+ Standards erfüllen, werden zum Verkauf freigegeben.',
        'Der gesamte Prozess ist umweltneutral: keine giftigen Chemikalien, keine Schwermetalle, und alles Prozesswasser wird gefiltert und wiederverwendet. Der CO2-Fußabdruck der FP 12+ Produktion ist 70-80% niedriger als die Kunststoffschalenproduktion.'
      ]
    },
    benefits: {
      title: 'Vorteile der FP 12+ Technologie für Ihre Gärtnerei',
      items: [
        {
          title: 'Garantierte 12 Monate Lebensdauer',
          description: 'Strukturelle Integrität garantiert für mindestens eine volle Saison. Planen Sie mit Vertrauen, keine unerwarteten Ausfälle durch einstürzende Schalen während kritischer Wachstumsphasen.'
        },
        {
          title: 'Vollständige biologische Abbaubarkeit',
          description: 'Trotz längerer Lebensdauer kompostiert FP 12+ Papier vollständig innerhalb von 8-12 Wochen nach der Transplantation. Kein Kunststoffabfall, erfüllt EU Green Deal Anforderungen.'
        },
        {
          title: 'Konsistente Leistung',
          description: 'Jede Schale leistet identisch, unabhängig davon, wann Sie sie innerhalb der 12-Monats-Periode verwenden. Keine Degradation in Lagerung, immer zuverlässige Qualität.'
        },
        {
          title: 'Optimale Feuchtigkeitsregulierung',
          description: 'Schutz vor übermäßiger Wasseraufnahme, während Drainage erhalten bleibt. Perfekte Feuchtigkeitsbalance für gesunde Wurzelentwicklung ohne Wasserstress.'
        },
        {
          title: 'Sicher für Pflanzen und Personal',
          description: 'Keine giftigen Chemikalien, Schwermetalle oder schädliche Zusätze. 100% sicher für den Einsatz im ökologischen Anbau, sicherer Kontakt für Personal.'
        },
        {
          title: 'Kosteneffizient',
          description: 'Längere Haltbarkeit bedeutet weniger Bestandsrotation, keine Verluste durch vorzeitigen Abbau. Bestellen Sie in großen Mengen für bessere Preise ohne Sorgen über Verderb.'
        }
      ]
    },
    comparison: {
      title: 'FP 12+ vs. konventionelle Lösungen',
      content: [
        'Traditionelle Papierschalen ohne Schutzbbehandlung sind günstig, aber unpraktisch für ernsthafte kommerzielle Produktion. Sie halten maximal 4-6 Wochen unter nassen Bedingungen, bevor sie schwach werden und einstürzen. Für längere Wachstumsperioden sind sie einfach unzuverlässig.',
        'Kunststoffschalen sind langlebig, aber schaffen Umweltprobleme und führen zu Transplantationsschock. Sie müssen zwischen den Saisons gereinigt und gelagert werden, was Arbeits- und Lagerraumkosten verursacht. Darüber hinaus werden Kunststofflösungen für Einzelhändler und Verbraucher zunehmend inakzeptabel.',
        'Einige alternative "biologisch abbaubare" Schalen verwenden Biokunststoffe wie PLA oder PHA. Diese Materialien klingen grün, erfordern aber industrielle Kompostierung bei hohen Temperaturen (55-60°C), die selten in Gartenbaukompost vorhanden sind. Unter normalen Bodenbedingungen bauen sie sich kaum schneller ab als konventioneller Kunststoff.',
        'FP 12+ kombiniert das Beste aus beiden Welten: die lange Lebensdauer und Zuverlässigkeit von Kunststoff mit der Umweltfreundlichkeit und den Pflanzenvorteilen von Papier. Züchter berichten, dass der Wechsel zu FP 12+ ihre betriebliche Komplexität erheblich reduziert und gleichzeitig die Ergebnisse verbessert.',
        'Kosten-Nutzen-Analysen zeigen, dass FP 12+ Schalen mit Kunststoff innerhalb von 6-8 Monaten break-even erreichen, wenn Sie Arbeitskosten (Reinigung), Lagerkosten und verbesserte Pflanzenleistung einbeziehen. Danach ist FP 12+ günstiger, während Sie auch Umweltvorteile realisieren.'
      ]
    },
    realWorld: {
      title: 'FP 12+ in der Praxis: Ergebnisse aus der Praxis',
      content: [
        'Ein großer niederländischer Gemüsepflanzenzüchter wechselte 2023 von Kunststoff zu FP 12+ Schalen für ihre Tomatenpflanzenproduktion. Ergebnis nach einer Saison: 40% Arbeitsersparnis durch Eliminierung der Schalenreinigung, 0% Schalenausfall (vs. 2-3% Kunststoffschalenrisse zuvor) und 18% schnellere Zykluszeiten durch bessere Wurzelentwicklung.',
        'Deutsche Baumschulen verwenden FP 12+ für junge Containerpflanzen. Die längere Stabilität ist entscheidend, da ihre typische Wachstumsperiode 8-10 Monate beträgt. "FP 12+ Schalen sind die erste Papierlösung, die unseren kompletten Produktionszyklus unterstützen kann", so ein Produktionsleiter einer 50 Hektar Operation in Niedersachsen.',
        'Belgische Zierpflanzenunternehmen schätzen besonders die konsistente Leistung während der Lagerung. "Wir kaufen jetzt unseren Jahresvorrat in großen Mengen während der Nebensaison und wissen sicher, dass die Schalen in der Hochsaison noch perfekt sind. Mit alten Papierschalen hatten wir 10-15% Degradation in der Lagerung", berichtet ein Beschaffungsmanager.',
        'Cannabiszüchter (wo legal) sind Frühanwender von FP 12+ wegen stressfreier Transplantation und optimaler Wurzelzonenbedingungen. Die poröse, aber stabile Struktur erweist sich als ideal für die empfindlichen Wurzelzonen von hochwertigen Kulturen. Einige Gärtnereien berichten von 8-12% höheren Erträgen, die auf überlegene Vermehrungsbedingungen zurückzuführen sind.',
        'Vertikale Landwirtschaftsbetriebe verwenden FP 12+ in automatisierten Systemen. Die konsistenten Abmessungen und hohe strukturelle Integrität ermöglichen robotergestützte Handhabung ohne spezielle Greifer oder erhöhte Ausfallraten. Dies war mit Standard-Papierschalen unmöglich, die zu stark in der Festigkeit variierten.'
      ]
    },
    testing: {
      title: 'Qualitätsprüfung und Zertifizierung',
      content: [
        'Lumora führt rigorose Qualitätskontrollen an jeder Produktionscharge durch. FP 12+ Schalen werden nach internationalen Standards für Verpackungsmaterialien und Nachhaltigkeitszertifizierung getestet.',
        'Strukturtests umfassen: Druckfestigkeit (vertikaler Belastungstest), Zugfestigkeit der Zellwände, dimensionale Stabilität nach Wasserexposition und Ermüdungstests (wiederholte Nass-/Trockenzyklen). Schalen müssen mindestens 95% der Spezifikationen erreichen, um Zulassung zu erhalten.',
        'Biologische Abbaubarkeit wird nach EN 13432 (EU-Norm für industrielle Kompostierbarkeit) und ASTM D6400 (amerikanisches Äquivalent) validiert. Unabhängige Labore bestätigen vollständige biologische Abbaubarkeit innerhalb von 90 Tagen unter Kompostierbedingungen und innerhalb von 180 Tagen in normaler Gartenerde.',
        'Sicherheitszertifizierung: FP 12+ Schalen sind getestet und zugelassen für den Einsatz in ökologischer Landwirtschaft gemäß EU Organic Regulation 2018/848. Keine nachweisbaren Rückstände von Schwermetallen, Pestiziden oder schädlichen Zusätzen.',
        'Verfolgung und Rückverfolgbarkeit: Jede Schale hat einen Chargecode, der vollständige Rückverfolgbarkeit zur Rohstoffherkunft, Produktionsdatum und Qualitätstestergebnissen ermöglicht. Dies entspricht den Lebensmittelsicherheitsanforderungen für Züchter, die an Supermärkte und Einzelhandel liefern.'
      ]
    },
    implementation: {
      title: 'FP 12+ in Ihrem Betrieb implementieren',
      content: [
        'Der Wechsel zu FP 12+ ist einfach und erfordert keine Änderungen an Ihrem bestehenden Anbauprozess. Die Schalen funktionieren identisch mit konventionellen Plug-Schalen zum Füllen, Säen und Bewässern. Ihr Personal muss keine neuen Fähigkeiten erlernen.',
        'Die Lagerung von FP 12+ Schalen ist flexibler als Kunststoff. Sie sind leichter und stapelbar, was den Lagerraum um 40-60% reduziert. Lagern Sie sie unter trockenen Bedingungen (relative Luftfeuchtigkeit <70%) auf belüfteten Paletten. Unter diesen Bedingungen bleiben sie mindestens 12 Monate perfekt verwendbar.',
        'Für optimale Ergebnisse: Füllen Sie Schalen mit Ihrer Standard-Aussaat- oder Blumenerde, bewässern Sie normal und folgen Sie Ihrem üblichen Fütterungsplan. FP 12+ Papier ist pH-neutral und beeinflusst das Nährstoffgleichgewicht nicht. Keine Anpassungen in EC- oder pH-Management erforderlich.',
        'Transplantation funktioniert genauso wie bei anderen Paper Plugs: Pflanzen Sie den gesamten Plug direkt in den Boden oder Endtopf. Wurzeln dringen leicht durch das Papier ohne Widerstand. Bewässerung nach der Transplantation aktiviert den natürlichen Abbauprozess der Beschichtung.',
        'Wir empfehlen, mit einem Pilotprogramm zu beginnen: Bestellen Sie eine Palette FP 12+ Schalen und testen Sie parallel zu Ihrem aktuellen System in einem Gewächshausabschnitt. Überwachen Sie Wachstumsergebnisse, Wurzelentwicklung und betriebliche Effizienz. Dokumentieren Sie Einsparungen bei Arbeit und Material. Nach Validierung können Sie mit Vertrauen skalieren.',
        'Lumora bietet technische Unterstützung während der Implementierung: Unsere Agronomen helfen bei optimalen Einstellungen für Ihre spezifischen Kulturen, und Betriebsberater beraten zu Bestandsverwaltung und Workflow-Integration. Dieser Service ist kostenlos für neue Kunden.'
      ]
    },
    relatedArticles: {
      title: 'Verwandte Artikel',
      articles: [
        { title: 'Was sind Paper Plug Trays? Vollständige Einführung', href: '/seo/vermehrungstechnologie/was-sind-paper-plug-trays' },
        { title: 'Biologisch abbaubare Anbaulösungen', href: '/seo/vermehrungstechnologie/biologisch-abbaubar' },
        { title: 'Paper vs. Kunststoff Plug Trays Vergleich', href: '/seo/vermehrungstechnologie/papier-vs-kunststoff' },
        { title: 'Optimale Wurzelentwicklung in Paper Plugs', href: '/seo/vermehrungstechnologie/wurzelentwicklung' },
        { title: 'ROI berechnen für Paper Plug Investitionen', href: '/seo/effizienz-roi/roi-berechnen' }
      ]
    },
    finalCta: {
      title: 'Erleben Sie FP 12+ Zuverlässigkeit in Ihrer Gärtnerei',
      subtitle: 'Bestellen Sie heute und erhalten Sie 12 Monate garantierte Stabilität ohne Kompromisse bei der Nachhaltigkeit.',
      ctaText: 'FP 12+ Paper Plug Trays bestellen'
    }
  }
}

export default function FP12TechnologieClient({ locale }: { locale: string }) {
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
          <div className="inline-block bg-lumora-green-100 text-lumora-green-700 text-sm font-medium px-4 py-2 rounded-full mb-6">
            FP 12+ Technology
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

          {/* What Is It */}
          <div className="mb-16">
            <h2 className="font-display text-3xl md:text-4xl text-lumora-dark mb-6">
              {t.whatIs.title}
            </h2>
            {t.whatIs.content.map((paragraph, index) => (
              <p key={index} className="text-lg text-gray-700 mb-6 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Science Section - Highlighted */}
          <div className="mb-16 p-8 bg-lumora-green-50 rounded-2xl border-2 border-lumora-green-200">
            <h2 className="font-display text-3xl md:text-4xl text-lumora-dark mb-6">
              {t.science.title}
            </h2>
            {t.science.content.map((paragraph, index) => (
              <p key={index} className="text-lg text-gray-700 mb-6 leading-relaxed last:mb-0">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Process */}
          <div className="mb-16">
            <h2 className="font-display text-3xl md:text-4xl text-lumora-dark mb-6">
              {t.process.title}
            </h2>
            {t.process.content.map((paragraph, index) => (
              <p key={index} className="text-lg text-gray-700 mb-6 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Benefits Grid */}
          <div className="mb-16">
            <h2 className="font-display text-3xl md:text-4xl text-lumora-dark mb-8">
              {t.benefits.title}
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {t.benefits.items.map((benefit, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-soft hover:shadow-soft-md transition-shadow duration-300">
                  <h3 className="text-xl font-semibold text-lumora-dark mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Mid-Content CTA */}
          <div className="my-16 p-8 bg-lumora-dark text-white rounded-2xl shadow-soft-lg text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              {locale === 'nl' ? 'Ervaar FP 12+ stabiliteit' : locale === 'de' ? 'Erleben Sie FP 12+ Stabilität' : 'Experience FP 12+ stability'}
            </h3>
            <p className="text-lg mb-6 opacity-90">
              {locale === 'nl'
                ? '12 maanden gegarandeerde levensduur voor betrouwbare professionele kweek.'
                : locale === 'de'
                  ? '12 Monate garantierte Lebensdauer für zuverlässigen professionellen Anbau.'
                  : '12 months guaranteed lifespan for reliable professional growing.'}
            </p>
            <Link
              href={localizePathForLocale('/shop', locale)}
              className="inline-flex items-center justify-center bg-lumora-green-500 hover:bg-lumora-green-600 text-white font-semibold px-8 py-4 rounded-xl shadow-soft hover:shadow-soft-md transition-all duration-200"
            >
              {t.hero.cta1}
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>

          {/* Comparison */}
          <div className="mb-16">
            <h2 className="font-display text-3xl md:text-4xl text-lumora-dark mb-6">
              {t.comparison.title}
            </h2>
            {t.comparison.content.map((paragraph, index) => (
              <p key={index} className="text-lg text-gray-700 mb-6 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Real World Results */}
          <div className="mb-16 p-8 bg-lumora-gold-50 rounded-2xl border-2 border-lumora-gold-200">
            <h2 className="font-display text-3xl md:text-4xl text-lumora-dark mb-6">
              {t.realWorld.title}
            </h2>
            {t.realWorld.content.map((paragraph, index) => (
              <p key={index} className="text-lg text-gray-700 mb-6 leading-relaxed last:mb-0">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Testing */}
          <div className="mb-16">
            <h2 className="font-display text-3xl md:text-4xl text-lumora-dark mb-6">
              {t.testing.title}
            </h2>
            {t.testing.content.map((paragraph, index) => (
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

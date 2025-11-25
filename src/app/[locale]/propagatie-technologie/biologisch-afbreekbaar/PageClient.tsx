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
  problem: {
    title: string
    content: string[]
  }
  solution: {
    title: string
    content: string[]
  }
  science: {
    title: string
    content: string[]
  }
  benefits: {
    title: string
    items: Array<{ title: string; description: string }>
  }
  circular: {
    title: string
    content: string[]
  }
  certifications: {
    title: string
    content: string[]
  }
  business: {
    title: string
    content: string[]
  }
  future: {
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
      title: 'Biologisch afbreekbare kweekoplossingen: De toekomst van duurzame professionele teelt',
      subtitle: '100% composteerbare paper plug trays die de circulaire economie in de glastuinbouw realiseren - zonder compromissen op prestaties',
      cta1: 'Bestel Biologisch Afbreekbare Trays',
      cta2: 'Download Duurzaamheidsrapport'
    },
    intro: {
      title: 'De duurzaamheidsrevolutie in professionele propagatie',
      content: [
        'De tuinbouwsector staat voor een fundamentele verschuiving naar duurzaamheid. EU wetgeving wordt strenger, retailers eisen plastic-vrije toeleveringsketens, en consumenten kiezen bewust voor milieuvriendelijke producten. Voor professionele kwekers is dit niet langer een optie maar een noodzaak.',
        'Biologisch afbreekbare paper plug trays zijn de oplossing die deze transitie mogelijk maakt zonder prestatie-inlevering. Ze bieden alle voordelen van moderne propagatietechnologie terwijl ze volledig composteren binnen 8-12 weken na transplantatie. Dit is duurzaamheid die werkt in de praktijk van grootschalige commerciële productie.'
      ]
    },
    problem: {
      title: 'Het plastic probleem in moderne tuinbouw',
      content: [
        'Wereldwijd gebruikt de tuinbouwsector jaarlijks miljoenen tonnen plastic voor propagatiemateriaal. Plastic trays, potten, en verpakkingen accumuleren als afval dat honderden jaren nodig heeft om af te breken. Recycling is theoretisch mogelijk maar praktisch problematisch: vervuiling met potgrond en organisch materiaal maakt recycling vaak oneconomisch.',
        'Het echte probleem reikt verder dan afvalverwerking. Microplastics uit gedegradeerde tuinbouwplastics komen terecht in de bodem en waterwegen. Studies tonen aan dat commerciële teeltgrond significant meer microplastic bevat dan natuurlijke bodem, met onbekende lange-termijn effecten op bodembiologie en voedselketens.',
        'Voor professionele kwekers creëert plastic ook operationele lasten: reinigen, desinfecteren, opslaan tussen seizoenen, en uiteindelijk afvoeren. Dit kost tijd, arbeid, en geld. Bovendien wordt plastic steeds minder acceptabel - grote retailers zoals Albert Heijn en REWE eisen van hun leveranciers reductie van plastic gebruik.',
        'De vraag is niet langer of de sector moet veranderen, maar hoe. Biologisch afbreekbare oplossingen bieden het antwoord: volledige functionaliteit zonder de milieu en business nadelen van plastic.'
      ]
    },
    solution: {
      title: 'Paper plug trays als circulaire oplossing',
      content: [
        'Lumora\'s paper plug trays zijn volledig biologisch afbreekbaar - niet in de theoretische zin van "breekt uiteindelijk af", maar praktisch composteerbaar binnen normale tuinbouw timeframes. Ze zijn gemaakt van natuurlijke cellulosevezels afkomstig van duurzaam bosbeheer (FSC gecertificeerd), zonder plastics, giftige chemicaliën, of persistente additieven.',
        'Het revolutionaire aspect is dat biologische afbreekbaarheid geen prestatie-compromis betekent. Dankzij FP 12+ technologie behouden deze trays structurele integriteit voor 12+ maanden tijdens gebruik, maar composteren ze volledig zodra ze in de grond worden geplant. Dit is mogelijk door een slimme selectieve coating die functie biedt tijdens gebruik maar natuurlijk afbreekt na transplantatie.',
        'Na transplantatie begint het papier geleidelijk te composteren door activiteit van bodem micro-organismen. Dit proces is identiek aan natuurlijke bladafval decompositie. Binnen 8-12 weken is de tray volledig afgebroken tot humus, organische stof die bodemstructuur en vruchtbaarheid verbetert. Er blijft letterlijk niets achter - geen residuen, geen microplastics, geen persistente chemicaliën.',
        'Dit maakt paper plugs inherent circulair: ze beginnen als hernieuwbaar materiaal (boomgroei), dienen hun functie als kweekmateriaal, en keren terug als voedsel voor nieuwe plantengroei. De cirkel is compleet. Dit is hoe moderne tuinbouw hoort te werken.'
      ]
    },
    science: {
      title: 'Wetenschappelijke basis van biologische afbraak',
      content: [
        'Biologische afbreekbaarheid is niet magie maar biochemie. Cellulose, het basismateriaal van paper plugs, is een polysaccharide dat micro-organismen gemakkelijk kunnen metaboliseren. Bacteriën en schimmels produceren cellulase enzymen die cellulose hydrolyseren tot glucose, welke vervolgens als energiebron dient voor microbiële groei.',
        'De afbraaksnelheid hangt af van meerdere factoren: temperatuur (hogere temperatuur = snellere afbraak), vocht (microben hebben water nodig), zuurstof beschikbaarheid (aerobe decompositie is sneller), en microbiële diversiteit (rijkere bodem = meer decomposers). In actieve, gezonde tuinbouwgrond zijn al deze factoren optimaal.',
        'Laboratoriumstudies tonen dat onbehandelde cellulose volledig mineraliseert binnen 30-45 dagen onder composteercondities (55-60°C). FP 12+ behandelde cellulose neemt iets langer door de beschermende coating, maar nog steeds slechts 60-90 dagen - significant sneller dan de 500+ jaar die plastic nodig heeft.',
        'Belangrijker is dat de afbraakproducten volledig onschadelijk zijn. Cellulose breekt af tot CO2, water, en humus - allemaal natuurlijke bodemcomponenten. Geen giftige residuen, geen hormoonontstoorders, geen zware metalen. Onafhankelijke toxiciteittesten bevestigen volledige veiligheid voor planten, bodemorganismen, en mensen.',
        'Dit wordt gevalideerd door officiële certificeringen: EN 13432 (EU), ASTM D6400 (VS), en AS 4736 (Australië). Deze normen vereisen ≥90% biodegradatie binnen 180 dagen en afwezigheid van ecotoxiciteit. Lumora paper plugs overtreffen deze eisen ruimschoots, met volledige afbraak binnen 90 dagen.'
      ]
    },
    benefits: {
      title: 'Voordelen voor duurzame professionele kwekerijen',
      items: [
        {
          title: 'Zero Waste operatie',
          description: 'Geen plastic afval meer om te verwerken. Paper plugs composteren direct in uw operatie, wat afvalverwerkingskosten met 60-80% reduceert. Simpeler, schoner, duurzamer.'
        },
        {
          title: 'EU Green Deal compliant',
          description: 'Voldoet aan huidige en toekomstige EU duurzaamheidswetgeving. Positioneer uw bedrijf als voorloper terwijl concurrentie straks moet aanpassen onder druk van regelgeving.'
        },
        {
          title: 'Retailer toegang',
          description: 'Grote supermarktketens eisen steeds vaker plastic-vrije leveranciers. Paper plugs openen deuren naar premium afzetkanalen die anders gesloten zijn.'
        },
        {
          title: 'Carbon footprint reductie',
          description: '70-80% lagere CO2 uitstoot vs plastic productie. Documenteerbaar in uw CSR rapportage en communicatie naar klanten. Echte klimaatactie, meetbaar en verifieerbaar.'
        },
        {
          title: 'Bodemverbetering',
          description: 'Gecomposteerde paper plugs voegen organische stof toe aan bodem, verbeteren structuur en waterbehoud. Plastic doet het tegenovergestelde: het vervuilt permanent.'
        },
        {
          title: 'Brand value enhancement',
          description: 'Consumenten waarderen duurzaamheid - 73% betaalt premium voor eco-vriendelijke producten (2024 onderzoek). Paper plugs maken uw merk aantrekkelijker.'
        }
      ]
    },
    circular: {
      title: 'Circulaire economie in de praktijk',
      content: [
        'Circulaire economie klinkt als een abstract concept, maar paper plug trays maken het concreet en praktisch. De levenscyclus begint met duurzaam bosbeheer: bomen worden geplant, groeien terwijl ze CO2 absorberen, en worden geoogst zodra ze volwassen zijn. Jonge bomen worden geplant in hun plaats, continuïteit gegarandeerd.',
        'Hout wordt verwerkt tot cellulose pulp via mechanische en chemische processen. Moderne pulp productie is nagenoeg emissie-vrij: proceschemicaliën worden gerecycled, energie komt van biomassa bijproducten, en afvalwater wordt gezuiverd. De resulterende pulp is zuiver, natuurlijk materiaal.',
        'Deze pulp wordt gevormd tot paper plug trays via persing en drogen. FP 12+ behandeling vindt plaats met natuurlijke extracten, geen synthetische chemie. Het product is klaar voor gebruik: functioneel, duurzaam, en volledig biologisch.',
        'Na gebruik in uw kwekerij worden de trays getransplanteerd met planten. In de bodem starten micro-organismen decompositie. Binnen weken is het papier humus - voeding voor bodemorganismen en nieuwe plantengroei. De cirkel is rond: van boom, via kweekmateriaal, terug naar bodem die nieuwe bomen kan voeden.',
        'Dit staat in schril contrast met lineaire economie van plastic: petroleum winning, energie-intensieve productie, kort gebruik, eeuwenlange persistentie als afval. Plastic plugs beginnen als fossiele brandstof en eindigen als permanente vervuiling. Paper plugs beginnen als hernieuwbare hulpbron en eindigen als bodemverrijking. Het verschil is fundamenteel.'
      ]
    },
    certifications: {
      title: 'Certificeringen en compliance',
      content: [
        'Duurzaamheidsclaims vereisen verificatie. Lumora paper plug trays zijn gecertificeerd volgens meerdere internationale normen die biologische afbreekbaarheid, composterbaarheid, en milieuveiligheid garanderen.',
        'EN 13432 is de Europese norm voor industriële composterbaarheid. Deze vereist: ≥90% biodegradatie binnen 180 dagen, geen ecotoxische effecten, volledige desintegratie (fragmenten <2mm), en afwezigheid van zware metalen boven drempelwaarden. Lumora trays overtreffen alle criteria, met volledige biodegradatie binnen 90 dagen.',
        'ASTM D6400 is de Amerikaanse equivalent, met vergelijkbare eisen maar iets verschillende testprotocols. Certificering onder beide normen bevestigt wereldwijde acceptatie en compliance. Dit is cruciaal voor kwekers die exporteren naar VS of Canada.',
        'FSC (Forest Stewardship Council) certificering garandeert dat cellulose afkomstig is van verantwoord bosbeheer. Dit betekent: geen ontbossing, bescherming van biodiversiteit, respect voor inheemse rechten, en duurzaam oogstniveau. FSC is de meest gerespecteerde bosbouw certificering wereldwijd.',
        'OK Compost HOME certificering (TÜV Austria) is zelfs strenger dan industriële composterbaarheid. Het garandeert dat materiaal composterteert in thuiscompost bij lagere temperaturen (20-30°C). Dit is relevant voor kwekers die eindconsumenten bereiken: zelfs in een tuin compostbak breekt het materiaal volledig af.',
        'EU Organic Regulation 2018/848 compliance betekent dat paper plugs gebruikt mogen worden in biologische landbouw. Dit vereist strikte tests op pesticiden, zware metalen, en schadelijke residuen. Goedkeuring bevestigt absolute veiligheid voor biologische teelt systemen.'
      ]
    },
    business: {
      title: 'Business case voor duurzaamheid',
      content: [
        'Duurzaamheid wordt vaak gezien als kostenpost, maar paper plugs demonstreren dat milieuvriendelijk ook economisch voordelig kan zijn. Laten we de volledige kosten vergelijken: plastic vs biologisch afbreekbaar.',
        'Plastic trays lijken goedkoper per stuk (€0.15-0.25 vs €0.30-0.45 voor paper), maar dat is slechts aankoopprijs. Totale kosten omvatten: reiniging (arbeid + water + desinfectie), opslag (magazijnruimte + handling), afvoer (afvalverwerkingskosten + transport), en opportunity cost (kapitaal vast in herbruikbare trays).',
        'Paper plugs elimineren bijna al deze kosten. Geen reiniging nodig - het zijn single-use trays die direct composteren. Geen langdurige opslag - bestel just-in-time voor het seizoen. Geen afvoerkosten - ze verdwijnen in uw eigen compost of direct in de grond. Total Cost of Ownership is typisch 15-25% lager dan plastic bij volledige doorrekening.',
        'Daarbovenop komen indirecte voordelen: 40% arbeidsbesparing bij transplantatie (geen planten uit potten halen), 30% snellere cyclustijden (geen transplantatieschok), en 20-30% minder plantuitval (superieure wortelontwikkeling). Deze operationele verbeteringen vertalen direct naar hogere winstmarges.',
        'Marketing waarde is ook reëel. Klanten - zowel retailers als eindconsumenten - prefereren duurzame leveranciers. Dit opent premium marktsegmenten en rechtvaardigt hogere prijzen. Een Nederlands tuinbouwbedrijf rapporteerde 12% hogere verkoopprijzen voor "plastic-vrije" planten bij biologische retailers.',
        'Risico management is het laatste voordeel. EU wetgeving wordt strenger - single-use plastics verboden zijn uitgebreid, extended producer responsibility komt, carbon border taxes worden ingevoerd. Door nu over te stappen voorkomt u dat u later gedwongen wordt onder tijdsdruk en mogelijk met minder goede alternatieven. Early adoption geeft controle en voorsprong.'
      ]
    },
    future: {
      title: 'De toekomst is biologisch afbreekbaar',
      content: [
        'De transitie naar biologisch afbreekbare kweekoplossingen is onomkeerbaar. Wettelijke druk, marktdruk, en sociale druk convergeren allemaal in dezelfde richting: weg van plastic, naar circulaire materialen. De vraag voor professionele kwekers is niet of maar wanneer u deze stap zet.',
        'Lumora ziet deze trend versnellen. In 2023 groeide onze verkoop van paper plugs met 180% - niet door marketing maar door organic demand van kwekers die de noodzaak zien. Deze kwekers zijn niet idealisten maar pragmatische ondernemers die risico\'s managen en kansen grijpen.',
        'Innovatie stopt niet bij huidige paper plugs. Lumora investeert in R&D voor volgende generaties: nog langere stabiliteit, nog snellere compostatie, geoptimaliseerde nutrient release tijdens afbraak. We experimenteren met functionele additieven zoals mycorrhizae sporen en slow-release meststoffen geïntegreerd in de tray structuur.',
        'Samenwerking met onderzoeksinstituten en universiteiten verdiept ons begrip van plant-papier interacties. Early data suggereert dat bepaalde cellulose afbraakproducten plantgroei stimuleren - mogelijk door signaling naar beneficiale bodem micro-organismen. Dit zou paper plugs niet alleen neutraal maar actief bevorderlijk kunnen maken voor plantgezondheid.',
        'De visie is propagatiesystemen die niet alleen "minder slecht" zijn dan plastic maar actief beter: beter voor planten, beter voor bodem, beter voor uw business. Dit is de toekomst van professionele tuinbouw - waar economie en ecologie niet conflicteren maar convergeren. Lumora bouwt aan die toekomst, samen met vooruitstrevende kwekers wereldwijd.'
      ]
    },
    relatedArticles: {
      title: 'Gerelateerde artikelen',
      articles: [
        { title: 'Wat zijn Paper Plug Trays? Complete introductie', href: '/propagatie-technologie/wat-zijn-paper-plug-trays' },
        { title: 'FP 12+ Technologie: 12 maanden stabiliteit uitgelegd', href: '/propagatie-technologie/fp-12-technologie' },
        { title: 'Paper vs Plastic Plug Trays vergelijking', href: '/propagatie-technologie/paper-vs-plastic' },
        { title: 'Carbon footprint vergelijking: Paper vs Plastic', href: '/duurzaamheid/carbon-footprint' },
        { title: 'EU duurzaamheidsnormen compliance', href: '/duurzaamheid/eu-normen' }
      ]
    },
    finalCta: {
      title: 'Start uw duurzaamheidstransitie vandaag',
      subtitle: 'Sluit u aan bij honderden kwekers die al kozen voor 100% biologisch afbreekbare paper plug trays.',
      ctaText: 'Bestel Biologisch Afbreekbare Trays'
    }
  },
  en: {
    hero: {
      title: 'Biodegradable growing solutions: The future of sustainable professional cultivation',
      subtitle: '100% compostable paper plug trays realizing circular economy in greenhouse horticulture - without performance compromises',
      cta1: 'Order Biodegradable Trays',
      cta2: 'Download Sustainability Report'
    },
    intro: {
      title: 'The sustainability revolution in professional propagation',
      content: [
        'The horticulture sector faces a fundamental shift toward sustainability. EU legislation is getting stricter, retailers demand plastic-free supply chains, and consumers consciously choose environmentally friendly products. For professional growers, this is no longer an option but a necessity.',
        'Biodegradable paper plug trays are the solution enabling this transition without performance sacrifice. They offer all advantages of modern propagation technology while completely composting within 8-12 weeks after transplanting. This is sustainability that works in the reality of large-scale commercial production.'
      ]
    },
    problem: {
      title: 'The plastic problem in modern horticulture',
      content: [
        'Globally, the horticulture sector uses millions of tons of plastic annually for propagation materials. Plastic trays, pots, and packaging accumulate as waste requiring hundreds of years to break down. Recycling is theoretically possible but practically problematic: contamination with potting soil and organic material often makes recycling uneconomical.',
        'The real problem extends beyond waste processing. Microplastics from degraded horticultural plastics end up in soil and waterways. Studies show commercial cultivation soil contains significantly more microplastic than natural soil, with unknown long-term effects on soil biology and food chains.',
        'For professional growers, plastic also creates operational burdens: cleaning, disinfecting, storing between seasons, and ultimately disposal. This costs time, labor, and money. Moreover, plastic is becoming increasingly unacceptable - large retailers like Albert Heijn and REWE demand their suppliers reduce plastic use.',
        'The question is no longer whether the sector must change, but how. Biodegradable solutions provide the answer: full functionality without the environmental and business disadvantages of plastic.'
      ]
    },
    solution: {
      title: 'Paper plug trays as circular solution',
      content: [
        'Lumora\'s paper plug trays are fully biodegradable - not in the theoretical sense of "eventually breaks down", but practically compostable within normal horticultural timeframes. They are made from natural cellulose fibers from sustainable forest management (FSC certified), without plastics, toxic chemicals, or persistent additives.',
        'The revolutionary aspect is that biodegradability means no performance compromise. Thanks to FP 12+ technology, these trays maintain structural integrity for 12+ months during use, but compost completely once planted in soil. This is possible through smart selective coating providing function during use but naturally breaking down after transplanting.',
        'After transplanting, paper gradually composts through activity of soil microorganisms. This process is identical to natural leaf litter decomposition. Within 8-12 weeks the tray is completely broken down to humus, organic matter improving soil structure and fertility. Literally nothing remains - no residues, no microplastics, no persistent chemicals.',
        'This makes paper plugs inherently circular: they start as renewable material (tree growth), serve their function as growing material, and return as food for new plant growth. The circle is complete. This is how modern horticulture should work.'
      ]
    },
    science: {
      title: 'Scientific basis of biodegradation',
      content: [
        'Biodegradability is not magic but biochemistry. Cellulose, the base material of paper plugs, is a polysaccharide that microorganisms can easily metabolize. Bacteria and fungi produce cellulase enzymes that hydrolyze cellulose to glucose, which then serves as energy source for microbial growth.',
        'Breakdown rate depends on multiple factors: temperature (higher temperature = faster breakdown), moisture (microbes need water), oxygen availability (aerobic decomposition is faster), and microbial diversity (richer soil = more decomposers). In active, healthy horticultural soil all these factors are optimal.',
        'Laboratory studies show untreated cellulose completely mineralizes within 30-45 days under composting conditions (55-60°C). FP 12+ treated cellulose takes slightly longer due to protective coating, but still only 60-90 days - significantly faster than the 500+ years plastic requires.',
        'More importantly, breakdown products are completely harmless. Cellulose breaks down to CO2, water, and humus - all natural soil components. No toxic residues, no hormone disruptors, no heavy metals. Independent toxicity tests confirm complete safety for plants, soil organisms, and humans.',
        'This is validated by official certifications: EN 13432 (EU), ASTM D6400 (US), and AS 4736 (Australia). These standards require ≥90% biodegradation within 180 days and absence of ecotoxicity. Lumora paper plugs exceed these requirements by far, with complete breakdown within 90 days.'
      ]
    },
    benefits: {
      title: 'Benefits for sustainable professional nurseries',
      items: [
        {
          title: 'Zero Waste operation',
          description: 'No more plastic waste to process. Paper plugs compost directly in your operation, reducing waste processing costs by 60-80%. Simpler, cleaner, more sustainable.'
        },
        {
          title: 'EU Green Deal compliant',
          description: 'Meets current and future EU sustainability legislation. Position your business as frontrunner while competition must later adapt under regulatory pressure.'
        },
        {
          title: 'Retailer access',
          description: 'Major supermarket chains increasingly demand plastic-free suppliers. Paper plugs open doors to premium sales channels otherwise closed.'
        },
        {
          title: 'Carbon footprint reduction',
          description: '70-80% lower CO2 emissions vs plastic production. Documentable in your CSR reporting and customer communication. Real climate action, measurable and verifiable.'
        },
        {
          title: 'Soil improvement',
          description: 'Composted paper plugs add organic matter to soil, improve structure and water retention. Plastic does the opposite: it pollutes permanently.'
        },
        {
          title: 'Brand value enhancement',
          description: 'Consumers value sustainability - 73% pay premium for eco-friendly products (2024 research). Paper plugs make your brand more attractive.'
        }
      ]
    },
    circular: {
      title: 'Circular economy in practice',
      content: [
        'Circular economy sounds like an abstract concept, but paper plug trays make it concrete and practical. The lifecycle begins with sustainable forest management: trees are planted, grow while absorbing CO2, and are harvested when mature. Young trees are planted in their place, continuity guaranteed.',
        'Wood is processed into cellulose pulp via mechanical and chemical processes. Modern pulp production is nearly emission-free: process chemicals are recycled, energy comes from biomass byproducts, and wastewater is purified. The resulting pulp is pure, natural material.',
        'This pulp is formed into paper plug trays via pressing and drying. FP 12+ treatment occurs with natural extracts, no synthetic chemistry. The product is ready for use: functional, durable, and fully biological.',
        'After use in your nursery, trays are transplanted with plants. In soil, microorganisms start decomposition. Within weeks paper is humus - nutrition for soil organisms and new plant growth. The circle is complete: from tree, via growing material, back to soil that can feed new trees.',
        'This contrasts sharply with linear economy of plastic: petroleum extraction, energy-intensive production, brief use, centuries-long persistence as waste. Plastic plugs start as fossil fuel and end as permanent pollution. Paper plugs start as renewable resource and end as soil enrichment. The difference is fundamental.'
      ]
    },
    certifications: {
      title: 'Certifications and compliance',
      content: [
        'Sustainability claims require verification. Lumora paper plug trays are certified according to multiple international standards guaranteeing biodegradability, compostability, and environmental safety.',
        'EN 13432 is the European standard for industrial compostability. This requires: ≥90% biodegradation within 180 days, no ecotoxic effects, complete disintegration (fragments <2mm), and absence of heavy metals above threshold values. Lumora trays exceed all criteria, with complete biodegradation within 90 days.',
        'ASTM D6400 is the American equivalent, with comparable requirements but slightly different test protocols. Certification under both standards confirms global acceptance and compliance. This is crucial for growers exporting to US or Canada.',
        'FSC (Forest Stewardship Council) certification guarantees cellulose originates from responsible forest management. This means: no deforestation, biodiversity protection, respect for indigenous rights, and sustainable harvest level. FSC is the most respected forestry certification worldwide.',
        'OK Compost HOME certification (TÜV Austria) is even stricter than industrial compostability. It guarantees material composts in home compost at lower temperatures (20-30°C). This is relevant for growers reaching end consumers: even in a garden compost bin the material breaks down completely.',
        'EU Organic Regulation 2018/848 compliance means paper plugs may be used in organic farming. This requires strict tests for pesticides, heavy metals, and harmful residues. Approval confirms absolute safety for organic cultivation systems.'
      ]
    },
    business: {
      title: 'Business case for sustainability',
      content: [
        'Sustainability is often seen as cost item, but paper plugs demonstrate environmental friendliness can also be economically advantageous. Let\'s compare full costs: plastic vs biodegradable.',
        'Plastic trays seem cheaper per piece (€0.15-0.25 vs €0.30-0.45 for paper), but that\'s only purchase price. Total costs include: cleaning (labor + water + disinfection), storage (warehouse space + handling), disposal (waste processing costs + transport), and opportunity cost (capital locked in reusable trays).',
        'Paper plugs eliminate almost all these costs. No cleaning needed - they\'re single-use trays that compost directly. No long-term storage - order just-in-time for the season. No disposal costs - they disappear in your own compost or directly in soil. Total Cost of Ownership is typically 15-25% lower than plastic with full calculation.',
        'On top come indirect benefits: 40% labor savings during transplanting (no removing plants from pots), 30% faster cycle times (no transplant shock), and 20-30% less plant failure (superior root development). These operational improvements translate directly to higher profit margins.',
        'Marketing value is also real. Customers - both retailers and end consumers - prefer sustainable suppliers. This opens premium market segments and justifies higher prices. A Dutch horticulture company reported 12% higher sales prices for "plastic-free" plants at organic retailers.',
        'Risk management is the final advantage. EU legislation is getting stricter - single-use plastics bans are expanded, extended producer responsibility is coming, carbon border taxes are introduced. By switching now you prevent being forced later under time pressure and possibly with worse alternatives. Early adoption gives control and advantage.'
      ]
    },
    future: {
      title: 'The future is biodegradable',
      content: [
        'The transition to biodegradable growing solutions is irreversible. Legal pressure, market pressure, and social pressure all converge in the same direction: away from plastic, toward circular materials. The question for professional growers is not if but when you take this step.',
        'Lumora sees this trend accelerating. In 2023 our paper plug sales grew 180% - not through marketing but through organic demand from growers who see the necessity. These growers are not idealists but pragmatic entrepreneurs managing risks and seizing opportunities.',
        'Innovation doesn\'t stop at current paper plugs. Lumora invests in R&D for next generations: even longer stability, even faster composting, optimized nutrient release during breakdown. We experiment with functional additives like mycorrhizae spores and slow-release fertilizers integrated in tray structure.',
        'Collaboration with research institutes and universities deepens our understanding of plant-paper interactions. Early data suggests certain cellulose breakdown products stimulate plant growth - possibly by signaling to beneficial soil microorganisms. This could make paper plugs not only neutral but actively beneficial for plant health.',
        'The vision is propagation systems not only "less bad" than plastic but actively better: better for plants, better for soil, better for your business. This is the future of professional horticulture - where economy and ecology don\'t conflict but converge. Lumora builds that future, together with progressive growers worldwide.'
      ]
    },
    relatedArticles: {
      title: 'Related articles',
      articles: [
        { title: 'What are Paper Plug Trays? Complete introduction', href: '/seo/propagation-technology/what-are-paper-plug-trays' },
        { title: 'FP 12+ Technology: 12 months stability explained', href: '/seo/propagation-technology/fp-12-technology' },
        { title: 'Paper vs Plastic Plug Trays comparison', href: '/seo/propagation-technology/paper-vs-plastic' },
        { title: 'Carbon footprint comparison: Paper vs Plastic', href: '/seo/sustainability/carbon-footprint' },
        { title: 'EU sustainability standards compliance', href: '/seo/sustainability/eu-standards' }
      ]
    },
    finalCta: {
      title: 'Start your sustainability transition today',
      subtitle: 'Join hundreds of growers who already chose 100% biodegradable paper plug trays.',
      ctaText: 'Order Biodegradable Trays'
    }
  },
  de: {
    hero: {
      title: 'Biologisch abbaubare Anbaulösungen: Die Zukunft des nachhaltigen professionellen Anbaus',
      subtitle: '100% kompostierbare Paper Plug Trays realisieren Kreislaufwirtschaft im Gewächshausanbau - ohne Leistungskompromisse',
      cta1: 'Biologisch abbaubare Trays bestellen',
      cta2: 'Nachhaltigkeitsbericht herunterladen'
    },
    intro: {
      title: 'Die Nachhaltigkeitsrevolution in der professionellen Vermehrung',
      content: [
        'Der Gartenbausektor steht vor einer fundamentalen Verschiebung zur Nachhaltigkeit. EU-Gesetzgebung wird strenger, Einzelhändler fordern kunststofffreie Lieferketten, und Verbraucher wählen bewusst umweltfreundliche Produkte. Für professionelle Züchter ist dies keine Option mehr, sondern eine Notwendigkeit.',
        'Biologisch abbaubare Paper Plug Trays sind die Lösung, die diesen Übergang ohne Leistungseinbußen ermöglicht. Sie bieten alle Vorteile moderner Vermehrungstechnologie, während sie innerhalb von 8-12 Wochen nach der Transplantation vollständig kompostieren. Dies ist Nachhaltigkeit, die in der Realität groß angelegter kommerzieller Produktion funktioniert.'
      ]
    },
    problem: {
      title: 'Das Kunststoffproblem im modernen Gartenbau',
      content: [
        'Weltweit verwendet der Gartenbausektor jährlich Millionen Tonnen Kunststoff für Vermehrungsmaterialien. Kunststoffschalen, -töpfe und -verpackungen sammeln sich als Abfall an, der Hunderte von Jahren zum Abbau benötigt. Recycling ist theoretisch möglich, aber praktisch problematisch: Verunreinigung mit Blumenerde und organischem Material macht Recycling oft unwirtschaftlich.',
        'Das eigentliche Problem reicht über die Abfallverarbeitung hinaus. Mikroplastik aus abgebautem Gartenbaukunststoff gelangt in Boden und Wasserstraßen. Studien zeigen, dass kommerzieller Anbauboden deutlich mehr Mikroplastik enthält als natürlicher Boden, mit unbekannten langfristigen Auswirkungen auf Bodenbiologie und Nahrungsketten.',
        'Für professionelle Züchter schafft Kunststoff auch betriebliche Belastungen: Reinigen, Desinfizieren, Lagern zwischen Saisons und letztendlich Entsorgung. Dies kostet Zeit, Arbeit und Geld. Darüber hinaus wird Kunststoff zunehmend inakzeptabel - große Einzelhändler wie Albert Heijn und REWE fordern von ihren Lieferanten Reduzierung des Kunststoffverbrauchs.',
        'Die Frage ist nicht mehr, ob der Sektor sich ändern muss, sondern wie. Biologisch abbaubare Lösungen liefern die Antwort: volle Funktionalität ohne die Umwelt- und Geschäftsnachteile von Kunststoff.'
      ]
    },
    solution: {
      title: 'Paper Plug Trays als Kreislauflösung',
      content: [
        'Lumoras Paper Plug Trays sind vollständig biologisch abbaubar - nicht im theoretischen Sinne von "baut schließlich ab", sondern praktisch kompostierbar innerhalb normaler Gartenbau-Zeitrahmen. Sie sind aus natürlichen Zellulosefasern aus nachhaltiger Forstwirtschaft (FSC-zertifiziert), ohne Kunststoffe, giftige Chemikalien oder persistente Zusatzstoffe hergestellt.',
        'Der revolutionäre Aspekt ist, dass biologische Abbaubarkeit keinen Leistungskompromiss bedeutet. Dank FP 12+ Technologie behalten diese Schalen strukturelle Integrität für 12+ Monate während der Nutzung, kompostieren aber vollständig, sobald sie in den Boden gepflanzt werden. Dies ist durch intelligente selektive Beschichtung möglich, die Funktion während der Nutzung bietet, aber nach der Transplantation natürlich abbaut.',
        'Nach der Transplantation kompostiert das Papier allmählich durch Aktivität von Bodenmikroorganismen. Dieser Prozess ist identisch mit natürlichem Laubabbau. Innerhalb von 8-12 Wochen ist die Schale vollständig zu Humus abgebaut, organische Substanz, die Bodenstruktur und Fruchtbarkeit verbessert. Buchstäblich nichts bleibt übrig - keine Rückstände, kein Mikroplastik, keine persistenten Chemikalien.',
        'Dies macht Paper Plugs inhärent kreislauffähig: Sie beginnen als erneuerbare Ressource (Baumwachstum), erfüllen ihre Funktion als Anbaumaterial und kehren als Nahrung für neues Pflanzenwachstum zurück. Der Kreislauf ist vollständig. So sollte moderner Gartenbau funktionieren.'
      ]
    },
    science: {
      title: 'Wissenschaftliche Grundlage des biologischen Abbaus',
      content: [
        'Biologische Abbaubarkeit ist keine Magie, sondern Biochemie. Zellulose, das Basismaterial von Paper Plugs, ist ein Polysaccharid, das Mikroorganismen leicht metabolisieren können. Bakterien und Pilze produzieren Cellulase-Enzyme, die Zellulose zu Glukose hydrolysieren, die dann als Energiequelle für mikrobielles Wachstum dient.',
        'Die Abbaugeschwindigkeit hängt von mehreren Faktoren ab: Temperatur (höhere Temperatur = schnellerer Abbau), Feuchtigkeit (Mikroben benötigen Wasser), Sauerstoffverfügbarkeit (aerobe Zersetzung ist schneller) und mikrobielle Vielfalt (reicherer Boden = mehr Zersetzer). In aktivem, gesundem Gartenbauboden sind alle diese Faktoren optimal.',
        'Laborstudien zeigen, dass unbehandelte Zellulose innerhalb von 30-45 Tagen unter Kompostierbedingungen (55-60°C) vollständig mineralisiert. FP 12+ behandelte Zellulose dauert etwas länger aufgrund der Schutzbeschichtung, aber immer noch nur 60-90 Tage - deutlich schneller als die 500+ Jahre, die Kunststoff benötigt.',
        'Wichtiger ist, dass die Abbauprodukte vollständig harmlos sind. Zellulose baut sich zu CO2, Wasser und Humus ab - alles natürliche Bodenkomponenten. Keine giftigen Rückstände, keine Hormonstörer, keine Schwermetalle. Unabhängige Toxizitätstests bestätigen vollständige Sicherheit für Pflanzen, Bodenorganismen und Menschen.',
        'Dies wird durch offizielle Zertifizierungen validiert: EN 13432 (EU), ASTM D6400 (USA) und AS 4736 (Australien). Diese Standards erfordern ≥90% biologische Abbaubarkeit innerhalb von 180 Tagen und Abwesenheit von Ökotoxizität. Lumora Paper Plugs übertreffen diese Anforderungen bei weitem mit vollständigem Abbau innerhalb von 90 Tagen.'
      ]
    },
    benefits: {
      title: 'Vorteile für nachhaltige professionelle Gärtnereien',
      items: [
        {
          title: 'Zero Waste Betrieb',
          description: 'Kein Kunststoffabfall mehr zu verarbeiten. Paper Plugs kompostieren direkt in Ihrem Betrieb, reduzieren Abfallverarbeitungskosten um 60-80%. Einfacher, sauberer, nachhaltiger.'
        },
        {
          title: 'EU Green Deal konform',
          description: 'Erfüllt aktuelle und zukünftige EU-Nachhaltigkeitsgesetzgebung. Positionieren Sie Ihr Unternehmen als Vorreiter, während Konkurrenz später unter Regulierungsdruck anpassen muss.'
        },
        {
          title: 'Einzelhändlerzugang',
          description: 'Große Supermarktketten fordern zunehmend kunststofffreie Lieferanten. Paper Plugs öffnen Türen zu Premium-Vertriebskanälen, die sonst geschlossen sind.'
        },
        {
          title: 'CO2-Fußabdruck-Reduktion',
          description: '70-80% niedrigere CO2-Emissionen vs. Kunststoffproduktion. Dokumentierbar in Ihrer CSR-Berichterstattung und Kundenkommunikation. Echte Klimaaktion, messbar und verifizierbar.'
        },
        {
          title: 'Bodenverbesserung',
          description: 'Kompostierte Paper Plugs fügen dem Boden organische Substanz hinzu, verbessern Struktur und Wasserhaltung. Kunststoff tut das Gegenteil: er verschmutzt dauerhaft.'
        },
        {
          title: 'Markenwert-Steigerung',
          description: 'Verbraucher schätzen Nachhaltigkeit - 73% zahlen Premium für umweltfreundliche Produkte (2024 Forschung). Paper Plugs machen Ihre Marke attraktiver.'
        }
      ]
    },
    circular: {
      title: 'Kreislaufwirtschaft in der Praxis',
      content: [
        'Kreislaufwirtschaft klingt wie ein abstraktes Konzept, aber Paper Plug Trays machen es konkret und praktisch. Der Lebenszyklus beginnt mit nachhaltiger Forstwirtschaft: Bäume werden gepflanzt, wachsen während sie CO2 absorbieren und werden geerntet, wenn sie reif sind. Junge Bäume werden an ihrer Stelle gepflanzt, Kontinuität garantiert.',
        'Holz wird durch mechanische und chemische Prozesse zu Zellulosepulpe verarbeitet. Moderne Pulpeproduktion ist nahezu emissionsfrei: Prozesschemikalien werden recycelt, Energie kommt von Biomasse-Nebenprodukten und Abwasser wird gereinigt. Die resultierende Pulpe ist reines, natürliches Material.',
        'Diese Pulpe wird durch Pressen und Trocknen zu Paper Plug Trays geformt. FP 12+ Behandlung erfolgt mit natürlichen Extrakten, keine synthetische Chemie. Das Produkt ist einsatzbereit: funktional, langlebig und vollständig biologisch.',
        'Nach Gebrauch in Ihrer Gärtnerei werden Schalen mit Pflanzen transplantiert. Im Boden starten Mikroorganismen die Zersetzung. Innerhalb von Wochen ist Papier Humus - Nahrung für Bodenorganismen und neues Pflanzenwachstum. Der Kreis ist geschlossen: von Baum über Anbaumaterial zurück zu Boden, der neue Bäume ernähren kann.',
        'Dies steht in scharfem Kontrast zur linearen Wirtschaft von Kunststoff: Erdölgewinnung, energieintensive Produktion, kurze Nutzung, jahrhundertelange Persistenz als Abfall. Kunststoff-Plugs beginnen als fossiler Brennstoff und enden als dauerhafte Verschmutzung. Paper Plugs beginnen als erneuerbare Ressource und enden als Bodenanreicherung. Der Unterschied ist fundamental.'
      ]
    },
    certifications: {
      title: 'Zertifizierungen und Compliance',
      content: [
        'Nachhaltigkeitsansprüche erfordern Verifizierung. Lumora Paper Plug Trays sind nach mehreren internationalen Standards zertifiziert, die biologische Abbaubarkeit, Kompostierbarkeit und Umweltsicherheit garantieren.',
        'EN 13432 ist die europäische Norm für industrielle Kompostierbarkeit. Diese erfordert: ≥90% biologische Abbaubarkeit innerhalb von 180 Tagen, keine ökotoxischen Effekte, vollständige Desintegration (Fragmente <2mm) und Abwesenheit von Schwermetallen über Schwellenwerten. Lumora Schalen übertreffen alle Kriterien mit vollständiger biologischer Abbaubarkeit innerhalb von 90 Tagen.',
        'ASTM D6400 ist das amerikanische Äquivalent mit vergleichbaren Anforderungen, aber leicht unterschiedlichen Testprotokollen. Zertifizierung unter beiden Standards bestätigt globale Akzeptanz und Compliance. Dies ist entscheidend für Züchter, die in die USA oder Kanada exportieren.',
        'FSC (Forest Stewardship Council) Zertifizierung garantiert, dass Zellulose aus verantwortungsvoller Forstwirtschaft stammt. Dies bedeutet: keine Entwaldung, Schutz der Biodiversität, Respekt für indigene Rechte und nachhaltiges Erntenniveau. FSC ist die am meisten respektierte Forstzertifizierung weltweit.',
        'OK Compost HOME Zertifizierung (TÜV Austria) ist sogar strenger als industrielle Kompostierbarkeit. Sie garantiert, dass Material bei niedrigeren Temperaturen (20-30°C) im Hauskompost kompostiert. Dies ist relevant für Züchter, die Endverbraucher erreichen: selbst in einem Gartenkompostbehälter baut sich das Material vollständig ab.',
        'EU Organic Regulation 2018/848 Compliance bedeutet, dass Paper Plugs in der ökologischen Landwirtschaft verwendet werden dürfen. Dies erfordert strenge Tests auf Pestizide, Schwermetalle und schädliche Rückstände. Zulassung bestätigt absolute Sicherheit für ökologische Anbausysteme.'
      ]
    },
    business: {
      title: 'Business Case für Nachhaltigkeit',
      content: [
        'Nachhaltigkeit wird oft als Kostenposition gesehen, aber Paper Plugs demonstrieren, dass Umweltfreundlichkeit auch wirtschaftlich vorteilhaft sein kann. Vergleichen wir die vollen Kosten: Kunststoff vs. biologisch abbaubar.',
        'Kunststoffschalen scheinen pro Stück günstiger (€0,15-0,25 vs. €0,30-0,45 für Papier), aber das ist nur der Kaufpreis. Gesamtkosten umfassen: Reinigung (Arbeit + Wasser + Desinfektion), Lagerung (Lagerraum + Handling), Entsorgung (Abfallverarbeitungskosten + Transport) und Opportunitätskosten (Kapital gebunden in wiederverwendbaren Schalen).',
        'Paper Plugs eliminieren fast alle diese Kosten. Keine Reinigung erforderlich - sie sind Einweg-Schalen, die direkt kompostieren. Keine langfristige Lagerung - bestellen Sie just-in-time für die Saison. Keine Entsorgungskosten - sie verschwinden in Ihrem eigenen Kompost oder direkt im Boden. Total Cost of Ownership ist typischerweise 15-25% niedriger als Kunststoff bei vollständiger Berechnung.',
        'Obendrein kommen indirekte Vorteile: 40% Arbeitsersparnis beim Transplantieren (kein Entfernen von Pflanzen aus Töpfen), 30% schnellere Zykluszeiten (kein Transplantationsschock) und 20-30% weniger Pflanzenausfall (überlegene Wurzelentwicklung). Diese betrieblichen Verbesserungen übersetzen sich direkt in höhere Gewinnmargen.',
        'Marketingwert ist auch real. Kunden - sowohl Einzelhändler als auch Endverbraucher - bevorzugen nachhaltige Lieferanten. Dies öffnet Premium-Marktsegmente und rechtfertigt höhere Preise. Ein niederländisches Gartenbauunternehmen berichtete von 12% höheren Verkaufspreisen für "plastikfreie" Pflanzen bei Bio-Händlern.',
        'Risikomanagement ist der letzte Vorteil. EU-Gesetzgebung wird strenger - Einweg-Kunststoffverbote werden erweitert, erweiterte Herstellerverantwortung kommt, CO2-Grenzsteuern werden eingeführt. Durch jetzt wechseln verhindern Sie, später unter Zeitdruck gezwungen zu werden und möglicherweise mit schlechteren Alternativen. Frühe Annahme gibt Kontrolle und Vorteil.'
      ]
    },
    future: {
      title: 'Die Zukunft ist biologisch abbaubar',
      content: [
        'Der Übergang zu biologisch abbaubaren Anbaulösungen ist unumkehrbar. Rechtlicher Druck, Marktdruck und sozialer Druck konvergieren alle in dieselbe Richtung: weg von Kunststoff, hin zu Kreislaufmaterialien. Die Frage für professionelle Züchter ist nicht ob, sondern wann Sie diesen Schritt machen.',
        'Lumora sieht diesen Trend beschleunigen. Im Jahr 2023 wuchs unser Paper Plug Verkauf um 180% - nicht durch Marketing, sondern durch organische Nachfrage von Züchtern, die die Notwendigkeit sehen. Diese Züchter sind keine Idealisten, sondern pragmatische Unternehmer, die Risiken managen und Chancen ergreifen.',
        'Innovation stoppt nicht bei aktuellen Paper Plugs. Lumora investiert in F&E für nächste Generationen: noch längere Stabilität, noch schnellere Kompostierung, optimierte Nährstofffreisetzung während des Abbaus. Wir experimentieren mit funktionalen Zusätzen wie Mykorrhiza-Sporen und Langzeitdüngern, die in die Schalenstruktur integriert sind.',
        'Zusammenarbeit mit Forschungsinstituten und Universitäten vertieft unser Verständnis von Pflanzen-Papier-Interaktionen. Frühe Daten deuten darauf hin, dass bestimmte Zellulose-Abbauprodukte Pflanzenwachstum stimulieren - möglicherweise durch Signalisierung an nützliche Bodenmikroorganismen. Dies könnte Paper Plugs nicht nur neutral, sondern aktiv vorteilhaft für Pflanzengesundheit machen.',
        'Die Vision sind Vermehrungssysteme, die nicht nur "weniger schlecht" als Kunststoff sind, sondern aktiv besser: besser für Pflanzen, besser für Boden, besser für Ihr Geschäft. Dies ist die Zukunft des professionellen Gartenbaus - wo Wirtschaft und Ökologie nicht kollidieren, sondern konvergieren. Lumora baut diese Zukunft, zusammen mit progressiven Züchtern weltweit.'
      ]
    },
    relatedArticles: {
      title: 'Verwandte Artikel',
      articles: [
        { title: 'Was sind Paper Plug Trays? Vollständige Einführung', href: '/seo/vermehrungstechnologie/was-sind-paper-plug-trays' },
        { title: 'FP 12+ Technologie: 12 Monate Stabilität erklärt', href: '/seo/vermehrungstechnologie/fp-12-technologie' },
        { title: 'Paper vs. Kunststoff Plug Trays Vergleich', href: '/seo/vermehrungstechnologie/papier-vs-kunststoff' },
        { title: 'CO2-Fußabdruck-Vergleich: Papier vs. Kunststoff', href: '/seo/nachhaltigkeit/co2-fussabdruck' },
        { title: 'EU-Nachhaltigkeitsstandards Compliance', href: '/seo/nachhaltigkeit/eu-standards' }
      ]
    },
    finalCta: {
      title: 'Beginnen Sie Ihren Nachhaltigkeitsübergang heute',
      subtitle: 'Schließen Sie sich Hunderten von Züchtern an, die bereits 100% biologisch abbaubare Paper Plug Trays gewählt haben.',
      ctaText: 'Biologisch abbaubare Trays bestellen'
    }
  }
}

export default function BiologischAfbreekbaarClient({ locale }: { locale: string }) {
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
      <section className="relative py-16 md:py-24 bg-gradient-to-br from-lumora-green-50 via-lumora-cream to-lumora-gold-50">
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <div className="inline-block bg-lumora-green-100 text-lumora-green-700 text-sm font-medium px-4 py-2 rounded-full mb-6">
            100% Biodegradable
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

          {/* Problem Section */}
          <div className="mb-16">
            <h2 className="font-display text-3xl md:text-4xl text-lumora-dark mb-6">
              {t.problem.title}
            </h2>
            {t.problem.content.map((paragraph, index) => (
              <p key={index} className="text-lg text-gray-700 mb-6 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Solution - Highlighted */}
          <div className="mb-16 p-8 bg-lumora-green-50 rounded-2xl border-2 border-lumora-green-200">
            <h2 className="font-display text-3xl md:text-4xl text-lumora-dark mb-6">
              {t.solution.title}
            </h2>
            {t.solution.content.map((paragraph, index) => (
              <p key={index} className="text-lg text-gray-700 mb-6 leading-relaxed last:mb-0">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Science */}
          <div className="mb-16">
            <h2 className="font-display text-3xl md:text-4xl text-lumora-dark mb-6">
              {t.science.title}
            </h2>
            {t.science.content.map((paragraph, index) => (
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
              {locale === 'nl' ? 'Ga plastic-vrij' : locale === 'de' ? 'Werden Sie plastikfrei' : 'Go plastic-free'}
            </h3>
            <p className="text-lg mb-6 opacity-90">
              {locale === 'nl'
                ? '100% biologisch afbreekbaar, volledig composteerbaar in 8-12 weken.'
                : locale === 'de'
                  ? '100% biologisch abbaubar, vollständig kompostierbar in 8-12 Wochen.'
                  : '100% biodegradable, fully compostable in 8-12 weeks.'}
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

          {/* Circular Economy */}
          <div className="mb-16 p-8 bg-lumora-gold-50 rounded-2xl border-2 border-lumora-gold-200">
            <h2 className="font-display text-3xl md:text-4xl text-lumora-dark mb-6">
              {t.circular.title}
            </h2>
            {t.circular.content.map((paragraph, index) => (
              <p key={index} className="text-lg text-gray-700 mb-6 leading-relaxed last:mb-0">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Certifications */}
          <div className="mb-16">
            <h2 className="font-display text-3xl md:text-4xl text-lumora-dark mb-6">
              {t.certifications.title}
            </h2>
            {t.certifications.content.map((paragraph, index) => (
              <p key={index} className="text-lg text-gray-700 mb-6 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Business Case */}
          <div className="mb-16">
            <h2 className="font-display text-3xl md:text-4xl text-lumora-dark mb-6">
              {t.business.title}
            </h2>
            {t.business.content.map((paragraph, index) => (
              <p key={index} className="text-lg text-gray-700 mb-6 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Future */}
          <div className="mb-16">
            <h2 className="font-display text-3xl md:text-4xl text-lumora-dark mb-6">
              {t.future.title}
            </h2>
            {t.future.content.map((paragraph, index) => (
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

import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Leaf, Clock, Sprout, CheckCircle, Beaker, BarChart3, Recycle } from 'lucide-react';
import { localizePathForLocale } from '@/lib/url-localizations';

export const metadata: Metadata = {
  title: 'Composteerbaarheid Paper Plugs | 60-90 Dagen Afbraak | Lumora',
  description: 'Paper plug trays volledig composteerbaar binnen 60-90 dagen volgens EN 13432. Praktische composteerrichtlijnen, bodemverbetering en wetenschappelijke afbraakgegevens voor glastuinbouw.',
  keywords: 'composteerbaarheid paper plugs, biologisch afbreekbaar kweekmateriaal, EN 13432 certificering, composteerinstructies tuinbouw, organisch afval kweekmateriaal, bodemverbetering composteren, biodegradable growing media, compostable plant trays',
  openGraph: {
    title: 'Composteerbaarheid Paper Plugs | 100% Biologisch Afbreekbaar',
    description: 'Wetenschappelijk bewezen composteerbaarheid binnen 60-90 dagen. Praktische handleiding voor professionele tuinbouwcompostering met bodemverbeterende werking.',
  },
};

export default function CompostabilityPage({ params }: { params: { locale: string } }) {
  const locale = params.locale || 'nl';

  const t = {
    hero: {
      title: locale === 'en' ? 'Compostability in Practice' : locale === 'de' ? 'Kompostierbarkeit in der Praxis' : 'Composteerbaarheid in de Praktijk',
      subtitle: locale === 'en' ? '100% biodegradable within 60-90 days. From waste to soil enrichment.' : locale === 'de' ? '100% biologisch abbaubar innerhalb von 60-90 Tagen. Von Abfall zu Bodenverbesserung.' : '100% biologisch afbreekbaar binnen 60-90 dagen. Van afval naar bodemverrijking.',
      cta: locale === 'en' ? 'View composting guide' : locale === 'de' ? 'Kompostierungsanleitung ansehen' : 'Bekijk composteerhandleiding',
    },
    intro: {
      title: locale === 'en' ? 'Why Compostability Matters' : locale === 'de' ? 'Warum Kompostierbarkeit wichtig ist' : 'Waarom Composteerbaarheid Belangrijk Is',
      text1: locale === 'en' ? 'Traditional growing media like rockwool and plastic create significant waste streams in professional horticulture. Paper plug trays offer a circular solution: after use, they break down completely into valuable compost.' : locale === 'de' ? 'Traditionelle Anzuchtmedien wie Steinwolle und Plastik erzeugen erhebliche Abfallströme im professionellen Gartenbau. Papier-Plug-Schalen bieten eine zirkuläre Lösung: Nach der Verwendung zersetzen sie sich vollständig zu wertvollem Kompost.' : 'Traditionele kweekmateriaal zoals steenwol en plastic creëren aanzienlijke afvalstromen in de professionele tuinbouw. Paper plug trays bieden een circulaire oplossing: na gebruik breken ze volledig af tot waardevolle compost.',
      text2: locale === 'en' ? 'This page explains the composting process, timeline, and best practices for integrating paper plug compostability into your greenhouse operations.' : locale === 'de' ? 'Diese Seite erklärt den Kompostierungsprozess, Zeitrahmen und Best Practices für die Integration der Kompostierbarkeit von Papier-Plugs in Ihre Gewächshausbetriebe.' : 'Deze pagina legt het composteerproces, tijdlijn en best practices uit voor het integreren van paper plug composteerbaarheid in uw kasoperaties.',
    },
    timeline: {
      title: locale === 'en' ? 'Composting Timeline: 60-90 Days' : locale === 'de' ? 'Kompostierungs-Zeitplan: 60-90 Tage' : 'Composteer Tijdlijn: 60-90 Dagen',
      subtitle: locale === 'en' ? 'From plant tray to nutrient-rich compost' : locale === 'de' ? 'Von Pflanzschale zu nährstoffreichem Kompost' : 'Van plantenbak tot voedingsrijke compost',
      phases: [
        {
          days: '0-14',
          title: locale === 'en' ? 'Initial Breakdown' : locale === 'de' ? 'Anfänglicher Abbau' : 'Initiële Afbraak',
          description: locale === 'en' ? 'Microbial colonization begins. Paper fibers start softening. Temperature rises to 50-65°C in active compost.' : locale === 'de' ? 'Mikrobielle Besiedlung beginnt. Papierfasern beginnen zu erweichen. Temperatur steigt auf 50-65°C in aktivem Kompost.' : 'Microbiële kolonisatie begint. Papiervezels beginnen te verzachten. Temperatuur stijgt naar 50-65°C in actieve compost.',
          completion: '15%',
        },
        {
          days: '15-30',
          title: locale === 'en' ? 'Active Decomposition' : locale === 'de' ? 'Aktive Zersetzung' : 'Actieve Decompositie',
          description: locale === 'en' ? 'Cellulose breakdown accelerates. Paper structure fragmenting. Fungi and bacteria thriving in optimal conditions.' : locale === 'de' ? 'Zellulose-Abbau beschleunigt sich. Papierstruktur fragmentiert. Pilze und Bakterien gedeihen unter optimalen Bedingungen.' : 'Cellulose afbraak versnelt. Papierstructuur fragmenteert. Schimmels en bacteriën gedijen in optimale omstandigheden.',
          completion: '45%',
        },
        {
          days: '31-60',
          title: locale === 'en' ? 'Advanced Degradation' : locale === 'de' ? 'Fortgeschrittener Abbau' : 'Vergevorderde Afbraak',
          description: locale === 'en' ? 'Paper fully integrated into compost matrix. Original structure no longer visible. Nutrient release ongoing.' : locale === 'de' ? 'Papier vollständig in Kompostmatrix integriert. Ursprüngliche Struktur nicht mehr sichtbar. Nährstofffreisetzung läuft.' : 'Papier volledig geïntegreerd in compostmatrix. Oorspronkelijke structuur niet meer zichtbaar. Nutriëntenafgifte gaande.',
          completion: '80%',
        },
        {
          days: '61-90',
          title: locale === 'en' ? 'Complete Mineralization' : locale === 'de' ? 'Vollständige Mineralisierung' : 'Volledige Mineralisatie',
          description: locale === 'en' ? '100% biodegradation achieved. Stable humus formed. Ready for soil application. No residue remaining.' : locale === 'de' ? '100% biologischer Abbau erreicht. Stabiler Humus gebildet. Bereit für Bodenanwendung. Keine Rückstände verbleiben.' : '100% biodegradatie bereikt. Stabiele humus gevormd. Klaar voor bodemtoepassing. Geen residu achtergebleven.',
          completion: '100%',
        },
      ],
    },
    standard: {
      title: locale === 'en' ? 'EN 13432 Certification: Industry Standard' : locale === 'de' ? 'EN 13432 Zertifizierung: Industriestandard' : 'EN 13432 Certificering: Industriestandaard',
      description: locale === 'en' ? 'Paper plug trays meet all requirements of EN 13432, the European standard for industrial compostability. This certification guarantees safe, complete biodegradation.' : locale === 'de' ? 'Papier-Plug-Schalen erfüllen alle Anforderungen der EN 13432, dem europäischen Standard für industrielle Kompostierbarkeit. Diese Zertifizierung garantiert sicheren, vollständigen biologischen Abbau.' : 'Paper plug trays voldoen aan alle eisen van EN 13432, de Europese standaard voor industriële composteerbaarheid. Deze certificering garandeert veilige, volledige biodegradatie.',
      criteria: [
        {
          title: locale === 'en' ? 'Biodegradability ≥90%' : locale === 'de' ? 'Biologische Abbaubarkeit ≥90%' : 'Biologische Afbreekbaarheid ≥90%',
          description: locale === 'en' ? 'Minimum 90% of organic material must convert to CO2 within 6 months under controlled composting conditions.' : locale === 'de' ? 'Mindestens 90% des organischen Materials müssen innerhalb von 6 Monaten unter kontrollierten Kompostierungsbedingungen zu CO2 umgewandelt werden.' : 'Minimaal 90% van organisch materiaal moet binnen 6 maanden onder gecontroleerde composteeromstandigheden omgezet worden in CO2.',
          result: locale === 'en' ? 'Paper plugs: 95.3% biodegradation' : locale === 'de' ? 'Papier-Plugs: 95,3% biologischer Abbau' : 'Paper plugs: 95,3% biodegradatie',
        },
        {
          title: locale === 'en' ? 'Disintegration ≥90%' : locale === 'de' ? 'Zersetzung ≥90%' : 'Desintegratie ≥90%',
          description: locale === 'en' ? 'After 12 weeks, at least 90% of material must pass through a 2mm sieve. No visible fragments should remain.' : locale === 'de' ? 'Nach 12 Wochen müssen mindestens 90% des Materials durch ein 2-mm-Sieb passen. Keine sichtbaren Fragmente sollten verbleiben.' : 'Na 12 weken moet minimaal 90% van materiaal door een 2mm zeef passen. Geen zichtbare fragmenten mogen overblijven.',
          result: locale === 'en' ? 'Paper plugs: 97.8% disintegration' : locale === 'de' ? 'Papier-Plugs: 97,8% Zersetzung' : 'Paper plugs: 97,8% desintegratie',
        },
        {
          title: locale === 'en' ? 'Ecotoxicity Testing' : locale === 'de' ? 'Ökotoxizitätstests' : 'Ecotoxiciteit Testen',
          description: locale === 'en' ? 'Compost must not negatively affect plant growth. Germination and biomass tests ensure safety for agricultural use.' : locale === 'de' ? 'Kompost darf das Pflanzenwachstum nicht negativ beeinflussen. Keimungs- und Biomassetests gewährleisten Sicherheit für landwirtschaftliche Nutzung.' : 'Compost mag plantengroei niet negatief beïnvloeden. Kieming en biomassa tests verzekeren veiligheid voor landbouwgebruik.',
          result: locale === 'en' ? 'Paper plugs: No growth inhibition detected' : locale === 'de' ? 'Papier-Plugs: Keine Wachstumshemmung festgestellt' : 'Paper plugs: Geen groeiremming gedetecteerd',
        },
        {
          title: locale === 'en' ? 'Heavy Metal Limits' : locale === 'de' ? 'Schwermetallgrenzwerte' : 'Zware Metalen Limieten',
          description: locale === 'en' ? 'Maximum concentrations defined for Zn, Cu, Ni, Cd, Pb, Hg, Cr, Mo, Se, As, Co, Mn to protect soil and water quality.' : locale === 'de' ? 'Maximale Konzentrationen für Zn, Cu, Ni, Cd, Pb, Hg, Cr, Mo, Se, As, Co, Mn definiert zum Schutz von Boden- und Wasserqualität.' : 'Maximum concentraties gedefinieerd voor Zn, Cu, Ni, Cd, Pb, Hg, Cr, Mo, Se, As, Co, Mn om bodem- en waterkwaliteit te beschermen.',
          result: locale === 'en' ? 'Paper plugs: All values <50% of limits' : locale === 'de' ? 'Papier-Plugs: Alle Werte <50% der Grenzwerte' : 'Paper plugs: Alle waarden <50% van limieten',
        },
      ],
    },
    methods: {
      title: locale === 'en' ? 'Practical Composting Methods' : locale === 'de' ? 'Praktische Kompostierungsmethoden' : 'Praktische Composteer Methoden',
      options: [
        {
          icon: '🏭',
          name: locale === 'en' ? 'Industrial Composting' : locale === 'de' ? 'Industrielle Kompostierung' : 'Industriële Compostering',
          time: locale === 'en' ? '60-75 days' : locale === 'de' ? '60-75 Tage' : '60-75 dagen',
          temp: '55-65°C',
          description: locale === 'en' ? 'Large-scale facilities with controlled temperature, moisture, and aeration. Fastest breakdown. Ideal for commercial growers with high volumes.' : locale === 'de' ? 'Großanlagen mit kontrollierten Temperatur-, Feuchtigkeits- und Belüftungsbedingungen. Schnellster Abbau. Ideal für kommerzielle Züchter mit hohen Volumina.' : 'Grootschalige faciliteiten met gecontroleerde temperatuur, vocht en beluchting. Snelste afbraak. Ideaal voor commerciële telers met grote volumes.',
          advantages: [
            locale === 'en' ? 'Fastest decomposition' : locale === 'de' ? 'Schnellste Zersetzung' : 'Snelste decompositie',
            locale === 'en' ? 'Pathogen elimination guaranteed' : locale === 'de' ? 'Pathogeneliminierung garantiert' : 'Pathogeen eliminatie gegarandeerd',
            locale === 'en' ? 'Consistent quality output' : locale === 'de' ? 'Konstante Qualitätsleistung' : 'Consistente kwaliteit output',
            locale === 'en' ? 'Professional processing' : locale === 'de' ? 'Professionelle Verarbeitung' : 'Professionele verwerking',
          ],
        },
        {
          icon: '🌾',
          name: locale === 'en' ? 'On-Site Windrow Composting' : locale === 'de' ? 'Vor-Ort-Mieten-Kompostierung' : 'On-Site Windrow Compostering',
          time: locale === 'en' ? '75-90 days' : locale === 'de' ? '75-90 Tage' : '75-90 dagen',
          temp: '50-60°C',
          description: locale === 'en' ? 'Outdoor composting in long piles (windrows) turned regularly. Suitable for greenhouses with available land. Cost-effective and self-sufficient.' : locale === 'de' ? 'Outdoor-Kompostierung in langen Haufen (Mieten), die regelmäßig gewendet werden. Geeignet für Gewächshäuser mit verfügbarem Land. Kostengünstig und autark.' : 'Outdoor compostering in lange hopen (windrows) regelmatig gekeerd. Geschikt voor kassen met beschikbaar land. Kosteneffectief en zelfvoorzienend.',
          advantages: [
            locale === 'en' ? 'No external costs' : locale === 'de' ? 'Keine externen Kosten' : 'Geen externe kosten',
            locale === 'en' ? 'Full control over process' : locale === 'de' ? 'Volle Kontrolle über Prozess' : 'Volledige controle over proces',
            locale === 'en' ? 'Creates own compost supply' : locale === 'de' ? 'Schafft eigene Kompostversorgung' : 'Creëert eigen compost voorraad',
            locale === 'en' ? 'Circular operation model' : locale === 'de' ? 'Zirkuläres Betriebsmodell' : 'Circulair bedrijfsmodel',
          ],
        },
        {
          icon: '🪴',
          name: locale === 'en' ? 'Small-Scale Bin Composting' : locale === 'de' ? 'Kleinmaßstäbliche Behälter-Kompostierung' : 'Kleinschalige Bak Compostering',
          time: locale === 'en' ? '90-120 days' : locale === 'de' ? '90-120 Tage' : '90-120 dagen',
          temp: '45-55°C',
          description: locale === 'en' ? 'Compact systems for smaller operations. Requires minimal space. Mix paper plugs with green waste for balanced decomposition.' : locale === 'de' ? 'Kompakte Systeme für kleinere Betriebe. Erfordert minimalen Platz. Papier-Plugs mit Grünabfall für ausgewogene Zersetzung mischen.' : 'Compacte systemen voor kleinere operaties. Vereist minimale ruimte. Mix paper plugs met groenafval voor gebalanceerde decompositie.',
          advantages: [
            locale === 'en' ? 'Minimal space required' : locale === 'de' ? 'Minimaler Platzbedarf' : 'Minimale ruimte vereist',
            locale === 'en' ? 'Accessible for all growers' : locale === 'de' ? 'Zugänglich für alle Züchter' : 'Toegankelijk voor alle telers',
            locale === 'en' ? 'Low maintenance' : locale === 'de' ? 'Geringer Wartungsaufwand' : 'Laag onderhoud',
            locale === 'en' ? 'Educational value' : locale === 'de' ? 'Bildungswert' : 'Educatieve waarde',
          ],
        },
        {
          icon: '🔬',
          name: locale === 'en' ? 'Vermicomposting (Worms)' : locale === 'de' ? 'Wurmkompostierung' : 'Vermicompostering (Wormen)',
          time: locale === 'en' ? '60-90 days' : locale === 'de' ? '60-90 Tage' : '60-90 dagen',
          temp: '20-25°C',
          description: locale === 'en' ? 'Earthworms accelerate breakdown and enhance nutrient availability. Produces premium quality vermicompost with excellent soil structure benefits.' : locale === 'de' ? 'Regenwürmer beschleunigen den Abbau und verbessern die Nährstoffverfügbarkeit. Produziert Wurmkompost von Premium-Qualität mit ausgezeichneten Bodenstruktureigenschaften.' : 'Regenwormen versnellen afbraak en verbeteren nutriëntenbeschikbaarheid. Produceert premium kwaliteit vermicompost met uitstekende bodemstructuur voordelen.',
          advantages: [
            locale === 'en' ? 'Nutrient-rich output' : locale === 'de' ? 'Nährstoffreiche Leistung' : 'Voedingsrijke output',
            locale === 'en' ? 'Excellent soil structure' : locale === 'de' ? 'Ausgezeichnete Bodenstruktur' : 'Uitstekende bodemstructuur',
            locale === 'en' ? 'Low odor process' : locale === 'de' ? 'Geruchsarmer Prozess' : 'Laag geur proces',
            locale === 'en' ? 'Premium compost value' : locale === 'de' ? 'Premium-Kompostwert' : 'Premium compost waarde',
          ],
        },
      ],
    },
    benefits: {
      title: locale === 'en' ? 'Soil Benefits of Paper Plug Compost' : locale === 'de' ? 'Bodenvorteile von Papier-Plug-Kompost' : 'Bodemvoordelen van Paper Plug Compost',
      items: [
        {
          icon: '🌱',
          title: locale === 'en' ? 'Organic Matter Enhancement' : locale === 'de' ? 'Verbesserung der organischen Substanz' : 'Organische Stof Verbetering',
          description: locale === 'en' ? 'Increases soil organic carbon by 2-4%. Improves soil structure, water retention, and microbial activity. Long-term fertility gains.' : locale === 'de' ? 'Erhöht den organischen Kohlenstoff im Boden um 2-4%. Verbessert Bodenstruktur, Wasserspeicherung und mikrobielle Aktivität. Langfristige Fruchtbarkeitsgewinne.' : 'Verhoogt bodem organische koolstof met 2-4%. Verbetert bodemstructuur, waterretentie en microbiële activiteit. Langetermijn vruchtbaarheidswinsten.',
        },
        {
          icon: '💧',
          title: locale === 'en' ? 'Water Management' : locale === 'de' ? 'Wassermanagement' : 'Waterbeheer',
          description: locale === 'en' ? 'Enhances water-holding capacity by up to 20%. Reduces irrigation frequency and improves drought resilience. Better moisture distribution in root zone.' : locale === 'de' ? 'Verbessert die Wasserspeicherkapazität um bis zu 20%. Reduziert Bewässerungshäufigkeit und verbessert Dürreresilienz. Bessere Feuchtigkeitsverteilung in Wurzelzone.' : 'Verhoogt waterhoudend vermogen met tot 20%. Vermindert irrigatie frequentie en verbetert droogte veerkracht. Betere vochtdistributie in wortelzone.',
        },
        {
          icon: '🦠',
          title: locale === 'en' ? 'Microbial Diversity' : locale === 'de' ? 'Mikrobielle Vielfalt' : 'Microbiële Diversiteit',
          description: locale === 'en' ? 'Supports beneficial bacteria and fungi populations. Improves nutrient cycling and plant health. Natural disease suppression through biological competition.' : locale === 'de' ? 'Unterstützt nützliche Bakterien- und Pilzpopulationen. Verbessert Nährstoffkreislauf und Pflanzengesundheit. Natürliche Krankheitsunterdrückung durch biologischen Wettbewerb.' : 'Ondersteunt nuttige bacterie- en schimmelpopulaties. Verbetert nutriëntencyclus en plantenezondheid. Natuurlijke ziekteonderdrukking door biologische competitie.',
        },
        {
          icon: '📈',
          title: locale === 'en' ? 'Nutrient Release' : locale === 'de' ? 'Nährstofffreisetzung' : 'Nutriëntenafgifte',
          description: locale === 'en' ? 'Slow-release nitrogen (1.5-2.5% N), phosphorus, and potassium. Balanced nutrition without leaching. Reduces synthetic fertilizer requirements by 15-25%.' : locale === 'de' ? 'Langsam freisetzender Stickstoff (1,5-2,5% N), Phosphor und Kalium. Ausgewogene Ernährung ohne Auswaschung. Reduziert synthetischen Düngebedarf um 15-25%.' : 'Langzame afgifte stikstof (1,5-2,5% N), fosfor en kalium. Gebalanceerde voeding zonder uitspoeling. Vermindert synthetische meststofbehoefte met 15-25%.',
        },
        {
          icon: '🌿',
          title: locale === 'en' ? 'pH Buffering' : locale === 'de' ? 'pH-Pufferung' : 'pH Buffering',
          description: locale === 'en' ? 'Natural pH stabilization between 6.5-7.2. Reduces need for lime or sulfur amendments. Creates optimal growing conditions for most crops.' : locale === 'de' ? 'Natürliche pH-Stabilisierung zwischen 6,5-7,2. Reduziert Bedarf an Kalk- oder Schwefelzusätzen. Schafft optimale Wachstumsbedingungen für die meisten Kulturen.' : 'Natuurlijke pH stabilisatie tussen 6,5-7,2. Vermindert behoefte aan kalk of zwavel aanpassingen. Creëert optimale groeiomstandigheden voor meeste gewassen.',
        },
        {
          icon: '🔒',
          title: locale === 'en' ? 'Carbon Sequestration' : locale === 'de' ? 'Kohlenstoffbindung' : 'Koolstofvastlegging',
          description: locale === 'en' ? 'Locks carbon in stable soil organic matter for years. Contributes to greenhouse carbon accounting goals. Supports climate-positive agriculture practices.' : locale === 'de' ? 'Bindet Kohlenstoff jahrelang in stabiler Bodenorganik. Trägt zu Treibhaus-CO2-Bilanzierungszielen bei. Unterstützt klimapositive Landwirtschaftspraktiken.' : 'Legt koolstof vast in stabiele bodemorganische stof voor jaren. Draagt bij aan kas koolstofboekhouding doelen. Ondersteunt klimaat-positieve landbouwpraktijken.',
        },
      ],
    },
    bestPractices: {
      title: locale === 'en' ? 'Best Practices for Successful Composting' : locale === 'de' ? 'Best Practices für erfolgreiche Kompostierung' : 'Best Practices voor Succesvolle Compostering',
      practices: [
        {
          title: locale === 'en' ? '1. Maintain Carbon-Nitrogen Balance' : locale === 'de' ? '1. Kohlenstoff-Stickstoff-Gleichgewicht aufrechterhalten' : '1. Handhaaf Koolstof-Stikstof Balans',
          description: locale === 'en' ? 'Target C:N ratio of 25-30:1. Mix paper plugs (high carbon) with fresh plant residues (high nitrogen). Prevents slow decomposition or ammonia loss.' : locale === 'de' ? 'Ziel-C:N-Verhältnis von 25-30:1. Papier-Plugs (hoher Kohlenstoff) mit frischen Pflanzenresten (hoher Stickstoff) mischen. Verhindert langsame Zersetzung oder Ammoniaverlust.' : 'Streef C:N verhouding van 25-30:1. Mix paper plugs (hoge koolstof) met verse plantenresten (hoge stikstof). Voorkomt trage decompositie of ammoniakverlies.',
        },
        {
          title: locale === 'en' ? '2. Optimize Moisture Content' : locale === 'de' ? '2. Feuchtigkeitsgehalt optimieren' : '2. Optimaliseer Vochtgehalte',
          description: locale === 'en' ? 'Maintain 50-60% moisture (squeeze test: damp but not dripping). Too dry slows breakdown. Too wet causes anaerobic conditions and odors.' : locale === 'de' ? '50-60% Feuchtigkeit aufrechterhalten (Drucktest: feucht aber nicht tropfend). Zu trocken verlangsamt Abbau. Zu nass verursacht anaerobe Bedingungen und Gerüche.' : 'Handhaaf 50-60% vocht (knijptest: vochtig maar niet druipend). Te droog vertraagt afbraak. Te nat veroorzaakt anaërobe omstandigheden en geuren.',
        },
        {
          title: locale === 'en' ? '3. Ensure Adequate Aeration' : locale === 'de' ? '3. Ausreichende Belüftung sicherstellen' : '3. Verzeker Adequate Beluchting',
          description: locale === 'en' ? 'Turn windrows weekly or use forced aeration systems. Oxygen is essential for aerobic bacteria. Well-aerated compost heats properly and breaks down faster.' : locale === 'de' ? 'Mieten wöchentlich wenden oder Zwangsbelüftungssysteme verwenden. Sauerstoff ist entscheidend für aerobe Bakterien. Gut belüfteter Kompost erhitzt sich richtig und zersetzt sich schneller.' : 'Keer windrows wekelijks of gebruik gedwongen beluchtingssystemen. Zuurstof is essentieel voor aerobe bacteriën. Goed belucht compost verwarmt goed en breekt sneller af.',
        },
        {
          title: locale === 'en' ? '4. Monitor Temperature' : locale === 'de' ? '4. Temperatur überwachen' : '4. Monitor Temperatuur',
          description: locale === 'en' ? 'Target thermophilic phase at 55-65°C for pathogen elimination. Use compost thermometer. If temperature exceeds 70°C, turn immediately to prevent beneficial microbe death.' : locale === 'de' ? 'Ziel thermophile Phase bei 55-65°C für Pathogeneliminierung. Kompostthermometer verwenden. Bei Temperatur über 70°C sofort wenden, um den Tod nützlicher Mikroben zu verhindern.' : 'Streef thermofiele fase bij 55-65°C voor pathogeen eliminatie. Gebruik compost thermometer. Als temperatuur 70°C overschrijdt, direct keren om dood nuttige microben te voorkomen.',
        },
        {
          title: locale === 'en' ? '5. Shred or Mix Thoroughly' : locale === 'de' ? '5. Gründlich zerkleinern oder mischen' : '5. Verschreid of Mix Grondig',
          description: locale === 'en' ? 'Smaller pieces decompose faster. Mix paper plugs evenly throughout pile. Avoid large clumps that decompose unevenly.' : locale === 'de' ? 'Kleinere Stücke zersetzen sich schneller. Papier-Plugs gleichmäßig im Haufen verteilen. Große Klumpen vermeiden, die sich ungleichmäßig zersetzen.' : 'Kleinere stukken decomposteren sneller. Mix paper plugs gelijkmatig door hoop. Vermijd grote klompen die ongelijk decomposteren.',
        },
        {
          title: locale === 'en' ? '6. Avoid Contamination' : locale === 'de' ? '6. Kontamination vermeiden' : '6. Vermijd Contaminatie',
          description: locale === 'en' ? 'Remove any non-compostable materials (plastic clips, labels). Keep diseased plant material separate initially. Thermophilic phase will eliminate most pathogens.' : locale === 'de' ? 'Nicht kompostierbare Materialien entfernen (Plastikclips, Etiketten). Krankes Pflanzenmaterial zunächst separat halten. Thermophile Phase wird die meisten Pathogene eliminieren.' : 'Verwijder niet-composteerbare materialen (plastic clips, labels). Houd ziek plantenmateriaal initieel gescheiden. Thermofiele fase zal meeste pathogenen elimineren.',
        },
      ],
    },
    troubleshooting: {
      title: locale === 'en' ? 'Troubleshooting Common Issues' : locale === 'de' ? 'Fehlerbehebung bei häufigen Problemen' : 'Oplossen van Veelvoorkomende Problemen',
      issues: [
        {
          problem: locale === 'en' ? 'Slow decomposition' : locale === 'de' ? 'Langsame Zersetzung' : 'Trage decompositie',
          causes: locale === 'en' ? 'Too dry, insufficient nitrogen, poor aeration, low temperature' : locale === 'de' ? 'Zu trocken, unzureichender Stickstoff, schlechte Belüftung, niedrige Temperatur' : 'Te droog, onvoldoende stikstof, slechte beluchting, lage temperatuur',
          solution: locale === 'en' ? 'Add water + nitrogen source (grass clippings, manure). Turn pile to improve aeration. Increase pile size if <1m³.' : locale === 'de' ? 'Wasser + Stickstoffquelle hinzufügen (Grasschnitt, Mist). Haufen wenden für bessere Belüftung. Haufengröße erhöhen wenn <1m³.' : 'Voeg water + stikstofbron toe (grasmaaisel, mest). Keer hoop voor betere beluchting. Verhoog hoopgrootte als <1m³.',
        },
        {
          problem: locale === 'en' ? 'Unpleasant odor' : locale === 'de' ? 'Unangenehmer Geruch' : 'Onaangename geur',
          causes: locale === 'en' ? 'Anaerobic conditions from excess moisture or compaction' : locale === 'de' ? 'Anaerobe Bedingungen durch überschüssige Feuchtigkeit oder Verdichtung' : 'Anaërobe omstandigheden door overtollig vocht of verdichting',
          solution: locale === 'en' ? 'Turn immediately. Add dry carbon materials (straw, wood chips). Improve drainage. Reduce moisture content.' : locale === 'de' ? 'Sofort wenden. Trockene Kohlenstoffmaterialien hinzufügen (Stroh, Holzspäne). Drainage verbessern. Feuchtigkeitsgehalt reduzieren.' : 'Direct keren. Voeg droge koolstofmaterialen toe (stro, houtsnippers). Verbeter drainage. Verlaag vochtgehalte.',
        },
        {
          problem: locale === 'en' ? 'Pile not heating' : locale === 'de' ? 'Haufen erwärmt sich nicht' : 'Hoop verwarmt niet',
          causes: locale === 'en' ? 'Pile too small, insufficient moisture, wrong C:N ratio' : locale === 'de' ? 'Haufen zu klein, unzureichende Feuchtigkeit, falsches C:N-Verhältnis' : 'Hoop te klein, onvoldoende vocht, verkeerde C:N verhouding',
          solution: locale === 'en' ? 'Minimum 1m³ pile size needed. Add water if dry. Balance with nitrogen-rich materials.' : locale === 'de' ? 'Mindestens 1m³ Haufengröße erforderlich. Wasser hinzufügen wenn trocken. Mit stickstoffreichen Materialien ausgleichen.' : 'Minimaal 1m³ hoopgrootte nodig. Voeg water toe indien droog. Balanceer met stikstofrijke materialen.',
        },
        {
          problem: locale === 'en' ? 'Pest attraction' : locale === 'de' ? 'Schädlingsanziehung' : 'Ongedierte aantrekking',
          causes: locale === 'en' ? 'Food scraps on surface, inadequate covering, low temperature' : locale === 'de' ? 'Essensreste an Oberfläche, unzureichende Abdeckung, niedrige Temperatur' : 'Voedselresten op oppervlak, onvoldoende afdekking, lage temperatuur',
          solution: locale === 'en' ? 'Bury new materials in center of pile. Cover with finished compost or straw. Maintain hot composting temperatures.' : locale === 'de' ? 'Neue Materialien in Haufenmitte vergraben. Mit fertigem Kompost oder Stroh abdecken. Heiße Kompostierungstemperaturen aufrechterhalten.' : 'Begraaf nieuw materiaal in centrum van hoop. Bedek met afgewerkte compost of stro. Handhaaf hete composteringstemperaturen.',
        },
      ],
    },
    cta: {
      title: locale === 'en' ? 'Start Composting Paper Plugs Today' : locale === 'de' ? 'Beginnen Sie heute mit der Kompostierung von Papier-Plugs' : 'Start Vandaag met Composteren van Paper Plugs',
      description: locale === 'en' ? 'Join the circular horticulture revolution. Turn waste into valuable soil amendments with 100% compostable paper plug trays.' : locale === 'de' ? 'Schließen Sie sich der zirkulären Gartenbau-Revolution an. Verwandeln Sie Abfall in wertvolle Bodenverbesserungsmittel mit 100% kompostierbaren Papier-Plug-Schalen.' : 'Sluit u aan bij de circulaire tuinbouw revolutie. Verander afval in waardevolle bodemverbeteraars met 100% composteerbare paper plug trays.',
      button: locale === 'en' ? 'View compostable trays' : locale === 'de' ? 'Kompostierbare Schalen ansehen' : 'Bekijk composteerbare trays',
      secondary: locale === 'en' ? 'Download composting guide' : locale === 'de' ? 'Kompostierungsanleitung herunterladen' : 'Download composteerhandleiding',
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-lumora-cream to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-700 to-emerald-900 text-white py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Recycle className="w-5 h-5 text-green-300" />
              <span className="text-sm font-medium">
                {locale === 'en' ? 'Circular Economy' : locale === 'de' ? 'Kreislaufwirtschaft' : 'Circulaire Economie'}
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6 leading-tight">
              {t.hero.title}
            </h1>
            <p className="text-xl md:text-2xl text-green-100 mb-8 leading-relaxed">
              {t.hero.subtitle}
            </p>
            <Link
              href={localizePathForLocale('/shop/paper-plug-tray-84', locale)}
              className="inline-flex items-center gap-2 bg-white text-green-700 px-8 py-4 rounded-lg font-semibold hover:bg-green-50 transition-colors shadow-lg"
            >
              {t.hero.cta}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-display font-bold text-lumora-dark mb-6">
              {t.intro.title}
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
              <p>{t.intro.text1}</p>
              <p>{t.intro.text2}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <Clock className="w-16 h-16 text-lumora-green-600 mx-auto mb-4" />
              <h2 className="text-4xl font-display font-bold text-lumora-dark mb-4">
                {t.timeline.title}
              </h2>
              <p className="text-lg text-gray-600">{t.timeline.subtitle}</p>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              {t.timeline.phases.map((phase, index) => (
                <div key={index} className="bg-lumora-cream rounded-xl p-6 shadow-soft">
                  <div className="text-sm font-semibold text-lumora-green-600 mb-2">
                    {locale === 'en' ? 'Days' : locale === 'de' ? 'Tage' : 'Dagen'} {phase.days}
                  </div>
                  <h3 className="text-xl font-bold text-lumora-dark mb-3">{phase.title}</h3>
                  <p className="text-sm text-gray-700 mb-4 leading-relaxed">{phase.description}</p>
                  <div className="relative pt-1">
                    <div className="flex mb-2 items-center justify-between">
                      <div>
                        <span className="text-xs font-semibold inline-block text-lumora-green-600">
                          {phase.completion}
                        </span>
                      </div>
                    </div>
                    <div className="overflow-hidden h-2 text-xs flex rounded bg-green-200">
                      <div
                        style={{ width: phase.completion }}
                        className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-lumora-green-600"
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* EN 13432 Standard */}
      <section className="py-16 bg-lumora-cream">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <CheckCircle className="w-16 h-16 text-lumora-green-600 mx-auto mb-4" />
              <h2 className="text-4xl font-display font-bold text-lumora-dark mb-4">
                {t.standard.title}
              </h2>
              <p className="text-lg text-gray-700 max-w-3xl mx-auto">{t.standard.description}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {t.standard.criteria.map((criterion, index) => (
                <div key={index} className="bg-white rounded-xl p-8 shadow-soft">
                  <h3 className="text-xl font-bold text-lumora-dark mb-3">{criterion.title}</h3>
                  <p className="text-gray-700 mb-4 leading-relaxed">{criterion.description}</p>
                  <div className="bg-green-50 border-l-4 border-lumora-green-600 p-4 rounded">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-lumora-green-600 flex-shrink-0" />
                      <span className="font-semibold text-lumora-green-700">{criterion.result}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Composting Methods */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-display font-bold text-lumora-dark mb-12 text-center">
              {t.methods.title}
            </h2>

            <div className="space-y-8">
              {t.methods.options.map((method, index) => (
                <div key={index} className="bg-lumora-cream rounded-xl p-8 shadow-soft">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="text-6xl flex-shrink-0">{method.icon}</div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-lumora-dark mb-2">{method.name}</h3>
                      <div className="flex gap-4 mb-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-lumora-green-600" />
                          <span className="text-gray-700">{method.time}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Beaker className="w-4 h-4 text-lumora-green-600" />
                          <span className="text-gray-700">{method.temp}</span>
                        </div>
                      </div>
                      <p className="text-gray-700 mb-4 leading-relaxed">{method.description}</p>
                      <div className="grid grid-cols-2 gap-2">
                        {method.advantages.map((advantage, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-lumora-green-600 flex-shrink-0" />
                            <span className="text-sm text-gray-700">{advantage}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Soil Benefits */}
      <section className="py-16 bg-lumora-cream">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <Sprout className="w-16 h-16 text-lumora-green-600 mx-auto mb-4" />
              <h2 className="text-4xl font-display font-bold text-lumora-dark mb-4">
                {t.benefits.title}
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {t.benefits.items.map((benefit, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-soft">
                  <div className="text-4xl mb-3">{benefit.icon}</div>
                  <h3 className="text-lg font-bold text-lumora-dark mb-2">{benefit.title}</h3>
                  <p className="text-sm text-gray-700 leading-relaxed">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Best Practices */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-display font-bold text-lumora-dark mb-12 text-center">
              {t.bestPractices.title}
            </h2>

            <div className="space-y-6">
              {t.bestPractices.practices.map((practice, index) => (
                <div key={index} className="bg-lumora-cream rounded-xl p-6 shadow-soft">
                  <h3 className="text-xl font-bold text-lumora-dark mb-3">{practice.title}</h3>
                  <p className="text-gray-700 leading-relaxed">{practice.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Troubleshooting */}
      <section className="py-16 bg-lumora-cream">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-display font-bold text-lumora-dark mb-12 text-center">
              {t.troubleshooting.title}
            </h2>

            <div className="space-y-6">
              {t.troubleshooting.issues.map((issue, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-soft">
                  <h3 className="text-lg font-bold text-red-600 mb-2">{issue.problem}</h3>
                  <p className="text-sm text-gray-600 mb-3">
                    <span className="font-semibold">
                      {locale === 'en' ? 'Causes:' : locale === 'de' ? 'Ursachen:' : 'Oorzaken:'}
                    </span>{' '}
                    {issue.causes}
                  </p>
                  <p className="text-gray-700">
                    <span className="font-semibold text-lumora-green-600">
                      {locale === 'en' ? 'Solution:' : locale === 'de' ? 'Lösung:' : 'Oplossing:'}
                    </span>{' '}
                    {issue.solution}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-green-700 to-emerald-900 text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-display font-bold mb-6">{t.cta.title}</h2>
            <p className="text-xl text-green-100 mb-8">{t.cta.description}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={localizePathForLocale('/shop/paper-plug-tray-84', locale)}
                className="inline-flex items-center gap-2 bg-white text-green-700 px-8 py-4 rounded-lg font-semibold hover:bg-green-50 transition-colors shadow-lg"
              >
                {t.cta.button}
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href={localizePathForLocale('/contact', locale)}
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white/20 transition-colors"
              >
                {t.cta.secondary}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

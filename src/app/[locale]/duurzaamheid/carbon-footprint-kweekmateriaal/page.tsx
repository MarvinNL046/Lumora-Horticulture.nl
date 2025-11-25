import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Leaf, Factory, TrendingDown, Award, BarChart3, Recycle } from 'lucide-react';
import { localizePathForLocale } from '@/lib/url-localizations';

export const metadata: Metadata = {
  title: 'Carbon Footprint Kweekmateriaal | CO2 Reductie Paperpot | Lumora',
  description: 'Vergelijk de carbon footprint van paperpot pluggen, steenwol en plastic. 70% lagere CO2-uitstoot met papieren kweekmateriaal. Milieudata en LCA-analyse voor duurzame tuinbouw.',
  keywords: 'carbon footprint kweekmateriaal, CO2 reductie tuinbouw, paperpot CO2 footprint, steenwol milieu-impact, plastic pluggen uitstoot, LCA analyse kweekmateriaal, klimaatneutrale teelt, duurzame tuinbouw CO2, sustainable growing media',
  openGraph: {
    title: 'Carbon Footprint Kweekmateriaal | 70% Minder CO2 met Paperpot',
    description: 'Wetenschappelijke analyse van de carbon footprint van paperpot, steenwol en plastic kweekmateriaal. Bewezen CO2-reductie voor duurzame glastuinbouw.',
  },
};

export default function CarbonFootprintPage({ params }: { params: { locale: string } }) {
  const locale = params.locale || 'nl';

  const t = {
    hero: {
      title: locale === 'en' ? 'Carbon Footprint of Growing Media' : locale === 'de' ? 'Carbon Footprint von Anzuchtmaterial' : 'Carbon Footprint van Kweekmateriaal',
      subtitle: locale === 'en' ? 'Paperpot reduces CO2 emissions by 70% compared to traditional materials' : locale === 'de' ? 'Paperpot reduziert CO2-Emissionen um 70% im Vergleich zu traditionellen Materialien' : 'Paperpot vermindert CO2-uitstoot met 70% ten opzichte van traditionele materialen',
      cta: locale === 'en' ? 'View environmental data' : locale === 'de' ? 'Umweltdaten ansehen' : 'Bekijk milieudata',
    },
    intro: {
      title: locale === 'en' ? 'Why Carbon Footprint Matters in Horticulture' : locale === 'de' ? 'Warum Carbon Footprint im Gartenbau wichtig ist' : 'Waarom Carbon Footprint Belangrijk is in de Tuinbouw',
      text1: locale === 'en' ? 'The horticultural sector faces increasing pressure to reduce its environmental impact. Growing media accounts for a significant portion of greenhouse CO2 emissions through production, transport, and disposal.' : locale === 'de' ? 'Der Gartenbausektor steht unter zunehmendem Druck, seine Umweltauswirkungen zu reduzieren. Anzuchtmaterial macht einen erheblichen Teil der Treibhaus-CO2-Emissionen durch Produktion, Transport und Entsorgung aus.' : 'De tuinbouwsector krijgt toenemende druk om de milieu-impact te verminderen. Kweekmateriaal vormt een significant deel van de kas-CO2-uitstoot door productie, transport en afvalverwerking.',
      text2: locale === 'en' ? 'Understanding and reducing the carbon footprint of growing media is essential for sustainable greenhouse operations and meeting climate targets.' : locale === 'de' ? 'Das Verständnis und die Reduzierung des Carbon Footprints von Anzuchtmaterial ist entscheidend für nachhaltige Gewächshausbetriebe und das Erreichen von Klimazielen.' : 'Het begrijpen en verlagen van de carbon footprint van kweekmateriaal is essentieel voor duurzame kasbedrijven en het behalen van klimaatdoelen.',
    },
    comparison: {
      title: locale === 'en' ? 'CO2 Emissions: Material Comparison' : locale === 'de' ? 'CO2-Emissionen: Materialvergleich' : 'CO2-Uitstoot: Materiaalvergelijking',
      subtitle: locale === 'en' ? 'Life cycle analysis (cradle-to-gate) per 1,000 plant plugs' : locale === 'de' ? 'Lebenszyklusanalyse (Cradle-to-Gate) pro 1.000 Pflanzen-Plugs' : 'Levenscyclusanalyse (cradle-to-gate) per 1.000 plantenpluggen',
      materials: {
        paperpot: {
          name: locale === 'en' ? 'Paper Plug Trays' : locale === 'de' ? 'Papier-Anzuchtplatten' : 'Paper Plug Trays',
          co2: '2.8 kg CO2eq',
          production: locale === 'en' ? 'Production: 1.9 kg' : locale === 'de' ? 'Produktion: 1,9 kg' : 'Productie: 1,9 kg',
          transport: locale === 'en' ? 'Transport: 0.6 kg' : locale === 'de' ? 'Transport: 0,6 kg' : 'Transport: 0,6 kg',
          disposal: locale === 'en' ? 'Disposal: 0.3 kg (composting)' : locale === 'de' ? 'Entsorgung: 0,3 kg (Kompostierung)' : 'Afval: 0,3 kg (compostering)',
        },
        rockwool: {
          name: locale === 'en' ? 'Rockwool' : locale === 'de' ? 'Steinwolle' : 'Steenwol',
          co2: '9.4 kg CO2eq',
          production: locale === 'en' ? 'Production: 7.8 kg' : locale === 'de' ? 'Produktion: 7,8 kg' : 'Productie: 7,8 kg',
          transport: locale === 'en' ? 'Transport: 0.9 kg' : locale === 'de' ? 'Transport: 0,9 kg' : 'Transport: 0,9 kg',
          disposal: locale === 'en' ? 'Disposal: 0.7 kg (landfill)' : locale === 'de' ? 'Entsorgung: 0,7 kg (Deponie)' : 'Afval: 0,7 kg (storten)',
        },
        plastic: {
          name: locale === 'en' ? 'Plastic Trays' : locale === 'de' ? 'Plastikschalen' : 'Plastic Trays',
          co2: '12.1 kg CO2eq',
          production: locale === 'en' ? 'Production: 9.5 kg' : locale === 'de' ? 'Produktion: 9,5 kg' : 'Productie: 9,5 kg',
          transport: locale === 'en' ? 'Transport: 1.2 kg' : locale === 'de' ? 'Transport: 1,2 kg' : 'Transport: 1,2 kg',
          disposal: locale === 'en' ? 'Disposal: 1.4 kg (incineration)' : locale === 'de' ? 'Entsorgung: 1,4 kg (Verbrennung)' : 'Afval: 1,4 kg (verbranding)',
        },
      },
    },
    lifecycle: {
      title: locale === 'en' ? 'Life Cycle Analysis: Production to Disposal' : locale === 'de' ? 'Lebenszyklusanalyse: Produktion bis Entsorgung' : 'Levenscyclusanalyse: Productie tot Afvalverwerking',
      phases: {
        raw: {
          title: locale === 'en' ? '1. Raw Material Extraction' : locale === 'de' ? '1. Rohstoffgewinnung' : '1. Grondstofwinning',
          paperpot: locale === 'en' ? 'FSC-certified wood pulp from sustainably managed forests. Low energy forestry and pulp production.' : locale === 'de' ? 'FSC-zertifizierter Holzzellstoff aus nachhaltig bewirtschafteten Wäldern. Energiearme Forstwirtschaft und Zellstoffproduktion.' : 'FSC-gecertificeerde houtpulp uit duurzaam beheerde bossen. Lage energie bosbouw en pulpproductie.',
          rockwool: locale === 'en' ? 'Basalt rock mining and limestone extraction. Energy-intensive mining operations.' : locale === 'de' ? 'Basaltgesteinsabbau und Kalksteingewinnung. Energieintensive Bergbauoperationen.' : 'Basaltgesteente winning en kalksteen extractie. Energie-intensieve mijnbouw.',
          plastic: locale === 'en' ? 'Petroleum extraction and refinement. Fossil fuel-based production chain.' : locale === 'de' ? 'Erdölförderung und -raffination. Auf fossilen Brennstoffen basierende Produktionskette.' : 'Aardolie winning en raffinage. Op fossiele brandstoffen gebaseerde productieketen.',
        },
        manufacturing: {
          title: locale === 'en' ? '2. Manufacturing Process' : locale === 'de' ? '2. Herstellungsprozess' : '2. Productieproces',
          paperpot: locale === 'en' ? 'Paper forming at 80-120°C. Minimal chemical processing. Renewable energy powered facilities.' : locale === 'de' ? 'Papierformung bei 80-120°C. Minimale chemische Verarbeitung. Mit erneuerbarer Energie betriebene Anlagen.' : 'Papiervormgeving bij 80-120°C. Minimale chemische verwerking. Faciliteiten op hernieuwbare energie.',
          rockwool: locale === 'en' ? 'Melting at 1,500-2,000°C. Extremely high energy requirement. Significant CO2 emissions from heating.' : locale === 'de' ? 'Schmelzen bei 1.500-2.000°C. Extrem hoher Energiebedarf. Erhebliche CO2-Emissionen durch Erhitzung.' : 'Smelten bij 1.500-2.000°C. Extreem hoge energie behoefte. Aanzienlijke CO2-uitstoot door verhitting.',
          plastic: locale === 'en' ? 'Polymer extrusion at 200-300°C. Chemical catalysts required. Petrochemical-based process.' : locale === 'de' ? 'Polymerextrusion bei 200-300°C. Chemische Katalysatoren erforderlich. Petrochemischer Prozess.' : 'Polymeer extrusie bij 200-300°C. Chemische katalysatoren vereist. Petrochemisch gebaseerd proces.',
        },
        transport: {
          title: locale === 'en' ? '3. Transport & Distribution' : locale === 'de' ? '3. Transport & Distribution' : '3. Transport & Distributie',
          paperpot: locale === 'en' ? 'Lightweight material (40% lighter than alternatives). Stackable design reduces transport volume by 60%.' : locale === 'de' ? 'Leichtgewichtiges Material (40% leichter als Alternativen). Stapelbares Design reduziert Transportvolumen um 60%.' : 'Lichtgewicht materiaal (40% lichter dan alternatieven). Stapelbaar ontwerp reduceert transportvolume met 60%.',
          rockwool: locale === 'en' ? 'Heavy material with high transport emissions. Bulky packaging increases fuel consumption.' : locale === 'de' ? 'Schweres Material mit hohen Transportemissionen. Sperrige Verpackung erhöht den Kraftstoffverbrauch.' : 'Zwaar materiaal met hoge transportemissies. Omvangrijke verpakking verhoogt brandstofverbruik.',
          plastic: locale === 'en' ? 'Moderate weight but bulky. Inefficient space utilization in transport.' : locale === 'de' ? 'Mäßiges Gewicht, aber sperrig. Ineffiziente Raumnutzung beim Transport.' : 'Matig gewicht maar omvangrijk. Inefficiënt ruimtegebruik bij transport.',
        },
        disposal: {
          title: locale === 'en' ? '4. End-of-Life Disposal' : locale === 'de' ? '4. Entsorgung am Lebensende' : '4. Einde-Levensduur Afvalverwerking',
          paperpot: locale === 'en' ? '100% compostable within 60-90 days. Carbon sequestration in soil. Zero waste stream.' : locale === 'de' ? '100% kompostierbar innerhalb von 60-90 Tagen. Kohlenstoffbindung im Boden. Kein Abfallstrom.' : '100% composteerbaar binnen 60-90 dagen. Koolstofopslag in bodem. Nul afvalstroom.',
          rockwool: locale === 'en' ? 'Non-biodegradable landfill waste. Potential for limited recycling (energy-intensive). Permanent environmental burden.' : locale === 'de' ? 'Nicht biologisch abbaubarer Deponieabfall. Potenzial für begrenztes Recycling (energieintensiv). Dauerhafte Umweltbelastung.' : 'Niet-biologisch afbreekbaar stortafval. Potentieel voor beperkte recycling (energie-intensief). Permanente milieubelasting.',
          plastic: locale === 'en' ? 'Incineration with CO2 emissions or landfill. Microplastic contamination risk. Complex recycling process.' : locale === 'de' ? 'Verbrennung mit CO2-Emissionen oder Deponie. Risiko der Mikroplastikverschmutzung. Komplexer Recyclingprozess.' : 'Verbranding met CO2-uitstoot of stortplaats. Risico op microplastic vervuiling. Complex recyclingproces.',
        },
      },
    },
    reduction: {
      title: locale === 'en' ? 'CO2 Reduction Strategies with Paper Plugs' : locale === 'de' ? 'CO2-Reduktionsstrategien mit Papier-Plugs' : 'CO2 Reductiestrategieën met Paper Plugs',
      strategies: [
        {
          icon: '🏭',
          title: locale === 'en' ? 'Low-Energy Production' : locale === 'de' ? 'Energiearme Produktion' : 'Lage-Energie Productie',
          description: locale === 'en' ? 'Paper plug manufacturing requires 75% less energy than rockwool melting. Production at 80-120°C vs. 1,500-2,000°C significantly reduces fossil fuel consumption.' : locale === 'de' ? 'Die Herstellung von Papier-Plugs erfordert 75% weniger Energie als das Schmelzen von Steinwolle. Produktion bei 80-120°C vs. 1.500-2.000°C reduziert den Verbrauch fossiler Brennstoffe erheblich.' : 'Paper plug productie vereist 75% minder energie dan steenwol smelten. Productie bij 80-120°C vs. 1.500-2.000°C vermindert fossiele brandstofverbruik aanzienlijk.',
        },
        {
          icon: '🌱',
          title: locale === 'en' ? 'Renewable Raw Materials' : locale === 'de' ? 'Erneuerbare Rohstoffe' : 'Hernieuwbare Grondstoffen',
          description: locale === 'en' ? 'FSC-certified wood pulp is a renewable resource that sequesters CO2 during tree growth. Each ton of paper plugs represents approximately 1.8 tons of CO2 captured from the atmosphere.' : locale === 'de' ? 'FSC-zertifizierter Holzzellstoff ist eine erneuerbare Ressource, die während des Baumwachstums CO2 bindet. Jede Tonne Papier-Plugs repräsentiert etwa 1,8 Tonnen aus der Atmosphäre gebundenes CO2.' : 'FSC-gecertificeerde houtpulp is een hernieuwbare grondstof die CO2 vastlegt tijdens boomgroei. Elke ton paper plugs vertegenwoordigt ongeveer 1,8 ton uit de atmosfeer gevangen CO2.',
        },
        {
          icon: '🚛',
          title: locale === 'en' ? 'Optimized Transport Logistics' : locale === 'de' ? 'Optimierte Transportlogistik' : 'Geoptimaliseerde Transportlogistiek',
          description: locale === 'en' ? 'Lightweight and stackable design reduces transport CO2 by 60%. One truck can carry 40% more paper plug trays compared to traditional alternatives, reducing trips and emissions.' : locale === 'de' ? 'Leichtes und stapelbares Design reduziert Transport-CO2 um 60%. Ein LKW kann 40% mehr Papier-Plug-Schalen im Vergleich zu traditionellen Alternativen transportieren, was Fahrten und Emissionen reduziert.' : 'Lichtgewicht en stapelbaar ontwerp vermindert transport-CO2 met 60%. Eén vrachtwagen kan 40% meer paper plug trays vervoeren vergeleken met traditionele alternatieven, wat ritten en uitstoot reduceert.',
        },
        {
          icon: '♻️',
          title: locale === 'en' ? 'Carbon-Negative Disposal' : locale === 'de' ? 'Kohlenstoffnegative Entsorgung' : 'Koolstofnegatieve Afvalverwerking',
          description: locale === 'en' ? 'Composting paper plugs returns organic matter to soil, creating a carbon sink. Unlike incineration or landfill, composting locks CO2 in stable soil organic matter for decades.' : locale === 'de' ? 'Die Kompostierung von Papier-Plugs führt organische Substanz dem Boden zurück und schafft eine Kohlenstoffsenke. Im Gegensatz zu Verbrennung oder Deponie bindet die Kompostierung CO2 für Jahrzehnte in stabiler Bodenorganik.' : 'Composteren van paper plugs brengt organisch materiaal terug naar de bodem en creëert een koolstofput. Anders dan verbranding of stortplaats, legt compostering CO2 vast in stabiele bodemorganische stof voor decennia.',
        },
        {
          icon: '📊',
          title: locale === 'en' ? 'Transparent Carbon Accounting' : locale === 'de' ? 'Transparente CO2-Bilanzierung' : 'Transparante CO2-Boekhouding',
          description: locale === 'en' ? 'Full LCA data available for ESG reporting and sustainability certifications. Third-party verified carbon footprint calculations enable accurate greenhouse carbon accounting.' : locale === 'de' ? 'Vollständige LCA-Daten verfügbar für ESG-Berichterstattung und Nachhaltigkeitszertifizierungen. Von Dritten verifizierte Carbon-Footprint-Berechnungen ermöglichen eine genaue Treibhaus-CO2-Bilanzierung.' : 'Volledige LCA-data beschikbaar voor ESG-rapportage en duurzaamheidscertificeringen. Door derden geverifieerde carbon footprint berekeningen maken nauwkeurige kas-CO2-boekhouding mogelijk.',
        },
        {
          icon: '🌍',
          title: locale === 'en' ? 'Circular Economy Integration' : locale === 'de' ? 'Kreislaufwirtschaft-Integration' : 'Circulaire Economie Integratie',
          description: locale === 'en' ? 'Paper plugs fit perfectly in circular horticulture systems. Post-harvest composting creates nutrient-rich soil amendments, closing the production loop without waste or emissions.' : locale === 'de' ? 'Papier-Plugs passen perfekt in zirkuläre Gartenbausysteme. Die Kompostierung nach der Ernte schafft nährstoffreiche Bodenverbesserungsmittel und schließt den Produktionskreislauf ohne Abfall oder Emissionen.' : 'Paper plugs passen perfect in circulaire tuinbouwsystemen. Compostering na oogst creëert voedingsrijke bodemverbeteraars en sluit de productielus zonder afval of uitstoot.',
        },
      ],
    },
    certification: {
      title: locale === 'en' ? 'Verified Environmental Impact' : locale === 'de' ? 'Verifizierte Umweltauswirkungen' : 'Geverifieerde Milieu-impact',
      certifications: [
        {
          name: locale === 'en' ? 'ISO 14040 LCA Certification' : locale === 'de' ? 'ISO 14040 LCA-Zertifizierung' : 'ISO 14040 LCA Certificering',
          description: locale === 'en' ? 'Life cycle analysis following international standards' : locale === 'de' ? 'Lebenszyklusanalyse nach internationalen Standards' : 'Levenscyclusanalyse volgens internationale standaarden',
        },
        {
          name: locale === 'en' ? 'FSC Chain of Custody' : locale === 'de' ? 'FSC Chain of Custody' : 'FSC Chain of Custody',
          description: locale === 'en' ? 'Traceable sustainable forestry certification' : locale === 'de' ? 'Rückverfolgbare Zertifizierung nachhaltiger Forstwirtschaft' : 'Traceerbare duurzame bosbouw certificering',
        },
        {
          name: locale === 'en' ? 'Carbon Trust Verification' : locale === 'de' ? 'Carbon Trust Verifizierung' : 'Carbon Trust Verificatie',
          description: locale === 'en' ? 'Third-party carbon footprint validation' : locale === 'de' ? 'Drittanbieter Carbon-Footprint-Validierung' : 'Externe carbon footprint validatie',
        },
        {
          name: locale === 'en' ? 'EN 13432 Compostability' : locale === 'de' ? 'EN 13432 Kompostierbarkeit' : 'EN 13432 Composteerbaarheid',
          description: locale === 'en' ? 'Certified biodegradability and compost safety' : locale === 'de' ? 'Zertifizierte biologische Abbaubarkeit und Kompostsicherheit' : 'Gecertificeerde biologische afbreekbaarheid en compostveiligheid',
        },
      ],
    },
    calculator: {
      title: locale === 'en' ? 'Calculate Your CO2 Reduction' : locale === 'de' ? 'Berechnen Sie Ihre CO2-Reduktion' : 'Bereken Uw CO2 Reductie',
      description: locale === 'en' ? 'See how much CO2 your greenhouse can save by switching to paper plug trays. Based on verified LCA data.' : locale === 'de' ? 'Sehen Sie, wie viel CO2 Ihr Gewächshaus durch den Umstieg auf Papier-Plug-Schalen einsparen kann. Basierend auf verifizierten LCA-Daten.' : 'Zie hoeveel CO2 uw kas kan besparen door over te stappen op paper plug trays. Gebaseerd op geverifieerde LCA-data.',
      input: locale === 'en' ? 'Annual plug production:' : locale === 'de' ? 'Jährliche Plug-Produktion:' : 'Jaarlijkse plug productie:',
      plugs: locale === 'en' ? 'plugs per year' : locale === 'de' ? 'Plugs pro Jahr' : 'pluggen per jaar',
      results: {
        current: locale === 'en' ? 'Current material' : locale === 'de' ? 'Aktuelles Material' : 'Huidig materiaal',
        rockwool: locale === 'en' ? 'Rockwool' : locale === 'de' ? 'Steinwolle' : 'Steenwol',
        plastic: locale === 'en' ? 'Plastic' : locale === 'de' ? 'Plastik' : 'Plastic',
        reduction: locale === 'en' ? 'Annual CO2 reduction:' : locale === 'de' ? 'Jährliche CO2-Reduktion:' : 'Jaarlijkse CO2 reductie:',
        equivalent: locale === 'en' ? 'Equivalent to' : locale === 'de' ? 'Entspricht' : 'Gelijk aan',
        trees: locale === 'en' ? 'trees planted' : locale === 'de' ? 'gepflanzten Bäumen' : 'geplante bomen',
        cars: locale === 'en' ? 'cars off the road' : locale === 'de' ? 'Autos weniger auf der Straße' : 'auto\'s van de weg',
      },
    },
    cta: {
      title: locale === 'en' ? 'Reduce Your Carbon Footprint Today' : locale === 'de' ? 'Reduzieren Sie heute Ihren Carbon Footprint' : 'Verlaag Vandaag Uw Carbon Footprint',
      description: locale === 'en' ? 'Switch to paper plug trays and lower your greenhouse CO2 emissions by 70%. Request full LCA documentation and environmental impact reports.' : locale === 'de' ? 'Wechseln Sie zu Papier-Plug-Schalen und senken Sie die CO2-Emissionen Ihres Gewächshauses um 70%. Fordern Sie vollständige LCA-Dokumentation und Umweltauswirkungsberichte an.' : 'Stap over op paper plug trays en verlaag uw kas-CO2-uitstoot met 70%. Vraag volledige LCA-documentatie en milieu-impactrapporten aan.',
      button: locale === 'en' ? 'View paper plug trays' : locale === 'de' ? 'Papier-Plug-Schalen ansehen' : 'Bekijk paper plug trays',
      secondary: locale === 'en' ? 'Request LCA report' : locale === 'de' ? 'LCA-Bericht anfordern' : 'Vraag LCA-rapport aan',
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-lumora-cream to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-lumora-dark to-lumora-green-600 text-white py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
              <Leaf className="w-5 h-5 text-green-300" />
              <span className="text-sm font-medium">
                {locale === 'en' ? 'Environmental Impact' : locale === 'de' ? 'Umweltauswirkungen' : 'Milieu-impact'}
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
              className="inline-flex items-center gap-2 bg-white text-lumora-green-600 px-8 py-4 rounded-lg font-semibold hover:bg-green-50 transition-colors shadow-lg"
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

      {/* Material Comparison */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-display font-bold text-lumora-dark mb-4">
                {t.comparison.title}
              </h2>
              <p className="text-lg text-gray-600">{t.comparison.subtitle}</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Paper Plug */}
              <div className="bg-green-50 rounded-xl p-8 shadow-soft border-2 border-green-200">
                <div className="flex items-center gap-3 mb-4">
                  <Leaf className="w-8 h-8 text-lumora-green-600" />
                  <h3 className="text-2xl font-bold text-lumora-dark">
                    {t.comparison.materials.paperpot.name}
                  </h3>
                </div>
                <div className="text-4xl font-bold text-lumora-green-600 mb-6">
                  {t.comparison.materials.paperpot.co2}
                </div>
                <div className="space-y-2 text-gray-700">
                  <p className="text-sm">{t.comparison.materials.paperpot.production}</p>
                  <p className="text-sm">{t.comparison.materials.paperpot.transport}</p>
                  <p className="text-sm">{t.comparison.materials.paperpot.disposal}</p>
                </div>
                <div className="mt-6 pt-6 border-t border-green-200">
                  <div className="flex items-center gap-2 text-green-700 font-semibold">
                    <TrendingDown className="w-5 h-5" />
                    <span>70% {locale === 'en' ? 'lower' : locale === 'de' ? 'niedriger' : 'lager'}</span>
                  </div>
                </div>
              </div>

              {/* Rockwool */}
              <div className="bg-gray-50 rounded-xl p-8 shadow-soft">
                <div className="flex items-center gap-3 mb-4">
                  <Factory className="w-8 h-8 text-gray-600" />
                  <h3 className="text-2xl font-bold text-lumora-dark">
                    {t.comparison.materials.rockwool.name}
                  </h3>
                </div>
                <div className="text-4xl font-bold text-orange-600 mb-6">
                  {t.comparison.materials.rockwool.co2}
                </div>
                <div className="space-y-2 text-gray-700">
                  <p className="text-sm">{t.comparison.materials.rockwool.production}</p>
                  <p className="text-sm">{t.comparison.materials.rockwool.transport}</p>
                  <p className="text-sm">{t.comparison.materials.rockwool.disposal}</p>
                </div>
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex items-center gap-2 text-orange-600 font-semibold">
                    <span>+236% {locale === 'en' ? 'vs paper' : locale === 'de' ? 'vs. Papier' : 'vs papier'}</span>
                  </div>
                </div>
              </div>

              {/* Plastic */}
              <div className="bg-gray-50 rounded-xl p-8 shadow-soft">
                <div className="flex items-center gap-3 mb-4">
                  <Factory className="w-8 h-8 text-gray-600" />
                  <h3 className="text-2xl font-bold text-lumora-dark">
                    {t.comparison.materials.plastic.name}
                  </h3>
                </div>
                <div className="text-4xl font-bold text-red-600 mb-6">
                  {t.comparison.materials.plastic.co2}
                </div>
                <div className="space-y-2 text-gray-700">
                  <p className="text-sm">{t.comparison.materials.plastic.production}</p>
                  <p className="text-sm">{t.comparison.materials.plastic.transport}</p>
                  <p className="text-sm">{t.comparison.materials.plastic.disposal}</p>
                </div>
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex items-center gap-2 text-red-600 font-semibold">
                    <span>+332% {locale === 'en' ? 'vs paper' : locale === 'de' ? 'vs. Papier' : 'vs papier'}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Life Cycle Analysis */}
      <section className="py-16 bg-lumora-cream">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-display font-bold text-lumora-dark mb-12 text-center">
              {t.lifecycle.title}
            </h2>

            <div className="space-y-8">
              {Object.entries(t.lifecycle.phases).map(([key, phase]) => (
                <div key={key} className="bg-white rounded-xl p-8 shadow-soft">
                  <h3 className="text-2xl font-bold text-lumora-dark mb-6">{phase.title}</h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="border-l-4 border-green-500 pl-4">
                      <div className="font-semibold text-lumora-green-600 mb-2">
                        {t.comparison.materials.paperpot.name}
                      </div>
                      <p className="text-sm text-gray-700">{phase.paperpot}</p>
                    </div>
                    <div className="border-l-4 border-orange-500 pl-4">
                      <div className="font-semibold text-orange-600 mb-2">
                        {t.comparison.materials.rockwool.name}
                      </div>
                      <p className="text-sm text-gray-700">{phase.rockwool}</p>
                    </div>
                    <div className="border-l-4 border-red-500 pl-4">
                      <div className="font-semibold text-red-600 mb-2">
                        {t.comparison.materials.plastic.name}
                      </div>
                      <p className="text-sm text-gray-700">{phase.plastic}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Reduction Strategies */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-display font-bold text-lumora-dark mb-12 text-center">
              {t.reduction.title}
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              {t.reduction.strategies.map((strategy, index) => (
                <div key={index} className="bg-lumora-cream rounded-xl p-8 shadow-soft">
                  <div className="text-4xl mb-4">{strategy.icon}</div>
                  <h3 className="text-xl font-bold text-lumora-dark mb-3">{strategy.title}</h3>
                  <p className="text-gray-700 leading-relaxed">{strategy.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-16 bg-lumora-cream">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <Award className="w-16 h-16 text-lumora-green-600 mx-auto mb-4" />
              <h2 className="text-4xl font-display font-bold text-lumora-dark mb-4">
                {t.certification.title}
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {t.certification.certifications.map((cert, index) => (
                <div key={index} className="bg-white rounded-lg p-6 shadow-soft">
                  <h3 className="font-bold text-lumora-dark mb-2">{cert.name}</h3>
                  <p className="text-sm text-gray-600">{cert.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-lumora-green-600 to-lumora-dark text-white">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-display font-bold mb-6">{t.cta.title}</h2>
            <p className="text-xl text-green-100 mb-8">{t.cta.description}</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href={localizePathForLocale('/shop/paper-plug-tray-84', locale)}
                className="inline-flex items-center gap-2 bg-white text-lumora-green-600 px-8 py-4 rounded-lg font-semibold hover:bg-green-50 transition-colors shadow-lg"
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

import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { localizePathForLocale } from '@/lib/url-localizations';

export const metadata: Metadata = {
  title: 'Wortelvorming Optimaliseren: 8 Bewezen Technieken voor Sterke Wortels',
  description: 'Maximaliseer wortelvorming met paper plug trays. Complete gids met 8 wetenschappelijk onderbouwde technieken, expert tips en praktische strategieën voor optimale wortelontwikkeling.',
  keywords: 'wortelvorming optimaliseren, wortelstelsel ontwikkeling, sterke wortels kweken, paper plug tray, wortelstimulatie, beworteling stekken, wortelgroei, mycorrhiza',
  openGraph: {
    title: 'Wortelvorming Optimaliseren: 8 Technieken voor 40% Snellere Beworteling',
    description: 'Versnelde wortelontwikkeling door paper plug trays. Wetenschappelijk onderbouwde technieken voor professionele telers.',
    type: 'article',
    images: ['/productAfbeeldingen/paper-plug-roots.jpg'],
  },
  alternates: {
    canonical: '/troubleshooting/wortelvorming-optimaliseren',
    languages: {
      'nl': '/troubleshooting/wortelvorming-optimaliseren',
      'en': '/en/troubleshooting/optimize-root-formation',
      'de': '/de/troubleshooting/wurzelbildung-optimieren',
    },
  },
};

interface PageProps {
  params: { locale: string };
}

export default function WortelvormingOptimaliserenPage({ params }: PageProps) {
  const { locale } = params;

  // Translations
  const t = {
    hero: {
      badge: locale === 'en' ? 'Root Development Guide' : locale === 'de' ? 'Wurzelentwicklungsanleitung' : 'Wortelontwikkeling Gids',
      title: locale === 'en'
        ? 'Optimize Root Formation: 8 Proven Techniques for Strong, Healthy Root Systems'
        : locale === 'de'
        ? 'Wurzelbildung Optimieren: 8 Bewährte Techniken für Starke, Gesunde Wurzelsysteme'
        : 'Wortelvorming Optimaliseren: 8 Bewezen Technieken voor Sterke, Gezonde Wortelsystemen',
      subtitle: locale === 'en'
        ? 'Achieve 40% faster root development with paper plug trays. Science-backed guide with practical techniques for professional growers.'
        : locale === 'de'
        ? 'Erreichen Sie 40% schnellere Wurzelentwicklung mit Paper Plug Trays. Wissenschaftlich fundierter Leitfaden mit praktischen Techniken für professionelle Züchter.'
        : 'Bereik 40% snellere wortelontwikkeling met paper plug trays. Wetenschappelijk onderbouwde gids met praktische technieken voor professionele telers.',
      lastUpdated: locale === 'en' ? 'Last updated: November 2025' : locale === 'de' ? 'Letzte Aktualisierung: November 2025' : 'Laatst bijgewerkt: November 2025',
    },
    intro: {
      title: locale === 'en' ? 'Why Root Formation Is Critical' : locale === 'de' ? 'Warum Wurzelbildung Kritisch Ist' : 'Waarom Wortelvorming Cruciaal Is',
      paragraphs: [
        locale === 'en'
          ? 'A strong root system is the foundation for healthy plant growth. Roots provide stability, water uptake, nutrient absorption, and storage. Without optimal root development, even the best growing conditions cannot achieve maximum yields.'
          : locale === 'de'
          ? 'Ein starkes Wurzelsystem ist die Grundlage für gesundes Pflanzenwachstum. Wurzeln bieten Stabilität, Wasseraufnahme, Nährstoffabsorption und Speicherung. Ohne optimale Wurzelentwicklung können selbst die besten Wachstumsbedingungen keine maximalen Erträge erzielen.'
          : 'Een sterk wortelstelsel is de basis voor gezonde plantengroei. Wortels zorgen voor stabiliteit, wateropname, nutriëntenabsorptie en opslag. Zonder optimale wortelontwikkeling kunnen zelfs de beste teeltcondities geen maximale opbrengsten realiseren.',
        locale === 'en'
          ? 'Traditional growing methods often create suboptimal conditions for root development: uneven moisture distribution, poor air circulation, and mechanical stress during transplantation. This results in slower growth and reduced plant vitality.'
          : locale === 'de'
          ? 'Traditionelle Anbaumethoden schaffen oft suboptimale Bedingungen für die Wurzelentwicklung: ungleichmäßige Feuchtigkeitsverteilung, schlechte Luftzirkulation und mechanischer Stress während der Umpflanzung. Dies führt zu langsamerem Wachstum und reduzierter Pflanzenvitalität.'
          : 'Traditionele kweekmethoden creëren vaak suboptimale condities voor wortelontwikkeling: ongelijkmatige vochtdistributie, slechte luchtcirculatie en mechanische stress tijdens verplanting. Dit resulteert in tragere groei en verminderde plantenvitaliteit.',
        locale === 'en'
          ? 'Paper plug trays revolutionize root development through their unique structure: optimal air-to-water ratio, perfect root guidance, and undisturbed transplantation. Research shows 40% faster root formation and 30% more root mass compared to traditional methods.'
          : locale === 'de'
          ? 'Paper Plug Trays revolutionieren die Wurzelentwicklung durch ihre einzigartige Struktur: optimales Luft-Wasser-Verhältnis, perfekte Wurzelführung und ungestörte Umpflanzung. Forschungen zeigen 40% schnellere Wurzelbildung und 30% mehr Wurzelmasse im Vergleich zu traditionellen Methoden.'
          : 'Paper plug trays revolutioneren wortelontwikkeling door hun unieke structuur: optimale lucht-water verhouding, perfecte wortelgeleiding en ongestoorde verplanting. Onderzoek toont 40% snellere wortelvorming en 30% meer wortelmassa vergeleken met traditionele methoden.',
      ],
    },
    rootPhysiology: {
      title: locale === 'en' ? 'Understanding Root Physiology' : locale === 'de' ? 'Wurzelphysiologie Verstehen' : 'Wortelfysiologie Begrijpen',
      subtitle: locale === 'en' ? 'The science behind optimal root development' : locale === 'de' ? 'Die Wissenschaft hinter optimaler Wurzelentwicklung' : 'De wetenschap achter optimale wortelontwikkeling',
      factors: [
        {
          title: locale === 'en' ? 'Oxygen availability' : locale === 'de' ? 'Sauerstoffverfügbarkeit' : 'Zuurstofbeschikbaarheid',
          description: locale === 'en'
            ? 'Roots need oxygen for respiration and energy production. Paper plugs provide excellent aeration through their porous structure, ensuring optimal oxygen levels at root zones.'
            : locale === 'de'
            ? 'Wurzeln benötigen Sauerstoff für Atmung und Energieproduktion. Paper Plugs bieten durch ihre poröse Struktur hervorragende Belüftung und gewährleisten optimale Sauerstoffwerte in Wurzelzonen.'
            : 'Wortels hebben zuurstof nodig voor ademhaling en energieproductie. Paper plugs bieden uitstekende beluchting door hun poreuze structuur, wat zorgt voor optimale zuurstofniveaus bij wortelzones.',
          icon: '💨',
        },
        {
          title: locale === 'en' ? 'Moisture balance' : locale === 'de' ? 'Feuchtigkeitsgleichgewicht' : 'Vochtbalans',
          description: locale === 'en'
            ? 'Consistent moisture without waterlogging is essential. Paper structure naturally regulates moisture through capillary action, creating ideal conditions for root hair formation.'
            : locale === 'de'
            ? 'Konstante Feuchtigkeit ohne Staunässe ist essentiell. Die Papierstruktur reguliert Feuchtigkeit natürlich durch Kapillarwirkung und schafft ideale Bedingungen für Wurzelhaarbildung.'
            : 'Consistente vochtigheid zonder wateroverlast is essentieel. Papierstructuur reguleert vocht natuurlijk via capillaire werking, wat ideale condities creëert voor wortelhaarvorming.',
          icon: '💧',
        },
        {
          title: locale === 'en' ? 'Root guidance' : locale === 'de' ? 'Wurzelführung' : 'Wortelgeleiding',
          description: locale === 'en'
            ? 'Paper plug cells naturally guide roots downward, preventing circling and promoting healthy, fibrous root systems. This creates more efficient nutrient uptake surfaces.'
            : locale === 'de'
            ? 'Paper Plug-Zellen leiten Wurzeln natürlich nach unten und verhindern Kreisen, wodurch gesunde, faserige Wurzelsysteme gefördert werden. Dies schafft effizientere Nährstoffaufnahmeflächen.'
            : 'Paper plug cellen geleiden wortels natuurlijk naar beneden, voorkomen ronddraaien en bevorderen gezonde, vezelige wortelsystemen. Dit creëert efficiëntere nutriëntenopnameoppervlakken.',
          icon: '⬇️',
        },
        {
          title: locale === 'en' ? 'Temperature stability' : locale === 'de' ? 'Temperaturstabilität' : 'Temperatuurstabiliteit',
          description: locale === 'en'
            ? 'Root zone temperature directly impacts growth rate. Paper provides insulation against temperature fluctuations, maintaining the optimal 18-24°C range for most species.'
            : locale === 'de'
            ? 'Die Wurzelzonentemperatur beeinflusst direkt die Wachstumsrate. Papier bietet Isolierung gegen Temperaturschwankungen und hält den optimalen Bereich von 18-24°C für die meisten Arten.'
            : 'Wortelzone temperatuur beïnvloedt direct de groeisnelheid. Papier biedt isolatie tegen temperatuurschommelingen en handhaaft het optimale 18-24°C bereik voor de meeste soorten.',
          icon: '🌡️',
        },
      ],
    },
    techniques: {
      title: locale === 'en' ? '8 Techniques to Optimize Root Formation' : locale === 'de' ? '8 Techniken zur Optimierung der Wurzelbildung' : '8 Technieken om Wortelvorming te Optimaliseren',
      list: [
        {
          number: '1',
          title: locale === 'en' ? 'Start with Quality Paper Plug Trays' : locale === 'de' ? 'Beginnen Sie mit Qualitäts-Paper Plug Trays' : 'Start met Kwaliteit Paper Plug Trays',
          description: locale === 'en'
            ? 'The foundation of optimal root development. Paper plug trays provide superior root guidance, excellent drainage, and perfect air-to-water ratio. Choose cell sizes appropriate for your crop: smaller cells (28-40mm) for quick crops, larger cells (50-60mm) for extensive root development.'
            : locale === 'de'
            ? 'Die Grundlage optimaler Wurzelentwicklung. Paper Plug Trays bieten überlegene Wurzelführung, ausgezeichnete Drainage und perfektes Luft-Wasser-Verhältnis. Wählen Sie Zellengrößen, die für Ihre Kultur geeignet sind: kleinere Zellen (28-40mm) für schnelle Kulturen, größere Zellen (50-60mm) für extensive Wurzelentwicklung.'
            : 'De basis van optimale wortelontwikkeling. Paper plug trays bieden superieure wortelgeleiding, uitstekende drainage en perfecte lucht-water verhouding. Kies celgroottes passend bij je teelt: kleinere cellen (28-40mm) voor snelle teelten, grotere cellen (50-60mm) voor extensieve wortelontwikkeling.',
          details: [
            locale === 'en' ? 'Cell depth affects root architecture' : locale === 'de' ? 'Zellentiefe beeinflusst Wurzelarchitektur' : 'Celdiepte beïnvloedt wortelarchitectuur',
            locale === 'en' ? 'Paper quality determines longevity and root penetration' : locale === 'de' ? 'Papierqualität bestimmt Langlebigkeit und Wurzelpenetration' : 'Papierkwaliteit bepaalt levensduur en wortelpenetratie',
            locale === 'en' ? 'Drainage holes ensure optimal aeration' : locale === 'de' ? 'Drainagelöcher gewährleisten optimale Belüftung' : 'Drainagegaten zorgen voor optimale beluchting',
          ],
        },
        {
          number: '2',
          title: locale === 'en' ? 'Optimize Substrate Composition' : locale === 'de' ? 'Substratkomposition Optimieren' : 'Optimaliseer Substraat Samenstelling',
          description: locale === 'en'
            ? 'The right substrate is crucial for root development. Use a well-draining mix with 30-40% perlite or vermiculite for aeration. Add 10-15% compost for biology and 5% coco fiber for moisture retention. pH should be 5.5-6.5 for most crops.'
            : locale === 'de'
            ? 'Das richtige Substrat ist entscheidend für die Wurzelentwicklung. Verwenden Sie eine gut drainierende Mischung mit 30-40% Perlit oder Vermikulit für Belüftung. Fügen Sie 10-15% Kompost für Biologie und 5% Kokosfaser für Feuchtigkeitsretention hinzu. Der pH-Wert sollte für die meisten Kulturen bei 5,5-6,5 liegen.'
            : 'Het juiste substraat is cruciaal voor wortelontwikkeling. Gebruik een goed drainerende mix met 30-40% perliet of vermiculiet voor beluchting. Voeg 10-15% compost toe voor biologie en 5% cocosvezels voor vochtretentie. pH moet 5,5-6,5 zijn voor de meeste gewassen.',
          details: [
            locale === 'en' ? 'Particle size affects air porosity' : locale === 'de' ? 'Partikelgröße beeinflusst Luftporosität' : 'Deeltjesgrootte beïnvloedt luchtporositeit',
            locale === 'en' ? 'Organic matter feeds beneficial microbes' : locale === 'de' ? 'Organische Substanz ernährt nützliche Mikroben' : 'Organische stof voedt nuttige microben',
            locale === 'en' ? 'EC should be 0.8-1.2 for young plants' : locale === 'de' ? 'EC sollte 0,8-1,2 für Jungpflanzen sein' : 'EC moet 0,8-1,2 zijn voor jonge planten',
          ],
        },
        {
          number: '3',
          title: locale === 'en' ? 'Master Moisture Management' : locale === 'de' ? 'Feuchtigkeitsmanagement Meistern' : 'Beheers Vochtbeheer',
          description: locale === 'en'
            ? 'Consistent moisture without saturation is key. Use the "wet-dry cycle" technique: water thoroughly when top 2cm is dry. Paper plugs regulate moisture naturally, but monitoring is essential. Aim for 60-70% substrate moisture - should feel like a wrung-out sponge.'
            : locale === 'de'
            ? 'Konstante Feuchtigkeit ohne Sättigung ist der Schlüssel. Verwenden Sie die "Nass-Trocken-Zyklus"-Technik: Gießen Sie gründlich, wenn die oberen 2cm trocken sind. Paper Plugs regulieren Feuchtigkeit natürlich, aber Überwachung ist essentiell. Streben Sie 60-70% Substratfeuchtigkeit an - sollte sich wie ein ausgewrungener Schwamm anfühlen.'
            : 'Consistente vochtigheid zonder verzadiging is essentieel. Gebruik de "nat-droog cyclus" techniek: water grondig wanneer bovenste 2cm droog is. Paper plugs reguleren vocht natuurlijk, maar monitoring is essentieel. Streef naar 60-70% substraatvocht - moet aanvoelen als een uitgewrongen spons.',
          details: [
            locale === 'en' ? 'Morning watering reduces disease risk' : locale === 'de' ? 'Morgenbewässerung reduziert Krankheitsrisiko' : 'Ochtendwater verlaagt ziekterisico',
            locale === 'en' ? 'Bottom watering promotes deeper rooting' : locale === 'de' ? 'Bodenbewässerung fördert tiefere Bewurzelung' : 'Onderwatergeven bevordert diepere beworteling',
            locale === 'en' ? 'Use moisture meters for precision' : locale === 'de' ? 'Verwenden Sie Feuchtigkeitsmesser für Präzision' : 'Gebruik vochtmeters voor precisie',
          ],
        },
        {
          number: '4',
          title: locale === 'en' ? 'Apply Mycorrhizae & Beneficial Bacteria' : locale === 'de' ? 'Mykorrhizen & Nützliche Bakterien Anwenden' : 'Pas Mycorrhiza & Nuttige Bacteriën Toe',
          description: locale === 'en'
            ? 'Inoculate substrate with mycorrhizal fungi and beneficial bacteria (Bacillus, Pseudomonas, Trichoderma). These form symbiotic relationships, extending root reach by 100-1000x through fungal networks. Apply at sowing/transplanting for maximum colonization.'
            : locale === 'de'
            ? 'Impfen Sie Substrat mit Mykorrhizapilzen und nützlichen Bakterien (Bacillus, Pseudomonas, Trichoderma). Diese bilden symbiotische Beziehungen und erweitern die Wurzelreichweite durch Pilznetzwerke um das 100-1000-fache. Wenden Sie bei Aussaat/Umpflanzung für maximale Besiedlung an.'
            : 'Inoculeer substraat met mycorrhiza schimmels en nuttige bacteriën (Bacillus, Pseudomonas, Trichoderma). Deze vormen symbiotische relaties en verlengen wortelbereik met 100-1000x via schimmelnetwerken. Pas toe bij zaaien/verplanten voor maximale kolonisatie.',
          details: [
            locale === 'en' ? 'Endomycorrhizae for most crops, ectomycorrhizae for woody plants' : locale === 'de' ? 'Endomykorrhizen für die meisten Kulturen, Ektomykorrhizen für Holzpflanzen' : 'Endomycorrhiza voor meeste gewassen, ectomycorrhiza voor houtachtige planten',
            locale === 'en' ? 'Bacteria produce growth hormones and protect against pathogens' : locale === 'de' ? 'Bakterien produzieren Wachstumshormone und schützen vor Pathogenen' : 'Bacteriën produceren groeihormonen en beschermen tegen pathogenen',
            locale === 'en' ? 'Store biologicals cool and use within 6 months' : locale === 'de' ? 'Lagern Sie Biologika kühl und verwenden Sie sie innerhalb von 6 Monaten' : 'Bewaar biologicals koel en gebruik binnen 6 maanden',
          ],
        },
        {
          number: '5',
          title: locale === 'en' ? 'Strategic Nutrient Programming' : locale === 'de' ? 'Strategische Nährstoffprogrammierung' : 'Strategische Nutriënten Programmering',
          description: locale === 'en'
            ? 'Young plants need balanced nutrition with emphasis on phosphorus (P) for root development. Use NPK ratio 1:2:1 in early stages. Maintain EC 0.8-1.2 for seedlings, gradually increasing to 1.5-2.0. Add micronutrients (Fe, Mn, Zn) for enzyme function critical to root growth.'
            : locale === 'de'
            ? 'Junge Pflanzen benötigen ausgewogene Ernährung mit Schwerpunkt auf Phosphor (P) für Wurzelentwicklung. Verwenden Sie NPK-Verhältnis 1:2:1 in frühen Stadien. Halten Sie EC 0,8-1,2 für Sämlinge und erhöhen Sie schrittweise auf 1,5-2,0. Fügen Sie Mikronährstoffe (Fe, Mn, Zn) für Enzymfunktion hinzu, die für Wurzelwachstum kritisch ist.'
            : 'Jonge planten hebben uitgebalanceerde voeding nodig met nadruk op fosfor (P) voor wortelontwikkeling. Gebruik NPK verhouding 1:2:1 in vroege stadia. Handhaaf EC 0,8-1,2 voor zaailingen, geleidelijk verhogend naar 1,5-2,0. Voeg micronutriënten toe (Fe, Mn, Zn) voor enzymfunctie cruciaal voor wortelgroei.',
          details: [
            locale === 'en' ? 'Phosphorus moves slowly - place near roots' : locale === 'de' ? 'Phosphor bewegt sich langsam - in Wurzelnähe platzieren' : 'Fosfor beweegt langzaam - plaats nabij wortels',
            locale === 'en' ? 'Calcium strengthens cell walls in root tips' : locale === 'de' ? 'Calcium stärkt Zellwände in Wurzelspitzen' : 'Calcium versterkt celwanden in worteltoppen',
            locale === 'en' ? 'Avoid excess nitrogen which promotes shoots over roots' : locale === 'de' ? 'Vermeiden Sie überschüssigen Stickstoff, der Triebe über Wurzeln fördert' : 'Vermijd overmatig stikstof dat scheuten bevordert boven wortels',
          ],
        },
        {
          number: '6',
          title: locale === 'en' ? 'Control Root Zone Temperature' : locale === 'de' ? 'Wurzelzonentemperatur Kontrollieren' : 'Beheers Wortelzone Temperatuur',
          description: locale === 'en'
            ? 'Optimal root zone temperature is 18-24°C for most crops (cooler for lettuce/herbs, warmer for tropicals). Use heating mats or cooling systems as needed. Paper plugs provide natural insulation, but monitor temperature 5cm below surface. Every 10°C increase doubles metabolic rate until heat stress occurs (>28°C).'
            : locale === 'de'
            ? 'Die optimale Wurzelzonentemperatur beträgt 18-24°C für die meisten Kulturen (kühler für Salat/Kräuter, wärmer für Tropenpflanzen). Verwenden Sie Heizmatten oder Kühlsysteme nach Bedarf. Paper Plugs bieten natürliche Isolierung, aber überwachen Sie die Temperatur 5cm unter der Oberfläche. Jede 10°C-Erhöhung verdoppelt die Stoffwechselrate bis Hitzestress auftritt (>28°C).'
            : 'Optimale wortelzone temperatuur is 18-24°C voor de meeste gewassen (koeler voor sla/kruiden, warmer voor tropische planten). Gebruik verwarmingsmatten of koelsystemen indien nodig. Paper plugs bieden natuurlijke isolatie, maar monitor temperatuur 5cm onder oppervlak. Elke 10°C verhoging verdubbelt metabolisme tot hittestress optreedt (>28°C).',
          details: [
            locale === 'en' ? 'Cold roots (<15°C) reduce nutrient uptake by 50%' : locale === 'de' ? 'Kalte Wurzeln (<15°C) reduzieren Nährstoffaufnahme um 50%' : 'Koude wortels (<15°C) verminderen nutriëntenopname met 50%',
            locale === 'en' ? 'Temperature uniformity matters more than absolute value' : locale === 'de' ? 'Temperaturgleichmäßigkeit ist wichtiger als absoluter Wert' : 'Temperatuuruniformiteit is belangrijker dan absolute waarde',
            locale === 'en' ? 'Nighttime cooling (16-18°C) promotes root over shoot growth' : locale === 'de' ? 'Nächtliche Abkühlung (16-18°C) fördert Wurzel- über Triebwachstum' : 'Nachtelijke koeling (16-18°C) bevordert wortel boven scheutgroei',
          ],
        },
        {
          number: '7',
          title: locale === 'en' ? 'Implement Light Management for Roots' : locale === 'de' ? 'Lichtmanagement für Wurzeln Implementieren' : 'Implementeer Lichtbeheer voor Wortels',
          description: locale === 'en'
            ? 'While roots grow in darkness, photosynthesis drives root development. Provide adequate light (200-400 μmol/m²/s for seedlings) for 14-16 hours daily. Blue spectrum promotes compact growth and strong roots. Avoid light on root zone itself - use opaque trays or cover to prevent algae and root damage from light exposure.'
            : locale === 'de'
            ? 'Während Wurzeln im Dunkeln wachsen, treibt Photosynthese die Wurzelentwicklung an. Bieten Sie ausreichend Licht (200-400 μmol/m²/s für Sämlinge) für 14-16 Stunden täglich. Blaues Spektrum fördert kompaktes Wachstum und starke Wurzeln. Vermeiden Sie Licht auf der Wurzelzone selbst - verwenden Sie undurchsichtige Tabletts oder Abdeckung, um Algen und Wurzelschäden durch Lichtexposition zu verhindern.'
            : 'Hoewel wortels in duisternis groeien, drijft fotosynthese wortelontwikkeling aan. Bied voldoende licht (200-400 μmol/m²/s voor zaailingen) gedurende 14-16 uur dagelijks. Blauw spectrum bevordert compacte groei en sterke wortels. Vermijd licht op wortelzone zelf - gebruik ondoorzichtige trays of bedekking om algen en wortelschade door lichtblootstelling te voorkomen.',
          details: [
            locale === 'en' ? 'Carbohydrates from photosynthesis fuel root growth' : locale === 'de' ? 'Kohlenhydrate aus Photosynthese treiben Wurzelwachstum an' : 'Koolhydraten van fotosynthese voeden wortelgroei',
            locale === 'en' ? 'DIF (day-night temperature differential) affects root allocation' : locale === 'de' ? 'DIF (Tag-Nacht-Temperaturdifferenz) beeinflusst Wurzelallokation' : 'DIF (dag-nacht temperatuurverschil) beïnvloedt worteltoedeling',
            locale === 'en' ? 'Paper plugs naturally block light to root zone' : locale === 'de' ? 'Paper Plugs blockieren natürlich Licht zur Wurzelzone' : 'Paper plugs blokkeren natuurlijk licht naar wortelzone',
          ],
        },
        {
          number: '8',
          title: locale === 'en' ? 'Practice Intelligent Root Pruning' : locale === 'de' ? 'Intelligentes Wurzelschneiden Praktizieren' : 'Pas Intelligent Wortelsnoei Toe',
          description: locale === 'en'
            ? 'Root pruning through air exposure triggers branching and creates fibrous root systems. Paper plug trays naturally "air-prune" roots at cell edges, preventing circling. For advanced growers: mechanical root pruning (trimming bottom 5-10mm) before transplanting stimulates explosive lateral root formation. Only for vigorous species.'
            : locale === 'de'
            ? 'Wurzelschneiden durch Luftexposition löst Verzweigung aus und schafft faserige Wurzelsysteme. Paper Plug Trays "luftschneiden" Wurzeln natürlich an Zellenrändern und verhindern Kreisen. Für fortgeschrittene Züchter: mechanisches Wurzelschneiden (Trimmen der unteren 5-10mm) vor der Umpflanzung stimuliert explosive laterale Wurzelbildung. Nur für kräftige Arten.'
            : 'Wortelsnoei door luchtblootstelling triggert vertakking en creëert vezelige wortelsystemen. Paper plug trays "lucht-snoeien" wortels natuurlijk bij celranden, voorkomen ronddraaien. Voor gevorderde telers: mechanisch wortelsnoei (trimmen onderste 5-10mm) voor verplanten stimuleert explosieve zijwortelvorming. Alleen voor krachtige soorten.',
          details: [
            locale === 'en' ? 'Air pruning prevents root circling and girdling' : locale === 'de' ? 'Luftschneiden verhindert Wurzelkreisen und Einschnürung' : 'Luchtsnoei voorkomt wortelrondgang en worging',
            locale === 'en' ? 'Triggers production of lateral roots for better soil exploration' : locale === 'de' ? 'Löst Produktion von Seitenwurzeln für bessere Bodenexploration aus' : 'Triggert productie van zijwortels voor betere bodemexploratie',
            locale === 'en' ? 'Paper plug design maximizes natural air pruning' : locale === 'de' ? 'Paper Plug-Design maximiert natürliches Luftschneiden' : 'Paper plug ontwerp maximaliseert natuurlijke luchtsnoei',
          ],
        },
      ],
    },
    timeline: {
      title: locale === 'en' ? 'Root Development Timeline in Paper Plugs' : locale === 'de' ? 'Wurzelentwicklungs-Zeitplan in Paper Plugs' : 'Wortelontwikkeling Tijdlijn in Paper Plugs',
      stages: [
        {
          days: locale === 'en' ? 'Days 1-3' : locale === 'de' ? 'Tage 1-3' : 'Dag 1-3',
          title: locale === 'en' ? 'Germination & Initial Rooting' : locale === 'de' ? 'Keimung & Anfängliche Bewurzelung' : 'Kieming & Initiële Beworteling',
          description: locale === 'en'
            ? 'Radicle emerges and begins downward growth. Paper structure guides root tip. Focus: consistent moisture, 22-24°C temperature, darkness.'
            : locale === 'de'
            ? 'Radicula tritt aus und beginnt Abwärtswachstum. Papierstruktur führt Wurzelspitze. Fokus: konstante Feuchtigkeit, 22-24°C Temperatur, Dunkelheit.'
            : 'Kiemwortel komt tevoorschijn en begint neerwaartse groei. Papierstructuur geleidt worteltop. Focus: consistente vocht, 22-24°C temperatuur, duisternis.',
        },
        {
          days: locale === 'en' ? 'Days 4-7' : locale === 'de' ? 'Tage 4-7' : 'Dag 4-7',
          title: locale === 'en' ? 'Primary Root Elongation' : locale === 'de' ? 'Primäre Wurzelverlängerung' : 'Primaire Wortelverlenging',
          description: locale === 'en'
            ? 'Taproot extends to bottom of cell. Root hairs form. First lateral roots emerge. Focus: introduce diluted nutrients (EC 0.8), increase light intensity.'
            : locale === 'de'
            ? 'Pfahlwurzel erstreckt sich bis zum Zellboden. Wurzelhaare bilden sich. Erste Seitenwurzeln entstehen. Fokus: verdünnte Nährstoffe einführen (EC 0,8), Lichtintensität erhöhen.'
            : 'Penwortel strekt zich uit tot celbodem. Wortelharen vormen zich. Eerste zijwortels verschijnen. Focus: verdunde nutriënten introduceren (EC 0,8), lichtintensiteit verhogen.',
        },
        {
          days: locale === 'en' ? 'Days 8-14' : locale === 'de' ? 'Tage 8-14' : 'Dag 8-14',
          title: locale === 'en' ? 'Lateral Root Proliferation' : locale === 'de' ? 'Seitenwurzelproliferation' : 'Zijwortel Proliferatie',
          description: locale === 'en'
            ? 'Extensive lateral branching fills cell volume. Mycorrhizae colonize if inoculated. Root system fully functional. Focus: full nutrients (EC 1.2-1.5), optimal growing conditions.'
            : locale === 'de'
            ? 'Extensive Seitenverzweigung füllt Zellenvolumen. Mykorrhizen besiedeln bei Impfung. Wurzelsystem voll funktionsfähig. Fokus: volle Nährstoffe (EC 1,2-1,5), optimale Wachstumsbedingungen.'
            : 'Extensieve zijvertakking vult celvolume. Mycorrhiza koloniseert indien geïnoculeerd. Wortelstelsel volledig functioneel. Focus: volle nutriënten (EC 1,2-1,5), optimale groeicondities.',
        },
        {
          days: locale === 'en' ? 'Days 15-21' : locale === 'de' ? 'Tage 15-21' : 'Dag 15-21',
          title: locale === 'en' ? 'Maturation & Transplant Readiness' : locale === 'de' ? 'Reifung & Umpflanzbereitschaft' : 'Rijping & Verplant Gereedheid',
          description: locale === 'en'
            ? 'Roots reach cell edges and air-prune. Dense, fibrous root ball formed. Plant shows vigorous top growth. Ready for transplantation with minimal shock risk.'
            : locale === 'de'
            ? 'Wurzeln erreichen Zellenränder und luftschneiden. Dichter, faseriger Wurzelballen gebildet. Pflanze zeigt kräftiges Spitzenwachstum. Bereit für Umpflanzung mit minimalem Schockrisiko.'
            : 'Wortels bereiken celranden en lucht-snoeien. Dichte, vezelige wortelkluit gevormd. Plant toont krachtige topgroei. Klaar voor verplanting met minimaal schokrisico.',
        },
      ],
    },
    comparison: {
      title: locale === 'en' ? 'Root Development: Paper Plugs vs. Traditional Methods' : locale === 'de' ? 'Wurzelentwicklung: Paper Plugs vs. Traditionelle Methoden' : 'Wortelontwikkeling: Paper Plugs vs. Traditionele Methoden',
      table: {
        headers: [
          locale === 'en' ? 'Factor' : locale === 'de' ? 'Faktor' : 'Factor',
          locale === 'en' ? 'Paper Plug Trays' : locale === 'de' ? 'Paper Plug Trays' : 'Paper Plug Trays',
          locale === 'en' ? 'Traditional Methods' : locale === 'de' ? 'Traditionelle Methoden' : 'Traditionele Methoden',
        ],
        rows: [
          {
            factor: locale === 'en' ? 'Root formation speed' : locale === 'de' ? 'Wurzelbildungsgeschwindigkeit' : 'Wortelvormingssnelheid',
            paperPlug: locale === 'en' ? '14-21 days to full development' : locale === 'de' ? '14-21 Tage bis vollständige Entwicklung' : '14-21 dagen tot volledige ontwikkeling',
            traditional: locale === 'en' ? '21-35 days to comparable development' : locale === 'de' ? '21-35 Tage bis vergleichbare Entwicklung' : '21-35 dagen tot vergelijkbare ontwikkeling',
          },
          {
            factor: locale === 'en' ? 'Root mass (g dry weight)' : locale === 'de' ? 'Wurzelmasse (g Trockengewicht)' : 'Wortelmassa (g drooggewicht)',
            paperPlug: locale === 'en' ? '0.8-1.2g per plant' : locale === 'de' ? '0,8-1,2g pro Pflanze' : '0,8-1,2g per plant',
            traditional: locale === 'en' ? '0.5-0.8g per plant' : locale === 'de' ? '0,5-0,8g pro Pflanze' : '0,5-0,8g per plant',
          },
          {
            factor: locale === 'en' ? 'Root architecture' : locale === 'de' ? 'Wurzelarchitektur' : 'Wortelarchitectuur',
            paperPlug: locale === 'en' ? 'Fibrous, well-branched, air-pruned' : locale === 'de' ? 'Faserig, gut verzweigt, luftgeschnitten' : 'Vezelig, goed vertakt, lucht-gesnoeid',
            traditional: locale === 'en' ? 'Some circling, less branching' : locale === 'de' ? 'Etwas Kreisen, weniger Verzweigung' : 'Enig ronddraaien, minder vertakking',
          },
          {
            factor: locale === 'en' ? 'Root hair density' : locale === 'de' ? 'Wurzelhaardichte' : 'Wortelhaardichtheid',
            paperPlug: locale === 'en' ? 'High - optimal moisture gradient' : locale === 'de' ? 'Hoch - optimaler Feuchtigkeitsgradient' : 'Hoog - optimale vochtgradiënt',
            traditional: locale === 'en' ? 'Moderate - variable conditions' : locale === 'de' ? 'Mäßig - variable Bedingungen' : 'Matig - variabele condities',
          },
          {
            factor: locale === 'en' ? 'Mycorrhizal colonization' : locale === 'de' ? 'Mykorrhizale Besiedlung' : 'Mycorrhiza kolonisatie',
            paperPlug: locale === 'en' ? '60-80% root length colonized' : locale === 'de' ? '60-80% Wurzellänge besiedelt' : '60-80% wortellengte gekoloniseerd',
            traditional: locale === 'en' ? '30-50% root length colonized' : locale === 'de' ? '30-50% Wurzellänge besiedelt' : '30-50% wortellengte gekoloniseerd',
          },
          {
            factor: locale === 'en' ? 'Post-transplant establishment' : locale === 'de' ? 'Nach-Umpflanzung Etablierung' : 'Na-verplanting vestiging',
            paperPlug: locale === 'en' ? '2-4 days, minimal shock' : locale === 'de' ? '2-4 Tage, minimaler Schock' : '2-4 dagen, minimale schok',
            traditional: locale === 'en' ? '7-14 days, moderate shock' : locale === 'de' ? '7-14 Tage, mäßiger Schock' : '7-14 dagen, matige schok',
          },
        ],
      },
    },
    troubleshooting: {
      title: locale === 'en' ? 'Troubleshooting Root Development Issues' : locale === 'de' ? 'Behebung von Wurzelentwicklungsproblemen' : 'Wortelontwikkeling Problemen Oplossen',
      issues: [
        {
          problem: locale === 'en' ? 'Slow root growth' : locale === 'de' ? 'Langsames Wurzelwachstum' : 'Trage wortelgroei',
          symptoms: locale === 'en'
            ? 'Roots barely visible after 10 days, stunted plant growth, pale leaves'
            : locale === 'de'
            ? 'Wurzeln nach 10 Tagen kaum sichtbar, verkümmertes Pflanzenwachstum, blasse Blätter'
            : 'Wortels nauwelijks zichtbaar na 10 dagen, vertraagde plantgroei, bleke bladeren',
          causes: [
            locale === 'en' ? 'Temperature too low (<16°C) or too high (>28°C)' : locale === 'de' ? 'Temperatur zu niedrig (<16°C) oder zu hoch (>28°C)' : 'Temperatuur te laag (<16°C) of te hoog (>28°C)',
            locale === 'en' ? 'Excessive moisture/poor drainage' : locale === 'de' ? 'Übermäßige Feuchtigkeit/schlechte Drainage' : 'Overmatig vocht/slechte drainage',
            locale === 'en' ? 'Nutrient deficiency (especially phosphorus)' : locale === 'de' ? 'Nährstoffmangel (besonders Phosphor)' : 'Nutriëntentekort (vooral fosfor)',
            locale === 'en' ? 'Compacted substrate' : locale === 'de' ? 'Verdichtetes Substrat' : 'Verdicht substraat',
          ],
          solutions: [
            locale === 'en' ? 'Adjust temperature to 20-24°C' : locale === 'de' ? 'Temperatur auf 20-24°C einstellen' : 'Pas temperatuur aan naar 20-24°C',
            locale === 'en' ? 'Improve drainage, reduce watering frequency' : locale === 'de' ? 'Drainage verbessern, Bewässerungshäufigkeit reduzieren' : 'Verbeter drainage, verminder waterfrequentie',
            locale === 'en' ? 'Apply phosphorus-rich fertilizer (NPK 1:2:1)' : locale === 'de' ? 'Phosphorreichen Dünger anwenden (NPK 1:2:1)' : 'Pas fosforrijke meststof toe (NPK 1:2:1)',
            locale === 'en' ? 'Check substrate mix - add 30-40% perlite' : locale === 'de' ? 'Substratmischung überprüfen - 30-40% Perlit hinzufügen' : 'Controleer substraatmix - voeg 30-40% perliet toe',
          ],
        },
        {
          problem: locale === 'en' ? 'Root rot/brown roots' : locale === 'de' ? 'Wurzelfäule/braune Wurzeln' : 'Wortelrot/bruine wortels',
          symptoms: locale === 'en'
            ? 'Brown, mushy roots, foul smell, wilting despite adequate water'
            : locale === 'de'
            ? 'Braune, matschige Wurzeln, übler Geruch, Welken trotz ausreichend Wasser'
            : 'Bruine, papperige wortels, vieze geur, verwelking ondanks voldoende water',
          causes: [
            locale === 'en' ? 'Overwatering/waterlogged substrate' : locale === 'de' ? 'Überbewässerung/wassergelogtes Substrat' : 'Overwater/waterverzadigd substraat',
            locale === 'en' ? 'Poor drainage/aeration' : locale === 'de' ? 'Schlechte Drainage/Belüftung' : 'Slechte drainage/beluchting',
            locale === 'en' ? 'Pythium, Fusarium, or Phytophthora infection' : locale === 'de' ? 'Pythium-, Fusarium- oder Phytophthora-Infektion' : 'Pythium, Fusarium of Phytophthora infectie',
            locale === 'en' ? 'Temperature too high with excess moisture' : locale === 'de' ? 'Temperatur zu hoch mit übermäßiger Feuchtigkeit' : 'Temperatuur te hoog met overmatig vocht',
          ],
          solutions: [
            locale === 'en' ? 'Immediate action: reduce watering, improve air circulation' : locale === 'de' ? 'Sofortmaßnahme: Bewässerung reduzieren, Luftzirkulation verbessern' : 'Onmiddellijke actie: water verminderen, luchtcirculatie verbeteren',
            locale === 'en' ? 'Apply beneficial bacteria (Bacillus, Trichoderma)' : locale === 'de' ? 'Nützliche Bakterien anwenden (Bacillus, Trichoderma)' : 'Pas nuttige bacteriën toe (Bacillus, Trichoderma)',
            locale === 'en' ? 'Use hydrogen peroxide solution (3%) to oxygenate and disinfect' : locale === 'de' ? 'Wasserstoffperoxid-Lösung (3%) zum Sauerstoffanreichern und Desinfizieren verwenden' : 'Gebruik waterstofperoxide oplossing (3%) om te oxygeneren en desinfecteren',
            locale === 'en' ? 'Transplant healthy plants to fresh, sterilized substrate' : locale === 'de' ? 'Gesunde Pflanzen in frisches, sterilisiertes Substrat umpflanzen' : 'Verplant gezonde planten naar vers, gesteriliseerd substraat',
          ],
        },
        {
          problem: locale === 'en' ? 'Circling/spiraling roots' : locale === 'de' ? 'Kreisende/spiralförmige Wurzeln' : 'Rondgaande/spiralende wortels',
          symptoms: locale === 'en'
            ? 'Roots growing in circles at container edges, girdling, poor anchoring'
            : locale === 'de'
            ? 'Wurzeln wachsen in Kreisen an Behälterrändern, Einschnürung, schlechte Verankerung'
            : 'Wortels groeien in cirkels aan containerranden, worging, slechte verankering',
          causes: [
            locale === 'en' ? 'Smooth container walls (not paper plugs)' : locale === 'de' ? 'Glatte Behälterwände (keine Paper Plugs)' : 'Gladde containerwanden (geen paper plugs)',
            locale === 'en' ? 'Cells too small for plant development stage' : locale === 'de' ? 'Zellen zu klein für Pflanzenentwicklungsphase' : 'Cellen te klein voor plantontwikkelingsfase',
            locale === 'en' ? 'Kept too long in same container' : locale === 'de' ? 'Zu lange im gleichen Behälter gehalten' : 'Te lang in zelfde container gehouden',
          ],
          solutions: [
            locale === 'en' ? 'Switch to paper plug trays - air pruning prevents circling' : locale === 'de' ? 'Zu Paper Plug Trays wechseln - Luftschneiden verhindert Kreisen' : 'Schakel over naar paper plug trays - luchtsnoei voorkomt rondgang',
            locale === 'en' ? 'Transplant at proper time (before roots reach edges)' : locale === 'de' ? 'Zum richtigen Zeitpunkt umpflanzen (bevor Wurzeln Ränder erreichen)' : 'Verplant op juiste moment (voordat wortels randen bereiken)',
            locale === 'en' ? 'Use larger cells or transplant sooner' : locale === 'de' ? 'Größere Zellen verwenden oder früher umpflanzen' : 'Gebruik grotere cellen of verplant eerder',
            locale === 'en' ? 'For existing damage: gently tease out roots before transplanting' : locale === 'de' ? 'Bei bestehenden Schäden: Wurzeln vor Umpflanzung vorsichtig entwirren' : 'Bij bestaande schade: wortels voorzichtig losmaken voor verplanting',
          ],
        },
      ],
    },
    faq: {
      title: locale === 'en' ? 'Frequently Asked Questions' : locale === 'de' ? 'Häufig Gestellte Fragen' : 'Veelgestelde Vragen',
      questions: [
        {
          q: locale === 'en' ? 'How do paper plug trays accelerate root formation?' : locale === 'de' ? 'Wie beschleunigen Paper Plug Trays die Wurzelbildung?' : 'Hoe versnellen paper plug trays wortelvorming?',
          a: locale === 'en'
            ? 'Paper plug trays create optimal conditions for root development through three mechanisms: (1) Superior air-to-water ratio in the porous paper structure promotes both oxygen availability and moisture retention, (2) The paper cells guide roots downward naturally while preventing circling, creating ideal root architecture, (3) Air pruning at cell edges stimulates lateral root branching, producing dense, fibrous root systems. These factors combine to accelerate development by 40% compared to traditional methods.'
            : locale === 'de'
            ? 'Paper Plug Trays schaffen optimale Bedingungen für die Wurzelentwicklung durch drei Mechanismen: (1) Überlegenes Luft-Wasser-Verhältnis in der porösen Papierstruktur fördert sowohl Sauerstoffverfügbarkeit als auch Feuchtigkeitsretention, (2) Die Papierzellen führen Wurzeln natürlich nach unten und verhindern Kreisen, wodurch ideale Wurzelarchitektur entsteht, (3) Luftschneiden an Zellenrändern stimuliert laterale Wurzelverzweigung und produziert dichte, faserige Wurzelsysteme. Diese Faktoren kombinieren sich, um die Entwicklung um 40% im Vergleich zu traditionellen Methoden zu beschleunigen.'
            : 'Paper plug trays creëren optimale condities voor wortelontwikkeling via drie mechanismen: (1) Superieure lucht-water verhouding in de poreuze papierstructuur bevordert zowel zuurstofbeschikbaarheid als vochtretentie, (2) De papiercellen geleiden wortels natuurlijk naar beneden en voorkomen ronddraaien, wat ideale wortelarchitectuur creëert, (3) Luchtsnoei bij celranden stimuleert zijwortelvertakking, wat dichte, vezelige wortelsystemen produceert. Deze factoren combineren om ontwikkeling 40% te versnellen vergeleken met traditionele methoden.',
        },
        {
          q: locale === 'en' ? 'When is the optimal time to transplant from paper plugs?' : locale === 'de' ? 'Wann ist der optimale Zeitpunkt zum Umpflanzen aus Paper Plugs?' : 'Wanneer is het optimale moment om te verplanten vanuit paper plugs?',
          a: locale === 'en'
            ? 'The ideal transplant window is when roots are visible at cell drainage holes but before they start circling (though paper plugs minimize this). For most crops, this occurs after 14-21 days. Visual indicators: (1) White root tips visible at bottom, (2) Plant shows 2-4 true leaves, (3) Stem diameter 2-3mm, (4) Slight resistance when gently pulling the plant. Transplanting at this stage ensures established roots with minimal shock. Paper plugs allow more flexibility in timing than traditional methods since roots remain protected.'
            : locale === 'de'
            ? 'Das ideale Umpflanzfenster ist, wenn Wurzeln an Zelldrainagelöchern sichtbar sind, aber bevor sie anfangen zu kreisen (obwohl Paper Plugs dies minimieren). Für die meisten Kulturen tritt dies nach 14-21 Tagen auf. Visuelle Indikatoren: (1) Weiße Wurzelspitzen am Boden sichtbar, (2) Pflanze zeigt 2-4 echte Blätter, (3) Stängeldurchmesser 2-3mm, (4) Leichter Widerstand beim vorsichtigen Ziehen der Pflanze. Umpflanzen in diesem Stadium gewährleistet etablierte Wurzeln mit minimalem Schock. Paper Plugs ermöglichen mehr Flexibilität im Timing als traditionelle Methoden, da Wurzeln geschützt bleiben.'
            : 'Het ideale verplantmoment is wanneer wortels zichtbaar zijn bij cel drainagegaten maar voordat ze beginnen rond te draaien (hoewel paper plugs dit minimaliseren). Voor de meeste gewassen is dit na 14-21 dagen. Visuele indicatoren: (1) Witte worteltoppen zichtbaar aan onderkant, (2) Plant toont 2-4 echte bladeren, (3) Stengeldiameter 2-3mm, (4) Lichte weerstand bij voorzichtig trekken aan plant. Verplanten in dit stadium zorgt voor gevestigde wortels met minimale schok. Paper plugs bieden meer flexibiliteit in timing dan traditionele methoden omdat wortels beschermd blijven.',
        },
        {
          q: locale === 'en' ? 'Should I use mycorrhizae for all crops in paper plugs?' : locale === 'de' ? 'Sollte ich Mykorrhizen für alle Kulturen in Paper Plugs verwenden?' : 'Moet ik mycorrhiza gebruiken voor alle gewassen in paper plugs?',
          a: locale === 'en'
            ? 'Most crops benefit significantly from mycorrhizal inoculation, but not all. Use mycorrhizae for: vegetables (tomatoes, peppers, cucumbers), herbs (basil, thyme), ornamentals, fruit plants, and cannabis. Do NOT use for: Brassicas (cabbage, broccoli, kale), beets, spinach, and carnivorous plants - these families do not form mycorrhizal associations. Apply at seeding/transplanting for best results. Choose endomycorrhizae (AMF) for 90% of crops; ectomycorrhizae only for woody plants and trees. Paper plug structure provides ideal colonization environment.'
            : locale === 'de'
            ? 'Die meisten Kulturen profitieren erheblich von Mykorrhiza-Impfung, aber nicht alle. Verwenden Sie Mykorrhizen für: Gemüse (Tomaten, Paprika, Gurken), Kräuter (Basilikum, Thymian), Zierpflanzen, Obstpflanzen und Cannabis. NICHT verwenden für: Brassicas (Kohl, Brokkoli, Grünkohl), Rüben, Spinat und fleischfressende Pflanzen - diese Familien bilden keine Mykorrhiza-Assoziationen. Für beste Ergebnisse bei Aussaat/Umpflanzung anwenden. Wählen Sie Endomykorrhizen (AMF) für 90% der Kulturen; Ektomykorrhizen nur für Holzpflanzen und Bäume. Paper Plug-Struktur bietet ideale Besiedlungsumgebung.'
            : 'De meeste gewassen profiteren significant van mycorrhiza inoculatie, maar niet alle. Gebruik mycorrhiza voor: groenten (tomaten, paprika, komkommers), kruiden (basilicum, tijm), sierplanten, fruitplanten en cannabis. NIET gebruiken voor: Kruisbloemigen (kool, broccoli, boerenkool), bieten, spinazie en vleesetende planten - deze families vormen geen mycorrhiza associaties. Pas toe bij zaaien/verplanten voor beste resultaten. Kies endomycorrhiza (AMF) voor 90% van gewassen; ectomycorrhiza alleen voor houtachtige planten en bomen. Paper plug structuur biedt ideale kolonisatie omgeving.',
        },
        {
          q: locale === 'en' ? 'What root-to-shoot ratio should I aim for?' : locale === 'de' ? 'Welches Wurzel-Trieb-Verhältnis sollte ich anstreben?' : 'Welke wortel-scheut verhouding moet ik nastreven?',
          a: locale === 'en'
            ? 'Healthy seedlings/young plants should maintain root-to-shoot ratios of 1:2 to 1:3 (one part root to two-three parts shoot, by dry weight). Paper plugs naturally promote balanced growth. Adjust ratios through: (1) Temperature - cooler nights (16-18°C) favor root growth, (2) Light intensity - lower light increases root allocation, (3) Nutrients - higher phosphorus favors roots, higher nitrogen favors shoots, (4) Water stress - mild stress (not wilting) promotes deeper rooting. Visually assess: robust root ball should fill 70-80% of cell volume before transplanting.'
            : locale === 'de'
            ? 'Gesunde Sämlinge/Jungpflanzen sollten Wurzel-Trieb-Verhältnisse von 1:2 bis 1:3 aufrechterhalten (ein Teil Wurzel zu zwei-drei Teilen Trieb, nach Trockengewicht). Paper Plugs fördern natürlich ausgewogenes Wachstum. Passen Sie Verhältnisse an durch: (1) Temperatur - kühlere Nächte (16-18°C) begünstigen Wurzelwachstum, (2) Lichtintensität - niedrigeres Licht erhöht Wurzelallokation, (3) Nährstoffe - höherer Phosphor begünstigt Wurzeln, höherer Stickstoff begünstigt Triebe, (4) Wasserstress - milder Stress (kein Welken) fördert tiefere Bewurzelung. Visuell beurteilen: Robuster Wurzelballen sollte 70-80% des Zellenvolumens vor Umpflanzung füllen.'
            : 'Gezonde zaailingen/jonge planten moeten wortel-scheut verhoudingen van 1:2 tot 1:3 handhaven (één deel wortel tot twee-drie delen scheut, op drooggewicht). Paper plugs bevorderen natuurlijk gebalanceerde groei. Pas verhoudingen aan via: (1) Temperatuur - koelere nachten (16-18°C) bevoordelen wortelgroei, (2) Lichtintensiteit - lager licht verhoogt wortelallocatie, (3) Nutriënten - hoger fosfor bevordert wortels, hoger stikstof bevordert scheuten, (4) Waterstress - milde stress (geen verwelking) bevordert diepere beworteling. Visueel beoordelen: Robuuste wortelkluit moet 70-80% van celvolume vullen voor verplanting.',
        },
      ],
    },
    cta: {
      title: locale === 'en' ? 'Transform Your Root Development Today' : locale === 'de' ? 'Transformieren Sie Ihre Wurzelentwicklung Heute' : 'Transformeer Je Wortelontwikkeling Vandaag',
      description: locale === 'en'
        ? 'Experience 40% faster root formation and stronger plant establishment with paper plug trays. Start growing healthier, more resilient plants.'
        : locale === 'de'
        ? 'Erleben Sie 40% schnellere Wurzelbildung und stärkere Pflanzenestablierung mit Paper Plug Trays. Beginnen Sie, gesündere, widerstandsfähigere Pflanzen zu züchten.'
        : 'Ervaar 40% snellere wortelvorming en sterkere plantvestiging met paper plug trays. Begin met het kweken van gezondere, veerkrachtiger planten.',
      primaryButton: locale === 'en' ? 'Shop Paper Plug Trays' : locale === 'de' ? 'Paper Plug Trays Kaufen' : 'Koop Paper Plug Trays',
      secondaryButton: locale === 'en' ? 'Expert Consultation' : locale === 'de' ? 'Expertenberatung' : 'Expert Advies',
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-lumora-cream to-white">
      {/* Hero Section */}
      <section className="relative py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 bg-lumora-green-500/10 text-lumora-green-500 rounded-full text-sm font-semibold mb-6">
              {t.hero.badge}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-lumora-dark mb-6 leading-tight">
              {t.hero.title}
            </h1>
            <p className="text-xl text-lumora-dark/70 max-w-3xl mx-auto mb-4">
              {t.hero.subtitle}
            </p>
            <p className="text-sm text-lumora-dark/50">
              {t.hero.lastUpdated}
            </p>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-display font-bold text-lumora-dark mb-6">
            {t.intro.title}
          </h2>
          <div className="prose prose-lg max-w-none">
            {t.intro.paragraphs.map((paragraph, index) => (
              <p key={index} className="text-lumora-dark/80 mb-4 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Root Physiology */}
      <section className="py-12 bg-lumora-cream/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold text-lumora-dark mb-4">
              {t.rootPhysiology.title}
            </h2>
            <p className="text-lg text-lumora-dark/70">
              {t.rootPhysiology.subtitle}
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {t.rootPhysiology.factors.map((factor, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-soft">
                <div className="text-4xl mb-4">{factor.icon}</div>
                <h3 className="text-xl font-bold text-lumora-dark mb-3">
                  {factor.title}
                </h3>
                <p className="text-lumora-dark/70 leading-relaxed">
                  {factor.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8 Techniques */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-display font-bold text-lumora-dark mb-12 text-center">
            {t.techniques.title}
          </h2>
          <div className="space-y-8">
            {t.techniques.list.map((technique, index) => (
              <div key={index} className="bg-gradient-to-br from-lumora-cream/50 to-white rounded-xl p-8 shadow-soft-lg border border-lumora-green-500/10">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-lumora-green-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                      {technique.number}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-lumora-dark mb-3">
                      {technique.title}
                    </h3>
                    <p className="text-lumora-dark/80 leading-relaxed text-lg mb-4">
                      {technique.description}
                    </p>
                    {technique.details && (
                      <ul className="space-y-2">
                        {technique.details.map((detail, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-lumora-dark/70">
                            <span className="text-lumora-green-500 mt-1">•</span>
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-12 bg-lumora-cream/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-display font-bold text-lumora-dark mb-12 text-center">
            {t.timeline.title}
          </h2>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-1 bg-lumora-green-500/30 hidden md:block" />

            <div className="space-y-8">
              {t.timeline.stages.map((stage, index) => (
                <div key={index} className="relative md:pl-20">
                  {/* Timeline dot */}
                  <div className="absolute left-5 w-8 h-8 bg-lumora-green-500 rounded-full border-4 border-white hidden md:block" />

                  <div className="bg-white rounded-lg p-6 shadow-soft">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="inline-block px-3 py-1 bg-lumora-green-500 text-white rounded-full text-sm font-semibold">
                        {stage.days}
                      </span>
                      <h3 className="text-xl font-bold text-lumora-dark">
                        {stage.title}
                      </h3>
                    </div>
                    <p className="text-lumora-dark/70 leading-relaxed">
                      {stage.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-12 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-display font-bold text-lumora-dark mb-8 text-center">
            {t.comparison.title}
          </h2>
          <div className="bg-white rounded-xl shadow-soft-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-lumora-green-500 text-white">
                  <tr>
                    {t.comparison.table.headers.map((header, index) => (
                      <th key={index} className="px-6 py-4 text-left font-bold">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-lumora-dark/10">
                  {t.comparison.table.rows.map((row, index) => (
                    <tr key={index} className="hover:bg-lumora-cream/30 transition-colors">
                      <td className="px-6 py-4 font-semibold text-lumora-dark">
                        {row.factor}
                      </td>
                      <td className="px-6 py-4 text-lumora-green-500 font-semibold">
                        ✓ {row.paperPlug}
                      </td>
                      <td className="px-6 py-4 text-lumora-dark/60">
                        {row.traditional}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Troubleshooting */}
      <section className="py-12 bg-lumora-cream/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-display font-bold text-lumora-dark mb-8">
            {t.troubleshooting.title}
          </h2>
          <div className="space-y-6">
            {t.troubleshooting.issues.map((issue, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-soft">
                <h3 className="text-xl font-bold text-lumora-dark mb-2 flex items-center gap-2">
                  <span className="text-2xl">🔧</span>
                  {issue.problem}
                </h3>
                <p className="text-lumora-dark/70 italic mb-4">
                  {issue.symptoms}
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-lumora-dark mb-2">
                      {locale === 'en' ? 'Possible Causes:' : locale === 'de' ? 'Mögliche Ursachen:' : 'Mogelijke oorzaken:'}
                    </h4>
                    <ul className="space-y-1">
                      {issue.causes.map((cause, idx) => (
                        <li key={idx} className="text-lumora-dark/70 flex items-start gap-2 text-sm">
                          <span className="text-red-500 mt-1">❌</span>
                          <span>{cause}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lumora-dark mb-2">
                      {locale === 'en' ? 'Solutions:' : locale === 'de' ? 'Lösungen:' : 'Oplossingen:'}
                    </h4>
                    <ul className="space-y-1">
                      {issue.solutions.map((solution, idx) => (
                        <li key={idx} className="text-lumora-dark/70 flex items-start gap-2 text-sm">
                          <span className="text-lumora-green-500 mt-1">✓</span>
                          <span>{solution}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-display font-bold text-lumora-dark mb-8">
            {t.faq.title}
          </h2>
          <div className="space-y-6">
            {t.faq.questions.map((item, index) => (
              <div key={index} className="bg-lumora-cream/30 rounded-lg p-6">
                <h3 className="text-xl font-bold text-lumora-dark mb-3">
                  ❓ {item.q}
                </h3>
                <p className="text-lumora-dark/80 leading-relaxed">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-lumora-green-500 to-lumora-dark text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
            {t.cta.title}
          </h2>
          <p className="text-xl mb-8 text-white/90">
            {t.cta.description}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={localizePathForLocale('/shop', locale)}
              className="inline-block px-8 py-4 bg-white text-lumora-green-500 rounded-lg font-semibold hover:bg-lumora-cream transition-colors shadow-soft-lg"
            >
              {t.cta.primaryButton}
            </Link>
            <Link
              href={localizePathForLocale('/contact', locale)}
              className="inline-block px-8 py-4 bg-lumora-green-500/20 text-white rounded-lg font-semibold hover:bg-lumora-green-500/30 transition-colors border-2 border-white"
            >
              {t.cta.secondaryButton}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

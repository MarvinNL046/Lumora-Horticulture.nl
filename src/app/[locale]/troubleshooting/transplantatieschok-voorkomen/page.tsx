import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { localizePathForLocale } from '@/lib/url-localizations';

export const metadata: Metadata = {
  title: 'Transplantatieschok Voorkomen bij Stekken | Expert Gids 2025',
  description: 'Voorkom transplantatieschok effectief met paper plug trays. Complete gids met 7 praktische strategieën, expert tips en bewezen technieken voor sterke wortelvorming.',
  keywords: 'transplantatieschok voorkomen, stekken verplanten, wortelschok, paper plug tray, steenwol pluggen, transplantatie stress, wortelvorming, zaailing verzorging',
  openGraph: {
    title: 'Transplantatieschok Voorkomen: 7 Bewezen Strategieën | Lumora',
    description: 'Verminder transplantatieschok met 85% door paper plug trays te gebruiken. Expert gids met praktische tips voor succesvolle verplanting.',
    type: 'article',
    images: ['/productAfbeeldingen/paper-plug-tray-hero.jpg'],
  },
  alternates: {
    canonical: '/troubleshooting/transplantatieschok-voorkomen',
    languages: {
      'nl': '/troubleshooting/transplantatieschok-voorkomen',
      'en': '/en/troubleshooting/prevent-transplant-shock',
      'de': '/de/troubleshooting/umpflanzschock-verhindern',
    },
  },
};

interface PageProps {
  params: { locale: string };
}

export default function TransplantatieschokVoorkomenPage({ params }: PageProps) {
  const { locale } = params;

  // Translations
  const t = {
    hero: {
      badge: locale === 'en' ? 'Problem Solving Guide' : locale === 'de' ? 'Problemlösungsanleitung' : 'Probleem Oplossing',
      title: locale === 'en'
        ? 'Prevent Transplant Shock: 7 Proven Strategies for Healthy Root Development'
        : locale === 'de'
        ? 'Umpflanzschock Verhindern: 7 Bewährte Strategien für Gesunde Wurzelentwicklung'
        : 'Transplantatieschok Voorkomen: 7 Bewezen Strategieën voor Gezonde Wortelontwikkeling',
      subtitle: locale === 'en'
        ? 'Reduce transplant stress by up to 85% with paper plug trays. Expert guide with practical techniques for professional growers.'
        : locale === 'de'
        ? 'Reduzieren Sie Umpflanzstress um bis zu 85% mit Paper Plug Trays. Expertenratgeber mit praktischen Techniken für professionelle Züchter.'
        : 'Verminder transplantatiestress tot 85% met paper plug trays. Expert gids met praktische technieken voor professionele telers.',
      lastUpdated: locale === 'en' ? 'Last updated: November 2025' : locale === 'de' ? 'Letzte Aktualisierung: November 2025' : 'Laatst bijgewerkt: November 2025',
    },
    intro: {
      title: locale === 'en' ? 'What Is Transplant Shock?' : locale === 'de' ? 'Was Ist Umpflanzschock?' : 'Wat Is Transplantatieschok?',
      paragraphs: [
        locale === 'en'
          ? 'Transplant shock occurs when plants experience stress during transplantation, causing growth delays, wilting, and sometimes plant loss. This is one of the most common challenges in professional horticulture.'
          : locale === 'de'
          ? 'Umpflanzschock tritt auf, wenn Pflanzen während der Umpflanzung Stress erfahren, was zu Wachstumsverzögerungen, Welken und manchmal Pflanzenverlust führt. Dies ist eine der häufigsten Herausforderungen im professionellen Gartenbau.'
          : 'Transplantatieschok treedt op wanneer planten stress ervaren tijdens het verplanten, wat leidt tot groeivertraging, verwelking en soms plantuitval. Dit is een van de meest voorkomende uitdagingen in de professionele tuinbouw.',
        locale === 'en'
          ? 'The main cause is root system disruption during transplantation. Traditional growing methods with loose substrate often damage delicate roots, leading to recovery periods of 7-14 days.'
          : locale === 'de'
          ? 'Die Hauptursache ist die Störung des Wurzelsystems während der Umpflanzung. Traditionelle Anbaumethoden mit lockerem Substrat beschädigen oft empfindliche Wurzeln, was zu Erholungszeiten von 7-14 Tagen führt.'
          : 'De hoofdoorzaak is verstoring van het wortelstelsel tijdens verplanting. Traditionele kweekmethoden met los substraat beschadigen vaak de kwetsbare wortels, wat leidt tot herstelperiodes van 7-14 dagen.',
        locale === 'en'
          ? 'Paper plug trays offer a revolutionary solution: the biodegradable structure holds roots firmly in place during transplantation, minimizing stress and accelerating the establishment period.'
          : locale === 'de'
          ? 'Paper Plug Trays bieten eine revolutionäre Lösung: Die biologisch abbaubare Struktur hält die Wurzeln während der Umpflanzung fest an Ort und Stelle, minimiert Stress und beschleunigt die Etablierungsphase.'
          : 'Paper plug trays bieden een revolutionaire oplossing: de biologisch afbreekbare structuur houdt wortels stevig op hun plaats tijdens verplanting, waardoor stress wordt geminimaliseerd en de aangroeifase versnelt.',
      ],
    },
    symptoms: {
      title: locale === 'en' ? 'Recognizing Transplant Shock Symptoms' : locale === 'de' ? 'Umpflanzschock-Symptome Erkennen' : 'Symptomen van Transplantatieschok Herkennen',
      items: [
        {
          symptom: locale === 'en' ? 'Wilting leaves' : locale === 'de' ? 'Welke Blätter' : 'Verwelkende bladeren',
          description: locale === 'en' ? 'Within 24-48 hours after transplantation, even with sufficient water' : locale === 'de' ? 'Innerhalb von 24-48 Stunden nach der Umpflanzung, selbst bei ausreichend Wasser' : 'Binnen 24-48 uur na verplanting, zelfs bij voldoende water',
        },
        {
          symptom: locale === 'en' ? 'Stunted growth' : locale === 'de' ? 'Verzögertes Wachstum' : 'Vertraagde groei',
          description: locale === 'en' ? 'Growth stagnation for 1-2 weeks after transplantation' : locale === 'de' ? 'Wachstumsstillstand für 1-2 Wochen nach der Umpflanzung' : 'Groeistilstand gedurende 1-2 weken na verplanting',
        },
        {
          symptom: locale === 'en' ? 'Yellow leaf edges' : locale === 'de' ? 'Gelbe Blattränder' : 'Gele bladranden',
          description: locale === 'en' ? 'Due to disturbed nutrient uptake' : locale === 'de' ? 'Aufgrund gestörter Nährstoffaufnahme' : 'Door verstoorde nutriëntenopname',
        },
        {
          symptom: locale === 'en' ? 'Drooping stems' : locale === 'de' ? 'Hängende Stängel' : 'Hangende stengels',
          description: locale === 'en' ? 'Loss of turgor pressure in the plant' : locale === 'de' ? 'Verlust des Turgordrucks in der Pflanze' : 'Verlies van turgordruk in de plant',
        },
        {
          symptom: locale === 'en' ? 'Root tip death' : locale === 'de' ? 'Wurzelspitzensterben' : 'Afsterven van worteltoppen',
          description: locale === 'en' ? 'Brown, damaged root ends visible upon inspection' : locale === 'de' ? 'Braune, beschädigte Wurzelenden sichtbar bei Inspektion' : 'Bruine, beschadigde worteluiteinden zichtbaar bij inspectie',
        },
      ],
    },
    strategies: {
      title: locale === 'en' ? '7 Strategies to Prevent Transplant Shock' : locale === 'de' ? '7 Strategien zur Verhinderung von Umpflanzschock' : '7 Strategieën om Transplantatieschok te Voorkomen',
      list: [
        {
          number: '1',
          title: locale === 'en' ? 'Use Paper Plug Trays' : locale === 'de' ? 'Verwenden Sie Paper Plug Trays' : 'Gebruik Paper Plug Trays',
          description: locale === 'en'
            ? 'The most effective method: transplant plants with complete root ball. The biodegradable structure eliminates root disruption and provides a smooth transition. Research shows up to 85% reduction in transplant shock.'
            : locale === 'de'
            ? 'Die effektivste Methode: Pflanzen mit vollständigem Wurzelballen umpflanzen. Die biologisch abbaubare Struktur eliminiert Wurzelstörungen und bietet einen reibungslosen Übergang. Forschungen zeigen bis zu 85% Reduzierung des Umpflanzschocks.'
            : 'De meest effectieve methode: verplant planten met complete wortelkluit. De biologisch afbreekbare structuur elimineert wortelschade en zorgt voor een soepele overgang. Onderzoek toont tot 85% vermindering van transplantatieschok.',
          icon: '🌱',
        },
        {
          number: '2',
          title: locale === 'en' ? 'Optimal Timing' : locale === 'de' ? 'Optimales Timing' : 'Optimale Timing',
          description: locale === 'en'
            ? 'Transplant in early morning or evening when temperatures are cooler and evaporation is minimal. Avoid midday when plants experience maximum stress from heat and light.'
            : locale === 'de'
            ? 'Umpflanzen Sie am frühen Morgen oder Abend, wenn die Temperaturen kühler sind und die Verdunstung minimal ist. Vermeiden Sie die Mittagszeit, wenn Pflanzen maximalen Stress durch Hitze und Licht erfahren.'
            : 'Verplant in de vroege ochtend of avond wanneer temperaturen koeler zijn en verdamping minimaal. Vermijd middag wanneer planten maximale stress ervaren door hitte en licht.',
          icon: '⏰',
        },
        {
          number: '3',
          title: locale === 'en' ? 'Pre-Watering Protocol' : locale === 'de' ? 'Vorwässerungsprotokoll' : 'Voorwater Protocol',
          description: locale === 'en'
            ? 'Water plants thoroughly 24 hours before transplantation. This ensures optimal cell turgor and reduces transplant stress. Cells with sufficient moisture can better withstand mechanical stress.'
            : locale === 'de'
            ? 'Gießen Sie Pflanzen gründlich 24 Stunden vor der Umpflanzung. Dies gewährleistet optimalen Zellturgor und reduziert Umpflanzstress. Zellen mit ausreichender Feuchtigkeit können mechanischen Stress besser widerstehen.'
            : 'Geef planten grondig water 24 uur voor verplanting. Dit zorgt voor optimale celturgor en vermindert transplantatistress. Cellen met voldoende vocht kunnen mechanische stress beter weerstaan.',
          icon: '💧',
        },
        {
          number: '4',
          title: locale === 'en' ? 'Root Zone Protection' : locale === 'de' ? 'Wurzelzonenschutz' : 'Wortelzone Bescherming',
          description: locale === 'en'
            ? 'Handle root systems with extreme care. With paper plugs: transplant the entire plug including the paper structure. Never pull plants from plugs - cut the paper if needed, though this is usually unnecessary.'
            : locale === 'de'
            ? 'Behandeln Sie Wurzelsysteme mit äußerster Vorsicht. Mit Paper Plugs: Umpflanzen Sie den gesamten Plug einschließlich der Papierstruktur. Ziehen Sie niemals Pflanzen aus Plugs - schneiden Sie das Papier bei Bedarf, obwohl dies normalerweise unnötig ist.'
            : 'Behandel wortelsystemen met uiterste zorg. Met paper plugs: verplant de hele plug inclusief de papierstructuur. Trek nooit planten uit plugs - snijd het papier indien nodig, hoewel dit meestal onnodig is.',
          icon: '🛡️',
        },
        {
          number: '5',
          title: locale === 'en' ? 'Climate Control After Transplanting' : locale === 'de' ? 'Klimakontrolle Nach Umpflanzung' : 'Klimaatbeheersing na Verplanting',
          description: locale === 'en'
            ? 'Create a recovery chamber with high humidity (70-80%) and moderate temperature (18-22°C). Reduce light intensity by 30-40% in the first 3-5 days. This allows plants to establish roots without excess evaporation stress.'
            : locale === 'de'
            ? 'Schaffen Sie eine Erholungskammer mit hoher Luftfeuchtigkeit (70-80%) und moderater Temperatur (18-22°C). Reduzieren Sie die Lichtintensität in den ersten 3-5 Tagen um 30-40%. Dies ermöglicht es den Pflanzen, Wurzeln ohne übermäßigen Verdunstungsstress zu bilden.'
            : 'Creëer een herstelkamer met hoge luchtvochtigheid (70-80%) en gematigde temperatuur (18-22°C). Verminder lichtintensiteit met 30-40% in de eerste 3-5 dagen. Dit stelt planten in staat wortels te vormen zonder overmatige verdampingsstress.',
          icon: '🌡️',
        },
        {
          number: '6',
          title: locale === 'en' ? 'Strategic Nutrient Management' : locale === 'de' ? 'Strategisches Nährstoffmanagement' : 'Strategisch Nutriëntenbeheer',
          description: locale === 'en'
            ? 'Start with 50% normal nutrient concentration in the first week. Damaged roots are less efficient at nutrient uptake, and high concentrations can cause salt stress. Gradually increase to normal levels after 7-10 days.'
            : locale === 'de'
            ? 'Beginnen Sie mit 50% der normalen Nährstoffkonzentration in der ersten Woche. Beschädigte Wurzeln sind weniger effizient bei der Nährstoffaufnahme, und hohe Konzentrationen können Salzstress verursachen. Erhöhen Sie nach 7-10 Tagen allmählich auf normale Werte.'
            : 'Start met 50% normale nutriëntenconcentratie in de eerste week. Beschadigde wortels zijn minder efficiënt in nutriëntenopname, en hoge concentraties kunnen zoutstress veroorzaken. Verhoog geleidelijk naar normale niveaus na 7-10 dagen.',
          icon: '⚗️',
        },
        {
          number: '7',
          title: locale === 'en' ? 'Root Stimulator Application' : locale === 'de' ? 'Wurzelstimulator-Anwendung' : 'Wortelstimulator Toepassing',
          description: locale === 'en'
            ? 'Use biological root stimulators containing mycorrhizae and beneficial bacteria. Apply immediately after transplanting to accelerate root regeneration and improve nutrient uptake. Effect is enhanced when combined with paper plug system.'
            : locale === 'de'
            ? 'Verwenden Sie biologische Wurzelstimulatoren, die Mykorrhizen und nützliche Bakterien enthalten. Wenden Sie sie sofort nach der Umpflanzung an, um die Wurzelregeneration zu beschleunigen und die Nährstoffaufnahme zu verbessern. Die Wirkung wird verstärkt, wenn sie mit dem Paper Plug-System kombiniert wird.'
            : 'Gebruik biologische wortelstimulators met mycorrhiza en nuttige bacteriën. Pas direct na verplanting toe om wortelregeneratie te versnellen en nutriëntenopname te verbeteren. Effect wordt versterkt bij combinatie met paper plug systeem.',
          icon: '🔬',
        },
      ],
    },
    comparison: {
      title: locale === 'en' ? 'Paper Plugs vs. Traditional Methods' : locale === 'de' ? 'Paper Plugs vs. Traditionelle Methoden' : 'Paper Plugs vs. Traditionele Methoden',
      table: {
        headers: [
          locale === 'en' ? 'Aspect' : locale === 'de' ? 'Aspekt' : 'Aspect',
          locale === 'en' ? 'Paper Plug Trays' : locale === 'de' ? 'Paper Plug Trays' : 'Paper Plug Trays',
          locale === 'en' ? 'Traditional Methods' : locale === 'de' ? 'Traditionelle Methoden' : 'Traditionele Methoden',
        ],
        rows: [
          {
            aspect: locale === 'en' ? 'Root disruption' : locale === 'de' ? 'Wurzelstörung' : 'Wortelschade',
            paperPlug: locale === 'en' ? 'Minimal - complete root ball' : locale === 'de' ? 'Minimal - vollständiger Wurzelballen' : 'Minimaal - complete wortelkluit',
            traditional: locale === 'en' ? 'Significant - 20-40% root loss' : locale === 'de' ? 'Erheblich - 20-40% Wurzelverlust' : 'Aanzienlijk - 20-40% wortelverlies',
          },
          {
            aspect: locale === 'en' ? 'Recovery time' : locale === 'de' ? 'Erholungszeit' : 'Herstelperiode',
            paperPlug: locale === 'en' ? '1-3 days' : locale === 'de' ? '1-3 Tage' : '1-3 dagen',
            traditional: locale === 'en' ? '7-14 days' : locale === 'de' ? '7-14 Tage' : '7-14 dagen',
          },
          {
            aspect: locale === 'en' ? 'Survival rate' : locale === 'de' ? 'Überlebensrate' : 'Overlevingspercentage',
            paperPlug: locale === 'en' ? '95-98%' : locale === 'de' ? '95-98%' : '95-98%',
            traditional: locale === 'en' ? '85-90%' : locale === 'de' ? '85-90%' : '85-90%',
          },
          {
            aspect: locale === 'en' ? 'Labor time' : locale === 'de' ? 'Arbeitszeit' : 'Arbeidstijd',
            paperPlug: locale === 'en' ? '-40% faster' : locale === 'de' ? '-40% schneller' : '-40% sneller',
            traditional: locale === 'en' ? 'Baseline' : locale === 'de' ? 'Basis' : 'Basis',
          },
          {
            aspect: locale === 'en' ? 'Growth delay' : locale === 'de' ? 'Wachstumsverzögerung' : 'Groeivertraging',
            paperPlug: locale === 'en' ? '1-2 days' : locale === 'de' ? '1-2 Tage' : '1-2 dagen',
            traditional: locale === 'en' ? '5-10 days' : locale === 'de' ? '5-10 Tage' : '5-10 dagen',
          },
        ],
      },
    },
    expertTips: {
      title: locale === 'en' ? 'Expert Tips from Professional Growers' : locale === 'de' ? 'Expertentipps von Professionellen Züchtern' : 'Expert Tips van Professionele Telers',
      tips: [
        {
          title: locale === 'en' ? 'Paper plug preparation' : locale === 'de' ? 'Paper Plug Vorbereitung' : 'Paper plug voorbereiding',
          content: locale === 'en'
            ? '"Ensure paper plugs are thoroughly moistened before transplanting. The paper should be flexible but not soggy. This ensures optimal root adhesion and prevents paper tearing during transplantation." - Jan de Vries, cultivation specialist with 20 years experience'
            : locale === 'de'
            ? '"Stellen Sie sicher, dass Paper Plugs vor der Umpflanzung gründlich befeuchtet sind. Das Papier sollte flexibel, aber nicht durchnässt sein. Dies gewährleistet optimale Wurzelhaftung und verhindert Papierschäden während der Umpflanzung." - Jan de Vries, Anbauspezialist mit 20 Jahren Erfahrung'
            : '"Zorg dat paper plugs grondig bevochtigd zijn voor verplanting. Het papier moet flexibel zijn maar niet doorweekt. Dit zorgt voor optimale wortelhechting en voorkomt papier scheuren tijdens verplanting." - Jan de Vries, teeltspecialist met 20 jaar ervaring',
        },
        {
          title: locale === 'en' ? 'Transplant depth' : locale === 'de' ? 'Umpflanztiefe' : 'Verplantdiepte',
          content: locale === 'en'
            ? '"Plant paper plugs at exactly the same depth as they grew in the tray. Too deep causes stem rot, too shallow dries roots. The paper edge should be 2-3mm below the soil surface for optimal decomposition." - Maria Janssen, horticultural advisor'
            : locale === 'de'
            ? '"Pflanzen Sie Paper Plugs genau in der gleichen Tiefe wie sie im Tablett gewachsen sind. Zu tief verursacht Stammfäule, zu flach trocknet Wurzeln aus. Die Papierkante sollte 2-3mm unter der Bodenoberfläche sein für optimale Zersetzung." - Maria Janssen, Gartenbauberaterin'
            : '"Plant paper plugs op exact dezelfde diepte als ze groeiden in de tray. Te diep veroorzaakt stengelrot, te ondiep droogt wortels uit. De papierrand moet 2-3mm onder het substraatoppervlak zitten voor optimale afbraak." - Maria Janssen, tuinbouwadviseur',
        },
        {
          title: locale === 'en' ? 'Post-transplant monitoring' : locale === 'de' ? 'Überwachung nach Umpflanzung' : 'Monitoring na verplanting',
          content: locale === 'en'
            ? '"Check plants twice daily in the first 72 hours. Slight wilting is normal for the first 12-24 hours, but leaves should recover by day two. If not, check moisture and temperature. With paper plugs, problems are rare if basics are correct." - Peter van Dam, greenhouse manager'
            : locale === 'de'
            ? '"Überprüfen Sie Pflanzen zweimal täglich in den ersten 72 Stunden. Leichtes Welken ist normal für die ersten 12-24 Stunden, aber Blätter sollten sich bis Tag zwei erholen. Wenn nicht, überprüfen Sie Feuchtigkeit und Temperatur. Mit Paper Plugs sind Probleme selten, wenn die Grundlagen stimmen." - Peter van Dam, Gewächshausmanager'
            : '"Controleer planten tweemaal daags in de eerste 72 uur. Lichte verwelking is normaal de eerste 12-24 uur, maar bladeren moeten herstellen tegen dag twee. Zo niet, controleer vocht en temperatuur. Met paper plugs zijn problemen zeldzaam als de basis klopt." - Peter van Dam, kasmanager',
        },
      ],
    },
    troubleshooting: {
      title: locale === 'en' ? 'Troubleshooting Common Issues' : locale === 'de' ? 'Behebung Häufiger Probleme' : 'Veelvoorkomende Problemen Oplossen',
      issues: [
        {
          problem: locale === 'en' ? 'Persistent wilting after 48 hours' : locale === 'de' ? 'Anhaltendes Welken nach 48 Stunden' : 'Aanhoudende verwelking na 48 uur',
          causes: [
            locale === 'en' ? 'Insufficient root-substrate contact' : locale === 'de' ? 'Unzureichender Wurzel-Substrat-Kontakt' : 'Onvoldoende wortel-substraat contact',
            locale === 'en' ? 'Too dry or too wet substrate' : locale === 'de' ? 'Zu trockenes oder zu nasses Substrat' : 'Te droog of te nat substraat',
            locale === 'en' ? 'Paper plug not sufficiently moistened' : locale === 'de' ? 'Paper Plug nicht ausreichend befeuchtet' : 'Paper plug niet voldoende bevochtigd',
          ],
          solutions: [
            locale === 'en' ? 'Gently press substrate around the plug' : locale === 'de' ? 'Substrat sanft um den Plug drücken' : 'Substraat voorzichtig rondom plug aandrukken',
            locale === 'en' ? 'Check substrate moisture - should be moist but not soggy' : locale === 'de' ? 'Substratfeuchtigkeit überprüfen - sollte feucht, aber nicht durchnässt sein' : 'Substraat vocht checken - moet vochtig zijn maar niet doorweekt',
            locale === 'en' ? 'Spray water directly on the paper plug' : locale === 'de' ? 'Wasser direkt auf den Paper Plug sprühen' : 'Water direct op paper plug sprayen',
          ],
        },
        {
          problem: locale === 'en' ? 'Yellow leaf edges after transplanting' : locale === 'de' ? 'Gelbe Blattränder nach Umpflanzung' : 'Gele bladranden na verplanting',
          causes: [
            locale === 'en' ? 'Too high nutrient concentration' : locale === 'de' ? 'Zu hohe Nährstoffkonzentration' : 'Te hoge nutriëntenconcentratie',
            locale === 'en' ? 'Salt stress from substrate' : locale === 'de' ? 'Salzstress aus Substrat' : 'Zoutstress van substraat',
            locale === 'en' ? 'Damaged root tips' : locale === 'de' ? 'Beschädigte Wurzelspitzen' : 'Beschadigde worteltoppen',
          ],
          solutions: [
            locale === 'en' ? 'Flush with clean water (EC <0.5)' : locale === 'de' ? 'Mit sauberem Wasser spülen (EC <0.5)' : 'Spoelen met schoon water (EC <0.5)',
            locale === 'en' ? 'Reduce nutrient concentration to 30-40%' : locale === 'de' ? 'Nährstoffkonzentration auf 30-40% reduzieren' : 'Nutriëntenconcentratie verlagen naar 30-40%',
            locale === 'en' ? 'Wait 3-5 days before fertilizing again' : locale === 'de' ? 'Warten Sie 3-5 Tage vor erneutem Düngen' : 'Wacht 3-5 dagen voor opnieuw bemesten',
          ],
        },
        {
          problem: locale === 'en' ? 'Slow growth after transplanting' : locale === 'de' ? 'Langsames Wachstum nach Umpflanzung' : 'Trage groei na verplanting',
          causes: [
            locale === 'en' ? 'Temperature too low (<16°C)' : locale === 'de' ? 'Temperatur zu niedrig (<16°C)' : 'Temperatuur te laag (<16°C)',
            locale === 'en' ? 'Insufficient light' : locale === 'de' ? 'Unzureichendes Licht' : 'Onvoldoende licht',
            locale === 'en' ? 'Roots still establishing' : locale === 'de' ? 'Wurzeln bilden sich noch' : 'Wortels nog bezig met aangoeien',
          ],
          solutions: [
            locale === 'en' ? 'Increase temperature to 20-24°C' : locale === 'de' ? 'Temperatur auf 20-24°C erhöhen' : 'Temperatuur verhogen naar 20-24°C',
            locale === 'en' ? 'Provide additional light (if needed)' : locale === 'de' ? 'Zusätzliches Licht bereitstellen (falls erforderlich)' : 'Extra licht geven (indien nodig)',
            locale === 'en' ? 'Allow 7-10 days for full establishment with paper plugs' : locale === 'de' ? 'Erlauben Sie 7-10 Tage für vollständige Etablierung mit Paper Plugs' : 'Geef 7-10 dagen voor volledige aangroei met paper plugs',
          ],
        },
      ],
    },
    faq: {
      title: locale === 'en' ? 'Frequently Asked Questions' : locale === 'de' ? 'Häufig Gestellte Fragen' : 'Veelgestelde Vragen',
      questions: [
        {
          q: locale === 'en' ? 'How quickly can I see results with paper plug trays?' : locale === 'de' ? 'Wie schnell kann ich Ergebnisse mit Paper Plug Trays sehen?' : 'Hoe snel zie ik resultaat met paper plug trays?',
          a: locale === 'en'
            ? 'Most growers notice significant improvement within the first week. Plants transplanted with paper plugs typically show new growth within 2-3 days, compared to 7-10 days with traditional methods. The full benefit becomes apparent after 2-3 weeks when you compare growth rates.'
            : locale === 'de'
            ? 'Die meisten Züchter bemerken innerhalb der ersten Woche eine deutliche Verbesserung. Mit Paper Plugs verpflanzte Pflanzen zeigen typischerweise innerhalb von 2-3 Tagen neues Wachstum, verglichen mit 7-10 Tagen bei traditionellen Methoden. Der volle Nutzen wird nach 2-3 Wochen deutlich, wenn Sie Wachstumsraten vergleichen.'
            : 'De meeste telers zien al binnen de eerste week significant verschil. Planten verplant met paper plugs tonen meestal al binnen 2-3 dagen nieuwe groei, tegenover 7-10 dagen bij traditionele methoden. Het volledige voordeel wordt duidelijk na 2-3 weken wanneer je groeisnelheden vergelijkt.',
        },
        {
          q: locale === 'en' ? 'Can I use paper plugs for all plant types?' : locale === 'de' ? 'Kann ich Paper Plugs für alle Pflanzenarten verwenden?' : 'Kan ik paper plugs gebruiken voor alle plantensoorten?',
          a: locale === 'en'
            ? 'Paper plugs work excellently for most plant types, especially cuttings, seedlings, and young plants. They are ideal for vegetables, herbs, ornamental plants, and even woody cuttings. Only plants that strongly dislike root restriction (like certain taprooted species) may require special attention.'
            : locale === 'de'
            ? 'Paper Plugs funktionieren hervorragend für die meisten Pflanzenarten, insbesondere Stecklinge, Sämlinge und Jungpflanzen. Sie sind ideal für Gemüse, Kräuter, Zierpflanzen und sogar Holzstecklinge. Nur Pflanzen, die starke Wurzelbeschränkungen nicht mögen (wie bestimmte Pfahlwurzelarten), benötigen möglicherweise besondere Aufmerksamkeit.'
            : 'Paper plugs werken uitstekend voor de meeste plantensoorten, vooral stekken, zaailingen en jonge planten. Ze zijn ideaal voor groenten, kruiden, sierplanten en zelfs houtige stekken. Alleen planten die sterk gekant zijn tegen wortelbeperking (zoals bepaalde penwortelsoorten) vragen mogelijk extra aandacht.',
        },
        {
          q: locale === 'en' ? 'Do I need to remove the paper before transplanting?' : locale === 'de' ? 'Muss ich das Papier vor der Umpflanzung entfernen?' : 'Moet ik het papier verwijderen voor verplanten?',
          a: locale === 'en'
            ? 'No, absolutely not! The power of paper plugs lies precisely in transplanting the entire plug including the paper. The paper is biodegradable and breaks down naturally in the soil within 4-8 weeks. Roots grow easily through the paper. Removing the paper would defeat the purpose and cause the very transplant shock you want to avoid.'
            : locale === 'de'
            ? 'Nein, absolut nicht! Die Kraft von Paper Plugs liegt gerade darin, den gesamten Plug einschließlich des Papiers umzupflanzen. Das Papier ist biologisch abbaubar und zersetzt sich natürlich im Boden innerhalb von 4-8 Wochen. Wurzeln wachsen leicht durch das Papier. Das Entfernen des Papiers würde den Zweck zunichte machen und genau den Umpflanzschock verursachen, den Sie vermeiden möchten.'
            : 'Nee, absoluut niet! De kracht van paper plugs zit juist in het verplanten van de hele plug inclusief papier. Het papier is biologisch afbreekbaar en lost vanzelf op in de grond binnen 4-8 weken. Wortels groeien gemakkelijk door het papier heen. Het papier verwijderen zou het hele doel teniet doen en juist de transplantatieschok veroorzaken die je wilt voorkomen.',
        },
        {
          q: locale === 'en' ? 'What should I do if plants still show transplant shock?' : locale === 'de' ? 'Was soll ich tun, wenn Pflanzen immer noch Umpflanzschock zeigen?' : 'Wat moet ik doen als planten toch transplantatieschok vertonen?',
          a: locale === 'en'
            ? 'First, check the basics: moisture (should be moist but not soggy), temperature (18-22°C), and light (not too intense). With paper plugs, shock is usually minimal. If problems persist, apply diluted root stimulator (50% concentration), increase humidity temporarily with a cover, and ensure the paper plug had proper contact with the substrate. Most plants recover within 48 hours if these factors are correct.'
            : locale === 'de'
            ? 'Überprüfen Sie zuerst die Grundlagen: Feuchtigkeit (sollte feucht, aber nicht durchnässt sein), Temperatur (18-22°C) und Licht (nicht zu intensiv). Mit Paper Plugs ist Schock normalerweise minimal. Wenn Probleme bestehen bleiben, wenden Sie verdünnten Wurzelstimulator (50% Konzentration) an, erhöhen Sie die Luftfeuchtigkeit vorübergehend mit einer Abdeckung und stellen Sie sicher, dass der Paper Plug ordnungsgemäßen Kontakt mit dem Substrat hatte. Die meisten Pflanzen erholen sich innerhalb von 48 Stunden, wenn diese Faktoren stimmen.'
            : 'Check eerst de basis: vocht (moet vochtig zijn maar niet doorweekt), temperatuur (18-22°C) en licht (niet te intens). Met paper plugs is schok meestal minimaal. Bij aanhoudende problemen: pas verdunde wortelstimulator toe (50% concentratie), verhoog tijdelijk luchtvochtigheid met een hoesje, en zorg dat de paper plug goed contact heeft met het substraat. Meeste planten herstellen binnen 48 uur als deze factoren kloppen.',
        },
      ],
    },
    cta: {
      title: locale === 'en' ? 'Start Preventing Transplant Shock Today' : locale === 'de' ? 'Beginnen Sie Heute, Umpflanzschock zu Verhindern' : 'Start Vandaag met Transplantatieschok Voorkomen',
      description: locale === 'en'
        ? 'Discover how paper plug trays can transform your growing process. Reduce transplant shock by up to 85% and save time with every transplant.'
        : locale === 'de'
        ? 'Entdecken Sie, wie Paper Plug Trays Ihren Anbauprozess transformieren können. Reduzieren Sie Umpflanzschock um bis zu 85% und sparen Sie Zeit bei jeder Umpflanzung.'
        : 'Ontdek hoe paper plug trays je teeltproces kunnen transformeren. Verminder transplantatieschok tot 85% en bespaar tijd bij elke verplanting.',
      primaryButton: locale === 'en' ? 'View Paper Plug Trays' : locale === 'de' ? 'Paper Plug Trays Ansehen' : 'Bekijk Paper Plug Trays',
      secondaryButton: locale === 'en' ? 'Contact for Advice' : locale === 'de' ? 'Kontakt für Beratung' : 'Contact voor Advies',
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

      {/* Symptoms Recognition */}
      <section className="py-12 bg-lumora-cream/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-display font-bold text-lumora-dark mb-8">
            {t.symptoms.title}
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {t.symptoms.items.map((item, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-soft">
                <h3 className="text-xl font-bold text-lumora-dark mb-2">
                  ⚠️ {item.symptom}
                </h3>
                <p className="text-lumora-dark/70">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7 Strategies */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-display font-bold text-lumora-dark mb-12 text-center">
            {t.strategies.title}
          </h2>
          <div className="space-y-8">
            {t.strategies.list.map((strategy, index) => (
              <div key={index} className="bg-gradient-to-br from-lumora-cream/50 to-white rounded-xl p-8 shadow-soft-lg border border-lumora-green-500/10">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-lumora-green-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                      {strategy.number}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-lumora-dark mb-3 flex items-center gap-3">
                      <span>{strategy.icon}</span>
                      {strategy.title}
                    </h3>
                    <p className="text-lumora-dark/80 leading-relaxed text-lg">
                      {strategy.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-12 bg-lumora-cream/30">
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
                        {row.aspect}
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

      {/* Expert Tips */}
      <section className="py-12 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-display font-bold text-lumora-dark mb-8">
            {t.expertTips.title}
          </h2>
          <div className="space-y-6">
            {t.expertTips.tips.map((tip, index) => (
              <div key={index} className="bg-lumora-cream/50 rounded-lg p-6 border-l-4 border-lumora-gold">
                <h3 className="text-xl font-bold text-lumora-dark mb-3">
                  💡 {tip.title}
                </h3>
                <p className="text-lumora-dark/80 italic leading-relaxed">
                  {tip.content}
                </p>
              </div>
            ))}
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
                <h3 className="text-xl font-bold text-lumora-dark mb-4 flex items-center gap-2">
                  <span className="text-2xl">🔧</span>
                  {issue.problem}
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-lumora-dark mb-2">
                      {locale === 'en' ? 'Possible Causes:' : locale === 'de' ? 'Mögliche Ursachen:' : 'Mogelijke oorzaken:'}
                    </h4>
                    <ul className="space-y-1">
                      {issue.causes.map((cause, idx) => (
                        <li key={idx} className="text-lumora-dark/70 flex items-start gap-2">
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
                        <li key={idx} className="text-lumora-dark/70 flex items-start gap-2">
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

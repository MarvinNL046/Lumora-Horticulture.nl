import { generatePageMetadata } from '@/lib/metadata'
import { KnowledgePage, type KnowledgeArticle } from '@/app/lumora-premium/_components/KnowledgePage'
import { resolveStorefrontLocale, type StorefrontLocale } from '@/app/lumora-premium/_components/storefront-localization'

export function generateStaticParams() {
  return [{ locale: 'nl' }, { locale: 'en' }, { locale: 'de' }]
}

const meta = {
  nl: { title: 'Steenwol Stekpluggen Gebruiken: Praktische Gids', description: 'Hoe gebruik je steenwol stekpluggen? Lees over bevochtigen, zaaien, stekken, water geven en uitplanten. Vergelijk trays met 84 en 104 cellen bij Lumora.', keywords: ['steenwol stekpluggen gebruiken', 'zaaien in steenwol', 'stekken in steenwol', 'stekpluggen water geven', 'steenwol pluggen uitplanten'] },
  en: { title: 'Paper Plug Trays explained: FP 12+, biodegradability, transplant shock and rooting', description: 'What Paper Plug Trays are, how the Ellepot FP 12+ paper sleeve works, why the sleeve is biodegradable and how to prevent transplant shock and optimise root formation.', keywords: ['paper plug trays', 'what are paper plug trays', 'ellepot fp 12+', 'biodegradable', 'prevent transplant shock', 'root formation'] },
  de: { title: 'Paper Plug Trays erklärt: FP 12+, Abbaubarkeit, Transplantationsschock und Bewurzelung', description: 'Was Paper Plug Trays sind, wie die Ellepot FP 12+ Papierhülle funktioniert, warum die Hülle biologisch abbaubar ist und wie Sie Transplantationsschock vermeiden und die Wurzelbildung optimieren.', keywords: ['paper plug trays', 'was sind paper plug trays', 'ellepot fp 12+', 'biologisch abbaubar', 'transplantationsschock vermeiden', 'wurzelbildung'] },
}

export async function generateMetadata(props: { params: Promise<{ locale: string }> }) {
  const locale = resolveStorefrontLocale((await props.params).locale)
  return generatePageMetadata({ ...meta[locale], locale, path: '/paper-plug-trays-uitgelegd', availableLocales: ['nl', 'en', 'de'] })
}

const article: Record<StorefrontLocale, KnowledgeArticle> = {
  nl: {
  "tag": "Kennisbank",
  "title": "Steenwol stekpluggen gebruiken: van bevochtigen tot uitplanten",
  "intro": "Met steenwol stekpluggen geef je zaden en stekken een eigen plek in de tray. Hier lees je hoe je de gevulde Paper Plug Trays voorbereidt, de vochtigheid volgt en jonge planten met papierwikkel uitplant.",
  "answer": {
    "title": "Zo begin je",
    "text": "Bevochtig de pluggen gelijkmatig, laat overtollig water weglopen en plaats je zaad of stek. Controleer tijdens de opkweek het vocht en de wortelontwikkeling. Plant de bewortelde plug met de papierwikkel uit zodra je gewas eraan toe is. De teeltduur verschilt per plant en kweekomstandigheden."
  },
  "sections": [
    {
      "kind": "facts",
      "title": "Welke steenwol stekpluggen heb je?",
      "intro": "De trays van Lumora zijn al gevuld met steenwol in een Ellepot FP 12+ papierwikkel. Je hoeft ze niet zelf met potgrond te vullen.",
      "facts": [
        {
          "value": "84",
          "label": "cellen · Ø38 × 42 mm · 8 trays per doos"
        },
        {
          "value": "104",
          "label": "cellen · Ø32 × 40 mm · 7 trays per doos"
        },
        {
          "value": "672",
          "label": "pluggen per doos bij tray 84"
        },
        {
          "value": "728",
          "label": "pluggen per doos bij tray 104"
        }
      ]
    },
    {
      "kind": "prose",
      "title": "Welke plugmaat past bij je opkweek?",
      "paragraphs": [
        ["De ", { "text": "steenwol stekpluggen met 84 cellen", "href": "/stekpluggen-steenwol?variant=tray-84" }, " hebben een grotere diameter en diepte. Met de ", { "text": "trays met 104 steenwol stekpluggen", "href": "/stekpluggen-steenwol?variant=tray-104" }, " kies je voor meer kweekplaatsen per tray. Stem je keuze af op het gewas, de opkweekduur en je teeltsysteem."]
      ]
    },
    {
      "kind": "steps",
      "title": "Stap 1: steenwol stekpluggen bevochtigen",
      "items": [
        "Zet de tray op een schone ondergrond waar water kan weglopen. Ondersteun de tray wanneer je hem verplaatst.",
        "Bevochtig de pluggen rustig en gelijkmatig, zodat het water ook binnenin de steenwol komt. Alleen een natte bovenkant is niet voldoende.",
        "Laat overtollig water weglopen. Controleer ook pluggen aan de randen van de tray op een gelijkmatige bevochtiging."
      ],
      "note": "De juiste voorbereiding hangt af van het gebruikte substraat en teeltrecept. Een vaste inweektijd voor iedere steenwolplug is daarom geen betrouwbaar uitgangspunt."
    },
    {
      "kind": "compare",
      "title": "Stap 2: zaaien of stekken in steenwol",
      "left": {
        "title": "Zaaien",
        "items": [
          "Gebruik de zaaidiepte en kiemomstandigheden die bij het zaad horen. Niet ieder zaad heeft dezelfde behoefte aan licht en afdekking.",
          "Plaats het zaad in het midden van de plug en label de tray met gewas en zaaidatum.",
          "Controleer vocht en opkomst, en pas het klimaat aan wanneer de zaailingen verder groeien."
        ]
      },
      "right": {
        "title": "Stekken",
        "items": [
          "Werk met schoon gereedschap en gezond stekmateriaal.",
          "Plaats de stek voorzichtig in de plug, met voldoende steun en zonder de stengel te beschadigen.",
          "Stem licht, temperatuur en luchtvochtigheid af op het gewas en de fase van beworteling."
        ]
      }
    },
    {
      "kind": "prose",
      "title": "Hoe vaak moet je steenwol stekpluggen water geven?",
      "paragraphs": [
        "Controleer dagelijks hoe vochtig de pluggen zijn. De benodigde watergift verandert met plantgrootte, temperatuur, licht en ventilatie. Een vast aantal gietbeurten per dag past daarom niet bij elke opkweek.",
        "Vergelijk het gewicht van de tray met het gewicht na bevochtigen en uitlekken. Een duidelijk lichtere tray helpt je uitdroging herkennen. Beoordeel meerdere plekken: de rand kan anders uitdrogen dan het midden.",
        "Voorkom dat pluggen volledig uitdrogen of voortdurend in stilstaand water staan. Controleer de afvoer voordat je extra water geeft."
      ]
    },
    {
      "kind": "prose",
      "title": "Hebben steenwol stekpluggen voeding nodig?",
      "paragraphs": [
        "Steenwol is een teeltsubstraat. Ga er niet van uit dat het de voedingsvoorraad van bemeste potgrond heeft. Gebruik een voedingsschema dat past bij je gewas, uitgangswater en groeifase.",
        "pH beschrijft de zuurgraad; EC geeft een indicatie van de hoeveelheid opgeloste zouten. Meet beide bij het aanmaken van een voedingsoplossing. Neem geen willekeurige pH of EC over als universeel recept voor alle zaden en stekken.",
        "Stem de start van de voeding af op de teelt. Wachten tot een vast aantal dagen na het uitplanten is geen algemene regel. Vraag bij twijfel advies met vermelding van je gewas, water en gebruikte voeding."
      ]
    },
    {
      "kind": "steps",
      "title": "Wanneer kun je steenwol pluggen uitplanten?",
      "intro": "Beoordeel de wortelontwikkeling en de plant samen. Alleen een kalenderdatum of het eerste zichtbare wortelpuntje is onvoldoende om voor ieder gewas het juiste moment te bepalen.",
      "items": [
        "Controleer of de plant voldoende beworteld en ontwikkeld is voor de volgende teeltfase.",
        "Maak de ontvangende pot, grond of het teeltsysteem klaar en zorg dat de plug vochtig is.",
        "Haal de plug voorzichtig uit de tray. Laat de papierwikkel om de plug zitten.",
        "Plaats de plug op de voor je gewas geschikte diepte en zorg voor goed contact met het ontvangende substraat.",
        "Controleer na het verplanten het vocht en pas de overgang naar andere licht- en klimaatomstandigheden geleidelijk aan."
      ],
      "note": "Voorzichtig verplanten helpt wortelbeschadiging beperken. Het is geen garantie dat een plant geen transplantatieschok krijgt."
    },
    {
      "kind": "cards",
      "title": "Veelgemaakte fouten bij de opkweek",
      "items": [
        {
          "title": "Alleen de bovenkant beoordelen",
          "text": "Een oppervlakkig natte plug kan vanbinnen nog droog zijn. Controleer de gelijkmatigheid van de eerste bevochtiging."
        },
        {
          "title": "Water geven volgens de klok",
          "text": "Stem de gift af op de actuele vochtigheid en het gewas. Controleer eerst of overtollig water weg kan."
        },
        {
          "title": "Te vroeg uitplanten",
          "text": "Kijk naar de wortelontwikkeling en stevigheid van de jonge plant. Beworteling duurt niet bij elk gewas even lang."
        }
      ]
    },
    {
      "kind": "prose",
      "title": "Wat gebeurt er met de papierwikkel?",
      "paragraphs": [
        "De Ellepot FP 12+ wikkel houdt de plug bijeen en blijft zitten bij het uitplanten. Ellepot beschrijft FP 12+ als afbreekbaar papier met een afbraaktijd van 12+ maanden. Dat is geen belofte dat de wikkel binnen enkele weken verdwijnt.",
        ["Wil je weten waarom de wikkel bij het uitplanten kan blijven zitten? Lees ", { "text": "hoe de paperbus-wikkel werkt", "href": "/paperbus-pluggen" }, "."],
        ["De papierwikkel en de steenwol zijn verschillende materialen. In de uitleg over de ", { "text": "samenstelling van paperbus steenwol pluggen", "href": "/paperbus-steenwol-pluggen" }, " lees je hoe ze samen de plug vormen. De afbreekbaarheid van het papier betekent niet dat de complete steenwolplug biologisch afbreekbaar is."]
      ]
    }
  ],
  "cta": {
    "title": "Kies 84 of 104 cellen voor je volgende opkweek",
    "text": "Tray 84 heeft grotere pluggen. Tray 104 biedt meer kweekplaatsen per tray. Bekijk de afmetingen en het aantal trays per doos om je keuze te maken.",
    "button": "Vergelijk en bestel steenwol stekpluggen"
  },
  "faqTitle": "Veelgestelde vragen over steenwol stekpluggen",
  "faq": [
    {
      "question": "Moet ik de trays nog vullen met potgrond?",
      "answer": "Nee. De Paper Plug Trays van Lumora worden gevuld geleverd met steenwol pluggen in een papierwikkel. Je begint met het voorbereiden en bevochtigen van de pluggen."
    },
    {
      "question": "Hoelang moeten steenwol stekpluggen weken?",
      "answer": "Er is geen vaste inweektijd die voor ieder product geldt. Zorg voor gelijkmatige bevochtiging tot binnenin de plug en laat overtollig water weglopen. Volg de instructies voor je substraat en teelt."
    },
    {
      "question": "Welke pH en EC moet ik gebruiken?",
      "answer": "Kies de waarden op basis van je gewas, groeifase, uitgangswater en voedingsschema. Meet je voedingsoplossing en vraag teeltadvies als je geen passend recept hebt."
    },
    {
      "question": "Wanneer zijn mijn stekken klaar om uit te planten?",
      "answer": "Dat hangt af van het gewas en de omstandigheden. Beoordeel de wortelontwikkeling en de jonge plant, en stem het uitplantmoment af op de volgende teeltfase."
    },
    {
      "question": "Moet de papierwikkel eraf bij het uitplanten?",
      "answer": "Nee. Plant de complete plug met papierwikkel uit. De wikkel helpt de plug bij elkaar te houden tijdens het verplaatsen."
    },
    {
      "question": "Zijn steenwol stekpluggen biologisch afbreekbaar?",
      "answer": "De papierwikkel is afbreekbaar; dat geldt niet voor de steenwol zelf. Beschouw de complete plug daarom niet als biologisch afbreekbaar."
    }
  ],
  "relatedLinks": [
    {
      "href": "/stekpluggen-steenwol?variant=tray-84",
      "label": "Steenwol stekpluggen 84: grotere plugmaat"
    },
    {
      "href": "/stekpluggen-steenwol?variant=tray-104",
      "label": "Steenwol stekpluggen 104: meer cellen per tray"
    },
    {
      "href": "/paperbus-pluggen",
      "label": "Wat is de paperbus-wikkel?"
    },
    {
      "href": "/paperbus-steenwol-pluggen",
      "label": "Steenwol en papier: samenstelling uitgelegd"
    }
  ]
},
  en: {
    tag: 'Knowledge base',
    title: 'Paper Plug Trays explained',
    intro: 'Everything about rockwool plugs with a paper sleeve: what they are, how Ellepot FP 12+ technology works and how to get the best rooting with them.',
    answer: { title: 'In short', text: 'A Paper Plug Tray is a propagation tray with rockwool plugs that each sit in a paper sleeve. The sleeve holds the plug together, lets roots grow through it and goes into the ground with the plug. Careful handling helps limit root damage during transplanting.' },
    sections: [
      { kind: 'facts', title: 'Two tray layouts', intro: 'Both versions are supplied by the complete box.', facts: [{ value: '84', label: 'cells · Ø38 × 42 mm · 8 trays per box' }, { value: '104', label: 'cells · Ø32 × 40 mm · 7 trays per box' }, { value: '672', label: 'cells per box (tray 84)' }, { value: '728', label: 'cells per box (tray 104)' }] },
      { kind: 'cards', title: 'What is Ellepot FP 12+?', intro: 'FP 12+ is the Ellepot paper around every plug.', items: [{ title: 'Stable for more than 12 months', text: 'The paper keeps its structure during a long propagation period, even in humid conditions.' }, { title: 'Roots grow through', text: 'Roots grow through the paper and are air-pruned on the outside. That gives a compact, branched root ball.' }, { title: 'Biodegradable', text: 'The paper is made from wood fibres and breaks down in the soil. No plastic is left behind.' }] },
      { kind: 'list', title: 'Why the sleeve is biodegradable', intro: 'The paper sleeve replaces the plastic pot or the loose plug.', items: ['Made from renewable wood fibres', 'Breaks down after the plug is planted', 'No plastic waste in the nursery', 'No loose plugs that fall apart', 'The rockwool itself remains; only the sleeve is biodegradable'] },
      { kind: 'steps', title: 'Preventing transplant shock', intro: 'Transplant shock occurs when roots are damaged or dry out during transplanting. A paper sleeve helps keep the plug together during handling.', items: ['Plant the complete plug, including the paper sleeve. Do not remove the sleeve.', 'Transplant on time: as soon as white root tips are visible through the paper.', 'Water the plug well the day before transplanting so the root ball is moist.', 'Plant at the same depth as in the tray; do not set the plug deeper.', 'Ensure good contact between plug and substrate and water immediately.', 'Keep humidity high for the first days and avoid strong direct sunlight.', 'Match feeding to the crop, growth stage and nutrient recipe.'] },
      { kind: 'steps', title: 'Optimising root formation', intro: 'A healthy root ball starts in the tray.', items: ['Soak the plugs well before sticking or sowing and let them drain.', 'Keep the rockwool moist but not saturated; too wet means too little oxygen.', 'Keep a root temperature of 18 to 24 °C.', 'Aim for a humidity of around 80 to 90 percent for cuttings, and ventilate daily.', 'Work with a low EC in the first week and build up slowly.', 'Assess root development and plant maturity before transplanting; rooting time varies by crop and conditions.'] },
      { kind: 'list', title: 'Where Paper Plug Trays are used', items: ['Vegetable plants such as tomato, pepper and cucumber', 'Ornamentals and perennials', 'Herbs and microgreens', 'Cuttings of woody crops', 'Vertical farming and hydroponics'] },
    ],
    cta: { title: 'Choose your Paper Plug Tray', text: 'Tray 84 for a larger plug, tray 104 for more plants per tray. By the complete box, free shipping within the Netherlands, Belgium and Germany.', button: 'View the Paper Plug Trays' },
    faq: [{ question: 'What is a Paper Plug Tray?', answer: 'A propagation tray with rockwool plugs that each sit in an Ellepot FP 12+ paper sleeve. The plug is planted with the sleeve.' }, { question: 'Do you remove the paper sleeve when planting?', answer: 'No. Plant the complete plug. Roots grow through the paper and the paper breaks down in the soil.' }, { question: 'How do you prevent transplant shock?', answer: 'Plant the complete plug on time and at the same depth, keep the root ball moist, water immediately and keep humidity high for the first days.' }],
  },
  de: {
    tag: 'Wissensdatenbank',
    title: 'Paper Plug Trays erklärt',
    intro: 'Alles über Steinwollstecker mit Papierhülle: was sie sind, wie die Ellepot FP 12+ Technologie funktioniert und wie Sie damit die beste Bewurzelung erzielen.',
    answer: { title: 'Kurz gesagt', text: 'Ein Paper Plug Tray ist eine Anzuchtplatte mit Steinwollsteckern, die jeweils in einer Papierhülle sitzen. Die Hülle hält den Stecker zusammen, lässt Wurzeln hindurchwachsen und kommt mit dem Stecker in die Erde. Vorsichtiges Umpflanzen hilft, Wurzelschäden zu begrenzen.' },
    sections: [
      { kind: 'facts', title: 'Zwei Tray-Aufteilungen', intro: 'Beide Ausführungen werden im kompletten Karton geliefert.', facts: [{ value: '84', label: 'Zellen · Ø38 × 42 mm · 8 Platten pro Karton' }, { value: '104', label: 'Zellen · Ø32 × 40 mm · 7 Platten pro Karton' }, { value: '672', label: 'Zellen pro Karton (Tray 84)' }, { value: '728', label: 'Zellen pro Karton (Tray 104)' }] },
      { kind: 'cards', title: 'Was ist Ellepot FP 12+?', intro: 'FP 12+ ist das Ellepot-Papier um jeden Stecker.', items: [{ title: 'Mehr als 12 Monate stabil', text: 'Das Papier behält seine Struktur während einer langen Anzucht, auch bei feuchten Bedingungen.' }, { title: 'Durchwurzelbar', text: 'Wurzeln wachsen durch das Papier und werden außen durch Luft beschnitten. Das ergibt einen kompakten, verzweigten Wurzelballen.' }, { title: 'Biologisch abbaubar', text: 'Das Papier besteht aus Holzfasern und baut sich im Boden ab. Es bleibt kein Kunststoff zurück.' }] },
      { kind: 'list', title: 'Warum die Hülle biologisch abbaubar ist', intro: 'Die Papierhülle ersetzt den Kunststofftopf oder den losen Stecker.', items: ['Aus erneuerbaren Holzfasern hergestellt', 'Baut sich nach dem Auspflanzen ab', 'Kein Kunststoffabfall in der Gärtnerei', 'Keine losen Stecker, die auseinanderfallen', 'Die Steinwolle selbst bleibt; nur die Hülle ist abbaubar'] },
      { kind: 'steps', title: 'Transplantationsschock vermeiden', intro: 'Transplantationsschock entsteht, wenn Wurzeln beim Umpflanzen beschädigt werden oder austrocknen. Die Papierhülle hilft, den Stecker beim Umpflanzen zusammenzuhalten.', items: ['Pflanzen Sie den kompletten Stecker samt Papierhülle aus. Entfernen Sie die Hülle nicht.', 'Pflanzen Sie rechtzeitig um: sobald weiße Wurzelspitzen durch das Papier sichtbar sind.', 'Wässern Sie den Stecker am Tag vor dem Umpflanzen gut, damit der Ballen feucht ist.', 'Pflanzen Sie in derselben Tiefe wie im Tray; setzen Sie den Stecker nicht tiefer.', 'Sorgen Sie für guten Kontakt zwischen Stecker und Substrat und gießen Sie sofort.', 'Halten Sie die Luftfeuchtigkeit in den ersten Tagen hoch und vermeiden Sie starke direkte Sonne.', 'Stimmen Sie die Düngung auf Kultur, Wachstumsphase und Nährstoffrezept ab.'] },
      { kind: 'steps', title: 'Wurzelbildung optimieren', intro: 'Ein gesunder Wurzelballen beginnt im Tray.', items: ['Wässern Sie die Stecker vor dem Stecken oder Säen gut und lassen Sie sie abtropfen.', 'Halten Sie die Steinwolle feucht, aber nicht gesättigt; zu nass bedeutet zu wenig Sauerstoff.', 'Halten Sie eine Wurzeltemperatur von 18 bis 24 °C ein.', 'Streben Sie bei Stecklingen eine Luftfeuchtigkeit von etwa 80 bis 90 Prozent an und lüften Sie täglich.', 'Arbeiten Sie in der ersten Woche mit einem niedrigen EC-Wert und steigern Sie langsam.', 'Beurteilen Sie Wurzelentwicklung und Pflanzenreife vor dem Umpflanzen; die Dauer hängt von Kultur und Bedingungen ab.'] },
      { kind: 'list', title: 'Wo Paper Plug Trays eingesetzt werden', items: ['Gemüsepflanzen wie Tomate, Paprika und Gurke', 'Zierpflanzen und Stauden', 'Kräuter und Microgreens', 'Stecklinge von Gehölzen', 'Vertical Farming und Hydrokultur'] },
    ],
    cta: { title: 'Wählen Sie Ihr Paper Plug Tray', text: 'Tray 84 für einen größeren Stecker, Tray 104 für mehr Pflanzen pro Platte. Im kompletten Karton, kostenloser Versand in die Niederlande, nach Belgien und Deutschland.', button: 'Paper Plug Trays ansehen' },
    faq: [{ question: 'Was ist ein Paper Plug Tray?', answer: 'Eine Anzuchtplatte mit Steinwollsteckern, die jeweils in einer Ellepot FP 12+ Papierhülle sitzen. Der Stecker wird samt Hülle ausgepflanzt.' }, { question: 'Muss man die Papierhülle beim Auspflanzen entfernen?', answer: 'Nein. Pflanzen Sie den kompletten Stecker aus. Wurzeln wachsen durch das Papier, und das Papier baut sich im Boden ab.' }, { question: 'Wie vermeidet man Transplantationsschock?', answer: 'Den kompletten Stecker rechtzeitig und in derselben Tiefe auspflanzen, den Ballen feucht halten, sofort gießen und die Luftfeuchtigkeit in den ersten Tagen hoch halten.' }],
  },
}

export default async function PaperPlugTraysExplainedPage(props: { params: Promise<{ locale: string }> }) {
  const locale = resolveStorefrontLocale((await props.params).locale)
  return <KnowledgePage locale={locale} slug="paper-plug-trays-uitgelegd" article={article[locale]} />
}

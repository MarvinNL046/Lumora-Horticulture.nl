import { generatePageMetadata } from '@/lib/metadata'
import { KnowledgePage, type KnowledgeArticle } from '@/app/lumora-premium/_components/KnowledgePage'
import { resolveStorefrontLocale, type StorefrontLocale } from '@/app/lumora-premium/_components/storefront-localization'

export function generateStaticParams() {
  return [{ locale: 'nl' }, { locale: 'en' }, { locale: 'de' }]
}

const meta = {
  nl: { title: 'Wat als je glaswol aanraakt? Verschil met steenwol en eerste hulp', description: 'Wat gebeurt er als je glaswol aanraakt? Het verschil tussen glaswol en steenwol, eerste hulp bij contact en waarom steenwol voor teelt veiliger is.', keywords: ['glaswol aanraken', 'glaswol vs steenwol', 'glaswol gevaarlijk', 'huidirritatie glaswol'] },
  en: { title: 'What if you touch fiberglass? Difference with rockwool and first aid', description: 'What happens when you touch fiberglass? The difference between fiberglass and rockwool, first aid after contact and why rockwool is safer for growing.', keywords: ['touch fiberglass', 'fiberglass vs rockwool', 'fiberglass skin irritation', 'fiberglass first aid'] },
  de: { title: 'Was passiert bei Kontakt mit Glaswolle? Unterschied zu Steinwolle und Erste Hilfe', description: 'Was passiert, wenn man Glaswolle berührt? Der Unterschied zwischen Glaswolle und Steinwolle, Erste Hilfe nach Kontakt und warum Steinwolle im Anbau sicherer ist.', keywords: ['glaswolle berühren', 'glaswolle vs steinwolle', 'glaswolle hautreizung', 'glaswolle erste hilfe'] },
}

export async function generateMetadata(props: { params: Promise<{ locale: string }> }) {
  const locale = resolveStorefrontLocale((await props.params).locale)
  return generatePageMetadata({ ...meta[locale], locale, path: '/glaswol-aanraken', availableLocales: ['nl', 'en', 'de'] })
}

const article: Record<StorefrontLocale, KnowledgeArticle> = {
  nl: {
    tag: 'Veiligheid',
    title: 'Wat als je glaswol aanraakt?',
    intro: 'Glaswol en steenwol worden vaak verward. Hier lees je het verschil, wat er gebeurt bij contact met glaswol en wat je dan het beste doet.',
    answer: { title: 'Het korte antwoord', text: 'Contact met glaswol geeft meestal tijdelijke jeuk en roodheid door de fijne glasvezels. Niet wrijven, afspoelen met koud water en de vezels met plakband verwijderen. Steenwol voor de teelt heeft grovere vezels en irriteert veel minder.' },
    sections: [
      { kind: 'compare', title: 'Verschil tussen glaswol en steenwol', left: { title: 'Glaswol', items: ['Gemaakt van gesmolten glas', 'Zeer fijne vezels van 1 tot 3 micrometer', 'Vooral gebruikt als isolatiemateriaal', 'Kan huidirritatie veroorzaken'] }, right: { title: 'Steenwol', items: ['Gemaakt van basaltgesteente', 'Grovere vezels, meer dan 5 micrometer', 'Voor isolatie én voor de teelt', 'Minder irriterend voor de huid'] } },
      { kind: 'cards', title: 'Wat gebeurt er bij contact met glaswol?', items: [{ title: 'Huidirritatie', text: 'Jeuk en roodheid door de fijne vezels.' }, { title: 'Oogirritatie', text: 'Rode, tranende ogen bij contact.' }, { title: 'Luchtwegirritatie', text: 'Hoesten bij het inademen van stof.' }, { title: 'Tijdelijk', text: 'De klachten verdwijnen zodra de vezels weg zijn.' }] },
      { kind: 'steps', title: 'Eerste hulp bij contact met glaswol', items: ['Niet wrijven of krabben.', 'Kleding buiten uitschudden.', 'Huid afspoelen met koud water.', 'Achtergebleven vezels met plakband verwijderen.', 'Douchen met koud water, niet warm.', 'Bij oogcontact de ogen spoelen met water.'] },
      { kind: 'list', title: 'Waarom steenwol veiliger is voor de teelt', items: ['Grovere vezels die niet inadembaar zijn', 'Minder irriterend voor de huid', 'Speciaal geproduceerd voor gebruik in de tuinbouw', 'Geschikt voor dagelijks gebruik met normale voorzorg'] },
      { kind: 'list', title: 'Preventietips', items: ['Draag handschoenen bij het werken met glaswol', 'Gebruik beschermende kleding met lange mouwen', 'Draag een stofmasker in stoffige ruimtes', 'Was je direct na contact', 'Kies steenwol voor de tuinbouw'] },
    ],
    cta: { title: 'Steenwol pluggen voor professionele opkweek', text: 'Onze Paper Plug Trays combineren steenwol met een Ellepot FP 12+ papierwikkel. Direct uitplantbaar, per complete doos geleverd.', button: 'Bekijk de Paper Plug Trays' },
    faq: [{ question: 'Is glaswol gevaarlijk om aan te raken?', answer: 'Kort contact geeft meestal tijdelijke huidirritatie. Spoel met koud water, verwijder vezels met plakband en wrijf niet.' }, { question: 'Is steenwol hetzelfde als glaswol?', answer: 'Nee. Glaswol wordt van gesmolten glas gemaakt en heeft zeer fijne vezels. Steenwol wordt van basalt gemaakt, heeft grovere vezels en wordt ook als teeltsubstraat gebruikt.' }],
  },
  en: {
    tag: 'Safety',
    title: 'What if you touch fiberglass?',
    intro: 'Fiberglass and rockwool are often confused. Here you can read the difference, what happens on contact with fiberglass and what to do next.',
    answer: { title: 'The short answer', text: 'Contact with fiberglass usually causes temporary itching and redness from the fine glass fibres. Do not rub, rinse with cold water and lift the fibres off with tape. Horticultural rockwool has coarser fibres and irritates far less.' },
    sections: [
      { kind: 'compare', title: 'Difference between fiberglass and rockwool', left: { title: 'Fiberglass', items: ['Made from molten glass', 'Very fine fibres of 1 to 3 micrometres', 'Mainly used as insulation', 'Can cause skin irritation'] }, right: { title: 'Rockwool', items: ['Made from basalt rock', 'Coarser fibres, more than 5 micrometres', 'Used for insulation and for growing', 'Less irritating to the skin'] } },
      { kind: 'cards', title: 'What happens on contact with fiberglass?', items: [{ title: 'Skin irritation', text: 'Itching and redness from the fine fibres.' }, { title: 'Eye irritation', text: 'Red, watery eyes on contact.' }, { title: 'Airway irritation', text: 'Coughing when inhaling dust.' }, { title: 'Temporary', text: 'Symptoms disappear once the fibres are removed.' }] },
      { kind: 'steps', title: 'First aid after contact with fiberglass', items: ['Do not rub or scratch.', 'Shake out clothing outdoors.', 'Rinse the skin with cold water.', 'Lift remaining fibres off with tape.', 'Shower with cold water, not hot.', 'Rinse the eyes with water after eye contact.'] },
      { kind: 'list', title: 'Why rockwool is safer for growing', items: ['Coarser fibres that are not respirable', 'Less irritating to the skin', 'Produced specifically for horticultural use', 'Suitable for daily use with normal precautions'] },
      { kind: 'list', title: 'Prevention tips', items: ['Wear gloves when handling fiberglass', 'Use protective clothing with long sleeves', 'Wear a dust mask in dusty areas', 'Wash immediately after contact', 'Choose rockwool for horticulture'] },
    ],
    cta: { title: 'Rockwool plugs for professional propagation', text: 'Our Paper Plug Trays combine rockwool with an Ellepot FP 12+ paper sleeve. Ready to plant directly, supplied by the complete box.', button: 'View the Paper Plug Trays' },
    faq: [{ question: 'Is it dangerous to touch fiberglass?', answer: 'Brief contact usually causes temporary skin irritation. Rinse with cold water, remove fibres with tape and do not rub.' }, { question: 'Is rockwool the same as fiberglass?', answer: 'No. Fiberglass is made from molten glass and has very fine fibres. Rockwool is made from basalt, has coarser fibres and is also used as a growing substrate.' }],
  },
  de: {
    tag: 'Sicherheit',
    title: 'Was passiert bei Kontakt mit Glaswolle?',
    intro: 'Glaswolle und Steinwolle werden oft verwechselt. Hier lesen Sie den Unterschied, was bei Kontakt mit Glaswolle passiert und was Sie dann am besten tun.',
    answer: { title: 'Die kurze Antwort', text: 'Kontakt mit Glaswolle verursacht meist vorübergehenden Juckreiz und Rötungen durch die feinen Glasfasern. Nicht reiben, mit kaltem Wasser abspülen und die Fasern mit Klebeband entfernen. Steinwolle für den Anbau hat gröbere Fasern und reizt deutlich weniger.' },
    sections: [
      { kind: 'compare', title: 'Unterschied zwischen Glaswolle und Steinwolle', left: { title: 'Glaswolle', items: ['Aus geschmolzenem Glas hergestellt', 'Sehr feine Fasern von 1 bis 3 Mikrometern', 'Hauptsächlich als Dämmstoff verwendet', 'Kann Hautreizungen verursachen'] }, right: { title: 'Steinwolle', items: ['Aus Basaltgestein hergestellt', 'Gröbere Fasern, mehr als 5 Mikrometer', 'Für Dämmung und für den Anbau', 'Weniger reizend für die Haut'] } },
      { kind: 'cards', title: 'Was passiert bei Kontakt mit Glaswolle?', items: [{ title: 'Hautreizung', text: 'Juckreiz und Rötung durch die feinen Fasern.' }, { title: 'Augenreizung', text: 'Rote, tränende Augen bei Kontakt.' }, { title: 'Atemwegsreizung', text: 'Husten beim Einatmen von Staub.' }, { title: 'Vorübergehend', text: 'Die Beschwerden verschwinden, sobald die Fasern entfernt sind.' }] },
      { kind: 'steps', title: 'Erste Hilfe bei Kontakt mit Glaswolle', items: ['Nicht reiben oder kratzen.', 'Kleidung im Freien ausschütteln.', 'Haut mit kaltem Wasser abspülen.', 'Verbliebene Fasern mit Klebeband abnehmen.', 'Mit kaltem Wasser duschen, nicht warm.', 'Bei Augenkontakt die Augen mit Wasser spülen.'] },
      { kind: 'list', title: 'Warum Steinwolle im Anbau sicherer ist', items: ['Gröbere Fasern, die nicht lungengängig sind', 'Weniger reizend für die Haut', 'Speziell für den Gartenbau hergestellt', 'Für den täglichen Gebrauch mit normaler Vorsicht geeignet'] },
      { kind: 'list', title: 'Tipps zur Vorbeugung', items: ['Beim Umgang mit Glaswolle Handschuhe tragen', 'Schutzkleidung mit langen Ärmeln verwenden', 'In staubigen Räumen eine Staubmaske tragen', 'Nach Kontakt sofort waschen', 'Für den Gartenbau Steinwolle wählen'] },
    ],
    cta: { title: 'Steinwollstecker für die professionelle Anzucht', text: 'Unsere Paper Plug Trays kombinieren Steinwolle mit einer Ellepot FP 12+ Papierhülle. Direkt auspflanzbar, im kompletten Karton geliefert.', button: 'Paper Plug Trays ansehen' },
    faq: [{ question: 'Ist es gefährlich, Glaswolle zu berühren?', answer: 'Kurzer Kontakt verursacht meist eine vorübergehende Hautreizung. Mit kaltem Wasser abspülen, Fasern mit Klebeband entfernen und nicht reiben.' }, { question: 'Ist Steinwolle dasselbe wie Glaswolle?', answer: 'Nein. Glaswolle wird aus geschmolzenem Glas hergestellt und hat sehr feine Fasern. Steinwolle wird aus Basalt hergestellt, hat gröbere Fasern und wird auch als Anbausubstrat verwendet.' }],
  },
}

export default async function GlaswolAanrakenPage(props: { params: Promise<{ locale: string }> }) {
  const locale = resolveStorefrontLocale((await props.params).locale)
  return <KnowledgePage locale={locale} slug="glaswol-aanraken" article={article[locale]} />
}

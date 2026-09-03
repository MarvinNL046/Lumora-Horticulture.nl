import { generatePageMetadata } from '@/lib/metadata'
import { KnowledgePage, type KnowledgeArticle } from '@/app/lumora-premium/_components/KnowledgePage'
import { resolveStorefrontLocale, type StorefrontLocale } from '@/app/lumora-premium/_components/storefront-localization'

export function generateStaticParams() {
  return [{ locale: 'nl' }, { locale: 'en' }, { locale: 'de' }]
}

const meta = {
  nl: { title: 'Is steenwol schadelijk voor de longen?', description: 'Is steenwol voor de teelt schadelijk voor de longen? De feiten over vezelgrootte, het verschil met isolatiesteenwol en de voorzorgsmaatregelen bij het werken met steenwol.', keywords: ['steenwol longen', 'steenwol schadelijk', 'steenwol gezondheid', 'steenwol veiligheid'] },
  en: { title: 'Is rockwool harmful to the lungs?', description: 'Is horticultural rockwool harmful to the lungs? The facts about fibre size, the difference with insulation rockwool and the precautions when working with rockwool.', keywords: ['rockwool lungs', 'rockwool harmful', 'rockwool health', 'rockwool safety'] },
  de: { title: 'Ist Steinwolle schädlich für die Lunge?', description: 'Ist Steinwolle für den Anbau schädlich für die Lunge? Die Fakten zur Fasergröße, der Unterschied zur Dämmsteinwolle und die Vorsichtsmaßnahmen beim Arbeiten mit Steinwolle.', keywords: ['steinwolle lunge', 'steinwolle schädlich', 'steinwolle gesundheit', 'steinwolle sicherheit'] },
}

export async function generateMetadata(props: { params: Promise<{ locale: string }> }) {
  const locale = resolveStorefrontLocale((await props.params).locale)
  return generatePageMetadata({ ...meta[locale], locale, path: '/steenwol-longen', availableLocales: ['nl', 'en', 'de'] })
}

const article: Record<StorefrontLocale, KnowledgeArticle> = {
  nl: {
    tag: 'Veiligheid',
    title: 'Is steenwol schadelijk voor de longen?',
    intro: 'Een terechte vraag voor iedereen die met steenwol werkt. Hier vind je de feiten over veiligheid en gezondheid.',
    answer: { title: 'Het korte antwoord', text: 'Steenwol voor de tuinbouw is bij normaal gebruik veilig als je basale voorzorgsmaatregelen neemt. De vezels zijn grover dan bij isolatiesteenwol en te groot om diep in te ademen.' },
    sections: [
      { kind: 'compare', title: 'Teeltsteenwol en isolatiesteenwol', intro: 'Het is belangrijk om onderscheid te maken tussen de twee soorten.', left: { title: 'Teeltsteenwol', items: ['Grovere vezels, meer dan 5 micrometer', 'Niet respirabel, dus te groot om in te ademen', 'Speciaal geproduceerd voor de tuinbouw', 'Geschikt voor dagelijks gebruik'] }, right: { title: 'Isolatiesteenwol', items: ['Fijnere vezels', 'Meer stof bij het snijden', 'Meer bescherming nodig', 'Ander productieproces en toepassing'] } },
      { kind: 'list', title: 'Aanbevolen voorzorgsmaatregelen', items: ['Draag handschoenen bij intensief contact', 'Gebruik werkkleding met lange mouwen', 'Draag een stofmasker bij snijden of bewerken', 'Was je handen na gebruik', 'Werk in een goed geventileerde ruimte', 'Houd de werkruimte schoon'] },
      { kind: 'list', title: 'Wanneer extra voorzichtig zijn?', items: ['Bij het snijden of bewerken van steenwol', 'In stoffige omgevingen', 'Bij een gevoelige huid of gevoelige luchtwegen', 'Bij het verwerken van grote hoeveelheden'] },
      { kind: 'steps', title: 'Klachten bij overmatige blootstelling', intro: 'Deze klachten zijn mild en tijdelijk.', items: ['Lichte huidirritatie, verdwijnt na wassen.', 'Jeuk door vezels op de huid.', 'Lichte oogirritatie bij stoffig werk.', 'Keelirritatie bij extreme stoffigheid.'], note: 'Ernstige gezondheidsproblemen zijn bij normaal gebruik zeer onwaarschijnlijk. Bij aanhoudende klachten raadpleeg je een arts.' },
      { kind: 'prose', title: 'Conclusie', paragraphs: ['Steenwol voor de tuinbouw is veilig in gebruik als je de basale voorzorgsmaatregelen neemt. De vezels zijn te groot om ingeademd te worden. Draag beschermende kleding bij intensief contact en je werkt veilig.'] },
    ],
    cta: { title: 'Veilige steenwol pluggen', text: 'Onze Paper Plug Trays worden als complete trays geleverd. Je snijdt niets en de plug gaat met papierwikkel en al de grond in.', button: 'Bekijk de Paper Plug Trays' },
    faq: [{ question: 'Is steenwol schadelijk voor de longen?', answer: 'Steenwol voor de tuinbouw is bij normaal gebruik veilig. De vezels zijn grover dan bij isolatiesteenwol en te groot om diep in te ademen. Draag een stofmasker bij snijden of bewerken.' }, { question: 'Welke voorzorgsmaatregelen neem je bij steenwol?', answer: 'Handschoenen bij intensief contact, lange mouwen, een stofmasker bij snijden, handen wassen na gebruik en werken in een geventileerde ruimte.' }],
  },
  en: {
    tag: 'Safety',
    title: 'Is rockwool harmful to the lungs?',
    intro: 'A fair question for anyone working with rockwool. Here you find the facts about safety and health.',
    answer: { title: 'The short answer', text: 'Horticultural rockwool is safe in normal use when you take basic precautions. The fibres are coarser than in insulation rockwool and too large to inhale deeply.' },
    sections: [
      { kind: 'compare', title: 'Growing rockwool and insulation rockwool', intro: 'It is important to distinguish between the two types.', left: { title: 'Growing rockwool', items: ['Coarser fibres, more than 5 micrometres', 'Not respirable, so too large to inhale', 'Produced specifically for horticulture', 'Suitable for daily use'] }, right: { title: 'Insulation rockwool', items: ['Finer fibres', 'More dust when cutting', 'More protection needed', 'Different production process and application'] } },
      { kind: 'list', title: 'Recommended precautions', items: ['Wear gloves during intensive contact', 'Use work clothing with long sleeves', 'Wear a dust mask when cutting or processing', 'Wash your hands after use', 'Work in a well-ventilated area', 'Keep the workspace clean'] },
      { kind: 'list', title: 'When to be extra careful', items: ['When cutting or processing rockwool', 'In dusty environments', 'With sensitive skin or airways', 'When processing large quantities'] },
      { kind: 'steps', title: 'Symptoms of excessive exposure', intro: 'These symptoms are mild and temporary.', items: ['Mild skin irritation, disappears after washing.', 'Itching from fibres on the skin.', 'Mild eye irritation during dusty work.', 'Throat irritation in extremely dusty conditions.'], note: 'Serious health problems are very unlikely with normal use. Consult a doctor if symptoms persist.' },
      { kind: 'prose', title: 'Conclusion', paragraphs: ['Horticultural rockwool is safe to use when you take basic precautions. The fibres are too large to be inhaled. Wear protective clothing during intensive contact and you work safely.'] },
    ],
    cta: { title: 'Safe rockwool plugs', text: 'Our Paper Plug Trays are supplied as complete trays. Nothing to cut, and the plug goes into the ground with its paper sleeve.', button: 'View the Paper Plug Trays' },
    faq: [{ question: 'Is rockwool harmful to the lungs?', answer: 'Horticultural rockwool is safe in normal use. The fibres are coarser than in insulation rockwool and too large to inhale deeply. Wear a dust mask when cutting or processing.' }, { question: 'What precautions should you take with rockwool?', answer: 'Gloves during intensive contact, long sleeves, a dust mask when cutting, washing hands after use and working in a ventilated area.' }],
  },
  de: {
    tag: 'Sicherheit',
    title: 'Ist Steinwolle schädlich für die Lunge?',
    intro: 'Eine berechtigte Frage für alle, die mit Steinwolle arbeiten. Hier finden Sie die Fakten zu Sicherheit und Gesundheit.',
    answer: { title: 'Die kurze Antwort', text: 'Steinwolle für den Gartenbau ist bei normalem Gebrauch sicher, wenn Sie grundlegende Vorsichtsmaßnahmen treffen. Die Fasern sind gröber als bei Dämmsteinwolle und zu groß, um tief eingeatmet zu werden.' },
    sections: [
      { kind: 'compare', title: 'Anbausteinwolle und Dämmsteinwolle', intro: 'Es ist wichtig, zwischen den beiden Arten zu unterscheiden.', left: { title: 'Anbausteinwolle', items: ['Gröbere Fasern, mehr als 5 Mikrometer', 'Nicht lungengängig, also zu groß zum Einatmen', 'Speziell für den Gartenbau hergestellt', 'Für den täglichen Gebrauch geeignet'] }, right: { title: 'Dämmsteinwolle', items: ['Feinere Fasern', 'Mehr Staub beim Schneiden', 'Mehr Schutz erforderlich', 'Anderer Herstellungsprozess und Einsatz'] } },
      { kind: 'list', title: 'Empfohlene Vorsichtsmaßnahmen', items: ['Bei intensivem Kontakt Handschuhe tragen', 'Arbeitskleidung mit langen Ärmeln verwenden', 'Beim Schneiden oder Bearbeiten eine Staubmaske tragen', 'Nach Gebrauch die Hände waschen', 'In einem gut belüfteten Raum arbeiten', 'Den Arbeitsbereich sauber halten'] },
      { kind: 'list', title: 'Wann besonders vorsichtig sein?', items: ['Beim Schneiden oder Bearbeiten von Steinwolle', 'In staubigen Umgebungen', 'Bei empfindlicher Haut oder empfindlichen Atemwegen', 'Bei der Verarbeitung großer Mengen'] },
      { kind: 'steps', title: 'Beschwerden bei übermäßiger Belastung', intro: 'Diese Beschwerden sind mild und vorübergehend.', items: ['Leichte Hautreizung, verschwindet nach dem Waschen.', 'Juckreiz durch Fasern auf der Haut.', 'Leichte Augenreizung bei staubiger Arbeit.', 'Halsreizung bei extremer Staubbelastung.'], note: 'Ernsthafte Gesundheitsprobleme sind bei normalem Gebrauch sehr unwahrscheinlich. Bei anhaltenden Beschwerden wenden Sie sich an einen Arzt.' },
      { kind: 'prose', title: 'Fazit', paragraphs: ['Steinwolle für den Gartenbau ist sicher in der Anwendung, wenn Sie die grundlegenden Vorsichtsmaßnahmen treffen. Die Fasern sind zu groß, um eingeatmet zu werden. Tragen Sie bei intensivem Kontakt Schutzkleidung, dann arbeiten Sie sicher.'] },
    ],
    cta: { title: 'Sichere Steinwollstecker', text: 'Unsere Paper Plug Trays werden als komplette Trays geliefert. Es wird nichts geschnitten, und der Stecker kommt samt Papierhülle in die Erde.', button: 'Paper Plug Trays ansehen' },
    faq: [{ question: 'Ist Steinwolle schädlich für die Lunge?', answer: 'Steinwolle für den Gartenbau ist bei normalem Gebrauch sicher. Die Fasern sind gröber als bei Dämmsteinwolle und zu groß, um tief eingeatmet zu werden. Tragen Sie beim Schneiden oder Bearbeiten eine Staubmaske.' }, { question: 'Welche Vorsichtsmaßnahmen sind bei Steinwolle sinnvoll?', answer: 'Handschuhe bei intensivem Kontakt, lange Ärmel, eine Staubmaske beim Schneiden, Händewaschen nach Gebrauch und Arbeiten in einem belüfteten Raum.' }],
  },
}

export default async function SteenwolLongenPage(props: { params: Promise<{ locale: string }> }) {
  const locale = resolveStorefrontLocale((await props.params).locale)
  return <KnowledgePage locale={locale} slug="steenwol-longen" article={article[locale]} />
}

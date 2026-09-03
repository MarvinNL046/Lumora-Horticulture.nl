import { generatePageMetadata } from '@/lib/metadata'
import { KnowledgePage, type KnowledgeArticle } from '@/app/lumora-premium/_components/KnowledgePage'
import { resolveStorefrontLocale, type StorefrontLocale } from '@/app/lumora-premium/_components/storefront-localization'

export function generateStaticParams() {
  return [{ locale: 'nl' }, { locale: 'en' }, { locale: 'de' }]
}

const meta = {
  nl: { title: 'Hoe zet je steenwol vast? Methoden per teeltsysteem', description: 'Steenwol pluggen vastzetten in trays, hydrocultuur, substraat en NFT-systemen. Stappen, tips en veelgemaakte fouten voor een gelijkmatige opkweek.', keywords: ['steenwol vastzetten', 'steenwol plug plaatsen', 'steenwol hydrocultuur', 'steenwol tray'] },
  en: { title: 'How to secure rockwool: methods per growing system', description: 'Securing rockwool plugs in trays, hydroponics, substrate and NFT systems. Steps, tips and common mistakes for even propagation.', keywords: ['secure rockwool', 'place rockwool plug', 'rockwool hydroponics', 'rockwool tray'] },
  de: { title: 'Wie befestigt man Steinwolle? Methoden je Anbausystem', description: 'Steinwollstecker in Trays, Hydrokultur, Substrat und NFT-Systemen befestigen. Schritte, Tipps und häufige Fehler für eine gleichmäßige Anzucht.', keywords: ['steinwolle befestigen', 'steinwollstecker platzieren', 'steinwolle hydrokultur', 'steinwolle tray'] },
}

export async function generateMetadata(props: { params: Promise<{ locale: string }> }) {
  const locale = resolveStorefrontLocale((await props.params).locale)
  return generatePageMetadata({ ...meta[locale], locale, path: '/steenwol-vastzetten', availableLocales: ['nl', 'en', 'de'] })
}

const article: Record<StorefrontLocale, KnowledgeArticle> = {
  nl: {
    tag: 'Praktijk',
    title: 'Hoe zet je steenwol vast?',
    intro: 'Een stabiel geplaatste plug is de basis voor een gelijkmatige opkweek. Hier vind je de methoden per teeltsysteem, plus tips en veelgemaakte fouten.',
    answer: { title: 'Het korte antwoord', text: 'Zet de plug voorgenat, op gelijke hoogte en zonder hard aandrukken in de tray, netpot of het substraat. Goed contact met water en voeding is belangrijker dan kracht.' },
    sections: [
      { kind: 'steps', title: 'In trays en opkweeksystemen', items: ['Plaats de steenwol plug direct in de trayopening.', 'Zorg dat de plug stabiel zit zonder te wiebelen.', 'Druk niet te hard aan, de plug moet kunnen ademen.', 'Controleer of alle pluggen op gelijke hoogte zitten.'] },
      { kind: 'steps', title: 'In hydrocultuursystemen', items: ['Gebruik netpotten of groeibakken.', 'Plaats de plug in het midden.', 'Vul rondom aan met kleikorrels voor stabiliteit.', 'Zorg dat de plug contact houdt met het water.'] },
      { kind: 'steps', title: 'In substraat zoals kokos of potgrond', items: ['Maak een gat ter grootte van de plug.', 'Plaats de plug op gelijke hoogte met het substraat.', 'Druk het substraat licht aan rond de plug.', 'Geef water voor goed contact.'] },
      { kind: 'steps', title: 'In NFT-systemen', items: ['Gebruik houders die passen bij de plugmaat.', 'Plaats de plug in de houder.', 'Zorg dat de wortels naar beneden kunnen groeien.', 'Controleer de voedingsfilmstroom regelmatig.'] },
      { kind: 'compare', title: 'Tips en veelgemaakte fouten', left: { title: 'Belangrijke tips', items: ['Zorg altijd voor goed contact met het teeltsysteem', 'Maak de plug voor gebruik nat', 'Houd een temperatuur van 18 tot 24 °C aan', 'Controleer de waterpasstand voor gelijkmatige groei', 'Zorg voor voldoende luchtcirculatie'] }, right: { title: 'Veelgemaakte fouten', items: ['Te hard aandrukken beschadigt de structuur', 'Te diep plaatsen verhoogt het risico op wortelrot', 'Een droge plug neemt slecht water op', 'Ongelijke hoogte geeft ongelijkmatige groei', 'Zonder stabilisatie verschuift de plug'] } },
    ],
    cta: { title: 'Pluggen die direct passen', text: 'Paper Plug Tray 84 en 104 worden als complete trays geleverd, zodat elke plug al stabiel op zijn plek zit.', button: 'Bekijk de Paper Plug Trays' },
    faq: [{ question: 'Moet je steenwol pluggen voornatten?', answer: 'Ja. Een voorgenatte plug neemt water gelijkmatig op en houdt goed contact met het teeltsysteem.' }, { question: 'Hoe diep plaats je een steenwol plug?', answer: 'Op gelijke hoogte met het substraat of de tray. Te diep plaatsen verhoogt het risico op wortelrot.' }],
  },
  en: {
    tag: 'In practice',
    title: 'How to secure rockwool',
    intro: 'A stable plug is the basis for even propagation. Here you find the methods per growing system, plus tips and common mistakes.',
    answer: { title: 'The short answer', text: 'Place the pre-soaked plug level, without pressing hard, in the tray, net pot or substrate. Good contact with water and nutrients matters more than force.' },
    sections: [
      { kind: 'steps', title: 'In trays and propagation systems', items: ['Place the rockwool plug directly in the tray opening.', 'Make sure the plug sits stable without wobbling.', 'Do not press too hard, the plug needs to breathe.', 'Check that all plugs are at the same height.'] },
      { kind: 'steps', title: 'In hydroponic systems', items: ['Use net pots or growing containers.', 'Place the plug in the centre.', 'Fill around it with clay pebbles for stability.', 'Make sure the plug stays in contact with the water.'] },
      { kind: 'steps', title: 'In substrate such as coco or potting soil', items: ['Make a hole the size of the plug.', 'Place the plug level with the substrate.', 'Press the substrate lightly around the plug.', 'Water for good contact.'] },
      { kind: 'steps', title: 'In NFT systems', items: ['Use holders that match the plug size.', 'Place the plug in the holder.', 'Make sure the roots can grow downwards.', 'Check the nutrient film flow regularly.'] },
      { kind: 'compare', title: 'Tips and common mistakes', left: { title: 'Important tips', items: ['Always ensure good contact with the growing system', 'Pre-soak the plug before use', 'Keep a temperature of 18 to 24 °C', 'Check the level for even growth', 'Ensure adequate air circulation'] }, right: { title: 'Common mistakes', items: ['Pressing too hard damages the structure', 'Placing too deep increases the risk of root rot', 'A dry plug absorbs water poorly', 'Uneven height gives uneven growth', 'Without stabilisation the plug shifts'] } },
    ],
    cta: { title: 'Plugs that fit straight away', text: 'Paper Plug Tray 84 and 104 are supplied as complete trays, so every plug already sits stable in place.', button: 'View the Paper Plug Trays' },
    faq: [{ question: 'Should rockwool plugs be pre-soaked?', answer: 'Yes. A pre-soaked plug absorbs water evenly and keeps good contact with the growing system.' }, { question: 'How deep do you place a rockwool plug?', answer: 'Level with the substrate or tray. Placing it too deep increases the risk of root rot.' }],
  },
  de: {
    tag: 'Praxis',
    title: 'Wie befestigt man Steinwolle?',
    intro: 'Ein stabil platzierter Stecker ist die Grundlage für eine gleichmäßige Anzucht. Hier finden Sie die Methoden je Anbausystem sowie Tipps und häufige Fehler.',
    answer: { title: 'Die kurze Antwort', text: 'Setzen Sie den vorgewässerten Stecker auf gleicher Höhe und ohne festes Andrücken in das Tray, den Netztopf oder das Substrat. Guter Kontakt zu Wasser und Nährstoffen ist wichtiger als Kraft.' },
    sections: [
      { kind: 'steps', title: 'In Trays und Anzuchtsystemen', items: ['Setzen Sie den Steinwollstecker direkt in die Trayöffnung.', 'Achten Sie darauf, dass der Stecker stabil sitzt und nicht wackelt.', 'Nicht zu fest andrücken, der Stecker muss atmen können.', 'Prüfen Sie, ob alle Stecker auf gleicher Höhe sitzen.'] },
      { kind: 'steps', title: 'In Hydrokultursystemen', items: ['Verwenden Sie Netztöpfe oder Anzuchtbehälter.', 'Setzen Sie den Stecker in die Mitte.', 'Füllen Sie rundherum mit Tonkügelchen auf.', 'Achten Sie darauf, dass der Stecker Kontakt zum Wasser behält.'] },
      { kind: 'steps', title: 'In Substrat wie Kokos oder Blumenerde', items: ['Machen Sie ein Loch in Größe des Steckers.', 'Setzen Sie den Stecker auf gleicher Höhe mit dem Substrat ein.', 'Drücken Sie das Substrat leicht um den Stecker an.', 'Gießen Sie für guten Kontakt.'] },
      { kind: 'steps', title: 'In NFT-Systemen', items: ['Verwenden Sie Halter, die zur Steckergröße passen.', 'Setzen Sie den Stecker in den Halter.', 'Achten Sie darauf, dass die Wurzeln nach unten wachsen können.', 'Prüfen Sie den Nährstofffilm regelmäßig.'] },
      { kind: 'compare', title: 'Tipps und häufige Fehler', left: { title: 'Wichtige Tipps', items: ['Immer für guten Kontakt zum Anbausystem sorgen', 'Den Stecker vor Gebrauch wässern', 'Eine Temperatur von 18 bis 24 °C einhalten', 'Die Ebenheit für gleichmäßiges Wachstum prüfen', 'Für ausreichende Luftzirkulation sorgen'] }, right: { title: 'Häufige Fehler', items: ['Zu festes Andrücken beschädigt die Struktur', 'Zu tiefes Einsetzen erhöht das Risiko von Wurzelfäule', 'Ein trockener Stecker nimmt Wasser schlecht auf', 'Ungleiche Höhe führt zu ungleichmäßigem Wachstum', 'Ohne Stabilisierung verrutscht der Stecker'] } },
    ],
    cta: { title: 'Stecker, die sofort passen', text: 'Paper Plug Tray 84 und 104 werden als komplette Trays geliefert, sodass jeder Stecker bereits stabil an seinem Platz sitzt.', button: 'Paper Plug Trays ansehen' },
    faq: [{ question: 'Sollten Steinwollstecker vorgewässert werden?', answer: 'Ja. Ein vorgewässerter Stecker nimmt Wasser gleichmäßig auf und behält guten Kontakt zum Anbausystem.' }, { question: 'Wie tief setzt man einen Steinwollstecker ein?', answer: 'Auf gleicher Höhe mit dem Substrat oder Tray. Zu tiefes Einsetzen erhöht das Risiko von Wurzelfäule.' }],
  },
}

export default async function SteenwolVastzettenPage(props: { params: Promise<{ locale: string }> }) {
  const locale = resolveStorefrontLocale((await props.params).locale)
  return <KnowledgePage locale={locale} slug="steenwol-vastzetten" article={article[locale]} />
}

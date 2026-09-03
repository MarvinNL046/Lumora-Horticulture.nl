import { generatePageMetadata } from '@/lib/metadata'
import { KnowledgePage, type KnowledgeArticle } from '@/app/lumora-premium/_components/KnowledgePage'
import { resolveStorefrontLocale, type StorefrontLocale } from '@/app/lumora-premium/_components/storefront-localization'

export function generateStaticParams() {
  return [{ locale: 'nl' }, { locale: 'en' }, { locale: 'de' }]
}

const meta = {
  nl: { title: 'Is steenwol hetzelfde als ROCKWOOL?', description: 'Steenwol is het materiaal, ROCKWOOL is een merk. Lees het verschil, welke andere fabrikanten er zijn en hoe steenwol in de tuinbouw wordt gebruikt.', keywords: ['steenwol vs rockwool', 'wat is steenwol', 'rockwool merk', 'steenwol tuinbouw'] },
  en: { title: 'Is rockwool the same as stone wool?', description: 'Stone wool is the material, ROCKWOOL is a brand. Read the difference, which other manufacturers exist and how stone wool is used in horticulture.', keywords: ['rockwool vs stone wool', 'what is stone wool', 'rockwool brand', 'stone wool horticulture'] },
  de: { title: 'Ist Steinwolle dasselbe wie ROCKWOOL?', description: 'Steinwolle ist das Material, ROCKWOOL ist eine Marke. Lesen Sie den Unterschied, welche anderen Hersteller es gibt und wie Steinwolle im Gartenbau eingesetzt wird.', keywords: ['steinwolle vs rockwool', 'was ist steinwolle', 'rockwool marke', 'steinwolle gartenbau'] },
}

export async function generateMetadata(props: { params: Promise<{ locale: string }> }) {
  const locale = resolveStorefrontLocale((await props.params).locale)
  return generatePageMetadata({ ...meta[locale], locale, path: '/steenwol-vs-rockwool', availableLocales: ['nl', 'en', 'de'] })
}

const article: Record<StorefrontLocale, KnowledgeArticle> = {
  nl: {
    tag: 'Materiaal en merk',
    title: 'Is steenwol hetzelfde als ROCKWOOL?',
    intro: 'Een veelgestelde vraag in de tuinbouw. We leggen het verschil uit tussen het materiaal en de merknaam.',
    answer: { title: 'Het korte antwoord', text: 'Nee. Steenwol is een materiaal, ROCKWOOL is een merknaam van een Deense fabrikant van steenwolproducten. Net als bij Kleenex en papieren zakdoekjes is het merk zo bekend geworden dat het vaak als soortnaam wordt gebruikt.' },
    sections: [
      { kind: 'list', title: 'Wat is steenwol?', intro: 'Steenwol is een mineraal vezelmateriaal. Basalt, een vulkanisch gesteente, wordt bij ongeveer 1.500 °C gesmolten en tot vezels gesponnen.', items: ['Natuurlijk mineraal materiaal', 'Gemaakt van basaltgesteente', 'Uitstekende water- en luchtretentie', 'Veel gebruikt als teeltsubstraat'] },
      { kind: 'list', title: 'Wat is ROCKWOOL?', intro: 'ROCKWOOL is een Deens bedrijf en merk dat steenwolproducten maakt voor isolatie en, via het merk Grodan, voor de teelt.', items: ['Deens bedrijf, opgericht in 1937', 'Een van de grootste producenten van steenwol', 'Maakt zowel isolatie- als teeltproducten', 'Merknaam die synoniem werd met steenwol'] },
      { kind: 'cards', title: 'Andere fabrikanten van steenwol', intro: 'ROCKWOOL is de bekendste, maar niet de enige producent.', items: [{ title: 'Grodan', text: 'Teeltmatten en pluggen, onderdeel van de ROCKWOOL-groep.' }, { title: 'Cultilene', text: 'Steenwolsubstraten voor de glastuinbouw.' }, { title: 'Paroc', text: 'Isolatie en steenwol voor de teelt.' }, { title: 'Knauf Insulation', text: 'Isolatiemateriaal van steenwol.' }] },
      { kind: 'list', title: 'Steenwol in de tuinbouw', intro: 'In de professionele teelt wordt steenwol vooral als substraat gebruikt, met goede eigenschappen voor hydrocultuur.', items: ['Groenteteelt in kassen', 'Opkweek van zaailingen en stekken', 'Verticale teeltsystemen', 'Hydrocultuurinstallaties'] },
    ],
    cta: { title: 'Steenwol pluggen van Lumora', text: 'Onze Paper Plug Trays combineren steenwol met een Ellepot FP 12+ papierwikkel voor een direct uitplantbare plug.', button: 'Bekijk de Paper Plug Trays' },
    faq: [{ question: 'Is steenwol hetzelfde als ROCKWOOL?', answer: 'Nee. Steenwol is het materiaal, ROCKWOOL is een merknaam van een Deense fabrikant van steenwolproducten.' }, { question: 'Waar wordt steenwol van gemaakt?', answer: 'Van basalt, een vulkanisch gesteente, dat bij ongeveer 1.500 °C wordt gesmolten en tot vezels wordt gesponnen.' }],
  },
  en: {
    tag: 'Material and brand',
    title: 'Is rockwool the same as stone wool?',
    intro: 'A frequently asked question in horticulture. We explain the difference between the material and the brand name.',
    answer: { title: 'The short answer', text: 'No. Stone wool is a material, ROCKWOOL is the brand name of a Danish manufacturer of stone wool products. Just like Kleenex and tissues, the brand has become so well known that it is often used as a generic name.' },
    sections: [
      { kind: 'list', title: 'What is stone wool?', intro: 'Stone wool is a mineral fibre material. Basalt, a volcanic rock, is melted at around 1,500 °C and spun into fibres.', items: ['Natural mineral material', 'Made from basalt rock', 'Excellent water and air retention', 'Widely used as a growing substrate'] },
      { kind: 'list', title: 'What is ROCKWOOL?', intro: 'ROCKWOOL is a Danish company and brand that makes stone wool products for insulation and, through the Grodan brand, for growing.', items: ['Danish company founded in 1937', 'One of the largest producers of stone wool', 'Makes both insulation and growing products', 'Brand name that became synonymous with stone wool'] },
      { kind: 'cards', title: 'Other stone wool manufacturers', intro: 'ROCKWOOL is the best known, but not the only producer.', items: [{ title: 'Grodan', text: 'Growing slabs and plugs, part of the ROCKWOOL group.' }, { title: 'Cultilene', text: 'Stone wool substrates for greenhouse horticulture.' }, { title: 'Paroc', text: 'Insulation and stone wool for growing.' }, { title: 'Knauf Insulation', text: 'Stone wool insulation material.' }] },
      { kind: 'list', title: 'Stone wool in horticulture', intro: 'In professional growing, stone wool is mainly used as a substrate, with good properties for hydroponics.', items: ['Vegetable cultivation in greenhouses', 'Propagation of seedlings and cuttings', 'Vertical growing systems', 'Hydroponic installations'] },
    ],
    cta: { title: 'Stone wool plugs from Lumora', text: 'Our Paper Plug Trays combine stone wool with an Ellepot FP 12+ paper sleeve for a plug you can plant directly.', button: 'View the Paper Plug Trays' },
    faq: [{ question: 'Is rockwool the same as stone wool?', answer: 'No. Stone wool is the material, ROCKWOOL is the brand name of a Danish manufacturer of stone wool products.' }, { question: 'What is stone wool made of?', answer: 'Basalt, a volcanic rock, melted at around 1,500 °C and spun into fibres.' }],
  },
  de: {
    tag: 'Material und Marke',
    title: 'Ist Steinwolle dasselbe wie ROCKWOOL?',
    intro: 'Eine häufig gestellte Frage im Gartenbau. Wir erklären den Unterschied zwischen dem Material und dem Markennamen.',
    answer: { title: 'Die kurze Antwort', text: 'Nein. Steinwolle ist ein Material, ROCKWOOL ist der Markenname eines dänischen Herstellers von Steinwollprodukten. Wie bei Tempo und Papiertaschentüchern ist die Marke so bekannt geworden, dass sie oft als Gattungsname verwendet wird.' },
    sections: [
      { kind: 'list', title: 'Was ist Steinwolle?', intro: 'Steinwolle ist ein mineralisches Fasermaterial. Basalt, ein Vulkangestein, wird bei etwa 1.500 °C geschmolzen und zu Fasern gesponnen.', items: ['Natürliches mineralisches Material', 'Aus Basaltgestein hergestellt', 'Hervorragende Wasser- und Luftspeicherung', 'Weit verbreitet als Anbausubstrat'] },
      { kind: 'list', title: 'Was ist ROCKWOOL?', intro: 'ROCKWOOL ist ein dänisches Unternehmen und eine Marke, die Steinwollprodukte für die Dämmung und, über die Marke Grodan, für den Anbau herstellt.', items: ['Dänisches Unternehmen, gegründet 1937', 'Einer der größten Hersteller von Steinwolle', 'Stellt Dämm- und Anbauprodukte her', 'Markenname, der zum Synonym für Steinwolle wurde'] },
      { kind: 'cards', title: 'Weitere Steinwollhersteller', intro: 'ROCKWOOL ist der bekannteste, aber nicht der einzige Hersteller.', items: [{ title: 'Grodan', text: 'Anbaumatten und Stecker, Teil der ROCKWOOL-Gruppe.' }, { title: 'Cultilene', text: 'Steinwollsubstrate für den Gewächshausanbau.' }, { title: 'Paroc', text: 'Dämmung und Steinwolle für den Anbau.' }, { title: 'Knauf Insulation', text: 'Dämmstoffe aus Steinwolle.' }] },
      { kind: 'list', title: 'Steinwolle im Gartenbau', intro: 'Im professionellen Anbau wird Steinwolle vor allem als Substrat eingesetzt, mit guten Eigenschaften für die Hydrokultur.', items: ['Gemüseanbau im Gewächshaus', 'Anzucht von Sämlingen und Stecklingen', 'Vertikale Anbausysteme', 'Hydrokulturanlagen'] },
    ],
    cta: { title: 'Steinwollstecker von Lumora', text: 'Unsere Paper Plug Trays kombinieren Steinwolle mit einer Ellepot FP 12+ Papierhülle für einen direkt auspflanzbaren Plug.', button: 'Paper Plug Trays ansehen' },
    faq: [{ question: 'Ist Steinwolle dasselbe wie ROCKWOOL?', answer: 'Nein. Steinwolle ist das Material, ROCKWOOL ist der Markenname eines dänischen Herstellers von Steinwollprodukten.' }, { question: 'Woraus wird Steinwolle hergestellt?', answer: 'Aus Basalt, einem Vulkangestein, das bei etwa 1.500 °C geschmolzen und zu Fasern gesponnen wird.' }],
  },
}

export default async function SteenwolVsRockwoolPage(props: { params: Promise<{ locale: string }> }) {
  const locale = resolveStorefrontLocale((await props.params).locale)
  return <KnowledgePage locale={locale} slug="steenwol-vs-rockwool" article={article[locale]} />
}

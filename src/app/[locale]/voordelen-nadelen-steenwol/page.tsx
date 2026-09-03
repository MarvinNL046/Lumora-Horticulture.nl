import { generatePageMetadata } from '@/lib/metadata'
import { KnowledgePage, type KnowledgeArticle } from '@/app/lumora-premium/_components/KnowledgePage'
import { resolveStorefrontLocale, type StorefrontLocale } from '@/app/lumora-premium/_components/storefront-localization'

export function generateStaticParams() {
  return [{ locale: 'nl' }, { locale: 'en' }, { locale: 'de' }]
}

const meta = {
  nl: { title: 'Voor- en nadelen van steenwol als teeltsubstraat', description: 'De voordelen en nadelen van steenwol op een rij: waterretentie, luchtigheid, pH, hygiëne, kosten en hergebruik. Compleet overzicht voor professionele telers.', keywords: ['voordelen steenwol', 'nadelen steenwol', 'steenwol substraat', 'steenwol teelt'] },
  en: { title: 'Pros and cons of rockwool as a growing substrate', description: 'The advantages and disadvantages of rockwool at a glance: water retention, aeration, pH, hygiene, cost and reuse. A complete overview for professional growers.', keywords: ['rockwool pros and cons', 'rockwool advantages', 'rockwool disadvantages', 'rockwool substrate'] },
  de: { title: 'Vor- und Nachteile von Steinwolle als Anbausubstrat', description: 'Die Vor- und Nachteile von Steinwolle im Überblick: Wasserspeicherung, Luftdurchlässigkeit, pH-Wert, Hygiene, Kosten und Wiederverwendung. Eine vollständige Übersicht für professionelle Züchter.', keywords: ['vorteile steinwolle', 'nachteile steinwolle', 'steinwolle substrat', 'steinwolle anbau'] },
}

export async function generateMetadata(props: { params: Promise<{ locale: string }> }) {
  const locale = resolveStorefrontLocale((await props.params).locale)
  return generatePageMetadata({ ...meta[locale], locale, path: '/voordelen-nadelen-steenwol', availableLocales: ['nl', 'en', 'de'] })
}

const article: Record<StorefrontLocale, KnowledgeArticle> = {
  nl: {
    tag: 'Substraat',
    title: 'Voor- en nadelen van steenwol',
    intro: 'Steenwol is een veelgebruikt teeltsubstraat in de professionele tuinbouw. Wat zijn precies de voordelen, en waar moet je rekening mee houden?',
    answer: { title: 'Het korte antwoord', text: 'Steenwol geeft nauwkeurige controle over water, lucht en voeding en is schoon en uniform. Daar staat tegenover dat het bufferen, precies watergeven en verantwoorde afvoer vraagt.' },
    sections: [
      { kind: 'cards', title: 'Voordelen van steenwol', items: [{ title: 'Uitstekende waterretentie', text: 'Steenwol houdt veel water vast, ideaal voor een constante vochtvoorziening.' }, { title: 'Goede luchtdoorlatendheid', text: 'De open structuur zorgt voor zuurstof bij de wortels.' }, { title: 'pH-neutraal', text: 'Een stabiele pH-waarde die eenvoudig te bufferen is.' }, { title: 'Schoon', text: 'Geen onkruid, ziekten of plagen, dus een schone start.' }, { title: 'Consistente kwaliteit', text: 'Uniforme eigenschappen voor voorspelbare teeltresultaten.' }, { title: 'Snelle wortelgroei', text: 'De structuur stimuleert gezonde en snelle wortelontwikkeling.' }] },
      { kind: 'cards', title: 'Nadelen van steenwol', items: [{ title: 'Hogere aanschafkosten', text: 'De investering is hoger dan bij sommige alternatieven.' }, { title: 'Bufferen nodig', text: 'Voor gebruik moet steenwol naar de juiste pH gebufferd worden.' }, { title: 'Nauwkeurig watergeven', text: 'Verkeerd watergeven leidt snel tot een verstoorde waterhuishouding.' }, { title: 'Kennis vereist', text: 'Optimaal gebruik vraagt ervaring met EC en pH.' }, { title: 'Energie-intensieve productie', text: 'De productie vraagt hoge temperaturen.' }, { title: 'Afvoer na gebruik', text: 'Verantwoorde afvoer vraagt recycling of hergebruik.' }] },
      { kind: 'prose', title: 'Conclusie', paragraphs: ['Voor professionele telers wegen de voordelen zwaar: de controle, de consistente kwaliteit en de bewezen resultaten maken steenwol een veelgebruikte keuze in de opkweek. De nadelen zitten vooral in de leercurve en de aanschaf.', 'Met een Ellepot FP 12+ papierwikkel om de steenwol plant je de complete plug direct uit, zonder plastic en zonder transplantatieschok.'] },
    ],
    cta: { title: 'Steenwol pluggen met papierwikkel', text: 'Paper Plug Tray 84 en 104: steenwol pluggen met Ellepot FP 12+ wikkel, per complete doos geleverd.', button: 'Bekijk de Paper Plug Trays' },
    faq: [{ question: 'Wat zijn de belangrijkste voordelen van steenwol?', answer: 'Hoge waterretentie, goede luchtdoorlatendheid, een stabiele pH, een schone start en consistente kwaliteit.' }, { question: 'Wat zijn de nadelen van steenwol?', answer: 'Hogere aanschafkosten, bufferen voor gebruik, nauwkeurig watergeven, benodigde kennis en verantwoorde afvoer na gebruik.' }],
  },
  en: {
    tag: 'Substrate',
    title: 'Pros and cons of rockwool',
    intro: 'Rockwool is a widely used growing substrate in professional horticulture. What exactly are the advantages, and what should you keep in mind?',
    answer: { title: 'The short answer', text: 'Rockwool gives precise control over water, air and nutrition and is clean and uniform. In return it requires buffering, accurate watering and responsible disposal.' },
    sections: [
      { kind: 'cards', title: 'Advantages of rockwool', items: [{ title: 'Excellent water retention', text: 'Rockwool holds a lot of water, ideal for a constant moisture supply.' }, { title: 'Good air permeability', text: 'The open structure supplies oxygen to the roots.' }, { title: 'pH-neutral', text: 'A stable pH value that is easy to buffer.' }, { title: 'Clean', text: 'No weeds, diseases or pests, so a clean start.' }, { title: 'Consistent quality', text: 'Uniform properties for predictable growing results.' }, { title: 'Fast root growth', text: 'The structure stimulates healthy, fast root development.' }] },
      { kind: 'cards', title: 'Disadvantages of rockwool', items: [{ title: 'Higher purchase cost', text: 'The investment is higher than for some alternatives.' }, { title: 'Buffering required', text: 'Rockwool must be buffered to the correct pH before use.' }, { title: 'Accurate watering', text: 'Incorrect watering quickly upsets the water balance.' }, { title: 'Knowledge required', text: 'Optimal use requires experience with EC and pH.' }, { title: 'Energy-intensive production', text: 'Production requires high temperatures.' }, { title: 'Disposal after use', text: 'Responsible disposal requires recycling or reuse.' }] },
      { kind: 'prose', title: 'Conclusion', paragraphs: ['For professional growers the advantages carry weight: control, consistent quality and proven results make rockwool a common choice for propagation. The disadvantages are mainly the learning curve and the purchase cost.', 'With an Ellepot FP 12+ paper sleeve around the rockwool you plant the complete plug directly, without plastic and without transplant shock.'] },
    ],
    cta: { title: 'Rockwool plugs with a paper sleeve', text: 'Paper Plug Tray 84 and 104: rockwool plugs with an Ellepot FP 12+ sleeve, supplied by the complete box.', button: 'View the Paper Plug Trays' },
    faq: [{ question: 'What are the main advantages of rockwool?', answer: 'High water retention, good air permeability, a stable pH, a clean start and consistent quality.' }, { question: 'What are the disadvantages of rockwool?', answer: 'Higher purchase cost, buffering before use, accurate watering, required knowledge and responsible disposal after use.' }],
  },
  de: {
    tag: 'Substrat',
    title: 'Vor- und Nachteile von Steinwolle',
    intro: 'Steinwolle ist ein weit verbreitetes Anbausubstrat im professionellen Gartenbau. Was genau sind die Vorteile, und worauf sollten Sie achten?',
    answer: { title: 'Die kurze Antwort', text: 'Steinwolle ermöglicht eine präzise Steuerung von Wasser, Luft und Nährstoffen und ist sauber und gleichmäßig. Dafür erfordert sie Pufferung, genaues Gießen und eine verantwortungsvolle Entsorgung.' },
    sections: [
      { kind: 'cards', title: 'Vorteile von Steinwolle', items: [{ title: 'Hervorragende Wasserspeicherung', text: 'Steinwolle hält viel Wasser, ideal für eine konstante Feuchtigkeitsversorgung.' }, { title: 'Gute Luftdurchlässigkeit', text: 'Die offene Struktur versorgt die Wurzeln mit Sauerstoff.' }, { title: 'pH-neutral', text: 'Ein stabiler pH-Wert, der sich leicht puffern lässt.' }, { title: 'Sauber', text: 'Keine Unkräuter, Krankheiten oder Schädlinge, also ein sauberer Start.' }, { title: 'Konstante Qualität', text: 'Einheitliche Eigenschaften für vorhersehbare Anbauergebnisse.' }, { title: 'Schnelles Wurzelwachstum', text: 'Die Struktur fördert eine gesunde, schnelle Wurzelentwicklung.' }] },
      { kind: 'cards', title: 'Nachteile von Steinwolle', items: [{ title: 'Höhere Anschaffungskosten', text: 'Die Investition ist höher als bei manchen Alternativen.' }, { title: 'Pufferung erforderlich', text: 'Steinwolle muss vor Gebrauch auf den richtigen pH-Wert gepuffert werden.' }, { title: 'Genaues Gießen', text: 'Falsches Gießen bringt den Wasserhaushalt schnell aus dem Gleichgewicht.' }, { title: 'Wissen erforderlich', text: 'Die optimale Nutzung erfordert Erfahrung mit EC und pH.' }, { title: 'Energieintensive Produktion', text: 'Die Herstellung erfordert hohe Temperaturen.' }, { title: 'Entsorgung nach Gebrauch', text: 'Eine verantwortungsvolle Entsorgung erfordert Recycling oder Wiederverwendung.' }] },
      { kind: 'prose', title: 'Fazit', paragraphs: ['Für professionelle Züchter wiegen die Vorteile schwer: Kontrolle, konstante Qualität und bewährte Ergebnisse machen Steinwolle zu einer gängigen Wahl in der Anzucht. Die Nachteile liegen vor allem in der Lernkurve und der Anschaffung.', 'Mit einer Ellepot FP 12+ Papierhülle um die Steinwolle pflanzen Sie den kompletten Plug direkt aus, ohne Kunststoff und ohne Transplantationsschock.'] },
    ],
    cta: { title: 'Steinwollstecker mit Papierhülle', text: 'Paper Plug Tray 84 und 104: Steinwollstecker mit Ellepot FP 12+ Hülle, im kompletten Karton geliefert.', button: 'Paper Plug Trays ansehen' },
    faq: [{ question: 'Was sind die wichtigsten Vorteile von Steinwolle?', answer: 'Hohe Wasserspeicherung, gute Luftdurchlässigkeit, ein stabiler pH-Wert, ein sauberer Start und konstante Qualität.' }, { question: 'Was sind die Nachteile von Steinwolle?', answer: 'Höhere Anschaffungskosten, Pufferung vor Gebrauch, genaues Gießen, erforderliches Wissen und eine verantwortungsvolle Entsorgung nach Gebrauch.' }],
  },
}

export default async function VoordelenNadelenPage(props: { params: Promise<{ locale: string }> }) {
  const locale = resolveStorefrontLocale((await props.params).locale)
  return <KnowledgePage locale={locale} slug="voordelen-nadelen-steenwol" article={article[locale]} />
}

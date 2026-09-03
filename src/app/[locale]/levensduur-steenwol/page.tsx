import { generatePageMetadata } from '@/lib/metadata'
import { KnowledgePage, type KnowledgeArticle } from '@/app/lumora-premium/_components/KnowledgePage'
import { resolveStorefrontLocale, type StorefrontLocale } from '@/app/lumora-premium/_components/storefront-localization'

export function generateStaticParams() {
  return [{ locale: 'nl' }, { locale: 'en' }, { locale: 'de' }]
}

const meta = {
  nl: { title: 'Levensduur van steenwol: hoe lang gaat het mee?', description: 'Hoe lang gaat steenwol mee? Richtwaarden per toepassing, de rol van de Ellepot FP 12+ wikkel, factoren die de levensduur beïnvloeden, hergebruik en verantwoorde afvoer.', keywords: ['levensduur steenwol', 'hoe lang gaat steenwol mee', 'steenwol hergebruiken', 'steenwol afvoer'] },
  en: { title: 'Rockwool lifespan: how long does it last?', description: 'How long does rockwool last? Indicative values per application, the role of the Ellepot FP 12+ sleeve, factors that affect lifespan, reuse and responsible disposal.', keywords: ['rockwool lifespan', 'how long does rockwool last', 'reuse rockwool', 'rockwool disposal'] },
  de: { title: 'Lebensdauer von Steinwolle: wie lange hält sie?', description: 'Wie lange hält Steinwolle? Richtwerte je Anwendung, die Rolle der Ellepot FP 12+ Hülle, Faktoren, die die Lebensdauer beeinflussen, Wiederverwendung und verantwortungsvolle Entsorgung.', keywords: ['lebensdauer steinwolle', 'wie lange hält steinwolle', 'steinwolle wiederverwenden', 'steinwolle entsorgung'] },
}

export async function generateMetadata(props: { params: Promise<{ locale: string }> }) {
  const locale = resolveStorefrontLocale((await props.params).locale)
  return generatePageMetadata({ ...meta[locale], locale, path: '/levensduur-steenwol', availableLocales: ['nl', 'en', 'de'] })
}

const article: Record<StorefrontLocale, KnowledgeArticle> = {
  nl: {
    tag: 'Levensduur',
    title: 'Levensduur van steenwol',
    intro: 'Hoe lang gaat steenwol mee? Een belangrijke vraag voor telers die het meeste uit hun opkweekmateriaal willen halen.',
    answer: { title: 'Het korte antwoord', text: 'Voor de opkweek gebruik je een steenwol plug één teeltcyclus. De plug zelf blijft maanden stabiel; de Ellepot FP 12+ papierwikkel houdt zijn structuur meer dan twaalf maanden.' },
    sections: [
      { kind: 'facts', title: 'Richtwaarden', facts: [{ value: '1', label: 'teeltcyclus voor propagatie' }, { value: '6-12', label: 'maanden standaard steenwol' }, { value: '12+', label: 'maanden met FP 12+ wikkel' }, { value: '2-3', label: 'cycli bij hergebruik' }] },
      { kind: 'cards', title: 'Wat de FP 12+ wikkel doet', intro: 'De papierwikkel van Ellepot FP 12+ maakt het verschil tijdens een langere opkweek.', items: [{ title: 'Meer dan 12 maanden stabiel', text: 'De wikkel behoudt zijn structuur en eigenschappen minimaal twaalf maanden.' }, { title: 'Structuurbehoud', text: 'Geen afbrokkeling of verkruimeling van de plug.' }, { title: 'Direct uitplantbaar', text: 'Wortels groeien door het papier heen, dus je plant de complete plug uit.' }, { title: 'Consistente kwaliteit', text: 'De eigenschappen blijven constant tijdens de teelt.' }] },
      { kind: 'cards', title: 'Factoren die de levensduur beïnvloeden', items: [{ title: 'Waterkwaliteit', text: 'Een hoge EC of pH kan de afbraak versnellen.' }, { title: 'Temperatuur', text: 'Temperaturen boven 30 °C verkorten de levensduur.' }, { title: 'Microbiële activiteit', text: 'Schimmels en algen kunnen afbraak veroorzaken.' }, { title: 'UV-blootstelling', text: 'Direct zonlicht kan het materiaal aantasten.' }, { title: 'Chemicaliën', text: 'Agressieve middelen kunnen de structuur beschadigen.' }] },
      { kind: 'steps', title: 'Hergebruik van steenwol', intro: 'Onder de juiste omstandigheden kun je steenwol hergebruiken.', items: ['Verwijder oude wortels en plantenresten.', 'Steriliseer met stoom of een geschikte behandeling.', 'Spoel grondig met schoon water.', 'Buffer opnieuw naar de juiste pH.', 'Controleer op structuurschade.', 'Gebruik alleen voor minder gevoelige teelten.'], note: 'Voor de opkweek van zaailingen en stekken raden we eenmalig gebruik aan, voor optimale hygiëne.' },
      { kind: 'list', title: 'Onderhoudstips voor een langere levensduur', items: ['Gebruik schoon water met een pH van 5,5 tot 6,5', 'Voorkom algengroei met een lichtdichte afdekking', 'Controleer de EC regelmatig en spoel waar nodig', 'Zorg voor goede drainage en zuurstoftoevoer', 'Bescherm tegen direct zonlicht', 'Houd een temperatuur van 18 tot 24 °C aan', 'Inspecteer het materiaal regelmatig'] },
      { kind: 'cards', title: 'Verantwoorde afvoer na gebruik', items: [{ title: 'Recycling', text: 'Steenwol kan gerecycled worden tot nieuw materiaal.' }, { title: 'Hergebruik', text: 'Geschikt voor minder kritische toepassingen.' }, { title: 'Compostering', text: 'De papierwikkel is biologisch afbreekbaar; steenwol zelf niet.' }, { title: 'Afvalverwerking', text: 'Via een erkende afvalverwerker.' }] },
    ],
    cta: { title: 'Steenwol met FP 12+ wikkel', text: 'Paper Plug Tray 84 en 104: steenwol pluggen met Ellepot FP 12+ papierwikkel, stabiel tijdens de hele opkweek.', button: 'Bekijk de Paper Plug Trays' },
    faq: [{ question: 'Hoe lang gaat steenwol mee?', answer: 'Voor de opkweek gebruik je een plug één teeltcyclus. Standaard steenwol blijft zes tot twaalf maanden stabiel; met een Ellepot FP 12+ wikkel meer dan twaalf maanden.' }, { question: 'Kun je steenwol hergebruiken?', answer: 'Onder de juiste omstandigheden wel, na reinigen, steriliseren en opnieuw bufferen. Voor zaailingen en stekken raden we eenmalig gebruik aan.' }],
  },
  en: {
    tag: 'Lifespan',
    title: 'Rockwool lifespan',
    intro: 'How long does rockwool last? An important question for growers who want to get the most out of their propagation material.',
    answer: { title: 'The short answer', text: 'For propagation you use a rockwool plug for one growing cycle. The plug itself stays stable for months; the Ellepot FP 12+ paper sleeve keeps its structure for more than twelve months.' },
    sections: [
      { kind: 'facts', title: 'Indicative values', facts: [{ value: '1', label: 'growing cycle for propagation' }, { value: '6-12', label: 'months for standard rockwool' }, { value: '12+', label: 'months with FP 12+ sleeve' }, { value: '2-3', label: 'cycles when reused' }] },
      { kind: 'cards', title: 'What the FP 12+ sleeve does', intro: 'The Ellepot FP 12+ paper sleeve makes the difference during a longer propagation period.', items: [{ title: 'Stable for more than 12 months', text: 'The sleeve keeps its structure and properties for at least twelve months.' }, { title: 'Structure retention', text: 'No crumbling or disintegration of the plug.' }, { title: 'Ready to plant directly', text: 'Roots grow through the paper, so you plant the complete plug.' }, { title: 'Consistent quality', text: 'Properties remain constant during cultivation.' }] },
      { kind: 'cards', title: 'Factors that affect lifespan', items: [{ title: 'Water quality', text: 'A high EC or pH can accelerate degradation.' }, { title: 'Temperature', text: 'Temperatures above 30 °C shorten the lifespan.' }, { title: 'Microbial activity', text: 'Fungi and algae can cause degradation.' }, { title: 'UV exposure', text: 'Direct sunlight can damage the material.' }, { title: 'Chemicals', text: 'Aggressive agents can damage the structure.' }] },
      { kind: 'steps', title: 'Reusing rockwool', intro: 'Under the right conditions rockwool can be reused.', items: ['Remove old roots and plant residues.', 'Sterilise with steam or a suitable treatment.', 'Rinse thoroughly with clean water.', 'Re-buffer to the correct pH.', 'Check for structural damage.', 'Use only for less sensitive crops.'], note: 'For propagating seedlings and cuttings we recommend single use, for optimal hygiene.' },
      { kind: 'list', title: 'Maintenance tips for a longer lifespan', items: ['Use clean water with a pH of 5.5 to 6.5', 'Prevent algae growth with a light-blocking cover', 'Check the EC regularly and flush where needed', 'Ensure good drainage and oxygen supply', 'Protect from direct sunlight', 'Keep a temperature of 18 to 24 °C', 'Inspect the material regularly'] },
      { kind: 'cards', title: 'Responsible disposal after use', items: [{ title: 'Recycling', text: 'Rockwool can be recycled into new material.' }, { title: 'Reuse', text: 'Suitable for less critical applications.' }, { title: 'Composting', text: 'The paper sleeve is biodegradable; the rockwool itself is not.' }, { title: 'Waste processing', text: 'Through a certified waste processor.' }] },
    ],
    cta: { title: 'Rockwool with an FP 12+ sleeve', text: 'Paper Plug Tray 84 and 104: rockwool plugs with an Ellepot FP 12+ paper sleeve, stable throughout propagation.', button: 'View the Paper Plug Trays' },
    faq: [{ question: 'How long does rockwool last?', answer: 'For propagation you use a plug for one growing cycle. Standard rockwool stays stable for six to twelve months; with an Ellepot FP 12+ sleeve more than twelve months.' }, { question: 'Can rockwool be reused?', answer: 'Under the right conditions yes, after cleaning, sterilising and re-buffering. For seedlings and cuttings we recommend single use.' }],
  },
  de: {
    tag: 'Lebensdauer',
    title: 'Lebensdauer von Steinwolle',
    intro: 'Wie lange hält Steinwolle? Eine wichtige Frage für Züchter, die das Beste aus ihrem Anzuchtmaterial herausholen möchten.',
    answer: { title: 'Die kurze Antwort', text: 'In der Anzucht verwenden Sie einen Steinwollstecker für einen Kulturzyklus. Der Stecker selbst bleibt monatelang stabil; die Ellepot FP 12+ Papierhülle behält ihre Struktur länger als zwölf Monate.' },
    sections: [
      { kind: 'facts', title: 'Richtwerte', facts: [{ value: '1', label: 'Kulturzyklus in der Anzucht' }, { value: '6-12', label: 'Monate bei Standard-Steinwolle' }, { value: '12+', label: 'Monate mit FP 12+ Hülle' }, { value: '2-3', label: 'Zyklen bei Wiederverwendung' }] },
      { kind: 'cards', title: 'Was die FP 12+ Hülle bewirkt', intro: 'Die Papierhülle von Ellepot FP 12+ macht den Unterschied während einer längeren Anzucht.', items: [{ title: 'Mehr als 12 Monate stabil', text: 'Die Hülle behält ihre Struktur und Eigenschaften mindestens zwölf Monate.' }, { title: 'Strukturerhalt', text: 'Kein Zerbröckeln oder Zerfallen des Steckers.' }, { title: 'Direkt auspflanzbar', text: 'Wurzeln wachsen durch das Papier, Sie pflanzen den kompletten Stecker aus.' }, { title: 'Konstante Qualität', text: 'Die Eigenschaften bleiben während der Kultur konstant.' }] },
      { kind: 'cards', title: 'Faktoren, die die Lebensdauer beeinflussen', items: [{ title: 'Wasserqualität', text: 'Ein hoher EC- oder pH-Wert kann den Abbau beschleunigen.' }, { title: 'Temperatur', text: 'Temperaturen über 30 °C verkürzen die Lebensdauer.' }, { title: 'Mikrobielle Aktivität', text: 'Pilze und Algen können Abbau verursachen.' }, { title: 'UV-Belastung', text: 'Direktes Sonnenlicht kann das Material angreifen.' }, { title: 'Chemikalien', text: 'Aggressive Mittel können die Struktur beschädigen.' }] },
      { kind: 'steps', title: 'Wiederverwendung von Steinwolle', intro: 'Unter den richtigen Bedingungen lässt sich Steinwolle wiederverwenden.', items: ['Alte Wurzeln und Pflanzenreste entfernen.', 'Mit Dampf oder einer geeigneten Behandlung sterilisieren.', 'Gründlich mit sauberem Wasser spülen.', 'Auf den richtigen pH-Wert neu puffern.', 'Auf Strukturschäden prüfen.', 'Nur für weniger empfindliche Kulturen verwenden.'], note: 'Für die Anzucht von Sämlingen und Stecklingen empfehlen wir den einmaligen Gebrauch, für optimale Hygiene.' },
      { kind: 'list', title: 'Pflegetipps für eine längere Lebensdauer', items: ['Sauberes Wasser mit einem pH-Wert von 5,5 bis 6,5 verwenden', 'Algenwachstum mit einer lichtdichten Abdeckung verhindern', 'Den EC-Wert regelmäßig prüfen und bei Bedarf spülen', 'Für gute Drainage und Sauerstoffzufuhr sorgen', 'Vor direktem Sonnenlicht schützen', 'Eine Temperatur von 18 bis 24 °C einhalten', 'Das Material regelmäßig kontrollieren'] },
      { kind: 'cards', title: 'Verantwortungsvolle Entsorgung nach Gebrauch', items: [{ title: 'Recycling', text: 'Steinwolle kann zu neuem Material recycelt werden.' }, { title: 'Wiederverwendung', text: 'Geeignet für weniger kritische Anwendungen.' }, { title: 'Kompostierung', text: 'Die Papierhülle ist biologisch abbaubar; die Steinwolle selbst nicht.' }, { title: 'Abfallentsorgung', text: 'Über einen zertifizierten Entsorger.' }] },
    ],
    cta: { title: 'Steinwolle mit FP 12+ Hülle', text: 'Paper Plug Tray 84 und 104: Steinwollstecker mit Ellepot FP 12+ Papierhülle, stabil während der gesamten Anzucht.', button: 'Paper Plug Trays ansehen' },
    faq: [{ question: 'Wie lange hält Steinwolle?', answer: 'In der Anzucht verwenden Sie einen Stecker für einen Kulturzyklus. Standard-Steinwolle bleibt sechs bis zwölf Monate stabil; mit einer Ellepot FP 12+ Hülle länger als zwölf Monate.' }, { question: 'Kann man Steinwolle wiederverwenden?', answer: 'Unter den richtigen Bedingungen ja, nach Reinigen, Sterilisieren und erneutem Puffern. Für Sämlinge und Stecklinge empfehlen wir den einmaligen Gebrauch.' }],
  },
}

export default async function LevensduurSteenwolPage(props: { params: Promise<{ locale: string }> }) {
  const locale = resolveStorefrontLocale((await props.params).locale)
  return <KnowledgePage locale={locale} slug="levensduur-steenwol" article={article[locale]} />
}

import Link from 'next/link'
import { generatePageMetadata } from '@/lib/metadata'
import { localizePathForLocale } from '@/lib/url-localizations'
import { serializeJsonLd } from '@/lib/safe-json-ld'
import {
  CheckList,
  ContentCta,
  ContentHero,
  ContentPage,
  ContentSection,
  FactRow,
  FeatureGrid,
  Prose,
  SplitPanel,
  SplitSection,
} from '@/app/lumora-premium/_components/ContentPage'
import { resolveStorefrontLocale } from '@/app/lumora-premium/_components/storefront-localization'
import { getLocalizedProducts } from '@/app/lumora-premium/_data/storefront-content'

// Generate static params for locales
export function generateStaticParams() {
  return [
    { locale: 'nl' },
    { locale: 'en' },
    { locale: 'de' }
  ]
}

// Generate metadata for Paperbus Steenwol Pluggen SEO landing page
export async function generateMetadata(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  const metadata = {
    nl: {
      title: 'Paperbus Steenwol Pluggen: Maten & Samenstelling',
      description: 'Bekijk de samenstelling en maten van paperbus steenwol pluggen: steenwol met Ellepot FP 12+ papierwikkel, in trays met 84 of 104 cellen.',
      keywords: ['paperbus steenwol pluggen', 'steenwol pluggen', 'paperbus pluggen', 'fp 12+', 'glastuinbouw', 'kwekerij', 'transplantatieschok', 'wortelontwikkeling']
    },
    en: {
      title: 'Paper Pot Rockwool Plugs: Sizes & Materials',
      description: 'Explore the materials and sizes of paper pot rockwool plugs: rockwool with an Ellepot FP 12+ paper sleeve, supplied in trays with 84 or 104 cells.',
      keywords: ['paper pot rockwool plugs', 'rockwool plugs', 'paper pot plugs', 'fp 12+', 'greenhouse', 'nursery', 'transplant shock', 'root development']
    },
    de: {
      title: 'Papiertopf-Steinwollstecker: Maße & Material',
      description: 'Material und Maße der Papiertopf-Steinwollstecker: Steinwolle mit Ellepot FP 12+ Papierhülle, erhältlich in Anzuchtplatten mit 84 oder 104 Zellen.',
      keywords: ['papiertopf steinwollstecker', 'steinwollstecker', 'papiertopf stecker', 'fp 12+', 'gewächshaus', 'gärtnerei', 'transplantationsschock', 'wurzelentwicklung']
    }
  }

  const localeMeta = metadata[params.locale as keyof typeof metadata] || metadata.nl

  return generatePageMetadata({
    title: localeMeta.title,
    description: localeMeta.description,
    keywords: localeMeta.keywords,
    locale: params.locale,
    path: '/paperbus-steenwol-pluggen'
  })
}

const content = {
  nl: {
    tag: 'Paperbus steenwol pluggen',
    subtitle: 'Professionele kweekoplossing met Ellepot FP 12+',
    hero: { title: 'Paperbus steenwol pluggen: samenstelling en maten', description: "Steenwol pluggen met een Ellepot FP 12+ papierwikkel, geleverd in trays met 84 of 104 cellen. Bekijk de materialen, plugmaten en doosinhoud voor jouw opkweek.", cta: 'Bekijk de Paper Plug Trays' },
    benefits: {
      title: 'Waarom kiezen voor paperbus steenwol pluggen?',
      items: [
  {
    "title": "Steenwol met papierwikkel",
    "description": "De plug bestaat uit een steenwolkern en een aparte Ellepot FP 12+ wikkel."
  },
  {
    "title": "Wat betekent FP 12+?",
    "description": "Ellepot noemt voor dit papier een afbraaktijd van 12+ maanden. Dit is geen gegarandeerde levensduur van de complete plug."
  },
  {
    "title": "Uitplanten met de wikkel",
    "description": "Wortels kunnen door de papierwikkel groeien. Laat de wikkel bij het uitplanten zitten en behandel de wortels voorzichtig."
  },
  {
    "title": "Watergift op maat",
    "description": "Stem water en voeding af op je gewas, de beworteling en de omstandigheden in de kas."
  },
  {
    "title": "Per complete doos",
    "description": "De trays worden per doos geleverd, zodat je de benodigde hoeveelheid voor je opkweek kunt berekenen."
  },
  {
    "title": "Twee tray-indelingen",
    "description": "Kies 84 cellen voor een grotere plug of 104 cellen voor een hogere plantdichtheid."
  }
],
    },
    why: {"title":"Wat zit er in een paperbus steenwol plug?","description":"Steenwol vormt de kern waarin de jonge plant wortelt. De papierwikkel omsluit die kern. De afbraakinformatie van Ellepot gaat over het papier en betekent niet dat de complete steenwol plug biologisch afbreekbaar is.","panelTitle":"De opbouw in het kort","panelItems":["Steenwolkern als groeimedium","Ellepot FP 12+ papierwikkel","Twee verschillende plugmaten","Levering in gevulde trays"]},
    material: {"title":"Materiaalinformatie van de fabrikant","text":"Ellepot vermeldt houtvezels met polyesterversterking voor FP 12+. Lees de ","label":"specificaties van Ellepot FP 12+","after":" voor de samenstelling van de wikkel.","guideBefore":"Aan de slag met de trays? Lees onze ","guideLabel":"handleiding voor steenwol stekpluggen","guideAfter":" over natmaken, inzetten en uitplanten."},
    formats: { title: 'Beschikbare formaten', intro: 'Beide uitvoeringen worden per complete doos geleverd, met gratis verzending binnen Nederland, België en Duitsland.', facts: [['84', 'cellen per tray · Ø38 × 42 mm'], ['104', 'cellen per tray · Ø32 × 40 mm'], ['8', 'trays per doos (84)'], ['7', 'trays per doos (104)']] },
    applications: { title: 'Toepassingen', items: ['Groenteteelt in kassen', 'Sierteelt en potplanten', 'Boomkwekerijen', 'Kruidenteelt', 'Zaailingen en jonge planten'] },
    cta: { eyebrow: 'Direct bestellen', title: 'Klaar om over te stappen op paperbus steenwol pluggen?', description: 'Bekijk de Paper Plug Trays 84 en 104 met exacte doosinhoud en bestel direct online.', button: 'Download de productfolder', contact: 'Neem contact op' },
  },
  en: {
    tag: 'Paper pot rockwool plugs',
    subtitle: 'Professional growing solution with Ellepot FP 12+',
    hero: { title: 'Paper pot rockwool plugs for professional cultivation', description: "Rockwool plugs with an Ellepot FP 12+ paper sleeve, supplied in trays with 84 or 104 cells. Compare materials, plug sizes and box contents for your propagation setup.", cta: 'View the Paper Plug Trays' },
    benefits: {
      title: 'Why choose paper pot rockwool plugs?',
      items: [
  {
    "title": "Rockwool with a paper sleeve",
    "description": "Each plug consists of a rockwool core and a separate Ellepot FP 12+ sleeve."
  },
  {
    "title": "What does FP 12+ mean?",
    "description": "Ellepot lists a decomposition time of 12+ months for this paper. This is not a guaranteed lifespan for the complete plug."
  },
  {
    "title": "Planting with the sleeve",
    "description": "Roots can grow through the paper sleeve. Leave it in place when transplanting and handle the roots gently."
  },
  {
    "title": "Crop-specific watering",
    "description": "Adjust water and nutrients to your crop, root development and greenhouse conditions."
  },
  {
    "title": "Supplied by the box",
    "description": "Trays come in complete boxes, making it easy to calculate the quantity needed for propagation."
  },
  {
    "title": "Two tray layouts",
    "description": "Choose 84 cells for a larger plug or 104 cells for a higher plant density."
  }
],
    },
    why: {"title":"What is a paper pot rockwool plug made of?","description":"Rockwool forms the core in which the young plant roots. The paper sleeve surrounds that core. Ellepot’s decomposition information concerns the paper and does not mean the complete rockwool plug is biodegradable.","panelTitle":"Materials and supply","panelItems":["Rockwool core as growing medium","Ellepot FP 12+ paper sleeve","Two different plug sizes","Supplied in filled trays"]},
    material: {"title":"Manufacturer material information","text":"Ellepot specifies wood fibres with polyester reinforcement for FP 12+. Read the ","label":"Ellepot FP 12+ specifications","after":" for details of the sleeve material.","guideBefore":"Getting started? Read our ","guideLabel":"guide to rockwool propagation plugs","guideAfter":" for practical information on using the trays."},
    formats: { title: 'Available formats', intro: 'Both versions are supplied by the complete box, with free shipping within the Netherlands, Belgium and Germany.', facts: [['84', 'cells per tray · Ø38 × 42 mm'], ['104', 'cells per tray · Ø32 × 40 mm'], ['8', 'trays per box (84)'], ['7', 'trays per box (104)']] },
    applications: { title: 'Applications', items: ['Vegetable cultivation in greenhouses', 'Ornamental and potted plants', 'Tree nurseries', 'Herb cultivation', 'Seedlings and young plants'] },
    cta: { eyebrow: 'Order directly', title: 'Ready to switch to paper pot rockwool plugs?', description: 'View Paper Plug Trays 84 and 104 with exact box contents and order directly online.', button: 'Download the product brochure', contact: 'Contact us' },
  },
  de: {
    tag: 'Papiertopf-Steinwollstecker',
    subtitle: 'Professionelle Anbaulösung mit Ellepot FP 12+',
    hero: { title: 'Papiertopf-Steinwollstecker für den professionellen Anbau', description: "Steinwollstecker mit einer Ellepot FP 12+ Papierhülle, geliefert in Anzuchtplatten mit 84 oder 104 Zellen. Vergleichen Sie Material, Plugmaße und Kartoninhalt für Ihre Anzucht.", cta: 'Paper Plug Trays ansehen' },
    benefits: {
      title: 'Warum Papiertopf-Steinwollstecker wählen?',
      items: [
  {
    "title": "Steinwolle mit Papierhülle",
    "description": "Jeder Plug besteht aus einem Steinwollkern und einer separaten Ellepot FP 12+ Hülle."
  },
  {
    "title": "Was bedeutet FP 12+?",
    "description": "Ellepot nennt für dieses Papier eine Abbauzeit von 12+ Monaten. Das ist keine garantierte Lebensdauer des gesamten Plugs."
  },
  {
    "title": "Mit der Hülle auspflanzen",
    "description": "Wurzeln können durch die Papierhülle wachsen. Lassen Sie die Hülle beim Auspflanzen am Plug und behandeln Sie die Wurzeln vorsichtig."
  },
  {
    "title": "Bewässerung nach Bedarf",
    "description": "Passen Sie Wasser und Nährstoffe an die Kultur, die Bewurzelung und die Bedingungen im Gewächshaus an."
  },
  {
    "title": "Lieferung im Karton",
    "description": "Die Platten werden im kompletten Karton geliefert. So können Sie die benötigte Menge für Ihre Anzucht berechnen."
  },
  {
    "title": "Zwei Tray-Aufteilungen",
    "description": "Wählen Sie 84 Zellen für einen größeren Plug oder 104 Zellen für eine höhere Pflanzendichte."
  }
],
    },
    why: {"title":"Woraus besteht ein Papiertopf-Steinwollstecker?","description":"Steinwolle bildet den Kern, in dem die junge Pflanze wurzelt. Die Papierhülle umschließt diesen Kern. Die Abbauangaben von Ellepot beziehen sich auf das Papier und bedeuten nicht, dass der gesamte Steinwollstecker biologisch abbaubar ist.","panelTitle":"Aufbau und Lieferung","panelItems":["Steinwollkern als Kultursubstrat","Ellepot FP 12+ Papierhülle","Zwei verschiedene Plugmaße","Lieferung in gefüllten Platten"]},
    material: {"title":"Materialangaben des Herstellers","text":"Ellepot nennt für FP 12+ Holzfasern mit Polyesterverstärkung. Lesen Sie die ","label":"Spezifikationen zu Ellepot FP 12+","after":" für Angaben zum Material der Hülle.","guideBefore":"Für die Anwendung lesen Sie unsere ","guideLabel":"Anleitung für Steinwollstecker","guideAfter":" mit praktischen Informationen zu den Anzuchtplatten."},
    formats: { title: 'Verfügbare Formate', intro: 'Beide Ausführungen werden im kompletten Karton geliefert, mit kostenlosem Versand in die Niederlande, nach Belgien und Deutschland.', facts: [['84', 'Zellen pro Platte · Ø38 × 42 mm'], ['104', 'Zellen pro Platte · Ø32 × 40 mm'], ['8', 'Platten pro Karton (84)'], ['7', 'Platten pro Karton (104)']] },
    applications: { title: 'Anwendungen', items: ['Gemüseanbau im Gewächshaus', 'Zier- und Topfpflanzen', 'Baumschulen', 'Kräuteranbau', 'Sämlinge und Jungpflanzen'] },
    cta: { eyebrow: 'Direkt bestellen', title: 'Bereit für den Umstieg auf Papiertopf-Steinwollstecker?', description: 'Sehen Sie sich die Paper Plug Trays 84 und 104 mit genauem Kartoninhalt an und bestellen Sie direkt online.', button: 'Produktbroschüre herunterladen', contact: 'Kontakt aufnehmen' },
  },
} as const

// SEO Landing page for Paperbus Steenwol Pluggen
export default async function PaperbusLandingPage(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  const locale = resolveStorefrontLocale(params.locale)
  const c = content[locale]
  const products = getLocalizedProducts(locale)
  const plugsHref = `${localizePathForLocale('/stekpluggen-steenwol', locale)}#koopblok`
  const brochure = `/downloads/Lumora-Ellepot-FP12-Folder${locale === 'de' ? '-DE' : ''}.pdf`

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: c.hero.title,
    description: c.hero.description,
    url: 'https://lumorahorticulture.nl' + localizePathForLocale('/paperbus-steenwol-pluggen', locale),
  }

  return (
    <ContentPage>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }} />

      <ContentHero
        locale={locale}
        breadcrumb={c.tag}
        eyebrow={c.subtitle}
        title={c.hero.title}
        lead={c.hero.description}
        actions={[
          { href: plugsHref, label: c.hero.cta },
          { href: brochure, label: c.cta.button, variant: 'light', download: brochure.split('/').pop() },
        ]}
        image={products.paperbus.heroImage ?? products.paperbus.mainImage}
        imageAlt={products.paperbus.heroImageAlt ?? products.paperbus.mainImageAlt}
        caption={{ small: products.paperbus.name, strong: 'Ellepot FP 12+' }}
      />

      <ContentSection eyebrow={c.tag} title={c.benefits.title} soft>
        <FeatureGrid items={c.benefits.items.map((item) => ({ title: item.title, text: item.description }))} />
      </ContentSection>

      <SplitSection
        eyebrow="Lumora"
        title={c.why.title}
        image={products.paperbus.tertiaryImage ?? products.paperbus.secondaryImage}
        imageAlt={products.paperbus.tertiaryImageAlt ?? products.paperbus.secondaryImageAlt}
        imageLabel="Ellepot FP 12+"
      >
        <Prose><p>{c.why.description}</p></Prose>
        <SplitPanel title={c.why.panelTitle} items={[...c.why.panelItems]} />
      </SplitSection>

      <ContentSection title={c.material.title}>
        <Prose>
          <p>{c.material.text}<a href="https://www.ellepot.com/ellepot-products/papers/paper-programme/fp/" style={{ color: '#1d4ed8', textDecoration: 'underline', textUnderlineOffset: '0.18em' }}>{c.material.label}</a>{c.material.after}</p>
          <p>{c.material.guideBefore}<Link href={localizePathForLocale('/paper-plug-trays-uitgelegd', locale)} style={{ color: '#1d4ed8', textDecoration: 'underline', textUnderlineOffset: '0.18em' }}>{c.material.guideLabel}</Link>{c.material.guideAfter}</p>
        </Prose>
      </ContentSection>

      <ContentSection eyebrow={products.paperbus.name} title={c.formats.title} intro={c.formats.intro} soft>
        <FactRow facts={c.formats.facts.map(([value, label]) => ({ value, label }))} />
      </ContentSection>

      <ContentSection title={c.applications.title}>
        <CheckList items={[...c.applications.items]} />
      </ContentSection>

      <ContentCta
        eyebrow={c.cta.eyebrow}
        title={c.cta.title}
        text={c.cta.description}
        actions={[
          { href: plugsHref, label: c.hero.cta },
          { href: 'mailto:info@lumorahorticulture.com', label: c.cta.contact, variant: 'ghost' },
        ]}
      />
    </ContentPage>
  )
}

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
      title: 'Paperbus Steenwol Pluggen - FP 12+ Kwaliteit | Lumora Horticulture',
      description: 'Professionele paperbus steenwol pluggen met FP 12+ technologie. Milieuvriendelijk en 12+ maanden stabiliteit. Ideaal voor glastuinbouw en kwekerijen.',
      keywords: ['paperbus steenwol pluggen', 'steenwol pluggen', 'paperbus pluggen', 'fp 12+', 'milieuvriendelijk', 'glastuinbouw', 'kwekerij', 'transplantatieschok', 'wortelontwikkeling']
    },
    en: {
      title: 'Paper Pot Rockwool Plugs - FP 12+ Quality | Lumora Horticulture',
      description: 'Professional paper pot rockwool plugs with FP 12+ technology. Eco-friendly and 12+ months stability. Perfect for greenhouse cultivation and nurseries.',
      keywords: ['paper pot rockwool plugs', 'rockwool plugs', 'paper pot plugs', 'fp 12+', 'eco-friendly', 'greenhouse', 'nursery', 'transplant shock', 'root development']
    },
    de: {
      title: 'Papiertopf Steinwollstecker - FP 12+ Qualität | Lumora Horticulture',
      description: 'Professionelle Papiertopf-Steinwollstecker mit FP 12+ Technologie. Umweltfreundlich und 12+ Monate Stabilität. Ideal für Gewächshäuser und Gärtnereien.',
      keywords: ['papiertopf steinwollstecker', 'steinwollstecker', 'papiertopf stecker', 'fp 12+', 'umweltfreundlich', 'gewächshaus', 'gärtnerei', 'transplantationsschock', 'wurzelentwicklung']
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
    hero: { title: 'Paperbus steenwol pluggen voor professionele teelt', description: 'Steenwol pluggen met een papieren wikkel van Ellepot FP 12+. Stabiel tijdens de hele opkweek, milieuvriendelijk en direct uitplantbaar.', cta: 'Bekijk de Paper Plug Trays' },
    benefits: {
      title: 'Waarom kiezen voor paperbus steenwol pluggen?',
      items: [
        { title: 'Milieuvriendelijke wikkel', description: 'De papieren wikkel is biologisch afbreekbaar en gemaakt van hernieuwbare houtvezels.' },
        { title: '12+ maanden stabiliteit', description: 'Het FP 12+ vlies behoudt zijn structuur gedurende de hele kweekperiode.' },
        { title: 'Geen transplantatieschok', description: 'Wortels groeien door het papier heen; je plant de complete plug uit zonder de wikkel te verwijderen.' },
        { title: 'Gelijkmatige opkweek', description: 'Steenwol biedt een uniforme water- en luchthuishouding voor een voorspelbare beworteling.' },
        { title: 'Professionele kwaliteit', description: 'Ontwikkeld voor commerciële kwekerijen en professionele glastuinbouw.' },
        { title: 'Twee tray-indelingen', description: 'Kies 84 cellen voor een grotere plug of 104 cellen voor een hogere plantdichtheid.' },
      ],
    },
    why: { title: 'Waarom Lumora?', description: 'Bij Lumora kiezen we bewust: al onze steenwol pluggen zijn gewikkeld in het Ellepot FP 12+ vlies. Zo combineer je de voorspelbare beworteling van steenwol met een wikkel die tijdens een lange opkweek intact blijft.', panelTitle: 'Voordelen van FP 12+', panelItems: ['Langere stabiliteit dan standaard papier', 'Sterke wortelontwikkeling', 'Direct uitplantbaar', 'Consistent groeiresultaat'] },
    formats: { title: 'Beschikbare formaten', intro: 'Beide uitvoeringen worden per complete doos geleverd, met gratis verzending binnen Nederland, België en Duitsland.', facts: [['84', 'cellen per tray · Ø38 × 42 mm'], ['104', 'cellen per tray · Ø32 × 40 mm'], ['8', 'trays per doos (84)'], ['7', 'trays per doos (104)']] },
    applications: { title: 'Toepassingen', items: ['Groenteteelt in kassen', 'Sierteelt en potplanten', 'Boomkwekerijen', 'Kruidenteelt', 'Zaailingen en jonge planten', 'Biologische teelt'] },
    cta: { eyebrow: 'Direct bestellen', title: 'Klaar om over te stappen op paperbus steenwol pluggen?', description: 'Bekijk de Paper Plug Trays 84 en 104 met exacte doosinhoud en bestel direct online.', button: 'Download de productfolder', contact: 'Neem contact op' },
  },
  en: {
    tag: 'Paper pot rockwool plugs',
    subtitle: 'Professional growing solution with Ellepot FP 12+',
    hero: { title: 'Paper pot rockwool plugs for professional cultivation', description: 'Rockwool plugs with an Ellepot FP 12+ paper sleeve. Stable throughout propagation, eco-friendly and ready to plant directly.', cta: 'View the Paper Plug Trays' },
    benefits: {
      title: 'Why choose paper pot rockwool plugs?',
      items: [
        { title: 'Eco-friendly sleeve', description: 'The paper sleeve is biodegradable and made from renewable wood fibres.' },
        { title: '12+ months of stability', description: 'The FP 12+ paper keeps its structure throughout the entire growing period.' },
        { title: 'No transplant shock', description: 'Roots grow through the paper; you plant the complete plug without removing the sleeve.' },
        { title: 'Even propagation', description: 'Rockwool offers a uniform water and air balance for predictable rooting.' },
        { title: 'Professional quality', description: 'Developed for commercial nurseries and professional greenhouse horticulture.' },
        { title: 'Two tray layouts', description: 'Choose 84 cells for a larger plug or 104 cells for a higher plant density.' },
      ],
    },
    why: { title: 'Why Lumora?', description: 'At Lumora we choose deliberately: all our rockwool plugs are wrapped in Ellepot FP 12+ paper. That combines the predictable rooting of rockwool with a sleeve that stays intact during a long propagation period.', panelTitle: 'Benefits of FP 12+', panelItems: ['Longer stability than standard paper', 'Strong root development', 'Ready to plant directly', 'Consistent growing results'] },
    formats: { title: 'Available formats', intro: 'Both versions are supplied by the complete box, with free shipping within the Netherlands, Belgium and Germany.', facts: [['84', 'cells per tray · Ø38 × 42 mm'], ['104', 'cells per tray · Ø32 × 40 mm'], ['8', 'trays per box (84)'], ['7', 'trays per box (104)']] },
    applications: { title: 'Applications', items: ['Vegetable cultivation in greenhouses', 'Ornamental and potted plants', 'Tree nurseries', 'Herb cultivation', 'Seedlings and young plants', 'Organic cultivation'] },
    cta: { eyebrow: 'Order directly', title: 'Ready to switch to paper pot rockwool plugs?', description: 'View Paper Plug Trays 84 and 104 with exact box contents and order directly online.', button: 'Download the product brochure', contact: 'Contact us' },
  },
  de: {
    tag: 'Papiertopf-Steinwollstecker',
    subtitle: 'Professionelle Anbaulösung mit Ellepot FP 12+',
    hero: { title: 'Papiertopf-Steinwollstecker für den professionellen Anbau', description: 'Steinwollstecker mit einer Papierhülle aus Ellepot FP 12+. Stabil während der gesamten Anzucht, umweltfreundlich und direkt auspflanzbar.', cta: 'Paper Plug Trays ansehen' },
    benefits: {
      title: 'Warum Papiertopf-Steinwollstecker wählen?',
      items: [
        { title: 'Umweltfreundliche Hülle', description: 'Die Papierhülle ist biologisch abbaubar und besteht aus erneuerbaren Holzfasern.' },
        { title: '12+ Monate Stabilität', description: 'Das FP 12+ Papier behält seine Struktur während der gesamten Anbauperiode.' },
        { title: 'Kein Transplantationsschock', description: 'Wurzeln wachsen durch das Papier; Sie pflanzen den kompletten Plug aus, ohne die Hülle zu entfernen.' },
        { title: 'Gleichmäßige Anzucht', description: 'Steinwolle bietet einen einheitlichen Wasser- und Lufthaushalt für eine vorhersehbare Bewurzelung.' },
        { title: 'Professionelle Qualität', description: 'Entwickelt für kommerzielle Gärtnereien und den professionellen Gewächshausanbau.' },
        { title: 'Zwei Tray-Aufteilungen', description: 'Wählen Sie 84 Zellen für einen größeren Plug oder 104 Zellen für eine höhere Pflanzendichte.' },
      ],
    },
    why: { title: 'Warum Lumora?', description: 'Bei Lumora entscheiden wir uns bewusst: Alle unsere Steinwollstecker sind in Ellepot FP 12+ Papier gehüllt. So verbinden Sie die vorhersehbare Bewurzelung von Steinwolle mit einer Hülle, die während einer langen Anzucht intakt bleibt.', panelTitle: 'Vorteile von FP 12+', panelItems: ['Längere Stabilität als Standardpapier', 'Starke Wurzelentwicklung', 'Direkt auspflanzbar', 'Konstante Anbauergebnisse'] },
    formats: { title: 'Verfügbare Formate', intro: 'Beide Ausführungen werden im kompletten Karton geliefert, mit kostenlosem Versand in die Niederlande, nach Belgien und Deutschland.', facts: [['84', 'Zellen pro Platte · Ø38 × 42 mm'], ['104', 'Zellen pro Platte · Ø32 × 40 mm'], ['8', 'Platten pro Karton (84)'], ['7', 'Platten pro Karton (104)']] },
    applications: { title: 'Anwendungen', items: ['Gemüseanbau im Gewächshaus', 'Zier- und Topfpflanzen', 'Baumschulen', 'Kräuteranbau', 'Sämlinge und Jungpflanzen', 'Biologischer Anbau'] },
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
    '@type': 'Product',
    name: c.tag,
    description: c.hero.description,
    brand: { '@type': 'Brand', name: 'Lumora Horticulture' },
    category: 'Horticultural Supplies',
    image: `https://lumorahorticulture.nl${products.paperbus.mainImage}`,
    offers: { '@type': 'Offer', availability: 'https://schema.org/InStock', url: `https://lumorahorticulture.nl${localizePathForLocale('/stekpluggen-steenwol', locale)}`, seller: { '@type': 'Organization', name: 'Lumora Horticulture' } },
    additionalProperty: [
      { '@type': 'PropertyValue', name: 'Technology', value: 'Ellepot FP 12+' },
      { '@type': 'PropertyValue', name: 'Stability Period', value: '12+ months' },
    ],
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

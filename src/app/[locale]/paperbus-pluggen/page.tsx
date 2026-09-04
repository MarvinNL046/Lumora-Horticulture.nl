import { generatePageMetadata } from '@/lib/metadata'
import { localizePathForLocale } from '@/lib/url-localizations'
import { serializeJsonLd } from '@/lib/safe-json-ld'
import {
  CheckList,
  ContentCta,
  ContentHero,
  ContentPage,
  ContentSection,
  FeatureGrid,
  SplitSection,
  Prose,
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

// CTR-optimized metadata for Paperbus Pluggen SEO landing page
export async function generateMetadata(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  const metadata = {
    nl: {
      title: 'Wat Zijn Paperbus Pluggen? Papierwikkel Uitgelegd',
      description: 'Wat zijn paperbus pluggen? Lees hoe steenwol en de Ellepot FP 12+ papierwikkel samenwerken. Bekijk de verschillen en kies een tray met 84 of 104 cellen.',
      keywords: ['paperbus pluggen', 'paperbus pluggen kopen', 'paper plug', 'biologisch afbreekbaar', 'duurzaam', 'propagatie pluggen', 'kweekmateriaal', 'glastuinbouw', 'fp 12+']
    },
    en: {
      title: 'What Are Paper Pot Plugs? The Sleeve Explained',
      description: 'Learn how rockwool plugs and the Ellepot FP 12+ paper sleeve work together. Compare materials and choose a tray with 84 or 104 cells.',
      keywords: ['paper pot plugs', 'buy paper pot plugs', 'paper plug', 'biodegradable', 'sustainable', 'propagation plugs', 'cultivation media', 'greenhouse', 'fp 12+']
    },
    de: {
      title: 'Was Sind Papiertopf-Stecker? Papierhülle Erklärt',
      description: 'Wie arbeiten Steinwollstecker und die Ellepot FP 12+ Papierhülle zusammen? Erfahren Sie mehr über das Material und Anzuchtplatten mit 84 oder 104 Zellen.',
      keywords: ['papiertopf plugs', 'papiertopf plugs kaufen', 'papier plugs', 'biologisch abbaubar', 'nachhaltig', 'anzucht plugs', 'anbaumedium', 'gewachshaus', 'fp 12+']
    }
  }

  const localeMeta = metadata[params.locale as keyof typeof metadata] || metadata.nl
  const localePaths = {
    nl: '/paperbus-pluggen/',
    en: '/paper-pot-plugs/',
    de: '/papiertopf-stecker/'
  }

  return generatePageMetadata({
    title: localeMeta.title,
    description: localeMeta.description,
    keywords: localeMeta.keywords,
    locale: params.locale,
    path: localePaths[params.locale as keyof typeof localePaths] || '/paperbus-pluggen/'
  })
}

const content = {
  nl: {
    tag: 'Paperbus pluggen',
    subtitle: 'Steenwol met een papierwikkel',
    hero: {
      title: 'Wat zijn paperbus pluggen?',
      description: 'Een paperbus plug is een stekplug met een papieren wikkel. Bij Lumora bestaat de plug uit steenwol, omhuld met Ellepot FP 12+ papier. De wikkel en het substraat zijn verschillende materialen: de steenwol zelf is niet biologisch afbreekbaar.',
      cta: 'Bekijk de Paper Plug Trays',
    },
    benefits: {
      title: 'Waarom kiezen voor paperbus pluggen?',
      items: [
        { title: 'Papierwikkel en steenwol', description: 'De FP 12+ papierwikkel wordt gemaakt van houtvezels. Een eigenschap van die wikkel geldt niet automatisch voor de steenwol of de tray.' },
        { title: 'Milieuvriendelijk en duurzaam', description: 'Verklein je ecologische voetafdruk met een papieren wikkel in plaats van plastic.' },
        { title: 'Geen transplantatieschok', description: 'Wortels groeien moeiteloos door het papier heen, zodat je de complete plug direct uitplant.' },
        { title: 'Ellepot FP 12+ technologie', description: 'Het FP 12+ vlies biedt meer dan twaalf maanden stabiliteit tijdens een langere opkweekperiode.' },
        { title: 'Optimale waterhuishouding', description: 'Goede water- en luchtdoorlatendheid zorgt voor gezonde wortelontwikkeling en voorkomt overwatering.' },
        { title: 'Bewezen in de praktijk', description: 'Hogere slagingspercentages en snellere aanslag dan bij traditionele propagatiemethoden.' },
      ],
    },
    features: { title: 'Kenmerken', items: ['Hernieuwbare houtvezels', 'FP 12+ vlies voor langdurige stabiliteit', 'Steenwol met een FP 12+ papierwikkel', 'Stem de plug af op je teeltsysteem', 'Optimale wortelontwikkeling', 'Makkelijk te verwerken', 'Verkrijgbaar als tray 84 en tray 104', 'Geleverd per complete doos'] },
    applications: { title: 'Toepassingen', items: ['Groenteteelt in kassen', 'Sierteelt en potplanten', 'Boomkwekerijen', 'Kruidenteelt', 'Biologische teelt', 'Zaailingen en jonge planten'] },
    cta: { eyebrow: 'Direct bestellen', title: 'Start met paperbus pluggen', description: 'Kies Paper Plug Tray 84 of 104 en bestel per complete doos, met gratis verzending binnen Nederland, België en Duitsland.', button: 'Download de brochure', contact: 'Vraag advies' },
  },
  en: {
    tag: 'Paper pot plugs',
    subtitle: 'Rockwool with a paper sleeve',
    hero: {
      title: 'What are paper pot plugs?',
      description: 'A paper pot plug is a propagation plug with a paper sleeve. Lumora uses rockwool wrapped in Ellepot FP 12+ paper. The sleeve and substrate are different materials: rockwool itself is not biodegradable.',
      cta: 'View the Paper Plug Trays',
    },
    benefits: {
      title: 'Why choose paper pot plugs?',
      items: [
        { title: 'Paper sleeve and rockwool', description: 'The FP 12+ paper sleeve is made from wood fibres. A property of the sleeve does not automatically apply to the rockwool or tray.' },
        { title: 'Eco-friendly and sustainable', description: 'Reduce your ecological footprint with a paper sleeve instead of plastic.' },
        { title: 'No transplant shock', description: 'Roots grow effortlessly through the paper, so you plant the complete plug directly.' },
        { title: 'Ellepot FP 12+ technology', description: 'The FP 12+ paper provides more than twelve months of stability during a longer propagation period.' },
        { title: 'Optimal water management', description: 'Good water and air permeability supports healthy root development and prevents overwatering.' },
        { title: 'Proven in practice', description: 'Higher success rates and faster establishment than traditional propagation methods.' },
      ],
    },
    features: { title: 'Features', items: ['Renewable wood fibres', 'FP 12+ paper for long-term stability', 'Rockwool with an FP 12+ paper sleeve', 'Match the plug to your growing system', 'Optimal root development', 'Easy to handle', 'Available as tray 84 and tray 104', 'Supplied by the complete box'] },
    applications: { title: 'Applications', items: ['Vegetable cultivation in greenhouses', 'Ornamental and potted plants', 'Tree nurseries', 'Herb cultivation', 'Organic cultivation', 'Seedlings and young plants'] },
    cta: { eyebrow: 'Order directly', title: 'Get started with paper pot plugs', description: 'Choose Paper Plug Tray 84 or 104 and order by the complete box, with free shipping within the Netherlands, Belgium and Germany.', button: 'Download the brochure', contact: 'Ask for advice' },
  },
  de: {
    tag: 'Papiertopf-Plugs',
    subtitle: 'Steinwolle mit einer Papierhülle',
    hero: {
      title: 'Was sind Papiertopf-Stecker?',
      description: 'Ein Papiertopf-Stecker ist ein Anzuchtstecker mit Papierhülle. Lumora verwendet Steinwolle in Ellepot FP 12+ Papier. Hülle und Substrat sind unterschiedliche Materialien: Die Steinwolle selbst ist nicht biologisch abbaubar.',
      cta: 'Paper Plug Trays ansehen',
    },
    benefits: {
      title: 'Warum Papiertopf-Plugs wählen?',
      items: [
        { title: 'Papierhülle und Steinwolle', description: 'Die FP 12+ Papierhülle besteht aus Holzfasern. Eine Eigenschaft der Hülle gilt nicht automatisch für die Steinwolle oder die Anzuchtplatte.' },
        { title: 'Umweltfreundlich und nachhaltig', description: 'Verkleinern Sie Ihren ökologischen Fußabdruck mit einer Papierhülle statt Kunststoff.' },
        { title: 'Kein Transplantationsschock', description: 'Wurzeln wachsen mühelos durch das Papier, sodass Sie den kompletten Plug direkt auspflanzen.' },
        { title: 'Ellepot FP 12+ Technologie', description: 'Das FP 12+ Papier bietet mehr als zwölf Monate Stabilität während einer längeren Anzuchtphase.' },
        { title: 'Optimaler Wasserhaushalt', description: 'Gute Wasser- und Luftdurchlässigkeit fördert eine gesunde Wurzelentwicklung und verhindert Überwässerung.' },
        { title: 'In der Praxis bewährt', description: 'Höhere Erfolgsraten und schnelleres Anwachsen als bei traditionellen Vermehrungsmethoden.' },
      ],
    },
    features: { title: 'Merkmale', items: ['Erneuerbare Holzfasern', 'FP 12+ Papier für langfristige Stabilität', 'Steinwolle mit einer FP 12+ Papierhülle', 'Stecker auf das Anbausystem abstimmen', 'Optimale Wurzelentwicklung', 'Einfach zu verarbeiten', 'Erhältlich als Tray 84 und Tray 104', 'Lieferung im kompletten Karton'] },
    applications: { title: 'Anwendungen', items: ['Gemüseanbau im Gewächshaus', 'Zier- und Topfpflanzen', 'Baumschulen', 'Kräuteranbau', 'Biologischer Anbau', 'Sämlinge und Jungpflanzen'] },
    cta: { eyebrow: 'Direkt bestellen', title: 'Starten Sie mit Papiertopf-Plugs', description: 'Wählen Sie Paper Plug Tray 84 oder 104 und bestellen Sie im kompletten Karton, mit kostenlosem Versand in die Niederlande, nach Belgien und Deutschland.', button: 'Broschüre herunterladen', contact: 'Beratung anfragen' },
  },
} as const

// SEO Landing page for Paperbus Pluggen
export default async function PaperbusPluggenPage(props: { params: Promise<{ locale: string }> }) {
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
    url: 'https://lumorahorticulture.nl' + localizePathForLocale('/paperbus-pluggen', locale),
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
        image={products.paperbus.mainImage}
        imageAlt={products.paperbus.mainImageAlt}
        caption={{ small: products.paperbus.name, strong: products.paperbus.variants.map((v) => v.label).join(' · ') }}
      />

      <ContentSection eyebrow={c.tag} title={c.benefits.title} soft>
        <FeatureGrid items={c.benefits.items.map((item) => ({ title: item.title, text: item.description }))} />
      </ContentSection>

      <SplitSection
        eyebrow={c.features.title}
        title={c.features.title}
        image={products.paperbus.usageImage ?? products.paperbus.secondaryImage}
        imageAlt={products.paperbus.usageImageAlt ?? products.paperbus.secondaryImageAlt}
        imageLabel={products.paperbus.name}
        reverse
      >
        <Prose><p>{c.hero.description}</p></Prose>
        <div style={{ marginTop: 22 }}>
          <CheckList items={[...c.features.items]} />
        </div>
      </SplitSection>

      <ContentSection eyebrow={c.tag} title={c.applications.title} soft>
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

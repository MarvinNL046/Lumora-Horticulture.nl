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
      title: 'Paperbus Pluggen | 100% Biologisch Afbreekbaar | Gratis Verzending',
      description: 'Duurzame paperbus pluggen met FP 12+ technologie. ✓ 100% biologisch afbreekbaar ✓ Geen transplantatieschok ✓ Gratis verzending NL/BE/DE ✓ Op voorraad. Bestel direct bij Lumora.',
      keywords: ['paperbus pluggen', 'paperbus pluggen kopen', 'paper plug', 'biologisch afbreekbaar', 'duurzaam', 'propagatie pluggen', 'kweekmateriaal', 'glastuinbouw', 'fp 12+']
    },
    en: {
      title: 'Paper Pot Plugs | 100% Biodegradable | Free Shipping',
      description: 'Sustainable paper pot plugs with FP 12+ technology. ✓ 100% biodegradable ✓ No transplant shock ✓ Free shipping NL/BE/DE ✓ In stock. Order directly from Lumora.',
      keywords: ['paper pot plugs', 'buy paper pot plugs', 'paper plug', 'biodegradable', 'sustainable', 'propagation plugs', 'cultivation media', 'greenhouse', 'fp 12+']
    },
    de: {
      title: 'Papiertopf Plugs | 100% Biologisch Abbaubar | Kostenloser Versand',
      description: 'Nachhaltige Papiertopf-Plugs mit FP 12+ Technologie. ✓ 100% biologisch abbaubar ✓ Kein Transplantationsschock ✓ Kostenloser Versand NL/BE/DE ✓ Auf Lager. Direkt bei Lumora bestellen.',
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
    subtitle: '100% biologisch afbreekbaar en duurzaam',
    hero: {
      title: 'Paperbus pluggen: de duurzame keuze voor professionele kwekerijen',
      description: 'Ontdek de voordelen van paperbus pluggen met Ellepot FP 12+ technologie. Volledig biologisch afbreekbaar, duurzaam en geschikt voor elke kweektoepassing.',
      cta: 'Bekijk de Paper Plug Trays',
    },
    benefits: {
      title: 'Waarom kiezen voor paperbus pluggen?',
      items: [
        { title: '100% biologisch afbreekbaar', description: 'Paperbus pluggen zijn volledig biologisch afbreekbaar en gemaakt van hernieuwbare houtvezels, ideaal voor duurzame teelt.' },
        { title: 'Milieuvriendelijk en duurzaam', description: 'Verklein je ecologische voetafdruk met een papieren wikkel in plaats van plastic.' },
        { title: 'Geen transplantatieschok', description: 'Wortels groeien moeiteloos door het papier heen, zodat je de complete plug direct uitplant.' },
        { title: 'Ellepot FP 12+ technologie', description: 'Het FP 12+ vlies biedt meer dan twaalf maanden stabiliteit tijdens een langere opkweekperiode.' },
        { title: 'Optimale waterhuishouding', description: 'Goede water- en luchtdoorlatendheid zorgt voor gezonde wortelontwikkeling en voorkomt overwatering.' },
        { title: 'Bewezen in de praktijk', description: 'Hogere slagingspercentages en snellere aanslag dan bij traditionele propagatiemethoden.' },
      ],
    },
    features: { title: 'Kenmerken', items: ['Hernieuwbare houtvezels', 'FP 12+ vlies voor langdurige stabiliteit', 'Geen plastic componenten', 'Geschikt voor biologische teelt', 'Optimale wortelontwikkeling', 'Makkelijk te verwerken', 'Verkrijgbaar als tray 84 en tray 104', 'Geleverd per complete doos'] },
    applications: { title: 'Toepassingen', items: ['Groenteteelt in kassen', 'Sierteelt en potplanten', 'Boomkwekerijen', 'Kruidenteelt', 'Biologische teelt', 'Zaailingen en jonge planten'] },
    cta: { eyebrow: 'Direct bestellen', title: 'Start met paperbus pluggen', description: 'Kies Paper Plug Tray 84 of 104 en bestel per complete doos, met gratis verzending binnen Nederland, België en Duitsland.', button: 'Download de brochure', contact: 'Vraag advies' },
  },
  en: {
    tag: 'Paper pot plugs',
    subtitle: '100% biodegradable and sustainable',
    hero: {
      title: 'Paper pot plugs: the sustainable choice for professional nurseries',
      description: 'Discover the benefits of paper pot plugs with Ellepot FP 12+ technology. Fully biodegradable, sustainable and suitable for any growing application.',
      cta: 'View the Paper Plug Trays',
    },
    benefits: {
      title: 'Why choose paper pot plugs?',
      items: [
        { title: '100% biodegradable', description: 'Paper pot plugs are fully biodegradable and made from renewable wood fibres, ideal for sustainable cultivation.' },
        { title: 'Eco-friendly and sustainable', description: 'Reduce your ecological footprint with a paper sleeve instead of plastic.' },
        { title: 'No transplant shock', description: 'Roots grow effortlessly through the paper, so you plant the complete plug directly.' },
        { title: 'Ellepot FP 12+ technology', description: 'The FP 12+ paper provides more than twelve months of stability during a longer propagation period.' },
        { title: 'Optimal water management', description: 'Good water and air permeability supports healthy root development and prevents overwatering.' },
        { title: 'Proven in practice', description: 'Higher success rates and faster establishment than traditional propagation methods.' },
      ],
    },
    features: { title: 'Features', items: ['Renewable wood fibres', 'FP 12+ paper for long-term stability', 'No plastic components', 'Suitable for organic cultivation', 'Optimal root development', 'Easy to handle', 'Available as tray 84 and tray 104', 'Supplied by the complete box'] },
    applications: { title: 'Applications', items: ['Vegetable cultivation in greenhouses', 'Ornamental and potted plants', 'Tree nurseries', 'Herb cultivation', 'Organic cultivation', 'Seedlings and young plants'] },
    cta: { eyebrow: 'Order directly', title: 'Get started with paper pot plugs', description: 'Choose Paper Plug Tray 84 or 104 and order by the complete box, with free shipping within the Netherlands, Belgium and Germany.', button: 'Download the brochure', contact: 'Ask for advice' },
  },
  de: {
    tag: 'Papiertopf-Plugs',
    subtitle: '100 % biologisch abbaubar und nachhaltig',
    hero: {
      title: 'Papiertopf-Plugs: die nachhaltige Wahl für professionelle Gärtnereien',
      description: 'Entdecken Sie die Vorteile von Papiertopf-Plugs mit Ellepot FP 12+ Technologie. Vollständig biologisch abbaubar, nachhaltig und für jede Anbauanwendung geeignet.',
      cta: 'Paper Plug Trays ansehen',
    },
    benefits: {
      title: 'Warum Papiertopf-Plugs wählen?',
      items: [
        { title: '100 % biologisch abbaubar', description: 'Papiertopf-Plugs sind vollständig biologisch abbaubar und bestehen aus erneuerbaren Holzfasern, ideal für nachhaltigen Anbau.' },
        { title: 'Umweltfreundlich und nachhaltig', description: 'Verkleinern Sie Ihren ökologischen Fußabdruck mit einer Papierhülle statt Kunststoff.' },
        { title: 'Kein Transplantationsschock', description: 'Wurzeln wachsen mühelos durch das Papier, sodass Sie den kompletten Plug direkt auspflanzen.' },
        { title: 'Ellepot FP 12+ Technologie', description: 'Das FP 12+ Papier bietet mehr als zwölf Monate Stabilität während einer längeren Anzuchtphase.' },
        { title: 'Optimaler Wasserhaushalt', description: 'Gute Wasser- und Luftdurchlässigkeit fördert eine gesunde Wurzelentwicklung und verhindert Überwässerung.' },
        { title: 'In der Praxis bewährt', description: 'Höhere Erfolgsraten und schnelleres Anwachsen als bei traditionellen Vermehrungsmethoden.' },
      ],
    },
    features: { title: 'Merkmale', items: ['Erneuerbare Holzfasern', 'FP 12+ Papier für langfristige Stabilität', 'Keine Kunststoffkomponenten', 'Geeignet für biologischen Anbau', 'Optimale Wurzelentwicklung', 'Einfach zu verarbeiten', 'Erhältlich als Tray 84 und Tray 104', 'Lieferung im kompletten Karton'] },
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
    '@type': 'Product',
    name: c.tag,
    description: c.hero.description,
    brand: { '@type': 'Brand', name: 'Lumora Horticulture' },
    category: 'Horticultural Supplies',
    image: `https://lumorahorticulture.nl${products.paperbus.mainImage}`,
    offers: { '@type': 'Offer', availability: 'https://schema.org/InStock', url: `https://lumorahorticulture.nl${localizePathForLocale('/stekpluggen-steenwol', locale)}` },
    additionalProperty: [
      { '@type': 'PropertyValue', name: 'Biodegradable', value: 'Yes' },
      { '@type': 'PropertyValue', name: 'Technology', value: 'Ellepot FP 12+' },
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

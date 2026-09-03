import ContactForm from '@/components/ContactForm'
import { generatePageMetadata } from '@/lib/metadata'
import { localizePathForLocale } from '@/lib/url-localizations'
import { serializeJsonLd } from '@/lib/safe-json-ld'
import { ContentHero, ContentPage, contentStyles as styles } from '@/app/lumora-premium/_components/ContentPage'
import { MessageIcon } from '@/app/lumora-premium/_components/Icons'
import { resolveStorefrontLocale } from '@/app/lumora-premium/_components/storefront-localization'

// Generate static params for locales
export function generateStaticParams() {
  return [
    { locale: 'nl' },
    { locale: 'en' },
    { locale: 'de' }
  ]
}

const uiCopy = {
  nl: { formTitle: 'Stuur ons een bericht', formIntro: 'We reageren doorgaans binnen één werkdag.', optional: 'optioneel', privacy: 'Je gegevens gebruiken we alleen om je vraag te beantwoorden.', web: 'lumorahorticulture.nl', reply: 'Reactie binnen één werkdag' },
  en: { formTitle: 'Send us a message', formIntro: 'We usually reply within one business day.', optional: 'optional', privacy: 'We only use your details to answer your question.', web: 'lumorahorticulture.nl/en', reply: 'Reply within one business day' },
  de: { formTitle: 'Senden Sie uns eine Nachricht', formIntro: 'Wir antworten in der Regel innerhalb eines Werktags.', optional: 'optional', privacy: 'Wir verwenden Ihre Angaben nur zur Beantwortung Ihrer Anfrage.', web: 'lumorahorticulture.nl/de', reply: 'Antwort innerhalb eines Werktags' },
} as const

// CTR-optimized metadata for contact page
export async function generateMetadata(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  const metadata = {
    nl: {
      title: 'Contact & productadvies',
      description: 'Neem contact op met Lumora voor persoonlijk advies over Paper Plug Trays 84 en 104 of NeemXPRO. Reactie binnen één werkdag.',
      keywords: ['contact lumora', 'productadvies paper plug trays', 'stekpluggen steenwol bestellen', 'NeemXPRO advies', 'tuinbouw leverancier contact']
    },
    en: {
      title: 'Contact & Product Advice',
      description: 'Contact Lumora for personal advice about Paper Plug Trays 84 and 104 or NeemXPRO.',
      keywords: ['contact lumora', 'paper plug trays quote', 'B2B quote', 'horticulture supplier contact', 'wholesale inquiry']
    },
    de: {
      title: 'Kontakt & Produktberatung',
      description: 'Kontaktieren Sie Lumora für persönliche Beratung zu Paper Plug Trays 84 und 104 oder NeemXPRO.',
      keywords: ['kontakt lumora', 'Paper Plug Trays Angebot', 'B2B Angebot', 'Gartenbau Lieferant Kontakt', 'Grosshandel Anfrage']
    }
  }

  const localeMeta = metadata[params.locale as keyof typeof metadata] || metadata.nl
  const localePaths = {
    nl: '/contact/',
    en: '/contact/',
    de: '/kontakt/'
  }

  return generatePageMetadata({
    title: localeMeta.title,
    description: localeMeta.description,
    keywords: localeMeta.keywords,
    locale: params.locale,
    path: localePaths[params.locale as keyof typeof localePaths] || '/contact/'
  })
}

function MailIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 6h16v12H4z" /><path d="m4 7 8 6 8-6" /></svg>
}

function GlobeIcon() {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" /></svg>
}

export default async function ContactPage(props: { params: Promise<{ locale: string }> }) {
  const params = await props.params;
  const locale = resolveStorefrontLocale(params.locale)
  const messages = (await import(`../../../messages/${locale}/common.json`)).default
  const t = messages.contact
  const ui = uiCopy[locale]

  const formTranslations = {
    name: t.form.name,
    company: t.form.company,
    email: t.form.email,
    phone: t.form.phone,
    message: t.form.message,
    submit: t.form.submit,
    success: t.form.success,
    error: t.form.error,
    namePlaceholder: locale === 'de' ? 'Max Mustermann' : locale === 'nl' ? 'Jan de Vries' : 'John Doe',
    companyPlaceholder: locale === 'de' ? 'Unternehmen GmbH' : locale === 'nl' ? 'Bedrijfsnaam' : 'Company Ltd.',
    messagePlaceholder: locale === 'de' ? 'Wie können wir Ihnen helfen?' : locale === 'nl' ? 'Waarmee kunnen we je helpen?' : 'How can we help you?',
    requiredError: locale === 'de' ? 'Füllen Sie bitte alle Pflichtfelder aus.' : locale === 'nl' ? 'Vul alle verplichte velden in.' : 'Please fill in all required fields.',
    submitting: locale === 'de' ? 'Wird gesendet…' : locale === 'nl' ? 'Bezig met verzenden…' : 'Submitting…',
    successFollowup: locale === 'de' ? 'Wir melden uns so schnell wie möglich bei Ihnen.' : locale === 'nl' ? 'We nemen zo snel mogelijk contact met je op.' : "We'll get back to you as soon as possible.",
    retryError: locale === 'de' ? 'Versuchen Sie es später erneut.' : locale === 'nl' ? 'Probeer het later opnieuw.' : 'Please try again later.',
    optional: ui.optional,
    privacyNote: ui.privacy,
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: t.title.main,
    url: `https://lumorahorticulture.nl${localizePathForLocale('/contact', locale)}`,
    mainEntity: {
      '@type': 'Organization',
      name: 'Lumora Horticulture',
      email: 'info@lumorahorticulture.com',
      url: 'https://lumorahorticulture.nl',
    },
  }

  return (
    <ContentPage>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }} />

      <ContentHero
        locale={locale}
        breadcrumb={t.title.tag}
        eyebrow={t.title.tag}
        title={t.title.main}
        lead={t.title.subtitle}
      />

      <section className={styles.section} style={{ paddingTop: 0 }}>
        <div className={`${styles.container} ${styles.contactGrid}`}>
          <aside className={styles.contactCard}>
            <h2>Lumora Horticulture</h2>
            <div className={styles.contactRow}>
              <span><MailIcon /></span>
              <div>
                <small>{t.info.email.title}</small>
                <a href="mailto:info@lumorahorticulture.com">info@lumorahorticulture.com</a>
              </div>
            </div>
            <div className={styles.contactRow}>
              <span><MessageIcon /></span>
              <div>
                <small>{t.info.whatsapp.title}</small>
                <a href="https://wa.me/31638382564" target="_blank" rel="noopener noreferrer">+31 6 38 38 25 64</a>
              </div>
            </div>
            <div className={styles.contactRow}>
              <span><GlobeIcon /></span>
              <div>
                <small>{t.info.web.title}</small>
                <strong>{ui.web}</strong>
              </div>
            </div>
            <div className={styles.contactNote}>
              <h3>{t.info.collaboration.title}</h3>
              <p>{t.info.collaboration.description}</p>
            </div>
          </aside>

          <div>
            <div className={styles.sectionHeading}>
              <span className={styles.eyebrow}>{ui.reply}</span>
              <h2>{ui.formTitle}</h2>
              <p>{ui.formIntro}</p>
            </div>
            <ContactForm translations={formTranslations} />
          </div>
        </div>
      </section>
    </ContentPage>
  )
}

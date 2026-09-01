import Image from 'next/image'
import Link from 'next/link'
import { ArrowRightIcon, CheckIcon, LockIcon } from '../_components/Icons'
import { PaymentLogos } from '../_components/PaymentLogos'
import { formatPrice } from '../_data/products'
import { calculatePaperbusPromotion } from '@/lib/paperbus-promo'
import styles from '../storefront.module.css'

type AfrekenenPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

function readParam(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value
}

export default async function AfrekenenPage({ searchParams }: AfrekenenPageProps) {
  const params = await searchParams
  const isBundleAction = readParam(params.action) === 'stekpluggen-3-voor-180'
  const is104 = readParam(params.variant) === 'tray-104'
  const parsedQuantity = Number.parseInt(readParam(params.quantity) ?? '', 10)
  const quantity = Number.isFinite(parsedQuantity) ? Math.min(100, Math.max(1, parsedQuantity)) : 3
  const unitPrice = is104 ? 80 : 84
  const productSlug = is104 ? 'paper-plug-tray-104' : 'paper-plug-tray-84'
  const promotion = calculatePaperbusPromotion(productSlug, unitPrice, quantity)
  const bundleTotal = promotion.total
  const regularTotal = promotion.regularTotal
  const cartQuery = isBundleAction
    ? `?action=stekpluggen-3-voor-180&variant=${is104 ? 'tray-104' : 'tray-84'}&quantity=${quantity}`
    : ''

  return (
    <main className={styles.checkoutPage}>
      <div className={styles.checkoutContainer}>
        <div className={styles.checkoutSteps} aria-label="Voortgang afrekenen">
          <span className={styles.checkoutStepActive}><small>1</small> Gegevens</span>
          <i />
          <span><small>2</small> Bezorging</span>
          <i />
          <span><small>3</small> Betaling</span>
        </div>

        <div className={styles.checkoutIntro}>
          <span className={styles.eyebrow}>Afrekenen</span>
          <h1>Waar bezorgen we je bestelling?</h1>
          <p>Vul je contact- en bezorggegevens in. Een account is niet nodig.</p>
        </div>

        <div className={styles.checkoutLayout}>
          <form className={styles.checkoutForm}>
            <section className={styles.formSection} id="contactgegevens">
              <div className={styles.formSectionHeading}><span>01</span><div><h2>Contactgegevens</h2><p>Voor je orderbevestiging en bezorgupdates.</p></div></div>
              <div className={styles.formGrid}>
                <label className={styles.fieldFull}><span>E-mailadres</span><input type="email" autoComplete="email" placeholder="naam@bedrijf.nl" /></label>
                <label><span>Voornaam</span><input type="text" autoComplete="given-name" placeholder="Voornaam" /></label>
                <label><span>Achternaam</span><input type="text" autoComplete="family-name" placeholder="Achternaam" /></label>
                <label className={styles.fieldFull}><span>Telefoonnummer <small>optioneel</small></span><input type="tel" autoComplete="tel" placeholder="Voor vragen over de bezorging" /></label>
              </div>
            </section>

            <section className={styles.formSection}>
              <div className={styles.formSectionHeading}><span>02</span><div><h2>Bezorgadres</h2><p>We tonen de bezorgopties voor dit adres in de volgende stap.</p></div></div>
              <div className={styles.formGrid}>
                <label className={styles.fieldWide}><span>Straat</span><input type="text" autoComplete="street-address" placeholder="Straatnaam" /></label>
                <label><span>Huisnummer</span><input type="text" placeholder="12 A" /></label>
                <label><span>Postcode</span><input type="text" autoComplete="postal-code" placeholder="1234 AB" /></label>
                <label className={styles.fieldWide}><span>Plaats</span><input type="text" autoComplete="address-level2" placeholder="Plaats" /></label>
                <label className={styles.fieldFull}><span>Land</span><select defaultValue="NL" autoComplete="country"><option value="NL">Nederland</option><option value="BE">België</option><option value="DE">Duitsland</option></select></label>
              </div>
            </section>

            <button className={styles.formContinue} id="bestelling-plaatsen" type="button">
              {isBundleAction ? `Naar bezorging · ${formatPrice(bundleTotal)}` : 'Naar bezorging'} <ArrowRightIcon />
            </button>
            <div className={styles.legalCopy}>
              <span>Door verder te gaan accepteer je:</span>
              <span className={styles.legalActions}>
                <Link href="/terms">Algemene voorwaarden</Link>
                <Link href="/retourbeleid">Retourbeleid</Link>
              </span>
            </div>
          </form>

          <aside className={styles.checkoutSummary}>
            <div className={styles.checkoutSummaryHeading}><span>Jouw bestelling</span><Link href={`/lumora-premium/winkelmand${cartQuery}`}>Wijzigen</Link></div>
            {isBundleAction ? (
              <>
                <div className={styles.checkoutProduct}>
                  <span className={styles.checkoutProductImage}><Image src={is104 ? '/productAfbeeldingen/stekpluggen/stekpluggen-steenwol-104-tray.webp' : '/productAfbeeldingen/stekpluggen/stekpluggen-steenwol-84-tray-front.webp'} alt="" fill sizes="64px" /></span>
                  <span><strong>Stekpluggen Steenwol {is104 ? '104' : '84'}</strong><small>Actiebundel · {quantity} dozen · per doos {is104 ? '7 trays / 728 cellen' : '8 trays / 672 cellen'}</small></span>
                  <strong>{formatPrice(bundleTotal)}</strong>
                </div>
                {promotion.eligible && <div className={styles.checkoutPromoApplied}><CheckIcon /><span><strong>3-voor-€180 actie toegepast</strong><small>Verzending inbegrepen</small></span></div>}
                <div className={styles.checkoutTotals}>
                  <span><small>Subtotaal</small><strong>{formatPrice(regularTotal)}</strong></span>
                  {promotion.discount > 0 && <span className={styles.checkoutDiscount}><small>3-voor-€180 actie</small><strong>− {formatPrice(promotion.discount)}</strong></span>}
                  <span><small>Verzending</small><strong>Inbegrepen</strong></span>
                  <span><b>Totaal</b><b>{formatPrice(bundleTotal)}</b></span>
                </div>
              </>
            ) : (
              <>
                <div className={styles.checkoutProduct}>
                  <span className={styles.checkoutProductImage}><Image src="/productAfbeeldingen/stekpluggen/stekpluggen-steenwol-84-tray-front.webp" alt="" fill sizes="64px" /></span>
                  <span><strong>Stekpluggen Steenwol 84</strong><small>1 doos · 8 trays · 672 cellen</small></span>
                  <strong>€ 84,00</strong>
                </div>
                <div className={styles.checkoutProduct}>
                  <span className={`${styles.checkoutProductImage} ${styles.checkoutProductNeemx}`}><Image src="/productAfbeeldingen/neemxpro/neemx-pro-assortiment-travertijn-neem-bloesem.webp" alt="" fill sizes="64px" /></span>
                  <span><strong>NeemX Pro</strong><small>10 ml · 1 stuk</small></span>
                  <strong>€ 24,95</strong>
                </div>
                <div className={styles.checkoutTotals}>
                  <span><small>Subtotaal</small><strong>€ 108,95</strong></span>
                  <span><small>Verzending</small><strong>Inbegrepen</strong></span>
                  <span><b>Totaal</b><b>€ 108,95</b></span>
                </div>
              </>
            )}
            <a className={styles.summaryAction} href="#contactgegevens">Vul je gegevens in <ArrowRightIcon /></a>
            <div className={styles.checkoutSecurity}>
              <LockIcon />
              <span>
                <strong>Veilig online betalen</strong>
                <PaymentLogos />
                <small>Je kiest je betaalmethode na controle van je bestelling.</small>
              </span>
            </div>
            <div className={styles.checkoutSupportActions}>
              <Link className={styles.checkoutReturn} href="/retourbeleid"><CheckIcon /> 14 dagen bedenktijd</Link>
              <a className={styles.checkoutHelp} href="mailto:info@lumorahorticulture.com">Contact &amp; hulp</a>
            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}

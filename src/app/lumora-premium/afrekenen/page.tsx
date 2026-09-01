import Image from 'next/image'
import Link from 'next/link'
import { ArrowRightIcon, CheckIcon, LockIcon } from '../_components/Icons'
import styles from '../storefront.module.css'

export default function AfrekenenPage() {
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

            <button className={styles.formContinue} id="bestelling-plaatsen" type="button">Naar bezorging <ArrowRightIcon /></button>
            <div className={styles.legalCopy}>
              <span>Door verder te gaan accepteer je:</span>
              <span className={styles.legalActions}>
                <Link href="/terms">Algemene voorwaarden</Link>
                <Link href="/return-policy">Retourbeleid</Link>
              </span>
            </div>
          </form>

          <aside className={styles.checkoutSummary}>
            <div className={styles.checkoutSummaryHeading}><span>Jouw bestelling</span><Link href="/lumora-premium/winkelmand">Wijzigen</Link></div>
            <div className={styles.checkoutProduct}>
              <span className={styles.checkoutProductImage}><Image src="/productAfbeeldingen/trays/tray84/tray84-pluggen-transparant1.webp" alt="" fill sizes="64px" /></span>
              <span><strong>Stekpluggen Steenwol 84</strong><small>Paperbus · 84 stekpluggen per tray · 1 tray</small></span>
              <strong>€ 84,00</strong>
            </div>
            <div className={styles.checkoutProduct}>
              <span className={`${styles.checkoutProductImage} ${styles.checkoutProductNeemx}`}><Image src="/productAfbeeldingen/generated/neemx-clean-packshot-v1.png" alt="" fill sizes="64px" /></span>
              <span><strong>NeemX Pro</strong><small>10 ml · 1 stuk</small></span>
              <strong>€ 24,95</strong>
            </div>
            <div className={styles.checkoutTotals}>
              <span><small>Subtotaal</small><strong>€ 108,95</strong></span>
              <span><small>Verzending</small><strong>Gratis</strong></span>
              <span><b>Totaal</b><b>€ 108,95</b></span>
            </div>
            <a className={styles.summaryAction} href="#contactgegevens">Vul je gegevens in <ArrowRightIcon /></a>
            <div className={styles.checkoutSecurity}><LockIcon /><span><strong>Betaling via Mollie</strong><small>Je kiest je betaalmethode na controle van je bestelling.</small></span></div>
            <div className={styles.checkoutSupportActions}>
              <Link className={styles.checkoutReturn} href="/return-policy"><CheckIcon /> 14 dagen bedenktijd</Link>
              <a className={styles.checkoutHelp} href="mailto:info@lumorahorticulture.com">Contact &amp; hulp</a>
            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}

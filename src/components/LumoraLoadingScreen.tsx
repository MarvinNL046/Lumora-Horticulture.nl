import Image from 'next/image'
import styles from './LumoraLoadingScreen.module.css'

export default function LumoraLoadingScreen() {
  return (
    <div className={styles.screen} role="status" aria-live="polite" aria-label="Pagina wordt geladen">
      <div className={styles.content}>
        <div className={styles.logoFrame} aria-hidden="true">
          <Image
            className={styles.logo}
            src="/brand/lumora-horticulture-logo.avif"
            alt=""
            width={66}
            height={66}
            priority
          />
        </div>
        <p className={styles.eyebrow}>Lumora Horticulture</p>
        <p className={styles.title}>Even geduld.</p>
        <p className={styles.message}>De volgende pagina wordt voor je klaargezet.</p>
        <div className={styles.track} aria-hidden="true">
          <span className={styles.bar} />
        </div>
      </div>
    </div>
  )
}

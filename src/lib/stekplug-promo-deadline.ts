export const STEKPLUG_PROMO_LAST_DAY = '2026-09-15'

type PromoLocale = 'nl' | 'en' | 'de'

const dates = {
  nl: 'geldig t/m 15 september 2026',
  en: 'valid through 15 September 2026',
  de: 'gültig bis einschließlich 15. September 2026',
}

// Compare calendar days in the shop's timezone, regardless of the visitor's location.
export function stekplugPromoDeadline(locale: PromoLocale, now?: Date): string {
  if (!now) return dates[locale]
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/Amsterdam', year: 'numeric', month: '2-digit', day: '2-digit',
  }).formatToParts(now)
  const part = (type: string) => parts.find((value) => value.type === type)!.value
  const today = Date.UTC(Number(part('year')), Number(part('month')) - 1, Number(part('day')))
  const days = Math.round((Date.parse(STEKPLUG_PROMO_LAST_DAY) - today) / 86_400_000)

  if (days < 0) return { nl: 'Actie afgelopen', en: 'Offer ended', de: 'Aktion beendet' }[locale]
  const countdown = days === 0
    ? { nl: 'Laatste actiedag', en: 'Last day of the offer', de: 'Letzter Aktionstag' }[locale]
    : {
      nl: `Nog ${days} ${days === 1 ? 'dag' : 'dagen'}`,
      en: `${days} ${days === 1 ? 'day' : 'days'} left`,
      de: `Noch ${days} ${days === 1 ? 'Tag' : 'Tage'}`,
    }[locale]
  return `${countdown} — ${dates[locale]}`
}

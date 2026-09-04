export const GOOGLE_TAG_ID = 'GT-P8Q289LQ'
export const GA4_MEASUREMENT_ID = 'G-KBWMQY1NRL'
export const META_PIXEL_IDS = ['1537235201740065', '2680887955624246'] as const

type PixelQueue = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void
  queue: unknown[][]
  push: PixelQueue
  loaded: boolean
  version: string
}

declare global {
  interface Window {
    lumoraGoogleInitialized?: boolean
    lumoraMetaInitialized?: boolean
    _fbq?: PixelQueue
  }
}

export function trackingAllowed() {
  return typeof window !== 'undefined' && !/(^|\/)checkout(?:\/|$)/.test(window.location.pathname)
}

// Small command queues are available before either SDK downloads.
// Event helpers can initialize them before React effects; remounts are safe.
export function initializeGoogleTracking() {
  if (!trackingAllowed() || window.lumoraGoogleInitialized) return
  window.dataLayer = window.dataLayer || []
  window.gtag = window.gtag || function () {
    // Google's documented queue format uses an Arguments object.
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments)
  }
  window.lumoraGoogleInitialized = true
  window.gtag('js', new Date())
  // GT-P8Q289LQ and AW-17631948540 identify the same Ads tag.
  // GA4 is separate and still needs its own configuration.
  window.gtag('config', GOOGLE_TAG_ID)
  window.gtag('config', GA4_MEASUREMENT_ID)
}

export function initializeMetaTracking() {
  if (!trackingAllowed() || window.lumoraMetaInitialized) return
  if (!window.fbq) {
    const queue = function (...args: unknown[]) {
      if (queue.callMethod) queue.callMethod(...args)
      else queue.queue.push(args)
    } as PixelQueue
    queue.queue = []
    queue.push = queue
    queue.loaded = true
    queue.version = '2.0'
    window.fbq = queue
    window._fbq = window._fbq || queue
  }
  window.lumoraMetaInitialized = true
  for (const id of META_PIXEL_IDS) window.fbq('init', id)
  window.fbq('track', 'PageView')
}

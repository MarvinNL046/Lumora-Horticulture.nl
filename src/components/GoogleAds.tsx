import Script from 'next/script'

// Google tag IDs. The GT-P8Q289LQ Google Tag is the unified loader; the
// G-KBWMQY1NRL GA4 property + AW-17631948540 Ads account are configured
// here as explicit destinations so events land regardless of GTM linkage.
// GA4 stream-ID 14403486998 if Google asks for it.
const GA4_MEASUREMENT_ID = 'G-KBWMQY1NRL';
const GOOGLE_TAG_ID = 'GT-P8Q289LQ';
const GOOGLE_ADS_ID = 'AW-17631948540';

export default function GoogleAds() {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_TAG_ID}`}
        strategy="lazyOnload"
      />
      <Script id="google-analytics" strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          // Google Tag (unified loader — surfaces in Tag Assistant)
          gtag('config', '${GOOGLE_TAG_ID}');

          // GA4 — analytics destination. Receives view_item, add_to_cart,
          // begin_checkout, purchase via lib/google-ads.ts ecom helpers.
          gtag('config', '${GA4_MEASUREMENT_ID}');

          // Google Ads — conversion + remarketing
          gtag('config', '${GOOGLE_ADS_ID}');
        `}
      </Script>
    </>
  )
}

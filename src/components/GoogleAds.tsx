import Script from 'next/script'

export default function GoogleAds() {
  return (
    <>
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=GT-P8Q289LQ"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          // Google Analytics 4
          gtag('config', 'GT-P8Q289LQ');

          // Google Ads (linked to GA4)
          gtag('config', 'AW-17631948540');
        `}
      </Script>
    </>
  )
}

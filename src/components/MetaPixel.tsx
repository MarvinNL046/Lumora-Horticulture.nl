import Script from 'next/script'

const PIXEL_IDS = ['1537235201740065', '2680887955624246'] as const

export default function MetaPixel() {
  return (
    <>
      {/* lazyOnload: fires once page is idle, keeps main thread free for INP.
          PageView events queue on fbq (it's a stub that stores calls until
          the real pixel loads), so we don't lose the initial PageView. */}
      <Script id="meta-pixel" strategy="lazyOnload">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          ${PIXEL_IDS.map((id) => `fbq('init', '${id}');`).join('\n          ')}
          fbq('track', 'PageView');
        `}
      </Script>
      <noscript>
        {PIXEL_IDS.map((id) => (
          <img
            key={id}
            height="1"
            width="1"
            style={{ display: 'none' }}
            src={`https://www.facebook.com/tr?id=${id}&ev=PageView&noscript=1`}
            alt=""
          />
        ))}
      </noscript>
    </>
  )
}

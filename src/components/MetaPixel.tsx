'use client'

import Script from 'next/script'
import { useEffect } from 'react'
import { initializeMetaTracking, META_PIXEL_IDS } from '@/lib/tracking-bootstrap'

export default function MetaPixel() {
  useEffect(initializeMetaTracking, [])
  return (
    <>
      <Script id="meta-pixel-sdk" src="https://connect.facebook.net/en_US/fbevents.js"
        strategy="lazyOnload" onLoad={initializeMetaTracking} />
      <noscript>
        {META_PIXEL_IDS.map((id) => (
          <img key={id} height="1" width="1" style={{ display: 'none' }}
            src={`https://www.facebook.com/tr?id=${id}&ev=PageView&noscript=1`} alt="" />
        ))}
      </noscript>
    </>
  )
}

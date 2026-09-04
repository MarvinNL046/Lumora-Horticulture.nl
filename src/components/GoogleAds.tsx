'use client'

import Script from 'next/script'
import { useEffect } from 'react'
import { GOOGLE_TAG_ID, initializeGoogleTracking } from '@/lib/tracking-bootstrap'

export default function GoogleAds() {
  useEffect(initializeGoogleTracking, [])
  return <Script id="google-tag-sdk"
    src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_TAG_ID}`}
    strategy="lazyOnload" onLoad={initializeGoogleTracking} />
}

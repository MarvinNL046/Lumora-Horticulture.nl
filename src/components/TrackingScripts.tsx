'use client';

import { usePathname } from 'next/navigation';
import GoogleAds from '@/components/GoogleAds';
import MetaPixel from '@/components/MetaPixel';
import MicrosoftClarity from '@/components/MicrosoftClarity';

/**
 * Checkout URLs can contain a retry token, an order capability or a cart
 * recovery capability. Never initialize third-party scripts anywhere in this
 * flow: analytics products may otherwise capture the full page location.
 */
export default function TrackingScripts() {
  const pathname = usePathname();
  const isCheckoutFlow = /(^|\/)checkout(?:\/|$)/.test(pathname);

  if (isCheckoutFlow) return null;

  return (
    <>
      <GoogleAds />
      <MicrosoftClarity />
      <MetaPixel />
    </>
  );
}

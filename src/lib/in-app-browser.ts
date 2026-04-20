// Detects the big social in-app webviews. These browsers strip cookies/3p
// redirects in ways that break iDEAL, Apple Pay, and sometimes the entire
// Mollie payment-method screen, so the checkout needs to nudge users into
// a real browser before they hit the wall.
//
// FB and Instagram are the ones we actually see in our Meta Ads traffic;
// the others are cheap to catch while we're here.

export type InAppBrowser = 'facebook' | 'instagram' | 'tiktok' | 'linkedin' | 'twitter' | 'snapchat' | 'other' | null;

export function detectInAppBrowser(ua: string | undefined): InAppBrowser {
  if (!ua) return null;
  const u = ua.toLowerCase();
  // Facebook app + Facebook's shared in-app-browser framework.
  if (/\bfban\b|\bfbav\b|\bfb_iab\b|\bfb4a\b|\bfbios\b/.test(u)) return 'facebook';
  // Instagram's webview identifies itself explicitly.
  if (/instagram/.test(u)) return 'instagram';
  // TikTok's webview reports musical_ly (legacy) or bytedancewebview.
  if (/musical_ly|bytedancewebview|tiktok/.test(u)) return 'tiktok';
  if (/linkedinapp/.test(u)) return 'linkedin';
  if (/\btwitter\b/.test(u) && !/chrome|safari|firefox/.test(u)) return 'twitter';
  if (/snapchat/.test(u)) return 'snapchat';
  return null;
}

export function platform(ua: string | undefined): 'ios' | 'android' | 'other' {
  if (!ua) return 'other';
  const u = ua.toLowerCase();
  if (/iphone|ipad|ipod/.test(u)) return 'ios';
  if (/android/.test(u)) return 'android';
  return 'other';
}

// Best-effort "open this URL in the default browser" link. Android supports
// Chrome intents. iOS doesn't have a guaranteed scheme — some social apps
// intercept `x-safari-https://`, others don't, so we also show a fallback
// copy-link flow.
export function openInBrowserHref(currentUrl: string, plat: 'ios' | 'android' | 'other'): string | null {
  if (plat === 'android') {
    try {
      const u = new URL(currentUrl);
      const hostPath = u.host + u.pathname + u.search + u.hash;
      return `intent://${hostPath}#Intent;scheme=${u.protocol.replace(':', '')};package=com.android.chrome;end`;
    } catch {
      return null;
    }
  }
  if (plat === 'ios') {
    // x-safari-https:// works in Facebook/Instagram webviews but not in every
    // app — we still surface it, and show a copy-link fallback if it no-ops.
    return currentUrl.replace(/^https/, 'x-safari-https');
  }
  return null;
}

'use client';

import { useEffect, useState } from 'react';
import { detectInAppBrowser, platform, openInBrowserHref, type InAppBrowser } from '@/lib/in-app-browser';

const DISMISS_KEY = 'lumora-iab-dismissed-v1';

const COPY = {
  nl: {
    title: 'Open deze pagina in je browser',
    subtitle: 'Veel betaalmethodes (iDEAL, Apple Pay) werken niet in de in-app browser. Open in Safari/Chrome om zonder problemen af te rekenen.',
    openBrowser: 'Open in browser',
    copyLink: 'Kopieer link',
    copied: 'Gekopieerd!',
    howTo: 'Of tik op ⋯ rechtsboven → "Open in browser"',
    dismiss: 'Later',
  },
  en: {
    title: 'Open this page in your browser',
    subtitle: 'Most payment methods (iDEAL, Apple Pay) don\'t work in the in-app browser. Open in Safari/Chrome to check out smoothly.',
    openBrowser: 'Open in browser',
    copyLink: 'Copy link',
    copied: 'Copied!',
    howTo: 'Or tap ⋯ in the top-right → "Open in browser"',
    dismiss: 'Later',
  },
  de: {
    title: 'Öffne diese Seite im Browser',
    subtitle: 'Viele Zahlungsmethoden (iDEAL, Apple Pay) funktionieren in der In-App-Ansicht nicht. Öffne in Safari/Chrome, um sicher zu bezahlen.',
    openBrowser: 'Im Browser öffnen',
    copyLink: 'Link kopieren',
    copied: 'Kopiert!',
    howTo: 'Oder tippe auf ⋯ oben rechts → "Im Browser öffnen"',
    dismiss: 'Später',
  },
};

interface Props {
  locale?: 'nl' | 'en' | 'de';
}

// Locale is optional — if the mounting layout can't pass it (root layout is
// locale-less), we derive it from the pathname so copy still matches the
// rest of the page.
function deriveLocale(): 'nl' | 'en' | 'de' {
  if (typeof window === 'undefined') return 'nl';
  const seg = window.location.pathname.split('/')[1];
  if (seg === 'en' || seg === 'de') return seg;
  return 'nl';
}

export default function InAppBrowserBanner({ locale }: Props) {
  const [iab, setIab] = useState<InAppBrowser>(null);
  const [plat, setPlat] = useState<'ios' | 'android' | 'other'>('other');
  const [resolvedLocale, setResolvedLocale] = useState<'nl' | 'en' | 'de'>(locale ?? 'nl');
  const [dismissed, setDismissed] = useState(true); // hidden until detected
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const ua = typeof navigator !== 'undefined' ? navigator.userAgent : '';
    const detected = detectInAppBrowser(ua);
    if (!detected) return;

    // Allow dismiss-per-session, but re-surface on a fresh page load so users
    // who dismissed on the PDP still get warned before they hit checkout.
    const sessionDismissed =
      typeof window !== 'undefined' && window.sessionStorage.getItem(DISMISS_KEY) === '1';

    setIab(detected);
    setPlat(platform(ua));
    if (!locale) setResolvedLocale(deriveLocale());
    setDismissed(sessionDismissed);
  }, [locale]);

  if (!iab || dismissed) return null;

  const t = COPY[resolvedLocale] ?? COPY.nl;
  const href = typeof window !== 'undefined'
    ? openInBrowserHref(window.location.href, plat)
    : null;

  const handleCopy = async () => {
    try {
      if (typeof window !== 'undefined') {
        await navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch {
      // Clipboard can fail on old in-app webviews; fall back to selecting an
      // input so the user can long-press → copy.
    }
  };

  const handleDismiss = () => {
    try { window.sessionStorage.setItem(DISMISS_KEY, '1'); } catch { /* ignore */ }
    setDismissed(true);
  };

  return (
    <div className="bg-amber-50 border-b-2 border-amber-400">
      <div className="max-w-4xl mx-auto px-4 py-3 sm:py-4 flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="flex-shrink-0">
          <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-amber-900">{t.title}</p>
          <p className="text-xs text-amber-800/90">{t.subtitle}</p>
          {plat === 'ios' && !href && (
            <p className="text-xs text-amber-800/80 mt-1">{t.howTo}</p>
          )}
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          {href && (
            <a
              href={href}
              className="inline-flex items-center gap-1 bg-amber-600 text-white px-3 py-2 rounded-lg text-sm font-semibold hover:bg-amber-700 whitespace-nowrap"
            >
              {t.openBrowser}
            </a>
          )}
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1 bg-white border border-amber-300 text-amber-900 px-3 py-2 rounded-lg text-sm font-semibold hover:bg-amber-100 whitespace-nowrap"
          >
            {copied ? t.copied : t.copyLink}
          </button>
          <button
            type="button"
            onClick={handleDismiss}
            className="text-amber-900/60 hover:text-amber-900 text-sm px-2"
            aria-label={t.dismiss}
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}

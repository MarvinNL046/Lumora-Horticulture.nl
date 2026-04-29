import type { Metadata } from 'next';
import LandingClient from './LandingClient';

export const metadata: Metadata = {
  title: 'NEEMX PRO 2+1 GRATIS — Tijdelijke Actie | Lumora Horticulture',
  description:
    'Tijdelijke actie: koop 2 flesjes NEEMX PRO Premium Botanical Oil Concentrate, krijg 1 gratis. 100% natuurlijk, plantaardig en effectief tegen spint, witte vlieg en meer. Beperkte oplage — bestel nu.',
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: 'https://lumorahorticulture.nl/neemxpro-2-plus-1-gratis',
  },
  openGraph: {
    title: 'NEEMX PRO 2+1 GRATIS — Tijdelijke Actie',
    description: 'Koop 2 flesjes NEEMX PRO, krijg 1 gratis. 100% natuurlijk plantaardig olieconcentraat.',
    url: 'https://lumorahorticulture.nl/neemxpro-2-plus-1-gratis',
    siteName: 'Lumora Horticulture',
    locale: 'nl_NL',
    type: 'website',
    images: [
      {
        url: '/productAfbeeldingen/neemxpro/neemxpro-2plus1-hero.png',
        width: 1200,
        height: 1200,
        alt: 'NEEMX PRO 2+1 GRATIS Actie',
      },
    ],
  },
};

export default function Page() {
  return <LandingClient />;
}

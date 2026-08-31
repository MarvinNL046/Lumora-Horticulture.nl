# Multilingual URL and domain setup

`https://lumorahorticulture.nl` is the only canonical origin.

- Dutch: `https://lumorahorticulture.nl/`
- English: `https://lumorahorticulture.nl/en`
- German: `https://lumorahorticulture.nl/de`

Paths are localized where mappings exist. For example:

| Page | Dutch | English | German |
| --- | --- | --- | --- |
| Home | `/` | `/en` | `/de` |
| Products | `/producten` | `/en/products` | `/de/produkte` |
| Contact | `/contact` | `/en/contact` | `/de/kontakt` |

The routing source of truth is:

- `src/i18n/routing.ts` for supported locales and prefix behavior.
- `src/lib/url-localizations.ts` for translated path segments.
- `src/proxy.ts` for canonical redirects and internal locale rewrites.

Always generate internal links with `localizePathForLocale`. Do not add new
absolute `.com` or `.de` storefront URLs.

## Legacy domains

Keep `lumorahorticulture.com`, `www.lumorahorticulture.com`,
`lumorahorticulture.de`, and `www.lumorahorticulture.de` attached to the same
Vercel project. They exist only to preserve old links:

- `.com/<path>` permanently redirects to `.nl/en/<localized-path>`.
- `.de/<path>` permanently redirects to `.nl/de/<localized-path>`.
- `www.lumorahorticulture.nl` permanently redirects to the `.nl` apex.

Do not configure domain-level forwarding at the registrar if it drops paths or
query strings. The application proxy performs the path-aware 308 redirects.

## Local verification

Run `npm run dev` and send requests with a legacy `Host` header to verify the
redirects. You do not need to change the hosts file for automated checks.

## Sitemap and robots

Next.js generates one sitemap at
`https://lumorahorticulture.nl/sitemap.xml`. It contains the canonical NL, EN,
and DE URLs with hreflang alternates. `public/robots.txt` references only that
sitemap.

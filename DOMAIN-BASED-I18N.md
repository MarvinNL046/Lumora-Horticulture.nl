# Domain-Based Internationalization Setup

This project is configured to use domain-based internationalization, where each language is served from a separate domain with localized URL paths:

- Dutch (nl): https://lumorahorticulture.nl
- English (en): https://lumorahorticulture.com
- German (de): https://lumorahorticulture.de

## How It Works

The middleware (`src/middleware.ts`) is configured to detect the domain and automatically serve content in the appropriate language with localized URL paths. This means:

1. No `/nl`, `/en`, or `/de` prefixes in URLs
2. Each domain serves content in a specific language
3. URL paths are translated to match the language of each domain:

| Page      | Dutch (nl)                      | English (en)                     | German (de)                      |
|-----------|----------------------------------|----------------------------------|----------------------------------|
| Home      | https://lumorahorticulture.nl/   | https://lumorahorticulture.com/  | https://lumorahorticulture.de/   |
| Products  | https://lumorahorticulture.nl/producten/ | https://lumorahorticulture.com/products/ | https://lumorahorticulture.de/produkte/ |
| Contact   | https://lumorahorticulture.nl/contact/ | https://lumorahorticulture.com/contact/ | https://lumorahorticulture.de/kontakt/ |

## Netlify Configuration

In Netlify, you'll need to configure all three domains to point to the same site:

1. Go to Netlify dashboard → Your site → Domain settings
2. Add custom domains:
   - lumorahorticulture.nl (primary domain)
   - lumorahorticulture.com
   - lumorahorticulture.de

## Local Testing

To test the domain-based routing locally, you'll need to modify your hosts file to create local domain aliases. This allows you to test different domains on your local machine.

### Windows:

1. Open Notepad as administrator
2. Open the file `C:\Windows\System32\drivers\etc\hosts`
3. Add the following lines:
   ```
   127.0.0.1 lumorahorticulture.nl
   127.0.0.1 lumorahorticulture.com
   127.0.0.1 lumorahorticulture.de
   ```
4. Save the file

### Mac/Linux:

1. Open Terminal
2. Run `sudo nano /etc/hosts`
3. Add the following lines:
   ```
   127.0.0.1 lumorahorticulture.nl
   127.0.0.1 lumorahorticulture.com
   127.0.0.1 lumorahorticulture.de
   ```
4. Save (Ctrl+O, then Enter) and exit (Ctrl+X)

### Using with Next.js Development Server:

When running the Next.js development server with `npm run dev`, you can now access your application using:

- http://lumorahorticulture.nl:3000 (Dutch)
- http://lumorahorticulture.com:3000 (English)
- http://lumorahorticulture.de:3000 (German)

Each domain will automatically show content in the correct language based on the domain being used.

## Fallback for Development

The Netlify preview URL (lumorahorticulture.netlify.app) is configured to default to Dutch (nl) for simplicity.

## Sitemap and SEO

The sitemap.xml is generated during build and includes URLs for all domains. The robots.txt file references all three sitemaps to ensure proper crawling across all domains.

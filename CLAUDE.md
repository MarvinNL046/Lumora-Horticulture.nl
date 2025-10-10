# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Lumora Horticulture is a multilingual B2B e-commerce website for professional horticulture products, built with Next.js 14 and deployed on Netlify. The site features a direct checkout flow optimized for B2B customers who know exactly what they want to order.

## Tech Stack

- **Framework**: Next.js 14 with App Router and TypeScript
- **Database**: Neon PostgreSQL with Drizzle ORM
- **Payment**: Mollie integration
- **Styling**: Tailwind CSS with custom brand colors
- **i18n**: next-intl with domain-based routing (lumorahorticulture.nl, .com, .de)
- **Deployment**: Netlify with automatic deploys from `main` branch

## Development Commands

```bash
# Development
npm run dev                    # Start development server

# Database (Drizzle ORM + Neon PostgreSQL)
npm run db:studio             # Open Drizzle Studio (database GUI)
npm run db:push               # Push schema changes to database
npm run db:generate           # Generate migrations
npm run db:migrate            # Run migrations

# Production Build
npm run build                 # Build + generate sitemaps
npm run generate-sitemaps     # Manually regenerate sitemaps

# Database Setup/Updates
node scripts/setup-database.js                    # Initial database setup
node scripts/update-transportdoos-description.js  # Update Transportdoos product
node scripts/update-tray-descriptions.js          # Update Tray products
```

## Architecture

### Multilingual URL Structure

The site uses **domain-based locale detection** without `/[locale]` URL prefixes:
- `lumorahorticulture.nl` → Dutch (default)
- `lumorahorticulture.com` → English
- `lumorahorticulture.de` → German

URL paths are localized per domain:
- `/products/` (EN) → `/producten/` (NL) → `/produkte/` (DE)
- `/shop/` (EN) → `/winkel/` (NL) → `/shop/` (DE)

**Key Files**:
- `src/lib/url-localizations.ts` - URL path translation mappings
- `src/app/[locale]/` - All pages use dynamic locale routing internally
- Use `localizePathForLocale(path, locale)` for generating localized URLs

### Database Schema

**Products Table** (`src/db/schema.ts`):
- Multilingual fields: `name`, `name_en`, `name_de`, `description`, `description_en`, `description_de`
- `slug` - SEO-friendly unique identifier (used in URLs)
- `metadata` - JSON field for product specifications (dimensions, packaging info, etc.)
- `display_order` - Controls product ordering on shop pages

**Orders & OrderItems**: Full e-commerce flow with Mollie payment integration

**Database Connection**: Uses Neon serverless PostgreSQL via `DATABASE_URL` in `.env.local`

### E-commerce Flow

**Single-Page Checkout** (B2B optimized):
1. Product detail page shows all product info, volume discounts, and checkout form
2. Customer fills contact/shipping info on same page
3. Direct payment via Mollie (no shopping cart)
4. Webhook handles payment confirmation → `src/app/api/webhooks/mollie/route.ts`

**Volume Discounts** (`src/lib/volume-discount.ts`):
- Automatic tiered pricing: 5-9 items (5%), 10-24 (10%), 25-49 (15%), 50+ (20%)
- Real-time calculation displayed on product pages
- Applies to all products

### Brand Design System

**Colors** (defined in `tailwind.config.js`):
- `lumora-cream` (#FAF3C3) - Light cream background
- `lumora-dark` (#404F4A) - Dark green from logo
- `lumora-green-500` (#2D7D46) - Primary green for CTAs
- `lumora-gold` (#D4AF37) - Accent color from logo

**Typography**:
- `font-sans` - Inter (body text)
- `font-display` - Playfair Display (headings)

**Shadows**: Custom soft shadows (`shadow-soft`, `shadow-soft-md`, `shadow-soft-lg`)

### Key Components & Patterns

**Product Pages**:
- `/src/app/[locale]/products/ProductsClient.tsx` - Marketing product overview with detailed specs
- `/src/app/[locale]/shop/page.tsx` - Shop overview with product cards
- `/src/app/[locale]/shop/[slug]/page.tsx` - Product detail + checkout form

**Product-Specific Logic**:
```typescript
// Show different labels for Transportdoos (sold in packages of 25)
if (productSlug === 'transportdoos-vouwdoos') {
  label = t.pricePerPackage; // "Prijs per 25 stuks"
  showPackageNote = true;    // "1 verpakking = 25 stuks"
}

// Show packaging info for trays
if (productSlug === 'paper-plug-tray-84') {
  showNote = '📦 1 doos bevat 8 trays';
}
```

**API Routes**:
- `/api/products` - Fetch all products (with locale support)
- `/api/products/slug/[slug]` - Fetch single product by slug
- `/api/checkout` - Create order and Mollie payment
- `/api/webhooks/mollie` - Handle payment status updates

## Environment Variables

Required in `.env.local`:
```bash
DATABASE_URL=          # Neon PostgreSQL connection string
MOLLIE_API_KEY=       # Mollie payment API key
NEXT_PUBLIC_SITE_URL= # Production URL for sitemap generation
```

## Important Development Notes

### Product Data Updates

When updating product information:
1. Update database via scripts in `scripts/` folder
2. Update display logic in relevant components (ProductsClient, shop pages)
3. Ensure all three languages (NL, EN, DE) are updated
4. Test packaging info displays correctly (especially for Transportdoos and Trays)

### Multilingual Content

**Translation Pattern**:
```typescript
// Component level
const t = {
  label: locale === 'nl' ? 'Nederlands' : locale === 'de' ? 'Deutsch' : 'English'
}

// Product descriptions from database
description: locale === 'en' && product.description_en
  ? product.description_en
  : locale === 'de' && product.description_de
    ? product.description_de
    : product.description
```

### Deployment

- **Auto-deploy**: Pushes to `main` branch trigger Netlify builds
- **Build process**: Automatically generates localized sitemaps for all domains
- **Static assets**: Product images in `/public/productAfbeeldingen/`

### Common Patterns

**Volume Discount Display**:
```typescript
import { getDiscountInfo, calculateTotalPrice, formatPrice } from '@/lib/volume-discount'

const discountInfo = getDiscountInfo(quantity)
const totalPrice = calculateTotalPrice(basePrice, quantity)
```

**Localized Links**:
```typescript
import { localizePathForLocale } from '@/lib/url-localizations'

<Link href={localizePathForLocale('/shop', locale)}>
  {t.shopButton}
</Link>
```

## Testing Payment Flow

1. Use Mollie test mode API keys
2. Test checkout flow on each locale
3. Use Mollie test card numbers for payment testing
4. Webhook endpoint must be publicly accessible (use ngrok for local testing)

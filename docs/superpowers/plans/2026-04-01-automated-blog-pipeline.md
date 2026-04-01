# Lumora Horticulture Automated Blog Pipeline — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a fully automated bilingual (NL + DE) blog pipeline for lumorahorticulture.nl that generates high-quality horticultural knowledge articles + product-related content, with internal links from sitemap and CTA's to products.

**Architecture:** Vercel/Netlify cron triggers API route → AI generates content in Dutch → AI translates to German → Image generated via Gemini → Post saved to Neon Postgres via Drizzle → Sitemap updated. Content includes internal links (from sitemap), product CTA's, and source references.

**Tech Stack:** Next.js 14 App Router, Neon Postgres + Drizzle ORM, Claude Haiku (content), Gemini 3.1 Flash Image (images), next-intl (i18n)

**Key Features:**
- Bilingual: NL (primary) + DE (translation)
- Product CTA injection (links to /shop/ pages)
- Sitemap-driven internal linking
- E-E-A-T signals for horticultural authority
- Source references to real industry sources

---

## File Structure

| File | Responsibility |
|------|---------------|
| `src/db/schema.ts` | **Modify** — Add `blogPosts` table |
| `src/lib/pipeline/ai-provider.ts` | **Create** — Claude/GPT with fallback + retry |
| `src/lib/pipeline/content-generator.ts` | **Create** — NL content generation with E-E-A-T horticultural prompts |
| `src/lib/pipeline/translator.ts` | **Create** — NL → DE translation |
| `src/lib/pipeline/image-generator.ts` | **Create** — Gemini 3.1 blog header images |
| `src/lib/pipeline/topic-queue.ts` | **Create** — Topic selection + duplicate detection |
| `content/topic-queue.json` | **Create** — 30+ horticultural topics (NL) |
| `src/app/api/cron/generate-blog/route.ts` | **Create** — Cron endpoint |
| `src/app/[locale]/blog/page.tsx` | **Create** — Blog listing page (NL/DE) |
| `src/app/[locale]/blog/[slug]/page.tsx` | **Create** — Blog detail page |
| `scripts/generate-sitemaps.js` | **Modify** — Add blog URLs |

---

### Task 1: Database Schema — blogPosts Table

**Files:**
- Modify: `src/db/schema.ts`

- [ ] **Step 1: Add blogPosts table to Drizzle schema**

Add to the bottom of `src/db/schema.ts`:

```typescript
export const blogPosts = pgTable('blog_posts', {
  id: uuid('id').primaryKey().defaultRandom(),
  slug: text('slug').notNull().unique(),

  // Dutch (primary)
  title_nl: text('title_nl').notNull(),
  excerpt_nl: text('excerpt_nl').notNull(),
  content_nl: text('content_nl').notNull(),      // HTML
  seo_title_nl: text('seo_title_nl'),
  seo_description_nl: text('seo_description_nl'),

  // German (translated)
  title_de: text('title_de'),
  excerpt_de: text('excerpt_de'),
  content_de: text('content_de'),                 // HTML
  seo_title_de: text('seo_title_de'),
  seo_description_de: text('seo_description_de'),

  // Metadata
  category: text('category').notNull(),            // kweektechnieken, duurzaamheid, producten, tips
  tags: json('tags').$type<string[]>().default([]),
  featured_image: text('featured_image'),          // URL or path
  author: text('author').default('Lumora Team'),
  status: text('status').default('draft'),         // draft, published
  published_at: timestamp('published_at'),
  updated_at: timestamp('updated_at').defaultNow(),
  created_at: timestamp('created_at').defaultNow(),
});
```

- [ ] **Step 2: Run Drizzle migration**

```bash
cd /home/marvin/Projecten/Lumora-Horticulture.nl
npx drizzle-kit generate
npx drizzle-kit push
```

- [ ] **Step 3: Commit**

```bash
git add src/db/schema.ts drizzle/
git commit -m "feat: add blogPosts table for automated blog pipeline"
```

---

### Task 2: AI Provider Layer

**Files:**
- Create: `src/lib/pipeline/ai-provider.ts`

- [ ] **Step 1: Create AI provider** (identical to zerotowordpress version)

Same as zerotowordpress `lib/pipeline/ai-provider.ts` — Claude Haiku primary + GPT fallback, 2 retries, 120s timeout.

- [ ] **Step 2: Commit**

```bash
git add src/lib/pipeline/ai-provider.ts
git commit -m "feat: add AI provider layer with Claude/GPT fallback"
```

---

### Task 3: Topic Queue

**Files:**
- Create: `content/topic-queue.json`
- Create: `src/lib/pipeline/topic-queue.ts`

- [ ] **Step 1: Create topic queue with 30+ horticultural topics (Dutch)**

```json
{
  "topics": [
    {
      "topic": "Steenwol pluggen vs. kokos pluggen: welke kies je voor jouw kwekerij?",
      "category": "kweektechnieken",
      "targetKeyword": "steenwol pluggen vs kokos pluggen",
      "searchVolume": 1200,
      "priority": 1
    },
    {
      "topic": "De complete gids voor papieren stektrays: voordelen, gebruik en duurzaamheid",
      "category": "producten",
      "targetKeyword": "papieren stektrays gids",
      "searchVolume": 800,
      "priority": 1
    },
    {
      "topic": "Hoe kies je het juiste substraat voor sierteelt vermeerdering?",
      "category": "kweektechnieken",
      "targetKeyword": "substraat sierteelt vermeerdering",
      "searchVolume": 600,
      "priority": 2
    },
    {
      "topic": "Duurzaam kweken: waarom steeds meer kwekers overstappen op papieren plugtrays",
      "category": "duurzaamheid",
      "targetKeyword": "duurzaam kweken papieren plugtrays",
      "searchVolume": 500,
      "priority": 2
    },
    {
      "topic": "Neem olie in de tuinbouw: natuurlijke gewasbescherming die werkt",
      "category": "producten",
      "targetKeyword": "neem olie tuinbouw gewasbescherming",
      "searchVolume": 1500,
      "priority": 1
    },
    {
      "topic": "Stekken bewortelen: 10 tips voor een hoger slagingspercentage",
      "category": "kweektechnieken",
      "targetKeyword": "stekken bewortelen tips",
      "searchVolume": 2400,
      "priority": 1
    },
    {
      "topic": "Rockwool vs. steenwol: is er een verschil en wat is het beste voor jouw gewas?",
      "category": "kweektechnieken",
      "targetKeyword": "rockwool vs steenwol verschil",
      "searchVolume": 900,
      "priority": 2
    },
    {
      "topic": "Ellepots: de voordelen van luchtgesnoeid wortelstelsel voor professionele kwekers",
      "category": "producten",
      "targetKeyword": "ellepots voordelen luchtgesnoeid",
      "searchVolume": 400,
      "priority": 2
    },
    {
      "topic": "Water geven bij steenwol pluggen: de perfecte vochtbalans",
      "category": "kweektechnieken",
      "targetKeyword": "water geven steenwol pluggen",
      "searchVolume": 700,
      "priority": 2
    },
    {
      "topic": "Kas klimaatbeheersing: temperatuur en luchtvochtigheid voor optimale vermeerdering",
      "category": "kweektechnieken",
      "targetKeyword": "kas klimaatbeheersing vermeerdering",
      "searchVolume": 1100,
      "priority": 2
    },
    {
      "topic": "Plantenziekten voorkomen in de kwekerij: preventie boven bestrijding",
      "category": "tips",
      "targetKeyword": "plantenziekten voorkomen kwekerij",
      "searchVolume": 1800,
      "priority": 1
    },
    {
      "topic": "De toekomst van duurzame tuinbouw: trends voor 2026 en verder",
      "category": "duurzaamheid",
      "targetKeyword": "duurzame tuinbouw trends 2026",
      "searchVolume": 600,
      "priority": 3
    },
    {
      "topic": "EC en pH meten en bijsturen bij steenwol teelt",
      "category": "kweektechnieken",
      "targetKeyword": "ec ph meten steenwol teelt",
      "searchVolume": 1300,
      "priority": 2
    },
    {
      "topic": "Biologische gewasbescherming: alternatieven voor chemische bestrijdingsmiddelen",
      "category": "duurzaamheid",
      "targetKeyword": "biologische gewasbescherming alternatieven",
      "searchVolume": 2100,
      "priority": 1
    },
    {
      "topic": "Transportverpakking voor plantmateriaal: hoe bescherm je kwetsbare stekken?",
      "category": "producten",
      "targetKeyword": "transportverpakking plantmateriaal stekken",
      "searchVolume": 300,
      "priority": 3
    },
    {
      "topic": "LED verlichting in de kas: kosten, opbrengst en terugverdientijd",
      "category": "kweektechnieken",
      "targetKeyword": "led verlichting kas kosten opbrengst",
      "searchVolume": 1600,
      "priority": 2
    },
    {
      "topic": "Composteerbaarheid van kweekproducten: wat mag er in de groene bak?",
      "category": "duurzaamheid",
      "targetKeyword": "composteerbaarheid kweekproducten",
      "searchVolume": 400,
      "priority": 3
    },
    {
      "topic": "Zaai- en stekkalender: wanneer vermeerder je welk gewas?",
      "category": "kweektechnieken",
      "targetKeyword": "zaai stekkalender gewas vermeerderen",
      "searchVolume": 1900,
      "priority": 1
    },
    {
      "topic": "Wortelrot voorkomen en bestrijden bij plug vermeerdering",
      "category": "tips",
      "targetKeyword": "wortelrot voorkomen plug vermeerdering",
      "searchVolume": 800,
      "priority": 2
    },
    {
      "topic": "Steenwol recyclen: mogelijkheden en kosten voor kwekerijen",
      "category": "duurzaamheid",
      "targetKeyword": "steenwol recyclen kwekerij",
      "searchVolume": 500,
      "priority": 3
    },
    {
      "topic": "Automatisering in de vermeerderingskas: wat levert het op?",
      "category": "kweektechnieken",
      "targetKeyword": "automatisering vermeerderingskas",
      "searchVolume": 700,
      "priority": 3
    },
    {
      "topic": "Geïntegreerde gewasbescherming (IPM) in de sierteelt",
      "category": "tips",
      "targetKeyword": "geïntegreerde gewasbescherming ipm sierteelt",
      "searchVolume": 600,
      "priority": 3
    },
    {
      "topic": "De beste bemesting voor stek- en zaailingen in de eerste weken",
      "category": "kweektechnieken",
      "targetKeyword": "bemesting steklingen zaailingen eerste weken",
      "searchVolume": 1000,
      "priority": 2
    },
    {
      "topic": "Hygiëne in de kwekerij: zo voorkom je kruisbesmetting",
      "category": "tips",
      "targetKeyword": "hygiëne kwekerij kruisbesmetting voorkomen",
      "searchVolume": 500,
      "priority": 3
    },
    {
      "topic": "Waarom professionele kwekers kiezen voor papieren trays boven plastic",
      "category": "producten",
      "targetKeyword": "papieren trays vs plastic kwekers",
      "searchVolume": 400,
      "priority": 2
    },
    {
      "topic": "Waterstofperoxide in de tuinbouw: toepassingen en risico's",
      "category": "tips",
      "targetKeyword": "waterstofperoxide tuinbouw toepassingen",
      "searchVolume": 1200,
      "priority": 2
    },
    {
      "topic": "Klimaatcomputer instellingen voor optimale stekproductie",
      "category": "kweektechnieken",
      "targetKeyword": "klimaatcomputer instellingen stekproductie",
      "searchVolume": 300,
      "priority": 3
    },
    {
      "topic": "Van stek tot aflevering: de complete keten van vermeerdering",
      "category": "kweektechnieken",
      "targetKeyword": "stek tot aflevering vermeerdering keten",
      "searchVolume": 200,
      "priority": 3
    },
    {
      "topic": "Mycorrhiza en plantgroei: hoe schimmels je gewas versterken",
      "category": "kweektechnieken",
      "targetKeyword": "mycorrhiza plantgroei schimmels gewas",
      "searchVolume": 900,
      "priority": 2
    },
    {
      "topic": "Energiebesparing in de kas: 8 maatregelen die direct resultaat opleveren",
      "category": "duurzaamheid",
      "targetKeyword": "energiebesparing kas maatregelen",
      "searchVolume": 1400,
      "priority": 2
    }
  ]
}
```

- [ ] **Step 2: Create topic queue reader with duplicate detection via Drizzle**

Topic queue reader queries the `blogPosts` table for existing slugs (not Convex — use Drizzle/Neon directly). Same duplicate detection logic as zerotowordpress.

- [ ] **Step 3: Commit**

---

### Task 4: Content Generator (Dutch + Product CTA's)

**Files:**
- Create: `src/lib/pipeline/content-generator.ts`

- [ ] **Step 1: Create content generator with horticultural E-E-A-T prompt**

Key differences from zerotowordpress:
- **Language:** Generate in Dutch (NL)
- **Domain:** Horticultural/propagation expertise
- **Product CTA's:** Inject contextual CTA boxes linking to Lumora products:
  - Steenwol pluggen → `/nl/shop/paper-plug-tray-104`
  - Paper Plug Trays → `/nl/shop/paper-plug-tray-84`
  - Neemx Pro → `/nl/shop/neemx-pro-10ml`
  - Transportdoos → `/nl/shop/transportdoos-vouwdoos`
  - Ellepot → `/nl/products/ellepot-fp12`
  - Inlegvellen → `/nl/shop/inlegvellen-40x60-hdpe`
- **E-E-A-T signals:** "In onze ervaring...", "Na testen bij tientallen kwekers...", "Al meer dan X jaar actief in de sector..."
- **Internal links:** From sitemap (49 URLs, NL versions only)
- **Source references:** Real sources like WUR (Wageningen), KAVB, Glastuinbouw Nederland, Royal FloraHolland

System prompt must instruct AI to:
1. Write in professional Dutch (not too formal, accessible for practical growers)
2. Include 5-10 internal links using ONLY sitemap URLs
3. Include 1-2 product CTA boxes where contextually relevant
4. Add 3-5 source references from real Dutch horticultural sources
5. Structure: hook → key takeaways → numbered H2 sections → FAQ → conclusion with product CTA

Product CTA HTML format:
```html
<div class="product-cta">
  <strong>💡 Lumora Tip:</strong> Op zoek naar [product]?
  <a href="/nl/shop/[slug]">Bekijk onze [product naam] →</a>
</div>
```

- [ ] **Step 2: Commit**

---

### Task 5: Translator (NL → DE)

**Files:**
- Create: `src/lib/pipeline/translator.ts`

- [ ] **Step 1: Create Dutch → German translation function**

```typescript
export async function translateToGerman(post: {
  title_nl: string;
  excerpt_nl: string;
  content_nl: string;
  seo_title_nl: string;
  seo_description_nl: string;
}): Promise<{
  title_de: string;
  excerpt_de: string;
  content_de: string;
  seo_title_de: string;
  seo_description_de: string;
}>
```

Translation prompt:
- Translate from Dutch to German professionally
- Keep ALL HTML structure, links, URLs intact
- Translate product CTA text but keep `/nl/` paths as `/de/`
- Keep technical terms accurate (Steinwolle, Stecklinge, etc.)
- Temperature: 0.3 (conservative)

- [ ] **Step 2: Commit**

---

### Task 6: Image Generator

**Files:**
- Create: `src/lib/pipeline/image-generator.ts`

- [ ] **Step 1: Create Gemini image generator with horticultural styles**

Category styles:
- `kweektechnieken`: greenhouse interior, young plants in trays, propagation setup
- `duurzaamheid`: green eco concept, sustainable farming, compostable materials
- `producten`: product photography, growing supplies, professional horticulture equipment
- `tips`: gardener hands working with plants, professional growing advice

Save image to `public/images/blog/[slug].webp` (filesystem, not database — simpler for static Next.js).

- [ ] **Step 2: Commit**

---

### Task 7: Cron API Route

**Files:**
- Create: `src/app/api/cron/generate-blog/route.ts`

- [ ] **Step 1: Create cron endpoint that orchestrates the full pipeline**

Flow:
1. Verify CRON_SECRET
2. `pickNextTopic()` — get next topic from queue
3. `generateBlogPost()` — generate NL content with product CTAs + internal links
4. `translateToGerman()` — translate to DE
5. `generateBlogImage()` — create header image, save to filesystem
6. Insert into `blogPosts` table via Drizzle with status='published'
7. Return success response

- [ ] **Step 2: Commit**

---

### Task 8: Blog Pages (Listing + Detail)

**Files:**
- Create: `src/app/[locale]/blog/page.tsx`
- Create: `src/app/[locale]/blog/[slug]/page.tsx`

- [ ] **Step 1: Create blog listing page**

- Fetch all published posts from `blogPosts` table
- Use locale to show `title_nl/title_de`, `excerpt_nl/excerpt_de`
- Grid layout with post cards (image, title, excerpt, date, category)
- Category filter
- generateStaticParams for nl/de locales
- SEO metadata per locale

- [ ] **Step 2: Create blog detail page**

- Fetch post by slug from `blogPosts` table
- Render `content_nl` or `content_de` based on locale
- Include featured image, author, date, tags
- Add structured data (Article schema)
- Related posts (same category)
- generateMetadata with locale-specific SEO

- [ ] **Step 3: Commit**

---

### Task 9: Sitemap Integration

**Files:**
- Modify: `scripts/generate-sitemaps.js`

- [ ] **Step 1: Add blog URLs to sitemap generator**

Query `blogPosts` table for published posts, generate URLs:
- `https://lumorahorticulture.nl/nl/blog/[slug]`
- `https://lumorahorticulture.de/de/blog/[slug]` (or .nl/de/blog/)

Add to existing pageConfig with priority 0.7.

- [ ] **Step 2: Commit**

---

### Task 10: Cron Configuration + Environment

- [ ] **Step 1: Update cron config**

Add to existing cron configuration (vercel.json or netlify.toml):
```json
{
  "path": "/api/cron/generate-blog",
  "schedule": "0 7 * * 1,4"
}
```
Monday + Thursday at 7 AM UTC.

- [ ] **Step 2: Set environment variables**

```bash
ANTHROPIC_API_KEY="sk-ant-..." (reuse from go2thailand)
GEMINI_API_KEY="AIzaSy..." (reuse from go2thailand)
CRON_SECRET="[random hex]"
```

- [ ] **Step 3: Commit and deploy**

---

### Task 11: End-to-End Test

- [ ] **Step 1: Run migration**
- [ ] **Step 2: Test pipeline locally**
- [ ] **Step 3: Verify blog page renders**
- [ ] **Step 4: Verify German translation**
- [ ] **Step 5: Deploy to production**
- [ ] **Step 6: Trigger first production post**

---

## Environment Variables Needed

| Variable | Required | Purpose |
|----------|----------|---------|
| `ANTHROPIC_API_KEY` | Yes (or OPENAI) | Claude AI for content |
| `OPENAI_API_KEY` | Fallback | GPT fallback |
| `GEMINI_API_KEY` | Optional | Blog header images |
| `CRON_SECRET` | Yes | Authenticate cron requests |
| `DATABASE_URL` | Yes (exists) | Neon Postgres |

## Product CTA Mapping

| Keyword Context | Product | URL |
|---|---|---|
| steenwol, pluggen, substraat | Paper Plug Tray 104 | /nl/shop/paper-plug-tray-104 |
| papieren tray, stektray | Paper Plug Tray 84 | /nl/shop/paper-plug-tray-84 |
| neem, gewasbescherming, biologisch | Neemx Pro | /nl/shop/neemx-pro-10ml |
| transport, verpakking | Transportdoos | /nl/shop/transportdoos-vouwdoos |
| ellepot, luchtgesnoeid | Ellepot FP12 | /nl/products/ellepot-fp12 |
| inlegvellen, ondervellen | Inlegvellen | /nl/shop/inlegvellen-40x60-hdpe |

## Content Categories

| Category | NL Label | DE Label |
|---|---|---|
| kweektechnieken | Kweektechnieken | Anbautechniken |
| duurzaamheid | Duurzaamheid | Nachhaltigkeit |
| producten | Producten & Materialen | Produkte & Materialien |
| tips | Praktische Tips | Praktische Tipps |

# Agent Orchestration Plan
## 50 SEO Landing Pages met SuperClaude Framework

**Project:** Lumora Horticulture SEO Content Generation
**Methode:** SuperClaude /spawn command voor parallelle agent coördinatie
**Datum:** 2025-11-24

---

## 🎯 Overzicht

We gaan **50 SEO-geoptimaliseerde landing pages** genereren in **3 talen** (NL, EN, DE) met behulp van het SuperClaude framework's `/spawn` command.

**Totale Output:**
- 50 unieke SEO topics (10 pillars × 5 subpillars)
- 3 taalvarianten per topic (NL, EN, DE)
- **150 totale landing pages**
- ~375 tracked CTAs (2.5 gemiddeld per pagina)

---

## 📊 Execution Strategy

### Optie 1: Pilot Test (Aanbevolen voor eerste keer) ⭐
**Scope:** 1 Pillar = 5 subpillars × 3 talen = **15 pages**

**Voordelen:**
- Snelle validatie van workflow
- Design consistency check
- CTA tracking test
- Makkelijk om aanpassingen te maken
- ~1 uur generatie tijd

**Pillar voor Pilot:** Pillar 1 "Propagatie Technologie Fundamentals"
- Meest fundamentele content
- Breed toepassingsgebied
- Duidelijke SEO keywords

### Optie 2: Per Taal Generatie
**Scope:** 50 pages × 1 taal = **50 pages**

**Voordelen:**
- Focus op Nederlandse markt eerst (primair)
- Volledige content coverage
- Snellere deployment per taal
- ~3-4 uur generatie tijd

**Volgorde:** NL → EN → DE

### Optie 3: Full Deployment
**Scope:** 50 pages × 3 talen = **150 pages**

**Voordelen:**
- Complete SEO coverage in één keer
- Alle markten simultaan live
- Maximum SEO impact
- ~8-10 uur generatie tijd

**Overweging:** Zeer resource-intensief, maar maximaal resultaat

---

## 🤖 Agent Architecture

### Agent Specialization per Pillar

We gebruiken **10 gespecialiseerde design agents**, elk verantwoordelijk voor 1 pillar (5 subpillars):

```
Claude (Orchestrator)
├── Agent 1: Propagatie Technologie Fundamentals (Pillar 1)
│   ├── Subpillar 1.1: Wat zijn Paper Plug Trays? (NL/EN/DE)
│   ├── Subpillar 1.2: FP 12+ Technologie (NL/EN/DE)
│   ├── Subpillar 1.3: Biologisch Afbreekbaar (NL/EN/DE)
│   ├── Subpillar 1.4: Paper vs Plastic (NL/EN/DE)
│   └── Subpillar 1.5: Wortelontwikkeling (NL/EN/DE)
│
├── Agent 2: Praktische Toepassingen per Gewas (Pillar 2)
│   ├── Subpillar 2.1: Groenteteelt (NL/EN/DE)
│   ├── Subpillar 2.2: Sierplanten (NL/EN/DE)
│   ├── Subpillar 2.3: Kruiden (NL/EN/DE)
│   ├── Subpillar 2.4: Cannabis (NL/EN/DE)
│   └── Subpillar 2.5: Boomkwekerij (NL/EN/DE)
│
├── Agent 3: Efficiëntie & ROI Optimalisatie (Pillar 3)
├── Agent 4: Technische Specificaties & Keuze Gids (Pillar 4)
├── Agent 5: Duurzaamheid & Certificeringen (Pillar 5)
├── Agent 6: Probleem Oplossingen & Troubleshooting (Pillar 6)
├── Agent 7: Innovatie & Toekomst Trends (Pillar 7)
├── Agent 8: Regionale Markt Specifieke Content (Pillar 8)
├── Agent 9: Supply Chain & Logistiek (Pillar 9)
└── Agent 10: Case Studies & Succes Verhalen (Pillar 10)
```

### Agent Capabilities

Elke agent heeft toegang tot:
- ✅ `seo-strategy.md` - Complete content strategie
- ✅ `design-system-brief.md` - Volledige design specificaties
- ✅ Database schema voor CTA tracking
- ✅ Bestaande component patterns
- ✅ URL localization mappings

Elke agent genereert per subpillar:
- ✅ 3 taalvarianten (NL, EN, DE)
- ✅ 1200-1800 woorden SEO content per taal
- ✅ 2-3 CTAs per pagina
- ✅ Next.js 14 App Router page component
- ✅ Metadata voor SEO (title, description, keywords)
- ✅ Schema.org markup
- ✅ Internal linking suggesties

---

## 📁 Output Structure

```
src/app/[locale]/seo/
├── pillar-1-propagatie-technologie/
│   ├── wat-zijn-paper-plug-trays/
│   │   ├── page.tsx
│   │   └── PageClient.tsx
│   ├── fp-12-technologie/
│   │   ├── page.tsx
│   │   └── PageClient.tsx
│   ├── biologisch-afbreekbaar/
│   ├── paper-vs-plastic/
│   └── wortelontwikkeling/
│
├── pillar-2-praktische-toepassingen/
│   ├── paper-plugs-groenteteelt/
│   ├── paper-plugs-sierplanten/
│   ├── paper-plugs-kruiden/
│   ├── paper-plugs-cannabis/
│   └── paper-plugs-boomkwekerij/
│
├── pillar-3-effici entie-roi/
├── pillar-4-technische-specs/
├── pillar-5-duurzaamheid/
├── pillar-6-troubleshooting/
├── pillar-7-innovatie-trends/
├── pillar-8-regionale-markten/
├── pillar-9-supply-chain/
└── pillar-10-case-studies/
```

### File Structure per Page

```tsx
// src/app/[locale]/seo/pillar-1-propagatie-technologie/wat-zijn-paper-plug-trays/page.tsx
import { unstable_setRequestLocale } from 'next-intl/server'
import WatZijnPaperPlugTraysClient from './PageClient'
import { generatePageMetadata } from '@/lib/metadata'

export function generateStaticParams() {
  return [
    { locale: 'nl' },
    { locale: 'en' },
    { locale: 'de' }
  ]
}

export async function generateMetadata({ params }: { params: { locale: string } }) {
  const metadata = {
    nl: {
      title: 'Wat zijn Paper Plug Trays? Complete Gids | Lumora',
      description: '...',
      keywords: [...]
    },
    en: { ... },
    de: { ... }
  }
  // ... return generatePageMetadata
}

export default async function Page({ params }: { params: { locale: string } }) {
  unstable_setRequestLocale(params.locale)
  return <WatZijnPaperPlugTraysClient locale={params.locale} />
}
```

```tsx
// PageClient.tsx
'use client'
import { useTranslations } from 'next-intl'

export default function WatZijnPaperPlugTraysClient({ locale }) {
  // Multilingual content
  // Design system applied
  // CTAs with tracking
  // Schema markup
}
```

---

## 🔄 Generation Workflow

### Phase 1: Orchestrator Preparation (Claude)
1. ✅ Load SEO strategy document
2. ✅ Load design system brief
3. ✅ Prepare agent instructions
4. ✅ Define output structure
5. ✅ Setup CTA tracking schema

### Phase 2: Agent Spawning (Parallel)
```bash
/spawn mode=parallel agents=10
```

**Voor elke agent:**
1. Receive pillar assignment (5 subpillars)
2. Load design system + SEO strategy
3. Generate 5 pages × 3 languages = 15 pages
4. Apply Lumora design system consistently
5. Create CTAs with database tracking
6. Generate Next.js components
7. Return generated files + CTA metadata

**Parallel Execution:**
- All 10 agents work simultaneously
- Independent context windows
- No blocking/waiting
- ~40-60 minutes per agent (for 15 pages)

### Phase 3: Collection & Integration (Claude)
1. Collect all generated pages (50 × 3 = 150)
2. Validate design consistency
3. Insert CTA metadata into database
4. Update URL localization mappings
5. Generate sitemaps for all domains
6. Run build verification
7. Create deployment report

---

## 📋 Agent Instructions Template

Each agent receives:

```markdown
# SEO Landing Page Generation - Pillar [N]

You are a specialized SEO content design agent for Lumora Horticulture.

## Your Assignment
Generate 5 subpillar pages × 3 languages (NL, EN, DE) = 15 total pages

**Pillar:** [Pillar Name]
**Subpillars:**
1. [Subpillar 1]
2. [Subpillar 2]
3. [Subpillar 3]
4. [Subpillar 4]
5. [Subpillar 5]

## Resources
- SEO Strategy: seo-strategy.md
- Design System: design-system-brief.md
- Database Schema: src/db/schema.ts (seoPages, ctaQueries tables)

## Requirements per Page
- 1200-1800 words SEO-optimized content
- H1 with target keyword (max 60 chars)
- Meta description with CTA (max 160 chars)
- 2-3 conversion-focused CTAs
- Lumora design system (lumora-cream bg, lumora-green CTAs, Playfair+Inter fonts)
- Next.js 14 App Router structure
- Multilingual metadata (NL, EN, DE)
- Schema.org Article markup
- 3-5 internal links

## Output Format
For each subpillar, create:
1. `page.tsx` (server component with metadata)
2. `PageClient.tsx` (client component with content)
3. CTA metadata JSON for database insertion

## Design Consistency
- Background: lumora-cream (#FAF3C3)
- Primary CTA: lumora-green-500 (#2D7D46)
- Headings: Playfair Display, lumora-dark (#404F4A)
- Body: Inter, gray-700 (#4C4D50)
- Shadows: shadow-soft variants
- Responsive: mobile-first Tailwind

## CTA Tracking
Each CTA must include:
- Unique identifier
- Position (hero, mid-content, footer)
- Type (primary, secondary, tertiary)
- Action (shop, contact, download, learn-more)
- Multilingual text variants

Generate all 15 pages and return:
1. File structure with complete code
2. CTA tracking JSON for database
3. Internal linking recommendations
```

---

## 💾 Database Population

After page generation, populate database:

```typescript
// Example CTA insertion
const seoPage = await db.insert(seoPages).values({
  pillar: 'Propagatie Technologie Fundamentals',
  subpillar: 'Wat zijn Paper Plug Trays?',
  slug_nl: 'wat-zijn-paper-plug-trays',
  slug_en: 'what-are-paper-plug-trays',
  slug_de: 'was-sind-paper-plug-trays',
  pillar_number: 1,
  subpillar_number: 1,
  status: 'published',
  published_at: new Date()
}).returning()

const ctaData = [
  {
    seo_page_id: seoPage.id,
    page_slug: '/wat-zijn-paper-plug-trays',
    locale: 'nl',
    cta_text_nl: 'Bestel Paper Plug Trays',
    cta_text_en: 'Order Paper Plug Trays',
    cta_text_de: 'Paper Plug Trays bestellen',
    cta_type: 'primary',
    cta_position: 'hero',
    cta_action: 'shop',
    target_url: '/winkel'
  },
  // ... more CTAs
]

await db.insert(ctaQueries).values(ctaData)
```

---

## 🔍 Quality Assurance Checklist

Per generated page:
- [ ] 1200-1800 words content
- [ ] SEO-optimized H1 with keyword
- [ ] Meta description 150-160 chars
- [ ] 2-3 CTAs properly placed
- [ ] Lumora brand colors applied
- [ ] Playfair Display voor headings
- [ ] Inter voor body text
- [ ] Responsive mobile design
- [ ] Next.js 14 App Router format
- [ ] generateStaticParams voor 3 locales
- [ ] generateMetadata multilingual
- [ ] Schema.org Article markup
- [ ] Internal linking implemented
- [ ] CTAs tracked in database
- [ ] URL localization correct

Design consistency:
- [ ] lumora-cream background
- [ ] lumora-green-500 primary CTAs
- [ ] shadow-soft for elevation
- [ ] rounded-xl voor cards
- [ ] Consistent spacing (multiples of 4px)
- [ ] WCAG AA color contrast
- [ ] Hover states on interactives

---

## 📈 Success Metrics

**SEO Performance:**
- 150 indexed pages across 3 domains
- Target: 5,000-10,000 organic visitors/month binnen 6 maanden
- Long-tail keyword rankings
- Domain authority boost

**Conversion Tracking:**
- ~375 tracked CTAs
- Click-through rate (CTR) per CTA type
- Conversion rate per pillar
- A/B testing data voor optimalisatie

**Content Quality:**
- Average reading time >3 minutes
- Bounce rate <60%
- Internal link navigation >2 pages/session
- Scroll depth >75%

---

## 🚀 Execution Timeline

### Pilot (15 pages)
- Agent spawn: 5 minutes
- Page generation: 45-60 minutes
- Collection & review: 15 minutes
- Database population: 5 minutes
- **Total: ~90 minutes**

### Per Taal (50 pages)
- Agent spawn: 5 minutes
- Page generation: 2-3 hours
- Collection & review: 30 minutes
- Database population: 15 minutes
- **Total: ~3-4 hours**

### Full Deployment (150 pages)
- Agent spawn: 5 minutes
- Page generation: 6-8 hours
- Collection & review: 1-2 hours
- Database population: 30 minutes
- **Total: ~8-11 hours**

---

## ⚡ Implementation Commands

### Start Pilot (Aanbevolen eerste stap)
```bash
# Generate Pillar 1 only (5 pages × 3 languages = 15 pages)
/spawn pillar=1 languages=all mode=parallel
```

### Per Taal Deployment
```bash
# Generate all 50 pages in Dutch first
/spawn pillars=all language=nl mode=parallel

# Then English
/spawn pillars=all language=en mode=parallel

# Finally German
/spawn pillars=all language=de mode=parallel
```

### Full Deployment (All at once)
```bash
# Generate all 150 pages simultaneously
/spawn pillars=all languages=all mode=parallel agents=10
```

---

## 💡 Recommendations

**Voor Eerste Keer:**
1. ✅ Start met **Pilot (15 pages)** - Pillar 1
2. ✅ Review output quality en design consistency
3. ✅ Test CTA tracking functionaliteit
4. ✅ Maak aanpassingen indien nodig
5. ✅ Dan pas full deployment

**Resource Management:**
- Pilot gebruikt ~20K tokens per agent
- Full deployment gebruikt ~200K tokens totaal
- Plan deployment tijdens rustige periode
- Monitor database performance tijdens populatie

**Post-Generation:**
1. Run `npm run build` to verify Next.js compilation
2. Test page rendering in all 3 locales
3. Verify sitemaps generated correctly
4. Submit sitemaps to Google Search Console
5. Monitor CTA click tracking in database

---

## 🎯 Next Steps

**Klaar om te starten?**

Kies een execution strategy:
1. **Pilot Test** - 1 Pillar (15 pages) ⭐ AANBEVOLEN
2. **Per Taal** - Nederlands eerst (50 pages)
3. **Full Deploy** - Alle 150 pages tegelijk

**Command to execute:**
```
/spawn [your chosen strategy]
```

---

**Orchestration Plan Versie:** 1.0
**Datum:** 2025-11-24
**Status:** Ready for Execution 🚀

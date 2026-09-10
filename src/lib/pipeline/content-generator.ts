// src/lib/pipeline/content-generator.ts
import { generateContent } from './ai-provider';
import { pickNextTopic } from './topic-queue';
import { assertLeafCarePositioning, LEAF_CARE_INSTRUCTIONS } from './editorial-policy';

export interface GeneratedPost {
  title: string;
  slug: string;
  excerpt: string;
  content: string; // HTML
  category: string;
  tags: string[];
  seoTitle: string;
  seoDescription: string;
}

function buildSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 80);
}

// ---------------------------------------------------------------------------
// Sitemap: fetch NL URLs for internal linking
// ---------------------------------------------------------------------------

const SITEMAP_URL = 'https://lumorahorticulture.nl/sitemap.xml';

async function loadSitemapLinks(): Promise<string[]> {
  try {
    const res = await fetch(SITEMAP_URL, {
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) return FALLBACK_INTERNAL_LINKS;
    const xml = await res.text();
    const urls = Array.from(xml.matchAll(/<loc>([^<]+)<\/loc>/g))
      .map((m) => m[1])
      .filter((url) => {
        const parsed = new URL(url);
        if (parsed.origin !== 'https://lumorahorticulture.nl') return false;
        return /^(\/blog\/|\/stekpluggen-steenwol$|\/paper-plug-trays-uitgelegd$|\/neemx-pro$|\/tomaten-zaaien$|\/paprika-zaaien$|\/zaailingen-verspenen$)/.test(parsed.pathname);
      });
    return urls.length > 0 ? urls : FALLBACK_INTERNAL_LINKS;
  } catch {
    return FALLBACK_INTERNAL_LINKS;
  }
}

function groupLinks(urls: string[]): string {
  const groups: Record<string, string[]> = {
    'Shop — Producten': [],
    'Productcategorieën': [],
    'Blog & Kennisbank': [],
    'Overige pagina\'s': [],
  };

  for (const url of urls) {
    const path = new URL(url).pathname;
    if (path.includes('/shop/')) {
      if (groups['Shop — Producten'].length < 25) groups['Shop — Producten'].push(url);
    } else if (path.includes('/products/') || path.includes('/categories/')) {
      if (groups['Productcategorieën'].length < 15) groups['Productcategorieën'].push(url);
    } else if (path.includes('/blog/')) {
      if (groups['Blog & Kennisbank'].length < 20) groups['Blog & Kennisbank'].push(url);
    } else {
      if (groups['Overige pagina\'s'].length < 10) groups['Overige pagina\'s'].push(url);
    }
  }

  let result = '';
  for (const [section, links] of Object.entries(groups)) {
    if (links.length === 0) continue;
    result += `\n${section}:\n`;
    for (const link of links) {
      const path = new URL(link).pathname.replace(/^\/nl\//, '');
      const label = path.replace(/-/g, ' ').replace(/\//g, ' — ');
      result += `- ${link} (${label})\n`;
    }
  }
  return result;
}

const FALLBACK_INTERNAL_LINKS = [
  'https://lumorahorticulture.nl/stekpluggen-steenwol',
  'https://lumorahorticulture.nl/paper-plug-trays-uitgelegd',
  'https://lumorahorticulture.nl/neemx-pro',
  'https://lumorahorticulture.nl/contact',
];

// ---------------------------------------------------------------------------
// System prompt — English instructions, Dutch output
// ---------------------------------------------------------------------------

function buildSystemPrompt(sitemapContext: string): string {
  return `Write useful Dutch content for Lumora Horticulture, a supplier of stonewool-filled paper plug trays and botanical leaf care.
Use je/jouw and answer one clear reader question. Explain limitations and crop-dependent choices.

CONFIRMED PRODUCT FACTS:
- 84 cells: diameter 38 mm, depth 42 mm, 8 trays per box, 672 cells per box.
- 104 cells: diameter 32 mm, depth 40 mm, 7 trays per box, 728 cells per box.
- The paper sleeve surrounds stonewool. Do not call the entire plug or tray compostable or plastic-free.
- Do not claim a universal best size, rooting time, success rate, EC, pH or temperature.
- Only mention products currently in the internal links list; no packaging or other discontinued products.

PRODUCT POSITIONING:
${LEAF_CARE_INSTRUCTIONS}

EVIDENCE AND STYLE:
- Never invent company experience, grower feedback, tests, years in business, testimonials, statistics or certifications.
- Use only the source URLs and information supplied in the brief. Do not invent a source URL or cite a homepage as evidence.
- If the brief lacks evidence for a technical instruction, omit that instruction; do not guess a numeric recipe.
- Distinguish general horticultural advice from Lumora product specifications. A manufacturer's advice for its own product is not a tested Lumora recipe.
- Length follows the question, not a word-count target. Avoid filler, keyword stuffing and generic introductions.

HTML STRUCTURE:
Start with a direct answer. Use h2/h3 headings, short paragraphs and useful lists. Add FAQs only for real unanswered questions.
Link naturally to a relevant guide and product page when they help the reader. Do not force a fixed number of links or product CTAs.
Use only these internal URLs (no invented paths):
${sitemapContext}

Return only valid JSON: {"title":"Dutch title","excerpt":"max 160 characters","content":"HTML article","tags":["relevant tag"],"seoTitle":"max 60 characters","seoDescription":"max 155 characters"}.`;
}

function buildUserPrompt(topic: string, category: string, keyword: string, sources: string[]): string {
  return `Schrijf in het Nederlands over: ${topic}
Categorie: ${category}
Hoofdzoekwoord: ${keyword}
Bronnen voor dit onderwerp: ${sources.join(', ')}
Beantwoord de hoofdvraag en vermeld geen feiten die niet met de aangeleverde informatie te onderbouwen zijn.
Gebruik alleen passende bestaande interne links en volg de bladverzorgingspositionering. Output alleen geldige JSON.`;
}


export async function generateBlogPost(): Promise<GeneratedPost | null> {
  // Pick topic
  const topic = await pickNextTopic();
  if (!topic) {
    console.log('[content-generator] No new topics available');
    return null;
  }

  console.log(`[content-generator] Generating post: ${topic.topic}`);

  // Load sitemap for internal links
  const sitemapUrls = await loadSitemapLinks();
  const sitemapContext = groupLinks(sitemapUrls);
  console.log(`[content-generator] Loaded ${sitemapUrls.length} sitemap URLs for internal linking`);

  // Generate content
  const response = await generateContent({
    systemPrompt: buildSystemPrompt(sitemapContext),
    userPrompt: buildUserPrompt(topic.topic, topic.category, topic.targetKeyword, topic.sources ?? []),
    temperature: 0.5,
    maxTokens: 16384,
  });

  // Parse response
  let parsed: {
    title: string;
    excerpt: string;
    content: string;
    tags: string[];
    seoTitle: string;
    seoDescription: string;
  };

  try {
    // Strip potential markdown fences
    let raw = response.content.trim();
    if (raw.startsWith('```')) raw = raw.replace(/^```\w*\n?/, '').replace(/\n?```$/, '');
    parsed = JSON.parse(raw);
  } catch (err) {
    console.error('[content-generator] Failed to parse AI response:', (err as Error).message);
    console.error('[content-generator] Raw response:', response.content.slice(0, 500));
    return null;
  }

  // Validate required fields
  if (!parsed.title || !parsed.content || !parsed.excerpt) {
    console.error('[content-generator] Missing required fields in AI response');
    return null;
  }

  assertLeafCarePositioning(parsed);

  // Log internal link and source stats
  const internalLinks = (parsed.content.match(/href="https:\/\/lumorahorticulture\.nl/g) || [])
    .length;
  const productCTAs = (parsed.content.match(/class="product-cta"/g) || []).length;
  const externalSources = (parsed.content.match(/target="_blank"/g) || []).length;
  console.log(
    `[content-generator] Post has ${internalLinks} internal links, ${productCTAs} product CTAs, and ${externalSources} external source links`,
  );

  return {
    title: parsed.title,
    slug: buildSlug(parsed.title),
    excerpt: parsed.excerpt.slice(0, 300),
    content: parsed.content,
    category: topic.category,
    tags: parsed.tags || [],
    seoTitle: (parsed.seoTitle || parsed.title).slice(0, 70),
    seoDescription: (parsed.seoDescription || parsed.excerpt).slice(0, 160),
  };
}

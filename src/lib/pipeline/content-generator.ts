// src/lib/pipeline/content-generator.ts
import { generateContent } from './ai-provider';
import { pickNextTopic } from './topic-queue';

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
    const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)]
      .map((m) => m[1])
      .filter((url) => {
        // Only keep Dutch (/nl/) content pages
        if (!url.includes('/nl/')) return false;
        const path = new URL(url).pathname;
        // Skip utility pages
        if (
          ['/nl/privacy', '/nl/terms', '/nl/contact', '/nl/cookie', '/nl/disclaimer'].some((p) =>
            path.startsWith(p),
          )
        )
          return false;
        // Skip bare /nl/ root
        if (path === '/nl' || path === '/nl/') return false;
        return true;
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
  'https://lumorahorticulture.nl/nl/shop/paper-plug-tray-104',
  'https://lumorahorticulture.nl/nl/shop/paper-plug-tray-84',
  'https://lumorahorticulture.nl/nl/shop/neemx-pro-10ml',
  'https://lumorahorticulture.nl/nl/shop/transportdoos-vouwdoos',
  'https://lumorahorticulture.nl/nl/products/ellepot-fp12',
  'https://lumorahorticulture.nl/nl/shop/inlegvellen-40x60-hdpe',
  'https://lumorahorticulture.nl/nl',
  'https://lumorahorticulture.nl/nl/shop',
  'https://lumorahorticulture.nl/nl/about',
];

// ---------------------------------------------------------------------------
// System prompt — English instructions, Dutch output
// ---------------------------------------------------------------------------

function buildSystemPrompt(sitemapContext: string): string {
  return `You are an expert horticultural content writer for Lumora Horticulture (lumorahorticulture.nl) — a Dutch B2B supplier of propagation materials, plug trays, substrates, and crop protection products for professional growers. You write authoritative, actionable content IN DUTCH that follows E-E-A-T principles (Experience, Expertise, Authoritativeness, Trustworthiness).

LANGUAGE: All output must be in professional Dutch. Not too formal — accessible for practical growers and propagation specialists. Use "je/jouw" (informal) rather than "u/uw".

WRITING STYLE:
- Write as Lumora's horticultural experts with deep hands-on experience
- Include E-E-A-T experience signals throughout the article:
  - "In onze ervaring bij tientallen professionele kwekers..."
  - "Na jarenlang testen met verschillende substraten..."
  - "Uit gesprekken met kwekers in de sector blijkt..."
  - "Al meer dan tien jaar leveren wij aan kwekerijen in de Benelux..."
  - "Onze productiepartners hebben uitgebreid getest..."
- Be practical and actionable — every section should have steps the reader can follow
- Include specific technical details (temperatures, EC/pH values, percentages) when relevant
- Use proper horticultural terminology (vermeerdering, stekken, beworteling, substraat, etc.)

STRUCTURE (HTML output):
- Start with a compelling hook paragraph (2-3 sentences) addressing a real grower problem
- Include a "Kernpunten" summary box early: <div class="key-takeaways"><strong>Kernpunten:</strong><ul><li>...</li></ul></div>
- Use <h2> for main sections (numbered: "1. Section Title")
- Use <h3> for subsections
- Include comparison tables where relevant (<table> with headers)
- Add "Praktijktip" callout boxes: <div class="pro-tip"><strong>💡 Praktijktip:</strong> content</div>
- Include step-by-step instructions with numbered lists (<ol>) when applicable
- End with an FAQ section using <h3> for each question
- Final section: brief conclusion with a product-relevant CTA

PRODUCT CTA INJECTION (CRITICAL):
When the content mentions these topics, include a contextual product CTA box (1-2 per article, placed naturally within the content):
- steenwol/pluggen/substraat → <div class="product-cta"><strong>💡 Lumora Tip:</strong> Op zoek naar hoogwaardige plugtrays? <a href="/nl/shop/paper-plug-tray-104">Bekijk onze Paper Plug Tray 104 →</a></div>
- papieren tray/stektray → <div class="product-cta"><strong>💡 Lumora Tip:</strong> <a href="/nl/shop/paper-plug-tray-84">Ontdek onze duurzame Paper Plug Tray 84 →</a></div>
- neem/gewasbescherming/biologisch → <div class="product-cta"><strong>💡 Lumora Tip:</strong> <a href="/nl/shop/neemx-pro-10ml">Probeer Neemx Pro voor natuurlijke gewasbescherming →</a></div>
- transport/verpakking → <div class="product-cta"><strong>💡 Lumora Tip:</strong> <a href="/nl/shop/transportdoos-vouwdoos">Bekijk onze transportdozen →</a></div>
- ellepot/luchtgesnoeid → <div class="product-cta"><strong>💡 Lumora Tip:</strong> <a href="/nl/products/ellepot-fp12">Ontdek de Ellepot FP12 →</a></div>
- inlegvellen → <div class="product-cta"><strong>💡 Lumora Tip:</strong> <a href="/nl/shop/inlegvellen-40x60-hdpe">Bekijk onze inlegvellen →</a></div>

Only include CTAs that are contextually relevant to the topic. Do NOT force unrelated products.

SEO REQUIREMENTS:
- Naturally include the target keyword in the first 100 words
- Use keyword variations and LSI keywords throughout
- Keep paragraphs under 4 sentences
- Use bullet points and numbered lists liberally
- Target 1,500-2,500 words

INTERNAL LINKING RULES (CRITICAL):
- Include 5-10 internal links to other lumorahorticulture.nl pages throughout the article
- Use ONLY the URLs from the AVAILABLE INTERNAL LINKS section below — do NOT invent URLs
- Use natural, keyword-rich anchor text in Dutch (NOT "klik hier" or "lees meer")
- Good: <a href="https://lumorahorticulture.nl/nl/shop/paper-plug-tray-104">Paper Plug Tray 104</a>
- Bad: <a href="https://lumorahorticulture.nl/nl/shop/paper-plug-tray-104">klik hier</a>
- Spread links throughout the article — not all in one section

SOURCE REFERENCES (CRITICAL):
- Include a "Bronnen & Referenties" section at the end of the article, BEFORE the FAQ
- List 3-5 real, verifiable external sources from the Dutch horticultural sector
- Use real URLs from official sources:
  - WUR (Wageningen University & Research): wur.nl
  - Glastuinbouw Nederland: glastuinbouwnederland.nl
  - Royal FloraHolland: royalfloraholland.com
  - KAVB (Koninklijke Algemeene Vereeniging voor Bloembollencultuur): kavb.nl
  - Naktuinbouw: naktuinbouw.nl
  - Rijksoverheid (gewasbescherming): rijksoverheid.nl
  - CTGB (College voor de toelating van gewasbeschermingsmiddelen): ctgb.nl
- Format: <ul><li><a href="URL" target="_blank" rel="noopener">Bron — Beschrijving</a></li></ul>
- Do NOT invent source URLs — only use real, existing domains

ANTI-HALLUCINATION RULES:
- Only mention real products, substrates, and techniques that exist in horticulture
- Do not invent pricing — say "neem contact op voor actuele prijzen" if unsure
- Do not fabricate statistics — use qualitative descriptions instead
- Do not make up grower testimonials or case studies
- Safe facts: Netherlands is the world's #2 agricultural exporter, Westland is the greenhouse capital, Dutch horticulture sector is worth ~€9 billion
- Do NOT invent internal link URLs — only use URLs from the AVAILABLE INTERNAL LINKS list

AVAILABLE INTERNAL LINKS (use ONLY these for internal links):
${sitemapContext}

OUTPUT FORMAT:
Return ONLY the following JSON (no markdown fences, no extra text):
{
  "title": "Dutch title",
  "excerpt": "Dutch excerpt (max 160 chars)",
  "content": "<p>Full Dutch HTML content with product CTAs, internal links, and source references...</p>",
  "tags": ["tag1", "tag2", "tag3", "tag4", "tag5"],
  "seoTitle": "Dutch SEO title (max 60 chars)",
  "seoDescription": "Dutch meta description (max 155 chars)"
}`;
}

function buildUserPrompt(topic: string, category: string, keyword: string): string {
  return `Schrijf een uitgebreid blogartikel over:

**Onderwerp:** ${topic}
**Categorie:** ${category}
**Doelzoekwoord:** ${keyword}

ONTHOUD:
- Schrijf volledig in het Nederlands
- Voeg 5-10 interne links toe met ALLEEN URLs uit de AVAILABLE INTERNAL LINKS lijst
- Voeg 1-2 product CTA-boxen toe waar contextually relevant
- Voeg een "Bronnen & Referenties" sectie toe met 3-5 echte externe bronnen
- Gebruik keyword-rijke ankertekst voor alle links
- Schrijf als Lumora's tuinbouwexperts met hands-on ervaring

Schrijf het volledige artikel volgens ALLE richtlijnen in de system prompt. Output alleen geldige JSON.`;
}

// ---------------------------------------------------------------------------
// Main generator
// ---------------------------------------------------------------------------

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
    userPrompt: buildUserPrompt(topic.topic, topic.category, topic.targetKeyword),
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

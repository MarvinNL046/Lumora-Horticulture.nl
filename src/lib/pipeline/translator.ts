import { generateContent } from './ai-provider';

interface TranslationInput {
  title_nl: string;
  excerpt_nl: string;
  content_nl: string;
  seo_title_nl: string;
  seo_description_nl: string;
}

interface TranslationOutput {
  title_de: string;
  excerpt_de: string;
  content_de: string;
  seo_title_de: string;
  seo_description_de: string;
}

export async function translateToGerman(post: TranslationInput): Promise<TranslationOutput> {
  const systemPrompt = `You are a professional Dutch to German translator specializing in horticultural/agricultural content.

RULES:
- Translate from Dutch to German professionally and accurately
- Keep ALL HTML tags, structure, and formatting exactly as-is
- Keep ALL URLs/links intact but change /nl/ paths to /de/ paths
- Translate product CTA text but preserve the link structure
- Use correct German horticultural terminology (Steinwolle, Stecklinge, Vermehrung, Gewächshaus, Substrat, etc.)
- Keep brand names unchanged (Lumora, Neemx Pro, Ellepot)
- Maintain the same professional but accessible tone
- Do NOT add or remove content — translate only

OUTPUT FORMAT:
Return ONLY valid JSON (no markdown fences):
{
  "title_de": "...",
  "excerpt_de": "...",
  "content_de": "...",
  "seo_title_de": "...",
  "seo_description_de": "..."
}`;

  const userPrompt = `Translate the following Dutch horticultural blog post to German:

TITLE: ${post.title_nl}
EXCERPT: ${post.excerpt_nl}
SEO TITLE: ${post.seo_title_nl}
SEO DESCRIPTION: ${post.seo_description_nl}

CONTENT:
${post.content_nl}`;

  const response = await generateContent({
    systemPrompt,
    userPrompt,
    temperature: 0.3,
    maxTokens: 16384,
  });

  let raw = response.content.trim();
  if (raw.startsWith('```')) raw = raw.replace(/^```\w*\n?/, '').replace(/\n?```$/, '');

  return JSON.parse(raw);
}

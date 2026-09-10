const MAX_BLOG_CONTENT_LENGTH = 500_000;

export function getBlogSections(value: unknown): { kind: 'h2' | 'h3' | 'text'; text: string }[] {
  if (typeof value !== 'string') return [];
  const html = value.slice(0, MAX_BLOG_CONTENT_LENGTH);
  const sections: { kind: 'h2' | 'h3' | 'text'; text: string }[] = [];
  let cursor = 0;
  for (const heading of Array.from(html.matchAll(/<(h[23])\b[^>]*>([\s\S]*?)<\/\1>/gi))) {
    const before = blogHtmlToPlainText(html.slice(cursor, heading.index));
    if (before) sections.push({ kind: 'text', text: before });
    sections.push({ kind: heading[1].toLowerCase() as 'h2' | 'h3', text: blogHtmlToPlainText(heading[2]) });
    cursor = heading.index! + heading[0].length;
  }
  const remaining = blogHtmlToPlainText(html.slice(cursor));
  if (remaining) sections.push({ kind: 'text', text: remaining });
  return sections;
}

/**
 * Render legacy/generated HTML as text while the publishing pipeline lacks a
 * reviewed HTML parser and allowlist. React escapes the returned string, so
 * malformed markup or model-supplied scripts cannot execute.
 */
export function blogHtmlToPlainText(value: unknown): string {
  if (typeof value !== 'string') return '';
  return value
    .slice(0, MAX_BLOG_CONTENT_LENGTH)
    .replace(/<(?:br\s*\/?|\/(?:p|div|li|h[1-6]|blockquote))\s*>/gi, '\n')
    .replace(/<li\b[^>]*>/gi, '• ')
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#0?39;/gi, "'")
    .replace(/\r\n?/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

/** Extract navigable references without rendering CMS HTML or event attributes. */
export function getBlogLinks(value: unknown): { href: string; label: string }[] {
  if (typeof value !== 'string') return [];
  const links = new Map<string, string>();
  for (const match of Array.from(value.slice(0, MAX_BLOG_CONTENT_LENGTH).matchAll(/<a\b[^>]*\bhref\s*=\s*["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi))) {
    const href = blogHtmlToPlainText(match[1]);
    const label = blogHtmlToPlainText(match[2]);
    try {
      const url = new URL(href, 'https://lumorahorticulture.nl');
      if (url.protocol !== 'https:' || url.username || url.password || !label) continue;
      const target = url.origin === 'https://lumorahorticulture.nl'
        ? url.pathname + url.search + url.hash : url.href;
      if (!links.has(target)) links.set(target, label);
      if (links.size === 20) break;
    } catch { /* Ignore invalid URLs. */ }
  }
  return Array.from(links, ([href, label]) => ({ href, label }));
}

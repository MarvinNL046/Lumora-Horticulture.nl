const MAX_BLOG_CONTENT_LENGTH = 500_000;

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

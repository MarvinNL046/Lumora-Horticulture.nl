import assert from 'node:assert/strict';
import test from 'node:test';
import { blogHtmlToPlainText, getBlogLinks, getBlogSections } from './blog-content';

test('removes executable and malformed HTML while retaining readable text', () => {
  const result = blogHtmlToPlainText(
    '<h2>Veilig</h2><p>Tekst &amp; meer</p><img src=x onerror=alert(1)><script>alert(2)</script>',
  );
  assert.equal(result.includes('<script'), false);
  assert.equal(result.includes('onerror'), false);
  assert.match(result, /Veilig/);
  assert.match(result, /Tekst & meer/);
});

test('treats encoded tags as plain text for React to escape', () => {
  assert.equal(blogHtmlToPlainText('&lt;script&gt;x&lt;/script&gt;'), '<script>x</script>');
});

test('extracts deduplicated links without rendering HTML attributes', () => {
  assert.deepEqual(getBlogLinks('<a href="/contact" onclick="alert(1)"><b>Advies</b></a><a href="https://lumorahorticulture.nl/contact">Dubbel</a><a href="https://www.rhs.org.uk/propagation/softwood-cuttings">Bron</a>'), [
    { href: '/contact', label: 'Advies' },
    { href: 'https://www.rhs.org.uk/propagation/softwood-cuttings', label: 'Bron' },
  ]);
});

test('ignores executable URLs, credentials and invalid values', () => {
  assert.deepEqual(getBlogLinks('<a href="javascript:alert(1)">X</a><a href="data:text/html,x">X</a><a href="https://user:pass@example.org">X</a>'), []);
  assert.deepEqual(getBlogLinks(null), []);
});

test('retains semantic headings as escaped text, never CMS attributes', () => {
  assert.deepEqual(getBlogSections('<p>Intro</p><h2 onclick="alert(1)">Een <em>kop</em></h2><p>Uitleg</p><h3>Vraag?</h3><p>&lt;img src=x&gt;</p>'), [
    { kind: 'text', text: 'Intro' }, { kind: 'h2', text: 'Een kop' },
    { kind: 'text', text: 'Uitleg' }, { kind: 'h3', text: 'Vraag?' },
    { kind: 'text', text: '<img src=x>' },
  ]);
});

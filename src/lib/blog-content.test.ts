import assert from 'node:assert/strict';
import test from 'node:test';
import { blogHtmlToPlainText } from './blog-content';

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

import assert from 'node:assert/strict';
import test from 'node:test';
import { serializeJsonLd } from './safe-json-ld';

test('prevents data from closing the JSON-LD script element', () => {
  const serialized = serializeJsonLd({ title: '</script><script>alert(1)</script>' });
  assert.equal(serialized.includes('</script>'), false);
  assert.match(serialized, /\\u003c\/script>/);
  assert.deepEqual(JSON.parse(serialized), {
    title: '</script><script>alert(1)</script>',
  });
});

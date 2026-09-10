import assert from 'node:assert/strict';
import test from 'node:test';
import { assertLeafCarePositioning } from './editorial-policy';

test('accepts leaf care and unrelated propagation information', () => {
  assert.doesNotThrow(() => assertLeafCarePositioning({ title: 'NeemXPRO bladverzorging', content: 'Volg de actuele gebruiksaanwijzing.' }));
  assert.doesNotThrow(() => assertLeafCarePositioning({ title: 'Stekken maken', content: 'Kies een passende plugmaat.' }));
});

test('blocks claims across title, content and tags in Dutch, German and English', () => {
  for (const claim of ['tegen trips', 'spint bestrijden', 'natuurlijke gewasbescherming', 'repellent', 'crop protection', 'gegen Spinnmilben', 'Pflanzenschutz', 'Schädlinge abwehren']) {
    assert.throws(() => assertLeafCarePositioning({ title: 'Neem X Pro', tags: [claim] }), /editorial review/);
  }
});

test('also checks generic neem oil copy and markup', () => {
  assert.throws(() => assertLeafCarePositioning({ title: 'Neemolie', content: '<p>tegen <strong>bladluizen</strong></p>' }), /editorial review/);
});

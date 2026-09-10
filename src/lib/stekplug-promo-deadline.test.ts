import assert from 'node:assert/strict'
import { it } from 'node:test'
import { stekplugPromoDeadline } from './stekplug-promo-deadline'

it('counts calendar days in Amsterdam and includes the entire last day', () => {
  assert.equal(stekplugPromoDeadline('nl', new Date('2026-09-10T12:00:00Z')), 'Nog 5 dagen — geldig t/m 15 september 2026')
  assert.equal(stekplugPromoDeadline('nl', new Date('2026-09-13T22:00:00Z')), 'Nog 1 dag — geldig t/m 15 september 2026')
  assert.equal(stekplugPromoDeadline('nl', new Date('2026-09-15T21:59:59Z')), 'Laatste actiedag — geldig t/m 15 september 2026')
  assert.equal(stekplugPromoDeadline('nl', new Date('2026-09-15T22:00:00Z')), 'Actie afgelopen')
})

it('renders a stable date before hydration and translates the countdown', () => {
  assert.equal(stekplugPromoDeadline('nl'), 'geldig t/m 15 september 2026')
  const now = new Date('2026-09-10T12:00:00Z')
  assert.equal(stekplugPromoDeadline('en', now), '5 days left — valid through 15 September 2026')
  assert.equal(stekplugPromoDeadline('de', now), 'Noch 5 Tage — gültig bis einschließlich 15. September 2026')
})

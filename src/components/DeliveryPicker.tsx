'use client';

import { useEffect, useMemo, useState } from 'react';

type Locale = 'nl' | 'en' | 'de';

export interface DeliverySelection {
  kind: 'home' | 'pickup';
  carrier: 'postnl';
  date: string;          // YYYY-MM-DD
  timeStart: string;     // HH:MM:SS
  timeEnd: string;       // HH:MM:SS
  timeType: 1 | 2 | 3;   // morning / standard / evening
  priceCents: number;    // surcharge above free shipping
  label: string;         // human-readable for UI + receipt
  pickup?: {
    locationName: string;
    locationCode: string;
    street: string;
    number: string;
    postalCode: string;
    city: string;
    distanceM: number;
  };
}

interface Props {
  postalCode: string;
  houseNumber: string;
  countryCode: 'NL' | 'BE' | 'DE';
  locale: Locale;
  value: DeliverySelection | null;
  onChange: (value: DeliverySelection) => void;
}

interface DeliveryTime {
  start: string;
  end: string;
  type: 1 | 2 | 3;
  price_comment: 'morning' | 'standard' | 'avond' | 'saturday';
  price: { amount: number };
}
interface DeliveryDate {
  date: string;
  time: DeliveryTime[];
}
interface PickupPoint {
  location_code: string;
  location_name: string;
  city: string;
  postal_code: string;
  street: string;
  number: string;
  distance: number;
}

const COPY: Record<Locale, Record<string, string>> = {
  nl: {
    heading: 'Bezorgopties',
    loading: 'Bezorgopties ophalen…',
    missing: 'Vul postcode en huisnummer in om bezorgopties te zien.',
    error: 'Bezorgopties konden niet geladen worden. Standaard verzending wordt gebruikt.',
    home: 'Thuisbezorging',
    pickup: 'Afhaalpunt',
    free: 'Gratis',
    morning: 'Ochtend (8:00–12:00)',
    evening: 'Avond (17:30–22:30)',
    standard: 'Overdag',
    saturday: 'Zaterdag',
    on: 'op',
    pickPoint: 'Kies afhaalpunt',
    awayText: 'km',
  },
  en: {
    heading: 'Delivery options',
    loading: 'Loading delivery options…',
    missing: 'Enter postcode and house number to see delivery options.',
    error: "Delivery options couldn't be loaded. Standard shipping will be used.",
    home: 'Home delivery',
    pickup: 'Pickup point',
    free: 'Free',
    morning: 'Morning (8:00–12:00)',
    evening: 'Evening (17:30–22:30)',
    standard: 'Daytime',
    saturday: 'Saturday',
    on: 'on',
    pickPoint: 'Choose pickup point',
    awayText: 'km',
  },
  de: {
    heading: 'Lieferoptionen',
    loading: 'Lieferoptionen werden geladen…',
    missing: 'Bitte Postleitzahl und Hausnummer eingeben, um Lieferoptionen zu sehen.',
    error: 'Lieferoptionen konnten nicht geladen werden. Standardversand wird verwendet.',
    home: 'Haustürlieferung',
    pickup: 'Abholpunkt',
    free: 'Kostenlos',
    morning: 'Morgen (8:00–12:00)',
    evening: 'Abend (17:30–22:30)',
    standard: 'Tagsüber',
    saturday: 'Samstag',
    on: 'am',
    pickPoint: 'Abholpunkt wählen',
    awayText: 'km',
  },
};

const formatDate = (iso: string, locale: Locale) => {
  try {
    return new Date(iso + 'T00:00:00').toLocaleDateString(locale, { weekday: 'short', day: 'numeric', month: 'short' });
  } catch {
    return iso;
  }
};

const formatEuro = (cents: number) => {
  if (cents === 0) return '';
  return `+€${(cents / 100).toFixed(2).replace('.', ',')}`;
};

export default function DeliveryPicker({ postalCode, houseNumber, countryCode, locale, value, onChange }: Props) {
  const t = COPY[locale] ?? COPY.nl;
  const [status, setStatus] = useState<'idle' | 'loading' | 'ready' | 'error'>('idle');
  const [delivery, setDelivery] = useState<DeliveryDate[]>([]);
  const [pickups, setPickups] = useState<PickupPoint[]>([]);

  const inputsValid = useMemo(() => {
    if (!postalCode || !houseNumber) return false;
    if (countryCode === 'NL') return /^[0-9]{4}\s?[A-Za-z]{2}$/.test(postalCode) && /^\d+[a-zA-Z]?$/.test(houseNumber);
    if (countryCode === 'BE') return /^[0-9]{4}$/.test(postalCode) && /^\d+[a-zA-Z]?$/.test(houseNumber);
    if (countryCode === 'DE') return /^[0-9]{5}$/.test(postalCode) && /^\d+[a-zA-Z]?$/.test(houseNumber);
    return false;
  }, [postalCode, houseNumber, countryCode]);

  useEffect(() => {
    if (!inputsValid) {
      setStatus('idle');
      return;
    }
    let cancelled = false;
    setStatus('loading');
    const qs = new URLSearchParams({
      postal_code: postalCode,
      number: houseNumber,
      cc: countryCode,
      carrier: 'postnl',
    });
    fetch(`/api/delivery-options?${qs}`)
      .then(async (res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json() as Promise<{ delivery: DeliveryDate[]; pickups: PickupPoint[] }>;
      })
      .then((json) => {
        if (cancelled) return;
        setDelivery(json.delivery ?? []);
        setPickups(json.pickups ?? []);
        setStatus('ready');
      })
      .catch(() => {
        if (cancelled) return;
        setStatus('error');
      });
    return () => { cancelled = true; };
  }, [inputsValid, postalCode, houseNumber, countryCode]);

  const homeSlots = useMemo(() => {
    // Flatten first 5 days of delivery options into a selectable list.
    const rows: Array<{ date: string; slot: DeliveryTime }> = [];
    for (const d of delivery.slice(0, 5)) {
      for (const slot of d.time) rows.push({ date: d.date, slot });
    }
    return rows;
  }, [delivery]);

  if (!inputsValid) {
    return (
      <div className="bg-lumora-cream/40 rounded-xl p-4 text-sm text-lumora-dark/70 border border-lumora-dark/10">
        {t.missing}
      </div>
    );
  }
  if (status === 'loading') {
    return (
      <div className="bg-lumora-cream/40 rounded-xl p-4 text-sm text-lumora-dark/70 border border-lumora-dark/10">
        {t.loading}
      </div>
    );
  }
  if (status === 'error') {
    return (
      <div className="bg-amber-50 rounded-xl p-4 text-sm text-amber-900 border border-amber-200">
        {t.error}
      </div>
    );
  }

  const labelForSlot = (slot: DeliveryTime): string => {
    if (slot.type === 1) return t.morning;
    if (slot.type === 3) return t.evening;
    if (slot.price_comment === 'saturday') return t.saturday;
    return `${t.standard} (${slot.start.slice(0, 5)}–${slot.end.slice(0, 5)})`;
  };

  return (
    <div className="space-y-4">
      <h3 className="text-base font-semibold text-lumora-dark">{t.heading}</h3>

      {/* Home delivery slots */}
      <fieldset className="border border-lumora-dark/10 rounded-xl bg-white divide-y divide-lumora-dark/5">
        <legend className="px-3 text-xs font-mono uppercase tracking-wider text-lumora-dark/60">{t.home}</legend>
        {homeSlots.map(({ date, slot }, idx) => {
          const selected =
            value?.kind === 'home' &&
            value.date === date &&
            value.timeStart === slot.start &&
            value.timeType === slot.type;
          return (
            <label
              key={`${date}-${slot.start}-${idx}`}
              className={`flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-lumora-cream/30 ${selected ? 'bg-lumora-green-50' : ''}`}
            >
              <input
                type="radio"
                name="delivery"
                className="w-4 h-4 accent-lumora-green-500"
                checked={selected}
                onChange={() =>
                  onChange({
                    kind: 'home',
                    carrier: 'postnl',
                    date,
                    timeStart: slot.start,
                    timeEnd: slot.end,
                    timeType: slot.type,
                    priceCents: slot.price.amount,
                    label: `${t.home}, ${labelForSlot(slot)} ${t.on} ${formatDate(date, locale)}`,
                  })
                }
              />
              <div className="flex-1 text-sm">
                <div className="font-medium text-lumora-dark">
                  {formatDate(date, locale)} · {labelForSlot(slot)}
                </div>
              </div>
              <div className="text-sm font-semibold">
                {slot.price.amount === 0 ? (
                  <span className="text-lumora-green-600">{t.free}</span>
                ) : (
                  <span className="text-lumora-dark/70">{formatEuro(slot.price.amount)}</span>
                )}
              </div>
            </label>
          );
        })}
      </fieldset>

      {/* Pickup points — only show first 5 by distance */}
      {pickups.length > 0 && (
        <fieldset className="border border-lumora-dark/10 rounded-xl bg-white divide-y divide-lumora-dark/5">
          <legend className="px-3 text-xs font-mono uppercase tracking-wider text-lumora-dark/60">{t.pickup}</legend>
          {pickups.slice(0, 5).map((pp, idx) => {
            const selected = value?.kind === 'pickup' && value.pickup?.locationCode === pp.location_code;
            return (
              <label
                key={pp.location_code + idx}
                className={`flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-lumora-cream/30 ${selected ? 'bg-lumora-green-50' : ''}`}
              >
                <input
                  type="radio"
                  name="delivery"
                  className="w-4 h-4 accent-lumora-green-500"
                  checked={selected}
                  onChange={() =>
                    onChange({
                      kind: 'pickup',
                      carrier: 'postnl',
                      date: '',
                      timeStart: '',
                      timeEnd: '',
                      timeType: 2,
                      priceCents: 0,
                      label: `${t.pickup}: ${pp.location_name} — ${pp.street} ${pp.number}, ${pp.city}`,
                      pickup: {
                        locationName: pp.location_name,
                        locationCode: pp.location_code,
                        street: pp.street,
                        number: pp.number,
                        postalCode: pp.postal_code,
                        city: pp.city,
                        distanceM: pp.distance,
                      },
                    })
                  }
                />
                <div className="flex-1 text-sm">
                  <div className="font-medium text-lumora-dark">{pp.location_name}</div>
                  <div className="text-xs text-lumora-dark/60">
                    {pp.street} {pp.number}, {pp.city} · {(pp.distance / 1000).toFixed(1)} {t.awayText}
                  </div>
                </div>
                <div className="text-sm font-semibold text-lumora-green-600">{t.free}</div>
              </label>
            );
          })}
        </fieldset>
      )}
    </div>
  );
}

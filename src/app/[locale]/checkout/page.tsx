'use client';

import { useState, useEffect, useMemo } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useCart } from '@/contexts/CartContext';
import { localizePathForLocale } from '@/lib/url-localizations';
import {
  calculateDiscountedPrice,
  calculateTotalPrice,
  getDiscountInfo,
  formatPrice,
} from '@/lib/volume-discount';
import {
  NEEMX_PROMO_COOKIE_NAME,
  isPromoCookieActive,
  calculateNeemxPromoDiscount,
} from '@/lib/neemx-promo';
import { trackBeginCheckout } from '@/lib/google-ads';
import { useUser } from '@stackframe/stack';
import DeliveryPicker, { type DeliverySelection } from '@/components/DeliveryPicker';

// Keeps the checkout's document.title correct so GA4/Clarity don't log it as a
// homepage pageview (client-component pages can't use generateMetadata).
const applyTitle = (locale: string) => {
  if (typeof document === 'undefined') return;
  const base = 'Lumora Horticulture';
  document.title = locale === 'de' ? `Kasse · ${base}` : locale === 'en' ? `Checkout · ${base}` : `Afrekenen · ${base}`;
};

interface SavedAddress {
  id: string;
  name: string;
  street: string;
  city: string;
  postal_code: string;
  country: string;
  phone: string | null;
  is_default: boolean;
}

type Step = 1 | 2 | 3;

// Form state is persisted across refreshes. Mollie-side errors sometimes bounce
// users back here and retyping the whole thing was part of our 95% abandonment.
const LS_KEY = 'lumora-checkout-form-v1';

interface PersistedForm {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  street: string;
  city: string;
  postalCode: string;
  country: string;
  step: Step;
}

export default function CheckoutPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const locale = (params?.locale as string) || 'nl';
  const { items, getTotalPrice, clearCart, updateQuantity, removeItem } = useCart();
  const user = useUser();

  useEffect(() => { applyTitle(locale); }, [locale]);

  const [step, setStep] = useState<Step>(1);
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('NL');
  const [delivery, setDelivery] = useState<DeliverySelection | null>(null);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [recoveryCartId, setRecoveryCartId] = useState<string | null>(null);
  const [summaryOpen, setSummaryOpen] = useState(false);

  // Saved addresses (logged-in users)
  const [savedAddresses, setSavedAddresses] = useState<SavedAddress[]>([]);
  const [selectedAddressId, setSelectedAddressId] = useState<string>('');
  const [saveAddressForFuture, setSaveAddressForFuture] = useState(false);

  // Email recognition (guest users who bought before)
  const [emailExists, setEmailExists] = useState(false);
  const [suggestedData, setSuggestedData] = useState<{ customer_name: string; customer_phone: string | null } | null>(null);
  const [showEmailPrompt, setShowEmailPrompt] = useState(false);
  const [emailCheckLoading, setEmailCheckLoading] = useState(false);

  // First paint: restore saved form state so a refresh mid-checkout doesn't
  // lose everything. Step is restored too — but clamped to 1 if cart is empty.
  useEffect(() => {
    try {
      const raw = typeof window !== 'undefined' ? window.localStorage.getItem(LS_KEY) : null;
      if (!raw) return;
      const saved = JSON.parse(raw) as Partial<PersistedForm>;
      if (saved.customerName) setCustomerName(saved.customerName);
      if (saved.customerEmail) setCustomerEmail(saved.customerEmail);
      if (saved.customerPhone) setCustomerPhone(saved.customerPhone);
      if (saved.street) setStreet(saved.street);
      if (saved.city) setCity(saved.city);
      if (saved.postalCode) setPostalCode(saved.postalCode);
      if (saved.country) setCountry(saved.country);
      if (saved.step === 1 || saved.step === 2 || saved.step === 3) setStep(saved.step);
    } catch {
      /* ignore malformed state */
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Persist on every change (small payload, no debounce needed).
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const payload: PersistedForm = {
      customerName, customerEmail, customerPhone, street, city, postalCode, country, step,
    };
    try { window.localStorage.setItem(LS_KEY, JSON.stringify(payload)); } catch { /* quota */ }
  }, [customerName, customerEmail, customerPhone, street, city, postalCode, country, step]);

  // Auto-fill from Stack Auth for logged-in users
  useEffect(() => {
    if (user) {
      if (user.displayName && !customerName) setCustomerName(user.displayName);
      if (user.primaryEmail && !customerEmail) setCustomerEmail(user.primaryEmail);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  // Fetch saved addresses
  useEffect(() => {
    if (user) {
      fetch('/api/addresses')
        .then((res) => res.json())
        .then((data) => {
          if (data.success && data.addresses) {
            setSavedAddresses(data.addresses);
            const def = data.addresses.find((a: SavedAddress) => a.is_default);
            if (def) {
              setSelectedAddressId(def.id);
              fillAddressFields(def);
            }
          }
        })
        .catch((e) => console.error('Error fetching addresses:', e));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  // Cart-recovery parameter (email campaigns)
  useEffect(() => {
    const id = searchParams.get('cart_recovery');
    if (id) setRecoveryCartId(id);
  }, [searchParams]);

  // Email recognition for guest users (800 ms debounce)
  useEffect(() => {
    if (!user && customerEmail && customerEmail.includes('@')) {
      setEmailCheckLoading(true);
      const id = setTimeout(async () => {
        try {
          const res = await fetch('/api/check-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: customerEmail }),
          });
          const data = await res.json();
          if (data.success && data.exists) {
            setEmailExists(true);
            setSuggestedData(data.order_data);
            setShowEmailPrompt(true);
          } else {
            setEmailExists(false);
            setSuggestedData(null);
            setShowEmailPrompt(false);
          }
        } catch (e) {
          console.error('Error checking email:', e);
        } finally {
          setEmailCheckLoading(false);
        }
      }, 800);
      return () => clearTimeout(id);
    } else {
      setEmailExists(false);
      setSuggestedData(null);
      setShowEmailPrompt(false);
    }
  }, [customerEmail, user]);

  // Save as abandoned cart once the email is entered (3 s debounce)
  useEffect(() => {
    if (!customerEmail || !customerEmail.includes('@') || items.length === 0) return;
    const id = setTimeout(async () => {
      try {
        const total = items.reduce((t, i) => t + calculateTotalPrice(i.price, i.quantity), 0);
        await fetch('/api/cart/save', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            customer_email: customerEmail,
            customer_name: customerName || undefined,
            cart_data: items,
            total_amount: total,
            locale,
          }),
        });
      } catch (e) {
        console.error('Failed to save checkout cart:', e);
      }
    }, 3000);
    return () => clearTimeout(id);
  }, [customerEmail, items, customerName, locale]);

  const houseNumberFromStreet = (s: string): string => {
    const m = s.match(/(\d+[a-zA-Z]?)\s*$/);
    return m ? m[1] : '';
  };

  const fillAddressFields = (address: SavedAddress) => {
    setStreet(address.street);
    setCity(address.city);
    setPostalCode(address.postal_code);
    setCountry(address.country);
    if (address.phone) setCustomerPhone(address.phone);
  };

  const handleAddressSelect = (id: string) => {
    setSelectedAddressId(id);
    if (id === '') {
      setStreet(''); setCity(''); setPostalCode(''); setCountry('NL');
      return;
    }
    const a = savedAddresses.find((x) => x.id === id);
    if (a) fillAddressFields(a);
  };

  const applySuggestedData = () => {
    if (suggestedData) {
      if (suggestedData.customer_name && !customerName) setCustomerName(suggestedData.customer_name);
      if (suggestedData.customer_phone && !customerPhone) setCustomerPhone(suggestedData.customer_phone);
    }
    setShowEmailPrompt(false);
  };

  const t = {
    checkout: locale === 'de' ? 'Zur Kasse' : locale === 'en' ? 'Checkout' : 'Afrekenen',
    secureBy: locale === 'de' ? 'Gesichert durch Mollie' : locale === 'en' ? 'Secured by Mollie' : 'Beveiligd door Mollie',
    back: locale === 'de' ? 'Zurück' : locale === 'en' ? 'Back' : 'Terug',
    next: locale === 'de' ? 'Weiter' : locale === 'en' ? 'Continue' : 'Verder',
    review: locale === 'de' ? 'Bestellung prüfen' : locale === 'en' ? 'Review order' : 'Bestelling controleren',
    payNow: locale === 'de' ? 'Jetzt bezahlen' : locale === 'en' ? 'Pay now' : 'Nu betalen',
    processing: locale === 'de' ? 'Verarbeitung...' : locale === 'en' ? 'Processing...' : 'Bezig…',
    yourOrder: locale === 'de' ? 'Ihre Bestellung' : locale === 'en' ? 'Your order' : 'Jouw bestelling',
    emptyCart: locale === 'de' ? 'Ihr Warenkorb ist leer' : locale === 'en' ? 'Your cart is empty' : 'Je winkelwagen is leeg',
    continueShopping: locale === 'de' ? 'Weiter einkaufen' : locale === 'en' ? 'Continue shopping' : 'Verder winkelen',
    closeCheckout: locale === 'de' ? 'Schließen' : locale === 'en' ? 'Close' : 'Sluiten',
    subtotal: locale === 'de' ? 'Zwischensumme' : locale === 'en' ? 'Subtotal' : 'Subtotaal',
    discount: locale === 'de' ? 'Mengenrabatt' : locale === 'en' ? 'Volume discount' : 'Volumekorting',
    promo2plus1: locale === 'de' ? '2+1 Aktion · 1 Flasche gratis' : locale === 'en' ? '2+1 promo · 1 bottle free' : '2+1 actie · 1 flesje gratis',
    couponLabel: locale === 'de' ? 'Coupon' : locale === 'en' ? 'Coupon' : 'Couponcode',
    total: locale === 'de' ? 'Gesamt' : locale === 'en' ? 'Total' : 'Totaal',
    freeShipping: locale === 'de' ? 'Kostenloser Versand' : locale === 'en' ? 'Free Shipping' : 'Gratis Verzending',
    showOrder: locale === 'de' ? 'Bestellung anzeigen' : locale === 'en' ? 'Show order' : 'Bestelling tonen',
    hideOrder: locale === 'de' ? 'Bestellung ausblenden' : locale === 'en' ? 'Hide order' : 'Bestelling verbergen',
    step1: locale === 'de' ? 'Kontakt & Adresse' : locale === 'en' ? 'Contact & address' : 'Gegevens',
    step2: locale === 'de' ? 'Lieferung' : locale === 'en' ? 'Delivery' : 'Bezorging',
    step3: locale === 'de' ? 'Bezahlen' : locale === 'en' ? 'Payment' : 'Betalen',
    contactInfo: locale === 'de' ? 'Kontakt' : locale === 'en' ? 'Contact' : 'Contact',
    name: locale === 'de' ? 'Name' : locale === 'en' ? 'Name' : 'Naam',
    email: locale === 'de' ? 'E-Mail' : locale === 'en' ? 'Email' : 'Email',
    phone: locale === 'de' ? 'Telefon' : locale === 'en' ? 'Phone' : 'Telefoon',
    shippingAddress: locale === 'de' ? 'Lieferadresse' : locale === 'en' ? 'Shipping address' : 'Bezorgadres',
    selectAddress: locale === 'de' ? 'Adresse wählen' : locale === 'en' ? 'Select address' : 'Selecteer adres',
    newAddress: locale === 'de' ? 'Neue Adresse eingeben' : locale === 'en' ? 'Enter new address' : 'Nieuw adres invoeren',
    manageAddresses: locale === 'de' ? 'Adressen verwalten' : locale === 'en' ? 'Manage addresses' : 'Adressen beheren',
    saveAddress: locale === 'de' ? 'Adresse für künftige Bestellungen speichern' : locale === 'en' ? 'Save address for future orders' : 'Adres opslaan voor toekomstige bestellingen',
    street: locale === 'de' ? 'Straße und Hausnummer' : locale === 'en' ? 'Street and house number' : 'Straat en huisnummer',
    postalCode: locale === 'de' ? 'Postleitzahl' : locale === 'en' ? 'Postal code' : 'Postcode',
    city: locale === 'de' ? 'Stadt' : locale === 'en' ? 'City' : 'Plaats',
    country: locale === 'de' ? 'Land' : locale === 'en' ? 'Country' : 'Land',
    deliveryIntro: locale === 'de'
      ? 'Wähle, wann und wo du deine Bestellung erhalten möchtest.'
      : locale === 'en'
      ? 'Choose when and where you want to receive your order.'
      : 'Kies wanneer en waar je je bestelling wilt ontvangen.',
    reviewIntro: locale === 'de'
      ? 'Alle Angaben ansehen und bezahlen.'
      : locale === 'en'
      ? 'Review everything and pay.'
      : 'Controleer alles en reken af.',
    emailRecognized: locale === 'de' ? 'Willkommen zurück!' : locale === 'en' ? 'Welcome back!' : 'Welkom terug!',
    emailRecognizedText: locale === 'de' ? 'Wir haben Ihre E-Mail-Adresse erkannt.' : locale === 'en' ? 'We recognized your email address.' : 'We herkennen je e-mailadres.',
    loginSuggestion: locale === 'de' ? 'Anmelden für ein besseres Einkaufserlebnis?' : locale === 'en' ? 'Sign in for a better experience?' : 'Inloggen voor een betere winkelervaring?',
    loginButton: locale === 'de' ? 'Anmelden' : locale === 'en' ? 'Sign in' : 'Inloggen',
    continueAsGuest: locale === 'de' ? 'Als Gast fortfahren' : locale === 'en' ? 'Continue as guest' : 'Verder als gast',
    usePreviousInfo: locale === 'de' ? 'Vorherige Daten verwenden' : locale === 'en' ? 'Use previous info' : 'Vorige gegevens gebruiken',
    chosenDelivery: locale === 'de' ? 'Gewählte Lieferung' : locale === 'en' ? 'Chosen delivery' : 'Gekozen bezorging',
    quantity: locale === 'de' ? 'Anzahl' : locale === 'en' ? 'Quantity' : 'Aantal',
    remove: locale === 'de' ? 'Entfernen' : locale === 'en' ? 'Remove' : 'Verwijderen',
    pricePerPiece: locale === 'de' ? 'pro Stück' : locale === 'en' ? 'per piece' : 'per stuk',
    errorGeneric: locale === 'de'
      ? 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.'
      : locale === 'en'
      ? 'An error occurred. Please try again.'
      : 'Er is iets fout gegaan. Probeer het opnieuw.',
  };

  const totalWithoutDiscounts = items.reduce((t, i) => t + i.price * i.quantity, 0);
  const totalPriceBeforePromo = getTotalPrice();
  const totalDiscounts = totalWithoutDiscounts - totalPriceBeforePromo;
  const hasNeemxPro = items.some((i) => i.slug?.startsWith('neemx-pro'));

  // 2+1 promo discount preview — client-side mirror of the server check in
  // /api/checkout. The server is still authoritative; this is purely so the
  // customer sees the discount before clicking pay.
  const [promoActive, setPromoActive] = useState(false);
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const match = document.cookie.match(new RegExp(`(?:^|; )${NEEMX_PROMO_COOKIE_NAME}=([^;]+)`));
    setPromoActive(isPromoCookieActive(match?.[1]));
  }, []);
  const promoCalc = useMemo(() => {
    if (!promoActive) return { discount: 0, freeItemSlug: null, eligible: false };
    return calculateNeemxPromoDiscount(
      items.map((i) => ({ slug: i.slug, unitPrice: i.price, quantity: i.quantity }))
    );
  }, [promoActive, items]);
  const totalPrice = Math.max(0, totalPriceBeforePromo - promoCalc.discount);

  // Step validation — Next button is disabled until the minimum fields are
  // present AND valid-shaped (postal code regex matches country).
  const postalValid = useMemo(() => {
    if (!postalCode) return false;
    if (country === 'NL') return /^[0-9]{4}\s?[A-Za-z]{2}$/.test(postalCode);
    if (country === 'BE') return /^[0-9]{4}$/.test(postalCode);
    if (country === 'DE') return /^[0-9]{5}$/.test(postalCode);
    return false;
  }, [postalCode, country]);

  const step1Valid =
    customerName.trim().length > 1 &&
    /.+@.+\..+/.test(customerEmail) &&
    street.trim().length > 2 &&
    !!houseNumberFromStreet(street) &&
    city.trim().length > 1 &&
    postalValid;

  const step2Valid = !!delivery;

  if (items.length === 0) {
    return (
      <div className="fixed inset-0 z-40 bg-gradient-to-b from-lumora-cream/30 to-white flex items-center justify-center p-6">
        <div className="text-center max-w-md">
          <svg className="w-24 h-24 text-lumora-dark/20 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <h1 className="text-3xl font-display font-bold text-lumora-dark mb-4">{t.emptyCart}</h1>
          <Link
            href={localizePathForLocale('/shop', locale)}
            className="inline-block px-8 py-3 bg-lumora-green-500 text-white rounded-xl font-semibold hover:bg-lumora-green-600 transition-colors"
          >
            {t.continueShopping}
          </Link>
        </div>
      </div>
    );
  }

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    setCheckoutLoading(true);
    const total = getTotalPrice();
    trackBeginCheckout(
      items.map((item) => ({
        id: item.product_id,
        name: item.name,
        price: calculateDiscountedPrice(item.price, item.quantity),
        quantity: item.quantity,
        category: 'Horticulture Products',
      })),
      total,
    );
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customer_name: customerName,
          customer_email: customerEmail,
          customer_phone: customerPhone,
          shipping_address: { street, city, postal_code: postalCode, country },
          delivery_preference: delivery
            ? {
                kind: delivery.kind,
                carrier: delivery.carrier,
                date: delivery.date || null,
                time_start: delivery.timeStart || null,
                time_end: delivery.timeEnd || null,
                time_type: delivery.timeType,
                price_cents: delivery.priceCents,
                label: delivery.label,
                pickup: delivery.pickup ?? null,
              }
            : null,
          items: items.map((i) => ({ product_id: i.product_id, quantity: i.quantity })),
          recovery_cart_id: recoveryCartId,
          locale,
        }),
      });
      const data = await response.json();
      if (data.success && data.payment_url) {
        if (user && saveAddressForFuture && selectedAddressId === '') {
          fetch('/api/addresses', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name: locale === 'de' ? 'Lieferadresse' : locale === 'en' ? 'Delivery Address' : 'Bezorgadres',
              street, city, postal_code: postalCode, country,
              phone: customerPhone || null,
              is_default: savedAddresses.length === 0,
            }),
          }).catch((err) => console.error('Failed to save address:', err));
        }
        try { window.localStorage.removeItem(LS_KEY); } catch { /* quota */ }
        clearCart();
        window.location.href = data.payment_url;
      } else {
        alert(t.errorGeneric);
        setCheckoutLoading(false);
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert(t.errorGeneric);
      setCheckoutLoading(false);
    }
  };

  const goNext = () => {
    if (step === 1 && step1Valid) setStep(2);
    else if (step === 2 && step2Valid) setStep(3);
  };
  const goBack = () => {
    if (step === 3) setStep(2);
    else if (step === 2) setStep(1);
  };

  // ──────────────────────────────────────────────────────────
  // Shared bits
  // ──────────────────────────────────────────────────────────
  const StepDot = ({ n, label, current, done }: { n: number; label: string; current: boolean; done: boolean }) => (
    <div className="flex items-center gap-2 min-w-0">
      <div
        className={`w-7 h-7 rounded-full flex items-center justify-center font-semibold text-xs flex-shrink-0 ${
          done
            ? 'bg-lumora-green-500 text-white'
            : current
            ? 'bg-lumora-dark text-white ring-4 ring-lumora-dark/10'
            : 'bg-lumora-dark/10 text-lumora-dark/50'
        }`}
      >
        {done ? (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        ) : (
          n
        )}
      </div>
      <span
        className={`text-sm font-medium truncate ${
          current ? 'text-lumora-dark' : done ? 'text-lumora-dark/70' : 'text-lumora-dark/40'
        }`}
      >
        {label}
      </span>
    </div>
  );

  const orderSummary = (
    <div className="space-y-5">
      <div className="space-y-3">
        {items.map((item) => {
          const discountInfo = getDiscountInfo(item.quantity);
          const discountedPrice = calculateDiscountedPrice(item.price, item.quantity);
          const itemTotal = calculateTotalPrice(item.price, item.quantity);
          return (
            <div key={item.product_id} className="flex gap-3">
              <div className="relative w-16 h-16 flex-shrink-0">
                <img
                  src={item.image_url}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-lg"
                  onError={(e) => { (e.target as HTMLImageElement).src = '/placeholder-product.jpg'; }}
                />
                <span className="absolute -top-2 -right-2 bg-lumora-dark text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center">
                  {item.quantity}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-semibold text-lumora-dark truncate">{item.name}</div>
                {discountInfo.hasDiscount ? (
                  <div className="text-xs text-lumora-green-600 font-medium">-{discountInfo.currentDiscount}% · {formatPrice(discountedPrice)} {t.pricePerPiece}</div>
                ) : (
                  <div className="text-xs text-lumora-dark/60">{formatPrice(item.price)} {t.pricePerPiece}</div>
                )}
                {step === 1 && (
                  <div className="flex items-center gap-1 mt-1">
                    <button
                      type="button"
                      onClick={() => item.quantity > 1 && updateQuantity(item.product_id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                      className="w-6 h-6 flex items-center justify-center rounded bg-white hover:bg-lumora-green-500 hover:text-white transition-colors disabled:opacity-40 border border-lumora-dark/10"
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>
                    <span className="w-6 text-center text-xs font-semibold">{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                      className="w-6 h-6 flex items-center justify-center rounded bg-white hover:bg-lumora-green-500 hover:text-white transition-colors border border-lumora-dark/10"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                    <button
                      type="button"
                      onClick={() => removeItem(item.product_id)}
                      className="ml-auto text-xs text-lumora-dark/40 hover:text-red-500"
                      aria-label={t.remove}
                    >
                      {t.remove}
                    </button>
                  </div>
                )}
              </div>
              <div className="text-sm font-bold text-lumora-dark whitespace-nowrap">{formatPrice(itemTotal)}</div>
            </div>
          );
        })}
      </div>

      <div className="border-t border-lumora-dark/10 pt-4 space-y-2 text-sm">
        <div className="flex justify-between text-lumora-dark/70">
          <span>{t.subtotal}</span>
          <span>{formatPrice(totalWithoutDiscounts)}</span>
        </div>
        {totalDiscounts > 0 && (
          <div className="flex justify-between text-lumora-green-600 font-medium">
            <span>{t.discount}</span>
            <span>-{formatPrice(totalDiscounts)}</span>
          </div>
        )}
        {promoCalc.eligible && (
          <div className="flex justify-between items-start gap-3 text-lumora-green-600 font-medium">
            <span className="flex flex-col gap-1">
              <span className="inline-flex items-center gap-1.5">
                <span aria-hidden>🎁</span>
                {t.promo2plus1}
              </span>
              <span className="inline-flex items-center gap-1 self-start text-[10px] font-mono uppercase tracking-wider bg-lumora-green-600 text-white px-1.5 py-0.5 rounded">
                {t.couponLabel}: NEEMX2PLUS1
              </span>
            </span>
            <span className="whitespace-nowrap">-{formatPrice(promoCalc.discount)}</span>
          </div>
        )}
        <div className="flex justify-between text-lumora-green-600">
          <span>{t.freeShipping}</span>
          <span>€0,00</span>
        </div>
        <div className="flex justify-between text-lg font-display font-bold text-lumora-dark pt-3 border-t border-lumora-dark/10">
          <span>{t.total}</span>
          <span className="text-lumora-green-600">{formatPrice(totalPrice)}</span>
        </div>
      </div>

      {delivery && (
        <div className="border-t border-lumora-dark/10 pt-4">
          <div className="text-xs font-mono uppercase tracking-wider text-lumora-dark/60 mb-1">{t.chosenDelivery}</div>
          <div className="text-sm text-lumora-dark">{delivery.label}</div>
        </div>
      )}
    </div>
  );

  return (
    <div className="fixed inset-0 z-40 bg-white overflow-y-auto">
      {/* ─── Top chrome ────────────────────────────── */}
      <header className="sticky top-0 z-10 bg-white/95 backdrop-blur border-b border-lumora-dark/10">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 h-14 flex items-center justify-between">
          <Link href={localizePathForLocale('/', locale)} className="flex items-center gap-2">
            <span className="font-display text-lg font-bold text-lumora-dark">Lumora</span>
            <span className="text-xs text-lumora-dark/50 hidden sm:inline">Horticulture</span>
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-xs text-lumora-dark/60 hidden md:flex items-center gap-1.5">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              {t.secureBy}
            </span>
            <Link
              href={localizePathForLocale('/shop', locale)}
              className="text-sm text-lumora-dark/60 hover:text-lumora-dark flex items-center gap-1"
              aria-label={t.closeCheckout}
            >
              <span className="hidden sm:inline">{t.closeCheckout}</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </Link>
          </div>
        </div>
      </header>

      {/* ─── Mobile summary toggle ──────────────────── */}
      <div className="lg:hidden bg-lumora-cream/40 border-b border-lumora-dark/10">
        <button
          type="button"
          onClick={() => setSummaryOpen(!summaryOpen)}
          className="w-full max-w-[1400px] mx-auto px-4 py-3 flex items-center justify-between"
        >
          <span className="flex items-center gap-2 text-sm font-medium text-lumora-dark">
            <svg className={`w-4 h-4 transition-transform ${summaryOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
            {summaryOpen ? t.hideOrder : t.showOrder}
          </span>
          <span className="font-display text-lg font-bold text-lumora-green-600">{formatPrice(totalPrice)}</span>
        </button>
        {summaryOpen && (
          <div className="max-w-[1400px] mx-auto px-4 pb-4 pt-1">
            <div className="bg-white rounded-xl p-4 border border-lumora-dark/10">{orderSummary}</div>
          </div>
        )}
      </div>

      {/* ─── Main 2-column ─────────────────────────── */}
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_440px] min-h-[calc(100vh-56px)]">
        {/* Left: form */}
        <main className="px-4 sm:px-8 lg:px-16 py-8 lg:py-12">
          {/* Step indicator */}
          <nav aria-label="Checkout steps" className="mb-8 flex items-center gap-3 overflow-x-auto">
            <StepDot n={1} label={t.step1} current={step === 1} done={step > 1} />
            <div className="flex-1 min-w-[20px] h-px bg-lumora-dark/15" />
            <StepDot n={2} label={t.step2} current={step === 2} done={step > 2} />
            <div className="flex-1 min-w-[20px] h-px bg-lumora-dark/15" />
            <StepDot n={3} label={t.step3} current={step === 3} done={false} />
          </nav>

          <form
            onSubmit={(e) => {
              if (step === 3) {
                handlePay(e);
              } else {
                e.preventDefault();
                goNext();
              }
            }}
            className="max-w-2xl"
          >
            {/* ─── STEP 1: Contact + address ─── */}
            {step === 1 && (
              <div className="space-y-8">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-display font-bold text-lumora-dark mb-1">{t.step1}</h1>
                  <p className="text-sm text-lumora-dark/60">
                    {locale === 'de'
                      ? 'Wir brauchen deine Kontaktdaten und Lieferadresse.'
                      : locale === 'en'
                      ? 'We need your contact and shipping address.'
                      : 'We hebben je contactgegevens en bezorgadres nodig.'}
                  </p>
                </div>

                {/* Contact */}
                <section className="space-y-4">
                  <h2 className="text-sm font-mono uppercase tracking-wider text-lumora-dark/60">{t.contactInfo}</h2>

                  <div>
                    <label className="block text-sm font-medium text-lumora-dark mb-1">{t.email} *</label>
                    <div className="relative">
                      <input
                        type="email"
                        required
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                        className="w-full px-4 py-3 border border-lumora-dark/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-lumora-green-500 focus:border-transparent"
                      />
                      {emailCheckLoading && (
                        <div className="absolute right-3 top-1/2 -translate-y-1/2">
                          <svg className="animate-spin h-5 w-5 text-lumora-green-500" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                        </div>
                      )}
                    </div>
                  </div>

                  {!user && showEmailPrompt && emailExists && (
                    <div className="bg-gradient-to-r from-lumora-green-500/10 to-lumora-gold/10 rounded-xl p-4 border-2 border-lumora-green-500/30">
                      <h3 className="font-bold text-lumora-dark mb-1">{t.emailRecognized}</h3>
                      <p className="text-sm text-lumora-dark/80 mb-2">{t.emailRecognizedText}</p>
                      <p className="text-sm text-lumora-dark/70 mb-3">{t.loginSuggestion}</p>
                      <div className="flex flex-wrap gap-2">
                        <Link href="/handler/signin" className="px-4 py-2 bg-lumora-green-500 text-white rounded-lg font-medium hover:bg-lumora-green-600 text-sm">
                          {t.loginButton}
                        </Link>
                        {suggestedData && (suggestedData.customer_name || suggestedData.customer_phone) && (
                          <button type="button" onClick={applySuggestedData} className="px-4 py-2 bg-lumora-gold/20 text-lumora-dark rounded-lg font-medium hover:bg-lumora-gold/30 text-sm">
                            {t.usePreviousInfo}
                          </button>
                        )}
                        <button type="button" onClick={() => setShowEmailPrompt(false)} className="px-4 py-2 bg-lumora-cream/50 text-lumora-dark rounded-lg font-medium hover:bg-lumora-cream text-sm">
                          {t.continueAsGuest}
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-lumora-dark mb-1">{t.name} *</label>
                      <input
                        type="text"
                        required
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="w-full px-4 py-3 border border-lumora-dark/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-lumora-green-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-lumora-dark mb-1">{t.phone}</label>
                      <input
                        type="tel"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                        className="w-full px-4 py-3 border border-lumora-dark/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-lumora-green-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                </section>

                {/* Address */}
                <section className="space-y-4">
                  <h2 className="text-sm font-mono uppercase tracking-wider text-lumora-dark/60">{t.shippingAddress}</h2>

                  {user && savedAddresses.length > 0 && (
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-sm font-medium text-lumora-dark">{t.selectAddress}</label>
                        <Link href={localizePathForLocale('/account/addresses', locale)} className="text-xs text-lumora-green-600 hover:text-lumora-green-700 font-medium">
                          {t.manageAddresses}
                        </Link>
                      </div>
                      <select
                        value={selectedAddressId}
                        onChange={(e) => handleAddressSelect(e.target.value)}
                        className="w-full px-4 py-3 border border-lumora-dark/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-lumora-green-500"
                      >
                        <option value="">{t.newAddress}</option>
                        {savedAddresses.map((a) => (
                          <option key={a.id} value={a.id}>
                            {a.name} — {a.street}, {a.city}
                            {a.is_default ? ` (${locale === 'de' ? 'Standard' : locale === 'en' ? 'Default' : 'Standaard'})` : ''}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-lumora-dark mb-1">{t.street} *</label>
                      <input
                        type="text"
                        required
                        value={street}
                        onChange={(e) => setStreet(e.target.value)}
                        className="w-full px-4 py-3 border border-lumora-dark/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-lumora-green-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-lumora-dark mb-1">{t.country} *</label>
                      <select
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="w-full px-4 py-3 border border-lumora-dark/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-lumora-green-500 focus:border-transparent"
                      >
                        <option value="NL">Nederland</option>
                        <option value="BE">België</option>
                        <option value="DE">Deutschland</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-lumora-dark mb-1">{t.postalCode} *</label>
                      <input
                        type="text"
                        required
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        className="w-full px-4 py-3 border border-lumora-dark/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-lumora-green-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-lumora-dark mb-1">{t.city} *</label>
                      <input
                        type="text"
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full px-4 py-3 border border-lumora-dark/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-lumora-green-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  {user && selectedAddressId === '' && (
                    <label className="flex items-start gap-3 p-3 bg-lumora-cream/30 rounded-xl border border-lumora-green-500/20 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={saveAddressForFuture}
                        onChange={(e) => setSaveAddressForFuture(e.target.checked)}
                        className="mt-0.5 w-4 h-4 text-lumora-green-500 rounded"
                      />
                      <span className="text-sm text-lumora-dark">{t.saveAddress}</span>
                    </label>
                  )}
                </section>
              </div>
            )}

            {/* ─── STEP 2: Delivery ─── */}
            {step === 2 && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-display font-bold text-lumora-dark mb-1">{t.step2}</h1>
                  <p className="text-sm text-lumora-dark/60">{t.deliveryIntro}</p>
                </div>

                {/* Address recap */}
                <div className="bg-lumora-cream/30 rounded-xl p-4 border border-lumora-dark/10 flex items-start justify-between gap-4">
                  <div className="text-sm text-lumora-dark">
                    <div className="font-semibold">{customerName}</div>
                    <div className="text-lumora-dark/70">{street}</div>
                    <div className="text-lumora-dark/70">{postalCode} {city}, {country}</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="text-xs font-medium text-lumora-green-600 hover:text-lumora-green-700 whitespace-nowrap"
                  >
                    {locale === 'de' ? 'Ändern' : locale === 'en' ? 'Edit' : 'Wijzigen'}
                  </button>
                </div>

                <DeliveryPicker
                  postalCode={postalCode}
                  houseNumber={houseNumberFromStreet(street)}
                  countryCode={(country as 'NL' | 'BE' | 'DE') ?? 'NL'}
                  locale={locale as 'nl' | 'en' | 'de'}
                  value={delivery}
                  onChange={setDelivery}
                />
              </div>
            )}

            {/* ─── STEP 3: Review + pay ─── */}
            {step === 3 && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-display font-bold text-lumora-dark mb-1">{t.step3}</h1>
                  <p className="text-sm text-lumora-dark/60">{t.reviewIntro}</p>
                </div>

                {/* Recap */}
                <div className="space-y-3">
                  <div className="bg-lumora-cream/30 rounded-xl p-4 border border-lumora-dark/10 flex items-start justify-between gap-4">
                    <div className="text-sm text-lumora-dark">
                      <div className="text-xs font-mono uppercase tracking-wider text-lumora-dark/60 mb-1">{t.contactInfo}</div>
                      <div>{customerName}</div>
                      <div className="text-lumora-dark/70">{customerEmail}</div>
                      {customerPhone && <div className="text-lumora-dark/70">{customerPhone}</div>}
                    </div>
                    <button type="button" onClick={() => setStep(1)} className="text-xs font-medium text-lumora-green-600 hover:text-lumora-green-700">
                      {locale === 'de' ? 'Ändern' : locale === 'en' ? 'Edit' : 'Wijzigen'}
                    </button>
                  </div>

                  <div className="bg-lumora-cream/30 rounded-xl p-4 border border-lumora-dark/10 flex items-start justify-between gap-4">
                    <div className="text-sm text-lumora-dark">
                      <div className="text-xs font-mono uppercase tracking-wider text-lumora-dark/60 mb-1">{t.shippingAddress}</div>
                      <div>{street}</div>
                      <div className="text-lumora-dark/70">{postalCode} {city}, {country}</div>
                    </div>
                    <button type="button" onClick={() => setStep(1)} className="text-xs font-medium text-lumora-green-600 hover:text-lumora-green-700">
                      {locale === 'de' ? 'Ändern' : locale === 'en' ? 'Edit' : 'Wijzigen'}
                    </button>
                  </div>

                  {delivery && (
                    <div className="bg-lumora-cream/30 rounded-xl p-4 border border-lumora-dark/10 flex items-start justify-between gap-4">
                      <div className="text-sm text-lumora-dark">
                        <div className="text-xs font-mono uppercase tracking-wider text-lumora-dark/60 mb-1">{t.chosenDelivery}</div>
                        <div>{delivery.label}</div>
                      </div>
                      <button type="button" onClick={() => setStep(2)} className="text-xs font-medium text-lumora-green-600 hover:text-lumora-green-700">
                        {locale === 'de' ? 'Ändern' : locale === 'en' ? 'Edit' : 'Wijzigen'}
                      </button>
                    </div>
                  )}
                </div>

                {/* Payment-method badges */}
                <div className="bg-white rounded-xl p-4 border border-lumora-dark/10">
                  <p className="text-xs text-lumora-dark/60 mb-3 text-center">{t.secureBy}</p>
                  <div className="flex justify-center items-center gap-2 flex-wrap">
                    <span className="bg-[#00A4E4] text-white text-xs font-bold px-2 py-1 rounded">iDEAL</span>
                    <span className="bg-black text-white text-xs font-bold px-2 py-1 rounded"> Pay</span>
                    <span className="bg-white border border-gray-300 text-gray-800 text-xs font-bold px-2 py-1 rounded">G Pay</span>
                    <span className="bg-[#005B9A] text-white text-xs font-bold px-2 py-1 rounded">Bancontact</span>
                    <span className="bg-[#E30613] text-white text-xs font-bold px-2 py-1 rounded">Belfius</span>
                    <span className="bg-[#007ACC] text-white text-xs font-bold px-2 py-1 rounded">KBC/CBC</span>
                    <span className="bg-[#00A4E4] text-white text-xs font-bold px-2 py-1 rounded">Wero</span>
                    <span className="bg-gray-800 text-white text-xs font-bold px-2 py-1 rounded">VISA</span>
                    <span className="bg-[#FF5F00] text-white text-xs font-bold px-2 py-1 rounded">MC</span>
                  </div>
                </div>

                {hasNeemxPro && (
                  <p className="text-xs text-lumora-dark/60">
                    {locale === 'de'
                      ? '↩ NEEMX PRO: Rückgabe nur bei ungeöffneten Flaschen.'
                      : locale === 'en'
                      ? '↩ NEEMX PRO: Return only for unopened bottles.'
                      : '↩ NEEMX PRO: Retour alleen bij ongeopende flesjes.'}
                  </p>
                )}
              </div>
            )}

            {/* ─── Step footer (Back / Next / Pay) ─── */}
            <div className="mt-10 flex flex-col-reverse sm:flex-row items-stretch sm:items-center gap-3 sm:justify-between border-t border-lumora-dark/10 pt-6">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={goBack}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-medium text-lumora-dark hover:bg-lumora-cream/40 rounded-xl"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  {t.back}
                </button>
              ) : (
                <Link
                  href={localizePathForLocale('/shop', locale)}
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-medium text-lumora-dark/60 hover:text-lumora-dark"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  {t.continueShopping}
                </Link>
              )}

              <button
                type="submit"
                disabled={
                  checkoutLoading ||
                  (step === 1 && !step1Valid) ||
                  (step === 2 && !step2Valid)
                }
                className="inline-flex items-center justify-center gap-2 bg-lumora-green-500 text-white px-6 py-3.5 rounded-xl font-semibold hover:bg-lumora-green-600 transition-all disabled:bg-gray-300 disabled:cursor-not-allowed shadow-soft hover:shadow-soft-md"
              >
                {step === 3 ? (checkoutLoading ? t.processing : t.payNow) : t.next}
                {!checkoutLoading && (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                )}
              </button>
            </div>
          </form>

          {/* Trust bar below form — always visible for reassurance */}
          <div className="mt-10 pt-6 border-t border-lumora-dark/5 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-lumora-dark/60">
            <div className="flex items-center gap-2">
              <span className="text-lumora-green-500">✓</span>
              {locale === 'de' ? 'Gratis Versand NL/BE/DE' : locale === 'en' ? 'Free shipping NL/BE/DE' : 'Gratis verzending NL/BE/DE'}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lumora-green-500">↩</span>
              {locale === 'de' ? '14 Tage Rückgabe' : locale === 'en' ? '14 days return' : '14 dagen retour'}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lumora-green-500">🔒</span>
              {locale === 'de' ? 'Sicher bezahlen' : locale === 'en' ? 'Secure payment' : 'Veilig betalen'}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lumora-green-500">📞</span>
              <a href="https://wa.me/31638382564" target="_blank" rel="noopener noreferrer" className="hover:text-lumora-green-600">WhatsApp 06-38382564</a>
            </div>
          </div>
        </main>

        {/* Right: sticky order summary (desktop only) */}
        <aside className="hidden lg:block bg-lumora-cream/30 border-l border-lumora-dark/10">
          <div className="sticky top-14 p-10 max-h-[calc(100vh-56px)] overflow-y-auto">
            <h2 className="text-sm font-mono uppercase tracking-wider text-lumora-dark/60 mb-4">{t.yourOrder}</h2>
            {orderSummary}
          </div>
        </aside>
      </div>
    </div>
  );
}

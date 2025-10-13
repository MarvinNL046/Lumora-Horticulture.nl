'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { useCart } from '@/contexts/CartContext';

export default function CartEmailPrompt() {
  const params = useParams();
  const locale = (params?.locale as string) || 'nl';
  const { showEmailPrompt, setShowEmailPrompt, setSavedEmail } = useCart();
  const [email, setEmail] = useState('');
  const [saving, setSaving] = useState(false);

  const t = {
    title:
      locale === 'de'
        ? 'Behalten Sie Ihren Warenkorb'
        : locale === 'en'
        ? 'Save Your Cart'
        : 'Bewaar Je Winkelwagen',
    description:
      locale === 'de'
        ? 'Geben Sie Ihre E-Mail-Adresse ein, damit wir Ihren Warenkorb speichern können'
        : locale === 'en'
        ? 'Enter your email to save your cart and get reminders'
        : 'Voer je email in om je winkelwagen te bewaren en herinneringen te ontvangen',
    placeholder: 'Email',
    save: locale === 'de' ? 'Speichern' : locale === 'en' ? 'Save' : 'Opslaan',
    later: locale === 'de' ? 'Später' : locale === 'en' ? 'Later' : 'Later',
  };

  if (!showEmailPrompt) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setSaving(true);
    setSavedEmail(email);
    setSaving(false);
  };

  return (
    <div className="bg-lumora-gold/10 border-t border-lumora-gold/30 p-4">
      <div className="text-center mb-3">
        <h3 className="font-semibold text-lumora-dark mb-1">{t.title}</h3>
        <p className="text-xs text-lumora-dark/70">{t.description}</p>
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t.placeholder}
          className="flex-1 px-3 py-2 border border-lumora-dark/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-lumora-gold focus:border-transparent"
        />
        <button
          type="submit"
          disabled={saving}
          className="px-4 py-2 bg-lumora-gold text-lumora-dark font-semibold rounded-lg hover:bg-lumora-gold-600 transition-colors text-sm disabled:opacity-50"
        >
          {saving ? '...' : t.save}
        </button>
      </form>

      <button
        onClick={() => setShowEmailPrompt(false)}
        className="text-xs text-lumora-dark/60 hover:text-lumora-dark mt-2 w-full text-center"
      >
        {t.later}
      </button>
    </div>
  );
}

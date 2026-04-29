'use client';

interface Props {
  setsRemaining: number;
}

export default function PromoBar({ setsRemaining }: Props) {
  return (
    <div className="sticky top-0 z-50 bg-lumora-gold text-lumora-dark text-center py-2 px-4 text-sm font-semibold shadow-md">
      <span className="inline-flex items-center gap-2">
        <span aria-hidden>🌿</span>
        <span>
          Tijdelijke actie: <strong>2 + 1 GRATIS</strong> — Nog{' '}
          <strong>{setsRemaining} sets</strong> beschikbaar
        </span>
      </span>
    </div>
  );
}

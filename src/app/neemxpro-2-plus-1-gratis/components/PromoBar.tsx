'use client';

interface Props {
  setsRemaining: number;
}

// Single uniform font-weight on purpose. Earlier version used <strong>
// around the digits ("2", "1", and the stock number). On some Android
// in-app browsers (Facebook/Instagram webview with Inter variable not
// fully loaded) those bold-weight glyphs rendered as tofu boxes, which
// looked broken — exactly the part of the message that drives urgency.
// Keeping a single weight avoids the bold-fallback problem entirely.
export default function PromoBar({ setsRemaining }: Props) {
  return (
    <div className="sticky top-0 z-50 bg-lumora-gold text-lumora-dark text-center py-2 px-4 text-sm font-bold shadow-md">
      <span className="inline-flex flex-wrap items-center justify-center gap-x-2 gap-y-0.5">
        <span aria-hidden>🌿</span>
        <span>Tijdelijke 2+1 actie</span>
        <span className="opacity-70">·</span>
        <span>Nog {setsRemaining} sets beschikbaar</span>
      </span>
    </div>
  );
}

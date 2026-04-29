'use client';

interface Props {
  targetId: string;
}

export default function StickyMobileCta({ targetId }: Props) {
  const handleClick = () => {
    document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-lumora-dark border-t border-lumora-gold/40 px-4 py-3 shadow-2xl">
      <button
        type="button"
        onClick={handleClick}
        className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 rounded-xl text-base"
      >
        Bestel je 2+1 nu →
      </button>
    </div>
  );
}

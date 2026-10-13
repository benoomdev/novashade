type Props = {
  className?: string;
  // « clair » pour les fonds sombres (pied de page)
  variante?: 'sombre' | 'clair';
};

// Logo horizontal : pergola + filet + NOVA (fin) SHADE (or)
export default function Logo({className = '', variante = 'sombre'}: Props) {
  const clair = variante === 'clair';

  return (
    <span className={`flex items-center ${className}`}>
      <svg
        viewBox="-2 -2 184 130"
        aria-hidden="true"
        className="h-9 w-auto shrink-0 sm:h-11"
        fill={clair ? 'var(--color-noir)' : 'var(--color-creme)'}
        stroke={clair ? 'var(--color-creme)' : 'var(--color-anthracite)'}
        strokeWidth="3"
        strokeLinejoin="round"
      >
        {/* Lames du toit */}
        <polygon points="12,21 52,15 62,15 164,18 98,27" fill="var(--color-or)" stroke="none" />
        {/* Poteau du fond */}
        <rect x="92" y="24" width="8" height="62" rx="1.5" />
        {/* Poutres */}
        <polygon points="2,10 54,2 54,12 2,20" />
        <polygon points="60,2 176,8 176,16 60,12" />
        {/* Poteaux */}
        <rect x="2" y="12" width="8" height="98" rx="1.5" />
        <rect x="168" y="10" width="8" height="102" rx="1.5" />
        <rect x="52" y="2" width="10" height="120" rx="1.5" />
      </svg>

      <span aria-hidden="true" className={`mx-3 h-8 w-px sm:mx-5 sm:h-10 ${clair ? 'bg-creme/25' : 'bg-bordure'}`} />

      <span className="text-lg tracking-[0.3em] sm:text-2xl">
        <span className={`font-light ${clair ? 'text-creme' : 'text-anthracite'}`}>NOVA</span>
        <span className="font-semibold text-or">SHADE</span>
      </span>
    </span>
  );
}

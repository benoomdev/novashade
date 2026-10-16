import Image from 'next/image';
import logoCompact from '@/public/logo/logo-compact-sombre.png';
import logoComplet from '@/public/logo/logo-complet-clair.png';

type Props = {
  className?: string;
  // « clair » pour les fonds sombres (pied de page) : logo complet avec slogans, textes blancs
  variante?: 'sombre' | 'clair';
};

// Header (fond crème) : toit + NOVASHADE en anthracite et or
// Pied de page (fond noir) : logo complet avec les deux slogans
export default function Logo({className = '', variante = 'sombre'}: Props) {
  const clair = variante === 'clair';

  return (
    <Image
      src={clair ? logoComplet : logoCompact}
      alt="Novashade"
      preload={!clair}
      sizes={clair ? '256px' : '(min-width: 640px) 200px, 170px'}
      className={`w-auto ${clair ? 'h-24' : 'h-11 sm:h-[52px]'} ${className}`}
    />
  );
}

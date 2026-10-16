'use client';

import {useState} from 'react';
import Image, {type StaticImageData} from 'next/image';

type Props = {
  libelleFiltres: string;
  libelleTout: string;
  categories: {cle: string; label: string}[];
  photos: {id: string; photo: StaticImageData; categorie: string; alt: string; label: string; entier?: boolean}[];
};

const TOUT = 'tout';

// Filtrage côté navigateur : changer de catégorie ne recharge pas la page
export default function FiltreInspirations({libelleFiltres, libelleTout, categories, photos}: Props) {
  const [active, setActive] = useState(TOUT);

  const filtres = [{cle: TOUT, label: libelleTout}, ...categories];
  const visibles = active === TOUT ? photos : photos.filter((p) => p.categorie === active);
  const compter = (cle: string) => (cle === TOUT ? photos.length : photos.filter((p) => p.categorie === cle).length);

  return (
    <>
      <div
        role="group"
        aria-label={libelleFiltres}
        className="-mx-4 mt-10 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0"
      >
        {filtres.map(({cle, label}) => {
          const estActif = cle === active;
          return (
            <button
              key={cle}
              type="button"
              onClick={() => setActive(cle)}
              aria-pressed={estActif}
              className={`shrink-0 rounded-full border px-5 py-2.5 text-sm font-medium transition-colors ${
                estActif
                  ? 'border-anthracite bg-anthracite text-creme'
                  : 'border-bordure bg-creme text-anthracite hover:border-or'
              }`}
            >
              {label}
              <span className={`ml-2 text-xs ${estActif ? 'text-or' : 'text-gris'}`}>{compter(cle)}</span>
            </button>
          );
        })}
      </div>

      {/* La clé relance l'animation d'apparition à chaque changement de catégorie */}
      <ul key={active} className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3">
        {visibles.map(({id, photo, alt, label, entier}, i) => (
          <li
            key={id}
            className={`group relative aspect-[4/3] animate-apparition overflow-hidden rounded-xl ${entier ? 'border border-bordure bg-white' : ''}`}
            style={{animationDelay: `${Math.min(i, 8) * 50}ms`}}
          >
            <Image
              src={photo}
              alt={alt}
              fill
              placeholder="blur"
              sizes="(min-width: 1024px) 360px, 50vw"
              className={`transition-transform duration-700 group-hover:scale-105 ${entier ? 'object-contain p-2' : 'object-cover'}`}
            />
            {active === TOUT && (
              <span className="absolute bottom-2 left-2 rounded-full bg-noir/70 px-2.5 py-1 text-[11px] sm:bottom-3 sm:left-3 sm:px-3 sm:text-xs font-medium text-creme backdrop-blur">
                {label}
              </span>
            )}
          </li>
        ))}
      </ul>
    </>
  );
}

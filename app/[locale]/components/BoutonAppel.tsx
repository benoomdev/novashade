'use client';

import {useEffect, useState} from 'react';
import {useTranslations} from 'next-intl';
import {site} from '@/site';

// Distance de défilement (en px) à partir de laquelle le bouton apparaît
const SEUIL = 80;

// Bouton d'appel flottant, uniquement sur mobile (sous le menu ouvert, qui est en z-50)
// Masqué en haut de page, il apparaît dès que le visiteur commence à défiler
export default function BoutonAppel() {
  const t = useTranslations('BoutonAppel');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const surDefilement = () => setVisible(window.scrollY > SEUIL);
    surDefilement();
    window.addEventListener('scroll', surDefilement, {passive: true});
    return () => window.removeEventListener('scroll', surDefilement);
  }, []);

  return (
    <a
      href={site.telephoneLien}
      aria-label={t('aria', {telephone: site.telephone})}
      aria-hidden={!visible}
      tabIndex={visible ? undefined : -1}
      className={`fixed right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-or text-noir shadow-lg shadow-noir/25 ring-4 ring-creme/60 transition-all duration-300 active:scale-95 md:hidden ${
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
      }`}
      style={{bottom: 'calc(1rem + env(safe-area-inset-bottom))'}}
    >
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    </a>
  );
}

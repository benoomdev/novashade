'use client';

import {useEffect, useState} from 'react';
import {useLocale, useTranslations} from 'next-intl';
import {Link, usePathname} from '@/i18n/navigation';
import {routing} from '@/i18n/routing';
import Logo from './Logo';

const liens = [
  {cle: 'services', href: '#services'},
  {cle: 'inspirations', href: '#inspirations'},
  {cle: 'apropos', href: '#a-propos'},
  {cle: 'contact', href: '#contact'}
] as const;

export default function Header() {
  const t = useTranslations('Header');
  const locale = useLocale();
  const pathname = usePathname();
  const [menuOuvert, setMenuOuvert] = useState(false);
  const [defile, setDefile] = useState(false);

  // Ombre et fond plus opaque dès qu'on descend dans la page
  useEffect(() => {
    const surDefilement = () => setDefile(window.scrollY > 8);
    surDefilement();
    window.addEventListener('scroll', surDefilement, {passive: true});
    return () => window.removeEventListener('scroll', surDefilement);
  }, []);

  // Bloque le défilement de la page quand le menu mobile est ouvert
  useEffect(() => {
    document.body.style.overflow = menuOuvert ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOuvert]);

  const fermerMenu = () => setMenuOuvert(false);

  const selecteurLangue = (
    <div className="flex items-center gap-1 text-sm font-medium">
      {routing.locales.map((l, i) => (
        <span key={l} className="flex items-center gap-1">
          {i > 0 && <span className="text-bordure">|</span>}
          <Link
            href={pathname}
            locale={l}
            onClick={fermerMenu}
            aria-current={l === locale ? 'true' : undefined}
            className={
              l === locale
                ? 'text-or-fonce'
                : 'text-gris transition-colors hover:text-anthracite'
            }
          >
            {l.toUpperCase()}
          </Link>
        </span>
      ))}
    </div>
  );

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-all duration-300 ${
        defile || menuOuvert
          ? 'border-bordure bg-creme/95 shadow-sm backdrop-blur'
          : 'border-transparent bg-creme'
      }`}
    >
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          onClick={fermerMenu}
          aria-label={t('accueil')}
        >
          <Logo />
        </Link>

        {/* Navigation ordinateur */}
        <nav aria-label={t('navigation')} className="hidden items-center gap-8 md:flex">
          {liens.map(({cle, href}) => (
            <a
              key={cle}
              href={href}
              className="text-sm font-medium text-anthracite transition-colors hover:text-or-fonce"
            >
              {t(cle)}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-6 md:flex">
          {selecteurLangue}
          <a
            href="#contact"
            className="rounded-full bg-or px-5 py-2.5 text-sm font-medium text-noir transition-opacity hover:opacity-90"
          >
            {t('devis')}
          </a>
        </div>

        {/* Bouton menu mobile */}
        <button
          type="button"
          onClick={() => setMenuOuvert((o) => !o)}
          aria-expanded={menuOuvert}
          aria-controls="menu-mobile"
          aria-label={menuOuvert ? t('fermerMenu') : t('ouvrirMenu')}
          className="-mr-2 flex h-11 w-11 items-center justify-center md:hidden"
        >
          <span className="relative block h-4 w-6">
            <span
              className={`absolute left-0 h-0.5 w-6 bg-anthracite transition-all duration-300 ${
                menuOuvert ? 'top-[7px] rotate-45' : 'top-0'
              }`}
            />
            <span
              className={`absolute left-0 top-[7px] h-0.5 w-6 bg-anthracite transition-opacity duration-300 ${
                menuOuvert ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <span
              className={`absolute left-0 h-0.5 w-6 bg-anthracite transition-all duration-300 ${
                menuOuvert ? 'top-[7px] -rotate-45' : 'top-[14px]'
              }`}
            />
          </span>
        </button>
      </div>

      {/* Menu mobile */}
      <div
        id="menu-mobile"
        hidden={!menuOuvert}
        className="h-[calc(100dvh-5rem)] overflow-y-auto border-t border-bordure bg-creme md:hidden"
      >
        <nav aria-label={t('navigation')} className="flex flex-col px-4 py-6">
          {liens.map(({cle, href}) => (
            <a
              key={cle}
              href={href}
              onClick={fermerMenu}
              className="border-b border-bordure py-4 text-lg font-medium text-anthracite"
            >
              {t(cle)}
            </a>
          ))}
        </nav>
        <div className="flex flex-col gap-6 px-4 pb-8">
          <a
            href="#contact"
            onClick={fermerMenu}
            className="rounded-full bg-or px-6 py-3 text-center font-medium text-noir"
          >
            {t('devis')}
          </a>
          {selecteurLangue}
        </div>
      </div>
    </header>
  );
}

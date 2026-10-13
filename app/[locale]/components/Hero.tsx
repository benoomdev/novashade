import Image from 'next/image';
import {useTranslations} from 'next-intl';
import photo from '@/public/images/hero-pergola-toile.jpg';

export default function Hero() {
  const t = useTranslations('Hero');
  const atouts = [t('atout1'), t('atout2'), t('atout3')];

  return (
    <section id="accueil" className="relative isolate flex min-h-[calc(100svh-5rem)] items-end overflow-hidden bg-noir">
      <Image
        src={photo}
        alt={t('alt')}
        fill
        preload
        placeholder="blur"
        sizes="100vw"
        className="-z-10 object-cover"
      />
      {/* Voile sombre pour la lisibilité du texte */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-t from-noir/90 via-noir/65 to-noir/40 md:bg-gradient-to-r md:from-noir/85 md:via-noir/45 md:to-transparent"
      />

      <div className="mx-auto w-full max-w-6xl px-4 pb-12 pt-32 sm:px-6 md:pb-20">
        <div className="max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-[0.25em] text-or sm:text-sm">{t('surtitre')}</p>
          <h1 className="mt-5 text-5xl font-light leading-[1.05] text-creme sm:text-6xl lg:text-7xl">
            {t('titre')}
            <br />
            <span className="texte-degrade-or font-medium">{t('titreAccent')}</span>
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-creme/80 sm:text-lg">{t('texte')}</p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <a
              href="#contact"
              className="rounded-full bg-or px-7 py-3.5 text-center font-medium text-noir transition-opacity hover:opacity-90"
            >
              {t('cta')}
            </a>
            <a
              href="#services"
              className="rounded-full border border-creme/40 px-7 py-3.5 text-center font-medium text-creme transition-colors hover:border-creme hover:bg-creme/10"
            >
              {t('ctaSecondaire')}
            </a>
          </div>
        </div>

        <ul className="mt-12 flex flex-wrap gap-x-8 gap-y-3 border-t border-creme/15 pt-6 text-sm text-creme/80">
          {atouts.map((atout) => (
            <li key={atout} className="flex items-center gap-2">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-or" />
              {atout}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

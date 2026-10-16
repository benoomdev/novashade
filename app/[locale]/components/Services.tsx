import Image from 'next/image';
import {useTranslations} from 'next-intl';
import TitreSection from './TitreSection';
import LienProjet from './LienProjet';
import pergolas from '@/public/images/pergola-bioclimatique.jpg';
import storesBannes from '@/public/images/store-banne.jpg';
import volets from '@/public/images/volets-roulants.jpg';
import screens from '@/public/images/screens.jpg';
import verandas from '@/public/images/veranda.jpg';
import moustiquaires from '@/public/images/moustiquaire.jpg';

const services = [
  {cle: 'pergolas', photo: pergolas},
  {cle: 'storesBannes', photo: storesBannes},
  {cle: 'volets', photo: volets},
  {cle: 'screens', photo: screens},
  {cle: 'verandas', photo: verandas},
  {cle: 'moustiquaires', photo: moustiquaires}
] as const;

export default function Services() {
  const t = useTranslations('Services');

  return (
    <section id="services" className="scroll-mt-20 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <TitreSection surtitre={t('surtitre')} titre={t('titre')} intro={t('intro')} />

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map(({cle, photo}) => (
            <li
              key={cle}
              className="group overflow-hidden rounded-2xl border border-bordure bg-carte transition-shadow hover:shadow-lg"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={photo}
                  alt={t(`${cle}.alt`)}
                  fill
                  placeholder="blur"
                  sizes="(min-width: 1024px) 360px, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-medium text-anthracite">{t(`${cle}.titre`)}</h3>
                <p className="mt-2 leading-relaxed text-gris">{t(`${cle}.texte`)}</p>
              </div>
            </li>
          ))}
        </ul>

        {/* Bandeau réparation */}
        <div className="mt-6 flex flex-col gap-6 rounded-2xl bg-anthracite p-8 text-creme sm:p-10 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <h3 className="flex items-center gap-3 text-xl font-medium">
              <IconeCle />
              {t('reparation.titre')}
            </h3>
            <p className="mt-3 leading-relaxed text-creme/75">{t('reparation.texte')}</p>
          </div>
          <LienProjet
            projet="reparation"
            className="shrink-0 rounded-full border border-or px-6 py-3 text-center font-medium text-or transition-colors hover:bg-or hover:text-noir"
          >
            {t('reparation.cta')}
          </LienProjet>
        </div>
      </div>
    </section>
  );
}

function IconeCle() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6 shrink-0 text-or" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
  );
}

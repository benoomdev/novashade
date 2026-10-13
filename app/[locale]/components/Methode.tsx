import {useTranslations} from 'next-intl';
import TitreSection from './TitreSection';

const etapes = [1, 2, 3, 4] as const;

export default function Methode() {
  const t = useTranslations('Methode');

  return (
    <section id="methode" className="scroll-mt-20 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <TitreSection surtitre={t('surtitre')} titre={t('titre')} />

        <ol className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {etapes.map((n) => (
            <li key={n} className="border-t border-bordure pt-6">
              <span className="texte-degrade-or text-5xl font-light">0{n}</span>
              <h3 className="mt-4 text-lg font-medium text-anthracite">{t(`etape${n}Titre`)}</h3>
              <p className="mt-2 leading-relaxed text-gris">{t(`etape${n}Texte`)}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

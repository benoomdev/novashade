import {useTranslations} from 'next-intl';
import TitreSection from './TitreSection';

export default function APropos() {
  const t = useTranslations('APropos');

  const chiffres = [
    {valeur: '20+', label: t('chiffre1')},
    {valeur: '6', label: t('chiffre2')},
    {valeur: '100\u00a0%', label: t('chiffre3')}
  ];

  const valeurs = [
    {titre: t('valeur1Titre'), texte: t('valeur1Texte')},
    {titre: t('valeur2Titre'), texte: t('valeur2Texte')},
    {titre: t('valeur3Titre'), texte: t('valeur3Texte')}
  ];

  return (
    <section id="a-propos" className="scroll-mt-20 bg-noir py-20 text-creme sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:items-end">
          <div>
            <TitreSection surtitre={t('surtitre')} titre={t('titre')} clair />
            <p className="mt-6 leading-relaxed text-creme/75 sm:text-lg">{t('texte1')}</p>
            <p className="mt-4 leading-relaxed text-creme/75 sm:text-lg">{t('texte2')}</p>
          </div>

          <dl className="grid grid-cols-3 gap-4 border-t border-creme/15 pt-8 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
            {chiffres.map(({valeur, label}) => (
              <div key={label}>
                <dt className="sr-only">{label}</dt>
                <dd>
                  <span className="texte-degrade-or block whitespace-nowrap text-3xl font-medium sm:text-4xl xl:text-5xl">{valeur}</span>
                  <span className="mt-2 block text-sm text-creme/70">{label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <ul className="mt-16 grid gap-6 md:grid-cols-3">
          {valeurs.map(({titre, texte}) => (
            <li key={titre} className="rounded-2xl border border-creme/10 bg-creme/[0.04] p-7">
              <span aria-hidden="true" className="fond-degrade-or block h-0.5 w-10" />
              <h3 className="mt-5 text-lg font-medium">{titre}</h3>
              <p className="mt-2 leading-relaxed text-creme/70">{texte}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

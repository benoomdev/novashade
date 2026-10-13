import {useTranslations} from 'next-intl';
import TitreSection from './TitreSection';
import FormulaireContact from './FormulaireContact';
import {site} from '@/site';

export default function Contact() {
  const t = useTranslations('Contact');

  const infos = [
    {label: t('telephone'), valeur: site.telephone, lien: site.telephoneLien},
    {label: t('email'), valeur: site.email, lien: `mailto:${site.email}`},
    {label: t('zone'), valeur: t('zoneValeur')},
    {label: t('tva'), valeur: site.tva}
  ];

  return (
    <section id="contact" className="scroll-mt-20 py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <TitreSection surtitre={t('surtitre')} titre={t('titre')} intro={t('intro')} />

          <dl className="mt-10 space-y-6">
            {infos.map(({label, valeur, lien}) => (
              <div key={label} className="border-l-2 border-or pl-5">
                <dt className="text-xs font-medium uppercase tracking-[0.2em] text-gris">{label}</dt>
                <dd className="mt-1 text-lg text-anthracite">
                  {lien ? (
                    <a href={lien} className="transition-colors hover:text-or-fonce">
                      {valeur}
                    </a>
                  ) : (
                    valeur
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <FormulaireContact />
      </div>
    </section>
  );
}

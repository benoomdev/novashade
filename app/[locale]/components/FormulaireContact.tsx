'use client';

import {useState} from 'react';
import {useTranslations} from 'next-intl';
import {site} from '@/site';

const cles = ['pergolas', 'storesBannes', 'volets', 'screens', 'verandas', 'moustiquaires'] as const;

const champ =
  'mt-2 w-full rounded-xl border border-bordure bg-creme px-4 py-3 text-anthracite outline-none transition-colors placeholder:text-gris/60 focus:border-or focus:ring-2 focus:ring-or/30';

// Le formulaire prépare un e-mail dans la messagerie du visiteur (pas de serveur d'envoi)
export default function FormulaireContact() {
  const t = useTranslations('Contact');
  const ts = useTranslations('Services');
  const [ouvert, setOuvert] = useState(false);

  function envoyer(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const d = new FormData(e.currentTarget);
    const v = (nom: string) => String(d.get(nom) ?? '').trim();

    const corps = [
      t('emailBonjour'),
      '',
      v('message'),
      '',
      '—',
      `${t('formService')} : ${v('service')}`,
      `${t('formNom')} : ${v('nom')}`,
      `${t('formTelephone')} : ${v('telephone')}`,
      `${t('formEmail')} : ${v('email')}`,
      `${t('formCommune')} : ${v('commune')}`
    ].join('\n');

    const sujet = `${t('emailSujet')} – ${v('service')} – ${v('nom')}`;
    window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(sujet)}&body=${encodeURIComponent(corps)}`;
    setOuvert(true);
  }

  return (
    <form onSubmit={envoyer} className="rounded-2xl border border-bordure bg-carte p-6 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="text-sm font-medium text-anthracite sm:col-span-2">
          {t('formNom')}
          <input name="nom" required autoComplete="name" className={champ} />
        </label>
        <label className="text-sm font-medium text-anthracite">
          {t('formTelephone')}
          <input name="telephone" type="tel" required autoComplete="tel" className={champ} />
        </label>
        <label className="text-sm font-medium text-anthracite">
          {t('formEmail')}
          <input name="email" type="email" autoComplete="email" className={champ} />
        </label>
        <label className="text-sm font-medium text-anthracite">
          {t('formCommune')}
          <input name="commune" autoComplete="address-level2" className={champ} />
        </label>
        <label className="text-sm font-medium text-anthracite">
          {t('formService')}
          <select name="service" required defaultValue="" className={champ}>
            <option value="" disabled>
              {t('formServiceChoix')}
            </option>
            {cles.map((cle) => (
              <option key={cle}>{ts(`${cle}.titre`)}</option>
            ))}
            <option>{t('formReparation')}</option>
            <option>{t('formAutre')}</option>
          </select>
        </label>
        <label className="text-sm font-medium text-anthracite sm:col-span-2">
          {t('formMessage')}
          <textarea
            name="message"
            rows={5}
            required
            placeholder={t('formMessageAide')}
            className={`${champ} resize-y`}
          />
        </label>
      </div>

      <button
        type="submit"
        className="mt-6 w-full rounded-full bg-or px-7 py-3.5 font-medium text-noir transition-opacity hover:opacity-90 sm:w-auto"
      >
        {t('formEnvoyer')}
      </button>
      <p className="mt-3 text-sm text-gris" aria-live="polite">
        {ouvert ? t('formOuvert') : t('formNote')}
      </p>
    </form>
  );
}

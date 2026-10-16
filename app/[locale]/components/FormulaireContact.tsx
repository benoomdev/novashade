'use client';

import {useEffect, useRef, useState} from 'react';
import {useLocale, useTranslations} from 'next-intl';
import {site} from '@/site';
import {EVENEMENT_PROJET} from './LienProjet';

const cles = ['pergolas', 'storesBannes', 'volets', 'screens', 'verandas', 'moustiquaires'] as const;

const champ =
  'mt-2 w-full rounded-xl border border-bordure bg-creme px-4 py-3 text-anthracite outline-none transition-colors placeholder:text-gris/60 focus:border-or focus:ring-2 focus:ring-or/30';

type Etat = 'attente' | 'envoi' | 'succes' | 'erreur';

// Envoi via Netlify Forms : les données sont postées à la copie statique du formulaire (public/__forms.html)
export default function FormulaireContact() {
  const t = useTranslations('Contact');
  const ts = useTranslations('Services');
  const locale = useLocale();
  const [etat, setEtat] = useState<Etat>('attente');
  const [projet, setProjet] = useState('');
  const confirmation = useRef<HTMLDivElement>(null);

  // Un lien « Signaler une panne » présélectionne la réparation (et rouvre le formulaire si besoin)
  useEffect(() => {
    const choisir = (e: Event) => {
      if ((e as CustomEvent<string>).detail === 'reparation') {
        setProjet(t('formReparation'));
        setEtat((actuel) => (actuel === 'succes' ? 'attente' : actuel));
      }
    };
    window.addEventListener(EVENEMENT_PROJET, choisir);
    return () => window.removeEventListener(EVENEMENT_PROJET, choisir);
  }, [t]);

  // La confirmation est plus courte que le formulaire : on la ramène à l'écran
  useEffect(() => {
    if (etat === 'succes') confirmation.current?.scrollIntoView({behavior: 'smooth', block: 'center'});
  }, [etat]);

  async function envoyer(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formulaire = e.currentTarget;
    setEtat('envoi');

    const donnees = new URLSearchParams();
    new FormData(formulaire).forEach((valeur, cle) => donnees.append(cle, String(valeur)));

    try {
      const reponse = await fetch('/__forms.html', {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: donnees.toString()
      });
      if (!reponse.ok) throw new Error(String(reponse.status));
      formulaire.reset();
      setProjet('');
      setEtat('succes');
    } catch {
      setEtat('erreur');
    }
  }

  if (etat === 'succes') {
    return (
      <div ref={confirmation} className="rounded-2xl border border-bordure bg-carte p-6 sm:p-8" role="status">
        <span aria-hidden="true" className="fond-degrade-or flex h-12 w-12 items-center justify-center rounded-full text-xl text-noir">
          ✓
        </span>
        <p className="mt-5 text-xl font-medium text-anthracite">{t('formSuccesTitre')}</p>
        <p className="mt-2 text-gris">{t('formSuccesTexte')}</p>
        <button
          type="button"
          onClick={() => setEtat('attente')}
          className="mt-6 rounded-full border border-anthracite/25 px-6 py-3 font-medium text-anthracite transition-colors hover:border-or"
        >
          {t('formNouvelle')}
        </button>
      </div>
    );
  }

  return (
    <form name="contact" onSubmit={envoyer} className="rounded-2xl border border-bordure bg-carte p-6 sm:p-8">
      <input type="hidden" name="form-name" value="contact" />
      <input type="hidden" name="langue" value={locale} />
      {/* Champ piège invisible : rempli uniquement par les robots, Netlify écarte alors l'envoi */}
      <p className="hidden" aria-hidden="true">
        <label>
          {t('formPiege')}
          <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>

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
          <input name="email" type="email" required autoComplete="email" className={champ} />
        </label>
        <label className="text-sm font-medium text-anthracite">
          {t('formCommune')}
          <input name="commune" autoComplete="address-level2" className={champ} />
        </label>
        <label className="text-sm font-medium text-anthracite">
          {t('formService')}
          <select name="service" required value={projet} onChange={(e) => setProjet(e.target.value)} className={champ}>
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
        disabled={etat === 'envoi'}
        className="mt-6 w-full rounded-full bg-or px-7 py-3.5 font-medium text-noir transition-opacity hover:opacity-90 disabled:cursor-wait disabled:opacity-60 sm:w-auto"
      >
        {etat === 'envoi' ? t('formEnvoi') : t('formEnvoyer')}
      </button>

      <p className={`mt-3 text-sm ${etat === 'erreur' ? 'text-red-700' : 'text-gris'}`} role={etat === 'erreur' ? 'alert' : undefined}>
        {etat === 'erreur' ? (
          t.rich('formErreur', {
            telephone: site.telephone,
            email: site.email,
            tel: (morceaux) => (
              <a href={site.telephoneLien} className="font-medium underline">
                {morceaux}
              </a>
            ),
            mail: (morceaux) => (
              <a href={`mailto:${site.email}`} className="font-medium underline">
                {morceaux}
              </a>
            )
          })
        ) : (
          t('formNote')
        )}
      </p>
    </form>
  );
}

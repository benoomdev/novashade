import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/navigation';

export default function HomePage() {
  const t = useTranslations('Test');

  return (
    <main className="mx-auto max-w-3xl space-y-8 p-10">
      <h1 className="text-4xl">{t('titre')}</h1>

      <p className="text-gris">Texte secondaire en gris chaud.</p>

      <p className="text-5xl font-medium texte-degrade-or">Titre en or dégradé</p>

      <div className="flex flex-wrap gap-4">
        <a href="#" className="rounded-full bg-or px-6 py-3 font-medium text-noir">
          Nous contacter
        </a>
        <a href="#" className="rounded-full border border-anthracite px-6 py-3">
          Bouton secondaire
        </a>
      </div>

      <div className="rounded-2xl border border-bordure bg-carte p-6">
        Une carte blanche avec sa bordure crème.
      </div>

      <div className="rounded-2xl bg-noir p-6 text-creme">
        Un bloc noir, avec un <span className="text-or">lien doré</span>.
      </div>

      <p>
        <Link href="/" locale="fr" className="text-or-fonce underline">FR</Link>
        {' | '}
        <Link href="/" locale="nl" className="text-or-fonce underline">NL</Link>
      </p>
    </main>
  );
}
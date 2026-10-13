import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/navigation';

export default function HomePage() {
  const t = useTranslations('Test');

  return (
    <main style={{padding: 40}}>
      <h1>{t('titre')}</h1>
      <p>
        <Link href="/" locale="fr">FR</Link> | <Link href="/" locale="nl">NL</Link>
      </p>
    </main>
  );
}
import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/navigation';
import Logo from './Logo';
import {site} from '@/site';

const liens = [
  {cle: 'services', href: '#services'},
  {cle: 'inspirations', href: '#inspirations'},
  {cle: 'apropos', href: '#a-propos'},
  {cle: 'contact', href: '#contact'}
] as const;

export default function Footer() {
  const t = useTranslations('Footer');
  const th = useTranslations('Header');
  const tc = useTranslations('Contact');

  return (
    <footer className="bg-noir text-creme">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <Link href="/" aria-label={th('accueil')} className="inline-block">
            <Logo variante="clair" />
          </Link>
          <p className="mt-5 max-w-xs leading-relaxed text-creme/60">{t('slogan')}</p>
        </div>

        <nav aria-label={t('navigation')}>
          <h2 className="text-xs font-medium uppercase tracking-[0.2em] text-or">{t('navigation')}</h2>
          <ul className="mt-4 space-y-2">
            {liens.map(({cle, href}) => (
              <li key={cle}>
                <a href={href} className="text-creme/70 transition-colors hover:text-creme">
                  {th(cle)}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-xs font-medium uppercase tracking-[0.2em] text-or">{t('coordonnees')}</h2>
          <ul className="mt-4 space-y-2 text-creme/70">
            <li>
              <a href={site.telephoneLien} className="transition-colors hover:text-creme">
                {site.telephone}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="transition-colors hover:text-creme">
                {site.email}
              </a>
            </li>
            <li>
              {tc('tva')} {site.tva}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-creme/10">
        <p className="mx-auto max-w-6xl px-4 py-6 text-sm text-creme/50 sm:px-6">
          © {site.anneeCreation} Novashade. {t('droits')}
        </p>
      </div>
    </footer>
  );
}

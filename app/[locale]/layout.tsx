import type {Metadata} from 'next';
import {Jost} from 'next/font/google';
import {notFound} from 'next/navigation';
import {hasLocale, NextIntlClientProvider} from 'next-intl';
import {getTranslations} from 'next-intl/server';
import {routing} from '@/i18n/routing';
import Header from './components/Header';
import Footer from './components/Footer';
import BoutonAppel from './components/BoutonAppel';
import '../globals.css';

const jost = Jost({subsets: ['latin'], display: 'swap', variable: '--font-jost'});

export async function generateMetadata({params}: Omit<Props, 'children'>): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations({locale, namespace: 'Metadata'});

  return {
    title: t('titre'),
    description: t('description')
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({locale}));
}

type Props = {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
};

export default async function LocaleLayout({children, params}: Props) {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale} className={jost.variable}>
      <body>
        <NextIntlClientProvider>
          <Header />
          {children}
          <Footer />
          <BoutonAppel />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
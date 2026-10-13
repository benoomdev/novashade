import type {Metadata} from 'next';
import {Jost} from 'next/font/google';
import {notFound} from 'next/navigation';
import {hasLocale, NextIntlClientProvider} from 'next-intl';
import {routing} from '@/i18n/routing';
import '../globals.css';

const jost = Jost({subsets: ['latin'], display: 'swap'});

export const metadata: Metadata = {
  title: 'Novashade',
  description: 'Montage et réparation de volets, screens et pergolas en Belgique.'
};

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
    <html lang={locale}>
      <body className={jost.className}>
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
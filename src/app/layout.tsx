import type { Metadata } from 'next';
import { clsx } from 'clsx';
import { Roboto } from 'next/font/google';
import { Footer, Header } from '@/widgets';
import { ThemeProvider } from 'next-themes';
import './globals.scss';
import styles from './layout.module.scss';

const siteUrl = `https://${process.env.NEXT_PUBLIC_DOMAIN || 'pastebin.nickdev.ru'}`;

const roboto = Roboto({
  weight: ['400', '300', '700'],
  subsets: ['latin', 'cyrillic-ext'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: 'AltPastebin',
  title: {
    default: 'AltPastebin - быстрый обмен кодовыми сниппетами',
    template: '%s | AltPastebin',
  },
  description:
    'AltPastebin помогает быстро создавать, хранить и делиться кодовыми сниппетами с подсветкой языков, приватными ссылками и комментариями.',
  verification: {
    google: 'aOEFhqjIuCn46Tz6mqG67sfqfMbci-vZ15AC2aoPYcg',
    yandex: '5a0650d1aaad7000',
  },
  keywords: [
    'AltPastebin',
    'pastebin',
    'code snippets',
    'snippet sharing',
    'code storage',
    'developer tools',
    'кодовые сниппеты',
    'обмен кодом',
    'хранение кода',
    'инструменты для разработчиков',
  ],
  authors: [{ name: 'AltPastebin' }],
  creator: 'AltPastebin',
  publisher: 'AltPastebin',
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  category: 'technology',

  openGraph: {
    type: 'website',
    url: '/',
    siteName: 'AltPastebin',
    locale: 'ru_RU',
    title: 'AltPastebin - быстрый обмен кодовыми сниппетами',
    description:
      'Создавайте, храните и делитесь кодовыми сниппетами с подсветкой языков, приватными ссылками и комментариями.',
    images: [
      {
        url: '/logo.svg',
        width: 100,
        height: 100,
        alt: 'AltPastebin logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AltPastebin - быстрый обмен кодовыми сниппетами',
    description:
      'Создавайте, храните и делитесь кодовыми сниппетами с подсветкой языков, приватными ссылками и комментариями.',
    images: ['/logo.svg'],
  },
  manifest: '/site.webmanifest',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/android-chrome-192x192.png" />
      </head>
      <body
        className={clsx(roboto.className, styles.body, styles.wrapper, 'body')}
        suppressHydrationWarning
      >
        <ThemeProvider attribute="class" defaultTheme="dark-theme">
          <Header className={styles.header} />
          <main className={styles.main}>{children}</main>
          <Footer className={styles.footer} />
        </ThemeProvider>
      </body>
    </html>
  );
}

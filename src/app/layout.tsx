import type { Metadata } from 'next';
import { clsx } from 'clsx';
import { connectToMongoDB } from '@/lib/mongo';
import { Roboto } from 'next/font/google';
import { Footer, Header } from '@/widgets';
import { ThemeProvider } from 'next-themes';
import './globals.scss';
import styles from './layout.module.scss';
import Head from 'next/head';

const roboto = Roboto({
  weight: ['400', '300', '700'],
  subsets: ['latin', 'cyrillic-ext'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Snippet Vault',
  description:
    "Snippet Vault is a web application for sharing code snippets, designed to simplify code sharing between programmers. Quickly and easily create, share, and store code snippets with support for multiple programming languages. Featuring an intuitive interface and various themes, including dark mode, it's ideal for developers needing to exchange or save code fragments for future use.",
  verification: {
    google: 'aOEFhqjIuCn46Tz6mqG67sfqfMbci-vZ15AC2aoPYcg',
  },
  keywords:
    'Snippet Vault, code sharing, snippets, programming, free snippets, free snippet exchange',
  openGraph: {
    type: 'website',
    url: 'https://pastebin.nickdev.ru/',
    title: `Snippet Vault`,
    description:
      'Discover and share code snippets effortlessly with Snippet Vault. Perfect for developers needing a quick and easy way to store, share, and find code fragments across multiple programming languages. Features include an intuitive interface and dark mode support.',
    images: [
      {
        url: 'https://pastebin.nickdev.ru/logo.svg',
        width: 100,
        height: 100,
        alt: 'Snippet Vault preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `Snippet Vault`,
    description: `Discover and share code snippets effortlessly with Snippet Vault. Perfect for developers needing a quick and easy way to store, share, and find code fragments across multiple programming languages. Features include an intuitive interface and dark mode support.`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  connectToMongoDB();
  return (
    <html lang="ru" suppressHydrationWarning>
      <Head>
        <link rel="canonical" href="https://pastebin.nickdev.ru" />
      </Head>
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

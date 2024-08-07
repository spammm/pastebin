import type { Metadata } from 'next';
import { clsx } from 'clsx';
import { connectToMongoDB } from '@/lib/mongo';
import { Roboto } from 'next/font/google';
import { Footer, Header } from '@/widgets';
import { ThemeProvider } from 'next-themes';
import './globals.scss';
import styles from './layout.module.scss';

const roboto = Roboto({
  weight: ['400', '300', '700'],
  subsets: ['latin', 'cyrillic-ext'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Snippet Vault - Share, Store, and Discover Code Snippets Easily',
  description:
    "Snippet Vault is a web app for sharing code snippets. Create, share, and store snippets with support for multiple programming languages. Featuring an intuitive interface and dark mode, it's perfect for developers.",
  verification: {
    google: 'aOEFhqjIuCn46Tz6mqG67sfqfMbci-vZ15AC2aoPYcg',
  },
  keywords:
    'Snippet Vault, code sharing, snippets, programming, free snippets, free snippet exchange',
  openGraph: {
    type: 'website',
    url: `https://${process.env.NEXT_PUBLIC_DOMAIN}`,
    title: 'Snippet Vault - Share, Store, and Discover Code Snippets Easily',
    description:
      'Discover and share code snippets with Snippet Vault. Perfect for developers to store, share, and find code fragments across multiple programming languages. Features include an intuitive interface and dark mode support.',
    images: [
      {
        url: `https://${process.env.NEXT_PUBLIC_DOMAIN}/logo.svg`,
        width: 100,
        height: 100,
        alt: 'Snippet Vault preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Snippet Vault - Share, Store, and Discover Code Snippets Easily',
    description: `Discover and share code snippets with Snippet Vault. Perfect for developers to store, share, and find code fragments across multiple programming languages. Features include an intuitive interface and dark mode support.`,
  },
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  connectToMongoDB();
  return (
    <html lang="ru" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/android-chrome-192x192.png" />
        <link
          rel="canonical"
          href={`https://${process.env.NEXT_PUBLIC_DOMAIN}`}
        />
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

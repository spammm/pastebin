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
  title: 'PasteBin parody',
  description: 'This is Nick pet project',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  connectToMongoDB();
  return (
    <html lang="ru" suppressHydrationWarning>
      <head />
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

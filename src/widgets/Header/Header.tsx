import React, { HTMLAttributes } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ThemeToggle } from '@/shared';
import clsx from 'clsx';
import styles from './Header.module.scss';

const Header: React.FC<HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => {
  return (
    <header className={clsx(styles.header, className)} {...props}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <Link href="/" aria-label="Home">
            <Image
              src="/logo.svg"
              alt="App Logo"
              width={64}
              height={64}
              className={styles.logoImage}
            />
          </Link>
        </div>
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <Link href="/" className={styles.navLink}>
                Главна
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link href="/create" className={styles.navLink}>
                Создать новый сниппет
              </Link>
            </li>
          </ul>
        </nav>
        <ThemeToggle className={styles.themeToggle} />
      </div>
    </header>
  );
};

export default Header;

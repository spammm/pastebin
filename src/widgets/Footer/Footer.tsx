import React, { HTMLAttributes } from 'react';
import clsx from 'clsx';
import styles from './Footer.module.scss';

const Footer: React.FC<HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => {
  return (
    <footer
      className={clsx(styles.footer, className)}
      role="contentinfo"
      aria-label="Footer"
      {...props}
    >
      <div className={styles.container}>
        <p className={styles.copy}>
          © {new Date().getFullYear()} AltPastebin. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

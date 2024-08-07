'use client';
import React, { HTMLAttributes } from 'react';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import {
  TelegramShareButton,
  LinkedinShareButton,
  VKShareButton,
  FacebookShareButton,
  WhatsappShareButton,
  TelegramIcon,
  LinkedinIcon,
  VKIcon,
  FacebookIcon,
  WhatsappIcon,
} from 'react-share';
import styles from './Footer.module.scss';

const Footer: React.FC<HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => {
  const pathname = usePathname();
  const currentUrl = `https://${process.env.NEXT_PUBLIC_DOMAIN}/${pathname}`;

  return (
    <footer
      className={clsx(styles.footer, className)}
      aria-label="Footer"
      {...props}
    >
      <div className={styles.container}>
        <p className={styles.copy}>
          © {new Date().getFullYear()} AltPastebin. All rights reserved.
        </p>
        <div className={styles.shareButtons}>
          <TelegramShareButton url={currentUrl}>
            <TelegramIcon size={32} round />
          </TelegramShareButton>
          <LinkedinShareButton url={currentUrl}>
            <LinkedinIcon size={32} round />
          </LinkedinShareButton>
          <VKShareButton url={currentUrl}>
            <VKIcon size={32} round />
          </VKShareButton>
          <FacebookShareButton url={currentUrl}>
            <FacebookIcon size={32} round />
          </FacebookShareButton>
          <WhatsappShareButton url={currentUrl}>
            <WhatsappIcon size={32} round />
          </WhatsappShareButton>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

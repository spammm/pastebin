import React, { HTMLAttributes, useId } from 'react';
import styles from './InfoBlock.module.scss';
import clsx from 'clsx';

interface InfoBlockProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  items: { label: string; value: string }[];
  className?: string;
}

const InfoBlock: React.FC<InfoBlockProps> = ({
  title,
  items,
  className,
  ...props
}) => {
  const titleId = useId();

  return (
    <section
      className={clsx(styles.infoBlock, className)}
      aria-labelledby={titleId}
      {...props}
    >
      <h2 id={titleId} className={styles.title}>
        {title}
      </h2>
      <dl className={styles.content}>
        {items.map((item, index) => (
          <div key={index} className={styles.item}>
            <dt className={styles.label}>{item.label}:</dt>
            <dd className={styles.value}>{item.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
};

export default InfoBlock;

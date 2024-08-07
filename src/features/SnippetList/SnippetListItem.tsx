import Link from 'next/link';
import React from 'react';

import { getLanguage, SnippetType } from '@/entities';
import { LocalDataTime } from '@/shared';
import styles from './SnippetList.module.scss';

interface snippetListItemProps {
  snippet: SnippetType;
}

export const SnippetListItem: React.FC<snippetListItemProps> = ({
  snippet,
}) => {
  return (
    <li
      className={styles.listItem}
      aria-labelledby={`snippetpet-title-${snippet.id}`}
    >
      <Link
        href={`/${snippet.shortUrl}`}
        className={styles.linkWrapper}
        title={snippet.description}
      >
        <article>
          <h2 id={`snippetpet-title-${snippet.id}`} className={styles.title}>
            {snippet.author}
            <LocalDataTime
              date={new Date(snippet.createdAt)}
              className={styles.date}
            />
          </h2>
          <p className={styles.description}>{snippet.description}</p>
          <footer className={styles.footer}>
            Синтаксис: <span>{getLanguage(snippet.language)}</span>
          </footer>
        </article>
      </Link>
    </li>
  );
};

export default React.memo(SnippetListItem);

'use client';
import { fetchSnippets } from '@/services/api';
import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import styles from './SnippetList.module.scss';
import { Loader } from '@/shared';
import { useInView } from 'react-intersection-observer';
import { SnippetType } from '@/entities';

const SnippetList: React.FC = () => {
  const [snippets, setSnippets] = useState<SnippetType[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const { ref, inView } = useInView();

  const loadSnippets = useCallback(async (page: number) => {
    setLoading(true);
    let newSnippets = await fetchSnippets(page, 5);
    if (newSnippets.length < 5) {
      setHasMore(false);
    }
    setSnippets((prevSnippets) => {
      return [...prevSnippets, ...newSnippets];
    });
    setLoading(false);
  }, []);

  useEffect(() => {
    loadSnippets(page);
  }, [page, loadSnippets]);

  useEffect(() => {
    if (inView && hasMore && !loading) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [inView, hasMore, loading]);

  const render = snippets.map((snip) => {
    const createdAt = new Date(snip.createdAt).toLocaleDateString();
    return (
      <li
        key={snip.id}
        className={styles.listItem}
        aria-labelledby={`snippet-title-${snip.id}`}
      >
        <Link href={`/${snip.shortUrl}`} className={styles.linkWrapper}>
          <article>
            <h2 id={`snippet-title-${snip.id}`} className={styles.title}>
              {snip.author}
              <time className={styles.date} dateTime={snip.createdAt}>
                {createdAt}
              </time>
            </h2>
            <p className={styles.description}>{snip.description}</p>
          </article>
        </Link>
      </li>
    );
  });

  return (
    <div>
      <ul className={styles.list}>{render}</ul>
      {loading && <Loader />}
      <div ref={ref}></div>
    </div>
  );
};

export default SnippetList;

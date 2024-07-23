'use client';
import { fetchSnippets } from '@/services/api/';
import React, { useState, useEffect, useCallback } from 'react';

import styles from './SnippetList.module.scss';
import { Loader } from '@/shared';
import { useInView } from 'react-intersection-observer';
import { SnippetType } from '@/entities';
import SnippetListItem from './SnippetListItem';

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

  const renderSnippets = snippets.map((snippet) => {
    return <SnippetListItem key={snippet.shortUrl} snippet={snippet} />;
  });

  return (
    <div>
      <ul className={styles.list}>{renderSnippets}</ul>
      {loading && <Loader />}
      <div ref={ref}></div>
    </div>
  );
};

export default SnippetList;

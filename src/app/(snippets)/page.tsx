import { SnipperListSkeleton, SnippetList } from '@/features';
import React, { Suspense } from 'react';
import styles from './snippetList.module.scss';

const SnippetsListPage = async () => {
  return (
    <div className={styles.list}>
      <h1>Последние сниппеты</h1>
      <Suspense fallback={<SnipperListSkeleton />}>
        <SnippetList />
      </Suspense>
    </div>
  );
};

export default SnippetsListPage;

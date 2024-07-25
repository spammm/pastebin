import { SnipperListSkeleton, SnippetList } from '@/features';
import React, { Suspense } from 'react';

const SnippetsListPage = async () => {
  return (
    <div>
      <h1>Последние сниппеты</h1>
      <Suspense fallback={<SnipperListSkeleton />}>
        <SnippetList />
      </Suspense>
    </div>
  );
};

export default SnippetsListPage;

import React from 'react';
import { fetchSnippetByShortUrl, fetchSnippets } from '@/services/api/';
import { SnippetEditor } from '@/entities';
import styles from './SnippetPage.module.scss';
import { SnippetInfo } from '@/features';
import CommentList from '@/entities/Comment/CommentList';
interface SnippetPageProps {
  params: {
    shortUrl: string;
  };
}

const SnippetPage: React.FC<SnippetPageProps> = async ({ params }) => {
  const snippet = await fetchSnippetByShortUrl(params.shortUrl);

  if (!snippet) {
    return <div>Snippet not found</div>;
  }

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.header}>От: {snippet.author}</h1>
      <SnippetEditor
        height={'50vh'}
        defaultLanguage={snippet.language}
        defaultValue={snippet.code}
        options={{
          readOnly: true,
          minimap: { enabled: false },
          automaticLayout: true,
        }}
      />
      <div className={styles.footer}>
        <SnippetInfo snippet={snippet} className={styles.info} />
        <CommentList
          snippetId={snippet._id.toString()}
          className={styles.comments}
        />
      </div>
    </div>
  );
};

export default SnippetPage;

export async function generateStaticParams() {
  const snippets = await fetchSnippets();
  return snippets.map((snippet) => ({
    shortUrl: snippet.shortUrl,
  }));
}

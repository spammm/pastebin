import React from 'react';
import { fetchSnippetByShortUrl, fetchSnippets } from '@/services/api/';
import { getLanguage, SnippetEditor } from '@/entities';
import styles from './SnippetPage.module.scss';
import { SnippetInfo } from '@/features';
import CommentList from '@/entities/Comment/CommentList';
import { notFound } from 'next/navigation';

interface SnippetPageProps {
  params: {
    shortUrl: string;
  };
}

export async function generateMetadata({ params }: SnippetPageProps) {
  const snippet = await fetchSnippetByShortUrl(params.shortUrl);

  if (!snippet) {
    return {
      title: 'Snippet not found',
      description: 'This snippet does not exist.',
      robots: {
        index: false,
      },
    };
  }

  const language = getLanguage(snippet?.language);
  return {
    title: `Snippet by ${snippet.author}`,
    description: `Code snippet by ${snippet.author}. ${snippet.description}`,
    robots: {
      index: !snippet.isPrivate,
    },
    keywords: [snippet.language, language],
    openGraph: {
      type: 'article',
      title: `Snippet by ${snippet.author}`,
      description: `Code snippet by ${snippet.author}. ${snippet.description}`,
      article: {
        tag: [snippet.language, language],
      },
      images: [
        {
          url: 'https://pastebin.nickdev.ru/logo.svg',
          width: 100,
          height: 100,
          alt: 'Snippet Vault preview',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `Snippet by ${snippet.author}`,
      description: `Code snippet by ${snippet.author}. ${snippet.description}`,
    },
  };
}

const SnippetPage: React.FC<SnippetPageProps> = async ({ params }) => {
  const snippet = await fetchSnippetByShortUrl(params.shortUrl);

  if (!snippet) {
    notFound();
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

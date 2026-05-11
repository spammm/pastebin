import React from 'react';
import { fetchSnippetByShortUrl } from '@/services/api/';
import { getLanguage, SnippetEditor } from '@/entities';
import styles from './SnippetPage.module.scss';
import { SnippetInfo } from '@/features';
import CommentList from '@/entities/Comment/CommentList';
import { notFound } from 'next/navigation';

interface SnippetPageProps {
  params: Promise<{
    shortUrl: string;
  }>;
}

export async function generateMetadata({ params }: SnippetPageProps) {
  const { shortUrl } = await params;
  const snippet = await fetchSnippetByShortUrl(shortUrl);

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
  const title = `Сниппет ${language} от ${snippet.author}`;
  const description = `Кодовый сниппет ${language} от ${snippet.author}. ${snippet.description}`;

  return {
    title,
    description,
    alternates: {
      canonical: `/${shortUrl}`,
    },
    robots: {
      index: !snippet.isPrivate,
      follow: !snippet.isPrivate,
    },
    keywords: [snippet.language, language],
    openGraph: {
      type: 'article',
      title,
      description,
      url: `/${shortUrl}`,
      article: {
        tag: [snippet.language, language],
      },
      images: [
        {
          url: '/logo.svg',
          width: 100,
          height: 100,
          alt: 'AltPastebin logo',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/logo.svg'],
    },
  };
}

const SnippetPage: React.FC<SnippetPageProps> = async ({ params }) => {
  const { shortUrl } = await params;
  const snippet = await fetchSnippetByShortUrl(shortUrl);

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
          snippetId={snippet.id}
          className={styles.comments}
        />
      </div>
    </div>
  );
};

export default SnippetPage;

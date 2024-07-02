import React from 'react';
import { CommentType } from '@/entities/Comment/model';
import styles from './CommentItem.module.scss';

interface CommentItemProps {
  comment: CommentType;
}

export const CommentItem: React.FC<CommentItemProps> = ({ comment }) => {
  const createdAt = comment.createdAt ? new Date(comment.createdAt) : null;

  const dateOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  };

  return (
    <li className={styles.commentItem}>
      <header className={styles.header}>
        <span className={styles.author}>{comment.author}</span>
        {createdAt && (
          <time className={styles.date} dateTime={createdAt.toISOString()}>
            {' '}
            ({createdAt.toLocaleDateString(undefined, dateOptions)}{' '}
            {createdAt.toLocaleTimeString(undefined, timeOptions)})
          </time>
        )}
      </header>
      <article className={styles.content}>{comment.content}</article>
    </li>
  );
};

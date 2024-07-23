import React from 'react';
import { CommentType } from '@/entities/Comment/model';
import styles from './CommentItem.module.scss';
import { LocalDataTime } from '@/shared';

interface CommentItemProps {
  comment: CommentType;
}

export const CommentItem: React.FC<CommentItemProps> = ({ comment }) => {
  const createdAt = comment.createdAt ? new Date(comment.createdAt) : null;

  return (
    <li className={styles.commentItem}>
      <div className={styles.header}>
        <span className={styles.author}>{comment.author}</span>
        {createdAt && (
          <LocalDataTime date={createdAt} className={styles.date} />
        )}
      </div>
      <p className={styles.content}>{comment.content}</p>
    </li>
  );
};

export default React.memo(CommentItem);

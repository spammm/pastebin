'use client';
import React from 'react';
import clsx from 'clsx';
import styles from './CommentList.module.scss';
import { useComments } from '@/hooks/useComments';
import { CommentForm } from './CommentForm';
import { CommentItem } from './CommentItem';

interface CommentListProps {
  snippetId: string;
  className?: string;
}

const CommentList: React.FC<CommentListProps> = ({
  snippetId,
  className,
  ...props
}) => {
  const { comments, addComment } = useComments(snippetId);

  return (
    <div className={clsx(styles.commentSection, className)} {...props}>
      <CommentForm onAddComment={addComment} />
      {comments.length > 0 && (
        <>
          <h2 id="commentsHeading">Комментарии</h2>
          <ul className={styles.commentList} aria-labelledby="commentsHeading">
            {comments.map((comment) => (
              <CommentItem key={comment.id} comment={comment} />
            ))}
          </ul>
        </>
      )}
    </div>
  );
};

export default CommentList;

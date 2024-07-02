import React from 'react';
import styles from './SnipperListSkeleton.module.scss';

const SnipperListSkeleton: React.FC = () => {
  return (
    <ul className={styles.skeletonList}>
      {Array.from({ length: 5 }).map((_, index) => (
        <li key={index} className={styles.skeletonListItem}>
          <article className={styles.skeletonArticle}>
            <div className={styles.skeletonTitle}></div>
            <div className={styles.skeletonDescription}></div>
          </article>
        </li>
      ))}
    </ul>
  );
};

export default SnipperListSkeleton;

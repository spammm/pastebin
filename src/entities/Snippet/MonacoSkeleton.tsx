import React from 'react';
import styles from './MonacoSkeleton.module.scss';

const MonacoSkeleton: React.FC = () => {
  return (
    <div className={styles.skeletonEditor}>
      {Array.from({ length: 10 }).map((_, index) => (
        <div key={index} className={styles.skeletonLine}></div>
      ))}
    </div>
  );
};

export default MonacoSkeleton;

import React from 'react';
import styles from './Loader.module.scss';

const Loader: React.FC = () => {
  return (
    <div
      className={styles.loader}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <div className={styles.spinner}></div>
      <span className={styles.srOnly}>Loading...</span>
    </div>
  );
};

export default Loader;

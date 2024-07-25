'use client';
import Link from 'next/link';
import styles from './error.module.scss';

const Custom404 = () => {
  return (
    <div className={styles.error}>
      <h1>404 - Страница не найдена</h1>
      <p>К сожалению, страница, которую вы ищете, не существует.</p>
      <Link href="/">Вернуться на главную</Link>
    </div>
  );
};

export default Custom404;

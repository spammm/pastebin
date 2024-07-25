'use client';
import Link from 'next/link';
import styles from './error.module.scss';

const Custom500 = () => {
  return (
    <div className={styles.error}>
      <h1>500 - Ошибка сервера</h1>
      <p>Произошла ошибка на сервере. Попробуйте снова позже.</p>
      <Link href="/">Вернуться на главную</Link>
    </div>
  );
};

export default Custom500;

'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import styles from './error.module.scss';

const GlobalError = ({ error, reset }: { error: Error; reset: () => void }) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className={styles.error}>
      <h1>Что-то пошло не так!</h1>
      <p>Произошла ошибка. Попробуйте снова позже.</p>
      <button onClick={() => reset()}>Попробовать снова</button>
      <Link href="/">Вернуться на главную</Link>
    </div>
  );
};

export default GlobalError;

'use client';
import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import styles from './Alert.module.scss';

interface AlertProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  duration?: number;
  onClose?: () => void;
}

const Alert: React.FC<AlertProps> = ({
  message,
  type = 'info',
  duration = 3000,
  onClose,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        if (onClose) onClose();
      }, 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div
      className={clsx(styles.alert, styles[type], {
        [styles.hidden]: !isVisible,
      })}
      role="alert"
      aria-live="assertive"
    >
      {message}
      <button
        onClick={() => setIsVisible(false)}
        aria-label="Close alert"
        className={styles.closeButton}
      >
        &times;
      </button>
    </div>
  );
};

export default Alert;

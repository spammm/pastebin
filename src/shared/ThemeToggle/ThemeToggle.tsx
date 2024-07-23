'use client';

import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import clsx from 'clsx';
import styles from './ThemeToggle.module.scss';

interface ThemeToggleProps {
  className?: string;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ className }) => {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleThemeToggle = () => {
    let newTheme = 'dark-theme';
    if (resolvedTheme === 'dark-theme') {
      newTheme = 'light-theme';
    } else if (resolvedTheme === 'light-theme') {
      newTheme = 'bright-theme';
    }
    document.documentElement.classList.remove(
      'dark-theme',
      'light-theme',
      'bright-theme'
    );
    setTheme(newTheme);
  };

  if (!mounted) return null;

  return (
    <button
      onClick={handleThemeToggle}
      className={clsx(styles.themeToggle, className)}
      aria-label="Toggle theme"
    >
      {resolvedTheme === 'dark-theme'
        ? '🌙'
        : resolvedTheme === 'light-theme'
        ? '🌞'
        : '☁️'}
    </button>
  );
};

export default ThemeToggle;

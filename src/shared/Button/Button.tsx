import clsx from 'clsx';
import React, { ButtonHTMLAttributes } from 'react';
import styles from './Button.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  color?: 'black' | 'white' | 'red' | 'green';
}

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  color = 'black',
  ...props
}) => {
  return (
    <button
      className={clsx(className, styles.button, styles[color])}
      {...props}
      disabled={props.disabled}
    >
      {children}
    </button>
  );
};

export default Button;

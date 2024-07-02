import clsx from 'clsx';
import React, { InputHTMLAttributes, useId } from 'react';
import styles from './Checkbox.module.scss';

interface CheckBoxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'value'> {
  label: string;
}

const CheckBox: React.FC<CheckBoxProps> = ({
  label,
  className,
  id,
  ...props
}) => {
  const uniqueId = useId();
  return (
    <label
      className={clsx(styles.checkboxWrapper, className)}
      htmlFor={id || uniqueId}
    >
      <input
        id={id || uniqueId}
        type="checkbox"
        className={styles.checkbox}
        aria-checked={props.checked}
        {...props}
        disabled={props.disabled}
      />
      <span className={styles.customCheckbox}></span>
      {label}
    </label>
  );
};

export default CheckBox;

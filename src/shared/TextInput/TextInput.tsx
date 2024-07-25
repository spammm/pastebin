  import clsx from 'clsx';
  import React, {
    InputHTMLAttributes,
    TextareaHTMLAttributes,
    useId,
  } from 'react';
  import styles from './TextInput.module.scss';

  interface BaseTextInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    color?: string | undefined;
    multiline?: boolean;
  }

  type TextInputProps = BaseTextInputProps &
    (
      | InputHTMLAttributes<HTMLInputElement>
      | TextareaHTMLAttributes<HTMLTextAreaElement>
    );

  const TextInput: React.FC<TextInputProps> = ({
    label,
    color,
    multiline = false,
    className,
    id,
    ...props
  }) => {
    const uniqueId = useId();

    return (
      <div className={clsx(styles.inputWrapper, className)}>
        {label && (
          <label htmlFor={id || uniqueId} className={styles.label}>
            {label}
          </label>
        )}
        {multiline ? (
          <textarea
            id={id || uniqueId}
            className={clsx(styles.input, { [styles.red]: color === 'red' })}
            {...(props as TextareaHTMLAttributes<HTMLTextAreaElement>)}
            aria-invalid={props['aria-invalid']}
          ></textarea>
        ) : (
          <input
            id={id || uniqueId}
            type="text"
            className={clsx(styles.input, { [styles.red]: color === 'red' })}
            {...(props as InputHTMLAttributes<HTMLInputElement>)}
            aria-invalid={props['aria-invalid']}
          />
        )}
      </div>
    );
  };

  export default TextInput;

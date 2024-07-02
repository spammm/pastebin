'use client';
import React, { useState, useEffect } from 'react';
import styles from './MathCaptcha.module.scss';
import { TextInput } from '@/shared';

interface MathCaptchaProps {
  onValidate: (isValid: boolean) => void;
}

const MathCaptcha: React.FC<MathCaptchaProps> = ({ onValidate }) => {
  const [firstNumber, setFirstNumber] = useState<number>(0);
  const [secondNumber, setSecondNumber] = useState<number>(0);
  const [userInput, setUserInput] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    generateRandomNumbers();
  }, []);

  const generateRandomNumbers = () => {
    setFirstNumber(Math.floor(Math.random() * 10));
    setSecondNumber(Math.floor(Math.random() * 10));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
    setError('');
  };

  const handleValidate = () => {
    const sum = firstNumber + secondNumber;
    const isValid = parseInt(userInput, 10) === sum;
    if (!isValid) {
      setError('Неправильный ответ, попробуйте снова.');
      generateRandomNumbers();
      setUserInput('');
    }
    onValidate(isValid);
  };

  return (
    <div className={styles.captchaWrapper}>
      <label htmlFor="captchaInput" className={styles.label}>
        {firstNumber} + {secondNumber} = ?
      </label>
      <TextInput
        id="captchaInput"
        name="captcha"
        placeholder="Введите ответ"
        value={userInput}
        onChange={handleChange}
        onBlur={handleValidate}
        aria-invalid={!!error}
        aria-describedby="captchaError"
        color={error ? 'red' : undefined}
      />
      {error && (
        <div id="captchaError" className={styles.error} role="alert">
          {error}
        </div>
      )}
    </div>
  );
};

export default MathCaptcha;

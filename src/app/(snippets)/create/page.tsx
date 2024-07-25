import { SnippetForm } from '@/features';
import React from 'react';
import styles from './CreateSnippet.module.scss';

const CreateSnippet = () => {
  return (
    <div className={styles.wrapper}>
      <h1>Создать сниппет</h1>
      <SnippetForm />
    </div>
  );
};

export default CreateSnippet;

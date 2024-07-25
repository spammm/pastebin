'use client';
import React, { useState } from 'react';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';

import {
  Alert,
  Button,
  CheckBox,
  Loader,
  SelectBox,
  TextInput,
} from '@/shared';
import { MathCaptcha, SnippetEditor, SnippetType } from '@/entities';
import monacoLanguages from '@/entities/Snippet/monacoLanguages';
import { createSnippet } from '@/services/api';
import { SnippetFormValidate as validate } from './SnippetFormValidate';
import styles from './SnippetForm.module.scss';

const SnippetForm = () => {
  const [captchaValid, setCaptchaValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      code: 'console.log("Hello world")',
      language: 'javascript',
      author: '',
      description: '',
      isPrivate: false,
    },
    validate,
    onSubmit: async (values) => {
      if (!captchaValid) {
        alert('Пожалуйста, подтвердите, что вы не робот.');
        return;
      }
      setLoading(true);
      setError(null);
      try {
        const snippet = await createSnippet(values);
        setLoading(false);
        router.push(`/${snippet.shortUrl}`);
      } catch (error) {
        setLoading(false);
        setError('Ошибка при создании сниппета. Попробуйте снова.');
      }
    },
  });

  const renderError = (field: keyof Omit<SnippetType, 'id' | 'shortUrl'>) =>
    formik.touched[field as keyof typeof formik.touched] &&
    formik.errors[field as keyof typeof formik.errors] ? (
      <div className={styles.error}>
        {formik.errors[field as keyof typeof formik.errors]}
      </div>
    ) : null;

  return (
    <>
      {error && <Alert message={error} type="error" />}
      <form className={styles.form} onSubmit={formik.handleSubmit}>
        <div className={styles.controls}>
          <SelectBox
            name="language"
            options={monacoLanguages}
            label="Выберите синтаксис подсветки"
            value={formik.values.language}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {renderError('language')}
        </div>

        <SnippetEditor
          value={formik.values.code}
          onChange={(value) => formik.setFieldValue('code', value)}
          language={formik.values.language}
          height={'50vh'}
        />

        {renderError('code')}

        <div className={styles.controls}>
          <CheckBox
            name="isPrivate"
            label="Сделать сниппет не публичным"
            checked={formik.values.isPrivate}
            onChange={formik.handleChange}
          />

          <TextInput
            name="author"
            placeholder="Введите свое имя"
            label="Автор"
            value={formik.values.author}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            color={formik.errors.author && 'red'}
            aria-invalid={!!formik.errors.author}
            maxLength={20}
          />
          {renderError('author')}

          <TextInput
            name="description"
            placeholder="Оставьте пояснение"
            label="Комментарий автора"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            color={formik.errors.description && 'red'}
            aria-invalid={!!formik.errors.description}
            maxLength={200}
          />
          {renderError('description')}

          <MathCaptcha onValidate={setCaptchaValid} />

          <Button type="submit" disabled={loading}>
            {loading ? <Loader /> : 'Опубликовать'}
          </Button>
        </div>
      </form>
    </>
  );
};

export default SnippetForm;

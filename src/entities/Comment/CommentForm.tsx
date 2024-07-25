import React, { useState } from 'react';
import { useFormik } from 'formik';
import Picker from '@emoji-mart/react';
import data from '@emoji-mart/data';
import ru from '@emoji-mart/data/i18n/ru.json';

import { MathCaptcha } from '@/entities';
import { TextInput, Button } from '@/shared';
import styles from './CommentForm.module.scss';

interface CommentFormProps {
  onAddComment: (author: string, content: string) => Promise<void>;
}

export const CommentForm: React.FC<CommentFormProps> = ({ onAddComment }) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [captchaValid, setCaptchaValid] = useState(false);
  const [captchaKey, setCaptchaKey] = useState(0);

  const formik = useFormik({
    initialValues: {
      author: '',
      content: '',
    },
    validate: (values) => {
      const errors: Record<string, string> = {};
      if (!values.author.trim()) {
        errors.author = 'Автор обязателен';
      }
      if (!values.content.trim()) {
        errors.content = 'Комментарий обязателен';
      }
      return errors;
    },
    onSubmit: async (values, { resetForm }) => {
      if (captchaValid) {
        await onAddComment(values.author, values.content);
        resetForm();
        setCaptchaValid(false);
        setCaptchaKey((prevKey) => prevKey + 1);
      }
    },
  });

  const addEmoji = (emoji: any) => {
    formik.setFieldValue('content', formik.values.content + emoji.native);
  };

  return (
    <form
      onSubmit={formik.handleSubmit}
      className={styles.addComment}
      aria-labelledby="commentFormTitle"
    >
      <h2 id="commentFormTitle" className="sr-only">
        Оставьте свой комментарий
      </h2>
      <div className={styles.inputBlock}>
        <TextInput
          name="author"
          placeholder="Ваше имя"
          label="Автор"
          value={formik.values.author}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          aria-invalid={formik.errors.author ? 'true' : 'false'}
          aria-describedby="authorError"
          color={formik.errors.author ? 'red' : undefined}
          maxLength={20}
        />
        {formik.touched.author && formik.errors.author && (
          <div id="authorError" className={styles.error} role="alert">
            {formik.errors.author}
          </div>
        )}
      </div>
      <div className={styles.inputBlock}>
        <TextInput
          className={styles.textarea}
          name="content"
          placeholder="Оставьте комментарий"
          label="Комментарий"
          value={formik.values.content}
          multiline
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          aria-invalid={formik.errors.content ? 'true' : 'false'}
          aria-describedby="contentError"
          color={formik.errors.content ? 'red' : undefined}
          maxLength={200}
        />
        <button
          type="button"
          className={styles.emojiPickerButton}
          onClick={() => setShowEmojiPicker((prev) => !prev)}
          aria-label={
            showEmojiPicker ? 'Закрыть меню эмодзи' : 'Выбрать эмодзи'
          }
          aria-expanded={showEmojiPicker}
        >
          {showEmojiPicker ? '❌' : '😀'}
        </button>
        {showEmojiPicker && (
          <Picker
            className={styles.emojiPicker}
            data={data}
            onEmojiSelect={addEmoji}
            locale={ru}
          />
        )}
        {formik.touched.content && formik.errors.content && (
          <div id="contentError" className={styles.error} role="alert">
            {formik.errors.content}
          </div>
        )}
      </div>
      <div className={styles.captchaContainer}>
        <MathCaptcha key={captchaKey} onValidate={setCaptchaValid} />
      </div>
      {!captchaValid && (
        <div className={styles.error} role="alert">
          Заполни капчу
        </div>
      )}
      <Button className={styles.submit} type="submit" disabled={!captchaValid}>
        Добавить комментарий
      </Button>
    </form>
  );
};

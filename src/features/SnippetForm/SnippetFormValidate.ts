import { SnippetType } from '@/entities';

export const SnippetFormValidate = (
  values: Omit<SnippetType, 'id' | 'shortUrl'>
) => {
  const errors: Record<string, string> = {};
  if (!values.code) {
    errors.code = 'Код обязателен';
  }
  if (!values.language) {
    errors.language = 'Синтаксис обязателен';
  }
  if (!values.author) {
    errors.author = 'Автор обязателен';
  }
  if (!values.description) {
    errors.description = 'Комментарий обязателен';
  }
  return errors;
};

import monacoLanguages from './monacoLanguages';

export const getLanguage = (shortLang: string): string => {
  const language = monacoLanguages.find((lang) => lang.value === shortLang);
  return language ? language.name : 'Plain Text';
};

'use client';
import Editor, { EditorProps } from '@monaco-editor/react';
import { useTheme } from 'next-themes';
import { MonacoLanguageValue } from './monacoLanguages';
import MonacoSkeleton from './MonacoSkeleton';

interface SnippetEditorProps extends EditorProps {
  language?: MonacoLanguageValue;
}

const SnippetEditor: React.FC<SnippetEditorProps> = ({
  options,
  language,
  ...props
}) => {
  const { theme } = useTheme();
  return (
    <Editor
      language={language}
      options={
        options || {
          automaticLayout: true,
        }
      }
      theme={theme == 'dark-theme' ? 'vs-dark' : 'vs'}
      width={props['width'] || '99%'}
      height={props['height'] || '100%'}
      loading={props['loading'] || <MonacoSkeleton />}
      {...props}
    />
  );
};

export default SnippetEditor;

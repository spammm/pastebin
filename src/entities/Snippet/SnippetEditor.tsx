'use client';
import Editor, { EditorProps } from '@monaco-editor/react';
import { MonacoLanguageValue } from './monacoLanguages';
import MonacoSkeleton from './MonacoSkeleton';

interface SnippetEditorProps extends EditorProps {
  language?: MonacoLanguageValue;
}

const SnippetEditor: React.FC<SnippetEditorProps> = ({
  theme = 'vs-dark',
  options,
  language,
  ...props
}) => {
  return (
    <Editor
      language={language}
      options={
        options || {
          automaticLayout: true,
        }
      }
      theme={theme}
      width={props['width'] || '99%'}
      height={props['height'] || '100%'}
      loading={props['loading'] || <MonacoSkeleton />}
      {...props}
    />
  );
};

export default SnippetEditor;

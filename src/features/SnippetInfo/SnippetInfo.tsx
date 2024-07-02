import React from 'react';
import { InfoBlock } from '@/shared';
import { SnippetType, monacoLanguages } from '@/entities';

interface SnippetInfoProps {
  snippet: SnippetType;
  className?: string;
}

const SnippetInfo: React.FC<SnippetInfoProps> = ({
  snippet,
  className,
  ...props
}) => {
  const language = monacoLanguages.find((l) => l.value === snippet.language);
  const info = {
    title: 'Snippet Information',
    items: [
      { label: 'Language', value: language ? language.name : 'Plain Text' },
      { label: 'Author', value: snippet.author },
      { label: 'Description', value: snippet.description },
    ],
  };

  return (
    <InfoBlock
      title={info.title}
      items={info.items}
      className={className}
      {...props}
    />
  );
};

export default SnippetInfo;

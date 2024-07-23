import React from 'react';
import { InfoBlock, LocalDataTime } from '@/shared';
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
  const language = monacoLanguages.find(
    (lang) => lang.value === snippet.language
  );
  const info = {
    title: 'Параметры сниппета',
    items: [
      { label: 'Синтаксис', value: language ? language.name : 'Plain Text' },
      { label: 'Автор', value: snippet.author },
      { label: 'Описание', value: snippet.description },
      {
        label: 'Дата создания',
        value: <LocalDataTime date={new Date(snippet.createdAt)} />,
      },
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

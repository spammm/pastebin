import React from 'react';
import { InfoBlock, LocalDataTime } from '@/shared';
import { SnippetType, getLanguage } from '@/entities';

interface SnippetInfoProps {
  snippet: SnippetType;
  className?: string;
}

const SnippetInfo: React.FC<SnippetInfoProps> = ({
  snippet,
  className,
  ...props
}) => {
  const info = {
    title: 'Параметры сниппета',
    items: [
      { label: 'Синтаксис', value: getLanguage(snippet.language) },
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

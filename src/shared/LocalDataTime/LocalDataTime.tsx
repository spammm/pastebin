import { getDate, getTime } from '@/utils/formatDateTime';
import React from 'react';

interface LocalDataTimeProps extends React.HtmlHTMLAttributes<HTMLTimeElement> {
  date: Date;
}

export const LocalDataTime: React.FC<LocalDataTimeProps> = ({
  date,
  ...props
}) => {
  return (
    <time dateTime={date.toLocaleString()} {...props}>
      {getDate(date)} {getTime(date)}
    </time>
  );
};

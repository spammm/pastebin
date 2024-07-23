const dateOptions: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
};

const timeOptions: Intl.DateTimeFormatOptions = {
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
};

export const getDate = (date: Date) => {
  return date.toLocaleDateString(undefined, dateOptions);
};

export const getTime = (date: Date) => {
  return date.toLocaleTimeString(undefined, timeOptions);
};

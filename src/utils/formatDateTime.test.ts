describe('formatDateTime utility', () => {
  const mockDate = new Date('2022-01-01T12:34:56');

  const locales = [
    {
      locale: 'en-US',
      expectedDate: 'January 1, 2022',
      expectedTime: '12:34:56 PM',
    },
    {
      locale: 'ru-RU',
      expectedDate: '1 января 2022 г.',
      expectedTime: '12:34:56',
    },
  ];

  locales.forEach(({ locale, expectedDate, expectedTime }) => {
    it(`should format the date correctly for locale ${locale}`, () => {
      const formattedDate = mockDate.toLocaleDateString(locale, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
      expect(formattedDate).toBe(expectedDate);
    });

    it(`should format the time correctly for locale ${locale}`, () => {
      const formattedTime = mockDate.toLocaleTimeString(locale, {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
      expect(formattedTime).toBe(expectedTime);
    });
  });
});

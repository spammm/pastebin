import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { LocalDataTime } from '@/shared';
import { getDate, getTime } from '@/utils/formatDateTime';

jest.mock('@/utils/formatDateTime', () => ({
  getDate: jest.fn(),
  getTime: jest.fn(),
}));

describe('LocalDataTime', () => {
  it('должен корректно рендерить дату и время на русском', () => {
    const testDate = new Date('2022-01-01T12:34:56');
    const mockDate = '1 января 2022 г.';
    const mockTime = '12:34:56';

    (getDate as jest.Mock).mockReturnValue(mockDate);
    (getTime as jest.Mock).mockReturnValue(mockTime);

    render(<LocalDataTime date={testDate} />);

    const timeElement = screen.getByRole('time');

    expect(timeElement).toHaveAttribute(
      'dateTime',
      testDate.toLocaleString('ru-RU')
    );
    expect(timeElement).toHaveTextContent(`${mockDate} ${mockTime}`);
  });
});

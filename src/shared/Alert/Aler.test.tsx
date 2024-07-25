import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Alert from './Alert';
import { act } from 'react';

describe('Alert', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('должен автоматически скрываться после указанного времени', () => {
    const onClose = jest.fn();
    render(
      <Alert
        message="Закрыть через секунду"
        duration={1000}
        onClose={onClose}
      />
    );

    const alertElement = screen.getByRole('alert');
    expect(alertElement).toBeInTheDocument();

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(alertElement).toHaveClass('hidden');
    expect(onClose).toHaveBeenCalled();
  });

  it('должен закрываться при нажатии на кнопку закрытия', () => {
    const onClose = jest.fn();
    render(<Alert message="Закрыть вручную" onClose={onClose} />);

    const alertElement = screen.getByRole('alert');
    expect(alertElement).toBeInTheDocument();

    const closeButton = screen.getByLabelText('Close alert');
    fireEvent.click(closeButton);

    act(() => {
      jest.advanceTimersByTime(300);
    });

    expect(alertElement).toHaveClass('hidden');
    expect(onClose).toHaveBeenCalled();
  });
});

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TextInput from './TextInput';

describe('TextInput', () => {
  it('должен отображать метку, если она передана', () => {
    render(<TextInput label="Test Label" />);
    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  it('должен отображать input по умолчанию', () => {
    render(<TextInput />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('должен отображать textarea, если multiline true', () => {
    render(<TextInput multiline />);
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('textbox').tagName).toBe('TEXTAREA');
  });

  it('должен применить правильный класс, если передан цвет', () => {
    const { rerender } = render(<TextInput color="red" />);
    expect(screen.getByRole('textbox')).toHaveClass('red');
    rerender(<TextInput />);
    expect(screen.getByRole('textbox')).not.toHaveClass('red');
  });

  it('должен вызывать onChange при изменении значения', async () => {
    const handleChange = jest.fn();
    render(<TextInput onChange={handleChange} />);
    const input = screen.getByRole('textbox');
    await userEvent.type(input, 'Hello');
    expect(handleChange).toHaveBeenCalledTimes(5);
  });

  it('должен быть недоступным при установке атрибута disabled', () => {
    render(<TextInput disabled />);
    expect(screen.getByRole('textbox')).toBeDisabled();
  });
});

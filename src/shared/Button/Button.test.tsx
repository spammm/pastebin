import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Button from './Button';

describe('Button', () => {
  it('должен рендерить кнопку с переданным текстом', () => {
    render(<Button color="red">Кнопка</Button>);
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toHaveTextContent('Кнопка');
  });

  it('должен применить правильный класс в зависимости от цвета', () => {
    const { rerender } = render(<Button color="red">Кнопка</Button>);
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toHaveClass('red');

    rerender(<Button color="green">Кнопка</Button>);
    expect(buttonElement).toHaveClass('green');
  });

  it('должен быть отключен при передаче пропса disabled', () => {
    render(<Button disabled>Кнопка</Button>);
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toBeDisabled();
  });

  it('должен принимать дополнительные классы', () => {
    render(<Button className="extra-class">Кнопка</Button>);
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toHaveClass('extra-class');
  });
});

import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import InfoBlock from './InfoBlock';

describe('InfoBlock', () => {
  const mockTitle = 'Информация';
  const mockItems = [
    { label: 'Автор', value: 'Джон Доу' },
    { label: 'Возраст', value: '33' },
    { label: 'Город', value: 'Москва' },
  ];

  it('должен рендерить заголовок', () => {
    render(<InfoBlock title={mockTitle} items={mockItems} />);
    const titleElement = screen.getByText(mockTitle);
    expect(titleElement).toBeInTheDocument();
  });

  it('должен рендерить элементы', () => {
    render(<InfoBlock title={mockTitle} items={mockItems} />);
    mockItems.forEach((item) => {
      const labelElement = screen.getByText(`${item.label}:`);
      const valueElement = screen.getByText(item.value as string);
      expect(labelElement).toBeInTheDocument();
      expect(valueElement).toBeInTheDocument();
    });
  });

  it('должен применять переданный className', () => {
    const customClass = 'custom-class';
    render(
      <InfoBlock title={mockTitle} items={mockItems} className={customClass} />
    );
    const sectionElement = screen.getByRole('region', { name: mockTitle });
    expect(sectionElement).toHaveClass(customClass);
  });

  it('должен иметь aria-labelledby атрибут', () => {
    render(<InfoBlock title={mockTitle} items={mockItems} />);
    const sectionElement = screen.getByRole('region', { name: mockTitle });
    const titleElement = screen.getByText(mockTitle);
    expect(sectionElement).toHaveAttribute('aria-labelledby', titleElement.id);
  });
});

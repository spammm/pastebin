import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SelectBox from './SelectBox';

describe('SelectBox', () => {
  const mockOptions = [
    { value: '1', name: 'Option 1' },
    { value: '2', name: 'Option 2' },
    { value: '3', name: 'Option 3' },
  ];

  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('должен рендерить с указанным лейблом', () => {
    render(<SelectBox label="Test Label" options={mockOptions} />);
    const labelElement = screen.getByText('Test Label');
    expect(labelElement).toBeInTheDocument();
  });

  it('должен отображать выбранную опцию', () => {
    render(<SelectBox options={mockOptions} value="2" />);
    const selectedOption = screen.getByText('Option 2');
    expect(selectedOption).toBeInTheDocument();
  });

  it('должен открываться и закрываться по клику', () => {
    render(<SelectBox options={mockOptions} />);
    const selectBox = screen.getByRole('combobox');

    fireEvent.click(selectBox);
    const dropdown = screen.getByRole('listbox');
    expect(dropdown).toBeVisible();

    fireEvent.click(selectBox);
    expect(dropdown).not.toBeVisible();
  });

  it('должен фильтровать опции при вводе в поисковое поле', () => {
    render(<SelectBox options={mockOptions} />);
    const selectBox = screen.getByRole('combobox');

    fireEvent.click(selectBox);

    const searchInput = screen.getByRole('searchbox');
    fireEvent.change(searchInput, { target: { value: '2' } });

    const filteredOption = screen.getByText('Option 2');
    expect(filteredOption).toBeInTheDocument();
    expect(screen.queryByText('Option 1')).not.toBeInTheDocument();
    expect(screen.queryByText('Option 3')).not.toBeInTheDocument();
  });

  //подумать на досуге
  it.skip('должен выбирать опцию по клику на нее', async () => {
    const handleChange = jest.fn();
    render(
      <SelectBox options={mockOptions} onChange={handleChange} value="1" />
    );
    const selectBox = screen.getByRole('combobox');

    // Открытие меню
    fireEvent.click(selectBox);

    const option = screen.getByText('Option 2');
    expect(option).toBeInTheDocument();

    fireEvent.click(option);
    expect(option).not.toBeInTheDocument();

    // Проверка вызова handleChange
    expect(handleChange).toHaveBeenCalledWith(
      expect.objectContaining({ target: { value: '2' } })
    );

    await waitFor(() => {
      expect(screen.getByText('Option 2')).toBeInTheDocument();
    });
  });

  it('должен закрываться при клике вне компонента', () => {
    render(<SelectBox options={mockOptions} />);
    const selectBox = screen.getByRole('combobox');

    fireEvent.click(selectBox);
    const dropdown = screen.getByRole('listbox');
    expect(dropdown).toBeVisible();

    fireEvent.mouseDown(document);
    expect(dropdown).not.toBeVisible();
  });
});

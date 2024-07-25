import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import CheckBox from './CheckBox';

describe('CheckBox', () => {
  it('По умолчанию должен быть не checked', async () => {
    render(<CheckBox label="Чек бокс" />);
    const checkBoxLabel = screen.getByText('Чек бокс');
    expect(checkBoxLabel).toBeInTheDocument();

    const checkBox = checkBoxLabel.querySelector('input');
    expect(checkBox).toBeInTheDocument();
    expect(checkBox).not.toBeChecked();
  });

  it('Должен стать checked по клику', async () => {
    render(<CheckBox label="Чек бокс" />);
    const checkBoxLabel = screen.getByText('Чек бокс');
    expect(checkBoxLabel).toBeInTheDocument();

    const checkBox = checkBoxLabel.querySelector('input');
    fireEvent.click(checkBox!);
    expect(checkBox).toBeChecked();
  });

  it('Checked должен сниматься по клику', async () => {
    render(<CheckBox label="Чек бокс" />);
    const checkBoxLabel = screen.getByText('Чек бокс');
    expect(checkBoxLabel).toBeInTheDocument();

    const checkBox = checkBoxLabel.querySelector('input');
    fireEvent.click(checkBox!); 
    expect(checkBox).toBeChecked();

    fireEvent.click(checkBox!); 
    expect(checkBox).not.toBeChecked();
  });
});

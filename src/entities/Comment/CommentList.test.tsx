import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CommentList from './CommentList';
import { useComments } from '@/hooks/useComments';

jest.mock('@/hooks/useComments');

// Мок капчи
jest.mock('@/entities', () => ({
  MathCaptcha: ({ onValidate }: { onValidate: (valid: boolean) => void }) => {
    React.useEffect(() => {
      onValidate(true);
    }, [onValidate]);

    return <div data-testid="captcha">Mocked Captcha</div>;
  },
}));

describe('CommentList', () => {
  const mockUseComments = useComments as jest.Mock;
  const addCommentMock = jest.fn();
  const commentsMock = [
    {
      id: '1',
      author: 'John Doe',
      content: 'Test comment 1',
      createdAt: new Date(),
    },
    {
      id: '2',
      author: 'Jane Doe',
      content: 'Test comment 2',
      createdAt: new Date(),
    },
  ];

  beforeEach(() => {
    mockUseComments.mockReturnValue({
      comments: commentsMock,
      addComment: addCommentMock,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('должен рендерить форму и комментарии', () => {
    render(<CommentList snippetId="1" />);

    expect(screen.getByText('Добавить комментарий')).toBeInTheDocument();
    expect(screen.getByText('Комментарии')).toBeInTheDocument();
    expect(screen.getByText('Test comment 1')).toBeInTheDocument();
    expect(screen.getByText('Test comment 2')).toBeInTheDocument();
  });

  it('должен рендерить только форму, если нет комментариев', () => {
    mockUseComments.mockReturnValue({
      comments: [],
      addComment: addCommentMock,
    });
    render(<CommentList snippetId="1" />);

    expect(screen.getByText('Добавить комментарий')).toBeInTheDocument();
    expect(screen.queryByText('Комментарии')).not.toBeInTheDocument();
  });

  it('должен вызывать addComment при добавлении нового комментария', async () => {
    render(<CommentList snippetId="1" />);

    fireEvent.change(screen.getByPlaceholderText('Ваше имя'), {
      target: { value: 'Test Author' },
    });
    fireEvent.change(screen.getByPlaceholderText('Оставьте комментарий'), {
      target: { value: 'Test Content' },
    });

    const submitButton = screen.getByText('Добавить комментарий');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(addCommentMock).toHaveBeenCalledWith(
        'Test Author',
        'Test Content'
      );
    });
  });
});

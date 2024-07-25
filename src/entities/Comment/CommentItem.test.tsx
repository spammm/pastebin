import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import CommentItem from './CommentItem';
import { CommentType } from '@/entities/Comment/model';

jest.mock('@/shared', () => ({
  LocalDataTime: jest.fn(({ date, className }) => (
    <time className={className}>{date.toLocaleString()}</time>
  )),
}));

describe('CommentItem', () => {
  const comment: CommentType = {
    id: '1',
    snippetId: '1',
    author: 'John Doe',
    content: 'This is a comment.',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  it('должен отображать автора комментария и содержимое', () => {
    render(<CommentItem comment={comment} />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('This is a comment.')).toBeInTheDocument();
  });

  it('должен отображать дату создания', () => {
    render(<CommentItem comment={comment} />);

    const dateElement = screen.getByText(
      new Date(comment.createdAt!).toLocaleString()
    );
    expect(dateElement).toBeInTheDocument();
  });
});

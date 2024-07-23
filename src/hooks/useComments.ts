import { useState, useEffect } from 'react';
import { fetchComments, createComment } from '@/services/api/';
import { CommentType } from '@/entities/Comment/model';

export const useComments = (snippetId: string) => {
  const [comments, setComments] = useState<CommentType[]>([]);

  useEffect(() => {
    const loadComments = async () => {
      const fetchedComments = await fetchComments(snippetId);
      setComments(fetchedComments);
    };
    loadComments();
  }, [snippetId]);

  const addComment = async (author: string, content: string) => {
    const newComment = await createComment(snippetId, author, content);
    setComments((prevComments) => [newComment, ...prevComments]);
  };

  return { comments, addComment };
};
